# Portafolio · Reparación de PC

Sitio personal de una sola página para un técnico en reparación de computadoras. Está escrito con HTML, CSS y JavaScript puros: no tiene dependencias ni paso de compilación, así que podés abrirlo o publicarlo tal cual.

**Idea visual:** la PC aparece desarmada como en un manual de servicio (vista explotada). Cada pieza lleva un número que la vincula con su servicio. Si pasás el mouse o tocás un número, se encienden la pieza y su fila en la lista.

## Qué incluye

- Portada con el dibujo técnico animado y el botón de WhatsApp.
- Lista de servicios redactada como síntomas («No prende», «Se apaga sola…»), vinculada al dibujo.
- «Cómo trabajo»: el proceso en 5 pasos, con un indicador de «tu equipo está acá».
- Fichas de trabajo (casos de ejemplo para reemplazar por los tuyos).
- Sobre mí, preguntas frecuentes y contacto.
- Armador de mensaje de WhatsApp: el visitante marca síntomas y se abre WhatsApp con el texto listo. No se guarda nada en el sitio.
- Modo claro y oscuro (sigue al sistema y recuerda la elección).
- Responsive (celular, tablet y PC), con una barra fija de WhatsApp en el celular.
- Accesibilidad: HTML semántico, navegación con teclado, foco visible, contraste AA y respeto por «reducir movimiento».
- SEO: título, descripción, Open Graph, datos estructurados (LocalBusiness), `sitemap.xml` y `robots.txt`.
- Seguridad: Content-Security-Policy estricta (sin scripts ni estilos en línea), enlaces externos con `noopener`, sin formularios que envíen datos a terceros.

## Cómo verlo en tu computadora

Necesitás cualquier servidor estático. Con Python:

```bash
python -m http.server 5173
```

Abrí <http://localhost:5173>. Abrir `index.html` con doble clic también funciona, pero la fuente y algunos detalles se ven mejor con un servidor.

## Lo primero: poné tus datos

El sitio tiene datos de ejemplo que **tenés que reemplazar** antes de publicarlo:

| Dato de ejemplo | Dónde está |
|---|---|
| `Tu Nombre`, `TN` (iniciales) | `index.template.html` (varias veces), `404.html`, `site.webmanifest`, `assets/favicon.svg` |
| `Tu Ciudad` | `index.template.html` |
| `tu-usuario.github.io/portafolio-reparacion-pc` | `index.template.html` (canonical, Open Graph, JSON-LD), `robots.txt`, `sitemap.xml` |
| Horario, zona y tipos de equipo | `index.template.html`, sección «Sobre mí» |
| Fichas A, B y C («Caso de ejemplo») | `index.template.html`, sección «Trabajos». Reemplazalas por reparaciones reales y sacá la etiqueta «Caso de ejemplo». |

Revisá también que las respuestas de **Preguntas frecuentes** y los pasos de **Cómo trabajo** describan cómo trabajás de verdad (presupuesto, copia de seguridad, plazos). Están redactadas como propuesta y no como compromisos confirmados.

Con el buscador del editor encontrás todos los datos de ejemplo: buscá `Tu Nombre`, `Tu Ciudad`, `tu-usuario` y `ejemplo`.

El celular (`5493858459463`) y el correo ya están cargados. Para cambiarlos, editá la constante `WHATSAPP_NUMBER` en `js/main.js` y los enlaces `wa.me`, `tel:` y `mailto:` de `index.template.html`.

### Después de editar: regenerar `index.html`

El archivo que se publica es `index.html`. Se genera a partir de `index.template.html`, que es el que tenés que editar, más el dibujo y la lista de servicios (definidos en `tools/build.py`):

```bash
python tools/build.py
```

Si preferís no usar Python, podés editar `index.html` directamente. En ese caso no vuelvas a ejecutar `build.py`, porque pisaría tus cambios.

Para cambiar los servicios (texto o número), editá la lista `SERVICES` en `tools/build.py` y regenerá.

### Imagen para redes (`assets/og-image.png`)

Es la imagen que aparece al compartir el link en WhatsApp o en redes. Se genera a partir de `tools/og.html`. Cuando cambies tu nombre, volvé a capturarla a 1200 × 630 con Chrome o Edge en modo headless:

```bash
msedge --headless --hide-scrollbars --window-size=1200,630 --screenshot=assets/og-image.png http://localhost:5173/tools/og.html
```

## Publicarlo en internet (gratis)

### Opción A: GitHub Pages

1. Creá un repositorio en GitHub (por ejemplo `portafolio-reparacion-pc`).
2. Conectá esta carpeta y subí los cambios:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/portafolio-reparacion-pc.git
   ```
   ```bash
   git push -u origin main
   ```
3. En GitHub, entrá a **Settings → Pages**, elegí *Deploy from a branch*, la rama `main` y la carpeta `/ (root)`, y guardá.
4. A los pocos minutos el sitio queda en `https://TU-USUARIO.github.io/portafolio-reparacion-pc/`. Reemplazá esa URL en los archivos de la tabla de arriba.

### Opción B: Netlify o Cloudflare Pages

Importá el repositorio desde su panel. No hace falta comando de compilación y la carpeta de publicación es la raíz (`/`). Te dan una URL gratis y podés conectar un dominio propio.

### Dominio propio (opcional)

Si comprás un dominio (por ejemplo, uno `.com.ar` en NIC Argentina), configuralo en el panel de tu hosting y actualizá las URLs del canonical, Open Graph, `robots.txt` y `sitemap.xml`.

## Estructura

```
index.html            Página publicada (generada)
index.template.html   Plantilla editable
404.html              Página de error
css/styles.css        Estilos y tokens de diseño (colores, tipografía, espacios)
css/exploded.css      Posiciones de la animación del dibujo (generado)
js/theme-init.js      Aplica el tema antes de pintar la página
js/main.js            Interacciones (dibujo, proceso, WhatsApp, menú, tema)
assets/fonts/         Archivo (variable, licencia SIL OFL)
assets/favicon.svg    Ícono
assets/og-image.png   Imagen para redes sociales
tools/                Generadores del dibujo, la página y la imagen para redes
PRODUCT.md, DESIGN.md Contexto de producto y sistema de diseño
.impeccable/          Brief de diseño y configuración de Impeccable
```

## Créditos

- Tipografía: [Archivo](https://fonts.google.com/specimen/Archivo) de Omnibus-Type, licencia SIL Open Font License 1.1, alojada en el propio sitio.
- Dibujo técnico: generado con código (`tools/exploded_view.py`), sin imágenes de terceros.
