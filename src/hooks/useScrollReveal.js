
import { useEffect } from "react";

export default function useScrollReveal() {
  useEffect(() => {
    const selectors = [
      ".section",
      ".fashion-categories",
      ".editorial-section",
      ".stylist-section",
      ".closing-cta",
      ".outfit-card",
      ".category-card",
      ".recommendations-heading",
    ].join(",");

    const elements = document.querySelectorAll(selectors);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    elements.forEach((element) => {
      element.classList.add("scroll-reveal");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}
