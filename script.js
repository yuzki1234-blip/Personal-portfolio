/* ===== MOBILE MENU TOGGLE ===== */
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('active');
    });
  });
}

/* ===== SMOOTH SCROLL FOR DATA-SCROLL-TARGET ===== */
const scrollButtons = document.querySelectorAll('[data-scroll-target]');

scrollButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-scroll-target');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Close mobile menu if open
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        menuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
      }

      // Scroll to target
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===== PROJECT DETAILS TOGGLE ===== */
const projectButtons = document.querySelectorAll('[data-project-toggle]');

projectButtons.forEach(button => {
  button.addEventListener('click', () => {
    const projectCard = button.closest('.project-card');
    const projectDetails = projectCard.querySelector('.project-details');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    // Toggle expanded state
    button.setAttribute('aria-expanded', !isExpanded);
    projectDetails.classList.toggle('active');
  });
});

/* ===== COPY EMAIL TO CLIPBOARD ===== */
const copyButton = document.getElementById('copy-email-button');
const copyFallback = document.getElementById('copy-fallback');
const email = 'tracy.nirvana@example.com';

if (copyButton) {
  copyButton.addEventListener('click', () => {
    // Check if Clipboard API is available
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email)
        .then(() => {
          showCopySuccess();
        })
        .catch(() => {
          fallbackCopy();
        });
    } else {
      // Fallback for older browsers or non-secure contexts
      fallbackCopy();
    }
  });

  function showCopySuccess() {
    copyButton.classList.add('copied');
    
    // Reset after 2 seconds
    setTimeout(() => {
      copyButton.classList.remove('copied');
    }, 2000);
  }

  function fallbackCopy() {
    // Show fallback email and allow manual copy
    copyFallback.classList.add('active');

    // Try to copy using the old method
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      showCopySuccess();
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }

    document.body.removeChild(textArea);
  }
}

/* ===== REVEAL ANIMATIONS ON SCROLL ===== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with reveal class
document.querySelectorAll('.reveal').forEach(element => {
  observer.observe(element);
});

/* ===== NAVIGATION HIGHLIGHT ON SCROLL ===== */
const sections = document.querySelectorAll('main > section');
const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-menu a');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 100) {
      currentSection = section.getAttribute('id');
    }
  });

  // Update active link
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

/* ===== LUCIDE ICONS INITIALIZATION ===== */
if (window.lucide) {
  lucide.createIcons();
}

/* ===== KEYBOARD ACCESSIBILITY ===== */
document.addEventListener('keydown', (e) => {
  // Close mobile menu on Escape key
  if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
  }
});

/* ===== PAGE LOAD PERFORMANCE ===== */
window.addEventListener('load', () => {
  // Trigger icon rendering after page load
  if (window.lucide) {
    lucide.createIcons();
  }
});

console.log('Portfolio script loaded successfully!');
