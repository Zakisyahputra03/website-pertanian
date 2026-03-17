import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Share2, Printer, Home } from 'lucide-react';
import './BeritaDetail.css';
import { allBerita } from '../data/siteData';

const BeritaDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the article from siteData
    const article = allBerita.find(item => item.id === parseInt(id)) || allBerita[0];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Fallback content if siteData doesn't have the full body
    const placeholderContent = [
        `PARIAMAN — Kawasan ini menjadi saksi bisu upaya pemerintah dalam meningkatkan kesejahteraan masyarakat melalui sektor unggulan. ${article.title} merupakan salah satu langkah nyata yang diambil untuk memastikan program pembangunan menyentuh langsung ke masyarakat.`,
        'Dalam kesempatan kali ini, berbagai pihak terkait meninjau langsung perkembangan di lapangan. Sinergi antara pemerintah provinsi dan daerah menjadi kunci utama keberhasilan program-program yang telah dicanangkan.',
        'Masyarakat menyambut baik inisiatif ini dan berharap keberlanjutan program dapat terus terjaga demi masa depan yang lebih baik. Dinas Pertanian Sumatera Barat berkomitmen untuk terus mengawal setiap tahapan pembangunan agar tepat sasaran dan memberikan manfaat maksimal.',
        'Kegiatan ini juga menjadi ajang diskusi untuk menyerap aspirasi masyarakat terkait kendala yang dihadapi di lapangan, sehingga solusi yang diberikan dapat bersifat komprehensif dan berkelanjutan.'
    ];

    return (
        <div className="berita-detail-page">
            <div className="container">
                <div className="article-navigation">
                    <div className="back-btn-wrap">
                        <Link to="/" className="back-btn-premium back-btn-dark">
                            <Home size={18} /> Beranda
                        </Link>
                        <button onClick={() => navigate(-1)} className="back-btn-premium back-btn-dark" style={{ border: 'none', cursor: 'pointer' }}>
                            <ArrowLeft size={18} /> Kembali
                        </button>
                    </div>
                    <div className="article-actions">
                        <button className="action-btn"><Share2 size={18} /></button>
                        <button className="action-btn"><Printer size={18} /></button>
                    </div>
                </div>

                <article className="article-container">
                    <header className="article-header">
                        <h1 className="article-title">{article.title}</h1>
                        <div className="article-meta">
                            <div className="meta-item">
                                <Calendar size={16} />
                                <span>{article.date}</span>
                            </div>
                            <div className="meta-item">
                                <User size={16} />
                                <span>Admin OPD</span>
                            </div>
                            <div className="meta-item">
                                <Tag size={16} />
                                <span>{article.tag}</span>
                            </div>
                        </div>
                    </header>

                    <div className="article-img-wrap">
                        <img src={article.image} alt={article.title} className="featured-image" />
                    </div>

                    <div className="article-body">
                        {placeholderContent.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>

                    <footer className="article-footer">
                        <div className="article-tags">
                            <span className="tag-pill">#SumbarMadani</span>
                            <span className="tag-pill">#PertanianSumbar</span>
                            <span className="tag-pill">#Pembangunan</span>
                            <span className="tag-pill">#KesejahteraanRakyat</span>
                        </div>
                        <div className="article-navigation-bottom">
                            <Link to="/berita" className="back-btn-pill">
                                <ArrowLeft size={16} />
                                Kembali ke Berita
                            </Link>
                        </div>
                    </footer>
                </article>
            </div>
        </div>
    );
};

export default BeritaDetail;
