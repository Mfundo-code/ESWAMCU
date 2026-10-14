import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaInbox } from "react-icons/fa";

/* Decorative swirl that echoes the two bands in the ESWAMCU logo emblem. */
export function Waves({ className }) {
  return (
    <svg className={className} viewBox="0 0 900 520" fill="none" aria-hidden="true">
      <path
        className="wave-a"
        d="M0 250 C140 170 280 300 430 230 C580 160 700 210 900 140 L900 215 C700 290 580 240 430 310 C280 380 140 250 0 330 Z"
        fill="#f3b04a"
      />
      <path
        className="wave-b"
        d="M0 340 C150 270 270 400 440 330 C600 262 720 320 900 250 L900 325 C720 400 600 340 440 410 C270 482 150 350 0 430 Z"
        fill="#1fa24f"
        opacity="0.95"
      />
      <path
        className="wave-c"
        d="M0 430 C160 370 290 480 450 420 C610 360 740 410 900 350 L900 420 C740 480 610 440 450 500 C290 560 160 450 0 520 Z"
        fill="#ffffff"
        opacity="0.16"
      />
    </svg>
  );
}

/* Soft curved edge used to blend a dark band into the page below it. */
export function Curve({ fill = "#f8f8f3" }) {
  return (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 80 L0 40 C240 90 480 0 720 30 C960 60 1200 90 1440 30 L1440 80 Z" fill={fill} />
    </svg>
  );
}

/* Fades + lifts its content in as it scrolls into view. */
export function Reveal({ children, delay = 0, className, as = "div" }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({ eyebrow, title, lead, center = false }) {
  return (
    <div className={`section-heading${center ? " section-heading--center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

/* Inner-page banner: title + lead, optional in-page anchor links. */
export function PageHero({ eyebrow, title, lead, anchors }) {
  return (
    <>
      <section className="page-hero">
        <Waves className="page-hero__swirl" />
        <div className="container">
          {eyebrow && <p className="eyebrow eyebrow--light">{eyebrow}</p>}
          <h1>{title}</h1>
          {lead && <p className="page-hero__lead">{lead}</p>}
        </div>
        <div className="page-hero__curve">
          <Curve fill={anchors ? "#f8f8f3" : "#f8f8f3"} />
        </div>
      </section>
      {anchors && (
        <nav className="subnav" aria-label="On this page">
          <div className="container subnav__inner">
            {anchors.map((a) => (
              <a key={a.id} href={`#${a.id}`}>
                {a.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}

export function EmptyState({ title = "Nothing here yet", text, icon }) {
  return (
    <div className="empty">
      <span className="empty__icon">{icon || <FaInbox />}</span>
      <h3>{title}</h3>
      {text && <p>{text}</p>}
    </div>
  );
}

export function Loading({ rows = 3 }) {
  return (
    <div className="grid grid--3" aria-busy="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div className="skeleton" key={i} />
      ))}
    </div>
  );
}

export function Chips({ options, value, onChange }) {
  return (
    <div className="chips" role="tablist">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={value === o.value}
          className={`chip${value === o.value ? " is-active" : ""}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Modal({ onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
