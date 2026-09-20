import{initializeApp}from"https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import{getAnalytics}from"https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
import{
 getAuth,onAuthStateChanged,signInWithEmailAndPassword,
 createUserWithEmailAndPassword,signOut
}from"https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import{
 getFirestore,collection,addDoc,getDocs,query,where,
 orderBy,doc,getDoc,updateDoc,serverTimestamp
}from"https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig={
 apiKey:"AIzaSyAZ5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
 authDomain:"novashop-4ee63.firebaseapp.com",
 projectId:"novashop-4ee63",
 storageBucket:"novashop-4ee63.firebasestorage.app",
 messagingSenderId:"1044964015809",
 appId:"1:1044964015809:web:4eafe0b1aede48f8539e40",
 measurementId:"G-XNY5X2VMY9"
};

const app=initializeApp(firebaseConfig);
try{getAnalytics(app)}catch(e){console.warn(e)}
const auth=getAuth(app);
const db=getFirestore(app);

const ADMIN_EMAIL="pc2alex.les@gmail.com";
const ADMIN_CODE="NOVA-ADMIN-2026";
const PAYPAL_LINK="https://paypal.me/SH0PNOVA";
const COUPON_CODE="NOVA100";
const COUPON_DISCOUNT=.10;
const FALLBACK="https://placehold.co/800x800/111827/ffffff?text=NovaShop";

const products=[
{id:"p1",name:"Gigabyte B650 AORUS Elite AX",category:"Composants",price:189.99,image:"https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"},
{id:"p2",name:"PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",category:"PC Gamer",price:2237.65,image:"https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png"},
{id:"p3",name:"HyperX Cloud II",category:"Casques",price:49.99,image:"https://fr.hyperx.com/cdn/shop/files/hyperx_cloud_ii_red_1_main.jpg?v=1764129756"},
{id:"p4",name:"TECORS Clavier Gamer Mécanique 60% AZERTY",category:"Claviers",price:30,image:"https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg"},
{id:"p5",name:"Clavier Magnétique 65% Celshading Noir",category:"Claviers",price:120.90,image:"https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832"},
{id:"p6",name:"Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",category:"Souris",price:49.99,image:"https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif"},
{id:"p7",name:"Logitech G PRO X2 Superstrike Blanc et Noir",category:"Souris",price:150.99,image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg"},
{id:"p8",name:"Samsung 990 PRO 1TB",category:"Stockage",price:249.99,image:"https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg"},
{id:"p9",name:"Samsung 990 PRO 2TB",category:"Stockage",price:199.93,image:"https://pc.comparer.fr/500x500/310191422.webp"},
{id:"p10",name:"CORSAIR RM1000x EU",category:"Alimentations",price:159.90,image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp"},
{id:"p11",name:"CORSAIR RM850x EU",category:"Alimentations",price:134.90,image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp"},
{id:"p12",name:"Corsair Frame 5000D RS ARGB Noir",category:"Boîtiers",price:159.90,image:"https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg"},
{id:"p13",name:"ARCTIC Liquid Freezer III Pro 360 A-RGB Black",category:"Refroidissement",price:129.90,image:"https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg"},
{id:"p14",name:"Samsung 27 QD-OLED Odyssey G6",category:"Écrans",price:399.95,image:"https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg"},
{id:"p15",name:"ELGATO Wave Mic Arm Pro",category:"Streaming",price:229.90,image:"https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg"},
{id:"p16",name:"Sony DualSense Cosmic Red PS5/PC",category:"Manettes",price:74.90,image:"https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg"},
{id:"p17",name:"ASUS TUF Gaming B650-PLUS",category:"Composants",price:179.90,image:"https://media.materiel.net/r550/products/MN0005986139.jpg"},
{id:"p18",name:"MSI MAG B650 Tomahawk WiFi",category:"Composants",price:189.90,image:"https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg"},
{id:"p19",name:"KOORUI Ecran PC Gamer 27 Pouces 200Hz IPS QHD HDR400 1ms",category:"Écrans",price:74.99,image:"https://m.media-amazon.com/images/I/71CJ1DF-8sL._AC_SL1500_.jpg"},
{id:"p20",name:'iiyama 23.8" LED - G-Master GB2471HS-B1 Red Eagle',category:"Écrans",price:65.99,image:"https://media.ldlc.com/r1600/ld/products/00/06/34/20/LD0006342033.jpg"},
{id:"p21",name:"SONGMICS Chaise de jeu ergonomique avec repose-pieds 150 kg gris ardoise",category:"Chaises gaming",price:129.99,image:"https://static.songmics.fr/fit-in/1000x1000/image/Product/B34OBG077G01/B34OBG077G01-1.jpg"},
{id:"p22",name:"Dowinx Série Luxe Suède LS-66D68E Blanc",category:"Chaises gaming",price:79.99,image:"https://eu.dowinx.com/cdn/shop/files/11_5f72b693-5f79-4d06-b48a-7cb2b2f0244a.png?v=1752139814&width=1220"},
{id:"p23",name:"Chaise GTPLAYER Ergonomique Gaming Soutien Lombaire Repose-pieds",category:"Chaises gaming",price:109.99,image:"https://thumb.pccomponentes.com/w-530-530/articles/1118/11186247/167-silla-gaming-gtplayer-ergonomica-con-reposapies-y-soporte-lumbar-4d.jpg"},
{id:"p24",name:"Desk Lite - Height-Adjustable Desk",category:"Bureaux gaming",price:110.99,image:"https://yaasa.com/cdn/shop/files/yaasa-desk-lite_nr01_black_100_01-04545-01_1200x.jpg?v=1753169928"},
{id:"p25",name:"EUREKA ERGONOMIC Bureau Gaming LED 182x76cm en Forme d'Aile",category:"Bureaux gaming",price:86.99,image:"https://m.media-amazon.com/images/I/71Gd5G3wRsL._AC_SL1500_.jpg"},
{id:"p26",name:"Bureau gaming d’angle HOMCOM réversible support écran",category:"Bureaux gaming",price:44.99,image:"https://cdn.manomano.com/pim-media/images/medium/74eca1cb1cefa063c8f600ee293ae6ee826794f8.jpg"},
{id:"p27",name:"Logitech G Pro X 2 Lightspeed Noir + Repose casque",category:"Casques",price:99.99,image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/6d/e9/6e/24045933/1540-1/tsp20260429154901/Casque-PC-gaming-sans-fil-Logitech-G-Pro-X-2-Lightspeed-Noir-Repose-casque.jpg"},
{id:"p28",name:"Razer BlackShark V2 Pro 2023 Noir",category:"Casques",price:75.99,image:"https://media.ldlc.com/r1600/ld/products/00/06/07/71/LD0006077125.jpg"},
{id:"p29",name:"beyerdynamic DT-990 Pro 250 Ohm",category:"Casques",price:60.99,image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_10/106865/18443258_800.jpg"},
{id:"p30",name:"Logitech PRO X TKL Rapid Noir, filaire AZERTY",category:"Claviers",price:78.99,image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/6a/89/8f/26184042/1540-1.jpg"},
{id:"p31",name:"QwertyKey75 HE Striker, Magnetic Hall Effect, Rapid Trigger, Snap Tap",category:"Claviers",price:56.99,image:"https://cdn.shopify.com/s/files/1/0814/2530/1746/files/QK75-HE-STRIKER-qwertykey-tastatura-mecanica-gaming-hotswap-2025_1eee355b-72ca-46e6-a458-751384d0595c_1800x.webp?v=1771799537"},
{id:"p32",name:"GravaStar Mercury K1 Clavier Gamer sans Fil en Aluminium, Noir Dégradé",category:"Claviers",price:91.99,image:"https://m.media-amazon.com/images/I/6144lt2l5JL._AC_SL1200_.jpg"},
{id:"p33",name:"ATTACK SHARK R11 Ultra, fibre de carbone, 8000Hz, 49g, 42000 DPI",category:"Souris",price:26.99,image:"https://m.media-amazon.com/images/I/71bMz15SqcL._AC_SL1500_.jpg"},
{id:"p34",name:"HyperX QuadCast 2 – Microphone USB – RGB",category:"Microphones",price:98.99,image:"https://fr.hyperx.com/cdn/shop/files/hyperx_quadcast_2_872v1aa_main_1_2d47a555-f537-457b-9002-8b9e9010dc00.jpg?v=1763067608"},
{id:"p35",name:"Shure SM7 dB",category:"Microphones",price:121.99,image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_57/573672/18492412_800.jpg"},
{id:"p36",name:"Razer Seiren V3 Chroma Noir",category:"Microphones",price:13.99,image:"https://media.ldlc.com/r1600/ld/products/00/06/13/25/LD0006132588.jpg"},
{id:"p37",name:"Stairville LED Pixel Rail 40 RGB MKII",category:"Éclairage RGB",price:18.90,image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449739/14448905_800.jpg"},
{id:"p38",name:"Govee LED Strip Light RGBIC Wi-Fi + Bluetooth 5m Matter",category:"Éclairage RGB",price:8,image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/ab/7a/9d/27097771/1520-2/tsp20260429155350/Ruban-LED-Govee-LED-Strip-Light-RGBIC-Wi-Fi-avec-BT-5M-Matter.jpg"},
{id:"p39",name:"Lampe de plafond hexagone nid d’abeille LED 2.4m x 4.8m contour bleu",category:"Éclairage RGB",price:91.10,image:"https://www.discount-autosport.com/wp-content/webp-express/webp-images/uploads/2025/02/lampe-hexagone-plafond-led-4m80-contour-bleu-.jpg.webp"},
{id:"p40",name:"GIGABYTE GeForce RTX 5050 WINDFORCE OC 8G",category:"Cartes graphiques",price:147,image:"https://m.media-amazon.com/images/I/41kmHFMFPOL._SL500_.jpg"},
{id:"p41",name:"MSI GeForce RTX 3050 LP E 6G OC",category:"Cartes graphiques",price:100,image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTCe_rha_tAAHPWnQ8VV7GIvF-uSqUaEyU61TSnwgM4CK8g3-x_3Hq4wOgH36Ri63eAiWHsvhmRJHzVrUQR9-IwMx31WH0w"},
{id:"p42",name:"ASUS Dual Radeon RX 7600 EVO OC Edition 8GB GDDR6",category:"Cartes graphiques",price:140,image:"https://m.media-amazon.com/images/I/81QItJufypL._AC_SL1500_.jpg"},
{id:"p43",name:"PC Gamer Fixe, Ryzen 7 5700G, Vega 8, 16G DDR4, 1T SSD",category:"PC Gamer",price:650,image:"https://m.media-amazon.com/images/I/81M3iU5S4QL._AC_SL1500_.jpg",new:true}
];

const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const money=n=>Number(n||0).toLocaleString("fr-FR",{style:"currency",currency:"EUR"});

let cart=JSON.parse(localStorage.getItem("novaCart")||"[]").map(x=>({
 id:x.id,qty:Number(x.qty??x.quantity??1)
}));
let favorites=JSON.parse(localStorage.getItem("novaFavorites")||"[]");
let orders=JSON.parse(localStorage.getItem("novaOrders")||"[]");

let currentCategory="Tous";
let currentSort="default";
let searchText="";
let couponActive=false;
let selectedPayment="card";
let currentUser=null;
let adminAuthorized=false;

function save(){
 localStorage.setItem("novaCart",JSON.stringify(cart));
 localStorage.setItem("novaFavorites",JSON.stringify(favorites));
 localStorage.setItem("novaOrders",JSON.stringify(orders));
}

function getProduct(id){return products.find(p=>p.id===id)}
function cartCount(){return cart.reduce((n,x)=>n+Number(x.qty||0),0)}
function cartTotal(){
 return cart.reduce((n,x)=>{
  const p=getProduct(x.id);
  return p?n+p.price*Number(x.qty||0):n
 },0)
}
function finalTotal(){
 const t=cartTotal();
 return couponActive?t*(1-COUPON_DISCOUNT):t
}

function toast(message){
 const t=$("toast");
 t.textContent=message;
 t.classList.add("show");
 clearTimeout(t._timer);
 t._timer=setTimeout(()=>t.classList.remove("show"),2300);
}

function openModal(html){
 $("modalContent").innerHTML=html;
 $("overlay").classList.add("open");
 document.body.classList.add("modal-open");
}

function closeModal(){
 $("overlay").classList.remove("open");
 document.body.classList.remove("modal-open");
}

function updateBadge(){
 $("cartBadge").textContent=cartCount();
}

function renderCategories(){
 const categories=["Tous",...new Set(products.map(p=>p.category))];
 $("categories").innerHTML=categories.map(c=>`
  <button class="cat ${c===currentCategory?"active":""}" data-category="${esc(c)}">
   ${esc(c)}
  </button>
 `).join("");

 document.querySelectorAll("[data-category]").forEach(b=>{
  b.onclick=()=>{
   currentCategory=b.dataset.category;
   renderCategories();
   renderProducts();
  };
 });
}

function filteredProducts(){
 let list=[...products];

 if(currentCategory!=="Tous")
  list=list.filter(p=>p.category===currentCategory);

 const q=searchText.trim().toLowerCase();

 if(q)
  list=list.filter(p=>
   p.name.toLowerCase().includes(q)||
   p.category.toLowerCase().includes(q)
  );

 if(currentSort==="priceAsc")list.sort((a,b)=>a.price-b.price);
 if(currentSort==="priceDesc")list.sort((a,b)=>b.price-a.price);
 if(currentSort==="name")list.sort((a,b)=>a.name.localeCompare(b.name,"fr"));

 return list;
}

function renderProducts(){
 const list=filteredProducts();

 $("products").innerHTML=list.length?list.map(p=>`
  <article class="card">
   <div class="card-img">
    <img src="${esc(p.image)}" alt="${esc(p.name)}"
     referrerpolicy="no-referrer"
     onerror="this.onerror=null;this.src='${FALLBACK}'">
   </div>

   <div class="card-body">
    ${p.new?'<span class="badge-new">NOUVEAU</span>':""}

    <h3>${esc(p.name)}</h3>
    <div class="category">${esc(p.category)}</div>
    <div class="price">${money(p.price)}</div>

    <div class="card-actions">
     <button class="buy" data-open-product="${p.id}">Voir</button>

     <button class="fav ${favorites.includes(p.id)?"active":""}"
      data-favorite="${p.id}">
      ${favorites.includes(p.id)?"♥":"♡"}
     </button>
    </div>
   </div>
  </article>
 `).join(""):`
  <div class="empty">
   <h2>Aucun produit trouvé 😕</h2>
   <p>Essaie une autre recherche.</p>
  </div>
 `;

 document.querySelectorAll("[data-open-product]").forEach(b=>{
  b.onclick=()=>openProduct(b.dataset.openProduct);
 });

 document.querySelectorAll("[data-favorite]").forEach(b=>{
  b.onclick=()=>{
   toggleFavorite(b.dataset.favorite);
  };
 });
}

function openProduct(id){
 const p=getProduct(id);
 if(!p)return;

 openModal(`
  <div class="product-detail">

   <div class="product-detail-image">
    <img src="${esc(p.image)}" alt="${esc(p.name)}"
     referrerpolicy="no-referrer"
     onerror="this.onerror=null;this.src='${FALLBACK}'">
   </div>

   <div class="detail-info">
    ${p.new?'<span class="badge-new">NOUVEAU</span>':""}

    <h1>${esc(p.name)}</h1>
    <div class="category">${esc(p.category)}</div>
    <div class="price">${money(p.price)}</div>

    <p>
     Produit disponible sur NovaShop.
     Ajoute-le à ton panier pour commander.
    </p>

    <button class="primary" id="detailAdd" style="width:100%">
     🛒 Ajouter au panier
    </button>

    <button class="secondary" id="detailFavorite"
     style="width:100%;margin-top:10px">
     ${favorites.includes(p.id)?"♥ Retirer des favoris":"♡ Ajouter aux favoris"}
    </button>
   </div>

  </div>
 `);

 $("detailAdd").onclick=()=>{
  addToCart(p.id);
  closeModal();
 };

 $("detailFavorite").onclick=()=>{
  toggleFavorite(p.id);
  openProduct(p.id);
 };
}

function addToCart(id){
 const item=cart.find(x=>x.id===id);

 if(item)item.qty++;
 else cart.push({id,qty:1});

 save();
 updateBadge();
 toast("Produit ajouté au panier 🛒");
}

function removeFromCart(id){
 cart=cart.filter(x=>x.id!==id);
 save();
 updateBadge();
 renderCart();
}

function changeQty(id,amount){
 const item=cart.find(x=>x.id===id);
 if(!item)return;

 item.qty+=amount;

 if(item.qty<=0){
  removeFromCart(id);
  return;
 }

 save();
 updateBadge();
 renderCart();
}

function renderCart(){
 if(!cart.length){
  openModal(`
   <h2>🛒 Ton panier</h2>
   <div class="empty">
    <h3>Ton panier est vide</h3>
    <p>Ajoute un produit pour continuer.</p>
   </div>
  `);
  return;
 }

 let html=`<h2>🛒 Ton panier</h2>`;

 cart.forEach(item=>{
  const p=getProduct(item.id);
  if(!p)return;

  html+=`
   <div class="cart-item">

    <img src="${esc(p.image)}" alt=""
     referrerpolicy="no-referrer"
     onerror="this.onerror=null;this.src='${FALLBACK}'">

    <div class="cart-info">
     <h3>${esc(p.name)}</h3>
     <div class="category">${money(p.price)} / unité</div>

     <div class="qty">
      <button data-minus="${p.id}">−</button>
      <b>${item.qty}</b>
      <button data-plus="${p.id}">+</button>
      <button data-remove="${p.id}">🗑️</button>
     </div>
    </div>

   </div>
  `;
 });

 html+=`
  <div class="cart-total">
   <span>Total</span>
   <span>${money(cartTotal())}</span>
  </div>

  <button class="primary" id="goCheckout"
   style="width:100%;margin-top:18px">
   💳 Passer au paiement
  </button>
 `;

 openModal(html);

 document.querySelectorAll("[data-minus]").forEach(b=>{
  b.onclick=()=>changeQty(b.dataset.minus,-1);
 });

 document.querySelectorAll("[data-plus]").forEach(b=>{
  b.onclick=()=>changeQty(b.dataset.plus,1);
 });

 document.querySelectorAll("[data-remove]").forEach(b=>{
  b.onclick=()=>removeFromCart(b.dataset.remove);
 });

 $("goCheckout").onclick=renderCheckout;
}

function toggleFavorite(id){
 if(favorites.includes(id)){
  favorites=favorites.filter(x=>x!==id);
  toast("Retiré des favoris");
 }else{
  favorites.push(id);
  toast("Ajouté aux favoris ❤️");
 }

 save();
 renderProducts();
}

function renderFavorites(){
 const list=products.filter(p=>favorites.includes(p.id));

 if(!list.length){
  openModal(`
   <h2>❤️ Mes favoris</h2>
   <div class="empty">
    <h3>Aucun favori</h3>
    <p>Ajoute des produits avec ♡.</p>
   </div>
  `);
  return;
 }

 openModal(`
  <h2>❤️ Mes favoris</h2>
  <div class="products" id="favoriteProducts"></div>
 `);

 $("favoriteProducts").innerHTML=list.map(p=>`
  <article class="card">
   <div class="card-img">
    <img src="${esc(p.image)}" alt=""
     referrerpolicy="no-referrer"
     onerror="this.onerror=null;this.src='${FALLBACK}'">
   </div>

   <div class="card-body">
    <h3>${esc(p.name)}</h3>
    <div class="category">${esc(p.category)}</div>
    <div class="price">${money(p.price)}</div>

    <button class="primary" data-fav-open="${p.id}"
     style="width:100%;margin-top:12px">
     Voir
    </button>
   </div>
  </article>
 `).join("");

 document.querySelectorAll("[data-fav-open]").forEach(b=>{
  b.onclick=()=>openProduct(b.dataset.favOpen);
 });
}function applyCoupon(){
 const input=$("couponInput");
 if(!input)return;

 const code=input.value.trim().toUpperCase();

 if(code===COUPON_CODE){
  couponActive=true;
  toast("Coupon NOVA100 appliqué : -10% 🎟️");
  renderCheckout();
 }else{
  couponActive=false;
  toast("Coupon incorrect ❌");
 }
}

function renderCheckout(){
 if(!cart.length){
  renderCart();
  return;
 }

 const subtotal=cartTotal();
 const total=finalTotal();

 openModal(`
  <h2>💳 Paiement</h2>

  <div class="coupon-box">
   <div class="coupon-title">🎟️ Coupon de réduction</div>

   <div class="coupon-row">
    <input id="couponInput"
     placeholder="Entrez votre coupon"
     value="${couponActive?COUPON_CODE:""}">

    <button id="applyCoupon">Appliquer</button>
   </div>

   ${couponActive?`
    <div class="coupon-success">
     ✓ NOVA100 appliqué : -10%
    </div>
   `:""}
  </div>

  <div style="margin-top:18px">
   <div style="color:#94a3b8">
    Sous-total : <b>${money(subtotal)}</b>
   </div>

   ${couponActive?`
    <div class="discount">
     Réduction : -${money(subtotal*COUPON_DISCOUNT)}
    </div>
   `:""}

   <div style="font-size:26px;font-weight:900;margin-top:9px">
    Total : ${money(total)}
   </div>
  </div>

  <div class="payment-grid">

   <button class="payment ${selectedPayment==="card"?"active":""}"
    data-payment="card">

    <div class="payment-icon">💳</div>
    <div class="payment-name">Carte bancaire</div>
    <div class="payment-desc">
     Paiement sécurisé via PayPal
    </div>

   </button>

   <button class="payment ${selectedPayment==="paypal"?"active":""}"
    data-payment="paypal">

    <div class="payment-icon">🅿️</div>
    <div class="payment-name">PayPal</div>
    <div class="payment-desc">
     Paiement avec ton compte PayPal
    </div>

   </button>

  </div>

  <div class="payment-panel">

   ${
    selectedPayment==="card"
    ?`
      <p>
       Le bouton ouvre PayPal pour effectuer le paiement.
       Si PayPal propose le paiement par carte, tu peux choisir
       cette option sans avoir à créer un paiement directement
       dans NovaShop.
      </p>

      <button class="primary" id="payButton"
       style="width:100%;margin-top:12px">
       💳 Continuer vers PayPal
      </button>
    `
    :`
      <p>
       Tu vas être envoyé vers PayPal pour effectuer le paiement.
      </p>

      <button class="primary" id="payButton"
       style="width:100%;margin-top:12px">
       🅿️ Payer avec PayPal
      </button>
    `
   }

  </div>

  <div class="form" style="margin-top:18px">

   <input id="customerName" placeholder="Nom">

   <input id="customerEmail"
    type="email"
    placeholder="Email"
    value="${esc(currentUser?.email||"")}">

  </div>
 `);

 $("applyCoupon").onclick=applyCoupon;

 document.querySelectorAll("[data-payment]").forEach(b=>{
  b.onclick=()=>{
   selectedPayment=b.dataset.payment;
   renderCheckout();
  };
 });

 $("payButton").onclick=openPayPal;
}

function openPayPal(){
 const total=finalTotal();

 if(total<=0){
  toast("Montant invalide");
  return;
 }

 const amount=total.toFixed(2);
 const url=PAYPAL_LINK+"/"+amount;

 saveLocalOrder();

 window.open(url,"_blank","noopener,noreferrer");

 toast("Ouverture de PayPal 🅿️");
}

function saveLocalOrder(){
 const name=$("customerName")?.value.trim()||"";
 const email=$("customerEmail")?.value.trim()||currentUser?.email||"";

 const order={
  id:"NOVA-"+Date.now(),
  name,
  email,
  payment:selectedPayment,
  coupon:couponActive?COUPON_CODE:null,
  total:finalTotal(),
  status:"pending",
  items:cart.map(x=>({
   id:x.id,
   qty:x.qty
  })),
  date:new Date().toISOString()
 };

 orders.push(order);
 save();
}

async function saveFirebaseOrder(){
 if(!currentUser)return null;

 const items=cart.map(item=>{
  const p=getProduct(item.id);
  return{
   id:p.id,
   name:p.name,
   price:p.price,
   quantity:item.qty
  };
 });

 return await addDoc(collection(db,"orders"),{
  userId:currentUser.uid,
  customer:{
   name:$("customerName")?.value.trim()||"",
   email:$("customerEmail")?.value.trim()||currentUser.email
  },
  items,
  subtotal:cartTotal(),
  discount:couponActive?cartTotal()*COUPON_DISCOUNT:0,
  total:finalTotal(),
  paymentMethod:selectedPayment,
  paymentStatus:"pending",
  nova100:couponActive,
  createdAt:serverTimestamp()
 });
}

async function login(email,password){
 try{
  await signInWithEmailAndPassword(auth,email,password);
  toast("Connexion réussie ✅");
  closeModal();
 }catch(e){
  console.error(e);
  toast(authError(e));
 }
}

async function register(email,password){
 try{
  await createUserWithEmailAndPassword(auth,email,password);
  toast("Compte créé ✅");
  closeModal();
 }catch(e){
  console.error(e);
  toast(authError(e));
 }
}

function authError(e){
 const map={
  "auth/invalid-credential":"Email ou mot de passe incorrect.",
  "auth/invalid-email":"Email invalide.",
  "auth/user-not-found":"Utilisateur introuvable.",
  "auth/wrong-password":"Mot de passe incorrect.",
  "auth/email-already-in-use":"Cet email est déjà utilisé.",
  "auth/weak-password":"Mot de passe trop faible.",
  "auth/api-key-not-valid":"Clé API Firebase invalide.",
  "auth/network-request-failed":"Erreur réseau.",
  "auth/too-many-requests":"Trop de tentatives."
 };

 return map[e?.code]||e?.message||"Erreur.";
}

function renderAccount(){
 const email=currentUser?.email||"Non connecté";

 openModal(`
  <h2>👤 Mon compte</h2>

  <div class="account-box">

   <div style="padding:16px;background:#111c2d;border-radius:12px">
    <b>${esc(email)}</b>
    <p style="color:#94a3b8;margin-top:7px">
     ${currentUser?"Compte Firebase connecté.":"Tu n'es pas connecté."}
    </p>
   </div>

   ${
    currentUser
    ?`
      <button class="secondary" id="accountOrders">
       📦 Mes commandes
      </button>

      <button class="secondary" id="logoutButton">
       🚪 Se déconnecter
      </button>
    `
    :`
      <button class="primary" id="loginButton">
       🔐 Se connecter
      </button>

      <button class="secondary" id="registerButton">
       ✨ Créer un compte
      </button>
    `
   }

  </div>
 `);

 if(currentUser){
  $("accountOrders").onclick=renderOrdersFirebase;
  $("logoutButton").onclick=async()=>{
   await signOut(auth);
   closeModal();
   toast("Déconnexion réussie");
  };
 }else{
  $("loginButton").onclick=openLogin;
  $("registerButton").onclick=openRegister;
 }
}

function openLogin(){
 openModal(`
  <h2>🔐 Connexion</h2>

  <form class="form" id="loginForm">

   <input id="loginEmail"
    type="email"
    placeholder="Email"
    required>

   <input id="loginPassword"
    type="password"
    placeholder="Mot de passe"
    required>

   <button class="primary" type="submit">
    Se connecter
   </button>

  </form>

  <button class="secondary" id="switchRegister"
   style="width:100%;margin-top:10px">
   Créer un compte
  </button>
 `);

 $("loginForm").onsubmit=e=>{
  e.preventDefault();
  login(
   $("loginEmail").value.trim(),
   $("loginPassword").value
  );
 };

 $("switchRegister").onclick=openRegister;
}

function openRegister(){
 openModal(`
  <h2>✨ Créer un compte</h2>

  <form class="form" id="registerForm">

   <input id="registerEmail"
    type="email"
    placeholder="Email"
    required>

   <input id="registerPassword"
    type="password"
    placeholder="Mot de passe"
    minlength="6"
    required>

   <button class="primary" type="submit">
    Créer le compte
   </button>

  </form>

  <button class="secondary" id="switchLogin"
   style="width:100%;margin-top:10px">
   J'ai déjà un compte
  </button>
 `);

 $("registerForm").onsubmit=e=>{
  e.preventDefault();
  register(
   $("registerEmail").value.trim(),
   $("registerPassword").value
  );
 };

 $("switchLogin").onclick=openLogin;
}

async function renderOrdersFirebase(){
 if(!currentUser){
  openLogin();
  return;
 }

 openModal(`
  <h2>📦 Mes commandes</h2>
  <div id="ordersContent">Chargement...</div>
 `);

 try{
  const q=query(
   collection(db,"orders"),
   where("userId","==",currentUser.uid),
   orderBy("createdAt","desc")
  );

  const snap=await getDocs(q);

  if(!snap.docs.length){
   $("ordersContent").innerHTML=`
    <div class="empty">
     <h3>Aucune commande</h3>
    </div>
   `;
   return;
  }

  $("ordersContent").innerHTML=snap.docs.map(d=>{
   const o=d.data();
   const status=o.paymentStatus||"pending";

   return`
    <div class="order ${status==="paid"?"order-paid":"order-pending"}">

     <div class="order-head">
      <b>Commande #${d.id.slice(0,8)}</b>
      <b>${money(o.total)}</b>
     </div>

     <p style="margin-top:8px">
      Paiement : ${esc(o.paymentMethod||"")}
     </p>

     <p style="margin-top:5px">
      Statut :
      <span class="status ${status==="paid"?"paid":"pending"}">
       ${status==="paid"?"PAYÉE":"EN ATTENTE"}
      </span>
     </p>

    </div>
   `;
  }).join("");

 }catch(e){
  console.error(e);

  $("ordersContent").innerHTML=`
   <p style="color:#ef4444">
    Impossible de charger les commandes.
   </p>
  `;
 }
}

function openAdmin(){
 if(!currentUser){
  toast("Connecte-toi avec le compte admin.");
  openLogin();
  return;
 }

 if(currentUser.email.toLowerCase()!==ADMIN_EMAIL.toLowerCase()){
  toast("Accès administrateur refusé ❌");
  return;
 }

 const code=prompt("Code administrateur :");

 if(code!==ADMIN_CODE){
  toast("Code incorrect ❌");
  return;
 }

 adminAuthorized=true;
 renderAdmin();
}

async function renderAdmin(){
 if(!adminAuthorized||!currentUser)return;

 openModal(`
  <h2>⚙️ Dashboard NovaShop</h2>

  <div class="admin-grid" id="adminOrders">
   Chargement...
  </div>
 `);

 try{
  const q=query(
   collection(db,"orders"),
   orderBy("createdAt","desc")
  );

  const snap=await getDocs(q);

  if(!snap.docs.length){
   $("adminOrders").innerHTML=`
    <div class="empty">
     <h3>Aucune commande</h3>
    </div>
   `;
   return;
  }

  $("adminOrders").innerHTML=snap.docs.map(d=>{
   const o=d.data();
   const status=o.paymentStatus||"pending";

   return`
    <div class="admin-order">

     <div class="order-head">
      <b>Commande #${d.id.slice(0,8)}</b>
      <b>${money(o.total)}</b>
     </div>

     <p>Client : ${esc(o.customer?.name||"")}</p>
     <p>Email : ${esc(o.customer?.email||"")}</p>
     <p>Paiement : ${esc(o.paymentMethod||"")}</p>

     <p>
      Statut :
      <span class="status ${status==="paid"?"paid":"pending"}">
       ${status==="paid"?"PAYÉ":"EN ATTENTE"}
      </span>
     </p>

     <div class="admin-order-actions">

      ${
       status!=="paid"
       ?`
        <button class="primary"
         data-mark-paid="${d.id}">
         ✅ Marquer payé
        </button>
       `
       :`
        <button class="secondary" disabled>
         ✅ Déjà payé
        </button>
       `
      }

     </div>

    </div>
   `;
  }).join("");

  document.querySelectorAll("[data-mark-paid]").forEach(b=>{
   b.onclick=()=>markPaid(b.dataset.markPaid);
  });

 }catch(e){
  console.error(e);

  $("adminOrders").innerHTML=`
   <p style="color:#ef4444">
    Erreur Firebase : ${esc(e.message)}
   </p>
  `;
 }
}

async function markPaid(id){
 if(!adminAuthorized)return;

 try{
  await updateDoc(
   doc(db,"orders",id),
   {
    paymentStatus:"paid",
    paidAt:serverTimestamp()
   }
  );

  toast("Commande marquée comme payée ✅");
  renderAdmin();

 }catch(e){
  console.error(e);
  toast("Impossible de modifier la commande.");
 }
}

function setupButtons(){

 $("closeModal").onclick=closeModal;

 $("overlay").onclick=e=>{
  if(e.target===$("overlay"))closeModal();
 };

 $("cartBtn").onclick=renderCart;

 $("favoritesBtn").onclick=renderFavorites;

 $("accountBtn").onclick=renderAccount;

 $("adminBtn").onclick=openAdmin;

 $("shopBtn").onclick=()=>{
  $("shop").scrollIntoView({behavior:"smooth"});
 };

 $("novaBtn").onclick=()=>{
  $("shop").scrollIntoView({behavior:"smooth"});

  setTimeout(()=>{
   toast("NOVA100 = -10% au paiement 🎟️");
  },500);
 };

 $("search").oninput=e=>{
  searchText=e.target.value;
  renderProducts();
 };

 $("sort").onchange=e=>{
  currentSort=e.target.value;
  renderProducts();
 };
}

onAuthStateChanged(auth,user=>{
 currentUser=user;

 if(!user){
  adminAuthorized=false;
 }

 console.log(
  user
  ?`Connecté : ${user.email}`
  :"Aucun utilisateur connecté"
 );
});

function init(){
 renderCategories();
 renderProducts();
 updateBadge();
 setupButtons();

 console.log("NovaShop chargé :",products.length,"produits ✅");
}

if(document.readyState==="loading"){
 document.addEventListener("DOMContentLoaded",init);
}else{
 init();
}

window.NovaShop={
 products,
 getProduct,
 addToCart,
 removeFromCart,
 changeQty,
 toggleFavorite,
 openProduct,
 renderCart,
 renderCheckout,
 openLogin,
 openRegister,
 openAdmin,
 get cart(){return cart},
 get favorites(){return favorites},
 get user(){return currentUser}
};
