import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Home, History, Target, Eye, ShieldCheck, 
    Rocket, Users, Sprout, Briefcase, GraduationCap, Building2,
    Calendar, Map, Globe, Info, Award, UserCheck, Settings, Database,
    TrendingUp, Wheat, Trees, Landmark
} from 'lucide-react';
import './ProfilPages.css';

const SimpleProfileLayout = ({ title, children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const navs = [
        { name: 'Sejarah', path: '/profil/sejarah' },
        { name: 'Visi Misi', path: '/profil/visi-misi' },
        { name: 'Tugas & Fungsi', path: '/profil/tugas-fungsi' },
        { name: 'Struktur Organisasi', path: '/profil/struktur' }
    ];

    return (
        <div className="profile-container">
            <div className="container">
                <div className="profile-header reveal reveal-down">
                    <div className="back-btn-wrap">
                        <Link to="/" className="back-btn-premium back-btn-dark">
                            <Home size={18} /> Beranda
                        </Link>
                        <button onClick={() => navigate(-1)} className="back-btn-premium back-btn-dark" style={{ border: 'none', cursor: 'pointer' }}>
                            <ArrowLeft size={18} /> Kembali
                        </button>
                    </div>
                    <h1>{title}</h1>
                    <div className="profile-underline"></div>
                </div>

                <div className="nav-simple-profile reveal reveal-up">
                    {navs.map(nav => (
                        <Link
                            key={nav.path}
                            to={nav.path}
                            className={`nav-link-simple ${location.pathname === nav.path ? 'active' : ''}`}
                        >
                            {nav.name}
                        </Link>
                    ))}
                </div>

                <div className="profile-content-card reveal reveal-up">
                    <div className="profile-text">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Sejarah = () => (
    <SimpleProfileLayout title="Sejarah">
        <div className="aesthetic-profile-section">
            <div className="profile-intro-card reveal reveal-up">
                <History className="section-icon-large" />
                <p>Dinas Pertanian Provinsi Sumatera Barat memiliki akar sejarah yang kuat sebagai instansi yang mengawal ketahanan pangan di wilayah Sumatera Bagian Tengah sejak masa awal kemerdekaan. Sumatera Barat, yang secara geografis diberkati dengan tanah vulkanik yang subur dan iklim tropis yang mendukung, telah lama menjadi pusat pertumbuhan berbagai komoditas unggulan.</p>
            </div>

            <div className="history-timeline">
                <div className="timeline-item reveal reveal-left">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <h4>Era Pembentukan</h4>
                        <p>Dinas Pertanian bertransformasi menjadi lembaga yang lebih progresif dan dekat dengan masyarakat tani sejak masa otonomi daerah.</p>
                    </div>
                </div>
                <div className="timeline-item reveal reveal-right">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <h4>Era Modernisasi</h4>
                        <p>Kami telah melalui berbagai fase pembangunan, mulai dari era intensifikasi massal hingga era modernisasi berbasis teknologi informasi saat ini.</p>
                    </div>
                </div>
                <div className="timeline-item reveal reveal-left">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <h4>Visi Masa Depan</h4>
                        <p>Memastikan keberlanjutan sektor pertanian sebagai penyumbang terbesar PDRB daerah, sekaligus menjaga kesejahteraan jutaan petani.</p>
                    </div>
                </div>
            </div>
        </div>
    </SimpleProfileLayout>
);

export const VisiMisi = () => (
    <SimpleProfileLayout title="Visi & Misi">
        <div className="aesthetic-profile-section">
            <div className="vision-section reveal reveal-zoom">
                <div className="section-title-wrap">
                    <Eye className="icon" />
                    <h3>Visi Kami</h3>
                </div>
                <div className="vision-card-premium">
                    <p>"Terwujudnya Pertanian Sumatera Barat yang Tangguh, Mandiri, Modern, dan Sejahtera Berbasis Kawasan dan Berkelanjutan"</p>
                </div>
            </div>

            <div className="mission-section">
                <div className="section-title-wrap reveal reveal-up">
                    <Target className="icon" />
                    <h3>Misi Strategis</h3>
                </div>
                <div className="mission-grid">
                    {[
                        { title: 'Produktivitas', desc: 'Mengoptimalkan hasil panen pangan & hortikultura.', icon: <TrendingUp /> },
                        { title: 'Modernisasi', desc: 'Adopsi Smart Farming & digitalisasi sistem.', icon: <Rocket /> },
                        { title: 'SDM Unggul', desc: 'Meningkatkan kompetensi penyuluh & petani milenial.', icon: <UserCheck /> },
                        { title: 'Ketahanan Pangan', desc: 'Menjamin pangan cukup, aman, dan bergizi.', icon: <ShieldCheck /> },
                        { title: 'Infrastruktur', desc: 'Pembangunan irigasi desa & jalan usaha tani.', icon: <Building2 /> },
                        { title: 'Lingkungan', desc: 'Praktik pertanian organik & ramah lingkungan.', icon: <Sprout /> }
                    ].map((m, i) => (
                        <div key={i} className={`mission-card reveal reveal-up delay-${(i + 1) * 100}`}>
                            <div className="mission-icon">{m.icon}</div>
                            <h4>{m.title}</h4>
                            <p>{m.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </SimpleProfileLayout>
);

export const TugasFungsi = () => (
    <SimpleProfileLayout title="Tugas & Fungsi">
        <div className="aesthetic-profile-section">
            <div className="profile-intro-card reveal reveal-up">
                <Briefcase className="section-icon-large" />
                <p>Melaksanakan urusan pemerintahan bidang pertanian yang menjadi kewenangan Provinsi dan tugas pembantuan yang ditugaskan kepada Daerah Provinsi.</p>
            </div>

            <div className="function-grid">
                {[
                    { title: 'Kebijakan', desc: 'Penyusunan rencana strategis & kebijakan teknis.', icon: <Settings /> },
                    { title: 'Koordinasi', desc: 'Sinkronisasi program pusat dan daerah.', icon: <Globe /> },
                    { title: 'Prasarana', desc: 'Pengelolaan irigasi & distribusi pupuk subsidi.', icon: <Building2 /> },
                    { title: 'Perlindungan', desc: 'Pengendalian OPT & mitigasi perubahan iklim.', icon: <ShieldCheck /> },
                    { title: 'Penyuluhan', desc: 'Bimbingan teknis peningkatan kapabilitas petani.', icon: <GraduationCap /> },
                    { title: 'Data Pertanian', desc: 'Manajemen statistik sebagai dasar keputusan.', icon: <Database /> }
                ].map((f, i) => (
                    <div key={i} className={`function-card reveal reveal-up delay-${(i + 1) * 100}`}>
                        <div className="function-icon-wrap">{f.icon}</div>
                        <div className="function-info">
                            <h4>{f.title}</h4>
                            <p>{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </SimpleProfileLayout>
);

export const StrukturOrganisasi = () => (
    <SimpleProfileLayout title="Struktur Organisasi">
        <p className="reveal reveal-up">Struktur Organisasi Dinas Pertanian Provinsi Sumatera Barat disusun secara ramping namun kaya fungsi untuk memastikan efisiensi birokrasi dan ketepatan layanan.</p>

        <div className="org-premium-container reveal reveal-zoom">
            <div className="org-node main-node">
                <Building2 size={32} className="node-icon" />
                <div className="node-text">
                    <h4>Kepala Dinas</h4>
                    <span>Pimpinan Tertinggi</span>
                </div>
            </div>

            <div className="org-branch-connector"></div>

            <div className="org-node secretary-node">
                <Users size={24} className="node-icon" />
                <div className="node-text">
                    <h4>Sekretariat</h4>
                    <span>Adm & Perencanaan</span>
                </div>
            </div>

            <div className="org-multi-branch">
                <div className="branch-line"></div>
                <div className="branch-grid">
                    {[
                        { title: 'Tanaman Pangan', icon: <Sprout /> },
                        { title: 'Hortikultura', icon: <Wheat /> },
                        { title: 'Perkebunan', icon: <Trees /> },
                        { title: 'Prasarana', icon: <Landmark /> }
                    ].map((b, i) => (
                        <div key={i} className="branch-node">
                            <div className="branch-icon">{b.icon}</div>
                            <span>{b.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="org-node footer-node">
                <Award size={24} className="node-icon" />
                <div className="node-text">
                    <h4>UPTD & Jafung</h4>
                    <span>Pelaksana Teknis</span>
                </div>
            </div>
        </div>

        <div className="org-footer-note reveal reveal-up" style={{ marginTop: '3rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '15px' }}>
            <p style={{ margin: 0, fontSize: '0.95rem', fontStyle: 'italic' }}>
                * Struktur ini dirancang untuk memastikan koordinasi yang cepat dan efektif antara pimpinan tingkat atas hingga pelaksana teknis di lapangan.
            </p>
        </div>
    </SimpleProfileLayout>
);
