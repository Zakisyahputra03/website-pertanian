import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Bell,
  Calendar,
  ArrowLeft,
  ChevronRight,
  Search,
  Info,
  Megaphone,
  Tag,
  Loader,
} from "lucide-react";
import ApiService from "../services/apiService";
import "./PengumumanPage.css";

const PengumumanPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pengumumanData, setPengumumanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPengumuman = async () => {
      try {
        setLoading(true);
        const result = await ApiService.getPengumuman();
        setPengumumanData(Array.isArray(result) ? result : result.data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching pengumuman:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPengumuman();
  }, []);

  // Filter pengumuman based on search term
  const filteredPengumuman = pengumumanData.filter(
    (item) =>
      (item.title &&
        item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.content &&
        item.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.tag && item.tag.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  if (loading) {
    return (
      <div className="pengumuman-page">
        <div className="container">
          <div className="loading-container">
            <Loader className="loading-spinner" />
            <p>Memuat pengumuman...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pengumuman-page">
        <div className="container">
          <div className="error-container">
            <p>Terjadi kesalahan saat memuat pengumuman: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pengumuman-page">
      <div className="container-narrow">
        <header className="page-header-v2">
          <div className="top-nav-row">
            <button onClick={() => navigate(-1)} className="premium-back-btn">
              <ArrowLeft size={18} />
              <span>Kembali</span>
            </button>
            <nav className="premium-breadcrumb">
              <Link to="/">Beranda</Link>
              <ChevronRight size={12} />
              <span>Pengumuman</span>
            </nav>
          </div>

          <div className="header-content-v2">
            <div className="icon-circle">
              <Bell size={28} />
            </div>
            <h1>Arsip Pengumuman</h1>
            <p>
              Informasi resmi, maklumat, dan jadwal kegiatan Dinas Pertanian
              Provinsi Sumatera Barat.
            </p>
          </div>

          <div className="search-bar-modern">
            <Search size={20} className="search-ico" />
            <input
              type="text"
              placeholder="Cari pengumuman..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="pengumuman-grid-page">
          {filteredPengumuman.length > 0 ? (
            filteredPengumuman.map((item, index) => (
              <div
                key={item.id || index}
                className={`p-page-card ${item.important || item.prioritas ? "priority" : ""}`}
              >
                <div className="p-card-header">
                  <span
                    className={`p-tag ${(item.tag || item.kategori || "info").toLowerCase()}`}
                  >
                    <Tag size={12} /> {item.tag || item.kategori || "Info"}
                  </span>
                  <div className="p-date">
                    <Calendar size={14} />
                    <span>
                      {item.date ||
                        item.tanggal ||
                        item.created_at ||
                        "Tanggal tidak tersedia"}
                    </span>
                  </div>
                </div>
                <div className="p-card-body">
                  <h3>{item.title || item.judul}</h3>
                  <p>{item.content || item.deskripsi || item.excerpt}</p>
                </div>
                <div className="p-card-footer">
                  <button className="btn-p-action">
                    Lihat Selengkapnya <ChevronRight size={16} />
                  </button>
                  {(item.important || item.prioritas) && (
                    <span className="important-badge">
                      <Info size={14} /> Penting
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-empty-state">
              <Megaphone size={60} />
              <h3>Tidak Ada Pengumuman</h3>
              <p>Tidak ditemukan pengumuman dengan kata kunci "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PengumumanPage;
