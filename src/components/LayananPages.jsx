import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Users,
    FileText,
    Sprout,
    GraduationCap,
    ChevronRight,
    CheckCircle2,
    Download,
    ArrowRight,
    HelpCircle,
    ChevronDown,
    PhoneCall,
    ArrowLeft,
    Home
} from 'lucide-react';
import './LayananPages.css';

const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = React.useState(null);

    return (
        <div className="service-accordion">
            {items.map((item, index) => (
                <div key={index} className={`accordion-item ${activeIndex === index ? 'active' : ''}`}>
                    <button className="accordion-header" onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
                        <h4>{item.title}</h4>
                        <ChevronDown size={20} style={{ transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0)', transition: '0.3s' }} />
                    </button>
                    <div className="accordion-content">
                        <p style={{ margin: 0, color: '#64748b', lineHeight: '1.6' }}>{item.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const LayananLayout = ({ title, children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { name: 'Penyuluhan', path: '/layanan/penyuluhan', icon: <Users size={20} /> },
        { name: 'Perizinan', path: '/layanan/perizinan', icon: <FileText size={20} /> },
        { name: 'Bantuan Bibit', path: '/layanan/bibit', icon: <Sprout size={20} /> },
        { name: 'Pelatihan', path: '/layanan/pelatihan', icon: <GraduationCap size={20} /> }
    ];

    return (
        <div className="layanan-page-container">
            <div className="container">
                <div className="service-header-banner reveal">
                    <div className="container">
                        <div className="back-btn-wrap">
                            <Link to="/" className="back-btn-premium">
                                <Home size={18} /> Beranda
                            </Link>
                            <button onClick={() => navigate(-1)} className="back-btn-premium" style={{ border: 'none', cursor: 'pointer' }}>
                                <ArrowLeft size={18} /> Kembali
                            </button>
                        </div>
                        <div className="service-breadcrumb">Layanan Utama / {title}</div>
                        <h1>{title}</h1>
                    </div>
                </div>

                <div className="service-main-grid">
                    <aside className="service-sticky-sidebar reveal">
                        <div className="service-nav-list">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`service-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                                >
                                    <div className="service-icon-wrap">{item.icon}</div>
                                    <span>{item.name}</span>
                                    <ChevronRight size={16} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                                </Link>
                            ))}
                        </div>

                        <div className="cta-section-simple" style={{ marginTop: '2rem', padding: '1.5rem' }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: 700, opacity: 0.7 }}>Butuh Bantuan Cepat?</p>
                            <a href="https://wa.me/xxx" className="btn-premium" style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem' }}>
                                WhatsApp Center
                            </a>
                        </div>
                    </aside>

                    <main className="service-content-card reveal">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export const Penyuluhan = () => (
    <LayananLayout title="Penyuluhan Pertanian">
        <p className="service-intro">
            Dinas Pertanian Sumatera Barat melalui para Penyuluh Pertanian Lapangan (PPL) berkomitmen mendampingi petani di seluruh Nagari dan Desa dalam mengadopsi teknologi pertanian modern untuk meningkatkan kesejahteraan keluarga tani di Ranah Minang.
        </p>

        <h2>Fokus Pendampingan Daerah</h2>
        <div className="feature-grid">
            <div className="feature-card">
                <h3>Sentra Padi & Jagung</h3>
                <p>Pendampingan intensif di kawasan lumbung pangan seperti Solok, Tanah Datar, dan Agam untuk mencapai swasembada berkelanjutan.</p>
            </div>
            <div className="feature-card">
                <h3>Kelembagaan Ekonomi</h3>
                <p>Penguatan kapasitas Gapoktan dan Koperasi Tani di Sumatera Barat agar mandiri dalam permodalan dan pemasaran.</p>
            </div>
            <div className="feature-card">
                <h3>Penerapan CSA</h3>
                <p>Edukasi pertanian cerdas iklim (Climate Smart Agriculture) untuk menghadapi tantangan cuaca ekstrem di wilayah pegunungan dan pesisir.</p>
            </div>
            <div className="feature-card">
                <h3>Digitalisasi Nagari</h3>
                <p>Pelatihan penggunaan aplikasi Simluhtan dan i-Pubers bagi admin kelompok tani di seluruh kecamatan se-Sumbar.</p>
            </div>
        </div>

        <h2>Informasi Penting & FAQ</h2>
        <Accordion
            items={[
                { title: "Apakah layanan penyuluhan di Sumbar berbayar?", content: "Tidak. Seluruh layanan dari PPL Dinas Pertanian Sumbar adalah gratis dan dilarang memberikan imbalan apa pun (Gratifikasi)." },
                { title: "Bagaimana cara mengundang penyuluh ke Nagari kami?", content: "Ketua Kelompok Tani dapat berkoordinasi dengan BPP (Balai Penyuluhan Pertanian) kecamatan setempat atau menghubungi kami melalui helpdesk." },
                { title: "Siapa saja yang bisa mendapat layanan ini?", content: "Seluruh petani yang terdaftar dalam Simluhtan (Sistem Informasi Manajemen Penyuluhan Pertanian) di wilayah Sumatera Barat." }
            ]}
        />

        <div className="support-card">
            <div className="support-icon"><PhoneCall size={24} /></div>
            <div className="support-text">
                <h5>Layanan Pengaduan PPL</h5>
                <p>Ada kendala dengan penyuluh di daerah Anda? Laporkan ke Sekretariat Komisi Penyuluhan Sumbar via WA: 0811-xxxx-xxxx.</p>
            </div>
        </div>
    </LayananLayout>
);

export const Perizinan = () => (
    <LayananLayout title="Perizinan & Regulasi">
        <p className="service-intro">
            Guna mewujudkan kepatuhan hukum dan perlindungan lahan produktif, Dinas Pertanian Sumbar memfasilitasi rekomendasi teknis perizinan sesuai Perda No. 4 Tahun 2023 tentang Tata Ruang Pertanian Sumatera Barat.
        </p>

        <h2>Layanan Rekomendasi Teknis</h2>
        <ul className="simple-list">
            <li><strong>Rekomendasi Alih Fungsi Lahan (LP2B):</strong> Pengawasan ketat terhadap Lahan Pertanian Pangan Berkelanjutan di wilayah kabupaten/kota.</li>
            <li><strong>Izin Pendaftaran Pupuk & Pestisida:</strong> Pengawasan peredaran sarana produksi pertanian agar sesuai standar mutu di Sumbar.</li>
            <li><strong>Sertifikasi Kebun (GAP):</strong> Pemberian tanda daftar usaha budidaya bagi sentra hortikultura unggulan Sumbar (Manggis, Jeruk, dll).</li>
            <li><strong>Sertifikasi Perbenihan:</strong> Pengawasan legalitas penangkaran benih padi varietas lokal (Anak Daro, Kuriak Kusuik, dll).</li>
        </ul>

        <div className="vision-box" style={{ background: '#fffbeb', borderColor: '#fef3c7' }}>
            <p style={{ fontSize: '1.1rem', color: '#92400e' }}>
                Pelayanan perizinan pertanian kini lebih cepat melalui integrasi <strong>Sistem Informasi Perizinan Sumbar Madani</strong> yang transparan.
            </p>
        </div>

        <div className="cta-section-simple">
            <h3>Download Dokumen Persyaratan</h3>
            <p>Unduh format surat permohonan rekomendasi teknis untuk keperluan administrasi perizinan Anda.</p>
            <button className="btn-view-more" style={{ margin: '1.5rem auto 0' }}>
                <Download size={18} /> Berkas Rekomtek (PDF)
            </button>
        </div>

        <div style={{ marginTop: '3rem' }}>
            <Accordion
                items={[
                    { title: "Apakah Dinas mengeluarkan izin bangunan di lahan tani?", content: "Kami hanya mengeluarkan Rekomendasi Teknis. Izin bangunan (PBG) tetap melalui Dinas Perizinan (DPMPTSP) masing-masing Kota/Kabupaten sesuai RTRW." },
                    { title: "Bagaimana status lahan sawah yang dilindungi?", content: "Berdasarkan Perda LP2B Sumbar, lahan sawah produktif dilarang keras dialihfungsikan kecuali untuk kepentingan PSN dengan ganti rugi lahan baru." }
                ]}
            />
        </div>
    </LayananLayout>
);

export const BantuanBibit = () => (
    <LayananLayout title="Bantuan Bibit & Benih">
        <p className="service-intro">
            Melalui Unit Pelaksana Teknis Daerah (UPTD) Benih, Dinas Pertanian Sumbar mendistribusikan bantuan benih unggul bersertifikat untuk meningkatkan produksi komoditas prioritas Sumatera Barat.
        </p>

        <div className="feature-grid">
            <div className="feature-card">
                <h3>Benih Padi Lokal Spesifik</h3>
                <p>Varietas Anak Daro dan Cisokan yang sangat diminati pasar Sumbar dan memiliki adaptasi baik di lahan lokal.</p>
            </div>
            <div className="feature-card">
                <h3>Bibit Hortikultura Unggul</h3>
                <p>Bantuan bibit Manggis Kaligesing dan Jeruk Gunung Omeh bagi kawasan pengembangan buah-buahan ekspor.</p>
            </div>
        </div>

        <h2>Syarat Kelompok Penerima Bantuan</h2>
        <div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '20px' }}>
            {[
                "Kelompok Tani telah terdaftar di SIMLUHTAN selama minimal 2 tahun.",
                "Memiliki CPCL (Calon Petani Calon Lahan) yang divalidasi oleh PPL dan Mantri Tani.",
                "Proposal telah disahkan oleh KCD/UPTD Pertanian Kecamatan dan Dinas Kabupaten.",
                "Bersedia menandatangani Surat Pernyataan Kesanggupan Mengelola Bantuan."
            ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.8rem', alignItems: 'flex-start' }}>
                    <CheckCircle2 color="var(--primary)" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontWeight: 600, color: '#166534' }}>{item}</span>
                </div>
            ))}
        </div>

        <div className="cta-section-simple" style={{ background: 'var(--primary-ultra-light)' }}>
            <h3>Jadwal Distribusi TA 2026</h3>
            <p>Pantau jadwal droping benih ke masing-masing kabupaten/kota di Sumatera Barat agar tepat waktu tanam.</p>
            <button className="btn-premium" style={{ marginTop: '1.5rem' }}>
                Cek Jadwal Pengiriman <ArrowRight size={18} />
            </button>
        </div>
    </LayananLayout>
);

export const Pelatihan = () => (
    <LayananLayout title="Pelatihan & Kapasitas">
        <p className="service-intro">
            Dinas Pertanian Sumatera Barat menyelenggarakan pelatihan vokasi bagi petani dan penyuluh guna menciptakan SDM pertanian yang adaptif terhadap teknologi digital dan mekanisasi.
        </p>

        <h2>Program Prioritas Sumbar</h2>
        <div className="mission-list">
            {[
                { title: "Millennial Farmer Training", text: "Menarik minat generasi muda Sumbar untuk bertani secara modern (Hidroponik, IoT, dan Digital Marketing)." },
                { title: "Pelatihan Pengolahan Hasil", text: "Edukasi pengolahan Rendang Kaleng dan Bumbu Masak kering untuk UMKM berbasis pertanian di Sumbar." },
                { title: "Mekanisasi Pertanian", text: "Bimbingan operasional bantuan Alsintan (Traktor & Drone Sprayer) agar efektif digunakan di lahan berbukit." },
                { title: "Pertanian Organik", text: "Sertifikasi dan pelatihan budidaya pangan sehat ramah lingkungan di kawasan wisata Sumbar." }
            ].map((item, i) => (
                <div key={i} className="mission-item">
                    <div className="mission-number" style={{ background: '#f59e0b' }}><CheckCircle2 size={18} /></div>
                    <div className="mission-desc">
                        <h4 style={{ margin: '0 0 0.4rem', color: 'var(--primary-dark)' }}>{item.title}</h4>
                        <p style={{ margin: 0, fontWeight: 500, fontSize: '0.9rem' }}>{item.text}</p>
                    </div>
                </div>
            ))}
        </div>

        <div style={{ marginTop: '3rem', borderTop: '1px solid #e2e8f0', paddingTop: '3rem' }}>
            <h2>Kalender Diklat Tahun 2026</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                        <th style={{ padding: '1rem' }}>Kegiatan</th>
                        <th style={{ padding: '1rem' }}>Lokasi BPP</th>
                        <th style={{ padding: '1rem' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { name: "Pelatihan Budidaya Manggis", date: "Kab. Padang Pariaman", slot: "Dibuka" },
                        { name: "Workshop i-Pubers (Pupuk)", date: "Kota Payakumbuh", slot: "Penuh" },
                        { name: "Diklat Alsintan Drone", date: "Kab. Lima Puluh Kota", slot: "15 Peserta" }
                    ].map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '1rem', fontWeight: 700 }}>{row.name}</td>
                            <td style={{ padding: '1rem', color: '#64748b' }}>{row.date}</td>
                            <td style={{ padding: '1rem', color: row.slot === 'Penuh' ? '#ef4444' : 'var(--primary)', fontWeight: 800 }}>{row.slot}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </LayananLayout >
);
