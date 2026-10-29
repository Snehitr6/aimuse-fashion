
import {
  Heart,
  Sparkles,
  Shirt,
  BookmarkCheck,
} from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    number: "01",
    title: "Personal style discovery",
    description:
      "Explore outfit inspiration and find a style that feels right for you.",
  },
  {
    icon: Shirt,
    number: "02",
    title: "Looks for every occasion",
    description:
      "From relaxed weekends to party nights and polished workwear.",
  },
  {
    icon: Heart,
    number: "03",
    title: "Made to inspire",
    description:
      "Discover new combinations, colours, and fashion aesthetics.",
  },
  {
    icon: BookmarkCheck,
    number: "04",
    title: "Keep your favourites",
    description:
      "Save the outfits you love and return to your personal wishlist.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-section" id="why-ai-muse">
      <div className="section-heading">
        <p className="section-eyebrow">A BETTER WAY TO GET DRESSED</p>
        <h2>
          Your style. <em>Your rules.</em>
        </h2>
        <p>
          A little inspiration can change the way you feel in an outfit.
        </p>
      </div>

      <div className="benefits-grid">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <article className="benefit-card" key={benefit.number}>
              <div className="benefit-card-top">
                <span>{benefit.number}</span>
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
