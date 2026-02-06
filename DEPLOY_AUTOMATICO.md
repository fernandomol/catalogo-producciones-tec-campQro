# Despliegue Automático en GitHub Pages

## ¿Cómo funciona?

El proyecto ya incluye un **workflow de GitHub Actions** que automáticamente:

1. Compila tu código
2. Construye el sitio
3. Lo publica en GitHub Pages

**No necesitas hacer `npm run build` localmente ni configurar nada complicado.**

## Pasos simples para desplegar

### 1. Crea un repositorio en GitHub

1. Ve a [github.com](https://github.com)
2. Haz click en "New repository"
3. Nombre: `tu-nombre.github.io` o cualquier nombre
4. Marca **Public**
5. Click en "Create repository"

### 2. Sube tu código

**Opción A: Con Git (línea de comandos)**

```bash
git init
git add .
git commit -m "Proyecto inicial"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

**Opción B: Con GitHub Desktop**

1. Abre GitHub Desktop
2. File → New Repository
3. Selecciona el folder del proyecto
4. Publish repository
5. Haz cambios, commit, y push

### 3. Configura GitHub Pages

1. Ve a tu repositorio en GitHub
2. **Settings** → **Pages**
3. En "Source" selecciona **GitHub Actions**
4. **¡Listo!** El sitio estará publicado en 2-3 minutos

### 4. Actualiza el sitio

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

GitHub Actions automáticamente hará el build y publicará los cambios.

## ¿Dónde está mi sitio publicado?

Después del primer push, verás el URL en:

- **Settings** → **Pages** → "Your site is live at..."
- O directamente: `https://tu-usuario.github.io/tu-repo`

## ¿Qué pasa si algo no funciona?

1. Ve a la pestaña **Actions** de tu repositorio
2. Verás el workflow `Build and Deploy`
3. Si está en rojo (❌), haz click para ver qué salió mal
4. Si está en verde (✅), el sitio se publicó correctamente

## ¿Cómo editar localmente mientras subes cambios?

```bash
npm run dev        # Ver cambios en localhost:5173
# Edita los archivos
git add .
git commit -m "Cambios"
git push           # GitHub Actions compila y publica automáticamente
```

## Para estudiantes

No necesitan aprender sobre build o compilación. Solo:

1. Clonar/descargar el proyecto
2. Editar `src/config.js` con sus datos de Baserow
3. Hacer push a GitHub
4. **¡Listo! El sitio se publica automáticamente**

El workflow se encarga del resto.
