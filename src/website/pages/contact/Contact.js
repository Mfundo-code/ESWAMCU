import React, { useState } from "react";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaInbox } from "react-icons/fa";
import { submitContact } from "../../../global/api";
import { CONTACT, mapsHref, telHref, waHref } from "../../../global/siteConfig";
import { PageHero, Reveal } from "../../../global/ui";

const EMPTY = { full_name: "", email: "", phone: "", subject: "", message: "" };

function Contact() {
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
    <>
      <PageHero eyebrow="Contact us" title="We'd love to hear from you" lead="Reach the ESWAMCU team by phone, WhatsApp, email or in person." />
      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container contact">
          <div className="contact-list">
            <Reveal className="contact-item">
              <span className="icon-badge icon-badge--indigo"><FaPhoneAlt /></span>
              <div>
                <h3>Phone</h3>
                {CONTACT.phones.map((p) => (
                  <a key={p} href={telHref(p)}>{p}</a>
                ))}
              </div>
            </Reveal>
            <Reveal className="contact-item">
              <span className="icon-badge"><FaWhatsapp /></span>
              <div>
                <h3>WhatsApp</h3>
                <a href={waHref(CONTACT.whatsapp)} target="_blank" rel="noopener noreferrer">{CONTACT.whatsapp}</a>
              </div>
            </Reveal>
            <Reveal className="contact-item">
              <span className="icon-badge icon-badge--amber"><FaEnvelope /></span>
              <div>
                <h3>Email</h3>
                {CONTACT.emails.map((m) => (
                  <a key={m} href={`mailto:${m}`}>{m}</a>
                ))}
              </div>
            </Reveal>
            <Reveal className="contact-item">
              <span className="icon-badge icon-badge--indigo"><FaInbox /></span>
              <div>
                <h3>Postal address</h3>
                {CONTACT.postal.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
            </Reveal>
            <Reveal className="contact-item">
              <span className="icon-badge"><FaMapMarkerAlt /></span>
              <div>
                <h3>Physical address</h3>
                {CONTACT.physical.map((l) => (
                  <p key={l}>{l}</p>
                ))}
                <a href={mapsHref} target="_blank" rel="noopener noreferrer"><small>Open in Google Maps →</small></a>
              </div>
            </Reveal>
            <Reveal className="contact-item">
              <span className="icon-badge icon-badge--amber"><FaClock /></span>
              <div>
                <h3>Office hours</h3>
                <p>{CONTACT.hours}</p>
              </div>
            </Reveal>
          </div>

          <Reveal className="form-card">
            <h3>Send us a message</h3>
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
                <textarea className="textarea" rows={6} required value={form.message} onChange={set("message")} />
              </label>
              {state.message && <div className={`alert alert--${state.status === "ok" ? "ok" : "error"}`}>{state.message}</div>}
              <button className="btn btn--primary" type="submit" disabled={state.status === "sending"}>
                {state.status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default Contact;
