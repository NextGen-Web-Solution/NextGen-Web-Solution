import { motion } from "framer-motion";
import { Compass, PenTool, Braces, Rocket } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const EASE = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    icon: Compass,
    title: "Discovery & Requirement Mapping",
    desc: "Understanding business goals, scope, and technical roadmap.",
  },
  {
    icon: PenTool,
    title: "Architecture & UI/UX Design",
    desc: "Intuitive layouts, clean user flows, and wireframes.",
  },
  {
    icon: Braces,
    title: "Agile Development & Testing",
    desc: "Clean, documented code with rigorous cross-browser and mobile testing.",
  },
  {
    icon: Rocket,
    title: "Deployment & Handover",
    desc: "Zero-downtime deployment, SEO setup, and full training/handover.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Process"
          title={
            <>
              From brief to launch, <span className="text-gradient">in four steps</span>
            </>
          }
          blurb="A transparent delivery process with clear milestones — you always know what ships next."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              className="relative"
            >
              {i < STEPS.length - 1 && (
                <div className="absolute left-14 top-6 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-[#9F5937]/50 to-[#D2A078]/10 lg:block" />
              )}
              <div
                data-testid={`process-step-${i + 1}`}
                className="relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1B1A18] text-orange-200">
                    <s.icon size={20} />
                  </span>
                  <span className="font-display text-4xl font-bold text-gradient">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[17px] font-semibold leading-snug tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-gray-400">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
