
import { useState } from "react";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import OutfitCard from "./OutfitCard";

const initialPreferences = {
  occasion: "",
  style: "",
  color: "",
  clothing: "",
};

const options = {
  occasion: ["Everyday", "Work", "Party", "Festive", "Vacation", "Date Night"],
  style: ["Minimalist", "Elegant", "Streetwear", "Bohemian"],
  color: ["Any", "Neutral", "Black", "Burgundy", "Pastel"],
  clothing: ["Any", "Western", "Ethnic"],
};

function PreferenceSelect({ label, name, value, options, onChange }) {
  return (
    <label className="preference-field">
      <span className="field-label">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="preference-select"
      >
        <option value="">Choose your preference</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "Any" ? "Surprise me / No preference" : option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function AIStylist({
  onGenerate,
  onSelect,
  recommendations = [],
}) {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setPreferences((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const isValid = Object.values(preferences).every(
      (value) => value.trim() !== ""
    );

    if (!isValid) {
      setError("Please select all four preferences before continuing.");
      return;
    }

    onGenerate(preferences);
  }

  function handleReset() {
    setPreferences(initialPreferences);
    setError("");
  }

  return (
    <section id="stylist" className="stylist-section">
      <div className="stylist-layout">
        <div className="stylist-copy">
          <p className="eyebrow eyebrow-light">
            <Sparkles size={15} /> YOUR PERSONAL STYLE ASSISTANT
          </p>

          <h2 className="stylist-title">
            Your taste.
            <br />
            Your rules.
            <br />
            <span>Your AI.</span>
          </h2>

          <p className="stylist-description">
            Tell us about your occasion, preferred style, colors, and clothing.
            Discover curated outfit recommendations made around your choices.
          </p>

          <div className="stylist-points">
            {[
              "Personalized outfit combinations",
              "Color-coordinated styling ideas",
              "Accessories and styling tips",
            ].map((item) => (
              <div className="stylist-point" key={item}>
                <span className="check-circle">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="stylist-form-wrap">
          <div className="stylist-form-header">
            <div>
              <span className="form-step">YOUR STYLE PROFILE</span>
              <h3>Let's get you dressed.</h3>
            </div>
            <Sparkles size={24} />
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="preference-grid">
              <PreferenceSelect
                label="01 — THE OCCASION"
                name="occasion"
                value={preferences.occasion}
                options={options.occasion}
                onChange={handleChange}
              />

              <PreferenceSelect
                label="02 — YOUR STYLE"
                name="style"
                value={preferences.style}
                options={options.style}
                onChange={handleChange}
              />

              <PreferenceSelect
                label="03 — COLOR PALETTE"
                name="color"
                value={preferences.color}
                options={options.color}
                onChange={handleChange}
              />

              <PreferenceSelect
                label="04 — CLOTHING TYPE"
                name="clothing"
                value={preferences.clothing}
                options={options.clothing}
                onChange={handleChange}
              />
            </div>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="reset-button"
                onClick={handleReset}
              >
                <RotateCcw size={15} /> Reset
              </button>

              <button type="submit" className="button-dark generate-button">
                <Sparkles size={17} />
                Generate my looks
                <ArrowRight size={17} />
              </button>
            </div>

            <p className="form-disclaimer">
              Curated recommendations using demo outfit data
            </p>
          </form>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div id="recommendations" className="recommendations-area">
          <div className="recommendations-heading">
            <div>
              <p className="eyebrow eyebrow-light">YOUR PERSONAL EDIT</p>
              <h3>
                A look that's <span>so you.</span>
              </h3>
              <p>
                Explore your outfit recommendations and find the details that
                complete your look.
              </p>
            </div>

            <button
              type="button"
              className="button-outline-light"
              onClick={() => onGenerate(preferences, true)}
            >
              <RotateCcw size={16} /> Generate new look
            </button>
          </div>

          <div className="outfit-grid">
            {recommendations.map((outfit, index) => (
              <OutfitCard
                key={`${outfit.id}-${index}`}
                outfit={outfit}
                index={index}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
