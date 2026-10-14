import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Curve } from "./ui";
import { useContact } from "./ContactContext";
import { CONTACT, NAV, NAV_CONTACT, ORG, telHref, waHref } from "./siteConfig";

function Footer() {
  const year = new Date().getFullYear();
  const { openContact } = useContact();
  const linkBtn = {
    background: "none", border: 0, padding: 0, font: "inherit", color: "inherit",
    cursor: "pointer", textAlign: "left",
  };
  const links = NAV.slice(1);
  const half = Math.ceil(links.length / 2);

  return (
    <footer className="footer">
      <div className="footer__curve">
        <Curve fill="#111743" />
      </div>

      <div className="container footer__grid">
        <div>
          <Link to="/" className="footer__logo" aria-label="ESWAMCU home">
            <img src="/logo.png" alt="ESWAMCU" />
          </Link>
          <p style={{ marginTop: "1.1rem" }}>
            The apex body for multipurpose cooperatives in Eswatini &mdash; representing, strengthening
            and connecting them since {ORG.established}.
          </p>
          <p className="footer__motto">&ldquo;{ORG.motto}&rdquo;</p>
        </div>

        <div>
          <h4>Explore</h4>
          <div className="footer__links">
            {links.slice(0, half).map((l) => (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4>More</h4>
          <div className="footer__links">
            {links.slice(half).map((l) => (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ))}
            <Link to="/affiliates#join">Become an affiliate</Link>
            <button type="button" style={linkBtn} onClick={openContact}>
              {NAV_CONTACT.label}
            </button>
          </div>
        </div>

        <div>
          <h4>Contact</h4>
          <div className="footer__row">
            <FaMapMarkerAlt />
            <span>
              {CONTACT.postal.join(", ")}
              <br />
              {CONTACT.physical.join(" ")}
            </span>
          </div>
          <div className="footer__row">
            <FaPhoneAlt size={13} />
            <span>
              {CONTACT.phones.map((p, i) => (
                <React.Fragment key={p}>
                  {i > 0 && " / "}
                  <a href={telHref(p)}>{p}</a>
                </React.Fragment>
              ))}
            </span>
          </div>
          <div className="footer__row">
            <FaWhatsapp />
            <a href={waHref(CONTACT.whatsapp)} target="_blank" rel="noopener noreferrer">
              {CONTACT.whatsapp}
            </a>
          </div>
          <div className="footer__row">
            <FaEnvelope size={13} />
            <span>
              {CONTACT.emails.map((e, i) => (
                <React.Fragment key={e}>
                  {i > 0 && <br />}
                  <a href={`mailto:${e}`}>{e}</a>
                </React.Fragment>
              ))}
            </span>
          </div>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container">
          <span>
            &copy; {year} {ORG.name} ({ORG.short}). All rights reserved.
          </span>
          <Link to="/admin" className="btn btn--ghost-light btn--small">
            Sign in
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;