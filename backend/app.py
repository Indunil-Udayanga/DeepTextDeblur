import io
import os
import base64

import torch
from PIL import Image
from torchvision import transforms
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse

from model import load_model

# Config

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
WEIGHTS_PATH = os.path.join(BASE_DIR, "weights", "best.pth")
IMG_SIZE = 256  # model was trained on 256x256 patches

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


# App setup

app = FastAPI(title="Text Deblur API", version="1.0.0")

# Allow the frontend (served from anywhere / file:// / another port) to call this API

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = None  # loaded on startup

infer_transform = transforms.Compose(
    [
        transforms.Resize((IMG_SIZE, IMG_SIZE), interpolation=transforms.InterpolationMode.BICUBIC),
        transforms.ToTensor(),
    ]
)


@app.on_event("startup")
def startup_event():
    global model
    if not os.path.exists(WEIGHTS_PATH):
        print(f"[WARNING] Weights file not found at {WEIGHTS_PATH}. "
              f"Place your trained 'best.pth' there before making requests.")
        return
    model = load_model(WEIGHTS_PATH, device)
    print(f"Model loaded on {device} from {WEIGHTS_PATH}")


def ensure_model_loaded():
    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Model weights not loaded. Put best.pth in backend/weights/ and restart the server.",
        )


def run_inference(image_bytes: bytes) -> Image.Image:
    """Run the deblurring model on raw image bytes and return a PIL image."""
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid image.")

    orig_size = img.size  

    tensor = infer_transform(img).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(tensor)

    output_img = output.squeeze(0).cpu().clamp(0, 1).permute(1, 2, 0).numpy()
    output_img = (output_img * 255).astype("uint8")
    result = Image.fromarray(output_img)

    result = result.resize(orig_size, Image.BICUBIC)
    return result


def pil_to_base64(img: Image.Image, fmt: str = "JPEG") -> str:
    buf = io.BytesIO()
    img.save(buf, format=fmt, quality=95)
    return base64.b64encode(buf.getvalue()).decode("utf-8")



# Routes

@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": model is not None, "device": str(device)}


@app.post("/deblur")
async def deblur(file: UploadFile = File(...)):
    """Returns the deblurred image directly as a JPEG file."""
    ensure_model_loaded()

    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    image_bytes = await file.read()
    result_img = run_inference(image_bytes)

    buf = io.BytesIO()
    result_img.save(buf, format="JPEG", quality=95)
    buf.seek(0)

    return StreamingResponse(buf, media_type="image/jpeg")


@app.post("/deblur/base64")
async def deblur_base64(file: UploadFile = File(...)):
    """Returns JSON with base64-encoded original + deblurred images (used by the web frontend)."""
    ensure_model_loaded()

    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    image_bytes = await file.read()

    original_img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    result_img = run_inference(image_bytes)

    return JSONResponse(
        {
            "original": f"data:image/jpeg;base64,{pil_to_base64(original_img)}",
            "deblurred": f"data:image/jpeg;base64,{pil_to_base64(result_img)}",
        }
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
