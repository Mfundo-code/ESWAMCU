import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { useContact } from "./ContactContext";
import { CONTACT, NAV, NAV_CONTACT, ORG, telHref, waHref } from "./siteConfig";

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openContact } = useContact();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't let the page scroll behind the open mobile drawer.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  const linkClass = ({ isActive }) => `navbar__link${isActive ? " is-active" : ""}`;
  const drawerClass = ({ isActive }) => `drawer__link${isActive ? " is-active" : ""}`;

  return (
    <header>
      <div className="topbar">
        <div className="container topbar__inner">
          <div className="topbar__contacts">
            <a href={telHref(CONTACT.phones[0])}>
              <FaPhoneAlt size={11} /> {CONTACT.phones[0]}
            </a>
            <a href={waHref(CONTACT.whatsapp)} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={13} /> {CONTACT.whatsapp}
            </a>
            <a href={`mailto:${CONTACT.emails[0]}`}>
              <FaEnvelope size={11} /> {CONTACT.emails[0]}
            </a>
          </div>
          <span className="topbar__motto">&ldquo;{ORG.motto}&rdquo;</span>
        </div>
      </div>

      <div className={`navbar${scrolled ? " is-scrolled" : ""}`}>
        <div className="container navbar__inner">
          <Link to="/" className="navbar__brand" onClick={close} aria-label="ESWAMCU home">
            <img src="/logo.png" alt="ESWAMCU - Eswatini Multipurpose Cooperatives Union" />
          </Link>

          <nav className="navbar__links" aria-label="Main">
            {NAV.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <button type="button" className="btn btn--primary btn--small navbar__cta" onClick={openContact}>
            {NAV_CONTACT.label}
          </button>

          <button
            type="button"
            className="navbar__toggle"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {open && (
        <div className="drawer-backdrop" onClick={close}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="drawer__close" onClick={close} aria-label="Close menu">
              <FaTimes size={18} />
            </button>
            <nav className="drawer__links" aria-label="Mobile">
              {NAV.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.end} className={drawerClass} onClick={close}>
                  {l.label}
                </NavLink>
              ))}
              <button
                type="button"
                className="btn btn--amber"
                onClick={() => {
                  close();
                  openContact();
                }}
                style={{ marginTop: "0.8rem" }}
              >
                {NAV_CONTACT.label}
              </button>
            </nav>
            <div className="drawer__foot">
              <a href={telHref(CONTACT.phones[0])}>{CONTACT.phones[0]}</a>
              <a href={`mailto:${CONTACT.emails[0]}`}>{CONTACT.emails[0]}</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;