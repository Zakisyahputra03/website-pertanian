import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Bell,
  User,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";
import logo from "../assets/Emblem of West Sumat.png";
import WeatherWidget from "./WeatherWidget";
import "./Navbar.css";

import { useLanguage } from "../context/LanguageContext";

const Navbar = ({ scrolled }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const menuItems = [
    { name: t("nav_home"), path: "/" },
    {
      name: t("nav_profile"),
      path: "/profil",
      dropdown: [
        { name: t("nav_profile_history"), path: "/halaman/sejarah-singkat" },
        { name: t("nav_profile_vision"), path: "/halaman/visi-misi" },
        { name: t("nav_profile_tasks"), path: "/halaman/tugas-dan-fungsi" },
        {
          name: t("nav_profile_structure"),
          path: "/halaman/struktur-organisasi",
        },
        { name: "LHKPN", path: "/halaman/lhkpn" },
        { name: "Profil Pejabat", path: "/halaman/profil-pejabat" },
      ],
    },
    { name: "BERITA PUBLIKASI", path: "/berita" },
    { name: "Kategori", path: "/kategori" },
    {
      name: t("nav_ppid"),
      path: "/ppid",
      dropdown: [
        { name: t("nav_ppid_profile"), path: "/ppid/profil" },
        { name: t("nav_ppid_vision"), path: "/ppid/visi-misi" },
        { name: t("nav_ppid_tasks"), path: "/ppid/tugas-fungsi" },
        { name: t("nav_ppid_info"), path: "/ppid/informasi" },
      ],
    },
    {
      name: t("nav_gallery"),
      path: "/galeri",
      dropdown: [
        { name: t("nav_gallery_photos"), path: "/galeri/foto" },
        { name: t("nav_gallery_videos"), path: "/galeri/video" },
      ],
    },
    { name: "PENGUMUMAN BIDANG", path: "/pengumuman" },
    { name: t("nav_contact"), path: "/faq" },
  ];

  return (
    <nav
      className={`premium-navbar ${scrolled ? "scrolled" : ""} ${isOpen ? "menu-open" : ""}`}
    >
      <div className="navbar-wrapper">
        {/* Logo Section */}
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Logo Sumbar" className="logo-icon" />
          <div className="logo-brand">
            <span className="brand-main">DINAS PERTANIAN</span>
            <span className="brand-sub">PROVINSI SUMATERA BARAT</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`nav-item ${item.dropdown ? "has-dropdown" : ""} ${activeDropdown === item.name ? "active" : ""}`}
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? "current" : ""}`}
              >
                {item.name}
                {item.dropdown && <ChevronDown size={14} className="chevron" />}
              </Link>

              {item.dropdown && (
                <div className="dropdown-panel">
                  <div className="dropdown-content">
                    {item.dropdown.map((sub, i) => (
                      <Link key={i} to={sub.path} className="dropdown-item">
                        <div className="item-dot"></div>
                        <span>{sub.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="nav-actions">
          <div className="nav-utils">
            <WeatherWidget />
            <div className="lang-flags">
              <button
                className={`flag-btn ${language === "id" ? "active" : ""}`}
                title={t("lang_id")}
                onClick={() => setLanguage("id")}
              >
                <span className="flag-circle id-flag"></span>
              </button>
              <button
                className={`flag-btn ${language === "en" ? "active" : ""}`}
                title={t("lang_en")}
                onClick={() => setLanguage("en")}
              >
                <span className="flag-circle en-flag">
                  <span className="en-flag-red-cross"></span>
                </span>
              </button>
            </div>
            <div className="util-links">
              <Link to="/faq" className="util-link">
                {t("faq")}
              </Link>
            </div>
          </div>
          <a
            href="https://www.lapor.go.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button lapor-glow"
          >
            {t("nav_lapor")}
          </a>
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <h3>{t("menu_main")}</h3>
        </div>
        <ul className="sidebar-links">
          {menuItems.map((item) => (
            <li key={item.name} className="sidebar-item">
              <div className="sidebar-link-group">
                <Link to={item.path} className="sidebar-link">
                  {item.name}
                </Link>
                {item.dropdown && (
                  <button
                    className={`sidebar-expand ${activeDropdown === item.name ? "rotated" : ""}`}
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === item.name ? null : item.name,
                      )
                    }
                  >
                    <ChevronDown size={20} />
                  </button>
                )}
              </div>
              {item.dropdown && (
                <ul
                  className={`sidebar-dropdown ${activeDropdown === item.name ? "show" : ""}`}
                >
                  {item.dropdown.map((sub, i) => (
                    <li key={i}>
                      <Link to={sub.path}>{sub.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <a
            href="https://www.lapor.go.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-cta"
          >
            LAPOR!
          </a>
        </div>
      </div>
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>
    </nav>
  );
};

export default Navbar;
