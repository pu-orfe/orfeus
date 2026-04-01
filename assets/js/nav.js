/**
 * Accessible navigation handling.
 * - Hamburger toggle for mobile (≤768px)
 * - Dropdown aria-expanded, keyboard nav (Arrow keys, Escape), focus trapping
 */
(() => {
  /* ── Hamburger menu ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    function openMenu() {
      navLinks.classList.add('nav-links--open');
      hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      navLinks.classList.remove('nav-links--open');
      hamburger.setAttribute('aria-expanded', 'false');
    }

    function menuIsOpen() {
      return hamburger.getAttribute('aria-expanded') === 'true';
    }

    hamburger.addEventListener('click', () => {
      if (menuIsOpen()) {
        closeMenu();
      } else {
        openMenu();
        // Focus the first link in the menu
        const firstLink = navLinks.querySelector('a, button');
        if (firstLink) firstLink.focus();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menuIsOpen()) {
        closeMenu();
        hamburger.focus();
      }
    });

    // Close when clicking outside the nav
    document.addEventListener('click', e => {
      if (menuIsOpen() && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    // Close menu when viewport grows past the breakpoint
    const mql = window.matchMedia('(min-width: 1101px)');
    mql.addEventListener('change', e => {
      if (e.matches && menuIsOpen()) closeMenu();
    });
  }

  /* ── Dropdown menus ── */
  const items = document.querySelectorAll('.nav-item');

  items.forEach(item => {
    const trigger = item.querySelector('[aria-haspopup="true"]');
    const dropdown = item.querySelector('.nav-dropdown');
    if (!trigger || !dropdown) return;

    const links = Array.from(dropdown.querySelectorAll('a'));

    function open() {
      item.classList.add('nav-item--open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    function close() {
      item.classList.remove('nav-item--open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    function isOpen() {
      return trigger.getAttribute('aria-expanded') === 'true';
    }

    // Button triggers (More) toggle on click
    if (trigger.tagName === 'BUTTON') {
      trigger.addEventListener('click', e => {
        e.preventDefault();
        if (isOpen()) {
          close();
        } else {
          open();
          if (links.length) links[0].focus();
        }
      });
    }

    // Keyboard on trigger
    trigger.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        open();
        if (links.length) links[0].focus();
      } else if (e.key === 'Escape') {
        if (isOpen()) {
          e.preventDefault();
          close();
          trigger.focus();
        }
      }
    });

    // Keyboard on dropdown items
    links.forEach((link, i) => {
      link.addEventListener('keydown', e => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            if (i < links.length - 1) links[i + 1].focus();
            break;
          case 'ArrowUp':
            e.preventDefault();
            if (i > 0) links[i - 1].focus();
            else trigger.focus();
            break;
          case 'Escape':
            e.preventDefault();
            close();
            trigger.focus();
            break;
          case 'Tab':
            // If tabbing out of last item (forward) or first item (backward), close
            if (!e.shiftKey && i === links.length - 1) close();
            if (e.shiftKey && i === 0) close();
            break;
        }
      });
    });

    // Close when focus leaves the nav-item entirely
    item.addEventListener('focusout', () => {
      requestAnimationFrame(() => {
        if (!item.contains(document.activeElement)) close();
      });
    });

    // Sync aria-expanded with hover state
    item.addEventListener('mouseenter', () => {
      trigger.setAttribute('aria-expanded', 'true');
    });
    item.addEventListener('mouseleave', () => {
      if (!item.classList.contains('nav-item--open')) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    // Initialize
    trigger.setAttribute('aria-expanded', 'false');
  });

  /* ── Shrink nav on scroll ── */
  const nav = document.querySelector('.main-nav');
  if (nav) {
    nav.classList.add('nav-large');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.classList.remove('nav-large');
      } else {
        nav.classList.add('nav-large');
      }
    }, { passive: true });
  }
})();
