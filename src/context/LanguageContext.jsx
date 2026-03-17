import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
    id: {
        // Navbar & Profile
        nav_home: "BERANDA",
        nav_profile: "PROFIL",
        nav_profile_history: "Sejarah",
        nav_profile_vision: "Visi Misi",
        nav_profile_tasks: "Tugas & Fungsi",
        nav_profile_structure: "Struktur Organisasi",

        // Services
        nav_services: "LAYANAN",
        nav_services_extension: "Penyuluhan",
        nav_services_licensing: "Perizinan",
        nav_services_seeds: "Bantuan Bibit",
        nav_services_training: "Pelatihan",

        nav_news: "BERITA",

        // PPID
        nav_ppid: "PPID",
        nav_ppid_profile: "Profil PPID",
        nav_ppid_vision: "Visi Misi PPID",
        nav_ppid_tasks: "Tugas Fungsi PPID",
        nav_ppid_info: "Informasi Publik",

        // Gallery
        nav_gallery: "GALERI",
        nav_gallery_photos: "Foto Kegiatan",
        nav_gallery_videos: "Video Dokumentasi",

        // Hero Section
        hero_welcome: "Selamat Datang di Website Resmi",
        hero_department: "Dinas Pertanian Sumatera Barat",
        hero_motto: "Mewujudkan Pertanian Sumatera Barat yang Maju, Mandiri, dan Modern",
        hero_search_placeholder: "Cari informasi pertanian, layanan, atau berita...",
        hero_search_btn: "Cari",
        hero_btn_profile: "PROFIL KAMI",
        hero_btn_services: "LAYANAN PERTANIAN",

        stat_farmers: "Petani Terdaftar",
        stat_groups: "Kelompok Tani",
        stat_land: "Luas Lahan Sawah",
        stat_production: "Produksi Padi/Thn",

        // Buttons & Labels
        nav_contact: "KONTAK",
        nav_lapor: "LAPOR!",
        menu_main: "MENU UTAMA",
        lang_id: "Bahasa Indonesia",
        lang_en: "English",
        faq: "FAQ",
        webmail: "WEBMAIL",

        // Running Text
        news_ticker_1: "TRANSFORMASI DIGITAL: Implementasi Smart Farming 4.0 di Seluruh Kabupaten/Kota Sumatera Barat",
        news_ticker_2: "HARGA KOMODITAS: Stabilitas Pangan Terjaga, Pantau Update Harga Harian Secara Real-time",
        news_ticker_3: "GERAKAN MANDIRI PANGAN: Distribusi Benih Unggul Bersertifikat Mencapai Target Nasional",
        news_ticker_4: "MODERNISASI ALSINTAN: Dukungan Teknologi Terbaru untuk Efisiensi Biaya Produksi Petani",
        news_ticker_5: "E-PENYULUHAN: Layanan Konsultasi Teknis Budidaya Kini Tersedia dalam Satu Genggaman",

        btn_back: "KEMBALI",
        btn_read_more: "SELENGKAPNYA",
        btn_reset: "ATUR ULANG",

        // Layanan Unggulan (Strategic Initiatives)
        program_title: "Program Unggulan",
        program_subtitle: "Berikut adalah rincian program unggulan pertanian di Sumatera Barat untuk mewujudkan ketahanan pangan yang mandiri.",
        program_badge: "Strategic Initiatives",
        program_1_title: "Program Babendi",
        program_1_sub: "Bantuan Biaya Tanam Padi",
        program_1_desc: "Bantuan Rp800 ribu per hektar bagi petani untuk mengurangi beban biaya tanam dan meningkatkan produktivitas padi.",
        program_2_title: "Optimalisasi Lahan",
        program_2_sub: "Swasembada Pangan",
        program_2_desc: "Intensifikasi lahan padi, penggunaan benih unggul seperti padi Banang Pulau, dan penanganan lahan non-rawa.",
        program_3_title: "Modernisasi Pertanian",
        program_3_sub: "BRMP Sumbar",
        program_3_desc: "Penerapan teknologi modern, mekanisasi, dan digitalisasi pertanian untuk meningkatkan efisiensi operasional.",
        program_4_title: "Hilirisasi Komoditas",
        program_4_sub: "Pasar Internasional",
        program_4_desc: "Fokus pada komoditas unggulan seperti kelapa sawit, kakao, karet, dan gambir agar menembus pasar global.",
        program_5_title: "Program Upland",
        program_5_sub: "Infrastruktur Pertanian",
        program_5_desc: "Peningkatan infrastruktur pertanian, prasarana, dan pemberdayaan petani di kawasan dataran tinggi.",
        program_6_title: "Sawah Pokok Murah",
        program_6_sub: "Stabilitas Harga",
        program_6_desc: "Program menjaga stabilitas harga beras dan kedaulatan pangan lokal untuk masyarakat Sumatera Barat.",
        program_7_title: "Desa Devisa Gambir",
        program_7_sub: "Kolaborasi Teknologi",
        program_7_desc: "Penguatan komoditas gambir melalui kolaborasi pembiayaan dan teknologi di tingkat desa/nagari.",
        program_8_title: "Program YESS",
        program_8_sub: "Wirausaha Muda",
        program_8_desc: "Penumbuhan wirausahawan muda pertanian melalui pelatihan intensif dan bantuan hibah modal usaha.",

        // Berita Terkini
        news_section_badge: "Latest News",
        news_section_title: "Berita & Artikel Terkini",
        news_section_subtitle: "Informasi terbaru seputar kebijakan, inovasi, dan perkembangan sektor pertanian di Sumatera Barat.",
        news_btn_all: "Lihat Semua Berita",

        // Galeri
        gallery_section_badge: "Visual Documentation",
        gallery_section_title: "Galeri Kegiatan",
        gallery_section_subtitle: "Lensa dokumentasi pergerakan sektor pertanian di bumi Minangkabau.",
        gallery_filter_all: "Semua",
        gallery_filter_photo: "Foto",
        gallery_filter_video: "Vidio",
        gallery_btn_all: "Lihat Semua Galeri Kegiatan",

        // Publik Portal
        portal_docs_title: "Dokumen Publik",
        portal_docs_btn: "Semua Dokumen",
        portal_ann_title: "Pengumuman",
        portal_ann_btn: "Lihat Semua",
        portal_call_center: "Hubungi Call Center untuk bantuan informasi: (0751) 123456",

        // Footer
        footer_desc: "Mewujudkan Pertanian Sumatera Barat yang Madani, Modern, dan Mandiri melalui pelayanan prima dan inovasi berkelanjutan.",
        footer_explore: "Eksplorasi",
        footer_links: "Tautan Penting",
        footer_social: "Ikuti Kami",
        footer_copyright: "© 2026 Dinas Pertanian Sumatera Barat. Hak Cipta Dilindungi Undang-Undang."
    },
    en: {
        // Navbar & Profile
        nav_home: "HOME",
        nav_profile: "PROFILE",
        nav_profile_history: "History",
        nav_profile_vision: "Vision & Mission",
        nav_profile_tasks: "Tasks & Functions",
        nav_profile_structure: "Organization Structure",

        // Services
        nav_services: "SERVICES",
        nav_services_extension: "Extension",
        nav_services_licensing: "Licensing",
        nav_services_seeds: "Seed Assistance",
        nav_services_training: "Training",

        nav_news: "NEWS",

        // PPID
        nav_ppid: "PPID",
        nav_ppid_profile: "PPID Profile",
        nav_ppid_vision: "PPID Vision",
        nav_ppid_tasks: "PPID Tasks",
        nav_ppid_info: "Public Info",

        // Gallery
        nav_gallery: "GALLERY",
        nav_gallery_photos: "Event Photos",
        nav_gallery_videos: "Video Documentation",

        // Hero Section
        hero_welcome: "Welcome to the Official Website",
        hero_department: "West Sumatra Agriculture Department",
        hero_motto: "Realizing Advanced, Independent, and Modern Agriculture in West Sumatra",
        hero_search_placeholder: "Search for agriculture info, services, or news...",
        hero_search_btn: "Search",
        hero_btn_profile: "OUR PROFILE",
        hero_btn_services: "AGRI SERVICES",

        stat_farmers: "Registered Farmers",
        stat_groups: "Farmer Groups",
        stat_land: "Rice Field Area",
        stat_production: "Rice Production/Year",

        // Buttons & Labels
        nav_contact: "CONTACT",
        nav_lapor: "REPORT!",
        menu_main: "MAIN MENU",
        lang_id: "Indonesian Labels",
        lang_en: "English Labels",
        faq: "FAQ",
        webmail: "WEBMAIL",

        // Running Text
        news_ticker_1: "DIGITAL TRANSFORMATION: Implementing Smart Farming 4.0 across West Sumatra Districts",
        news_ticker_2: "COMMODITY PRICES: Food Stability Maintained, Monitor Real-time Daily Price Updates",
        news_ticker_3: "FOOD INDEPENDENCE MOVEMENT: Certified Superior Seed Distribution Reaches National Target",
        news_ticker_4: "MODERNIZING EQUIPMENT: Latest Technology Support for Farmers' Production Cost Efficiency",
        news_ticker_5: "E-COUNSELING: Technical Cultivation Consultation Services Now Available in Your Hand",

        btn_back: "BACK",
        btn_read_more: "READ MORE",
        btn_reset: "RESET",

        // Layanan Unggulan (Strategic Initiatives)
        program_title: "Strategic Programs",
        program_subtitle: "Details of strategic agricultural programs in West Sumatra to achieve independent food security.",
        program_badge: "Strategic Initiatives",
        program_1_title: "Babendi Program",
        program_1_sub: "Rice Planting Cost Assistance",
        program_1_desc: "Rp800 thousand assistance per hectare for farmers to reduce planting costs and increase rice productivity.",
        program_2_title: "Land Optimization",
        program_2_sub: "Food Self-Sufficiency",
        program_2_desc: "Rice land intensification, use of superior seeds like Banang Pulau rice, and non-swamp land management.",
        program_3_title: "Agri Modernization",
        program_3_sub: "West Sumatra BRMP",
        program_3_desc: "Implementation of modern technology, mechanization, and digital agriculture to improve operational efficiency.",
        program_4_title: "Commodity Downstreaming",
        program_4_sub: "International Market",
        program_4_desc: "Focusing on superior commodities like palm oil, cocoa, rubber, and gambir to peneterate the global market.",
        program_5_title: "Upland Program",
        program_5_sub: "Agri Infrastructure",
        program_5_desc: "Improving agricultural infrastructure, facilities, and farmer empowerment in highland areas.",
        program_6_title: "Cheap Staple Rice",
        program_6_sub: "Price Stability",
        program_6_desc: "Program to maintain rice price stability and local food sovereignty for the people of West Sumatra.",
        program_7_title: "Gambir Export Village",
        program_7_sub: "Tech Collaboration",
        program_7_desc: "Strengthening gambir commodities through financial and technology collaboration at the village/nagari level.",
        program_8_title: "YESS Program",
        program_8_sub: "Young Entrepreneurs",
        program_8_desc: "Fostering young agricultural entrepreneurs through intensive training and business grant assistance.",

        // Berita Terkini
        news_section_badge: "Latest News",
        news_section_title: "Latest News & Articles",
        news_section_subtitle: "Latest information on policies, innovations, and developments in the agricultural sector in West Sumatra.",
        news_btn_all: "View All News",

        // Galeri
        gallery_section_badge: "Visual Documentation",
        gallery_section_title: "Activity Gallery",
        gallery_section_subtitle: "Documenting the movement of the agricultural sector in the Minangkabau land.",
        gallery_filter_all: "All",
        gallery_filter_photo: "Photo",
        gallery_filter_video: "Video",
        gallery_btn_all: "View All Activities Gallery",

        // Publik Portal
        portal_docs_title: "Public Documents",
        portal_docs_btn: "All Documents",
        portal_ann_title: "Announcements",
        portal_ann_btn: "View All",
        portal_call_center: "Contact Call Center for information: (0751) 123456",

        // Footer
        footer_desc: "Realizing Modern, Independent, and Civilized West Sumatra Agriculture through excellent service and sustainable innovation.",
        footer_explore: "Explore",
        footer_links: "Important Links",
        footer_social: "Follow Us",
        footer_copyright: "© 2026 West Sumatra Agriculture Department. All Rights Reserved."
    }
};

export const LanguageProvider = ({ children }) => {
    // Persistent language preference
    const [language, setLanguage] = useState(localStorage.getItem('preferredLanguage') || 'id');

    useEffect(() => {
        localStorage.setItem('preferredLanguage', language);
        // Also update HTML lang attribute for accessibility/SEO
        document.documentElement.lang = language;
    }, [language]);

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
