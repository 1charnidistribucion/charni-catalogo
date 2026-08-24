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
- `products.js` — datos de productos
- `app.js` — lógica JS. WA se lee de `window.WA_PHONE || '5492213188614'`
- `config.js` — configuración centralizada. Orden de carga: products.js → config.js → override inline → app.js
- `img/heroes/` — imágenes de hero
- `img/productos/` — imágenes de productos
- `img/heroes/hero_general.webp.webp` — hero "Todos" (doble extensión, así está en repo)

## Convención de fotos de productos
Formato: `marca_producto.jpg` en minúsculas, sin espacios, sin tildes.
Ejemplos:
- `donatilio_gouda_pistacho.jpg`
- `cagnoli_mortadelita.jpg`
- `vidal_fontina.jpg`
- `cagnoli_bondiolitas_cerdo.jpg`

Las fotos se suben a: `img/productos/` en la rama dev.
En products.js el campo `img` contiene solo el nombre sin extensión ni ruta.

## Marcas y categorías completas

### Don Atilio
| Categoría | Productos destacados |
|-----------|---------------------|
| Duros | Reggianito, Sardo 100% estacionado, Grana Padano, Provolone Estacionado, Pepato |
| Semiduros | Tybo, Tybo Barra Ahumada, Pategás, Fontina, Gruyerito, Cheddar Cilindro, Cheddar Estilo Inglés, Banquete, Gouda Clásico/Ahumado/Orégano/Picante/Pistacho/Ajo, Parrilero Cilindro, Provoleta Parrillera Cilindro, Port Salut, Quesitos Saborizados |
| Blandos | Cremoso/Cuartirolo, Mozzarella, Port Salut con/sin sal |

### Lácteos Vidal
| Producto | Detalle | Precio |
|----------|---------|--------|
| Mozzarella Cilindro | 3kg | $9.626/kg |
| Mozzarella Plancha | 10kg o 25kg | $9.626/kg |
| Ricotta | 2kg y 5kg | sin precio aún |
| Manteca Primera | 5kg, envuelta en papel manteca, materia prima de primera calidad | sin precio aún |
| Crema de Leche | 10L, pasteurizada, tenor graso 39% | sin precio aún |
| Fontina | — | $17.800/kg |
| Tybo Vidal | — | $10.750/kg |

### Cagnoli
| Categoría | Productos |
|-----------|-----------|
| Salamines | Salamín #1, Salamín #2 |
| Bastones | Longaniza Calabresa, Bastón Picado Fino, Picado Grueso, Español |
| Bastones Condimentados | Bastón Picado Fino Ají, Bastón Picado Fino Finas Hierbas, Bastón Picado Grueso Pimienta Negra |
| ATM (envasados, venta x caja cerrada x10u) | Fuet Clásico, Fuet Serrano, Salamín Picado Fino, Picado Grueso, Ahumado a Tres Leñas, Picante Pimienta Cayena, Finas Hierbas, Sopresatta |
| Jamones y Cocidos | Jamón Cocido, Jamón Natural Cocción Lenta, Paleta 1ra Calidad, Salame Milán Cagnoli, Panceta Ahumada, Mortadela Bocha (horma 5kg, $9.000/kg), Lomo Finas Hierbas ($17.267/kg, aprox 800gr/pieza), Bondiola Cagnoli (sin precio aún) |
| Alta Maduración | Jamón Crudo Est. 12 meses, Spianatta Clásica, Spianatta Finas Hierbas, Spianatta al Ají |
| Feteados (venta x caja cerrada) | Jamón Cocido Natural ($2.817,61/blister 120gr, caja x15u), Salame Tandilero Tipo Milán ($4.503,15/paquete 180gr, caja x15u), Bondiola ($4.922,61/paquete 120gr, caja x15u), Jamón Cocido ($3.685/u 200gr, caja x15u), Panceta Ahumada y Cocida ($12.000/blister 500gr, caja x32u) |
| Línea Envasados Cagnoli | Leberwurst ($1.237,33/u 150gr), Mortadela ($2.809,43/u caja x14u), Mortadela con Pistacho ($4.327,05/u 250gr) |
| Congelados y Para Cocción | Bondiolitas de Cerdo ($2.760/paquete, 200gr, 2u/paquete, caja x5u, libre de sellos, libre de gluten), Lomitos de Cerdo ($2.760/paquete, 200gr, 2u/paquete, caja x5u, libre de sellos, libre de gluten), Chorizo Fresco Puro Cerdo ($4.258,80/paquete, 400gr, 4u/blister, caja x20u, libre de gluten) |

## Precios actualizados — Don Atilio
| Producto | Lista | Oferta | Descuento |
|----------|-------|--------|-----------|
| Reggianito | $19.370 | $18.402 | -5% x caja |
| Sardo 100% estacionado | $23.300 | — | — |
| Grana Padano | $26.488 | $19.000 | -28.2% |
| Provolone Estacionado | $25.900 | — | — |
| Provoleta Parrillera Cilindro | $20.300 | — | — |
| Provolone Rallar | $23.149 | $19.677 | -15% |
| Tybo | $13.464 | $10.238 | -23.8% |
| Tybo Barra Ahumada | $17.007 | — | — |
| Pategás y Fontina | $18.189 | $17.279 | -5% x caja 2u |
| Gruyerito | $16.654 | — | — |
| Gouda (todos) | $22.871 | $17.000 | -25.7% |
| Port Salut con/sin sal | $10.500 | — | — |
| Cheddar Cilindro | $19.500 | — | — |
| Banquete | $20.138 | $16.110 | -20% |
| Quesitos Saborizados | $17.365 | — | — |
| Cremoso/Cuartirolo | $9.118 | $8.340 | -7.2% x 12u |
| Mozzarella | $10.608 | — | — |

## Precios actualizados — Cagnoli
| Producto | Lista | Oferta | Descuento |
|----------|-------|--------|-----------|
| Salamines | $53.817 | $26.775 | -50.3% |
| Bastones | $53.817 | $27.804 | -48.3% |
| Jamón Cocido | $13.034 | — | — |
| Jamón Natural Cocción Lenta | $23.784 | $21.406 | -10% x volumen |
| Paleta 1ra Calidad | $13.703 | $9.000 | -34.3% x 16u mín |
| Panceta Ahumada | $23.033 | — | — |
| Salame Milán Cagnoli | $19.399 | $18.429 | -5% |
| Mortadela Bocha | — | $9.000/kg | — |
| Lomo Finas Hierbas | $17.267/kg | — | — |
| Spianatta Clásica | $40.485 | — | — |
| Spianattas especiadas | $40.487 | — | — |
| Jamón Crudo 12 meses | $67.480 | — | — |
| Fuet Clásico/Serrano | $8.144 | $7.329 | -10% |
| Salamines ATM | $8.146 | $7.331 | -10% |

## Implementado
- Rediseño visual: fondo claro #f7f4f0, bordo #8b1538, dorado #c9a961 (commit 5388a89)
- Tipografía: Playfair Display + Inter
- Filtros de marca sticky
- Lógica de precios en cards: precio lista tachado + precio oferta + badge descuento
- SHOW_PRICES = true en index.html, false en los otros dos catálogos
- Precios cargados en products.js para Don Atilio, Vidal y Cagnoli (commit 7f13e67)

## Pendiente implementar
### Productos nuevos (cards a agregar)
- Vidal: Fontina, Tybo Vidal, Crema de Leche
- Don Atilio: Cheddar Estilo Inglés, Gouda Pistacho, Gouda Ajo
- Cagnoli Feteados: Jamón Cocido Natural, Salame Tandilero Tipo Milán, Bondiola, Jamón Cocido, Panceta Ahumada Cocida
- Cagnoli Envasados: Leberwurst, Mortadela, Mortadela con Pistacho
- Cagnoli Jamones: Mortadela Bocha, Lomo Finas Hierbas, Bondiola Cagnoli
- Cagnoli Congelados: Bondiolitas de Cerdo, Lomitos de Cerdo, Chorizo Fresco

### Navegación y UX
- Subcategorías por marca como tabs horizontales sticky
- Cards con íconos para Congelados (copo de nieve) y Para Cocción (llama)
- Sistema de pedido acumulado con barra flotante y envío por WhatsApp
- Rediseño aplicar a catalogo_gc.html y catalogo_cagnoli.html

### Fotos
- Convención: `marca_producto.jpg` en `img/productos/`
- Pendiente: subir fotos de productos nuevos cuando estén disponibles

### Precios por cliente (futuro)
- Google Sheets + URL con parámetro: `?cliente=nombre`

## Estilo de trabajo — LEER ANTES DE ARRANCAR
- Respuestas cortas y directas
- Leer archivo completo antes de modificar
- Mostrar cambios en index.html primero, confirmar, luego aplicar a los otros dos
- Nunca inventar datos: precios, nombres, teléfonos, rutas
- Ante errores circulares: parar, leer estado actual, identificar causa raíz
- Confirmar al inicio: catálogos, teléfonos, rama activa
- Cambios grandes = pasos pequeños con confirmación entre cada uno
- `git add -f` si Git no detecta cambios esperados
- Para conflictos de merge: `git checkout dev -- archivo.html`

## Comandos git frecuentes
```powershell
git checkout dev
git checkout main
git merge dev
git push origin main
git checkout dev -- archivo.html
```
