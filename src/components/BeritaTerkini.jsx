import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Eye, Clock, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "./BeritaTerkini.css";
import ApiService from "../services/apiService";
import berita1 from "../assets/Screenshot 2026-03-05 140500.png";
import berita2 from "../assets/berita-gubernur-mahyeldi-serahkan-bantuan-kemanusiaan-dari-masyarakat-sumbar-untuk-rakyat-050326102019.webp";
import berita3 from "../assets/krpl3.jpg";

const fallbackBerita = [
  {
    id: 1,
    image: berita1,
    title:
      "Wakil Gubernur Sumbar Serahkan Bantuan Bedah Rumah untuk Warga Ujung Batung, Kota Pariaman",
    date: "20 Feb 2026",
    tag: "BERITA UTAMA",
    readTime: "5 min",
    views: "3.8K",
  },
  {
    id: 2,
    image: berita2,
    title:
      "Gubernur Mahyeldi Serahkan Bantuan Kemanusiaan dari Masyarakat Sumbar untuk Rakyat Palestina",
    date: "18 Feb 2026",
    tag: "BANTUAN",
    readTime: "4 min",
    views: "1.2K",
  },
  {
    id: 3,
    image: berita3,
    title: "Kawasan Rumah Pangan Lestari (KRPL) Sukses di Kepulauan Mentawai",
    date: "15 Feb 2026",
    tag: "PROYEK STRATEGIS",
    readTime: "6 min",
    views: "950",
  },
];

const BeritaTerkini = () => {
  const { t } = useLanguage();
  const [berita, setBerita] = useState(fallbackBerita);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const result = await ApiService.getBeritaUtama();
        const normalized = ApiService.normalizeList(result);
        const mapped = normalized.map((item, index) => ({
          id:
            item.id ||
            item.document_id ||
            item.news_id ||
            item.content_id ||
            index + 1,
          image: ApiService.resolveMediaUrl(
            item.image ||
              item.thumbnail ||
              item.foto ||
              item.cover ||
              item.gambar,
          ),
          title: item.title || item.judul || item.nama || "Berita",
          date:
            item.date ||
            item.tanggal ||
            item.created_at ||
            item.publish_date ||
            item.published_at ||
            "Tanggal tidak tersedia",
          tag: item.category || item.kategori || item.tag || "BERITA UTAMA",
          readTime: item.readTime || item.waktu_baca || "5 min",
          views: item.views || item.jumlah_tayang || "---",
        }));

        if (mapped.length > 0) {
          setBerita(mapped.slice(0, 3));
        }
      } catch (err) {
        setBerita(fallbackBerita);
      }
    };

    fetchBerita();
  }, []);

  return (
    <section id="berita" className="berita-premium reveal">
      <div className="container">
        <div className="section-header-row">
          <div className="header-left">
            <span className="badge">{t("news_section_badge")}</span>
            <h2>{t("news_section_title")}</h2>
          </div>
          <Link to="/berita" className="view-all-premium">
            {t("news_btn_all")} <ArrowUpRight size={20} />
          </Link>
        </div>

        <div className="magazine-grid">
          {berita.map((item) => (
            <div key={item.id} className="magazine-card">
              <div className="magazine-img-wrap">
                <img
                  src={item.image || "/placeholder-news.svg"}
                  alt={item.title}
                  className="magazine-img"
                />
                <div className="magazine-tag">{item.tag}</div>
                <div className="magazine-overlay">
                  <Link to={`/berita/${item.id}`} className="read-more-circle">
                    <ArrowUpRight size={24} />
                  </Link>
                </div>
              </div>
              <div className="magazine-info">
                <div className="magazine-meta">
                  <span>
                    <Calendar size={14} /> {item.date}
                  </span>
                  <span>
                    <Clock size={14} /> {item.readTime}
                  </span>
                  <span>
                    <Eye size={14} /> {item.views}
                  </span>
                </div>
                <h3>
                  <Link to={`/berita/${item.id}`}>{item.title}</Link>
                </h3>
                <div className="magazine-footer-line"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeritaTerkini;
