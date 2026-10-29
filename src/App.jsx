
import { useCallback, useEffect, useMemo, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FashionCategories from "./components/FashionCategories";
import OutfitCard from "./components/OutfitCard";
import AIStylist from "./components/AIStylist";
import OutfitDetails from "./components/OutfitDetails";
import Footer from "./components/Footer";
import WhyChooseUs from "./components/WhyChooseUs";
import CustomerReviews from "./components/CustomerReviews";
import FAQ from "./components/FAQ";
import useScrollReveal from "./hooks/useScrollReveal";
import IntroLoader from "./components/IntroLoader";

import { outfits } from "./data/outfits";

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="17"
    height="17"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

const SparkleIcon = ({ size = 17 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3Z" />
  </svg>
);

const categories = [
  "All",
  "Casual",
  "Formal",
  "Party",
  "Streetwear",
  "Traditional",
  "Seasonal",
];

export default function App() {
  useScrollReveal();

  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [recommendations, setRecommendations] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [notice, setNotice] = useState("");

  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem("ai-muse-wishlist");
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("ai-muse-wishlist", JSON.stringify(wishlist));
    } catch {
      // The wishlist still works for this session if storage is unavailable.
    }
  }, [wishlist]);

  useEffect(() => {
    if (!notice) return undefined;

    const timeout = window.setTimeout(() => setNotice(""), 2500);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const savedIds = useMemo(
    () => new Set(wishlist),
    [wishlist]
  );

  const displayedOutfits = useMemo(() => {
    let result = outfits.filter((outfit) => {
      if (showWishlist) return savedIds.has(outfit.id);

      return (
        activeCategory === "All" ||
        outfit.category === activeCategory
      );
    });

    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [activeCategory, showWishlist, savedIds, sortBy]);

  const visibleOutfits = showAll
    ? displayedOutfits
    : displayedOutfits.slice(0, 3);

  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const handleCategorySelect = useCallback(
    (category) => {
      setActiveCategory(category);
      setShowWishlist(false);
      setShowAll(true);
      scrollToSection("trending");
    },
    [scrollToSection]
  );

  const toggleWishlist = useCallback((outfit) => {
    const isSaved = wishlist.includes(outfit.id);

    setWishlist((current) =>
      current.includes(outfit.id)
        ? current.filter((id) => id !== outfit.id)
        : [...current, outfit.id]
    );

    setNotice(
      isSaved
        ? `${outfit.name} removed from your wishlist.`
        : `${outfit.name} added to your wishlist.`
    );
  }, [wishlist]);

  const generateRecommendations = useCallback(
    (preferences, shuffle = false) => {
      const occasionMatches = (outfit) =>
        outfit.occasion === preferences.occasion ||
        (preferences.occasion === "Party" &&
          outfit.occasion === "Date Night") ||
        (preferences.occasion === "Date Night" &&
          outfit.occasion === "Party");

      const matches = outfits.filter((outfit) => {
        const styleMatch =
          outfit.style === preferences.style ||
          (preferences.style === "Streetwear" &&
            outfit.category === "Streetwear");

        const colorMatch =
          preferences.color === "Any" ||
          outfit.color === preferences.color;

        const clothingMatch =
          preferences.clothing === "Any" ||
          outfit.clothing === preferences.clothing;

        return (
          occasionMatches(outfit) &&
          styleMatch &&
          colorMatch &&
          clothingMatch
        );
      });

      let results = matches;

      // Relax style and color preferences if no exact matches exist.
      if (!results.length) {
        results = outfits.filter(
          (outfit) =>
            occasionMatches(outfit) &&
            (preferences.clothing === "Any" ||
              outfit.clothing === preferences.clothing)
        );
      }

      if (!results.length) {
        results = outfits.filter(
          (outfit) =>
            preferences.clothing === "Any" ||
            outfit.clothing === preferences.clothing
        );
      }

      if (!results.length) results = [...outfits];

      results = [...results];

      if (shuffle && results.length > 1) {
        const previousFirstId = recommendations[0]?.id;
        const nextIndex = results.findIndex(
          (outfit) => outfit.id !== previousFirstId
        );

        if (nextIndex > 0) {
          const [next] = results.splice(nextIndex, 1);
          results.unshift(next);
        } else {
          results.reverse();
        }
      }

      setRecommendations(results.slice(0, 3));

      window.setTimeout(() => {
        scrollToSection("recommendations");
      }, 50);
    },
    [recommendations, scrollToSection]
  );

  const toggleWishlistView = () => {
    setShowWishlist((current) => !current);
    setShowAll(true);
    setActiveCategory("All");
    scrollToSection("trending");
  };

  return (
    <>
    <IntroLoader />

      <Navbar />

      <main>
        <Hero />

        <div className="marquee-strip" aria-label="AI Muse style values">
          <div className="marquee-track">
            {[0, 1].map((item) => (
              <span className="marquee-group" key={item}>
                PERSONAL STYLE <SparkleIcon size={15} />
                EVERYDAY ELEGANCE <SparkleIcon size={15} />
                MADE FOR YOU <SparkleIcon size={15} />
                WEAR WHAT MOVES YOU <SparkleIcon size={15} />
              </span>
            ))}
          </div>
        </div>

        <FashionCategories onSelectCategory={handleCategorySelect} />

        <section id="trending" className="section section-white">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                {showWishlist ? "YOUR SAVED COLLECTION" : "THE STYLE JOURNAL"}
              </p>

              <h2 className="section-title">
                {showWishlist ? (
                  <>Looks you've <span>saved.</span></>
                ) : (
                  <>Looks worth <span>loving.</span></>
                )}
              </h2>

              <p className="section-intro">
                {showWishlist
                  ? "Your favorite outfit ideas, all in one place."
                  : "A little inspiration for whatever your day has in store."}
              </p>

              <p className="outfit-count" aria-live="polite">
                {displayedOutfits.length}{" "}
                {displayedOutfits.length === 1 ? "look" : "looks"} found
              </p>
            </div>

            <div className="collection-controls">
              <button
                type="button"
                className={`filter-pill ${
                  showWishlist ? "filter-pill-active" : ""
                }`}
                onClick={toggleWishlistView}
                aria-pressed={showWishlist}
              >
                ♡ Wishlist ({wishlist.length})
              </button>

              {!showWishlist && (
                <div className="filter-pills">
                  {categories.map((category) => (
                    <button
                      type="button"
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setShowAll(false);
                      }}
                      className={`filter-pill ${
                        activeCategory === category
                          ? "filter-pill-active"
                          : ""
                      }`}
                      aria-pressed={activeCategory === category}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              <label className="sort-control">
                <span>Sort by</span>
                <select
                  value={sortBy}
                  onChange={(event) => {
                    setSortBy(event.target.value);
                    setShowAll(true);
                  }}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="name">Name: A–Z</option>
                </select>
              </label>
            </div>
          </div>

          {visibleOutfits.length > 0 ? (
            <div className="outfit-grid">
              {visibleOutfits.map((outfit, index) => (
                <OutfitCard
                  key={outfit.id}
                  outfit={outfit}
                  index={index}
                  onSelect={setSelectedOutfit}
                  saved={savedIds.has(outfit.id)}
                  onToggleSave={() => toggleWishlist(outfit)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-wishlist">
              <span className="empty-wishlist-icon">♡</span>
              <h3>
                {showWishlist
                  ? "Your wishlist is waiting."
                  : "No looks found in this category."}
              </h3>
              <p>
                {showWishlist
                  ? "Save outfits using the heart icon to build your personal collection."
                  : "Try another category to discover more outfit inspiration."}
              </p>
              <button
                type="button"
                className="button-dark"
                onClick={() => {
                  setShowWishlist(false);
                  setActiveCategory("All");
                  setShowAll(true);
                }}
              >
                Explore all looks <ArrowIcon />
              </button>
            </div>
          )}

          {displayedOutfits.length > 3 && (
            <div className="trending-bottom">
              <p>
                Good style isn't about more clothes. It's about better combinations.
              </p>

              <button
                type="button"
                className="text-link"
                onClick={() => setShowAll((current) => !current)}
              >
                {showAll ? "Show fewer looks" : "View all inspiration"}
                <ArrowIcon />
              </button>
            </div>
          )}
        </section>

        {/* About AI MUSE */}
        <section id="about" className="editorial-section">
          <div className="editorial-image">
            <img
              src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=85"
              alt="Contemporary fashion collection"
              loading="lazy"
            />
          </div>

          <div className="editorial-copy">
            <p className="eyebrow">STYLE IS A FEELING</p>

            <h2>
              The best outfit is the one that feels <em>like you.</em>
            </h2>

            <p>
              Trends come and go. Personal style is how you make them your own.
              Explore combinations, discover new color stories and build a
              wardrobe that feels authentic to you.
            </p>

            <a href="#stylist" className="button-dark">
              Find your signature look <ArrowIcon />
            </a>
          </div>
        </section>

        {/* Why choose AI MUSE */}
        <WhyChooseUs />

        {/* AI Stylist and outfit recommendations */}
        <AIStylist
          onGenerate={generateRecommendations}
          onSelect={setSelectedOutfit}
          recommendations={recommendations}
        />

        {/* Customer testimonials */}
        <CustomerReviews />

        {/* Frequently asked questions */}
        <FAQ />

        {/* Final call to action */}
        <section className="closing-cta">
          <p className="eyebrow">YOUR NEXT LOOK STARTS HERE</p>

          <h2>
            Get dressed.
            <br />
            <span>Feel incredible.</span>
          </h2>

          <a href="#stylist" className="button-light">
            Meet your stylist <SparkleIcon size={17} />
          </a>
        </section>
      </main>

      <Footer />

      {selectedOutfit && (
        <OutfitDetails
          outfit={selectedOutfit}
          onClose={() => setSelectedOutfit(null)}
        />
      )}

      {notice && (
        <div className="app-live-message" role="status" aria-live="polite">
          <span>✓</span>
          {notice}
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
