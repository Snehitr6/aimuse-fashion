
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Aanya Sharma",
    initials: "AS",
    label: "Everyday style",
    rating: 5,
    review:
      "I love having different outfit ideas in one place. It makes finding inspiration for everyday looks so much easier.",
  },
  {
    name: "Mira Kapoor",
    initials: "MK",
    label: "Occasion dressing",
    rating: 5,
    review:
      "The collection feels fresh and elegant. I found some lovely ideas for dressing up without overthinking everything.",
  },
  {
    name: "Riya Mehta",
    initials: "RM",
    label: "Style discovery",
    rating: 5,
    review:
      "The layout is beautiful, the outfit categories are easy to explore, and saving my favourite looks is really useful.",
  },
];

export default function CustomerReviews() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-heading">
        <div>
          <p className="section-eyebrow">KIND WORDS, PERSONAL STYLE</p>
          <h2>
            A little love
            <br />
            <em>for the way we dress.</em>
          </h2>
        </div>

        <p className="reviews-heading-note">
          Style is personal. Finding inspiration should feel effortless.
        </p>
      </div>

      <div className="reviews-grid">
        {reviews.map((review) => (
          <article className="review-card" key={review.initials}>
            <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: review.rating }, (_, index) => (
                <Star key={index} size={15} fill="currentColor" />
              ))}
            </div>

            <blockquote>“{review.review}”</blockquote>

            <div className="review-person">
              <div className="review-avatar">{review.initials}</div>
              <div>
                <h3>{review.name}</h3>
                <p>{review.label}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="reviews-disclaimer">
        Demo testimonials for preview — replace with verified customer reviews.
      </p>
    </section>
  );
}
