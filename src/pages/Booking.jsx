import { useState, useMemo } from "react";
import { useParams, useNavigate, Navigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiUsers, FiTag, FiCheckCircle, FiMapPin, FiStar } from "react-icons/fi";
import { getHotelById } from "../data/hotels";
import { offers } from "../data/offers";
import { useApp } from "../context/AppContext";
import { useToast } from "../context/ToastContext";
import "./Booking.css";

function todayStr(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
}

export default function Booking() {
  const { id } = useParams();
  const hotel = getHotelById(id);
  const navigate = useNavigate();
  const { addBooking } = useApp();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 2,
    checkIn: todayStr(1),
    checkOut: todayStr(3),
    roomType: hotel ? hotel.roomTypes[0].name : "",
    specialRequest: "",
  });
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [errors, setErrors] = useState({});

  if (!hotel) return <Navigate to="/404" replace />;

  const selectedRoom = hotel.roomTypes.find((r) => r.name === form.roomType) || hotel.roomTypes[0];

  const nights = useMemo(() => {
    const inD = new Date(form.checkIn);
    const outD = new Date(form.checkOut);
    const diff = Math.round((outD - inD) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [form.checkIn, form.checkOut]);

  const roomTotal = selectedRoom.price * nights;
  const hotelDiscountAmount = Math.round(roomTotal * ((hotel.discount || 0) / 100));
  const afterHotelDiscount = roomTotal - hotelDiscountAmount;
  const couponDiscountAmount = appliedCoupon ? Math.round(afterHotelDiscount * (appliedCoupon.discount / 100)) : 0;
  const subtotal = afterHotelDiscount - couponDiscountAmount;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const applyCoupon = () => {
    setCouponError("");
    const found = offers.find((o) => o.code.toLowerCase() === couponInput.trim().toLowerCase());
    if (found) {
      setAppliedCoupon(found);
      showToast(`Coupon "${found.code}" applied — ${found.discount}% off!`, "success");
    } else {
      setCouponError("Invalid or expired coupon code");
      setAppliedCoupon(null);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) newErrors.phone = "Enter a valid 10-digit phone number";
    if (new Date(form.checkOut) <= new Date(form.checkIn)) newErrors.checkOut = "Check-out must be after check-in";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fix the errors in the form", "error");
      return;
    }
    const booking = addBooking({
      hotelId: hotel.id,
      hotelName: hotel.name,
      city: hotel.city,
      image: hotel.gallery[0],
      guestName: form.name,
      email: form.email,
      phone: form.phone,
      guests: form.guests,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      nights,
      roomType: selectedRoom.name,
      specialRequest: form.specialRequest,
      couponCode: appliedCoupon?.code || null,
      total,
    });
    setConfirmedBooking(booking);
    showToast("Booking confirmed! Check your email for details.", "success");
  };

  return (
    <div className="booking-page">
      <div className="booking-page__hero container-custom">
        <h1 className="font-display">Complete Your Booking</h1>
        <p>You're just one step away from confirming your stay at {hotel.name}.</p>
      </div>

      <div className="container-custom booking-page__body">
        {/* SUMMARY */}
        <div className="booking-summary card-elevated">
          <img src={hotel.gallery[0]} alt={hotel.name} />
          <div className="booking-summary__body">
            <h4>{hotel.name}</h4>
            <p className="booking-summary__location"><FiMapPin /> {hotel.city}, {hotel.state}</p>
            <span className="rating-pill"><FiStar /> {hotel.rating}</span>
            <div className="booking-summary__divider" />
            <div className="booking-summary__row"><span>Room Type</span><strong>{selectedRoom.name}</strong></div>
            <div className="booking-summary__row"><span>Check-in</span><strong>{new Date(form.checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</strong></div>
            <div className="booking-summary__row"><span>Check-out</span><strong>{new Date(form.checkOut).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</strong></div>
            <div className="booking-summary__row"><span>Nights</span><strong>{nights}</strong></div>
            <div className="booking-summary__row"><span>Guests</span><strong>{form.guests}</strong></div>
            <div className="booking-summary__divider" />
            <div className="booking-summary__row"><span>Room total</span><strong>₹{roomTotal.toLocaleString("en-IN")}</strong></div>
            {hotelDiscountAmount > 0 && (
              <div className="booking-summary__row booking-summary__row--discount"><span>Hotel discount ({hotel.discount}%)</span><strong>-₹{hotelDiscountAmount.toLocaleString("en-IN")}</strong></div>
            )}
            {couponDiscountAmount > 0 && (
              <div className="booking-summary__row booking-summary__row--discount"><span>Coupon ({appliedCoupon.code})</span><strong>-₹{couponDiscountAmount.toLocaleString("en-IN")}</strong></div>
            )}
            <div className="booking-summary__row"><span>Taxes & fees (12%)</span><strong>₹{taxes.toLocaleString("en-IN")}</strong></div>
            <div className="booking-summary__divider" />
            <div className="booking-summary__row booking-summary__row--total"><span>Total Amount</span><strong>₹{total.toLocaleString("en-IN")}</strong></div>
          </div>
        </div>

        {/* FORM */}
        <form className="booking-form card-elevated" onSubmit={handleConfirm}>
          <h4>Guest Details</h4>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label-custom"><FiUser /> Full Name</label>
              <input className="form-control-custom" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Aditi Sharma" />
              {errors.name && <span className="booking-form__error">{errors.name}</span>}
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label-custom"><FiMail /> Email</label>
              <input className="form-control-custom" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
              {errors.email && <span className="booking-form__error">{errors.email}</span>}
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label-custom"><FiPhone /> Phone</label>
              <input className="form-control-custom" name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" />
              {errors.phone && <span className="booking-form__error">{errors.phone}</span>}
            </div>

            <div className="col-6 col-md-3">
              <label className="form-label-custom">Check-in</label>
              <input type="date" className="form-control-custom" name="checkIn" value={form.checkIn} min={todayStr()} onChange={handleChange} />
            </div>
            <div className="col-6 col-md-3">
              <label className="form-label-custom">Check-out</label>
              <input type="date" className="form-control-custom" name="checkOut" value={form.checkOut} min={form.checkIn} onChange={handleChange} />
              {errors.checkOut && <span className="booking-form__error">{errors.checkOut}</span>}
            </div>
            <div className="col-6 col-md-3">
              <label className="form-label-custom"><FiUsers /> Guests</label>
              <input type="number" min={1} max={10} className="form-control-custom" name="guests" value={form.guests} onChange={handleChange} />
            </div>
            <div className="col-6 col-md-3">
              <label className="form-label-custom">Room Type</label>
              <select className="form-select-custom" name="roomType" value={form.roomType} onChange={handleChange}>
                {hotel.roomTypes.map((r) => <option key={r.name} value={r.name}>{r.name}</option>)}
              </select>
            </div>

            <div className="col-12">
              <label className="form-label-custom">Special Request (optional)</label>
              <textarea className="form-control-custom" rows={3} name="specialRequest" value={form.specialRequest} onChange={handleChange} placeholder="e.g. High floor room, early check-in..." />
            </div>

            <div className="col-12">
              <label className="form-label-custom"><FiTag /> Coupon Code</label>
              <div className="booking-form__coupon-row">
                <input
                  className="form-control-custom"
                  placeholder="Try WEEKEND20, FAMILYFUN, EARLY10..."
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button type="button" className="btn-outline-custom" onClick={applyCoupon}>Apply</button>
              </div>
              {couponError && <span className="booking-form__error">{couponError}</span>}
              {appliedCoupon && <span className="booking-form__success"><FiCheckCircle /> {appliedCoupon.discount}% discount applied</span>}
            </div>
          </div>

          <button type="submit" className="btn-gradient w-100 justify-content-center mt-4">
            Confirm Booking — ₹{total.toLocaleString("en-IN")}
          </button>
        </form>
      </div>

      {confirmedBooking && (
        <div className="booking-modal-backdrop">
          <div className="booking-modal glass-panel animate-fade-up">
            <div className="booking-modal__icon"><FiCheckCircle /></div>
            <h3>Booking Confirmed!</h3>
            <p>Your stay at <strong>{hotel.name}</strong> is booked. A confirmation email has been sent to {confirmedBooking.email}.</p>
            <div className="booking-modal__id">Booking ID: <strong>{confirmedBooking.bookingId}</strong></div>
            <div className="booking-modal__actions">
              <Link to="/hotels" className="btn-outline-custom" onClick={() => setConfirmedBooking(null)}>Browse More Hotels</Link>
              <Link to="/" className="btn-gradient">Back to Home</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
