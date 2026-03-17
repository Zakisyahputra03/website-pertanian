import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Users, Award, ShieldCheck, Zap } from 'lucide-react';
import './ProgramUnggulan.css';

const ProgramUnggulan = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const programs = [
        {
            icon: <Target size={28} />,
            title: 'Ketahanan Pangan',
            label: 'UPSUS PADI',
            desc: 'Upaya Khusus (UPSUS) untuk peningkatan produksi Padi, Jagung, dan Kedelai melalui optimalisasi lahan dan bantuan saprodi.',
            target: 'Swasembada Berkelanjutan',
            color: '#1B5E20',
            stats: [
                { val: '150K', label: 'Hektar Lahan' },
                { val: '85%', label: 'Capaian' }
            ]
        },
        {
            icon: <Zap size={28} />,
            title: 'Smart Farming',
            label: 'DIGITALISASI',
            desc: 'Implementasi sensor IoT dan drone monitoring untuk pemetaan hara serta presisi pemupukan di kawasan sentra produksi.',
            target: 'Efisiensi Input 30%',
            color: '#C0CA33',
            stats: [
                { val: '12', label: 'Pilot Project' },
                { val: '24/7', label: 'Realtime Data' }
            ]
        },
        {
            icon: <Users size={28} />,
            title: 'Petani Milenial',
            label: 'REGENERASI',
            desc: 'Inkubasi bisnis bagi wirausaha muda pertanian di Sumatera Barat untuk menciptakan ekosistem agribisnis yang inovatif.',
            target: '1000 Wirausaha Baru',
            color: '#F9A825',
            stats: [
                { val: '750', label: 'Pendaftar' },
                { val: '18-35', label: 'Usia Target' }
            ]
        },
        {
            icon: <ShieldCheck size={28} />,
            title: 'Sertifikasi Organik',
            label: 'GO ORGANIC',
            desc: 'Fasilitasi sertifikasi lahan dan produk organik untuk meningkatkan nilai tambah serta akses pasar ekspor.',
            target: 'Global Market Access',
            color: '#4CAF50',
            stats: [
                { val: '45', label: 'Kelompok Tani' },
                { val: '100%', label: 'Subsidi Sertif' }
            ]
        }
    ];

    return (
        <section className="home-section-alt program-premium reveal">
            <div className="container">
                <div className="section-header">
                    <span className="badge">Strategic Initiatives</span>
                    <h2>Program Strategis</h2>
                    <p>Membangun masa depan pertanian Sumatera Barat yang mandiri, modern, dan berkelanjutan.</p>
                </div>

                <div className="program-layout">
                    {/* Tab Navigation */}
                    <div className="program-nav">
                        {programs.map((prog, idx) => (
                            <button
                                key={idx}
                                className={`prog-tab-btn ${activeTab === idx ? 'active' : ''}`}
                                onClick={() => setActiveTab(idx)}
                                style={{ '--active-color': prog.color }}
                            >
                                <div className="tab-indicator"></div>
                                <div className="tab-icon-wrap">{prog.icon}</div>
                                <div className="tab-text-wrap">
                                    <span className="tab-label">{prog.label}</span>
                                    <span className="tab-main-title">{prog.title}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Content Display */}
                    <div className="program-display glass-card">
                        {programs.map((prog, idx) => (
                            <div
                                key={idx}
                                className={`prog-content-pane ${activeTab === idx ? 'active' : ''}`}
                            >
                                <div className="prog-details">
                                    <div className="prog-header-inner">
                                        <div className="prog-icon-large" style={{ backgroundColor: prog.color }}>
                                            {prog.icon}
                                        </div>
                                        <div className="prog-titles">
                                            <h3>{prog.title}</h3>
                                            <span className="prog-target-tag">Target: {prog.target}</span>
                                        </div>
                                    </div>
                                    <p className="prog-description">{prog.desc}</p>

                                    <div className="prog-mini-stats">
                                        {prog.stats.map((s, i) => (
                                            <div key={i} className="mini-stat-item">
                                                <span className="ms-value">{s.val}</span>
                                                <span className="ms-label">{s.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="btn-premium prog-cta">
                                        Unduh Panduan Program
                                        <Zap size={18} />
                                    </button>
                                </div>
                                <div className="prog-visual">
                                    <div className="visual-wrapper">
                                        <img
                                            src={`https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=800`}
                                            alt="Agriculture"
                                            className="main-visual"
                                        />
                                        <div className="visual-overlay-accent" style={{ background: prog.color }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgramUnggulan;