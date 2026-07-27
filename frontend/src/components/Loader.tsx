import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-8 flex flex-col items-center gap-5"
    >
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{ borderTopColor: "#7C3AED", borderRightColor: "#06B6D4" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 grid place-items-center">
          <Sparkles className="h-6 w-6 text-white/80" />
        </div>
      </div>
      <div className="text-center">
        <p className="font-medium">AI is restoring your image…</p>
        <p className="text-xs text-muted-foreground mt-1">This usually takes a few seconds.</p>
      </div>
      <div className="w-full max-w-xs h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full btn-gradient"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "50%" }}
        />
      </div>
    </motion.div>
  );
}
