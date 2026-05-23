import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Search,
  ChevronRight,
  Eye,
  FileText,
  Calendar,
  HardDrive,
  AlertCircle,
  FolderOpen,
  Filter,
  LayoutGrid,
  List,
} from "lucide-react";
import ApiService from "../services/apiService";
import "./CategoryPage.css";
import DocumentPreview from "./DocumentPreview";

const formatSlug = (slug) => {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const normalizeItem = (item) => {
  const resolveUrl = (raw) => {
    if (!raw) return null;
    const s = String(raw).trim();
    if (!s) return null;
    if (s.startsWith("http://") || s.startsWith("https://")) return s;
    if (s.startsWith("//")) return `https:${s}`;
    if (s.startsWith("/")) return `https://api-web.sumbarprov.go.id${s}`;
    // fallback: assume relative path on API host
    return `https://api-web.sumbarprov.go.id/${s}`;
  };

  const rawFile =
    item.file_url || item.file || item.url || item.link || item.cover || null;
  const fileUrl = resolveUrl(rawFile);

  const rawCover =
    item.cover || item.gambar || item.image || item.thumbnail || null;
  const coverUrl = resolveUrl(rawCover);

  // Detect file type from URL or explicit field
  const rawType = (item.type || item.format || item.tipe || "").toString();
  const lowerFile = String(rawFile || "").toLowerCase();
  const detectedType =
    rawType ||
    (lowerFile.includes(".pdf")
      ? "pdf"
      : lowerFile.includes(".xlsx") || lowerFile.includes(".xls")
        ? "xlsx"
        : lowerFile.includes(".docx") || lowerFile.includes(".doc")
          ? "docx"
          : lowerFile.includes(".pptx") || lowerFile.includes(".ppt")
            ? "pptx"
            : lowerFile.includes(".jpg") ||
                lowerFile.includes(".png") ||
                lowerFile.includes(".jpeg")
              ? "jpg"
              : "PDF");

  return {
    title: item.title || item.judul || item.nama || item.name || "Dokumen",
    category: item.category || item.kategori || item.tipe || "Dokumen",
    description:
      item.description || item.deskripsi || item.summary || item.isi || "",
    fileUrl,
    coverUrl,
    coverRaw: rawCover,
    date: item.date || item.tanggal || item.created_at || "-",
    size: item.size || item.file_size || item.ukuran || "-",
    type: detectedType.toUpperCase(),
  };
};

const stripHtml = (html) => {
  if (!html) return "";
  try {
    return String(html)
      .replace(/<[^>]*>/g, "")
      .trim();
  } catch {
    return String(html);
  }
};
// Skeleton loading card
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-line short" />
    <div className="skeleton-line medium" style={{ marginTop: "0.5rem" }} />
    <div className="skeleton-line tall" style={{ marginTop: "1rem" }} />
    <div className="skeleton-line full" style={{ marginTop: "1rem" }} />
    <div className="skeleton-line short" style={{ marginTop: "0.5rem" }} />
  </div>
);

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const isInfografis = slug === "infografis";

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await ApiService.getCategory(slug);
        const list = ApiService.normalizeList(result);
        setItems(list.map(normalizeItem));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching category data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [slug]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTypes, sortBy]);

  const filteredItems = items.filter(
    (item) =>
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTypes.length === 0 || selectedTypes.includes(item.type)),
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "date-desc")
      return new Date(b.date || 0) - new Date(a.date || 0);
    if (sortBy === "date-asc")
      return new Date(a.date || 0) - new Date(b.date || 0);
    if (sortBy === "title-asc") return a.title.localeCompare(b.title);
    if (sortBy === "title-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  const fileTypes = [...new Set(items.map((item) => item.type))];
  const totalPages = Math.max(1, Math.ceil(sortedItems.length / itemsPerPage));
  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const openPreview = (url, title) => {
    setPreviewUrl(url || "");
    setPreviewTitle(title || "Preview Dokumen");
    setPreviewOpen(true);
  };
  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewUrl("");
    setPreviewTitle("");
  };

  return (
    <div className="category-page-wrapper">
      {/* ===== HERO HEADER ===== */}
      <div className="category-hero-header">
        <div className="hero-inner">
          <div className="category-top-actions">
            <button onClick={() => navigate(-1)} className="category-back-btn">
              <ArrowLeft size={16} />
              <span>Kembali</span>
            </button>
            <nav className="category-breadcrumb">
              <Link to="/">Beranda</Link>
              <ChevronRight size={12} />
              <Link to="/kategori">Kategori</Link>
              <ChevronRight size={12} />
              <span className="current-crumb">{formatSlug(slug)}</span>
            </nav>
          </div>

          <div className="category-hero-content">
            <div className="category-hero-badge">
              <FileText size={12} />
              {isInfografis ? "Visualisasi Data" : "Repositori Dokumen"}
            </div>
            <h1>
              {isInfografis ? "Infografis Pertanian Sumbar" : formatSlug(slug)}
            </h1>
            <p>
              {isInfografis
                ? "Kumpulan infografis visualisasi data produksi, luas tanam, dan indikator pertanian Sumatera Barat."
                : `Kumpulan dokumen resmi dan informasi terkait ${formatSlug(
                    slug,
                  ).toLowerCase()} Dinas Pertanian Provinsi Sumatera Barat.`}
            </p>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container-narrow" style={{ marginTop: "2.5rem" }}>
        {/* Search & Sort Bar */}
        <div className="category-controls-bar">
          <div className="category-search-input">
            <Search size={18} />
            <input
              type="text"
              placeholder="Cari berdasarkan judul atau deskripsi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="control-divider" />
          <div className="control-select-wrap">
            <Filter size={15} style={{ color: "#64748b" }} />
            <span className="control-select-label">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="control-select"
            >
              <option value="date-desc">Terbaru</option>
              <option value="date-asc">Terlama</option>
              <option value="title-asc">Judul A-Z</option>
              <option value="title-desc">Judul Z-A</option>
            </select>
          </div>
          <div className="control-divider" />
          <div className="view-toggle-wrap">
            <button
              className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Tampilan Grid"
              aria-label="Tampilan Grid"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              title="Tampilan Daftar"
              aria-label="Tampilan Daftar"
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        {fileTypes.length > 1 && (
          <div className="filter-chips-row">
            <span className="filter-label">Format:</span>
            {fileTypes.map((type) => (
              <button
                key={type}
                className={`filter-chip ${selectedTypes.includes(type) ? "active" : ""}`}
                onClick={() => {
                  setSelectedTypes((prev) =>
                    prev.includes(type)
                      ? prev.filter((t) => t !== type)
                      : [...prev, type],
                  );
                  setCurrentPage(1);
                }}
              >
                {type}
              </button>
            ))}
            {selectedTypes.length > 0 && (
              <button
                className="filter-chip-clear"
                onClick={() => setSelectedTypes([])}
              >
                ✕ Hapus Filter
              </button>
            )}
          </div>
        )}

        {/* Stats Row */}
        {!loading && !error && (
          <div className="category-stats-row">
            <div className="stats-pill">
              <FolderOpen size={14} />
              Total: <strong>{sortedItems.length}</strong> dokumen
              {searchTerm && (
                <span style={{ opacity: 0.7 }}> (dari pencarian)</span>
              )}
            </div>
            {selectedTypes.length > 0 && (
              <div className="stats-pill">
                Filter: <strong>{selectedTypes.join(", ")}</strong>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="skeleton-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="error-container">
            <AlertCircle
              size={40}
              style={{ color: "#dc2626", marginBottom: "0.75rem" }}
            />
            <p>Gagal memuat data: {error}</p>
          </div>
        )}

        {/* Document Grid */}
        {!loading && !error && isInfografis && (
          <div className="infografis-full-view">
            {paginatedItems.length > 0 ? (
              viewMode === "grid" ? (
                <div className="infografis-grid">
                  {paginatedItems.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="infografis-card"
                    >
                      <div className="infografis-card-thumb">
                        {item.coverUrl ? (
                          <img
                            src={item.coverUrl}
                            alt={item.title}
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/420x280?text=Infografis";
                            }}
                          />
                        ) : (
                          <div className="infografis-placeholder">
                            <FolderOpen size={32} />
                          </div>
                        )}
                      </div>
                      <div className="infografis-card-body">
                        <h3>{item.title}</h3>
                        <div className="doc-meta-row">
                          {item.date && item.date !== "-" && (
                            <div className="doc-meta-item">
                              <Calendar size={12} />
                              <span>{item.date}</span>
                            </div>
                          )}
                        </div>
                        <p>{stripHtml(item.description)}</p>
                        <div className="infografis-card-actions">
                          <button
                            onClick={() => openPreview(item.fileUrl, item.title)}
                            className="btn-preview-doc"
                          >
                            <Eye size={15} />
                            Lihat
                          </button>
                          <a
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-download-doc"
                          >
                            <Download size={15} />
                            Unduh
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="infografis-list-container">
                  {paginatedItems.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="infografis-list-item"
                    >
                      <div className="infografis-list-left">
                        {item.coverUrl ? (
                          <img
                            src={item.coverUrl}
                            alt={item.title}
                            className="infografis-list-thumb"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/120x80?text=Infografis";
                            }}
                          />
                        ) : (
                          <div className="infografis-list-placeholder">
                            <FolderOpen size={20} />
                          </div>
                        )}
                        <div className="infografis-list-details">
                          <h3>{item.title}</h3>
                          <p>{stripHtml(item.description)}</p>
                          <div className="doc-meta-row">
                            {item.date && item.date !== "-" && (
                              <div className="doc-meta-item">
                                <Calendar size={12} />
                                <span>{item.date}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="infografis-list-right">
                        <button
                          onClick={() => openPreview(item.fileUrl, item.title)}
                          className="btn-preview-doc-compact"
                          title="Lihat"
                        >
                          <Eye size={15} />
                          <span>Lihat</span>
                        </button>
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-download-doc-compact"
                          title="Unduh"
                        >
                          <Download size={15} />
                          <span>Unduh</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="p-empty-state">
                <FolderOpen size={72} />
                <h3>Belum ada infografis</h3>
                <p>
                  {searchTerm
                    ? `Tidak ada hasil untuk "${searchTerm}"`
                    : `Infografis untuk kategori ${formatSlug(slug)} belum tersedia. Silakan cek kembali nanti.`}
                </p>
              </div>
            )}
          </div>
        )}

        {!loading && !error && !isInfografis && (
          <>
            {paginatedItems.length > 0 ? (
              viewMode === "grid" ? (
                <div className="category-grid-page">
                  {paginatedItems.map((item, index) => (
                    <div key={`${item.title}-${index}`} className="doc-page-card">
                      {/* Cover Image (if any) */}
                      {item.coverUrl && (
                        <img
                          src={item.coverUrl}
                          alt={item.title}
                          className="doc-cover-image"
                          data-coverraw={item.coverRaw || ""}
                          data-tried={0}
                          onError={(e) => {
                            try {
                              const img = e.target;
                              const tried = Number(img.dataset.tried || 0);
                              const raw = img.dataset.coverraw || "";
                              const src = img.src || "";
                              const candidates = [];

                              // If raw looks like protocol-relative
                              if (raw.startsWith("//"))
                                candidates.push(`https:${raw}`);
                              // If raw starts with single slash
                              if (raw.startsWith("/"))
                                candidates.push(
                                  `https://api-web.sumbarprov.go.id${raw}`,
                                );
                              // If raw is relative path (no protocol, no leading slash)
                              if (
                                raw &&
                                !raw.startsWith("http") &&
                                !raw.startsWith("/")
                              )
                                candidates.push(
                                  `https://api-web.sumbarprov.go.id/${raw}`,
                                );
                              // Try swapping api-web host variants
                              if (src.includes("api-web.sumbarprov.go.id")) {
                                candidates.push(
                                  src.replace(
                                    "api-web.sumbarprov.go.id",
                                    "sumbarprov.go.id",
                                  ),
                                );
                                candidates.push(
                                  src.replace(
                                    "api-web.sumbarprov.go.id",
                                    "www.sumbarprov.go.id",
                                  ),
                                );
                              }
                              // Try toggling https/http
                              if (src.startsWith("https://"))
                                candidates.push(
                                  src.replace("https://", "http://"),
                                );
                              if (src.startsWith("http://"))
                                candidates.push(
                                  src.replace("http://", "https://"),
                                );

                              // remove duplicates
                              const uniq = [
                                ...new Set(candidates.filter(Boolean)),
                              ];

                              if (tried < uniq.length) {
                                img.dataset.tried = tried + 1;
                                img.src = uniq[tried];
                              } else {
                                img.style.display = "none";
                              }
                            } catch (err) {
                              e.target.style.display = "none";
                            }
                          }}
                        />
                      )}

                      <div className="doc-card-inner">
                        {/* Badges */}
                        <div className="doc-card-top">
                          <span
                            className={`doc-type-badge ${item.type.toLowerCase()}`}
                          >
                            <Download size={11} />
                            {item.type}
                          </span>
                          <span className="doc-cat">{item.category}</span>
                        </div>

                        {/* Body */}
                        <div className="doc-card-body">
                          <h3>{item.title}</h3>

                          <div className="doc-meta-row">
                            {item.date && item.date !== "-" && (
                              <div className="doc-meta-item">
                                <Calendar size={12} />
                                <span>{item.date}</span>
                              </div>
                            )}
                            {item.size && item.size !== "-" && (
                              <div className="doc-meta-item">
                                <HardDrive size={12} />
                                <span>{item.size}</span>
                              </div>
                            )}
                          </div>

                          {item.description && (
                            <p>{stripHtml(item.description)}</p>
                          )}
                        </div>

                        <div className="doc-card-divider" />

                        {/* Actions */}
                        <div className="doc-card-actions">
                          <button
                            onClick={() => openPreview(item.fileUrl, item.title)}
                            className="btn-preview-doc"
                          >
                            <Eye size={15} />
                            Preview
                          </button>
                          <a
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-download-doc"
                          >
                            <Download size={15} />
                            Unduh
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="category-list-page">
                  {paginatedItems.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="doc-page-list-item"
                    >
                      <div className="doc-list-left">
                        <div className="doc-list-badge-wrap">
                          <span
                            className={`doc-type-badge ${item.type.toLowerCase()}`}
                          >
                            {item.type}
                          </span>
                        </div>
                        <div className="doc-list-details">
                          <h3>{item.title}</h3>
                          {item.description && (
                            <p className="doc-list-desc">
                              {stripHtml(item.description)}
                            </p>
                          )}
                          <div className="doc-meta-row">
                            <span className="doc-cat-tag">{item.category}</span>
                            {item.date && item.date !== "-" && (
                              <div className="doc-meta-item">
                                <Calendar size={12} />
                                <span>{item.date}</span>
                              </div>
                            )}
                            {item.size && item.size !== "-" && (
                              <div className="doc-meta-item">
                                <HardDrive size={12} />
                                <span>{item.size}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="doc-list-right">
                        <button
                          onClick={() => openPreview(item.fileUrl, item.title)}
                          className="btn-preview-doc-compact"
                          title="Preview Dokumen"
                        >
                          <Eye size={15} />
                          <span>Preview</span>
                        </button>
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-download-doc-compact"
                          title="Unduh Dokumen"
                        >
                          <Download size={15} />
                          <span>Unduh</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="p-empty-state">
                <FolderOpen size={72} />
                <h3>Belum ada dokumen</h3>
                <p>
                  {searchTerm
                    ? `Tidak ada hasil untuk "${searchTerm}"`
                    : selectedTypes.length > 0
                      ? `Tidak ada file dengan tipe: ${selectedTypes.join(", ")}`
                      : `Dokumen untuk kategori ${formatSlug(slug)} belum tersedia. Silakan cek kembali nanti.`}
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="category-pagination-controls">
                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                >
                  ««
                </button>
                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  ‹ Sebelumnya
                </button>
                <span className="page-info">
                  {currentPage} / {totalPages}
                </span>
                <button
                  className="page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Berikutnya ›
                </button>
                <button
                  className="page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  »»
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <DocumentPreview
        open={previewOpen}
        url={previewUrl}
        title={previewTitle}
        onClose={closePreview}
      />
    </div>
  );
};

export default CategoryPage;
