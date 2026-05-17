import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  Loader,
  Download,
  Search,
  ChevronRight,
  SortAsc,
  Filter,
} from "lucide-react";
import ApiService from "../services/apiService";
import "./CategoryPage.css";
import DocumentPreview from "./DocumentPreview";

const formatSlug = (slug) => {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const normalizeItem = (item) => ({
  title: item.title || item.judul || item.nama || item.name || "Dokumen",
  category: item.category || item.kategori || item.tipe || "Dokumen",
  description:
    item.description || item.deskripsi || item.summary || item.isi || "",
  fileUrl: item.file_url || item.file || item.url || item.link || "#",
  date: item.date || item.tanggal || item.created_at || "-",
  size: item.size || item.file_size || item.ukuran || "-",
  type: (item.type || item.format || item.tipe || "PDF").toUpperCase(),
});

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

  // Reset page when search or filter changes
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

  // Sorting
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "date-desc") {
      return new Date(b.date || 0) - new Date(a.date || 0);
    } else if (sortBy === "date-asc") {
      return new Date(a.date || 0) - new Date(b.date || 0);
    } else if (sortBy === "title-asc") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "title-desc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  // Get unique file types
  const fileTypes = [...new Set(items.map((item) => item.type))];

  // Pagination
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
      <div className="container-narrow">
        <header className="category-header">
          <div className="category-top-actions">
            <button onClick={() => navigate(-1)} className="category-back-btn">
              <ArrowLeft size={18} />
              <span>Kembali</span>
            </button>
            <nav className="category-breadcrumb">
              <Link to="/">Beranda</Link>
              <ChevronRight size={14} />
              <Link to="/kategori">Kategori</Link>
              <ChevronRight size={14} />
              <span>{formatSlug(slug)}</span>
            </nav>
          </div>
          <h1>{formatSlug(slug)}</h1>
          <div className="category-search-row">
            <div className="category-search-input">
              <Search size={20} />
              <input
                type="text"
                placeholder="Cari berdasarkan judul atau deskripsi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filter dan Sort Controls */}
          <div className="category-controls">
            <div className="control-group">
              <label className="control-label">Urutkan:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="control-select"
              >
                <option value="date-desc">Tanggal Terbaru</option>
                <option value="date-asc">Tanggal Tertua</option>
                <option value="title-asc">Judul A-Z</option>
                <option value="title-desc">Judul Z-A</option>
              </select>
            </div>

            {fileTypes.length > 1 && (
              <div className="control-group">
                <label className="control-label">Tipe File:</label>
                <div className="filter-chips">
                  {fileTypes.map((type) => (
                    <button
                      key={type}
                      className={`filter-chip ${
                        selectedTypes.includes(type) ? "active" : ""
                      }`}
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
                      Hapus Filter
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="category-stats">
            <span>
              Total: <strong>{sortedItems.length}</strong> item
            </span>
            {selectedTypes.length > 0 && (
              <span>
                Filter: <strong>{selectedTypes.join(", ")}</strong>
              </span>
            )}
          </div>
        </header>

        {loading && (
          <div className="loading-container">
            <Loader className="loading-spinner" />
            <p>Memuat data kategori...</p>
          </div>
        )}

        {!loading && error && (
          <div className="error-container">
            <p>Terjadi kesalahan: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="category-grid-page">
              {filteredItems.length > 0 ? (
                paginatedItems.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="doc-page-card">
                    <div className="doc-card-top">
                      <div
                        className={`doc-type-badge ${item.type.toLowerCase()}`}
                      >
                        <Download size={16} />
                        <span>{item.type}</span>
                      </div>
                      <span className="doc-cat">{item.category}</span>
                    </div>
                    <div className="doc-card-body">
                      <h3>{item.title}</h3>
                      <div className="doc-meta-simple">
                        <div className="meta-info-item">
                          <span>Terbit: {item.date}</span>
                        </div>
                        <div className="meta-info-item">
                          <span>Ukuran: {item.size}</span>
                        </div>
                      </div>
                      <p>{item.description}</p>
                    </div>
                    <div className="doc-card-actions">
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => openPreview(item.fileUrl, item.title)}
                          className="btn-download-premium"
                        >
                          <Download size={18} />
                          <span>Preview</span>
                        </button>
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-download-premium"
                        >
                          <Download size={18} />
                          <span>Unduh</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-empty-state">
                  <Download size={60} />
                  <h3>Tidak ada data yang cocok</h3>
                  <p>
                    {searchTerm
                      ? `Tidak ada hasil untuk "${searchTerm}"`
                      : selectedTypes.length > 0
                        ? `Tidak ada file dengan tipe: ${selectedTypes.join(", ")}`
                        : `Belum ada konten untuk kategori ${formatSlug(slug)}.`}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="category-pagination-controls">
                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                >
                  Pertama
                </button>
                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Sebelumnya
                </button>
                <span className="page-info">
                  Halaman {currentPage} dari {totalPages}
                </span>
                <button
                  className="page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Berikutnya
                </button>
                <button
                  className="page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  Terakhir
                </button>
              </div>
            )}

            <DocumentPreview
              open={previewOpen}
              url={previewUrl}
              title={previewTitle}
              onClose={closePreview}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
