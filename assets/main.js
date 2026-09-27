/* ZW portfolio — reveal on scroll + lightbox */
(function () {
  // reveal
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // lightbox
  var figs = Array.prototype.slice.call(document.querySelectorAll('.fig img'));
  if (!figs.length) return;
  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.innerHTML =
    '<button class="lb-btn lb-close">Close ✕</button>' +
    '<button class="lb-btn lb-nav lb-prev">← Prev</button>' +
    '<img alt="">' +
    '<button class="lb-btn lb-nav lb-next">Next →</button>' +
    '<div class="lb-bar"><span class="lb-cap"></span><span class="lb-count"></span></div>';
  document.body.appendChild(lb);
  var img = lb.querySelector('img'),
      cap = lb.querySelector('.lb-cap'),
      cnt = lb.querySelector('.lb-count'),
      cur = 0;
  function show(i) {
    cur = (i + figs.length) % figs.length;
    img.src = figs[cur].src;
    var c = figs[cur].closest('.fig').querySelector('figcaption');
    cap.textContent = c ? c.textContent.replace(/\s+/g, ' ').trim() : '';
    cnt.textContent = (cur + 1) + ' / ' + figs.length;
  }
  figs.forEach(function (f, i) {
    f.addEventListener('click', function () { lb.classList.add('open'); show(i); document.body.style.overflow = 'hidden'; });
  });
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(cur - 1); });
  lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(cur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
})();

/* homepage media carousel — auto-rotate, arrows, dots; each slide links to its page */
(function () {
  var car = document.querySelector('.car');
  if (!car) return;
  var slides = car.querySelectorAll('.car-slide'),
      dotsWrap = car.querySelector('.car-dots'),
      idx = 0, timer = null;
  slides.forEach(function (s, i) {
    var d = document.createElement('button');
    d.className = 'car-dot' + (i === 0 ? ' on' : '');
    d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    d.addEventListener('click', function (e) { e.preventDefault(); go(i); restart(); });
    dotsWrap.appendChild(d);
  });
  var dots = dotsWrap.querySelectorAll('.car-dot');
  function go(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('on', k === idx); });
    dots.forEach(function (d, k) { d.classList.toggle('on', k === idx); });
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(function () { go(idx + 1); }, 4000);
  }
  car.querySelector('.car-prev').addEventListener('click', function (e) { e.preventDefault(); go(idx - 1); restart(); });
  car.querySelector('.car-next').addEventListener('click', function (e) { e.preventDefault(); go(idx + 1); restart(); });
  car.addEventListener('mouseenter', function () { clearInterval(timer); });
  car.addEventListener('mouseleave', restart);
  go(0); restart();
})();
