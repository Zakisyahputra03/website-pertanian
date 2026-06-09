import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Share2, Download, Maximize2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ApiService from '../services/apiService';
import './Galeri.css';
import panenRaya from '../assets/download.jpg';
import petaniMilineal from '../assets/saat-pemkab-luncurkan-kegiatan-petani-milineal.jpg';
import hortikulturaUnggul from '../assets/MCw0NTAmc3NsPTE.webp';
import pameranPangan from '../assets/download (3).jpg';
import arryYuswandiBantuan from '../assets/sumbar-arry-yuswandi-bantuan.webp';

// Custom Indonesian Date Parser to handle API date strings like "8 Juni 2026 22:28:18"
const parseIndonesianDate = (dateStr) => {
    if (!dateStr) return new Date(0);
    const months = {
        januari: 0, jan: 0,
        februari: 1, feb: 1,
        maret: 2, mar: 2,
        april: 3, apr: 3,
        mei: 4,
        juni: 5, jun: 5,
        juli: 6, jul: 6,
        agustus: 7, agu: 7, agt: 7,
        september: 8, sep: 8,
        oktober: 9, okt: 9,
        november: 10, nov: 10,
        desember: 11, des: 11
    };
    
    try {
        const cleanStr = String(dateStr).toLowerCase().trim();
        const parts = cleanStr.split(/[\s,]+/);
        if (parts.length >= 3) {
            const day = parseInt(parts[0], 10);
            const monthName = parts[1];
            const year = parseInt(parts[2], 10);
            
            const month = months[monthName] !== undefined ? months[monthName] : 0;
            
            let hour = 0, min = 0, sec = 0;
            if (parts[3] && parts[3].includes(':')) {
                const timeParts = parts[3].split(':');
                hour = parseInt(timeParts[0], 10) || 0;
                min = parseInt(timeParts[1], 10) || 0;
                sec = parseInt(timeParts[2], 10) || 0;
            }
            
            return new Date(year, month, day, hour, min, sec);
        }
    } catch (e) {
        console.error("Error parsing date in gallery:", dateStr, e);
    }
    
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? new Date(0) : parsed;
};

const Galeri = () => {
    const { t } = useLanguage();
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [galleryData, setGalleryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fallbackGallery = [
        { id: 'photo-static-1', url: panenRaya, title: 'Panen Raya Padi', cat: 'Photo', type: 'image' },
        { id: 'photo-static-2', url: petaniMilineal, title: 'Pelatihan Petani Milenial', cat: 'Photo', type: 'image' },
        { id: 'photo-static-3', url: arryYuswandiBantuan, title: 'Bantuan Alsintan', cat: 'Photo', type: 'image' },
        { id: 'photo-static-4', url: hortikulturaUnggul, title: 'Hortikultura Unggul', cat: 'Photo', type: 'image' },
        { id: 'video-static-5', url: null, title: 'Sosialisasi Pupuk', cat: 'Video', type: 'video', videoId: 'ZYz0wfLHfZ8' },
        { id: 'photo-static-6', url: pameranPangan, title: 'Pameran Pangan', cat: 'Photo', type: 'image' },
    ];

    useEffect(() => {
        const fetchGalleryData = async () => {
            try {
                setLoading(true);
                const [photosRes, videosRes] = await Promise.allSettled([
                    ApiService.getGaleriFoto(),
                    ApiService.getGaleriVideo()
                ]);

                let photosList = [];
                if (photosRes.status === 'fulfilled') {
                    const data = ApiService.normalizeList(photosRes.value);
                    photosList = data.map((item, index) => {
                        const rawUrl = item.cover || item.image || item.url || item.foto || item.gambar || null;
                        return {
                            id: `photo-${item.id || item.slug || index}`,
                            url: ApiService.resolveUrl(rawUrl),
                            title: item.title || item.judul || item.caption || "Foto Kegiatan",
                            cat: "Photo",
                            type: "image",
                            dateStr: item.created_at || ""
                        };
                    });
                }

                let videosList = [];
                if (videosRes.status === 'fulfilled') {
                    const data = ApiService.normalizeList(videosRes.value);
                    videosList = data.map((item, index) => {
                        const url = item.url || item.video_url || item.link || item.embed || item.file_url;
                        return {
                            id: `video-${item.id || item.videoId || item.youtubeId || index}`,
                            url: null,
                            title: item.title || item.judul || item.name || "Video Dokumentasi",
                            cat: "Video",
                            type: "video",
                            videoId: ApiService.parseYoutubeId(url),
                            dateStr: item.created_at || ""
                        };
                    });
                }

                // Combine and sort chronologically
                const combined = [...photosList, ...videosList].sort((a, b) => {
                    const dateA = parseIndonesianDate(a.dateStr);
                    const dateB = parseIndonesianDate(b.dateStr);
                    return dateB - dateA;
                });

                setGalleryData(combined.length > 0 ? combined : fallbackGallery);
            } catch (err) {
                console.error("Error loading gallery API data:", err);
                setError(err.message);
                setGalleryData(fallbackGallery);
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryData();
    }, []);

    const filters = [
        { label: t('gallery_filter_all'), value: 'All' },
        { label: t('gallery_filter_photo'), value: 'Photo' },
        { label: t('gallery_filter_video'), value: 'Video' }
    ];

    // Take top 6 items based on the active filter
    const filtered = activeFilter === 'All'
        ? galleryData.slice(0, 6)
        : galleryData.filter(img => img.cat === activeFilter).slice(0, 6);

    const openLightbox = (img) => setSelectedImage(img);
    const closeLightbox = () => setSelectedImage(null);

    const navigate = (dir) => {
        const idx = filtered.findIndex(img => img.id === selectedImage.id);
        if (idx === -1) return;
        const nextIdx = (idx + dir + filtered.length) % filtered.length;
        setSelectedImage(filtered[nextIdx]);
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

    const SkeletonLoader = () => (
        <div className="masonry-gallery">
            {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="skeleton-gallery-item">
                    <div className="skeleton-gallery-img"></div>
                    <div className="skeleton-gallery-cat"></div>
                    <div className="skeleton-gallery-title"></div>
                </div>
            ))}
        </div>
    );

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

                {loading ? (
                    <SkeletonLoader />
                ) : (
                    <div className="masonry-gallery">
                        {filtered.map((img) => (
                            <div key={img.id} className="masonry-item">
                                <div className="img-wrapper">
                                    {img.type === 'video' ? (
                                        img.videoId ? (
                                            <iframe
                                                src={`https://www.youtube.com/embed/${img.videoId}`}
                                                title={img.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{ width: '100%', height: '100%', border: 'none' }}
                                            ></iframe>
                                        ) : (
                                            <div className="error-container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <p>Format video tidak valid</p>
                                            </div>
                                        )
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
                )}

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
                                        <span>{selectedImage.cat === 'Photo' ? t('gallery_filter_photo') : t('gallery_filter_video')} • Dinas Pertanian Sumbar</span>
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