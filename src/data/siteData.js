import berita1 from '../assets/Screenshot 2026-03-05 140500.png';
import berita2 from '../assets/berita-gubernur-mahyeldi-serahkan-bantuan-kemanusiaan-dari-masyarakat-sumbar-untuk-rakyat-050326102019.webp';
import berita3 from '../assets/krpl3.jpg';
import berita4 from '../assets/download.jpg';
import berita5 from '../assets/download (2).jpg';
import berita6 from '../assets/download (1).jpg';
import berita7 from '../assets/WhatsApp-Image-2025-07-27-at-08.28.54.jpeg';
import berita8 from '../assets/download (3).jpg';
import berita9 from '../assets/saat-pemkab-luncurkan-kegiatan-petani-milineal.jpg';

export const allBerita = [
    // Page 1 Items
    {
        id: 1,
        image: berita1,
        title: 'Wakil Gubernur Sumbar Serahkan Bantuan Bedah Rumah untuk Warga Ujung Batung, Kota Pariaman',
        date: '20 Feb 2026',
        tag: 'Berita Utama',
        readTime: '5 min',
        excerpt: 'Pemerintah Provinsi Sumatera Barat terus berkomitmen meningkatkan kualitas hunian layak bagi masyarakat melalui program bantuan bedah rumah...'
    },
    {
        id: 2,
        image: berita2,
        title: 'Gubernur Mahyeldi Serahkan Bantuan Kemanusiaan dari Masyarakat Sumbar untuk Rakyat Palestina',
        date: '18 Feb 2026',
        tag: 'Bantuan',
        readTime: '4 min',
        excerpt: 'Wujud kepedulian masyarakat Sumatera Barat terhadap krisis kemanusiaan di Palestina terus mengalir melalui jalur resmi pemerintah...'
    },
    {
        id: 3,
        image: berita3,
        title: 'Kawasan Rumah Pangan Lestari (KRPL) Sukses di Kepulauan Mentawai',
        date: '15 Feb 2026',
        tag: 'Program',
        readTime: '6 min',
        excerpt: 'Pemanfaatan pekarangan rumah menjadi sumber pangan mandiri di Mentawai mulai menunjukkan hasil yang signifikan bagi ekonomi keluarga...'
    },
    // Page 2 Items
    {
        id: 4,
        image: berita4,
        title: 'Panen Padi Serentak di Kabupaten Solok Tingkatkan Ketahanan Pangan Nasional',
        date: '10 Feb 2026',
        tag: 'Pertanian',
        readTime: '4 min',
        excerpt: 'Kabupaten Solok kembali mengukuhkan posisinya sebagai lumbung beras Sumatera Barat dengan capaian panen yang melampaui target musim ini...'
    },
    {
        id: 5,
        image: berita6,
        title: 'Inovasi Irigasi Pintar Dinas Pertanian Sumbar Raih Penghargaan Nasional',
        date: '05 Feb 2026',
        tag: 'Teknologi',
        readTime: '7 min',
        excerpt: 'Pemanfaatan sensor IoT dalam sistem irigasi pertanian di Sumatera Barat mendapatkan apresiasi tinggi sebagai solusi efisiensi air...'
    },
    {
        id: 6,
        image: berita5,
        title: 'Pelatihan Sertifikasi Organik Bagi Kelompok Tani di Pesisir Selatan',
        date: '02 Feb 2026',
        tag: 'Edukasi',
        readTime: '5 min',
        excerpt: 'Menuju pertanian ramah lingkungan, para petani di Pesisir Selatan mulai beralih ke metode organik dengan standar sertifikasi resmi...'
    },
    // Page 3 Items
    {
        id: 7,
        image: berita7,
        title: 'Dinas Pertanian Sumbar Dorong Pengembangan Komoditas Kopi Arabika di Talamau',
        date: '28 Jan 2026',
        tag: 'Produksi',
        readTime: '5 min',
        excerpt: 'Potensi wilayah Talamau sebagai penghasil kopi berkualitas tinggi mulai dilirik melalui pendampingan teknis dan bantuan bibit unggul...'
    },
    {
        id: 8,
        image: berita8,
        title: 'Pameran Pangan Lokal Sumatera Barat Sedot Perhatian Ribuan Pengunjung',
        date: '25 Jan 2026',
        tag: 'Kegiatan',
        readTime: '4 min',
        excerpt: 'Promosi penganan tradisional berbasis sumber daya lokal sukses digelar sebagai upaya diversifikasi pangan bagi warga perkotaan...'
    },
    {
        id: 9,
        image: berita9,
        title: 'Aplikasi Digital Farming Mulai Diterapkan Petani Muda Padang Pariaman',
        date: '20 Jan 2026',
        tag: 'Teknologi',
        readTime: '6 min',
        excerpt: 'Modernisasi sektor hulu mulai merambah area pedesaan dengan hadirnya aplikasi pintar untuk pemantauan lahan secara real-time...'
    }
];

export const allPages = [
    { title: 'Sejarah Dinas Pertanian', path: '/profil/sejarah', category: 'Profil', content: 'Dinas Pertanian Sumatera Barat memiliki sejarah panjang dalam mengawal ketahanan pangan di Ranah Minang...' },
    { title: 'Visi dan Misi', path: '/profil/visi-misi', category: 'Profil', content: 'Mewujudkan pertanian Sumatera Barat yang maju, mandiri, dan modern...' },
    { title: 'Tugas dan Fungsi', path: '/profil/tugas-fungsi', category: 'Profil', content: 'Pelaksanaan kebijakan di bidang sarana prasarana, tanaman pangan, hortikultura, perkebunan...' },
    { title: 'Struktur Organisasi', path: '/profil/struktur', category: 'Profil', content: 'Susunan organisasi Dinas Pertanian Provinsi Sumatera Barat...' },
    { title: 'Layanan Penyuluhan', path: '/layanan/penyuluhan', category: 'Layanan', content: 'Pendampingan petani oleh PPL di seluruh Nagari/Desa Sumatera Barat...' },
    { title: 'Layanan Perizinan', path: '/layanan/perizinan', category: 'Layanan', content: 'Fasilitasi rekomendasi teknis perizinan dan regulasi alih fungsi lahan LP2B...' },
    { title: 'Bantuan Bibit & Benih', path: '/layanan/bibit', category: 'Layanan', content: 'Distribusi benih padi lokal, bibit manggis, dan bibit hortikultura unggul Sumbar...' },
    { title: 'Pelatihan Pertanian', path: '/layanan/pelatihan', category: 'Layanan', content: 'Program pelatihan milenial farmer, pengolahan hasil, dan mekanisasi pertanian...' },
    { title: 'Profil PPID', path: '/ppid/profil', category: 'PPID', content: 'Layanan informasi publik Dinas Pertanian sesuai UU No. 14 Tahun 2008...' },
    { title: 'Visi Misi PPID', path: '/ppid/visi-misi', category: 'PPID', content: 'Meningkatkan pengelolaan dan pelayanan informasi yang berkualitas...' },
    { title: 'Informasi Publik', path: '/ppid/informasi', category: 'PPID', content: 'Daftar Informasi Publik (DIP) yang dapat diakses oleh masyarakat...' },
    { title: 'Foto Kegiatan', path: '/galeri/foto', category: 'Galeri', content: 'Dokumentasi visual berbagai kegiatan Dinas Pertanian di lapangan...' },
    { title: 'Video Dokumentasi', path: '/galeri/video', category: 'Galeri', content: 'Arsip video edukasi dan dokumentasi program unggulan pertanian...' },
    { title: 'Arsip Berita', path: '/berita', category: 'Berita', content: 'Kumpulan berita terkini seputar dunia pertanian dan program pemerintah Sumbar...' }
];
