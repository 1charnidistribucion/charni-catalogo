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

const brandNames={donatilio:'Don Atilio',cagnoli:'Cagnoli',lasdinas:'Las Dinas',vidal:'Lácteos Vidal'};
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
  const hidden=window.HIDDEN_BRANDS||[];
  const marcas=brand==='all'?Object.keys(brandSections).filter(m=>!hidden.includes(m)):[brand];
  marcas.forEach(marca=>{
    const secciones=brandSections[marca];
    secciones.forEach(sec=>{
      const prods=products[sec.id];
      if(!prods||prods.length===0)return;
      const secDiv=document.createElement('div');
      secDiv.className='cat-seccion';
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
        const pname=p.name.replace(/'/g,"\\'");
        let imgHtml;
        if(p.img){
          imgHtml=`<div class="cat-card-img"><img src="${baseUrl}${p.img}.jpg" alt="${p.name}" loading="lazy"></div>`;
        }else{
          imgHtml=`<div class="cat-card-img cat-card-img-empty"><span>Próx.</span></div>`;
        }
        card.innerHTML=`${imgHtml}<div class="cat-card-info"><div class="cat-card-name">${p.name}</div><button class="cat-card-btn" onclick="addToCart('${pname}')">+ Agregar</button></div>`;
        row.appendChild(card);
      });
      secDiv.appendChild(row);
      main.appendChild(secDiv);
    });
  });
}

function filterBrand(brand,btn){
  currentBrand=brand;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderCatalogo(brand);
  updateHero(brand);
  window.scrollTo({top:0,behavior:'smooth'});
}

function addToCart(prod){
  const existing=cart.find(i=>i.name===prod);
  if(existing){existing.qty++}else{cart.push({name:prod,qty:1})}
  updateCart();
}
function updateCart(){document.getElementById('cartCount').textContent=cart.reduce((sum,i)=>sum+i.qty,0);renderCart()}
function renderCart(){
  const container=document.getElementById('cartItems');
  const actions=document.getElementById('cartActions');
  if(cart.length===0){container.innerHTML='<div class="cart-empty">Tu carrito está vacío<br>Agregá productos para hacer tu pedido</div>';actions.style.display='none'}
  else{container.innerHTML=cart.map((item,idx)=>`<div class="cart-item"><div class="cart-item-info"><div class="cart-item-name">${item.name}</div><div class="cart-item-qty">Cantidad: ${item.qty}</div></div><button class="cart-item-remove" onclick="removeFromCart(${idx})">✕</button></div>`).join('');actions.style.display='flex'}
}
function removeFromCart(idx){cart.splice(idx,1);updateCart()}
function clearCart(){if(confirm('¿Vaciar el carrito?')){cart=[];updateCart()}}
function sendWhatsApp(){
  if(cart.length===0)return;
  let msg='Hola! Quiero hacer un pedido:\n\n';
  cart.forEach(i=>msg+=`• ${i.name} x ${i.qty}\n`);
  msg+='\n¿Me pasás el total?';
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank');
}
function openCart(){document.getElementById('cartModal').classList.add('show')}
function closeCart(){document.getElementById('cartModal').classList.remove('show')}

renderCatalogo('all');
updateHero('all');
