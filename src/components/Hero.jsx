const ArrowRight = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const Sparkle = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
    <path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z" />
  </svg>
);

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=90"
          alt="Fashion collection featuring contemporary outfits"
          fetchPriority="high"
        />
      </div>

      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-kicker">
          <Sparkle />
          <span>YOUR PERSONAL AI FASHION STYLIST</span>
        </div>

        <h1>
          Style that feels
          <br />
          <em>like you.</em>
        </h1>

        <p className="hero-description">
          Discover outfits that match your mood, your moment, and your
          individuality. Your next favorite look starts here.
        </p>

        <div className="hero-actions">
          <a href="#stylist" className="button-light">
            Find my style <ArrowRight />
          </a>

          <a href="#categories" className="hero-secondary-link">
            Explore collections <span>↗</span>
          </a>
        </div>

        <div className="hero-note">
          <span className="hero-note-line" />
          <span>LESS GUESSWORK. MORE PERSONAL STYLE.</span>
        </div>
      </div>

      <div className="hero-side-note">
        THE ART OF GETTING DRESSED
      </div>

      <a href="#categories" className="hero-scroll" aria-label="Scroll to collections">
        <span>SCROLL TO DISCOVER</span>
        <span className="hero-scroll-line" />
      </a>
    </section>
  );
}