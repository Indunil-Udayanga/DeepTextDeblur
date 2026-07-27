import { motion } from "framer-motion";
import { Atom, Wind, Server, Flame, Network } from "lucide-react";

const techs = [
  { icon: Atom, name: "React", desc: "Component-driven UI" },
  { icon: Wind, name: "Tailwind CSS", desc: "Utility-first styling" },
  { icon: Server, name: "FastAPI", desc: "High-performance backend" },
  { icon: Flame, name: "PyTorch", desc: "Deep learning framework" },
  { icon: Network, name: "U-Net CNN", desc: "Encoder–decoder architecture" },
];

export default function TechStack() {
  return (
    <section id="technology" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-xs uppercase tracking-widest text-[#06B6D4]">Technology</span>
        <h2 className="text-4xl font-semibold mt-2">Built on a modern AI stack</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {techs.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-5 text-center"
          >
            <div className="mx-auto grid place-items-center h-12 w-12 rounded-xl bg-white/5 mb-3">
              <t.icon className="h-6 w-6 text-[#a78bfa]" />
            </div>
            <p className="font-medium">{t.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
