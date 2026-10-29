const SocialIcon = ({ type }) => {
  const paths = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="6" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="0.8" fill="currentColor" />
      </>
    ),
    facebook: (
      <path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4C17.3 1.2 16.3 1 15 1c-3.3 0-5 2-5 5.5V9H7v4h3v8z" />
    ),
    youtube: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
      </>
    ),
    x: (
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.4L5.5 22H2.3l7.3-8.4L1.8 2h6.4l4.4 6.9zM17.8 20h1.7L7.3 3.9H5.5z" />
    ),
    pinterest: (
      <path d="M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.8.2-2.7l1.3-5.5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 2 1.6 2 1.9 0 3.4-2.5 3.4-5.5 0-2.3-1.6-4-4.3-4-3.1 0-5 2.3-5 4.8 0 .9.3 1.9.8 2.4.2.3.3.4.2.7l-.3 1c-.1.3-.3.4-.6.3-1.3-.5-1.9-2-1.9-3.7 0-2.8 2.4-6.2 7.1-6.2 3.8 0 6.3 2.8 6.3 5.8 0 4-2.2 7-5.4 7-1.1 0-2.1-.6-2.5-1.3l-.7 2.7c-.3 1-.9 2-1.4 2.8A10 10 0 1 0 12 2z" />
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  );
};

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

const footerLinks = {
  Explore: [
    { label: "Home", href: "#home" },
    { label: "Collections", href: "#categories" },
    { label: "Trending Looks", href: "#trending" },
    { label: "AI Stylist", href: "#stylist" },
  ],
  Categories: [
    { label: "Casual Wear", href: "#categories" },
    { label: "Formal Wear", href: "#categories" },
    { label: "Party Wear", href: "#categories" },
    { label: "Traditional Wear", href: "#categories" },
  ],
  Discover: [
    { label: "Style Inspiration", href: "#trending" },
    { label: "Personal Styling", href: "#stylist" },
    { label: "Find Your Look", href: "#stylist" },
  ],
};

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            <span className="footer-logo-icon" aria-hidden="true">✧</span>
            <span>
              AI <strong>MUSE</strong>
              <small>YOUR PERSONAL STYLE EDIT</small>
            </span>
          </a>

          <p className="footer-description">
            Discover your personal style with curated outfit inspiration
            and personalized fashion recommendations.
          </p>

          <a href="#stylist" className="footer-cta">
            Discover your style <ArrowIcon />
          </a>

          <div className="footer-socials">
            {[
              ["instagram", "Instagram", "https://www.instagram.com/"],
              ["facebook", "Facebook", "https://www.facebook.com/"],
              ["youtube", "YouTube", "https://www.youtube.com/"],
              ["x", "X", "https://x.com/"],
              ["pinterest", "Pinterest", "https://www.pinterest.com/"],
            ].map(([type, label, href]) => (
              <a
                href={href}
                key={type}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
              >
                <SocialIcon type={type} />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([heading, links]) => (
          <div className="footer-column" key={heading}>
            <h3>{heading}</h3>
            {links.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </div>
        ))}

        <div className="footer-contact">
          <h3>Get in touch</h3>
          <p><span aria-hidden="true">✉</span> Your next look starts here.</p>
          <p><span aria-hidden="true">⌖</span> Fashion inspiration, wherever you are.</p>
          <p><span aria-hidden="true">♡</span> Made for your personal style.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} AI Muse. All rights reserved.</p>
        <p className="footer-made">Made with <span>♥</span> for fashion lovers</p>
        <a href="#home" className="footer-back-top">Back to top ↑</a>
      </div>
    </footer>
  );
}