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
