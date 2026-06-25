const navLinks = [...document.querySelectorAll(".desktop-nav a, .bottom-nav a")];
const sections = [...document.querySelectorAll(".observed-section")];

const setActiveLink = (sectionId) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setActiveLink(visible.target.id);
    },
    {
      rootMargin: "-24% 0px -58% 0px",
      threshold: [0.08, 0.2, 0.4],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.getAttribute("href").slice(1);
    setActiveLink(id);
  });
});

document.getElementById("current-year").textContent = new Date().getFullYear();
