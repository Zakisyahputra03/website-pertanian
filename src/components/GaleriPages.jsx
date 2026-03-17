import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { Play, X, ChevronLeft, ChevronRight, Share2, Download, Maximize2, ArrowLeft, Home, Camera, Video } from 'lucide-react';
import './GaleriPages.css';
import './Galeri.css'; // Reuse lightbox styles
import panenRaya from '../assets/download.jpg';
import petaniMilineal from '../assets/saat-pemkab-luncurkan-kegiatan-petani-milineal.jpg';
import hortikulturaUnggul from '../assets/MCw0NTAmc3NsPTE.webp';
import pameranPangan from '../assets/download (3).jpg';
import benihPadiJagung from '../assets/pemprov-sumbar-bagi-benih-padi-dan-jagung_43.webp';
import arryYuswandiBantuan from '../assets/sumbar-arry-yuswandi-bantuan.webp';
import juknisPupuk from '../assets/foto-berita-pupuk-indonesia-dan-kementan-sosialisasikan-juknis-baru-penyaluran-pupuk--060825091052.webp';
import kunjunganLapanganImg from '../assets/1000704803.jpg.webp';
import galleryHeroBg from '../assets/Background Matahari Terbenam Keemasan Di Atas Sawah Dengan Petani Memanen Tanaman, Sawah, Panen Petani, Matahari Terbenam Emas untuk Unduhan Gratis - Pngtree.jpg';
import videoHeroBg from '../assets/minang-sumbar-westsumatera.jpg';

const GalleryLayout = ({ title, subtitle, children, bg }) => {
    const navigate = useNavigate();
    return (
        <div className="gallery-page-container">
            <div className="container">
                <header
                    className="gallery-hero reveal"
                    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url("${bg || galleryHeroBg}")` }}
                >
                    <div className="back-btn-wrap">
                        <Link to="/" className="back-btn-premium">
                            <Home size={18} /> Beranda
                        </Link>
                        <button onClick={() => navigate(-1)} className="back-btn-premium" style={{ border: 'none', cursor: 'pointer' }}>
                            <ArrowLeft size={18} /> Kembali
                        </button>
                    </div>

                    <div className="hero-content">
                        <span className="badge">OFFICIAL GALLERY</span>
                        <h1>{title}</h1>
                        <p>{subtitle}</p>
                    </div>
                </header>

                <div className="gallery-nav-tabs reveal">
                    <NavLink to="/galeri/foto" className={({ isActive }) => `gallery-tab-link ${isActive ? 'active' : ''}`}>
                        <Camera size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        Foto Kegiatan
                    </NavLink>
                    <NavLink to="/galeri/video" className={({ isActive }) => `gallery-tab-link ${isActive ? 'active' : ''}`}>
                        <Video size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        Video Dokumentasi
                    </NavLink>
                </div>

                {children}
            </div>
        </div>
    );
};

export const FotoKegiatan = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const photos = [
        { id: 1, url: panenRaya, title: 'Panen Raya Padi', cat: 'Kegiatan' },
        { id: 2, url: petaniMilineal, title: 'Pelatihan Petani Milenial', cat: 'Edukasi' },
        { id: 3, url: arryYuswandiBantuan, title: 'Bantuan Alsintan', cat: 'Program' },
        { id: 4, url: hortikulturaUnggul, title: 'Hortikultura Unggul', cat: 'Produksi' },
        { id: 6, url: pameranPangan, title: 'Pameran Pangan', cat: 'Kegiatan' },
        { id: 7, url: kunjunganLapanganImg, title: 'Pengolahan Lahan', cat: 'Produksi' },
        { id: 8, url: benihPadiJagung, title: 'Distribusi Benih', cat: 'Program' },
        { id: 9, url: juknisPupuk, title: 'Kunjungan Lapangan', cat: 'Kegiatan' }
    ];

    const navigate = (dir) => {
        const idx = photos.findIndex(img => img.id === selectedImage.id);
        const nextIdx = (idx + dir + photos.length) % photos.length;
        setSelectedImage(photos[nextIdx]);
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
            alert('Tautan disalin ke papan klip!');
        }
    };

    return (
        <GalleryLayout
            title="Foto Kegiatan"
            subtitle="Dokumentasi visual perjalanan pembangunan pertanian di Sumatera Barat."
            bg={galleryHeroBg}
        >
            <div className="full-gallery-masonry reveal">
                {photos.map(photo => (
                    <div key={photo.id} className="full-gallery-item" onClick={() => setSelectedImage(photo)}>
                        <img src={photo.url} alt={photo.title} />
                        <div className="masonry-info">
                            <span className="category-label">{photo.cat}</span>
                            <h4>{photo.title}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className="premium-lightbox">
                    <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}></div>
                    <div className="lightbox-container">
                        <button className="lightbox-close" onClick={() => setSelectedImage(null)}><X size={32} /></button>
                        <div className="lightbox-main">
                            <button className="lightbox-nav prev" onClick={() => navigate(-1)}><ChevronLeft size={40} /></button>
                            <div className="lightbox-stage">
                                <img src={selectedImage.url} alt={selectedImage.title} className="lightbox-img" />
                                <div className="lightbox-info-bar">
                                    <div className="info-text">
                                        <h3>{selectedImage.title}</h3>
                                        <span>{selectedImage.cat} • Dinas Pertanian Sumbar</span>
                                    </div>
                                    <div className="info-actions">
                                        <button className="info-tool" onClick={() => handleDownload(selectedImage.url, selectedImage.title)}>
                                            <Download size={20} />
                                            <span>Unduh</span>
                                        </button>
                                        <button className="info-tool" onClick={() => handleShare(selectedImage.title)}>
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
        </GalleryLayout>
    );
};

export const VideoDokumentasi = () => {
    const handleShare = (title) => {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: `Saksikan video: ${title} - Dinas Pertanian Sumatera Barat`,
                url: window.location.href,
            }).catch(() => {
                navigator.clipboard.writeText(window.location.href);
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Tautan disalin ke papan klip!');
        }
    };

    const videos = [
        {
            id: 'video1',
            youtubeId: 'W_R4_tY5n6I', // Example YouTube ID
            title: 'Profil Dinas Pertanian Provinsi Sumatera Barat 2026',
            category: 'PROFIL',
            desc: 'Informasi menyeluruh mengenai visi, misi, dan program unggulan Dinas Pertanian Sumatera Barat.'
        },
        {
            id: 'video2',
            youtubeId: 'G1p8vS8sQsw', // Example YouTube ID
            title: 'Panen Raya Padi Organik di Ranah Minang',
            category: 'DOKUMENTASI',
            desc: 'Liputan khusus kegiatan panen raya serentak di kawasan persawahan lumbung pangan Sumbar.'
        },
        {
            id: 'video3',
            youtubeId: 'ZYz0wfLHfZ8',
            title: 'Sosialisasi Pupuk: Penebusan Pupuk Digital (i-Pubers)',
            category: 'EDUKASI',
            desc: 'Informasi dan panduan mengenai sosialisasi penggunaan aplikasi i-Pubers untuk penebusan pupuk bersubsidi bagi petani.'
        },
        {
            id: 'video4',
            youtubeId: 'qfcl_O1j2X0', // Example YouTube ID
            title: 'Testimoni Petani Milenial Payakumbuh',
            category: 'INSPIRASI',
            desc: 'Kisah sukses para pemuda yang membuktikan bahwa bertani bisa menguntungkan dan keren.'
        },
        {
            id: 'video5',
            youtubeId: 'kkvVVOzSdIk',
            title: 'Penyerahan Bantuan Alat dan Mesin Pertanian (Alsintan)',
            category: 'PROGRAM',
            desc: 'Dokumentasi penyerahan bantuan alat mesin pertanian guna mendukung produktivitas kelompok tani di Sumatera Barat.'
        }
    ];

    return (
        <GalleryLayout
            title="Video Dokumentasi"
            subtitle="Saksikan rekaman visual aktivitas, edukasi, dan capaian sektor pertanian kami."
            bg={videoHeroBg}
        >
            <div className="video-grid-premium reveal">
                {videos.map(video => (
                    <div key={video.id} className="video-card-premium">
                        <div className="video-iframe-wrap">
                            <iframe
                                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="video-info-content">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <span className="video-meta-tag">{video.category}</span>
                                <button
                                    className="share-btn-minimal"
                                    onClick={() => handleShare(video.title)}
                                    title="Bagikan"
                                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                                >
                                    <Share2 size={18} />
                                </button>
                            </div>
                            <h3>{video.title}</h3>
                            <p className="video-description">{video.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

        </GalleryLayout>
    );
};
