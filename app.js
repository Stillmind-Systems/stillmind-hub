// Smooth scrolling for navigation links
document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

function trackDownload(downloadName, href) {
    const safeName = String(downloadName || 'Download').slice(0, 200);
    const safeHref = String(href || '').slice(0, 500);
    console.log(`Download initiated: ${safeName}`);
    if (safeHref) console.log(`Download link: ${safeHref}`);
    console.log(`%c🚀 Stillmind Hub - Download tracked`, 'color: #00ffff; font-size: 16px; font-weight: bold;');
}

// Download tracking + disable "coming soon" cards
document.querySelectorAll('.download-card').forEach(card => {
    const isDisabled = card.classList.contains('download-card-disabled');
    if (isDisabled) {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        const prevent = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };
        card.addEventListener('click', prevent);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') prevent(e);
        });
        return;
    }

    card.addEventListener('click', function(e) {
        const anchor = e.target.closest('a');
        if (anchor) {
            trackDownload(this.dataset.download, anchor.getAttribute('href'));
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Mouse glow effects on cards
document.querySelectorAll('.card, .download-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
    });
});

// Parallax effect for hero
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const hero = document.querySelector('.hero');
            if (hero) hero.style.transform = `translateY(${window.pageYOffset * -0.5}px)`;
            ticking = false;
        });
        ticking = true;
    }
});

// Dynamic footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle (future-proof)
function toggleMobileMenu() {
    // Implementation for mobile hamburger if added later
}

// Download picker (visitors choose, then download)
const DOWNLOADS = {
    desktop: [
        { id: 'windows', label: 'Windows (x64) — EXE', href: 'apps/stillmind-tool.exe', available: true, name: 'Stillmind Tool (Windows)' },
        { id: 'linux', label: 'Linux — AppImage / tar.gz (bientôt)', href: '', available: false, name: 'Linux build' },
        { id: 'mac-intel', label: 'MacBook Intel — DMG (bientôt)', href: '', available: false, name: 'macOS Intel build' },
        { id: 'mac-silicon', label: 'Apple Silicon (M1/M2/M3) — DMG (bientôt)', href: '', available: false, name: 'macOS Apple Silicon build' }
    ],
    mobile: [
        { id: 'android', label: 'Android — APK', href: 'apps/logic-time-machine.apk', available: true, name: 'Logic Time Machine (Android)' },
        { id: 'ios', label: 'iOS — App Store / TestFlight (bientôt)', href: '', available: false, name: 'iOS app' }
    ]
};

function $(id) {
    return document.getElementById(id);
}

function renderPlatforms(category) {
    const platformSelect = $('dl-platform');
    if (!platformSelect) return;
    platformSelect.innerHTML = '';

    (DOWNLOADS[category] || []).forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.id;
        opt.textContent = item.label;
        opt.disabled = !item.available;
        platformSelect.appendChild(opt);
    });

    if (platformSelect.options.length > 0) {
        const firstEnabled = Array.from(platformSelect.options).find(o => !o.disabled) || platformSelect.options[0];
        platformSelect.value = firstEnabled.value;
    }
}

function currentSelection() {
    const category = $('dl-category')?.value || 'desktop';
    const platform = $('dl-platform')?.value || '';
    const item = (DOWNLOADS[category] || []).find(x => x.id === platform);
    return { category, platform, item };
}

function updateDownloadUI() {
    const hint = $('dl-hint');
    const btn = $('dl-button');
    const link = $('dl-direct-link');
    const { item } = currentSelection();

    if (!hint || !btn || !link) return;

    if (!item) {
        btn.disabled = true;
        link.textContent = 'Voir le lien';
        link.setAttribute('href', '#downloads');
        hint.textContent = 'Choisis une option.';
        return;
    }

    if (!item.available || !item.href) {
        btn.disabled = true;
        link.textContent = 'Indisponible';
        link.setAttribute('href', '#downloads');
        hint.textContent = 'Cette version n’est pas encore disponible.';
        return;
    }

    btn.disabled = false;
    link.textContent = item.href;
    link.setAttribute('href', item.href);
    hint.textContent = 'Prêt. Clique sur “Télécharger”.';
}

function startDownload(item) {
    if (!item?.available || !item?.href) return;

    // Force a download intent using a temporary anchor.
    const a = document.createElement('a');
    a.href = item.href;
    a.download = '';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();

    trackDownload(item.name, item.href);
}

const categorySelect = $('dl-category');
const platformSelect = $('dl-platform');
const downloadBtn = $('dl-button');

if (categorySelect && platformSelect && downloadBtn) {
    renderPlatforms(categorySelect.value);
    updateDownloadUI();

    categorySelect.addEventListener('change', () => {
        renderPlatforms(categorySelect.value);
        updateDownloadUI();
    });

    platformSelect.addEventListener('change', updateDownloadUI);

    downloadBtn.addEventListener('click', () => {
        const { item } = currentSelection();
        startDownload(item);
    });
}
