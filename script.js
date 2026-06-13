// script.js

// script.js

// Variable global para los datos cargados
let activeData = null;

// Valores por defecto (Placeholders)
const defaultData = {
    heroTitle: "San Rafael Taller",
    heroSubtitle: "Especialistas en Rectificacion y Mecanica General",
    servicesTitle: "Nuestros Servicios",
    servicesSubtitle: "Soluciones integrales con la mas alta tecnologia para el motor de su vehiculo",

    // Servicios principales
    service1Title: "Rectificación de Motor",
    service1Desc: "Servicio completo de rectificacion para devolver la potencia original a su motor.",
    service2Title: "Cigüeñal",
    service2Desc: "Rectificado y pulido de apoyos para garantizar el ajuste perfecto.",
    service3Title: "Block de motor",
    service3Desc: "Cepillado, encamisado, alesado y reparacion de block.",
    service4Title: "Cilindros y Camisas",
    service4Desc: "Bruñido y encamisado de cilindros con tolerancias exactas.",
    service5Title: "Tapa de motor",
    service5Desc: "Cepillado, rectificado de valvulas, encasquillado, prueba hidraulica integral y armado.",
    service6Title: "Servicios Complementarios",
    service6Desc: "Alineacion, prueba hidraulica de motores, armado de partes y motores, diagnostico de fallas, asesoramiento tecnico.",

    // Otros Servicios (Lista secundaria)
    secondaryServices: [
        "Rectificar ejes de levas",
        "Rectificar cojinetes de levas",
        "Cambiar y ajustar bujes de levas",
        "Rectificar cuello de cigüeñal y enroscar",
        "Rectificar interiores de bielas",
        "Confeccionar bujes de bielas",
        "Encajillar alojamiento de túnel de bancada",
        "Cambiar/escariar guía de válvulas",
        "Rectificar superficie lado cárter",
        "Soldadura tapa motor frio",
        "Metalar y tornear bielas/bancadas",
        "Probar alojamiento de bancadas",
        "Probar metales de bancada",
        "Radioscopía (detección de fisuras)",
        "Precapados y metalizados",
        "Cambiar anillo de cámara",
        "Encasquillar asiento de válvula",
        "Reparar túnel de bancadito",
        "Relleno y rectificado de cuello trasero de block"
    ],

    // Bloque de Confianza
    trust1Text: "+20 Años de Experiencia",
    trust2Text: "Especialidad en Reparaciones",
    trust3Text: "Servicio Garantizado",

    // Proceso de Trabajo
    process1Title: "Diagnostico",
    process1Desc: "Evaluacion inicial y desarme meticuloso del motor o pieza.",
    process2Title: "Presupuesto",
    process2Desc: "Detalle transparente de repuestos y mano de obra necesaria.",
    process3Title: "Reparacion",
    process3Desc: "Mecanizado y rectificado con maquinaria de alta precision.",
    process4Title: "Entrega",
    process4Desc: "Armado, control de calidad y entrega en tiempo y forma.",

    // Nosotros
    aboutText: "Somos un taller con mas de 20 años de experiencia en la rectificacion de motores. Nuestro compromiso es brindar soluciones duraderas para todo tipo de motores. Contamos con taller de mecanizado completo, banco de pruebas de motor a inyeccion electronica, escaner y herramientas especiales para todas las marcas. Hacemos envios al interior, armado de motores, retiros de motores, presupuestos a coordinar, entrega de motores empacados o en cajon de madera.",

    // Imágenes
    heroImg: "",
    trustImg: "humber.jpeg",
    aboutImg: "nosotros.jpeg",
    serviceBg1: "",
    serviceBg2: "",
    serviceBg3: "",
    serviceBg4: "",
    serviceBg5: "",
    serviceBg6: "",

    // CTA
    ctaTitle: "¿Listo para darle nueva vida a su motor?",
    ctaText: "Contactenos hoy mismo para recibir asesoramiento tecnico y un presupuesto a su medida.",

    // WhatsApp Config
    wpNumber: "595981123456",
    wpMessage: "Hola, me gustaría consultar sobre los servicios del Taller San Rafael.",

    // Call Config
    callPhone: "+595981123456",

    // Estilo
    accentColor: "#e53e3e",
    accentColor2: "hsla(0, 61%, 48%, 1.00)",
    useGradient: false,
    gradientAngle: 135
};

// Función para obtener los datos actuales (LocalStorage o Default como fallback)
function getSiteData() {
    if (activeData) return activeData;

    const stored = localStorage.getItem('siteData_sanrafael');
    if (stored) {
        try {
            const data = JSON.parse(stored);
            return { ...defaultData, ...data };
        } catch (e) {
            return defaultData;
        }
    }
    return defaultData;
}

// Función principal para inicializar los datos
function initAppData() {
    activeData = getSiteData();

    // Renderizar o inicializar panel
    if (document.getElementById('hero-title')) {
        renderContent();
    }
    if (document.getElementById('admin-app')) {
        initAdminPanel();
    }

    // --- OCULTAR PRELOADER (FORZADO) ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.remove('overflow-hidden');
        }, 800);
    }
}

// Función para reemplazar los textos en la página pública
function renderContent() {
    const data = getSiteData();

    // Aplicar colores dinámicos
    const root = document.documentElement;
    root.style.setProperty('--color-accent', data.accentColor);
    root.style.setProperty('--color-accent-hover', data.accentColor + 'dd'); // Efecto simple de transparencia

    if (data.useGradient === true || data.useGradient === "true") {
        const grad = `linear-gradient(${data.gradientAngle}deg, ${data.accentColor}, ${data.accentColor2})`;
        root.style.setProperty('--accent-gradient', grad);
        // También podemos aplicarlo a elementos específicos que soporten degradados
    } else {
        root.style.setProperty('--accent-gradient', data.accentColor);
    }

    // Función auxiliar para actualizar innerText si el elemento existe
    const updateText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    };

    updateText('hero-title', data.heroTitle);
    updateText('hero-subtitle', data.heroSubtitle);

    updateText('services-title', data.servicesTitle);
    updateText('services-subtitle', data.servicesSubtitle);

    updateText('srv1-title', data.service1Title);
    updateText('srv1-desc', data.service1Desc);
    updateText('srv2-title', data.service2Title);
    updateText('srv2-desc', data.service2Desc);
    updateText('srv3-title', data.service3Title);
    updateText('srv3-desc', data.service3Desc);
    updateText('srv4-title', data.service4Title);
    updateText('srv4-desc', data.service4Desc);
    updateText('srv5-title', data.service5Title);
    updateText('srv5-desc', data.service5Desc);
    updateText('srv6-title', data.service6Title);
    updateText('srv6-desc', data.service6Desc);

    updateText('trust1-text', data.trust1Text);
    updateText('trust2-text', data.trust2Text);
    updateText('trust3-text', data.trust3Text);

    updateText('proc1-title', data.process1Title);
    updateText('proc1-desc', data.process1Desc);
    updateText('proc2-title', data.process2Title);
    updateText('proc2-desc', data.process2Desc);
    updateText('proc3-title', data.process3Title);
    updateText('proc3-desc', data.process3Desc);
    updateText('proc4-title', data.process4Title);
    updateText('proc4-desc', data.process4Desc);

    updateText('about-text', data.aboutText);

    // Imágenes
    const heroBg = document.getElementById('hero-bg');
    if (heroBg) {
        // Si el usuario no ha puesto una imagen, usamos fondo_principal.png por defecto
        const imgToUse = data.heroImg || "fondo_principal.png";
        const bgUrl = encodeURI(imgToUse).replace(/'/g, "\\'");
        heroBg.style.backgroundImage = `url('${bgUrl}')`;
    }

    const trustImg = document.getElementById('trust-img');
    if (trustImg && data.trustImg) trustImg.innerHTML = `<img src="${data.trustImg}" alt="Confianza" class="w-full h-full object-cover rounded-lg">`;

    const aboutImg = document.getElementById('about-img');
    if (aboutImg && data.aboutImg) aboutImg.innerHTML = `<img src="${data.aboutImg}" alt="Nosotros" class="w-full h-full object-cover rounded-lg">`;

    // Fondos de servicios (Buscamos todos para incluir clones)
    for (let i = 1; i <= 6; i++) {
        const backgrounds = document.querySelectorAll(`#srv${i}-bg`);
        const imgUrl = data[`serviceBg${i}`];

        backgrounds.forEach(bg => {
            if (imgUrl) {
                const bgUrl = encodeURI(imgUrl).replace(/'/g, "\\'");
                bg.style.backgroundImage = `url('${bgUrl}')`;
                bg.style.opacity = "0"; // Reset para escritorio si no hay hover
            } else {
                bg.style.backgroundImage = 'none';
            }
        });
    }

    updateText('cta-title', data.ctaTitle);
    updateText('cta-text', data.ctaText);

    // WhatsApp Btns
    const wpBtns = document.querySelectorAll('.whatsapp-link');
    if (wpBtns.length > 0 && data.wpNumber) {
        wpBtns.forEach(btn => {
            btn.href = `https://wa.me/${data.wpNumber}?text=${encodeURIComponent(data.wpMessage)}`;
        });
    }

    // Call Btn (Mobile only)
    const callBtn = document.getElementById('call-float');
    if (callBtn && data.callPhone) {
        callBtn.href = `tel:${data.callPhone}`;
    }

    // Renderizar servicios secundarios (Lista del acordeón)
    const secContainer = document.getElementById('secondary-services-container');
    if (secContainer && data.secondaryServices) {
        secContainer.innerHTML = data.secondaryServices.map(srv => `
            <li>${srv} <span class="btn-cotizar-mini" onclick="cotizarServicio('${srv}')">Cotizar</span></li>
        `).join('');
    }

    // Inicializar carrusel si la función existe (Efecto infinito en móvil)
    if (typeof initServiceCarousel === 'function') {
        initServiceCarousel();
    }
}

// Función Global para abrir WhatsApp
function abrirWhatsApp(customMessage = null) {
    const data = getSiteData();
    const phone = data.wpNumber.replace(/\D/g, ''); // Limpiar no numéricos
    const msg = customMessage || data.wpMessage;
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
    // Iniciar carga de datos (Firebase -> LocalStorage -> Default)
    initAppData();

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

    // --- LÓGICA DEL PANEL DE ADMINISTRACIÓN ---
    // (Ya no llamamos a initAdminPanel aquí porque lo hace initAppData)
});

// ==========================================
// FUNCIONES DEL PANEL DE ADMINISTRACIÓN
// ==========================================
function initAdminPanel() {
    // Ocultar preloader
    setTimeout(() => {
        togglePreloader(false);
    }, 1000);
    document.body.classList.add('loaded');
    populateAdminForm();
}

// Acordeón del panel de administración
const adminHeaders = document.querySelectorAll('.admin-section-header');
adminHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const section = header.closest('.admin-section');
        header.classList.toggle('active');
        if (section) section.classList.toggle('active');

        const content = header.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            content.style.paddingTop = "0";
            content.style.paddingBottom = "0";
        } else {
            content.style.paddingTop = "1.5rem";
            content.style.paddingBottom = "1.5rem";
            // Esperar un instante a que aplique el padding para calcular bien el scrollHeight
            setTimeout(() => {
                content.style.maxHeight = content.scrollHeight + 50 + "px";
            }, 10);
        }
    });
});

// Botón para añadir servicio secundario
const addSecBtn = document.getElementById('add-sec-service');
if (addSecBtn) {
    addSecBtn.addEventListener('click', () => {
        const data = getSiteData();
        if (!data.secondaryServices) data.secondaryServices = [];
        data.secondaryServices.push('');
        renderSecondaryServicesEditor();
    });
}

// Guardar cambios
const saveBtn = document.getElementById('save-btn');
if (saveBtn) {
    saveBtn.addEventListener('click', () => {
        saveAdminData();
    });
}

// Restablecer valores
const resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que deseas restablecer todos los textos a sus valores por defecto? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('siteData');
            populateAdminForm();
            showToast('Valores restablecidos correctamente');
        }
    });
}


// Rellenar el formulario de admin con los datos actuales
function populateAdminForm() {
    const data = getSiteData();
    Object.keys(data).forEach(key => {
        const input = document.getElementById('input-' + key);
        if (input) {
            if (input.type === 'checkbox') {
                input.checked = data[key] === true || data[key] === "true";
            } else {
                input.value = data[key];
            }
        }
    });

    // Cargar lista de servicios secundarios
    renderSecondaryServicesEditor();
}

// Renderizar la lista editable de servicios secundarios
function renderSecondaryServicesEditor() {
    const listContainer = document.getElementById('secondary-services-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    const data = getSiteData();
    const services = data.secondaryServices || [];

    services.forEach((service, index) => {
        const div = document.createElement('div');
        div.className = "flex gap-2 items-center mb-2 w-full";
        div.innerHTML = `
            <input type="text" class="form-input mb-0 py-1 text-sm sec-service-input flex-1" value="${service}" placeholder="Nombre del servicio">
            <button type="button" class="text-gray-500 hover:text-accent p-1" onclick="deleteSecService(${index})">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        listContainer.appendChild(div);
    });

    // Actualizar la altura del contenedor padre si está abierto
    refreshSectionHeight(listContainer);
}

// Función para recalcular la altura del acordeón cuando el contenido crece
function refreshSectionHeight(element) {
    const content = element.closest('.admin-section-content');
    if (content && content.style.maxHeight) {
        content.style.maxHeight = content.scrollHeight + 100 + "px";
    }
}

// Eliminar servicio de la lista (Global para el onclick)
window.deleteSecService = function (index) {
    const data = getSiteData();
    data.secondaryServices.splice(index, 1);
    renderSecondaryServicesEditor();
};


// Guardar los datos del formulario en localStorage
function saveAdminData() {
    const newData = {};
    const baseKeys = Object.keys(defaultData);

    baseKeys.forEach(key => {
        if (key === 'secondaryServices') {
            const secInputs = document.querySelectorAll('.sec-service-input');
            newData[key] = Array.from(secInputs).map(input => input.value).filter(val => val.trim() !== '');
            return;
        }

        const input = document.getElementById('input-' + key);
        if (input) {
            if (input.type === 'checkbox') {
                newData[key] = input.checked;
            } else {
                newData[key] = input.value;
            }
        } else {
            newData[key] = defaultData[key];
        }
    });

    // Guardar en LocalStorage (Respuesta inmediata)
    localStorage.setItem('siteData_sanrafael', JSON.stringify(newData));
    activeData = newData;

    toggleButtonLoading('save-btn', true);
    setTimeout(() => {
        toggleButtonLoading('save-btn', false);
        showToast('Cambios guardados localmente para previsualización.');
        renderContent(); // Refrescar cambios visuales inmediatamente
    }, 500);
}

// Función auxiliar para botones con carga
function toggleButtonLoading(btnId, isLoading) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const spinner = btn.querySelector('.fa-circle-notch');

    if (isLoading) {
        btn.disabled = true;
        btn.classList.add('opacity-70', 'cursor-not-allowed');
        if (spinner) spinner.style.display = 'inline-block';
    } else {
        btn.disabled = false;
        btn.classList.remove('opacity-70', 'cursor-not-allowed');
        if (spinner) spinner.style.display = 'none';
    }
}

// Mostrar/Ocultar Preloader manualmente
function togglePreloader(show, message = "") {
    const preloader = document.getElementById('preloader');
    const textEl = document.getElementById('preloader-text');
    if (!preloader) return;

    if (show) {
        if (textEl && message) {
            textEl.innerText = message;
            textEl.style.opacity = '1';
        }
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        document.body.classList.add('overflow-hidden');
    } else {
        preloader.style.opacity = '0';
        if (textEl) textEl.style.opacity = '0';

        setTimeout(() => {
            preloader.style.display = 'none';
            preloader.style.visibility = 'hidden';
            if (textEl) textEl.innerText = '';
            document.body.classList.remove('overflow-hidden');
        }, 700);
    }
}

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
