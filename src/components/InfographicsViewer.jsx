import React, { useEffect, useState, useRef } from "react";
import { ArrowUpRight, TrendingUp, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import ApiService from "../services/apiService";
import "./InfographicsViewer.css";

const InfographicsViewer = () => {
  const [infografisItems, setInfografisItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    const fetchInfografis = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await ApiService.getInfografis();
        const list = ApiService.normalizeList(result);
        setInfografisItems(list);
      } catch (err) {
        setError(err.message || "Gagal memuat infografis");
        console.error("Error fetching infografis:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInfografis();
  }, []);

  return (
    <section
      className={`infographics-section ${isVisible ? "isVisible" : ""}`}
      ref={sectionRef}
    >
      <div className="container">
        <div className="infographics-wrapper">
          <div className="infographics-header">
            <div className="header-top">
              <div className="header-badge">VISUALISASI DATA</div>
              <h2 className="infographics-title">Statistik Pertanian Sumbar</h2>
              <p className="infographics-subtitle">
                Ringkasan data produksi dan luas tanam sektor pertanian Sumatera
                Barat
              </p>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Memuat data...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>Gagal memuat data infografis: {error}</p>
            </div>
          ) : (
            <div className="infographics-content">
              {/* Infografis Images Grid */}
              {infografisItems.length > 0 && (
                <div className="infografis-gallery">
                  <h3>Infografis Terkini</h3>
                  <div className="gallery-grid">
                    {infografisItems.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="gallery-item">
                        <div className="item-image">
                          {item.gambar ? (
                            <img
                              src={`https://api-web.sumbarprov.go.id${item.gambar}`}
                              alt={item.title}
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/300x200?text=Infografis";
                              }}
                            />
                          ) : (
                            <div className="placeholder">
                              <Sprout size={32} />
                            </div>
                          )}
                        </div>
                        <div className="item-info">
                          <h4>{item.title}</h4>
                          <p className="item-date">{item.created_at}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="infographics-footer">
                <div className="footer-stat">
                  <TrendingUp size={20} />
                  <div>
                    <span className="stat-label">Total Dokumen</span>
                    <span className="stat-value">{infografisItems.length}</span>
                  </div>
                </div>
                <Link to="/kategori" className="view-more-btn">
                  Lihat Selengkapnya <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InfographicsViewer;
