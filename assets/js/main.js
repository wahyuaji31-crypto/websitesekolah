/**
 * Main JavaScript File for SMA Negeri 1 Bengkayang Website
 * Handles Dynamic Content Rendering from localStorage (Settings, Teachers, Ekskul, Agenda, Gallery, News)
 */

// Default Datasets for Fallbacks
const DEFAULT_TEACHERS = [
  { id: 1, name: 'Ratna Sari, S.Pd.', subject: 'Matematika', nip: '19850214 201001 2 015', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop' },
  { id: 2, name: 'Agus Salim, M.Si.', subject: 'Fisika', nip: '19790819 200501 1 008', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
  { id: 3, name: 'Dewi Lestari, S.Pd.', subject: 'Kimia', nip: '19880325 201212 2 003', photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop' },
  { id: 4, name: 'drh. Gunawan, M.Pd.', subject: 'Biologi', nip: '19810611 200604 1 012', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop' },
  { id: 5, name: 'Sarah Johnson, B.Ed.', subject: 'Bahasa Inggris', nip: '19900915 201503 2 020', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' },
  { id: 6, name: 'Fajar Nugraha, S.Kom.', subject: 'Informatika / IT', nip: '19921108 201903 1 005', photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop' }
];

const DEFAULT_EKSKUL = [
  { id: 1, name: 'Robotik & Coding Club', icon: 'cpu', schedule: 'Sabtu, 09.00 WIB', location: 'Lab Komputer', desc: 'Mempelajari perakitan mikrokontroler Arduino, IoT, dasar pemodelan 3D, serta pemrograman web/aplikasi.', category: 'Sains & Teknologi' },
  { id: 2, name: 'KIR (Karya Ilmiah Remaja)', icon: 'microscope', schedule: 'Rabu, 15.30 WIB', location: 'Lab Sains', desc: 'Pembimbingan riset ilmiah bidang sains murni dan humaniora untuk kompetisi tingkat nasional LKIR LIPI / BRIN.', category: 'Akademik' },
  { id: 3, name: 'Paskibra Satya Bangsa', icon: 'flag', schedule: 'Selasa & Kamis, 16.00', location: 'Lapangan Utama', desc: 'Pelatihan disiplin baris berbaris tingkat tinggi, ketahanan fisik, kepemimpinan, dan seleksi pengibar bendera kota.', category: 'Kepemimpinan' },
  { id: 4, name: 'PMR Wira (Palang Merah Remaja)', icon: 'heart-pulse', schedule: 'Jumat, 14.00 WIB', location: 'Ruang UKS', desc: 'Edukasi pertolongan pertama pada kecelakaan (P3K), kesiapsiagaan bencana, dan aksi donor darah rutin.', category: 'Kemanusiaan' },
  { id: 5, name: 'Paduan Suara & Musik Orkestra', icon: 'music', schedule: 'Sabtu, 10.00 WIB', location: 'Ruang Musik', desc: 'Pelatihan vokal harmoni, instrumen musik modern & tradisional, serta penampilan rutin di upacara dan konser tahunan.', category: 'Seni & Budaya' },
  { id: 6, name: 'Basket & Futsal Club', icon: 'dribbble', schedule: 'Senin & Rabu, 16.00', location: 'Sport Hall', desc: 'Pembinaan taktik, teknik tanding, dan keikutsertaan dalam turnamen DBL dan liga futsal pelajar.', category: 'Olahraga' }
];

const DEFAULT_AGENDA = [
  { id: 1, title: 'Penilaian Tengah Semester (PTS)', date: '20 - 27 Oktober 2026', semester: 'Semester Ganjil', desc: 'Ujian evaluasi capaian pembelajaran triwulan awal.', tagColor: 'blue' },
  { id: 2, title: 'Sumatif Akhir Semester (SAS)', date: '1 - 10 Desember 2026', semester: 'Semester Ganjil', desc: 'Ujian akhir semester berbasis digital CBT terpusat.', tagColor: 'blue' },
  { id: 3, title: 'Classmeeting & Porseni Pelajar', date: '14 - 18 Desember 2026', semester: 'Kesiswaan', desc: 'Kompetisi antarkelas olahraga, seni, dan e-sport.', tagColor: 'emerald' },
  { id: 4, title: 'Pembagian Rapor Semester 1', date: '22 Desember 2026', semester: 'Rapor & Libur', desc: 'Penyerahan hasil evaluasi belajar kepada orang tua / wali murid.', tagColor: 'amber' }
];

const DEFAULT_GALLERY = [
  { id: 1, title: 'Diskusi Kelompok Kelas Digital', category: 'belajar', catLabel: 'Kegiatan Belajar', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Upacara Peringatan Hari Pahlawan', category: 'upacara', catLabel: 'Upacara & Karakter', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Turnamen Futsal Antar Sekolah', category: 'ekskul', catLabel: 'Ekskul & Olahraga', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Praktik Robotika di Lab Komputer', category: 'fasilitas', catLabel: 'Fasilitas', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'Eksperimen Kimia di Lab Sains', category: 'belajar', catLabel: 'Kegiatan Belajar', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'Suasana Tenang di E-Library Digital', category: 'fasilitas', catLabel: 'Fasilitas', img: 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=800&auto=format&fit=crop' },
  { id: 7, title: 'Penampilan Seni Tari Tradisional', category: 'ekskul', catLabel: 'Ekskul & Olahraga', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop' },
  { id: 8, title: 'Bimbingan Intensif Olimpiade Sains', category: 'belajar', catLabel: 'Kegiatan Belajar', img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop' }
];

const DEFAULT_FACILITIES = [
  { id: 1, title: 'Perpustakaan Digital & Ruang Baca', desc: 'Dilengkapi ratusan tablet e-reading, ruang diskusi ber-AC, dan ribuan koleksi buku referensi.', img: 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=600&auto=format&fit=crop' },
  { id: 2, title: 'Laboratorium Komputer & Robotik', desc: '3 ruang lab dengan total 120 unit PC Core i7, internet dedicated fiber optic, dan kit Arduino/IoT.', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop' },
  { id: 3, title: 'Laboratorium MIPA Terpadu', desc: 'Alat peraga modern, mikroskop digital, fume hood keselamatan, dan bahan riset berspesifikasi tinggi.', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop' },
  { id: 4, title: 'Sport Hall & Lapangan Terpadu', desc: 'Lapangan basket standar Perbasi, lapangan futsal rumput sintetis, lapangan voli, dan arena bulutangkis.', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop' },
  { id: 5, title: 'Auditorium & Gedung Serbaguna', desc: 'Kapasitas 800 orang dengan sound system mutakhir dan panggung pertunjukan teater/seni.', img: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=600&auto=format&fit=crop' },
  { id: 6, title: 'Masjid Sekolah & Klinik UKS', desc: 'Masjid 2 lantai yang nyaman untuk ibadah harian serta klinik kesehatan dengan perawat siaga.', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop' }
];

// Load and Apply Dynamic Web Settings
function applyWebSettings() {
  const savedSettings = localStorage.getItem('school_web_settings');
  if (!savedSettings) return;

  try {
    const s = JSON.parse(savedSettings);

    if (s.schoolName) document.querySelectorAll('.dyn-school-name').forEach(el => el.textContent = s.schoolName);
    if (s.schoolShortName) document.querySelectorAll('.dyn-school-short').forEach(el => el.textContent = s.schoolShortName);
    if (s.schoolAddress) document.querySelectorAll('.dyn-school-address').forEach(el => el.textContent = s.schoolAddress);
    if (s.schoolPhone) document.querySelectorAll('.dyn-school-phone').forEach(el => el.textContent = s.schoolPhone);
    if (s.schoolEmail) document.querySelectorAll('.dyn-school-email').forEach(el => el.textContent = s.schoolEmail);
    if (s.headmasterName) document.querySelectorAll('.dyn-headmaster-name').forEach(el => el.textContent = s.headmasterName);
    if (s.headmasterNip) document.querySelectorAll('.dyn-headmaster-nip').forEach(el => el.textContent = s.headmasterNip);
    if (s.headmasterSpeech) document.querySelectorAll('.dyn-headmaster-speech').forEach(el => el.textContent = s.headmasterSpeech);
    if (s.headmasterPhoto) document.querySelectorAll('.dyn-headmaster-photo').forEach(el => el.src = s.headmasterPhoto);

    if (s.themeColor) {
      const root = document.documentElement;
      if (s.themeColor === 'emerald') {
        root.style.setProperty('--primary', '#059669');
        root.style.setProperty('--primary-dark', '#047857');
        root.style.setProperty('--secondary', '#10b981');
      } else if (s.themeColor === 'indigo') {
        root.style.setProperty('--primary', '#4f46e5');
        root.style.setProperty('--primary-dark', '#3730a3');
        root.style.setProperty('--secondary', '#6366f1');
      } else if (s.themeColor === 'purple') {
        root.style.setProperty('--primary', '#7c3aed');
        root.style.setProperty('--primary-dark', '#5b21b6');
        root.style.setProperty('--secondary', '#a855f7');
      } else if (s.themeColor === 'amber') {
        root.style.setProperty('--primary', '#d97706');
        root.style.setProperty('--primary-dark', '#b45309');
        root.style.setProperty('--secondary', '#f59e0b');
      } else {
        root.style.setProperty('--primary', '#1e40af');
        root.style.setProperty('--primary-dark', '#1e3a8a');
        root.style.setProperty('--secondary', '#0ea5e9');
      }
    }
  } catch (e) {
    console.error('Error applying web settings:', e);
  }
}

// Render Dynamic Teachers (Profil Page)
function renderDynamicTeachers() {
  const container = document.getElementById('dynamicTeachersContainer');
  if (!container) return;

  const data = JSON.parse(localStorage.getItem('school_teachers_data')) || DEFAULT_TEACHERS;
  container.innerHTML = '';

  data.forEach(t => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded-xl border border-slate-200 text-center hover-lift';
    card.innerHTML = `
      <img src="${t.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'}" alt="${t.name}" class="w-20 h-20 mx-auto rounded-full object-cover mb-3 shadow">
      <h4 class="font-bold text-slate-900 text-xs line-clamp-1">${t.name}</h4>
      <p class="text-[11px] text-brand-600 font-semibold">${t.subject}</p>
      ${t.nip ? `<p class="text-[9px] text-slate-400 mt-1">${t.nip}</p>` : ''}
    `;
    container.appendChild(card);
  });
}

// Render Dynamic Ekskul (Akademik Page)
function renderDynamicEkskul() {
  const container = document.getElementById('dynamicEkskulContainer');
  if (!container) return;

  const data = JSON.parse(localStorage.getItem('school_ekskul_data')) || DEFAULT_EKSKUL;
  container.innerHTML = '';

  data.forEach(e => {
    const card = document.createElement('div');
    card.className = 'p-6 rounded-2xl bg-slate-50 border border-slate-200 hover-lift flex flex-col justify-between';
    card.innerHTML = `
      <div>
        <div class="w-12 h-12 rounded-xl bg-blue-100 text-brand-600 flex items-center justify-center mb-4">
          <i data-lucide="${e.icon || 'activity'}" class="w-6 h-6"></i>
        </div>
        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-50 text-brand-700 mb-1 inline-block">${e.category || 'Ekstrakurikuler'}</span>
        <h4 class="font-bold text-slate-900 text-lg">${e.name}</h4>
        <p class="text-xs text-slate-600 mt-2 leading-relaxed">${e.desc}</p>
      </div>
      <div class="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>📅 ${e.schedule || 'Terjadwal'}</span>
        <span class="font-semibold text-brand-600">${e.location || 'Sekolah'}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render Dynamic Agenda (Akademik Page)
function renderDynamicAgenda() {
  const container = document.getElementById('dynamicAgendaContainer');
  if (!container) return;

  const data = JSON.parse(localStorage.getItem('school_agenda_data')) || DEFAULT_AGENDA;
  container.innerHTML = '';

  data.forEach(a => {
    const card = document.createElement('div');
    card.className = 'bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover-lift';
    card.innerHTML = `
      <div class="flex items-center justify-between mb-4">
        <span class="text-xs font-bold uppercase text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">${a.semester || 'Kegiatan'}</span>
        <i data-lucide="calendar" class="w-5 h-5 text-slate-400"></i>
      </div>
      <h4 class="font-bold text-slate-900 text-base mb-2">${a.title}</h4>
      <p class="text-xs text-slate-500 mb-4">${a.desc}</p>
      <div class="text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center gap-2">
        <i data-lucide="clock" class="w-4 h-4 text-brand-600"></i>
        <span>${a.date}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render Dynamic Facilities (Profil Page)
function renderDynamicFacilities() {
  const container = document.getElementById('dynamicFacilitiesContainer');
  if (!container) return;

  const data = JSON.parse(localStorage.getItem('school_facilities_data')) || DEFAULT_FACILITIES;
  container.innerHTML = '';

  data.forEach(f => {
    const card = document.createElement('div');
    card.className = 'rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white hover-lift';
    card.innerHTML = `
      <img src="${f.img || 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=600&auto=format&fit=crop'}" alt="${f.title}" class="w-full h-48 object-cover">
      <div class="p-5">
        <h4 class="font-bold text-slate-900 text-base">${f.title}</h4>
        <p class="text-xs text-slate-600 mt-2">${f.desc}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render Dynamic Gallery (Galeri Page)
function renderDynamicGallery() {
  const container = document.getElementById('galleryGrid');
  if (!container) return;

  const data = JSON.parse(localStorage.getItem('school_gallery_data')) || DEFAULT_GALLERY;
  container.innerHTML = '';

  data.forEach(g => {
    const card = document.createElement('div');
    card.className = 'gallery-card bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover-lift group cursor-pointer';
    card.setAttribute('data-category', g.category || 'belajar');
    card.onclick = () => {
      if (typeof openLightbox === 'function') openLightbox(g.img, g.title);
    };
    card.innerHTML = `
      <div class="aspect-4/3 overflow-hidden relative">
        <img src="${g.img}" alt="${g.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
          <i data-lucide="zoom-in" class="w-8 h-8"></i>
        </div>
      </div>
      <div class="p-3.5">
        <h4 class="font-bold text-slate-900 text-xs line-clamp-1">${g.title}</h4>
        <span class="text-[10px] text-brand-600 font-semibold">${g.catLabel || 'Dokumentasi'}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyWebSettings();
  renderDynamicTeachers();
  renderDynamicEkskul();
  renderDynamicAgenda();
  renderDynamicFacilities();
  renderDynamicGallery();

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Mobile Menu Drawer
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

  function openMobileMenu() {
    if (mobileMenuDrawer && mobileMenuOverlay) {
      mobileMenuDrawer.classList.remove('translate-x-full');
      mobileMenuOverlay.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }

  function closeMobileMenu() {
    if (mobileMenuDrawer && mobileMenuOverlay) {
      mobileMenuDrawer.classList.add('translate-x-full');
      mobileMenuOverlay.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

  // Navbar Scroll effect
  const headerNav = document.getElementById('mainHeader');
  if (headerNav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        headerNav.classList.add('shadow-md', 'bg-white/95');
        headerNav.classList.remove('bg-white/85');
      } else {
        headerNav.classList.remove('shadow-md', 'bg-white/95');
        headerNav.classList.add('bg-white/85');
      }
    });
  }

  // Counter animation for statistics
  const counters = document.querySelectorAll('.stat-counter');
  let counterStarted = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      let count = 0;
      const speed = target / 60;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count) + suffix;
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + suffix;
        }
      };
      updateCount();
    });
  }

  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
          counterStarted = true;
          runCounters();
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  }

  // Scroll to Top Button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.remove('opacity-0', 'invisible');
        scrollTopBtn.classList.add('opacity-100', 'visible');
      } else {
        scrollTopBtn.classList.add('opacity-0', 'invisible');
        scrollTopBtn.classList.remove('opacity-100', 'visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Universal Toast Notification
  window.showToast = function(message, type = 'success') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    toast.className = `pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-xl text-white transform transition-all duration-300 translate-y-4 opacity-0 ${
      isSuccess ? 'bg-emerald-600' : 'bg-rose-600'
    }`;

    const icon = isSuccess ? 'check-circle' : 'alert-triangle';
    toast.innerHTML = `
      <i data-lucide="${icon}" class="w-5 h-5 flex-shrink-0"></i>
      <span class="text-sm font-medium flex-1">${message}</span>
    `;

    toastContainer.appendChild(toast);
    if (typeof lucide !== 'undefined') lucide.createIcons();

    setTimeout(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    }, 10);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };
});
