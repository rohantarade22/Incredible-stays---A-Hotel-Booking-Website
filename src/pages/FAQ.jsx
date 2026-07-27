import Accordion from "../components/Accordion";
import "./FAQ.css";

const faqItems = [
  {
    question: "How do I book a hotel on Incredible Stays?",
    answer:
      "Simply search for your destination, choose a hotel you like, select your room type and dates, and complete the guest details form. You'll receive instant confirmation once your booking is placed.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Most bookings offer free cancellation up to 48 hours before check-in. Specific policies are listed on each hotel's details page under the Policies section.",
  },
  {
    question: "Do you charge any booking fees?",
    answer:
      "No. The price you see at checkout — including taxes — is the price you pay. We never add hidden booking fees.",
  },
  {
    question: "How do I apply a coupon code?",
    answer:
      "On the booking page, enter your coupon code in the 'Coupon Code' field and click Apply. Valid codes are instantly reflected in your price summary.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "This is a portfolio demonstration project — no real payments are processed. In a production environment, all payment data would be handled through PCI-compliant gateways.",
  },
  {
    question: "Can I save hotels to review later?",
    answer:
      "Yes — tap the heart icon on any hotel card or details page to add it to your Wishlist. Your wishlist is saved locally in your browser.",
  },
  {
    question: "Do you offer family or group packages?",
    answer:
      "Yes, check our Offers page for seasonal deals including our Family Package, which includes complimentary stays and meals for children under 12 at select resorts.",
  },
  {
    question: "Which cities do you cover?",
    answer:
      "We currently list hotels across more than 80 Indian cities, including major metros, hill stations, beach destinations and heritage towns.",
  },
];

export default function FAQ() {
  return (
    <div className="faq-page">
      <div className="faq-hero container-custom">
        <h1 className="font-display">Frequently Asked Questions</h1>
        <p>Everything you need to know about booking your next stay with us.</p>
      </div>
      <div className="container-custom section-sm">
        <Accordion items={faqItems} />
      </div>
    </div>
  );
}
