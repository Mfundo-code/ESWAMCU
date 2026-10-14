import React, { useState } from "react";

const pad = (n) => String(n).padStart(2, "0");
function toLocalInput(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function initialValues(fields, record) {
  const values = {};
  fields.forEach((f) => {
    if (f.type === "file") return;
    let v = record ? record[f.name] : f.default;
    if (f.type === "datetime") v = record ? toLocalInput(v) : f.default || "";
    if (f.type === "checkbox") v = v === undefined ? false : !!v;
    values[f.name] = v === undefined || v === null ? "" : v;
  });
  return values;
}

function errorText(err) {
  const data = err && err.response && err.response.data;
  if (!data) return "Could not save. Please try again.";
  if (typeof data === "string") return "Could not save. Please try again.";
  const lines = Object.entries(data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(" ") : v}`);
  return lines.join(" · ") || "Could not save. Please try again.";
}

function ResourceFormModal({ config, record, onClose, onSaved }) {
  const editing = !!record;
  const [values, setValues] = useState(() => initialValues(config.fields, record));
  const [files, setFiles] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (name, v) => setValues((s) => ({ ...s, [name]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {};
    config.fields.forEach((f) => {
      if (f.readOnly) return;
      if (f.type === "file") {
        if (files[f.name]) payload[f.name] = files[f.name];
        return;
      }
      let v = values[f.name];
      if (f.type === "datetime" && v) v = new Date(v).toISOString();
      if (f.type === "number" && v === "") v = config.files ? "" : null;
      if (f.type === "password" && !v) return;
      if (!config.files && (v === "" && (f.type === "date" || f.type === "datetime"))) v = null;
      payload[f.name] = v;
    });
    try {
      if (editing) await config.api.update(record.id, payload);
      else await config.api.create(payload);
      onSaved();
    } catch (err) {
      setError(errorText(err));
      setSaving(false);
    }
  };

  return (
    <div className="adm-backdrop" onClick={onClose}>
      <form className="adm-modal" onSubmit={submit} onClick={(e) => e.stopPropagation()}>
        <header className="adm-modal__head">
          <h2>
            {editing ? (config.readOnlyList ? "Review" : "Edit") : "Add"} {config.singular}
          </h2>
          <button type="button" className="adm-iconbtn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <div className="adm-modal__body">
          {config.fields.map((f) => {
            const id = `f-${f.name}`;
            if (f.readOnly) {
              const v = record && record[f.name];
              return (
                <div className="adm-field" key={f.name}>
                  <span className="adm-label">{f.label}</span>
                  {f.type === "file" ? (
                    v ? (
                      <a href={v} target="_blank" rel="noopener noreferrer">
                        Open file
                      </a>
                    ) : (
                      <span className="adm-static">—</span>
                    )
                  ) : (
                    <span className="adm-static">{v || "—"}</span>
                  )}
                </div>
              );
            }
            if (f.type === "checkbox") {
              return (
                <label className="adm-check" key={f.name} htmlFor={id}>
                  <input id={id} type="checkbox" checked={!!values[f.name]} onChange={(e) => set(f.name, e.target.checked)} />
                  {f.label}
                </label>
              );
            }
            return (
              <div className="adm-field" key={f.name}>
                <label className="adm-label" htmlFor={id}>
                  {f.label}
                  {f.required && !(f.type === "file" && editing) ? " *" : ""}
                </label>
                {f.type === "textarea" ? (
                  <textarea id={id} className="adm-input" rows={5} value={values[f.name]} onChange={(e) => set(f.name, e.target.value)} />
                ) : f.type === "select" ? (
                  <select id={id} className="adm-input" value={values[f.name]} onChange={(e) => set(f.name, e.target.value)} required={f.required}>
                    {!f.required && <option value="">—</option>}
                    {f.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : f.type === "file" ? (
                  <>
                    <input
                      id={id}
                      className="adm-input"
                      type="file"
                      accept={f.accept}
                      required={f.required && !editing}
                      onChange={(e) => setFiles((s) => ({ ...s, [f.name]: e.target.files[0] }))}
                    />
                    {editing && record[f.name] && (
                      <small className="adm-help">
                        Current file:{" "}
                        <a href={record[f.name]} target="_blank" rel="noopener noreferrer">
                          open
                        </a>
                        . Choose a new one to replace it.
                      </small>
                    )}
                  </>
                ) : (
                  <input
                    id={id}
                    className="adm-input"
                    type={f.type === "datetime" ? "datetime-local" : f.type}
                    required={f.required || (f.type === "password" && !editing)}
                    autoComplete={f.type === "password" ? "new-password" : undefined}
                    value={values[f.name]}
                    onChange={(e) => set(f.name, e.target.value)}
                  />
                )}
                {f.help && <small className="adm-help">{f.help}</small>}
              </div>
            );
          })}
          {error && <div className="adm-error">{error}</div>}
        </div>

        <footer className="adm-modal__foot">
          <button type="button" className="adm-btn" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="adm-btn adm-btn--primary" disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </footer>
      </form>
    </div>
  );
}

export default ResourceFormModal;
