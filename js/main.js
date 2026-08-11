/**
 * ATOMICA Landing Page Interactive Scripts
 * Описание: Плавный скролл, анимации появления блоков (Intersection Observer), 
 * мобильное меню и базовая валидация форм.
 * 
 * Changelog:
 * [2026-08-11] v1.0.0 - Initial creation of main.js with core interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Анимации появления блоков при скролле (Intersection Observer)
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
                observer.unobserve(entry.target); // Анимируем только один раз
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // 3. Мобильное меню (Hamburger) - базовая заготовка
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('is-active');
            menuToggle.setAttribute('aria-expanded', 
                navMenu.classList.contains('is-active')
            );
        });
    }

    // 4. Валидация контактной формы (заглушка для Фазы 2)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Здесь будет интеграция с Formspree или backend
            alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
        });
    }

    console.log('ATOMICA Interactive Runtime Initialized.');
});