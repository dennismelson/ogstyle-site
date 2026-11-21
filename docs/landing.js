// OGSTYLE landing: menu, scroll reveals, carousel buttons, hero parallax.
// First-party, no dependencies. Animates transform/opacity only.
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ---- Mobile menu ----
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (m) {
      if (m.matches) setOpen(false);
    });
  }

  // ---- Scroll reveals ----
  var items = document.querySelectorAll('.reveal');
  var show = function (el) {
    el.classList.add('is-in');
    el.addEventListener('transitionend', function done(e) {
      if (e.target !== el) return;
      el.classList.add('is-done');
      el.removeEventListener('transitionend', done);
    });
  };
  if (reduce.matches || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in', 'is-done'); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    items.forEach(function (el) { io.observe(el); });
  }

  // ---- Carousel buttons ----
  var track = document.getElementById('screens-track');
  if (track) {
    var buttons = document.querySelectorAll('.carousel__btn');
    var update = function () {
      var max = track.scrollWidth - track.clientWidth - 2;
      buttons.forEach(function (b) {
        var dir = Number(b.getAttribute('data-dir'));
        b.disabled = dir < 0 ? track.scrollLeft <= 2 : track.scrollLeft >= max;
      });
    };
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var slide = track.querySelector('.shot');
        var step = slide ? slide.getBoundingClientRect().width + 18 : 260;
        var count = Math.max(1, Math.floor(track.clientWidth / step));
        track.scrollBy({
          left: Number(b.getAttribute('data-dir')) * step * count,
          behavior: reduce.matches ? 'auto' : 'smooth'
        });
      });
    });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // ---- Hero phone parallax: desktop, fine pointer, motion allowed ----
  var phone = document.querySelector('[data-parallax]');
  var desktop = window.matchMedia('(min-width: 900px) and (pointer: fine)');
  if (phone) {
    var ticking = false;
    var apply = function () {
      ticking = false;
      if (reduce.matches || !desktop.matches) {
        phone.style.transform = '';
        return;
      }
      var y = Math.min(window.scrollY, 900);
      phone.style.transform = 'translate3d(0,' + (y * -0.08).toFixed(1) + 'px,0)';
    };
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(apply);
      }
    }, { passive: true });
    reduce.addEventListener('change', apply);
    desktop.addEventListener('change', apply);
  }
})();
