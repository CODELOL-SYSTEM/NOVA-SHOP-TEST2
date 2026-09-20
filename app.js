import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


/* =========================================================
   FIREBASE
========================================================= */

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


/* =========================================================
   CONFIG
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";

const PAYPAL_URL = "https://paypal.me/SH0PNOVA";

const TEST_CARD = "1234567890123456";
const TEST_EXPIRY = "12/42";
const TEST_CVV = "144";


/* =========================================================
   PRODUITS
========================================================= */

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


/* =========================================================
   ETAT
========================================================= */

let cart = [];
let favorites = [];
let currentUser = null;
let currentCategory = "Tous";
let currentProducts = [...products];


/* =========================================================
   OUTILS
========================================================= */

const $ = id => document.getElementById(id);

function escapeHTML(value){
  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function money(value){
  const n = Number(value);
  return Number.isFinite(n)
    ? n.toFixed(2).replace(".",",") + " €"
    : "0,00 €";
}

function toast(message){
  const el = $("toast");

  el.textContent = message;
  el.classList.add("show");

  clearTimeout(window.__toastTimer);

  window.__toastTimer = setTimeout(()=>{
    el.classList.remove("show");
  },2500);
}

function saveCart(){
  localStorage.setItem("novaCart",JSON.stringify(cart));
  updateCartCount();
}

function loadCart(){

  try{

    const raw = JSON.parse(localStorage.getItem("novaCart") || "[]");

    if(!Array.isArray(raw)){
      cart = [];
      return;
    }

    cart = raw
      .map(item => {

        const product = products.find(p => p.id === item.id);

        if(!product){
          return null;
        }

        return {
          id:product.id,
          name:product.name,
          price:Number(product.price),
          image:product.image,
          quantity:Math.max(1,Number(item.quantity) || 1)
        };

      })
      .filter(Boolean);

    saveCart();

  }catch{
    cart = [];
    saveCart();
  }
}

function loadFavorites(){

  try{

    const raw = JSON.parse(localStorage.getItem("novaFavorites") || "[]");

    favorites = Array.isArray(raw)
      ? raw.filter(id => products.some(p => p.id === id))
      : [];

  }catch{
    favorites = [];
  }
}

function saveFavorites(){
  localStorage.setItem("novaFavorites",JSON.stringify(favorites));
}


/* =========================================================
   PANIER
========================================================= */

function updateCartCount(){

  const count = cart.reduce(
    (total,item)=>total + Number(item.quantity || 0),
    0
  );

  $("cartCount").textContent = count;
}

function addToCart(id){

  const product = products.find(p => p.id === id);

  if(!product){
    toast("Produit introuvable.");
    return;
  }

  const existing = cart.find(item => item.id === id);

  if(existing){

    existing.quantity =
      Number(existing.quantity || 0) + 1;

  }else{

    cart.push({
      id:product.id,
      name:product.name,
      price:Number(product.price),
      image:product.image,
      quantity:1
    });

  }

  saveCart();

  toast("Produit ajouté au panier 🛒");
}

function changeQuantity(id,amount){

  const item = cart.find(x => x.id === id);

  if(!item){
    return;
  }

  item.quantity =
    Number(item.quantity || 1) + amount;

  if(item.quantity <= 0){

    cart = cart.filter(x => x.id !== id);

  }

  saveCart();

  showCart();
}

function cartTotal(){

  return cart.reduce(
    (sum,item)=>
      sum +
      Number(item.price || 0) *
      Number(item.quantity || 0),
    0
  );
}

function showCart(){

  if(cart.length === 0){

    openModal(`
      <h2 class="section-title">🛒 Panier</h2>
      <div class="empty">
        <div style="font-size:50px">🛒</div>
        <p>Ton panier est vide.</p>
      </div>
    `);

    return;
  }

  const html = cart.map(item => `

    <div class="cart-item">

      <img
        src="${escapeHTML(item.image)}"
        alt=""
        onerror="this.style.display='none'"
      >

      <div class="cart-item-info">

        <strong>${escapeHTML(item.name)}</strong>

        <div style="margin-top:6px;color:#65a9ff">
          ${money(item.price)}
        </div>

      </div>

      <div class="qty">

        <button data-minus="${item.id}">−</button>

        <strong>${item.quantity}</strong>

        <button data-plus="${item.id}">+</button>

      </div>

    </div>

  `).join("");

  openModal(`

    <h2 class="section-title">🛒 Panier</h2>

    ${html}

    <div class="total">
      Total : ${money(cartTotal())}
    </div>

    <button class="primary" id="checkoutBtn" style="width:100%">
      💳 Passer au paiement
    </button>

  `);

  document.querySelectorAll("[data-minus]").forEach(btn=>{
    btn.onclick = () =>
      changeQuantity(btn.dataset.minus,-1);
  });

  document.querySelectorAll("[data-plus]").forEach(btn=>{
    btn.onclick = () =>
      changeQuantity(btn.dataset.plus,1);
  });

  $("checkoutBtn").onclick = showCheckout;
}


/* =========================================================
   FAVORIS
========================================================= */

function toggleFavorite(id){

  if(favorites.includes(id)){

    favorites =
      favorites.filter(x => x !== id);

    toast("Retiré des favoris.");

  }else{

    favorites.push(id);

    toast("Ajouté aux favoris ❤️");

  }

  saveFavorites();

  renderProducts();
}

function showFavorites(){

  const list =
    products.filter(p => favorites.includes(p.id));

  if(list.length === 0){

    openModal(`
      <h2 class="section-title">❤️ Favoris</h2>
      <div class="empty">
        Aucun produit dans tes favoris.
      </div>
    `);

    return;
  }

  openModal(`
    <h2 class="section-title">❤️ Favoris</h2>
    <div class="grid" id="favoriteGrid"></div>
  `);

  const grid = $("favoriteGrid");

  grid.innerHTML = list.map(productCard).join("");

  attachProductEvents(grid);
}


/* =========================================================
   PRODUITS
========================================================= */

function productCard(p){

  const fav =
    favorites.includes(p.id);

  return `

    <article class="product">

      <button
        class="favorite ${fav ? "active" : ""}"
        data-favorite="${p.id}"
      >
        ${fav ? "♥" : "♡"}
      </button>

      <img
        class="product-image"
        src="${escapeHTML(p.image)}"
        alt="${escapeHTML(p.name)}"
        loading="lazy"
        onerror="this.src='https://via.placeholder.com/500x500?text=NovaShop'"
      >

      <div class="product-info">

        <div class="product-category">
          ${escapeHTML(p.category)}
        </div>

        <div class="product-name">
          ${escapeHTML(p.name)}
        </div>

        <div class="product-price">
          ${money(p.price)}
        </div>

        <div class="product-actions">

          <button
            class="secondary"
            data-detail="${p.id}"
          >
            Voir
          </button>

          <button
            class="primary"
            data-add="${p.id}"
          >
            🛒
          </button>

        </div>

      </div>

    </article>

  `;
}

function attachProductEvents(container=document){

  container.querySelectorAll("[data-add]").forEach(btn=>{
    btn.onclick = () =>
      addToCart(btn.dataset.add);
  });

  container.querySelectorAll("[data-favorite]").forEach(btn=>{
    btn.onclick = () =>
      toggleFavorite(btn.dataset.favorite);
  });

  container.querySelectorAll("[data-detail]").forEach(btn=>{
    btn.onclick = () =>
      showProduct(btn.dataset.detail);
  });
}

function showProduct(id){

  const p =
    products.find(x => x.id === id);

  if(!p){
    return;
  }

  openModal(`

    <div class="product-detail">

      <img
        src="${escapeHTML(p.image)}"
        alt=""
        onerror="this.src='https://via.placeholder.com/600x600?text=NovaShop'"
      >

      <div>

        <div class="product-category">
          ${escapeHTML(p.category)}
        </div>

        <h2>
          ${escapeHTML(p.name)}
        </h2>

        <div class="price">
          ${money(p.price)}
        </div>

        <button
          class="primary"
          id="detailAdd"
          style="width:100%;margin-bottom:10px"
        >
          🛒 Ajouter au panier
        </button>

        <button
          class="secondary"
          id="detailFav"
          style="width:100%"
        >
          ❤️ ${favorites.includes(p.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
        </button>

      </div>

    </div>

  `);

  $("detailAdd").onclick = () =>{
    addToCart(p.id);
  };

  $("detailFav").onclick = () =>{
    toggleFavorite(p.id);
    showProduct(p.id);
  };
}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories(){

  const categories =
    ["Tous",...new Set(products.map(p=>p.category))];

  $("categories").innerHTML =
    categories.map(cat => `

      <button
        class="category-btn ${currentCategory === cat ? "active" : ""}"
        data-category="${escapeHTML(cat)}"
      >
        ${escapeHTML(cat)}
      </button>

    `).join("");

  document.querySelectorAll("[data-category]").forEach(btn=>{
    btn.onclick = () =>{
      currentCategory = btn.dataset.category;
      renderCategories();
      renderProducts();
    };
  });
}


/* =========================================================
   RENDU
========================================================= */

function renderProducts(){

  const search =
    $("searchInput").value.trim().toLowerCase();

  let list =
    products.filter(p => {

      const categoryOK =
        currentCategory === "Tous" ||
        p.category === currentCategory;

      const searchOK =
        !search ||
        p.name.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search);

      return categoryOK && searchOK;

    });

  const sort =
    $("sortSelect").value;

  if(sort === "priceAsc"){
    list.sort((a,b)=>a.price-b.price);
  }

  if(sort === "priceDesc"){
    list.sort((a,b)=>b.price-a.price);
  }

  if(sort === "name"){
    list.sort((a,b)=>a.name.localeCompare(b.name));
  }

  currentProducts = list;

  if(list.length === 0){

    $("products").innerHTML = `
      <div class="empty">
        Aucun produit trouvé 🔎
      </div>
    `;

    return;
  }

  $("products").innerHTML =
    list.map(productCard).join("");

  attachProductEvents($("products"));
}


/* =========================================================
   MODAL
========================================================= */

function openModal(content){

  $("modalContent").innerHTML = content;

  $("modalBg").classList.add("open");
}

function closeModal(){

  $("modalBg").classList.remove("open");

  $("modalContent").innerHTML = "";
}


/* =========================================================
   AUTH
========================================================= */

function firebaseAuthMessage(error){

  switch(error?.code){

    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "❌ Email ou mot de passe incorrect.";

    case "auth/email-already-in-use":
      return "❌ Cet email possède déjà un compte.";

    case "auth/invalid-email":
      return "❌ Adresse email invalide.";

    case "auth/weak-password":
      return "❌ Le mot de passe doit contenir au moins 6 caractères.";

    case "auth/operation-not-allowed":
      return "❌ Email/mot de passe n'est pas activé dans Firebase.";

    case "auth/api-key-not-valid":
      return "❌ Clé API Firebase invalide.";

    case "auth/unauthorized-domain":
      return "❌ Ce domaine n'est pas autorisé dans Firebase Authentication.";

    case "auth/network-request-failed":
      return "❌ Problème de connexion internet.";

    default:
      return `❌ ${error?.code || "Erreur Firebase inconnue"}`;

  }
}

function showAccount(){

  if(currentUser){

    openModal(`

      <h2 class="section-title">👤 Mon compte</h2>

      <div class="account-box">

        <div style="color:#8e9bb0">
          Connecté avec :
        </div>

        <strong style="display:block;margin:8px 0 20px">
          ${escapeHTML(currentUser.email)}
        </strong>

        <button
          class="secondary"
          id="myOrdersBtn"
          style="width:100%;margin-bottom:8px"
        >
          📦 Mes commandes
        </button>

        <button
          class="danger"
          id="logoutBtn"
          style="width:100%"
        >
          Se déconnecter
        </button>

      </div>

    `);

    $("logoutBtn").onclick = async () =>{

      await signOut(auth);

      closeModal();

      toast("Déconnecté.");
    };

    $("myOrdersBtn").onclick =
      showMyOrders;

    return;
  }

  openModal(`

    <h2 class="section-title">
      👤 Connexion
    </h2>

    <div class="form">

      <input
        id="authEmail"
        type="email"
        placeholder="Email"
        autocomplete="email"
      >

      <input
        id="authPassword"
        type="password"
        placeholder="Mot de passe"
        autocomplete="current-password"
      >

      <button
        class="primary"
        id="loginBtn"
      >
        Se connecter
      </button>

      <button
        class="secondary"
        id="registerBtn"
      >
        Créer un compte
      </button>

      <div id="authError"></div>

    </div>

  `);

  $("loginBtn").onclick = async () =>{

    const email =
      $("authEmail").value.trim();

    const password =
      $("authPassword").value;

    if(!email || !password){

      $("authError").innerHTML =
        `<div class="error">❌ Remplis les deux champs.</div>`;

      return;
    }

    try{

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      closeModal();

      toast("Connexion réussie ✅");

    }catch(error){

      console.error(error);

      $("authError").innerHTML =
        `<div class="error">${firebaseAuthMessage(error)}</div>`;

    }

  };


  $("registerBtn").onclick = async () =>{

    const email =
      $("authEmail").value.trim();

    const password =
      $("authPassword").value;

    if(!email || !password){

      $("authError").innerHTML =
        `<div class="error">❌ Remplis les deux champs.</div>`;

      return;
    }

    if(password.length < 6){

      $("authError").innerHTML =
        `<div class="error">
          ❌ Le mot de passe doit contenir au moins 6 caractères.
        </div>`;

      return;
    }

    try{

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      closeModal();

      toast("Compte créé ✅");

    }catch(error){

      console.error(error);

      $("authError").innerHTML =
        `<div class="error">${firebaseAuthMessage(error)}</div>`;

    }

  };

}


/* =========================================================
   COMMANDES UTILISATEUR
========================================================= */

async function showMyOrders(){

  if(!currentUser){

    showAccount();

    return;
  }

  openModal(`
    <h2 class="section-title">📦 Mes commandes</h2>
    <div class="empty">Chargement...</div>
  `);

  try{

    const q = query(
      collection(db,"orders"),
      where("userId","==",currentUser.uid)
    );

    const snapshot =
      await getDocs(q);

    const orders =
      snapshot.docs.map(d => ({
        id:d.id,
        ...d.data()
      }));

    orders.sort((a,b)=>{

      const aTime =
        a.createdAt?.seconds || 0;

      const bTime =
        b.createdAt?.seconds || 0;

      return bTime-aTime;

    });

    if(orders.length === 0){

      $("modalContent").innerHTML = `
        <h2 class="section-title">📦 Mes commandes</h2>
        <div class="empty">
          Tu n'as encore aucune commande.
        </div>
      `;

      return;
    }

    $("modalContent").innerHTML = `

      <h2 class="section-title">
        📦 Mes commandes
      </h2>

      ${orders.map(order => `

        <div class="order-box">

          <strong>
            Commande #${escapeHTML(order.id.slice(0,8))}
          </strong>

          <div style="margin:9px 0">
            ${money(order.total)}
          </div>

          <span class="order-status ${order.status === "pending" ? "pending" : ""}">
            ${order.status === "paid" ? "PAYÉE" : "EN ATTENTE"}
          </span>

        </div>

      `).join("")}

    `;

  }catch(error){

    console.error(error);

    $("modalContent").innerHTML = `

      <h2 class="section-title">
        📦 Mes commandes
      </h2>

      <div class="error">
        ❌ Impossible de charger les commandes.
      </div>

    `;

  }
}


/* =========================================================
   CHECKOUT
========================================================= */

function showCheckout(){

  if(!currentUser){

    openModal(`

      <h2 class="section-title">
        🔐 Connexion nécessaire
      </h2>

      <div class="account-box">

        <p style="color:#aab5c5;margin-bottom:15px">
          Connecte-toi ou crée un compte avant de commander.
        </p>

        <button
          class="primary"
          id="checkoutLogin"
          style="width:100%"
        >
          👤 Se connecter
        </button>

      </div>

    `);

    $("checkoutLogin").onclick =
      showAccount;

    return;
  }

  const total = cartTotal();

  openModal(`

    <h2 class="section-title">
      💳 Paiement
    </h2>

    <div class="checkout-box">

      <div style="color:#8e9bb0">
        Total de la commande
      </div>

      <div class="total">
        ${money(total)}
      </div>

      <div class="payment-choice">

        <button id="cardChoice" class="selected">
          💳 Carte
        </button>

        <button id="paypalChoice">
          🅿️ PayPal
        </button>

      </div>

      <div id="paymentArea"></div>

    </div>

  `);

  showCardPayment();

  $("cardChoice").onclick = () =>{

    $("cardChoice").classList.add("selected");
    $("paypalChoice").classList.remove("selected");

    showCardPayment();

  };

  $("paypalChoice").onclick = () =>{

    $("paypalChoice").classList.add("selected");
    $("cardChoice").classList.remove("selected");

    showPayPalPayment();

  };

}


/* =========================================================
   PAIEMENT CARTE TEST LOCAL
========================================================= */

function showCardPayment(){

  $("paymentArea").innerHTML = `

    <div class="form">

      <input
        id="cardNumber"
        inputmode="numeric"
        placeholder="Numéro de carte"
        maxlength="19"
      >

      <input
        id="cardExpiry"
        placeholder="MM/AA"
        maxlength="5"
      >

      <input
        id="cardCVV"
        inputmode="numeric"
        placeholder="CVV"
        maxlength="3"
      >

      <button
        class="primary"
        id="payCardBtn"
      >
        Payer ${money(cartTotal())}
      </button>

      <div id="cardError"></div>

    </div>

  `;

  $("cardNumber").addEventListener("input",e=>{

    let value =
      e.target.value.replace(/\D/g,"").slice(0,16);

    value =
      value.match(/.{1,4}/g)?.join(" ") || "";

    e.target.value = value;

  });

  $("cardExpiry").addEventListener("input",e=>{

    let value =
      e.target.value.replace(/\D/g,"").slice(0,4);

    if(value.length > 2){
      value =
        value.slice(0,2) + "/" + value.slice(2);
    }

    e.target.value = value;

  });

  $("payCardBtn").onclick =
    processCardPayment;

}

async function processCardPayment(){

  const number =
    $("cardNumber").value.replace(/\s/g,"");

  const expiry =
    $("cardExpiry").value.trim();

  const cvv =
    $("cardCVV").value.trim();

  const errorBox =
    $("cardError");

  if(
    number !== TEST_CARD ||
    expiry !== TEST_EXPIRY ||
    cvv !== TEST_CVV
  ){

    errorBox.innerHTML = `
      <div class="error">
        ❌ Carte incorrecte.
      </div>
    `;

    return;
  }

  const button =
    $("payCardBtn");

  button.disabled = true;
  button.textContent = "Traitement...";

  try{

    const total = cartTotal();

    const order = {

      userId:currentUser.uid,

      email:currentUser.email,

      items:cart.map(item=>({
        id:item.id,
        name:item.name,
        price:Number(item.price),
        quantity:Number(item.quantity)
      })),

      total:Number(total.toFixed(2)),

      paymentMethod:"card-test",

      status:"paid",

      createdAt:serverTimestamp()

    };

    await addDoc(
      collection(db,"orders"),
      order
    );

    cart = [];

    saveCart();

    openModal(`

      <div style="text-align:center;padding:30px 5px">

        <div style="font-size:65px">
          ✅
        </div>

        <h2 style="margin:15px 0">
          Paiement réussi
        </h2>

        <p style="color:#8e9bb0">
          Ta commande a été enregistrée.
        </p>

        <button
          class="primary"
          id="finishOrder"
          style="margin-top:20px"
        >
          Continuer
        </button>

      </div>

    `);

    $("finishOrder").onclick =
      closeModal;

  }catch(error){

    console.error(error);

    button.disabled = false;
    button.textContent =
      `Payer ${money(cartTotal())}`;

    errorBox.innerHTML = `
      <div class="error">
        ❌ Impossible d'enregistrer la commande.
      </div>
    `;

  }

}


/* =========================================================
   PAYPAL
========================================================= */

function showPayPalPayment(){

  const total = cartTotal();

  $("paymentArea").innerHTML = `

    <div class="account-box">

      <div style="font-size:40px;text-align:center">
        🅿️
      </div>

      <p style="color:#aeb9ca;text-align:center;margin:12px 0 20px">
        Tu vas être redirigé vers PayPal pour effectuer le paiement.
      </p>

      <button
        class="primary"
        id="paypalBtn"
        style="width:100%"
      >
        Continuer avec PayPal • ${money(total)}
      </button>

    </div>

  `;

  $("paypalBtn").onclick = () =>{

    const amount =
      Number(total).toFixed(2);

    const url =
      `${PAYPAL_URL}/${amount}`;

    const popup =
      window.open(url,"_blank");

    if(!popup){

      window.location.href = url;

    }

  };

}


/* =========================================================
   DASHBOARD ADMIN
========================================================= */

function showDashboard(){

  if(
    !currentUser ||
    currentUser.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()
  ){

    openModal(`

      <h2 class="section-title">
        ⚙️ Dashboard
      </h2>

      <div class="form">

        <input
          id="adminCode"
          type="password"
          placeholder="Code administrateur"
        >

        <button
          class="primary"
          id="adminAccess"
        >
          Accéder
        </button>

        <div id="adminError"></div>

      </div>

    `);

    $("adminAccess").onclick = () =>{

      if($("adminCode").value === ADMIN_CODE){

        showAdminDashboard();

      }else{

        $("adminError").innerHTML =
          `<div class="error">❌ Code incorrect.</div>`;

      }

    };

    return;
  }

  showAdminDashboard();
}

async function showAdminDashboard(){

  openModal(`

    <h2 class="section-title">
      ⚙️ Dashboard Admin
    </h2>

    <div class="admin-box">

      <div style="color:#8e9bb0">
        Produits
      </div>

      <div class="admin-stat">
        ${products.length}
      </div>

    </div>

    <div id="adminOrders">
      <div class="empty">
        Chargement des commandes...
      </div>
    </div>

  `);

  try{

    const snapshot =
      await getDocs(collection(db,"orders"));

    const orders =
      snapshot.docs.map(d => ({
        id:d.id,
        ...d.data()
      }));

    orders.sort((a,b)=>{

      const aTime =
        a.createdAt?.seconds || 0;

      const bTime =
        b.createdAt?.seconds || 0;

      return bTime-aTime;

    });

    const paid =
      orders.filter(x=>x.status==="paid").length;

    const pending =
      orders.filter(x=>x.status!=="paid").length;

    const revenue =
      orders
        .filter(x=>x.status==="paid")
        .reduce(
          (sum,x)=>sum+Number(x.total||0),
          0
        );

    $("adminOrders").innerHTML = `

      <div class="admin-box">

        <div style="color:#8e9bb0">
          Commandes
        </div>

        <div class="admin-stat">
          ${orders.length}
        </div>

      </div>

      <div class="admin-box">

        <div style="color:#8e9bb0">
          Commandes payées
        </div>

        <div class="admin-stat">
          ${paid}
        </div>

      </div>

      <div class="admin-box">

        <div style="color:#8e9bb0">
          En attente
        </div>

        <div class="admin-stat">
          ${pending}
        </div>

      </div>

      <div class="admin-box">

        <div style="color:#8e9bb0">
          Total payé
        </div>

        <div class="admin-stat">
          ${money(revenue)}
        </div>

      </div>

      <h3 style="margin-top:25px">
        📦 Commandes
      </h3>

      ${
        orders.length
        ?
        orders.map(order=>`

          <div class="order-box">

            <strong>
              #${escapeHTML(order.id.slice(0,8))}
            </strong>

            <div style="margin:8px 0">
              ${escapeHTML(order.email || "Utilisateur")}
            </div>

            <div style="margin:8px 0">
              ${money(order.total)}
            </div>

            <span class="order-status ${order.status === "pending" ? "pending" : ""}">
              ${order.status === "paid" ? "PAYÉE" : "EN ATTENTE"}
            </span>

            ${
              order.status !== "paid"
              ?
              `
              <button
                class="primary"
                data-mark-paid="${order.id}"
                style="margin-top:12px;width:100%"
              >
                ✅ Marquer comme payée
              </button>
              `
              :
              ""
            }

          </div>

        `).join("")
        :
        `
        <div class="empty">
          Aucune commande.
        </div>
        `
      }

    `;

    document
      .querySelectorAll("[data-mark-paid]")
      .forEach(btn=>{

        btn.onclick = async () =>{

          try{

            await updateDoc(
              doc(db,"orders",btn.dataset.markPaid),
              {
                status:"paid"
              }
            );

            toast("Commande marquée comme payée ✅");

            showAdminDashboard();

          }catch(error){

            console.error(error);

            toast("Erreur lors de la modification.");

          }

        };

      });

  }catch(error){

    console.error(error);

    $("adminOrders").innerHTML = `

      <div class="error">

        ❌ Impossible de charger les commandes.

        <br><br>

        Vérifie les règles Firestore.

      </div>

    `;

  }

}


/* =========================================================
   EVENTS
========================================================= */

$("closeModal").onclick =
  closeModal;

$("modalBg").addEventListener("click",e=>{

  if(e.target === $("modalBg")){
    closeModal();
  }

});

$("cartBtn").onclick =
  showCart;

$("favoritesBtn").onclick =
  showFavorites;

$("accountBtn").onclick =
  showAccount;

$("dashboardBtn").onclick =
  showDashboard;

$("heroDashboard").onclick =
  showDashboard;

$("productsBtn").onclick = () =>{

  window.scrollTo({
    top:document.querySelector(".section-head").offsetTop - 80,
    behavior:"smooth"
  });

};

$("searchInput").addEventListener(
  "input",
  renderProducts
);

$("sortSelect").addEventListener(
  "change",
  renderProducts
);


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(auth,user=>{

  currentUser = user;

});


/* =========================================================
   START
========================================================= */

loadCart();
loadFavorites();

renderCategories();
renderProducts();
updateCartCount();


/* =========================================================
   DEBUG / GLOBAL
========================================================= */

window.NovaShop = {

  products,

  addToCart,

  showCart,

  showAccount,

  showDashboard,

  showFavorites

};

console.log("NovaShop chargé ✅");
console.log("Produits :",products.length);
