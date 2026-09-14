const WA = window.WA_PHONE || '5492213188614';
let cart = [];
let cartVisibleCount = 5;
try {
  const savedCart = localStorage.getItem('charni_cart');
  if (savedCart) cart = JSON.parse(savedCart);
} catch (e) { }
const heroMedia = {
  all: 'img/heroes/fiambres-hero.jpg',
  donatilio: 'img/heroes/don_atilio.jpg',
  lasdinas: ['img/heroes/1RYjiNC9ZPYuGAjL14MQzXC4dryj4-P1P.jpg', 'img/heroes/1NbdE92x51--hfyCR3_b8ItHCsBxXDQ38.jpg'],
  vidal: 'img/heroes/1w0EDmpP3n-pWQCimwTothoY1RTMmqQx9.jpg'
};
let currentBrand = 'all';
let searchTerm = '';
let dinasImgIndex = 0;
let imgInterval = null;

const brandSections = {
  donatilio: [
    { id: 'duros', title: 'Quesos Duros' },
    { id: 'semiduros', title: 'Quesos Semiduros' },
    { id: 'blandos', title: 'Quesos Blandos' }
  ],
  cagnoli: [
    { id: 'salamines', title: 'Salamines' },
    { id: 'bastones', title: 'Bastones' },
    { id: 'bastones-cond', title: 'Bastones Condimentados' },
    { id: 'atm', title: 'Línea Envasados ATM' },
    { id: 'jamones', title: 'Jamones y Cocidos' },
    { id: 'alta-mad', title: 'Alta Maduración' },
    { id: ['feteados', 'envasados'], title: 'Feteados y Envasados' },
    { id: 'congelados', title: 'Congelados y Para Cocción ❄️' }
  ],
  lasdinas: [
    { id: 'ld-crudas', title: 'Piezas Crudas' },
    { id: 'ld-cocidas', title: 'Piezas Cocidas' },
    { id: 'ld-especiales', title: 'Embutidos Especiales' },
    { id: 'ld-frio', title: 'Ahumados en Frío' },
    { id: 'ld-caliente', title: 'Ahumados en Caliente' }
  ],
  vidal: [
    { id: 'vidal-duros', title: 'Quesos Duros' },
    { id: 'vidal-semiduros', title: 'Quesos Semiduros' },
    { id: 'vidal-blandos', title: 'Quesos Blandos' },
    { id: 'vidal-lacteos-otros', title: 'Lácteos' }
  ]
};

const brandNames = { donatilio: 'Don Atilio', cagnoli: 'Cagnoli', lasdinas: 'Las Dinas', vidal: 'Lácteos Vidal' };

// Texto mostrado en vez del botón "Agregar" cuando la forma elegida tiene cantidadVariable:true
// (hoy ningún producto cargado usa esto — queda listo para cuando aparezca el primer caso real).
// Es un solo string: se puede ajustar libremente sin tocar el resto de la lógica.
const NOTA_CANTIDAD_VARIABLE = 'Cantidad de la caja variable — consultanos';

function normalizeText(s) {
  return (s || '').toString().normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}
const baseUrl = 'https://1charnidistribucion.github.io/charni-catalogo/img/productos/';

function updateHero(brand) {
  const heroBg = document.getElementById('heroBg');
  const heroVideo = document.getElementById('heroVideo');
  currentBrand = brand;
  if (imgInterval) { clearInterval(imgInterval); imgInterval = null }
  if (brand === 'cagnoli') {
    heroBg.style.opacity = '0';
    if (heroVideo) {
      heroVideo.style.opacity = '1';
      heroVideo.currentTime = 0;
      heroVideo.play().catch(() => { });
    }
    return;
  }
  if (heroVideo) { heroVideo.style.opacity = '0'; heroVideo.pause() }
  if (brand === 'lasdinas' && heroMedia.lasdinas.length > 0) { playNextDinasImg(); imgInterval = setInterval(playNextDinasImg, 5000) }
  else if (brand === 'donatilio') { heroBg.style.backgroundImage = `url('${heroMedia.donatilio}')`; heroBg.style.opacity = '1' }
  else if (brand === 'vidal') { heroBg.style.backgroundImage = `url('${heroMedia.vidal}')`; heroBg.style.opacity = '1' }
  else { heroBg.style.backgroundImage = "url('img/heroes/fiambres-hero.jpg')"; heroBg.style.opacity = '1' }
}

function playNextDinasImg() {
  const heroBg = document.getElementById('heroBg');
  heroBg.classList.add('fade-out');
  setTimeout(() => { if (currentBrand !== 'lasdinas') return; heroBg.style.backgroundImage = `url('${heroMedia.lasdinas[dinasImgIndex]}')`; heroBg.style.opacity = '1'; heroBg.classList.remove('fade-out'); dinasImgIndex = (dinasImgIndex + 1) % heroMedia.lasdinas.length }, 500)
}

// ── Precio/niveles/selector de forma ──────────────────────────────
function fmtPrecio(n) { return `$${Math.round(n).toLocaleString('es-AR')}` }

function renderFormaSelector(p, selectedIdx, pnameEscaped) {
  if (!p.formas || p.formas.length <= 1) return '';
  return `<div class="forma-selector">${p.formas.map((f, i) => `<button type="button" class="forma-pill${i === selectedIdx ? ' active' : ''}" data-idx="${i}" onclick="onFormaSelect(event,'${pnameEscaped}')">${f.nombre}</button>`).join('')}</div>`;
}

function renderCardDynamic(p, forma, unidadSuffix, showPrices, pnameEscaped) {
  let html = '';
  if (showPrices && p.precio) {
    let listaVal = p.precio, ofertaVal = null;
    if (forma && typeof forma.descuento === 'number') {
      ofertaVal = Math.round(p.precio * (1 - forma.descuento / 100));
    } else if (p.precioOferta) {
      ofertaVal = p.precioOferta;
    }
    if (ofertaVal) {
      html += `<div class="cat-precio-lista">${fmtPrecio(listaVal)}${unidadSuffix}</div><div class="cat-precio-oferta">${fmtPrecio(ofertaVal)}${unidadSuffix}</div>`;
    } else {
      html += `<div class="cat-precio-oferta">${fmtPrecio(listaVal)}${unidadSuffix}</div>`;
    }
  } else if (showPrices) {
    html += `<div class="cat-precio-pendiente">Próximamente a ingresar</div>`;
  }
  if (showPrices && p.niveles && p.niveles.length) {
    const fCantForNiveles = forma && typeof forma.cantidad === 'number' ? forma.cantidad : 1;
    const formaAttrNivel = forma ? forma.nombre.replace(/'/g, "\\'") : '';
    const botones = p.niveles.map(n => {
      const label = n.modo === 'consultar' ? `Desde ${n.desde}u: consultar oferta` : `Desde ${n.desde}u: -${n.descuento}%`;
      return `<button type="button" class="cat-nivel-btn" onclick="handleNivelClick(this,'${pnameEscaped}','${formaAttrNivel}',${n.desde},${fCantForNiveles})">🔥 ${label}</button>`;
    });
    html += `<div class="cat-niveles">${botones.join('')}</div>`;
  }
  if (p.notaVenta && showPrices) {
    html += `<div class="cat-nota">⚠️ ${p.notaVenta}</div>`;
  }
  if (forma && forma.cantidadVariable) {
    html += `<div class="cat-nota-variable">${NOTA_CANTIDAD_VARIABLE}</div>`;
  } else {
    const formaAttr = forma ? forma.nombre.replace(/'/g, "\\'") : '';
    const currentQty = getCartQty(p.name, forma ? forma.nombre : null);
    if (currentQty > 0) {
     let stepUnitLabel;
if(forma&&forma.nombre&&!formaEsTrivial(p,forma.nombre)){
  stepUnitLabel=forma.nombre.toLowerCase();
}else{
  stepUnitLabel=(p.unidadMedida||unidadSuffix.replace('/','')).toLowerCase();
}
      
      html += `<div class="cat-card-stepper"><button type="button" class="cat-step-btn" onclick="handleCardStepDec(this,'${pnameEscaped}','${formaAttr}')" aria-label="Restar unidad">−</button><span class="cat-step-value">${currentQty} ${stepUnitLabel}</span><button type="button" class="cat-step-btn" onclick="handleCardStepInc(this,'${pnameEscaped}','${formaAttr}')" aria-label="Sumar unidad">+</button></div>`;
    } else {
      let btnLabel;
      if (showPrices && !p.precio) {
        btnLabel = 'Consulte por pedido';
      } else if (forma && forma.nombre && !formaEsTrivial(p, forma.nombre)) {
        btnLabel = `Agregar ${forma.nombre}`;
      } else {
        btnLabel = 'Agregar';
      }
      html += `<button class="cat-card-btn" onclick="handleAddClick(this,'${pnameEscaped}','${formaAttr}')">${btnLabel}</button>`;
    }
  }
  return html;
}

// Cantidad actual en la consulta para un producto+forma puntual (0 si no está agregado).
function getCartQty(prodName, formaNombre) {
  const fNombre = formaNombre || null;
  const item = cart.find(i => i.name === prodName && (i.formaNombre || null) === fNombre);
  return item ? item.qty : 0;
}

// Vuelve a dibujar el bloque dinámico (precio/niveles/botón o stepper) de cada card
// visible en pantalla, respetando la forma que cada una tenga seleccionada. Se llama
// cada vez que cambia el carrito (agregar, sumar, restar, nivel, vaciar) para que las
// cards siempre reflejen el estado real de la consulta, sin importar desde dónde se
// haya originado el cambio (la propia card, el modal de consulta, o un botón de nivel).
function refreshCardButtons() {
  const showPrices = window.SHOW_PRICES === true;
  document.querySelectorAll('.cat-card').forEach(card => {
    const pname = card.dataset.pname;
    if (!pname) return;
    const p = findProductByName(pname);
    if (!p) return;
    const idx = parseInt(card.dataset.formaIdx, 10) || 0;
    const forma = (p.formas || [])[idx] || null;
    const unidadSuffix = card.dataset.unidadSuffix || '/kg';
    const dynEl = card.querySelector('.cat-card-dynamic');
    if (dynEl) {
      const pnameEscaped = pname.replace(/'/g, "\\'");
      dynEl.innerHTML = renderCardDynamic(p, forma, unidadSuffix, showPrices, pnameEscaped);
    }
  });
}

function onFormaSelect(evt, pname) {
  const btn = evt.currentTarget;
  const card = btn.closest('.cat-card');
  if (!card) return;
  const idx = parseInt(btn.dataset.idx, 10);
  card.querySelectorAll('.forma-pill').forEach(b => b.classList.toggle('active', b === btn));
  const p = findProductByName(pname);
  if (!p) return;
  const forma = (p.formas || [])[idx] || null;
  card.dataset.formaIdx = String(idx);
  const unidadSuffix = card.dataset.unidadSuffix || '/kg';
  const showPrices = window.SHOW_PRICES === true;
  const dynEl = card.querySelector('.cat-card-dynamic');
  if (dynEl) {
    const pnameEscaped = pname.replace(/'/g, "\\'");
    dynEl.innerHTML = renderCardDynamic(p, forma, unidadSuffix, showPrices, pnameEscaped);
  }
}

function renderCatalogo(brand) {
  const main = document.getElementById('catalogo-main');
  main.innerHTML = '';
  const showPrices = window.SHOW_PRICES === true;
  const hidden = window.HIDDEN_BRANDS || [];
  const marcas = brand === 'all' ? Object.keys(brandSections).filter(m => !hidden.includes(m)) : [brand];
  const term = normalizeText(searchTerm.trim());
  let totalRendered = 0;
  marcas.forEach(marca => {
    const secciones = brandSections[marca];
    secciones.forEach(sec => {
      const secIds = Array.isArray(sec.id) ? sec.id : [sec.id];
      let prods = secIds.flatMap(id => products[id] || []);
      if (term) prods = prods.filter(p => normalizeText(p.name).includes(term));
      if (!prods || prods.length === 0) return;
      totalRendered += prods.length;
      const secDiv = document.createElement('div');
      secDiv.className = 'cat-seccion cat-seccion--' + marca;
      secDiv.dataset.brand = marca;
      const header = document.createElement('div');
      header.className = 'cat-seccion-header';
      header.innerHTML = `<span class="cat-seccion-titulo">${sec.title}</span>`;
      secDiv.appendChild(header);
      const row = document.createElement('div');
      row.className = 'cat-row';
      prods.forEach(p => {
        const card = document.createElement('div');
        card.className = 'cat-card cat-card--' + marca;
        const pname = p.name.replace(/'/g, "\'");
        let imgHtml;
        if (p.img) {
          const imgBoxClass = 'cat-card-img' + (p.wide ? ' cat-card-img-wide' : '');
          const tagHtml = p.tagText ? `<div class="cat-tag" style="background:${p.tagColor || '#CF4520'}">${p.tagText}</div>` : '';
          imgHtml = `<div class="${imgBoxClass}">${p.descuento && showPrices ? `<div class="cat-badge">${p.descuento}</div>` : ''}${tagHtml}<img src="${baseUrl}${p.img}.${p.ext || 'jpg'}" alt="${p.name}" loading="lazy"></div>`;
        } else {
          imgHtml = `<div class="cat-card-img cat-card-img-empty"><span>Próx.</span></div>`;
        }
        let descHtml = p.desc ? `<div class="cat-desc">${p.desc}</div>` : '';
        let detalleHtml = '';
        if (p.peso || p.unidades) {
          const partes = [];
          if (p.peso) partes.push(p.peso);
          if (p.unidades) partes.push(p.unidades);
          detalleHtml = `<div class="cat-detalle">${partes.join(' · ')}</div>`;
        }
        const unidadSuffix = secIds.some(id => ['atm', 'feteados', 'congelados', 'envasados'].includes(id)) ? '/u' : '/kg';
        const defaultFormaIdx = 0;
        const formaSel = p.formas && p.formas.length ? p.formas[defaultFormaIdx] : null;
        const selectorHtml = renderFormaSelector(p, defaultFormaIdx, pname);
        const dynamicHtml = renderCardDynamic(p, formaSel, unidadSuffix, showPrices, pname);
        card.dataset.formaIdx = String(defaultFormaIdx);
        card.dataset.unidadSuffix = unidadSuffix;
        card.dataset.pname = p.name;
        card.innerHTML = `${imgHtml}<div class="cat-card-info"><div class="cat-card-marca">${brandNames[marca]}</div><div class="cat-card-name">${p.name}</div>${descHtml}${detalleHtml}${selectorHtml}<div class="cat-card-dynamic">${dynamicHtml}</div></div>`;
        row.appendChild(card);
      });
      secDiv.appendChild(row);
      main.appendChild(secDiv);
    });
  });
  if (term && totalRendered === 0) {
    main.innerHTML = `<div class="cat-sin-resultados">No encontramos productos que coincidan con "<strong>${searchTerm}</strong>".<br>Probá con otra palabra o borrá la búsqueda.</div>`;
  }
  buildQuickNav();
  initScrollReveal();
}

function buildQuickNav() {
  const nav = document.getElementById('quickNav');
  const wrap = document.getElementById('quickNavWrap');
  if (!nav) return;
  const headers = [...document.querySelectorAll('.cat-seccion-titulo')];
  if (headers.length <= 1) {
    nav.innerHTML = '';
    nav.classList.remove('show');
    if (wrap) wrap.classList.remove('show');
    return;
  }
  nav.classList.add('show');
  if (wrap) wrap.classList.add('show');
  nav.innerHTML = headers.map((h, i) => {
    const id = 'sec-' + i;
    h.closest('.cat-seccion').id = id;
    return `<button class="quicknav-pill" onclick="scrollToSection('${id}')">${h.textContent}</button>`;
  }).join('');
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 150;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

// Flechas de desplazamiento del quicknav — solo existen/se ven en desktop
// (@media hover:hover + pointer:fine en el CSS); en touch el scroll queda
// 100% al swipe nativo del navegador, sin ningún botón visible.
function scrollQuickNav(dir) {
  const nav = document.getElementById('quickNav');
  if (!nav) return;
  nav.scrollBy({ left: dir * 220, behavior: 'smooth' });
}

let revealPending = [];
let revealListenerAttached = false;
function checkRevealPending() {
  if (!revealPending.length) return;
  const vh = window.innerHeight || document.documentElement.clientHeight;
  revealPending = revealPending.filter(c => {
    if (!c.isConnected) return false;
    const r = c.getBoundingClientRect();
    if (r.top < vh + 150 && r.bottom > -150) {
      c.classList.add('reveal-visible');
      return false;
    }
    return true;
  });
}
function initScrollReveal() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = [...document.querySelectorAll('.cat-card:not(.reveal-init)')];
  if (!cards.length) return;
  cards.forEach(c => c.classList.add('reveal', 'reveal-init'));
  revealPending.push(...cards);
  checkRevealPending();
  if (!revealListenerAttached) {
    revealListenerAttached = true;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { checkRevealPending(); ticking = false; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }
}

function onSearchInput(value) {
  searchTerm = value;
  const compactBox = document.getElementById('searchBoxCompact');
  if (compactBox && compactBox.value !== value) compactBox.value = value;
  renderCatalogo(currentBrand);
}

// El buscador de la franja compacta es un input propio (no el mismo
// reubicado) para no tener que reparentarlo — se mantiene sincronizado
// a mano en las dos direcciones con onSearchInput de arriba.
function onSearchInputCompact(value) {
  searchTerm = value;
  const mainBox = document.getElementById('searchBox');
  if (mainBox && mainBox.value !== value) mainBox.value = value;
  renderCatalogo(currentBrand);
}

function setActiveChip(brand) {
  document.querySelectorAll('.marca-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.brand === brand);
  });
}

function filterBrandFromChip(brand) {
  currentBrand = brand;
  setActiveChip(brand);
  renderCatalogo(brand);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function findProductByName(name) {
  for (const key in products) {
    const found = products[key].find(p => p.name === name);
    if (found) return found;
  }
  return null;
}
function findMarcaByName(name) {
  for (const marca in brandSections) {
    const secciones = brandSections[marca];
    for (const sec of secciones) {
      const secIds = Array.isArray(sec.id) ? sec.id : [sec.id];
      if (secIds.some(id => products[id] && products[id].some(p => p.name === name))) return marca;
    }
  }
  return null;
}

const LAST_ORDER_KEY = 'charni_last_order';

function saveLastOrder() {
  try {
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify({ items: cart, date: new Date().toISOString() }));
  } catch (e) { }
}

function loadLastOrder() {
  try {
    const raw = localStorage.getItem(LAST_ORDER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function formatFechaCorta(iso) {
  const d = new Date(iso);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}
function formatWA(phone) {
  if (!phone || phone.length < 6) return phone;
  return `+${phone.slice(0, 2)} ${phone.slice(2, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;
}

function checkLastOrderBanner() {
  const banner = document.getElementById('lastOrderBanner');
  if (!banner) return;
  const last = loadLastOrder();
  if (last && last.items && last.items.length > 0 && cart.length === 0) {
    document.getElementById('lastOrderInfo').textContent = `${formatFechaCorta(last.date)} · ${last.items.length} producto${last.items.length === 1 ? '' : 's'}`;
    banner.style.display = 'flex';
  } else {
    banner.style.display = 'none';
  }
}

function repetirUltimaConsulta() {
  const last = loadLastOrder();
  if (!last || !last.items || last.items.length === 0) return;
  cart = JSON.parse(JSON.stringify(last.items));
  updateCart();
  checkLastOrderBanner();
  openCart();
}

function handleAddClick(btn, prod, formaNombre) {
  const p = findProductByName(prod);
  let formaCantidad = 1;
  const fNombre = formaNombre || null;
  if (fNombre && p && p.formas) {
    const f = p.formas.find(x => x.nombre === fNombre);
    if (f && typeof f.cantidad === 'number') formaCantidad = f.cantidad;
  }
  addToCart(prod, fNombre, formaCantidad);
  bumpCartBadge();
}

// Stepper +/− directo en la card (reemplaza al botón "+ Agregar" una vez que el
// producto+forma ya está en la consulta, igual que en apps de delivery tipo PedidosYa).
function handleCardStepInc(btn, prod, formaNombre) {
  const p = findProductByName(prod);
  let formaCantidad = 1;
  const fNombre = formaNombre || null;
  if (fNombre && p && p.formas) {
    const f = p.formas.find(x => x.nombre === fNombre);
    if (f && typeof f.cantidad === 'number') formaCantidad = f.cantidad;
  }
  addToCart(prod, fNombre, formaCantidad);
  bumpCartBadge();
}
function handleCardStepDec(btn, prod, formaNombre) {
  const fNombre = formaNombre || null;
  const idx = cart.findIndex(i => i.name === prod && (i.formaNombre || null) === fNombre);
  if (idx === -1) return;
  cart[idx].qty--;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCart();
}

// Botón de "nivel" (compra por volumen, ej. "Desde 6u: -5%"): al tocarlo, lleva
// la cantidad de ese producto+forma en la consulta HASTA el umbral del nivel.
// Si ya tenía menos, la sube al umbral. Si ya tenía más (o igual), no la baja ni la resetea.
function handleNivelClick(btn, prod, formaNombre, desde, formaCantidad) {
  const fNombre = formaNombre || null;
  const fCantidad = formaCantidad || 1;
  const targetQty = Math.max(1, Math.ceil(desde / fCantidad));
  const existing = cart.find(i => i.name === prod && (i.formaNombre || null) === fNombre);
  if (existing) {
    if (existing.qty < targetQty) existing.qty = targetQty;
  } else {
    cart.push({ name: prod, formaNombre: fNombre, formaCantidad: fCantidad, qty: targetQty });
  }
  updateCart();
  bumpCartBadge();
  btn.classList.add('applied');
  setTimeout(() => { btn.classList.remove('applied') }, 900);
}

function bumpCartBadge() {
  const badge = document.getElementById('cartCount');
  if (!badge) return;
  badge.classList.remove('bump');
  void badge.offsetWidth;
  badge.classList.add('bump');
}

// Una forma se considera "trivial" cuando no aporta información nueva al pedido:
// es la única opción del producto, no tiene descuento propio, no es un pack (cantidad 1)
// y no es de cantidad variable. En ese caso no se muestra "— Nombre de forma" en la
// consulta ni en el mensaje de WhatsApp, para no ensuciar los productos que solo
// tienen "Por unidad" cargado. Si hay más de una forma (selector real) o la forma
// es un pack/tiene descuento propio, siempre se muestra.
function formaEsTrivial(p, formaNombre) {
  if (!formaNombre) return true;
  if (!p || !p.formas) return true;
  if (p.formas.length > 1) return false;
  const f = p.formas.find(x => x.nombre === formaNombre);
  if (!f) return true;
  return f.cantidad === 1 && f.descuento == null && !f.cantidadVariable;
}

function addToCart(prod, formaNombre, formaCantidad) {
  const fNombre = formaNombre || null;
  const fCantidad = formaCantidad || 1;
  const existing = cart.find(i => i.name === prod && (i.formaNombre || null) === fNombre);
  if (existing) { existing.qty++ } else { cart.push({ name: prod, formaNombre: fNombre, formaCantidad: fCantidad, qty: 1 }) }
  updateCart();
}
function saveCart() {
  try { localStorage.setItem('charni_cart', JSON.stringify(cart)); } catch (e) { }
}
function updateCart() {
  saveCart();
  renderCart();
  refreshCardButtons();
  const floatBtn = document.querySelector('.whatsapp-float');
  const footerBar = document.getElementById('cartFooterBar');
  if (cart.length === 0) {
    if (floatBtn) floatBtn.style.display = 'flex';
    if (footerBar) footerBar.style.display = 'none';
    document.body.classList.remove('has-cart-footer');
  } else {
    if (floatBtn) floatBtn.style.display = 'none';
    if (footerBar) {
      footerBar.style.display = 'flex';
      document.getElementById('cartFooterCount').textContent = cart.length;
      const pluralEl = document.getElementById('cartFooterPlural');
      if (pluralEl) pluralEl.textContent = cart.length === 1 ? '' : 's';
    }
    document.body.classList.add('has-cart-footer');
  }
  checkLastOrderBanner();
}
function renderCart() {
  const container = document.getElementById('cartItems');
  const actions = document.getElementById('cartActions');
  const subtotalEl = document.getElementById('cartSubtotal');
  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">Tu consulta está vacía<br>Agregá productos para consultar precio y disponibilidad</div>';
    actions.style.display = 'none';
    if (subtotalEl) subtotalEl.innerHTML = '';
    return;
  }
  const visibleCart = cart.slice(0, cartVisibleCount);
  container.innerHTML = visibleCart.map((item, idx) => {
    const forma = item.formaNombre || null;
    const fCantidad = item.formaCantidad || 1;
    const p = findProductByName(item.name);
    const trivial = formaEsTrivial(p, forma);
    const marca = findMarcaByName(item.name);
    const marcaHtml = marca ? `<div class="cart-item-marca">${brandNames[marca]}</div>` : '';
    const nameLine = (forma && !trivial) ? `${item.name} <span class="cart-item-forma">— ${forma}</span>` : item.name;
    const qtyLabel = (forma && !trivial && fCantidad > 1) ? `${item.qty} x ${forma} (${item.qty * fCantidad}u)` : `${item.qty}`;
    return `<div class="cart-item"><div class="cart-item-info">${marcaHtml}<div class="cart-item-name">${nameLine}</div><div class="cart-item-qty-controls"><button class="qty-btn" onclick="decQty(${idx})" aria-label="Restar unidad">−</button><span class="qty-value">${qtyLabel}</span><button class="qty-btn" onclick="incQty(${idx})" aria-label="Sumar unidad">+</button></div></div><button class="cart-item-remove" onclick="removeFromCart(${idx})">✕</button></div>`;
  }).join('');
  if (cart.length > cartVisibleCount) {
    const restantes = cart.length - cartVisibleCount;
    container.innerHTML += `<button class="cart-load-more" onclick="loadMoreCartItems()">Cargar ${Math.min(5, restantes)} más (quedan ${restantes})</button>`;
  }
  actions.style.display = 'flex';
  if (subtotalEl) {
    if (window.SHOW_PRICES === true) {
      let subtotal = 0, hasUnknown = false;
      cart.forEach(item => {
        const p = findProductByName(item.name);
        let price = null;
        if (p && p.precio) {
          const forma = item.formaNombre ? (p.formas || []).find(f => f.nombre === item.formaNombre) : null;
          if (forma && typeof forma.descuento === 'number') {
            price = Math.round(p.precio * (1 - forma.descuento / 100));
          } else {
            price = p.precioOferta || p.precio;
          }
        }
        const totalUnidades = item.qty * (item.formaCantidad || 1);
        if (price) { subtotal += price * totalUnidades } else { hasUnknown = true }
      });
      if (subtotal > 0) {
        const fmt = n => `$${Math.round(n).toLocaleString('es-AR')}`;
        subtotalEl.innerHTML = `<div class="cart-subtotal">Estimado: ${fmt(subtotal)}${hasUnknown ? ' + productos a confirmar' : ''}<span class="cart-subtotal-note">a confirmar con tu vendedor</span></div>`;
      } else {
        subtotalEl.innerHTML = `<div class="cart-subtotal">Precio a confirmar con tu vendedor</div>`;
      }
    } else {
      subtotalEl.innerHTML = '';
    }
  }
}
function loadMoreCartItems() {
  cartVisibleCount += 5;
  renderCart();
}
function incQty(idx) { cart[idx].qty++; updateCart() }
function decQty(idx) { cart[idx].qty--; if (cart[idx].qty <= 0) { cart.splice(idx, 1) } updateCart() }
function removeFromCart(idx) { cart.splice(idx, 1); updateCart() }
function clearCart() {
  const sub = document.getElementById('confirmVaciarSub');
  if (sub) sub.textContent = `Se van a borrar los ${cart.length} producto${cart.length === 1 ? '' : 's'} que agregaste.`;
  document.getElementById('confirmVaciarModal').classList.add('show');
}
function closeConfirmVaciar() {
  document.getElementById('confirmVaciarModal').classList.remove('show');
}
function confirmVaciar() {
  cart = [];
  updateCart();
  closeConfirmVaciar();
}
function sendWhatsApp() {
  if (cart.length === 0) return;
  const ordenMarcas = Object.keys(brandSections);
  const grupos = {};
  ordenMarcas.forEach(m => grupos[m] = []);
  const otros = [];
  cart.forEach(i => {
    const marca = findMarcaByName(i.name);
    if (marca && grupos[marca]) grupos[marca].push(i);
    else otros.push(i);
  });
  let msg = 'Hola! Quiero consultar por estos productos:\n\n';
  let n = 0;
  const agregarLinea = (i) => {
    n++;
    const forma = i.formaNombre || null;
    const p = findProductByName(i.name);
    const trivial = formaEsTrivial(p, forma);
    if (forma && !trivial) {
      const fCantidad = i.formaCantidad || 1;
      const unidadMedida = (p && p.unidadMedida) || 'unidades';
      if (fCantidad > 1) {
        msg += `${n}. ${i.name} — ${forma} x${fCantidad}u — ${i.qty} x ${forma} (${i.qty * fCantidad} ${unidadMedida})\n`;
      } else {
        msg += `${n}. ${i.name} — ${forma} x ${i.qty}\n`;
      }
    } else {
      msg += `${n}. ${i.name} x ${i.qty}\n`;
    }
  };
  ordenMarcas.forEach(marca => {
    if (grupos[marca].length === 0) return;
    msg += `*${brandNames[marca]}*\n`;
    grupos[marca].forEach(agregarLinea);
    msg += '\n';
  });
  if (otros.length) {
    msg += `*Otros*\n`;
    otros.forEach(agregarLinea);
    msg += '\n';
  }
  msg += '¿Me confirmás precio y disponibilidad?';
  saveLastOrder();
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
}
function openCart() {
  cartVisibleCount = 5;
  renderCart();
  document.getElementById('cartModal').classList.add('show');
}
function closeCart() { document.getElementById('cartModal').classList.remove('show') }

// ── Header contextual / compacto al scrollear (v2) ──────────────────
// Cuando ".marcas-aliadas" sale de pantalla, la franja compacta del
// header (que ya es sticky) se hace visible y el botón Consultas se
// reduce a ícono+badge. A diferencia de la v1, acá NO se reparenta el
// buscador ni las marcas: la franja compacta tiene su propio buscador
// (#searchBoxCompact) y sus propios chips (#marcasRowCompact), siempre
// presentes en el DOM — solo cambia su opacidad/posición como conjunto.
// Lo único que se muda es #quickNavWrap (los pills de categoría), porque
// ese sí tiene que ser el mismo elemento en los dos lugares. Un solo
// IntersectionObserver decide el estado; buildQuickNav() y su clase
// ".show" siguen mandando sobre si los pills se muestran o no.
let headerCompacto = false;
function moveIntoCompactHeader() {
  const row = document.getElementById('headerCompactRow');
  const quickNavWrap = document.getElementById('quickNavWrap');
  if (row && quickNavWrap) row.appendChild(quickNavWrap);
}
function restoreFromCompactHeader() {
  const mainEl = document.getElementById('catalogo-main');
  const quickNavWrap = document.getElementById('quickNavWrap');
  if (quickNavWrap && mainEl && mainEl.parentNode) mainEl.parentNode.insertBefore(quickNavWrap, mainEl);
}
function enterHeaderCompacto() {
  if (headerCompacto) return;
  headerCompacto = true;
  moveIntoCompactHeader();
  const header = document.querySelector('.header');
  if (header) header.classList.add('header-compacto');
}
function exitHeaderCompacto() {
  if (!headerCompacto) return;
  headerCompacto = false;
  restoreFromCompactHeader();
  const header = document.querySelector('.header');
  if (header) header.classList.remove('header-compacto');
}
function initHeaderCompactObserver() {
  const marcasAliadas = document.querySelector('.marcas-aliadas');
  if (!marcasAliadas || !('IntersectionObserver' in window)) return;
  let primeraObservacion = true;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (primeraObservacion && window.scrollY === 0) {
        // carga inicial arriba de todo: nunca arrancar en modo compacto
      } else if (entry.isIntersecting) {
        exitHeaderCompacto();
      } else {
        enterHeaderCompacto();
      }
    });
    primeraObservacion = false;
  }, { threshold: 0 });
  obs.observe(marcasAliadas);
}

const footerWaLink = document.getElementById('footerWaLink');
const footerWaText = document.getElementById('footerWaText');
if (footerWaLink && footerWaText) {
  footerWaLink.href = `https://wa.me/${WA}`;
  footerWaText.textContent = formatWA(WA);
}

renderCatalogo('all');
updateHero('all');
setActiveChip('all');
updateCart();
initHeaderCompactObserver();
