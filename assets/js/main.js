// Scripts personalizados para Friends Food

// Función para simular slideUp de jQuery
function slideUp(element, duration = 400) {
  element.style.transition = `height ${duration}ms ease-out`;
  element.style.height = '0px';
  element.style.overflow = 'hidden';
  setTimeout(() => {
    element.style.display = 'none';
  }, duration);
}

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

// Esperar a que la página se cargue completamente
window.addEventListener('load', function() {
  const preload = document.getElementById('preload');
  if (preload) {
    slideUp(preload, 400);
  }
});

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
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
        link.classList.remove('text-celeste', 'text-pink', 'text-white', 'text-gray-900', 'md:text-gray-900');
        link.classList.add('text-gray-900', 'md:text-white');
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
        link.classList.remove('text-white', 'md:text-white');
        link.classList.add('text-gray-900', 'md:text-gray-900', 'text-celeste');
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