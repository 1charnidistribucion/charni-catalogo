const WA=window.WA_PHONE||'5492213188614';
let cart=[];
try{
  const savedCart=localStorage.getItem('charni_cart');
  if(savedCart)cart=JSON.parse(savedCart);
}catch(e){}
const heroMedia={
  all:'img/heroes/hero_general.webp.webp',
  donatilio:'img/heroes/1HlQaS3OYSmdBeUMas_96dCEJzDbgY1x4.jpg',
  cagnoli:['img/heroes/1qBb1EtllIm_31Ieb3kxwa2HuIHsrTIPC.jpg','img/heroes/1pHMXQBFqnC-jaQFIgkkDlvvbUVOx_hsH.jpg','img/heroes/1OrN33PqJ7FALNkNf6Q5dEm8ffaLEgzVQ.jpg','img/heroes/1-48MhyKnYstoXG8zitW1PN9hKncSx1uG.jpg'],
  lasdinas:['img/heroes/1RYjiNC9ZPYuGAjL14MQzXC4dryj4-P1P.jpg','img/heroes/1NbdE92x51--hfyCR3_b8ItHCsBxXDQ38.jpg'],
  vidal:'img/heroes/1w0EDmpP3n-pWQCimwTothoY1RTMmqQx9.jpg'
};
let currentBrand='all';
let searchTerm='';
let cagnoliImgIndex=0;
let dinasImgIndex=0;
let imgInterval=null;

const brandSections={
  donatilio:[
    {id:'duros',title:'Quesos Duros'},
    {id:'semiduros',title:'Quesos Semiduros'},
    {id:'blandos',title:'Quesos Blandos'}
  ],
  cagnoli:[
    {id:'salamines',title:'Salamines'},
    {id:'bastones',title:'Bastones (800g)'},
    {id:'bastones-cond',title:'Bastones Condimentados'},
    {id:'atm',title:'Línea Envasados ATM'},
    {id:'jamones',title:'Jamones y Cocidos'},
    {id:'alta-mad',title:'Alta Maduración'},
    {id:['feteados','envasados'],title:'Feteados y Envasados'},
    {id:'congelados',title:'Congelados y Para Cocción ❄️'}
  ],
  lasdinas:[
    {id:'ld-crudas',title:'Piezas Crudas'},
    {id:'ld-cocidas',title:'Piezas Cocidas'},
    {id:'ld-especiales',title:'Embutidos Especiales'},
    {id:'ld-frio',title:'Ahumados en Frío'},
    {id:'ld-caliente',title:'Ahumados en Caliente'}
  ],
  vidal:[
    {id:'vidal-lacteos',title:'Productos Lácteos'}
  ]
};

const brandNames={donatilio:'Don Atilio',cagnoli:'Cagnoli',lasdinas:'Las Dinas',vidal:'Lácteos Vidal'};
function normalizeText(s){
  return (s||'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
}
const baseUrl='https://1charnidistribucion.github.io/charni-catalogo/img/productos/';

function updateHero(brand){
  const heroBg=document.getElementById('heroBg');
  currentBrand=brand;
  if(imgInterval){clearInterval(imgInterval);imgInterval=null}
  if(brand==='cagnoli'&&heroMedia.cagnoli.length>0){playNextCagnoliImg();imgInterval=setInterval(playNextCagnoliImg,5000)}
  else if(brand==='lasdinas'&&heroMedia.lasdinas.length>0){playNextDinasImg();imgInterval=setInterval(playNextDinasImg,5000)}
  else if(brand==='donatilio'){heroBg.style.backgroundImage=`url('${heroMedia.donatilio}')`;heroBg.style.opacity='1'}
  else if(brand==='vidal'){heroBg.style.backgroundImage=`url('${heroMedia.vidal}')`;heroBg.style.opacity='1'}
  else{heroBg.style.backgroundImage="url('img/heroes/hero_general.webp.webp')";heroBg.style.opacity='1'}
}

function playNextCagnoliImg(){
  const heroBg=document.getElementById('heroBg');
  heroBg.classList.add('fade-out');
  setTimeout(()=>{heroBg.style.backgroundImage=`url('${heroMedia.cagnoli[cagnoliImgIndex]}')`;heroBg.style.opacity='1';heroBg.classList.remove('fade-out');cagnoliImgIndex=(cagnoliImgIndex+1)%heroMedia.cagnoli.length},500)
}

function playNextDinasImg(){
  const heroBg=document.getElementById('heroBg');
  heroBg.classList.add('fade-out');
  setTimeout(()=>{if(currentBrand!=='lasdinas')return;heroBg.style.backgroundImage=`url('${heroMedia.lasdinas[dinasImgIndex]}')`;heroBg.style.opacity='1';heroBg.classList.remove('fade-out');dinasImgIndex=(dinasImgIndex+1)%heroMedia.lasdinas.length},500)
}

function renderCatalogo(brand){
  const main=document.getElementById('catalogo-main');
  main.innerHTML='';
  const showPrices=window.SHOW_PRICES===true;
  const hidden=window.HIDDEN_BRANDS||[];
  const marcas=brand==='all'?Object.keys(brandSections).filter(m=>!hidden.includes(m)):[brand];
  const term=normalizeText(searchTerm.trim());
  let totalRendered=0;
  marcas.forEach(marca=>{
    const secciones=brandSections[marca];
    secciones.forEach(sec=>{
      const secIds=Array.isArray(sec.id)?sec.id:[sec.id];
      let prods=secIds.flatMap(id=>products[id]||[]);
      if(term)prods=prods.filter(p=>normalizeText(p.name).includes(term));
      if(!prods||prods.length===0)return;
      totalRendered+=prods.length;
      const secDiv=document.createElement('div');
      secDiv.className='cat-seccion cat-seccion--'+marca;
      secDiv.dataset.brand=marca;
      const header=document.createElement('div');
      header.className='cat-seccion-header';
      header.innerHTML=`<span class="cat-seccion-titulo">${sec.title}</span><span class="cat-seccion-marca">${brandNames[marca]}</span>`;
      secDiv.appendChild(header);
      const row=document.createElement('div');
      row.className='cat-row';
      prods.forEach(p=>{
        const card=document.createElement('div');
        card.className='cat-card cat-card--'+marca;
        const pname=p.name.replace(/'/g,"\'");
        let imgHtml;
        if(p.img){
          const imgBoxClass='cat-card-img'+(p.wide?' cat-card-img-wide':'');
          const tagHtml=p.tagText?`<div class="cat-tag" style="background:${p.tagColor||'#8b1538'}">${p.tagText}</div>`:'';
          imgHtml=`<div class="${imgBoxClass}">${p.descuento&&showPrices?`<div class="cat-badge">${p.descuento}</div>`:''}${tagHtml}<img src="${baseUrl}${p.img}.${p.ext||'jpg'}" alt="${p.name}" loading="lazy"></div>`;
        }else{
          imgHtml=`<div class="cat-card-img cat-card-img-empty"><span>Próx.</span></div>`;
        }
        let precioHtml='';
        if(showPrices&&p.precio){
          const unidad=secIds.some(id=>['atm','feteados','congelados','envasados'].includes(id))?'/u':'/kg';
          const fmt=n=>`$${Math.round(n).toLocaleString('es-AR')}`;
          if(p.precioOferta){
            precioHtml=`<div class="cat-precio-lista">${fmt(p.precio)}${unidad}</div><div class="cat-precio-oferta">${fmt(p.precioOferta)}${unidad}</div>`;
          }else{
            precioHtml=`<div class="cat-precio-oferta">${fmt(p.precio)}${unidad}</div>`;
          }
        }else if(showPrices){
          precioHtml=`<div class="cat-precio-pendiente">Próximamente a ingresar</div>`;
        }
        let descHtml=p.desc?`<div class="cat-desc">${p.desc}</div>`:'';
        let detalleHtml='';
        if(p.peso||p.unidades){
          const partes=[];
          if(p.peso)partes.push(p.peso);
          if(p.unidades)partes.push(p.unidades);
          detalleHtml=`<div class="cat-detalle">${partes.join(' · ')}</div>`;
        }
        let notaHtml=p.notaVenta&&showPrices?`<div class="cat-nota">⚠️ ${p.notaVenta}</div>`:'';
        const btnLabel=(showPrices&&!p.precio)?'Consulte por pedido':'+ Agregar';
        card.innerHTML=`${imgHtml}<div class="cat-card-info"><div class="cat-card-name">${p.name}</div>${descHtml}${detalleHtml}${precioHtml}${notaHtml}<button class="cat-card-btn" onclick="handleAddClick(this,'${pname}')">${btnLabel}</button></div>`;
        row.appendChild(card);
      });
      secDiv.appendChild(row);
      main.appendChild(secDiv);
    });
  });
  if(term&&totalRendered===0){
    main.innerHTML=`<div class="cat-sin-resultados">No encontramos productos que coincidan con "<strong>${searchTerm}</strong>".<br>Probá con otra palabra o borrá la búsqueda.</div>`;
  }
  buildQuickNav();
  initScrollReveal();
}

function buildQuickNav(){
  const nav=document.getElementById('quickNav');
  if(!nav)return;
  const headers=[...document.querySelectorAll('.cat-seccion-titulo')];
  if(headers.length<=1){nav.innerHTML='';nav.classList.remove('show');return;}
  nav.classList.add('show');
  nav.innerHTML=headers.map((h,i)=>{
    const id='sec-'+i;
    h.closest('.cat-seccion').id=id;
    return `<button class="quicknav-pill" onclick="scrollToSection('${id}')">${h.textContent}</button>`;
  }).join('');
}

function scrollToSection(id){
  const el=document.getElementById(id);
  if(!el)return;
  const y=el.getBoundingClientRect().top+window.scrollY-150;
  window.scrollTo({top:y,behavior:'smooth'});
}

let revealPending=[];
let revealListenerAttached=false;
function checkRevealPending(){
  if(!revealPending.length)return;
  const vh=window.innerHeight||document.documentElement.clientHeight;
  revealPending=revealPending.filter(c=>{
    if(!c.isConnected)return false;
    const r=c.getBoundingClientRect();
    if(r.top<vh+150&&r.bottom>-150){
      c.classList.add('reveal-visible');
      return false;
    }
    return true;
  });
}
function initScrollReveal(){
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const cards=[...document.querySelectorAll('.cat-card:not(.reveal-init)')];
  if(!cards.length)return;
  cards.forEach(c=>c.classList.add('reveal','reveal-init'));
  revealPending.push(...cards);
  checkRevealPending();
  if(!revealListenerAttached){
    revealListenerAttached=true;
    let ticking=false;
    const onScroll=()=>{
      if(ticking)return;
      ticking=true;
      requestAnimationFrame(()=>{checkRevealPending();ticking=false;});
    };
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
  }
}

function onSearchInput(value){
  searchTerm=value;
  renderCatalogo(currentBrand);
}

function filterBrand(brand,btn){
  currentBrand=brand;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderCatalogo(brand);
  updateHero(brand);
  window.scrollTo({top:0,behavior:'smooth'});
}

function filterBrandFromChip(brand){
  const btn=document.querySelector('.filter-btn[data-brand="'+brand+'"]');
  if(btn){filterBrand(brand,btn)}else{currentBrand=brand;renderCatalogo(brand);updateHero(brand)}
  const target=document.querySelector('.filters-wrapper');
  if(target)target.scrollIntoView({behavior:'smooth',block:'start'});
}

function findProductByName(name){
  for(const key in products){
    const found=products[key].find(p=>p.name===name);
    if(found)return found;
  }
  return null;
}

function handleAddClick(btn,prod){
  addToCart(prod);
  const original=btn.textContent;
  btn.textContent='✓ Agregado';
  btn.classList.add('added');
  btn.disabled=true;
  setTimeout(()=>{btn.textContent=original;btn.classList.remove('added');btn.disabled=false},900);
  bumpCartBadge();
}

function bumpCartBadge(){
  const badge=document.getElementById('cartCount');
  if(!badge)return;
  badge.classList.remove('bump');
  void badge.offsetWidth;
  badge.classList.add('bump');
}

function addToCart(prod){
  const existing=cart.find(i=>i.name===prod);
  if(existing){existing.qty++}else{cart.push({name:prod,qty:1})}
  updateCart();
}
function saveCart(){
  try{localStorage.setItem('charni_cart',JSON.stringify(cart));}catch(e){}
}
function updateCart(){
  saveCart();
  document.getElementById('cartCount').textContent=cart.reduce((sum,i)=>sum+i.qty,0);
  renderCart();
}
function renderCart(){
  const container=document.getElementById('cartItems');
  const actions=document.getElementById('cartActions');
  const subtotalEl=document.getElementById('cartSubtotal');
  if(cart.length===0){
    container.innerHTML='<div class="cart-empty">Tu consulta está vacía<br>Agregá productos para consultar precio y disponibilidad</div>';
    actions.style.display='none';
    if(subtotalEl)subtotalEl.innerHTML='';
    return;
  }
  container.innerHTML=cart.map((item,idx)=>`<div class="cart-item"><div class="cart-item-info"><div class="cart-item-name">${item.name}</div><div class="cart-item-qty-controls"><button class="qty-btn" onclick="decQty(${idx})" aria-label="Restar unidad">−</button><span class="qty-value">${item.qty}</span><button class="qty-btn" onclick="incQty(${idx})" aria-label="Sumar unidad">+</button></div></div><button class="cart-item-remove" onclick="removeFromCart(${idx})">✕</button></div>`).join('');
  actions.style.display='flex';
  if(subtotalEl){
    if(window.SHOW_PRICES===true){
      let subtotal=0,hasUnknown=false;
      cart.forEach(item=>{
        const p=findProductByName(item.name);
        const price=p?(p.precioOferta||p.precio):null;
        if(price){subtotal+=price*item.qty}else{hasUnknown=true}
      });
      if(subtotal>0){
        const fmt=n=>`$${Math.round(n).toLocaleString('es-AR')}`;
        subtotalEl.innerHTML=`<div class="cart-subtotal">Estimado: ${fmt(subtotal)}${hasUnknown?' + productos a confirmar':''}<span class="cart-subtotal-note">a confirmar con tu vendedor</span></div>`;
      }else{
        subtotalEl.innerHTML=`<div class="cart-subtotal">Precio a confirmar con tu vendedor</div>`;
      }
    }else{
      subtotalEl.innerHTML='';
    }
  }
}
function incQty(idx){cart[idx].qty++;updateCart()}
function decQty(idx){cart[idx].qty--;if(cart[idx].qty<=0){cart.splice(idx,1)}updateCart()}
function removeFromCart(idx){cart.splice(idx,1);updateCart()}
function clearCart(){if(confirm('¿Vaciar la consulta?')){cart=[];updateCart()}}
function sendWhatsApp(){
  if(cart.length===0)return;
  let msg='Hola! Quiero consultar por estos productos:\n\n';
  cart.forEach(i=>msg+=`• ${i.name} x ${i.qty}\n`);
  msg+='\n¿Me confirmás precio y disponibilidad?';
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank');
}
function openCart(){document.getElementById('cartModal').classList.add('show')}
function closeCart(){document.getElementById('cartModal').classList.remove('show')}

renderCatalogo('cagnoli');
updateHero('cagnoli');
updateCart();
