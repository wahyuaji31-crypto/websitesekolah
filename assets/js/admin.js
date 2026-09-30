/**
 * Admin Panel Management Script
 * Handles CRUD for PPDB, Agenda Kegiatan, Wadah Bakat (Ekskul), Galeri Foto, Dewan Guru, Fasilitas, Berita, and Setting Web
 */

// Initial Sample Data
const DEFAULT_PPDB_DATA = [
  {
    regNumber: 'PPDB-2026-88219',
    fullName: 'Ahmad Faiz Al-Ghifari',
    nisn: '0078912345',
    gender: 'Laki-laki',
    birthPlace: 'Bengkayang',
    birthDate: '2009-04-12',
    prevSchool: 'SMP Negeri 1 Bengkayang',
    track: 'Jalur Prestasi Akademik',
    major: 'MIPA (Matematika & Sains Alam)',
    parentName: 'H. Sudirman, S.E.',
    phone: '081299887766',
    address: 'Jl. Melati No. 15, Bengkayang',
    regDate: '28 September 2026',
    status: 'Lolos Seleksi'
  },
  {
    regNumber: 'PPDB-2026-64102',
    fullName: 'Siti Nur Aisyah',
    nisn: '0081234567',
    gender: 'Perempuan',
    birthPlace: 'Pontianak',
    birthDate: '2009-08-20',
    prevSchool: 'SMP Islam Terpadu Amanah',
    track: 'Jalur Zonasi',
    major: 'IPS (Sosial & Humaniora)',
    parentName: 'Rahmat Hidayat',
    phone: '085712345678',
    address: 'Jl. Merak Blok B3 No. 8, Bengkayang',
    regDate: '29 September 2026',
    status: 'Terverifikasi'
  },
  {
    regNumber: 'PPDB-2026-31994',
    fullName: 'Kevin Jonathan',
    nisn: '0074567890',
    gender: 'Laki-laki',
    birthPlace: 'Singkawang',
    birthDate: '2009-01-15',
    prevSchool: 'SMP Negeri 2 Bengkayang',
    track: 'Jalur Prestasi Non-Akademik',
    major: 'MIPA (Matematika & Sains Alam)',
    parentName: 'Jonathan Hendra',
    phone: '081344556677',
    address: 'Jl. Jerendeng AR No. 12, Bengkayang',
    regDate: '29 September 2026',
    status: 'Menunggu Berkas'
  }
];

const DEFAULT_AGENDA_DATA = [
  { id: 1, title: 'Penilaian Tengah Semester (PTS)', date: '20 - 27 Oktober 2026', semester: 'Semester Ganjil', desc: 'Ujian evaluasi capaian pembelajaran triwulan awal.' },
  { id: 2, title: 'Sumatif Akhir Semester (SAS)', date: '1 - 10 Desember 2026', semester: 'Semester Ganjil', desc: 'Ujian akhir semester berbasis digital CBT terpusat.' },
  { id: 3, title: 'Classmeeting & Porseni Pelajar', date: '14 - 18 Desember 2026', semester: 'Kesiswaan', desc: 'Kompetisi antarkelas olahraga, seni, dan e-sport.' },
  { id: 4, title: 'Pembagian Rapor Semester 1', date: '22 Desember 2026', semester: 'Rapor & Libur', desc: 'Penyerahan hasil evaluasi belajar kepada orang tua / wali murid.' }
];

const DEFAULT_EKSKUL_DATA = [
  { id: 1, name: 'Robotik & Coding Club', icon: 'cpu', schedule: 'Sabtu, 09.00 WIB', location: 'Lab Komputer', desc: 'Mempelajari perakitan mikrokontroler Arduino, IoT, dasar pemodelan 3D, serta pemrograman web/aplikasi.', category: 'Sains & Teknologi' },
  { id: 2, name: 'KIR (Karya Ilmiah Remaja)', icon: 'microscope', schedule: 'Rabu, 15.30 WIB', location: 'Lab Sains', desc: 'Pembimbingan riset ilmiah bidang sains murni dan humaniora untuk kompetisi tingkat nasional LKIR LIPI / BRIN.', category: 'Akademik' },
  { id: 3, name: 'Paskibra Satya Bangsa', icon: 'flag', schedule: 'Selasa & Kamis, 16.00', location: 'Lapangan Utama', desc: 'Pelatihan disiplin baris berbaris tingkat tinggi, ketahanan fisik, kepemimpinan, dan seleksi pengibar bendera kota.', category: 'Kepemimpinan' },
  { id: 4, name: 'PMR Wira (Palang Merah Remaja)', icon: 'heart-pulse', schedule: 'Jumat, 14.00 WIB', location: 'Ruang UKS', desc: 'Edukasi pertolongan pertama pada kecelakaan (P3K), kesiapsiagaan bencana, dan aksi donor darah rutin.', category: 'Kemanusiaan' },
  { id: 5, name: 'Paduan Suara & Musik Orkestra', icon: 'music', schedule: 'Sabtu, 10.00 WIB', location: 'Ruang Musik', desc: 'Pelatihan vokal harmoni, instrumen musik modern & tradisional, serta penampilan rutin di upacara dan konser tahunan.', category: 'Seni & Budaya' },
  { id: 6, name: 'Basket & Futsal Club', icon: 'dribbble', schedule: 'Senin & Rabu, 16.00', location: 'Sport Hall', desc: 'Pembinaan taktik, teknik tanding, dan keikutsertaan dalam turnamen DBL dan liga futsal pelajar.', category: 'Olahraga' }
];

const DEFAULT_TEACHERS_DATA = [
  { id: 1, name: 'Ratna Sari, S.Pd.', subject: 'Matematika', nip: '19850214 201001 2 015', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop' },
  { id: 2, name: 'Agus Salim, M.Si.', subject: 'Fisika', nip: '19790819 200501 1 008', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
  { id: 3, name: 'Dewi Lestari, S.Pd.', subject: 'Kimia', nip: '19880325 201212 2 003', photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop' },
  { id: 4, name: 'drh. Gunawan, M.Pd.', subject: 'Biologi', nip: '19810611 200604 1 012', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop' },
  { id: 5, name: 'Sarah Johnson, B.Ed.', subject: 'Bahasa Inggris', nip: '19900915 201503 2 020', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' },
  { id: 6, name: 'Fajar Nugraha, S.Kom.', subject: 'Informatika / IT', nip: '19921108 201903 1 005', photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop' }
];

const DEFAULT_GALLERY_DATA = [
  { id: 1, title: 'Diskusi Kelompok Kelas Digital', category: 'belajar', catLabel: 'Kegiatan Belajar', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Upacara Peringatan Hari Pahlawan', category: 'upacara', catLabel: 'Upacara & Karakter', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Turnamen Futsal Antar Sekolah', category: 'ekskul', catLabel: 'Ekskul & Olahraga', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Praktik Robotika di Lab Komputer', category: 'fasilitas', catLabel: 'Fasilitas', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'Eksperimen Kimia di Lab Sains', category: 'belajar', catLabel: 'Kegiatan Belajar', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop' }
];

const DEFAULT_FACILITIES_DATA = [
  { id: 1, title: 'Perpustakaan Digital & Ruang Baca', desc: 'Dilengkapi ratusan tablet e-reading, ruang diskusi ber-AC, dan ribuan koleksi buku referensi.', img: 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=600&auto=format&fit=crop' },
  { id: 2, title: 'Laboratorium Komputer & Robotik', desc: '3 ruang lab dengan total 120 unit PC Core i7, internet dedicated fiber optic, dan kit Arduino/IoT.', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop' },
  { id: 3, title: 'Laboratorium MIPA Terpadu', desc: 'Alat peraga modern, mikroskop digital, fume hood keselamatan, dan bahan riset berspesifikasi tinggi.', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop' },
  { id: 4, title: 'Sport Hall & Lapangan Terpadu', desc: 'Lapangan basket standar Perbasi, lapangan futsal rumput sintetis, lapangan voli, dan arena bulutangkis.', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop' }
];

const DEFAULT_MESSAGES = [
  {
    id: 1,
    name: 'Budi Darmawan (Orang Tua Calon Siswa)',
    email: 'budi.darmawan@gmail.com',
    phone: '081288990011',
    category: 'Informasi PPDB',
    subject: 'Pertanyaan Legalisir Rapor Jalur Prestasi',
    message: 'Selamat pagi panitia, apakah sertifikat olimpiade tingkat provinsi harus dilegalisir oleh dinas atau cukup dari pihak sekolah asal? Terima kasih.',
    date: '30 September 2026, 09:15 WIB',
    isRead: false
  }
];

const DEFAULT_LMS_SETTINGS = {
  serverStatus: 'Aktif',
  demoLogin: 'Buka',
  announcement: 'Selamat datang di E-Learning SMAN 1 Bengkayang. Akses modul dan ujian CBT tepat waktu.',
  defaultMeetUrl: 'https://meet.google.com/abc-defg-hij'
};

const DEFAULT_LIVE_CLASSES = [
  { id: 1, subject: 'Fisika Quantum & Relativitas', teacher: 'Agus Salim, M.Si.', grade: 'XI MIPA 1', schedule: '13.30 - 15.00 WIB (Zoom Room 1)', status: 'SEDANG BERLANGSUNG' },
  { id: 2, subject: 'Koding Dasar Python & Web', teacher: 'Fajar Nugraha, S.Kom.', grade: 'X Fase E-2', schedule: '15.30 - 17.00 WIB (Google Meet)', status: 'AKAN DATANG' },
  { id: 3, subject: 'Ekonomi Makro & Pasar Modal', teacher: 'Dra. Siti Wahyuni', grade: 'XII IPS 2', schedule: 'Kamis, 08.00 - 09.30 WIB', status: 'AKAN DATANG' }
];

const DEFAULT_COURSES = [
  { id: 1, name: 'Matematika Tingkat Lanjut', category: 'sains', catLabel: 'MIPA', modules: '12 Bab Modul', teacher: 'Ratna Sari, S.Pd.', desc: 'Kalkulus diferensial, integral, dan aljabar matriks.', progress: 85, icon: 'calculator' },
  { id: 2, name: 'Fisika Gelombang & Listrik', category: 'sains', catLabel: 'MIPA', modules: '10 Bab Modul', teacher: 'Agus Salim, M.Si.', desc: 'Termodinamika, gelombang elektromagnetik, dan induksi.', progress: 70, icon: 'atom' },
  { id: 3, name: 'Kimia Organik & Polimer', category: 'sains', catLabel: 'MIPA', modules: '8 Bab Modul', teacher: 'Dewi Lestari, S.Pd.', desc: 'Senyawa karbon, reaksi substitusi, dan polimerisasi.', progress: 90, icon: 'flask-conical' },
  { id: 4, name: 'Pemrograman Web & IoT', category: 'it', catLabel: 'Informatika', modules: '14 Modul', teacher: 'Fajar Nugraha, S.Kom.', desc: 'HTML5, CSS3, JavaScript modern, dan sensor Arduino.', progress: 95, icon: 'code-2' },
  { id: 5, name: 'English for Academic Purpose', category: 'bahasa', catLabel: 'Bahasa', modules: '10 Modul', teacher: 'Sarah Johnson, B.Ed.', desc: 'TOEFL preparation, academic writing, and public speaking.', progress: 80, icon: 'languages' },
  { id: 6, name: 'Sosiologi & Dinamika Masyarakat', category: 'sosial', catLabel: 'Sosial', modules: '9 Modul', teacher: 'Budi Santoso, M.Pd.', desc: 'Interaksi sosial, struktur kemasyarakatan, dan resolusi konflik.', progress: 65, icon: 'landmark' }
];

const DEFAULT_CBT = [
  { id: 1, title: 'Simulasi PTS Matematika & Logika', desc: '40 Soal pilihan ganda & 5 soal esai analitis HOTS tingkat SMA.', duration: 90, questions: 45, badge: 'AKTIF', deadline: '28 Oktober 2026' },
  { id: 2, title: 'Try Out OSN Sains & Biologi', desc: 'Soal standar Olimpiade Sains Nasional bidang Biologi molekuler.', duration: 60, questions: 30, badge: 'LATIHAN MANDIRI', deadline: 'Terbuka Umum' },
  { id: 3, title: 'Kuis Interaktif Algoritma & Coding', desc: 'Uji pemahaman dasar logika percabangan, perulangan & data struktur.', duration: 45, questions: 25, badge: 'KOMPETENSI IT', deadline: 'Live Leaderboard' }
];

const DEFAULT_LMS_USERS = [
  { id: 1, name: 'Dr. H. Rahmat Hidayat, M.Pd.', username: 'admin', password: 'admin123', role: 'admin', email: 'admin@sman1bky.sch.id', roleLabel: 'Super Admin LMS', info: 'Pengelola Utama Sistem', status: 'Aktif' },
  { id: 2, name: 'Agus Salim, M.Si.', username: '197908192005011008', password: 'guru123', role: 'teacher', email: 'agus.salim@sman1bky.sch.id', roleLabel: 'Guru Fisika', info: 'NIP. 19790819 200501 1 008', status: 'Aktif' },
  { id: 3, name: 'Ratna Sari, S.Pd.', username: '198502142010012015', password: 'guru123', role: 'teacher', email: 'ratna.sari@sman1bky.sch.id', roleLabel: 'Guru Matematika', info: 'NIP. 19850214 201001 2 015', status: 'Aktif' },
  { id: 4, name: 'Fajar Nugraha, S.Kom.', username: '199211082019031005', password: 'guru123', role: 'teacher', email: 'fajar.nugraha@sman1bky.sch.id', roleLabel: 'Guru Informatika', info: 'NIP. 19921108 201903 1 005', status: 'Aktif' },
  { id: 5, name: 'Ahmad Zaki Pratama', username: '0076543210', password: 'siswa123', role: 'student', email: 'zaki@student.sman1bky.sch.id', roleLabel: 'Siswa Kelas XI MIPA 1', info: 'NISN. 0076543210', status: 'Aktif' },
  { id: 6, name: 'Siti Nurhaliza', username: '0076543211', password: 'siswa123', role: 'student', email: 'siti@student.sman1bky.sch.id', roleLabel: 'Siswa Kelas XI MIPA 2', info: 'NISN. 0076543211', status: 'Aktif' },
  { id: 7, name: 'Bayu Saputra', username: '0076543212', password: 'siswa123', role: 'student', email: 'bayu@student.sman1bky.sch.id', roleLabel: 'Siswa Kelas X Fase E-1', info: 'NISN. 0076543212', status: 'Aktif' }
];

const DEFAULT_WEB_SETTINGS = {
  schoolName: 'SMA Negeri 1 Bengkayang',
  schoolShortName: 'SMAN 1 Bengkayang',
  schoolTagline: 'Mewujudkan Generasi Emas yang Cerdas, Berkarakter & Berdaya Saing Global',
  schoolNpsn: '30101234',
  schoolAccreditation: 'Akreditasi A (Unggul)',
  schoolAddress: 'Jl. Sanggau Ledo No. 45, Bengkayang, Kalimantan Barat, 79212',
  schoolPhone: '(0562) 631-890',
  schoolWhatsapp: '+62 812-3456-7890',
  schoolEmail: 'info@sman1bky.sch.id',
  schoolPpdbEmail: 'ppdb@sman1bky.sch.id',
  headmasterName: 'Dr. H. Rahmat Hidayat, M.Pd.',
  headmasterNip: 'NIP. 19740512 199903 1 004',
  headmasterPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
  headmasterSpeech: 'Puji dan syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa. Di era transformasi digital saat ini, pendidikan tidak hanya menuntut penguasaan akademis, namun juga pembentukan karakter akhlak mulia dan daya nalar kritis. SMA Negeri 1 Bengkayang terus berkomitmen menciptakan ekosistem belajar yang ramah, inovatif, dan berstandar internasional.',
  themeColor: 'blue',
  ppdbStatus: 'Buka'
};

// Check Auth & Logout
function checkAuth() {
  const session = localStorage.getItem('admin_session');
  if (!session) window.location.href = 'admin-login.html';
}

function logoutAdmin() {
  if (confirm('Apakah Anda yakin ingin keluar dari Admin Panel?')) {
    localStorage.removeItem('admin_session');
    window.location.href = 'admin-login.html';
  }
}

// Data Store
let ppdbList = [];
let agendaList = [];
let ekskulList = [];
let teachersList = [];
let galleryList = [];
let facilitiesList = [];
let messagesList = [];
let liveClassList = [];
let coursesList = [];
let cbtList = [];
let lmsUsersList = [];
let lmsSettings = DEFAULT_LMS_SETTINGS;

function loadData() {
  ppdbList = JSON.parse(localStorage.getItem('ppdb_registrations')) || DEFAULT_PPDB_DATA;
  agendaList = JSON.parse(localStorage.getItem('school_agenda_data')) || DEFAULT_AGENDA_DATA;
  ekskulList = JSON.parse(localStorage.getItem('school_ekskul_data')) || DEFAULT_EKSKUL_DATA;
  teachersList = JSON.parse(localStorage.getItem('school_teachers_data')) || DEFAULT_TEACHERS_DATA;
  galleryList = JSON.parse(localStorage.getItem('school_gallery_data')) || DEFAULT_GALLERY_DATA;
  facilitiesList = JSON.parse(localStorage.getItem('school_facilities_data')) || DEFAULT_FACILITIES_DATA;
  messagesList = JSON.parse(localStorage.getItem('school_messages')) || DEFAULT_MESSAGES;
  liveClassList = JSON.parse(localStorage.getItem('school_live_classes')) || DEFAULT_LIVE_CLASSES;
  coursesList = JSON.parse(localStorage.getItem('school_courses_data')) || DEFAULT_COURSES;
  cbtList = JSON.parse(localStorage.getItem('school_cbt_data')) || DEFAULT_CBT;
  lmsUsersList = JSON.parse(localStorage.getItem('elearning_users')) || DEFAULT_LMS_USERS;
  lmsSettings = JSON.parse(localStorage.getItem('school_lms_settings')) || DEFAULT_LMS_SETTINGS;

  // Persist defaults
  localStorage.setItem('school_agenda_data', JSON.stringify(agendaList));
  localStorage.setItem('school_ekskul_data', JSON.stringify(ekskulList));
  localStorage.setItem('school_teachers_data', JSON.stringify(teachersList));
  localStorage.setItem('school_gallery_data', JSON.stringify(galleryList));
  localStorage.setItem('school_facilities_data', JSON.stringify(facilitiesList));
  localStorage.setItem('school_live_classes', JSON.stringify(liveClassList));
  localStorage.setItem('school_courses_data', JSON.stringify(coursesList));
  localStorage.setItem('school_cbt_data', JSON.stringify(cbtList));
  localStorage.setItem('elearning_users', JSON.stringify(lmsUsersList));
  localStorage.setItem('school_lms_settings', JSON.stringify(lmsSettings));
}

// -------------------------------------------------------------
// 1. PPDB MANAGEMENT
// -------------------------------------------------------------
function renderPPDBTable(filterTrack = 'all', searchQuery = '') {
  const tbody = document.getElementById('ppdbTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  const filtered = ppdbList.filter(item => {
    const matchesTrack = (filterTrack === 'all' || item.track.toLowerCase().includes(filterTrack.toLowerCase()));
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || item.fullName.toLowerCase().includes(q) || item.regNumber.toLowerCase().includes(q) || item.nisn.includes(q);
    return matchesTrack && matchesSearch;
  });

  const countBadge = document.getElementById('ppdbCountBadge');
  if (countBadge) countBadge.textContent = `${filtered.length} Pendaftar`;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-xs text-slate-400">Tidak ada data pendaftar yang sesuai filter.</td></tr>`;
    return;
  }

  filtered.forEach((item) => {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-slate-100 hover:bg-slate-50/80 text-xs text-slate-700 transition-colors';

    let statusBadgeClass = 'bg-slate-100 text-slate-700';
    if (item.status === 'Lolos Seleksi') statusBadgeClass = 'bg-emerald-100 text-emerald-800 font-bold';
    else if (item.status === 'Terverifikasi') statusBadgeClass = 'bg-blue-100 text-brand-700 font-bold';
    else if (item.status === 'Menunggu Berkas') statusBadgeClass = 'bg-amber-100 text-amber-800 font-bold';
    else if (item.status === 'Tidak Lolos') statusBadgeClass = 'bg-rose-100 text-rose-800 font-bold';

    tr.innerHTML = `
      <td class="py-3 px-4 font-mono font-bold text-brand-700">${item.regNumber}</td>
      <td class="py-3 px-4"><span class="font-bold text-slate-900 block">${item.fullName}</span><span class="text-[11px] text-slate-500 font-mono">NISN: ${item.nisn}</span></td>
      <td class="py-3 px-4">${item.prevSchool}</td>
      <td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-slate-100 font-medium text-[11px] block w-max">${item.track}</span><span class="text-[10px] text-slate-500 block mt-0.5">${item.major}</span></td>
      <td class="py-3 px-4 text-slate-500 whitespace-nowrap">${item.regDate}</td>
      <td class="py-3 px-4">
        <select onchange="updateApplicantStatus('${item.regNumber}', this.value)" class="text-[11px] font-semibold px-2 py-1 rounded-lg border border-slate-200 focus:outline-none ${statusBadgeClass}">
          <option value="Terverifikasi" ${item.status === 'Terverifikasi' ? 'selected' : ''}>Terverifikasi</option>
          <option value="Lolos Seleksi" ${item.status === 'Lolos Seleksi' ? 'selected' : ''}>Lolos Seleksi</option>
          <option value="Menunggu Berkas" ${item.status === 'Menunggu Berkas' ? 'selected' : ''}>Menunggu Berkas</option>
          <option value="Tidak Lolos" ${item.status === 'Tidak Lolos' ? 'selected' : ''}>Tidak Lolos</option>
        </select>
      </td>
      <td class="py-3 px-4 text-right">
        <div class="flex items-center justify-end gap-1.5">
          <button onclick="viewApplicantDetail('${item.regNumber}')" class="p-1.5 rounded-lg bg-blue-50 text-brand-600 hover:bg-brand-600 hover:text-white transition-colors" title="Detail"><i data-lucide="eye" class="w-3.5 h-3.5"></i></button>
          <button onclick="deleteApplicant('${item.regNumber}')" class="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors" title="Hapus"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function updateApplicantStatus(regNumber, newStatus) {
  const index = ppdbList.findIndex(p => p.regNumber === regNumber);
  if (index !== -1) {
    ppdbList[index].status = newStatus;
    localStorage.setItem('ppdb_registrations', JSON.stringify(ppdbList));
    updateStatsCards();
    if (window.showToast) window.showToast(`Status ${regNumber} diubah ke ${newStatus}`, 'success');
  }
}

function deleteApplicant(regNumber) {
  if (confirm(`Hapus data pendaftar ${regNumber}?`)) {
    ppdbList = ppdbList.filter(p => p.regNumber !== regNumber);
    localStorage.setItem('ppdb_registrations', JSON.stringify(ppdbList));
    renderPPDBTable();
    updateStatsCards();
    if (window.showToast) window.showToast('Data pendaftar dihapus', 'success');
  }
}

function viewApplicantDetail(regNumber) {
  const item = ppdbList.find(p => p.regNumber === regNumber);
  if (!item) return;
  alert(`DETAIL PENDAFTAR PPDB\n\nNo: ${item.regNumber}\nNama: ${item.fullName}\nNISN: ${item.nisn}\nAsal SMP: ${item.prevSchool}\nJalur: ${item.track}\nPeminatan: ${item.major}\nWhatsApp: ${item.phone}\nStatus: ${item.status}`);
}

function exportPPDBtoCSV() {
  let csv = "data:text/csv;charset=utf-8,No Registrasi,Nama Lengkap,NISN,Asal Sekolah,Jalur,Peminatan,WhatsApp,Tanggal,Status\n";
  ppdbList.forEach(i => {
    csv += `"${i.regNumber}","${i.fullName}","${i.nisn}","${i.prevSchool}","${i.track}","${i.major}","${i.phone}","${i.regDate}","${i.status}"\n`;
  });
  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", `Rekap_PPDB_SMAN1_Bengkayang.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// -------------------------------------------------------------
// 2. AGENDA KEGIATAN CRUD
// -------------------------------------------------------------
function renderAdminAgenda() {
  const container = document.getElementById('adminAgendaList');
  if (!container) return;

  container.innerHTML = '';
  agendaList.forEach((a, index) => {
    const item = document.createElement('div');
    item.className = 'p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover-lift';
    item.innerHTML = `
      <div>
        <span class="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-brand-700">${a.semester || 'Kegiatan'}</span>
        <h4 class="font-bold text-slate-900 text-sm mt-1">${a.title}</h4>
        <p class="text-xs text-slate-500 mt-0.5">${a.desc}</p>
        <span class="text-xs font-semibold text-brand-600 block mt-1">📅 ${a.date}</span>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="editAgenda(${index})" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors">Edit</button>
        <button onclick="deleteAgenda(${index})" class="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-colors">Hapus</button>
      </div>
    `;
    container.appendChild(item);
  });
}

function handleSaveAgenda(e) {
  e.preventDefault();
  const editIndex = document.getElementById('agendaEditIndex').value;
  const newAgenda = {
    id: Date.now(),
    title: document.getElementById('agendaTitle').value.trim(),
    semester: document.getElementById('agendaSemester').value,
    date: document.getElementById('agendaDate').value.trim(),
    desc: document.getElementById('agendaDesc').value.trim()
  };

  if (editIndex !== "") {
    agendaList[editIndex] = newAgenda;
  } else {
    agendaList.push(newAgenda);
  }

  localStorage.setItem('school_agenda_data', JSON.stringify(agendaList));
  renderAdminAgenda();
  resetAgendaForm();
  if (window.showToast) window.showToast('Agenda kegiatan berhasil disimpan!', 'success');
}

function editAgenda(index) {
  const a = agendaList[index];
  document.getElementById('agendaEditIndex').value = index;
  document.getElementById('agendaTitle').value = a.title;
  document.getElementById('agendaSemester').value = a.semester || 'Semester Ganjil';
  document.getElementById('agendaDate').value = a.date;
  document.getElementById('agendaDesc').value = a.desc;
  document.getElementById('agendaFormTitle').textContent = 'Edit Agenda Kegiatan';
}

function deleteAgenda(index) {
  if (confirm('Hapus agenda kegiatan ini?')) {
    agendaList.splice(index, 1);
    localStorage.setItem('school_agenda_data', JSON.stringify(agendaList));
    renderAdminAgenda();
    if (window.showToast) window.showToast('Agenda berhasil dihapus', 'success');
  }
}

function resetAgendaForm() {
  document.getElementById('agendaEditIndex').value = "";
  document.getElementById('agendaTitle').value = "";
  document.getElementById('agendaDate').value = "";
  document.getElementById('agendaDesc').value = "";
  document.getElementById('agendaFormTitle').textContent = 'Tambah Agenda Kegiatan Baru';
}

// -------------------------------------------------------------
// 3. WADAH BAKAT (EKSTRAKURIKULER) CRUD
// -------------------------------------------------------------
function renderAdminEkskul() {
  const container = document.getElementById('adminEkskulList');
  if (!container) return;

  container.innerHTML = '';
  ekskulList.forEach((e, index) => {
    const card = document.createElement('div');
    card.className = 'p-4 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between hover-lift';
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-50 text-brand-700">${e.category || 'Ekskul'}</span>
          <i data-lucide="${e.icon || 'activity'}" class="w-4 h-4 text-brand-600"></i>
        </div>
        <h4 class="font-bold text-slate-900 text-sm">${e.name}</h4>
        <p class="text-xs text-slate-600 mt-1 line-clamp-2">${e.desc}</p>
        <p class="text-xs text-slate-400 mt-2">📅 ${e.schedule} | 📍 ${e.location}</p>
      </div>
      <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
        <button onclick="editEkskul(${index})" class="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold">Edit</button>
        <button onclick="deleteEkskul(${index})" class="px-3 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold">Hapus</button>
      </div>
    `;
    container.appendChild(card);
  });
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function handleSaveEkskul(e) {
  e.preventDefault();
  const editIndex = document.getElementById('ekskulEditIndex').value;
  const newEkskul = {
    id: Date.now(),
    name: document.getElementById('ekskulName').value.trim(),
    category: document.getElementById('ekskulCategory').value,
    schedule: document.getElementById('ekskulSchedule').value.trim(),
    location: document.getElementById('ekskulLocation').value.trim(),
    desc: document.getElementById('ekskulDesc').value.trim(),
    icon: document.getElementById('ekskulIcon').value || 'activity'
  };

  if (editIndex !== "") {
    ekskulList[editIndex] = newEkskul;
  } else {
    ekskulList.push(newEkskul);
  }

  localStorage.setItem('school_ekskul_data', JSON.stringify(ekskulList));
  renderAdminEkskul();
  resetEkskulForm();
  if (window.showToast) window.showToast('Ekstrakurikuler berhasil disimpan!', 'success');
}

function editEkskul(index) {
  const e = ekskulList[index];
  document.getElementById('ekskulEditIndex').value = index;
  document.getElementById('ekskulName').value = e.name;
  document.getElementById('ekskulCategory').value = e.category || 'Sains & Teknologi';
  document.getElementById('ekskulSchedule').value = e.schedule;
  document.getElementById('ekskulLocation').value = e.location;
  document.getElementById('ekskulDesc').value = e.desc;
  document.getElementById('ekskulIcon').value = e.icon || 'activity';
  document.getElementById('ekskulFormTitle').textContent = 'Edit Data Ekstrakurikuler';
}

function deleteEkskul(index) {
  if (confirm('Hapus kegiatan ekstrakurikuler ini?')) {
    ekskulList.splice(index, 1);
    localStorage.setItem('school_ekskul_data', JSON.stringify(ekskulList));
    renderAdminEkskul();
    if (window.showToast) window.showToast('Ekskul berhasil dihapus', 'success');
  }
}

function resetEkskulForm() {
  document.getElementById('ekskulEditIndex').value = "";
  document.getElementById('ekskulName').value = "";
  document.getElementById('ekskulSchedule').value = "";
  document.getElementById('ekskulLocation').value = "";
  document.getElementById('ekskulDesc').value = "";
  document.getElementById('ekskulFormTitle').textContent = 'Tambah Ekstrakurikuler Baru';
}

// -------------------------------------------------------------
// 4. DEWAN GURU & STAF CRUD
// -------------------------------------------------------------
function renderAdminTeachers() {
  const container = document.getElementById('adminTeachersList');
  if (!container) return;

  container.innerHTML = '';
  teachersList.forEach((t, index) => {
    const card = document.createElement('div');
    card.className = 'p-4 rounded-2xl bg-white border border-slate-200 text-center hover-lift flex flex-col justify-between';
    card.innerHTML = `
      <div>
        <img src="${t.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'}" class="w-16 h-16 rounded-full mx-auto object-cover mb-2 shadow">
        <h4 class="font-bold text-slate-900 text-xs line-clamp-1">${t.name}</h4>
        <p class="text-[11px] text-brand-600 font-semibold">${t.subject}</p>
        <p class="text-[9px] text-slate-400 mt-0.5">${t.nip || '-'}</p>
      </div>
      <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5">
        <button onclick="editTeacher(${index})" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold">Edit</button>
        <button onclick="deleteTeacher(${index})" class="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-[10px] font-bold">Hapus</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function handleSaveTeacher(e) {
  e.preventDefault();
  const editIndex = document.getElementById('teacherEditIndex').value;
  const newTeacher = {
    id: Date.now(),
    name: document.getElementById('teacherName').value.trim(),
    subject: document.getElementById('teacherSubject').value.trim(),
    nip: document.getElementById('teacherNip').value.trim(),
    photo: document.getElementById('teacherPhoto').value.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
  };

  if (editIndex !== "") {
    teachersList[editIndex] = newTeacher;
  } else {
    teachersList.push(newTeacher);
  }

  localStorage.setItem('school_teachers_data', JSON.stringify(teachersList));
  renderAdminTeachers();
  resetTeacherForm();
  if (window.showToast) window.showToast('Data guru berhasil disimpan!', 'success');
}

function editTeacher(index) {
  const t = teachersList[index];
  document.getElementById('teacherEditIndex').value = index;
  document.getElementById('teacherName').value = t.name;
  document.getElementById('teacherSubject').value = t.subject;
  document.getElementById('teacherNip').value = t.nip || '';
  document.getElementById('teacherPhoto').value = t.photo || '';
  document.getElementById('teacherFormTitle').textContent = 'Edit Data Guru';
}

function deleteTeacher(index) {
  if (confirm('Hapus data guru ini?')) {
    teachersList.splice(index, 1);
    localStorage.setItem('school_teachers_data', JSON.stringify(teachersList));
    renderAdminTeachers();
    if (window.showToast) window.showToast('Data guru dihapus', 'success');
  }
}

function resetTeacherForm() {
  document.getElementById('teacherEditIndex').value = "";
  document.getElementById('teacherName').value = "";
  document.getElementById('teacherSubject').value = "";
  document.getElementById('teacherNip').value = "";
  document.getElementById('teacherPhoto').value = "";
  document.getElementById('teacherFormTitle').textContent = 'Tambah Guru / Tenaga Pendidik Baru';
}

// -------------------------------------------------------------
// 5. GALERI FOTO CRUD
// -------------------------------------------------------------
function renderAdminGallery() {
  const container = document.getElementById('adminGalleryList');
  if (!container) return;

  container.innerHTML = '';
  galleryList.forEach((g, index) => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between';
    card.innerHTML = `
      <div>
        <img src="${g.img}" class="w-full h-32 object-cover">
        <div class="p-3">
          <span class="text-[9px] font-bold text-brand-600 uppercase">${g.catLabel || g.category}</span>
          <h4 class="font-bold text-slate-900 text-xs line-clamp-1 mt-0.5">${g.title}</h4>
        </div>
      </div>
      <div class="p-3 pt-0 flex justify-end gap-1.5">
        <button onclick="deleteGallery(${index})" class="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-[10px] font-bold">Hapus</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function handleSaveGallery(e) {
  e.preventDefault();
  const newPhoto = {
    id: Date.now(),
    title: document.getElementById('galTitle').value.trim(),
    category: document.getElementById('galCategory').value,
    catLabel: document.getElementById('galCategory').options[document.getElementById('galCategory').selectedIndex].text,
    img: document.getElementById('galImgUrl').value.trim() || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop'
  };

  galleryList.unshift(newPhoto);
  localStorage.setItem('school_gallery_data', JSON.stringify(galleryList));
  renderAdminGallery();
  e.target.reset();
  if (window.showToast) window.showToast('Foto galeri berhasil ditambahkan!', 'success');
}

function deleteGallery(index) {
  if (confirm('Hapus foto ini dari galeri?')) {
    galleryList.splice(index, 1);
    localStorage.setItem('school_gallery_data', JSON.stringify(galleryList));
    renderAdminGallery();
    if (window.showToast) window.showToast('Foto berhasil dihapus', 'success');
  }
}

// -------------------------------------------------------------
// 6. FASILITAS SEKOLAH CRUD
// -------------------------------------------------------------
function renderAdminFacilities() {
  const container = document.getElementById('adminFacilitiesList');
  if (!container) return;

  container.innerHTML = '';
  facilitiesList.forEach((f, index) => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between';
    card.innerHTML = `
      <div>
        <img src="${f.img || 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=600&auto=format&fit=crop'}" class="w-full h-32 object-cover">
        <div class="p-3">
          <h4 class="font-bold text-slate-900 text-xs">${f.title}</h4>
          <p class="text-[11px] text-slate-500 mt-1 line-clamp-2">${f.desc}</p>
        </div>
      </div>
      <div class="p-3 pt-0 flex justify-end gap-1.5">
        <button onclick="deleteFacility(${index})" class="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-[10px] font-bold">Hapus</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function handleSaveFacility(e) {
  e.preventDefault();
  const newFacility = {
    id: Date.now(),
    title: document.getElementById('facTitle').value.trim(),
    desc: document.getElementById('facDesc').value.trim(),
    img: document.getElementById('facImgUrl').value.trim() || 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=600&auto=format&fit=crop'
  };

  facilitiesList.push(newFacility);
  localStorage.setItem('school_facilities_data', JSON.stringify(facilitiesList));
  renderAdminFacilities();
  e.target.reset();
  if (window.showToast) window.showToast('Fasilitas berhasil ditambahkan!', 'success');
}

function deleteFacility(index) {
  if (confirm('Hapus fasilitas ini?')) {
    facilitiesList.splice(index, 1);
    localStorage.setItem('school_facilities_data', JSON.stringify(facilitiesList));
    renderAdminFacilities();
    if (window.showToast) window.showToast('Fasilitas dihapus', 'success');
  }
}

// -------------------------------------------------------------
// 7. SETTING WEB
// -------------------------------------------------------------
function loadWebSettings() {
  const saved = localStorage.getItem('school_web_settings');
  const s = saved ? JSON.parse(saved) : DEFAULT_WEB_SETTINGS;

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  };

  setVal('setSchoolName', s.schoolName);
  setVal('setSchoolShortName', s.schoolShortName);
  setVal('setSchoolTagline', s.schoolTagline);
  setVal('setSchoolNpsn', s.schoolNpsn);
  setVal('setSchoolAccreditation', s.schoolAccreditation);
  setVal('setSchoolAddress', s.schoolAddress);
  setVal('setSchoolPhone', s.schoolPhone);
  setVal('setSchoolWhatsapp', s.schoolWhatsapp);
  setVal('setSchoolEmail', s.schoolEmail);
  setVal('setSchoolPpdbEmail', s.schoolPpdbEmail);
  setVal('setHeadmasterName', s.headmasterName);
  setVal('setHeadmasterNip', s.headmasterNip);
  setVal('setHeadmasterPhoto', s.headmasterPhoto);
  setVal('setHeadmasterSpeech', s.headmasterSpeech);
  setVal('setThemeColor', s.themeColor || 'blue');
  setVal('setPpdbStatus', s.ppdbStatus || 'Buka');
}

function saveWebSettings(e) {
  if (e) e.preventDefault();
  const getVal = (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  };

  const updatedSettings = {
    schoolName: getVal('setSchoolName'),
    schoolShortName: getVal('setSchoolShortName'),
    schoolTagline: getVal('setSchoolTagline'),
    schoolNpsn: getVal('setSchoolNpsn'),
    schoolAccreditation: getVal('setSchoolAccreditation'),
    schoolAddress: getVal('setSchoolAddress'),
    schoolPhone: getVal('setSchoolPhone'),
    schoolWhatsapp: getVal('setSchoolWhatsapp'),
    schoolEmail: getVal('setSchoolEmail'),
    schoolPpdbEmail: getVal('setSchoolPpdbEmail'),
    headmasterName: getVal('setHeadmasterName'),
    headmasterNip: getVal('setHeadmasterNip'),
    headmasterPhoto: getVal('setHeadmasterPhoto'),
    headmasterSpeech: getVal('setHeadmasterSpeech'),
    themeColor: getVal('setThemeColor') || 'blue',
    ppdbStatus: getVal('setPpdbStatus') || 'Buka'
  };

  localStorage.setItem('school_web_settings', JSON.stringify(updatedSettings));
  if (typeof applyWebSettings === 'function') {
    applyWebSettings();
  }
  window.dispatchEvent(new Event('storage'));
  if (window.showToast) window.showToast('Pengaturan website berhasil disimpan dan disinkronkan!', 'success');
}

function resetWebSettings() {
  if (confirm('Kembalikan ke pengaturan awal SMAN 1 Bengkayang?')) {
    localStorage.setItem('school_web_settings', JSON.stringify(DEFAULT_WEB_SETTINGS));
    loadWebSettings();
    if (typeof applyWebSettings === 'function') applyWebSettings();
    window.dispatchEvent(new Event('storage'));
    if (window.showToast) window.showToast('Pengaturan dikembalikan ke default.', 'success');
  }
}

// Export All School Data as JSON Backup for GitHub / Persistence
function exportAllSchoolData() {
  const fullBackup = {
    exportedAt: new Date().toISOString(),
    school_web_settings: JSON.parse(localStorage.getItem('school_web_settings')) || DEFAULT_WEB_SETTINGS,
    school_teachers_data: JSON.parse(localStorage.getItem('school_teachers_data')) || DEFAULT_TEACHERS_DATA,
    school_ekskul_data: JSON.parse(localStorage.getItem('school_ekskul_data')) || DEFAULT_EKSKUL_DATA,
    school_agenda_data: JSON.parse(localStorage.getItem('school_agenda_data')) || DEFAULT_AGENDA_DATA,
    school_gallery_data: JSON.parse(localStorage.getItem('school_gallery_data')) || DEFAULT_GALLERY_DATA,
    school_facilities_data: JSON.parse(localStorage.getItem('school_facilities_data')) || DEFAULT_FACILITIES_DATA,
    school_live_classes: JSON.parse(localStorage.getItem('school_live_classes')) || DEFAULT_LIVE_CLASSES,
    school_courses_data: JSON.parse(localStorage.getItem('school_courses_data')) || DEFAULT_COURSES,
    school_cbt_data: JSON.parse(localStorage.getItem('school_cbt_data')) || DEFAULT_CBT,
    school_lms_settings: JSON.parse(localStorage.getItem('school_lms_settings')) || DEFAULT_LMS_SETTINGS,
    elearning_users: JSON.parse(localStorage.getItem('elearning_users')) || DEFAULT_LMS_USERS,
    ppdb_registrations: JSON.parse(localStorage.getItem('ppdb_registrations')) || DEFAULT_PPDB_DATA,
    school_messages: JSON.parse(localStorage.getItem('school_messages')) || DEFAULT_MESSAGES
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `sman1bengkayang_data_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();

  if (window.showToast) window.showToast('File backup JSON berhasil diunduh!', 'success');
}

// Import School Data from JSON File
function importAllSchoolData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.school_web_settings) localStorage.setItem('school_web_settings', JSON.stringify(data.school_web_settings));
      if (data.school_teachers_data) localStorage.setItem('school_teachers_data', JSON.stringify(data.school_teachers_data));
      if (data.school_ekskul_data) localStorage.setItem('school_ekskul_data', JSON.stringify(data.school_ekskul_data));
      if (data.school_agenda_data) localStorage.setItem('school_agenda_data', JSON.stringify(data.school_agenda_data));
      if (data.school_gallery_data) localStorage.setItem('school_gallery_data', JSON.stringify(data.school_gallery_data));
      if (data.school_facilities_data) localStorage.setItem('school_facilities_data', JSON.stringify(data.school_facilities_data));
      if (data.school_live_classes) localStorage.setItem('school_live_classes', JSON.stringify(data.school_live_classes));
      if (data.school_courses_data) localStorage.setItem('school_courses_data', JSON.stringify(data.school_courses_data));
      if (data.school_cbt_data) localStorage.setItem('school_cbt_data', JSON.stringify(data.school_cbt_data));
      if (data.school_lms_settings) localStorage.setItem('school_lms_settings', JSON.stringify(data.school_lms_settings));
      if (data.elearning_users) localStorage.setItem('elearning_users', JSON.stringify(data.elearning_users));
      if (data.ppdb_registrations) localStorage.setItem('ppdb_registrations', JSON.stringify(data.ppdb_registrations));
      if (data.school_messages) localStorage.setItem('school_messages', JSON.stringify(data.school_messages));

      loadData();
      loadWebSettings();
      loadLmsSettings();
      renderPPDBTable();
      renderAdminAgenda();
      renderAdminEkskul();
      renderAdminTeachers();
      renderAdminGallery();
      renderAdminFacilities();
      renderAdminLiveClasses();
      renderAdminCourses();
      renderAdminCbt();
      renderAdminLmsUsers();
      renderMessages();
      updateStatsCards();

      window.dispatchEvent(new Event('storage'));
      if (window.showToast) window.showToast('Semua data berhasil diimpor & disinkronkan!', 'success');
    } catch (err) {
      alert('Gagal mengimpor file JSON: Format file tidak valid.');
    }
  };
  reader.readAsText(file);
}

function copyConfigJson() {
  const currentSettings = JSON.parse(localStorage.getItem('school_web_settings')) || DEFAULT_WEB_SETTINGS;
  navigator.clipboard.writeText(JSON.stringify(currentSettings, null, 2)).then(() => {
    if (window.showToast) window.showToast('JSON Konfigurasi berhasil disalin ke clipboard!', 'success');
  });
}

// -------------------------------------------------------------
// 8. E-LEARNING (LMS) MANAGEMENT CRUD
// -------------------------------------------------------------
function loadLmsSettings() {
  const saved = localStorage.getItem('school_lms_settings');
  const s = saved ? JSON.parse(saved) : DEFAULT_LMS_SETTINGS;
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  };
  setVal('lmsServerStatus', s.serverStatus || 'Aktif');
  setVal('lmsDemoLogin', s.demoLogin || 'Buka');
  setVal('lmsAnnouncement', s.announcement || '');
}

function handleSaveLmsSettings(e) {
  if (e) e.preventDefault();
  const updatedLms = {
    serverStatus: document.getElementById('lmsServerStatus') ? document.getElementById('lmsServerStatus').value : 'Aktif',
    demoLogin: document.getElementById('lmsDemoLogin') ? document.getElementById('lmsDemoLogin').value : 'Buka',
    announcement: document.getElementById('lmsAnnouncement') ? document.getElementById('lmsAnnouncement').value.trim() : ''
  };
  localStorage.setItem('school_lms_settings', JSON.stringify(updatedLms));
  if (window.showToast) window.showToast('Pengaturan Server E-Learning berhasil disimpan!', 'success');
}

// Live Classes
function renderAdminLiveClasses() {
  const container = document.getElementById('adminLiveClassList');
  if (!container) return;
  container.innerHTML = '';

  liveClassList.forEach((lc, index) => {
    const card = document.createElement('div');
    card.className = 'p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs';
    card.innerHTML = `
      <div>
        <div class="flex items-center gap-1.5 mb-1">
          <span class="px-2 py-0.5 rounded text-[9px] font-bold ${lc.status === 'SEDANG BERLANGSUNG' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}">${lc.status}</span>
          <span class="font-bold text-slate-900">${lc.subject}</span>
        </div>
        <p class="text-[11px] text-slate-500">${lc.teacher} • ${lc.grade} • ${lc.schedule}</p>
      </div>
      <button onclick="deleteLiveClass(${index})" class="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-[10px] font-bold hover:bg-rose-100 transition-colors">Hapus</button>
    `;
    container.appendChild(card);
  });
}

function handleSaveLiveClass(e) {
  e.preventDefault();
  const newClass = {
    id: Date.now(),
    subject: document.getElementById('liveSubject').value.trim(),
    teacher: document.getElementById('liveTeacher').value.trim(),
    grade: document.getElementById('liveGrade').value.trim(),
    schedule: document.getElementById('liveSchedule').value.trim(),
    status: document.getElementById('liveStatus').value
  };
  liveClassList.push(newClass);
  localStorage.setItem('school_live_classes', JSON.stringify(liveClassList));
  renderAdminLiveClasses();
  e.target.reset();
  if (window.showToast) window.showToast('Jadwal Live Class berhasil ditambahkan!', 'success');
}

function deleteLiveClass(index) {
  if (confirm('Hapus jadwal live class ini?')) {
    liveClassList.splice(index, 1);
    localStorage.setItem('school_live_classes', JSON.stringify(liveClassList));
    renderAdminLiveClasses();
    if (window.showToast) window.showToast('Jadwal Live Class dihapus', 'success');
  }
}

// Courses & Modules
function renderAdminCourses() {
  const container = document.getElementById('adminCoursesList');
  if (!container) return;
  container.innerHTML = '';

  coursesList.forEach((c, index) => {
    const card = document.createElement('div');
    card.className = 'p-3 rounded-xl border border-slate-200 bg-white flex flex-col justify-between text-xs';
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-1">
          <span class="px-2 py-0.5 rounded text-[9px] font-bold bg-purple-50 text-purple-700 uppercase">${c.category}</span>
          <span class="text-[10px] text-slate-400">${c.modules}</span>
        </div>
        <h5 class="font-bold text-slate-900 text-xs">${c.name}</h5>
        <p class="text-[10px] text-slate-500 mt-0.5">Pengampu: ${c.teacher}</p>
        <p class="text-[11px] text-slate-600 mt-1 line-clamp-2">${c.desc}</p>
      </div>
      <div class="pt-2 mt-2 border-t border-slate-100 flex justify-end">
        <button onclick="deleteCourse(${index})" class="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-[10px] font-bold hover:bg-rose-100 transition-colors">Hapus</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function handleSaveCourse(e) {
  e.preventDefault();
  const cat = document.getElementById('courseCategory').value;
  const labels = { sains: 'MIPA', sosial: 'Sosial', bahasa: 'Bahasa', it: 'Informatika' };
  const icons = { sains: 'calculator', sosial: 'landmark', bahasa: 'languages', it: 'code-2' };

  const newCourse = {
    id: Date.now(),
    name: document.getElementById('courseName').value.trim(),
    category: cat,
    catLabel: labels[cat] || 'Umum',
    modules: document.getElementById('courseModules').value.trim(),
    teacher: document.getElementById('courseTeacher').value.trim(),
    desc: document.getElementById('courseDesc').value.trim(),
    progress: 100,
    icon: icons[cat] || 'book-open'
  };
  coursesList.push(newCourse);
  localStorage.setItem('school_courses_data', JSON.stringify(coursesList));
  renderAdminCourses();
  e.target.reset();
  if (window.showToast) window.showToast('Mata Pelajaran E-Learning berhasil ditambahkan!', 'success');
}

function deleteCourse(index) {
  if (confirm('Hapus mata pelajaran ini dari E-Learning?')) {
    coursesList.splice(index, 1);
    localStorage.setItem('school_courses_data', JSON.stringify(coursesList));
    renderAdminCourses();
    if (window.showToast) window.showToast('Mata pelajaran dihapus', 'success');
  }
}

// CBT Online Exams
function renderAdminCbt() {
  const container = document.getElementById('adminCbtList');
  if (!container) return;
  container.innerHTML = '';

  cbtList.forEach((cbt, index) => {
    const card = document.createElement('div');
    card.className = 'p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs';
    card.innerHTML = `
      <div>
        <div class="flex items-center gap-1.5 mb-1">
          <span class="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800">${cbt.badge || 'CBT'}</span>
          <span class="font-bold text-slate-900">${cbt.title}</span>
        </div>
        <p class="text-[11px] text-slate-500">${cbt.duration} Menit • ${cbt.questions} Soal • Batas: ${cbt.deadline || 'Sesuai Jadwal'}</p>
      </div>
      <button onclick="deleteCbt(${index})" class="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-[10px] font-bold hover:bg-rose-100 transition-colors">Hapus</button>
    `;
    container.appendChild(card);
  });
}

function handleSaveCbt(e) {
  e.preventDefault();
  const newCbt = {
    id: Date.now(),
    title: document.getElementById('cbtTitle').value.trim(),
    desc: document.getElementById('cbtDesc').value.trim(),
    duration: +document.getElementById('cbtDuration').value || 60,
    questions: +document.getElementById('cbtQuestions').value || 30,
    badge: document.getElementById('cbtBadge').value,
    deadline: document.getElementById('cbtDeadline').value.trim() || 'Sesuai Jadwal'
  };
  cbtList.push(newCbt);
  localStorage.setItem('school_cbt_data', JSON.stringify(cbtList));
  renderAdminCbt();
  e.target.reset();
  if (window.showToast) window.showToast('Jadwal Ujian CBT berhasil ditambahkan!', 'success');
}

function deleteCbt(index) {
  if (confirm('Hapus jadwal ujian CBT ini?')) {
    cbtList.splice(index, 1);
    localStorage.setItem('school_cbt_data', JSON.stringify(cbtList));
    renderAdminCbt();
    if (window.showToast) window.showToast('Jadwal CBT dihapus', 'success');
  }
}

// -------------------------------------------------------------
// 9. LMS USER CONTROL (GURU & SISWA)
// -------------------------------------------------------------
function renderAdminLmsUsers(filterRole = 'all', searchQuery = '') {
  const tbody = document.getElementById('adminLmsUsersTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  const filtered = lmsUsersList.filter(u => {
    const matchesRole = (filterRole === 'all' || u.role === filterRole);
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || (u.name && u.name.toLowerCase().includes(q)) || (u.username && u.username.toLowerCase().includes(q)) || (u.email && u.email.toLowerCase().includes(q));
    return matchesRole && matchesSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="px-4 py-8 text-center text-xs text-slate-400">Belum ada data akun pengguna yang cocok.</td></tr>`;
    return;
  }

  filtered.forEach((u, idx) => {
    const isTeacher = u.role === 'teacher';
    const isAdmin = u.role === 'admin';
    const isStudent = u.role === 'student';
    
    let roleBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-brand-700">👨‍🎓 Siswa</span>`;
    if (isTeacher) roleBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">👩‍🏫 Guru</span>`;
    if (isAdmin) roleBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">🛠️ Admin LMS</span>`;

    const isActive = u.status !== 'Nonaktif';

    const tr = document.createElement('tr');
    tr.className = 'border-b border-slate-100 hover:bg-slate-50/70 transition-colors text-xs';
    tr.innerHTML = `
      <td class="px-4 py-3.5 font-bold text-slate-900">
        <div>${u.name}</div>
        <div class="text-[10px] text-slate-400 font-normal">${u.email || '-'}</div>
      </td>
      <td class="px-4 py-3.5">${roleBadge}</td>
      <td class="px-4 py-3.5 font-mono font-semibold text-slate-700">${u.username}</td>
      <td class="px-4 py-3.5 text-slate-600">${u.roleLabel || u.info || '-'}</td>
      <td class="px-4 py-3.5">
        <button onclick="toggleLmsUserStatus(${u.id})" class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
          isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
        }">
          <span class="w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-rose-500'}"></span>
          ${isActive ? 'Aktif' : 'Nonaktif'}
        </button>
      </td>
      <td class="px-4 py-3.5 text-right space-x-1.5">
        <button onclick="resetLmsUserPassword(${u.id})" class="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors" title="Reset Kata Sandi">
          🔑 Reset
        </button>
        <button onclick="deleteLmsUser(${u.id})" class="px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 text-[11px] font-semibold transition-colors" title="Hapus Akun">
          🗑️ Hapus
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function handleSaveLmsUser(e) {
  e.preventDefault();
  const name = document.getElementById('userFullName').value.trim();
  const role = document.getElementById('userRole').value;
  const username = document.getElementById('userLoginId').value.trim();
  const password = document.getElementById('userPassword').value.trim() || '123456';
  const email = document.getElementById('userEmail').value.trim();
  const extra = document.getElementById('userExtraInfo').value.trim();

  // Check duplicate username
  if (lmsUsersList.some(u => u.username === username)) {
    alert(`Username / NISN / NIP "${username}" sudah terdaftar dalam sistem LMS! Gunakan ID lain.`);
    return;
  }

  let roleLabel = extra;
  if (!roleLabel) {
    if (role === 'teacher') roleLabel = 'Guru Mata Pelajaran';
    else if (role === 'student') roleLabel = 'Peserta Didik';
    else roleLabel = 'Administrator LMS';
  }

  const newUser = {
    id: Date.now(),
    name,
    username,
    password,
    role,
    email,
    roleLabel,
    info: extra || (role === 'student' ? 'NISN. ' + username : 'NIP. ' + username),
    status: 'Aktif'
  };

  lmsUsersList.push(newUser);
  localStorage.setItem('elearning_users', JSON.stringify(lmsUsersList));
  renderAdminLmsUsers();
  window.dispatchEvent(new Event('storage'));
  e.target.reset();
  if (window.showToast) window.showToast(`Akun ${name} (${role}) berhasil ditambahkan!`, 'success');
}

function toggleLmsUserStatus(id) {
  const user = lmsUsersList.find(u => u.id === id);
  if (!user) return;
  user.status = user.status === 'Nonaktif' ? 'Aktif' : 'Nonaktif';
  localStorage.setItem('elearning_users', JSON.stringify(lmsUsersList));
  renderAdminLmsUsers();
  window.dispatchEvent(new Event('storage'));
  if (window.showToast) window.showToast(`Status akun ${user.name} diubah menjadi ${user.status}`, 'success');
}

function resetLmsUserPassword(id) {
  const user = lmsUsersList.find(u => u.id === id);
  if (!user) return;
  const newPass = prompt(`Masukkan password baru untuk akun ${user.name} (${user.username}):`, '123456');
  if (newPass !== null && newPass.trim() !== '') {
    user.password = newPass.trim();
    localStorage.setItem('elearning_users', JSON.stringify(lmsUsersList));
    window.dispatchEvent(new Event('storage'));
    if (window.showToast) window.showToast(`Password akun ${user.name} berhasil direset!`, 'success');
  }
}

function deleteLmsUser(id) {
  const user = lmsUsersList.find(u => u.id === id);
  if (!user) return;
  if (confirm(`Apakah Anda yakin ingin menghapus akun "${user.name}" (${user.username}) dari LMS?`)) {
    lmsUsersList = lmsUsersList.filter(u => u.id !== id);
    localStorage.setItem('elearning_users', JSON.stringify(lmsUsersList));
    renderAdminLmsUsers();
    window.dispatchEvent(new Event('storage'));
    if (window.showToast) window.showToast(`Akun ${user.name} berhasil dihapus`, 'success');
  }
}

// -------------------------------------------------------------
// 10. PESAN MASUK & STATS
// -------------------------------------------------------------
function renderMessages() {
  const container = document.getElementById('messagesContainer');
  if (!container) return;

  container.innerHTML = '';
  if (messagesList.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 py-6 text-center">Belum ada pesan masuk dari pengunjung.</p>`;
    return;
  }

  messagesList.forEach(m => {
    const msgCard = document.createElement('div');
    msgCard.className = `p-4 rounded-2xl border transition-all ${m.isRead ? 'bg-white border-slate-200' : 'bg-brand-50/60 border-brand-200'}`;
    msgCard.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-100 text-brand-700">${m.category}</span>
          <span class="text-xs font-bold text-slate-900">${m.name}</span>
        </div>
        <span class="text-[10px] text-slate-400">${m.date}</span>
      </div>
      <h5 class="text-xs font-bold text-slate-800 mb-1">${m.subject}</h5>
      <p class="text-xs text-slate-600 leading-relaxed mb-3">${m.message}</p>
      <div class="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100">
        <span class="text-slate-500">📧 ${m.email} | 📞 ${m.phone}</span>
        <button onclick="deleteMessage(${m.id})" class="text-rose-600 font-bold hover:underline">Hapus Pesan</button>
      </div>
    `;
    container.appendChild(msgCard);
  });
}

function deleteMessage(id) {
  messagesList = messagesList.filter(m => m.id !== id);
  localStorage.setItem('school_messages', JSON.stringify(messagesList));
  renderMessages();
  updateStatsCards();
  if (window.showToast) window.showToast('Pesan berhasil dihapus', 'success');
}

function updateStatsCards() {
  const statTotal = document.getElementById('statTotalPPDB');
  const statVerified = document.getElementById('statVerifiedPPDB');
  const statMsgs = document.getElementById('statTotalMessages');

  if (statTotal) statTotal.textContent = ppdbList.length;
  if (statVerified) statVerified.textContent = ppdbList.filter(p => p.status === 'Terverifikasi' || p.status === 'Lolos Seleksi').length;
  if (statMsgs) statMsgs.textContent = messagesList.length;
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  loadData();
  updateStatsCards();
  renderPPDBTable();
  renderAdminAgenda();
  renderAdminEkskul();
  renderAdminTeachers();
  renderAdminGallery();
  renderAdminFacilities();
  renderAdminLiveClasses();
  renderAdminCourses();
  renderAdminCbt();
  renderAdminLmsUsers();
  loadLmsSettings();
  renderMessages();
  loadWebSettings();

  const trackFilter = document.getElementById('adminTrackFilter');
  const searchInput = document.getElementById('adminSearchInput');

  if (trackFilter) {
    trackFilter.addEventListener('change', () => {
      renderPPDBTable(trackFilter.value, searchInput ? searchInput.value : '');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderPPDBTable(trackFilter ? trackFilter.value : 'all', searchInput.value);
    });
  }

  const lmsRoleFilter = document.getElementById('adminLmsRoleFilter');
  const lmsUserSearch = document.getElementById('adminLmsUserSearch');

  if (lmsRoleFilter) {
    lmsRoleFilter.addEventListener('change', () => {
      renderAdminLmsUsers(lmsRoleFilter.value, lmsUserSearch ? lmsUserSearch.value : '');
    });
  }

  if (lmsUserSearch) {
    lmsUserSearch.addEventListener('input', () => {
      renderAdminLmsUsers(lmsRoleFilter ? lmsRoleFilter.value : 'all', lmsUserSearch.value);
    });
  }
});
