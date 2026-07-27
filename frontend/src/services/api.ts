import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 120000,
});

export type DeblurResult = { original: string; deblurred: string };

export async function deblurImage(file: File): Promise<DeblurResult> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post<DeblurResult>("/deblur/base64", formData);
  return data;
}

export async function checkHealth() {
  const { data } = await api.get("/health");
  return data;
}
