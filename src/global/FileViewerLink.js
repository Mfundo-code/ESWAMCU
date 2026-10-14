import React, { useState } from "react";
import mammoth from "mammoth";
import html2pdf from "html2pdf.js";
import { useFileViewer } from "./FileViewerContext";

/**
 * Every document link on the site - PDF or .docx - opens inline in the
 * app's viewer modal, never a new tab.
 *
 * Files are always fetched as a blob: URL before being framed. Django adds
 * X-Frame-Options to its responses, and the backend (localhost:8000) is a
 * different origin from the site (localhost:3000), so framing the raw file
 * URL would be refused. A blob: URL is same-origin, so that never applies.
 */

export const isDocxFile = (url = "") => /\.docx($|\?)/i.test(url);

export async function convertDocxUrlToPdfBlob(fileUrl) {
  const response = await fetch(fileUrl);
  if (!response.ok) throw new Error(`Could not fetch the document (${response.status})`);
  const arrayBuffer = await response.arrayBuffer();
  const { value: html } = await mammoth.convertToHtml({ arrayBuffer });

  const container = document.createElement("div");
  container.innerHTML = html;
  Object.assign(container.style, {
    padding: "32px",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#222",
  });

  return html2pdf()
    .from(container)
    .set({
      margin: 10,
      filename: "document.pdf",
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    })
    .outputPdf("blob");
}

async function fetchAsBlob(fileUrl) {
  const response = await fetch(fileUrl);
  if (!response.ok) throw new Error(`Could not fetch the document (${response.status})`);
  return response.blob();
}

function fileNameFromUrl(url = "") {
  try {
    const clean = url.split("?")[0];
    return decodeURIComponent(clean.split("/").pop()) || "Document";
  } catch {
    return "Document";
  }
}

/** Drop-in replacement for <a href={file}>: opens the file in the viewer modal. */
function FileViewerLink({ file, children, style, className }) {
  const { openFile } = useFileViewer();
  const [status, setStatus] = useState("idle");

  if (!file) return null;

  const handleClick = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const blob = isDocxFile(file) ? await convertDocxUrlToPdfBlob(file) : await fetchAsBlob(file);
      const blobUrl = URL.createObjectURL(blob);
      openFile(blobUrl, fileNameFromUrl(file).replace(/\.\w+$/, ""), true);
    } catch (err) {
      // Fall back to a normal download so the visitor is never stuck.
      const link = document.createElement("a");
      link.href = file;
      link.download = fileNameFromUrl(file);
      link.click();
    } finally {
      setStatus("idle");
    }
  };

  return (
    <a href={file} onClick={handleClick} style={style} className={className}>
      {status === "loading" ? "Opening…" : children}
    </a>
  );
}

/** A real save-as download of the ORIGINAL file (no PDF conversion). */
export function FileDownloadButton({ file, children, style, className }) {
  const [status, setStatus] = useState("idle");

  if (!file) return null;

  const handleClick = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const blob = await fetchAsBlob(file);
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileNameFromUrl(file);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(file, "_blank", "noopener,noreferrer");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <a href={file} onClick={handleClick} style={style} className={className}>
      {status === "loading" ? "Downloading…" : children}
    </a>
  );
}

export default FileViewerLink;
