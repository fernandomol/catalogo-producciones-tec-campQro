# Del documento al dato

## Cronograma

### Miércoles 4 de febrero: Del Objeto al Dato Estructurado

09:00 - 10:30 | Bienvenida y conceptos base. Conversación sobre sus intereses y el material que prepararon.

10:30 - 11:00 | Descanso

10:30 - 12:00 | Taller Tropy: Importación de las 15 imágenes personales. Ejercicio de descripción técnica y narrativa.

12:00 - 13:00 | Estructura en Baserow: Creación de la base de datos en Baserow. Configuración de columnas (campos).

13:00 - 14:00 | Almuerzo.

14:00 - 15:00 | TRABAJO AUTÓNOMO I: Curaduría Personal.

Terminar de describir sus 15 objetos en Tropy, exportar el CSV e importarlo a Baserow. Deben personalizar su base de datos con al menos 3 campos propios de su disciplina (ej: Tipo de soporte, Siglo, Estado de conservación).

15:00 - 16:00 | Revisión de base de datos, problemas comunes.

Jueves 5 de febrero: La Expansión (Web Scraping y Limpieza)
09:00 - 10:30 | Taller de Raspado: Uso de Google Colab (Python).

10:30 - 11: 00 | Descanso

11:00 - 13:00 | Integración y limpieza de datos en Baserow.

13:00 - 14:00 | Almuerzo.

14:00 - 15:00 | TRABAJO AUTÓNOMO II: Integración de Acervos.

Deben realizar un raspado exitoso de una fuente externa relacionada con su tema. Deben "limpiar" esos datos en un Baserow (unificar formatos de fecha, corregir nombres) y mezclarlos con sus 15 registros iniciales.

15:00 - 16:00 | Revisión del raspado y solución de problemas.

16:00 - 17:00 | Ética del dato: Debate sobre derechos de autor, repositorios abiertos y "quién es dueño" de lo que acabamos de raspar.

Viernes 6 de febrero: La Publicación y Soberanía Digital
09:00 - 10:30 | Infraestructura: Introducción a GitHub. Concepto de "sitio estático". Creación del repositorio y subida de imágenes.

10:30 - 11:00 | Descanso

11:00 - 13:00 | Montaje: Conexión de la base de datos de Baserow con la plantilla. Primer despliegue de la web.

13:00 - 14:00 | Almuerzo.

14:00 - 15:00 | TRABAJO AUTÓNOMO III: Curaduría de la Exhibición.

Personalizar el sitio web. Deben redactar un texto introductorio que explique el sentido del micro-archivo. Asegurarse de que las imágenes carguen correctamente y el sitio sea funcional.

15:00 - 17:00 | Cierre: Presentación de los proyectos.

## Instrucciones generales

Esta es una plantilla lista para que estudiantes creen sitios dinámicos conectados a **Baserow** y publicados en **GitHub Pages**.

## ¿Qué es esto?

- **Baserow**: Una base de datos de código abierto que funciona como un Excel avanzado en la web
- **GitHub Pages**: Servicio gratuito de GitHub para publicar sitios web estáticos
- **Esta plantilla**: Conecta Baserow con _GitHub Pages_ para crear un sitio que se actualiza automáticamente

## Inicio Rápido

### 1️⃣ Preparar tu cuenta Baserow

1. Ve a [baserow.io](https://baserow.io) y crea una cuenta gratuita
2. Crea una nueva **Base de Datos**
3. Crea una **Tabla** con los campos que quieras mostrar (ejemplo: "Proyectos")
4. Agrega datos a tu tabla

### 2️⃣ Obtener las credenciales de Baserow

1. En Baserow, ve a **Settings** → **Account** → **API tokens**
2. Crea un nuevo token y cópialo
3. Ve a tu base de datos y anota estos números de la URL:
   - `https://api.baserow.io/database/[DB_ID]/table/[TABLE_ID]/`
   - **DB_ID**: ID de tu base de datos
   - **TABLE_ID**: ID de tu tabla

### 3️⃣ Configurar la plantilla

1. Abre el archivo `src/config.js`
2. Llena los campos con tu información:

```javascript
export const BASEROW = {
  urlBaserow: 'https://api.baserow.io',
  token: 'TU_TOKEN_AQUI',
  idBaseDatos: 123456, // Tu número
};

export const TABLA_PROYECTOS = {
  id: 654321, // Tu número
  campos: {
    titulo: 'Título', // Nombre exacto de tu columna en Baserow
    descripcion: 'Descripción',
    imagen: 'Imagen',
    enlace: 'Enlace',
  },
};
```

### 4️⃣ Instalar dependencias

```bash
npm install
```

### 5️⃣ Probar localmente

```bash
npm run dev
```

Visita `http://localhost:3000` en tu navegador. Deberías ver tu contenido de Baserow.

### 6️⃣ Publicar en GitHub Pages

**¡Lo mejor es que ya está todo listo!** El workflow de GitHub Actions se encarga automáticamente del build y publicación.

Solo necesitas:

1. Abre [GitHub.com](https://github.com) y crea un nuevo repositorio público
2. Copia los archivos de esta plantilla en tu repositorio
3. Ve a **Settings** → **Pages**
4. En **Source** selecciona **GitHub Actions**
5. Haz push de tus cambios a la rama `main`

¡Eso es todo! El workflow automáticamente:

- Instala dependencias
- Compila el código
- Publica tu sitio en GitHub Pages

Cada vez que hagas push a `main`, el sitio se actualiza automáticamente en unos 2-3 minutos. No necesitas hacer `npm run build` localmente.

## Estructura de Archivos

```
proyecto/
├── src/
│   ├── config.js              ⭐ EDITAR: Tu configuración de Baserow
│   ├── programa.js             Código principal (lógica del sitio)
│   ├── baserow.js              Módulo para conectar con Baserow
│   ├── componentes.js          Funciones para crear elementos HTML
│   └── scss/
│       └── estilos.scss        ⭐ EDITAR: Tus estilos personalizados
├── index.html                  ⭐ EDITAR: Estructura HTML del sitio
├── vite.config.js              ⭐ EDITAR: Configuración si publicas en subruta
├── package.json                Dependencias del proyecto
└── estaticos/                  Carpeta para imágenes y otros archivos

⭐ = Archivos que probablemente necesitarás editar
```

## Personalización

### Cambiar colores

Abre `src/scss/estilos.scss` y modifica las variables al inicio:

```scss
$color-primario: #30cac0; // Color principal (turquesa)
$color-secundario: #130808; // Color secundario (negro)
$color-texto: #333; // Color del texto
$color-fondo: #ffffff; // Color de fondo
```

### Cambiar fuentes

En `src/scss/estilos.scss`:

```scss
$font-principal: 'Tu Font Aqui', sans-serif;
$font-tamaño-base: 16px; // Tamaño base
```

### Agregar más tablas

1. En `src/config.js`, agrega una nueva tabla:

```javascript
export const TABLA_ARTICULOS = {
  id: 999999,
  campos: {
    titulo: 'Título',
    contenido: 'Contenido',
    fecha: 'Publicado',
  },
};
```

2. En `src/programa.js`, carga esa tabla:

```javascript
import { TABLA_ARTICULOS } from './config.js';
import { crearListaArticulos } from './componentes.js';

async function cargarArticulos() {
  const articulos = await obtenerRegistrosTabla(TABLA_ARTICULOS.id);
  const lista = crearListaArticulos(articulos);
  document.querySelector('main').appendChild(lista);
}

cargarArticulos();
```

### Usar otros componentes

El archivo `src/componentes.js` tiene funciones listas:

- `crearTarjetaProyecto()` - Crea una tarjeta con imagen y enlace
- `crearListaArticulos()` - Lista de artículos con fechas
- `crearGaleria()` - Galería de imágenes
- `crearHereo()` - Banner al inicio de la página
- `crearSeccion()` - Sección genérica

Ejemplo:

```javascript
import { crearGaleria } from './componentes.js';

const galeria = crearGaleria([
  {
    url: 'https://ejemplo.com/foto1.jpg',
    titulo: 'Mi primera foto',
    descripcion: 'Tomada en...',
  },
]);

document.querySelector('main').appendChild(galeria);
```

## Solucionar Problemas

### ❌ "No veo mis datos de Baserow"

1. **Revisa la consola del navegador** (F12 → Console):
   - Si ves "Error de autenticación", tu token es incorrecto
   - Si ves "No se encontró la tabla", tu ID de tabla es incorrecto

2. **Verifica en Baserow**:
   - ¿Los datos están visibles en Baserow?
   - ¿Copiaste el token completo?
   - ¿Los IDs (DB_ID y TABLE_ID) son correctos?

3. **Comprueba los nombres de campos**:
   - En `config.js`, los nombres deben coincidir exactamente con los nombres en Baserow
   - Las mayúsculas importan

### ❌ "Mi sitio no se ve en GitHub Pages"

1. Asegúrate de haber hecho `yarn build`
2. Verifica en **Settings** →npm ruPages\*\* que está configurado correctamente
3. Si publicas en una subruta, cambia en `vite.config.js`:
   ```javascript
   base: '/nombre-repositorio/',
   ```

### Agregar búsqueda y filtros

```javascript
function filtrarProyectos(termino) {
  const proyectos = document.querySelectorAll('.tarjeta-proyecto');
  proyectos.forEach((tarjeta) => {
    const titulo = tarjeta.textContent.toLowerCase();
    if (titulo.includes(termino.toLowerCase())) {
      tarjeta.style.display = '';
    } else {
      tarjeta.style.display = 'none';
    }
  });
}
```

### Agregar paginación

En `src/baserow.js`, la función `obtenerRegistrosTabla()` puede filtrar por página:

```javascript
// Obtener página 2 (10 registros por página)
await obtenerRegistrosTabla(TABLA_PROYECTOS.id, {
  size: 10,
  page: 2,
});
```

## Recursos Útiles

- [Documentación de Baserow](https://baserow.io/docs)
- [GitHub Pages Docs](https://docs.github.com/es/pages)
- [MDN - Web Development](https://developer.mozilla.org/es/)
- [Guía de SCSS](https://sass-lang.com/guide)
- [API de Baserow](https://api.baserow.io/)

## Licencia

MIT - Libre para usar en proyectos personales y educativos.
