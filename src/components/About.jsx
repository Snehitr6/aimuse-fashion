
import { ArrowUpRight, Sparkles } from "lucide-react";

const values = [
  {
    number: "01",
    title: "Style that feels like you",
    text: "Discover looks that reflect your personality, mood, and everyday life.",
  },
  {
    number: "02",
    title: "Less guessing, more confidence",
    text: "Explore curated outfit inspiration for work, weekends, celebrations, and beyond.",
  },
  {
    number: "03",
    title: "Your personal style journey",
    text: "Save your favourite looks and build a wardrobe that feels uniquely yours.",
  },
];

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-layout">
        <div className="about-visual">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85"
            alt="Fashion styling and outfit inspiration"
            loading="lazy"
          />
          <div className="about-image-note">
            <Sparkles size={18} />
            <span>Made for your kind of style</span>
          </div>
          <span className="about-image-number">A M / 01</span>
        </div>

        <div className="about-content">
          <p className="section-eyebrow">THE STORY BEHIND THE STYLE</p>
          <h2>
            Fashion should feel
            <br />
            <em>like you.</em>
          </h2>
          <p className="about-intro">
            AI MUSE is your space to explore personal style, discover fresh
            outfit ideas, and feel more confident in what you wear.
          </p>
          <p className="about-description">
            From everyday essentials to statement-making occasions, we bring
            inspiration together in one place. Find combinations you love,
            explore new aesthetics, and make every outfit your own.
          </p>

          <a href="#stylist" className="about-link">
            Find your style <ArrowUpRight size={18} />
          </a>

          <div className="about-values">
            {values.map((value) => (
              <div className="about-value" key={value.number}>
                <span>{value.number}</span>
                <div>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
