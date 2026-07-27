import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiFilter, FiX, FiSearch } from "react-icons/fi";
import Filters from "../components/Filters";
import HotelCard from "../components/HotelCard";
import SkeletonCard from "../components/SkeletonCard";
import { hotels } from "../data/hotels";
import { useDebounce } from "../hooks/useDebounce";
import "./Hotels.css";

const defaultFilters = { city: "", maxPrice: 40000, minRating: 0, amenities: [] };

export default function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState({ ...defaultFilters, city: searchParams.get("city") || "" });
  const [sort, setSort] = useState("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [debouncedQuery, filters, sort]);

  useEffect(() => {
    const cityParam = searchParams.get("city");
    if (cityParam) setFilters((f) => ({ ...f, city: cityParam }));
  }, [searchParams]);

  const results = useMemo(() => {
    let list = hotels.filter((h) => {
      const matchesQuery =
        !debouncedQuery ||
        h.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        h.city.toLowerCase().includes(debouncedQuery.toLowerCase());
      const matchesCity = !filters.city || h.city === filters.city;
      const finalPrice = h.price * (1 - (h.discount || 0) / 100);
      const matchesPrice = finalPrice <= Number(filters.maxPrice);
      const matchesRating = h.rating >= filters.minRating;
      const matchesAmenities = filters.amenities.every((a) => h.amenities.includes(a));
      return matchesQuery && matchesCity && matchesPrice && matchesRating && matchesAmenities;
    });

    if (sort === "low-high") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "high-low") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "top-rated") list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [debouncedQuery, filters, sort]);

  const clearFilters = () => {
    setFilters(defaultFilters);
    setQuery("");
    setSearchParams({});
  };

  return (
    <div className="hotels-page">
      <div className="hotels-page__hero">
        <div className="container-custom">
          <h1 className="font-display">Discover Hotels Across India</h1>
          <div className="hotels-page__search">
            <FiSearch />
            <input
              type="text"
              placeholder="Search by hotel name or city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container-custom hotels-page__body">
        <button className="hotels-page__filter-toggle" onClick={() => setMobileFiltersOpen(true)}>
          <FiFilter /> Filters
        </button>

        <div className={`hotels-page__filters-col ${mobileFiltersOpen ? "open" : ""}`}>
          <button className="hotels-page__filter-close" onClick={() => setMobileFiltersOpen(false)}>
            <FiX /> Close
          </button>
          <Filters filters={filters} setFilters={setFilters} onClear={clearFilters} />
        </div>

        <div className="hotels-page__results-col">
          <div className="hotels-page__results-header">
            <span>{loading ? "Searching..." : `${results.length} properties found`}</span>
            <select className="form-select-custom hotels-page__sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="top-rated">Top Rated</option>
            </select>
          </div>

          <div className="row g-4">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div className="col-12 col-sm-6 col-lg-4" key={i}><SkeletonCard /></div>
                ))
              : results.map((h) => (
                  <div className="col-12 col-sm-6 col-lg-4" key={h.id}>
                    <HotelCard hotel={h} />
                  </div>
                ))}
          </div>

          {!loading && results.length === 0 && (
            <div className="hotels-page__empty">
              <h4>No hotels match your filters</h4>
              <p>Try adjusting your filters or search a different city.</p>
              <button className="btn-gradient" onClick={clearFilters}>Reset Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
