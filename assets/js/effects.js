/**
 * effects.js
 * Manejo de efectos visuales y animaciones de scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
});

/**
 * Inicializa el efecto de aparición al scrollear
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/**
 * Inicializa el carrusel de servicios para dispositivos móviles con efecto infinito real
 */
function initServiceCarousel() {
    const container = document.getElementById('services-container');
    if (!container) return;

    // Limpiar clones previos siempre para empezar de cero
    container.querySelectorAll('.clone').forEach(el => el.remove());

    // --- CORRECCIÓN: El efecto infinito y los clones SOLO son para MÓVIL ---
    if (window.innerWidth > 768) {
        // En desktop mostramos el grid normal, mostramos el contenedor por si estaba oculto
        container.style.opacity = '1';
        return;
    }

    const originalCards = Array.from(container.querySelectorAll('.service-card'));
    if (originalCards.length < 3) return;

    const prevBtn = document.getElementById('prev-service');
    const nextBtn = document.getElementById('next-service');

    // --- Lógica de Infinito Real (Doble Clonación para fluidez) ---
    // Clonamos los dos últimos y los ponemos al inicio
    const lastTwo = originalCards.slice(-2).map(card => card.cloneNode(true));
    // Clonamos los dos primeros y los ponemos al final
    const firstTwo = originalCards.slice(0, 2).map(card => card.cloneNode(true));

    [...lastTwo, ...firstTwo].forEach(clone => {
        clone.classList.add('clone');
        clone.id = '';
        clone.querySelectorAll('[id]').forEach(el => el.id = '');
    });

    lastTwo.reverse().forEach(clone => container.prepend(clone));
    firstTwo.forEach(clone => container.appendChild(clone));

    const totalCards = container.querySelectorAll('.service-card');
    const cardWidth = originalCards[0].offsetWidth + 10; // ancho + gap (debe coincidir con CSS)

    // Ajustar posición inicial al primer elemento real
    const setInitialPos = () => {
        const singleWidth = container.querySelector('.service-card').offsetWidth + 10;
        container.scrollLeft = singleWidth * 2;
        // Una vez posicionado, mostramos el contenedor con un fade in
        requestAnimationFrame(() => {
            container.style.opacity = '1';
        });
    };

    // Ejecutar lo antes posible
    if (document.readyState === 'complete') {
        setInitialPos();
    } else {
        window.addEventListener('load', setInitialPos);
    }

    // Salto infinito silencioso (Loop)
    let isJumping = false;
    container.addEventListener('scroll', () => {
        if (isJumping) return;

        const scrollPos = container.scrollLeft;
        const singleWidth = container.querySelector('.service-card').offsetWidth + 10;
        const totalWidth = singleWidth * originalCards.length;

        // Si llegamos a los clones del final
        if (scrollPos >= singleWidth * (originalCards.length + 2)) {
            isJumping = true;
            container.style.scrollBehavior = 'auto';
            container.scrollLeft = scrollPos - totalWidth;
            container.style.scrollBehavior = 'smooth';
            setTimeout(() => isJumping = false, 50);
        }
        // Si llegamos a los clones del inicio
        else if (scrollPos <= singleWidth * 0.5) {
            isJumping = true;
            container.style.scrollBehavior = 'auto';
            container.scrollLeft = scrollPos + totalWidth;
            container.style.scrollBehavior = 'smooth';
            setTimeout(() => isJumping = false, 50);
        }
    });

    // Navegación con flechas
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            container.style.scrollBehavior = 'smooth';
            container.scrollBy({ left: -(container.querySelector('.service-card').offsetWidth + 10), behavior: 'smooth' });
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            container.style.scrollBehavior = 'smooth';
            container.scrollBy({ left: (container.querySelector('.service-card').offsetWidth + 10), behavior: 'smooth' });
        });
    }

    // Efecto de foco (Blur)
    const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        root: container,
        threshold: 0.6
    });

    container.querySelectorAll('.service-card').forEach(card => carouselObserver.observe(card));
}
