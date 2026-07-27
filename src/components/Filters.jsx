import { FiX } from "react-icons/fi";
import { amenitiesList, cities } from "../data/hotels";
import "./Filters.css";

export default function Filters({ filters, setFilters, onClear }) {
  const toggleAmenity = (a) => {
    setFilters((f) => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a],
    }));
  };

  return (
    <aside className="filters-panel card-elevated">
      <div className="filters-panel__header">
        <h5 className="font-display">Filters</h5>
        <button className="filters-panel__clear" onClick={onClear}>
          <FiX /> Clear all
        </button>
      </div>

      <div className="filters-panel__group">
        <label className="form-label-custom">City</label>
        <select
          className="form-select-custom"
          value={filters.city}
          onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
        >
          <option value="">All Cities</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="filters-panel__group">
        <label className="form-label-custom">Max price: ₹{Number(filters.maxPrice).toLocaleString("en-IN")}</label>
        <input
          type="range"
          min={5000}
          max={40000}
          step={500}
          value={filters.maxPrice}
          onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
          className="filters-panel__range"
        />
      </div>

      <div className="filters-panel__group">
        <label className="form-label-custom">Minimum rating</label>
        <div className="filters-panel__chip-row">
          {[4.5, 4, 3.5, 0].map((r) => (
            <button
              key={r}
              className={`filters-panel__chip ${filters.minRating === r ? "active" : ""}`}
              onClick={() => setFilters((f) => ({ ...f, minRating: r }))}
              type="button"
            >
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <div className="filters-panel__group">
        <label className="form-label-custom">Amenities</label>
        <div className="filters-panel__amenities">
          {amenitiesList.map((a) => (
            <label key={a} className="filters-panel__checkbox">
              <input
                type="checkbox"
                checked={filters.amenities.includes(a)}
                onChange={() => toggleAmenity(a)}
              />
              {a}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
