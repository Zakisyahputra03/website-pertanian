import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Share2, Download, Maximize2, ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Galeri.css';
import panenRaya from '../assets/download.jpg';
import petaniMilineal from '../assets/saat-pemkab-luncurkan-kegiatan-petani-milineal.jpg';
import hortikulturaUnggul from '../assets/MCw0NTAmc3NsPTE.webp';
import pameranPangan from '../assets/download (3).jpg';
import arryYuswandiBantuan from '../assets/sumbar-arry-yuswandi-bantuan.webp';
// Removed sosialisasiPupukImg import as we use direct YT embed

const Galeri = () => {
    const { t, language } = useLanguage();
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    const galleryImages = [
        { id: 1, url: panenRaya, title: 'Panen Raya Padi', cat: 'Photo', type: 'image' },
        { id: 2, url: petaniMilineal, title: 'Pelatihan Petani Milenial', cat: 'Photo', type: 'image' },
        { id: 3, url: arryYuswandiBantuan, title: 'Bantuan Alsintan', cat: 'Photo', type: 'image' },
        { id: 4, url: hortikulturaUnggul, title: 'Hortikultura Unggul', cat: 'Photo', type: 'image' },
        { id: 5, url: null, title: 'Sosialisasi Pupuk', cat: 'Video', type: 'video', videoId: 'ZYz0wfLHfZ8' },
        { id: 6, url: pameranPangan, title: 'Pameran Pangan', cat: 'Photo', type: 'image' },
    ];

    const filters = [
        { label: t('gallery_filter_all'), value: 'All' },
        { label: t('gallery_filter_photo'), value: 'Photo' },
        { label: t('gallery_filter_video'), value: 'Video' }
    ];

    const filtered = activeFilter === 'All' ? galleryImages : galleryImages.filter(img => img.cat === activeFilter);

    const openLightbox = (img) => setSelectedImage(img);
    const closeLightbox = () => setSelectedImage(null);

    const navigate = (dir) => {
        const idx = galleryImages.findIndex(img => img.id === selectedImage.id);
        const nextIdx = (idx + dir + galleryImages.length) % galleryImages.length;
        setSelectedImage(galleryImages[nextIdx]);
    };

    const handleDownload = (url, title) => {
        if (!url) return;
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShare = (title) => {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: `Lihat kegiatan: ${title} - Dinas Pertanian Sumatera Barat`,
                url: window.location.href,
            }).catch(() => {
                navigator.clipboard.writeText(window.location.href);
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Tautan berhasil disalin ke clipboard!');
        }
    };

    return (
        <section className="galeri-premium reveal">
            <div className="container">
                <div className="section-header">
                    <span className="badge">{t('gallery_section_badge')}</span>
                    <h2>{t('gallery_section_title')}</h2>
                    <p>{t('gallery_section_subtitle')}</p>
                </div>

                <div className="gallery-filters">
                    {filters.map(f => (
                        <button
                            key={f.value}
                            className={`filter-chip ${activeFilter === f.value ? 'active' : ''}`}
                            onClick={() => setActiveFilter(f.value)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="masonry-gallery">
                    {filtered.map((img) => (
                        <div key={img.id} className="masonry-item">
                            <div className="img-wrapper">
                                {img.type === 'video' ? (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${img.videoId}`}
                                        title={img.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ width: '100%', height: '100%', border: 'none' }}
                                    ></iframe>
                                ) : (
                                    <>
                                        <img src={img.url} alt={img.title} className="masonry-img" onClick={() => openLightbox(img)} />
                                        <div className="img-overlay-hover" onClick={() => openLightbox(img)}>
                                            <Maximize2 size={24} />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="masonry-info" onClick={img.type !== 'video' ? () => openLightbox(img) : undefined}>
                                <span className="category-label">{img.cat === 'Photo' ? t('gallery_filter_photo') : t('gallery_filter_video')}</span>
                                <h4>{img.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="gallery-footer-action">
                    <Link to="/galeri/foto" className="btn-gallery-all">
                        <span>{t('gallery_btn_all')}</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>

            {/* Premium Lightbox */}
            {selectedImage && (
                <div className="premium-lightbox">
                    <div className="lightbox-overlay" onClick={closeLightbox}></div>
                    <div className="lightbox-container">
                        <button className="lightbox-close" onClick={closeLightbox}><X size={32} /></button>

                        <div className="lightbox-main">
                            <button className="lightbox-nav prev" onClick={() => navigate(-1)}><ChevronLeft size={40} /></button>
                            <div className="lightbox-stage">
                                {selectedImage.type === 'video' ? (
                                    <div className="video-container">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${selectedImage.videoId}?autoplay=1`}
                                            title={selectedImage.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ) : (
                                    <img src={selectedImage.url} alt={selectedImage.title} className="lightbox-img" />
                                )}
                                <div className="lightbox-info-bar">
                                    <div className="info-text">
                                        <h3>{selectedImage.title}</h3>
                                        <span>{selectedImage.cat} • Dinas Pertanian Sumbar</span>
                                    </div>
                                    <div className="info-actions">
                                        <button
                                            className="info-tool"
                                            onClick={() => handleDownload(selectedImage.url, selectedImage.title)}
                                            style={{ display: selectedImage.type === 'video' ? 'none' : 'flex' }}
                                        >
                                            <Download size={20} />
                                            <span>Unduh</span>
                                        </button>
                                        <button
                                            className="info-tool"
                                            onClick={() => handleShare(selectedImage.title)}
                                        >
                                            <Share2 size={20} />
                                            <span>Bagikan</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button className="lightbox-nav next" onClick={() => navigate(1)}><ChevronRight size={40} /></button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Galeri;