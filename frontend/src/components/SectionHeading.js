import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function SectionHeading({ index, eyebrow, title, blurb }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-orange-200/90">
          <span className="h-px w-8 bg-gradient-to-r from-[#9F5937] to-[#D2A078]" />
          {index} — {eyebrow}
        </p>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
          {title}
        </h2>
      </div>
      {blurb && (
        <p className="max-w-md text-[15px] leading-relaxed text-gray-400 md:pb-1 md:text-right">{blurb}</p>
      )}
    </motion.div>
  );
}
