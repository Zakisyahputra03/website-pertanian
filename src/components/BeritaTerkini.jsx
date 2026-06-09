import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye, Clock, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ApiService from '../services/apiService';
import './BeritaTerkini.css';

const BeritaTerkini = () => {
    const { t } = useLanguage();
    const [berita, setBerita] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBeritaTerkini = async () => {
            try {
                setLoading(true);
                const result = await ApiService.getBeritaUtama();
                const list = ApiService.normalizeList(result);
                const normalized = list.map((item, index) => ApiService.normalizeBerita(item, index));
                setBerita(normalized.slice(0, 3));
            } catch (err) {
                console.error("Error fetching berita terkini:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBeritaTerkini();
    }, []);

    const SkeletonLoader = () => (
        <div className="magazine-grid">
            {[1, 2, 3].map((n) => (
                <div key={n} className="skeleton-card">
                    <div className="skeleton-img-wrap"></div>
                    <div className="skeleton-info">
                        <div className="skeleton-meta"></div>
                        <div className="skeleton-title"></div>
                        <div className="skeleton-title-short"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <section id="berita" className="berita-premium reveal">
            <div className="container">
                <div className="section-header-row">
                    <div className="header-left">
                        <span className="badge">{t("news_section_badge")}</span>
                        <h2>{t("news_section_title")}</h2>
                    </div>
                    <Link to="/berita" className="view-all-premium">
                        {t("news_btn_all")} <ArrowUpRight size={20} />
                    </Link>
                </div>

                {loading ? (
                    <SkeletonLoader />
                ) : error ? (
                    <div className="error-container-premium">
                        <p>Gagal memuat berita terkini: {error}</p>
                    </div>
                ) : berita.length === 0 ? (
                    <div className="empty-container-premium">
                        <p>Belum ada berita yang dipublikasikan.</p>
                    </div>
                ) : (
                    <div className="magazine-grid">
                        {berita.map((item) => (
                            <div key={item.id} className="magazine-card">
                                <div className="magazine-img-wrap">
                                    <img src={item.image} alt={item.title} className="magazine-img" />
                                    <div className="magazine-tag">{item.tag}</div>
                                    <div className="magazine-overlay">
                                        <Link to={`/berita/${item.id}`} className="read-more-circle">
                                            <ArrowUpRight size={24} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="magazine-info">
                                    <div className="magazine-meta">
                                        <span><Calendar size={14} /> {item.date}</span>
                                        <span><Clock size={14} /> {item.readTime}</span>
                                        <span><Eye size={14} /> {item.views}</span>
                                    </div>
                                    <h3><Link to={`/berita/${item.id}`}>{item.title}</Link></h3>
                                    <div className="magazine-footer-line"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BeritaTerkini;
