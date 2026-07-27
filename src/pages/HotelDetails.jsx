import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  FiStar, FiMapPin, FiHeart, FiCheck, FiChevronLeft, FiChevronRight,
  FiShield, FiClock, FiXCircle,
} from "react-icons/fi";
import { getHotelById, hotels } from "../data/hotels";
import { getAmenityIcon } from "../components/amenityIcons";
import { useApp } from "../context/AppContext";
import { useToast } from "../context/ToastContext";
import HotelCard from "../components/HotelCard";
import "./HotelDetails.css";

export default function HotelDetails() {
  const { id } = useParams();
  const hotel = getHotelById(id);
  const { isWishlisted, toggleWishlist, addRecentlyViewed } = useApp();
  const { showToast } = useToast();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (hotel) {
      addRecentlyViewed(hotel.id);
      setActiveImage(0);
    }
    window.scrollTo(0, 0);
  }, [hotel]);

  if (!hotel) return <Navigate to="/404" replace />;

  const wishlisted = isWishlisted(hotel.id);
  const finalPrice = Math.round(hotel.price * (1 - (hotel.discount || 0) / 100));
  const related = hotels.filter((h) => h.city === hotel.city && h.id !== hotel.id).slice(0, 3);

  const handleWishlist = () => {
    toggleWishlist(hotel.id);
    showToast(wishlisted ? `Removed ${hotel.name} from wishlist` : `Added ${hotel.name} to wishlist`, wishlisted ? "info" : "success");
  };

  const nextImg = () => setActiveImage((i) => (i + 1) % hotel.gallery.length);
  const prevImg = () => setActiveImage((i) => (i - 1 + hotel.gallery.length) % hotel.gallery.length);

  return (
    <div className="hotel-details-page">
      {/* GALLERY */}
      <div className="container-custom hotel-details__gallery-wrap">
        <div className="hotel-details__gallery">
          <div className="hotel-details__main-image">
            <img src={hotel.gallery[activeImage]} alt={hotel.name} />
            <button className="hotel-details__gallery-nav left" onClick={prevImg} aria-label="Previous image"><FiChevronLeft /></button>
            <button className="hotel-details__gallery-nav right" onClick={nextImg} aria-label="Next image"><FiChevronRight /></button>
          </div>
          <div className="hotel-details__thumbs">
            {hotel.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${hotel.name} ${i + 1}`}
                className={i === activeImage ? "active" : ""}
                onClick={() => setActiveImage(i)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom hotel-details__body">
        <div className="hotel-details__main">
          {/* HEADER */}
          <div className="hotel-details__header">
            <div>
              {hotel.tag && <span className="badge-gold mb-2 d-inline-block">{hotel.tag}</span>}
              <h1 className="font-display">{hotel.name}</h1>
              <p className="hotel-details__location"><FiMapPin /> {hotel.city}, {hotel.state}, India</p>
            </div>
            <div className="hotel-details__header-actions">
              <span className="rating-pill"><FiStar /> {hotel.rating} ({hotel.reviewsCount.toLocaleString()} reviews)</span>
              <button
                className={`hotel-details__wishlist-btn ${wishlisted ? "active" : ""}`}
                onClick={handleWishlist}
              >
                <FiHeart /> {wishlisted ? "Saved" : "Save"}
              </button>
            </div>
          </div>

          {/* DESCRIPTION */}
          <section className="hotel-details__section">
            <h3>About this hotel</h3>
            <p className="hotel-details__description">{hotel.longDescription}</p>
          </section>

          {/* AMENITIES */}
          <section className="hotel-details__section">
            <h3>Amenities</h3>
            <div className="hotel-details__amenities-grid">
              {hotel.amenities.map((a) => (
                <div key={a} className="hotel-details__amenity">
                  {getAmenityIcon(a)} <span>{a}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ROOM TYPES */}
          <section className="hotel-details__section">
            <h3>Room Types</h3>
            <div className="hotel-details__rooms">
              {hotel.roomTypes.map((r, i) => (
                <div key={i} className="hotel-details__room-card">
                  <div>
                    <h5>{r.name}</h5>
                    <span className="hotel-details__room-meta">{r.size} • {r.beds} • Sleeps {r.occupancy}</span>
                  </div>
                  <div className="hotel-details__room-price">
                    <strong>₹{r.price.toLocaleString("en-IN")}</strong>
                    <span>/ night</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* MAP PLACEHOLDER */}
          <section className="hotel-details__section">
            <h3>Location</h3>
            <div className="hotel-details__map">
              <FiMapPin size={28} />
              <span>{hotel.city}, {hotel.state} — Lat {hotel.latitude.toFixed(3)}, Lng {hotel.longitude.toFixed(3)}</span>
            </div>
            <div className="hotel-details__nearby">
              {hotel.nearby.map((n) => <span key={n} className="badge-soft">{n}</span>)}
            </div>
          </section>

          {/* POLICIES */}
          <section className="hotel-details__section">
            <h3>Policies</h3>
            <div className="hotel-details__policies">
              <div><FiClock /> Check-in: 2:00 PM &nbsp;|&nbsp; Check-out: 11:00 AM</div>
              <div><FiShield /> Valid government photo ID required at check-in</div>
              <div><FiXCircle /> Free cancellation up to 48 hours before check-in</div>
            </div>
          </section>

          {/* REVIEWS */}
          <section className="hotel-details__section">
            <h3>Guest Reviews</h3>
            <div className="hotel-details__reviews">
              {hotel.reviews.map((r, i) => (
                <div key={i} className="hotel-details__review-card">
                  <div className="hotel-details__review-header">
                    <strong>{r.name}</strong>
                    <span className="rating-pill"><FiStar /> {r.rating}</span>
                  </div>
                  <p>{r.comment}</p>
                  <span className="hotel-details__review-date">{new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* BOOKING SIDEBAR */}
        <aside className="hotel-details__sidebar">
          <div className="hotel-details__booking-card card-elevated">
            <div className="hotel-details__price-row">
              {hotel.discount > 0 && <span className="hotel-details__price-old">₹{hotel.price.toLocaleString("en-IN")}</span>}
              <span className="hotel-details__price-new">₹{finalPrice.toLocaleString("en-IN")}</span>
              <span className="hotel-details__price-unit">/ night</span>
            </div>
            {hotel.discount > 0 && <span className="badge-gold">Save {hotel.discount}% today</span>}
            <ul className="hotel-details__quick-list">
              <li><FiCheck /> Free cancellation available</li>
              <li><FiCheck /> No prepayment needed for select rooms</li>
              <li><FiCheck /> Instant confirmation</li>
            </ul>
            <Link to={`/booking/${hotel.id}`} className="btn-gradient w-100 justify-content-center">Book Now</Link>
            <button className="btn-outline-custom w-100 justify-content-center mt-2" onClick={handleWishlist}>
              <FiHeart /> {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section container-custom">
          <h3 className="mb-4">More hotels in {hotel.city}</h3>
          <div className="row g-4">
            {related.map((h) => (
              <div className="col-12 col-sm-6 col-lg-4" key={h.id}>
                <HotelCard hotel={h} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
