import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, GitCompareArrows } from "lucide-react";
import type { DeblurResult } from "../services/api";

function Card({ label, src, badge }: { label: string; src: string; badge: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl overflow-hidden shadow-2xl shadow-black/30"
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-white/5">{badge}</span>
      </div>
      <div className="aspect-[4/3] bg-black/30 grid place-items-center">
        <img src={src} alt={label} className="max-h-full max-w-full object-contain" />
      </div>
    </motion.div>
  );
}

function CompareSlider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const move = (clientX: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const p = ((clientX - rect.left) / rect.width) * 100;
      setPos(Math.max(0, Math.min(100, p)));
    };
    const onMove = (e: MouseEvent) => dragging.current && move(e.clientX);
    const onTouch = (e: TouchEvent) => {
      if (dragging.current && e.touches[0]) move(e.touches[0].clientX);
    };
    const up = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", onTouch);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", up);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-2xl glass aspect-[16/9] touch-none"
    >
      <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-contain bg-black/40" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <img src={after} alt="After" className="w-full h-full object-contain bg-black/40" />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.6)]"
        style={{ left: `${pos}%` }}
      />
      <button
        onMouseDown={() => (dragging.current = true)}
        onTouchStart={() => (dragging.current = true)}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 grid place-items-center h-10 w-10 rounded-full btn-gradient cursor-grab active:cursor-grabbing"
        style={{ left: `${pos}%` }}
        aria-label="Compare slider"
      >
        <GitCompareArrows className="h-5 w-5" />
      </button>
      <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-md bg-black/50 backdrop-blur">Before</span>
      <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-md bg-black/50 backdrop-blur">After</span>
    </div>
  );
}

export default function ImagePreview({ result }: { result: DeblurResult }) {
  const download = () => {
    const a = document.createElement("a");
    a.href = result.deblurred;
    a.download = "deblurred.jpg";
    a.click();
  };

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-16">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-semibold mb-8 text-center"
      >
        Result
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card label="Original Image" src={result.original} badge="Input" />
        <Card label="Deblurred Image" src={result.deblurred} badge="AI Restored" />
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-medium mb-4 text-center text-muted-foreground">Before / After Comparison</h3>
        <CompareSlider before={result.original} after={result.deblurred} />
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={download}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-gradient font-medium hover:-translate-y-0.5"
        >
          <Download className="h-4 w-4" /> Download Deblurred Image
        </button>
      </div>
    </section>
  );
}
