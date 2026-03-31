/**
 * Accessible navigation dropdown handling.
 * Manages aria-expanded state, keyboard navigation (Arrow keys, Escape),
 * and focus trapping within dropdown menus.
 */
(() => {
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
})();
