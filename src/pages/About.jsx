import { FiTarget, FiHeart, FiAward, FiUsers } from "react-icons/fi";
import AnimatedCounter from "../components/AnimatedCounter";
import "./About.css";

const values = [
  { icon: <FiTarget />, title: "Our Mission", text: "To make discovering and booking India's finest stays effortless, transparent and inspiring for every traveller." },
  { icon: <FiHeart />, title: "Guest First", text: "Every property on our platform is vetted for comfort, service and authenticity before it earns a place here." },
  { icon: <FiAward />, title: "Curated Quality", text: "From heritage palaces to boutique hideaways, we only feature stays that meet our premium standards." },
  { icon: <FiUsers />, title: "Community Driven", text: "Real reviews from real travellers guide every recommendation we make." },
];

export default function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero__overlay" />
        <div className="container-custom about-hero__content">
          <span className="eyebrow" style={{ color: "var(--color-secondary)" }}>About Us</span>
          <h1 className="font-display">Crafting Unforgettable Stays Across India</h1>
          <p>Since our founding, Incredible Stays has connected travellers with India's most remarkable hotels, resorts and heritage properties.</p>
        </div>
      </div>

      <section className="section container-custom">
        <div className="about-story">
          <div>
            <span className="eyebrow">Our Story</span>
            <h2 className="section-title">Built by travellers, for travellers</h2>
            <p className="about-story__text">
              Incredible Stays began with a simple frustration: finding a genuinely great hotel in India often meant
              sifting through cluttered listings and inconsistent pricing. We set out to build a platform that feels
              as premium as the properties it lists — clean, honest, and inspiring.
            </p>
            <p className="about-story__text">
              Today, we partner with over a thousand hotels across eighty-plus cities, from Himalayan retreats to
              backwater resorts, palace hotels to modern business stays — helping travellers find not just a room,
              but the right stay for every journey.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80"
            alt="Luxury hotel lobby"
            className="about-story__image"
          />
        </div>
      </section>

      <section className="home-stats">
        <div className="container-custom home-stats__grid">
          <div className="home-stats__item">
            <h3><AnimatedCounter end={250000} suffix="+" /></h3>
            <span>Happy Customers</span>
          </div>
          <div className="home-stats__item">
            <h3><AnimatedCounter end={1200} suffix="+" /></h3>
            <span>Hotels</span>
          </div>
          <div className="home-stats__item">
            <h3><AnimatedCounter end={80} suffix="+" /></h3>
            <span>Cities</span>
          </div>
          <div className="home-stats__item">
            <h3><AnimatedCounter end={500000} suffix="+" /></h3>
            <span>Bookings</span>
          </div>
        </div>
      </section>

      <section className="section container-custom">
        <div className="text-center mb-4">
          <span className="eyebrow" style={{ justifyContent: "center" }}>What Drives Us</span>
          <h2 className="section-title">Our Values</h2>
        </div>
        <div className="row g-4">
          {values.map((v) => (
            <div className="col-12 col-sm-6 col-lg-3" key={v.title}>
              <div className="about-value-card card-elevated">
                <div className="about-value-card__icon">{v.icon}</div>
                <h5>{v.title}</h5>
                <p>{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
