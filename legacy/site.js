(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const body = document.body;
  const header = document.querySelector(".site-header");

  if (!body) {
    return;
  }

  body.classList.add("js-ready");
  if (!reduceMotion) {
    requestAnimationFrame(() => {
      body.classList.add("page-enter");
    });
  }

  const revealGroups = [
    [".masthead-grid > *", 130],
    [".section-head", 80],
    [".kpi-grid > *", 70],
    [".editorial-grid > *", 110],
    [".pricing-stack > *", 100],
    [".duo-grid > *", 120],
    [".contact-layout > *", 120],
    [".ribbon", 0],
    [".footer-wrap", 0]
  ];

  revealGroups.forEach(([selector, delayStep]) => {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((node, index) => {
      node.setAttribute("data-reveal", "");
      node.style.setProperty("--delay", `${index * delayStep}ms`);
    });
  });

  if (!reduceMotion) {
    const observer = new IntersectionObserver(
      (entries, io) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
  }

  if (header) {
    const setHeaderState = () => {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };

    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });
  }
})();
