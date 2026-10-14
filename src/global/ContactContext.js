import React, { createContext, useCallback, useContext, useState } from "react";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { submitContact } from "./api";
import { CONTACT, mapsHref, telHref, waHref } from "./siteConfig";
import { Modal } from "./ui";

/**
 * The contact form is hidden until someone presses a "Contact" button.
 * Any component can call useContact().openContact().
 */
const ContactContext = createContext(null);

const EMPTY = { full_name: "", email: "", phone: "", subject: "", message: "" };

export function ContactProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openContact = useCallback(() => setOpen(true), []);
  const closeContact = useCallback(() => setOpen(false), []);

  return (
    <ContactContext.Provider value={{ openContact, closeContact }}>
      {children}
      {open && (
        <Modal onClose={closeContact}>
          <ContactForm />
        </Modal>
      )}
    </ContactContext.Provider>
  );
}

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used within a ContactProvider");
  return ctx;
}

const row = { display: "flex", gap: "0.6rem", alignItems: "flex-start", fontSize: "0.92rem" };
const linkStyle = { color: "var(--indigo)", fontWeight: 600, textDecoration: "none" };

function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState({ status: "idle", message: "" });
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setState({ status: "sending", message: "" });
    try {
      await submitContact(form);
      setForm(EMPTY);
      setState({ status: "ok", message: "Thank you! Your message has been sent and we'll reply soon." });
    } catch (err) {
      setState({ status: "error", message: "Something went wrong. Please check your details and try again." });
    }
  };

  return (
    <div>
      <p className="eyebrow">Contact us</p>
      <h3 style={{ marginTop: 0 }}>We&rsquo;d love to hear from you</h3>

      <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.2rem" }}>
        <div style={row}>
          <FaPhoneAlt style={{ marginTop: 4 }} />
          <span>
            {CONTACT.phones.map((p, i) => (
              <React.Fragment key={p}>
                {i > 0 && " / "}
                <a href={telHref(p)} style={linkStyle}>{p}</a>
              </React.Fragment>
            ))}
          </span>
        </div>
        <div style={row}>
          <FaWhatsapp style={{ marginTop: 4 }} />
          <a href={waHref(CONTACT.whatsapp)} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            {CONTACT.whatsapp}
          </a>
        </div>
        <div style={row}>
          <FaEnvelope style={{ marginTop: 4 }} />
          <span>
            {CONTACT.emails.map((m, i) => (
              <React.Fragment key={m}>
                {i > 0 && " / "}
                <a href={`mailto:${m}`} style={linkStyle}>{m}</a>
              </React.Fragment>
            ))}
          </span>
        </div>
        <div style={row}>
          <FaMapMarkerAlt style={{ marginTop: 4 }} />
          <span>
            {CONTACT.postal.join(", ")} &middot; {CONTACT.physical.join(" ")}{" "}
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" style={linkStyle}>Map</a>
          </span>
        </div>
        <div style={row}>
          <FaClock style={{ marginTop: 4 }} />
          <span>{CONTACT.hours}</span>
        </div>
      </div>

      <form className="form" onSubmit={submit}>
        <div className="form__row">
          <label className="field">
            <span>Full name *</span>
            <input className="input" required value={form.full_name} onChange={set("full_name")} />
          </label>
          <label className="field">
            <span>Email *</span>
            <input className="input" type="email" required value={form.email} onChange={set("email")} />
          </label>
        </div>
        <div className="form__row">
          <label className="field">
            <span>Phone</span>
            <input className="input" value={form.phone} onChange={set("phone")} />
          </label>
          <label className="field">
            <span>Subject</span>
            <input className="input" value={form.subject} onChange={set("subject")} />
          </label>
        </div>
        <label className="field">
          <span>Message *</span>
          <textarea className="textarea" rows={5} required value={form.message} onChange={set("message")} />
        </label>
        {state.message && <div className={`alert alert--${state.status === "ok" ? "ok" : "error"}`}>{state.message}</div>}
        <button className="btn btn--primary" type="submit" disabled={state.status === "sending"}>
          {state.status === "sending" ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}