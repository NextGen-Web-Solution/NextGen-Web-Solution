import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { PROJECTS } from "@/data/portfolio";

const EASE = [0.22, 1, 0.36, 1];

function ProjectCard({ project, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
      className={project.featured ? "lg:col-span-2" : ""}
    >
      <article
        data-testid={`portfolio-card-${i + 1}`}
        className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1B1A18] ${
          project.featured ? "h-[340px] lg:h-[460px]" : "h-[340px] lg:h-[420px]"
        }`}
      >
        <img
          src={project.image}
          alt={`${project.title} — ${project.subtitle}`}
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-[#111110]/55 to-transparent" />

        <span className="glass absolute left-6 top-6 rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-orange-100">
          {project.category}
        </span>
        <span className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
          <h3 className="font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">
            {project.title}
            <span className="ml-2 text-base font-medium text-orange-200 lg:text-lg">{project.subtitle}</span>
          </h3>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-gray-300">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200 backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 lg:py-32">
      <div className="absolute right-[10%] top-24 h-80 w-80 rounded-full bg-[#D2A078]/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Portfolio"
          title={
            <>
              Selected <span className="text-gradient">work</span>
            </>
          }
          blurb="A snapshot of the platforms we engineer — dashboards, storefronts and brand sites built to perform."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
