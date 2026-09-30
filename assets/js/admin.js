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

function loadData() {
  ppdbList = JSON.parse(localStorage.getItem('ppdb_registrations')) || DEFAULT_PPDB_DATA;
  agendaList = JSON.parse(localStorage.getItem('school_agenda_data')) || DEFAULT_AGENDA_DATA;
  ekskulList = JSON.parse(localStorage.getItem('school_ekskul_data')) || DEFAULT_EKSKUL_DATA;
  teachersList = JSON.parse(localStorage.getItem('school_teachers_data')) || DEFAULT_TEACHERS_DATA;
  galleryList = JSON.parse(localStorage.getItem('school_gallery_data')) || DEFAULT_GALLERY_DATA;
  facilitiesList = JSON.parse(localStorage.getItem('school_facilities_data')) || DEFAULT_FACILITIES_DATA;
  messagesList = JSON.parse(localStorage.getItem('school_messages')) || DEFAULT_MESSAGES;

  // Persist defaults
  localStorage.setItem('school_agenda_data', JSON.stringify(agendaList));
  localStorage.setItem('school_ekskul_data', JSON.stringify(ekskulList));
  localStorage.setItem('school_teachers_data', JSON.stringify(teachersList));
  localStorage.setItem('school_gallery_data', JSON.stringify(galleryList));
  localStorage.setItem('school_facilities_data', JSON.stringify(facilitiesList));
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
// 6. FASILITAS KAMPUS CRUD
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
  if (window.showToast) window.showToast('Pengaturan website berhasil disimpan!', 'success');
}

function resetWebSettings() {
  if (confirm('Kembalikan ke pengaturan awal SMAN 1 Bengkayang?')) {
    localStorage.setItem('school_web_settings', JSON.stringify(DEFAULT_WEB_SETTINGS));
    loadWebSettings();
    if (window.showToast) window.showToast('Pengaturan dikembalikan ke default.', 'success');
  }
}

// -------------------------------------------------------------
// 8. PESAN MASUK & STATS
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
});
