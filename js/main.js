/**
 * ==============================================================================
 * SHARATH KUMAR POGUDA - PERSONAL PORTFOLIO JAVASCRIPT
 * Dynamic Motions, Floating Particles, Typewriter Effect & Interactivity
 * ==============================================================================
 * 
 * TABLE OF CONTENTS:
 * 1. Configuration & Profile Links
 * 2. Sticky Navbar & Header Scroll State
 * 3. Mobile Navigation Menu Toggle
 * 4. Scroll Spy (Active Navigation Link Highlighting)
 * 5. Dark Mode / Light Mode Theme Switcher (with LocalStorage)
 * 6. Dynamic Typewriter Text Effect (Hero Subtitle)
 * 7. Interactive HTML5 Background Particle Network (Canvas Motion)
 * 8. Mouse Parallax on Floating Tech Icons
 * 9. Scroll-Triggered Reveal Animations & Skill Bars
 * 10. Project Category Filter System
 * 11. Contact Form Validation & Toast Notification
 * 12. Resume Modal Preview & Download Trigger
 * 13. Photo Upload / Replacement Handler (LocalStorage Persisted)
 * 14. Back to Top Button
 * 15. Smooth Scrolling for Internal Anchor Links
 */

// =============================================================================
// 1. CONFIGURATION & PROFILE LINKS
// Update your profile links and details here!
// =============================================================================
const PORTFOLIO_CONFIG = {
  name: "Sharath Kumar Poguda",
  email: "sharathkumarpoguda@gmail.com",
  phone: "+91 8247531270",
  location: "Hyderabad, Telangana, India",
  githubUrl: "https://github.com/",
  linkedinUrl: "https://linkedin.com/in/",
  resumePath: "assets/Sharath_Kumar_Poguda_Resume.html"
};

// Initialize all features once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initMobileMenu();
  initThemeToggle();
  initScrollSpy();
  initTypewriterEffect();
  initParticleNetwork();
  initPhotoInteractivity();
  initScrollReveal();
  initProjectFilters();
  initContactForm();
  initResumeModal();
  initPhotoUploader();
  initBackToTop();
  initSmoothScroll();
});

// =============================================================================
// 2. STICKY NAVBAR & HEADER SCROLL STATE
// =============================================================================
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// =============================================================================
// 3. MOBILE NAVIGATION MENU TOGGLE
// =============================================================================
function initMobileMenu() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");
  const links = document.querySelectorAll(".nav-link");

  if (!hamburgerBtn || !navLinks) return;

  hamburgerBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.contains("open");
    if (isOpen) {
      navLinks.classList.remove("open");
      hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      hamburgerBtn.setAttribute("aria-expanded", "false");
    } else {
      navLinks.classList.add("open");
      hamburgerBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      hamburgerBtn.setAttribute("aria-expanded", "true");
    }
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        hamburgerBtn.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// =============================================================================
// 4. SCROLL SPY (ACTIVE NAVIGATION HIGHLIGHT)
// =============================================================================
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + 130;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}

// =============================================================================
// 5. DARK / LIGHT THEME TOGGLE
// =============================================================================
function initThemeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    showToast(`Switched to ${newTheme === "light" ? "Light" : "Black & Blue"} theme`);
  });
}

// =============================================================================
// 6. DYNAMIC ANIMATED TYPEWRITER EFFECT
// Cycles smoothly through role titles with typing and deleting animation
// =============================================================================
function initTypewriterEffect() {
  const typewriterElement = document.getElementById("typewriter-text");
  if (!typewriterElement) return;

  const roles = [
    "Aspiring Software Developer",
    "Frontend & Web Developer",
    "B.Tech CSE Student (Class of 2027)",
    "AI & Data Literacy Practitioner",
    "Python & SQL Enthusiast"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    // Finished typing the whole word
    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 450; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// =============================================================================
// 7. INTERACTIVE HTML5 BACKGROUND PARTICLE NETWORK
// Renders dynamic drifting nodes connected with glowing lines across the background
// =============================================================================
function initParticleNetwork() {
  const canvas = document.getElementById("ambient-canvas") || document.getElementById("hero-particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  const particleCount = 55;
  const maxDistance = 125;
  const mouse = { x: null, y: null, radius: 150 };

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Track mouse coordinates across the entire window for full-page interactivity
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.9;
      this.vy = (Math.random() - 0.5) * 0.9;
      this.radius = Math.random() * 2 + 1.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around borders
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse repulsion / attraction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = dx / distance;
          const directionY = dy / distance;
          this.x -= directionX * force * 2;
          this.y -= directionY * force * 2;
        }
      }
    }

    draw() {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "rgba(56, 189, 248, 0.65)" : "rgba(37, 99, 235, 0.45)";
      ctx.fill();
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connect adjacent particles with subtle lines
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * (isDark ? 0.25 : 0.15);
          ctx.beginPath();
          ctx.strokeStyle = isDark ? `rgba(56, 189, 248, ${opacity})` : `rgba(37, 99, 235, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// =============================================================================
// 8. INTERACTIVE CYBER PROFILE PHOTO
// Triggers high-tech laser scan on click and smooth subtle mouse tracking
// =============================================================================
function initPhotoInteractivity() {
  const photoWrapper = document.getElementById("photo-inner-wrapper");
  const laserBeam = document.getElementById("photo-scan-beam");
  if (!photoWrapper) return;

  function triggerLaserScan() {
    if (laserBeam) {
      laserBeam.classList.remove("scanning");
      void laserBeam.offsetWidth; // Trigger reflow
      laserBeam.classList.add("scanning");
      setTimeout(() => laserBeam.classList.remove("scanning"), 800);
    }
  }

  // Click to trigger laser scan pulse
  photoWrapper.addEventListener("click", triggerLaserScan);

  // Keyboard accessibility
  photoWrapper.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerLaserScan();
    }
  });

  // Subtle mouse parallax tilt on photo wrapper
  photoWrapper.addEventListener("mousemove", (e) => {
    const rect = photoWrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const tiltX = -y * 14;
    const tiltY = x * 14;

    photoWrapper.style.transform = `scale(1.04) perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  photoWrapper.addEventListener("mouseleave", () => {
    photoWrapper.style.transform = "";
  });
}

// =============================================================================
// 9. SCROLL REVEAL ANIMATIONS & SKILL PROGRESS BARS
// =============================================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll("[data-reveal]");
  const skillBars = document.querySelectorAll(".skill-bar-fill");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");

        // Animate skill bars inside revealed card
        const barsInside = entry.target.querySelectorAll(".skill-bar-fill");
        barsInside.forEach(bar => {
          const targetWidth = bar.getAttribute("data-progress") || "70%";
          bar.style.width = targetWidth;
        });

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

// =============================================================================
// 10. PROJECT CATEGORY FILTER SYSTEM
// =============================================================================
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");

        if (filterValue === "all" || category === filterValue) {
          card.style.display = "flex";
          card.style.animation = "fadeIn 0.4s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// =============================================================================
// 11. CONTACT FORM VALIDATION & TOAST NOTIFICATION
// =============================================================================
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!name || !email || !message) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    showToast(`Thank you, ${name}! Your message has been sent successfully.`);
    form.reset();
  });
}

function showToast(message, type = "success") {
  let toastContainer = document.querySelector(".toast-container");

  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast";

  const iconClass = type === "error" ? "fa-circle-exclamation" : "fa-circle-check";
  const iconColor = type === "error" ? "#ef4444" : "#10b981";

  toast.innerHTML = `
    <i class="fa-solid ${iconClass}" style="color: ${iconColor};"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// =============================================================================
// 12. RESUME MODAL PREVIEW & DOWNLOAD TRIGGER
// =============================================================================
function initResumeModal() {
  const openModalBtns = document.querySelectorAll(".js-open-resume-modal");
  const closeModalBtn = document.getElementById("modal-close-btn");
  const modalOverlay = document.getElementById("resume-modal");

  if (!modalOverlay) return;

  openModalBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modalOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      closeModal();
    });
  }

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
      closeModal();
    }
  });

  function closeModal() {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// =============================================================================
// 13. PHOTO UPLOAD / REPLACEMENT HANDLER (LOCALSTORAGE PERSISTED)
// Allows Sharath to select his real photo from his computer & preserves it!
// =============================================================================
function initPhotoUploader() {
  const fileInput = document.getElementById("photo-file-input");
  const photoImg = document.getElementById("hero-profile-photo");

  if (!fileInput || !photoImg) return;

  // Check if user previously uploaded a custom photo
  const savedPhoto = localStorage.getItem("sharath-custom-photo");
  if (savedPhoto) {
    photoImg.src = savedPhoto;
  }

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please choose an image file (PNG, JPG, JPEG).", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
      const dataUrl = event.target.result;
      photoImg.src = dataUrl;
      try {
        localStorage.setItem("sharath-custom-photo", dataUrl);
      } catch (err) {
        console.warn("Storage full for large image data URL", err);
      }
      showToast("Profile photo updated successfully!");
    };
    reader.readAsDataURL(file);
  });
}

// =============================================================================
// 14. BACK TO TOP BUTTON
// =============================================================================
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// =============================================================================
// 15. SMOOTH SCROLLING FOR ALL INTERNAL ANCHOR LINKS
// =============================================================================
function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });
}



