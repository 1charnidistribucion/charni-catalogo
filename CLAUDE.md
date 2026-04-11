# CHARNI Distribución — Catálogo Digital

## ⚠️ INSTRUCCIÓN CRÍTICA — LEER ANTES DE CUALQUIER ACCIÓN
NUNCA resumir outputs de archivos. SIEMPRE mostrar el contenido completo.
Para ver archivos usar SIEMPRE: `type "$TEMP\charni-catalogo\archivo"` en Windows.
Pegar el output completo en el chat sin colapsar ni resumir bajo ninguna circunstancia.

## Contexto del proyecto
- **Site:** https://1charnidistribucion.github.io/charni-catalogo/
- **Repo:** https://github.com/1charnidistribucion/charni-catalogo
- **Stack:** HTML/JS vanilla, GitHub Pages
- **Rama de trabajo:** dev (SIEMPRE trabajar acá, mergear a main cuando esté probado)
- **Tag de seguridad:** v1.0-estable

## Los tres catálogos
| Archivo | Operador | Teléfono WA | Las Dinas |
|---------|----------|-------------|-----------|
| index.html | Gastón (vendedor) | 5492213188614 | visible |
| catalogo_gc.html | Gastón Charni (dueño) | 5492494544945 | visible |
| catalogo_cagnoli.html | Gastón Charni (dueño) | 5492494544945 | oculta |

## Arquitectura de archivos
- `index.html`, `catalogo_gc.html`, `catalogo_cagnoli.html` — un HTML por catálogo
- `style.css` — estilos compartidos (impacta los 3 catálogos)
- `products.js` — datos de productos (~103 items)
- `app.js` — lógica JS. WA se lee de `window.WA_PHONE || '5492213188614'`
- `config.js` — configuración centralizada. Orden de carga: products.js → config.js → override inline → app.js
- `img/heroes/` — imágenes de hero
- `img/heroes/hero_general.webp.webp` — hero "Todos" (doble extensión, así está en repo)

## Marcas y categorías
- **Don Atilio:** Duros, Semiduros (Quesitos Saborizados = 3 variedades en 1 card), Blandos
- **Cagnoli:** Salamines, Bastones 800g, Bastones Condimentados, ATM, Jamones y Cocidos, Alta Maduración
- **Las Dinas:** Piezas Crudas, Piezas Cocidas, Embutidos Especiales, Ahumados en Frío, Ahumados en Caliente
- **Lácteos Vidal:** Productos Lácteos

## Heroes actuales (heroMedia en app.js)
```javascript
const heroMedia = {
  all: 'img/heroes/hero_general.webp.webp',
  donatilio: 'img/heroes/1HlQaS3OYSmdBeUMas_96dCEJzDbgY1x4.jpg',
  cagnoli: ['img/heroes/1qBb1EtllIm_31Ieb3kxwa2HuIHsrTIPC.jpg',
            'img/heroes/1pHMXQBFqnC-jaQFIgkkDlvvbUVOx_hsH.jpg',
            'img/heroes/1OrN33PqJ7FALNkNf6Q5dEm8ffaLEgzVQ.jpg',
            'img/heroes/1-48MhyKnYstoXG8zitW1PN9hKncSx1uG.jpg'],
  lasdinas: ['img/heroes/1RYjiNC9ZPYuGAjL14MQzXC4dryj4-P1P.jpg',
             'img/heroes/1NbdE92x51--hfyCR3_b8ItFCsBxXDQ38.jpg'],
  vidal: 'img/heroes/1w0EDmpP3n-pWQCimwTothoY1RTMmqQx9.jpg'
};
```

## Estado actual — post sesión 2

### Implementado en dev (pendiente mergear a main cuando esté probado)
- Layout rappi-style: scroll vertical + filas horizontales por categoría
- Filtros de marca sticky (Todos / Don Atilio / Cagnoli / Las Dinas / Vidal)
- Fondo general: #d9d2c8 (gris pronunciado cálido)
- Carrito funcional con envío por WhatsApp
- Commits: c79ab8c → 49862d7 → bad2bcd

### Próxima sesión — prioridad
- Replicar cambios de index.html + app.js + style.css en catalogo_gc.html y catalogo_cagnoli.html
- catalogo_cagnoli.html: Las Dinas oculta (ya era así antes)

## Backlog de mejoras

### Hero
- Hero general: mantener Variante A con logo CHARNI Distribución
- Hero por marca: foto fija + PNG del logo de cada marca superpuesto
  - Logos PNG pendientes de conseguir (Don Atilio, Cagnoli, Las Dinas, Vidal)
  - Fotos de fondo: usar las existentes en img/heroes/ (reemplazar en sesión futura)
  - Cagnoli y Las Dinas: simplificar de rotante a foto fija cuando se implemente

### Imágenes de producto
- Cards con imagen oval: ampliar campo visual del contenedor (más ancho, más presencia)

### Last Shot / Producto de la semana
- Card destacada en pantalla inicio con producto rotable desde config.js
- Versión futura: conectar a Google Sheets para rotación sin tocar código

### Precios por cliente
- No mostrar precios públicamente
- Estrategia: Google Sheets + parámetro URL (?cliente=nombre)

### Peso y unidades
- Agregar peso aproximado por unidad y unidades por caja en products.js

### Cards Don Atilio — próxima sesión
- Las imágenes son horizontales en cards verticales → producto se ve pequeño
- Opciones a explorar: cards más anchas para Don Atilio, o crop cuadrado de las fotos, o layout diferente para quesos
- No tocar hasta tener una propuesta visual aprobada

## Reglas de trabajo
- SIEMPRE leer este archivo antes de cualquier cambio
- SIEMPRE trabajar en rama dev, mergear a main cuando esté probado
- NUNCA inventar datos, teléfonos, nombres o rutas
- Para conflictos de merge: `git checkout dev -- archivo.html`
- Al iniciar sesión confirmar: catálogos existentes, teléfonos, rama activa

## Estilo de trabajo
- Cuando se pida ver un archivo: ejecutar `cat -n archivo | cat` y pegar el output completo en el chat, nunca resumir ni colapsar

## Comandos git frecuentes
```powershell
git checkout dev
git checkout main
git merge dev
git push origin main
git checkout dev -- archivo.html
```
