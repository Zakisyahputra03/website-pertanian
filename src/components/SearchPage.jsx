import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, ChevronRight, FileText, Newspaper, Grid, Info, ArrowRight } from 'lucide-react';
import { allBerita, allPages } from '../data/siteData';
import './SearchPage.css';

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState({ news: [], pages: [] });
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('q');
        if (q) {
            setSearchQuery(q);
            performSearch(q);
        }
    }, [location.search]);

    const performSearch = (query) => {
        setIsSearching(true);
        const q = query.toLowerCase();

        // Search in News
        const newsResults = allBerita.filter(item =>
            item.title.toLowerCase().includes(q) ||
            item.excerpt.toLowerCase().includes(q) ||
            item.tag.toLowerCase().includes(q)
        );

        // Search in Pages
        const pageResults = allPages.filter(item =>
            item.title.toLowerCase().includes(q) ||
            item.content.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
        );

        setResults({ news: newsResults, pages: pageResults });

        // Short delay to feel like a real search
        setTimeout(() => {
            setIsSearching(false);
        }, 300);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const totalResults = results.news.length + results.pages.length;

    return (
        <div className="search-results-page">
            <div className="search-header-bg">
                <div className="container-narrow">
                    <header className="search-page-header">
                        <div className="search-top-nav">
                            <button onClick={() => navigate(-1)} className="search-back-btn">
                                <ArrowLeft size={18} />
                                <span>Kembali</span>
                            </button>
                            <nav className="search-breadcrumb">
                                <Link to="/">Beranda</Link>
                                <ChevronRight size={12} />
                                <span>Pencarian</span>
                            </nav>
                        </div>

                        <h1>Pencarian Informasi</h1>

                        <form onSubmit={handleSearchSubmit} className="search-main-form">
                            <div className="search-input-wrapper">
                                <Search size={22} className="search-icon-inside" />
                                <input
                                    type="text"
                                    placeholder="Apa yang ingin Anda cari?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="search-btn-trigger">Cari</button>
                            </div>
                            <p className="search-stats">
                                {totalResults > 0
                                    ? `Ditemukan ${totalResults} hasil untuk "${searchQuery}"`
                                    : searchQuery ? `Tidak ada hasil untuk "${searchQuery}"` : "Ketikkan kata kunci untuk memulai pencarian"}
                            </p>
                        </form>
                    </header>
                </div>
            </div>

            <main className="container-narrow">
                {isSearching ? (
                    <div className="search-loading">
                        <div className="spinner"></div>
                        <p>Mencari hasil terbaik...</p>
                    </div>
                ) : (
                    <div className="search-results-content">
                        {/* Pages Results */}
                        {results.pages.length > 0 && (
                            <section className="results-section">
                                <h2 className="section-title"><Info size={20} /> Informasi & Layanan ({results.pages.length})</h2>
                                <div className="page-results-list">
                                    {results.pages.map((page, idx) => (
                                        <Link to={page.path} key={idx} className="page-result-item">
                                            <div className="page-result-icon">
                                                <FileText size={20} />
                                            </div>
                                            <div className="page-result-info">
                                                <span className="result-category">{page.category}</span>
                                                <h3>{page.title}</h3>
                                                <p>{page.content}</p>
                                            </div>
                                            <ChevronRight size={18} className="result-arrow" />
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* News Results */}
                        {results.news.length > 0 && (
                            <section className="results-section">
                                <h2 className="section-title"><Newspaper size={20} /> Warta & Berita ({results.news.length})</h2>
                                <div className="news-results-list">
                                    {results.news.map((news) => (
                                        <Link to={`/berita/${news.id}`} key={news.id} className="news-result-item">
                                            <div className="news-result-img">
                                                <img src={news.image} alt={news.title} />
                                            </div>
                                            <div className="news-result-info">
                                                <div className="news-result-meta">
                                                    <span className="news-result-tag">{news.tag}</span>
                                                    <span className="news-result-date">{news.date}</span>
                                                </div>
                                                <h3>{news.title}</h3>
                                                <p>{news.excerpt}</p>
                                                <div className="news-result-link">
                                                    Baca Selengkapnya <ArrowRight size={14} />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Empty State */}
                        {searchQuery && totalResults === 0 && (
                            <div className="search-empty-state">
                                <div className="empty-icon">
                                    <Search size={60} />
                                </div>
                                <h3>Hasil tidak ditemukan</h3>
                                <p>Coba gunakan kata kunci lain atau periksa ejaan Anda.</p>
                                <div className="suggestion-box">
                                    <p>Saran pencarian:</p>
                                    <ul>
                                        <li>Penyuluhan Pertanian</li>
                                        <li>Bantuan Bibit</li>
                                        <li>Sejarah Dinas</li>
                                        <li>Visi Misi</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default SearchPage;
