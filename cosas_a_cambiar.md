
- Sotillo esta vivo cambios
# ¿Que quieres descubrir?
Quiero que esta seccion abra una seccion con todos los comercios de la categoria.
    - Si pinchamos en comer: que se abran todos los restaurantes.
    - Si pinchamos en dormir que se abran todos los locales.
    HAcer esto para toas las secciones.
# Descubre quien mantiene vivo el valle
Quiero que esta seccion se vaya actualizando y que cada cez que carguemos la pagina aparezcan negocios random.
# Las historias detras del valle
Con esta seccion sera similar a la anterior, quiero que aparezcan historias random de gente.
# Descubre el valle
Esta seccion quiero que tenga todos los negocios que se han logueado.
# Un valle, muchos pueblos
De momento solo quiero meter dos pueblos de valle Sotillo de la adrada y la adrada
# Login / Inicio de sesion
Quiero poder loguearme y crear una sesion con los distintos usuarios: Clientes y comercios.
Quiero un distintivo para los usuarios: Que te deje hacer planes. A futuro quiero meter una ia o un sistema similar para que nos haga recomendaciones de los sitios y del presupuesto que tengo. 

Como base de datos quiero usar supabase
contraseña de supabase: Na8732javie

# MVP — checklist para lanzar

## Imprescindible antes de abrir al público
- [ ] Desplegar la web a un hosting real (Vercel/Netlify/Cloudflare Pages) — necesita soporte SSR/Node, no vale un hosting solo-estático.
- [ ] Comprar/configurar un dominio y apuntarlo al hosting.
- [ ] Pasar el consent screen de Google OAuth de "Prueba" a "En producción" (si no, solo pueden entrar los emails añadidos como test users).
- [ ] Añadir el dominio real en Supabase → Authentication → URL Configuration (Site URL + Redirect URLs).
- [ ] Rotar la contraseña de la base de datos de Supabase (estaba en texto plano en este archivo).
- [ ] Variables de entorno de producción configuradas en el hosting (VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY, y VITE_GOOGLE_MAPS_API_KEY si se activa).
- [ ] Página de Privacidad y Términos (obligatorio por RGPD: hay login con Google y se guardan datos personales).
- [ ] Revisión final de las políticas RLS de Supabase (negocios, historias, profiles, storage).
- [ ] Probar el flujo completo en móvil real y en Safari/Firefox (hasta ahora solo probado en Chromium).

## Puede esperar / iterar después de lanzar
- [ ] Sustituir negocios/historias de ejemplo por contenido real (o dejarlos como "demo" hasta que se registren negocios reales).
- [ ] Subir audios reales para "Las historias detrás del Valle".
- [ ] Activar el autocompletado de direcciones con Google Places (falta activar facturación en Google Cloud).
- [ ] Diseñar e implementar el "distintivo" y la función de "hacer planes" (y, más adelante, recomendaciones con IA).
- [ ] Analítica de uso (Plausible, GA, etc.).
- [ ] SEO más fino (sitemap, structured data para negocios).
- [ ] Monitorización de errores en producción (ej. Sentry).