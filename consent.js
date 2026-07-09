// ─────────────────────────────────────────────────────────────────────────
//  Consentimiento de cookies + Google Consent Mode v2 + tracking (GA4 / Ads)
//
//  CÓMO ACTIVARLO:  pega tus IDs reales abajo (GA4_ID y/o ADS_ID) y redeploy.
//  Mientras estén vacíos, este archivo NO hace NADA: ni banner ni cookies ni
//  rastreo (así puede estar ya subido sin efectos hasta que tengas los IDs).
//
//  Cumplimiento: por defecto TODO el consentimiento está DENEGADO (Consent
//  Mode v2). Solo se cargan los tags de Google si el usuario pulsa "Aceptar".
//  "Rechazar" es igual de accesible que "Aceptar" (requisito AEPD/RGPD).
// ─────────────────────────────────────────────────────────────────────────
(function () {
  // ⬇️⬇️  PEGA AQUÍ TUS IDs REALES  ⬇️⬇️
  var GA4_ID = '';   // ej.: 'G-XXXXXXXXXX'   (Google Analytics 4)
  var ADS_ID = '';   // ej.: 'AW-XXXXXXXXX'   (Google Ads)
  // ⬆️⬆️  ——————————————————————————  ⬆️⬆️

  var hasTags = !!(GA4_ID || ADS_ID);
  if (!hasTags) return;   // sin IDs configurados → nada que consentir, no mostramos banner

  var STORE_KEY = 'licita_cookie_consent';  // 'granted' | 'denied'

  // Consent Mode v2: por defecto TODO denegado hasta decisión del usuario.
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  var loaded = false;
  function loadTags() {
    if (loaded) return; loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + (GA4_ID || ADS_ID);
    document.head.appendChild(s);
    gtag('js', new Date());
    if (GA4_ID) gtag('config', GA4_ID);
    if (ADS_ID) gtag('config', ADS_ID);
  }
  function grant() {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
    loadTags();
  }
  function save(v) { try { localStorage.setItem(STORE_KEY, v); } catch (_) {} }

  // Si ya hay decisión previa, aplicarla sin volver a mostrar el banner.
  var prev = null;
  try { prev = localStorage.getItem(STORE_KEY); } catch (_) {}
  if (prev === 'granted') { grant(); return; }
  if (prev === 'denied') { return; }

  // Sin decisión previa → mostrar banner.
  function showBanner() {
    if (document.getElementById('lai-cookies')) return;
    var style = document.createElement('style');
    style.textContent =
      "#lai-cookies{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:540px;margin:0 auto;background:#1a2238;color:#fff;border-radius:14px;padding:18px 20px;box-shadow:0 14px 44px rgba(0,0,0,.32);font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:13.5px;line-height:1.55}" +
      "#lai-cookies a{color:#ffb78f;text-decoration:underline}" +
      "#lai-cookies .lai-ck-btns{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap}" +
      "#lai-cookies button{flex:1 1 130px;border:0;border-radius:8px;padding:11px 14px;font-weight:700;font-size:13.5px;cursor:pointer;font-family:inherit}" +
      "#lai-ck-ok{background:#E8622A;color:#fff}" +
      "#lai-ck-no{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.5)}";
    document.head.appendChild(style);

    var box = document.createElement('div');
    box.id = 'lai-cookies';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Aviso de cookies');
    box.innerHTML =
      'Usamos cookies propias y de terceros (Google) para medir el uso del sitio y mejorar nuestros anuncios. ' +
      'Puedes aceptarlas o rechazarlas. Más información en nuestra <a href="privacidad.html">política de privacidad</a>.' +
      '<div class="lai-ck-btns">' +
      '<button id="lai-ck-no" type="button">Rechazar</button>' +
      '<button id="lai-ck-ok" type="button">Aceptar</button>' +
      '</div>';
    document.body.appendChild(box);

    document.getElementById('lai-ck-ok').onclick = function () { save('granted'); grant(); box.remove(); };
    document.getElementById('lai-ck-no').onclick = function () { save('denied'); box.remove(); };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showBanner);
  else showBanner();
})();
