import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Newspaper,
  Image,
  Video,
  Bell,
  Download,
  FileText,
  CheckSquare,
  Zap,
  BarChart3,
  ListChecks,
  Award,
  BookOpen,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import "./AllCategories.css";

const categories = [



  {
    slug: "download",
    label: "Unduhan / Dokumen",
    description: "Dokumen resmi dan file yang dapat diunduh",
    icon: Download,
    color: "green",
  },
  {
    slug: "perjanjian-kinerja",
    label: "Perjanjian Kinerja",
    description: "Perjanjian kinerja tahun berjalan",
    icon: FileText,
    color: "pink",
  },
  {
    slug: "rencana-kerja",
    label: "Rencana Kerja",
    description: "Rencana kerja dan program tahunan",
    icon: ListChecks,
    color: "teal",
  },
  {
    slug: "rencana-kinerja-tahunan",
    label: "Rencana Kinerja Tahunan",
    description: "Perencanaan kinerja untuk tahun depan",
    icon: Zap,
    color: "lime",
  },
  {
    slug: "rencana-strategis",
    label: "Rencana Strategis",
    description: "Strategi jangka panjang Dinas Pertanian",
    icon: BookOpen,
    color: "yellow",
  },
  {
    slug: "sop",
    label: "SOP",
    description: "Standar Operasional Prosedur",
    icon: CheckSquare,
    color: "emerald",
  },
  {
    slug: "indikator-kinerja-individu",
    label: "Indikator Kinerja Individu",
    description: "IKI pegawai dan pejabat",
    icon: Award,
    color: "violet",
  },
  {
    slug: "renaksi-dan-realisasi-renaksi",
    label: "Renaksi & Realisasi",
    description: "Rencana kerja dan realisasinya",
    icon: BarChart3,
    color: "fuchsia",
  },
  {
    slug: "skp",
    label: "SKP",
    description: "Sasaran Kerja Pegawai",
    icon: CheckSquare,
    color: "sky",
  },
  {
    slug: "iku",
    label: "IKU",
    description: "Indikator Kinerja Utama",
    icon: Zap,
    color: "amber",
  },
];

const AllCategories = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter(
    (c) =>
      c.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="all-categories-wrapper">
      <div className="container-narrow">
        {/* Header */}
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
              Jelajahi berbagai kategori konten dari Dinas Pertanian Provinsi
              Sumatera Barat
            </p>
          </div>

          {/* Search */}
          <div className="categories-search-wrapper">
            <input
              type="text"
              placeholder="Cari kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="categories-search-input"
            />
          </div>

          {/* Info Stats */}
          <div className="categories-info-bar">
            <span className="info-item">
              <strong>{categories.length}</strong> Kategori tersedia
            </span>
            <span className="info-item">
              <strong>{filteredCategories.length}</strong> Kategori ditampilkan
            </span>
          </div>
        </header>

        {/* Grid Kategori */}
        <main className="categories-grid">
          {filteredCategories.map((c) => {
            const IconComponent = c.icon;
            return (
              <Link
                key={c.slug}
                to={`/kategori/${c.slug}`}
                className={`category-card category-card--${c.color}`}
              >
                <div className="category-card-icon">
                  <IconComponent size={32} />
                </div>
                <div className="category-card-content">
                  <h3>{c.label}</h3>
                  <p>{c.description}</p>
                </div>
                <div className="category-card-arrow">
                  <ChevronRight size={20} />
                </div>
              </Link>
            );
          })}
        </main>

        {filteredCategories.length === 0 && (
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
