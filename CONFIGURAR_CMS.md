# Configurar CMS en Baserow

El CMS (Sistema de Gestión de Contenidos) te permite editar el contenido del sitio directamente desde Baserow, sin necesidad de cambiar código.

## ¿Qué es DATOS_SITIO?

`DATOS_SITIO` es una tabla especial en Baserow que controla:

- **Título e introducción** del sitio
- **Texto encima de los proyectos** (colección)
- **Información de contacto**

Esta tabla debe tener **una sola fila** con toda la información del sitio.

## Paso 1: Crear la tabla en Baserow

1. Ve a tu base de datos en Baserow (la que está en `config.js`)
2. Haz clic en **"+ Nueva tabla"**
3. Dale un nombre: `Sitio` o `Contenido`
4. Haz clic en **Crear**

## Paso 2: Agregar los campos

Crea estos campos en la tabla (los nombres deben ser exactos):

| Campo                 | Tipo      | Descripción                                       |
| --------------------- | --------- | ------------------------------------------------- |
| `Nombre del sitio`    | Text      | Título que aparece en el navegador                |
| `Descripción`         | Long text | Descripción general del sitio                     |
| `URL del sitio`       | URL       | La URL completa de tu sitio                       |
| `Título introducción` | Text      | Título de la sección de inicio                    |
| `Introducción`        | Long text | Texto de bienvenida (puedes usar Markdown)        |
| `Título colección`    | Text      | Título de la sección de proyectos                 |
| `Texto colección`     | Long text | Descripción de la sección de proyectos (Markdown) |

## Paso 3: Agregar una fila

1. Agrega **una sola fila** a la tabla
2. Completa los campos con el contenido de tu sitio
3. Puedes usar **Markdown** en los campos de "Long text" para:
   - Hacer títulos: `# Título`, `## Subtítulo`
   - Negritas: `**texto**`
   - Itálicas: `*texto*`
   - Listas: `- elemento`
   - Enlaces: `[texto](https://ejemplo.com)`

## Paso 4: Copiar el ID de la tabla

1. Abre la tabla que acabas de crear
2. Mira la URL en el navegador
3. Busca algo como: `/database/364668/table/825354/`
4. El número después de `/table/` es tu `TABLE_ID` → `825354`

## Paso 5: Configurar en config.js

1. Abre [src/config.js](src/config.js)
2. Busca esta sección:

```javascript
export const DATOS_SITIO = {
  id: 0, // ← CAMBIA ESTO
  campos: {
    titulo: 'Nombre del sitio',
    descripcion: 'Descripción',
    // ... resto de campos
  },
};
```

3. Reemplaza `0` con tu TABLE_ID:

```javascript
export const DATOS_SITIO = {
  id: 825354, // ← Tu ID
  campos: {
    // ... resto igual
  },
};
```

4. **Guarda el archivo** (Ctrl+S)

## Paso 6: Guardar cambios

El sitio se actualizará automáticamente gracias a GitHub Actions.

## Verificar que funciona

1. Abre tu sitio en el navegador
2. Deberías ver:
   - Tu título en la pestaña del navegador
   - La introducción en la sección "Inicio"
   - El texto de la colección antes de los proyectos

Si no ves nada:

- Abre la **consola del navegador** (F12 → Console)
- Busca mensajes de error en rojo
- Si dice `DATOS_SITIO no está configurada`, significa que `DATOS_SITIO.id` sigue siendo `0`

## ¿Cómo editar después?

Simplemente:

1. Abre la tabla `Sitio` en Baserow
2. Edita los campos
3. El sitio se actualizará automáticamente en 5 minutos (o cuando recargues)

¡No necesitas ejecutar `npm run build` ni hacer nada más! 🎉

## Ejemplo completo

Aquí hay un ejemplo de cómo llenar la tabla:

| Campo               | Contenido                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| Nombre del sitio    | Mi Portafolio                                                                                          |
| Descripción         | Mis mejores proyectos de tecnología                                                                    |
| URL del sitio       | https://ejemplo.github.io/mi-sitio                                                                     |
| Título introducción | Bienvenido                                                                                             |
| Introducción        | Soy un estudiante de tecnología apasionado por crear cosas. Aquí encontrarás algunos de mis proyectos. |
| Título colección    | Mis Proyectos                                                                                          |
| Texto colección     | Estos son algunos de los proyectos en los que he trabajado este año.                                   |

## Problemas comunes

### "No veo la introducción"

- Revisa que `DATOS_SITIO.id` está configurado (no es `0`)
- Verifica que la tabla tiene al menos una fila
- Abre la consola (F12) para ver si hay errores

### "Los campos no coinciden"

Los nombres de los campos deben ser **exactos** (incluyendo mayúsculas, espacios y tildes):

- ✅ `Introducción`
- ❌ `introduccion`
- ❌ `Introducion` (sin acento)

### "El markdown no se ve"

Algunos campos como `Introducción` renderizan markdown, otros no. Los que usan markdown son:

- `Introducción`
- `Texto colección`

Los otros campos son solo texto plano.

Los otros campos son solo texto plano.
