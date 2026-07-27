import { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AppContext = createContext(null);

const MAX_RECENTLY_VIEWED = 8;

export function AppProvider({ children }) {
  const [wishlist, setWishlist] = useLocalStorage("is_wishlist", []);
  const [bookings, setBookings] = useLocalStorage("is_bookings", []);
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage("is_recently_viewed", []);
  const [darkMode, setDarkMode] = useLocalStorage("is_dark_mode", false);

  const toggleWishlist = useCallback(
    (hotelId) => {
      setWishlist((prev) =>
        prev.includes(hotelId) ? prev.filter((id) => id !== hotelId) : [...prev, hotelId]
      );
    },
    [setWishlist]
  );

  const isWishlisted = useCallback((hotelId) => wishlist.includes(hotelId), [wishlist]);

  const addRecentlyViewed = useCallback(
    (hotelId) => {
      setRecentlyViewed((prev) => {
        const filtered = prev.filter((id) => id !== hotelId);
        return [hotelId, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
      });
    },
    [setRecentlyViewed]
  );

  const addBooking = useCallback(
    (booking) => {
      const newBooking = {
        ...booking,
        bookingId: `IS-${Date.now().toString().slice(-8)}`,
        createdAt: new Date().toISOString(),
      };
      setBookings((prev) => [newBooking, ...prev]);
      return newBooking;
    },
    [setBookings]
  );

  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), [setDarkMode]);

  const value = {
    wishlist,
    toggleWishlist,
    isWishlisted,
    recentlyViewed,
    addRecentlyViewed,
    bookings,
    addBooking,
    darkMode,
    toggleDarkMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
}
