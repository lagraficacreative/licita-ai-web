// Menú móvil compartido para todas las páginas de la web comercial.
// Inyecta un botón hamburguesa y despliega .nav-links en pantallas <860px.
(function () {
  function init() {
    var header = document.querySelector('header');
    var nav = header && header.querySelector('.nav');
    var links = nav && nav.querySelector('.nav-links');
    if (!header || !nav || !links) return;

    // Botón hamburguesa
    var btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Abrir menú');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    nav.appendChild(btn);

    // Clonar "Iniciar sesión" dentro del menú desplegable (oculto en escritorio)
    var login = nav.querySelector('.nav-cta .btn-ghost');
    if (login) {
      var a = document.createElement('a');
      a.href = login.getAttribute('href') || '#';
      a.textContent = (login.textContent || 'Iniciar sesión').trim();
      a.className = 'nav-login-mobile';
      links.appendChild(a);
    }

    btn.addEventListener('click', function () {
      var open = header.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });

    // Cerrar el menú al pulsar un enlace
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') header.classList.remove('open');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
