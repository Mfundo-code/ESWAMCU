import React, { useState } from "react";
import { submitOpportunityApplication } from "../../../../global/api";

const EMPTY = { full_name: "", organisation: "", email: "", phone: "", message: "" };

function ApplyForm({ opportunity }) {
  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [state, setState] = useState({ status: "idle", message: "" });
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setState({ status: "sending", message: "" });
    try {
      await submitOpportunityApplication({ ...form, opportunity: opportunity.id, document: file });
      setForm(EMPTY);
      setFile(null);
      e.target.reset();
      setState({ status: "ok", message: "Thank you! Your response has been received." });
    } catch (err) {
      setState({ status: "error", message: "Something went wrong. Please check your details and try again." });
    }
  };

  return (
    <form className="form" onSubmit={submit} style={{ marginTop: "1.2rem" }}>
      <h4 style={{ margin: 0 }}>Apply or express interest</h4>
      <div className="form__row">
        <label className="field">
          <span>Full name *</span>
          <input className="input" required value={form.full_name} onChange={set("full_name")} />
        </label>
        <label className="field">
          <span>Organisation</span>
          <input className="input" value={form.organisation} onChange={set("organisation")} />
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
        <span>Message</span>
        <textarea className="textarea" rows={3} value={form.message} onChange={set("message")} />
      </label>
      <label className="field">
        <span>Supporting document (optional)</span>
        <input className="input" type="file" onChange={(e) => setFile(e.target.files[0] || null)} />
      </label>
      {state.message && <div className={`alert alert--${state.status === "ok" ? "ok" : "error"}`}>{state.message}</div>}
      <button className="btn btn--primary" type="submit" disabled={state.status === "sending"}>
        {state.status === "sending" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}

export default ApplyForm;
