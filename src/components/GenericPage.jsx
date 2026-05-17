import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Home, Loader, FileText } from "lucide-react";
import ApiService from "../services/apiService";
import "./DokumenPage.css";

const formatLabel = (slug) => {
  return slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    : "Halaman";
};

const GenericPage = ({ slug: propSlug, pageTitle }) => {
  const params = useParams();
  const slug = propSlug || params.slug;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await ApiService.getPage(slug);
        setData(ApiService.normalizeObject(result));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  const title = pageTitle || formatLabel(slug);

  return (
    <div className="dokumen-page">
      <div className="container-narrow">
        <header className="page-header-v2">
          <div className="top-nav-row">
            <Link to="/" className="premium-back-btn">
              <Home size={18} />
              <span>Beranda</span>
            </Link>
            <nav className="premium-breadcrumb">
              <Link to="/">Beranda</Link>
              <ArrowLeft size={12} />
              <span>{title}</span>
            </nav>
          </div>

          <div className="header-content-v2">
            <div className="icon-circle">
              <FileText size={28} />
            </div>
            <h1>{title}</h1>
            <p>
              Menampilkan halaman {title} langsung dari API Dinas Pertanian.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="loading-container">
            <Loader className="loading-spinner" />
            <p>Memuat halaman...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>Terjadi kesalahan: {error}</p>
          </div>
        ) : data ? (
          <div className="dokumen-grid-page">
            {data.gambar && (
              <div className="doc-page-card">
                <img
                  src={data.gambar}
                  alt={title}
                  style={{
                    width: "100%",
                    borderRadius: "1rem",
                    marginBottom: "1.5rem",
                  }}
                />
              </div>
            )}
            <div className="doc-page-card">
              <div className="doc-card-body">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      data.isi ||
                      data.content ||
                      data.description ||
                      data.deskripsi ||
                      "Konten tidak tersedia.",
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-empty-state">
            <FileText size={60} />
            <h3>Halaman kosong</h3>
            <p>Konten tidak tersedia untuk halaman ini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenericPage;
