// Scripts personalizados para Friends Food

// Sistema de precarga inteligente
class Preloader {
  constructor() {
    this.preloadedPages = new Map();
    this.preloadedImages = new Set();
    this.init();
  }

  init() {
    // Precargar páginas principales en background
    this.preloadPages();
    // Precargar imágenes adicionales
    this.preloadImages();
  }

  async preloadPages() {
    const pages = [
      'pages/home.html',
      'pages/empresa.html', 
      'pages/servicios.html',
      'pages/gente.html',
      'pages/planta.html',
      'pages/calidad.html',
      'pages/clientes.html',
      'pages/contactos.html'
    ];

    // Precargar páginas en paralelo sin bloquear
    pages.forEach(page => {
      this.preloadPage(page);
    });
  }

  async preloadPage(pagePath) {
    try {
      const response = await fetch(pagePath);
      const content = await response.text();
      this.preloadedPages.set(pagePath, content);
    } catch (error) {
      console.log(`No se pudo precargar: ${pagePath}`);
    }
  }

  preloadImages() {
    const images = [
      'assets/img/vegetables-573958_1920.webp',
      'assets/img/restaurant-2618315_1920.webp',
      'assets/img/spaghetti-4456186_1920.webp',
      'assets/img/bakery-1868396_1920.webp',
      'assets/img/bananamade-2762930.webp',
      'assets/img/juanpphotoandvideo-1587830.webp',
      'assets/img/klaus-nielsen-6287261.webp',
      'assets/img/reneterp-3217146.webp',
      'assets/img/sebastian-coman-photography-1598188-3437689.webp',
      'assets/img/vadimmarkin-2102934.webp',
      'assets/img/vanmalidate-784632.webp',
      'assets/img/yente-van-eynde-1263034-2403391.webp',
      'assets/img/yente-van-eynde-1263034-2403392.webp'
    ];

    images.forEach(src => {
      const img = new Image();
      img.onload = () => this.preloadedImages.add(src);
      img.src = src;
    });
  }

  getPreloadedPage(pagePath) {
    return this.preloadedPages.get(pagePath);
  }

  isImagePreloaded(src) {
    return this.preloadedImages.has(src);
  }
}

// Inicializar precargador
const preloader = new Preloader();

// Función para animación suave de scroll
function smoothScrollToTop(duration = 350) {
  const start = window.pageYOffset;
  const startTime = performance.now();
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Función de easing
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    
    window.scrollTo(0, start * (1 - easeOutCubic));
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

// Sistema de carga dinámica de secciones
class DynamicLoader {
  constructor() {
    this.contentContainer = document.getElementById('content');
    this.loader = document.getElementById('loader');
    this.currentPage = 'home'; // Default page
    this.init();
  }

  init() {
    // Interceptar clics en enlaces de navegación
    document.addEventListener('click', (e) => {
      // Buscar el elemento nav-link más cercano (puede ser el target o un padre)
      const navLink = e.target.closest('.nav-link');
      if (navLink) {
        e.preventDefault();
        const href = navLink.getAttribute('href');
        this.loadPage(href);
      }
    });

    // Manejar el botón atrás del navegador
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.page) {
        this.loadPage(e.state.page, false); // Don't update history on popstate
      } else {
        this.loadPage('home', false); // Default to home if no state
      }
    });

    // Detectar la ruta actual al cargar la página
    const currentPath = window.location.pathname;
    let initialPage = 'home';
    
    if (currentPath.includes('empresa')) initialPage = 'empresa';
    else if (currentPath.includes('servicios')) initialPage = 'servicios';
    else if (currentPath.includes('gente')) initialPage = 'gente';
    else if (currentPath.includes('planta')) initialPage = 'planta';
    else if (currentPath.includes('calidad')) initialPage = 'calidad';
    else if (currentPath.includes('clientes')) initialPage = 'clientes';
    else if (currentPath.includes('contactos')) initialPage = 'contactos';
    
    // Cargar la página correspondiente a la ruta actual
    this.loadPage(initialPage, false);
    
    // Inicializar el estado active del navbar
    this.updateActiveNavLink(initialPage);
  }

  async loadPage(pagePath, updateHistory = true) {
    try {
      this.showLoader();

      let page = 'home';
      // Si pagePath ya es un nombre de página directo (sin includes), usarlo directamente
      if (pagePath === 'empresa' || pagePath === 'servicios' || pagePath === 'gente' || 
          pagePath === 'planta' || pagePath === 'calidad' || pagePath === 'clientes' || 
          pagePath === 'contactos' || pagePath === 'home') {
        page = pagePath;
      } else {
        // Si es una ruta completa, detectar la página
        if (pagePath.includes('empresa')) page = 'empresa';
        else if (pagePath.includes('servicios')) page = 'servicios';
        else if (pagePath.includes('gente')) page = 'gente';
        else if (pagePath.includes('planta')) page = 'planta';
        else if (pagePath.includes('calidad')) page = 'calidad';
        else if (pagePath.includes('clientes')) page = 'clientes';
        else if (pagePath.includes('contactos')) page = 'contactos';
        else if (pagePath.includes('home')) page = 'home';
      }

      if (updateHistory) {
        const url = page === 'home' ? '/' : `/${page}`;
        history.pushState({ page }, '', url);
      }

      // Intentar usar contenido precargado primero
      const preloadedContent = preloader.getPreloadedPage(`pages/${page}.html`);
      let content;
      
      if (preloadedContent) {
        content = preloadedContent;
      } else {
        // Fallback: cargar desde el servidor
        const response = await fetch(`pages/${page}.html`);
        if (!response.ok) throw new Error('Error al cargar la página');
        content = await response.text();
      }
      
      this.contentContainer.innerHTML = content;

      // Retardo de 100ms después de cargar el contenido
      await new Promise(resolve => setTimeout(resolve, 100));

      this.currentPage = page;
      this.updateActiveNavLink(page);
      
      await this.loadPartials();

      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }

      // Scroll al top después de cargar todo y antes de ocultar el preload
      window.scrollTo(0, 0);
      
      this.hideLoader();
    } catch (error) {
      console.error('Error cargando página:', error);
      this.hideLoader();
      this.contentContainer.innerHTML = '<div class="text-center text-red-600 py-8">No se pudo cargar el contenido. Intente nuevamente.</div>';
    }
  }

  updateActiveNavLink(currentPage) {
    // Remover clase active de todos los enlaces
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Agregar clase active al enlace correspondiente (solo enlaces de navegación)
    const activeLink = document.querySelector(`a.nav-link[href*="${currentPage}"]`);
    
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  showLoader() {
    if (this.loader) {
      // Animación del contenedor principal (fondo blanco) - fade-in simple
      this.loader.style.opacity = '1';
      this.loader.style.pointerEvents = 'auto';
    }
  }

  hideLoader() {
    // Retardo inicial de 200ms antes de ejecutar todo el contenido interno
    setTimeout(() => {
      if (this.loader) {      
        // Slide-up del fondo blanco completo
        this.loader.style.transform = 'translateY(-100%)';
        
        setTimeout(() => {
          // Resetear contenedor principal
          this.loader.style.opacity = '0';
          this.loader.style.pointerEvents = 'none';
        }, 300);

        setTimeout(() => {
          // Resetear contenedor principal
          this.loader.style.transform = 'translateY(0)';
        }, 700);
      }
    }, 100);
  }

  async loadPartials() {
    const partialElements = document.querySelectorAll('[data-load-partial]');

    for (const element of partialElements) {
      const partialPath = element.getAttribute('data-load-partial');
      
      try {
        const response = await fetch(`partials/${partialPath}`);
        if (response.ok) {
          const content = await response.text();
          element.innerHTML = content;
        }
      } catch (error) {
        console.error('Error cargando partial:', error);
      }
    }
    
    // Cargar mapa si estamos en la página de planta
    if (this.currentPage === 'planta') {
      this.loadMap();
    }
  }

  loadMap() {
    // Esperar un poco para asegurar que el DOM esté listo
    setTimeout(() => {
      const mapContainer = document.getElementById('map-container');
      const mapPlaceholder = document.getElementById('map-placeholder');
      const iframe = document.getElementById('google-map');
      
      if (mapContainer && iframe) {
        // Configurar el src del iframe
        iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.1234567890123!2d-58.4779853!3d-34.6720437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc944502b4d15%3A0x9dfd26bd57f0bb39!2sAv.%20Larraz%C3%A1bal%203559%2C%20C1439ECJ%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1701234567890!5m2!1ses!2sar";
        
        // Cuando el iframe se cargue, mostrar el mapa y ocultar el placeholder
        iframe.onload = function() {
          iframe.style.opacity = '1';
          if (mapPlaceholder) {
            mapPlaceholder.style.display = 'none';
          }
        };
        
        // Si hay error, mostrar mensaje
        iframe.onerror = function() {
          if (mapPlaceholder) {
            mapPlaceholder.innerHTML = '<div class="text-center"><i class="fas fa-exclamation-triangle text-red-400 text-4xl mb-2"></i><p class="text-red-600">Error al cargar el mapa</p></div>';
          }
        };
      }
    }, 1500); // Esperar 1.5 segundos después de cargar los partials
  }
}

// Esperar a que la página se cargue completamente
window.addEventListener('load', function() {
  // Mostrar el loader unificado al cargar la página
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.opacity = '1';
    loader.style.pointerEvents = 'auto';
  }
});

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar sistema de carga dinámica
  const dynamicLoader = new DynamicLoader();

  // Elementos del DOM
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const menuOverlay = document.getElementById('menuOverlay');
  const mainHeader = document.getElementById('mainHeader');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const body = document.body;

  // Menú hamburguesa mobile
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('translate-x-full');
      mainNav.classList.toggle('opacity-0');
      mainNav.classList.toggle('invisible');
      mainNav.classList.toggle('translate-x-0');
      mainNav.classList.toggle('opacity-100');
      mainNav.classList.toggle('visible');
      menuOverlay.classList.toggle('hidden');
      body.classList.toggle('overflow-hidden');
    });
  }

  // Cerrar menú al hacer clic en overlay o enlaces
  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  function closeMenu() {
    mainNav.classList.add('translate-x-full', 'opacity-0', 'invisible');
    mainNav.classList.remove('translate-x-0', 'opacity-100', 'visible');
    menuOverlay.classList.add('hidden');
    body.classList.remove('overflow-hidden');
  }

  // Header transparente y letras blancas en top
  function updateHeader() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const headerSpan = mainHeader.querySelector('span.text-2xl');
    const headerPinkSpan = mainHeader.querySelector('span.text-pink');

    if (scrollTop === 0) {
      // En la parte superior
      mainHeader.classList.remove('bg-white', 'text-gray-900', 'shadow-md');
      mainHeader.classList.add('bg-transparent', 'text-white', 'shadow-none');
      
      navLinks.forEach(link => {
        // Preservar el estado active
        if (!link.classList.contains('active')) {
          link.classList.remove('text-celeste', 'text-pink', 'text-white', 'text-gray-900', 'md:text-gray-900');
          link.classList.add('text-gray-900', 'md:text-white');
        }
      });
      
      if (headerSpan) {
        headerSpan.classList.remove('text-celeste');
        headerSpan.classList.add('text-white');
      }
      
      if (headerPinkSpan) {
        headerPinkSpan.classList.remove('text-yellow-300');
        headerPinkSpan.classList.add('text-pink');
      }
      
      if (menuToggle) {
        menuToggle.classList.remove('text-gray-900');
        menuToggle.classList.add('text-white');
      }
    } else {
      // Al hacer scroll
      mainHeader.classList.remove('bg-transparent', 'text-white', 'shadow-none');
      mainHeader.classList.add('bg-white', 'text-gray-900', 'shadow-md');
      
      navLinks.forEach(link => {
        // Preservar el estado active
        if (!link.classList.contains('active')) {
          link.classList.remove('text-white', 'md:text-white');
          link.classList.add('text-gray-900', 'md:text-gray-900');
        }
      });
      
      if (headerSpan) {
        headerSpan.classList.remove('text-white');
        headerSpan.classList.add('text-celeste');
      }
      
      if (headerPinkSpan) {
        headerPinkSpan.classList.remove('text-yellow-300');
        headerPinkSpan.classList.add('text-pink');
      }
      
      if (menuToggle) {
        menuToggle.classList.remove('text-white');
        menuToggle.classList.add('text-gray-900');
      }
    }
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader);

  // Mostrar/ocultar el botón según el scroll con animación suave
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 20) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  // Animación de scroll al top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      smoothScrollToTop(350);
    });
  }
});

// Función para expandir/contraer texto en controles de calidad
function toggleText(button) {
  const textElement = button.previousElementSibling;
  const isExpanded = textElement.classList.contains('line-clamp-none');
  
  if (isExpanded) {
    textElement.classList.remove('line-clamp-none');
    textElement.classList.add('line-clamp-1');
    button.textContent = 'Ver más';
  } else {
    textElement.classList.remove('line-clamp-1');
    textElement.classList.add('line-clamp-none');
    button.textContent = 'Ver menos';
  }
} 