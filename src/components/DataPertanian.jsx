import React, { useState } from 'react';
import { Download, TrendingUp, TrendingDown, Info, BarChart3, Database } from 'lucide-react';
import './DataPertanian.css';

const DataPertanian = () => {
    const [selectedYear, setSelectedYear] = useState('2024');

    const dataStats = [
        {
            label: 'Produksi Padi',
            value: '2.54',
            unit: 'Juta Ton',
            change: '+5.2%',
            trend: 'up',
            icon: '🌾',
            color: '#1B5E20'
        },
        {
            label: 'Produksi Jagung',
            value: '1.18',
            unit: 'Juta Ton',
            change: '+3.8%',
            trend: 'up',
            icon: '🌽',
            color: '#F9A825'
        },
        {
            label: 'Produksi Cabai',
            value: '182',
            unit: 'Ribu Ton',
            change: '+2.1%',
            trend: 'up',
            icon: '🌶️',
            color: '#D32F2F'
        },
        {
            label: 'Kelapa Sawit',
            value: '3.85',
            unit: 'Juta Ton',
            change: '+4.5%',
            trend: 'up',
            icon: '🌴',
            color: '#2E7D32'
        }
    ];

    const years = ['2024', '2023', '2022', '2021'];

    return (
        <section className="data-premium-section reveal">
            <div className="container">
                <div className="data-header-box">
                    <div className="section-header text-left">
                        <span className="badge">Data & Statistics</span>
                        <h2>Pusat Data Pertanian</h2>
                        <p>Transparansi data statistik sektoral untuk mendukung perumusan kebijakan pertanian yang tepat sasaran.</p>
                    </div>
                    <div className="data-actions-premium">
                        <div className="premium-select-wrap">
                            <Database size={16} />
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="premium-select"
                            >
                                {years.map(y => <option key={y} value={y}>Tahun {y}</option>)}
                            </select>
                        </div>
                        <button className="btn-premium download-full">
                            <Download size={18} />
                            Eksport PDF
                        </button>
                    </div>
                </div>

                <div className="data-grid-lux">
                    {dataStats.map((data, index) => (
                        <div key={index} className="lux-data-card glass-card">
                            <div className="lux-card-top">
                                <div className="lux-icon-circle" style={{ backgroundColor: `${data.color}15`, color: data.color }}>
                                    <span className="emoji-icon">{data.icon}</span>
                                </div>
                                <div className={`lux-trend-indicator ${data.trend}`}>
                                    {data.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                    {data.change}
                                </div>
                            </div>

                            <div className="lux-card-main">
                                <span className="lux-label">{data.label}</span>
                                <div className="lux-value-wrap">
                                    <span className="lux-value">{data.value}</span>
                                    <span className="lux-unit">{data.unit}</span>
                                </div>
                            </div>

                            <div className="lux-card-footer">
                                <div className="lux-progress-track">
                                    <div className="lux-progress-fill" style={{ width: '75%', backgroundColor: data.color }}></div>
                                </div>
                                <div className="lux-footer-meta">
                                    <span>Capaian Target</span>
                                    <span>75%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="data-cta-banner reveal">
                    <div className="cta-banner-content">
                        <div className="cta-icon">
                            <BarChart3 size={32} />
                        </div>
                        <div className="cta-text">
                            <h4>Butuh Data Lebih Spesifik?</h4>
                            <p>Akses portal Open Data Pertanian Sumatera Barat untuk visualisasi data interaktif dan dataset lengkap.</p>
                        </div>
                    </div>
                    <button className="cta-action-btn">
                        Buka Portal Data
                        <Info size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default DataPertanian;