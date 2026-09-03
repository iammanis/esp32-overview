/* Espressive — minimal progressive enhancement.
   Everything on this site works without JavaScript; this only adds the theme
   toggle, TOC highlighting and mobile-menu dismissal. */
(function () {
  'use strict';

  /* ---------------- theme toggle ---------------- */
  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------------- close the mobile nav on navigation ---------------- */
  var navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    document.querySelectorAll('.site-nav a').forEach(function (link) {
      link.addEventListener('click', function () { navToggle.checked = false; });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') navToggle.checked = false;
    });
  }

  /* ---------------- highlight the current section in the TOC ---------------- */
  var tocLinks = Array.prototype.slice.call(
    document.querySelectorAll('.toc a[href^="#"]')
  );

  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    var targets = [];

    tocLinks.forEach(function (link) {
      var id = decodeURIComponent(link.getAttribute('href').slice(1));
      var el = document.getElementById(id);
      if (el) {
        byId[id] = link;
        targets.push(el);
      }
    });

    var visible = new Set();

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });

        var firstVisible = null;
        for (var i = 0; i < targets.length; i++) {
          if (visible.has(targets[i].id)) { firstVisible = targets[i].id; break; }
        }

        tocLinks.forEach(function (l) { l.removeAttribute('data-current'); });
        if (firstVisible && byId[firstVisible]) {
          byId[firstVisible].setAttribute('data-current', 'true');
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    targets.forEach(function (t) { observer.observe(t); });
  }
})();
