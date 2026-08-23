# Text Deblurring using U-Net

A deep learning application that restores blurred text images using a U-Net-based CNN. The project includes a **PyTorch** model, **FastAPI** backend for inference, and a **React** frontend for an interactive user experience.

---

## Features

- Restore blurred text images
- U-Net deep learning model
- FastAPI REST API
- React frontend
- Real-time image upload and prediction
---
## Tech Stack

### AI / Deep Learning
- Python
- PyTorch
- OpenCV
- Pillow
- NumPy

### Backend
- FastAPI
- Uvicorn

### Frontend
- React
- Axios

---
## Model Architecture

```
Input Image (3×H×W)
        │
        ▼
Encoder
├── Conv Block (3 → 64)
├── MaxPool
├── Conv Block (64 → 128)
├── MaxPool
├── Conv Block (128 → 256)
        │
        ▼
Bottleneck
├── Conv Block (256 → 512)
        │
        ▼
Decoder
├── UpConv (512 → 256)
├── Skip Connection
├── Conv Block
├── UpConv (256 → 128)
├── Skip Connection
├── Conv Block
├── UpConv (128 → 64)
├── Skip Connection
├── Conv Block
        │
        ▼
Output
3-Channel Deblurred Image
```

---

## Dataset

The model was trained using paired images:

- **Blurred Images**
- **Original (Ground Truth) Images**

Each blurred image is paired with its corresponding clear image during training.

---

## 📷 Workflow

```
Upload Blurred Image
          │
          ▼
React Frontend
          │
          ▼
FastAPI Backend
          │
          ▼
PyTorch U-Net Model
          │
          ▼
Deblurred Image
          │
          ▼
Display Result
```

## Future Improvements

- Support higher-resolution images
- Mobile-friendly UI
- Batch image processing
- Docker deploym
