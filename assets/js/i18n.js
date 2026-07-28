/* ============================================================================
   Junior Martinez Transfer — bilingual layer (EN default, ES secondary)

   How it works
     · English lives in index.html and is the source of truth for SEO.
     · Every translatable node carries data-i18n="key" (text) or
       data-i18n-html="key" (allows inline <em>, <br>).
     · Switching to Spanish swaps those nodes; switching back restores the
       original English captured on first load. Nothing is lost.
     · Choice persists in localStorage and updates <html lang>.
     · main.js reads I18N.t() for strings it generates at runtime.
   ========================================================================== */
(function () {
  'use strict';

  var ES = {
    /* ---- Navigation & header ---- */
    'nav.services':      'Servicios',
    'nav.destinations':  'Destinos',
    'nav.quote':         'Cotizar',
    'nav.faq':           'Preguntas',
    'nav.contact':       'Contacto',
    'brand.tag':         'Transfer y Taxi · Sosúa',

    /* ---- Hero ---- */
    'hero.h1':       'Llegas a POP.<br><em>Alguien ya te espera.</em>',
    'hero.sub':      'Junior Martínez ofrece traslados privados a precio fijo por toda la Costa Norte dominicana. Tu chofer monitorea tu vuelo, te recibe en llegadas con un cartel con tu nombre y te lleva a tu hotel o villa en un vehículo fresco y cómodo. Sin taxímetro. Sin regatear en el parqueo. Sin sorpresas.',
    'hero.proof1':   'Con licencia y seguro',
    'hero.proof2':   'Inglés y español',
    'hero.proof3':   '24/7, todos los vuelos',

    /* ---- Fare line ---- */
    'fare.label':    'Arma tu viaje',
    'fare.pax':      '1–6 pasajeros · un precio por vehículo',
    'fare.pickup':   'Recogida',
    'fare.dropoff':  'Destino',
    'fare.time':     'Tiempo',
    'fare.price':    'Precio fijo',
    'fare.note':     'Los precios son por vehículo para 1–6 personas, de día o de noche. Los tiempos son aproximados y dependen del tráfico. Envía tu número de vuelo y Junior te confirma el precio exacto por WhatsApp.',
    'fare.bookPrice':'Reservar este viaje · US$',
    'fare.custom':   'Ruta especial',
    'fare.ask':      'Consultar',
    'fare.getPrice': 'Pedir precio',


    /* ---- About ---- */
    'about.h2':      'Por qué los viajeros de la<br><em>Costa Norte</em> eligen a Junior',
    'about.p1':      'Junior Martínez lleva años manejando esta costa: la ruta del aeropuerto a Sosúa, los kitesurfistas rumbo a Cabarete, las familias que suben a Playa Grande, las parejas que buscan los saltos de Damajagua. Sabe cuál carretera se inunda en octubre y cuál atajo te ahorra veinte minutos un domingo.',
    'about.p2':      'Esto no es un call center. Cuando escribes al WhatsApp de esta página, le escribes a Junior. Él te confirma el precio antes de viajar, monitorea tu vuelo y responde si tus planes cambian a medianoche. Esa es toda la promesa: un chofer al que sí puedes contactar, un precio acordado por escrito y un carro limpio, fresco y cómodo esperándote.',
    'about.t1':      'Servicio privado únicamente — nunca compartes el vehículo con desconocidos',
    'about.t2':      'Monitoreo de vuelo: si aterrizas tarde, no pagas nada extra',
    'about.t3':      'Sillas para niños disponibles a pedido, sin costo',
    'about.t4':      'Efectivo en US$ o pesos, o pago con tarjeta coordinado por adelantado',
    'about.cta':     'Escríbele a Junior',
    'about.cap':     'Junior Martínez · Sosúa, Puerto Plata',
    'about.s1':      'destinos a precio fijo',
    'about.s2':      'cargos sorpresa, nunca',

    /* ---- Services ---- */
    'srv.h2':      'Traslados por toda la<br>Costa Norte <em>dominicana</em>',
    'srv.sub':     'Todos los servicios son privados, a precio fijo y se reservan con un solo mensaje de WhatsApp.',
    'srv.1.h':  'Traslados al aeropuerto',
    'srv.1.p':  'Puerto Plata (POP), Santiago (STI), Samaná (AZS) y Las Américas (SDQ). Recibimiento en llegadas con cartel con tu nombre, equipaje atendido y monitoreo de vuelo por si aterrizas tarde.',
    'srv.1.r':  'Desde <b>US$25</b> · POP ↔ Sosúa',
    'srv.1.a':  'Reservar traslado al aeropuerto',
    'srv.2.h':  'Taxi privado',
    'srv.2.p':  'De punto a punto en Sosúa, Cabarete y Puerto Plata: la cena, el supermercado, una noche fuera o el regreso a las 2am. El mismo carro, el mismo chofer, precio acordado antes de subir.',
    'srv.2.r':  'Desde <b>US$7</b> · dentro de Sosúa',
    'srv.2.a':  'Reservar un taxi privado',
    'srv.3.h':  'Traslados a hoteles y villas',
    'srv.3.p':  'Puerta a puerta a todos los resorts y residenciales de la costa: Playa Dorada, Casa Linda, Sea Horse Ranch, Perla Marina, Bahía Príncipe, Riu Merengue, Celuisma y más.',
    'srv.3.r':  'Desde <b>US$10</b> · villas zona Sosúa',
    'srv.3.a':  'Reservar traslado a hotel',
    'srv.4.h':  'Excursiones y paseos',
    'srv.4.p':  'Los 27 Charcos de Damajagua, Playa Grande, Punta Rucia y Cayo Arena, el teleférico de Puerto Plata, la Fortaleza San Felipe, Santiago. Junior te espera mientras exploras y te lleva de vuelta.',
    'srv.4.r':  'Desde <b>US$50</b> · medio día',
    'srv.4.a':  'Planear una excursión',
    'srv.5.h':  'VIP y chofer por hora',
    'srv.5.p':  'Contrata a Junior por hora para reuniones, visitas a propiedades, una boda o un cliente. Discreto, puntual, bien presentado y disponible el tiempo que necesites.',
    'srv.5.r':  'Tarifa por hora a consultar',
    'srv.5.a':  'Solicitar servicio VIP',
    'srv.6.h':  'Traslados de larga distancia',
    'srv.6.p':  'Cruzando el país por carretera: Santo Domingo, Punta Cana, Samaná, Las Terrenas, Barahona, Montecristi. Un solo vehículo todo el camino, con las paradas que quieras.',
    'srv.6.r':  'Desde <b>US$100</b> · Santiago y más allá',
    'srv.6.a':  'Cotizar larga distancia',

    /* ---- CTA bands ---- */
    'cta1.h': '¿Aún lo estás pensando? Pregunta el precio.',
    'cta1.p': 'Envía tu fecha, número de vuelo y destino. Junior responde con un total fijo, normalmente en minutos.',
    'cta1.b': 'Pedir un precio',
    'cta2.h': '¿No está en la lista, o viajan en grupo grande?',
    'cta2.p': 'Junior cubre todo el país y cualquier tamaño de grupo — seis en una minivan, más con un segundo vehículo a la misma tarifa. Envía los detalles y recibe un total fijo.',
    'cta2.b': 'Cotización personalizada',

    /* ---- Why choose us ---- */
    'why.h2':      'Seis razones por las que tu<br>viaje sale <em>exacto</em>',
    'why.1.h': 'Choferes con licencia',
    'why.1.p': 'Con licencia, seguro y permiso para trabajar en el aeropuerto. Viajas con un profesional, no con un oportunista en la salida.',
    'why.2.h': 'Vehículos cómodos',
    'why.2.p': 'Carros y minivans modernos e impecables con espacio real para equipaje: palos de golf, tablas de surf, equipo de kite y las maletas de toda la familia.',
    'why.4.h': 'Servicio puntual',
    'why.4.p': 'Junior llega temprano, no a la hora. Monitorea los vuelos, así que si aterrizas dos horas tarde tu chofer sigue ahí esperando.',
    'why.5.h': 'Precios fijos',
    'why.5.p': 'El precio que acuerdas por WhatsApp es el que pagas. Sin taxímetro, sin recargo nocturno, sin cargo por maletas, sin renegociar al llegar.',
    'why.6.h': 'Inglés y español',
    'why.6.p': 'Reserva, pregunta y cambia planes en inglés o español. Nada se pierde entre tu mensaje y tu chofer.',
    'why.7.h': 'Disponible 24/7',
    'why.7.p': 'La salida de las 5am y la llegada de la 1am son normales aquí. Escribe a cualquier hora y recibe una respuesta real.',

    /* ---- Destinations ---- */
    'dest.h2':      'A dónde va <em>de verdad</em><br>la Costa Norte',
    'dest.sub':     'Precios fijos desde Sosúa, por vehículo, 1–6 pasajeros. El mismo precio en sentido contrario.',
    'dest.1.h': 'Aeropuerto Puerto Plata', 'dest.1.p': 'Gregorio Luperón Internacional. Recibimiento en llegadas, monitoreo de vuelo y equipaje atendido.', 'dest.1.a': 'Reservar traslado POP',
    'dest.2.h': 'Sosúa',             'dest.2.p': 'Bahía de Sosúa, Playa Alicia, la calle Pedro Clisante y todos los residenciales del pueblo.', 'dest.2.a': 'Reservar en Sosúa',
    'dest.3.h': 'Cabarete',          'dest.3.p': 'La capital del kite y el surf. Las tablas y el equipo viajan gratis, solo dinos qué traes.', 'dest.3.a': 'Reservar Cabarete',
    'dest.4.h': 'Puerto Plata',      'dest.4.p': 'El Malecón, la Fortaleza San Felipe, el museo del ámbar y el teleférico a Loma Isabel de Torres.', 'dest.4.a': 'Reservar Puerto Plata',
    'dest.5.h': 'Cofresí y Costambar','dest.5.p': 'Ocean World, Lifestyle Holidays y las villas de Costambar, al oeste de Puerto Plata.', 'dest.5.a': 'Reservar Cofresí',
    'dest.6.h': 'Río San Juan',      'dest.6.p': 'La Laguna Gri-Grí, Playa Caletón y el extremo tranquilo de la costa. Playa Grande es la misma ruta.', 'dest.6.a': 'Reservar Río San Juan',
    'dest.8.h': 'Punta Rucia',       'dest.8.p': 'El punto de salida hacia Cayo Arena, el banco de arena en medio del arrecife. Un día completo.', 'dest.8.a': 'Reservar Punta Rucia',
    'dest.9.h': 'Santiago',          'dest.9.p': 'La ciudad y el Aeropuerto Internacional del Cibao, por la carretera de montaña de La Cumbre.', 'dest.9.a': 'Reservar Santiago',

    /* ---- Reviews ---- */
    'rev.h2':      'Lo que dicen los pasajeros<br>tras el <em>primer viaje</em>',
    'rev.1.q': 'Nuestro vuelo a POP llegó dos horas tarde y yo ya me veía tirado en el aeropuerto. Junior estaba ahí con el cartel, tranquilísimo, y no cobró un peso de más. Carro fresco, buena conversación, y en la villa de Sosúa en quince minutos.',
    'rev.1.a': 'Toronto · POP → Sosúa',
    'rev.2.q': 'Viajo a Cabarete dos veces al año con dos tablas de kite y un bulto de equipo. A Junior nunca le molesta el equipaje, siempre confirma el precio por WhatsApp la noche antes y está afuera del apartamento antes de que termine mi café.',
    'rev.2.a': 'Montreal · Cliente frecuente Cabarete',
    'rev.3.q': 'Reservamos en inglés por WhatsApp desde Alemania dos semanas antes de volar. La respuesta llegó en diez minutos con el precio exacto para cuatro personas más una silla de niño. Todo pasó tal como estaba escrito. Eso es raro y hay que decirlo.',
    'rev.3.a': 'Hamburgo · POP → Playa Dorada',
    'rev.4.q': 'Contratamos a Junior un día completo para Damajagua y después Puerto Plata. Esperó en cada parada, nos recomendó un lugar para almorzar que jamás habríamos encontrado, y el total fue el número que acordamos esa mañana. Lo usamos cuatro veces más esa semana.',
    'rev.4.a': 'Nueva Jersey · Excursión de día completo',
    'rev.5.q': 'Administro una villa en Sea Horse Ranch y mando a todos mis huéspedes con Junior. En tres temporadas no ha llegado tarde ni una vez, y ni un solo huésped me ha reclamado por el precio. Por eso lo sigo usando.',
    'rev.5.a': 'Sosúa · Administradora de villas',
    'rev.6.q': 'Santo Domingo ida y vuelta en un día por una reunión de trabajo. Wi-Fi, carro silencioso, llegamos veinte minutos antes. Costó menos que los dos vuelos domésticos que estaba a punto de comprar.',
    'rev.6.a': 'Sosúa → Santo Domingo',

    /* ---- Quote form ---- */
    'q.h2':      'Recibe tu precio fijo<br>en <em>un mensaje</em>',
    'q.lead':    'Llena esto y se convierte en un mensaje de WhatsApp ya redactado: solo tienes que enviarlo. Esta web no guarda nada y nadie te agrega a una lista de correos.',
    'q.t1':      'Respuesta normalmente en minutos, las 24 horas',
    'q.t2':      'El total cotizado es definitivo — sin taxímetro, sin extras',
    'q.t3':      'Los viajes de ida y vuelta reservados juntos llevan una sola confirmación',
    'q.aside':   '<b>¿Vienes en avión?</b> Incluye tu número de vuelo. Junior lo monitorea y ajusta la recogida automáticamente si te retrasas.',
    'q.name':    'Tu nombre',
    'q.pax':     'Pasajeros',
    'q.from':    'Recogida',
    'q.to':      'Destino',
    'q.date':    'Fecha',
    'q.time':    'Hora',
    'q.flight':  'Número de vuelo <em>(opcional)</em>',
    'q.trip':    'Tipo de viaje',
    'q.oneway':  'Solo ida',
    'q.round':   'Ida y vuelta',
    'q.hourly':  'Por hora o día completo',
    'q.notes':   '¿Algo más? <em>(opcional)</em>',
    'q.notesPh': 'Silla de niño, equipaje extra, tablas de surf, una parada en el camino…',
    'q.send':    'Enviar por WhatsApp',
    'q.hint':    'Abre WhatsApp con tus datos ya escritos. Tú solo lo envías.',
    'q.err':     'Completa tu nombre, recogida, destino, fecha y hora.',

    /* ---- FAQ ---- */
    'faq.h2':      'Lo que preguntan los viajeros<br><em>antes</em> de reservar',
    'faq.1.q': '¿Cómo reservo?',
    'faq.1.a': 'Envía un solo mensaje de WhatsApp con tu fecha, hora, punto de recogida, destino y —si vienes en avión— tu número de vuelo. Junior responde con un total fijo en dólares. Cuando dices que sí, queda reservado. No hay app que descargar, ni cuenta, ni depósito para traslados normales.',
    'faq.2.q': '¿Aceptan efectivo?',
    'faq.2.a': 'Sí, el efectivo es la forma más fácil de pagar y se entrega al chofer al terminar el viaje. Se aceptan dólares y pesos dominicanos. Los pesos se convierten a la tasa del día. Si prefieres no cargar efectivo, pregunta por tarjeta o transferencia al reservar y Junior lo coordina por adelantado.',
    'faq.3.q': '¿Ofrecen viajes de ida y vuelta?',
    'faq.3.a': 'Sí, y reservar ambos sentidos a la vez es lo más inteligente: tu regreso queda fijado en la agenda y Junior te confirma la hora de recogida el día de tu salida. Cada tramo se cobra a la tarifa fija normal; no se agrega nada por el regreso. Si tu vuelo de vuelta cambia, escríbele y la recogida se mueve contigo.',
    'faq.4.q': '¿El precio es realmente fijo?',
    'faq.4.a': 'Sí. El número que acuerdas por WhatsApp es el que pagas. No hay taxímetro, ni recargo nocturno, ni cargo por maletas, ni cobro por persona: un solo precio cubre el vehículo para hasta seis pasajeros. Lo único que cambia un precio es que tú cambies el viaje: agregar una parada, un segundo destino o tiempo de espera.',
    'faq.5.q': '¿Puedo pagar en dólares?',
    'faq.5.a': 'Todos los precios de esta página están en dólares estadounidenses y se aceptan en todos los destinos donde Junior maneja. También se pueden coordinar pesos dominicanos, dólares canadienses y euros: solo menciona qué moneda traes al reservar, para acordar el monto exacto antes de viajar.',
    'faq.6.q': '¿Cómo encuentro a mi chofer en el aeropuerto?',
    'faq.6.a': 'Pasa migración y recoge tu equipaje, sal por las puertas de llegadas de Puerto Plata (POP) y busca tu nombre en un cartel: Junior espera en el área de recibimiento justo afuera, no en el parqueo. Él monitorea tu vuelo, así que un retraso no importa. Si no lo ves, mándale un WhatsApp apenas aterrices y él va hacia ti.',
    'faq.7.q': '¿Con cuánta anticipación debo reservar?',
    'faq.7.a': 'Para traslados de aeropuerto, 24 horas es cómodo y una semana es ideal en temporada alta (diciembre–abril y julio–agosto). Para un taxi por Sosúa o Cabarete, una hora de aviso suele sobrar, y muchas veces mucho menos. Junior trabaja 24/7, así que las salidas de madrugada y las llegadas nocturnas son normales, no una excepción.',
    'faq.8.q': '¿Tienen sillas para niños?',
    'faq.8.a': 'Sí, sin costo adicional. Solo dile a Junior las edades de tus hijos al reservar para que la silla correcta esté instalada antes de salir al aeropuerto. Las familias que viajan con coche de bebé y varias maletas también deberían mencionarlo, para enviar una minivan en lugar de un carro.',

    /* ---- Finale ---- */
    'fin.h2':      'Tu chofer <em>ya está despierto</em>.',
    'fin.sub':     'Sea la hora que sea, envía tu vuelo y tu destino. Tendrás un precio fijo de vuelta antes de terminar de desempacar el bulto de mano.',
    'fin.b1':      'Reservar por WhatsApp',
    'fin.b2':      'Llamar al +1 829 299 1661',
    'fin.micro':   'Responde 24/7 · Inglés y español · Precios fijos en US$',

    /* ---- Contact ---- */
    'ct.h2':      'Contacta a Junior<br>Martínez <em>Transfer</em>',
    'ct.wa':   'WhatsApp',  'ct.wa.s':   'La forma más rápida de reservar — normalmente contesta en minutos',
    'ct.ph':   'Teléfono',  'ct.ph.s':   'Llama directamente si prefieres hablar',
    'ct.em':   'Correo',    'ct.em.s':   'Para facturas, reservas de grupo y aliados de villas',
    'ct.hr':   'Horario',   'ct.hr.v':   '24 horas, 7 días a la semana', 'ct.hr.s': 'Incluyendo feriados, vuelos nocturnos y salidas a las 4am',
    'ct.ar':   'Área de servicio', 'ct.ar.s': 'Con base en Sosúa, cubriendo toda la Costa Norte y todo el país a solicitud',

    /* ---- Footer ---- */
    'ft.about':  'Servicio privado de taxi y traslados al aeropuerto con base en Sosúa, República Dominicana. Precios fijos, choferes con licencia, vehículos con aire acondicionado y un número de WhatsApp que siempre responde.',
    'ft.book':   'Reservar por WhatsApp',
    'ft.services':'Servicios', 'ft.destinations': 'Destinos', 'ft.contact': 'Contacto',
    'ft.s1':'Traslados al aeropuerto', 'ft.s2':'Taxi privado', 'ft.s3':'Hoteles y villas',
    'ft.s4':'Excursiones', 'ft.s5':'VIP y chofer por hora', 'ft.s6':'Larga distancia',
    'ft.addr':   'Sosúa, Puerto Plata<br>República Dominicana',
    'ft.hours':  'Abierto 24 horas · 7 días',
    'ft.rights': 'Todos los derechos reservados.',

    /* ---- Misc / a11y ---- */
    'skip':      'Ir al contenido',
    'menu.open': 'Abrir menú',
    'menu.close':'Cerrar menú',
    'wa.float':  'Reservar por WhatsApp',

    /* ---- Runtime strings used by main.js ---- */
    'run.groupAirport':'Aeropuerto', 'run.groupSosua':'Zona Sosúa',
    'run.groupCoast':'Costa Norte',  'run.groupInland':'Interior',
    'run.groupLong':'Larga distancia'
  };

  /* Spanish versions of the pre-written WhatsApp messages. Keyed by the
     English message so no extra markup is needed on every button. */
  var WA_ES = {
    "Hi Junior! I'd like to book a transfer.":
      '¡Hola Junior! Me gustaría reservar un traslado.',
    "Hi Junior! I found your website and I'd like to ask about a transfer.":
      '¡Hola Junior! Vi tu página web y quisiera consultar por un traslado.',
    "Hi Junior! I need an airport transfer. My flight details: ":
      '¡Hola Junior! Necesito un traslado al aeropuerto. Datos de mi vuelo: ',
    "Hi Junior! I'd like a private taxi. Pick-up: ":
      '¡Hola Junior! Quisiera un taxi privado. Recogida en: ',
    "Hi Junior! I need a hotel/villa transfer. My accommodation is: ":
      '¡Hola Junior! Necesito un traslado a hotel/villa. Mi alojamiento es: ',
    "Hi Junior! I'd like to arrange an excursion to: ":
      '¡Hola Junior! Quisiera organizar una excursión a: ',
    "Hi Junior! I'd like to book a private driver by the hour on: ":
      '¡Hola Junior! Quisiera contratar un chofer privado por hora el día: ',
    "Hi Junior! I need a long-distance transfer from Sosúa to: ":
      '¡Hola Junior! Necesito un traslado de larga distancia desde Sosúa hasta: ',
    "Hi Junior! Could you give me a price for a transfer? Date: / Flight: / Destination: ":
      '¡Hola Junior! ¿Me puedes dar un precio para un traslado? Fecha: / Vuelo: / Destino: ',
    "Hi Junior! I have a trip that doesn't fit the standard list — destination and/or group size: ":
      '¡Hola Junior! Tengo un viaje que no encaja en la lista estándar — destino y/o tamaño del grupo: ',
    "Hi Junior! I'd like to book a transfer. Date: / Time: / From: / To: / Passengers: ":
      '¡Hola Junior! Quisiera reservar un traslado. Fecha: / Hora: / Desde: / Hasta: / Pasajeros: ',
    "Hi Junior! I have a question about a transfer.":
      '¡Hola Junior! Tengo una pregunta sobre un traslado.',
    "Hi Junior! I need a transfer between Puerto Plata Airport (POP) and Sosúa. My flight is: ":
      '¡Hola Junior! Necesito un traslado entre el Aeropuerto de Puerto Plata (POP) y Sosúa. Mi vuelo es: ',
    "Hi Junior! I need a taxi within Sosúa. Pick-up: ":
      '¡Hola Junior! Necesito un taxi dentro de Sosúa. Recogida en: ',
    "Hi Junior! I need a transfer to Cabarete. Date and time: ":
      '¡Hola Junior! Necesito un traslado a Cabarete. Fecha y hora: ',
    "Hi Junior! I need a transfer to Puerto Plata. Date and time: ":
      '¡Hola Junior! Necesito un traslado a Puerto Plata. Fecha y hora: ',
    "Hi Junior! I need a transfer to Cofresí / Costambar. Date and time: ":
      '¡Hola Junior! Necesito un traslado a Cofresí / Costambar. Fecha y hora: ',
    "Hi Junior! I need a transfer to Río San Juan. Date and time: ":
      '¡Hola Junior! Necesito un traslado a Río San Juan. Fecha y hora: ',
    "Hi Junior! I'd like to go to Punta Rucia / Cayo Arena. Date: ":
      '¡Hola Junior! Quisiera ir a Punta Rucia / Cayo Arena. Fecha: ',
    "Hi Junior! I need a transfer to Santiago. Date and time: ":
      '¡Hola Junior! Necesito un traslado a Santiago. Fecha y hora: '
  };

  var META_ES = {
    title: 'Taxi Sosúa y Traslados Aeropuerto Puerto Plata (POP) 24/7',
    desc:  'Taxi privado en Sosúa y traslados al aeropuerto de Puerto Plata (POP). Precios fijos, choferes con licencia, vehículos con A/A. Reserva por WhatsApp 24/7.'
  };
  var META_EN = {
    title: document.title,
    desc:  (document.querySelector('meta[name="description"]') || {}).content || ''
  };

  var EN = {};                 // captured on first apply, so ES → EN restores exactly
  var captured = false;
  var current = 'en';

  function nodes() {
    return Array.prototype.slice.call(document.querySelectorAll('[data-i18n], [data-i18n-html]'));
  }

  function capture() {
    if (captured) return;
    nodes().forEach(function (el) {
      var k = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
      if (!(k in EN)) EN[k] = el.hasAttribute('data-i18n-html') ? el.innerHTML : el.textContent;
    });
    captured = true;
  }

  /** Translate one key; falls back to English, then to the key itself. */
  function t(key) {
    if (current === 'es' && ES[key] != null) return ES[key];
    if (EN[key] != null) return EN[key];
    return key;
  }

  function apply(lang) {
    capture();
    current = (lang === 'es') ? 'es' : 'en';
    var dict = current === 'es' ? ES : EN;

    nodes().forEach(function (el) {
      var isHtml = el.hasAttribute('data-i18n-html');
      var k = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
      var v = dict[k];
      if (v == null) v = EN[k];
      if (v == null) return;
      if (isHtml) el.innerHTML = v; else el.textContent = v;
    });

    // Placeholders and aria-labels carry their own keys.
    Array.prototype.slice.call(document.querySelectorAll('[data-i18n-ph]')).forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      var v = current === 'es' ? ES[k] : EN['ph:' + k];
      if (current === 'en') { if (el.dataset.phEn) el.placeholder = el.dataset.phEn; }
      else if (v) { if (!el.dataset.phEn) el.dataset.phEn = el.placeholder; el.placeholder = v; }
    });

    // Swap the pre-written WhatsApp messages.
    Array.prototype.slice.call(document.querySelectorAll('[data-wa]')).forEach(function (el) {
      if (!el.dataset.waEn) el.dataset.waEn = el.getAttribute('data-wa');
      var en = el.dataset.waEn;
      el.setAttribute('data-wa', current === 'es' && WA_ES[en] ? WA_ES[en] : en);
    });

    document.documentElement.lang = current;
    var meta = current === 'es' ? META_ES : META_EN;
    document.title = meta.title;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.content = meta.desc;

    Array.prototype.slice.call(document.querySelectorAll('[data-lang-btn]')).forEach(function (b) {
      var on = b.getAttribute('data-lang-btn') === current;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });

    try { localStorage.setItem('jmt-lang', current); } catch (e) { /* private mode */ }
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: current } }));
  }

  function init() {
    var saved = null;
    try { saved = localStorage.getItem('jmt-lang'); } catch (e) { /* ignore */ }
    // No saved choice: offer Spanish to Spanish-speaking browsers, English to everyone else.
    var guess = saved || ((navigator.language || 'en').toLowerCase().indexOf('es') === 0 ? 'es' : 'en');

    apply(guess);

    Array.prototype.slice.call(document.querySelectorAll('[data-lang-btn]')).forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-lang-btn')); });
    });
  }

  window.I18N = { t: t, apply: apply, get lang() { return current; } };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
