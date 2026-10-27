import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { TESTIMONIALS } from "@/data/testimonials";

const EASE = [0.22, 1, 0.36, 1];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="absolute left-[10%] top-1/4 h-72 w-72 rounded-full bg-[#9F5937]/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="Testimonials"
          title={
            <>
              Trusted by <span className="text-gradient">growing teams</span>
            </>
          }
          blurb="A 5-star record across every engagement — because we treat your project like our own product."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: i * 0.09, ease: EASE }}
              data-testid={`testimonial-card-${i + 1}`}
              className="relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8"
            >
              <Quote size={28} className="text-[#9F5937]/60" />
              <div className="mt-4 flex gap-1" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-gray-300">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#9F5937] to-[#D2A078] font-display text-sm font-bold text-white">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{t.name}</span>
                  <span className="block text-xs text-gray-400">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
