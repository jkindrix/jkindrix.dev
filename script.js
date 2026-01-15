/**
 * Justin Kindrix - Portfolio Site JavaScript
 * Theme toggle, mobile navigation, and smooth interactions
 */

(function () {
  'use strict';

  // ==========================================================================
  // Theme Toggle
  // ==========================================================================

  const THEME_KEY = 'jkindrix-theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  /**
   * Get the user's preferred theme from localStorage or system preference
   */
  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  }

  /**
   * Apply theme to the document
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    // Update aria-label on theme toggle button
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
      const label = theme === DARK ? 'Switch to light mode' : 'Switch to dark mode';
      toggleBtn.setAttribute('aria-label', label);
    }
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    const next = current === DARK ? LIGHT : DARK;
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  /**
   * Initialize theme on page load (called immediately to prevent FOUC)
   */
  function initTheme() {
    applyTheme(getPreferredTheme());
  }

  // Apply theme immediately to prevent flash of unstyled content
  initTheme();

  // ==========================================================================
  // Mobile Navigation
  // ==========================================================================

  /**
   * Toggle mobile navigation menu
   */
  function toggleMobileNav() {
    const menu = document.querySelector('.nav__menu');
    const toggle = document.querySelector('.nav__toggle');

    if (!menu || !toggle) return;

    const isOpen = menu.classList.contains('nav__menu--open');

    menu.classList.toggle('nav__menu--open');
    toggle.setAttribute('aria-expanded', !isOpen);

    // Update icon
    const openIcon = toggle.querySelector('.nav__toggle-open');
    const closeIcon = toggle.querySelector('.nav__toggle-close');

    if (openIcon && closeIcon) {
      openIcon.style.display = isOpen ? 'block' : 'none';
      closeIcon.style.display = isOpen ? 'none' : 'block';
    }
  }

  /**
   * Close mobile nav when clicking outside
   */
  function handleClickOutside(event) {
    const menu = document.querySelector('.nav__menu');
    const toggle = document.querySelector('.nav__toggle');

    if (!menu || !toggle) return;
    if (!menu.classList.contains('nav__menu--open')) return;

    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
      menu.classList.remove('nav__menu--open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  /**
   * Close mobile nav when pressing Escape
   */
  function handleEscape(event) {
    if (event.key !== 'Escape') return;

    const menu = document.querySelector('.nav__menu');
    const toggle = document.querySelector('.nav__toggle');

    if (!menu || !toggle) return;
    if (!menu.classList.contains('nav__menu--open')) return;

    menu.classList.remove('nav__menu--open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }

  /**
   * Close mobile nav when clicking a nav link
   */
  function handleNavLinkClick() {
    const menu = document.querySelector('.nav__menu');
    const toggle = document.querySelector('.nav__toggle');

    if (!menu || !toggle) return;
    if (window.innerWidth >= 768) return;

    menu.classList.remove('nav__menu--open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  // ==========================================================================
  // Smooth Scroll Enhancement
  // ==========================================================================

  /**
   * Check if user prefers reduced motion
   */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Handle smooth scroll for anchor links with offset for sticky header
   */
  function handleSmoothScroll(event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();

    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });

    // Update URL without triggering scroll
    history.pushState(null, '', targetId);
  }

  // ==========================================================================
  // Active Navigation State
  // ==========================================================================

  /**
   * Update active nav link based on scroll position
   */
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
    const scrollPosition = window.scrollY + headerHeight + 100;

    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('nav__link--active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('nav__link--active');
      }
    });
  }

  // ==========================================================================
  // Form Enhancement
  // ==========================================================================

  /**
   * Handle contact form submission
   */
  function handleFormSubmit(event) {
    const form = event.target;
    if (!form.classList.contains('contact-form')) return;

    // Basic form validation is handled by HTML5
    // This could be extended for AJAX submission if needed
  }

  // ==========================================================================
  // Scroll Progress Indicator
  // ==========================================================================

  /**
   * Update scroll progress bar width
   */
  function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    scrollProgress.style.width = `${scrollPercent}%`;
  }

  // ==========================================================================
  // Back to Top Button
  // ==========================================================================

  /**
   * Show/hide back to top button based on scroll position
   */
  function updateBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    if (window.scrollY > 500) {
      backToTop.classList.add('back-to-top--visible');
    } else {
      backToTop.classList.remove('back-to-top--visible');
    }
  }

  /**
   * Scroll to top of page
   */
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  }

  // ==========================================================================
  // Scroll-triggered Animations
  // ==========================================================================

  /**
   * Initialize Intersection Observer for scroll animations
   */
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            // Optionally unobserve after animation
            // observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

  // ==========================================================================
  // Initialization
  // ==========================================================================

  function init() {
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    // Mobile navigation
    const navToggle = document.querySelector('.nav__toggle');
    if (navToggle) {
      navToggle.addEventListener('click', toggleMobileNav);
    }

    // Close mobile nav on outside click
    document.addEventListener('click', handleClickOutside);

    // Close mobile nav on Escape
    document.addEventListener('keydown', handleEscape);

    // Close mobile nav on link click
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
    });

    // Smooth scroll for anchor links
    document.addEventListener('click', handleSmoothScroll);

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', scrollToTop);
    }

    // Scroll animations
    initScrollAnimations();

    // Combined scroll handler for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(() => {
        updateActiveNav();
        updateScrollProgress();
        updateBackToTop();
      });
    }, { passive: true });

    // Initial states
    updateActiveNav();
    updateScrollProgress();
    updateBackToTop();

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? DARK : LIGHT);
      }
    });
  }

  // Run init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
