import { Link } from "react-router-dom";
import { FiStar, FiHeart, FiMapPin } from "react-icons/fi";
import { getAmenityIcon } from "./amenityIcons";
import { useApp } from "../context/AppContext";
import { useToast } from "../context/ToastContext";
import "./HotelCard.css";

export default function HotelCard({ hotel }) {
  const { isWishlisted, toggleWishlist } = useApp();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(hotel.id);

  const finalPrice = Math.round(hotel.price * (1 - (hotel.discount || 0) / 100));

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(hotel.id);
    showToast(
      wishlisted ? `Removed ${hotel.name} from wishlist` : `Added ${hotel.name} to wishlist`,
      wishlisted ? "info" : "success"
    );
  };

  return (
    <Link to={`/hotels/${hotel.id}`} className="hotel-card card-elevated">
      <div className="hotel-card__image-wrap">
        <img src={hotel.gallery[0]} alt={hotel.name} loading="lazy" className="hotel-card__image" />
        <div className="hotel-card__top-row">
          {hotel.tag && <span className="badge-gold">{hotel.tag}</span>}
          <button
            className={`hotel-card__wishlist ${wishlisted ? "hotel-card__wishlist--active" : ""}`}
            onClick={handleWishlist}
            aria-label="Toggle wishlist"
          >
            <FiHeart />
          </button>
        </div>
        {hotel.discount > 0 && <span className="hotel-card__discount">{hotel.discount}% OFF</span>}
      </div>

      <div className="hotel-card__body">
        <div className="hotel-card__header">
          <h3 className="hotel-card__name">{hotel.name}</h3>
          <span className="rating-pill"><FiStar /> {hotel.rating}</span>
        </div>
        <p className="hotel-card__location"><FiMapPin /> {hotel.city}, {hotel.state}</p>
        <p className="hotel-card__reviews">{hotel.reviewsCount.toLocaleString()} reviews</p>

        <div className="hotel-card__amenities">
          {hotel.amenities.slice(0, 5).map((a) => (
            <span key={a} className="hotel-card__amenity" title={a}>{getAmenityIcon(a)}</span>
          ))}
          {hotel.amenities.length > 5 && <span className="hotel-card__amenity-more">+{hotel.amenities.length - 5}</span>}
        </div>

        <div className="hotel-card__footer">
          <div className="hotel-card__price">
            {hotel.discount > 0 && <span className="hotel-card__price-old">₹{hotel.price.toLocaleString("en-IN")}</span>}
            <span className="hotel-card__price-new">₹{finalPrice.toLocaleString("en-IN")}</span>
            <span className="hotel-card__price-night">/ night</span>
          </div>
          <span className="btn-gradient hotel-card__book-btn">Book Now</span>
        </div>
      </div>
    </Link>
  );
}
