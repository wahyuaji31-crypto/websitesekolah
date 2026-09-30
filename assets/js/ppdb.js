/**
 * PPDB (Penerimaan Peserta Didik Baru) Multi-step Form & Status Check Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  let currentStep = 1;
  const totalSteps = 3;

  const form = document.getElementById('ppdbForm');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const submitBtn = document.getElementById('submitBtn');
  const receiptCard = document.getElementById('ppdbReceiptSection');

  function updateStepUI() {
    // Show/hide steps
    for (let i = 1; i <= totalSteps; i++) {
      const stepEl = document.getElementById(`step-${i}`);
      const indicator = document.getElementById(`indicator-step-${i}`);
      const indicatorText = document.getElementById(`indicator-text-${i}`);
      
      if (stepEl) {
        if (i === currentStep) {
          stepEl.classList.remove('hidden');
        } else {
          stepEl.classList.add('hidden');
        }
      }

      if (indicator) {
        if (i <= currentStep) {
          indicator.classList.remove('bg-slate-200', 'text-slate-500');
          indicator.classList.add('bg-blue-600', 'text-white');
        } else {
          indicator.classList.remove('bg-blue-600', 'text-white');
          indicator.classList.add('bg-slate-200', 'text-slate-500');
        }
      }

      if (indicatorText) {
        if (i === currentStep) {
          indicatorText.classList.add('font-bold', 'text-blue-600');
          indicatorText.classList.remove('text-slate-500');
        } else {
          indicatorText.classList.remove('font-bold', 'text-blue-600');
          indicatorText.classList.add('text-slate-500');
        }
      }
    }

    // Button visibility
    if (prevBtn) {
      if (currentStep === 1) {
        prevBtn.classList.add('invisible');
      } else {
        prevBtn.classList.remove('invisible');
      }
    }

    if (nextBtn && submitBtn) {
      if (currentStep === totalSteps) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
      } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
      }
    }
  }

  function validateCurrentStep() {
    const currentStepEl = document.getElementById(`step-${currentStep}`);
    if (!currentStepEl) return true;

    const requiredInputs = currentStepEl.querySelectorAll('[required]');
    let isValid = true;

    requiredInputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('border-red-500', 'ring-1', 'ring-red-500');
        input.classList.remove('border-slate-300');
      } else {
        input.classList.remove('border-red-500', 'ring-1', 'ring-red-500');
        input.classList.add('border-slate-300');
      }
    });

    if (!isValid) {
      if (window.showToast) {
        window.showToast('Mohon lengkapi semua kolom yang wajib diisi (*)', 'error');
      }
    }
    return isValid;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
          currentStep++;
          updateStepUI();
          window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
        }
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateStepUI();
        window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateCurrentStep()) return;

      // Extract form data
      const formData = new FormData(form);
      const regNumber = 'PPDB-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
      
      const registrationData = {
        regNumber: regNumber,
        fullName: formData.get('fullName') || 'Budi Santoso',
        nisn: formData.get('nisn') || '0012345678',
        gender: formData.get('gender') || 'Laki-laki',
        birthPlace: formData.get('birthPlace') || 'Jakarta',
        birthDate: formData.get('birthDate') || '2009-05-14',
        prevSchool: formData.get('prevSchool') || 'SMP Negeri 1',
        track: formData.get('track') || 'Jalur Prestasi',
        major: formData.get('major') || 'Peminatan MIPA (Ilmu Alam)',
        parentName: formData.get('parentName') || 'Supardi',
        phone: formData.get('phone') || '081234567890',
        address: formData.get('address') || 'Jl. Pendidikan No. 12',
        regDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: 'Terverifikasi (Menunggu Pengumuman)'
      };

      // Save to localStorage for status check simulation
      const savedRegistrations = JSON.parse(localStorage.getItem('ppdb_registrations') || '[]');
      savedRegistrations.push(registrationData);
      localStorage.setItem('ppdb_registrations', JSON.stringify(savedRegistrations));

      // Populate Receipt
      document.getElementById('receiptRegNo').textContent = registrationData.regNumber;
      document.getElementById('receiptFullName').textContent = registrationData.fullName;
      document.getElementById('receiptNisn').textContent = registrationData.nisn;
      document.getElementById('receiptGender').textContent = registrationData.gender;
      document.getElementById('receiptBirth').textContent = `${registrationData.birthPlace}, ${registrationData.birthDate}`;
      document.getElementById('receiptSchool').textContent = registrationData.prevSchool;
      document.getElementById('receiptTrack').textContent = registrationData.track;
      document.getElementById('receiptMajor').textContent = registrationData.major;
      document.getElementById('receiptPhone').textContent = registrationData.phone;
      document.getElementById('receiptDate').textContent = registrationData.regDate;
      document.getElementById('receiptStatus').textContent = registrationData.status;

      // Hide form, show receipt
      form.classList.add('hidden');
      document.getElementById('stepIndicators').classList.add('hidden');
      receiptCard.classList.remove('hidden');

      if (window.showToast) {
        window.showToast('Pendaftaran Berhasil Dikirim! Silakan cetak bukti pendaftaran.', 'success');
      }

      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      window.scrollTo({ top: receiptCard.offsetTop - 80, behavior: 'smooth' });
    });
  }

  // Print button
  const printReceiptBtn = document.getElementById('printReceiptBtn');
  if (printReceiptBtn) {
    printReceiptBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Check Status Lookup Logic
  const checkStatusForm = document.getElementById('checkStatusForm');
  const statusResultCard = document.getElementById('statusResultCard');

  if (checkStatusForm) {
    checkStatusForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchInput = document.getElementById('statusSearchInput').value.trim().toUpperCase();
      const savedRegistrations = JSON.parse(localStorage.getItem('ppdb_registrations') || '[]');

      // Default sample entry if empty
      const sample = {
        regNumber: 'PPDB-2026-88219',
        fullName: 'Ahmad Faiz Al-Ghifari',
        nisn: '0078912345',
        track: 'Jalur Prestasi Akademik',
        major: 'MIPA (Matematika & Ilmu Alam)',
        regDate: '28 September 2026',
        status: 'Lulus Seleksi Berkas'
      };

      let match = savedRegistrations.find(r => 
        (r.regNumber && r.regNumber.toUpperCase() === searchInput) || 
        (r.nisn && r.nisn === searchInput)
      );

      if (!match && (searchInput === 'PPDB-2026-88219' || searchInput === '0078912345' || searchInput === 'FAIZ')) {
        match = sample;
      }

      if (match) {
        document.getElementById('resRegNo').textContent = match.regNumber;
        document.getElementById('resName').textContent = match.fullName;
        document.getElementById('resNisn').textContent = match.nisn;
        document.getElementById('resTrack').textContent = match.track;
        document.getElementById('resMajor').textContent = match.major;
        document.getElementById('resStatus').textContent = match.status || 'Sedang Diproses';

        statusResultCard.classList.remove('hidden');
        statusResultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        if (window.showToast) window.showToast('Data pendaftaran ditemukan!', 'success');
      } else {
        statusResultCard.classList.add('hidden');
        if (window.showToast) window.showToast('Data tidak ditemukan! Pastikan No. Registrasi atau NISN benar.', 'error');
      }
    });
  }
});
