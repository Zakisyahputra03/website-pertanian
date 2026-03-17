import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Leaf, Coffee, Apple, Search } from 'lucide-react';
import './HeroSection.css';
import masjidBg from '../assets/Masjid Raya Sumatera Barat.jpg';

import { useLanguage } from '../context/LanguageContext';

import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const statsRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-stats');
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        } else {
            navigate('/search');
        }
    };

    return (
        <section className="hero">
            <div className="hero-background">
                <div className="hero-bg-image" style={{ backgroundImage: `linear-gradient(135deg, rgba(46, 125, 50, 0.4), rgba(27, 94, 32, 0.6)), url("${masjidBg}")` }}></div>
            </div>
            <div className="hero-overlay"></div>

            <div className="hero-content">
                <h1 className="hero-title">
                    {t('hero_welcome')}
                </h1>
                <h2 className="hero-subtitle">
                    {t('hero_department')}
                </h2>
                <p className="hero-description">
                    {t('hero_motto')}
                </p>

                <div className={`hero-search-container ${isFocused ? 'focused' : ''}`}>
                    <form onSubmit={handleSearch} className="hero-search-form">
                        <div className="search-input-group">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder={t('hero_search_placeholder')}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className="search-input"
                            />
                        </div>
                        <button type="submit" className="search-submit-btn">
                            {t('hero_search_btn')}
                        </button>
                    </form>
                </div>

                <div className="hero-buttons">
                    <Link to="/profil" className="btn-primary">{t('hero_btn_profile')}</Link>
                    <Link to="/layanan" className="btn-secondary">{t('hero_btn_services')}</Link>
                </div>
            </div>

            <div className="hero-stats" ref={statsRef}>
                <div className="stat-item">
                    <div className="stat-icon">
                        <Sprout size={40} />
                    </div>
                    <div className="stat-info">
                        <h3 className="stat-number">620K+</h3>
                        <p className="stat-label">{t('stat_farmers')}</p>
                    </div>
                </div>
                <div className="stat-item">
                    <div className="stat-icon">
                        <Leaf size={40} />
                    </div>
                    <div className="stat-info">
                        <h3 className="stat-number">14.240</h3>
                        <p className="stat-label">{t('stat_groups')}</p>
                    </div>
                </div>
                <div className="stat-item">
                    <div className="stat-icon">
                        <Coffee size={40} />
                    </div>
                    <div className="stat-info">
                        <h3 className="stat-number">194K Ha</h3>
                        <p className="stat-label">{t('stat_land')}</p>
                    </div>
                </div>
                <div className="stat-item">
                    <div className="stat-icon">
                        <Apple size={40} />
                    </div>
                    <div className="stat-info">
                        <h3 className="stat-number">1,4M Ton</h3>
                        <p className="stat-label">{t('stat_production')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;