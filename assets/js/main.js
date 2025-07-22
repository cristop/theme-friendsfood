// Scripts personalizados para Friends Food

$(window).on('load', function() {
  $('#preload').slideUp(400);
});

$(document).ready(function() {
  // Menú hamburguesa mobile
  $('#menuToggle').click(function() {
    $('#mainNav').toggleClass('translate-x-full opacity-0 invisible').toggleClass('translate-x-0 opacity-100 visible');
    $('#menuOverlay').toggleClass('hidden');
    $('body').toggleClass('overflow-hidden');
  });
  $('#menuOverlay, #mainNav a').click(function() {
    $('#mainNav').addClass('translate-x-full opacity-0 invisible').removeClass('translate-x-0 opacity-100 visible');
    $('#menuOverlay').addClass('hidden');
    $('body').removeClass('overflow-hidden');
  });

  // Header transparente y letras blancas en top
  function updateHeader() {
    if ($(window).scrollTop() === 0) {
      $('#mainHeader').removeClass('bg-white text-gray-900 shadow-md').addClass('bg-transparent text-white shadow-none');
      $('.nav-link').removeClass('text-celeste text-pink text-white text-gray-900 md:text-gray-900').addClass('text-gray-900 md:text-white');
      $("#mainHeader span.text-2xl").removeClass('text-celeste').addClass('text-white');
      $("#mainHeader span.text-pink").removeClass('text-yellow-300').addClass('text-pink');
      $('#menuToggle').removeClass('text-gray-900').addClass('text-white');
    } else {
      $('#mainHeader').removeClass('bg-transparent text-white shadow-none').addClass('bg-white text-gray-900 shadow-md');
      $('.nav-link').removeClass('text-white md:text-white').addClass('text-gray-900 md:text-gray-900 text-celeste');
      $("#mainHeader span.text-2xl").removeClass('text-white').addClass('text-celeste');
      $("#mainHeader span.text-pink").removeClass('text-yellow-300').addClass('text-pink');
      $('#menuToggle').removeClass('text-white').addClass('text-gray-900');
    }
  }

  updateHeader();
  $(window).on('scroll', updateHeader);

  // Mostrar/ocultar el botón según el scroll con animación suave (clase show)
  $(window).scroll(function() {
    if ($(this).scrollTop() > 20) {
      $('#scrollTopBtn').addClass('show');
    } else {
      $('#scrollTopBtn').removeClass('show');
    }
  });

  // Animación de scroll al top
  $('#scrollTopBtn').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 350);
    return false;
  });
}); 