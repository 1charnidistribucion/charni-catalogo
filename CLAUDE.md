# CHARNI Distribución — Catálogo Digital

## ⚠️ INSTRUCCIÓN CRÍTICA — LEER ANTES DE CUALQUIER ACCIÓN
NUNCA resumir outputs de archivos. SIEMPRE mostrar el contenido completo.
Para ver archivos en Windows usar: cat -n "$TEMP/charni-catalogo/archivo" | cat
Pegar el output completo en el chat sin colapsar ni resumir bajo ninguna circunstancia.
Para escribir archivos JS/HTML con caracteres especiales en Windows, usar Node.js con fs.writeFileSync y process.env.TEMP para la ruta. NUNCA heredoc ni printf con comillas simples.

## Contexto del proyecto
- **Site:** https://1charnidistribucion.github.io/charni-catalogo/
- **Repo:** https://github.com/1charnidistribucion/charni-catalogo
- **Stack:** HTML/JS vanilla, GitHub Pages
- **Rama de trabajo:** dev (SIEMPRE trabajar acá, mergear a main cuando esté probado)
- **Tag de seguridad:** v1.0-estable

## Los tres catálogos
| Archivo | Operador | Teléfono WA | Precios | Las Dinas |
|---------|----------|-------------|---------|----------|
| index.html | Gastón (vendedor) | 5492213188614 | Sí (SHOW_PRICES=true) | visible |
| catalogo_gc.html | Gastón Charni (dueño) | 5492494544945 | No | visible |
| catalogo_cagnoli.html | Gastón Charni (dueño) | 5492494544945 | No | oculta |

## Arquitectura de archivos
- index.html, catalogo_gc.html, catalogo_cagnoli.html — un HTML por catálogo
- style.css — estilos compartidos (impacta los 3 catálogos)
- products.js — datos de productos (~103 items) con campos: name, cat, img, oval, desc, precio, precioOferta, descuento, peso, unidades, notaVenta
- app.js — lógica JS. WA se lee de window.WA_PHONE || 5492213188614
- config.js — configuración centralizada. Orden de carga: products.js → config.js → override inline → app.js
- img/heroes/ — imágenes de hero
- img/productos/ — imágenes de productos (IDs de Google Drive)

## Marcas y categorías
- Don Atilio: duros, semiduros, blandos
- Cagnoli: salamines, bastones, bastones-cond, atm, jamones, alta-mad
- Las Dinas: ld-crudas, ld-cocidas, ld-especiales, ld-frio, ld-caliente
- Lácteos Vidal: vidal-lacteos

## Diseño implementado
- Layout estilo Rappi/PedidosYa: scroll vertical + filas horizontales por categoría
- Fondo: #d9d2c8 (gris pronunciado cálido)
- Paleta: bordo #8b1538, dorado #c9a961
- Tipografía: Playfair Display (títulos) + Inter (cuerpo)
- Filtros de marca sticky en el header
- Cards por marca con tratamiento distinto:
  - Don Atilio: object-fit contain, fondo #f5f0e8, altura 150px
  - Cagnoli: object-fit contain, fondo #eef1f8, altura 150px
  - Las Dinas: object-fit cover, fondo #1a1008, altura 160px
  - Vidal: object-fit contain, fondo #f5f0e8, altura 150px
- Clase CSS por marca: .cat-card--donatilio, .cat-card--cagnoli, etc.

## Lógica de precios
- window.SHOW_PRICES=true solo en index.html
- Campos: precio (lista), precioOferta (con descuento), descuento (texto badge)
- Precios Don Atilio y Cagnoli: por kg. ATM: por unidad
- Las Dinas: precio de lista + notaVenta 10% OFF pago efectivo (sin calcular)
- Badge aparece sobre la foto cuando hay descuento y SHOW_PRICES=true

## Estado actual
- OK Layout rappi-style en los 3 catálogos
- OK Precios, descuentos, peso, unidades en cards (solo index.html los muestra)
- OK Las Dinas con precios 2026 y nota efectivo
- OK Carrito funcional con envío por WhatsApp
- PENDIENTE micro-feedback en botón Agregar
- PENDIENTE mejora general UX/UI

## Backlog
### Alta prioridad
- Micro-feedback botón Agregar: verde + tilde 1 segundo al tocar
- Mejora UX/UI general — sesión dedicada

### Media prioridad
- Cards Don Atilio: explorar crop cuadrado o layout alternativo
- Precios por cliente: Google Sheets + parámetro URL
- Last Shot: producto de la semana desde config.js

### Baja prioridad
- Heroes por marca con logo PNG superpuesto (logos pendientes)
- Catálogos dinámicos con base de datos de clientes

## Reglas de negocio
- Ofertas semanales: editar campo oferta en products.js, push
- Cagnoli: Las Dinas oculta via window.HIDDEN_BRANDS=[lasdinas]
- Precios: NUNCA mostrar en catalogo_gc.html ni catalogo_cagnoli.html

## Reglas de trabajo
- SIEMPRE rama dev, mergear a main cuando esté probado
- NUNCA inventar datos, teléfonos, nombres o rutas
- Leer archivo completo antes de modificar
- En Windows: process.env.TEMP es la ruta real, no /tmp
- Para escribir archivos con caracteres especiales: Node.js con fs.writeFileSync
- NUNCA resumir outputs — siempre cat -n archivo | cat completo

## Comandos git frecuentes
git checkout dev
git pull origin dev
git add archivo && git commit -m mensaje && git push origin dev

## Cómo iniciar sesión nueva
1. Clonar o pull del repo en TEMP
2. Leer este CLAUDE.md
3. Confirmar rama activa y último commit
4. Arrancar con backlog alta prioridad