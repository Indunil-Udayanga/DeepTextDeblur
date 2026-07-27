import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { deblurImage, type DeblurResult } from "../services/api";

export function useDeblur() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DeblurResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (file: File | null) => {
    if (!file) {
      setError("No image selected");
      toast.error("Please select an image first.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await deblurImage(file);
      setResult(data);
      toast.success("Image restored successfully!");
    } catch (err) {
      const e = err as { code?: string; message?: string; response?: { status?: number } };
      let msg = "Something went wrong.";
      if (e.code === "ECONNABORTED") msg = "Request timed out. Please try again.";
      else if (e.message === "Network Error") msg = "Backend offline. Is FastAPI running on :8000?";
      else if (e.response) msg = `API error (${e.response.status}). Please retry.`;
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { loading, result, error, run, reset };
}
