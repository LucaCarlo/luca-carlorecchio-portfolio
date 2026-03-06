/* ============================================
   LUCA CARLORECCHIO - PORTFOLIO
   JavaScript Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === Navigation Scroll Effect ===
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // === Mobile Menu Toggle ===
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // === Smooth Scroll for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = nav.offsetHeight + 20;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Scroll Animations (Intersection Observer) ===
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // === Active Nav Link on Scroll ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                if (!link.classList.contains('nav-link--cta')) {
                    link.style.color = 'var(--text-primary)';
                }
            }
        });
    }, { passive: true });

    // === Parallax on Hero Grid ===
    const heroGrid = document.querySelector('.hero-grid');
    if (heroGrid) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroGrid.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
        }, { passive: true });
    }

    // === Magnetic Effect on Buttons (Desktop only) ===
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.btn--primary').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // === Typing Effect on Hero Subtitle (subtle) ===
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.borderRight = '2px solid var(--accent)';

        let i = 0;
        const typeInterval = setInterval(() => {
            subtitle.textContent += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 1000);
            }
        }, 50);
    }
});
