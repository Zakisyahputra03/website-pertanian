import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bell, Calendar, ArrowLeft, ChevronRight, Search, Info, Megaphone, Tag } from 'lucide-react';
import './PengumumanPage.css';

const PengumumanPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const allPengumuman = [
        {
            id: 1,
            title: 'Pengadaan Bantuan Alat dan Mesin Pertanian APBD 2026',
            date: '12 Maret 2026',
            tag: 'Lelang',
            content: 'Informasi mengenai pengadaan alsintan bagi kelompok tani yang terdaftar di Simluhtan tingkat kabupaten/kota se-Sumatera Barat...',
            important: true
        },
        {
            id: 2,
            title: 'Pendaftaran Sertifikasi Benih Padi Musim Tanam II Sabda Alam',
            date: '08 Maret 2026',
            tag: 'Info',
            content: 'Juknis dan syarat pendaftaran sertifikasi benih padi varietas lokal untuk menjamin kemurnian genetik dan kualitas fisik benih...'
        },
        {
            id: 3,
            title: 'Hasil Seleksi Administrasi Calon Penyuluh Pertanian Lapangan',
            date: '05 Maret 2026',
            tag: 'Pengumuman',
            content: 'Daftar nama peserta yang dinyatakan lulus seleksi administrasi dan berhak mengikuti tahapan wawancara di Dinas Pertanian Sumbar...'
        },
        {
            id: 4,
            title: 'Workshop Penggunaan Aplikasi Digital Farming bagi Petani Milenial',
            date: '01 Maret 2026',
            tag: 'Kegiatan',
            content: 'Undangan bagi peserta workshop inovasi teknologi pertanian berbasis IoT yang akan dilaksanakan di Balai Pelatihan Pertanian...'
        },
        {
            id: 5,
            title: 'Penyesuaian Harga Eceran Tertinggi Pupuk Bersubsidi TA 2026',
            date: '25 Februari 2026',
            tag: 'Regulasi',
            content: 'Keputusan Gubernur Sumatera Barat mengenai penetapan HET pupuk bersubsidi untuk sektor pertanian di wilayah Sumatera Barat...'
        },
        {
            id: 6,
            title: 'Pemberitahuan Penutupan Sementara Distribusi Benih UPTD',
            date: '20 Februari 2026',
            tag: 'Penting',
            content: 'Informasi penghentian sementara layanan distribusi benih di UPTD Benih dikarenakan masa vakum gudang dan sterilisasi area...',
            important: true
        }
    ];

    const filteredPengumuman = allPengumuman.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pengumuman-page">
            <div className="container-narrow">
                <header className="page-header-v2">
                    <div className="top-nav-row">
                        <button onClick={() => navigate(-1)} className="premium-back-btn">
                            <ArrowLeft size={18} />
                            <span>Kembali</span>
                        </button>
                        <nav className="premium-breadcrumb">
                            <Link to="/">Beranda</Link>
                            <ChevronRight size={12} />
                            <span>Pengumuman</span>
                        </nav>
                    </div>

                    <div className="header-content-v2">
                        <div className="icon-circle">
                            <Bell size={28} />
                        </div>
                        <h1>Arsip Pengumuman</h1>
                        <p>Informasi resmi, maklumat, dan jadwal kegiatan Dinas Pertanian Provinsi Sumatera Barat.</p>
                    </div>

                    <div className="search-bar-modern">
                        <Search size={20} className="search-ico" />
                        <input
                            type="text"
                            placeholder="Cari pengumuman..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </header>

                <div className="pengumuman-grid-page">
                    {filteredPengumuman.length > 0 ? (
                        filteredPengumuman.map((item) => (
                            <div key={item.id} className={`p-page-card ${item.important ? 'priority' : ''}`}>
                                <div className="p-card-header">
                                    <span className={`p-tag ${item.tag.toLowerCase()}`}>
                                        <Tag size={12} /> {item.tag}
                                    </span>
                                    <div className="p-date">
                                        <Calendar size={14} />
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                                <div className="p-card-body">
                                    <h3>{item.title}</h3>
                                    <p>{item.content}</p>
                                </div>
                                <div className="p-card-footer">
                                    <button className="btn-p-action">
                                        Lihat Selengkapnya <ChevronRight size={16} />
                                    </button>
                                    {item.important && (
                                        <span className="important-badge">
                                            <Info size={14} /> Penting
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-empty-state">
                            <Megaphone size={60} />
                            <h3>Tidak Ada Pengumuman</h3>
                            <p>Tidak ditemukan pengumuman dengan kata kunci "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PengumumanPage;
