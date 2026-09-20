import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


/* =========================
   FIREBASE
========================= */

const firebaseConfig = {
  apiKey: "AIzaSyAZ5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe0b1aede48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


/* =========================
   CONFIG
========================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";

const PAYPAL_BASE = "https://paypal.me/SH0PNOVA";

const DEMO_CARD = {
  number: "3254 3765 2821 1834",
  expiry: "02/14",
  cvv: "534"
};

const ORDER_STATUSES = [
  "En cours de préparation",
  "Acceptée",
  "Annulée",
  "En transit",
  "Proche de la livraison",
  "Livrée",
  "En cours de remboursement",
  "Remboursée"
];

const PAYMENT_STATUSES = [
  "En attente",
  "Payée",
  "Remboursée"
];


/* =========================
   PRODUITS
========================= */

const products = [
  {
    id:"p1",
    name:"Gigabyte B650 AORUS Elite AX",
    category:"Composants",
    price:189.99,
    image:"https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"
  },
  {
    id:"p2",
    name:"PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category:"PC Gamer",
    price:2237.65,
    image:"https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png"
  },
  {
    id:"p3",
    name:"HyperX Cloud II",
    category:"Casques",
    price:49.99,
    image:"https://fr.hyperx.com/cdn/shop/files/hyperx_cloud_ii_red_1_main.jpg?v=1764129756"
  },
  {
    id:"p4",
    name:"TECORS Clavier Gamer Mécanique 60% AZERTY",
    category:"Claviers",
    price:30,
    image:"https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg"
  },
  {
    id:"p5",
    name:"Clavier Magnétique 65% Celshading Noir",
    category:"Claviers",
    price:120.90,
    image:"https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832"
  },
  {
    id:"p6",
    name:"Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category:"Souris",
    price:49.99,
    image:"https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif"
  },
  {
    id:"p7",
    name:"Logitech G PRO X2 Superstrike Blanc et Noir",
    category:"Souris",
    price:150.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg"
  },
  {
    id:"p8",
    name:"Samsung 990 PRO 1TB",
    category:"Stockage",
    price:249.99,
    image:"https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg"
  },
  {
    id:"p9",
    name:"Samsung 990 PRO 2TB",
    category:"Stockage",
    price:199.93,
    image:"https://pc.comparer.fr/500x500/310191422.webp"
  },
  {
    id:"p10",
    name:"CORSAIR RM1000x EU",
    category:"Alimentations",
    price:159.90,
    image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp"
  },
  {
    id:"p11",
    name:"CORSAIR RM850x EU",
    category:"Alimentations",
    price:134.90,
    image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp"
  },
  {
    id:"p12",
    name:"Corsair Frame 5000D RS ARGB Noir",
    category:"Boîtiers",
    price:159.90,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg"
  },
  {
    id:"p13",
    name:"ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category:"Refroidissement",
    price:129.90,
    image:"https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg"
  },
  {
    id:"p14",
    name:"Samsung 27 QD-OLED Odyssey G6",
    category:"Écrans",
    price:399.95,
    image:"https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg"
  },
  {
    id:"p15",
    name:"ELGATO Wave Mic Arm Pro",
    category:"Streaming",
    price:229.90,
    image:"https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg"
  },
  {
    id:"p16",
    name:"Sony DualSense Cosmic Red PS5/PC",
    category:"Manettes",
    price:74.90,
    image:"https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg"
  },
  {
    id:"p17",
    name:"ASUS TUF Gaming B650-PLUS",
    category:"Composants",
    price:179.90,
    image:"https://media.materiel.net/r550/products/MN0005986139.jpg"
  },
  {
    id:"p18",
    name:"MSI MAG B650 Tomahawk WiFi",
    category:"Composants",
    price:189.90,
    image:"https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg"
  },
  {
    id:"p19",
    name:"KOORUI Ecran PC Gamer 27 Pouces 200Hz IPS QHD HDR400 1ms",
    category:"Écrans",
    price:74.99,
    image:"https://m.media-amazon.com/images/I/71CJ1DF-8sL._AC_SL1500_.jpg"
  },
  {
    id:"p20",
    name:'iiyama 23.8" LED - G-Master GB2471HS-B1 Red Eagle',
    category:"Écrans",
    price:65.99,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/34/20/LD0006342033.jpg"
  },
  {
    id:"p21",
    name:"SONGMICS Chaise de jeu ergonomique avec repose-pieds 150 kg gris ardoise",
    category:"Chaises gaming",
    price:129.99,
    image:"https://static.songmics.fr/fit-in/1000x1000/image/Product/B34OBG077G01/B34OBG077G01-1.jpg"
  },
  {
    id:"p22",
    name:"Dowinx Série Luxe Suède LS-66D68E Blanc",
    category:"Chaises gaming",
    price:79.99,
    image:"https://eu.dowinx.com/cdn/shop/files/11_5f72b693-5f79-4d06-b48a-7cb2b2f0244a.png?v=1752139814&width=1220"
  },
  {
    id:"p23",
    name:"Chaise GTPLAYER Ergonomique Gaming Soutien Lombaire Repose-pieds",
    category:"Chaises gaming",
    price:109.99,
    image:"https://thumb.pccomponentes.com/w-530-530/articles/1118/11186247/167-silla-gaming-gtplayer-ergonomica-con-reposapies-y-soporte-lumbar-4d.jpg"
  },
  {
    id:"p24",
    name:"Desk Lite - Height-Adjustable Desk",
    category:"Bureaux gaming",
    price:110.99,
    image:"https://yaasa.com/cdn/shop/files/yaasa-desk-lite_nr01_black_100_01-04545-01_1200x.jpg?v=1753169928"
  },
  {
    id:"p25",
    name:"EUREKA ERGONOMIC Bureau Gaming LED 182x76cm en Forme d'Aile",
    category:"Bureaux gaming",
    price:86.99,
    image:"https://m.media-amazon.com/images/I/71Gd5G3wRsL._AC_SL1500_.jpg"
  },
  {
    id:"p26",
    name:"Bureau gaming d’angle HOMCOM réversible support écran",
    category:"Bureaux gaming",
    price:44.99,
    image:"https://cdn.manomano.com/pim-media/images/medium/74eca1cb1cefa063c8f600ee293ae6ee826794f8.jpg"
  },
  {
    id:"p27",
    name:"Logitech G Pro X 2 Lightspeed Noir + Repose casque",
    category:"Casques",
    price:99.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/6d/e9/6e/24045933/1540-1/tsp20260429154901/Casque-PC-gaming-sans-fil-Logitech-G-Pro-X-2-Lightspeed-Noir-Repose-casque.jpg"
  },
  {
    id:"p28",
    name:"Razer BlackShark V2 Pro 2023 Noir",
    category:"Casques",
    price:75.99,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/07/71/LD0006077125.jpg"
  },
  {
    id:"p29",
    name:"beyerdynamic DT-990 Pro 250 Ohm",
    category:"Casques",
    price:60.99,
    image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_10/106865/18443258_800.jpg"
  },
  {
    id:"p30",
    name:"Logitech PRO X TKL Rapid Noir, filaire AZERTY",
    category:"Claviers",
    price:78.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/6a/89/8f/26184042/1540-1.jpg"
  },
  {
    id:"p31",
    name:"QwertyKey75 HE Striker, Magnetic Hall Effect, Rapid Trigger, Snap Tap",
    category:"Claviers",
    price:56.99,
    image:"https://cdn.shopify.com/s/files/1/0814/2530/1746/files/QK75-HE-STRIKER-qwertykey-tastatura-mecanica-gaming-hotswap-2025_1eee355b-72ca-46e6-a458-751384d0595c_1800x.webp?v=1771799537"
  },
  {
    id:"p32",
    name:"GravaStar Mercury K1 Clavier Gamer sans Fil en Aluminium, Noir Dégradé",
    category:"Claviers",
    price:91.99,
    image:"https://m.media-amazon.com/images/I/6144lt2l5JL._AC_SL1200_.jpg"
  },
  {
    id:"p33",
    name:"ATTACK SHARK R11 Ultra, fibre de carbone, 8000Hz, 49g, 42000 DPI",
    category:"Souris",
    price:26.99,
    image:"https://m.media-amazon.com/images/I/71bMz15SqcL._AC_SL1500_.jpg"
  },
  {
    id:"p34",
    name:"HyperX QuadCast 2 – Microphone USB – RGB",
    category:"Microphones",
    price:98.99,
    image:"https://fr.hyperx.com/cdn/shop/files/hyperx_quadcast_2_872v1aa_main_1_2d47a555-f537-457b-9002-8b9e9010dc00.jpg?v=1763067608"
  },
  {
    id:"p35",
    name:"Shure SM7 dB",
    category:"Microphones",
    price:121.99,
    image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_57/573672/18492412_800.jpg"
  },
  {
    id:"p36",
    name:"Razer Seiren V3 Chroma Noir",
    category:"Microphones",
    price:13.99,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/13/25/LD0006132588.jpg"
  },
  {
    id:"p37",
    name:"Stairville LED Pixel Rail 40 RGB MKII",
    category:"Éclairage RGB",
    price:18.90,
    image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449739/14448905_800.jpg"
  },
  {
    id:"p38",
    name:"Govee LED Strip Light RGBIC Wi-Fi + Bluetooth 5m Matter",
    category:"Éclairage RGB",
    price:8,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/ab/7a/9d/27097771/1520-2/tsp20260429155350/Ruban-LED-Govee-LED-Strip-Light-RGBIC-Wi-Fi-avec-BT-5M-Matter.jpg"
  },
  {
    id:"p39",
    name:"Lampe de plafond hexagone nid d’abeille LED 2.4m x 4.8m contour bleu",
    category:"Éclairage RGB",
    price:91.10,
    image:"https://www.discount-autosport.com/wp-content/webp-express/webp-images/uploads/2025/02/lampe-hexagone-plafond-led-4m80-contour-bleu-.jpg.webp"
  },
  {
    id:"p40",
    name:"GIGABYTE GeForce RTX 5050 WINDFORCE OC 8G",
    category:"Cartes graphiques",
    price:147,
    image:"https://m.media-amazon.com/images/I/41kmHFMFPOL._SL500_.jpg"
  },
  {
    id:"p41",
    name:"MSI GeForce RTX 3050 LP E 6G OC",
    category:"Cartes graphiques",
    price:100,
    image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTCe_rha_tAAHPWnQ8VV7GIvF-uSqUaEyU61TSnwgM4CK8g3-x_3Hq4wOgH36Ri63eAiWHsvhmRJHzVrUQR9-IwMx31WH0w"
  },
  {
    id:"p42",
    name:"ASUS Dual Radeon RX 7600 EVO OC Edition 8GB GDDR6",
    category:"Cartes graphiques",
    price:140,
    image:"https://m.media-amazon.com/images/I/81QItJufypL._AC_SL1500_.jpg"
  },
  {
    id:"p43",
    name:"PC Gamer Fixe, Ryzen 7 5700G, Vega 8, 16G DDR4, 1T SSD",
    category:"PC Gamer",
    price:650,
    image:"https://m.media-amazon.com/images/I/81M3iU5S4QL._AC_SL1500_.jpg",
    new:true
  }
];


/* =========================
   AVIS
========================= */

const reviewNames = [
  "Lucas","Hugo","Noah","Adam","Louis",
  "Nathan","Tom","Enzo","Léo","Ethan",
  "Mathis","Maxime","Théo","Jules","Alex",
  "Arthur","Gabriel","Raphaël","Sacha","Liam"
];

const reviewTexts = [
  "Produit reçu rapidement et conforme.",
  "Très bon produit pour mon setup.",
  "La qualité est vraiment correcte.",
  "Commande simple et produit bien emballé.",
  "Très satisfait de mon achat.",
  "Le produit correspond aux photos.",
  "Bon rapport qualité prix.",
  "Tout fonctionne parfaitement.",
  "Livraison et commande nickel.",
  "Je recommande ce produit."
];

products.forEach((product,index)=>{
  product.rating =
    Math.round((3.1 + ((index * 17) % 20) / 10) * 10) / 10;

  product.reviews =
    321 + ((index * 911) % (9782 - 321 + 1));
});


const demoBuyers = [];

for(let i=0;i<100;i++){

  const product = products[i % products.length];

  const rating =
    Math.round(
      (3.1 + ((i * 13) % 20) / 10) * 10
    ) / 10;

  demoBuyers.push({
    name:reviewNames[i % reviewNames.length],
    product:product.name,
    rating,
    text:reviewTexts[i % reviewTexts.length],
    date:`${String((i % 28)+1).padStart(2,"0")}/09/2026`
  });
}


/* =========================
   ETAT
========================= */

let currentUser = null;
let cart = loadCart();
let favorites = loadFavorites();

let currentCategory = "Tous";
let currentSearch = "";
let currentSort = "default";
let minRating = 3.1;
let minReviews = 321;
let maxReviews = 9782;

let selectedPayment = "card";

let dashboardOrders = [];


/* =========================
   LOCAL STORAGE
========================= */

function loadCart(){

  try{

    const raw =
      JSON.parse(localStorage.getItem("novaCart") || "[]");

    if(!Array.isArray(raw)) return [];

    return raw
      .map(item=>({
        id:item.id,
        qty:Math.max(1,Number(item.qty)||1)
      }))
      .filter(item=>products.some(p=>p.id===item.id));

  }catch{
    return [];
  }
}


function saveCart(){
  localStorage.setItem("novaCart",JSON.stringify(cart));
}


function loadFavorites(){

  try{

    const raw =
      JSON.parse(localStorage.getItem("novaFavorites") || "[]");

    if(!Array.isArray(raw)) return [];

    return raw.filter(id=>products.some(p=>p.id===id));

  }catch{
    return [];
  }
}


function saveFavorites(){
  localStorage.setItem(
    "novaFavorites",
    JSON.stringify(favorites)
  );
}


/* =========================
   UTIL
========================= */

function money(value){
  return Number(value || 0).toLocaleString(
    "fr-FR",
    {
      style:"currency",
      currency:"EUR"
    }
  );
}


function escapeHTML(value){

  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}


function toast(message){

  const el = document.getElementById("toast");

  el.textContent = message;
  el.classList.add("show");

  clearTimeout(window.novaToastTimer);

  window.novaToastTimer =
    setTimeout(()=>{
      el.classList.remove("show");
    },2500);
}


function openModal(title,content){

  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalContent").innerHTML = content;
  document.getElementById("modal").classList.add("show");

  document.body.style.overflow="hidden";
}


function closeModal(){

  document.getElementById("modal").classList.remove("show");

  document.body.style.overflow="";
}


function starsHTML(rating){

  const rounded = Math.round(rating);

  return Array.from({length:5},(_,i)=>
    `<span>${i < rounded ? "★" : "☆"}</span>`
  ).join("");
}


/* =========================
   CATEGORIES
========================= */

function renderCategories(){

  const categories = [
    "Tous",
    ...new Set(products.map(p=>p.category))
  ];

  document.getElementById("categories").innerHTML =
    categories.map(category=>`
      <button
        class="category-btn ${currentCategory===category ? "active":""}"
        data-category="${escapeHTML(category)}">
        ${escapeHTML(category)}
      </button>
    `).join("");
}


/* =========================
   PRODUITS
========================= */

function getFilteredProducts(){

  let list = [...products];

  if(currentCategory !== "Tous"){
    list =
      list.filter(p=>p.category===currentCategory);
  }

  if(currentSearch.trim()){

    const q =
      currentSearch.toLowerCase().trim();

    list =
      list.filter(p=>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
  }

  list =
    list.filter(p=>
      p.rating >= minRating &&
      p.reviews >= minReviews &&
      p.reviews <= maxReviews
    );

  if(currentSort==="priceAsc"){
    list.sort((a,b)=>a.price-b.price);
  }

  if(currentSort==="priceDesc"){
    list.sort((a,b)=>b.price-a.price);
  }

  if(currentSort==="ratingDesc"){
    list.sort((a,b)=>b.rating-a.rating);
  }

  if(currentSort==="reviewsDesc"){
    list.sort((a,b)=>b.reviews-a.reviews);
  }

  return list;
}


function renderProducts(){

  const container =
    document.getElementById("products");

  const list =
    getFilteredProducts();

  document.getElementById("productResultText").textContent =
    `${list.length} produit${list.length>1?"s":""}`;

  if(!list.length){

    container.innerHTML =
      `<div class="empty" style="grid-column:1/-1">
        Aucun produit ne correspond aux filtres.
      </div>`;

    return;
  }

  container.innerHTML =
    list.map(product=>{

      const favorite =
        favorites.includes(product.id);

      return `
        <article class="product">

          <div class="product-img">

            ${product.new
              ? `<div class="new-badge">NOUVEAU</div>`
              : ""}

            <button
              class="fav ${favorite?"active":""}"
              data-fav="${product.id}">
              ${favorite?"♥":"♡"}
            </button>

            <img
              src="${product.image}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              onerror="this.style.display='none'"
            >

          </div>

          <div class="product-body">

            <div class="product-cat">
              ${escapeHTML(product.category)}
            </div>

            <div class="product-name">
              ${escapeHTML(product.name)}
            </div>

            <div class="rating">
              ${starsHTML(product.rating)}
              <span>${product.rating.toFixed(1)}</span>
              <small>
                • ${product.reviews.toLocaleString("fr-FR")} avis
              </small>
            </div>

            <div class="price">
              ${money(product.price)}
            </div>

            <div class="product-actions">
              <button
                class="btn"
                data-view="${product.id}">
                Voir
              </button>

              <button
                class="btn primary"
                data-add="${product.id}">
                Ajouter
              </button>
            </div>

            <button
              class="btn review-button"
              data-reviews="${product.id}">
              + Voir les avis
            </button>

          </div>

        </article>
      `;

    }).join("");
}


/* =========================
   PANIER
========================= */

function cartCount(){

  return cart.reduce(
    (sum,item)=>sum+(Number(item.qty)||0),
    0
  );
}


function updateCartCount(){

  document.getElementById("cartCount").textContent =
    cartCount();
}


function addToCart(id,qty=1){

  const product =
    products.find(p=>p.id===id);

  if(!product){
    toast("Produit introuvable.");
    return;
  }

  const existing =
    cart.find(item=>item.id===id);

  if(existing){
    existing.qty += qty;
  }else{
    cart.push({
      id,
      qty:Math.max(1,qty)
    });
  }

  saveCart();
  updateCartCount();

  toast("✅ Produit ajouté au panier.");
}


function removeFromCart(id){

  cart =
    cart.filter(item=>item.id!==id);

  saveCart();
  updateCartCount();
  showCart();
}


function changeQty(id,delta){

  const item =
    cart.find(x=>x.id===id);

  if(!item) return;

  item.qty += delta;

  if(item.qty<=0){
    cart =
      cart.filter(x=>x.id!==id);
  }

  saveCart();
  updateCartCount();
  showCart();
}


function cartTotal(){

  return cart.reduce((sum,item)=>{

    const product =
      products.find(p=>p.id===item.id);

    if(!product) return sum;

    return sum +
      Number(product.price || 0) *
      Number(item.qty || 0);

  },0);
}


function showCart(){

  if(!cart.length){

    openModal(
      "Panier",
      `<div class="empty">
        🛒<br><br>
        Ton panier est vide.
        <br><br>
        <button class="btn primary" id="modalProductsBtn">
          Voir les produits
        </button>
      </div>`
    );

    return;
  }

  const items =
    cart.map(item=>{

      const p =
        products.find(x=>x.id===item.id);

      if(!p) return "";

      return `
        <div class="cart-item">

          <img src="${p.image}" alt="">

          <div class="cart-item-info">
            <strong>${escapeHTML(p.name)}</strong>
            <span style="color:#8fa1b8">
              ${money(p.price)}
            </span>

            <div style="display:flex;gap:6px;margin-top:7px">
              <button
                class="btn cart-minus"
                data-cart-minus="${p.id}">
                −
              </button>

              <button class="btn">
                ${item.qty}
              </button>

              <button
                class="btn cart-plus"
                data-cart-plus="${p.id}">
                +
              </button>
            </div>
          </div>

          <button
            class="btn danger"
            data-cart-remove="${p.id}">
            🗑️
          </button>

        </div>
      `;

    }).join("");

  openModal(
    "Panier",
    `
      ${items}

      <div class="cart-total">
        <span>Total</span>
        <span>${money(cartTotal())}</span>
      </div>

      <button
        class="btn primary"
        id="checkoutBtn"
        style="width:100%;margin-top:18px">
        Passer au paiement
      </button>
    `
  );
}


/* =========================
   PRODUIT DETAIL
========================= */

function openProduct(id){

  const p =
    products.find(x=>x.id===id);

  if(!p) return;

  openModal(
    "Produit",
    `
      <div class="product-detail">

        <div class="detail-img">
          <img
            src="${p.image}"
            alt="${escapeHTML(p.name)}">
        </div>

        <div class="detail-info">

          <div class="product-cat">
            ${escapeHTML(p.category)}
          </div>

          <h2>${escapeHTML(p.name)}</h2>

          <div class="rating">
            ${starsHTML(p.rating)}
            ${p.rating.toFixed(1)}
            <small>
              • ${p.reviews.toLocaleString("fr-FR")} avis
            </small>
          </div>

          <div class="price">
            ${money(p.price)}
          </div>

          <p class="description">
            Produit disponible sur NovaShop.
            Consulte les avis et ajoute-le à ton panier.
          </p>

          <div class="quantity">
            <button id="detailMinus">−</button>
            <span id="detailQty">1</span>
            <button id="detailPlus">+</button>
          </div>

          <button
            class="btn primary"
            id="detailAdd"
            style="width:100%">
            Ajouter au panier
          </button>

          <button
            class="btn"
            id="detailReviews"
            style="width:100%;margin-top:8px">
            + Voir les avis
          </button>

        </div>

      </div>
    `
  );

  let qty=1;

  document.getElementById("detailMinus")
    .onclick=()=>{
      qty=Math.max(1,qty-1);
      document.getElementById("detailQty").textContent=qty;
    };

  document.getElementById("detailPlus")
    .onclick=()=>{
      qty++;
      document.getElementById("detailQty").textContent=qty;
    };

  document.getElementById("detailAdd")
    .onclick=()=>{
      addToCart(p.id,qty);
      closeModal();
    };

  document.getElementById("detailReviews")
    .onclick=()=>{
      showReviews(p.id);
    };
}


/* =========================
   AVIS
========================= */

function showReviews(productId=null){

  const product =
    productId
      ? products.find(p=>p.id===productId)
      : null;

  let list;

  if(product){

    list =
      demoBuyers.filter(
        (_,index)=>
          products[index % products.length].id===product.id
      );

    while(list.length<10){

      list.push({
        name:
          reviewNames[list.length % reviewNames.length],
        product:product.name,
        rating:product.rating,
        text:
          reviewTexts[list.length % reviewTexts.length],
        date:"2026"
      });
    }

  }else{

    list=demoBuyers;

  }

  openModal(
    product
      ? `Avis • ${product.name}`
      : "Avis NovaShop",
    `
      <div style="text-align:center;margin-bottom:18px">

        <div style="font-size:30px;color:#ffc857">
          ★★★★★
        </div>

        <h2 style="margin:8px 0">
          ${product ? product.rating.toFixed(1) : "4,7"} / 5
        </h2>

        <p style="color:#8fa1b8">
          ${product
            ? product.reviews.toLocaleString("fr-FR")
            : "81 591"} avis
        </p>

      </div>

      <div class="review-list">

        ${list.map(review=>`

          <div class="review">

            <div class="review-top">

              <strong>
                ${escapeHTML(review.name)}
              </strong>

              <span class="review-stars">
                ${starsHTML(review.rating)}
              </span>

            </div>

            <small>
              Achat : ${escapeHTML(review.product)}
              • ${escapeHTML(review.date)}
            </small>

            <p>
              ${escapeHTML(review.text)}
            </p>

          </div>

        `).join("")}

      </div>

      ${!product ? `
        <p style="text-align:center;color:#70839c;margin-top:15px">
          100 acheteurs de démonstration affichés dans cette présentation.
        </p>
      `:""}
    `
  );
}


/* =========================
   CHECKOUT
========================= */

function showCheckout(){

  if(!currentUser){

    openModal(
      "Connexion nécessaire",
      `
        <div class="empty">
          Tu dois être connecté pour commander.
          <br><br>
          <button class="btn primary" id="openLoginFromCheckout">
            Se connecter
          </button>
        </div>
      `
    );

    return;
  }

  openModal(
    "Paiement",
    `
      <div style="display:grid;gap:18px">

        <div>
          <h3>Récapitulatif</h3>
          <p style="color:#8fa1b8;margin-top:6px">
            ${cartCount()} article${cartCount()>1?"s":""}
            • ${money(cartTotal())}
          </p>
        </div>

        <div class="checkout-form">

          <input
            id="shipName"
            placeholder="Nom complet">

          <input
            id="shipAddress"
            placeholder="Adresse">

          <input
            id="shipCity"
            placeholder="Ville">

          <input
            id="shipPostcode"
            placeholder="Code postal">

        </div>

        <div class="payment-methods">

          <button
            class="payment-choice active"
            data-payment="card">
            💳 CB<br>
            <small style="color:#8fa1b8">
              Paiement de démonstration
            </small>
          </button>

          <button
            class="payment-choice"
            data-payment="paypal">
            🅿️ PayPal<br>
            <small style="color:#8fa1b8">
              Paiement externe
            </small>
          </button>

        </div>

        <div id="cardPaymentBox">

          <div class="cb-demo" style="margin-bottom:18px">

            <div class="cb-chip"></div>

            <div class="cb-number">
              •••• •••• •••• ••••
            </div>

            <div class="cb-bottom">
              <span>EXPIRATION<br>••/••</span>
              <span>CVV<br>•••</span>
            </div>

            <div class="cb-brand">
              NOVA
            </div>

          </div>

          <div class="card-fields">

            <div class="full">
              <label>Numéro de carte</label>
              <input
                id="cardNumber"
                inputmode="numeric"
                maxlength="19"
                placeholder="•••• •••• •••• ••••">
            </div>

            <div>
              <label>Expiration</label>
              <input
                id="cardExpiry"
                maxlength="5"
                placeholder="••/••">
            </div>

            <div>
              <label>CVV</label>
              <input
                id="cardCVV"
                inputmode="numeric"
                maxlength="3"
                type="password"
                placeholder="•••">
            </div>

          </div>

          <button
            class="btn primary"
            id="payCardBtn"
            style="width:100%;margin-top:15px">
            Payer ${money(cartTotal())}
          </button>

        </div>

        <div id="paypalPaymentBox" style="display:none">

          <div class="info-card">
            <h3>🅿️ PayPal</h3>
            <p>
              Tu seras redirigé vers la page PayPal NovaShop.
            </p>
          </div>

          <button
            class="btn primary"
            id="payPaypalBtn"
            style="width:100%;margin-top:15px">
            Continuer vers PayPal
          </button>

        </div>

      </div>
    `
  );

  selectedPayment="card";

  document.querySelectorAll(".payment-choice")
    .forEach(button=>{

      button.onclick=()=>{

        selectedPayment =
          button.dataset.payment;

        document.querySelectorAll(".payment-choice")
          .forEach(x=>x.classList.remove("active"));

        button.classList.add("active");

        document.getElementById("cardPaymentBox")
          .style.display =
            selectedPayment==="card"
              ? "block"
              : "none";

        document.getElementById("paypalPaymentBox")
          .style.display =
            selectedPayment==="paypal"
              ? "block"
              : "none";
      };

    });

  document.getElementById("payCardBtn")
    .onclick=processCardPayment;

  document.getElementById("payPaypalBtn")
    .onclick=processPayPalPayment;
}


/* =========================
   CREATION COMMANDE
========================= */

function getShippingAddress(){

  return {
    name:
      document.getElementById("shipName")?.value.trim() || "",
    address:
      document.getElementById("shipAddress")?.value.trim() || "",
    city:
      document.getElementById("shipCity")?.value.trim() || "",
    postcode:
      document.getElementById("shipPostcode")?.value.trim() || ""
  };
}


function getOrderItems(){

  return cart.map(item=>{

    const p =
      products.find(x=>x.id===item.id);

    return {
      id:p.id,
      name:p.name,
      price:Number(p.price),
      qty:Number(item.qty)
    };

  });
}


async function processCardPayment(){

  if(!currentUser){

    toast("Connecte-toi d'abord.");
    return;
  }

  const address =
    getShippingAddress();

  if(
    !address.name ||
    !address.address ||
    !address.city ||
    !address.postcode
  ){

    toast("❌ Complète l'adresse.");
    return;
  }

  const number =
    document.getElementById("cardNumber")
      ?.value
      .trim();

  const expiry =
    document.getElementById("cardExpiry")
      ?.value
      .trim();

  const cvv =
    document.getElementById("cardCVV")
      ?.value
      .trim();

  /*
    IMPORTANT :
    La comparaison est locale uniquement.
    Les valeurs ne sont jamais enregistrées
    dans Firestore.
  */

  if(
    number !== DEMO_CARD.number ||
    expiry !== DEMO_CARD.expiry ||
    cvv !== DEMO_CARD.cvv
  ){

    toast("❌ Carte incorrecte");
    return;
  }

  const total =
    cartTotal();

  const orderData = {

    userId:currentUser.uid,

    email:currentUser.email,

    items:getOrderItems(),

    total:Number(total.toFixed(2)),

    paymentMethod:"Carte",

    paymentStatus:"Payée",

    status:"En cours de préparation",

    trackingLocation:"Entrepôt NovaShop",

    durationSeconds:3600,

    durationUpdatedAt:Timestamp.now(),

    shippingAddress:address,

    createdAt:serverTimestamp()

  };

  try{

    const ref =
      await addDoc(
        collection(db,"orders"),
        orderData
      );

    cart=[];

    saveCart();
    updateCartCount();

    openModal(
      "Commande confirmée",
      `
        <div class="empty">

          <div style="font-size:55px">✅</div>

          <h2>Commande enregistrée</h2>

          <p style="color:#8fa1b8;margin:10px 0">
            Paiement par CB confirmé.
          </p>

          <p>
            ID :
            <strong>${escapeHTML(ref.id)}</strong>
          </p>

          <br>

          <button
            class="btn primary"
            id="myOrdersAfterPayment">
            Mes commandes
          </button>

        </div>
      `
    );

    document.getElementById("myOrdersAfterPayment")
      .onclick=showMyOrders;

  }catch(error){

    console.error(error);

    toast(
      "❌ Erreur commande : " +
      (error.code || "Firebase")
    );
  }
}


async function processPayPalPayment(){

  if(!currentUser){

    toast("Connecte-toi d'abord.");
    return;
  }

  const address =
    getShippingAddress();

  if(
    !address.name ||
    !address.address ||
    !address.city ||
    !address.postcode
  ){

    toast("❌ Complète l'adresse.");
    return;
  }

  const total =
    cartTotal();

  const paypalUrl =
    `${PAYPAL_BASE}/${total.toFixed(2)}`;

  /*
    Ouverture immédiate pour éviter
    le blocage des popups sur mobile.
  */

  const popup =
    window.open(
      paypalUrl,
      "_blank"
    );

  if(!popup){
    window.location.href=paypalUrl;
  }

  try{

    await addDoc(
      collection(db,"orders"),
      {

        userId:currentUser.uid,

        email:currentUser.email,

        items:getOrderItems(),

        total:Number(total.toFixed(2)),

        paymentMethod:"PayPal",

        paymentStatus:"En attente",

        status:"En cours de préparation",

        trackingLocation:"Entrepôt NovaShop",

        durationSeconds:3600,

        durationUpdatedAt:Timestamp.now(),

        shippingAddress:address,

        createdAt:serverTimestamp()

      }
    );

    cart=[];

    saveCart();
    updateCartCount();

    toast("Commande créée. Paiement PayPal en attente.");

  }catch(error){

    console.error(error);

    toast(
      "Commande PayPal non enregistrée : " +
      (error.code || "erreur")
    );
  }
}


/* =========================
   COMPTE
========================= */

function firebaseAuthMessage(error){

  switch(error?.code){

    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "❌ Email ou mot de passe incorrect.";

    case "auth/email-already-in-use":
      return "❌ Cet email possède déjà un compte.";

    case "auth/invalid-email":
      return "❌ Email invalide.";

    case "auth/weak-password":
      return "❌ Mot de passe trop faible.";

    case "auth/operation-not-allowed":
      return "❌ Active Email/Password dans Firebase Authentication.";

    case "auth/unauthorized-domain":
      return "❌ Ajoute codelol-system.github.io dans les domaines autorisés Firebase.";

    default:
      return `❌ ${error?.code || "Erreur Firebase"}`;
  }
}


function showAccount(){

  if(currentUser){

    openModal(
      "Mon compte",
      `
        <div class="info-card">

          <h3>👤 ${escapeHTML(currentUser.email)}</h3>

          <p style="margin-top:10px">
            Connecté à NovaShop.
          </p>

          <div style="display:grid;gap:9px;margin-top:18px">

            <button
              class="btn primary"
              id="accountOrders">
              📦 Mes commandes
            </button>

            <button
              class="btn"
              id="accountFavorites">
              ❤️ Mes favoris
            </button>

            <button
              class="btn"
              id="accountDashboard">
              ⚙️ Dashboard
            </button>

            <button
              class="btn danger"
              id="logoutBtn">
              Se déconnecter
            </button>

          </div>

        </div>
      `
    );

    document.getElementById("accountOrders")
      .onclick=showMyOrders;

    document.getElementById("accountFavorites")
      .onclick=showFavorites;

    document.getElementById("accountDashboard")
      .onclick=showDashboard;

    document.getElementById("logoutBtn")
      .onclick=async()=>{

        await signOut(auth);
        closeModal();
        toast("Déconnecté.");
      };

    return;
  }

  openLoginModal();
}


function openLoginModal(){

  openModal(
    "Compte NovaShop",
    `
      <div class="auth-tabs">

        <button
          class="btn primary auth-tab"
          id="loginTab">
          Connexion
        </button>

        <button
          class="btn auth-tab"
          id="signupTab">
          Inscription
        </button>

      </div>

      <form class="auth-form" id="authForm">

        <input
          id="authEmail"
          type="email"
          placeholder="Email"
          required>

        <input
          id="authPassword"
          type="password"
          placeholder="Mot de passe"
          required>

        <button
          class="btn primary"
          type="submit"
          id="authSubmit">
          Se connecter
        </button>

        <div
          id="authMessage"
          style="color:#ff7381">
        </div>

      </form>
    `
  );

  let mode="login";

  const tabLogin =
    document.getElementById("loginTab");

  const tabSignup =
    document.getElementById("signupTab");

  const submit =
    document.getElementById("authSubmit");

  tabLogin.onclick=()=>{

    mode="login";

    tabLogin.classList.add("primary");
    tabSignup.classList.remove("primary");

    submit.textContent="Se connecter";
  };

  tabSignup.onclick=()=>{

    mode="signup";

    tabSignup.classList.add("primary");
    tabLogin.classList.remove("primary");

    submit.textContent="Créer mon compte";
  };

  document.getElementById("authForm")
    .onsubmit=async event=>{

      event.preventDefault();

      const email =
        document.getElementById("authEmail")
          .value.trim();

      const password =
        document.getElementById("authPassword")
          .value;

      const message =
        document.getElementById("authMessage");

      try{

        if(mode==="login"){

          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

        }else{

          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        }

        closeModal();

        toast("✅ Compte connecté.");

      }catch(error){

        message.textContent =
          firebaseAuthMessage(error);
      }

    };
}


/* =========================
   MES COMMANDES
========================= */

function getTimestampMs(value){

  if(!value) return null;

  if(typeof value.toMillis==="function"){
    return value.toMillis();
  }

  if(typeof value.seconds==="number"){
    return value.seconds*1000;
  }

  return null;
}


function getRemainingSeconds(order){

  const total =
    Math.max(
      0,
      Number(order.durationSeconds)||0
    );

  const updated =
    getTimestampMs(order.durationUpdatedAt);

  if(!updated){
    return total;
  }

  const elapsed =
    (Date.now()-updated)/1000;

  return Math.max(
    0,
    Math.ceil(total-elapsed)
  );
}


function formatDuration(seconds){

  seconds =
    Math.max(
      0,
      Math.floor(Number(seconds)||0)
    );

  const h =
    Math.floor(seconds/3600);

  const m =
    Math.floor((seconds%3600)/60);

  const s =
    seconds%60;

  if(h>0){
    return `${h}h ${String(m).padStart(2,"0")}m ${String(s).padStart(2,"0")}s`;
  }

  return `${m}m ${String(s).padStart(2,"0")}s`;
}


async function getOrdersForCurrentUser(){

  if(!currentUser) return [];

  const snapshot =
    await getDocs(
      collection(db,"orders")
    );

  return snapshot.docs
    .map(d=>({
      id:d.id,
      ...d.data()
    }))
    .filter(order=>
      order.userId===currentUser.uid
    )
    .sort(
      (a,b)=>
        (getTimestampMs(b.createdAt)||0) -
        (getTimestampMs(a.createdAt)||0)
    );
}


function customerOrderHTML(order){

  const remaining =
    getRemainingSeconds(order);

  const items =
    (order.items||[])
      .map(item=>
        `${escapeHTML(item.name)} × ${item.qty}`
      )
      .join("<br>");

  const address =
    order.shippingAddress || {};

  return `
    <div
      class="order-admin"
      data-customer-countdown="${order.id}"
      data-end-ms="${Date.now()+remaining*1000}">

      <div class="order-head">

        <div>
          <div class="order-id">
            #${escapeHTML(order.id)}
          </div>

          <h3>
            ${escapeHTML(order.status || "Commande")}
          </h3>

          <p style="color:#8fa1b8">
            📍 ${escapeHTML(
              order.trackingLocation ||
              "Localisation inconnue"
            )}
          </p>
        </div>

        <div>
          <div class="order-total">
            ${money(order.total)}
          </div>

          <div style="color:#8fa1b8">
            ${escapeHTML(
              order.paymentMethod || "Paiement"
            )}
            •
            ${escapeHTML(
              order.paymentStatus || "En attente"
            )}
          </div>
        </div>

      </div>

      <div style="margin-top:15px">
        ⏱️
        <span
          class="countdown"
          data-customer-countdown-value="${order.id}">
          ${formatDuration(remaining)}
        </span>
      </div>

      <div class="order-items">
        ${items}
        <br><br>
        📍 ${escapeHTML(address.address || "")}
        ${escapeHTML(address.postcode || "")}
        ${escapeHTML(address.city || "")}
      </div>

    </div>
  `;
}


async function showMyOrders(){

  if(!currentUser){

    openLoginModal();
    return;
  }

  try{

    const orders =
      await getOrdersForCurrentUser();

    if(!orders.length){

      openModal(
        "Mes commandes",
        `
          <div class="empty">
            📦<br><br>
            Aucune commande pour le moment.
          </div>
        `
      );

      return;
    }

    openModal(
      "Mes commandes",
      orders.map(customerOrderHTML).join("")
    );

    startCustomerCountdowns();

  }catch(error){

    console.error(error);

    toast(
      "❌ Impossible de charger les commandes."
    );
  }
}


function startCustomerCountdowns(){

  clearInterval(window.customerCountdownTimer);

  window.customerCountdownTimer =
    setInterval(()=>{

      document
        .querySelectorAll("[data-customer-countdown-value]")
        .forEach(el=>{

          const id =
            el.dataset.customerCountdownValue;

          const wrapper =
            document.querySelector(
              `[data-customer-countdown="${id}"]`
            );

          if(!wrapper) return;

          const end =
            Number(wrapper.dataset.endMs);

          const remaining =
            Math.max(
              0,
              Math.ceil(
                (end-Date.now())/1000
              )
            );

          el.textContent =
            formatDuration(remaining);

        });

    },1000);
}


/* =========================
   FAVORIS
========================= */

function toggleFavorite(id){

  if(favorites.includes(id)){

    favorites =
      favorites.filter(x=>x!==id);

    toast("Retiré des favoris.");

  }else{

    favorites.push(id);

    toast("❤️ Ajouté aux favoris.");
  }

  saveFavorites();
  renderProducts();
}


function showFavorites(){

  const list =
    products.filter(
      p=>favorites.includes(p.id)
    );

  if(!list.length){

    openModal(
      "Mes favoris",
      `
        <div class="empty">
          ❤️<br><br>
          Aucun favori.
        </div>
      `
    );

    return;
  }

  openModal(
    "Mes favoris",
    `
      <div class="products">
        ${list.map(p=>`

          <article class="product">

            <div class="product-img">
              <img src="${p.image}">
            </div>

            <div class="product-body">

              <div class="product-name">
                ${escapeHTML(p.name)}
              </div>

              <div class="price">
                ${money(p.price)}
              </div>

              <button
                class="btn primary"
                data-favorite-view="${p.id}">
                Voir
              </button>

            </div>

          </article>

        `).join("")}
      </div>
    `
  );
}


/* =========================
   DASHBOARD
========================= */

function isAdmin(){

  return currentUser &&
    currentUser.email?.toLowerCase() ===
    ADMIN_EMAIL.toLowerCase();
}


async function showDashboard(){

  if(!currentUser){

    openLoginModal();
    return;
  }

  if(!isAdmin()){

    const code =
      prompt("Code administrateur :");

    if(code!==ADMIN_CODE){

      toast("❌ Code administrateur incorrect.");
      return;
    }
  }

  await loadDashboard();
}


async function loadDashboard(){

  try{

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );

    dashboardOrders =
      snapshot.docs
        .map(d=>({
          id:d.id,
          ...d.data()
        }))
        .sort(
          (a,b)=>
            (getTimestampMs(b.createdAt)||0) -
            (getTimestampMs(a.createdAt)||0)
        );

    renderDashboard();

  }catch(error){

    console.error(error);

    openModal(
      "Dashboard",
      `
        <div class="empty">

          ❌ Impossible de charger les commandes.

          <br><br>

          <small>
            ${escapeHTML(
              error.code || error.message || "Erreur Firebase"
            )}
          </small>

        </div>
      `
    );
  }
}


function adminOrderHTML(order){

  const remaining =
    getRemainingSeconds(order);

  const paymentMethod =
    order.paymentMethod || "Inconnu";

  const paymentStatus =
    order.paymentStatus || "En attente";

  const address =
    order.shippingAddress || {};

  const items =
    (order.items||[])
      .map(item=>
        `${escapeHTML(item.name)} × ${item.qty}`
      )
      .join("<br>");

  return `
    <div
      class="order-admin"
      data-admin-order="${order.id}">

      <div class="order-head">

        <div>

          <div class="order-id">
            #${escapeHTML(order.id)}
          </div>

          <h3>
            ${escapeHTML(order.email || "Client")}
          </h3>

          <p style="color:#8fa1b8">
            ${escapeHTML(
              order.status ||
              "En cours de préparation"
            )}
          </p>

        </div>

        <div>

          <div class="order-total">
            ${money(order.total)}
          </div>

          <div style="color:#8fa1b8">
            ${escapeHTML(paymentMethod)}
            •
            ${escapeHTML(paymentStatus)}
          </div>

        </div>

      </div>

      <!-- CB DU DASHBOARD -->

      ${paymentMethod==="Carte" ? `

        <div
          style="
            margin-top:18px;
            padding-top:18px;
            border-top:1px solid #1d304c;
          ">

          <h3 style="margin-bottom:12px">
            CB
          </h3>

          <div class="cb-demo">

            <div class="cb-chip"></div>

            <div class="cb-number">
              ${DEMO_CARD.number}
            </div>

            <div class="cb-bottom">

              <span>
                EXPIR<br>
                ${DEMO_CARD.expiry}
              </span>

              <span>
                CVV<br>
                ${DEMO_CARD.cvv}
              </span>

            </div>

            <div class="cb-brand">
              NOVA
            </div>

          </div>

        </div>

      ` : ""}

      <div class="admin-grid">

        <div class="admin-field">

          <label>Statut</label>

          <select data-status>
            ${ORDER_STATUSES.map(status=>`
              <option
                ${status===(order.status || ORDER_STATUSES[0]) ? "selected":""}>
                ${escapeHTML(status)}
              </option>
            `).join("")}
          </select>

        </div>

        <div class="admin-field">

          <label>Paiement</label>

          <select data-payment-status>
            ${PAYMENT_STATUSES.map(status=>`
              <option
                ${status===paymentStatus ? "selected":""}>
                ${escapeHTML(status)}
              </option>
            `).join("")}
          </select>

        </div>

        <div class="admin-field">

          <label>Localisation du colis</label>

          <input
            data-location
            value="${escapeHTML(
              order.trackingLocation ||
              "Entrepôt NovaShop"
            )}">

          <div class="tracking-presets">

            <button data-preset-location="Entrepôt NovaShop">
              Entrepôt
            </button>

            <button data-preset-location="Centre de tri">
              Centre de tri
            </button>

            <button data-preset-location="Aéroport de Paris">
              Aéroport
            </button>

            <button data-preset-location="Agence locale">
              Agence locale
            </button>

            <button data-preset-location="Chez le livreur">
              Livreur
            </button>

          </div>

        </div>

        <div class="admin-field">

          <label>Durée</label>

          <div style="display:grid;grid-template-columns:1fr 110px;gap:7px">

            <input
              type="number"
              min="0"
              data-duration
              value="${Math.max(
                0,
                Math.ceil(remaining/60)
              )}">

            <select data-duration-unit>

              <option value="minutes">
                Minutes
              </option>

              <option value="seconds">
                Secondes
              </option>

              <option value="hours">
                Heures
              </option>

            </select>

          </div>

        </div>

        <div class="admin-field admin-full">

          <label>Compte à rebours</label>

          <div
            class="countdown"
            data-admin-countdown="${order.id}"
            data-end-ms="${Date.now()+remaining*1000}">
            ${formatDuration(remaining)}
          </div>

        </div>

        <div class="admin-field admin-full">

          <label>Adresse de livraison</label>

          <div style="color:#aebdd0;line-height:1.6">
            ${escapeHTML(address.name || "")}<br>
            ${escapeHTML(address.address || "")}<br>
            ${escapeHTML(address.postcode || "")}
            ${escapeHTML(address.city || "")}
          </div>

        </div>

        <div class="admin-field admin-full">

          <label>Produits commandés</label>

          <div class="order-items">
            ${items || "Aucun produit"}
          </div>

        </div>

      </div>

      <div class="admin-actions">

        <button
          class="btn success"
          data-save-order="${order.id}">
          💾 Enregistrer
        </button>

        <button
          class="btn danger"
          data-delete-order="${order.id}">
          🗑️ Supprimer
        </button>

      </div>

    </div>
  `;
}


function renderDashboard(){

  const orders =
    dashboardOrders;

  const paid =
    orders.filter(
      o=>o.paymentStatus==="Payée"
    );

  const pending =
    orders.filter(
      o=>o.paymentStatus==="En attente"
    );

  const refunds =
    orders.filter(
      o=>
        o.paymentStatus==="Remboursée" ||
        o.status==="Remboursée"
    );

  const revenue =
    paid.reduce(
      (sum,o)=>
        sum+Number(o.total||0),
      0
    );

  openModal(
    "Dashboard",
    `

      <div class="dashboard-stats">

        <div class="stat">
          <small>Commandes</small>
          <strong>${orders.length}</strong>
        </div>

        <div class="stat">
          <small>Payées</small>
          <strong>${paid.length}</strong>
        </div>

        <div class="stat">
          <small>En attente</small>
          <strong>${pending.length}</strong>
        </div>

        <div class="stat">
          <small>CA</small>
          <strong>${money(revenue)}</strong>
        </div>

      </div>

      <div style="
        background:#0d1829;
        border:1px solid #1d304c;
        border-radius:15px;
        padding:16px;
        margin-bottom:18px;
      ">

        <h3>⭐ Avis du site</h3>

        <div style="font-size:28px;color:#ffc857;margin:7px 0">
          ★★★★★
        </div>

        <div style="font-size:28px;font-weight:900">
          81 591 avis
        </div>

        <button
          class="btn primary"
          id="dashboardReviewsBtn"
          style="margin-top:10px">
          + Voir les avis
        </button>

      </div>

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:12px;
      ">

        <h2>Commandes</h2>

        <span style="color:#8fa1b8">
          ${refunds.length} remboursement${refunds.length>1?"s":""}
        </span>

      </div>

      ${
        orders.length
        ? orders.map(adminOrderHTML).join("")
        : `
          <div class="empty">
            Aucune commande.
          </div>
        `
      }

    `
  );

  document.getElementById("dashboardReviewsBtn")
    ?.addEventListener(
      "click",
      ()=>showReviews()
    );

  startAdminCountdowns();
}


function getDurationSeconds(container){

  const value =
    Math.max(
      0,
      Number(
        container.querySelector("[data-duration]")?.value
      ) || 0
    );

  const unit =
    container.querySelector(
      "[data-duration-unit]"
    )?.value;

  if(unit==="seconds"){
    return Math.round(value);
  }

  if(unit==="hours"){
    return Math.round(value*3600);
  }

  return Math.round(value*60);
}


async function saveOrderChanges(orderId){

  const container =
    document.querySelector(
      `[data-admin-order="${orderId}"]`
    );

  if(!container) return;

  const status =
    container.querySelector("[data-status]")
      ?.value;

  const paymentStatus =
    container.querySelector("[data-payment-status]")
      ?.value;

  const location =
    container.querySelector("[data-location]")
      ?.value.trim();

  const durationSeconds =
    getDurationSeconds(container);

  try{

    await updateDoc(
      doc(db,"orders",orderId),
      {

        status,

        paymentStatus,

        trackingLocation:
          location || "Localisation inconnue",

        durationSeconds,

        durationUpdatedAt:
          Timestamp.now()

      }
    );

    toast("✅ Commande mise à jour.");

    await loadDashboard();

  }catch(error){

    console.error(error);

    toast(
      "❌ Erreur : " +
      (error.code || "permission-denied")
    );
  }
}


async function deleteOrder(orderId){

  const ok =
    confirm(
      "Supprimer définitivement cette commande ?"
    );

  if(!ok) return;

  try{

    await deleteDoc(
      doc(db,"orders",orderId)
    );

    toast("🗑️ Commande supprimée.");

    await loadDashboard();

  }catch(error){

    console.error(error);

    toast(
      "❌ Impossible de supprimer : " +
      (error.code || "erreur")
    );
  }
}


function startAdminCountdowns(){

  clearInterval(window.adminCountdownTimer);

  window.adminCountdownTimer =
    setInterval(()=>{

      document
        .querySelectorAll("[data-admin-countdown]")
        .forEach(el=>{

          const end =
            Number(el.dataset.endMs);

          const remaining =
            Math.max(
              0,
              Math.ceil(
                (end-Date.now())/1000
              )
            );

          el.textContent =
            formatDuration(remaining);

        });

    },1000);
}


/* =========================
   SCROLL
========================= */

function scrollToId(id){

  document.getElementById(id)
    ?.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });
}


/* =========================
   EVENTS
========================= */

document.addEventListener("click",event=>{

  const target =
    event.target.closest("button");

  if(!target) return;


  /* PRODUITS */

  if(target.id==="productsBtn"){
    scrollToId("productsSection");
    return;
  }

  if(target.id==="homeBtn"){
    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
    return;
  }

  if(target.id==="footerProducts"){
    scrollToId("productsSection");
    return;
  }


  /* CATEGORIES */

  if(target.dataset.category){

    currentCategory =
      target.dataset.category;

    renderCategories();
    renderProducts();

    scrollToId("productsSection");

    return;
  }


  /* VIEW */

  if(target.dataset.view){

    openProduct(
      target.dataset.view
    );

    return;
  }


  /* FAVORITE */

  if(target.dataset.fav){

    toggleFavorite(
      target.dataset.fav
    );

    return;
  }


  /* ADD */

  if(target.dataset.add){

    addToCart(
      target.dataset.add
    );

    return;
  }


  /* PRODUCT REVIEWS */

  if(target.dataset.reviews){

    showReviews(
      target.dataset.reviews
    );

    return;
  }


  /* FAVORITE MODAL */

  if(target.dataset.favoriteView){

    openProduct(
      target.dataset.favoriteView
    );

    return;
  }


  /* CART */

  if(target.id==="cartBtn"){

    showCart();
    return;
  }


  if(target.dataset.cartMinus){

    changeQty(
      target.dataset.cartMinus,
      -1
    );

    return;
  }


  if(target.dataset.cartPlus){

    changeQty(
      target.dataset.cartPlus,
      +1
    );

    return;
  }


  if(target.dataset.cartRemove){

    removeFromCart(
      target.dataset.cartRemove
    );

    return;
  }


  if(target.id==="checkoutBtn"){

    showCheckout();
    return;
  }


  if(target.id==="modalProductsBtn"){

    closeModal();
    scrollToId("productsSection");
    return;
  }


  /* ACCOUNT */

  if(target.id==="accountBtn"){

    showAccount();
    return;
  }


  /* DASHBOARD */

  if(target.id==="dashboardBtn"){

    showDashboard();
    return;
  }


  if(target.id==="accountDashboard"){

    showDashboard();
    return;
  }


  /* ORDERS */

  if(target.id==="accountOrders"){

    showMyOrders();
    return;
  }


  /* FAVORITES */

  if(target.id==="favoritesBtn"){

    showFavorites();
    return;
  }


  /* REVIEWS */

  if(
    target.id==="heroReviewsBtn" ||
    target.id==="heroReviewsBtn2" ||
    target.id==="allReviewsBtn" ||
    target.id==="footerReviews"
  ){

    showReviews();
    return;
  }


  /* FAQ */

  if(target.classList.contains("faq-question")){

    const item =
      target.closest(".faq-item");

    item.classList.toggle("open");

    return;
  }


  if(target.id==="footerFaq"){

    scrollToId("faq");
    return;
  }


  /* REFUND */

  if(target.id==="footerRefund"){

    scrollToId("refund");
    return;
  }


  if(target.id==="refundAccountBtn"){

    showAccount();
    return;
  }


  /* ADMIN SAVE */

  if(target.dataset.saveOrder){

    saveOrderChanges(
      target.dataset.saveOrder
    );

    return;
  }


  /* ADMIN DELETE */

  if(target.dataset.deleteOrder){

    deleteOrder(
      target.dataset.deleteOrder
    );

    return;
  }


  /* ADMIN LOCATION */

  if(target.dataset.presetLocation){

    const container =
      target.closest("[data-admin-order]");

    const input =
      container?.querySelector("[data-location]");

    if(input){

      input.value =
        target.dataset.presetLocation;
    }

    return;
  }


  /* CLOSE */

  if(target.id==="closeModal"){

    closeModal();
    return;
  }

});


/* =========================
   MODAL OUTSIDE CLICK
========================= */

document.getElementById("modal")
  .addEventListener("click",event=>{

    if(event.target.id==="modal"){
      closeModal();
    }

  });


/* =========================
   SEARCH
========================= */

document.getElementById("searchInput")
  .addEventListener("input",event=>{

    currentSearch =
      event.target.value;

    renderProducts();

  });


/* =========================
   SORT
========================= */

document.getElementById("sortSelect")
  .addEventListener("change",event=>{

    currentSort =
      event.target.value;

    renderProducts();

  });


/* =========================
   RATING
========================= */

document.getElementById("ratingFilter")
  .addEventListener("change",event=>{

    minRating =
      Number(event.target.value);

    renderProducts();

  });


/* =========================
   REVIEWS FILTER
========================= */

document.getElementById("minReviewsFilter")
  .addEventListener("input",event=>{

    minReviews =
      Math.max(
        321,
        Math.min(
          9782,
          Number(event.target.value)||321
        )
      );

    if(minReviews>maxReviews){

      maxReviews=minReviews;

      document.getElementById(
        "maxReviewsFilter"
      ).value=maxReviews;
    }

    renderProducts();

  });


document.getElementById("maxReviewsFilter")
  .addEventListener("input",event=>{

    maxReviews =
      Math.max(
        321,
        Math.min(
          9782,
          Number(event.target.value)||9782
        )
      );

    if(maxReviews<minReviews){

      minReviews=maxReviews;

      document.getElementById(
        "minReviewsFilter"
      ).value=minReviews;
    }

    renderProducts();

  });


/* =========================
   AUTH STATE
========================= */

onAuthStateChanged(
  auth,
  user=>{

    currentUser=user;

    const accountButton =
      document.getElementById("accountBtn");

    if(user){

      accountButton.textContent =
        "👤 " +
        (
          user.email === ADMIN_EMAIL
            ? "Admin"
            : "Compte"
        );

    }else{

      accountButton.textContent =
        "👤 Compte";
    }

  }
);


/* =========================
   INIT
========================= */

renderCategories();
renderProducts();
updateCartCount();

console.log(
  "NovaShop chargé.",
  products.length,
  "produits."
);
