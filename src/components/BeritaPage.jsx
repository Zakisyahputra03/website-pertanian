import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  ChevronRight,
  ArrowLeft,
  Loader,
} from "lucide-react";
import ApiService from "../services/apiService";
import "./BeritaPage.css";

const BeritaPage = () => {
  const [beritaData, setBeritaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const itemsPerPage = 3;

  // Fetch berita data from API
  useEffect(() => {
    const fetchBerita = async () => {
      try {
        setLoading(true);
        const result = await ApiService.getBeritaUtama();
        setBeritaData(ApiService.normalizeList(result));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  // Handle search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) {
      setSearchQuery(q);
    }
  }, [location.search]);

  // Reset page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Filter berita based on search query
  const filteredBerita = beritaData.filter(
    (item) =>
      (item.title &&
        item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.description &&
        item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category &&
        item.category.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  // Pagination Calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBerita.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBerita.length / itemsPerPage);

  if (loading) {
    return (
      <div className="neat-news-page">
        <div className="container-narrow">
          <div className="loading-container">
            <Loader className="loading-spinner" />
            <p>Memuat berita...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="neat-news-page">
        <div className="container-narrow">
          <div className="error-container">
            <p>Terjadi kesalahan saat memuat berita: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="neat-news-page">
      <div className="container-narrow">
        {/* Minimal Header */}
        <header className="neat-header">
          <div className="neat-top-actions">
            <button onClick={() => navigate(-1)} className="neat-back-btn">
              <ArrowLeft size={18} />
              <span>Kembali</span>
            </button>
            <nav className="neat-breadcrumb-v2">
              <Link to="/">Beranda</Link>
              <ChevronRight size={12} />
              <span>Arsip Berita</span>
            </nav>
          </div>
          <h1>Warta & Dokumentasi</h1>
          <div className="neat-search-row">
            <div className="neat-search-input">
              <Search size={20} />
              <input
                type="text"
                placeholder="Cari berdasarkan judul atau topik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="neat-news-list">
          {currentItems.map((item, index) => (
            <article key={item.id || index} className="neat-news-item">
              <div className="neat-item-img">
                <Link to={`/berita/${item.id || index}`}>
                  <img
                    src={
                      ApiService.resolveMediaUrl(
                        item.image ||
                          item.thumbnail ||
                          item.foto ||
                          item.cover ||
                          item.gambar,
                      ) || "/placeholder-news.svg"
                    }
                    alt={item.title || item.judul}
                  />
                </Link>
                <span className="neat-tag">
                  {item.category || item.kategori || item.tag || "Berita"}
                </span>
              </div>
              <div className="neat-item-content">
                <div className="neat-meta">
                  <span>
                    {item.date ||
                      item.tanggal ||
                      item.created_at ||
                      "Tanggal tidak tersedia"}
                  </span>
                  <span className="dot"></span>
                  <span>
                    {item.penulis || item.author || item.writer || "Redaksi"}
                  </span>
                  <span className="dot"></span>
                  <span>
                    {item.readTime ||
                      item.waktu_baca ||
                      item.duration ||
                      "5 menit"}{" "}
                    Baca
                  </span>
                </div>
                <h2>
                  <Link to={`/berita/${item.id || index}`}>
                    {item.title || item.judul}
                  </Link>
                </h2>
                {item.subtitle || item.subjudul || item.summary ? (
                  <p className="neat-news-subtitle">
                    {item.subtitle || item.subjudul || item.summary}
                  </p>
                ) : null}
                <p>
                  {item.excerpt ||
                    item.summary ||
                    item.description ||
                    item.deskripsi ||
                    (item.content
                      ? item.content.substring(0, 150) + "..."
                      : "")}
                </p>
                <Link
                  to={`/berita/${item.id || index}`}
                  className="neat-more-link"
                >
                  Baca Selengkapnya <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredBerita.length === 0 && !loading && (
          <div className="neat-empty">
            <p>
              Tidak ada warta yang ditemukan untuk pencarian "{searchQuery}".
            </p>
          </div>
        )}

        {filteredBerita.length > 0 && (
          <footer className="neat-pagination">
            <div className="neat-page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    className={`neat-page-btn ${currentPage === number ? "active" : ""}`}
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                ),
              )}
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

export default BeritaPage;
