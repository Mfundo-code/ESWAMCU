import React, { createContext, useCallback, useContext, useRef, useState } from "react";

/**
 * One in-app document viewer shared by the whole site. App.js wraps
 * everything in <FileViewerProvider>, and any component can call
 * useFileViewer().openFile(url, title, isBlob) to show a PDF in a modal
 * instead of sending the visitor to a new tab.
 */

const FileViewerContext = createContext(null);

// Hides the browser's built-in PDF toolbar so the modal reads as a simple viewer.
const toReadOnlyPdfUrl = (url) => `${url}#toolbar=0&navpanes=0&statusbar=0`;

export function FileViewerProvider({ children }) {
  const [content, setContent] = useState(null);
  const currentBlobUrl = useRef(null);

  const openFile = useCallback((url, title = "Document", isBlob = false) => {
    if (isBlob) currentBlobUrl.current = url;
    setContent({ url: toReadOnlyPdfUrl(url), rawUrl: url, title, isBlob });
  }, []);

  const closeFile = useCallback(() => {
    if (currentBlobUrl.current) {
      URL.revokeObjectURL(currentBlobUrl.current);
      currentBlobUrl.current = null;
    }
    setContent(null);
  }, []);

  return (
    <FileViewerContext.Provider value={{ openFile, closeFile }}>
      {children}
      {content && <ViewerModal content={content} onClose={closeFile} />}
    </FileViewerContext.Provider>
  );
}

export function useFileViewer() {
  const ctx = useContext(FileViewerContext);
  if (!ctx) throw new Error("useFileViewer must be used within a FileViewerProvider");
  return ctx;
}

function ViewerModal({ content, onClose }) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={styles.title}>{content.title}</h3>
          <div style={styles.headerActions}>
            <a
              href={content.rawUrl}
              download={content.isBlob ? `${content.title}.pdf` : undefined}
              target={content.isBlob ? undefined : "_blank"}
              rel="noopener noreferrer"
              style={styles.downloadLink}
            >
              Download
            </a>
            <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
        </div>
        <iframe title={content.title} src={content.url} style={styles.iframe} />
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(17, 23, 67, 0.62)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 400,
    padding: "2rem 1rem",
  },
  panel: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    borderTop: "6px solid var(--amber)",
    width: "min(920px, 100%)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "var(--shadow-lg)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.85rem 1.2rem",
    borderBottom: "1px solid var(--line)",
  },
  title: { margin: 0, fontSize: "1.05rem", fontFamily: "var(--font-body)", color: "var(--indigo-deep)" },
  headerActions: { display: "flex", alignItems: "center", gap: "1rem" },
  downloadLink: { color: "var(--indigo)", fontSize: "0.88rem", fontWeight: 700, textDecoration: "none" },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "1.7rem",
    lineHeight: 1,
    cursor: "pointer",
    color: "var(--muted)",
  },
  iframe: { flex: 1, width: "100%", border: "none" },
};
