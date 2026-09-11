/* ============================================
   KIT RECENSIONI GOOGLE - dati e interazioni
   Per sostituire un render CSS con una foto:
   metti il file in img/<codice>.jpg (es. img/S1.jpg).
   Per le foto ambientate: img/ambientata-<n>.jpg
   Pannelli livello: img/tier-basic.jpg, tier-standard.jpg, tier-premium.jpg
   Hero: img/hero.jpg  |  Personalizzazione: img/X1.jpg, X2.jpg, X3.jpg
   ============================================ */

const CONTACT_EMAIL = 'lucacarlorecchio25@gmail.com';

const TIERS = {
    basic: {
        name: 'Basic',
        title: 'La card, da sola o protetta',
        desc: 'Cartoncino rigido 10×15 cm, stampa a colori, QR reale della tua scheda. Pronta da appoggiare, incollare o inserire in un porta-card che hai già.',
        options: [
            { code: 'B1', name: 'Basic Card', price: 19, render: 'card', img: 'card-bianca',
              desc: 'Solo la card. Il modo più semplice ed economico per iniziare a raccogliere recensioni.' },
            { code: 'B2', name: 'Basic Card + custodia', price: 25, render: 'sleeve', img: 'card-bianca', tag: 'Più scelto',
              desc: 'Card più custodia trasparente rigida. Protetta da sporco e usura, si sostituisce in un secondo.' },
        ],
    },
    standard: {
        name: 'Standard',
        title: 'Card più supporto da banco',
        desc: 'La card inserita in un supporto in plexiglass che la tiene in vista sul bancone. Arriva già montata: la appoggi e hai finito. Scegli il supporto adatto al tuo spazio.',
        options: [
            { code: 'S3', name: 'Supporto a "L"', price: 35, render: 'stand-l', img: 'card-bianca',
              desc: 'Ingombro minimo, sta ovunque. Ideale per banconi piccoli e casse affollate.' },
            { code: 'S1', name: 'Verticale trasparente', price: 39, render: 'stand-v', img: 'card-bianca', tag: 'Il classico',
              desc: 'Lastra verticale con base. Elegante, discreto, va bene in qualsiasi attività.' },
            { code: 'S2', name: 'Orizzontale trasparente', price: 39, render: 'stand-h', img: 'card-bianca',
              desc: 'Card in formato 15×10 su supporto largo. Per banconi ampi, reception e casse doppie.' },
            { code: 'S5', name: 'Da parete', price: 42, render: 'wall', img: 'card-bianca',
              desc: 'Pannello con distanziali, da fissare vicino alla cassa o all\'uscita quando sul banco non c\'è posto.' },
            { code: 'S4', name: 'Con base pesante', price: 45, render: 'stand-base', img: 'card-bianca',
              desc: 'Base spessa e stabile, non si sposta e non cade. L\'effetto più professionale.' },
        ],
    },
    premium: {
        name: 'Premium',
        title: 'Stampa diretta su materiale rigido',
        desc: 'Niente cartoncino: la grafica è stampata direttamente sul pannello. Più spessore, più resistenza, più presenza. Il supporto da banco è opzionale.',
        options: [
            { code: 'P1', name: 'Forex', price: 55, render: 'forex', img: 'card-bianca',
              desc: 'PVC espanso 3 mm. Leggero, opaco, pulito: l\'ingresso nel rigido.' },
            { code: 'P2', name: 'PVC rigido', price: 59, render: 'pvc', img: 'card-bianca',
              desc: 'Superficie liscia e resistente, resa colori ottima. Si pulisce con un panno.' },
            { code: 'P3', name: 'Plexiglass stampato', price: 69, render: 'plexi-black', img: 'card-nera', tag: 'Il più bello',
              desc: 'Spessore 5 mm, finitura lucida, bianco o nero. Effetto vetrina sul banco.' },
            { code: 'P4', name: 'Acrilico trasparente', price: 75, render: 'acrylic', img: 'card-bianca',
              desc: 'Stampa sul trasparente: la grafica sembra sospesa. Per chi vuole qualcosa di diverso.' },
            { code: 'P5', name: 'Dibond alluminio', price: 85, render: 'dibond', img: 'card-bianca',
              desc: 'Alluminio composito 3 mm. Il più elegante e indistruttibile: studi, cliniche, attività di fascia alta.' },
            { code: 'P6', name: 'Legno o materiali speciali', price: 95, from: true, render: 'wood', img: 'card-bianca',
              desc: 'Legno, sughero, metallo spazzolato. Su richiesta, prezzo a preventivo.' },
        ],
    },
};

const PREMIUM_SUPPORTS = { S3: ['A "L"', 25], S1: ['Verticale trasparente', 29], S2: ['Orizzontale trasparente', 29], S5: ['Da parete', 32], S4: ['Con base pesante', 35] };

const EXTRAS = [
    { code: 'X0', name: 'Standard', price: 0, list: ['Nome della tua attività', 'QR reale della tua scheda Google', 'Grafica del kit, bianca o nera'], swatch: ['#ffffff', '#0a0a0b'] },
    { code: 'X1', name: 'Base', price: 15, list: ['Tutto lo Standard', 'I tuoi colori aziendali', 'Una frase tua: "Grazie per averci scelto"'], swatch: ['#6c63ff', '#34d399', '#fbbc04'] },
    { code: 'X2', name: 'Pro', price: 30, list: ['Tutto il Base', 'Il tuo logo', 'Layout adattato al tuo settore'], swatch: ['#6c63ff', '#b065ff', '#ff6b8b', '#34d399'] },
    { code: 'X3', name: 'Completa', price: 50, list: ['Progetto grafico dedicato', 'Logo, colori, font, messaggio', 'Disposizione su misura, 2 revisioni'], swatch: ['#6c63ff', '#b065ff', '#ff6b8b', '#34d399', '#fbbc04'] },
];

const GALLERY = [
    { file: 'ambientata-1', caption: 'Officina', render: 'stand-v', img: 'card-bianca' },
    { file: 'ambientata-2', caption: 'Barbiere', render: 'stand-base', img: 'card-nera' },
    { file: 'ambientata-3', caption: 'Ristorante', render: 'plexi-black', img: 'card-nera' },
    { file: 'ambientata-4', caption: 'Studio medico', render: 'wall', img: 'card-bianca' },
    { file: 'ambientata-5', caption: 'Negozio', render: 'stand-l', img: 'card-bianca' },
    { file: 'ambientata-6', caption: 'Bar', render: 'sleeve', img: 'card-bianca' },
];

const state = { tier: null, option: null, support: '', extra: EXTRAS[0] };

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const euro = (n) => '€' + n;

function renderHtml(kind, img, size = 'md', code = '') {
    // Se esiste una foto img/<codice>.jpg la usiamo al posto del render CSS
    const photo = code ? `<img class="photo" src="img/${code}.jpg" alt="" onerror="this.remove()" onload="this.parentElement.classList.add('has-photo')">` : '';
    return `${photo}<div class="render render--${kind} render--${size}"><img src="img/${img}.png" alt="" width="1000" height="1500"></div>`;
}

/* ---------- Tiers ---------- */
const panel = $('#tierPanel');
const optionsEl = $('#options');
const addon = $('#premiumAddon');
const supportSel = $('#premiumSupport');

function openTier(key, scroll = true) {
    const tier = TIERS[key];
    state.tier = key;
    state.option = null;
    state.support = '';
    supportSel.value = '';
    $$('.tier').forEach((t) => t.classList.toggle('active', t.dataset.tier === key));
    $('#panelTag').textContent = tier.name;
    $('#panelTitle').textContent = tier.title;
    $('#panelDesc').textContent = tier.desc;
    optionsEl.innerHTML = tier.options.map((o) => `
        <button class="option" type="button" data-code="${o.code}">
            <div class="option-visual">
                ${o.tag ? `<span class="option-tag">${o.tag}</span>` : ''}
                ${renderHtml(o.render, o.img, 'md', o.code)}
            </div>
            <div class="option-body">
                <span class="option-code">${o.code}</span>
                <span class="option-name">${o.name}</span>
                <span class="option-desc">${o.desc}</span>
                <div class="option-foot">
                    <span class="option-price">${o.from ? 'da ' : ''}${euro(o.price)}</span>
                    <span class="option-pick">Scegli</span>
                </div>
            </div>
        </button>`).join('');
    $$('.option', optionsEl).forEach((btn) => btn.addEventListener('click', () => pickOption(btn.dataset.code)));
    addon.hidden = key !== 'premium';
    panel.hidden = false;
    if (scroll) {
        const y = panel.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
    updateSummary();
}

function closeTier() {
    panel.hidden = true;
    state.tier = null; state.option = null; state.support = '';
    $$('.tier').forEach((t) => t.classList.remove('active'));
    updateSummary();
}

function pickOption(code) {
    const tier = TIERS[state.tier];
    state.option = tier.options.find((o) => o.code === code) || null;
    $$('.option', optionsEl).forEach((b) => b.classList.toggle('selected', b.dataset.code === code));
    updateSummary();
}

$$('.tier').forEach((t) => t.addEventListener('click', () => {
    if (t.classList.contains('active')) { closeTier(); return; }
    openTier(t.dataset.tier);
}));
$('#panelClose').addEventListener('click', closeTier);
supportSel.addEventListener('change', () => { state.support = supportSel.value; updateSummary(); });

/* ---------- Extras ---------- */
const extrasEl = $('#extras');
extrasEl.innerHTML = EXTRAS.map((x, i) => `
    <button class="extra ${i === 0 ? 'selected' : ''}" type="button" data-code="${x.code}">
        <img class="extra-photo" src="img/${x.code}.jpg" alt="" onload="this.parentElement.classList.add('has-photo')" onerror="this.remove()">
        <div class="extra-head"><span class="extra-code">${x.code}</span><span class="extra-check"></span></div>
        <span class="extra-name">Personalizzazione ${x.name}</span>
        <span class="extra-price ${x.price === 0 ? 'free' : ''}">${x.price === 0 ? 'Inclusa' : '+' + euro(x.price)}</span>
        <ul class="extra-list">${x.list.map((l) => `<li>${l}</li>`).join('')}</ul>
        <div class="extra-swatch">${x.swatch.map((c) => `<span style="background:${c}"></span>`).join('')}</div>
    </button>`).join('');
$$('.extra', extrasEl).forEach((btn) => btn.addEventListener('click', () => {
    state.extra = EXTRAS.find((x) => x.code === btn.dataset.code);
    $$('.extra', extrasEl).forEach((b) => b.classList.toggle('selected', b === btn));
    updateSummary();
}));

/* ---------- Galleria ---------- */
$('#gallery').innerHTML = GALLERY.map((g) => `
    <figure class="shot" data-animate="fade-up">
        <img src="img/${g.file}.jpg" alt="Card recensioni Google ambientata: ${g.caption}" onerror="this.parentElement.classList.add('missing')">
        <div class="shot-ph">
            ${renderHtml(g.render, g.img, 'sm')}
            <strong>${g.caption}</strong>
            <span>foto in arrivo</span>
        </div>
        <figcaption class="shot-caption">${g.caption}</figcaption>
    </figure>`).join('');

/* ---------- Riepilogo ---------- */
const summary = $('#summary');

function computeTotal() {
    let total = 0;
    const parts = [];
    if (state.option) {
        total += state.option.price;
        parts.push(`${TIERS[state.tier].name} ${state.option.code} · ${state.option.name}`);
    }
    if (state.tier === 'premium' && state.support && PREMIUM_SUPPORTS[state.support]) {
        total += PREMIUM_SUPPORTS[state.support][1];
        parts.push(`supporto ${PREMIUM_SUPPORTS[state.support][0]}`);
    }
    if (state.extra && state.extra.price > 0) {
        total += state.extra.price;
        parts.push(`personalizzazione ${state.extra.name}`);
    }
    return { total, parts, from: !!(state.option && state.option.from) };
}

function updateSummary() {
    const { total, parts, from } = computeTotal();
    const has = !!state.option;
    summary.hidden = !has;
    document.body.classList.toggle('has-summary', has);
    if (!has) return;
    $('#summaryValue').textContent = parts.join(' + ');
    $('#summaryTotal').textContent = (from ? 'da ' : '') + euro(total);
}

/* ---------- Modale richiesta ---------- */
const modal = $('#requestModal');
const form = $('#requestForm');

function openModal() {
    const { total, parts, from } = computeTotal();
    const box = $('#modalSummary');
    if (!state.option) {
        box.innerHTML = `<span class="empty">Nessun kit selezionato: ti mando comunque l'anteprima e poi scegli con calma.</span>`;
    } else {
        box.innerHTML = parts.map((p) => `<div class="row"><span>${p}</span></div>`).join('') +
            `<div class="row total"><span>Totale indicativo, spedizione inclusa</span><strong>${from ? 'da ' : ''}${euro(total)}</strong></div>`;
    }
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => form.attivita.focus(), 50);
}
function closeModal() { modal.hidden = true; document.body.style.overflow = ''; }

$$('[data-open-request]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
$$('[data-close-request]').forEach((b) => b.addEventListener('click', closeModal));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());
    const { total, parts, from } = computeTotal();
    const kit = state.option ? `${parts.join(' + ')} (${from ? 'da ' : ''}${euro(total)})` : 'da decidere dopo l\'anteprima';
    const subject = `Richiesta anteprima Kit Recensioni Google - ${d.attivita}`;
    const body = [
        `Attività: ${d.attivita}`,
        `Nome: ${d.nome || '-'}`,
        `Telefono: ${d.telefono || '-'}`,
        `Email: ${d.email}`,
        `Scheda Google: ${d.google || '-'}`,
        `Kit scelto: ${kit}`,
        `Note: ${d.note || '-'}`,
        '',
        'Vorrei ricevere l\'anteprima gratuita con il nome della mia attività.',
    ].join('\n');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

/* ---------- Nav, animazioni, varie ---------- */
const nav = $('#nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50), { passive: true });

$$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    if (a.hasAttribute('data-open-request')) return;
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
}));

const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const delay = parseInt(en.target.dataset.delay || '0', 10);
        setTimeout(() => en.target.classList.add('visible'), delay);
        io.unobserve(en.target);
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
function observeAll() { $$('[data-animate]:not(.visible)').forEach((el) => io.observe(el)); }
observeAll();

$('#year').textContent = new Date().getFullYear();

// Link diretto a un livello: ?tier=basic|standard|premium
const wanted = new URLSearchParams(location.search).get('tier');
if (wanted && TIERS[wanted]) openTier(wanted, false);
