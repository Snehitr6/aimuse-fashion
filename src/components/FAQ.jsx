
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const questions = [
  {
    question: "What is AI MUSE?",
    answer:
      "AI MUSE is a fashion inspiration website where you can explore outfit ideas, browse styles for different occasions, save favourite looks, and use the AI Stylist section to discover recommendations.",
  },
  {
    question: "How do I find outfits for an occasion?",
    answer:
      "Visit Collections or Trending and explore categories such as Casual, Formal, Party, Streetwear, Traditional, and Seasonal.",
  },
  {
    question: "Can I save my favourite outfits?",
    answer:
      "Yes. Use the heart icon on an outfit card to add it to your wishlist. Your current website implementation can save these favourites in your browser.",
  },
  {
    question: "Does the AI Stylist sell clothes?",
    answer:
      "AI MUSE currently focuses on outfit inspiration and styling suggestions. Shopping and checkout features depend on the functionality you have implemented in your project.",
  },
  {
    question: "Can I use AI MUSE on my phone?",
    answer:
      "Yes. The website is designed to adapt to mobile, tablet, and desktop screen sizes.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-layout">
        <div className="faq-intro">
          <p className="section-eyebrow">A FEW THINGS TO KNOW</p>
          <h2>
            Good style.
            <br />
            <em>Good questions.</em>
          </h2>
          <p>
            Everything you need to know to start exploring your style with
            AI MUSE.
          </p>
          <a href="#stylist" className="faq-cta">
            Explore your style <span>↗</span>
          </a>
        </div>

        <div className="faq-list">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article className={`faq-item ${isOpen ? "faq-open" : ""}`} key={item.question}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    size={19}
                    className={isOpen ? "faq-chevron faq-chevron-open" : "faq-chevron"}
                  />
                </button>

                {isOpen && <p className="faq-answer">{item.answer}</p>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
