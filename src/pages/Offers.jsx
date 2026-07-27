import { useState } from "react";
import { FiCopy, FiCheck, FiCalendar } from "react-icons/fi";
import { offers } from "../data/offers";
import { useToast } from "../context/ToastContext";
import "./Offers.css";

export default function Offers() {
  const { showToast } = useToast();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedCode(code);
    showToast(`Coupon code "${code}" copied!`, "success");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="offers-page">
      <div className="offers-hero container-custom">
        <span className="eyebrow" style={{ color: "var(--color-secondary)" }}>Deals & Packages</span>
        <h1 className="font-display">Exclusive Travel Offers</h1>
        <p>Hand-picked deals to make your next stay even more rewarding.</p>
      </div>

      <div className="container-custom section-sm">
        <div className="row g-4">
          {offers.map((o) => (
            <div className="col-12 col-md-6 col-lg-4" key={o.id}>
              <div className="offer-card card-elevated">
                <div className="offer-card__image-wrap">
                  <img src={o.image} alt={o.title} loading="lazy" />
                  <span className="badge-gold offer-card__badge">{o.discount}% OFF</span>
                </div>
                <div className="offer-card__body">
                  <span className="badge-soft mb-2 d-inline-block">{o.tag}</span>
                  <h4>{o.title}</h4>
                  <p className="offer-card__subtitle">{o.subtitle}</p>
                  <p className="offer-card__description">{o.description}</p>
                  <div className="offer-card__validity"><FiCalendar /> Valid till {new Date(o.validTill).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
                  <button className="offer-card__coupon" onClick={() => handleCopy(o.code)}>
                    <span>{o.code}</span>
                    {copiedCode === o.code ? <FiCheck /> : <FiCopy />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
