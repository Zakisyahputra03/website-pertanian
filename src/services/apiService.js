// API Configuration and Services for Dinas Perkebunan Website

// Base URLs - URL absolut untuk production di manage.sumbarprov.go.id
export const API_BASE_URL = "https://api-web.sumbarprov.go.id/api";
export const PPID_BASE_URL = "https://ppid.sumbarprov.go.id/api";

// Kode Instansi untuk Dinas Perkebunan
export const KODE_INSTANSI = "2654";

// API Endpoints Configuration
export const API_ENDPOINTS = {
  // Pages API - untuk halaman statis
  PAGES: {
    VISI_MISI: `${API_BASE_URL}/pages/visi-misi/${KODE_INSTANSI}`,
    TUGAS_DAN_FUNGSI: `${API_BASE_URL}/pages/tugas-dan-fungsi/${KODE_INSTANSI}`,
    STRUKTUR_ORGANISASI: `${API_BASE_URL}/pages/struktur-organisasi/${KODE_INSTANSI}`,
    LHKPN: `${API_BASE_URL}/pages/lhkpn/${KODE_INSTANSI}`,
    SEJARAH_SINGKAT: `${API_BASE_URL}/pages/sejarah-singkat/${KODE_INSTANSI}`,
    PROFIL_PEJABAT: `${API_BASE_URL}/pages/profil-pejabat/${KODE_INSTANSI}`,
  },

  // Category API - menggunakan /api/category/<slug>/<instansi>
  CATEGORY: {
    BERITA_UTAMA: `${API_BASE_URL}/berita-utama/${KODE_INSTANSI}`,
    PENGUMUMAN: `${API_BASE_URL}/pengumuman/${KODE_INSTANSI}`,
    DOWNLOAD: `${API_BASE_URL}/category/download/${KODE_INSTANSI}`,
    INFOGRAFIS: `${API_BASE_URL}/category/infografis/${KODE_INSTANSI}`,
    LAPORAN_KINERJA: `${API_BASE_URL}/category/laporan-kinerja-instansi-pemerintah/${KODE_INSTANSI}`,
    PERJANJIAN_KINERJA: `${API_BASE_URL}/category/perjanjian-kinerja/${KODE_INSTANSI}`,
    RENCANA_KERJA: `${API_BASE_URL}/category/rencana-kerja/${KODE_INSTANSI}`,
    RENCANA_KINERJA_TAHUNAN: `${API_BASE_URL}/category/rencana-kinerja-tahunan/${KODE_INSTANSI}`,
    RENCANA_STRATEGIS: `${API_BASE_URL}/category/rencana-strategis/${KODE_INSTANSI}`,
    SOP: `${API_BASE_URL}/category/sop/${KODE_INSTANSI}`,
    INDIKATOR_KINERJA_INDIVIDU: `${API_BASE_URL}/category/indikator-kinerja-individu/${KODE_INSTANSI}`,
    RENAKSI_REALISASI: `${API_BASE_URL}/category/renaksi-dan-realisasi-renaksi/${KODE_INSTANSI}`,
    SKP: `${API_BASE_URL}/category/skp/${KODE_INSTANSI}`,
    IKU: `${API_BASE_URL}/category/iku/${KODE_INSTANSI}`,
  },

  // Gallery APIs - menggunakan galery (sesuai API)
  GALLERY: {
    FOTO: `${API_BASE_URL}/galery-foto/${KODE_INSTANSI}`,
    VIDEO: `${API_BASE_URL}/galery-video/${KODE_INSTANSI}`,
  },

  // PPID APIs
  PPID: {
    INSTANSI: `${PPID_BASE_URL}/instansi`,
    CATEGORY: `${PPID_BASE_URL}/category`,
    CLUSTER_DATA: `${PPID_BASE_URL}/cluster-data`,
    DETAIL_DIP: `${PPID_BASE_URL}/detaildip`,
  },
};

// API Service Functions
export class ApiService {
  static async fetchData(url, options = {}) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  static normalizeList(data) {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.result)) return data.result;
    if (Array.isArray(data.items)) return data.items;
    if (Array.isArray(data.list)) return data.list;
    return [];
  }

  static normalizeObject(data) {
    if (data == null) return null;
    return data.data ?? data.result ?? data.item ?? data.detail ?? data;
  }

  static buildQueryUrl(url, params = {}) {
    const queryParams = new URLSearchParams(params);
    const queryString = queryParams.toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  // Pages API Methods
  static async getVisiMisi() {
    return this.fetchData(API_ENDPOINTS.PAGES.VISI_MISI);
  }

  static async getTugasDanFungsi() {
    return this.fetchData(API_ENDPOINTS.PAGES.TUGAS_DAN_FUNGSI);
  }

  static async getStrukturOrganisasi() {
    return this.fetchData(API_ENDPOINTS.PAGES.STRUKTUR_ORGANISASI);
  }

  static async getLHKPN() {
    return this.fetchData(API_ENDPOINTS.PAGES.LHKPN);
  }

  static async getSejarahSingkat() {
    return this.fetchData(API_ENDPOINTS.PAGES.SEJARAH_SINGKAT);
  }

  // Alias untuk kompatibilitas dengan ProfilPages.jsx
  static async getSejarah() {
    return this.getSejarahSingkat();
  }

  static async getProfilPejabat() {
    return this.fetchData(API_ENDPOINTS.PAGES.PROFIL_PEJABAT);
  }

  // Category API Methods
  static async getBeritaUtama() {
    return this.getCategory("berita-utama");
  }

  static async getPengumuman() {
    return this.getCategory("pengumuman");
  }

  static async getDownloadData() {
    return this.getCategory("download");
  }

  static async getInfografis() {
    return this.getCategory("infografis");
  }

  static async getLaporanKinerja() {
    return this.getCategory("laporan-kinerja-instansi-pemerintah");
  }

  static async getPerjanjianKinerja() {
    return this.getCategory("perjanjian-kinerja");
  }

  static async getRencanaKerja() {
    return this.getCategory("rencana-kerja");
  }

  static async getRencanaKinerjaTahunan() {
    return this.getCategory("rencana-kinerja-tahunan");
  }

  static async getRencanaStrategis() {
    return this.getCategory("rencana-strategis");
  }

  static async getSOP() {
    return this.getCategory("sop");
  }

  static async getIndikatorKinerjaIndividu() {
    return this.getCategory("indikator-kinerja-individu");
  }

  static async getRenaksiRealisasi() {
    return this.getCategory("renaksi-dan-realisasi-renaksi");
  }

  static async getSKP() {
    return this.getCategory("skp");
  }

  static async getIKU() {
    return this.getCategory("iku");
  }

  // Gallery API Methods
  static async getGaleriFoto() {
    return this.fetchData(API_ENDPOINTS.GALLERY.FOTO);
  }

  static async getGaleriVideo() {
    return this.fetchData(API_ENDPOINTS.GALLERY.VIDEO);
  }

  // PPID API Methods
  static async getPPIDInstansi() {
    return this.fetchData(API_ENDPOINTS.PPID.INSTANSI);
  }

  static async getPPIDCategory() {
    return this.fetchData(API_ENDPOINTS.PPID.CATEGORY);
  }

  static async getPPIDClusterData(instansiId, categoryId) {
    const url = this.buildQueryUrl(API_ENDPOINTS.PPID.CLUSTER_DATA, {
      id_instansi: instansiId,
      id_category: categoryId,
    });
    return this.fetchData(url);
  }

  static async getPPIDDetailDip(instansiId, contentId) {
    const url = this.buildQueryUrl(API_ENDPOINTS.PPID.DETAIL_DIP, {
      id_instansi: instansiId,
      id_content: contentId,
    });
    return this.fetchData(url);
  }

  // Generic method for custom pages
  static async getPage(slug) {
    const url = `${API_BASE_URL}/pages/${slug}/${KODE_INSTANSI}`;
    return this.fetchData(url);
  }

  // Generic method for custom categories
  static async getCategory(categorySlug) {
    // Slugs khusus yang tidak pakai /category/ prefix
    const noCategoryPrefix = ["berita-utama", "pengumuman", "galery-foto", "galery-video"];
    if (noCategoryPrefix.includes(categorySlug)) {
      return this.fetchData(`${API_BASE_URL}/${categorySlug}/${KODE_INSTANSI}`);
    }
    // Semua kategori lain pakai /category/ prefix sesuai API
    const urlCategory = `${API_BASE_URL}/category/${categorySlug}/${KODE_INSTANSI}`;
    try {
      return await this.fetchData(urlCategory);
    } catch (err) {
      // Fallback ke path tanpa /category/ jika gagal
      const urlDirect = `${API_BASE_URL}/${categorySlug}/${KODE_INSTANSI}`;
      return this.fetchData(urlDirect);
    }
  }
}

// Export default
export default ApiService;
