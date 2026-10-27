export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -84, duration: 1.3 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
