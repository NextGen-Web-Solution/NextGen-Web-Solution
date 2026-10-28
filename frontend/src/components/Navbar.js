import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { scrollToId } from "@/lib/scroll";

const LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Tech Stack", id: "tech-stack" },
  { label: "Process", id: "process" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        scrolled || open
          ? "border-white/10 bg-[#111110]/85"
          : "border-transparent bg-[#111110]/40"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <button
          data-testid="navbar-logo-button"
          onClick={() => go("home")}
          className="cursor-pointer"
          aria-label="TheZipCode — home"
        >
          <Logo />
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={`navbar-link-${l.id}`}
              onClick={() => go(l.id)}
              className="rounded-full px-4 py-2 text-sm text-gray-300 transition-colors duration-200 hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            data-testid="navbar-lets-talk-button"
            onClick={() => go("contact")}
            className="group hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#9F5937] to-[#D2A078] px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.04] sm:inline-flex"
          >
            Let&apos;s Talk
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <button
            data-testid="navbar-mobile-toggle"
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="navbar-mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="border-b border-white/10 bg-[#111110]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-1 px-5 py-4">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  data-testid={`navbar-mobile-link-${l.id}`}
                  onClick={() => go(l.id)}
                  className="block w-full rounded-lg px-4 py-3 text-left text-[15px] text-gray-200 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </button>
              ))}
              <button
                data-testid="navbar-mobile-lets-talk-button"
                onClick={() => go("contact")}
                className="mt-2 w-full rounded-full bg-gradient-to-r from-[#9F5937] to-[#D2A078] px-5 py-3 text-sm font-semibold text-white"
              >
                Let&apos;s Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
