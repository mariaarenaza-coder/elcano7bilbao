/*
 * SUPABASE SETUP — Elcano 7 Bilbao
 *
 * SQL para crear la tabla (ejecutar en Supabase SQL Editor):
 *
 * create table contactos (
 *   id uuid primary key default gen_random_uuid(),
 *   created_at timestamptz default now(),
 *   nombre text not null,
 *   email text not null,
 *   telefono text not null,
 *   vivienda text not null,
 *   mensaje text,
 *   idioma text not null
 * );
 *
 * -- Habilitar RLS y permitir inserciones anónimas:
 * alter table contactos enable row level security;
 * create policy "allow_insert" on contactos for insert with check (true);
 */

// RELLENAR CON TUS CREDENCIALES DE SUPABASE:
const SUPABASE_URL = '';     // https://xxxx.supabase.co
const SUPABASE_ANON_KEY = ''; // eyJ...

// ── Inicializar cliente ──────────────────────────────────────
let _supabaseClient = null;

function getClient() {
  if (_supabaseClient) return _supabaseClient;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;

  // supabase-js viene cargado desde CDN como `supabase` en window
  const { createClient } = window.supabase;
  _supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _supabaseClient;
}

/**
 * submitContact — inserta un lead en la tabla `contactos`.
 *
 * @param {Object} data
 * @param {string} data.nombre
 * @param {string} data.email
 * @param {string} data.telefono
 * @param {string} data.vivienda
 * @param {string} [data.mensaje]
 * @param {string} data.idioma  — 'es' | 'en'
 *
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
async function submitContact(data) {
  const client = getClient();

  if (!client) {
    console.log(
      'Supabase no configurado — el formulario funciona pero el lead no se guarda en base de datos.'
    );
    return { success: true };
  }

  const { error } = await client.from('contactos').insert([
    {
      nombre:   data.nombre,
      email:    data.email,
      telefono: data.telefono,
      vivienda: data.vivienda,
      mensaje:  data.mensaje || null,
      idioma:   data.idioma,
    },
  ]);

  if (error) {
    console.error('Error Supabase:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
