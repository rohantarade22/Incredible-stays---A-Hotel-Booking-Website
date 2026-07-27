import { Link } from "react-router-dom";
import { FiHeart, FiArrowRight, FiClock } from "react-icons/fi";
import { hotels, getHotelById } from "../data/hotels";
import { useApp } from "../context/AppContext";
import HotelCard from "../components/HotelCard";
import "./Wishlist.css";

export default function Wishlist() {
  const { wishlist, recentlyViewed } = useApp();
  const wishlistedHotels = hotels.filter((h) => wishlist.includes(h.id));
  const recentHotels = recentlyViewed.map((id) => getHotelById(id)).filter(Boolean);

  return (
    <div className="wishlist-page">
      <div className="wishlist-page__hero container-custom">
        <h1 className="font-display">Your Wishlist</h1>
        <p>All the stays you've saved for later, in one place.</p>
      </div>

      <div className="container-custom section-sm">
        {wishlistedHotels.length === 0 ? (
          <div className="wishlist-page__empty">
            <FiHeart size={46} />
            <h4>Your wishlist is empty</h4>
            <p>Tap the heart icon on any hotel to save it here for later.</p>
            <Link to="/hotels" className="btn-gradient">Browse Hotels <FiArrowRight /></Link>
          </div>
        ) : (
          <div className="row g-4">
            {wishlistedHotels.map((h) => (
              <div className="col-12 col-sm-6 col-lg-4" key={h.id}>
                <HotelCard hotel={h} />
              </div>
            ))}
          </div>
        )}
      </div>

      {recentHotels.length > 0 && (
        <div className="container-custom section-sm">
          <div className="d-flex align-items-center gap-2 mb-4">
            <FiClock className="text-primary-custom" />
            <h4 className="mb-0">Recently Viewed</h4>
          </div>
          <div className="row g-4">
            {recentHotels.map((h) => (
              <div className="col-12 col-sm-6 col-lg-4" key={h.id}>
                <HotelCard hotel={h} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
