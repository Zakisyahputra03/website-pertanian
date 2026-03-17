import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye, Clock, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './BeritaTerkini.css';
import berita1 from '../assets/Screenshot 2026-03-05 140500.png';
import berita2 from '../assets/berita-gubernur-mahyeldi-serahkan-bantuan-kemanusiaan-dari-masyarakat-sumbar-untuk-rakyat-050326102019.webp';
import berita3 from '../assets/krpl3.jpg';

const BeritaTerkini = () => {
    const { t } = useLanguage();
    const berita = [
        {
            id: 1,
            image: berita1,
            title: 'Wakil Gubernur Sumbar Serahkan Bantuan Bedah Rumah untuk Warga Ujung Batung, Kota Pariaman',
            date: '20 Feb 2026',
            tag: 'BERITA UTAMA',
            readTime: '5 min',
            views: '3.8K'
        },
        {
            id: 2,
            image: berita2,
            title: 'Gubernur Mahyeldi Serahkan Bantuan Kemanusiaan dari Masyarakat Sumbar untuk Rakyat Palestina',
            date: '18 Feb 2026',
            tag: 'BANTUAN',
            readTime: '4 min',
            views: '1.2K'
        },
        {
            id: 3,
            image: berita3,
            title: 'Kawasan Rumah Pangan Lestari (KRPL) Sukses di Kepulauan Mentawai',
            date: '15 Feb 2026',
            tag: 'PROYEK STRATEGIS',
            readTime: '6 min',
            views: '950'
        }
    ];

    return (
        <section id="berita" className="berita-premium reveal">
            <div className="container">
                <div className="section-header-row">
                    <div className="header-left">
                        <span className="badge">{t('news_section_badge')}</span>
                        <h2>{t('news_section_title')}</h2>
                    </div>
                    <Link to="/berita" className="view-all-premium">
                        {t('news_btn_all')} <ArrowUpRight size={20} />
                    </Link>
                </div>

                <div className="magazine-grid">
                    {berita.map((item, index) => (
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
            </div>
        </section>
    );
};

export default BeritaTerkini;
