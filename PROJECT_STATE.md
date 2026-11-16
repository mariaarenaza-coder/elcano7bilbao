# Elcano 7 Bilbao — Estado del Proyecto

## Datos del proyecto

- **Producto:** Web inmobiliaria de lujo para venta de 2 pisos en Calle Elcano 7, Bilbao
- **URL de producción:** https://elcano7bilbao.com
- **URL Vercel:** https://elcano7bilbao.vercel.app
- **GitHub:** https://github.com/mariaarenaza-coder/elcano7bilbao
- **Vercel project:** mariaarenaza-8943s-projects/elcano7bilbao
- **Deploy automático:** cada push a `main`

## Stack

- HTML5 + CSS3 + JavaScript vanilla (sin frameworks, sin npm)
- Supabase JS vía CDN (contactos) — proyecto ref: `omqepmgfrpndpquluwrf`
- Vercel (hosting estático)
- Dominio propio: `elcano7bilbao.com` (activo, apuntado a Vercel)
- Email: `maria@elcano7bilbao.com` en Zoho Mail (plan Forever Free, cuenta separada de destacas porque el plan gratis solo admite 1 dominio). DNS en Vercel: MX zoho.eu, DKIM `zmail._domainkey`, SPF combinado `include:zohomail.eu include:amazonses.com` (amazonses = Resend, avisos del formulario). Uso: contacto con posibles colaboradores, envíos 1 a 1, sin envíos masivos.

## Archivos principales

```
elcano7bilbao/
├── index.html          # Página principal (6 secciones)
├── privacy.html        # Política de privacidad RGPD
├── css/styles.css      # Todos los estilos
├── js/main.js          # Lógica: toggle ES/EN, galerías, formulario, WhatsApp
├── js/supabase.js      # Cliente Supabase + función submitContact()
└── images/
    ├── fachada.jpg     # Hero background
    ├── plaza-moyua.jpg # Sección ubicación
    ├── portal-1.jpg    # Sección edificio
    ├── portal-2.jpg    # Disponible para galería
    └── portal-3.jpg    # Disponible para galería
```

## Sprint activo

Ninguno — web en producción.

## Estado actual (2026-05-27)

- Web en producción en `elcano7bilbao.com` ✓
- Formulario de contacto guarda en Supabase ✓
- Supabase en plan gratuito — se pausa si no hay actividad en 7 días
- 1 lead real recibido: Gabi Aldamiz-echevarria (13 mayo, interesado en Residencia B)
- RLS policy `allow_insert` activa para roles `anon` y `authenticated`

## Funcionalidades implementadas

- [x] Web completa 6 secciones: Hero, Intro, Ubicación, Viviendas (A+B), Edificio, Contacto
- [x] Toggle ES / EN con persistencia en localStorage
- [x] Responsive 1440 / 768 / 375px (hamburguesa móvil)
- [x] Galerías con placeholders en tarjetas de viviendas
- [x] Formulario con validación inline + preselección por vivienda
- [x] Integración WhatsApp prellenado por idioma
- [x] Supabase conectado — credenciales en `js/supabase.js`, tabla `contactos` activa
- [x] Política de privacidad RGPD (ES + EN)
- [x] Imágenes reales: fachada, Plaza Moyua, portal (optimizadas a ~500KB)
- [x] Deploy en Vercel producción
- [x] Nº de dormitorios en el listado de características de cada residencia (2026-11-16)
- [x] Email de confirmación al lead (`notify-lead`, v7) sin la frase de visitas en junio (2026-11-16). OJO: los cambios en `supabase/functions/` NO se despliegan con git push; hay que hacer `supabase functions deploy notify-lead --project-ref omqepmgfrpndpquluwrf`
- [x] Dominio propio `elcano7bilbao.com` activo

## Deuda técnica

- Supabase plan gratuito: se pausa si sin actividad 7 días (considerar Pro $25/mes o envío manual periódico)
- Posible mejora futura: slider antes/después interactivo (drag vacío→amueblado) en salón de cada vivienda

## Historial de sprints

### 2026-09-01 — Home Staging Virtual
- 8 imágenes PNG de home staging virtual añadidas (salón + hab. principal, viviendas A y B)
- Nuevo orden de galerías: staging primero → vistas/balcón → fotos reales → plano al final
- Slider antes/después interactivo encima de cada galería (sección separada, sin conflicto de gestos)
  - Tabs: Salón 1, Salón 2, Hab. principal por vivienda (drag mouse + touch)
  - Label "Residencia A/B" visible para contexto en móvil
- Badges homogeneizados: misma tipografía, tamaño y posición en slider y galería
- Fotos reales correctas para hab. principal A y B (ángulo coincide con staging)
- Galería B: vistas en posición 3 (tras staging salón, antes hab. principal)
- Puerta de entrada eliminada de ambas galerías
