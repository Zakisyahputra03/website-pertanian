import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Mitra.css';

import logoProv from '../assets/logo-sumbar-prov.png';
import logoPPID from '../assets/logo-ppid-sumbar.png';
import logoKI from '../assets/logo-ki-sumbar.png';
import logoKementan from '../assets/logo-kementan-official.png';
import logoBapanas from '../assets/logo-bapanas-horizontal.png';
import logoBulog from '../assets/logo-bulog-horizontal.png';

const Mitra = () => {
    const { language } = useLanguage();
    const primaryMitra = [
        {
            id: 1,
            name: "Website Provinsi Sumatera Barat",
            url: "https://sumbarprov.go.id",
            logo: logoProv
        },
        {
            id: 2,
            name: "Komisi Informasi Sumatera Barat",
            url: "https://komisiinformasi.sumbarprov.go.id",
            logo: logoKI
        },
        {
            id: 3,
            name: "PPID Sumatera Barat",
            url: "https://ppid.sumbarprov.go.id",
            logo: logoPPID
        },
        {
            id: 4,
            name: "Kementrian Pertanian",
            url: "https://pertanian.go.id",
            logo: logoKementan
        },
        {
            id: 5,
            name: "Badan Pangan Nasional",
            url: "https://badanpangan.go.id",
            logo: logoBapanas
        },
        {
            id: 6,
            name: "Bulog",
            url: "https://bulog.co.id",
            logo: logoBulog
        }
    ];

    return (
        <section className="mitra-section">
            <div className="container">
                <div className="section-header-compact">
                    <span className="section-tag-small">Partner & Link Terkait</span>
                    <h2 className="mitra-title">{language === 'id' ? 'Sinergi & Kemitraan' : 'Synergy & Partnership'}</h2>
                    <div className="title-line"></div>
                </div>

                <div className="mitra-marquee">
                    <div className="marquee-content">
                        {primaryMitra.map((mitra) => (
                            <a
                                key={mitra.id}
                                href={mitra.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mitra-item"
                            >
                                <div className="mitra-logo-wrapper">
                                    <img
                                        src={mitra.logo}
                                        alt={mitra.name}
                                        className="mitra-logo"
                                    />
                                    <span className="mitra-fallback-text" style={{ display: 'none' }}>{mitra.name}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                    {/* Duplicate set for seamless loop */}
                    <div className="marquee-content" aria-hidden="true">
                        {primaryMitra.map((mitra) => (
                            <a
                                key={`dup-${mitra.id}`}
                                href={mitra.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mitra-item"
                            >
                                <div className="mitra-logo-wrapper">
                                    <img
                                        src={mitra.logo}
                                        alt={mitra.name}
                                        className="mitra-logo"
                                    />
                                    <span className="mitra-fallback-text" style={{ display: 'none' }}>{mitra.name}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mitra;
