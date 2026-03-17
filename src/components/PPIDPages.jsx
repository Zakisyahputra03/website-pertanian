import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Info,
    Target,
    ShieldCheck,
    FileSearch,
    ChevronRight,
    Download,
    Eye,
    Clock,
    ShieldAlert,
    Scale,
    GanttChartSquare,
    ClipboardCheck,
    ArrowLeft,
    Home
} from 'lucide-react';
import './PPIDPages.css';

const PPIDLayout = ({ title, children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { name: 'Profil PPID', path: '/ppid/profil', icon: <Info size={18} /> },
        { name: 'Visi Misi PPID', path: '/ppid/visi-misi', icon: <Target size={18} /> },
        { name: 'Tugas Fungsi PPID', path: '/ppid/tugas-fungsi', icon: <ClipboardCheck size={18} /> },
        { name: 'Informasi Publik', path: '/ppid/informasi', icon: <FileSearch size={18} /> }
    ];

    return (
        <div className="ppid-page-container">
            <div className="container">
                <div className="ppid-header-banner reveal reveal-down">
                    <div className="back-btn-wrap">
                        <Link to="/" className="back-btn-premium ppid-banner-btn">
                            <Home size={18} /> Beranda
                        </Link>
                        <button onClick={() => navigate(-1)} className="back-btn-premium ppid-banner-btn">
                            <ArrowLeft size={18} /> Kembali
                        </button>
                    </div>
                    
                    <div className="ppid-banner-content">
                        <div className="ppid-breadcrumb">PPID / {title.toUpperCase()}</div>
                        <h1>{title}</h1>
                    </div>
                </div>

                <div className="ppid-main-grid">
                    <aside className="ppid-sidebar reveal">
                        <div className="ppid-nav-list">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`ppid-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                    <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                                </Link>
                            ))}
                        </div>

                        <div className="vision-box" style={{ marginTop: '2.5rem', background: 'var(--primary-ultra-light)', border: 'none' }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-dark)', margin: 0 }}>
                                "Keterbukaan Informasi adalah Kunci Pelayanan Publik yang Melayani"
                            </p>
                        </div>
                    </aside>

                    <main className="ppid-content-card reveal">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export const ProfilPPID = () => (
    <PPIDLayout title="Profil PPID">
        <p className="ppid-intro-text">
            PPID (Pejabat Pengelola Informasi dan Dokumentasi) Dinas Pertanian Provinsi Sumatera Barat adalah unit kerja yang bertanggung jawab dalam penyimpanan, pendokumentasian, penyediaan, dan pelayanan informasi publik.
        </p>

        <div className="transparency-grid">
            <div className="transparency-card">
                <div className="category-icon" style={{ background: '#ecfdf5' }}><ShieldCheck color="#10b981" /></div>
                <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Sesuai UU No. 14/2008</h3>
                <p style={{ fontSize: '0.95rem', color: '#64748b' }}>Menjamin hak warga negara untuk mengetahui rencana pembuatan kebijakan publik dan program keputusan publik.</p>
            </div>
            <div className="transparency-card">
                <div className="category-icon" style={{ background: '#fef3c7' }}><Scale color="#f59e0b" /></div>
                <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Landasan Hukum</h3>
                <p style={{ fontSize: '0.95rem', color: '#64748b' }}>Diatur melalui Peraturan Gubernur Sumatera Barat tentang Pedoman Pengelolaan Pelayanan Informasi dan Dokumentasi.</p>
            </div>
        </div>

        <div style={{ marginTop: '4rem' }}>
            <h2>Struktur PPID Distan Sumbar</h2>
            <p>PPID di lingkungan Dinas Pertanian Sumatera Barat terdiri dari Pejabat Atasan PPID, Pejabat PPID Pembantu, dan tim operasional yang sigap melayani permintaan informasi baik secara online maupun offline.</p>
            <div className="mission-item" style={{ marginTop: '2rem' }}>
                <div className="mission-number"><Eye size={18} /></div>
                <div className="mission-desc">
                    <h4 style={{ margin: 0 }}>Transparansi Penuh</h4>
                    <p style={{ margin: '0.3rem 0 0' }}>Seluruh anggaran dan realisasi program pertanian dapat diakses sesuai koridor keterbukaan informasi publik.</p>
                </div>
            </div>
        </div>
    </PPIDLayout>
);

export const VisiMisiPPID = () => (
    <PPIDLayout title="Visi & Misi PPID">
        <div className="vision-box" style={{ padding: '3rem', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '2px' }}>VISI UTAMA</span>
            <h2 style={{ fontSize: '2.2rem', margin: '1rem 0', lineHeight: '1.3' }}>
                "Terwujudnya Pelayanan Informasi Publik yang Cepat, Tepat, dan Transparan Menuju Sumbar Madani."
            </h2>
        </div>

        <h2>Misi Strategis PPID</h2>
        <div className="procedure-steps">
            {[
                { title: "Kualitas Layanan", desc: "Meningkatkan kualitas pelayanan informasi publik dengan memanfaatkan teknologi informasi terbaru." },
                { title: "Kompetensi SDM", desc: "Meningkatkan kompetensi pengelola PPID dalam melayani permintaan rincian teknis informasi pertanian." },
                { title: "Standardisasi", desc: "Membangun sistem pendokumentasian informasi publik yang terintegrasi dan mudah diakses." },
                { title: "Advokasi Informasi", desc: "Memberikan edukasi kepada masyarakat tani mengenai hak-hak atas informasi pembangunan daerah." }
            ].map((step, i) => (
                <div key={i} className="step-item">
                    <div className="step-number" style={{ background: 'var(--primary-dark)', color: 'white' }}>{i + 1}</div>
                    <div className="step-info">
                        <h4>{step.title}</h4>
                        <p style={{ margin: 0, color: '#64748b' }}>{step.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </PPIDLayout>
);

export const TugasFungsiPPID = () => (
    <PPIDLayout title="Tugas & Fungsi PPID">
        <p className="ppid-intro-text">
            PPID Pembantu Dinas Pertanian Sumbar memiliki peran krusial dalam menjembatani kebutuhan data masyarakat dengan kebijakan internal kedinasan.
        </p>

        <div className="transparency-grid">
            <div className="transparency-card">
                <h3>Tugas Utama</h3>
                <ul className="simple-list" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                    <li>Mengkoordinasikan pengumpulan data informasi publik dari setiap bidang.</li>
                    <li>Melakukan verifikasi dan klasifikasi informasi publik.</li>
                    <li>Mengupdate portal informasi secara berkala.</li>
                </ul>
            </div>
            <div className="transparency-card">
                <h3>Fungsi Strategis</h3>
                <ul className="simple-list" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                    <li>Penyedia layanan informasi (Meja Layanan PPID).</li>
                    <li>Pengolah sengketa informasi publik.</li>
                    <li>Pelaksana pendokumentasian arsip statis dan dinamis.</li>
                </ul>
            </div>
        </div>

        <div className="support-card" style={{ marginTop: '4rem', borderColor: '#3b82f6' }}>
            <div className="support-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}><ShieldAlert /></div>
            <div className="support-text">
                <h5>Prosedur Keberatan</h5>
                <p>Masyarakat berhak mengajukan keberatan jika permintaan informasi tidak ditanggapi dalam waktu 10+7 hari kerja.</p>
            </div>
        </div>
    </PPIDLayout>
);

export const InformasiPublik = () => {
    const categories = [
        {
            name: 'Informasi Berkala',
            icon: <Clock />,
            docs: [
                { name: 'Profil Pimpinan & Pegawai Distan Sumbar', size: '1.2 MB' },
                { name: 'Rencana Strategis (RENSTRA) 2021-2026', size: '4.5 MB' },
                { name: 'Laporan Akuntabilitas Kinerja (LAKIP)', size: '2.8 MB' }
            ]
        },
        {
            name: 'Setiap Saat',
            icon: <GanttChartSquare />,
            docs: [
                { name: 'Daftar Aset & Inventaris Dinas', size: '3.1 MB' },
                { name: 'Prosedur Operasional Standar (SOP)', size: '1.5 MB' },
                { name: 'Program & Kegiatan Tahun Berjalan', size: '2.2 MB' }
            ]
        }
    ];

    return (
        <PPIDLayout title="Daftar Informasi Publik">
            <p className="ppid-intro-text">
                Unduh dokumen dan data publik yang disediakan oleh Dinas Pertanian Provinsi Sumatera Barat sesuai kategori yang telah ditetapkan.
            </p>

            {categories.map((cat, i) => (
                <div key={i} className="info-category-section">
                    <div className="category-header">
                        <div className="category-icon">{cat.icon}</div>
                        <h3 style={{ margin: 0, fontSize: '1.6rem' }}>{cat.name}</h3>
                    </div>
                    <div className="document-list">
                        {cat.docs.map((doc, idx) => (
                            <div key={idx} className="document-item">
                                <span style={{ fontWeight: 700, color: '#1e293b' }}>{doc.name}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>{doc.size}</span>
                                    <a href="#" className="btn-download-ppid">
                                        <Download size={14} /> PDF
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="cta-section-simple" style={{ marginTop: '5rem', background: '#f8fafc' }}>
                <Link to="/agenda" className="btn-premium" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}>
                    Lihat Agenda Kegiatan <ChevronRight size={18} />
                </Link>
            </div>
        </PPIDLayout>
    );
};
