#!/usr/bin/env python3
"""Genera assets/data/champi-faq.json: las preguntas guardadas de Champi (se responden sin gastar créditos).

Uso:  python3 tools/champi_faq.py
Cada entrada: a(id, palabras_clave, respuesta_es, respuesta_en, intent opcional "price" o "time").
"""
import json
WA='+57 311 873 9670'
E=[]
def a(id, k, es, en, intent=None, en_k=None):
    d={'id':id,'k':k,'es':es,'en':en}
    if id in ('hola','gracias','adios'): d['weak']=True
    if id in ('precio_general','plazo_general'): d['base']=True
    if intent: d['intent']=intent
    E.append(d)

# ---------- saludos y cortesía ----------
a('hola',['hola','buenas','buenos dias','buenas tardes','buenas noches','hey','hi','hello','good morning','que tal'],
  '¡Hola! Soy Champi. Pregúntame por webs, apps, el TPV, precios o plazos.','Hi! I’m Champi. Ask me about websites, apps, the POS, prices or timelines.')
a('gracias',['gracias','muchas gracias','genial','perfecto','thanks','thank you','great','awesome'],
  '¡A ti! Si quieres seguir, escríbenos por WhatsApp al '+WA+' y lo vemos con calma.','You’re welcome! If you want to go further, message us on WhatsApp at '+WA+' and we’ll take it from there.')
a('adios',['adios','chao','hasta luego','nos vemos','bye','goodbye','see you'],
  '¡Hasta pronto! Aquí estaré paseando por la web.','See you soon! I’ll be here, wandering around the site.')

# ---------- el estudio ----------
a('quienes',['quienes sois','quienes son','que es lumen','que hace lumen','que hacen','a que se dedican','sobre ustedes','who are you guys','what is lumen','what do you do','about you','lumen studio'],
  'Lumen Studio es un estudio que diseña y programa webs, apps y TPV para restaurantes. Nuestro lema: «Encendemos tus ideas».','Lumen Studio is a studio that designs and builds websites, apps and restaurant POS systems. Our motto: “We light up your ideas.”')
a('donde',['donde estan','donde estais','ubicados','ubicacion','bogota','colombia','de donde son','pais','where are you','located','based','location','city'],
  'Estamos en Bogotá, Colombia, y trabajamos en remoto con clientes de cualquier país.','We are in Bogotá, Colombia, and work remotely with clients in any country.')
a('remoto',['remoto','a distancia','otro pais','fuera de colombia','espana','mexico','internacional','remote','another country','abroad','international','usa','australia'],
  'Sí, trabajamos en remoto con clientes de cualquier país. Por ejemplo, Althaya está en Perth (Australia), Amieva en Florida (Estados Unidos) y California en España.','Yes, we work remotely with clients anywhere. For example, Althaya is in Perth (Australia), Amieva is in Florida (USA) and California is in Spain.')
a('idiomas',['idioma','idiomas','ingles','espanol','hablan ingles','language','languages','english','spanish','speak english'],
  'Trabajamos en español y en inglés, y podemos hacer tu web o tu app en los dos idiomas.','We work in Spanish and English, and we can build your site or app in both languages.')
a('presencial',['presencial','oficina','visitar','reunion en persona','en persona','office','in person','visit you','meet in person'],
  'Trabajamos en remoto: las reuniones son por videollamada o WhatsApp. Escríbenos al '+WA+' y agendamos una.','We work remotely: meetings are by video call or WhatsApp. Message us at '+WA+' and we’ll set one up.')
a('empresa',['nit','razon social','empresa registrada','legal','constituida','company registered','tax id','legal entity'],
  'La razón social es Lumen y está en proceso de constitución; el NIT se publicará en el aviso legal en cuanto esté. Los detalles están en el aviso legal de la web.','The legal name is Lumen and the company is being incorporated; its tax ID will appear in the legal notice as soon as it’s ready. Details are in the site’s legal notice.')
a('plantillas',['plantilla','plantillas','wordpress','wix','shopify','template','templates','codigo propio','a medida','custom code'],
  'Programamos a medida, sin plantillas: cada pantalla y cada animación se hacen para tu proyecto. Si necesitas una herramienta concreta, cuéntaselo al equipo por WhatsApp.','We build custom, no templates: every screen and animation is made for your project. If you need a specific tool, tell the team on WhatsApp.')
a('tecnologia',['tecnologia','tecnologias','lenguaje','react','next','javascript','que usan para programar','tech stack','technology','framework','stack'],
  'Elegimos la tecnología según tu proyecto. Lo importante para nosotros es lo que quieres conseguir, no la herramienta.','We pick the technology for each project. What matters to us is what you want to achieve, not the tool.')

# ---------- servicios ----------
a('servicios',['servicios','que ofrecen','que hacen ustedes','que pueden hacer','en que me ayudan','services','what can you do','what do you offer'],
  'Hacemos webs, apps para Android e iPhone, TPV para restaurantes, software a medida y diseño de marca y pantallas, y seguimos contigo después de publicar.','We build websites, Android and iPhone apps, restaurant POS systems, custom software and brand and screen design, and we stay with you after launch.')
a('web',['web','pagina web','sitio web','pagina','website','site','webpage'],
  'Hacemos landings, webs corporativas y tiendas online, rápidas y a medida. Mira Vitrales Perafán o Althaya en Proyectos.','We build landing pages, business sites and online stores, fast and tailor-made. Check out Vitrales Perafán or Althaya in Projects.')
a('landing',['landing','una sola pagina','pagina de aterrizaje','one page','landing page','single page'],
  'Una landing es una web de una sola página para presentar tu negocio y que te contacten, como la de Amieva Cleaning Service. Suele estar en unas 2 semanas.','A landing page is a one-page site to present your business and get people to contact you, like Amieva Cleaning Service’s. It usually takes about 2 weeks.')
a('tienda',['tienda online','tienda virtual','ecommerce','e-commerce','vender por internet','vender online','carrito','online store','sell online','shop'],
  'Sí, hacemos tiendas online a medida. Una tienda va de US$ 3.000 a 6.000 según lo que necesites, y suele estar en unas 6 semanas.','Yes, we build custom online stores. A store runs US$ 3,000–6,000 depending on what you need, and usually takes about 6 weeks.')
a('corporativa',['corporativa','web de empresa','web corporativa','varias paginas','business site','company website','corporate'],
  'Una web corporativa tiene hasta 8 páginas para presentar tu empresa, servicios y contacto. Va de US$ 1.500 a 3.000 y suele estar en unas 4 semanas.','A business site has up to 8 pages to present your company, services and contact. It runs US$ 1,500–3,000 and usually takes about 4 weeks.')
a('rediseno',['redisenar','rediseno','renovar mi web','rehacer mi web','mejorar mi web','ya tengo web','web vieja','actualizar mi web','redesign','redo my website','improve my website','old website','already have a website'],
  'Sí, también rehacemos webs que ya existen: empezamos viendo qué quieres conseguir y qué no funciona hoy. Escríbenos por WhatsApp con el enlace de tu web.','Yes, we also rebuild existing websites: we start by looking at what you want to achieve and what isn’t working today. Message us on WhatsApp with your site’s link.')
a('app',['app','app para celular','aplicacion para celular','celular','aplicacion','aplicacion movil','app movil','apps','application','mobile app'],
  'Hacemos apps para Android e iPhone, de negocio o de entretenimiento, con su ficha en las tiendas. Mira Archivum y Fendaria en Proyectos.','We build Android and iPhone apps, for business or entertainment, including their store listings. Check out Archivum and Fendaria in Projects.')
a('android_ios',['android y iphone','android e iphone','las dos plataformas','ambas','ios y android','both platforms','android and iphone','android and ios'],
  'Sí, podemos hacer tu app para Android y para iPhone a la vez. Las dos juntas van de US$ 8.000 a 16.000 y suelen estar en unas 10 semanas.','Yes, we can build your app for both Android and iPhone. Both together run US$ 8,000–16,000 and usually take about 10 weeks.')
a('publicar_tienda',['google play','app store','publicar la app','subir la app','tiendas de apps','publish the app','play store','store listing'],
  'Nos encargamos de publicar tu app en Google Play y, si la quieres en iPhone, en la App Store, con su ficha preparada.','We take care of publishing your app on Google Play and, if you want it on iPhone, the App Store, with its listing ready.')
a('tpv',['tpv','punto de venta','sistema para restaurante','software para restaurante','kiosco','pos','point of sale','restaurant software'],
  'Nuestro TPV para restaurantes tiene kiosco de autoservicio, pantalla de cocina, caja con tickets y varias sedes, y cumple Verifactu. Puedes probar el real en la sección «Prueba el TPV».','Our restaurant POS has a self-service kiosk, kitchen display, till with receipts and multi-location support, and it complies with Verifactu. You can try the real one in the “Try the POS” section.')
a('medida',['a medida','software a medida','sistema a medida','herramienta interna','panel','dashboard','saas','plataforma','custom software','internal tool','platform'],
  'Sí, hacemos plataformas a medida: herramientas internas, paneles con informes, facturación o plataformas como EasyClase y Archivum.','Yes, we build custom platforms: internal tools, reporting dashboards, invoicing or platforms like EasyClase and Archivum.')
a('diseno',['diseno','logo','marca','branding','identidad','prototipo','ui','ux','design','brand','prototype'],
  'Hacemos diseño de marca, pantallas y prototipos antes de programar, para que veas tu producto y lo cambies cuando todavía es barato.','We do brand, screen and prototype design before coding, so you can see your product and change it while it’s still cheap.')
a('seo',['seo','google','posicionamiento','salir en google','aparecer en google','buscadores','search engine','rank on google'],
  'Sí, podemos dejar tu web lista para Google con un SEO inicial (desde unos US$ 300). Para campañas continuas, cuéntaselo al equipo.','Yes, we can get your site ready for Google with initial SEO (from about US$ 300). For ongoing campaigns, tell the team.')
a('multidioma',['varios idiomas','multidioma','bilingue','dos idiomas','traducir mi web','multilingual','bilingual','two languages'],
  'Sí, hacemos webs y apps en varios idiomas; en la calculadora es un extra desde unos US$ 300. Althaya, por ejemplo, está en inglés y en español.','Yes, we build multilingual sites and apps; in the calculator it’s an extra from about US$ 300. Althaya, for example, is in English and Spanish.')
a('reservas',['reservas','citas','agenda','reservar','booking','appointments','schedule'],
  'Sí, podemos añadir reservas o citas a tu web; en la calculadora es un extra desde unos US$ 500.','Yes, we can add bookings or appointments to your site; in the calculator it’s an extra from about US$ 500.')
a('blog',['blog','gestor de contenidos','cms','editar yo mismo','actualizar yo mismo','edit it myself','content manager'],
  'Sí, podemos añadir un blog o un gestor para que actualices tus contenidos; en la calculadora es un extra desde unos US$ 300.','Yes, we can add a blog or a content manager so you can update your content; in the calculator it’s an extra from about US$ 300.')
a('pagos',['pagos','pasarela','cobrar online','pagar con tarjeta en la web','pagos en la app','payments','payment gateway','charge online'],
  'Sí, podemos integrar pagos en tu tienda o en tu app; en la calculadora, los pagos dentro de una app son un extra desde unos US$ 1.200.','Yes, we can integrate payments in your store or app; in the calculator, in-app payments are an extra from about US$ 1,200.')
a('login',['login','usuarios','registro','iniciar sesion','cuentas de usuario','users','sign up','accounts'],
  'Sí, tu app puede tener usuarios con registro e inicio de sesión; es un extra desde unos US$ 800.','Yes, your app can have users with sign-up and login; it’s an extra from about US$ 800.')
a('notificaciones',['notificaciones','push','avisos','notifications','alerts'],
  'Sí, podemos añadir notificaciones a tu app; es un extra desde unos US$ 500.','Yes, we can add notifications to your app; it’s an extra from about US$ 500.')
a('integraciones',['integrar','integracion','conectar con','api','otras herramientas','integration','connect with','other tools'],
  'Sí, podemos conectar tu sistema con otras herramientas que ya uses; es un extra desde unos US$ 800. Cuéntale al equipo cuáles son.','Yes, we can connect your system with other tools you already use; it’s an extra from about US$ 800. Tell the team which ones.')
a('mantenimiento',['mantenimiento','soporte','despues de publicar','actualizaciones','arreglos','maintenance','support','after launch','updates'],
  'Después de publicar seguimos contigo: mantenimiento, mejoras y soporte. En el TPV el mantenimiento son US$ 39 al mes por local; para webs y apps lo acordamos contigo.','After launch we stay with you: maintenance, improvements and support. For the POS it’s US$ 39 a month per location; for sites and apps we agree it with you.')
a('hosting',['hosting','alojamiento','dominio','servidor','donde se aloja','domain','server','host'],
  'Nosotros publicamos la web en tu dominio. Para los costes de dominio y alojamiento en tu caso, pregúntale al equipo por WhatsApp.','We publish the site on your domain. For domain and hosting costs in your case, ask the team on WhatsApp.')
a('redes_lumen',['redes','redes sociales','instagram','tiktok','insta','tienen redes','seguirlos','los sigo','social media','follow you','your instagram','your tiktok'],
  'Síguenos en Instagram como @lumen_studio_tech y en TikTok como @lumenestudiotech. Ahí sale Champi casi siempre.','Follow us on Instagram at @lumen_studio_tech and on TikTok at @lumenestudiotech. Champi shows up there almost every time.')
a('redes',['marketing','publicidad','anuncios','community manager','manejo de redes','manejan redes','manejar mis redes','manage my social media','ads','advertising'],
  'Nos centramos en webs, apps y TPV. Para marketing o redes sociales, cuéntale al equipo qué necesitas por WhatsApp.','We focus on websites, apps and POS systems. For marketing or social media, tell the team what you need on WhatsApp.')
a('juegos',['videojuego','videojuegos','juego para mi','hacer un juego','video game','make a game','game development'],
  'Hoy nos centramos en webs, apps y TPV. Fendaria es nuestra propia app de aventuras, que llegará pronto a Google Play.','Today we focus on websites, apps and POS systems. Fendaria is our own adventure app, coming soon to Google Play.')

# ---------- precios ----------
P='price'
a('precio_general',['precio','precios','cuanto cuesta','cuanto vale','cuanto cobran','costo','tarifa','presupuesto','cotizacion','cotizar','price','prices','cost','how much','quote','rates'],
  'Depende de lo que necesites: una landing va de US$ 600 a 1.200, una web corporativa de 1.500 a 3.000 y una app desde unos US$ 5.000. La calculadora de la página te da el rango al momento.','It depends on what you need: a landing page is US$ 600–1,200, a business site 1,500–3,000 and an app from about US$ 5,000. The calculator on this page gives you the range instantly.',P)
a('precio_web',['web','pagina','sitio','website','site'],
  'Una landing va de US$ 600 a 1.200, una web corporativa de 1.500 a 3.000 y una tienda online de 3.000 a 6.000. Los extras se suman; la calculadora te da el total.','A landing page is US$ 600–1,200, a business site 1,500–3,000 and an online store 3,000–6,000. Extras add on; the calculator gives you the total.',P)
a('precio_landing',['landing','una pagina','one page'],
  'Una landing de una página va de US$ 600 a 1.200, sin impuestos.','A one-page landing runs US$ 600–1,200, before taxes.',P)
a('precio_tienda',['tienda','tienda online','tienda virtual','online store','ecommerce','store','shop'],
  'Una tienda online va de US$ 3.000 a 6.000 según los productos y extras que necesites.','An online store runs US$ 3,000–6,000 depending on the products and extras you need.',P)
a('precio_corporativa',['corporativa','empresa','business site','corporate'],
  'Una web corporativa de hasta 8 páginas va de US$ 1.500 a 3.000.','A business site of up to 8 pages runs US$ 1,500–3,000.',P)
a('precio_app',['app','app movil','aplicacion movil','mobile app','aplicacion','android','iphone','ios','application'],
  'Una app para Android o para iPhone va de US$ 5.000 a 10.000, y para los dos de 8.000 a 16.000. Usuarios, pagos o notificaciones se suman como extras.','An app for Android or iPhone runs US$ 5,000–10,000, and for both 8,000–16,000. Users, payments or notifications add on as extras.',P)
a('precio_tpv',['tpv','kiosco','restaurante','pos','local','locales','sede','sedes'],
  'El TPV va de US$ 500 a 900 para 1 local, de 800 a 1.400 para 2 y de 1.200 a 2.200 para 3 o más, más US$ 39 al mes por local. Kiosco, pantalla de cocina o impresoras se suman como extras.','The POS runs US$ 500–900 for 1 location, 800–1,400 for 2 and 1,200–2,200 for 3 or more, plus US$ 39 a month per location. Kiosk, kitchen display or printers add on as extras.',P)
a('precio_medida',['medida','saas','plataforma','herramienta','sistema','software','platform','tool'],
  'Una herramienta interna a medida va de US$ 2.000 a 5.000 y una plataforma o SaaS de 8.000 a 25.000, según lo que lleve.','A custom internal tool runs US$ 2,000–5,000 and a platform or SaaS 8,000–25,000, depending on the features.',P)
a('precio_mensual',['mensual','al mes','mensualidad','cuota','suscripcion','monthly','per month','subscription','fee'],
  'El TPV tiene una cuota de US$ 39 al mes por local. Para webs y apps no hay cuota obligatoria: el mantenimiento lo acordamos contigo.','The POS has a fee of US$ 39 a month per location. Sites and apps have no mandatory fee: we agree maintenance with you.')
a('impuestos',['impuestos','iva','incluye iva','con impuestos','taxes','tax','vat'],
  'Los precios de la web son orientativos, en dólares y sin impuestos. El precio final, con todo incluido, te lo damos por escrito antes de empezar.','The prices on the site are estimates, in US dollars and before taxes. We give you the final price, all included, in writing before we start.')
a('moneda',['dolares','pesos','euros','moneda','usd','cop','currency','dollars'],
  'Los precios están en dólares estadounidenses (USD). Si prefieres otra moneda, coméntalo con el equipo al pedir la propuesta.','Prices are in US dollars (USD). If you prefer another currency, mention it to the team when you ask for a proposal.')
a('pago_forma',['forma de pago','como se paga','metodos de pago','anticipo','pago por adelantado','cuotas','plazos de pago','formas de pago','medios de pago','como pagar','como pago','pagar','financiacion','payment methods','how do i pay','deposit','installments'],
  'La forma de pago la acordamos contigo en la propuesta por escrito. Escríbenos por WhatsApp al '+WA+' y te lo explicamos.','We agree how payment works with you in the written proposal. Message us on WhatsApp at '+WA+' and we’ll explain.')
a('descuento',['descuento','oferta','promocion','mas barato','rebaja','discount','offer','cheaper','deal'],
  'Para descuentos o ajustes de presupuesto, habla con el equipo por WhatsApp: siempre buscamos la opción que encaje contigo.','For discounts or budget adjustments, talk to the team on WhatsApp: we always look for the option that fits you.')
a('presupuesto_gratis',['presupuesto gratis','sin compromiso','cobran por el presupuesto','cotizacion gratis','free quote','no commitment'],
  'Sí: la propuesta es sin compromiso. Nos cuentas tu idea y te enviamos por escrito qué haremos, cuánto cuesta y cuándo estará.','Yes: the proposal comes with no commitment. You tell us your idea and we send you in writing what we’ll do, what it costs and when it’ll be ready.')
a('calculadora',['calculadora','calcular','como calculo','simulador','calculator','estimate'],
  'En la sección «Calcula tu proyecto» eliges qué quieres construir, el tamaño y los extras, y ves al momento un precio orientativo y el plazo. Luego puedes enviarlo por WhatsApp o por el formulario.','In “Price your project” you choose what to build, the size and the extras, and you instantly see an estimated price and timeline. Then you can send it on WhatsApp or through the form.')

# ---------- plazos ----------
Tm='time'
a('plazo_general',['plazo','plazos','cuanto tarda','cuanto tardan','tiempo','semanas','cuando estaria','entrega','how long','timeline','when','delivery','weeks'],
  'Una landing está en unas 2 semanas, una web corporativa en 4, una tienda en 6 y una app en 8 a 10. La fecha te la damos por escrito antes de empezar.','A landing page takes about 2 weeks, a business site 4, an online store 6 and an app 8 to 10. We put the date in writing before we start.',Tm)
a('plazo_app',['app','aplicacion','android','iphone'],
  'Una app suele estar en unas 8 semanas para un sistema y 10 para Android e iPhone juntos, según los extras.','An app usually takes about 8 weeks for one platform and 10 for Android and iPhone together, depending on the extras.',Tm)
a('plazo_tpv',['tpv','kiosco','restaurante','pos'],
  'El TPV suele estar en 2 a 4 semanas según el número de locales y los extras.','The POS usually takes 2 to 4 weeks depending on the number of locations and the extras.',Tm)
a('plazo_tienda',['tienda','tienda online','tienda virtual','online store','store','shop'],
  'Una tienda online suele estar en unas 6 semanas.','An online store usually takes about 6 weeks.',Tm)
a('urgente',['urgente','rapido','para ya','lo antes posible','esta semana','urgent','asap','rush','fast'],
  '¿Lo necesitas rápido? Escríbenos por WhatsApp al '+WA+' con la fecha que tienes en mente y vemos si llegamos.','Need it fast? Message us on WhatsApp at '+WA+' with the date you have in mind and we’ll see if we can make it.')

# ---------- proceso ----------
a('proceso',['proceso','como trabajan','como funciona','pasos','metodologia','como es el proceso','process','how do you work','steps'],
  'Primero una llamada para entender qué quieres conseguir; luego te enviamos por escrito qué haremos, cuánto cuesta y cuándo estará. La primera semana diseñamos, después programamos y al publicar seguimos contigo.','First a call to understand what you want to achieve; then we send you in writing what we’ll build, what it costs and when it’ll be ready. We design in the first week, then code, and after launch we stay with you.')
a('empezar',['como empiezo','como empezamos','quiero empezar','primer paso','contratar','quiero una web','quiero una app','me interesa','how do i start','get started','hire you','i want a website','i want an app'],
  '¡Genial! Escríbenos por WhatsApp al '+WA+' o usa el formulario de abajo contándonos tu idea, y te respondemos con una propuesta.','Great! Message us on WhatsApp at '+WA+' or use the form below with your idea, and we’ll reply with a proposal.')
a('necesito',['que necesito','que debo tener','que les envio','que informacion','textos','fotos','contenido','what do i need','what should i send','content','photos'],
  'Basta con que nos cuentes qué quieres conseguir y para cuándo; si tienes textos, fotos o webs que te gusten, mejor. El resto te lo vamos guiando.','Just tell us what you want to achieve and by when; if you have texts, photos or sites you like, even better. We’ll guide you through the rest.')
a('cambios',['cambios','revisiones','modificar','no me gusta','corregir','changes','revisions','edit','modify'],
  'Te enseñamos el diseño antes de programar para que lo cambies cuando todavía es barato. El alcance y las revisiones quedan por escrito en la propuesta.','We show you the design before coding so you can change it while it’s still cheap. The scope and revisions are set in writing in the proposal.')
a('propiedad',['codigo es mio','propiedad','soy dueno','derechos','me entregan el codigo','ownership','own the code','rights'],
  'Esos detalles quedan por escrito en la propuesta. Pregúntale al equipo por WhatsApp y te lo aclara antes de empezar.','Those details are set in writing in the proposal. Ask the team on WhatsApp and they’ll clarify it before you start.')
a('garantia',['garantia','si falla','errores','bugs','fallos','warranty','guarantee','if it breaks'],
  'Después de publicar seguimos contigo con mantenimiento y soporte. Las condiciones exactas van por escrito en la propuesta.','After launch we stay with you with maintenance and support. The exact terms are in writing in the proposal.')

# ---------- TPV en detalle ----------
a('tpv_demo',['probar el tpv','demo','prueba el tpv','como pruebo','encender el tpv','try the pos','demo pos'],
  'Baja a «Prueba el TPV» y toca «Encender el TPV». Pide en el kiosco y luego cambia a «Cocina» para ver llegar la comanda.','Scroll to “Try the POS” and press “Turn on the POS”. Order at the kiosk, then switch to “Kitchen” to watch the ticket arrive.')
a('tpv_pin',['pin','contrasena','clave de cocina','clave de caja','password','code'],
  'En la demo, cocina y caja aceptan cualquier PIN de 4 cifras.','In the demo, kitchen and till accept any 4-digit PIN.')
a('tpv_cocina',['cocina','comanda','pantalla de cocina','kitchen','order ticket'],
  'La comanda llega a la pantalla de cocina al instante, con su temporizador, y se marca lista con un toque.','The order reaches the kitchen display instantly, with a timer, and is marked ready with one tap.')
a('tpv_kiosco',['kiosco','autoservicio','el cliente pide solo','pantalla tactil','self service','kiosk','touch screen'],
  'El kiosco deja que el cliente pida solo, en español o en inglés, con foto de cada plato y la opción de quitar ingredientes o añadir extras.','The kiosk lets customers order on their own, in Spanish or English, with a photo of every dish and options to remove ingredients or add extras.')
a('tpv_caja',['caja','cobrar','ticket','tickets','impresora','imprimir','till','cash register','receipt','printer'],
  'La caja lleva turnos, cobros en efectivo o tarjeta, IVA desglosado e impresión automática de tickets.','The till handles shifts, cash or card payments, itemised tax and automatic receipt printing.')
a('tpv_sedes',['varias sedes','varios locales','sucursales','cadena','franquicia','multiple locations','branches','chain'],
  'Sí, funciona con varias sedes, cada una con su cocina y su caja. California lo usa en dos locales.','Yes, it works with multiple locations, each with its own kitchen and till. California uses it at two restaurants.')
a('tpv_verifactu',['verifactu','compliant','comply','cumple','cumplen','hacienda','factura electronica','facturacion electronica','normativa','e-invoicing','tax compliance'],
  'Sí, nuestro TPV cumple Verifactu, la normativa de facturación de Hacienda en España. Archivum, nuestro programa de facturación, también está preparado para Veri*Factu.','Yes, our POS complies with Verifactu, Spain’s invoicing regulation. Archivum, our invoicing software, is also ready for Veri*Factu.')
a('tpv_dispositivo',['tablet','ipad','que equipo necesito','hardware','ordenador','dispositivo','device','computer','what equipment'],
  'Para saber qué equipo necesitas en tu local (pantallas, tablets o impresoras), cuéntale al equipo cómo es por WhatsApp al '+WA+'.','To find out what equipment your place needs (screens, tablets or printers), tell the team about it on WhatsApp at '+WA+'.')
a('tpv_domicilio',['domicilio','delivery','para llevar','recoger','pickup','takeaway'],
  'Sí, podemos añadir pedidos para recoger a tu TPV; en la calculadora es un extra desde unos US$ 600.','Yes, we can add pickup orders to your POS; in the calculator it’s an extra from about US$ 600.')
a('tpv_otros',['bar','cafeteria','panaderia','pizzeria','tienda fisica','otro negocio','cafe','bakery','shop'],
  'El TPV nació para un restaurante, pero lo adaptamos a otros negocios. Cuéntale al equipo el tuyo por WhatsApp.','The POS was born for a restaurant, but we adapt it to other businesses. Tell the team about yours on WhatsApp.')

# ---------- proyectos ----------
a('proyectos',['proyectos','portafolio','portfolio','trabajos','ejemplos','clientes','que han hecho','projects','work','examples','clients'],
  'Algunos proyectos: el TPV de California, Archivum (facturación), EasyClase (plataforma de clases), Fendaria (nuestra app), las webs de Vitrales Perafán y Althaya, y la landing de Amieva. Los tienes en la sección Proyectos.','Some projects: California’s POS, Archivum (invoicing), EasyClase (a tutoring platform), Fendaria (our app), the websites for Vitrales Perafán and Althaya, and Amieva’s landing page. They’re in the Projects section.')
a('california',['california','kebab'],
  'California es un restaurante con dos locales en España que usa nuestro TPV: kiosco en dos idiomas, cocina, caja y tickets. Puedes probarlo en la web.','California is a restaurant with two locations in Spain that uses our POS: bilingual kiosk, kitchen, till and receipts. You can try it on the site.')
a('archivum',['archivum','factura','facturacion','facturas','invoice','invoicing'],
  'Archivum es nuestro programa de facturación y archivo para pequeñas empresas e independientes, preparado para Veri*Factu y con planes desde 0 €. Lo tienes en archivum.es.','Archivum is our invoicing and archiving software for small businesses and freelancers, ready for Veri*Factu, with plans from €0. It’s at archivum.es.')
a('fendaria',['fendaria','heroes','personajes','aventuras'],
  'Fendaria es nuestra app de aventuras para Android, con siete personajes. Llegará pronto a Google Play… ¡y yo salgo en ella!','Fendaria is our adventure app for Android, with seven characters. It’s coming soon to Google Play… and I’m in it!')
a('fendaria_cuando',['fendaria','google play','descargar','jugar','download','play'],
  'Fendaria llegará pronto a Google Play. Mientras, puedes ver a sus personajes en acción en la sección Fendaria de la web.','Fendaria is coming soon to Google Play. Meanwhile, you can see its characters in action in the Fendaria section of the site.',Tm)
a('vitrales',['vitrales','perafan','vitral'],
  'Vitrales Perafán es un taller de vitrales fundado en 1976. Le hicimos su web con galería, proceso y presupuesto: vitralesperafan.com.','Vitrales Perafán is a stained-glass workshop founded in 1976. We built their site with gallery, process and quotes: vitralesperafan.com.')
a('althaya',['althaya','masajes','perth'],
  'Althaya es un centro de masajes en Perth (Australia). Su web es bilingüe, con vídeo, tratamientos y reserva directa: althaya.com.au.','Althaya is a massage studio in Perth (Australia). Its site is bilingual, with video, treatments and direct booking: althaya.com.au.')
a('easyclase',['easyclase','easy clase','clases particulares','profesores','tutorias','tutoring','teachers'],
  'EasyClase es una plataforma de clases particulares que conecta estudiantes con profesores verificados: búsqueda, reservas, pagos con Mercado Pago, retiro de ganancias, calificaciones y membresías premium.','EasyClase is a private-lessons platform that connects students with verified teachers: search, bookings, Mercado Pago payments, earnings payouts, ratings and premium memberships.')
a('amieva',['amieva','amievacleaning','limpieza','cleaning','construccion en florida','florida','naples','fort myers'],
  'Amieva Cleaning Service es una empresa de limpieza y construcción en el suroeste de Florida. Le hicimos una landing bilingüe con servicios, galería, zona de servicio, presupuesto y WhatsApp: amievacleaning.com.','Amieva Cleaning Service is a cleaning and construction company in Southwest Florida. We built them a bilingual landing page with services, gallery, service area, quotes and WhatsApp: amievacleaning.com.')
a('opiniones',['opiniones','resenas','testimonios','referencias','que dicen','reviews','testimonials','references'],
  'En «Lo que dicen» tienes las opiniones de Hassam (California), Herney (Vitrales Perafán) y Laura (Althaya).','In “What clients say” you’ll find reviews from Hassam (California), Herney (Vitrales Perafán) and Laura (Althaya).')

# ---------- contacto ----------
a('contacto',['contacto','contactar','whatsapp','telefono','numero','email','correo','hablar con alguien','llamar','contact','phone','call','talk to someone'],
  'Escríbenos por WhatsApp al '+WA+' o a pietersd05@gmail.com. También tienes el formulario más abajo.','Message us on WhatsApp at '+WA+' or email pietersd05@gmail.com. There’s also a form further down.')
a('reunion',['reunion','videollamada','llamada','agendar','cita con ustedes','meeting','video call','schedule a call'],
  'Claro: escríbenos por WhatsApp al '+WA+' y agendamos una videollamada.','Sure: message us on WhatsApp at '+WA+' and we’ll set up a video call.')
a('respuesta',['cuando responden','cuanto tardan en responder','en responder','responder','contestan','en contestar','horario','atienden','disponibles','when do you reply','response time','opening hours','available'],
  'Respondemos lo antes posible. Por WhatsApp al '+WA+' suele ser lo más rápido.','We reply as soon as we can. WhatsApp at '+WA+' is usually the fastest.')
a('formulario',['formulario','enviar mensaje','form','send a message'],
  'El formulario está al final de la página: pon tu nombre, tu email, el tipo de proyecto y tu mensaje, y te respondemos con una propuesta.','The form is at the bottom of the page: add your name, email, project type and message, and we’ll reply with a proposal.')

# ---------- la web y privacidad ----------
a('privacidad',['privacidad','mis datos','datos personales','proteccion de datos','privacy','my data','personal data'],
  'Solo usamos tus datos para responderte. Los detalles están en la política de privacidad, enlazada al pie de la página.','We only use your data to reply to you. Details are in the privacy policy, linked at the bottom of the page.')
a('cookies',['cookies','rastreo','seguimiento','tracking'],
  'Esta web no usa cookies de publicidad ni de seguimiento. Los detalles están en la política de cookies.','This site uses no advertising or tracking cookies. Details are in the cookie policy.')
a('ingles_web',['version en ingles','english version','cambiar idioma','change language'],
  'Toca «EN» arriba a la derecha para ver la web en inglés, o «ES» para volver al español.','Press “EN” at the top right to see the site in English, or “ES” to switch back to Spanish.')
a('farol',['farol','linterna','lampara','lantern','lamp'],
  'El farol es el logo de Lumen. Dale un golpe arriba del todo: se balancea y suelta chispas.','The lantern is Lumen’s logo. Give it a tap at the very top: it swings and throws sparks.')

a('modo_claro',['modo claro','modo oscuro','boton del sol','el sol','la luna','boton de la luna','algo diferente','otro modo','tema','mas profesional','version profesional','mas formal','formal','serio','otro estilo','cambiar el diseno','traje','gafas','light mode','dark mode','theme','more professional','suit','glasses'],
  'La web tiene dos modos. El formal, el de inicio, está pensado para webs y negocios, y ahí llevo traje. Con la 🌙 de arriba pasas al modo oscuro: el farol, Fendaria y mi ropa de siempre. El ☀️ te devuelve al formal.','The site has two modes. The formal one, the default, is built around websites and businesses, and I wear a suit there. The 🌙 up top switches to dark mode: the lantern, Fendaria and my usual look. The ☀️ takes you back to formal.')

# ---------- Champi ----------
a('champi',['champi','quien eres','como te llamas','que eres','seta','hongo','who are you','your name','mushroom'],
  'Soy Champi, la seta de Fendaria y la mascota de Lumen Studio. Puedes agarrarme y moverme por la pantalla… ¡con cuidado!','I’m Champi, the Fendaria mushroom and Lumen Studio’s mascot. You can pick me up and move me around… gently!')
a('champi_ia',['eres una ia','eres un robot','eres real','inteligencia artificial','chatgpt','are you an ai','are you a bot','are you real'],
  'Soy la mascota de la web: respondo las preguntas frecuentes del estudio y, si hace falta, me ayuda una IA. Para hablar con una persona, escribe al '+WA+'.','I’m the site’s mascot: I answer the studio’s common questions and, when needed, an AI helps me. To talk to a person, message '+WA+'.')
a('champi_mover',['moverte','te muevo','muevo a champi','arrastrarte','te arrastro','cogerte','agarrarte','te agarro','esconderte','ocultarte','drag you','move you','hide you'],
  'Agárrame con el mouse o con el dedo y suéltame donde quieras. Si te molesto, toca la ✕ junto a mí; al pie de la página tienes «Volver a ver a Champi».','Grab me with your mouse or finger and drop me anywhere. If I’m in the way, press the ✕ next to me; you can bring me back from the bottom of the page.')

json.dump(E, open(__import__('pathlib').Path(__file__).resolve().parent.parent / 'assets/data/champi-faq.json','w'), ensure_ascii=False, indent=1)
print(len(E),'entradas')
