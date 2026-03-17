import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, ChevronRight, ArrowLeft } from 'lucide-react';
import './BeritaPage.css';
import { allBerita } from '../data/siteData';

const BeritaPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    const itemsPerPage = 3;

    // Handle search query from URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('q');
        if (q) {
            setSearchQuery(q);
        }
    }, [location.search]);

    // Reset page when searching
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const filteredBerita = allBerita.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Calculation
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBerita.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBerita.length / itemsPerPage);

    return (
        <div className="neat-news-page">
            <div className="container-narrow">
                {/* Minimal Header */}
                <header className="neat-header">
                    <div className="neat-top-actions">
                        <button onClick={() => navigate(-1)} className="neat-back-btn">
                            <ArrowLeft size={18} />
                            <span>Kembali</span>
                        </button>
                        <nav className="neat-breadcrumb-v2">
                            <Link to="/">Beranda</Link>
                            <ChevronRight size={12} />
                            <span>Arsip Berita</span>
                        </nav>
                    </div>
                    <h1>Warta & Dokumentasi</h1>
                    <div className="neat-search-row">
                        <div className="neat-search-input">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Cari berdasarkan judul atau topik..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </header>

                <div className="neat-news-list">
                    {currentItems.map((item) => (
                        <article key={item.id} className="neat-news-item">
                            <div className="neat-item-img">
                                <Link to={`/berita/${item.id}`}>
                                    <img src={item.image} alt={item.title} />
                                </Link>
                                <span className="neat-tag">{item.tag}</span>
                            </div>
                            <div className="neat-item-content">
                                <div className="neat-meta">
                                    <span>{item.date}</span>
                                    <span className="dot"></span>
                                    <span>{item.readTime} Baca</span>
                                </div>
                                <h2>
                                    <Link to={`/berita/${item.id}`}>{item.title}</Link>
                                </h2>
                                <p>{item.excerpt}</p>
                                <Link to={`/berita/${item.id}`} className="neat-more-link">
                                    Baca Selengkapnya <ArrowRight size={16} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {filteredBerita.length === 0 && (
                    <div className="neat-empty">
                        <p>Tidak ada warta yang ditemukan untuk pencarian "{searchQuery}".</p>
                    </div>
                )}

                {filteredBerita.length > 0 && (
                    <footer className="neat-pagination">
                        <div className="neat-page-numbers">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                <button
                                    key={number}
                                    className={`neat-page-btn ${currentPage === number ? 'active' : ''}`}
                                    onClick={() => setCurrentPage(number)}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default BeritaPage;
