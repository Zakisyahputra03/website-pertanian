import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import LayananUnggulan from "./components/LayananUnggulan";
import ProgramUnggulan from "./components/ProgramUnggulan";
import BeritaTerkini from "./components/BeritaTerkini";
import Galeri from "./components/Galeri";
import Mitra from "./components/Mitra";
import Footer from "./components/Footer";
import BeritaDetail from "./components/BeritaDetail";

import BeritaPage from "./components/BeritaPage";
import SearchPage from "./components/SearchPage";
import RunningText from "./components/RunningText";
import TransparansiStats from "./components/TransparansiStats";
import PublikPortal from "./components/PublikPortal";
import EventCalendar from "./components/EventCalendar";
import {
  Sejarah,
  VisiMisi,
  TugasFungsi,
  StrukturOrganisasi,
} from "./components/ProfilPages";
import {
  Penyuluhan,
  Perizinan,
  BantuanBibit,
  Pelatihan,
} from "./components/LayananPages";
import {
  ProfilPPID,
  VisiMisiPPID,
  TugasFungsiPPID,
  InformasiPublik,
} from "./components/PPIDPages";
import {
  FotoActivities as FotoActivities,
  VideoDokumentasi,
} from "./components/GaleriPages";
import CategoryPage from "./components/CategoryPage";
import GenericPage from "./components/GenericPage";
import AllCategories from "./components/AllCategories";
import TransparansiDataPage from "./components/TransparansiDataPage";
import FAQPage from "./components/FAQPage";
import AgendaPage from "./components/AgendaPage";
import AccessibilityWidget from "./components/AccessibilityWidget";
import PengumumanPage from "./components/PengumumanPage";
import DokumenPage from "./components/DokumenPage";
import useScrollReveal from "./hooks/useScrollReveal";
import LoadingScreen from "./components/LoadingScreen";
import "./App.css";

const Home = () => (
  <>
    <HeroSection />
    <RunningText />

    <section className="home-section reveal reveal-up">
      <TransparansiStats />
    </section>

    <section className="home-section-alt reveal reveal-up">
      <LayananUnggulan />
    </section>

    <section className="home-section reveal reveal-up">
      <BeritaTerkini />
    </section>

    <div className="section-divider"></div>

    <section className="home-section-alt reveal reveal-up">
      <Galeri />
    </section>

    <section className="home-section reveal reveal-up">
      <EventCalendar />
    </section>

    <section className="home-section-alt reveal reveal-up">
      <PublikPortal />
    </section>

    <section className="home-section reveal reveal-up">
      <Mitra />
    </section>
  </>
);

import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const [scrolled, setScrolled] = React.useState(false);
  useScrollReveal();

  // Handle scroll for global elements
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on pathname change
  React.useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.key]);

  // Scroll to hash on page load or hash change
  React.useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="App">
      <LoadingScreen />
      <Navbar scrolled={scrolled} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/berita" element={<BeritaPage />} />
        <Route path="/berita/:id" element={<BeritaDetail />} />

        <Route path="/search" element={<SearchPage />} />

        {/* Profil Routes */}
        <Route path="/profil/sejarah" element={<Sejarah />} />
        <Route path="/profil/visi-misi" element={<VisiMisi />} />
        <Route path="/profil/tugas-fungsi" element={<TugasFungsi />} />
        <Route path="/profil/struktur" element={<StrukturOrganisasi />} />
        <Route
          path="/profil"
          element={<Navigate to="/profil/sejarah" replace />}
        />

        {/* Layanan Routes */}
        <Route path="/layanan/penyuluhan" element={<Penyuluhan />} />
        <Route path="/layanan/perizinan" element={<Perizinan />} />
        <Route path="/layanan/bibit" element={<BantuanBibit />} />
        <Route path="/layanan/pelatihan" element={<Pelatihan />} />
        <Route
          path="/layanan"
          element={<Navigate to="/layanan/penyuluhan" replace />}
        />

        {/* PPID Routes */}
        <Route path="/ppid/profil" element={<ProfilPPID />} />
        <Route path="/ppid/visi-misi" element={<VisiMisiPPID />} />
        <Route path="/ppid/tugas-fungsi" element={<TugasFungsiPPID />} />
        <Route path="/ppid/informasi" element={<InformasiPublik />} />
        <Route path="/ppid" element={<Navigate to="/ppid/profil" replace />} />

        {/* Galeri Routes */}
        <Route path="/galeri/foto" element={<FotoActivities />} />
        <Route path="/galeri/video" element={<VideoDokumentasi />} />
        <Route path="/kategori/:slug" element={<CategoryPage />} />
        <Route path="/kategori" element={<AllCategories />} />
        <Route path="/halaman/:slug" element={<GenericPage />} />
        <Route
          path="/profil/lhkpn"
          element={<GenericPage slug="lhkpn" pageTitle="LHKPN" />}
        />
        <Route
          path="/profil/profil-pejabat"
          element={
            <GenericPage slug="profil-pejabat" pageTitle="Profil Pejabat" />
          }
        />
        <Route
          path="/galeri"
          element={<Navigate to="/galeri/foto" replace />}
        />

        <Route path="/transparansi" element={<TransparansiDataPage />} />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/pengumuman" element={<PengumumanPage />} />
        <Route path="/dokumen" element={<DokumenPage />} />

        {/* Fallback for other routes */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <AccessibilityWidget />
    </div>
  );
}

export default App;
