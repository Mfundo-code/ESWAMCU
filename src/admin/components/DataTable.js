import React from "react";
import { formatDate } from "../../global/hooks";

function renderCell(col, row) {
  const v = row[col.key];
  if (col.type === "bool") return <span className={`adm-pill ${v ? "adm-pill--ok" : ""}`}>{v ? "Yes" : "No"}</span>;
  if (col.type === "status") return <span className={`adm-pill adm-pill--${v}`}>{String(v || "").replace("_", " ")}</span>;
  if (col.type === "date") return formatDate(v) || "—";
  return v === null || v === undefined || v === "" ? "—" : String(v);
}

function DataTable({ columns, rows, onEdit, onDelete, canDelete = true, editLabel = "Edit" }) {
  return (
    <div className="adm-tablewrap">
      <table className="adm-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((c) => (
                <td key={c.key} data-label={c.label}>
                  {renderCell(c, row)}
                </td>
              ))}
              <td className="adm-table__actions">
                <button type="button" className="adm-btn adm-btn--small" onClick={() => onEdit(row)}>
                  {editLabel}
                </button>
                {canDelete && (
                  <button type="button" className="adm-btn adm-btn--small adm-btn--danger-ghost" onClick={() => onDelete(row)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
