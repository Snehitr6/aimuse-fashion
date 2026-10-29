import { useEffect, useState } from "react";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12 4 4L19 6" />
  </svg>
);

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  pincode: "",
  payment: "upi",
};

export default function OutfitDetails({ outfit, onClose }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [step, setStep] = useState("details");
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const [orderReference, setOrderReference] = useState("");

  useEffect(() => {
    if (!outfit) return;

    setSelectedColor(outfit.colors?.[0] || "");
    setStep("details");
    setForm(initialForm);
    setFormError("");
    setOrderReference("");
  }, [outfit]);

  useEffect(() => {
    if (!outfit) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && step !== "success") {
        if (step === "checkout") {
          setStep("details");
          setFormError("");
        } else {
          onClose?.();
        }
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [outfit, step, onClose]);

  if (!outfit) return null;

  const price = Number(outfit.price || 0);
  const formatPrice = (amount) =>
    `₹${Number(amount).toLocaleString("en-IN")}`;

  const selectedColorName =
    selectedColor
      ? selectedColor.replace("#", "").toUpperCase()
      : "Original palette";

  function updateForm(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
  }

  function startCheckout() {
    if (!selectedColor) {
      setFormError("Please select a color before continuing.");
      return;
    }

    setFormError("");
    setStep("checkout");
  }

  function placeDemoOrder(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() ||
        !form.phone.trim() || !form.address.trim() ||
        !form.city.trim() || !form.pincode.trim()) {
      setFormError("Please complete all delivery details.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.phone.replace(/\s/g, ""))) {
      setFormError("Enter a valid 10-digit phone number.");
      return;
    }

    if (!/^[0-9]{6}$/.test(form.pincode)) {
      setFormError("Enter a valid 6-digit PIN code.");
      return;
    }

    // Front-end demonstration only; no real payment is processed.
    const reference = `MUSE-${Date.now().toString().slice(-8)}`;

    setOrderReference(reference);
    setFormError("");
    setStep("success");
  }

  return (
    <div
      className="outfit-modal-backdrop"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          step !== "success"
        ) {
          if (step === "checkout") {
            setStep("details");
            setFormError("");
          } else {
            onClose?.();
          }
        }
      }}
    >
      <section
        className={`outfit-modal ${step !== "details" ? "outfit-modal-checkout" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="outfit-detail-title"
      >
        {step !== "success" && (
          <button
            type="button"
            className="modal-close"
            onClick={() => {
              if (step === "checkout") {
                setStep("details");
                setFormError("");
              } else {
                onClose?.();
              }
            }}
            aria-label={step === "checkout" ? "Back to outfit" : "Close outfit details"}
          >
            {step === "checkout" ? "←" : "×"}
          </button>
        )}

        {step === "details" && (
          <>
            <div className="outfit-modal-image">
              <img src={outfit.image} alt={outfit.name} />
              <span className="outfit-category">{outfit.category}</span>
            </div>

            <div className="outfit-modal-content">
              <p className="eyebrow">THE PERSONAL STYLE EDIT</p>
              <h2 id="outfit-detail-title">{outfit.name}</h2>
              <p className="outfit-modal-price">{formatPrice(price)}</p>
              <p className="outfit-modal-description">{outfit.description}</p>

              <div className="outfit-modal-tags">
                {[outfit.occasion, outfit.style, outfit.clothing]
                  .filter(Boolean)
                  .map((tag) => <span key={tag}>{tag}</span>)}
              </div>

              <div className="outfit-modal-divider" />

              <div className="outfit-detail-group">
                <h3>THE LOOK INCLUDES</h3>
                <ul>
                  {(outfit.items || []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {outfit.accessories?.length > 0 && (
                <div className="outfit-detail-group">
                  <h3>ACCESSORIES</h3>
                  <ul>
                    {outfit.accessories.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="outfit-detail-group">
                <h3>CHOOSE YOUR COLOR</h3>
                <p className="selected-color-label">
                  Selected: <strong>{selectedColorName}</strong>
                </p>

                <div className="outfit-modal-swatches">
                  {(outfit.colors || []).map((color, index) => (
                    <button
                      type="button"
                      key={`${color}-${index}`}
                      className={`color-swatch color-swatch-button ${
                        selectedColor === color ? "color-swatch-selected" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      title={`Choose color ${color}`}
                      aria-label={`Choose color ${color}`}
                      aria-pressed={selectedColor === color}
                      onClick={() => {
                        setSelectedColor(color);
                        setFormError("");
                      }}
                    />
                  ))}
                </div>
              </div>

              {outfit.tip && (
                <div className="outfit-styling-tip">
                  <span className="outfit-tip-icon">✧</span>
                  <div>
                    <h3>THE STYLIST'S NOTE</h3>
                    <p>{outfit.tip}</p>
                  </div>
                </div>
              )}

              {formError && (
                <p className="checkout-error" role="status">{formError}</p>
              )}

              <button
                type="button"
                className="button-dark outfit-modal-done"
                onClick={startCheckout}
              >
                Proceed to checkout <ArrowIcon />
              </button>
            </div>
          </>
        )}

        {step === "checkout" && (
          <div className="checkout-screen">
            <p className="eyebrow">AI MUSE · SECURE-STYLE CHECKOUT DEMO</p>
            <h2 id="outfit-detail-title">Make it yours.</h2>
            <p className="checkout-intro">
              Complete your details and choose a payment option to preview the order confirmation.
            </p>

            <div className="checkout-order-summary">
              <img src={outfit.image} alt={outfit.name} />
              <div className="checkout-order-info">
                <strong>{outfit.name}</strong>
                <span>Color: {selectedColorName}</span>
                <span>{outfit.category} · {outfit.style}</span>
              </div>
              <strong>{formatPrice(price)}</strong>
            </div>

            <form onSubmit={placeDemoOrder} noValidate>
              <h3>DELIVERY DETAILS</h3>

              <div className="checkout-form-grid">
                <label>
                  Full name
                  <input name="name" value={form.name} onChange={updateForm}
                    autoComplete="name" placeholder="Your full name" required />
                </label>

                <label>
                  Email address
                  <input name="email" type="email" value={form.email}
                    onChange={updateForm} autoComplete="email"
                    placeholder="you@example.com" required />
                </label>

                <label>
                  Phone number
                  <input name="phone" type="tel" value={form.phone}
                    onChange={updateForm} autoComplete="tel"
                    inputMode="numeric" maxLength={10}
                    placeholder="10-digit mobile number" required />
                </label>

                <label>
                  PIN code
                  <input name="pincode" value={form.pincode}
                    onChange={updateForm} autoComplete="postal-code"
                    inputMode="numeric" maxLength={6}
                    placeholder="6-digit PIN code" required />
                </label>

                <label className="checkout-full-width">
                  Delivery address
                  <textarea name="address" value={form.address}
                    onChange={updateForm} autoComplete="street-address"
                    placeholder="House number, street and area" rows={2} required />
                </label>

                <label className="checkout-full-width">
                  City
                  <input name="city" value={form.city} onChange={updateForm}
                    autoComplete="address-level2" placeholder="Your city" required />
                </label>
              </div>

              <h3 className="payment-heading">PAYMENT OPTION</h3>

              <div className="payment-options">
                {[
                  { value: "upi", title: "UPI", detail: "Demo payment selection" },
                  { value: "card", title: "Credit / debit card", detail: "Demo payment selection" },
                  { value: "cod", title: "Cash on delivery", detail: "Pay on delivery · demo" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`payment-option ${
                      form.payment === option.value ? "payment-option-active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={option.value}
                      checked={form.payment === option.value}
                      onChange={updateForm}
                    />
                    <span>
                      <strong>{option.title}</strong>
                      <small>{option.detail}</small>
                    </span>
                  </label>
                ))}
              </div>

              <p className="checkout-demo-note">
                Demo only: no real payment is taken, no card or UPI credentials are requested, and no order is sent to a server.
              </p>

              {formError && (
                <p className="checkout-error" role="status">{formError}</p>
              )}

              <div className="checkout-total">
                <span>Total</span>
                <strong>{formatPrice(price)}</strong>
              </div>

              <button type="submit" className="button-dark checkout-submit">
                Confirm demo order <ArrowIcon />
              </button>

              <button
                type="button"
                className="checkout-back"
                onClick={() => {
                  setStep("details");
                  setFormError("");
                }}
              >
                Back to outfit details
              </button>
            </form>
          </div>
        )}

        {step === "success" && (
          <div className="checkout-success" aria-live="polite">
            <div className="success-icon"><CheckIcon /></div>
            <p className="eyebrow">YOUR STYLE JOURNEY CONTINUES</p>
            <h2 id="outfit-detail-title">Order preview successful!</h2>
            <p>
              Thank you, {form.name.trim()}. Your AI Muse demo order has been confirmed in this session.
            </p>

            <div className="success-reference">
              <span>DEMO ORDER REFERENCE</span>
              <strong>{orderReference}</strong>
            </div>

            <div className="success-order-summary">
              <span>{outfit.name}</span>
              <span>{formatPrice(price)}</span>
            </div>
            <div className="success-order-summary">
              <span>Selected color</span>
              <span className="success-color">
                <span
                  className="color-swatch"
                  style={{ backgroundColor: selectedColor }}
                />
                {selectedColorName}
              </span>
            </div>
            <div className="success-order-summary">
              <span>Payment option</span>
              <span>
                {form.payment === "upi"
                  ? "UPI (demo)"
                  : form.payment === "card"
                    ? "Card (demo)"
                    : "Cash on delivery (demo)"}
              </span>
            </div>

            <p className="checkout-demo-note">
              This is a front-end demonstration. No payment was processed and no real order was placed.
            </p>

            <button
              type="button"
              className="button-dark checkout-submit"
              onClick={onClose}
            >
              Continue exploring <ArrowIcon />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}