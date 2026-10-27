import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, Code2, Zap, LifeBuoy } from "lucide-react";
import { scrollToId } from "@/lib/scroll";

const EASE = [0.22, 1, 0.36, 1];

const HEADLINE = [
  [{ t: "We Build " }, { t: "High-Speed,", g: true }],
  [{ t: "Scalable & " }, { t: "Impactful", g: true }],
  [{ t: "Websites That Grow" }],
  [{ t: "Your Business." }],
];const HIGHLIGHTS = [
  { icon: Code2, label: "100% Tailored Code & Architecture" },
  { icon: Zap, label: "Ultra-Fast Performance & SEO Friendly" },
  { icon: LifeBuoy, label: "Dedicated Post-Launch Support" },
];

const CODE = [
  [{ t: "const", c: "text-[#D9B38C]" }, { t: " app ", c: "text-orange-200" }, { t: "= ", c: "text-gray-400" }, { t: "createApp", c: "text-[#D6A879]" }, { t: "({", c: "text-gray-400" }],
  [{ t: "  stack", c: "text-gray-300" }, { t: ": ", c: "text-gray-400" }, { t: '["React", "Node.js"]', c: "text-emerald-300" }, { t: ",", c: "text-gray-400" }],
  [{ t: "  database", c: "text-gray-300" }, { t: ": ", c: "text-gray-400" }, { t: '"MongoDB"', c: "text-emerald-300" }, { t: ",", c: "text-gray-400" }],
  [{ t: "  performance", c: "text-gray-300" }, { t: ": ", c: "text-gray-400" }, { t: '"99/100"', c: "text-emerald-300" }, { t: ",", c: "text-gray-400" }],
  [{ t: "  scalable", c: "text-gray-300" }, { t: ": ", c: "text-gray-400" }, { t: "true", c: "text-[#f472b6]" }],
  [{ t: "});", c: "text-gray-400" }],
  [{ t: "app", c: "text-orange-200" }, { t: ".", c: "text-gray-400" }, { t: "deploy", c: "text-[#D6A879]" }, { t: "(); ", c: "text-gray-400" }, { t: "// zero-downtime", c: "text-gray-600" }],
];

const CHIPS = [
  { label: "Core Web Vitals", value: "100 / 100", className: "-right-5 top-8" },
  { label: "Uptime", value: "99.9%", className: "-left-7 top-1/3" },
  { label: "SEO Score", value: "Optimized", className: "-right-3 bottom-10" },
];

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 20 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section id="home" onMouseMove={onMove} className="relative overflow-hidden pt-[72px]">
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-32 left-[8%] h-96 w-96 rounded-full bg-[#9F5937]/25 blur-[140px]" />
      <div className="absolute right-[4%] top-1/3 h-80 w-80 rounded-full bg-[#D2A078]/15 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 pt-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-32 lg:pt-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium tracking-wide text-gray-300"
            data-testid="hero-badge"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-300" />
            </span>
            Custom Web Solutions for Growing Businesses &amp; Startups
          </motion.div>

          <h1 className="mt-7 font-display text-[2.1rem] font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-[3.75rem] lg:leading-[1.07]">
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "112%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.25 + i * 0.13, ease: EASE }}
                >
                  {line.map((part, j) => (
                    <span key={j} className={part.g ? "text-gradient whitespace-nowrap" : undefined}>
                      {part.t}
                    </span>
                  ))}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg"
            data-testid="hero-subheadline"
          >
            From custom full-stack web apps and dynamic corporate portals to e-commerce
            engines—NextGen Web Solutions delivers robust digital platforms engineered for
            conversion, speed, and reliability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-cta-consultation"
              onClick={() => scrollToId("contact")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#9F5937] to-[#D2A078] px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.04]"
            >
              Get a Free Consultation
              <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              data-testid="hero-cta-view-work"
              onClick={() => scrollToId("portfolio")}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.06]"
            >
              View Our Work
              <ArrowDown size={17} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
            className="mt-12 grid gap-5 border-t border-white/10 pt-8 sm:grid-cols-3"
          >
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="flex items-start gap-3">
                <span className="mt-0.5 rounded-lg border border-[#9F5937]/40 bg-[#9F5937]/10 p-2 text-orange-200">
                  <h.icon size={15} />
                </span>
                <span className="text-[13px] leading-snug text-gray-300">{h.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: EASE }}
          className="relative hidden lg:block"
          style={{ perspective: 1200 }}
        >
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
            <div className="rounded-2xl border border-white/10 bg-[#1B1A18]/80 shadow-[0_40px_120px_-20px_rgba(159,89,55,0.22)] backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-xs text-gray-500">nextgen.config.js</span>
              </div>
              <div className="p-6 font-mono text-[13px] leading-7">
                {CODE.map((line, i) => (
                  <div key={i} className="whitespace-pre">
                    {line.map((tok, j) => (
                      <span key={j} className={tok.c}>
                        {tok.t}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {CHIPS.map((chip, i) => (
              <div key={chip.label} style={{ transform: "translateZ(70px)" }} className={`absolute ${chip.className}`}>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
                  className="glass rounded-xl border border-white/10 px-4 py-3 shadow-lg"
                >
                  <p className="text-[11px] uppercase tracking-wider text-gray-400">{chip.label}</p>
                  <p className="font-display text-sm font-bold text-white">{chip.value}</p>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
