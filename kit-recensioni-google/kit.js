/* ============================================
   RECENSIONI GOOGLE - pagina vetrina
   Nav, animazioni all'ingresso, lightbox foto
   ============================================ */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------- Nav ---------- */
const nav = $('#nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50), { passive: true });

$$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
}));

/* ---------- Animazioni ---------- */
const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const delay = parseInt(en.target.dataset.delay || '0', 10);
        setTimeout(() => en.target.classList.add('visible'), delay);
        io.unobserve(en.target);
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
$$('[data-animate]').forEach((el) => io.observe(el));

/* ---------- Lightbox ---------- */
const lightbox = $('#lightbox');
const lbImg = $('#lightboxImg');
const lbCaption = $('#lightboxCaption');
const photos = $$('img[data-lightbox]');
let current = -1;

function showPhoto(i) {
    current = (i + photos.length) % photos.length;
    const p = photos[current];
    lbImg.src = p.currentSrc || p.src;
    lbImg.alt = p.alt;
    lbCaption.textContent = p.alt;
}
function openLightbox(i) {
    showPhoto(i);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
}

photos.forEach((p, i) => p.addEventListener('click', () => openLightbox(i)));
$$('[data-lb-close]').forEach((b) => b.addEventListener('click', closeLightbox));
$('[data-lb-prev]').addEventListener('click', () => showPhoto(current - 1));
$('[data-lb-next]').addEventListener('click', () => showPhoto(current + 1));
document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPhoto(current - 1);
    if (e.key === 'ArrowRight') showPhoto(current + 1);
});

// swipe su mobile
let touchX = null;
lightbox.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showPhoto(current + (dx < 0 ? 1 : -1));
    touchX = null;
});

$('#year').textContent = new Date().getFullYear();
