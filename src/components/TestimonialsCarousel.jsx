import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { testimonials } from "../data/testimonials";
import "./TestimonialsCarousel.css";

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5500);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const t = testimonials[index];

  return (
    <div className="testimonial-carousel">
      <div className="testimonial-carousel__card glass-panel animate-fade" key={t.id}>
        <div className="testimonial-carousel__stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <FiStar key={i} className={i < Math.round(t.rating) ? "star-filled" : "star-empty"} />
          ))}
        </div>
        <p className="testimonial-carousel__comment">&ldquo;{t.comment}&rdquo;</p>
        <div className="testimonial-carousel__user">
          <img src={t.avatar} alt={t.name} />
          <div>
            <strong>{t.name}</strong>
            <span>{t.location}</span>
          </div>
        </div>
      </div>

      <div className="testimonial-carousel__controls">
        <button onClick={prev} aria-label="Previous testimonial"><FiChevronLeft /></button>
        <div className="testimonial-carousel__dots">
          {testimonials.map((_, i) => (
            <span key={i} className={i === index ? "active" : ""} onClick={() => setIndex(i)} />
          ))}
        </div>
        <button onClick={next} aria-label="Next testimonial"><FiChevronRight /></button>
      </div>
    </div>
  );
}
