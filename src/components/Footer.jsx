import React from 'react';
import { Link } from 'react-router-dom';
import {
    Phone, Mail, MapPin, Facebook, Twitter,
    Instagram, Youtube, ChevronRight, Copy, Navigation, ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';
import logoSumbar from '../assets/Emblem of West Sumat.png';

const Footer = () => {
    const { t, language } = useLanguage();
    const [copySuccess, setCopySuccess] = React.useState(false);

    const handleCopyAddress = () => {
        const address = "Jl. Raya Padang-Indarung KM. 8, Bandar Buat, Padang, Sumatera Barat";
        navigator.clipboard.writeText(address);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return (
        <footer className="footer">
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid reveal">
                        <div className="footer-info">
                            <div className="footer-logo">
                                <img
                                    src={logoSumbar}
                                    alt="Logo Dinas Pertanian"
                                />
                                <h3>Dinas Pertanian<br />Sumatera Barat</h3>
                            </div>
                            <p className="footer-address">
                                Jl. Raya Padang - Indarung No.KM. 8, Bandar Buat, Kec. Lubuk Kilangan, Kota Padang, Sumatera Barat 25157, Koto Padang, Sumatera Barat, Indonesia 25157
                            </p>
                            <button
                                className={`copy-address-btn ${copySuccess ? 'success' : ''}`}
                                onClick={handleCopyAddress}
                            >
                                <Copy size={14} />
                                {copySuccess ? (language === 'id' ? 'Tersalin!' : 'Copied!') : (language === 'id' ? 'Salin Alamat' : 'Copy Address')}
                            </button>
                            <div className="footer-contact">
                                <div className="contact-item">
                                    <Phone size={16} />
                                    <span>0751-72409</span>
                                </div>
                                <div className="contact-item">
                                    <Mail size={16} />
                                    <span>info@pertanian.sumbarprov.go.id</span>
                                </div>
                                <div className="contact-item">
                                    <MapPin size={16} />
                                    <span>Padang, Sumatera Barat</span>
                                </div>
                            </div>
                        </div>

                        <div className="footer-links">
                            <h4>{t('footer_explore')}</h4>
                            <ul>
                                <li><Link to="/">{t('nav_home')}</Link></li>
                                <li><Link to="/profil">{t('nav_profile')}</Link></li>
                                <li><Link to="/layanan">{t('nav_services')}</Link></li>
                                <li><a href="/#berita">{t('nav_news')}</a></li>
                                <li><Link to="/agenda">Agenda</Link></li>
                            </ul>
                        </div>

                        <div className="footer-links">
                            <h4>{t('footer_links')}</h4>
                            <ul>
                                <li><Link to="/layanan/penyuluhan">{t('nav_services_extension')}</Link></li>
                                <li><Link to="/layanan/bibit">{t('nav_services_seeds')}</Link></li>
                                <li><Link to="/faq">{t('faq')}</Link></li>
                                <li><Link to="/layanan/pelatihan">{t('nav_services_training')}</Link></li>
                                <li><Link to="/layanan/perizinan">{t('nav_services_licensing')}</Link></li>
                            </ul>
                        </div>

                        <div className="footer-social">
                            <h4>{t('footer_social')}</h4>
                            <div className="social-links">
                                <a href="https://www.facebook.com/profile.php?id=100080955056368" target="_blank" rel="noopener noreferrer" className="social-link facebook"><Facebook size={18} /></a>
                                <a href="https://x.com/brmpbuahtropika" target="_blank" rel="noopener noreferrer" className="social-link twitter"><Twitter size={18} /></a>
                                <a href="https://www.instagram.com/disbuntanhorsumbar.official?igsh=MTRlMmlwaDhiemIwcQ==" target="_blank" rel="noopener noreferrer" className="social-link instagram"><Instagram size={18} /></a>
                                <a href="https://youtube.com/@brmpsumbar?si=CRWIVt_ZOkkFZEob" target="_blank" rel="noopener noreferrer" className="social-link youtube"><Youtube size={18} /></a>
                            </div>

                            <div className="footer-map-widget">
                                <div className="map-wrapper">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.2674523984447!2d100.4277635!3d-0.9521158999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b9ef51e81bff%3A0xd892b14e5b2c3c68!2sDinas%20Perkebunan%20Tanaman%20Pangan%20dan%20Hortikultura%20Sumbar!5e1!3m2!1sid!2sid!4v1773196101635!5m2!1sid!2sid"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Lokasi Kantor"
                                    ></iframe>
                                    <a
                                        href="https://www.google.com/maps/dir//Dinas+Perkebunan+Tanaman+Pangan+dan+Hortikultura+Sumbar"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="open-in-maps-btn"
                                    >
                                        <span>Open in Maps</span>
                                        <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p>{t('footer_copyright')}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;