import React, { useState } from "react";
import { submitMembership } from "../../../../global/api";
import { REGIONS } from "../../../../global/siteConfig";
import { Reveal, SectionHeading } from "../../../../global/ui";

const EMPTY = { cooperative_name: "", contact_person: "", email: "", phone: "", region: "", message: "" };

function JoinForm() {
  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [state, setState] = useState({ status: "idle", message: "" });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setState({ status: "sending", message: "" });
    try {
      await submitMembership({ ...form, supporting_document: file });
      setForm(EMPTY);
      setFile(null);
      e.target.reset();
      setState({
        status: "ok",
        message: "Thank you! Your request has been received and the ESWAMCU team will be in touch.",
      });
    } catch (err) {
      setState({ status: "error", message: "Something went wrong. Please check your details and try again." });
    }
  };

  return (
    <section className="section" id="join">
      <div className="container container--narrow">
        <SectionHeading
          eyebrow="Join us"
          title="Request to become an affiliate"
          lead="Tell us about your cooperative. A supporting document (registration certificate, for example) is optional."
        />
        <Reveal className="form-card">
          <form className="form" onSubmit={submit}>
            <div className="form__row">
              <label className="field">
                <span>Cooperative name *</span>
                <input className="input" required value={form.cooperative_name} onChange={set("cooperative_name")} />
              </label>
              <label className="field">
                <span>Contact person *</span>
                <input className="input" required value={form.contact_person} onChange={set("contact_person")} />
              </label>
            </div>
            <div className="form__row">
              <label className="field">
                <span>Email *</span>
                <input className="input" type="email" required value={form.email} onChange={set("email")} />
              </label>
              <label className="field">
                <span>Phone</span>
                <input className="input" value={form.phone} onChange={set("phone")} />
              </label>
            </div>
            <label className="field">
              <span>Region</span>
              <select className="select" value={form.region} onChange={set("region")}>
                <option value="">Select a region</option>
                {REGIONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Message</span>
              <textarea className="textarea" rows={4} value={form.message} onChange={set("message")} />
            </label>
            <label className="field">
              <span>Supporting document (optional)</span>
              <input className="input" type="file" onChange={(e) => setFile(e.target.files[0] || null)} />
            </label>
            {state.message && <div className={`alert alert--${state.status === "ok" ? "ok" : "error"}`}>{state.message}</div>}
            <button className="btn btn--primary" type="submit" disabled={state.status === "sending"}>
              {state.status === "sending" ? "Sending…" : "Submit request"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export default JoinForm;
