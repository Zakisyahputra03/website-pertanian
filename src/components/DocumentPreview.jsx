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

const isVideo = (url) => {
  try {
    const u = url.split("?")[0].toLowerCase();
    return (
      u.endsWith(".mp4") ||
      u.endsWith(".webm") ||
      u.endsWith(".ogg") ||
      u.endsWith(".mov")
    );
  } catch {
    return false;
  }
};

const isYouTube = (url) => {
  if (!url) return false;
  return /youtube\.com\/watch\?v=|youtu\.be\//i.test(url);
};

const toYouTubeEmbed = (url) => {
  try {
    const m1 = url.match(/[?&]v=([^&]+)/);
    if (m1 && m1[1]) return `https://www.youtube.com/embed/${m1[1]}`;
    const m2 = url.match(/youtu\.be\/([^?&]+)/);
    if (m2 && m2[1]) return `https://www.youtube.com/embed/${m2[1]}`;
    return url;
  } catch {
    return url;
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
          {!url ? (
            <div className="preview-empty">Preview tidak tersedia.</div>
          ) : isPdf(url) ? (
            <iframe
              title={title}
              src={url}
              frameBorder="0"
              style={{ width: "100%", height: "100%" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : isYouTube(url) ? (
            <iframe
              title={title}
              src={toYouTubeEmbed(url)}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%" }}
            />
          ) : isVideo(url) ? (
            <video controls style={{ width: "100%", maxHeight: "80vh" }}>
              <source src={url} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={url}
              alt={title}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
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
