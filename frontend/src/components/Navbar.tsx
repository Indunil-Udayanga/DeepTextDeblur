import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles, Github } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Technology", href: "#technology" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <div className="glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <span className="grid place-items-center h-9 w-9 rounded-xl btn-gradient">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-display font-semibold tracking-tight">
              AI Text <span className="text-gradient">Deblurring</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl btn-gradient hover:-translate-y-0.5"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </nav>
          <button className="md:hidden p-2 rounded-lg hover:bg-white/5" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl mt-2 p-4 md:hidden flex flex-col gap-3"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                {l.label}
              </a>
            ))}
            <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl btn-gradient w-fit">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
