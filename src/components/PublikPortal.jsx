import { Link } from 'react-router-dom';
import { FileText, Bell, Download, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './PublikPortal.css';

const PublikPortal = () => {
    const { t } = useLanguage();
    const dokumen = [
        { title: 'Laporan Kinerja Instansi Pemerintah 2024', size: '2.4 MB', type: 'PDF' },
        { title: 'Rencana Strategis Dinas Pertanian 2021-2026', size: '4.1 MB', type: 'PDF' },
        { title: 'Daftar Isian Pelaksanaan Anggaran (DIPA) 2025', size: '1.8 MB', type: 'PDF' },
        { title: 'Profil Sektor Pertanian Sumatera Barat 2024', size: '5.2 MB', type: 'PDF' }
    ];

    const pengumuman = [
        {
            title: 'Pengadaan Bantuan Alat dan Mesin Pertanian APBD 2026',
            date: '12 Maret 2026',
            tag: 'Lelang'
        },
        {
            title: 'Pendaftaran Sertifikasi Benih Padi Musim Tanam II Sabda Alam',
            date: '08 Maret 2026',
            tag: 'Info'
        },
        {
            title: 'Hasil Seleksi Administrasi Calon Penyuluh Pertanian Lapangan',
            date: '05 Maret 2026',
            tag: 'Pengumuman'
        }
    ];

    return (
        <section className="publik-section reveal" id="publik-portal">
            <div className="container">
                <div className="publik-grid">
                    {/* Dokumen Publik */}
                    <div className="publik-column">
                        <div className="column-header">
                            <div className="header-title">
                                <FileText className="header-icon" />
                                <h2>{t('portal_docs_title')}</h2>
                            </div>
                            <Link to="/dokumen" className="view-all-btn">
                                {t('portal_docs_btn')} <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="dokumen-list">
                            {dokumen.map((doc, index) => (
                                <div key={index} className="dokumen-item">
                                    <div className="doc-icon-box">
                                        <div className="doc-type">{doc.type}</div>
                                        <FileText size={20} />
                                    </div>
                                    <div className="doc-info">
                                        <h4>{doc.title}</h4>
                                        <span>{doc.size} • Terunduh 1.2k kali</span>
                                    </div>
                                    <button className="download-icon-btn" title="Download">
                                        <Download size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pengumuman */}
                    <div className="publik-column">
                        <div className="column-header">
                            <div className="header-title">
                                <Bell className="header-icon icon-bell" />
                                <h2>{t('portal_ann_title')}</h2>
                            </div>
                            <Link to="/pengumuman" className="view-all-btn">
                                {t('portal_ann_btn')} <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="pengumuman-stack">
                            {pengumuman.map((item, index) => (
                                <div key={index} className="pengumuman-card">
                                    <div className="pengumuman-content">
                                        <div className="meta-row">
                                            <span className={`tag ${item.tag.toLowerCase()}`}>{item.tag}</span>
                                            <div className="date-group">
                                                <Calendar size={14} />
                                                <span>{item.date}</span>
                                            </div>
                                        </div>
                                        <h3>{item.title}</h3>
                                    </div>
                                    <div className="card-action">
                                        <ExternalLink size={20} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="info-banner-mini">
                            <div className="pulse-dot"></div>
                            <span>{t('portal_call_center')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PublikPortal;
