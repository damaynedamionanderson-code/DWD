export function initRevealAnimations() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));

  if (revealElements.length === 0) {
    return;
  }

  document.body.classList.add("has-js");

  // Add small stagger values for grouped blocks.
  document.querySelectorAll("[data-stagger]").forEach((group) => {
    const children = group.querySelectorAll("[data-reveal]");
    children.forEach((child, index) => {
      child.style.setProperty("--reveal-delay", `${index * 90}ms`);
    });
  });

  if (prefersReducedMotion) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}
