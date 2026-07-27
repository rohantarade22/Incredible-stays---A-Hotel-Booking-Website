import { Link } from "react-router-dom";
import { FiHome, FiArrowLeft } from "react-icons/fi";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-page__content animate-fade-up">
        <span className="notfound-page__code font-display">404</span>
        <h2>Looks like this stay doesn't exist</h2>
        <p>The page you're looking for may have been moved or is no longer available.</p>
        <div className="notfound-page__actions">
          <Link to="/" className="btn-gradient"><FiHome /> Back to Home</Link>
          <Link to="/hotels" className="btn-outline-custom"><FiArrowLeft /> Browse Hotels</Link>
        </div>
      </div>
    </div>
  );
}
