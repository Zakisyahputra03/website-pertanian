import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Download,
  FileText,
  CheckSquare,
  Zap,
  BarChart3,
  ListChecks,
  Award,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import "./AllCategories.css";

const categoryGroups = [
  {
    id: "perencanaan",
    label: "Perencanaan",
    description:
      "Dokumen perencanaan dan arahan strategis untuk program tahunan.",
    items: [
      {
        slug: "rencana-kerja",
        label: "Rencana Kerja",
        description: "Rencana kerja dan program tahunan.",
        icon: ListChecks,
        color: "teal",
        actionLabel: "Buka Detail",
      },
      {
        slug: "rencana-strategis",
        label: "Rencana Strategis",
        description: "Strategi jangka panjang Dinas Pertanian.",
        icon: BookOpen,
        color: "yellow",
        actionLabel: "Buka Detail",
      },
    ],
  },
  {
    id: "pelaksanaan",
    label: "Pelaksanaan",
    description: "Kategori dokumen untuk kinerja dan realisasi program.",
    items: [
      {
        slug: "indikator-kinerja-individu",
        label: "Indikator Kinerja Individu",
        description: "IKI pegawai dan pejabat.",
        icon: Award,
        color: "violet",
        actionLabel: "Buka Detail",
      },
      {
        slug: "iku",
        label: "IKU",
        description: "Indikator Kinerja Utama.",
        icon: Zap,
        color: "amber",
        actionLabel: "Buka Detail",
      },
      {
        slug: "renaksi-dan-realisasi-renaksi",
        label: "Renaksi & Realisasi",
        description: "Rencana kerja dan realisasinya.",
        icon: BarChart3,
        color: "fuchsia",
        actionLabel: "Buka Detail",
      },
      {
        slug: "skp",
        label: "SKP",
        description: "Sasaran Kerja Pegawai.",
        icon: CheckSquare,
        color: "sky",
        actionLabel: "Buka Detail",
      },
    ],
  },
  {
    id: "dokumen",
    label: "Dokumen",
    description: "Akses unduhan dokumen penting dan sumber informasi.",
    items: [
      {
        slug: "download",
        label: "Unduhan",
        description: "Indikator Kinerja Utama dan dokumen resmi.",
        icon: Download,
        color: "green",
        actionLabel: "Unduh Semua",
      },
    ],
  },
];

const AllCategories = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredGroups = categoryGroups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.label.toLowerCase().includes(normalizedSearch) ||
          item.description.toLowerCase().includes(normalizedSearch),
      ),
    }))
    .filter((group) => group.items.length > 0);

  const totalItems = categoryGroups.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );
  const visibleItems = filteredGroups.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );

  return (
    <div className="all-categories-wrapper">
      <div className="container-narrow">
        <header className="categories-header">
          <div className="categories-top-actions">
            <button
              onClick={() => navigate(-1)}
              className="categories-back-btn"
            >
              <ArrowLeft size={18} />
              <span>Kembali</span>
            </button>
            <nav className="categories-breadcrumb">
              <Link to="/">Beranda</Link>
              <ChevronRight size={14} />
              <span>Daftar Kategori</span>
            </nav>
          </div>

          <div className="categories-header-content">
            <h1>Daftar Kategori Konten</h1>
            <p>
              Jelajahi kategori dokumen dan laporan penting dari Dinas Pertanian
              Provinsi Sumatera Barat.
            </p>
          </div>

          <div className="categories-search-wrapper">
            <input
              type="text"
              placeholder="Cari kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="categories-search-input"
            />
          </div>

          <div className="categories-info-bar">
            <span className="info-item">
              <strong>{totalItems}</strong> kategori tersedia
            </span>
            <span className="info-item">
              <strong>{visibleItems}</strong> kategori ditampilkan
            </span>
          </div>
        </header>

        {filteredGroups.map((group) => (
          <section key={group.id} className="category-section">
            <div className="section-heading">
              <div>
                <p className="section-label">{group.label}</p>
                <h2>{group.description}</h2>
              </div>
            </div>
            <div className="section-grid">
              {group.items.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.slug}
                    to={`/kategori/${item.slug}`}
                    className={`category-card category-card--${item.color}`}
                  >
                    <div className="category-card-icon">
                      <IconComponent size={28} />
                    </div>
                    <div className="category-card-content">
                      <h3>{item.label}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div className="category-card-action">
                      {item.actionLabel}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {visibleItems === 0 && (
          <div className="categories-empty-state">
            <p>
              {searchTerm
                ? "Tidak ada kategori yang cocok dengan pencarian kamu."
                : "Tidak ada kategori yang sesuai saat ini."}
            </p>
            {searchTerm && (
              <button
                type="button"
                className="reset-search"
                onClick={() => setSearchTerm("")}
              >
                Bersihkan pencarian
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCategories;
