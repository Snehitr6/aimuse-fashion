
import { ArrowUpRight } from "lucide-react";
import { categories } from "../data/outfits";

export default function FashionCategories({ onSelectCategory }) {
  return (
    <section id="categories" className="section section-cream fashion-categories">
      <div className="fashion-categories-heading">
        <div className="fashion-categories-title">
          <p className="eyebrow">A WORLD OF POSSIBILITIES</p>

          <h2>
            Find your
            <br className="category-title-break" />
            <span> fashion mood.</span>
          </h2>
        </div>

        <p className="fashion-categories-intro">
          From everyday essentials to statement outfits,
          <br className="desktop-break" />
          discover styles that express your personality.
        </p>
      </div>

      <div className="category-grid">
        {categories.map((category, index) => (
          <button
            type="button"
            className="category-card"
            key={category.name}
            onClick={() => onSelectCategory?.(category.name)}
          >
            <img
              src={category.image}
              alt={`${category.name} fashion collection`}
              loading="lazy"
            />

            <span className="category-shade" />

            <span className="category-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="category-info">
              <span>
                <strong>{category.name}</strong>
                <small>{category.subtitle}</small>
              </span>

              <span className="category-arrow">
                <ArrowUpRight size={20} />
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
