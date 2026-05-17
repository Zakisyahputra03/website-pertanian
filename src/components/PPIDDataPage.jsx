import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Info,
  Target,
  ShieldCheck,
  FileSearch,
  ChevronRight,
  Download,
  Eye,
  Clock,
  ShieldAlert,
  Scale,
  GanttChartSquare,
  ClipboardCheck,
  ArrowLeft,
  Home,
  Loader,
  FileText,
  FolderOpen,
} from "lucide-react";
import ApiService from "../services/apiService";
import "./PPIDPages.css";

const PPIDDataPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [instansiData, setInstansiData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedInstansi, setSelectedInstansi] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [clusterData, setClusterData] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [instansiResult, categoryResult] = await Promise.all([
          ApiService.getPPIDInstansi(),
          ApiService.getPPIDCategory(),
        ]);

        // API PPID mengembalikan struktur: { response: "1", result: [...] }
        setInstansiData(ApiService.normalizeList(instansiResult));
        setCategoryData(ApiService.normalizeList(categoryResult));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching PPID data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const fetchClusterData = async (instansiId, categoryId) => {
    try {
      setLoading(true);
      const result = await ApiService.getPPIDClusterData(
        instansiId,
        categoryId,
      );
      setClusterData(ApiService.normalizeList(result));
    } catch (err) {
      setError(err.message);
      console.error("Error fetching cluster data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInstansiSelect = (instansi) => {
    setSelectedInstansi(instansi);
    setSelectedCategory(null);
    setSelectedDetail(null);
    setClusterData([]);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedDetail(null);
    if (selectedInstansi) {
      fetchClusterData(selectedInstansi.id, category.id);
    }
  };

  const handleShowDetail = async (item) => {
    if (!selectedInstansi) return;
    setSelectedDetail(null);
    setDetailLoading(true);

    try {
      const detailResult = await ApiService.getPPIDDetailDip(
        selectedInstansi.id,
        item.id_content || item.id,
      );
      setSelectedDetail(ApiService.normalizeObject(detailResult));
    } catch (err) {
      setError(err.message);
      console.error("Error fetching detail:", err);
    } finally {
      setDetailLoading(false);
    }
  };

  if (loading && !selectedInstansi) {
    return (
      <div className="ppid-page-container">
        <div className="container">
          <div className="loading-container">
            <Loader className="loading-spinner" />
            <p>Memuat data PPID...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !selectedInstansi) {
    return (
      <div className="ppid-page-container">
        <div className="container">
          <div className="error-container">
            <p>Terjadi kesalahan saat memuat data PPID: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ppid-page-container">
      <div className="container">
        <div className="ppid-header-banner reveal reveal-down">
          <div className="back-btn-wrap">
            <Link to="/" className="back-btn-premium ppid-banner-btn">
              <Home size={18} /> Beranda
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="back-btn-premium ppid-banner-btn"
            >
              <ArrowLeft size={18} /> Kembali
            </button>
          </div>

          <div className="ppid-banner-content">
            <div className="ppid-breadcrumb">PPID / Informasi Publik</div>
            <h1>Informasi Publik PPID</h1>
          </div>
        </div>

        <div className="ppid-main-grid">
          <aside className="ppid-sidebar reveal">
            {/* Instansi Selection */}
            <div className="ppid-section">
              <h3>Pilih Instansi</h3>
              <div className="ppid-instansi-list">
                {instansiData.map((instansi) => (
                  <button
                    key={instansi.id}
                    className={`ppid-instansi-item ${selectedInstansi?.id === instansi.id ? "active" : ""}`}
                    onClick={() => handleInstansiSelect(instansi)}
                  >
                    <FolderOpen size={16} />
                    <span>
                      {instansi.nama ||
                        instansi.name ||
                        `Instansi ${instansi.id}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selection */}
            {selectedInstansi && (
              <div className="ppid-section">
                <h3>Pilih Kategori</h3>
                <div className="ppid-category-list">
                  {categoryData.map((category) => (
                    <button
                      key={category.id}
                      className={`ppid-category-item ${selectedCategory?.id === category.id ? "active" : ""}`}
                      onClick={() => handleCategorySelect(category)}
                    >
                      <FileText size={16} />
                      <span>
                        {category.nama ||
                          category.name ||
                          `Kategori ${category.id}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>

          <main className="ppid-content-card reveal">
            {!selectedInstansi && (
              <div className="ppid-welcome">
                <FileSearch size={48} />
                <h3>Selamat Datang di PPID</h3>
                <p>
                  Pilih instansi dan kategori untuk melihat informasi publik
                  yang tersedia.
                </p>
              </div>
            )}

            {selectedInstansi && !selectedCategory && (
              <div className="ppid-instansi-detail">
                <h3>{selectedInstansi.nama || selectedInstansi.name}</h3>
                <p>
                  {selectedInstansi.deskripsi ||
                    selectedInstansi.description ||
                    "Deskripsi tidak tersedia"}
                </p>
                <p>
                  <strong>Kode Instansi:</strong> {selectedInstansi.id}
                </p>
                <p>Silakan pilih kategori untuk melihat data yang tersedia.</p>
              </div>
            )}

            {selectedCategory && loading && (
              <div className="loading-container">
                <Loader className="loading-spinner" />
                <p>Memuat data...</p>
              </div>
            )}

            {selectedCategory && !loading && clusterData.length > 0 && (
              <>
                <div className="ppid-data-section">
                  <h3>Data {selectedCategory.nama || selectedCategory.name}</h3>
                  <div className="ppid-data-grid">
                    {clusterData.map((item, index) => (
                      <div key={item.id || index} className="ppid-data-card">
                        <div className="ppid-data-header">
                          <h4>
                            {item.judul || item.title || `Data ${index + 1}`}
                          </h4>
                          <span className="ppid-data-date">
                            {item.tanggal ||
                              item.created_at ||
                              "Tanggal tidak tersedia"}
                          </span>
                        </div>
                        <div className="ppid-data-content">
                          <p>
                            {item.deskripsi || item.description || item.excerpt}
                          </p>
                        </div>
                        <div className="ppid-data-actions">
                          {item.id_content && (
                            <button
                              className="ppid-detail-btn"
                              onClick={() => handleShowDetail(item)}
                            >
                              <Eye size={16} />
                              Lihat Detail
                            </button>
                          )}
                          {item.file_url && (
                            <a
                              href={item.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ppid-download-btn"
                            >
                              <Download size={16} />
                              Unduh
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {(detailLoading || selectedDetail) && (
                  <div className="ppid-detail-panel reveal">
                    <h3>Detail Informasi Publik</h3>
                    {detailLoading ? (
                      <div className="loading-container">
                        <Loader className="loading-spinner" />
                        <p>Memuat detail...</p>
                      </div>
                    ) : selectedDetail ? (
                      <div className="ppid-detail-content">
                        <p>
                          <strong>Judul:</strong>{" "}
                          {selectedDetail.judul ||
                            selectedDetail.title ||
                            selectedDetail.nama}
                        </p>
                        <p>
                          <strong>Tanggal:</strong>{" "}
                          {selectedDetail.tanggal ||
                            selectedDetail.created_at ||
                            selectedDetail.date ||
                            "Tidak tersedia"}
                        </p>
                        <p>
                          <strong>Status:</strong>{" "}
                          {selectedDetail.status ||
                            selectedDetail.keterangan ||
                            "Tidak tersedia"}
                        </p>
                        <div
                          className="ppid-detail-body"
                          dangerouslySetInnerHTML={{
                            __html:
                              selectedDetail.isi ||
                              selectedDetail.description ||
                              selectedDetail.content ||
                              selectedDetail.deskripsi ||
                              "<p>Detail informasi tidak tersedia.</p>",
                          }}
                        />
                        {(selectedDetail.file_url ||
                          selectedDetail.file ||
                          selectedDetail.link) && (
                          <a
                            href={
                              selectedDetail.file_url ||
                              selectedDetail.file ||
                              selectedDetail.link
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ppid-download-btn"
                          >
                            <Download size={16} /> Unduh Lampiran
                          </a>
                        )}
                      </div>
                    ) : null}
                  </div>
                )}
              </>
            )}

            {selectedCategory && !loading && clusterData.length === 0 && (
              <div className="ppid-empty-state">
                <FileSearch size={48} />
                <h3>Tidak Ada Data</h3>
                <p>Tidak ditemukan data untuk kategori ini.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PPIDDataPage;
