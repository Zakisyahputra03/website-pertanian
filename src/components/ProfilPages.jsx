import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  History,
  Target,
  Eye,
  ShieldCheck,
  Rocket,
  Users,
  Sprout,
  Briefcase,
  GraduationCap,
  Building2,
  Calendar,
  Map,
  Globe,
  Info,
  Award,
  UserCheck,
  Settings,
  Database,
  TrendingUp,
  Wheat,
  Trees,
  Landmark,
  Loader,
} from "lucide-react";
import ApiService from "../services/apiService";
import "./ProfilPages.css";

const SimpleProfileLayout = ({ title, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navs = [
    { name: "Sejarah", path: "/profil/sejarah" },
    { name: "Visi Misi", path: "/profil/visi-misi" },
    { name: "Tugas & Fungsi", path: "/profil/tugas-fungsi" },
    { name: "Struktur Organisasi", path: "/profil/struktur" },
  ];

  return (
    <div className="profile-container">
      <div className="container">
        <div className="profile-header reveal reveal-down">
          <div className="back-btn-wrap">
            <Link to="/" className="back-btn-premium back-btn-dark">
              <Home size={18} /> Beranda
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="back-btn-premium back-btn-dark"
              style={{ border: "none", cursor: "pointer" }}
            >
              <ArrowLeft size={18} /> Kembali
            </button>
          </div>
          <h1>{title}</h1>
          <div className="profile-underline"></div>
        </div>

        <div className="nav-simple-profile reveal reveal-up">
          {navs.map((nav) => (
            <Link
              key={nav.path}
              to={nav.path}
              className={`nav-link-simple ${location.pathname === nav.path ? "active" : ""}`}
            >
              {nav.name}
            </Link>
          ))}
        </div>

        <div className="profile-content-card reveal reveal-up">
          <div className="profile-text">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const Sejarah = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await ApiService.getSejarahSingkat();
        setData(ApiService.normalizeObject(result));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching Sejarah:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <SimpleProfileLayout title="Sejarah">
        <div className="loading-container">
          <Loader className="loading-spinner" />
          <p>Memuat data...</p>
        </div>
      </SimpleProfileLayout>
    );
  }

  if (error) {
    return (
      <SimpleProfileLayout title="Sejarah">
        <div className="error-container">
          <p>Terjadi kesalahan saat memuat data: {error}</p>
        </div>
      </SimpleProfileLayout>
    );
  }

  return (
    <SimpleProfileLayout title="Sejarah">
      <div className="aesthetic-profile-section">
        {data && (
          <>
            {data.gambar && (
              <div
                className="profile-image-section reveal reveal-up"
                style={{ marginBottom: "2rem" }}
              >
                <img
                  src={data.gambar}
                  alt="Sejarah"
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
              </div>
            )}
            <div className="profile-intro-card reveal reveal-up">
              <History className="section-icon-large" />
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    data.isi ||
                    "Dinas Pertanian Provinsi Sumatera Barat memiliki akar sejarah yang kuat sebagai instansi yang mengawal ketahanan pangan di wilayah Sumatera Bagian Tengah sejak masa awal kemerdekaan.",
                }}
              />
            </div>
          </>
        )}

        {/* Fallback content if no API data */}
        {(!data || !data.isi) && (
          <div className="profile-intro-card reveal reveal-up">
            <History className="section-icon-large" />
            <p>
              Dinas Pertanian Provinsi Sumatera Barat memiliki akar sejarah yang
              kuat sebagai instansi yang mengawal ketahanan pangan di wilayah
              Sumatera Bagian Tengah sejak masa awal kemerdekaan. Sumatera
              Barat, yang secara geografis diberkati dengan tanah vulkanik yang
              subur dan iklim tropis yang mendukung, telah lama menjadi pusat
              pertumbuhan berbagai komoditas unggulan.
            </p>
          </div>
        )}
      </div>
    </SimpleProfileLayout>
  );
};

export const VisiMisi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await ApiService.getVisiMisi();
        setData(ApiService.normalizeObject(result));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching Visi Misi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <SimpleProfileLayout title="Visi & Misi">
        <div className="loading-container">
          <Loader className="loading-spinner" />
          <p>Memuat data...</p>
        </div>
      </SimpleProfileLayout>
    );
  }

  if (error) {
    return (
      <SimpleProfileLayout title="Visi & Misi">
        <div className="error-container">
          <p>Terjadi kesalahan saat memuat data: {error}</p>
        </div>
      </SimpleProfileLayout>
    );
  }

  return (
    <SimpleProfileLayout title="Visi & Misi">
      <div className="aesthetic-profile-section">
        {data && (
          <>
            {data.gambar && (
              <div
                className="vision-image-section reveal reveal-up"
                style={{ marginBottom: "2rem" }}
              >
                <img
                  src={data.gambar}
                  alt="Visi Misi"
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
              </div>
            )}
            <div className="vision-section reveal reveal-zoom">
              <div className="section-title-wrap">
                <Eye className="icon" />
                <h3>Visi & Misi</h3>
              </div>
              <div className="vision-card-premium">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      data.isi ||
                      '"Terwujudnya Pertanian Sumatera Barat yang Tangguh, Mandiri, Modern, dan Sejahtera Berbasis Kawasan dan Berkelanjutan"',
                  }}
                />
              </div>
            </div>
          </>
        )}

        {/* Fallback content if no API data */}
        {(!data || !data.isi) && (
          <div className="vision-section reveal reveal-zoom">
            <div className="section-title-wrap">
              <Eye className="icon" />
              <h3>Visi Kami</h3>
            </div>
            <div className="vision-card-premium">
              <p>
                "Terwujudnya Pertanian Sumatera Barat yang Tangguh, Mandiri,
                Modern, dan Sejahtera Berbasis Kawasan dan Berkelanjutan"
              </p>
            </div>
          </div>
        )}

        {/* Fallback misi jika tidak ada data API */}
        {(!data || !data.isi) && (
          <div className="mission-section">
            <div className="section-title-wrap reveal reveal-up">
              <Target className="icon" />
              <h3>Misi Strategis</h3>
            </div>
            <div className="mission-grid">
              {[
                {
                  title: "Produktivitas",
                  desc: "Mengoptimalkan hasil panen pangan & hortikultura.",
                  icon: <TrendingUp />,
                },
                {
                  title: "Modernisasi",
                  desc: "Adopsi Smart Farming & digitalisasi sistem.",
                  icon: <Rocket />,
                },
                {
                  title: "SDM Unggul",
                  desc: "Meningkatkan kompetensi penyuluh & petani milenial.",
                  icon: <UserCheck />,
                },
                {
                  title: "Ketahanan Pangan",
                  desc: "Menjamin pangan cukup, aman, dan bergizi.",
                  icon: <ShieldCheck />,
                },
                {
                  title: "Infrastruktur",
                  desc: "Pembangunan irigasi desa & jalan usaha tani.",
                  icon: <Building2 />,
                },
                {
                  title: "Lingkungan",
                  desc: "Praktik pertanian organik & ramah lingkungan.",
                  icon: <Sprout />,
                },
              ].map((m, i) => (
                <div
                  key={i}
                  className={`mission-card reveal reveal-up delay-${(i + 1) * 100}`}
                >
                  <div className="mission-icon">{m.icon}</div>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SimpleProfileLayout>
  );
};

export const TugasFungsi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await ApiService.getTugasDanFungsi();
        setData(ApiService.normalizeObject(result));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching Tugas dan Fungsi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <SimpleProfileLayout title="Tugas & Fungsi">
        <div className="loading-container">
          <Loader className="loading-spinner" />
          <p>Memuat data...</p>
        </div>
      </SimpleProfileLayout>
    );
  }

  if (error) {
    return (
      <SimpleProfileLayout title="Tugas & Fungsi">
        <div className="error-container">
          <p>Terjadi kesalahan saat memuat data: {error}</p>
        </div>
      </SimpleProfileLayout>
    );
  }

  return (
    <SimpleProfileLayout title="Tugas & Fungsi">
      <div className="aesthetic-profile-section">
        {data && (
          <>
            {data.gambar && (
              <div
                className="profile-image-section reveal reveal-up"
                style={{ marginBottom: "2rem" }}
              >
                <img
                  src={data.gambar}
                  alt="Tugas Fungsi"
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
              </div>
            )}
            <div className="profile-intro-card reveal reveal-up">
              <Briefcase className="section-icon-large" />
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    data.isi ||
                    "Melaksanakan urusan pemerintahan bidang pertanian yang menjadi kewenangan Provinsi dan tugas pembantuan yang ditugaskan kepada Daerah Provinsi.",
                }}
              />
            </div>
          </>
        )}

        {/* Fallback content if no API data */}
        {(!data || !data.isi) && (
          <div className="profile-intro-card reveal reveal-up">
            <Briefcase className="section-icon-large" />
            <p>
              Melaksanakan urusan pemerintahan bidang pertanian yang menjadi
              kewenangan Provinsi dan tugas pembantuan yang ditugaskan kepada
              Daerah Provinsi.
            </p>
          </div>
        )}

        {/* Fallback function grid jika tidak ada data API */}
        {(!data || !data.isi) && (
          <div className="function-grid">
            {[
              {
                title: "Kebijakan",
                desc: "Penyusunan rencana strategis & kebijakan teknis.",
                icon: <Settings />,
              },
              {
                title: "Koordinasi",
                desc: "Sinkronisasi program pusat dan daerah.",
                icon: <Globe />,
              },
              {
                title: "Prasarana",
                desc: "Pengelolaan irigasi & distribusi pupuk subsidi.",
                icon: <Building2 />,
              },
              {
                title: "Perlindungan",
                desc: "Pengendalian OPT & mitigasi perubahan iklim.",
                icon: <ShieldCheck />,
              },
              {
                title: "Penyuluhan",
                desc: "Bimbingan teknis peningkatan kapabilitas petani.",
                icon: <GraduationCap />,
              },
              {
                title: "Data Pertanian",
                desc: "Manajemen statistik sebagai dasar keputusan.",
                icon: <Database />,
              },
            ].map((f, i) => (
              <div
                key={i}
                className={`function-card reveal reveal-up delay-${(i + 1) * 100}`}
              >
                <div className="function-icon-wrap">{f.icon}</div>
                <div className="function-info">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SimpleProfileLayout>
  );
};

export const StrukturOrganisasi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await ApiService.getStrukturOrganisasi();
        setData(ApiService.normalizeObject(result));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching Struktur Organisasi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <SimpleProfileLayout title="Struktur Organisasi">
        <div className="loading-container">
          <Loader className="loading-spinner" />
          <p>Memuat data...</p>
        </div>
      </SimpleProfileLayout>
    );
  }

  if (error) {
    return (
      <SimpleProfileLayout title="Struktur Organisasi">
        <div className="error-container">
          <p>Terjadi kesalahan saat memuat data: {error}</p>
        </div>
      </SimpleProfileLayout>
    );
  }

  return (
    <SimpleProfileLayout title="Struktur Organisasi">
      {data && data.gambar && (
        <div
          className="profile-image-section reveal reveal-up"
          style={{ marginBottom: "2rem" }}
        >
          <img
            src={data.gambar}
            alt="Struktur Organisasi"
            style={{
              width: "100%",
              maxHeight: "600px",
              objectFit: "contain",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      )}

      {data && data.isi && (
        <div
          className="profile-intro-card reveal reveal-up"
          dangerouslySetInnerHTML={{ __html: data.isi }}
        />
      )}

      {/* Fallback content if no API data */}
      {(!data || !data.gambar) && (
        <>
          <p className="reveal reveal-up">
            Struktur Organisasi Dinas Pertanian Provinsi Sumatera Barat disusun
            secara ramping namun kaya fungsi untuk memastikan efisiensi
            birokrasi dan ketepatan layanan.
          </p>

          <div className="org-premium-container reveal reveal-zoom">
            <div className="org-node main-node">
              <Building2 size={32} className="node-icon" />
              <div className="node-text">
                <h4>Kepala Dinas</h4>
                <span>Pimpinan Tertinggi</span>
              </div>
            </div>

            <div className="org-branch-connector"></div>

            <div className="org-node secretary-node">
              <Users size={24} className="node-icon" />
              <div className="node-text">
                <h4>Sekretariat</h4>
                <span>Adm & Perencanaan</span>
              </div>
            </div>

            <div className="org-multi-branch">
              <div className="branch-line"></div>
              <div className="branch-grid">
                {[
                  { title: "Tanaman Pangan", icon: <Sprout /> },
                  { title: "Hortikultura", icon: <Wheat /> },
                  { title: "Perkebunan", icon: <Trees /> },
                  { title: "Prasarana", icon: <Landmark /> },
                ].map((b, i) => (
                  <div key={i} className="branch-node">
                    <div className="branch-icon">{b.icon}</div>
                    <span>{b.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="org-node footer-node">
              <Award size={24} className="node-icon" />
              <div className="node-text">
                <h4>UPTD & Jafung</h4>
                <span>Pelaksana Teknis</span>
              </div>
            </div>
          </div>

          <div
            className="org-footer-note reveal reveal-up"
            style={{
              marginTop: "3rem",
              padding: "1.5rem",
              background: "#f8fafc",
              borderRadius: "15px",
            }}
          >
            <p style={{ margin: 0, fontSize: "0.95rem", fontStyle: "italic" }}>
              * Struktur ini dirancang untuk memastikan koordinasi yang cepat
              dan efektif antara pimpinan tingkat atas hingga pelaksana teknis
              di lapangan.
            </p>
          </div>
        </>
      )}
    </SimpleProfileLayout>
  );
};
