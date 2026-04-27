# Elcano 7 Bilbao — Estado del Proyecto

## Datos del proyecto

- **Producto:** Web inmobiliaria de lujo para venta de 2 pisos en Calle Elcano 7, Bilbao
- **URL de producción:** https://elcano7bilbao.vercel.app
- **GitHub:** https://github.com/mariaarenaza-coder/elcano7bilbao
- **Vercel project:** mariaarenaza-8943s-projects/elcano7bilbao
- **Deploy automático:** cada push a `main`

## Stack

- HTML5 + CSS3 + JavaScript vanilla (sin frameworks, sin npm)
- Supabase JS vía CDN (contactos)
- Vercel (hosting estático)

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

**Sprint 2 — Conectar Supabase**
- Objetivo: formulario guarda contactos en Supabase y flujo WhatsApp funciona end-to-end
- Tareas pendientes:
  - [ ] Crear tabla `contactos` en Supabase (SQL en `js/supabase.js`)
  - [ ] Rellenar `SUPABASE_URL` y `SUPABASE_ANON_KEY` en `js/supabase.js`
  - [ ] Probar envío formulario → Supabase + WhatsApp

## Pendiente de rellenar (antes de publicar URL final)

- `js/supabase.js` líneas 16-17: `SUPABASE_URL` y `SUPABASE_ANON_KEY`
- `privacy.html`: 4 placeholders con nombre, DNI/CIF, dirección y email del responsable
- `js/main.js` línea ~180: número de WhatsApp definitivo (actualmente `34600600600`)
- Dominio propio `elcano7bilbao.com` si se quiere en Vercel Dashboard

## Funcionalidades implementadas

- [x] Web completa 6 secciones: Hero, Intro, Ubicación, Viviendas (A+B), Edificio, Contacto
- [x] Toggle ES / EN con persistencia en localStorage
- [x] Responsive 1440 / 768 / 375px (hamburguesa móvil)
- [x] Galerías con placeholders en tarjetas de viviendas
- [x] Formulario con validación inline + preselección por vivienda
- [x] Integración WhatsApp prellenado por idioma
- [x] Supabase.js listo (pendiente credenciales)
- [x] Política de privacidad RGPD (ES + EN)
- [x] Imágenes reales: fachada, Plaza Moyua, portal (optimizadas a ~500KB)
- [x] Deploy en Vercel producción

## Deuda técnica

- Imágenes de interiores de las viviendas (actualmente placeholders en galerías)
- Número de WhatsApp real pendiente de confirmar
- Credenciales Supabase pendientes
