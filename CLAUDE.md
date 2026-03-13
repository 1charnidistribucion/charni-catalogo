# CHARNI Distribución — Catálogo Digital

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

## Rediseño visual — PENDIENTE IMPLEMENTAR
- Estética: moderno minimalista, fondo claro
- Paleta: blanco/gris muy claro de base, acento bordo #8b1538, dorado #c9a961
- Tipografía: reemplazar fuentes genéricas por algo refinado y legible
- Cards: más limpias, imagen oval, tag de categoría, nombre, botones de acción
- Filtros de marca sticky (Todos / Don Atilio / Cagnoli / Las Dinas / Vidal)
- Tabs de subcategoría por marca horizontales y sticky
- Aplicar a los 3 HTMLs y style.css

## Sistema de pedido acumulado — PENDIENTE IMPLEMENTAR
- Botón "+" en cada card para agregar al pedido
- Barra flotante que aparece cuando hay productos, muestra cantidad y nombres
- Panel de revisión con lista de productos y opción de eliminar
- Vista previa del mensaje antes de enviar
- Botón "Enviar pedido por WhatsApp" (verde #25D366)

## Precios — estrategia definida, PENDIENTE IMPLEMENTAR
- No mostrar precios públicamente por ahora
- Estrategia futura: Google Sheets + URL con parámetro por cliente
- Ejemplo: charni-catalogo.github.io/?cliente=supermercado_lopez

## Próxima sesión
- Peso aproximado por unidad y unidades por caja en products.js

## Reglas de trabajo
- SIEMPRE leer este archivo antes de cualquier cambio
- SIEMPRE trabajar en rama dev, mergear a main cuando esté probado
- NUNCA inventar datos, teléfonos, nombres o rutas
- Para conflictos de merge: `git checkout dev -- archivo.html`
- Al iniciar sesión confirmar: catálogos existentes, teléfonos, rama activa

## Comandos git frecuentes
```powershell
git checkout dev
git checkout main
git merge dev
git push origin main
git checkout dev -- archivo.html
```
