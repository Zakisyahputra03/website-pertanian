import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, TrendingUp, Landmark, Wheat, Trees, BarChart3, Activity, Download } from 'lucide-react';
import './DashboardStats.css';

const DashboardStats = () => {
    const [selectedYear, setSelectedYear] = useState('2024');
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    // Accurate Data based on Research
    const statsData = {
        '2024': {
            padi: 1356468, // Ton GKG
            jagung: 1120000, // Ton (Estimated total Sumbar)
            luas: 295279, // Hektar
            ntp: 132.16,
            pertumbuhan: 2.17
        },
        '2025': {
            padi: 1382697, // Proyeksi BPS
            jagung: 1150000,
            luas: 284514,
            ntp: 132.69,
            pertumbuhan: 0.40
        }
    };

    const currentData = statsData[selectedYear];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    const AnimatedNumber = ({ value, duration = 2000, decimals = 0, suffix = "" }) => {
        const [displayValue, setDisplayValue] = useState(0);

        useEffect(() => {
            if (!isVisible) return;
            let start = 0;
            const end = value;
            const range = end - start;
            let current = start;
            const increment = end > start ? Math.ceil(range / (duration / 16)) : -1;

            const timer = setInterval(() => {
                current += increment;
                if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                    setDisplayValue(end);
                    clearInterval(timer);
                } else {
                    setDisplayValue(current);
                }
            }, 16);

            return () => clearInterval(timer);
        }, [value, isVisible]);

        return (
            <span>
                {displayValue.toLocaleString(undefined, {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals
                })}
                {suffix}
            </span>
        );
    };

    return (
        <section className={`dashboard-outer ${isVisible ? 'isVisible' : ''}`} ref={sectionRef} id="profil-kami">
            <div className="dashboard-overlay-bg"></div>
            <div className="container">
                <div className="dashboard-header-modern">
                    <div className="header-left">
                        <span className="badge-premium">Live Command Center</span>
                        <h2 className="dashboard-main-title">Statistik Sektor Pertanian</h2>
                        <p className="dashboard-subtitle">Monitoring Real-time Produksi & Kesejahteraan Petani Sumatera Barat</p>
                    </div>
                    <div className="header-right">
                        <div className="year-selector-pill">
                            <span className="selector-label">Tahun Data:</span>
                            <div className="pill-options">
                                <button
                                    className={`pill-btn ${selectedYear === '2024' ? 'active' : ''}`}
                                    onClick={() => setSelectedYear('2024')}
                                >2024</button>
                                <button
                                    className={`pill-btn ${selectedYear === '2025' ? 'active' : ''}`}
                                    onClick={() => setSelectedYear('2025')}
                                >2025 (P)</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main-stats-grid">
                    {/* Primary Large Card */}
                    <div className="stats-card primary-card animate-reveal">
                        <div className="card-inner">
                            <div className="card-icon-box">
                                <Landmark className="icon-main" />
                            </div>
                            <div className="card-content">
                                <span className="data-label">Produksi Padi Total (GKG)</span>
                                <div className="data-value-large">
                                    <AnimatedNumber value={currentData.padi} />
                                    <span className="unit">Ton</span>
                                </div>
                                <div className="progress-container">
                                    <div className="progress-label">
                                        <span>Realisasi Target</span>
                                        <span>94.2%</span>
                                    </div>
                                    <div className="progress-bar-bg">
                                        <div className="progress-bar-fill" style={{ width: isVisible ? '94.2%' : '0%' }}></div>
                                    </div>
                                </div>
                                <div className="card-footer-mini">
                                    <TrendingUp size={14} className="trend-icon" />
                                    <span>+{selectedYear === '2025' ? '1.93%' : '0.80%'} dari tahun sebelumnya</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Metrics */}
                    <div className="secondary-stats-stack">
                        <div className="metrics-row">
                            <div className="stats-card metric-card animate-reveal delay-1">
                                <div className="metric-icon-circle"><Wheat size={20} /></div>
                                <div className="metric-info">
                                    <span className="metric-label">Produksi Jagung</span>
                                    <div className="metric-value">
                                        <AnimatedNumber value={currentData.jagung} />
                                        <span className="unit-small">Ton</span>
                                    </div>
                                </div>
                            </div>
                            <div className="stats-card metric-card animate-reveal delay-2">
                                <div className="metric-icon-circle"><Trees size={20} /></div>
                                <div className="metric-info">
                                    <span className="metric-label">Luas Panen Padi</span>
                                    <div className="metric-value">
                                        <AnimatedNumber value={currentData.luas} />
                                        <span className="unit-small">Ha</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* NTP Highlight Card */}
                        <div className="stats-card ntp-highlight animate-reveal delay-3">
                            <div className="ntp-header">
                                <div className="ntp-title-group">
                                    <Activity className="pulse-icon" size={18} />
                                    <span className="ntp-label">Nilai Tukar Petani (NTP)</span>
                                </div>
                                <div className="ntp-status">Sangat Sejahtera</div>
                            </div>
                            <div className="ntp-body">
                                <div className="ntp-value-main">
                                    <AnimatedNumber value={currentData.ntp} decimals={2} />
                                </div>
                                <div className="ntp-visual">
                                    <div className="ntp-gauge">
                                        <div className="gauge-bg"></div>
                                        <div className="gauge-pointer" style={{ transform: `rotate(${(currentData.ntp - 100) * 1.5}deg)` }}></div>
                                    </div>
                                    <div className="ntp-trend-badge positive">
                                        ↑ <AnimatedNumber value={currentData.pertumbuhan} decimals={2} suffix="%" />
                                    </div>
                                </div>
                            </div>
                            <p className="ntp-desc">*Indikator kemampuan beli & kesejahteraan petani (Base 100)</p>
                        </div>
                    </div>

                    {/* Quick Insights / Interaction */}
                    <div className="insights-card animate-reveal delay-4">
                        <div className="insight-header">
                            <BarChart3 size={20} />
                            <span>Komoditas Unggulan</span>
                        </div>
                        <div className="commodity-3d-container">
                            <div className="donut-3d-cake">
                                <svg viewBox="0 0 100 100" className="donut-svg">
                                    <circle cx="50" cy="50" r="40" className="donut-ring-bg" />
                                    <circle
                                        cx="50" cy="50" r="40"
                                        className="donut-ring-padi"
                                        style={{ strokeDasharray: isVisible ? '213.6 251.2' : '0 251.2' }}
                                    />
                                    <circle
                                        cx="50" cy="50" r="40"
                                        className="donut-ring-jagung"
                                        style={{
                                            strokeDasharray: isVisible ? '30.1 251.2' : '0 251.2',
                                            strokeDashoffset: isVisible ? '-213.6' : '0'
                                        }}
                                    />
                                </svg>
                                <div className="cake-depth-layer"></div>
                                <div className="cake-glass-top">
                                    <div className="cake-inner-data">
                                        <span className="cake-percent">100%</span>
                                        <span className="cake-label">Komoditas</span>
                                    </div>
                                </div>
                            </div>

                            <div className="commodity-legend-3d">
                                <div className="leg-item">
                                    <span className="dot padi"></span>
                                    <span className="name">Padi Sawah (85%)</span>
                                </div>
                                <div className="leg-item">
                                    <span className="dot jagung"></span>
                                    <span className="name">Jagung (12%)</span>
                                </div>
                                <div className="leg-item">
                                    <span className="dot other"></span>
                                    <span className="name">Lainnya (3%)</span>
                                </div>
                            </div>
                        </div>
                        <button className="download-btn-premium">
                            <Download size={22} />
                            <div className="btn-label-group">
                                <span className="btn-sub-label">Akses Data Publik</span>
                                <span className="btn-main-label">Unduh Laporan Tahunan</span>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="dashboard-footer-note">
                    <p>Sumber Data: Badan Pusat Statistik (BPS) & Dinas Pertanian Prov. Sumbar • Update Terakhir: Maret 2026</p>
                </div>
            </div>
        </section>
    );
};

export default DashboardStats;
