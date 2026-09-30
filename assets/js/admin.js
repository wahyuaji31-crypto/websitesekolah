/**
 * Admin Panel Management Script
 * Handles PPDB Data CRUD, Status Updates, News Management, and Settings
 */

// Initial Sample Data if empty
const DEFAULT_PPDB_DATA = [
  {
    regNumber: 'PPDB-2026-88219',
    fullName: 'Ahmad Faiz Al-Ghifari',
    nisn: '0078912345',
    gender: 'Laki-laki',
    birthPlace: 'Jakarta',
    birthDate: '2009-04-12',
    prevSchool: 'SMP Negeri 1 Harapan',
    track: 'Jalur Prestasi Akademik',
    major: 'MIPA (Matematika & Sains Alam)',
    parentName: 'H. Sudirman, S.E.',
    phone: '081299887766',
    address: 'Jl. Melati No. 15, Harapan Jaya',
    regDate: '28 September 2026',
    status: 'Lolos Seleksi'
  },
  {
    regNumber: 'PPDB-2026-64102',
    fullName: 'Siti Nur Aisyah',
    nisn: '0081234567',
    gender: 'Perempuan',
    birthPlace: 'Bandung',
    birthDate: '2009-08-20',
    prevSchool: 'SMP Islam Terpadu Amanah',
    track: 'Jalur Zonasi',
    major: 'IPS (Sosial & Humaniora)',
    parentName: 'Rahmat Hidayat',
    phone: '085712345678',
    address: 'Jl. Merak Blok B3 No. 8',
    regDate: '29 September 2026',
    status: 'Terverifikasi'
  },
  {
    regNumber: 'PPDB-2026-31994',
    fullName: 'Kevin Jonathan',
    nisn: '0074567890',
    gender: 'Laki-laki',
    birthPlace: 'Surabaya',
    birthDate: '2009-01-15',
    prevSchool: 'SMP Kristen Harapan Indah',
    track: 'Jalur Prestasi Non-Akademik',
    major: 'MIPA (Matematika & Sains Alam)',
    parentName: 'Jonathan Hendra',
    phone: '081344556677',
    address: 'Perumahan Grand Harapan Blok C2',
    regDate: '29 September 2026',
    status: 'Menunggu Berkas'
  },
  {
    regNumber: 'PPDB-2026-77301',
    fullName: 'Dewi Anjani',
    nisn: '0089876543',
    gender: 'Perempuan',
    birthPlace: 'Semarang',
    birthDate: '2009-11-05',
    prevSchool: 'SMP Negeri 4 Kota',
    track: 'Jalur Afirmasi',
    major: 'Bahasa & Budaya Internasional',
    parentName: 'Kasiman',
    phone: '087811223344',
    address: 'Kampung Rawa No. 42',
    regDate: '30 September 2026',
    status: 'Terverifikasi'
  }
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
  },
  {
    id: 2,
    name: 'Alumni Angkatan 2020',
    email: 'alumni.2020@yahoo.com',
    phone: '085611223344',
    category: 'Kerja Sama & Kemitraan',
    subject: 'Permohonan Sharing Session Campus Expo 2026',
    message: 'Halo Humas SMAN 1, kami dari ikatan alumni ingin mengadakan sesi bimbingan masuk perguruan tinggi negeri untuk adik-adik kelas XII. Mohon konfirmasi jadwal.',
    date: '29 September 2026, 14:30 WIB',
    isRead: true
  }
];

// Check Authentication
function checkAuth() {
  const session = localStorage.getItem('admin_session');
  if (!session) {
    window.location.href = 'admin-login.html';
  }
}

// Log out
function logoutAdmin() {
  if (confirm('Apakah Anda yakin ingin keluar dari Admin Panel?')) {
    localStorage.removeItem('admin_session');
    window.location.href = 'admin-login.html';
  }
}

// Global data store
let ppdbList = [];
let messagesList = [];

function loadData() {
  const savedPPDB = localStorage.getItem('ppdb_registrations');
  if (savedPPDB) {
    ppdbList = JSON.parse(savedPPDB);
    // Combine with default if empty
    if (ppdbList.length === 0) {
      ppdbList = [...DEFAULT_PPDB_DATA];
      localStorage.setItem('ppdb_registrations', JSON.stringify(ppdbList));
    }
  } else {
    ppdbList = [...DEFAULT_PPDB_DATA];
    localStorage.setItem('ppdb_registrations', JSON.stringify(ppdbList));
  }

  const savedMsgs = localStorage.getItem('school_messages');
  if (savedMsgs) {
    messagesList = JSON.parse(savedMsgs);
  } else {
    messagesList = [...DEFAULT_MESSAGES];
    localStorage.setItem('school_messages', JSON.stringify(messagesList));
  }
}

// Render PPDB Table
function renderPPDBTable(filterTrack = 'all', searchQuery = '') {
  const tbody = document.getElementById('ppdbTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  const filtered = ppdbList.filter(item => {
    const matchesTrack = (filterTrack === 'all' || item.track.toLowerCase().includes(filterTrack.toLowerCase()));
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      item.fullName.toLowerCase().includes(q) || 
      item.regNumber.toLowerCase().includes(q) || 
      item.nisn.includes(q);
    return matchesTrack && matchesSearch;
  });

  document.getElementById('ppdbCountBadge').textContent = `${filtered.length} Pendaftar`;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="py-8 text-center text-xs text-slate-400">
          Tidak ada data pendaftar yang sesuai filter.
        </td>
      </tr>
    `;
    return;
  }

  filtered.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-slate-100 hover:bg-slate-50/80 text-xs text-slate-700 transition-colors';

    let statusBadgeClass = 'bg-slate-100 text-slate-700';
    if (item.status === 'Lolos Seleksi') statusBadgeClass = 'bg-emerald-100 text-emerald-800 font-bold';
    else if (item.status === 'Terverifikasi') statusBadgeClass = 'bg-blue-100 text-brand-700 font-bold';
    else if (item.status === 'Menunggu Berkas') statusBadgeClass = 'bg-amber-100 text-amber-800 font-bold';
    else if (item.status === 'Tidak Lolos') statusBadgeClass = 'bg-rose-100 text-rose-800 font-bold';

    tr.innerHTML = `
      <td class="py-3 px-4 font-mono font-bold text-brand-700">${item.regNumber}</td>
      <td class="py-3 px-4">
        <span class="font-bold text-slate-900 block">${item.fullName}</span>
        <span class="text-[11px] text-slate-500 font-mono">NISN: ${item.nisn}</span>
      </td>
      <td class="py-3 px-4">${item.prevSchool}</td>
      <td class="py-3 px-4">
        <span class="px-2 py-0.5 rounded bg-slate-100 font-medium text-[11px] block w-max">${item.track}</span>
        <span class="text-[10px] text-slate-500 block mt-0.5">${item.major}</span>
      </td>
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
          <button onclick="viewApplicantDetail('${item.regNumber}')" class="p-1.5 rounded-lg bg-blue-50 text-brand-600 hover:bg-brand-600 hover:text-white transition-colors" title="Lihat Detail">
            <i data-lucide="eye" class="w-3.5 h-3.5"></i>
          </button>
          <button onclick="deleteApplicant('${item.regNumber}')" class="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors" title="Hapus Data">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Update Status
function updateApplicantStatus(regNumber, newStatus) {
  const index = ppdbList.findIndex(p => p.regNumber === regNumber);
  if (index !== -1) {
    ppdbList[index].status = newStatus;
    localStorage.setItem('ppdb_registrations', JSON.stringify(ppdbList));
    updateStatsCards();
    if (window.showToast) window.showToast(`Status pendaftar ${regNumber} diubah ke ${newStatus}`, 'success');
  }
}

// Delete Applicant
function deleteApplicant(regNumber) {
  if (confirm(`Apakah Anda yakin ingin menghapus data calon siswa ${regNumber}?`)) {
    ppdbList = ppdbList.filter(p => p.regNumber !== regNumber);
    localStorage.setItem('ppdb_registrations', JSON.stringify(ppdbList));
    renderPPDBTable();
    updateStatsCards();
    if (window.showToast) window.showToast('Data pendaftar berhasil dihapus', 'success');
  }
}

// View Applicant Detail Modal
function viewApplicantDetail(regNumber) {
  const item = ppdbList.find(p => p.regNumber === regNumber);
  if (!item) return;

  alert(`DETAIL PENDAFTAR PPDB\n\nNo Registrasi: ${item.regNumber}\nNama Lengkap: ${item.fullName}\nNISN: ${item.nisn}\nJenis Kelamin: ${item.gender}\nTTL: ${item.birthPlace}, ${item.birthDate}\nAsal SMP: ${item.prevSchool}\nJalur: ${item.track}\nPeminatan: ${item.major}\nOrang Tua/Wali: ${item.parentName}\nWhatsApp: ${item.phone}\nAlamat: ${item.address}\nStatus Seleksi: ${item.status}`);
}

// Export CSV
function exportPPDBtoCSV() {
  if (ppdbList.length === 0) {
    alert('Tidak ada data untuk diekspor.');
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "No Registrasi,Nama Lengkap,NISN,Jenis Kelamin,Asal Sekolah,Jalur,Peminatan,Nama Ortu,WhatsApp,Alamat,Tanggal Daftar,Status\n";

  ppdbList.forEach(item => {
    const row = [
      `"${item.regNumber}"`,
      `"${item.fullName}"`,
      `"${item.nisn}"`,
      `"${item.gender || '-'}"`,
      `"${item.prevSchool}"`,
      `"${item.track}"`,
      `"${item.major}"`,
      `"${item.parentName}"`,
      `"${item.phone}"`,
      `"${item.address}"`,
      `"${item.regDate}"`,
      `"${item.status}"`
    ].join(",");
    csvContent += row + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Rekap_PPDB_SMAN1_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Update Top Dashboard Stats Cards
function updateStatsCards() {
  document.getElementById('statTotalPPDB').textContent = ppdbList.length;
  document.getElementById('statVerifiedPPDB').textContent = ppdbList.filter(p => p.status === 'Terverifikasi' || p.status === 'Lolos Seleksi').length;
  document.getElementById('statTotalMessages').textContent = messagesList.length;
}

// Render Messages
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

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  loadData();
  updateStatsCards();
  renderPPDBTable();
  renderMessages();

  // Search & Filter Listeners
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
