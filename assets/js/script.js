// script.js

// Variables y configuraciones base (para WhatsApp y Teléfono)
const siteConfig = {
    wpNumber: "595981123456",
    wpMessage: "Hola, me gustaría consultar sobre los servicios del Taller San Rafael.",
    callPhone: "+595981123456"
};

// Función Global para abrir WhatsApp
function abrirWhatsApp(customMessage = null) {
    const phone = siteConfig.wpNumber.replace(/\D/g, ''); // Limpiar no numéricos
    const msg = customMessage || siteConfig.wpMessage;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}



// Función para seleccionar servicio y scrollear al contacto
function cotizarServicio(serviceName) {
    const select = document.getElementById('contact-service');
    // En lugar de scrollear a toda la sección, scrolleamos al formulario directamente
    const formContainer = document.getElementById('contact-form').parentElement;

    if (select) {
        select.value = serviceName;
    }

    if (formContainer) {
        const headerOffset = 80; // Compensación por el header fijo
        const elementPosition = formContainer.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    showToast(`Servicio seleccionado: ${serviceName}`);
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {

    // Lista de servicios secundarios (estáticos ahora)
    const secondaryServices = [
        "Rectificar ejes de levas",
        "Rectificar cojinetes de levas",
        "Colocar y ajustar bujes de levas",
        "Rectificar cuello de cigüeñal y enroscar",
        "Rectificar interiores de bielas",
        "Confeccionar bujes de bielas",
        "Encasquillar alojamiento de túnel de bancadas",
        "Cambiar / escariar guías de válvulas",
        "Rectificar superficie lado cárter",
        "Soldadura tapa motor frío",
        "Metalar y tornear bielas/bancadas",
        "Probar metales de bancada",
        "Radioscopía (detección de fisuras)",
        "Cambiar anillo de cámara",
        "Encasquillar asiento de válvula",
        "Repasar túnel de bancadito",
        "Relleno y rectificado de cuello trasero de block"
    ];

    const secContainer = document.getElementById('secondary-services-container');
    if (secContainer) {
        secContainer.innerHTML = secondaryServices.map(srv => `
            <li>${srv} <span class="btn-cotizar-mini" onclick="cotizarServicio('${srv}')">Cotizar</span></li>
        `).join('');
    }

    // Asignar enlaces directos a botones de Whatsapp
    const wpBtns = document.querySelectorAll('.whatsapp-link');
    if (wpBtns.length > 0) {
        wpBtns.forEach(btn => {
            btn.href = `https://wa.me/${siteConfig.wpNumber}?text=${encodeURIComponent(siteConfig.wpMessage)}`;
        });
    }

    const callBtn = document.getElementById('call-float');
    if (callBtn) {
        callBtn.href = `tel:${siteConfig.callPhone}`;
    }

    // Ocultar el preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.remove('overflow-hidden');
        }, 800);
    }

    // 2. Navegación Desktop: Cambio de color al hacer scroll
    const nav = document.querySelector('nav');

    // 2. Lógica del Acordeón (Vanilla JS)
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', function () {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // 3. Manejo del Formulario de Contacto Frontend
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            const phone = document.getElementById('contact-phone').value;
            const service = document.getElementById('contact-service').value;
            const messageText = document.getElementById('contact-message').value;

            if (name.trim() && phone.trim() && service && messageText.trim()) {
                const formattedName = name.trim().charAt(0).toUpperCase() + name.trim().slice(1);
                const message = `Hola, soy ${formattedName}.\nMi número es ${phone}.\n\n - Problema: ${service}\n - Descripción: ${messageText}\n\nQuisiera asistencia. Gracias.`;
                abrirWhatsApp(message);

                showToast('¡Redirigiendo a WhatsApp para enviar su consulta!');
                contactForm.reset();
            } else {
                showToast('Por favor, completa los campos obligatorios (*).');
            }
        });
    }

    // 3.5. Manejo del Menú Flotante
    const floatingToggle = document.getElementById('floating-toggle');
    const floatingMenu = document.querySelector('.floating-menu');
    const floatingIcon = document.getElementById('floating-icon');

    if (floatingToggle) {
        floatingToggle.addEventListener('click', () => {
            floatingMenu.classList.toggle('active');

            // Cambiar icono
            if (floatingMenu.classList.contains('active')) {
                floatingIcon.classList.remove('fa-plus');
                floatingIcon.classList.add('fa-chevron-down');
            } else {
                floatingIcon.classList.remove('fa-chevron-down');
                floatingIcon.classList.add('fa-plus');
            }
        });
    }

    // 4. Highlight Nav Link on Scroll (Intersection Observer)
    const sections = document.querySelectorAll('header[id], section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length > 0 && navLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3 // Se activa cuando el 30% de la sección es visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');

                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        const href = link.getAttribute('href');

                        // Si estamos en proceso o confianza, pintamos el item de "Proceso"
                        if ((currentId === 'proceso' || currentId === 'confianza') && href === '#proceso') {
                            link.classList.add('active');
                        } else if (href === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(sec => {
            observer.observe(sec);
        });
    }

    // 6. Lógica de visibilidad del Nav (Scroll Down = Mostrar, Scroll Up = Ocultar)
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('nav');

    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Si bajamos más de 50px, se oculta. Si subimos, se muestra.
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                navbar.classList.add('nav-hidden');
            } else if (currentScrollY < lastScrollY || currentScrollY <= 50) {
                navbar.classList.remove('nav-hidden');
            }

            lastScrollY = currentScrollY;
        }, { passive: true });
    }
});

// Mostrar Toast
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.className = "show";
    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
}
