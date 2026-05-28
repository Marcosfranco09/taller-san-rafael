// script.js

// CONFIGURACIÓN DE FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyBPUnHlcXnfdOWZ4u5ZMqnHlimk7AIGqbA",
    authDomain: "taller-san-rafael.firebaseapp.com",
    projectId: "taller-san-rafael",
    storageBucket: "taller-san-rafael.firebasestorage.app",
    messagingSenderId: "676871208009",
    appId: "1:676871208009:web:114e3a47febdebeafb9398",
    measurementId: "G-8JSR09T0WV"
};

// Inicializar Firebase (Versión Compat)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const configDoc = db.collection('configs').doc('siteData');

// Variable global para los datos cargados
let activeData = null;

// Valores por defecto (Placeholders)
const defaultData = {
    heroTitle: "San Rafael Taller",
    heroSubtitle: "Especialistas en Rectificación de Motores y Precisión Mecánica",
    servicesTitle: "Nuestros Servicios",
    servicesSubtitle: "Soluciones integrales con la más alta tecnología y precisión para su motor.",

    // Servicios principales
    service1Title: "Rectificación de Motores",
    service1Desc: "Servicio completo de rectificación para devolver la potencia original a su motor.",
    service2Title: "Cigüeñal",
    service2Desc: "Rectificado y pulido de apoyos para garantizar el ajuste perfecto.",
    service3Title: "Tapas de Cilindro",
    service3Desc: "Frenteado, prueba hidráulica y reparación integral de tapas de cilindro.",
    service4Title: "Cilindros y Camisas",
    service4Desc: "Bruñido y encamisado de cilindros con tolerancias exactas.",
    service5Title: "Bielas y Bancadas",
    service5Desc: "Alineación, rectificado y embujado de bielas y bancadas.",
    service6Title: "Servicios Complementarios",
    service6Desc: "Soldadura, radioscopía y mecanizado de piezas a medida.",

    // Otros Servicios (Lista secundaria)
    secondaryServices: [
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
    ],

    // Bloque de Confianza
    trust1Text: "+20 Años de Experiencia",
    trust2Text: "Calidad Garantizada ISO",
    trust3Text: "Garantía de 6 Meses",

    // Proceso de Trabajo
    process1Title: "Diagnóstico",
    process1Desc: "Evaluación inicial y desarme meticuloso del motor o pieza.",
    process2Title: "Presupuesto",
    process2Desc: "Detalle transparente de repuestos y mano de obra necesaria.",
    process3Title: "Reparación",
    process3Desc: "Mecanizado y rectificado con maquinaria de alta precisión.",
    process4Title: "Entrega",
    process4Desc: "Armado, control de calidad y entrega en tiempo y forma.",

    // Nosotros
    aboutText: "Somos un taller con más de 20 años de experiencia en la rectificación de motores. Nuestro compromiso es brindar soluciones duraderas y de alta precisión para todo tipo de vehículos y maquinarias. Contamos con un equipo de profesionales altamente capacitados y maquinaria de última generación.",

    // Imágenes
    heroImg: "",
    trustImg: "taller.jpeg",
    aboutImg: "",
    serviceBg1: "",
    serviceBg2: "",
    serviceBg3: "",
    serviceBg4: "",
    serviceBg5: "",
    serviceBg6: "",

    // CTA
    ctaTitle: "¿Listo para darle nueva vida a su motor?",
    ctaText: "Contáctenos hoy mismo para recibir asesoramiento técnico y un presupuesto a su medida.",

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

// Función principal para inicializar los datos desde Firebase
async function initAppData() {
    try {
        // Intentar obtener de Firestore
        const doc = await configDoc.get();
        if (doc.exists) {
            console.log("✅ Datos cargados desde Firebase");
            activeData = { ...defaultData, ...doc.data() };
            // Actualizar localstorage para redundancia
            localStorage.setItem('siteData_sanrafael', JSON.stringify(activeData));
        } else {
            console.log("ℹ️ No hay datos en Firebase, usando locales.");
            activeData = getSiteData();
        }
    } catch (e) {
        console.warn("⚠️ Error conectando a Firebase (usando datos locales):", e);
        activeData = getSiteData();
    } finally {
        // Una vez cargados los datos, renderizar o inicializar panel
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
    const loginView = document.getElementById('login-view');
    const adminView = document.getElementById('admin-view');
    const loadingView = document.getElementById('loading-view');
    const loginForm = document.getElementById('login-form');

    // Escuchar el estado de la autenticación de Firebase
    firebase.auth().onAuthStateChanged((user) => {
        // Ocultar preloader con un pequeño retraso para mayor fluidez visual
        setTimeout(() => {
            togglePreloader(false);
        }, 1000);

        // Activar la transición suave del fondo y aparición del panel (vía CSS)
        document.body.classList.add('loaded');

        if (user) {
            // Usuario logueado satisfactoriamente
            if (loginView) loginView.style.display = 'none';
            if (adminView) adminView.style.display = 'block';
            populateAdminForm();
        } else {
            // No hay sesión activa
            if (loginView) loginView.style.display = 'block';
            if (adminView) adminView.style.display = 'none';

            // VERIFICAR BLOQUEO AL CARGAR
            checkLockoutState();
        }
    });

    // Lógica de Login con Firebase Auth
    if (loginForm) {
        const loginError = document.getElementById('login-error');

        // Ocultar error cuando el usuario vuelva a escribir
        loginForm.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                if (loginError) loginError.classList.add('hidden');
            });
        });

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('username').value;
            const pass = document.getElementById('password').value;

            // 1. Comprobar Bloqueo de Seguridad (Rate Limiting)
            const lockoutUntil = parseInt(localStorage.getItem('admin_lockout')) || 0;
            const now = Date.now();

            if (now < lockoutUntil) {
                const minutesLeft = Math.ceil((lockoutUntil - now) / 60000);
                if (loginError) {
                    loginError.textContent = `Acceso suspendido. Intente en ${minutesLeft} minutos.`;
                    loginError.classList.remove('hidden');
                }
                return;
            }

            // Limpiar errores previos
            if (loginError) loginError.classList.add('hidden');

            try {
                // Mostrar estado de carga
                toggleButtonLoading('login-btn', true);

                // Intentar iniciar sesión en Firebase
                await firebase.auth().signInWithEmailAndPassword(email, pass);

                // Limpiar contador de intentos si entra con éxito
                localStorage.removeItem('admin_login_tries');
                localStorage.removeItem('admin_lockout');

                showToast('Sesión iniciada correctamente');
            } catch (error) {
                console.error("Error de login:", error);

                // Incrementar intentos fallidos
                let tries = parseInt(localStorage.getItem('admin_login_tries')) || 0;
                tries++;
                localStorage.setItem('admin_login_tries', tries);

                if (loginError) {
                    if (tries >= 20) {
                        localStorage.setItem('admin_lockout_active', 'true');
                        checkLockoutState();
                    } else {
                        loginError.textContent = 'Correo o contraseña incorrectos. Inténtelo nuevamente.';
                        loginError.classList.remove('hidden');
                    }
                }
            } finally {
                toggleButtonLoading('login-btn', false);
            }
        });
    }

    // Lógica de Desbloqueo por PIN
    const pinInput = document.getElementById('unlock-pin');
    if (pinInput) {
        pinInput.addEventListener('input', (e) => {
            if (e.target.value === '0000') {
                localStorage.removeItem('admin_login_tries');
                localStorage.removeItem('admin_lockout_active');
                showToast('Sistema desbloqueado. Puede intentar de nuevo.');
                e.target.value = '';
                checkLockoutState();
            }
        });
    }
    // Lógica de Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            togglePreloader(true, 'Cerrando sesión...');
            firebase.auth().signOut().then(() => {
                showToast('Sesión cerrada');
            });
        });
    }
}

// Función para verificar el estado de bloqueo
function checkLockoutState() {
    const loginFields = document.getElementById('login-fields');
    const lockoutView = document.getElementById('lockout-view');
    const isLocked = localStorage.getItem('admin_lockout_active') === 'true';

    if (isLocked) {
        if (loginFields) loginFields.classList.add('hidden');
        if (lockoutView) lockoutView.classList.remove('hidden');

        // Limpiar campos por seguridad
        const u = document.getElementById('username');
        const p = document.getElementById('password');
        if (u) u.value = '';
        if (p) p.value = '';
    } else {
        if (loginFields) loginFields.classList.remove('hidden');
        if (lockoutView) lockoutView.classList.add('hidden');
    }
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


// Guardar los datos del formulario en localStorage y Firebase
async function saveAdminData() {
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

    // 1. Guardar en LocalStorage (Respuesta inmediata)
    localStorage.setItem('siteData', JSON.stringify(newData));
    activeData = newData;

    // 2. Intentar guardar en Firebase (Nube)
    try {
        toggleButtonLoading('save-btn', true);
        await configDoc.set(newData);
        showToast('Cambios sincronizados en la nube');
    } catch (e) {
        console.error("Error en Firebase:", e);
        showToast('Guardado local. Error al sincronizar en la nube.');
    } finally {
        toggleButtonLoading('save-btn', false);
    }

    renderContent(); // Refrescar cambios visuales inmediatamente
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
