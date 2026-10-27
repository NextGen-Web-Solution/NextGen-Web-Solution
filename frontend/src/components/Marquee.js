const ITEMS = [
  "Full-Stack Web Apps",
  "Corporate Websites",
  "E-Commerce Platforms",
  "Web Portals & Dashboards",
  "Redesign & Performance",
  "Maintenance & Security",
  "SEO & Speed Optimization",
];

export default function Marquee() {
  return (
    <section aria-label="What we build" className="border-y border-white/[0.07] bg-white/[0.02] py-6">
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {[0, 1].map((half) => (
            <div key={half} aria-hidden={half === 1} className="flex items-center">
              {ITEMS.map((item) => (
                <span
                  key={`${half}-${item}`}
                  className="flex items-center gap-10 px-5 font-display text-sm font-semibold uppercase tracking-[0.25em] text-gray-500"
                >
                  {item}
                  <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gradient-to-r from-[#9F5937] to-[#D2A078]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
