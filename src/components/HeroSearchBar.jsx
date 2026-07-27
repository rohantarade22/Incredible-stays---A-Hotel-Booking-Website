import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiUsers, FiSearch } from "react-icons/fi";
import { cities } from "../data/hotels";
import "./HeroSearchBar.css";

function todayStr(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
}

export default function HeroSearchBar() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(todayStr(1));
  const [checkOut, setCheckOut] = useState(todayStr(3));
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("city", destination);
    params.set("checkIn", checkIn);
    params.set("checkOut", checkOut);
    params.set("guests", guests);
    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <form className="hero-search glass-panel animate-fade-up delay-2" onSubmit={handleSubmit}>
      <div className="hero-search__field">
        <label><FiMapPin /> Destination</label>
        <input
          list="destination-list"
          placeholder="Where are you going?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <datalist id="destination-list">
          {cities.map((c) => <option key={c} value={c} />)}
        </datalist>
      </div>

      <div className="hero-search__divider" />

      <div className="hero-search__field">
        <label>Check-in</label>
        <input type="date" value={checkIn} min={todayStr()} onChange={(e) => setCheckIn(e.target.value)} />
      </div>

      <div className="hero-search__divider" />

      <div className="hero-search__field">
        <label>Check-out</label>
        <input type="date" value={checkOut} min={checkIn} onChange={(e) => setCheckOut(e.target.value)} />
      </div>

      <div className="hero-search__divider" />

      <div className="hero-search__field">
        <label><FiUsers /> Guests</label>
        <input type="number" min={1} max={10} value={guests} onChange={(e) => setGuests(e.target.value)} />
      </div>

      <button type="submit" className="btn-gold hero-search__submit">
        <FiSearch /> Search
      </button>
    </form>
  );
}
