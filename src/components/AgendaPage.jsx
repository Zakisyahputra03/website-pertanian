import React from 'react';
import { Calendar, MapPin, Clock, PhoneCall, Info, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AgendaPage.css';

const AgendaPage = () => {
    const navigate = useNavigate();

    const agendaItems = [
        {
            day: '12',
            month: 'Mar',
            year: '2026',
            title: 'Sosialisasi Pupuk Bersubsidi se-Sumatera Barat',
            time: '09:00 - 14:00 WIB',
            location: 'Aula Utama Dinas Pertanian, Padang',
            category: 'SOSIALISASI',
            desc: 'Pertemuan teknis mengenai mekanisme penebusan pupuk bersubsidi menggunakan i-Pubers bagi distributor dan pengecer resmi se-Sumatera Barat.'
        },
        {
            day: '15',
            month: 'Mar',
            year: '2026',
            title: 'Panen Raya Padi Varietas Anak Daro',
            time: '08:00 WIB - Selesai',
            location: 'Kawasan Pertanian Koto Baru, Kab. Solok',
            category: 'KEGIATAN LAPANGAN',
            desc: 'Acara seremonial panen raya bersama Gubernur Sumatera Barat dan kelompok tani setempat untuk merayakan keberhasilan varietas lokal.'
        },
        {
            day: '18',
            month: 'Mar',
            year: '2026',
            title: 'Pasar Tani Murah Jelang Ramadhan',
            time: '07:30 - 12:00 WIB',
            location: 'Halaman Kantor Dinas Pertanian Provinsi',
            category: 'PELAYANAN PUBLIK',
            desc: 'Penyediaan komoditas pangan segar dengan harga produsen untuk membantu masyarakat mengantisipasi lonjakan harga jelang bulan suci Ramadhan.'
        },
        {
            day: '20',
            month: 'Mar',
            year: '2026',
            title: 'Bimbingan Teknis Smart Farming & IoT Petani Milenial',
            time: '10:00 - 16:00 WIB',
            location: 'BPP Payakumbuh, Kota Payakumbuh',
            category: 'PELATIHAN',
            desc: 'Pelatihan praktis implementasi sensor kelembaban tanah dan otomasi penyiraman berbasis smartphone untuk efisiensi biaya produksi.'
        },
        {
            day: '25',
            month: 'Mar',
            year: '2026',
            title: 'Rapat Koordinasi Ketahanan Pangan Tingkat Provinsi',
            time: '13:00 - 17:00 WIB',
            location: 'Ruang Rapat Istana Gubernur Sumbar',
            category: 'RAPAT DINAS',
            desc: 'Evaluasi ketersediaan cadangan pangan daerah dan sinkronisasi program pusat dengan kabupaten/kota se-Sumatera Barat.'
        }
    ];

    return (
        <div className="agenda-page">
            <header className="agenda-header reveal">
                <div className="container">
                    <div className="back-btn-wrap">
                        <button className="back-btn-premium" onClick={() => navigate('/')}>
                            <Home size={18} /> Beranda
                        </button>
                        <button className="back-btn-premium" onClick={() => navigate(-1)}>
                            <ArrowLeft size={18} /> Kembali
                        </button>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '3px', color: 'rgba(255,255,255,0.7)' }}>AGENDA RESMI</span>
                    <h1>Kalender Kegiatan</h1>
                </div>
            </header>

            <div className="agenda-container">
                <div className="agenda-grid">
                    <main className="agenda-list-section">
                        <h2 className="reveal">Agenda Mendatang</h2>
                        {agendaItems.map((item, index) => (
                            <div key={index} className="agenda-card-detailed reveal">
                                <div className="date-badge-big">
                                    <span className="day">{item.day}</span>
                                    <span className="month">{item.month}</span>
                                </div>
                                <div className="agenda-info">
                                    <span className="agenda-tag">{item.category}</span>
                                    <h3>{item.title}</h3>
                                    <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.6' }}>{item.desc}</p>
                                    <div className="agenda-details-row">
                                        <div className="detail-item"><Clock size={18} /> {item.time}</div>
                                        <div className="detail-item"><MapPin size={18} /> {item.location}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </main>

                    <aside className="agenda-sidebar-info reveal">
                        <div className="info-widget">
                            <h4>Informasi Agenda</h4>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                                Seluruh jadwal kegiatan kedinasan yang tercantum bersifat tentatif dan dapat berubah sewaktu-waktu sesuai dengan arahan pimpinan.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="contact-link-pill">
                                    <PhoneCall size={20} />
                                    <span>Sekretariat Agenda</span>
                                </div>
                                <div className="contact-link-pill" style={{ background: '#f8fafc' }}>
                                    <Info size={20} />
                                    <span>Panduan Konfirmasi</span>
                                </div>
                            </div>
                        </div>

                        <div className="info-widget" style={{ background: 'var(--primary-dark)', color: 'white' }}>
                            <h4 style={{ color: 'white' }}>Update Berkala</h4>
                            <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0' }}>
                                Pastikan Anda mengecek halaman ini secara berkala untuk mendapatkan pembaruan terkait jam dan lokasi kegiatan terbaru.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default AgendaPage;
