# CHARNI Distribución — Catálogo Digital

## Proyecto
Catálogo web B2B para distribuidora de alimentos. Stack: HTML/CSS/JS vanilla, GitHub Pages.
Repo: https://github.com/1charnidistribucion/charni-catalogo
Live: https://1charnidistribucion.github.io/charni-catalogo/

## Los tres catálogos
| Archivo | Operador | Teléfono | Las Dinas |
|---------|----------|----------|-----------|
| index.html | Gastón (vendedor) | 2213188614 | visible |
| catalogo_gc.html | Gastón Charni (dueño) | 2494544945 | visible |
| catalogo_cagnoli.html | Gastón Charni (dueño) | 2494544945 | oculta |

Los tres comparten style.css, products.js y app.js. Cambios en esos archivos impactan los tres.
Las diferencias entre catálogos se controlan via window.SITE_CONFIG en cada HTML.

## Archivos principales
- index.html — catálogo principal
- catalogo_gc.html — catálogo Gastón Charni, todas las marcas
- catalogo_cagnoli.html — catálogo Gastón Charni, sin Las Dinas
- style.css — todos los estilos
- products.js — datos de productos (array hardcodeado, ~103 productos, puede crecer)
- app.js — toda la lógica JS. WA se lee de window.SITE_CONFIG.phone
- config.js — (pendiente) configuración centralizada por página

## Marcas y categorías
**Don Atilio** — quesos artesanales
- Duros, Semiduros, Blandos
- Nota: Quesitos Saborizados son 3 variedades (Clásico, Orégano, Ahumado) en un solo card de 1kg

**Cagnoli** — embutidos de Tandil (distribuidor oficial)
- Salamines, Bastones 800g, Bastones Condimentados 800g, Línea Envasados ATM, Jamones y Cocidos, Alta Maduración

**Las Dinas** — chacinados de Tandil
- Piezas Crudas, Piezas Cocidas, Embutidos Especiales, Ahumados en Frío, Ahumados en Caliente

**Lácteos Vidal** — lácteos
- Productos Lácteos (Ricotta, Manteca, Mozzarella)

Los productos pueden aumentar en cualquier marca en cualquier momento.

## Imágenes
- Heroes: img/heroes/ — NUNCA img/productos/
- Productos: img/productos/
- hero_general.webp.webp — hero para filtro "Todos" (doble extensión, así está en el repo)
- Heroes de Cagnoli y Las Dinas son carruseles (arrays de imágenes)

## Reglas de trabajo
- SIEMPRE leer el contenido de un archivo antes de modificarlo
- SIEMPRE verificar si tiene scripts inline o externos antes de editar
- SIEMPRE trabajar en rama dev, mergear a main cuando esté probado y verificado
- NUNCA inventar datos, teléfonos, nombres o rutas — preguntar si no se sabe
- NUNCA tocar index.html cuando el cambio es solo para gc o cagnoli
- Usar git add -f si Git no detecta cambios esperados
- Usar git commit --allow-empty si el commit no registra cambios esperados

## Estado actual
- Heroes funcionando en los 3 catálogos ✅
- Gradiente lateral en hero ✅
- Texto separado del hero ✅
- 3 catálogos con teléfonos correctos y Las Dinas controlada ✅
- config.js pendiente de implementar
- Navegación mobile pendiente
- Rediseño visual con hero por categoría pendiente (requiere imágenes)
- Hero general ("Todos") pendiente — imagen actual no representa todas las marcas

## Ramas
- main — producción
- dev — desarrollo activo
- v1.0-estable — tag del primer estado funcional

## Pendientes priorizados
1. config.js — centralizar teléfono y visibilidad de marcas
2. Hero general — imagen que represente las 4 marcas
3. Navegación mobile
4. Rediseño hero por categoría (estilo Cagnoli)
5. Datos de packaging en cards de productos
