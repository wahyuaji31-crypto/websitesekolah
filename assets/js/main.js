/**
 * Main JavaScript File for SMA Negeri 1 Bengkayang Website
 */

// Load and Apply Dynamic Web Settings across all pages
function applyWebSettings() {
  const savedSettings = localStorage.getItem('school_web_settings');
  if (!savedSettings) return;

  try {
    const s = JSON.parse(savedSettings);

    // Apply School Name
    if (s.schoolName) {
      document.querySelectorAll('.dyn-school-name').forEach(el => el.textContent = s.schoolName);
    }
    if (s.schoolShortName) {
      document.querySelectorAll('.dyn-school-short').forEach(el => el.textContent = s.schoolShortName);
    }
    if (s.schoolAddress) {
      document.querySelectorAll('.dyn-school-address').forEach(el => el.textContent = s.schoolAddress);
    }
    if (s.schoolPhone) {
      document.querySelectorAll('.dyn-school-phone').forEach(el => el.textContent = s.schoolPhone);
    }
    if (s.schoolEmail) {
      document.querySelectorAll('.dyn-school-email').forEach(el => el.textContent = s.schoolEmail);
    }
    if (s.headmasterName) {
      document.querySelectorAll('.dyn-headmaster-name').forEach(el => el.textContent = s.headmasterName);
    }
    if (s.headmasterNip) {
      document.querySelectorAll('.dyn-headmaster-nip').forEach(el => el.textContent = s.headmasterNip);
    }
    if (s.headmasterSpeech) {
      document.querySelectorAll('.dyn-headmaster-speech').forEach(el => el.textContent = s.headmasterSpeech);
    }
    if (s.headmasterPhoto) {
      document.querySelectorAll('.dyn-headmaster-photo').forEach(el => el.src = s.headmasterPhoto);
    }

    // Apply Theme Palette if customized
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
        // Default Classic Blue
        root.style.setProperty('--primary', '#1e40af');
        root.style.setProperty('--primary-dark', '#1e3a8a');
        root.style.setProperty('--secondary', '#0ea5e9');
      }
    }
  } catch (e) {
    console.error('Error applying web settings:', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Apply Web Settings immediately
  applyWebSettings();

  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Mobile Menu Navigation Drawer Toggle
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
