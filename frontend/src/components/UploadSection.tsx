import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, X, ImageIcon, Wand2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "./Loader";
import ImagePreview from "./ImagePreview";
import { useDeblur } from "../hooks/useDeblur";

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPT = ["image/png", "image/jpeg", "image/jpg"];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function UploadSection() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const { loading, result, error, run, reset } = useDeblur();

  const handleFile = (f?: File | null) => {
    if (!f) return;
    if (!ACCEPT.includes(f.type)) {
      toast.error("Invalid file type. Please upload PNG or JPG.");
      return;
    }
    if (f.size > MAX_SIZE) {
      toast.error("File too large. Max 10 MB.");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    reset();
  };

  const clear = () => {
    setFile(null);
    setPreview(null);
    reset();
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section id="upload" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass rounded-3xl p-6 sm:p-10"
      >
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed transition-all p-10 sm:p-14 text-center ${
            dragOver ? "border-[#7C3AED] bg-white/5" : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/png,image/jpeg"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto grid place-items-center h-16 w-16 rounded-2xl btn-gradient mb-4"
          >
            <UploadCloud className="h-8 w-8" />
          </motion.div>
          <p className="text-lg font-medium">Drag & drop a blurred text image</p>
          <p className="text-sm text-muted-foreground mt-1">or click to browse — PNG, JPG, JPEG · up to 10 MB</p>
        </div>

        {file && preview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 grid md:grid-cols-[220px_1fr] gap-5 items-center"
          >
            <div className="rounded-xl overflow-hidden aspect-[4/3] bg-black/40 grid place-items-center">
              <img src={preview} alt="preview" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <ImageIcon className="h-4 w-4 text-[#06B6D4]" />
                <span className="font-medium truncate">{file.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{formatBytes(file.size)} · {file.type}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => inputRef.current?.click()}
                  disabled={loading}
                  className="px-4 py-2 rounded-xl glass hover:bg-white/5 text-sm disabled:opacity-50"
                >
                  Choose Image
                </button>
                <button
                  onClick={() => run(file)}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl btn-gradient text-sm font-medium disabled:opacity-60 disabled:pointer-events-none hover:-translate-y-0.5"
                >
                  <Wand2 className="h-4 w-4" /> Deblur Image
                </button>
                <button
                  onClick={clear}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/5 text-sm disabled:opacity-50"
                >
                  <X className="h-4 w-4" /> Clear
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {loading && (
          <div className="mt-8">
            <Loader />
          </div>
        )}

        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4"
          >
            <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-200">Something didn't work</p>
              <p className="text-sm text-red-200/80">{error}</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {result && !loading && <ImagePreview result={result} />}
    </section>
  );
}
