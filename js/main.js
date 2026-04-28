/* ============================================================
   ELCANO 7 · BILBAO — main.js
   ============================================================ */

// ── Idioma ───────────────────────────────────────────────────

const LANG_KEY = 'elcano7_lang';

function getCurrentLang() {
  return localStorage.getItem(LANG_KEY) || 'es';
}

function applyLang(lang) {
  // Actualizar todos los elementos con data-es / data-en
  document.querySelectorAll('[data-es], [data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text !== null) el.textContent = text;
  });

  // Botones del toggle
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Guardar preferencia
  localStorage.setItem(LANG_KEY, lang);

  // Actualizar atributo lang del HTML
  document.documentElement.lang = lang;

  // Página de privacidad — mostrar bloque correcto
  document.querySelectorAll('.privacy-lang-block').forEach(block => {
    block.classList.toggle('active', block.dataset.lang === lang);
  });
}

function initLangToggle() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLang(btn.dataset.lang);
    });
  });

  // Aplicar idioma guardado al cargar
  applyLang(getCurrentLang());
}

// ── Menú hamburguesa ─────────────────────────────────────────

function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');

  if (!hamburger || !navMobile) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburger.textContent = isOpen ? '✕' : '☰';
  });

  // Cerrar al hacer clic en un link
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.textContent = '☰';
    });
  });
}

// ── Scroll suave + nav activo ─────────────────────────────────

function initNav() {
  // Scroll suave para todos los links internos
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      ) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Nav activo según sección en viewport
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const navH = () =>
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
    ) || 72;

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= navH() + 60) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + current
      );
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
}

// ── Navbar sombra y scroll indicator ─────────────────────────

function initScrollEffects() {
  const nav = document.querySelector('nav');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  function onScroll() {
    const y = window.scrollY;

    if (nav) nav.classList.toggle('scrolled', y > 20);

    if (scrollIndicator) {
      scrollIndicator.classList.toggle('hidden-indicator', y > 100);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Galerías ──────────────────────────────────────────────────

function initGalerias() {
  document.querySelectorAll('.galeria').forEach(galeria => {
    const slides = galeria.querySelectorAll('.galeria-slide');
    const dots   = galeria.querySelectorAll('.galeria-dot');
    const prev   = galeria.querySelector('.galeria-prev');
    const next   = galeria.querySelector('.galeria-next');
    let current  = 0;

    function goTo(idx) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    if (prev) prev.addEventListener('click', () => goTo(current - 1));
    if (next) next.addEventListener('click', () => goTo(current + 1));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });

    // Inicializar primer slide
    if (slides.length) {
      slides[0].classList.add('active');
      if (dots.length) dots[0].classList.add('active');
    }
  });
}

// ── Carrusel edificio ────────────────────────────────────────

function initEdificioGaleria() {
  const galeria = document.querySelector('.edificio-galeria');
  if (!galeria) return;

  const slides = galeria.querySelectorAll('.edificio-slide');
  const dots   = galeria.querySelectorAll('.galeria-dot');
  const prev   = galeria.querySelector('.galeria-prev');
  const next   = galeria.querySelector('.galeria-next');
  let current  = 0;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  if (prev) prev.addEventListener('click', () => goTo(current - 1));
  if (next) next.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  if (dots.length) dots[0].classList.add('active');
}

// ── Preselección de vivienda ──────────────────────────────────

function initCtaButtons() {
  document.querySelectorAll('.btn-cta').forEach(btn => {
    btn.addEventListener('click', () => {
      const residenciaKey = btn.dataset.residencia; // 'A' o 'B'
      const select = document.querySelector('#contact-form select[name="vivienda"]');

      if (select) {
        // Buscar la option cuyo value contiene "Residencia A" o "Residencia B"
        Array.from(select.options).forEach(opt => {
          if (opt.value.includes('Residencia ' + residenciaKey)) {
            select.value = opt.value;
          }
        });
      }

      // Scroll al formulario
      const formSection = document.querySelector('#contacto');
      if (formSection) {
        const navH = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
        ) || 72;
        const top =
          formSection.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ── Validación de formulario ──────────────────────────────────

function clearErrors(form) {
  form.querySelectorAll('.form-group, .checkbox-group').forEach(group => {
    group.classList.remove('has-error');
    const err = group.querySelector('.form-error');
    if (err) err.textContent = '';
  });
}

function showError(field, message) {
  const group = field.closest('.form-group, .checkbox-group');
  if (!group) return;
  group.classList.add('has-error');
  const err = group.querySelector('.form-error');
  if (err) err.textContent = message;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(form) {
  clearErrors(form);
  const lang = getCurrentLang();
  let valid = true;

  const nombre = form.querySelector('[name="nombre"]');
  const email  = form.querySelector('[name="email"]');
  const tel    = form.querySelector('[name="telefono"]');
  const vivienda = form.querySelector('[name="vivienda"]');
  const privacidad = form.querySelector('[name="privacidad"]');

  const msgs = {
    es: {
      required:    'Este campo es obligatorio.',
      emailInvalid: 'Introduce un email válido.',
      selectReq:   'Selecciona una vivienda.',
      privacidad:  'Debes aceptar la política de privacidad.',
    },
    en: {
      required:    'This field is required.',
      emailInvalid: 'Please enter a valid email.',
      selectReq:   'Please select a residence.',
      privacidad:  'You must accept the privacy policy.',
    },
  };

  const m = msgs[lang] || msgs.es;

  if (!nombre.value.trim()) {
    showError(nombre, m.required);
    valid = false;
  }

  if (!email.value.trim()) {
    showError(email, m.required);
    valid = false;
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, m.emailInvalid);
    valid = false;
  }

  if (!tel.value.trim()) {
    showError(tel, m.required);
    valid = false;
  }

  if (!vivienda.value) {
    showError(vivienda, m.selectReq);
    valid = false;
  }

  if (!privacidad.checked) {
    showError(privacidad, m.privacidad);
    valid = false;
  }

  return valid;
}

// ── WhatsApp ──────────────────────────────────────────────────

function openWhatsApp(nombre, vivienda, lang) {
  const phone = '34600600600';
  let text;

  if (lang === 'en') {
    text =
      'Hello%2C+I+am+interested+in+getting+information+about+' +
      encodeURIComponent(vivienda).replace(/%20/g, '+') +
      '+at+Elcano+7.+My+name+is+' +
      encodeURIComponent(nombre).replace(/%20/g, '+') +
      '.';
  } else {
    text =
      'Hola%2C+me+interesa+obtener+informacion+sobre+' +
      encodeURIComponent(vivienda).replace(/%20/g, '+') +
      '+en+Elcano+7.+Mi+nombre+es+' +
      encodeURIComponent(nombre).replace(/%20/g, '+') +
      '.';
  }

  window.open('https://wa.me/' + phone + '?text=' + text, '_blank');
}

// ── Formulario ────────────────────────────────────────────────

function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const successMsg = document.getElementById('form-success');
  const submitBtn  = form.querySelector('.btn-submit');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!validateForm(form)) return;

    const lang    = getCurrentLang();
    const nombre  = form.querySelector('[name="nombre"]').value.trim();
    const email   = form.querySelector('[name="email"]').value.trim();
    const telefono = form.querySelector('[name="telefono"]').value.trim();
    const vivienda = form.querySelector('[name="vivienda"]').value.trim();
    const mensaje  = form.querySelector('[name="mensaje"]').value.trim();

    // Deshabilitar botón mientras se envía
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = lang === 'en' ? 'Sending…' : 'Enviando…';

    try {
      const result = await submitContact({ nombre, email, telefono, vivienda, mensaje, idioma: lang });

      if (!result.success) {
        // Error de Supabase — mostrar pero no bloquear el flujo principal
        console.warn('No se guardó en base de datos:', result.error);
      }

      // Abrir WhatsApp
      openWhatsApp(nombre, vivienda, lang);

      // Mostrar mensaje de éxito
      if (successMsg) {
        successMsg.classList.remove('hidden');
        // Aplicar lang al mensaje de éxito
        successMsg.querySelectorAll('[data-es], [data-en]').forEach(el => {
          const text = el.getAttribute('data-' + lang);
          if (text !== null) el.textContent = text;
        });
      }

      // Limpiar formulario
      form.reset();
      clearErrors(form);

      // Scroll al mensaje de éxito
      if (successMsg) {
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

    } catch (err) {
      console.error('Error inesperado:', err);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// ── Intersection Observer (fade-in) ──────────────────────────

function initFadeIn() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ── Init ──────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initLangToggle();
  initHamburger();
  initNav();
  initScrollEffects();
  initGalerias();
  initEdificioGaleria();
  initCtaButtons();
  initForm();
  initFadeIn();
});
