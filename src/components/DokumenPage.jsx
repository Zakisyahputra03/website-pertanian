import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FileText,
  Download,
  ArrowLeft,
  ChevronRight,
  Search,
  FileCode,
  FileType,
  Filter,
  Share2,
  Info,
} from "lucide-react";
import ApiService from "../services/apiService";
import "./DokumenPage.css";

const DokumenPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Semua");
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const allDocs = [
    {
      id: 1,
      title: "Laporan Kinerja Instansi Pemerintah (LKjIP) 2024",
      category: "Laporan",
      size: "2.4 MB",
      date: "Januari 2025",
      type: "PDF",
    },
    {
      id: 2,
      title: "Rencana Strategis (Renstra) Dinas Pertanian 2021-2026",
      category: "Perencanaan",
      size: "4.1 MB",
      date: "Maret 2021",
      type: "PDF",
    },
    {
      id: 3,
      title: "Daftar Isian Pelaksanaan Anggaran (DIPA) TA 2025",
      category: "Anggaran",
      size: "1.8 MB",
      date: "Desember 2024",
      type: "PDF",
    },
    {
      id: 4,
      title: "Rencana Kerja (Renja) Dinas Pertanian Tahun 2025",
      category: "Perencanaan",
      size: "3.2 MB",
      date: "Juni 2024",
      type: "PDF",
    },
    {
      id: 5,
      title: "Profil Sektor Pertanian Sumatera Barat Edisi 2024",
      category: "Data",
      size: "5.2 MB",
      date: "Agustus 2024",
      type: "PDF",
    },
    {
      id: 6,
      title: "Statistik Luas Panen dan Produksi Padi Sumbar 2023",
      category: "Data",
      size: "2.1 MB",
      date: "Mei 2024",
      type: "XLSX",
    },
  ];

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await ApiService.getDownloadData();
        const list = ApiService.normalizeList(result).map((item, index) => ({
          id: item.id || item.document_id || item.id_content || index + 1,
          title:
            item.title ||
            item.judul ||
            item.nama ||
            item.name ||
            "Dokumen Publik",
          category: item.category || item.kategori || item.tipe || "Laporan",
          size:
            item.size ||
            item.ukuran ||
            item.file_size ||
            item.file_size ||
            "N/A",
          date:
            item.tanggal || item.date || item.created_at || "Tidak tersedia",
          type: (
            item.type ||
            item.tipe ||
            item.file_type ||
            "PDF"
          ).toUpperCase(),
          url:
            item.file_url ||
            item.file ||
            item.link ||
            item.download_url ||
            item.url ||
            null,
        }));

        setDocs(list.length > 0 ? list : allDocs);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching dokumen:", err);
        setDocs(allDocs);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const categories = ["Semua", "Laporan", "Perencanaan", "Anggaran", "Data"];

  const filteredDocs = docs.filter((doc) => {
    const matchesSearch = doc.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === "Semua" || doc.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="dokumen-page">
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
              <span>Dokumen Publik</span>
            </nav>
          </div>

          <div className="header-content-v2">
            <div className="icon-circle">
              <FileText size={28} />
            </div>
            <h1>Dokumen Publik</h1>
            <p>
              Pusat unduhan berkas resmi, laporan kinerja, dan dokumen
              perencanaan Dinas Pertanian Provinsi Sumatera Barat.
            </p>
          </div>

          <div className="search-and-filter">
            <div className="search-bar-modern">
              <Search size={20} className="search-ico" />
              <input
                type="text"
                placeholder="Cari dokumen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="tab-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tab-chip ${activeTab === cat ? "active" : ""}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="dokumen-grid-page">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc) => (
              <div key={doc.id} className="doc-page-card">
                <div className="doc-card-top">
                  <div className={`doc-type-badge ${doc.type.toLowerCase()}`}>
                    <FileType size={16} />
                    <span>{doc.type}</span>
                  </div>
                  <span className="doc-cat">{doc.category}</span>
                </div>
                <div className="doc-card-body">
                  <h3>{doc.title}</h3>
                  <div className="doc-meta-simple">
                    <div className="meta-info-item">
                      <Info size={14} />
                      <span>Terbit: {doc.date}</span>
                    </div>
                    <div className="meta-info-item">
                      <Share2 size={14} />
                      <span>Ukuran: {doc.size}</span>
                    </div>
                  </div>
                </div>
                <div className="doc-card-actions">
                  <button className="btn-download-premium">
                    <Download size={18} />
                    <span>Unduh Berkas</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-empty-state">
              <FileCode size={60} />
              <h3>Dokumen Tidak Ditemukan</h3>
              <p>Tidak ada berkas yang sesuai dengan pencarian Anda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DokumenPage;
