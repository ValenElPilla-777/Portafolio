// Cambio de categorías
const categoryButtons = document.querySelectorAll('.category-btn');
const projectSections = document.querySelectorAll('.projects-section');

categoryButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Obtiene la categoría del botón presionado (ej: "programacion")
    const category = this.getAttribute('data-category');
    
    // Quita la clase 'active' de todos los botones
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    // Agrega la clase 'active' solo al botón presionado
    this.classList.add('active');
    
    // Oculta todas las secciones de proyectos
    projectSections.forEach(section => section.classList.remove('active'));
    // Muestra la sección correcta (ej: "programacion-projects")
    const targetSection = document.getElementById(`${category}-projects`);
    if (targetSection) {
      targetSection.classList.add('active');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
    // Datos de los proyectos (se mantiene la estructura por si decides volver a usarla)
    const projectsData = {
        'c-projects': {
            title: 'LENGUAJE C',
            details: [
                { 
                    image: 'assets/images/sistsuper.png', 
                    title: 'SISTEMA DE GESTIÓN DE SUPER-MERCADO COMPLETO', 
                    description: 'Sistema integral desarrollado en C que incluye gestión de usuarios por jerarquia, control de acceso, inventario, reportes diarios, etc.' 
                },
                { 
                    image: 'assets/images/cajaregistradora.png', 
                    title: 'SISTEMA DE CAJA REGISTRADORA', 
                    description: 'Sistema integral desarrollado en C que simula un sistema basico de caja resgistradora' 
                },
                { 
                    image: 'assets/images/inventarioo.png', 
                    title: 'GESTIÓN DE INVENTARIOS', 
                    description: 'Sistema de control de stock con registro de entradas/salidas, alertas de niveles mínimos, generación de reportes en diferentes formatos y backup automático de datos.' 
                }
            ],
            otherProjects: [
                "Sistema de facturación para pequeñas empresas",
                "Calculadora científica con funciones avanzadas",
                "Simulador de procesos de planificación CPU",
                "Herramienta de compresión de archivos básica"
            ]
        },
        'mysql-projects': {
            title: 'MySQL',
            details: [
                { 
                    image: 'assets/images/BD1.png', 
                    title: 'SISTEMA PARA COMERCIO DE HARDWARE', 
                    description: 'Base de datos relacional para gestión de inventarios, clientes, empleados, etc.' 
                },
            ],
            otherProjects: [
                "Base de datos para sistema de reservas de hotel",
                "Sistema de gestión de biblioteca digital",
                "DB para app de tracking de hábitos",
                "Esquema para red social especializada"
            ]
        },
        'web-projects': {
            title: 'PÁGINAS WEB',
            details: [
                { 
                    image: 'assets/images/marvel.png', 
                    title: 'MARVEL FANWEB', 
                    description: 'Sitio web hecho para FANS de la franquicia MARVEL STUDIOS, incluyendo en el tres secciones: Peliculas/Series, Videojuegos y Comics' 
                },
                { 
                    image: 'assets/images/cocacola.png', 
                    title: 'TIENDA ONLINE DE COCA-COLA', 
                    description: 'E-commerce completo con catálogo de productos, filtros avanzados, carrito de compras, pasarela de pagos simulada, y paginas para diferentes paises' 
                },
                { 
                    image: 'assets/images/agario.png', 
                    title: 'JUEGO ESTILO AGAR.IO', 
                    description: 'Videojuego inspirado/copiado en Agar.io, es un juego que se basa en comer a otros jugadores y crecer en tamaño.' 
                }
            ],
            otherProjects: [
                "Landing page para lanzamiento de producto",
                "Blog personal con sistema de comentarios",
                "Single Page Application con Vue.js",
                "Sitio web para evento especial con countdown"
            ]
        },
        'arduino-projects': {
            title: 'ARDUINO',
            details: [
                { 
                    image: 'assets/images/autoarduino.jpg', 
                    title: 'ROBOT CON SENSOR DE APROXIMACION', 
                    description: 'Un robot con cuatro ruedas, el cual se puede manejar a traves de Bluetooth o andar por si solo y no chocarse.' 
                },
                { 
                    image: 'assets/images/medidortemp.png', 
                    title: 'ESTACIÓN METEOROLÓGICA', 
                    description: 'Estación de monitoreo ambiental con sensores de temperatura, humedad y presión. Datos visualizados en LCD.' 
                },
            ],
            otherProjects: [
                "Sistema de riego automático para plantas",
                "Alarma de seguridad con sensor de movimiento y notificaciones",
                "Brazo robótico controlado por potenciómetros",
                "Medidor de consumo eléctrico con visualización"
            ]
        },
        'premiere-projects': {
            title: 'ADOBE PREMIERE',
            details: [
                { 
                    image: 'assets/images/yt.png', 
                    title: 'EDICION DE VIDEOS PARA CANAL DE GAMING', 
                    description: 'Edito videos para mi canal de YT "ValenElPilla" (no apto para todo publico)' 
                },
            ],
            otherProjects: [
                "Video corporativo para emprendimiento local",
                "Tutoriales en formato vertical para redes sociales",
                "Edición de videos para canal de gaming",
                "Reel demostrativo de habilidades de edición"
            ]
        },
        'photoshop-projects': {
            title: 'ADOBE PHOTOSHOP',
            details: [
                { 
                    image: 'assets/images/logoyt2.png', 
                    title: 'CREACION DE LOGOS/MINIATURAS PARA Youtube', 
                    description: 'Creacion de logo para mi canal de Youtube y miniaturas que hago para mis videos'
                },
            ],
            otherProjects: [
                "Creación de GIFs animados",
                "Diseño de miniaturas para YouTube",
                "Restauración y coloreado de fotografías antiguas",
                "Diseño de texturas para modelos 3D"
            ]
        }
    };

    // Variables globales
    const overlay = document.getElementById('project-details-overlay');
    const overlayInner = document.getElementById('overlay-inner');
    const viewMoreButtons = document.querySelectorAll('.view-more-btn');
    const closeButton = document.querySelector('.close-details-btn');
    let currentProjectId = null;

    // Inicializar eventos
    function initProjects() {
        viewMoreButtons.forEach(button => {
            button.addEventListener('click', function() {
                const projectId = this.getAttribute('data-id');
                showProjectDetails(projectId);
            });
        });

        if (closeButton) {
            closeButton.addEventListener('click', closeProjectDetails);
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeProjectDetails();
            }
        });

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeProjectDetails();
            }
        });
    }

    // Mostrar detalles del proyecto
    function showProjectDetails(projectId) {
        currentProjectId = projectId;
        const projectData = projectsData[projectId];
        
        if (!projectData) {
            console.error('Datos del proyecto no encontrados:', projectId);
            return;
        }

        overlayInner.innerHTML = buildProjectOverlayHTML(projectData);
        overlay.classList.add('active');
        initCarousels();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Cerrar detalles del proyecto
    function closeProjectDetails() {
        overlay.classList.remove('active');
        currentProjectId = null;
    }

    // Construir HTML para el overlay (FUNCIÓN MODIFICADA)
    function buildProjectOverlayHTML(projectData) {
        let html = `<div class="overlay-header"><h3>${projectData.title}</h3></div>`;

        // 1. Sección del carrusel principal
        if (projectData.details && projectData.details.length > 0) {
            html += `
                <div class="details-section">
                    <h4>DETALLES DE PROYECTOS</h4>
                    <div class="detail-carousel-container">
                        <div class="detail-carousel" id="detail-carousel">
                            <div class="carousel-slides">
            `;
            
            projectData.details.forEach((detail, index) => {
                html += `
                    <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                        <div class="detail-content">
                            <div class="detail-image">
                                <img src="${detail.image}" alt="${detail.title}" onerror="this.src='assets/images/placeholder.jpg'">
                            </div>
                            <div class="project-info">
                                <h5>${detail.title}</h5>
                                <p>${detail.description}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            html += `
                            </div>
                        </div>
                        <button class="carousel-btn prev-btn">&#10094;</button>
                        <button class="carousel-btn next-btn">&#10095;</button>
                        <div class="carousel-dots">
            `;
            
            projectData.details.forEach((_, index) => {
                html += `<div class="dot ${index === 0 ? 'active' : ''}" data-slide-index="${index}"></div>`;
            });
            
            html += `</div></div></div>`;
        }
        
        // 2. Sección de otros proyectos
        if (projectData.otherProjects && projectData.otherProjects.length > 0) {
            html += `
                <div class="other-projects">
                    <h4>OTROS PROYECTOS REALIZADOS</h4>
                    <div class="projects-list">
            `;
            
            projectData.otherProjects.forEach(project => {
                html += `<div class="project-item">${project}</div>`;
            });
            
            html += `</div></div>`;
        }
        
        return html;
    }

    // Inicializar carruseles (FUNCIÓN MODIFICADA)
    function initCarousels() {
        // Carrusel principal de detalles
        const detailContainer = document.querySelector('.detail-carousel-container');
        if (detailContainer) {
            const slides = detailContainer.querySelectorAll('.carousel-slide');
            const dots = detailContainer.querySelectorAll('.dot');
            const prevBtn = detailContainer.querySelector('.prev-btn');
            const nextBtn = detailContainer.querySelector('.next-btn');
            let currentSlide = 0;

            function showDetailSlide(index) {
                slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
                dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
                currentSlide = index;
            }

            prevBtn.addEventListener('click', () => {
                let newIndex = (currentSlide - 1 + slides.length) % slides.length;
                showDetailSlide(newIndex);
            });

            nextBtn.addEventListener('click', () => {
                let newIndex = (currentSlide + 1) % slides.length;
                showDetailSlide(newIndex);
            });

            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    const index = parseInt(dot.getAttribute('data-slide-index'));
                    showDetailSlide(index);
                });
            });

            showDetailSlide(0); // Asegura que el primer slide se muestre
        }
    }

    // Inicializar la funcionalidad de proyectos
    initProjects();
});