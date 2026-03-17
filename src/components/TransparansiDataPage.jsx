import React, { useState, useEffect } from 'react';
import {
    Users, DollarSign, Sprout, ArrowLeft, BarChart3,
    FileText, Download, CheckCircle2, TrendingUp, TrendingDown,
    Activity, Landmark, Wheat, Trees, PieChart, Home
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './TransparansiDataPage.css';

const TransparansiDataPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('ikm');

    useEffect(() => {
        // Set tab based on state passed from Link
        if (location.state && location.state.tab) {
            setActiveTab(location.state.tab);
        }
    }, [location.state]);

    return (
        <div className="trans-page-wrapper">
            <div className="trans-hero-banner">
                <div className="container">
                    <div className="back-btn-wrap">
                        <Link to="/" className="back-btn-premium">
                            <Home size={18} /> Beranda
                        </Link>
                        <button onClick={() => navigate(-1)} className="back-btn-premium" style={{ border: 'none', cursor: 'pointer' }}>
                            <ArrowLeft size={18} /> Kembali
                        </button>
                    </div>
                    <div className="hero-flex">
                        <div className="hero-text reveal reveal-right">
                            <span className="badge">Pusat Informasi Publik</span>
                            <h1>Data & Transparansi</h1>
                            <p>Akses terbuka terhadap realisasi kinerja dan anggaran Dinas Pertanian Sumatera Barat.</p>
                        </div>
                        <div className="hero-tabs reveal reveal-left">
                            <button
                                className={`tab-item ${activeTab === 'ikm' ? 'active' : ''}`}
                                onClick={() => setActiveTab('ikm')}
                            >
                                <Users size={20} />
                                <span>Kepuasan</span>
                            </button>
                            <button
                                className={`tab-item ${activeTab === 'budget' ? 'active' : ''}`}
                                onClick={() => setActiveTab('budget')}
                            >
                                <DollarSign size={20} />
                                <span>Anggaran</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="trans-main-content">
                <div className="container">
                    {activeTab === 'ikm' && <IKMSection />}
                    {activeTab === 'budget' && <BudgetSection />}
                </div>
            </main>
        </div>
    );
};

const IKMSection = () => {
    const dataIKM = [
        { label: 'Keselarasan Persyaratan', score: 88.5, icon: <CheckCircle2 /> },
        { label: 'Kemudahan Prosedur', score: 87.2, icon: <FileText /> },
        { label: 'Kecepatan Pelayanan', score: 89.1, icon: <Activity /> },
        { label: 'Keadilan Pelayanan', score: 88.4, icon: <Users /> }
    ];

    return (
        <div className="section-reveal reveal reveal-up">
            <div className="ikm-top-grid">
                <div className="ikm-hero-card glass-card">
                    <div className="ikm-main-score">
                        <span className="score-label">Indeks Kepuasan Masyarakat 2024</span>
                        <h2>88.45</h2>
                        <div className="status-badge very-good">Sangat Baik</div>
                    </div>
                    <div className="ikm-chart-placeholder">
                        <div className="gauge-outer">
                            <div className="gauge-fill" style={{ transform: 'rotate(0.44turn)' }}></div>
                            <div className="gauge-mask"></div>
                            <div className="gauge-text">88.45%</div>
                        </div>
                    </div>
                </div>
                <div className="ikm-metrics-grid">
                    {dataIKM.map((item, idx) => (
                        <div key={idx} className="metric-item-card">
                            <div className="metric-icon">{item.icon}</div>
                            <div className="metric-info">
                                <h4>{item.label}</h4>
                                <span className="score">{item.score}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="ikm-content-info glass-card">
                <h3>Detail Laporan Pelayanan</h3>
                <p>Berdasarkan hasil survey yang melibatkan 1.240 responden dari berbagai kelompok tani dan pelaku usaha di Sumatera Barat, Dinas Pertanian mendapatkan kategori "Sangat Baik" dalam keterbukaan informasi dan kecepatan tindak lanjut bantuan.</p>
                <div className="download-cta">
                    <button className="btn-premium">
                        <Download size={18} /> Unduh Laporan Lengkap (PDF)
                    </button>
                </div>
            </div>
        </div>
    );
};

const BudgetSection = () => {
    return (
        <div className="section-reveal reveal reveal-up">
            <div className="budget-summary-grid">
                <div className="budget-card main glass-card">
                    <div className="card-header">
                        <Landmark size={24} />
                        <h3>Realisasi Anggaran 2024</h3>
                    </div>
                    <div className="budget-progress-container">
                        <div className="amounts">
                            <div className="amount-box">
                                <span>Pagu Anggaran</span>
                                <h4>Rp 124,5 M</h4>
                            </div>
                            <div className="amount-box highlight">
                                <span>Realisasi</span>
                                <h4>Rp 82,3 M</h4>
                            </div>
                        </div>
                        <div className="big-progress-bar">
                            <div className="fill" style={{ width: '66.1%' }}>
                                <span className="percent">66.1%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="budget-breakdown glass-card">
                    <h3>Rincian Penggunaan</h3>
                    <div className="breakdown-list">
                        <div className="b-item">
                            <span>Belanja Pegawai</span>
                            <div className="b-bar"><div className="b-fill" style={{ width: '40%' }}></div></div>
                            <span className="b-val">Rp 49,8 M</span>
                        </div>
                        <div className="b-item">
                            <span>Bantuan Hibah/Bibit</span>
                            <div className="b-bar"><div className="b-fill" style={{ width: '35%' }}></div></div>
                            <span className="b-val">Rp 43,5 M</span>
                        </div>
                        <div className="b-item">
                            <span>Sarana Prasarana</span>
                            <div className="b-bar"><div className="b-fill" style={{ width: '25%' }}></div></div>
                            <span className="b-val">Rp 31,1 M</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransparansiDataPage;
