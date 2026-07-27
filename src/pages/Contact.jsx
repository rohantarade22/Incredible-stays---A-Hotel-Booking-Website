import { useState } from "react";
import { FiMapPin, FiMail, FiPhone, FiFacebook, FiInstagram, FiTwitter, FiSend } from "react-icons/fi";
import { useToast } from "../context/ToastContext";
import "./Contact.css";

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      showToast("Message sent! Our team will get back to you within 24 hours.", "success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 900);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero container-custom">
        <h1 className="font-display">Get in Touch</h1>
        <p>Questions about a booking, a partnership, or just want to say hello? We'd love to hear from you.</p>
      </div>

      <div className="container-custom section-sm contact-grid">
        <form className="contact-form card-elevated" onSubmit={handleSubmit}>
          <h4>Send us a message</h4>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label-custom">Full Name</label>
              <input className="form-control-custom" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label-custom">Email</label>
              <input type="email" className="form-control-custom" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="col-12">
              <label className="form-label-custom">Subject</label>
              <input className="form-control-custom" name="subject" value={form.subject} onChange={handleChange} required />
            </div>
            <div className="col-12">
              <label className="form-label-custom">Message</label>
              <textarea className="form-control-custom" rows={5} name="message" value={form.message} onChange={handleChange} required />
            </div>
          </div>
          <button type="submit" className="btn-gradient mt-3" disabled={submitting}>
            {submitting ? "Sending..." : <>Send Message <FiSend /></>}
          </button>
        </form>

        <div className="contact-info">
          <div className="contact-info__map">
            <FiMapPin size={30} />
            <span>Map view — Pune, Maharashtra, India</span>
          </div>
          <div className="contact-info__card card-elevated">
            <h5>Office Address</h5>
            <p><FiMapPin />Pune, Maharashtra 440001, India</p>
            <p><FiMail /> hello@incrediblestays.in</p>
            <p><FiPhone /> +91 801073 xxxxx</p>
            <div className="contact-info__social">
              <a href="#" aria-label="Facebook"><FiFacebook /></a>
              <a href="https://www.instagram.com/rohan_tarade2210/" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="Twitter"><FiTwitter /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
