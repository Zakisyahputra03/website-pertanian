import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, ChevronDown, HelpCircle, MessageSquare, BookOpen, Leaf } from 'lucide-react';
import './FAQPage.css';

const FAQPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const navigate = useNavigate();

    const faqCategories = [
        {
            title: "Layanan Umum",
            icon: <HelpCircle className="cat-icon" />,
            items: [
                {
                    q: "Bagaimana cara mendaftarkan kelompok tani?",
                    a: "Pendaftaran dapat dilakukan melalui Balai Penyuluhan Pertanian (BPP) di kecamatan masing-masing dengan membawa dokumen identitas anggota dan surat pengantar dari Nagari/Desa."
                },
                {
                    q: "Apa saja syarat mendapatkan bantuan bibit?",
                    a: "Kelompok tani harus terdaftar di SIMLUHTAN selama minimal 2 tahun, memiliki CPCL yang divalidasi, dan mengajukan proposal ke Dinas Pertanian Kabupaten/Kota."
                }
            ]
        },
        {
            title: "Teknis & Budidaya",
            icon: <Leaf className="cat-icon" />,
            items: [
                {
                    q: "Di mana saya bisa mendapatkan informasi hama terkini?",
                    a: "Anda dapat memantau menu 'Informasi Publik' di website kami atau menghubungi UPTD Perlindungan Tanaman Pangan dan Hortikultura (PTPH) Sumatera Barat."
                },
                {
                    q: "Apakah ada pelatihan untuk petani milenial?",
                    a: "Ya, kami memiliki program khusus pelatihan petani milenial setiap tahunnya. Informasi pendaftaran akan diumumkan di halaman 'Berita' dan media sosial resmi kami."
                }
            ]
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-page-wrapper">
            <div className="faq-hero">
                <div className="container">
                    <div className="back-btn-wrap">
                        <Link to="/" className="back-btn-premium">
                            <Home size={18} /> Beranda
                        </Link>
                        <button onClick={() => navigate(-1)} className="back-btn-premium" style={{ border: 'none', cursor: 'pointer' }}>
                            <ArrowLeft size={18} /> Kembali
                        </button>
                    </div>
                    <div className="faq-hero-content">
                        <span className="badge">Pusat Bantuan</span>
                        <h1>Pertanyaan Sering Diajukan</h1>
                        <p>Temukan jawaban cepat untuk pertanyaan umum mengenai layanan dan program Dinas Pertanian Sumatera Barat.</p>
                    </div>
                </div>
            </div>

            <main className="faq-main">
                <div className="container">
                    <div className="faq-grid">
                        <aside className="faq-sidebar">
                            <div className="support-card-aesthetic">
                                <div className="s-icon-wrap">
                                    <MessageSquare size={32} />
                                </div>
                                <h3>Butuh Bantuan Lain?</h3>
                                <p>Jika Anda tidak menemukan jawaban yang Anda cari, tim kami siap membantu.</p>
                                <button className="btn-premium">Hubungi Kami</button>
                            </div>
                        </aside>

                        <div className="faq-content">
                            {faqCategories.map((cat, catIdx) => (
                                <div key={catIdx} className="faq-category-block">
                                    <div className="cat-header">
                                        {cat.icon}
                                        <h2>{cat.title}</h2>
                                    </div>
                                    <div className="faq-list">
                                        {cat.items.map((item, itemIdx) => {
                                            const globalIdx = `${catIdx}-${itemIdx}`;
                                            const isOpen = activeIndex === globalIdx;
                                            return (
                                                <div
                                                    key={itemIdx}
                                                    className={`faq-item-aesthetic ${isOpen ? 'active' : ''}`}
                                                >
                                                    <button
                                                        className="faq-question"
                                                        onClick={() => toggleFAQ(globalIdx)}
                                                    >
                                                        <span>{item.q}</span>
                                                        <ChevronDown size={20} className="q-chevron" />
                                                    </button>
                                                    <div className="faq-answer">
                                                        <div className="answer-inner">
                                                            {item.a}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FAQPage;
