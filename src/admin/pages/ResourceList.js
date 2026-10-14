import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import resourceConfig from "../config/resourceConfig";
import DataTable from "../components/DataTable";
import ResourceFormModal from "../components/ResourceFormModal";
import ConfirmDialog from "../components/ConfirmDialog";

function ResourceList() {
  const { section } = useParams();
  const config = resourceConfig[section];

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // null | "new" | record
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  const load = useCallback(() => {
    if (!config) return;
    setLoading(true);
    setError("");
    config.api
      .list()
      .then((res) => setRows(res.data.results || res.data))
      .catch(() => setError("Could not load this list."))
      .finally(() => setLoading(false));
  }, [config]);

  useEffect(() => {
    setEditing(null);
    setDeleting(null);
    setNotice("");
    load();
  }, [load, section]);

  if (!config) {
    return (
      <div className="adm-empty">
        <h2>Section not found</h2>
        <Link to="/admin">Back to dashboard</Link>
      </div>
    );
  }

  const confirmDelete = async () => {
    setBusy(true);
    try {
      await config.api.remove(deleting.id);
      setDeleting(null);
      setNotice("Deleted.");
      load();
    } catch (err) {
      const msg = err.response && err.response.data && err.response.data.detail;
      setNotice(msg || "Could not delete.");
      setDeleting(null);
    }
    setBusy(false);
  };

  return (
    <>
      <div className="adm-pagehead">
        <h1 className="adm-h1">{config.title}</h1>
        {!config.readOnlyList && config.canAdd !== false && (
          <button type="button" className="adm-btn adm-btn--primary" onClick={() => setEditing("new")}>
            + Add {config.singular}
          </button>
        )}
      </div>

      {notice && <div className="adm-notice">{notice}</div>}
      {error && <div className="adm-error">{error}</div>}

      {loading ? (
        <p className="adm-sub">Loading…</p>
      ) : rows.length === 0 ? (
        <div className="adm-empty">
          <h2>Nothing here yet</h2>
          <p>{config.readOnlyList ? "New submissions from the website will appear here." : config.canAdd === false ? "Nothing to edit yet." : `Add your first ${config.singular} to get started.`}</p>
        </div>
      ) : (
        <DataTable
          columns={config.columns}
          rows={rows}
          editLabel={config.readOnlyList ? "Review" : "Edit"}
          canDelete={config.canDelete !== false}
          onEdit={setEditing}
          onDelete={setDeleting}
        />
      )}

      {editing && (
        <ResourceFormModal
          config={config}
          record={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            setNotice("Saved.");
            load();
          }}
        />
      )}
      {deleting && (
        <ConfirmDialog
          title={`Delete this ${config.singular}?`}
          text="This cannot be undone."
          busy={busy}
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  );
}

export default ResourceList;