import { motion } from "framer-motion";
import { Layers, Building2, ShoppingCart, LayoutDashboard, Gauge, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const EASE = [0.22, 1, 0.36, 1];

const SERVICES = [
  {
    icon: Layers,
    title: "Custom Full-Stack Web Apps",
    desc: "Scalable architectures built with modern frameworks and secure APIs.",
  },
  {
    icon: Building2,
    title: "Corporate & Business Websites",
    desc: "High-trust, professional online presence designed to convert visitors into clients.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Platforms",
    desc: "Seamless shopping experiences with fast checkouts and secure payment gateways.",
  },
  {
    icon: LayoutDashboard,
    title: "Web Portals & Dashboards",
    desc: "Custom admin panels, CRM systems, and internal operational tools.",
  },
  {
    icon: Gauge,
    title: "Website Redesign & Performance",
    desc: "Elevate legacy designs, optimize Core Web Vitals, and boost site speed.",
  },
  {
    icon: ShieldCheck,
    title: "Maintenance & Security",
    desc: "Regular updates, uptime monitoring, bug fixes, and continuous technical support.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="Services"
          title={
            <>
              Engineering built to <span className="text-gradient">convert &amp; scale</span>
            </>
          }
          blurb="Six core capabilities that take a product from first sketch to a reliable, revenue-driving platform."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: (i % 3) * 0.08, ease: EASE }}
            >
              <article
                data-testid={`service-card-${i + 1}`}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1.5 hover:border-[#D2A078]/40 hover:bg-white/[0.05]"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#9F5937]/25 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="pointer-events-none absolute right-7 top-6 font-display text-4xl font-bold text-white/[0.05]">
                  0{i + 1}
                </span>
                <span className="relative w-fit rounded-xl border border-white/10 bg-gradient-to-br from-[#9F5937]/25 to-[#D2A078]/15 p-3 text-orange-200">
                  <s.icon size={22} />
                </span>
                <h3 className="relative mt-6 font-display text-lg font-semibold tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-gray-400">{s.desc}</p>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
