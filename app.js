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

// Download tracking
document.querySelectorAll('.download-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (e.target.closest('a')) {
            const downloadName = this.dataset.download;
            console.log(`Download initiated: ${downloadName}`);
            console.log(`%c🚀 Stillmind Hub - Download tracked`, 'color: #00ffff; font-size: 16px; font-weight: bold;');
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
            hero.style.transform = `translateY(${window.pageYOffset * -0.5}px)`;
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
