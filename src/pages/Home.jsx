import { Link } from "react-router-dom";
import { FiArrowRight, FiShield, FiTag, FiHeadphones } from "react-icons/fi";
import HeroSearchBar from "../components/HeroSearchBar";
import HotelCard from "../components/HotelCard";
import AnimatedCounter from "../components/AnimatedCounter";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import { destinations } from "../data/destinations";
import { hotels } from "../data/hotels";
import { offers } from "../data/offers";
import "./Home.css";

export default function Home() {
  const featured = [...hotels].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const topOffers = offers.slice(0, 3);

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero__overlay" />
        <div className="container-custom home-hero__content">
          <span className="eyebrow" style={{ color: "var(--color-secondary)" }}>Incredible Stays</span>
          <h1 className="home-hero__title font-display animate-fade-up">
            Find Your Perfect Stay <br /> Across India
          </h1>
          <p className="home-hero__subtitle animate-fade-up delay-1">
            Search hotels across India's most beautiful destinations — from palace suites to backwater retreats.
          </p>
          <HeroSearchBar />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="home-trust">
        <div className="container-custom home-trust__row">
          <div className="home-trust__item"><FiShield /> Verified Stays</div>
          <div className="home-trust__item"><FiTag /> Best Price Guarantee</div>
          <div className="home-trust__item"><FiHeadphones /> 24/7 Support</div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="section container-custom">
        <span className="eyebrow">Explore</span>
        <h2 className="section-title">Popular Destinations</h2>
        <p className="section-subtitle">
          Fifteen of India's most-loved getaways, each with its own character — pick where your next story begins.
        </p>
        <div className="destinations-grid">
          {destinations.map((d, i) => (
            <Link
              to={`/hotels?city=${encodeURIComponent(d.name)}`}
              key={d.id}
              className={`destination-card animate-fade-up delay-${(i % 4) + 1}`}
            >
              <img src={d.image} alt={d.name} loading="lazy" />
              <div className="destination-card__overlay">
                <h4>{d.name}</h4>
                <span>{d.hotels} hotels</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED HOTELS */}
      <section className="section container-custom" style={{ background: "var(--color-light-gray)", borderRadius: "var(--radius-lg)" }}>
        <div className="d-flex align-items-end justify-content-between flex-wrap gap-3 mb-2">
          <div>
            <span className="eyebrow">Handpicked</span>
            <h2 className="section-title">Featured Hotels</h2>
            <p className="section-subtitle mb-0">Our highest-rated properties, loved by travellers across India.</p>
          </div>
          <Link to="/hotels" className="btn-outline-custom d-none d-md-inline-flex align-items-center gap-2">
            View all hotels <FiArrowRight />
          </Link>
        </div>
        <div className="row g-4 mt-2">
          {featured.map((h) => (
            <div className="col-12 col-sm-6 col-lg-4" key={h.id}>
              <HotelCard hotel={h} />
            </div>
          ))}
        </div>
        <div className="text-center mt-4 d-md-none">
          <Link to="/hotels" className="btn-outline-custom">View all hotels</Link>
        </div>
      </section>

      {/* OFFERS TEASER */}
      <section className="section container-custom">
        <span className="eyebrow">Deals</span>
        <h2 className="section-title">Limited-Time Offers</h2>
        <p className="section-subtitle">Save more on your next escape with these curated packages.</p>
        <div className="row g-4">
          {topOffers.map((o) => (
            <div className="col-12 col-md-4" key={o.id}>
              <Link to="/offers" className="offer-teaser card-elevated">
                <img src={o.image} alt={o.title} loading="lazy" />
                <div className="offer-teaser__body">
                  <span className="badge-gold">{o.discount}% OFF</span>
                  <h5>{o.title}</h5>
                  <p>{o.subtitle}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="home-stats">
        <div className="container-custom home-stats__grid">
          <div className="home-stats__item">
            <h3><AnimatedCounter end={250000} suffix="+" /></h3>
            <span>Happy Customers</span>
          </div>
          <div className="home-stats__item">
            <h3><AnimatedCounter end={1200} suffix="+" /></h3>
            <span>Partner Hotels</span>
          </div>
          <div className="home-stats__item">
            <h3><AnimatedCounter end={80} suffix="+" /></h3>
            <span>Cities Covered</span>
          </div>
          <div className="home-stats__item">
            <h3><AnimatedCounter end={500000} suffix="+" /></h3>
            <span>Bookings Completed</span>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section container-custom">
        <div className="text-center">
          <span className="eyebrow" style={{ justifyContent: "center" }}>Testimonials</span>
          <h2 className="section-title">What Our Guests Say</h2>
        </div>
        <TestimonialsCarousel />
      </section>
    </div>
  );
}
