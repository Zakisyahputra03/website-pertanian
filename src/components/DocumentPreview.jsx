import React from "react";
import { X } from "lucide-react";
import "./CategoryPage.css";

const isPdf = (url) => {
  try {
    return url.split("?")[0].toLowerCase().endsWith(".pdf");
  } catch {
    return false;
  }
};

const DocumentPreview = ({ open, url, title, onClose }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="doc-preview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="doc-preview-header">
          <h3>{title || "Preview Dokumen"}</h3>
          <button className="close-btn" onClick={onClose} aria-label="Tutup">
            <X />
          </button>
        </div>
        <div className="doc-preview-body">
          {isPdf(url) ? (
            <iframe title={title} src={url} frameBorder="0" />
          ) : (
            <img src={url} alt={title} />
          )}
        </div>
        <div className="doc-preview-footer">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-download-premium"
          >
            Buka di tab baru / Unduh
          </a>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
