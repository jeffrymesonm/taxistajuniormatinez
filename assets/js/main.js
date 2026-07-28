/* ============================================================================
   Junior Martinez Transfer — site behaviour
   Purpose: turn every interaction on the page into a pre-written WhatsApp
   message, and render the fixed-rate board from a single source of truth.

   Contents
     1  CONFIG            — contact details. THE ONLY PLACE TO EDIT THEM.
     2  RATES             — the fixed price board (from/to Sosúa, 1–6 pax)
     3  Helpers
     4  WhatsApp wiring
     5  Fare line (hero)
     6  Quote form
     7  Scroll reveal, header, nav, misc

   Loads after assets/js/i18n.js, so window.I18N is available for the strings
   this file builds at runtime. Everything re-renders on the `langchange` event.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------ 1. CONFIG ------------------------------ */
  /* Change a number or address here and it updates everywhere on the site,
     including the floating button, every CTA and the quote form. */
  var CONFIG = {
    owner:        'Junior Martinez',
    waNumber:     '18292991661',              // digits only, with country code
    phoneDisplay: '+1 (829) 299-1661',
    phoneHref:    '+18292991661',
    email:        'info@juniormartineztransfer.com',
    hubId:        'sosua'                     // every rate is measured from here
  };

  /* ------------------------------ 2. RATES ------------------------------- */
  /* n = name, p = price in US$ (per vehicle, 1–6 passengers, either direction),
     m = approximate drive time in minutes from Sosúa, g = group.
     `a` holds the search aliases transcribed from the client's board. Nothing
     reads them since the searchable rate table was removed from the page; they
     are kept because they are original client data, not code.
     Prices come from Junior's own price board. Drive times are estimates. */
  var RATES = [
    // ---- Airports ----
    { id:'pop',  n:'Puerto Plata Airport (POP)',        p:25,  m:15,  g:'Airport', a:'pop gregorio luperon aeropuerto puerto plata international' },
    { id:'sti',  n:'Santiago Airport (STI)',            p:100, m:90,  g:'Airport', a:'sti cibao aeropuerto santiago' },
    { id:'azs',  n:'Samaná Airport (AZS)',              p:150, m:190, g:'Airport', a:'azs el catey aeropuerto samana' },
    { id:'sdq',  n:'Las Américas Airport (SDQ)',        p:200, m:240, g:'Airport', a:'sdq santo domingo las americas aeropuerto' },

    // ---- Sosúa area ----
    { id:'sosua',        n:'Sosúa (in town)',           p:7,   m:5,   g:'Sosúa area', a:'sosua town centre playa alicia' },
    { id:'casa-linda',   n:'Casa Linda',                p:10,  m:10,  g:'Sosúa area', a:'casa linda villas' },
    { id:'playa-laguna', n:'Playa Laguna',              p:10,  m:8,   g:'Sosúa area', a:'playa laguna' },
    { id:'caribick',     n:'Villa Caribick',            p:10,  m:10,  g:'Sosúa area', a:'villa caribick' },
    { id:'coconut',      n:'Coconut Palms',             p:12,  m:10,  g:'Sosúa area', a:'coconut palms resort' },
    { id:'hideaway',     n:'Hide Away Beach',           p:12,  m:10,  g:'Sosúa area', a:'hideaway hide way beach' },
    { id:'perla',        n:'Perla Marina',              p:12,  m:8,   g:'Sosúa area', a:'perla marina' },
    { id:'seahorse',     n:'Sea Horse Ranch',           p:12,  m:8,   g:'Sosúa area', a:'sea horse ranch villas' },
    { id:'cabarete',     n:'Cabarete Center',           p:15,  m:15,  g:'Sosúa area', a:'cabarete kite beach centro' },
    { id:'choco',        n:'Hacienda el Choco',         p:15,  m:12,  g:'Sosúa area', a:'hacienda el choco' },
    { id:'celuisma',     n:'Celuisma',                  p:18,  m:12,  g:'Sosúa area', a:'celuisma resort' },
    { id:'la-union',     n:'La Unión',                  p:20,  m:15,  g:'Sosúa area', a:'la union' },
    { id:'sabaneta',     n:'Sabaneta',                  p:20,  m:15,  g:'Sosúa area', a:'sabaneta' },

    // ---- North Coast ----
    { id:'blue-moon',    n:'Blue Moon',                 p:30,  m:20,  g:'North Coast', a:'blue moon retreat' },
    { id:'gaspar',       n:'Gaspar Hernández',          p:30,  m:30,  g:'North Coast', a:'gaspar hernandez playa magante' },
    { id:'playa-dorada', n:'Playa Dorada',              p:30,  m:25,  g:'North Coast', a:'playa dorada resort golf' },
    { id:'jamao',        n:'Jamao',                     p:35,  m:45,  g:'North Coast', a:'jamao al norte' },
    { id:'puerto-plata', n:'Puerto Plata',              p:35,  m:30,  g:'North Coast', a:'puerto plata malecon teleferico fortaleza' },
    { id:'riu',          n:'Riu Merengue',              p:50,  m:30,  g:'North Coast', a:'riu merengue hotel' },
    { id:'cofresi',      n:'Cofresí / Costambar',       p:50,  m:40,  g:'North Coast', a:'cofresi costambar ocean world lifestyle' },
    { id:'la-cumbre',    n:'La Cumbre (Moca)',          p:60,  m:50,  g:'North Coast', a:'la cumbre moca ambar' },
    { id:'bahia',        n:'Bahía Príncipe',            p:80,  m:45,  g:'North Coast', a:'bahia principe resort' },
    { id:'damajagua',    n:'Damajagua (27 Waterfalls)', p:100, m:45,  g:'North Coast', a:'damajagua 27 charcos waterfalls cascadas' },
    { id:'luperon',      n:'Luperón',                   p:100, m:70,  g:'North Coast', a:'luperon marina' },
    { id:'playa-grande', n:'Playa Grande',              p:100, m:75,  g:'North Coast', a:'playa grande golf' },
    { id:'rio-san-juan', n:'Río San Juan',              p:100, m:75,  g:'North Coast', a:'rio san juan gri gri caleton' },
    { id:'cabrera',      n:'Cabrera',                   p:100, m:90,  g:'North Coast', a:'cabrera' },
    { id:'blue-lagoon',  n:'Blue Lagoon',               p:120, m:95,  g:'North Coast', a:'blue lagoon' },
    { id:'isabela',      n:'Castillo / La Isabela',     p:130, m:80,  g:'North Coast', a:'castillo la isabela columbus' },
    { id:'punta-rucia',  n:'Punta Rucia',               p:200, m:120, g:'North Coast', a:'punta rucia rusia cayo arena paradise island' },

    // ---- Inland ----
    { id:'santiago',     n:'Santiago',                  p:100, m:90,  g:'Inland', a:'santiago de los caballeros monumento' },
    { id:'la-vega',      n:'La Vega',                   p:110, m:105, g:'Inland', a:'la vega carnaval' },
    { id:'nagua',        n:'Nagua',                     p:120, m:90,  g:'Inland', a:'nagua' },
    { id:'bonao',        n:'Bonao',                     p:130, m:135, g:'Inland', a:'bonao' },
    { id:'sfm',          n:'San Francisco de Macorís',  p:130, m:120, g:'Inland', a:'san francisco de macoris' },
    { id:'mao',          n:'Valverde Mao',              p:150, m:120, g:'Inland', a:'valverde mao' },
    { id:'montecristi',  n:'Montecristi',               p:180, m:150, g:'Inland', a:'montecristi morro' },
    { id:'dajabon',      n:'Dajabón',                   p:200, m:180, g:'Inland', a:'dajabon haiti border frontera' },

    // ---- Long distance ----
    { id:'sanchez',      n:'Sánchez',                   p:150, m:150, g:'Long distance', a:'sanchez samana bay' },
    { id:'terrenas',     n:'Las Terrenas',              p:180, m:180, g:'Long distance', a:'las terrenas playa bonita' },
    { id:'samana',       n:'Samaná',                    p:180, m:180, g:'Long distance', a:'samana whales ballenas' },
    { id:'boca-chica',   n:'Boca Chica',                p:200, m:250, g:'Long distance', a:'boca chica' },
    { id:'la-galera',    n:'La Galera',                 p:200, m:190, g:'Long distance', a:'la galera' },
    { id:'santo-domingo',n:'Santo Domingo',             p:200, m:240, g:'Long distance', a:'santo domingo capital zona colonial' },
    { id:'juan-dolio',   n:'Juan Dolio',                p:220, m:260, g:'Long distance', a:'juan dolio' },
    { id:'san-pedro',    n:'San Pedro de Macorís',      p:220, m:270, g:'Long distance', a:'san pedro de macoris' },
    { id:'barahona',     n:'Barahona',                  p:300, m:330, g:'Long distance', a:'barahona bahoruco' },
    { id:'la-romana',    n:'La Romana',                 p:300, m:300, g:'Long distance', a:'la romana casa de campo bayahibe' },
    { id:'higuey',       n:'Higüey',                    p:400, m:330, g:'Long distance', a:'higuey basilica' },
    { id:'punta-cana',   n:'Punta Cana',                p:400, m:360, g:'Long distance', a:'punta cana bavaro puj' }
  ];

  /* Group labels shown in the UI; the keys above stay in English as data. */
  var GROUP_KEY = {
    'Airport':       'run.groupAirport',
    'Sosúa area':    'run.groupSosua',
    'North Coast':   'run.groupCoast',
    'Inland':        'run.groupInland',
    'Long distance': 'run.groupLong'
  };

  /* ----------------------------- 3. HELPERS ------------------------------ */
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function lang() { return window.I18N ? window.I18N.lang : 'en'; }
  function isES()  { return lang() === 'es'; }

  /** Translate a key, falling back to the supplied English text. */
  function L(key, fallback) {
    if (!window.I18N) return fallback;
    var v = window.I18N.t(key);
    return (v && v !== key) ? v : fallback;
  }

  function groupLabel(g) { return L(GROUP_KEY[g] || '', g); }

  function reduceMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /** Build a wa.me deep link with a pre-written message. */
  function waLink(text) {
    return 'https://wa.me/' + CONFIG.waNumber + '?text=' + encodeURIComponent(text);
  }

  /** Format minutes as "≈ 45 min" or "≈ 2 h 15". */
  function fmtTime(min) {
    if (min == null) return '—';
    if (min < 60) return '≈ ' + min + ' min';
    var h = Math.floor(min / 60), m = min % 60;
    return '≈ ' + h + ' h' + (m ? ' ' + (m < 10 ? '0' + m : m) : '');
  }

  function byId(id) {
    for (var i = 0; i < RATES.length; i++) if (RATES[i].id === id) return RATES[i];
    return null;
  }

  /* -------------------------- 4. WHATSAPP WIRING ------------------------- */
  /* Any element with data-wa becomes a WhatsApp link carrying that message.
     i18n.js rewrites data-wa on language change, so this re-runs after it. */
  function wireWhatsApp(root) {
    $$('[data-wa]', root || document).forEach(function (el) {
      el.setAttribute('href', waLink(el.getAttribute('data-wa')));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }

  /* --------------------------- 5. FARE LINE ------------------------------ */
  var fare = null;    // exposed so langchange can re-render it

  function initFare() {
    var from = $('#fareFrom'), to = $('#fareTo');
    if (!from || !to) return;

    var readout = $('#fareReadout');
    var elTime  = $('#fareTime'), elPrice = $('#farePrice'), go = $('#fareGo');
    var car = $('#fareCar'), line = $('.fare__line');

    var order = [], groups = {};
    RATES.forEach(function (r) {
      if (!groups[r.g]) { groups[r.g] = []; order.push(r.g); }
      groups[r.g].push(r);
    });

    // Pick-up only ever happens at an airport or at Sosúa itself — nobody
    // starts a ride from a specific villa or beach. The far-out airports
    // (everything but POP) are long-distance runs priced straight to Sosúa,
    // so once one of those is the pick-up, Sosúa is the only valid drop-off.
    var LONG_AIRPORTS = { sti: true, azs: true, sdq: true };

    function appendGroup(select, groupName, rates) {
      var og = document.createElement('optgroup');
      og.label = groupLabel(groupName);
      og.dataset.group = groupName;
      rates.forEach(function (r) {
        var o = document.createElement('option');
        o.value = r.id;
        o.textContent = r.n;
        og.appendChild(o);
      });
      select.appendChild(og);
    }

    function fillFrom() {
      from.innerHTML = '';
      appendGroup(from, 'Airport', groups['Airport']);
      appendGroup(from, 'Sosúa area', [byId(CONFIG.hubId)]);
    }

    /** Rebuild the drop-off list to match the current pick-up, keeping a prior
     *  value selected when it's still valid. */
    function syncTo(preferred) {
      var locked = LONG_AIRPORTS[from.value];
      to.disabled = !!locked;
      to.innerHTML = '';
      if (locked) {
        appendGroup(to, 'Sosúa area', [byId(CONFIG.hubId)]);
        to.value = CONFIG.hubId;
      } else {
        order.forEach(function (g) { appendGroup(to, g, groups[g]); });
        to.value = (preferred && byId(preferred)) ? preferred : CONFIG.hubId;
      }
    }

    fillFrom();
    from.value = 'pop';
    syncTo();

    /* The rate board is measured from Sosúa, so a fixed price exists only when
       one endpoint is Sosúa. Anything else is a genuine custom quote. */
    function quote() {
      var a = byId(from.value), b = byId(to.value);
      if (!a || !b) return null;
      if (a.id === CONFIG.hubId) return { price: b.p, min: b.m };
      if (b.id === CONFIG.hubId) return { price: a.p, min: a.m };
      return null;
    }

    /* Drive the little car across the line — a small "recalculating" gesture
       that ties the motion to the number actually changing. Under reduced
       motion it still ends up parked at the destination, it just gets there
       in one frame instead of travelling. */
    function driveCar() {
      if (!line || !car) return;
      var dist = line.clientWidth - 17;   // stop at the line's end, not past it
      if (dist <= 0) return;
      if (reduceMotion()) {
        car.style.transform = 'translate3d(' + dist + 'px,0,0)';
        return;
      }
      car.style.transition = 'none';
      car.style.transform  = 'translate3d(0,0,0)';
      void car.offsetWidth;               // flush the reset before re-animating
      car.style.transition = '';
      car.style.transform  = 'translate3d(' + dist + 'px,0,0)';
    }

    function paint() {
      var q = quote(), a = byId(from.value), b = byId(to.value);
      var label = go.querySelector('span');

      if (q) {
        elTime.textContent  = fmtTime(q.min);
        elPrice.textContent = 'US$' + q.price;
        label.textContent   = L('fare.bookPrice', 'Book this ride · US$') + q.price;
      } else {
        elTime.textContent  = L('fare.custom', 'Custom route');
        elPrice.textContent = L('fare.ask', 'Ask Junior');
        label.textContent   = L('fare.getPrice', 'Get this price');
      }

      var msg = isES()
        ? '¡Hola ' + CONFIG.owner + '! Quisiera un traslado desde ' + a.n + ' hasta ' + b.n + '.' +
          (q ? ' Veo que el precio fijo es US$' + q.price + '.' : '') +
          ' Fecha: / Hora: / Pasajeros: '
        : 'Hi ' + CONFIG.owner + '! I would like a transfer from ' + a.n + ' to ' + b.n + '.' +
          (q ? ' I see the fixed price is US$' + q.price + '.' : '') +
          ' Date: / Time: / Passengers: ';
      go.setAttribute('href', waLink(msg));
    }

    function render(animate) {
      // Blur-through: bridges the old and new values instead of hard-swapping.
      if (animate && !reduceMotion()) {
        readout.classList.add('is-updating');
        setTimeout(function () {
          paint();
          readout.classList.remove('is-updating');
        }, 150);
        driveCar();
      } else {
        paint();
      }
    }

    from.addEventListener('change', function () {
      syncTo(to.value);
      render(true);
    });
    to.addEventListener('change', function () { render(true); });

    render(false);
    // Park the car at the far end once the layout has settled.
    requestAnimationFrame(function () { requestAnimationFrame(driveCar); });

    fare = {
      refresh: function () {
        $$('optgroup', from).concat($$('optgroup', to)).forEach(function (og) {
          og.label = groupLabel(og.dataset.group);
        });
        paint();
      }
    };
  }

  /* ---------------------------- 6. QUOTE FORM ---------------------------- */
  function initQuoteForm() {
    var form = $('#quoteForm');
    if (!form) return;
    var hint = $('#qHint');

    // Feed the pick-up/drop-off inputs with every known place.
    var list = $('#placeList');
    if (list) {
      RATES.forEach(function (r) {
        var o = document.createElement('option');
        o.value = r.n;
        list.appendChild(o);
      });
    }

    // Default the date to today so the field is never empty on submit.
    var date = $('#qDate');
    if (date && !date.value) date.value = new Date().toISOString().slice(0, 10);

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        var bad = form.querySelector(':invalid');
        if (bad) bad.focus();
        hint.textContent = L('q.err', 'Please fill in your name, pick-up, drop-off, date and time.');
        hint.classList.add('is-error');
        return;
      }
      hint.textContent = L('q.hint', 'Opens WhatsApp with your details already written. You press send.');
      hint.classList.remove('is-error');

      var d = new FormData(form);
      var es = isES();
      var lines = es ? [
        '¡Hola ' + CONFIG.owner + '! Quisiera solicitar un precio de traslado.', '',
        'Nombre: '    + d.get('name'),
        'Tipo: '      + d.get('trip'),
        'Recogida: '  + d.get('from'),
        'Destino: '   + d.get('to'),
        'Fecha: '     + d.get('date'),
        'Hora: '      + d.get('time'),
        'Pasajeros: ' + (d.get('pax') || '1')
      ] : [
        'Hi ' + CONFIG.owner + '! I would like to request a transfer price.', '',
        'Name: '       + d.get('name'),
        'Trip: '       + d.get('trip'),
        'Pick-up: '    + d.get('from'),
        'Drop-off: '   + d.get('to'),
        'Date: '       + d.get('date'),
        'Time: '       + d.get('time'),
        'Passengers: ' + (d.get('pax') || '1')
      ];
      if (d.get('flight')) lines.push((es ? 'Vuelo: ' : 'Flight: ') + d.get('flight'));
      if (d.get('notes'))  lines.push((es ? 'Notas: '  : 'Notes: ')  + d.get('notes'));
      lines.push('', es ? '¿Me confirmas el precio fijo? ¡Gracias!' : 'Could you confirm the fixed price? Thank you!');

      window.open(waLink(lines.join('\n')), '_blank', 'noopener');
    });
  }

  /* ------------------- 7. REVEAL, HEADER, NAV, MISC ---------------------- */
  function initReveal() {
    var items = $$('.reveal');
    if (!items.length) return;

    // Stagger children inside a marked container (30–80ms is the useful band).
    $$('[data-stagger]').forEach(function (group) {
      $$('.reveal', group).forEach(function (el, i) {
        el.style.setProperty('--d', Math.min(i, 7) * 60 + 'ms');
      });
    });

    if (reduceMotion() || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);           // reveal once, never again
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
  }

  function initHeader() {
    var head = $('#siteHead'), float = $('#waFloat');
    var ticking = false;

    function update() {
      var y = window.scrollY || window.pageYOffset;
      head.classList.toggle('is-stuck', y > 24);
      if (float) float.classList.toggle('is-shown', y > 520);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  function initNav() {
    var burger = $('#burger'), nav = $('#nav');
    if (!burger || !nav) return;

    function close() {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', L('menu.open', 'Open menu'));
    }
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? L('menu.close', 'Close menu') : L('menu.open', 'Open menu'));
    });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !burger.contains(e.target)) close();
    });
  }

  function initMisc() {
    var y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ------------------------------- BOOT ---------------------------------- */
  function boot() {
    initFare();          // populates selects, then wireWhatsApp picks up the rest
    initQuoteForm();
    wireWhatsApp();
    initReveal();
    initHeader();
    initNav();
    initMisc();

    // i18n.js has already swapped every data-wa message by the time this fires.
    document.addEventListener('langchange', function () {
      if (fare) fare.refresh();
      wireWhatsApp();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
