import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PieChart, DollarSign, Users, CheckCircle, ArrowUpRight, Percent, Sprout } from 'lucide-react';
import './TransparansiStats.css';

const TransparansiStats = () => {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

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
                    maximumFractionDigits: decimals
                })}
                {suffix}
            </span>
        );
    };

    return (
        <section className={`transparansi-section ${isVisible ? 'isVisible' : ''}`} ref={sectionRef}>
            <div className="container">
                <div className="modern-stats-wrapper">
                    <div className="stats-header">
                        <div className="stats-badge">TRANSPARANSI DATA 2026</div>
                        <h2 className="stats-main-title">Kinerja & Akuntabilitas</h2>
                    </div>

                    <div className="modern-stats-grid">
                        {/* IKM Stats */}
                        <div className="modern-stat-card ikm">
                            <div className="stat-content">
                                <div className="stat-info">
                                    <div className="stat-icon-circle">
                                        <Users size={24} />
                                    </div>
                                    <div className="stat-label-group">
                                        <span className="stat-label">INDeks kepuasan masyarakat</span>
                                        <div className="stat-value">
                                            <AnimatedNumber value={88.45} decimals={2} />
                                            <span className="stat-tag success">SANGAT BAIK</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="stat-footer-info">
                                    <div className="sub-info">
                                        <span className="label">Target</span>
                                        <span className="value">85.00</span>
                                    </div>
                                    <div className="sub-info">
                                        <span className="label">Responden</span>
                                        <span className="value">1,240</span>
                                    </div>
                                </div>
                            </div>
                            <Link to="/transparansi" className="stat-action-btn">
                                <ArrowUpRight size={20} />
                            </Link>
                        </div>

                        {/* Budget Stats */}
                        <div className="modern-stat-card budget">
                            <div className="stat-content">
                                <div className="stat-info">
                                    <div className="stat-icon-circle">
                                        <DollarSign size={24} />
                                    </div>
                                    <div className="stat-label-group">
                                        <span className="stat-label">REALISASI ANGGARAN</span>
                                        <div className="stat-value">
                                            <AnimatedNumber value={66.1} decimals={1} suffix="%" />
                                            <span className="stat-tag info">PADA JALUR</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="stat-progress-section">
                                    <div className="progress-top">
                                        <span>Rp 82,3 Miliar dari Rp 124,5 Miliar</span>
                                    </div>
                                    <div className="modern-progress-bar">
                                        <div className="progress-fill" style={{ width: isVisible ? '66.1%' : '0%' }}></div>
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
