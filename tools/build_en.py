#!/usr/bin/env python3
"""Genera la versión en inglés (en/index.html) a partir de index.html.

Uso:  python3 tools/build_en.py

Cada par (español, inglés) se sustituye tal cual. Si una frase en español ya no aparece en
index.html (porque cambió el texto), el script avisa y no escribe nada: añade o corrige el par.
El texto que genera el JavaScript (calculadora, héroes, formulario) se traduce en js/main.js.
"""
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = 'https://lumen-ruddy-beta.vercel.app/'
WA = 'https://wa.me/573118739670?text='

PAIRS = [
    # ---------- redes sociales ----------
    ('<nav class="foot-links foot-social" aria-label="Redes sociales">', '<nav class="foot-links foot-social" aria-label="Social media">'),
    ('aria-label="Lumen Studio en Instagram"', 'aria-label="Lumen Studio on Instagram"'),
    ('aria-label="Lumen Studio en TikTok"', 'aria-label="Lumen Studio on TikTok"'),
    ('<p class="contact-social">Síguenos en <a ', '<p class="contact-social">Follow us on <a '),
    ('>Instagram</a> y <a ', '>Instagram</a> and <a '),
    # ---------- cabecera del documento ----------
    ('<html lang="es">', '<html lang="en" data-base="../">'),
    ('<title>Lumen Studio — Encendemos tus ideas: webs, apps y TPV</title>', '<title>Lumen Studio — We light up your ideas: websites, apps and POS</title>'),
    ('content="Lumen Studio diseña y programa webs, apps y TPV para restaurantes. Prueba nuestro TPV real desde el navegador y conoce nuestra app Fendaria."',
     'content="Lumen Studio designs and builds websites, apps and restaurant POS systems. Try our real POS in your browser and meet our Fendaria app."'),
    (f'<link rel="canonical" href="{SITE}">', f'<link rel="canonical" href="{SITE}en/">'),
    (f'<meta property="og:url" content="{SITE}">', f'<meta property="og:url" content="{SITE}en/">'),
    ('<meta property="og:title" content="Lumen Studio — Encendemos tus ideas">', '<meta property="og:title" content="Lumen Studio — We light up your ideas">'),
    ('<meta property="og:description" content="Diseñamos y programamos webs, apps y TPV para restaurantes.">',
     '<meta property="og:description" content="We design and build websites, apps and restaurant POS systems.">'),
    (f'"url": "{SITE}",', f'"url": "{SITE}en/",'),
    ('"description": "Estudio que diseña y programa webs, apps y TPV para restaurantes. Encendemos tus ideas.",',
     '"description": "Studio that designs and builds websites, apps and restaurant POS systems. We light up your ideas.",'),
    ('"areaServed": ["CO", "ES", "Latinoamérica"],', '"areaServed": ["CO", "ES", "Latin America"],'),
    ('"name": "Servicios",', '"name": "Services",'),
    ('"name": "Diseño y desarrollo web"', '"name": "Web design and development"'),
    ('"name": "Desarrollo de apps iOS y Android"', '"name": "iOS and Android app development"'),
    ('"name": "TPV para restaurantes con Verifactu"', '"name": "Restaurant POS with Verifactu"'),

    # ---------- navegación ----------
    ('Saltar al contenido', 'Skip to content'),
    ('aria-label="Lumen Studio, inicio"', 'aria-label="Lumen Studio, home"'),
    ('aria-label="Principal"', 'aria-label="Main"'),
    ('<a href="#proyectos">Proyectos</a>', '<a href="#proyectos">Projects</a>'),
    ('<a href="#servicios">Servicios</a>', '<a href="#servicios">Services</a>'),
    ('<a href="#proceso">Proceso</a>', '<a href="#proceso">Process</a>'),
    ('<a href="#presupuesto">Presupuesto</a>', '<a href="#presupuesto">Pricing</a>'),
    ('<a class="lang" href="en/" hreflang="en" lang="en" aria-label="English version">EN</a>',
     '<a class="lang" href="../" hreflang="es" lang="es" aria-label="Versión en español">ES</a>'),
    ('<a class="btn btn--s" href="#contacto">Hablemos</a>', '<a class="btn btn--s" href="#contacto">Let’s talk</a>'),

    ('aria-label="Cambiar a modo claro"', 'aria-label="Switch to light mode"'),

    # ---------- hero ----------
    ('<p class="hero-badge"><span aria-hidden="true"></span>Estudio digital en Bogotá</p>', '<p class="hero-badge"><span aria-hidden="true"></span>Digital studio in Bogotá</p>'),
    ('aria-label="Golpea el farol"', 'aria-label="Hit the lantern"'),
    ('<p class="hero-slogan">Encendemos tus ideas.</p>', '<p class="hero-slogan">We light up your ideas.</p>'),
    ('<p class="hero-lede">Diseñamos y programamos webs, apps y TPV para restaurantes.</p>',
     '<p class="hero-lede">We design and build websites, apps and restaurant POS systems.</p>'),
    ('<p class="hero-fact">Del primer boceto a la tienda de apps, con el mismo equipo.</p>',
     '<p class="hero-fact">From the first sketch to the app store, with the same team.</p>'),
    ('>Cuéntanos tu proyecto</a>', '>Tell us about your project</a>'),
    ('>Ver proyectos</a>', '>See projects</a>'),

    # ---------- proyectos ----------
    ('id="work-title" data-reveal>Proyectos</h2>', 'id="work-title" data-reveal>Projects</h2>'),
    ('aria-label="Filtrar proyectos"', 'aria-label="Filter projects"'),
    ('data-filter="all">Todos</button>', 'data-filter="all">All</button>'),
    ('data-filter="web">Webs y landings</button>', 'data-filter="web">Websites &amp; landing pages</button>'),
    ('data-filter="software">Plataformas y apps</button>', 'data-filter="software">Platforms &amp; apps</button>'),
    ('data-filter="tpv">TPV</button>', 'data-filter="tpv">POS</button>'),
    ('aria-label="Capturas de ', 'aria-label="Screenshots of '),
    ('aria-label="Ver: ', 'aria-label="View: '),
    # California
    ('Carta del kiosco con el pedido al lado', 'Kiosk menu with the order alongside'),
    ('Elegir categoría en el kiosco', 'Choosing a category on the kiosk'),
    ('Personalizar un kebab: quitar ingredientes y extras', 'Customising a kebab: removing ingredients and adding extras'),
    ('Pantalla de cocina con una comanda', 'Kitchen display with an order'),
    ('<p class="project-kind">TPV · Restaurante</p>', '<p class="project-kind">POS · Restaurant</p>'),
    ('<p class="project-lede">Un kiosco que pide, cobra y avisa a cocina.</p>', '<p class="project-lede">A kiosk that takes the order, charges it and tells the kitchen.</p>'),
    ('<dd>Tomar pedidos en dos locales y en dos idiomas, y que cada comanda llegue a cocina sin pasar por papel.</dd>',
     '<dd>Take orders at two locations and in two languages, and get every order to the kitchen without paper.</dd>'),
    ('<dd>Kiosco de autoservicio en dos idiomas, pantalla de cocina, caja con turnos e impresión de tickets, todo en una sola app.</dd>',
     '<dd>A bilingual self-service kiosk, kitchen display, till with shifts and receipt printing, all in one app.</dd>'),
    ('<dd>Funciona en Medina de Pomar y Villarcayo, y cumple Verifactu.</dd>',
     '<dd>It runs in Medina de Pomar and Villarcayo (Spain) and complies with Verifactu.</dd>'),
    ('>Pruébalo aquí</a>', '>Try it here</a>'),
    # Archivum
    ('Portada de Archivum', 'Archivum home page'),
    ('Panel con documentos, cobros y vencimientos', 'Dashboard with documents, payments and due dates'),
    ('Factura con huella y QR de VeriFactu', 'Invoice with VeriFactu hash and QR code'),
    ('Planes de Archivum', 'Archivum plans'),
    ('Archivum en el móvil', 'Archivum on mobile'),
    ('<p class="project-kind">SaaS · Web y app</p>', '<p class="project-kind">SaaS · Web and app</p>'),
    ('<p class="project-lede">Facturar y archivar, preparado para Veri*Factu.</p>', '<p class="project-lede">Invoicing and archiving, ready for Veri*Factu.</p>'),
    ('<dd>Las facturas de pymes y autónomos acaban repartidas entre el correo, carpetas, WhatsApp y papel.</dd>',
     '<dd>Small businesses and freelancers end up with invoices scattered across email, folders, WhatsApp and paper.</dd>'),
    ('<dd>Un producto propio: web y apps para Android e iPhone con los mismos datos, facturas con huella encadenada y QR de la AEAT, buscador, roles por cliente y carpeta, y planes desde 0 €.</dd>',
     '<dd>Our own product: web plus Android and iPhone apps sharing the same data, invoices with a chained hash and the Spanish tax agency’s QR code, search, per-client and per-folder roles, and plans from €0.</dd>'),
    ('<dd>La web funciona en archivum.es; la app de Android está en pruebas y la de iPhone, lista para publicarse.</dd>',
     '<dd>The web app is live at archivum.es; the Android app is in testing and the iPhone app is ready to ship.</dd>'),
    ('>Visitar archivum.es ↗</a>', '>Visit archivum.es ↗</a>'),
    # Fendaria
    ('Pantalla de título con los siete héroes', 'Title screen with the seven heroes'),
    ('"Villa Candela"', '"Candela Village"'),
    ('View: Villa Candela', 'View: Candela Village'),
    ('Combate en una Grieta', 'Combat inside a Rift'),
    ('Elegir héroe', 'Choosing a hero'),
    ('<p class="project-kind">App propia · Android y navegador</p>', '<p class="project-kind">Our own app · Android and browser</p>'),
    ('<p class="project-lede">Nuestra app de aventuras, hecha de principio a fin.</p>', '<p class="project-lede">Our adventure app, built from start to finish.</p>'),
    ('<dd>Una app para móvil con el acabado de un estudio grande, hecha por un equipo pequeño.</dd>',
     '<dd>A mobile app with big-studio polish, made by a small team.</dd>'),
    ('<dd>Siete héroes con su historia, ocho mundos, jefes, cinemáticas y una banda sonora compuesta por código.</dd>',
     '<dd>Seven heroes with their own stories, eight worlds, bosses, cutscenes and a soundtrack composed in code.</dd>'),
    ('<dd>En la recta final de pruebas; llegará pronto a Google Play.</dd>', '<dd>In its final round of testing; coming soon to Google Play.</dd>'),
    ('>Conócela</a>', '>Meet it</a>'),
    ('>Visitar vitralesperafan.com ↗</a>', '>Visit vitralesperafan.com ↗</a>'),
    ('>Visitar althaya.com.au ↗</a>', '>Visit althaya.com.au ↗</a>'),
    # Vitrales
    ('<p class="project-kind">Web · Taller artesano</p>', '<p class="project-kind">Website · Artisan workshop</p>'),
    ('<p class="project-lede">Casi 50 años de oficio, contados en una web.</p>', '<p class="project-lede">Nearly 50 years of craft, told in one website.</p>'),
    ('<dd>Mostrar el trabajo de un taller fundado en 1976 y recibir encargos desde la web.</dd>',
     '<dd>Show the work of a stained-glass workshop founded in 1976 and receive commissions online.</dd>'),
    ('<dd>Web con galería de obras, proceso, exposiciones y solicitud de presupuesto.</dd>',
     '<dd>A website with a gallery of works, process, exhibitions and quote requests.</dd>'),
    ('<dd>Galería, proceso, exposiciones y presupuesto en una sola web.</dd>', '<dd>Gallery, process, exhibitions and quotes on one website.</dd>'),
    ('Sección del taller', 'Workshop section'),
    # EasyClase
    ('Portada de la plataforma', 'Platform home page'),
    ('Cómo funciona para estudiantes', 'How it works for students'),
    ('Página para profesores', 'Page for teachers'),
    ('La plataforma en el móvil', 'The platform on mobile'),
    ('<p class="project-kind">Plataforma a medida · Educación</p>', '<p class="project-kind">Custom platform · Education</p>'),
    ('<p class="project-lede">Clases particulares con profesores verificados, pagadas por hora.</p>', '<p class="project-lede">Private lessons with verified teachers, paid by the hour.</p>'),
    ('<dd>Conectar estudiantes con profesores y que el dinero llegue seguro a cada uno.</dd>', '<dd>Connect students with teachers and get the money safely to each side.</dd>'),
    ('<dd>Plataforma con búsqueda de profesores, reservas, pagos con Mercado Pago, retiro de ganancias, calificaciones, membresías premium y un panel para cada rol.</dd>',
     '<dd>A platform with teacher search, bookings, Mercado Pago payments, earnings payouts, ratings, premium memberships and a dashboard for each role.</dd>'),
    ('<dd>Una sola plataforma para estudiantes y profesores, con comisiones y pagos automáticos.</dd>', '<dd>One platform for students and teachers, with automatic commissions and payments.</dd>'),
    # Amieva
    ('Galería de trabajos', 'Gallery of completed work'),
    ('Formulario de presupuesto', 'Quote request form'),
    ('<p class="project-kind">Landing · Limpieza y construcción</p>', '<p class="project-kind">Landing page · Cleaning &amp; construction</p>'),
    ('<p class="project-lede">Limpieza y construcción en el suroeste de Florida, en dos idiomas.</p>', '<p class="project-lede">Cleaning and construction in Southwest Florida, in two languages.</p>'),
    ('<dd>Que un cliente de Naples o Fort Myers pida presupuesto en segundos, en inglés o en español.</dd>', '<dd>Let a customer in Naples or Fort Myers request a quote in seconds, in English or Spanish.</dd>'),
    ('<dd>Landing bilingüe con servicios, galería de trabajos, zona de servicio, formulario de presupuesto, WhatsApp y reseñas de Google.</dd>',
     '<dd>A bilingual landing page with services, a gallery of completed work, service area, quote form, WhatsApp and Google reviews.</dd>'),
    ('<dd>Una sola página pensada para que te escriban o te llamen desde el celular.</dd>', '<dd>A single page built so customers message or call straight from their phone.</dd>'),
    # Althaya
    ('<p class="project-kind">Web · Bienestar</p>', '<p class="project-kind">Website · Wellness</p>'),
    ('<p class="project-lede">Un centro de masajes en Perth, en dos idiomas.</p>', '<p class="project-lede">A massage studio in Perth, in two languages.</p>'),
    ('<dd>Transmitir calma y lujo, y que reservar fuera fácil desde el móvil.</dd>', '<dd>Convey calm and luxury, and make booking easy on a phone.</dd>'),
    ('<dd>Web bilingüe con vídeo, tratamientos, preguntas frecuentes y reserva directa.</dd>', '<dd>A bilingual website with video, treatments, FAQs and direct booking.</dd>'),
    ('<dd>Una web en inglés y en español, pensada primero para el móvil.</dd>', '<dd>A website in English and Spanish, designed mobile-first.</dd>'),
    ('Galería del centro', 'Studio gallery'),
    # comunes a varias webs
    ('Portada de la web', 'Website home page'),
    ('La web en el móvil', 'The website on mobile'),
    ('<dt>El reto</dt>', '<dt>The challenge</dt>'),
    ('<dt>Lo que hicimos</dt>', '<dt>What we did</dt>'),
    ('<dt>Hoy</dt>', '<dt>Today</dt>'),

    # ---------- servicios ----------
    ('id="services-title" data-reveal>Qué hacemos</h2>', 'id="services-title" data-reveal>What we do</h2>'),
    ('<span class="svc-word">Webs y landings</span><span class="svc-fact">Landings, webs corporativas y tiendas, rápidas y a medida.</span>',
     '<span class="svc-word">Websites &amp; landings</span><span class="svc-fact">Landing pages, business sites and online stores, fast and tailor-made.</span>'),
    ('<span class="svc-fact">iOS y Android, de negocio o de entretenimiento, con su ficha en las tiendas.</span>', '<span class="svc-fact">iOS and Android, for business or entertainment, including their store listings.</span>'),
    ('<span class="svc-word">Diseño</span><span class="svc-fact">Marca, pantallas y prototipos antes de programar.</span>',
     '<span class="svc-word">Design</span><span class="svc-fact">Brand, screens and prototypes before coding.</span>'),
    ('<span class="svc-word">TPV</span><span class="svc-fact">Kiosco, cocina y caja para restaurantes.</span>',
     '<span class="svc-word">POS</span><span class="svc-fact">Kiosk, kitchen and till for restaurants.</span>'),
    ('<span class="svc-word">Plataformas a medida</span><span class="svc-fact">Plataformas personalizadas, paneles y SaaS como EasyClase o Archivum.</span>',
     '<span class="svc-word">Custom platforms</span><span class="svc-fact">Custom platforms, dashboards and SaaS like EasyClase or Archivum.</span>'),
    ('<span class="svc-word">Y después</span><span class="svc-fact">Mantenimiento y mejoras contigo.</span>',
     '<span class="svc-word">And after</span><span class="svc-fact">Maintenance and improvements, together.</span>'),

    # ---------- TPV en vivo ----------
    ('id="tpv-title" data-reveal>Prueba el TPV</h2>', 'id="tpv-title" data-reveal>Try the POS</h2>'),
    ('<p class="head-sub" data-reveal>Es el TPV real que usa California en sus dos locales, con datos de prueba. Pide en el kiosco y mira cómo llega la comanda a cocina.</p>',
     '<p class="head-sub" data-reveal>This is the real POS California uses at its two restaurants, with test data. Order at the kiosk and watch the ticket reach the kitchen.</p>'),
    ('aria-label="Pantallas del TPV"', 'aria-label="POS screens"'),
    ('data-route="#/" type="button">Kiosco</button>', 'data-route="#/" type="button">Kiosk</button>'),
    ('data-route="#/cocina" type="button">Cocina</button>', 'data-route="#/cocina" type="button">Kitchen</button>'),
    ('data-route="#/caja" type="button">Caja</button>', 'data-route="#/caja" type="button">Till</button>'),
    ('>Abrir a pantalla completa ↗</a>', '>Open full screen ↗</a>'),
    ('title="Demo del TPV de California"', 'title="California POS demo"'),
    ('aria-label="Encender la demo del TPV"', 'aria-label="Turn on the POS demo"'),
    ('<span class="play">Encender el TPV</span>', '<span class="play">Turn on the POS</span>'),
    ('<p class="device-note">Cocina y caja piden un PIN: en la demo vale cualquiera de 4 cifras.</p>',
     '<p class="device-note">Kitchen and till ask for a PIN: in the demo any 4 digits work. The POS itself is in Spanish and English.</p>'),
    ('<li data-reveal><strong>Kiosco que vende solo.</strong> Salvapantallas en vídeo, español e inglés, y fotos de cada plato.</li>',
     '<li data-reveal><strong>A kiosk that sells on its own.</strong> Video screensaver, Spanish and English, and a photo of every dish.</li>'),
    ('<li data-reveal><strong>Cada plato a su gusto.</strong> Quitar ingredientes, extras y menú con patatas y bebida; el precio se recalcula al momento.</li>',
     '<li data-reveal><strong>Every dish their way.</strong> Remove ingredients, add extras or make it a meal with fries and a drink; the price updates instantly.</li>'),
    ('<li data-reveal><strong>Cocina en tiempo real.</strong> La comanda llega con su temporizador y se marca lista con un toque.</li>',
     '<li data-reveal><strong>Real-time kitchen.</strong> Orders arrive with a timer and are marked ready with one tap.</li>'),
    ('<li data-reveal><strong>Caja y tickets.</strong> Turnos, cobro en efectivo o tarjeta, IVA desglosado e impresión automática.</li>',
     '<li data-reveal><strong>Till and receipts.</strong> Shifts, cash or card payments, itemised tax and automatic printing.</li>'),
    ('<li data-reveal><strong>Varias sedes.</strong> Medina de Pomar y Villarcayo, cada una con su cocina y su caja.</li>',
     '<li data-reveal><strong>Multiple locations.</strong> Medina de Pomar and Villarcayo, each with its own kitchen and till.</li>'),
    ('<li data-reveal><strong>Cumple Verifactu.</strong> Facturación preparada para la normativa de Hacienda, sin sustos.</li>',
     '<li data-reveal><strong>Verifactu compliant.</strong> Invoicing ready for Spain’s tax regulations, no surprises.</li>'),

    # ---------- Fendaria ----------
    ('<p class="head-sub" data-reveal>Nuestra app de aventuras para Android: diseño, animación y código hechos en casa. Elige un personaje y míralo en acción.</p>',
     '<p class="head-sub" data-reveal>Our adventure app for Android: design, animation and code made in-house. Pick a character and see it in action.</p>'),
    ('alt="Kara, la Rompeyelmos">', 'alt="Kara, the Helmbreaker">'),
    ('aria-label="Acciones"', 'aria-label="Actions"'),
    ('data-move="idle" aria-pressed="true">Reposo</button>', 'data-move="idle" aria-pressed="true">Idle</button>'),
    ('data-move="attack" aria-pressed="false">Ataque</button>', 'data-move="attack" aria-pressed="false">Attack</button>'),
    ('data-move="cast" aria-pressed="false">Habilidad</button>', 'data-move="cast" aria-pressed="false">Skill</button>'),
    ('data-move="dash" aria-pressed="false">Esquiva</button>', 'data-move="dash" aria-pressed="false">Dodge</button>'),
    ('<p class="hero-role" id="heroRole">Guerrera cuerpo a cuerpo</p>', '<p class="hero-role" id="heroRole">Melee warrior</p>'),
    ('<h3 class="hero-name" id="heroName">Kara, la Rompeyelmos</h3>', '<h3 class="hero-name" id="heroName">Kara, the Helmbreaker</h3>'),
    ('<p class="hero-sum" id="heroSum">Guerrera de primera línea. Aguanta mucho castigo, golpea en arco a todo lo que tenga cerca y salta al centro de la pelea con su hacha.</p>',
     '<p class="hero-sum" id="heroSum">Front-line warrior. She takes a beating, swings in an arc at everything nearby and leaps into the thick of the fight with her axe.</p>'),
    ('<p class="hero-ult"><span>Definitiva</span> <strong id="heroUlt">Torbellino de Acero</strong></p>',
     '<p class="hero-ult"><span>Ultimate</span> <strong id="heroUlt">Steel Whirlwind</strong></p>'),
    ('aria-label="Héroes"', 'aria-label="Heroes"'),
    ('<span class="soon">Próximamente en Google Play</span>', '<span class="soon">Coming soon to Google Play</span>'),
    ('aria-label="Cinemática del prólogo de Fendaria"', 'aria-label="Fendaria prologue cutscene"'),
    ('<figcaption>Prólogo: la Orden de las Runas, el Cerrajero y los siete héroes.</figcaption>',
     '<figcaption>Prologue: the Order of Runes, the Locksmith and the seven heroes.</figcaption>'),
    ('alt="El héroe ante el Portal Rúnico de la plaza"', 'alt="The hero in front of the Rune Portal in the square"'),
    ('<figcaption>El Portal Rúnico</figcaption>', '<figcaption>The Rune Portal</figcaption>'),
    ('alt="Subida de nivel en mitad de una Grieta"', 'alt="Levelling up in the middle of a Rift"'),
    ('<figcaption>Dentro de una Grieta</figcaption>', '<figcaption>Inside a Rift</figcaption>'),

    # ---------- opiniones ----------
    ('id="voices-title" data-reveal>Lo que dicen</h2>', 'id="voices-title" data-reveal>What clients say</h2>'),
    ('<blockquote><p>«Desde que tenemos el kiosco, los clientes piden solos y la comanda sale directa en cocina. En los dos locales usamos el mismo sistema y la caja cuadra sin líos.»</p></blockquote>',
     '<blockquote><p>“Since we got the kiosk, customers order on their own and the ticket goes straight to the kitchen. Both restaurants use the same system and the till always balances.”</p></blockquote>'),
    ('<span>Dueño de California · TPV</span>', '<span>Owner of California · POS</span>'),
    ('<blockquote><p>«Por fin tenemos una web que enseña nuestro trabajo como se merece. Ahora los clientes nos llegan con la idea clara después de ver la galería.»</p></blockquote>',
     '<blockquote><p>“We finally have a website that shows our work the way it deserves. Now clients come to us with a clear idea after seeing the gallery.”</p></blockquote>'),
    ('<span>Dueño de Vitrales Perafán · Web</span>', '<span>Owner of Vitrales Perafán · Website</span>'),
    ('<blockquote><p>«La web transmite exactamente lo que es Althaya: calma y cuidado. Y reservar desde el móvil es facilísimo, en inglés o en español.»</p></blockquote>',
     '<blockquote><p>“The website captures exactly what Althaya is: calm and care. And booking from your phone is effortless, in English or Spanish.”</p></blockquote>'),
    ('<span>CEO de Althaya · Web</span>', '<span>CEO of Althaya · Website</span>'),

    # ---------- proceso ----------
    ('id="process-title" data-reveal>¿Cómo trabajamos?</h2>', 'id="process-title" data-reveal>How do we work?</h2>'),
    ('<p data-reveal><strong>Para empezar,</strong> una llamada. Nos cuentas qué quieres conseguir, no qué tecnología usar, y te mandamos por escrito qué vamos a hacer, cuánto cuesta y cuándo estará.</p>',
     '<p data-reveal><strong>First,</strong> a call. You tell us what you want to achieve, not which technology to use, and we send you in writing what we will build, what it costs and when it will be ready.</p>'),
    ('alt="Vitrales Perafán en móvil"', 'alt="Vitrales Perafán on mobile"'),
    ('alt="Althaya en móvil"', 'alt="Althaya on mobile"'),
    ('alt="Inicio del kiosco de California"', 'alt="California kiosk start screen"'),
    ('<p data-reveal><strong>En la primera semana,</strong> diseño. Marca, pantallas y recorrido completo antes de escribir código, para que veas tu producto y lo cambies cuando todavía es barato.</p>',
     '<p data-reveal><strong>In the first week,</strong> design. Brand, screens and the full journey before writing code, so you see your product and can change it while it is still cheap.</p>'),
    ('aria-label="Animación de entrada de Lumen Studio"', 'aria-label="Lumen Studio intro animation"'),
    ('<figcaption>Nuestra intro animada, programada a mano para Fendaria.</figcaption>', '<figcaption>Our animated intro, hand-coded for Fendaria.</figcaption>'),
    ('<p data-reveal><strong>Después,</strong> código propio. Nada de plantillas: cada animación, cada pantalla y cada sonido se escribe para tu proyecto.</p>',
     '<p data-reveal><strong>Then,</strong> our own code. No templates: every animation, screen and sound is written for your project.</p>'),
    ('alt="Personalizar un kebab en el kiosco: quitar ingredientes y extras"', 'alt="Customising a kebab on the kiosk: removing ingredients and adding extras"'),
    ('<p data-reveal><strong>Al publicar,</strong> nos quedamos. Subimos la web a tu dominio o la app a Google Play, medimos cómo se usa y seguimos mejorándola contigo.</p>',
     '<p data-reveal><strong>At launch,</strong> we stay. We put the site on your domain or the app on Google Play, measure how it is used and keep improving it with you.</p>'),

    # ---------- presupuesto ----------
    ('id="quote-title" data-reveal>Calcula tu proyecto</h2>', 'id="quote-title" data-reveal>Price your project</h2>'),
    ('<p class="head-sub" data-reveal>Elige qué necesitas y te damos un precio orientativo en dólares al momento. Luego lo afinamos juntos, sin compromiso.</p>',
     '<p class="head-sub" data-reveal>Choose what you need and get an instant estimate in US dollars. Then we fine-tune it together, no strings attached.</p>'),
    ('<legend>¿Qué quieres construir?</legend>', '<legend>What do you want to build?</legend>'),
    ('<legend id="calcSizeLabel">Tamaño</legend>', '<legend id="calcSizeLabel">Size</legend>'),
    ('<legend>Extras</legend>', '<legend>Extras</legend>'),
    ('<p class="calc-kicker">Precio orientativo</p>', '<p class="calc-kicker">Estimated price</p>'),
    ('>Pedir propuesta por WhatsApp</a>', '>Ask for a proposal on WhatsApp</a>'),
    ('id="calcToForm">Enviarlo por el formulario</button>', 'id="calcToForm">Send it through the form</button>'),
    ('<p class="calc-note">Precios orientativos en dólares (USD), sin impuestos. El precio final lo cerramos por escrito antes de empezar.</p>',
     '<p class="calc-note">Estimated prices in US dollars (USD), before taxes. We agree the final price in writing before we start.</p>'),

    # ---------- contacto ----------
    ('<h2 class="h-l" id="contact-title">¿Qué quieres construir?</h2>', '<h2 class="h-l" id="contact-title">What do you want to build?</h2>'),
    ('<p class="contact-sub">Cuéntanos tu idea y te respondemos con una propuesta. Si lo prefieres, escríbenos por WhatsApp.</p>',
     '<p class="contact-sub">Tell us your idea and we will reply with a proposal. If you prefer, message us on WhatsApp.</p>'),
    ('href="mailto:pietersd05@gmail.com?subject=Proyecto%20para%20Lumen%20Studio"', 'href="mailto:pietersd05@gmail.com?subject=Project%20for%20Lumen%20Studio"'),
    ('<label for="cfName">Nombre</label>', '<label for="cfName">Name</label>'),
    ('<label for="cfType">Tipo de proyecto</label>', '<label for="cfType">Project type</label>'),
    ('<option>Web</option><option>App</option><option>TPV</option><option>A medida</option><option>Aún no lo sé</option>',
     '<option value="Web">Website</option><option value="App">App</option><option value="TPV">POS</option><option value="A medida">Custom</option><option value="Aún no lo sé">Not sure yet</option>'),
    ('<label for="cfMsg">Mensaje</label>', '<label for="cfMsg">Message</label>'),
    ('placeholder="Qué necesitas, para cuándo y cualquier enlace que nos sirva…"', 'placeholder="What you need, by when, and any links that help…"'),
    ('<p class="field--wide form-legal">Al enviar autorizas el tratamiento de tus datos según nuestra <a href="privacidad.html">política de privacidad</a>. Solo los usamos para responderte.</p>',
     '<p class="field--wide form-legal">By sending, you authorise us to process your data under our <a href="../privacidad.html" hreflang="es">privacy policy</a> (in Spanish). We only use it to reply to you.</p>'),
    ('id="cfSend">Enviar mensaje</button>', 'id="cfSend">Send message</button>'),

    # ---------- pie ----------
    ('aria-label="Pie de página"', 'aria-label="Footer"'),
    ('<a href="#tpv">TPV</a>', '<a href="#tpv">POS</a>'),
    ('<a href="aviso-legal.html">Aviso legal</a>', '<a href="../aviso-legal.html" hreflang="es">Legal notice (ES)</a>'),
    ('<a href="privacidad.html">Privacidad</a>', '<a href="../privacidad.html" hreflang="es">Privacy (ES)</a>'),
    ('<a href="cookies.html">Cookies</a>', '<a href="../cookies.html" hreflang="es">Cookies (ES)</a>'),
    ('<a href="en/" hreflang="en" lang="en">English</a>', '<a href="../" hreflang="es" lang="es">Español</a>'),
    ('aria-label="Escríbenos por WhatsApp"', 'aria-label="Message us on WhatsApp"'),

    # ---------- juego ----------
    ('aria-label="Champi, la mascota de Lumen Studio: tócala para preguntarle o arrástrala"', 'aria-label="Champi, the Lumen Studio mascot: tap to ask a question or drag it around"'),
    ('<strong id="champiChatTitle">Pregúntale a Champi</strong>', '<strong id="champiChatTitle">Ask Champi</strong>'),
    ('aria-label="Cerrar el chat"', 'aria-label="Close the chat"'),
    ('placeholder="Escribe tu pregunta…" aria-label="Tu pregunta para Champi"', 'placeholder="Type your question…" aria-label="Your question for Champi"'),
    ('aria-label="Enviar la pregunta"', 'aria-label="Send the question"'),
    ('aria-label="Ocultar a Champi"', 'aria-label="Hide Champi"'),
    ('id="champiBack" type="button" hidden>Volver a ver a Champi</button>', 'id="champiBack" type="button" hidden>Bring Champi back</button>'),
]

# mensajes de WhatsApp precargados
WA_PAIRS = [
    ('Hola%20Lumen%20Studio%2C%20me%20gustar%C3%ADa%20cotizar%20una%20web%20de%20', 'Hi%20Lumen%20Studio%2C%20I%20would%20like%20a%20quote%20for%20'),
    ('Hola%20Lumen%20Studio%2C%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto%3A%20', 'Hi%20Lumen%20Studio%2C%20I%20would%20like%20a%20quote%20for%20a%20project%3A%20'),
]

# rutas relativas: la página inglesa vive en /en/
PATHS = [
    ('href="assets/', 'href="../assets/'), ('src="assets/', 'src="../assets/'), ('data-src="assets/', 'data-src="../assets/'),
    ('poster="assets/', 'poster="../assets/'), ('href="css/', 'href="../css/'), ('src="js/', 'src="../js/'),
    ('data-src="demos/tpv/"', 'data-src="../demos/tpv/"'), ('href="demos/tpv/"', 'href="../demos/tpv/"'),
]


def main():
    src = (ROOT / 'index.html').read_text(encoding='utf-8')
    out = src
    missing = []
    for es, en in PAIRS + WA_PAIRS:
        if es not in out:
            missing.append(es)
            continue
        out = out.replace(es, en)
    if missing:
        print('Frases que ya no están en index.html (corrige los pares):', file=sys.stderr)
        for m in missing:
            print('  -', m[:110], file=sys.stderr)
        sys.exit(1)
    for a, b in PATHS:
        out = out.replace(a, b)
    (ROOT / 'en').mkdir(exist_ok=True)
    (ROOT / 'en' / 'index.html').write_text(out, encoding='utf-8')
    print('en/index.html generado')


if __name__ == '__main__':
    main()
