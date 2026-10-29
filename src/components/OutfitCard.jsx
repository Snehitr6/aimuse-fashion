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

const HeartIcon = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
  </svg>
);

export default function OutfitCard({
  outfit,
  onSelect,
  index = 0,
  saved = false,
  onToggleSave,
}) {
  if (!outfit) return null;

  return (
    <article
      className="outfit-card"
      style={{ "--card-index": index }}
    >
      <div className="outfit-image-wrap">
        <img
          src={outfit.image}
          alt={outfit.name}
          className="outfit-image"
          loading="lazy"
        />

        <span className="outfit-category">{outfit.category}</span>

        <button
          type="button"
          className={`favorite-button ${saved ? "is-saved" : ""}`}
          aria-label={saved ? `Remove ${outfit.name} from wishlist` : `Save ${outfit.name} to wishlist`}
          aria-pressed={saved}
          onClick={() => onToggleSave?.(outfit)}
        >
          <HeartIcon filled={saved} />
        </button>

        <button
          type="button"
          className="image-view-button"
          onClick={() => onSelect?.(outfit)}
        >
          View the look <ArrowIcon />
        </button>
      </div>

      <div className="outfit-card-content">
        <div className="outfit-card-heading">
          <div>
            <p className="outfit-subtitle">✧ THE STYLE EDIT</p>
            <h3>{outfit.name}</h3>
          </div>

          <span className="outfit-price">
            ₹{Number(outfit.price || 0).toLocaleString("en-IN")}
          </span>
        </div>

        <p className="outfit-description">{outfit.description}</p>

        <div className="outfit-swatches">
          {(outfit.colors || []).map((color, colorIndex) => (
            <span
              key={`${color}-${colorIndex}`}
              className="color-swatch"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}

          <span className="swatch-label">Color story</span>
        </div>

        <button
          type="button"
          className="outfit-details-link"
          onClick={() => onSelect?.(outfit)}
        >
          Explore outfit <ArrowIcon />
        </button>
      </div>
    </article>
  );
}