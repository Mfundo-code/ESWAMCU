import React from "react";

function ConfirmDialog({ title, text, confirmLabel = "Delete", busy, onConfirm, onCancel }) {
  return (
    <div className="adm-backdrop" onClick={onCancel}>
      <div className="adm-dialog" role="alertdialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className="adm-dialog__actions">
          <button type="button" className="adm-btn" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="button" className="adm-btn adm-btn--danger" onClick={onConfirm} disabled={busy}>
            {busy ? "Working…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
