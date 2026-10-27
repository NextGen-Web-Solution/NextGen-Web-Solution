import { motion } from "framer-motion";
import { Monitor, Server, Database, Cloud } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const EASE = [0.22, 1, 0.36, 1];

const GROUPS = [
  {
    icon: Monitor,
    label: "Frontend",
    items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    icon: Server,
    label: "Backend & APIs",
    items: ["Node.js", "Express.js", "RESTful Architecture"],
  },
  {
    icon: Database,
    label: "Databases",
    items: ["MongoDB", "SQL / PostgreSQL"],
  },
  {
    icon: Cloud,
    label: "Security & Cloud",
    items: ["JWT Authentication", "Cloud Hosting (Vercel / AWS)", "Secure Payment Integrations"],
  },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="relative py-24 lg:py-32">
      <div className="absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[#9F5937]/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Tech Stack"
          title={
            <>
              Modern. Reliable. <span className="text-gradient">Battle-tested.</span>
            </>
          }
          blurb="A proven stack chosen for speed, security and long-term maintainability — never experimental tech on your critical path."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
            >
              <div
                data-testid={`tech-stack-group-${g.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-lg border border-[#9F5937]/40 bg-[#9F5937]/10 p-2.5 text-orange-200">
                    <g.icon size={18} />
                  </span>
                  <h3 className="font-display text-base font-semibold text-white">{g.label}</h3>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      data-testid="tech-stack-pill"
                      className="cursor-default rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[13px] text-gray-300 transition-colors duration-200 hover:border-orange-300/50 hover:text-orange-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
