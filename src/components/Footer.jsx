import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMapPin, FiMail, FiPhone, FiSend } from "react-icons/fi";
import { useToast } from "../context/ToastContext";
import "./Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    showToast("You're subscribed! Watch your inbox for exclusive deals.", "success");
    setEmail("");
  };

  return (
    <footer className="is-footer">
      <div className="container-custom is-footer__top">
        <div className="is-footer__col is-footer__brand">
          <div className="is-navbar__logo mb-3">
            <span className="is-navbar__logo-mark">IS</span>
            <span className="is-navbar__logo-text font-display" style={{ color: "#fff" }}>Incredible Stays</span>
          </div>
          <p className="is-footer__about">
            Discover and book India's finest hotels, resorts and heritage palaces — curated stays for every kind of traveller.
          </p>
          <div className="is-footer__social">
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="https://www.instagram.com/rohan_tarade2210/" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="Youtube"><FiYoutube /></a>
          </div>
        </div>

        <div className="is-footer__col">
          <h6>Quick Links</h6>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/hotels">Hotels</NavLink>
          <NavLink to="/offers">Offers</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <div className="is-footer__col">
          <h6>Popular Cities</h6>
          <NavLink to="/hotels?city=Goa">Goa</NavLink>
          <NavLink to="/hotels?city=Jaipur">Jaipur</NavLink>
          <NavLink to="/hotels?city=Udaipur">Udaipur</NavLink>
          <NavLink to="/hotels?city=Mumbai">Mumbai</NavLink>
          <NavLink to="/hotels?city=New Delhi">New Delhi</NavLink>
        </div>

        <div className="is-footer__col">
          <h6>Support</h6>
          <NavLink to="/faq">FAQs</NavLink>
          <NavLink to="/contact">Help Centre</NavLink>
          <a href="#">Cancellation Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>

        <div className="is-footer__col">
          <h6>Newsletter</h6>
          <p className="is-footer__about">Get exclusive offers and travel inspiration straight to your inbox.</p>
          <form className="is-footer__newsletter" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" aria-label="Subscribe"><FiSend /></button>
          </form>
          <div className="is-footer__contact-info">
            <span><FiMapPin /> Pune, Maharashtra, India</span>
            <span><FiMail /> hello@incrediblestays.in</span>
            <span><FiPhone /> +91 801073 xxxxx</span>
          </div>
        </div>
      </div>

      <div className="is-footer__bottom">
        <div className="container-custom is-footer__bottom-inner">
          <span>&copy; {new Date().getFullYear()} Incredible Stays. All rights reserved.</span>
          <span>Designed & built by @Rohan Tarade</span>
        </div>
      </div>
    </footer>
  );
}
