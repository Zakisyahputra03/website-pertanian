import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { DollarSign, FileText, ArrowUpRight } from "lucide-react";
import ApiService from "../services/apiService";
import "./TransparansiStats.css";

const TransparansiStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [laporanItems, setLaporanItems] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [reportError, setReportError] = useState(null);
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
    const fetchReports = async () => {
      setLoadingReports(true);
      setReportError(null);
      try {
        const result = await ApiService.getLaporanKinerja();
        const list = ApiService.normalizeList(result);
        setLaporanItems(list);
      } catch (error) {
        setReportError(error.message || "Gagal memuat laporan kinerja");
      } finally {
        setLoadingReports(false);
      }
    };

    fetchReports();
  }, []);

  const AnimatedNumber = ({ value, decimals = 1, suffix = "" }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      if (!isVisible) return;
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 60);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }, [value, isVisible]);

    return (
      <span>
        {displayValue.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix}
      </span>
    );
  };

  return (
    <section
      className={`transparansi-section ${isVisible ? "isVisible" : ""}`}
      ref={sectionRef}
    >
      <div className="container">
        <div className="modern-stats-wrapper">
          <div className="stats-header">
            <div className="stats-badge">TRANSPARANSI DATA 2026</div>
            <h2 className="stats-main-title">Kinerja & Akuntabilitas</h2>
          </div>

          <div className="modern-stats-grid">
            {/* Laporan Kinerja */}
            <div className="modern-stat-card laporan">
              <div className="stat-content">
                <div className="stat-info">
                  <div className="stat-icon-circle">
                    <FileText size={24} />
                  </div>
                  <div className="stat-label-group">
                    <span className="stat-label">LAPORAN KINERJA</span>
                    <div className="stat-value">
                      <AnimatedNumber
                        value={loadingReports ? 0 : laporanItems.length}
                        decimals={0}
                      />
                      <span
                        className={`stat-tag ${laporanItems.length ? "success" : "info"}`}
                      >
                        {loadingReports
                          ? "MEMUAT..."
                          : laporanItems.length
                            ? "TERSEDIA"
                            : "BELUM ADA"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="stat-footer-info">
                  <div className="sub-info">
                    <span className="label">Jumlah Dokumen</span>
                    <span className="value">
                      {loadingReports ? "-" : laporanItems.length}
                    </span>
                  </div>
                  <div className="sub-info">
                    <span className="label">Terakhir Diterbitkan</span>
                    <span className="value">
                      {loadingReports
                        ? "-"
                        : laporanItems[0]?.created_at || "-"}
                    </span>
                  </div>
                </div>
                {reportError && (
                  <div className="report-error">
                    Gagal memuat laporan: {reportError}
                  </div>
                )}
              </div>
              <Link to="/transparansi" className="stat-action-btn">
                <ArrowUpRight size={20} />
              </Link>
            </div>

            {/* Kinerja Bar */}
            <div className="modern-stat-card budget">
              <div className="stat-content">
                <div className="stat-info">
                  <div className="stat-icon-circle">
                    <DollarSign size={24} />
                  </div>
                  <div className="stat-label-group">
                    <span className="stat-label">
                      KONSOLIDASI AKUNTABILITAS
                    </span>
                    <div className="stat-value">
                      <AnimatedNumber
                        value={
                          loadingReports ? 0 : laporanItems.length ? 100 : 0
                        }
                        decimals={0}
                        suffix="%"
                      />
                      <span className="stat-tag info">
                        {loadingReports
                          ? "MEMUAT..."
                          : laporanItems.length
                            ? "TERSEDIA"
                            : "TIDAK ADA"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="stat-progress-section">
                  <div className="progress-top">
                    <span>
                      {loadingReports
                        ? "Memuat data..."
                        : laporanItems[0]?.title ||
                          "Tidak ada laporan tersedia"}
                    </span>
                  </div>
                  <div className="modern-progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: isVisible
                          ? `${laporanItems.length ? 100 : 0}%`
                          : "0%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <Link to="/transparansi" className="stat-action-btn">
                <ArrowUpRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparansiStats;
