
import { useEffect, useState } from "react";

const products = [
  {
    name: "Everyday essentials",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=85",
    className: "intro-product-one",
  },
  {
    name: "Modern classics",
    image:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=500&q=85",
    className: "intro-product-two",
  },
  {
    name: "Your next favorite",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500&q=85",
    className: "intro-product-three",
  },
];

export default function IntroLoader() {
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const closeTimer = window.setTimeout(() => {
      setClosing(true);
    }, 1900);

    const removeTimer = window.setTimeout(() => {
      setVisible(false);
    }, 2550);

    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`shop-intro ${closing ? "shop-intro-closing" : ""}`}
      role="status"
      aria-label="Opening AI Muse fashion store"
    >
      <header className="intro-topbar">
        <span>NEW SEASON / 2026</span>
        <span>STYLE, PERSONALLY CURATED.</span>
      </header>

      <main className="intro-main">
        <div className="intro-copy">
          <p className="intro-eyebrow">
            YOUR PERSONAL FASHION DESTINATION
          </p>

          <h1 className="intro-brand">
            AI<span>MUSE</span>
            <sup>®</sup>
          </h1>

          <p className="intro-description">
            Find pieces that feel like you.
          </p>

          <div className="intro-loading">
            <div className="intro-loading-label">
              <span>CURATING YOUR EXPERIENCE</span>
              <span className="intro-loading-dots">•••</span>
            </div>

            <div className="intro-progress-track">
              <span className="intro-progress-bar" />
            </div>
          </div>
        </div>

        <div className="intro-showcase">
          <div className="intro-image-grid">
            {products.map((product, index) => (
              <div
                key={product.name}
                className={`intro-product ${product.className}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="eager"
                />
                <span className="intro-image-number">
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="intro-bag">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 8.5h16l-1.2 12H5.2L4 8.5Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 9V6a3.5 3.5 0 0 1 7 0v3"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </main>

      <footer className="intro-footer">
        <span>DISCOVER YOUR STYLE</span>
        <span>AI MUSE — ONLINE BOUTIQUE</span>
      </footer>
    </div>
  );
}
