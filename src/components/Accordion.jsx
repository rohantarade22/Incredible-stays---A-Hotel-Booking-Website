import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import "./Accordion.css";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="accordion-custom">
      {items.map((item, i) => (
        <div key={i} className={`accordion-item-custom ${openIndex === i ? "open" : ""}`}>
          <button
            className="accordion-header-custom"
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            aria-expanded={openIndex === i}
          >
            <span>{item.question}</span>
            {openIndex === i ? <FiMinus /> : <FiPlus />}
          </button>
          <div className="accordion-body-custom" style={{ maxHeight: openIndex === i ? "300px" : "0px" }}>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
