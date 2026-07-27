import { motion } from "framer-motion";
import { Upload, Brain, ImageIcon, ArrowDown } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload Image", desc: "Drop your blurred text image into the app." },
  { icon: Brain, title: "Deep Learning Model", desc: "A U-Net CNN restores fine details and edges." },
  { icon: ImageIcon, title: "Clear Image", desc: "Download the sharpened, readable result." },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="text-xs uppercase tracking-widest text-[#06B6D4]">About</span>
        <h2 className="text-4xl font-semibold mt-2">What is Text Deblurring?</h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Motion blur, poor focus, and low-light capture make printed text unreadable. Our U-Net convolutional
          neural network learns to reverse these degradations, reconstructing crisp glyph edges pixel-by-pixel.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5 relative">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 relative"
          >
            <div className="grid place-items-center h-12 w-12 rounded-xl btn-gradient mb-4">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
            <span className="absolute top-6 right-6 text-3xl font-display text-white/10">0{i + 1}</span>
            {i < steps.length - 1 && (
              <ArrowDown className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 rotate-[-90deg] h-6 w-6 text-white/20 z-10" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
