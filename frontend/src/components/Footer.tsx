import { Github, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground inline-flex items-center gap-2">
          Built with <Heart className="h-4 w-4 text-[#7C3AED]" /> using React, FastAPI, PyTorch & Tailwind CSS
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/5 text-sm"
        >
          <Github className="h-4 w-4" /> View on GitHub
        </a>
      </div>
    </footer>
  );
}
