const WA=window.WA_PHONE||'5492213188614';
let cart=[];
const heroMedia={
  all:'img/heroes/hero_general.webp.webp',
  donatilio:'img/heroes/1HlQaS3OYSmdBeUMas_96dCEJzDbgY1x4.jpg',
  cagnoli:['img/heroes/1qBb1EtllIm_31Ieb3kxwa2HuIHsrTIPC.jpg','img/heroes/1pHMXQBFqnC-jaQFIgkkDlvvbUVOx_hsH.jpg','img/heroes/1OrN33PqJ7FALNkNf6Q5dEm8ffaLEgzVQ.jpg','img/heroes/1-48MhyKnYstoXG8zitW1PN9hKncSx1uG.jpg'],
  lasdinas:['img/heroes/1RYjiNC9ZPYuGAjL14MQzXC4dryj4-P1P.jpg','img/heroes/1NbdE92x51--hfyCR3_b8ItHCsBxXDQ38.jpg'],
  vidal:'img/heroes/1w0EDmpP3n-pWQCimwTothoY1RTMmqQx9.jpg'
};
let currentBrand='all';
let currentCatId=null;
let cagnoliImgIndex=0;
let dinasImgIndex=0;
let imgInterval=null;

const brandNames={donatilio:'Don Atilio',cagnoli:'Cagnoli',lasdinas:'Las Dinas',vidal:'Lácteos Vidal'};
const brandCategories={
  donatilio:[
    {id:'duros',title:'Quesos Duros'},
    {id:'semiduros',title:'Quesos Semiduros'},
    {id:'blandos',title:'Quesos Blandos'}
  ],
  cagnoli:[
    {id:'salamines',title:'Salamines'},
    {id:'bastones',title:'Bastones (800g)'},
    {id:'bastones-cond',title:'Bastones Condimentados (800g)'},
    {id:'atm',title:'Línea Envasados ATM'},
    {id:'jamones',title:'Jamones y Cocidos'},
    {id:'alta-mad',title:'Alta Maduración'}
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

function updateHero(brand){const heroBg=document.getElementById('heroBg');currentBrand=brand;if(imgInterval){clearInterval(imgInterval);imgInterval=null}if(brand==='cagnoli'&&heroMedia.cagnoli.length>0){playNextCagnoliImg();imgInterval=setInterval(playNextCagnoliImg,5000)}else if(brand==='lasdinas'&&heroMedia.lasdinas.length>0){playNextDinasImg();imgInterval=setInterval(playNextDinasImg,5000)}else if(brand==='donatilio'){heroBg.style.backgroundImage=`url('${heroMedia.donatilio}')`;heroBg.style.opacity='1'}else if(brand==='vidal'){heroBg.style.backgroundImage=`url('${heroMedia.vidal}')`;heroBg.style.opacity='1'}else{heroBg.style.backgroundImage="url('img/heroes/hero_general.webp.webp')";heroBg.style.opacity='1'}}
function playNextCagnoliImg(){const heroBg=document.getElementById('heroBg');heroBg.classList.add('fade-out');setTimeout(()=>{heroBg.style.backgroundImage=`url('${heroMedia.cagnoli[cagnoliImgIndex]}')`;heroBg.style.opacity='1';heroBg.classList.remove('fade-out');cagnoliImgIndex=(cagnoliImgIndex+1)%heroMedia.cagnoli.length},500)}
function playNextDinasImg(){const heroBg=document.getElementById('heroBg');heroBg.classList.add('fade-out');setTimeout(()=>{if(currentBrand!=='lasdinas')return;heroBg.style.backgroundImage=`url('${heroMedia.lasdinas[dinasImgIndex]}')`;heroBg.style.opacity='1';heroBg.classList.remove('fade-out');dinasImgIndex=(dinasImgIndex+1)%heroMedia.lasdinas.length},500)}

function irACategorias(brand){
  currentBrand=brand;
  document.getElementById('screen-marcas').classList.add('hidden');
  const grid=document.getElementById('categorias-grid');
  grid.innerHTML='';
  brandCategories[brand].forEach(cat=>{
    const btn=document.createElement('button');
    btn.className='categoria-card';
    btn.innerHTML=`<div class="categoria-card-inner"><span class="categoria-card-name">${cat.title}</span><span class="categoria-card-arrow">→</span></div>`;
    btn.onclick=()=>irAProductos(brand,cat.id,cat.title);
    grid.appendChild(btn);
  });
  document.getElementById('categorias-titulo').textContent=brandNames[brand];
  document.getElementById('screen-categorias').classList.remove('hidden');
  updateHero(brand);
  window.scrollTo({top:0,behavior:'smooth'});
}

function volverAMarcas(){
  document.getElementById('screen-categorias').classList.add('hidden');
  document.getElementById('screen-marcas').classList.remove('hidden');
  updateHero('all');
  window.scrollTo({top:0,behavior:'smooth'});
}

function irAProductos(brand,catId,catTitle){
  currentCatId=catId;
  document.getElementById('screen-categorias').classList.add('hidden');
  const grid=document.getElementById('screen-productos-grid');
  grid.innerHTML='';
  const baseUrl='https://1charnidistribucion.github.io/charni-catalogo/img/productos/';
  (products[catId]||[]).forEach(p=>{
    const card=document.createElement('div');
    card.className='product-card';
    let imgHtml;
    if(p.oval){
      imgHtml=p.img
        ?`<div class="product-image-oval"><div class="oval-container"><img src="${baseUrl}${p.img}.jpg" alt="${p.name}"></div></div>`
        :'<div class="product-image-oval"><div class="oval-container" style="background:#3a3a3a;display:flex;align-items:center;justify-content:center;color:#666;font-size:14px">Próximamente</div></div>';
    }else{
      imgHtml=p.img
        ?`<img src="${baseUrl}${p.img}.jpg" class="product-image" alt="${p.name}">`
        :'<div style="height:240px;background:#3a3a3a;display:flex;align-items:center;justify-content:center;color:#666;font-size:14px">Próximamente</div>';
    }
    const descHtml=p.desc?`<div class="product-desc">${p.desc}</div>`:'';
    const specsHtml=p.peso?`<div class="product-specs">📦 ${p.peso}</div>`:'';
    const pname=p.name.replace(/'/g,"\\'");
    card.innerHTML=`${imgHtml}<div class="product-info"><div class="product-category">${p.cat}</div><h4 class="product-name">${p.name}</h4>${descHtml}${specsHtml}<div class="product-actions"><button class="btn btn-whatsapp" onclick="contactWA('${pname}')">💬 Consultar</button><button class="btn btn-cart" onclick="addToCart('${pname}')">🛒 Agregar</button></div></div>`;
    grid.appendChild(card);
  });
  document.getElementById('productos-titulo').textContent=catTitle;
  document.getElementById('screen-productos').classList.remove('hidden');
  window.scrollTo({top:0,behavior:'smooth'});
}

function volverACategorias(){
  document.getElementById('screen-productos').classList.add('hidden');
  document.getElementById('screen-categorias').classList.remove('hidden');
  window.scrollTo({top:0,behavior:'smooth'});
}

function contactWA(prod){const msg=encodeURIComponent(`Hola! Me interesa consultar por: ${prod}`);window.open(`https://wa.me/${WA}?text=${msg}`,'_blank')}
function addToCart(prod){const existing=cart.find(i=>i.name===prod);if(existing){existing.qty++}else{cart.push({name:prod,qty:1})}updateCart()}
function updateCart(){document.getElementById('cartCount').textContent=cart.reduce((sum,i)=>sum+i.qty,0);renderCart()}
function renderCart(){const container=document.getElementById('cartItems');const actions=document.getElementById('cartActions');if(cart.length===0){container.innerHTML='<div class="cart-empty">Tu carrito está vacío<br>Agregá productos para hacer tu pedido</div>';actions.style.display='none'}else{container.innerHTML=cart.map((item,idx)=>`<div class="cart-item"><div class="cart-item-info"><div class="cart-item-name">${item.name}</div><div class="cart-item-qty">Cantidad: ${item.qty}</div></div><button class="cart-item-remove" onclick="removeFromCart(${idx})">✕</button></div>`).join('');actions.style.display='flex'}}
function removeFromCart(idx){cart.splice(idx,1);updateCart()}
function clearCart(){if(confirm('¿Vaciar el carrito?')){cart=[];updateCart()}}
function sendWhatsApp(){if(cart.length===0)return;let msg='Hola! Quiero hacer un pedido:\n\n';cart.forEach(i=>msg+=`• ${i.name} x ${i.qty}\n`);msg+='\n¿Me pasás el total?';window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank')}
function openCart(){document.getElementById('cartModal').classList.add('show')}
function closeCart(){document.getElementById('cartModal').classList.remove('show')}

updateHero('all');
