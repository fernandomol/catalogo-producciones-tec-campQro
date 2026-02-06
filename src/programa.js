import './scss/estilos.scss';
import { SITIO, TABLA_PROYECTOS, DATOS_SITIO, AVANZADO } from './config.js';
import { obtenerCamposTabla, obtenerRegistrosTabla } from './baserow.js';
import { crearSeccionCMS, crearTarjetaProyecto } from './componentes.js';

let cargandoProyectos = false;
let camposTablaMemo = null;
let contenedorProyectos = null;
let sitioInicializado = false;

// =====================================================
// INICIALIZACIÓN DEL SITIO
// =====================================================

console.log('🚀 Iniciando sitio:', SITIO.titulo);

// Inicializar el sitio con datos del CMS
inicializarSitio();

// =====================================================
// FUNCIONES
// =====================================================

/**
 * Actualiza los metadatos del sitio (título, descripción, etc.)
 * Esto es importante para SEO y redes sociales
 */
function actualizarMetadatosDelSitio(datosSitio) {
  const datos = datosSitio || SITIO;
  // Actualizar el título en la pestaña del navegador
  document.title = datos.titulo;

  // Actualizar la descripción
  let metaDescripcion = document.querySelector('meta[name="description"]');
  if (metaDescripcion) {
    metaDescripcion.setAttribute('content', datos.descripcion);
  }

  // Actualizar OpenGraph (para redes sociales)
  document.querySelectorAll('meta[property^="og:"]').forEach((meta) => {
    const propiedad = meta.getAttribute('property');

    if (propiedad === 'og:title') {
      meta.setAttribute('content', datos.titulo);
    } else if (propiedad === 'og:description') {
      meta.setAttribute('content', datos.descripcion);
    } else if (propiedad === 'og:url') {
      meta.setAttribute('content', datos.urlSitio || SITIO.urlSitio);
    }
  });

  const tituloNav = document.querySelector('.navbar-titulo');
  if (tituloNav) {
    tituloNav.textContent = datos.titulo;
  }

  if (AVANZADO.debug) {
    console.log('✅ Metadatos actualizados');
  }
}

/**
 * Carga los proyectos de Baserow y los muestra en la página
 */
async function cargarYMostrarProyectos() {
  if (cargandoProyectos || !contenedorProyectos) {
    return;
  }

  cargandoProyectos = true;

  // Limpiar proyectos previos (pero mantener la estructura de secciones)
  contenedorProyectos.innerHTML = '';

  const mensajeCarga = document.createElement('p');
  mensajeCarga.className = 'cargando';
  mensajeCarga.textContent = '⏳ Cargando proyectos...';
  contenedorProyectos.appendChild(mensajeCarga);

  try {
    const proyectos = AVANZADO.modoEstatico ? await obtenerProyectosEstaticos() : await obtenerProyectosConCache();
    if (!AVANZADO.modoEstatico && !camposTablaMemo) {
      camposTablaMemo = await obtenerCamposTabla(TABLA_PROYECTOS.id);
    }

    // Remover el mensaje de carga
    mensajeCarga.remove();

    if (proyectos.length === 0) {
      console.warn('⚠️ No se encontraron proyectos');
      const mensajeVacio = document.createElement('p');
      mensajeVacio.className = 'mensaje-vacio';
      mensajeVacio.textContent = 'No hay proyectos para mostrar aún.';
      contenedorProyectos.appendChild(mensajeVacio);
      return;
    }

    // Crear una tarjeta para cada proyecto
    proyectos.forEach((proyecto) => {
      const tarjeta = crearTarjetaProyecto({
        titulo: proyecto[TABLA_PROYECTOS.campos.titulo],
        descripcion: proyecto[TABLA_PROYECTOS.campos.descripcion],
        imagen: proyecto[TABLA_PROYECTOS.campos.imagen],
        enlace: proyecto[TABLA_PROYECTOS.campos.enlace],
        registro: proyecto,
        campos: camposTablaMemo,
        camposBase: [
          TABLA_PROYECTOS.campos.titulo,
          TABLA_PROYECTOS.campos.descripcion,
          TABLA_PROYECTOS.campos.imagen,
          TABLA_PROYECTOS.campos.enlace,
        ],
      });

      contenedorProyectos.appendChild(tarjeta);
    });

    if (AVANZADO.debug) {
      console.log(`✅ Se mostraron ${proyectos.length} proyectos`);
    }
  } catch (error) {
    mensajeCarga.remove();
    console.error('❌ Error al cargar proyectos:', error);
    const mensajeError = document.createElement('p');
    mensajeError.className = 'mensaje-vacio';
    mensajeError.textContent = 'Ocurrió un error al cargar los proyectos.';
    contenedorProyectos.appendChild(mensajeError);
  } finally {
    cargandoProyectos = false;
  }
}

async function inicializarSitio() {
  if (sitioInicializado) {
    return;
  }

  const datosSitio = await cargarDatosSitio();
  construirSecciones(datosSitio);
  actualizarMetadatosDelSitio(datosSitio);
  sitioInicializado = true;

  // Cargar proyectos después de que todo esté listo
  cargarYMostrarProyectos();
}

async function cargarDatosSitio() {
  if (!DATOS_SITIO?.id || DATOS_SITIO.id === 0) {
    console.warn('⚠️ DATOS_SITIO no está configurada. Usando valores por defecto de SITIO.');
    console.warn('📝 Para usar una tabla CMS en Baserow:');
    console.warn('   1. Crea una tabla en Baserow con 1 sola fila');
    console.warn(
      '   2. Agrega los campos: introTitulo, introTexto, coleccionTitulo, coleccionTexto, contactoTitulo, contactoTexto'
    );
    console.warn('   3. Copia el ID de la tabla (de la URL: /table/[ID]/)');
    console.warn('   4. Pega el ID en config.js: DATOS_SITIO.id = TU_ID');
    return { ...SITIO };
  }

  const registros = await obtenerRegistrosTabla(DATOS_SITIO.id);
  const registro = registros[0];

  if (!registro) {
    console.warn('⚠️ DATOS_SITIO está vacía o no tiene datos. Usando valores por defecto.');
    return { ...SITIO };
  }

  const campos = DATOS_SITIO.campos;
  return {
    titulo: registro[campos.titulo] || SITIO.titulo,
    descripcion: registro[campos.descripcion] || SITIO.descripcion,
    urlSitio: registro[campos.urlSitio] || SITIO.urlSitio,
    introTitulo: registro[campos.introTitulo] || 'Inicio',
    introTexto: registro[campos.introTexto] || '',
    coleccionTitulo: registro[campos.coleccionTitulo] || 'Colección',
    coleccionTexto: registro[campos.coleccionTexto] || '',
  };
}

function construirSecciones(datosSitio) {
  const contenedor = document.querySelector('main') || document.body;
  contenedor.innerHTML = '';

  // Crear sección de inicio
  const seccionInicio = crearSeccionCMS({
    id: 'inicio',
    titulo: datosSitio.introTitulo,
    contenido: datosSitio.introTexto,
    clase: 'seccion-inicio',
  });
  contenedor.appendChild(seccionInicio);

  // Crear sección de proyectos con grid vacío
  const seccionColeccion = crearSeccionCMS({
    id: 'proyectos',
    titulo: datosSitio.coleccionTitulo,
    contenido: datosSitio.coleccionTexto,
    clase: 'seccion-proyectos',
  });

  // Crear el grid que se llenará con proyectos
  contenedorProyectos = document.createElement('div');
  contenedorProyectos.className = 'proyectos-grid';
  seccionColeccion.appendChild(contenedorProyectos);
  contenedor.appendChild(seccionColeccion);

  if (AVANZADO.debug) {
    console.log('✅ Secciones construidas: inicio, proyectos');
  }
}

function obtenerCacheKey() {
  return `baserow_cache_${TABLA_PROYECTOS.id}`;
}

async function obtenerProyectosConCache() {
  if (!AVANZADO.cacheHabilitado) {
    return obtenerRegistrosTabla(TABLA_PROYECTOS.id);
  }

  const cacheKey = obtenerCacheKey();
  const cacheRaw = localStorage.getItem(cacheKey);

  if (cacheRaw) {
    try {
      const cache = JSON.parse(cacheRaw);
      const ttl = (AVANZADO.cacheTTL || 0) * 1000;
      if (ttl > 0 && Date.now() - cache.timestamp < ttl) {
        if (AVANZADO.debug) {
          console.log('✅ Usando caché local');
        }
        return cache.data || [];
      }
    } catch (error) {
      console.warn('⚠️ Caché corrupto, se volverá a cargar.', error);
    }
  }

  const datos = await obtenerRegistrosTabla(TABLA_PROYECTOS.id);
  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      timestamp: Date.now(),
      data: datos,
    })
  );
  return datos;
}

async function obtenerProyectosEstaticos() {
  const respuesta = await fetch(AVANZADO.rutaEstatico, { cache: 'no-store' });
  const datos = await respuesta.json();
  if (Array.isArray(datos)) {
    return datos;
  }
  return datos.results || [];
}

// Recargar los datos periódicamente si está configurado
if (AVANZADO.tiempoRecarga > 0) {
  setInterval(cargarYMostrarProyectos, AVANZADO.tiempoRecarga * 1000);
}
