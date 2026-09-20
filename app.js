import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSyAZ5vAkAEfIbLyhxG0o7uvNdJ67KYKWD0",
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
const ADMIN_ACCESS_KEY = "novaAdminAuthorized";

const FALLBACK_IMAGE =
  "https://placehold.co/800x800/111827/ffffff?text=NovaShop";


/* =========================================================
   DOM
========================================================= */

const $ = id => document.getElementById(id);

const searchInput = $("searchInput");
const categoriesEl = $("categories");
const productsGrid = $("productGrid");
const cartBtn = $("cartBtn");
const cartBadge = $("cartBadge");
const cartOverlay = $("overlay");
const cartDrawer = $("cartDrawer");
const cartClose = $("closeCart");
const cartItems = $("cartItems");
const cartTotal = $("cartTotal");
const checkoutBtn = $("checkoutBtn");
const settingsBtn = $("settingsBtn");
const accountBtn = $("accountBtn");
const ordersBtn = $("ordersBtn");
const adminBtn = $("adminBtn");
const modal = $("modalLayer");
const modalContent = $("modalContent");
const modalClose = $("modalClose");
const modalTitle = $("modalTitle");
const toastContainer = $("toast");
const heroCartBtn = $("heroCartBtn");
const sortSelect = $("sortSelect");


/* =========================================================
   PRODUCTS
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
    name:"iiyama 23.8 LED - G-Master GB2471HS-B1 Red Eagle",
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
   STATE
========================================================= */

let currentUser = null;
let selectedCategory = "Tous";
let searchValue = "";
let sortValue = "default";
let cart = [];
let reviewsCache = {};

try {
  cart = JSON.parse(localStorage.getItem("novaCart") || "[]");
  if (!Array.isArray(cart)) cart = [];
} catch {
  cart = [];
}


/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(value){
  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function escapeAttribute(value){
  return escapeHTML(value);
}

function money(value){
  const n = Number(value) || 0;
  if(n === 0) return "Gratuit";
  return n.toLocaleString("fr-FR",{
    style:"currency",
    currency:"EUR"
  });
}

function saveCart(){
  localStorage.setItem("novaCart",JSON.stringify(cart));
}

function toast(message){
  if(!toastContainer) return;

  const item = document.createElement("div");
  item.className = "toast-item";
  item.textContent = message;

  toastContainer.appendChild(item);

  setTimeout(()=>{
    item.remove();
  },3200);
}

function showModal(title,html){
  modalTitle.textContent = title;
  modalContent.innerHTML = html;
  modal.classList.add("show");
}

function closeModal(){
  modal.classList.remove("show");
}

function openCart(){
  cartOverlay.classList.add("show");
  cartDrawer.classList.add("open");
}

function closeCart(){
  cartOverlay.classList.remove("show");
  cartDrawer.classList.remove("open");
}

function starsHTML(rating){
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5-full);
}

function randomRating(productId){
  if(reviewsCache[productId]) return reviewsCache[productId];

  let hash = 0;

  for(const char of productId){
    hash = ((hash << 5) - hash) + char.charCodeAt(0);
    hash |= 0;
  }

  const rating = 4 + (Math.abs(hash) % 11) / 10;
  reviewsCache[productId] = Math.min(5,Number(rating.toFixed(1)));

  return reviewsCache[productId];
}

function productById(id){
  return products.find(p => p.id === id);
}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories(){

  const categories = [
    "Tous",
    ...new Set(products.map(p => p.category))
  ];

  categoriesEl.innerHTML = categories.map(category => `
    <button
      class="category ${selectedCategory === category ? "active" : ""}"
      data-category="${escapeAttribute(category)}"
    >
      ${escapeHTML(category)}
    </button>
  `).join("");
}


/* =========================================================
   PRODUCTS
========================================================= */

function filteredProducts(){

  let list = products.filter(product => {

    const categoryOK =
      selectedCategory === "Tous" ||
      product.category === selectedCategory;

    const text =
      `${product.name} ${product.category}`.toLowerCase();

    const searchOK =
      !searchValue ||
      text.includes(searchValue.toLowerCase());

    return categoryOK && searchOK;
  });

  if(sortValue === "priceAsc"){
    list.sort((a,b)=>a.price-b.price);
  }

  if(sortValue === "priceDesc"){
    list.sort((a,b)=>b.price-a.price);
  }

  if(sortValue === "name"){
    list.sort((a,b)=>a.name.localeCompare(b.name,"fr"));
  }

  return list;
}

function renderProducts(){

  const list = filteredProducts();

  if(!list.length){
    productsGrid.innerHTML = `
      <div class="empty">
        😕 Aucun produit trouvé.
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = list.map(product => {

    const rating = randomRating(product.id);

    return `
      <article class="product" data-id="${escapeAttribute(product.id)}">

        ${product.new ? `<span class="new-badge">NOUVEAU</span>` : ""}

        <img
          class="product-img"
          src="${escapeAttribute(product.image)}"
          alt="${escapeAttribute(product.name)}"
          loading="lazy"
          onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
        >

        <div class="product-body">

          <div class="product-cat">
            ${escapeHTML(product.category)}
          </div>

          <h3>${escapeHTML(product.name)}</h3>

          <div class="rating">
            <span class="stars">${starsHTML(rating)}</span>
            ${rating.toFixed(1)}/5
          </div>

          <div class="price">
            ${money(product.price)}
          </div>

          <div class="product-actions">
            <button class="view-btn" data-id="${product.id}">
              Voir
            </button>

            <button class="add-btn" data-id="${product.id}">
              Ajouter
            </button>
          </div>

        </div>
      </article>
    `;
  }).join("");
}


/* =========================================================
   PRODUCT MODAL
========================================================= */

function openProduct(productId){

  const product = productById(productId);

  if(!product) return;

  const rating = randomRating(product.id);

  showModal(
    product.name,
    `
      <div class="product-modal">

        <img
          src="${escapeAttribute(product.image)}"
          alt="${escapeAttribute(product.name)}"
          onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
        >

        <div>

          <div class="product-cat">
            ${escapeHTML(product.category)}
          </div>

          <h1 style="margin:10px 0">
            ${escapeHTML(product.name)}
          </h1>

          <div class="rating">
            ${starsHTML(rating)}
            ${rating.toFixed(1)}/5
          </div>

          <div class="price">
            ${money(product.price)}
          </div>

          <p class="muted">
            Produit disponible sur NovaShop.
          </p>

          <div class="actions-row">
            <button class="primary" id="modalAddProduct">
              🛒 Ajouter au panier
            </button>
          </div>

        </div>

      </div>
    `
  );

  $("modalAddProduct").onclick = ()=>{
    addToCart(product.id);
    closeModal();
    openCart();
  };
}


/* =========================================================
   CART
========================================================= */

function cartDetailed(){

  return cart
    .map(item => {

      const product = productById(item.id);

      if(!product) return null;

      return {
        ...product,
        qty:Math.max(1,Number(item.qty)||1)
      };
    })
    .filter(Boolean);
}

function addToCart(id){

  const product = productById(id);

  if(!product) return;

  const existing = cart.find(item => item.id === id);

  if(existing){
    existing.qty++;
  }else{
    cart.push({
      id,
      qty:1
    });
  }

  saveCart();
  renderCart();

  toast(`${product.name} ajouté au panier 🛒`);
}

function updateCartQty(id,delta){

  const item = cart.find(x => x.id === id);

  if(!item) return;

  item.qty += delta;

  if(item.qty <= 0){
    cart = cart.filter(x => x.id !== id);
  }

  saveCart();
  renderCart();
}

function removeFromCart(id){

  cart = cart.filter(x => x.id !== id);

  saveCart();
  renderCart();
}

function renderCart(){

  const items = cartDetailed();

  const count = items.reduce(
    (sum,item)=>sum+item.qty,
    0
  );

  cartBadge.textContent = count;

  if(!items.length){

    cartItems.innerHTML = `
      <div class="empty">
        🛒 Ton panier est vide.
      </div>
    `;

    cartTotal.textContent = money(0);
    return;
  }

  let total = 0;

  cartItems.innerHTML = items.map(item => {

    total += item.price * item.qty;

    return `
      <div class="cart-item">

        <img
          src="${escapeAttribute(item.image)}"
          alt=""
          onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
        >

        <div>

          <div class="cart-name">
            ${escapeHTML(item.name)}
          </div>

          <div class="cart-price">
            ${money(item.price * item.qty)}
          </div>

          <div class="qty">

            <button
              data-action="minus"
              data-id="${item.id}"
            >−</button>

            <b>${item.qty}</b>

            <button
              data-action="plus"
              data-id="${item.id}"
            >+</button>

            <button
              class="remove"
              data-action="remove"
              data-id="${item.id}"
            >Supprimer</button>

          </div>

        </div>

      </div>
    `;
  }).join("");

  cartTotal.textContent = money(total);
}


/* =========================================================
   AUTH ERROR
========================================================= */

function authError(error){

  const code = error?.code || "";

  const messages = {

    "auth/email-already-in-use":
      "Cette adresse e-mail possède déjà un compte.",

    "auth/invalid-email":
      "L'adresse e-mail n'est pas valide.",

    "auth/weak-password":
      "Le mot de passe est trop faible.",

    "auth/password-does-not-meet-requirements":
      "Le mot de passe ne respecte pas les exigences.",

    "auth/user-not-found":
      "Aucun compte ne correspond à cette adresse.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/invalid-credential":
      "E-mail ou mot de passe incorrect.",

    "auth/invalid-login-credentials":
      "E-mail ou mot de passe incorrect.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard.",

    "auth/network-request-failed":
      "Problème de connexion Internet.",

    "auth/operation-not-allowed":
      "La connexion e-mail/mot de passe n'est pas activée dans Firebase.",

    "auth/unauthorized-domain":
      "Ce domaine n'est pas autorisé dans Firebase Authentication.",

    "auth/api-key-not-valid":
      "La clé Firebase n'est pas valide.",

    "auth/app-not-authorized":
      "Cette application n'est pas autorisée par Firebase."
  };

  return messages[code] ||
    `Erreur Firebase : ${code || error?.message || "erreur inconnue"}`;
}


/* =========================================================
   ACCOUNT
========================================================= */

function openAccount(){

  if(currentUser){

    showModal(
      "👤 Mon compte",
      `
        <div class="admin-card">

          <h3>Connecté</h3>

          <p class="muted" style="margin-top:8px">
            ${escapeHTML(currentUser.email)}
          </p>

          <div class="actions-row">

            <button
              class="primary"
              id="logoutBtn"
            >
              Se déconnecter
            </button>

            <button
              class="secondary"
              id="accountOrdersBtn"
            >
              📦 Mes commandes
            </button>

          </div>

        </div>
      `
    );

    $("logoutBtn").onclick = async ()=>{

      try{
        await signOut(auth);
        closeModal();
        toast("Déconnexion réussie.");
      }catch(error){
        toast(authError(error));
      }
    };

    $("accountOrdersBtn").onclick = ()=>{
      closeModal();
      openOrders();
    };

    return;
  }

  showLoginForm();
}

function showLoginForm(){

  showModal(
    "👤 Compte NovaShop",
    `
      <div class="auth-tabs">
        <button class="primary" id="loginTab">
          Connexion
        </button>

        <button class="secondary" id="registerTab">
          Créer un compte
        </button>
      </div>

      <div id="authForm"></div>
    `
  );

  renderLoginForm();

  $("loginTab").onclick = renderLoginForm;
  $("registerTab").onclick = renderRegisterForm;
}

function renderLoginForm(){

  $("authForm").innerHTML = `
    <div class="checkout-section">

      <div class="field">
        <label>E-mail</label>
        <input id="authEmail" type="email" autocomplete="email">
      </div>

      <br>

      <div class="field">
        <label>Mot de passe</label>
        <input id="authPassword" type="password" autocomplete="current-password">
      </div>

      <div id="authError" style="margin-top:12px"></div>

      <div class="actions-row">
        <button class="primary" id="loginSubmit">
          Se connecter
        </button>
      </div>

    </div>
  `;

  $("loginSubmit").onclick = async ()=>{

    const email = $("authEmail").value.trim();
    const password = $("authPassword").value;

    if(!email || !password){
      $("authError").innerHTML =
        `<small class="error">Remplis tous les champs.</small>`;
      return;
    }

    const btn = $("loginSubmit");

    btn.disabled = true;
    btn.textContent = "Connexion...";

    try{

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      closeModal();
      toast("Connexion réussie ✅");

    }catch(error){

      $("authError").innerHTML =
        `<small class="error">${escapeHTML(authError(error))}</small>`;

      btn.disabled = false;
      btn.textContent = "Se connecter";
    }
  };
}

function renderRegisterForm(){

  $("authForm").innerHTML = `
    <div class="checkout-section">

      <div class="field">
        <label>E-mail</label>
        <input id="authEmail" type="email" autocomplete="email">
      </div>

      <br>

      <div class="field">
        <label>Mot de passe</label>
        <input
          id="authPassword"
          type="password"
          autocomplete="new-password"
        >
      </div>

      <br>

      <div class="field">
        <label>Confirmer le mot de passe</label>
        <input
          id="authPassword2"
          type="password"
          autocomplete="new-password"
        >
      </div>

      <div id="authError" style="margin-top:12px"></div>

      <div class="actions-row">
        <button class="primary" id="registerSubmit">
          Créer mon compte
        </button>
      </div>

    </div>
  `;

  $("registerSubmit").onclick = async ()=>{

    const email = $("authEmail").value.trim();
    const password = $("authPassword").value;
    const password2 = $("authPassword2").value;

    const errorBox = $("authError");

    if(!email || !password || !password2){
      errorBox.innerHTML =
        `<small class="error">Remplis tous les champs.</small>`;
      return;
    }

    if(password !== password2){
      errorBox.innerHTML =
        `<small class="error">Les mots de passe sont différents.</small>`;
      return;
    }

    const btn = $("registerSubmit");

    btn.disabled = true;
    btn.textContent = "Création...";

    try{

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      closeModal();
      toast("Compte créé avec succès ✅");

    }catch(error){

      errorBox.innerHTML =
        `<small class="error">${escapeHTML(authError(error))}</small>`;

      btn.disabled = false;
      btn.textContent = "Créer mon compte";
    }
  };
}


/* =========================================================
   SETTINGS
========================================================= */

function getTheme(){

  const saved = localStorage.getItem("novaThemeChoice");

  if(saved === "light" || saved === "dark"){
    return saved;
  }

  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme:light)").matches
      ? "light"
      : "dark";
}

function applyTheme(){

  document.body.classList.toggle(
    "light",
    getTheme() === "light"
  );
}

function openSettings(){

  showModal(
    "⚙️ Paramètres",
    `
      <div class="checkout-section">

        <h3>Apparence</h3>

        <div class="actions-row">

          <button class="primary" id="darkTheme">
            🌙 Sombre
          </button>

          <button class="secondary" id="lightTheme">
            ☀️ Claire
          </button>

          <button class="secondary" id="autoTheme">
            🖥️ Automatique
          </button>

        </div>

      </div>
    `
  );

  $("darkTheme").onclick = ()=>{
    localStorage.setItem("novaThemeChoice","dark");
    applyTheme();
    toast("Thème sombre activé 🌙");
  };

  $("lightTheme").onclick = ()=>{
    localStorage.setItem("novaThemeChoice","light");
    applyTheme();
    toast("Thème clair activé ☀️");
  };

  $("autoTheme").onclick = ()=>{
    localStorage.removeItem("novaThemeChoice");
    applyTheme();
    toast("Thème automatique activé 🖥️");
  };
}


/* =========================================================
   CHECKOUT
========================================================= */

function validateAddress(address){

  return Boolean(
    address.firstName &&
    address.lastName &&
    address.street &&
    address.postalCode &&
    address.city &&
    address.country
  );
}

function calculateDiscountedTotal(subtotal,promo){

  if(
    String(promo || "").trim().toUpperCase() ===
    "NOVA100"
  ){
    return 0;
  }

  return subtotal;
}

function getAddressFromForm(){

  return {
    firstName:$("firstName")?.value.trim() || "",
    lastName:$("lastName")?.value.trim() || "",
    street:$("street")?.value.trim() || "",
    postalCode:$("postalCode")?.value.trim() || "",
    city:$("city")?.value.trim() || "",
    country:$("country")?.value.trim() || ""
  };
}

function openCheckout(){

  const items = cartDetailed();

  if(!items.length){
    toast("Ton panier est vide.");
    return;
  }

  if(!currentUser){
    toast("Connecte-toi pour commander.");
    openAccount();
    return;
  }

  drawCheckout();
}

function drawCheckout(
  promoApplied = "",
  promoMessage = ""
){

  const items = cartDetailed();

  const subtotal = items.reduce(
    (sum,item)=>sum + item.price * item.qty,
    0
  );

  const finalTotal =
    calculateDiscountedTotal(
      subtotal,
      promoApplied
    );

  showModal(
    "🧾 Finaliser la commande",
    `
      <div class="checkout-section">

        <h3>📍 Adresse</h3>

        <div class="form-grid" style="margin-top:15px">

          <div class="field">
            <label>Prénom</label>
            <input id="firstName">
          </div>

          <div class="field">
            <label>Nom</label>
            <input id="lastName">
          </div>

          <div class="field full">
            <label>Adresse</label>
            <input id="street">
          </div>

          <div class="field">
            <label>Code postal</label>
            <input id="postalCode">
          </div>

          <div class="field">
            <label>Ville</label>
            <input id="city">
          </div>

          <div class="field full">
            <label>Pays</label>
            <input id="country" value="France">
          </div>

        </div>

      </div>

      <div class="checkout-section">

        <h3>🎟️ Code promo</h3>

        <div style="display:flex;gap:8px;margin-top:12px">

          <input
            id="promoInput"
            placeholder="Code promo"
            style="flex:1;padding:12px;border:1px solid var(--line);border-radius:10px;background:var(--card2);color:var(--text)"
            value="${escapeAttribute(promoApplied)}"
          >

          <button
            class="secondary"
            id="promoBtn"
          >
            Appliquer
          </button>

        </div>

        <div id="promoMessage" style="margin-top:10px">
          ${promoMessage}
        </div>

      </div>

      <div class="checkout-section">

        <h3>💳 Paiement</h3>

        <div class="payment-grid" style="margin-top:12px">

          <button
            class="payment-button"
            id="paypalChoice"
          >
            🅿️ PayPal
          </button>

          <button
            class="payment-button"
            id="cardChoice"
          >
            💳 Carte bancaire
          </button>

        </div>

        <p class="muted" style="margin-top:10px;font-size:12px">
          Le paiement CB est actuellement une interface de démonstration.
        </p>

      </div>

      <div class="checkout-section">

        <div class="total-line">
          <span>Sous-total</span>
          <span>${money(subtotal)}</span>
        </div>

        ${
          promoApplied.toUpperCase() === "NOVA100"
          ? `
            <div class="total-line">
              <span>Réduction</span>
              <span style="color:#22c55e">-${money(subtotal)}</span>
            </div>
          `
          : ""
        }

        <div class="total-line">
          <span>Total</span>
          <span>${money(finalTotal)}</span>
        </div>

        <button
          class="primary"
          id="confirmCheckout"
          style="width:100%"
        >
          ${finalTotal === 0 ? "Valider gratuitement" : "Continuer avec PayPal"}
        </button>

      </div>
    `
  );

  $("promoBtn").onclick = ()=>{

    const code =
      $("promoInput").value.trim().toUpperCase();

    if(code === "NOVA100"){

      drawCheckout(
        "NOVA100",
        `<span style="color:#22c55e;font-weight:800">
          Code NOVA100 appliqué. Total à 0 € ✅
        </span>`
      );

    }else{

      $("promoMessage").innerHTML =
        `<span style="color:#ef4444;font-weight:800">
          Code promo invalide.
        </span>`;
    }
  };

  $("cardChoice").onclick = openCardPayment;

  $("paypalChoice").onclick = ()=>{

    const address = getAddressFromForm();

    if(!validateAddress(address)){
      toast("Complète ton adresse.");
      return;
    }

    createCheckoutOrder(
      items,
      subtotal,
      finalTotal,
      address,
      promoApplied
    );
  };

  $("confirmCheckout").onclick = ()=>{

    const address = getAddressFromForm();

    if(!validateAddress(address)){
      toast("Complète tous les champs de livraison.");
      return;
    }

    createCheckoutOrder(
      items,
      subtotal,
      finalTotal,
      address,
      promoApplied
    );
  };
}


/* =========================================================
   CB DEMO
========================================================= */

function openCardPayment(){

  showModal(
    "💳 Paiement par carte",
    `
      <div class="card-box checkout-section">

        <p class="muted" style="margin-bottom:15px">
          Paiement CB en mode démonstration.
          Aucune donnée bancaire n'est enregistrée ni envoyée.
        </p>

        <div class="field">
          <label>Nom sur la carte</label>
          <input id="cardName">
        </div>

        <br>

        <div class="field">
          <label>Numéro de carte</label>
          <input
            id="cardNumber"
            inputmode="numeric"
            maxlength="19"
            placeholder="0000 0000 0000 0000"
          >
        </div>

        <br>

        <div class="form-grid">

          <div class="field">
            <label>Expiration</label>
            <input id="cardExpiry" placeholder="MM/AA">
          </div>

          <div class="field">
            <label>CVV</label>
            <input id="cardCvv" inputmode="numeric" maxlength="4">
          </div>

        </div>

        <div class="actions-row">

          <button class="primary" id="demoCardBtn">
            Tester le paiement
          </button>

        </div>

        <div id="cardResult" style="margin-top:12px"></div>

      </div>
    `
  );

  $("demoCardBtn").onclick = ()=>{

    $("cardResult").innerHTML = `
      <small class="error">
        Paiement CB non disponible : cette interface est uniquement une démo.
      </small>
    `;

    $("cardNumber").value = "";
    $("cardExpiry").value = "";
    $("cardCvv").value = "";
  };
}


/* =========================================================
   CREATE ORDER
========================================================= */

async function createCheckoutOrder(
  items,
  subtotal,
  finalTotal,
  address,
  promoApplied
){

  if(!currentUser){
    toast("Connecte-toi pour commander.");
    return;
  }

  const button = $("confirmCheckout");

  if(button){
    button.disabled = true;
    button.textContent = "Enregistrement...";
  }

  try{

    const orderData = {

      userId:currentUser.uid,

      email:currentUser.email || "",

      items:items.map(item => ({
        id:item.id,
        name:item.name,
        price:item.price,
        qty:item.qty,
        image:item.image
      })),

      subtotal:Number(subtotal.toFixed(2)),

      total:Number(finalTotal.toFixed(2)),

      promoCode:promoApplied || "",

      discount:Number(
        (subtotal-finalTotal).toFixed(2)
      ),

      address,

      status:
        finalTotal === 0
          ? "Enregistrée"
          : "Enregistrée",

      paymentMethod:
        finalTotal === 0
          ? "NOVA100"
          : "PayPal.Me",

      paymentStatus:
        finalTotal === 0
          ? "free"
          : "pending",

      createdAt:serverTimestamp()
    };

    const ref = await addDoc(
      collection(db,"orders"),
      orderData
    );

    if(finalTotal === 0){

      cart = [];
      saveCart();
      renderCart();

      closeModal();
      closeCart();

      toast("Commande enregistrée gratuitement ✅");

      setTimeout(()=>{
        printInvoiceHTML({
          ...orderData,
          id:ref.id,
          createdAt:new Date()
        });
      },300);

      return;
    }

    const amount =
      Number(finalTotal).toFixed(2);

    const paypalURL =
      `https://paypal.me/SH0PNOVA/${amount}EUR`;

    cart = [];
    saveCart();
    renderCart();

    closeModal();
    closeCart();

    toast("Commande créée. Ouverture de PayPal...");

    setTimeout(()=>{
      window.location.href = paypalURL;
    },700);

  }catch(error){

    console.error(error);

    toast(
      "Erreur lors de la création de la commande : " +
      (error?.code || error?.message || "inconnue")
    );

    if(button){
      button.disabled = false;
      button.textContent =
        finalTotal === 0
          ? "Valider gratuitement"
          : "Continuer avec PayPal";
    }
  }
}


/* =========================================================
   ORDERS
========================================================= */

function getTimestampValue(value){

  if(!value) return 0;

  if(typeof value.toMillis === "function"){
    return value.toMillis();
  }

  if(value.seconds){
    return value.seconds * 1000;
  }

  if(value instanceof Date){
    return value.getTime();
  }

  const n = Date.parse(value);

  return Number.isNaN(n) ? 0 : n;
}

function formatTimestamp(value){

  const timestamp = getTimestampValue(value);

  if(!timestamp) return "Date inconnue";

  return new Date(timestamp).toLocaleString(
    "fr-FR",
    {
      dateStyle:"medium",
      timeStyle:"short"
    }
  );
}

async function openOrders(){

  if(!currentUser){
    toast("Connecte-toi pour voir tes commandes.");
    openAccount();
    return;
  }

  showModal(
    "📦 Mes commandes",
    `<div class="empty">Chargement...</div>`
  );

  try{

    const q = query(
      collection(db,"orders"),
      where("userId","==",currentUser.uid)
    );

    const snapshot = await getDocs(q);

    const orders = snapshot.docs.map(d=>({
      id:d.id,
      ...d.data()
    }));

    orders.sort(
      (a,b)=>
        getTimestampValue(b.createdAt) -
        getTimestampValue(a.createdAt)
    );

    if(!orders.length){

      modalContent.innerHTML = `
        <div class="empty">
          📦 Aucune commande pour le moment.
        </div>
      `;

      return;
    }

    modalContent.innerHTML = orders.map(order => {

      const total = Number(order.total) || 0;

      return `
        <div class="order">

          <h3>
            Commande #${escapeHTML(order.id.slice(0,8))}
          </h3>

          <p class="muted">
            ${formatTimestamp(order.createdAt)}
          </p>

          <p style="margin-top:8px">
            ${order.items?.length || 0} produit(s)
          </p>

          <p style="margin-top:8px;font-weight:900">
            ${money(total)}
          </p>

          <p style="margin-top:8px">
            <span class="status">
              ${escapeHTML(order.status || "Enregistrée")}
            </span>
          </p>

          <p class="muted" style="margin-top:8px">
            Paiement :
            ${escapeHTML(order.paymentStatus || "pending")}
          </p>

          ${
            order.address?.city
              ? `
                <p class="muted">
                  Livraison : ${escapeHTML(order.address.city)}
                </p>
              `
              : ""
          }

          ${
            order.trackingNumber
              ? `
                <p style="margin-top:8px">
                  📍 Suivi :
                  <b>${escapeHTML(order.trackingNumber)}</b>
                </p>
              `
              : ""
          }

          <div class="actions-row">

            <button
              class="primary"
              data-order-details="${escapeAttribute(order.id)}"
            >
              Voir les détails
            </button>

            <button
              class="secondary"
              data-order-invoice="${escapeAttribute(order.id)}"
            >
              🧾 Facture
            </button>

          </div>

        </div>
      `;
    }).join("");

    modalContent.querySelectorAll(
      "[data-order-details]"
    ).forEach(btn=>{

      btn.onclick = ()=>{
        openOrderDetails(btn.dataset.orderDetails);
      };

    });

    modalContent.querySelectorAll(
      "[data-order-invoice]"
    ).forEach(btn=>{

      btn.onclick = async ()=>{
        const order = orders.find(
          o => o.id === btn.dataset.orderInvoice
        );

        if(order){
          printInvoiceHTML(order);
        }
      };

    });

  }catch(error){

    console.error(error);

    modalContent.innerHTML = `
      <div class="empty">
        <b>Erreur lors du chargement.</b>
        <p class="muted" style="margin-top:8px">
          ${escapeHTML(error?.code || error?.message || "")}
        </p>
      </div>
    `;
  }
}

async function openOrderDetails(orderId){

  try{

    const q = query(
      collection(db,"orders"),
      where("userId","==",currentUser.uid)
    );

    const snapshot = await getDocs(q);

    const orderDoc =
      snapshot.docs.find(d=>d.id === orderId);

    if(!orderDoc){
      toast("Commande introuvable.");
      return;
    }

    const order = {
      id:orderDoc.id,
      ...orderDoc.data()
    };

    const statuses = [
      "Enregistrée",
      "Acceptée",
      "Préparation",
      "En transit",
      "Livraison proche",
      "Livrée"
    ];

    const currentIndex =
      statuses.indexOf(order.status);

    showModal(
      `📦 Commande #${order.id.slice(0,8)}`,
      `
        <div class="order">

          <h3>État de la commande</h3>

          <div style="margin-top:15px">

            ${statuses.map((status,index)=>`

              <div style="
                display:flex;
                gap:10px;
                align-items:center;
                padding:9px 0;
                color:${index <= currentIndex ? "var(--text)" : "var(--muted)"}
              ">

                <span style="
                  width:25px;
                  height:25px;
                  display:grid;
                  place-items:center;
                  border-radius:50%;
                  background:${index <= currentIndex ? "var(--accent)" : "var(--card)"};
                  border:1px solid var(--line);
                ">
                  ${index <= currentIndex ? "✓" : index+1}
                </span>

                <span>${escapeHTML(status)}</span>

              </div>

            `).join("")}

          </div>

        </div>

        <div class="order">

          <h3>Produits</h3>

          ${(order.items || []).map(item=>`

            <div style="
              display:flex;
              justify-content:space-between;
              gap:10px;
              padding:10px 0;
              border-bottom:1px solid var(--line)
            ">

              <span>
                ${escapeHTML(item.name)}
                × ${item.qty}
              </span>

              <b>
                ${money(item.price * item.qty)}
              </b>

            </div>

          `).join("")}

        </div>

        <div class="order">

          <h3>Livraison</h3>

          <p class="muted">
            ${escapeHTML(order.address?.firstName || "")}
            ${escapeHTML(order.address?.lastName || "")}
          </p>

          <p class="muted">
            ${escapeHTML(order.address?.street || "")}
          </p>

          <p class="muted">
            ${escapeHTML(order.address?.postalCode || "")}
            ${escapeHTML(order.address?.city || "")}
          </p>

          ${
            order.trackingNumber
              ? `
                <p style="margin-top:10px">
                  📍 Numéro de suivi :
                  <b>${escapeHTML(order.trackingNumber)}</b>
                </p>
              `
              : ""
          }

          ${
            order.estimatedDelivery
              ? `
                <p style="margin-top:8px">
                  🗓️ Livraison estimée :
                  <b>${escapeHTML(order.estimatedDelivery)}</b>
                </p>
              `
              : ""
          }

        </div>

        <div class="actions-row">

          <button
            class="secondary"
            id="backOrders"
          >
            ← Retour
          </button>

          <button
            class="primary"
            id="invoiceOrder"
          >
            🧾 Facture
          </button>

        </div>
      `
    );

    $("backOrders").onclick = openOrders;

    $("invoiceOrder").onclick = ()=>{
      printInvoiceHTML(order);
    };

  }catch(error){

    console.error(error);
    toast("Impossible d'ouvrir la commande.");
  }
}


/* =========================================================
   ADMIN
========================================================= */

function isAdmin(){

  return Boolean(
    currentUser &&
    String(currentUser.email || "").toLowerCase() ===
    ADMIN_EMAIL.toLowerCase()
  );
}

function adminAuthorized(){

  return localStorage.getItem(
    ADMIN_ACCESS_KEY
  ) === "true";
}

const ORDER_STATUSES = [
  "Enregistrée",
  "Acceptée",
  "Préparation",
  "En transit",
  "Livraison proche",
  "Livrée",
  "Annulée",
  "Remboursement en cours"
];

async function openAdmin(){

  if(!currentUser){
    toast("Connecte-toi d'abord.");
    openAccount();
    return;
  }

  if(!isAdmin()){
    toast("Accès admin refusé.");
    return;
  }

  if(!adminAuthorized()){

    const code = prompt(
      "Code administrateur NovaShop :"
    );

    if(code !== ADMIN_CODE){
      toast("Code admin incorrect.");
      return;
    }

    localStorage.setItem(
      ADMIN_ACCESS_KEY,
      "true"
    );
  }

  renderAdmin();
}

async function renderAdmin(){

  showModal(
    "🛠️ Administration NovaShop",
    `<div class="empty">Chargement...</div>`
  );

  try{

    const snapshot =
      await getDocs(collection(db,"orders"));

    const orders = snapshot.docs.map(d=>({
      id:d.id,
      ...d.data()
    }));

    orders.sort(
      (a,b)=>
        getTimestampValue(b.createdAt) -
        getTimestampValue(a.createdAt)
    );

    modalContent.innerHTML = `

      <div class="admin-card">

        <h3>Administration</h3>

        <p class="muted" style="margin-top:7px">
          ${orders.length} commande(s)
        </p>

        <div class="actions-row">

          <button
            class="danger-btn"
            id="deleteAllOrders"
          >
            🗑️ Supprimer toutes les commandes
          </button>

          <button
            class="secondary"
            id="adminLogout"
          >
            Quitter
          </button>

        </div>

      </div>

      ${
        orders.length
          ? orders.map(order=>adminOrderHTML(order)).join("")
          : `<div class="empty">Aucune commande.</div>`
      }
    `;

    $("deleteAllOrders").onclick = async ()=>{

      if(!confirm(
        "Supprimer TOUTES les commandes ?"
      )) return;

      try{

        for(const order of orders){
          await deleteDoc(
            doc(db,"orders",order.id)
          );
        }

        toast("Commandes supprimées.");
        renderAdmin();

      }catch(error){

        toast(
          "Erreur : " +
          (error?.code || error?.message || "")
        );
      }
    };

    $("adminLogout").onclick = ()=>{
      localStorage.removeItem(ADMIN_ACCESS_KEY);
      closeModal();
      toast("Mode admin fermé.");
    };

    modalContent.querySelectorAll(
      "[data-admin-save]"
    ).forEach(btn=>{

      btn.onclick = ()=>{
        saveAdminOrder(btn.dataset.adminSave);
      };

    });

    modalContent.querySelectorAll(
      "[data-admin-pay]"
    ).forEach(btn=>{

      btn.onclick = ()=>{
        acceptPaypalOrder(btn.dataset.adminPay);
      };

    });

    modalContent.querySelectorAll(
      "[data-admin-invoice]"
    ).forEach(btn=>{

      btn.onclick = ()=>{
        const order =
          orders.find(o=>o.id === btn.dataset.adminInvoice);

        if(order){
          printInvoiceHTML(order);
        }
      };

    });

  }catch(error){

    console.error(error);

    modalContent.innerHTML = `
      <div class="empty">
        <b>Erreur Firebase.</b>
        <p class="muted" style="margin-top:8px">
          ${escapeHTML(error?.code || error?.message || "")}
        </p>
      </div>
    `;
  }
}

function adminOrderHTML(order){

  return `
    <div class="admin-card">

      <h3>
        Commande #${escapeHTML(order.id.slice(0,8))}
      </h3>

      <p class="muted">
        ${escapeHTML(order.email || "")}
      </p>

      <p style="margin-top:8px">
        Total :
        <b>${money(order.total)}</b>
      </p>

      <p style="margin-top:6px">
        Statut :
        <span class="status">
          ${escapeHTML(order.status || "Enregistrée")}
        </span>
      </p>

      <p class="muted" style="margin-top:6px">
        Paiement :
        ${escapeHTML(order.paymentStatus || "pending")}
      </p>

      <div class="admin-grid" style="margin-top:15px">

        <div class="field">
          <label>Statut</label>

          <select id="status-${order.id}">
            ${ORDER_STATUSES.map(status=>`
              <option
                value="${escapeAttribute(status)}"
                ${status === order.status ? "selected" : ""}
              >
                ${escapeHTML(status)}
              </option>
            `).join("")}
          </select>
        </div>

        <div class="field">
          <label>Ville</label>
          <input
            id="city-${order.id}"
            value="${escapeAttribute(order.packageCity || order.address?.city || "")}"
          >
        </div>

        <div class="field">
          <label>Numéro de suivi</label>
          <input
            id="tracking-${order.id}"
            value="${escapeAttribute(order.trackingNumber || "")}"
          >
        </div>

        <div class="field">
          <label>Délai de livraison</label>
          <input
            id="duration-${order.id}"
            value="${escapeAttribute(order.deliveryDuration || "")}"
            placeholder="ex : 2-4 jours"
          >
        </div>

        <div class="field">
          <label>Livraison estimée</label>
          <input
            id="estimated-${order.id}"
            value="${escapeAttribute(order.estimatedDelivery || "")}"
          >
        </div>

      </div>

      <div class="actions-row">

        ${
          order.paymentStatus !== "accepted" &&
          order.total > 0
          ? `
            <button
              class="primary"
              data-admin-pay="${escapeAttribute(order.id)}"
            >
              💳 Accepter le paiement
            </button>
          `
          : ""
        }

        <button
          class="primary"
          data-admin-save="${escapeAttribute(order.id)}"
        >
          💾 Enregistrer
        </button>

        <button
          class="secondary"
          data-admin-invoice="${escapeAttribute(order.id)}"
        >
          🧾 Facture
        </button>

      </div>

    </div>
  `;
}

async function acceptPaypalOrder(orderId){

  try{

    await updateDoc(
      doc(db,"orders",orderId),
      {
        paymentStatus:"accepted",
        paymentAcceptedAt:serverTimestamp(),
        status:"Acceptée",
        updatedAt:serverTimestamp()
      }
    );

    toast("Paiement accepté ✅");
    renderAdmin();

  }catch(error){

    toast(
      "Erreur : " +
      (error?.code || error?.message || "")
    );
  }
}

async function saveAdminOrder(orderId){

  try{

    const status =
      $(`status-${orderId}`).value;

    const packageCity =
      $(`city-${orderId}`).value.trim();

    const trackingNumber =
      $(`tracking-${orderId}`).value.trim();

    const deliveryDuration =
      $(`duration-${orderId}`).value.trim();

    const estimatedDelivery =
      $(`estimated-${orderId}`).value.trim();

    await updateDoc(
      doc(db,"orders",orderId),
      {
        status,
        packageCity,
        trackingNumber,
        deliveryDuration,
        estimatedDelivery,
        updatedAt:serverTimestamp()
      }
    );

    toast("Commande mise à jour ✅");
    renderAdmin();

  }catch(error){

    toast(
      "Erreur : " +
      (error?.code || error?.message || "")
    );
  }
}


/* =========================================================
   INVOICE
========================================================= */

function printInvoiceHTML(order){

  const items = order.items || [];

  const itemsHTML = items.map(item=>`
    <tr>
      <td>${escapeHTML(item.name)}</td>
      <td>${item.qty}</td>
      <td>${money(item.price)}</td>
      <td>${money(item.price * item.qty)}</td>
    </tr>
  `).join("");

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Facture NovaShop</title>

<style>
body{
  font-family:Arial,sans-serif;
  padding:40px;
  color:#111827;
}
h1{font-size:34px}
.header{
  display:flex;
  justify-content:space-between;
  margin-bottom:35px
}
table{
  width:100%;
  border-collapse:collapse;
  margin-top:25px
}
th,td{
  padding:12px;
  border-bottom:1px solid #ddd;
  text-align:left
}
.total{
  margin-top:25px;
  text-align:right;
  font-size:22px;
  font-weight:900
}
.box{
  padding:15px;
  background:#f4f4f5;
  border-radius:10px;
  margin-top:15px
}
</style>

</head>

<body>

<div class="header">

  <div>
    <h1>NovaShop</h1>
    <p>Facture</p>
  </div>

  <div>
    <b>Commande</b><br>
    #${escapeHTML(order.id || "")}<br>
    ${formatTimestamp(order.createdAt)}
  </div>

</div>

<div class="box">

  <b>Client</b><br>

  ${escapeHTML(order.address?.firstName || "")}
  ${escapeHTML(order.address?.lastName || "")}<br>

  ${escapeHTML(order.address?.street || "")}<br>

  ${escapeHTML(order.address?.postalCode || "")}
  ${escapeHTML(order.address?.city || "")}<br>

  ${escapeHTML(order.address?.country || "")}

</div>

<table>

<thead>
<tr>
  <th>Produit</th>
  <th>Qté</th>
  <th>Prix</th>
  <th>Total</th>
</tr>
</thead>

<tbody>
${itemsHTML}
</tbody>

</table>

<div class="box">

  Paiement :
  <b>${escapeHTML(order.paymentMethod || "")}</b><br>

  Statut :
  <b>${escapeHTML(order.status || "")}</b>

  ${
    order.promoCode
      ? `<br>Code promo : <b>${escapeHTML(order.promoCode)}</b>`
      : ""
  }

</div>

<div class="total">
  Total : ${money(order.total)}
</div>

<script>
window.onload = () => window.print();
<\/script>

</body>
</html>
`;

  const win = window.open(
    "",
    "_blank",
    "width=900,height=700"
  );

  if(!win){
    toast("Autorise les fenêtres pop-up pour imprimer.");
    return;
  }

  win.document.open();
  win.document.write(html);
  win.document.close();
}


/* =========================================================
   EVENTS
========================================================= */

categoriesEl.addEventListener(
  "click",
  event=>{

    const button =
      event.target.closest("[data-category]");

    if(!button) return;

    selectedCategory =
      button.dataset.category;

    renderCategories();
    renderProducts();
  }
);

productsGrid.addEventListener(
  "click",
  event=>{

    const view =
      event.target.closest(".view-btn");

    const add =
      event.target.closest(".add-btn");

    if(view){
      openProduct(view.dataset.id);
      return;
    }

    if(add){
      addToCart(add.dataset.id);
    }
  }
);

cartItems.addEventListener(
  "click",
  event=>{

    const button =
      event.target.closest("[data-action]");

    if(!button) return;

    const id = button.dataset.id;
    const action = button.dataset.action;

    if(action === "plus"){
      updateCartQty(id,1);
    }

    if(action === "minus"){
      updateCartQty(id,-1);
    }

    if(action === "remove"){
      removeFromCart(id);
    }
  }
);

searchInput.addEventListener(
  "input",
  ()=>{
    searchValue =
      searchInput.value.trim();

    renderProducts();
  }
);

sortSelect.addEventListener(
  "change",
  ()=>{
    sortValue =
      sortSelect.value;

    renderProducts();
  }
);

cartBtn.onclick = openCart;
heroCartBtn.onclick = ()=>{
  document
    .getElementById("productGrid")
    .scrollIntoView({
      behavior:"smooth"
    });
};

cartClose.onclick = closeCart;

cartOverlay.onclick = event=>{
  if(event.target === cartOverlay){
    closeCart();
  }
};

modalClose.onclick = closeModal;

modal.onclick = event=>{
  if(event.target === modal){
    closeModal();
  }
};

settingsBtn.onclick = openSettings;
accountBtn.onclick = openAccount;
ordersBtn.onclick = openOrders;
adminBtn.onclick = openAdmin;
checkoutBtn.onclick = openCheckout;

document.addEventListener(
  "keydown",
  event=>{

    if(event.key === "Escape"){
      closeModal();
      closeCart();
    }
  }
);


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user=>{

    currentUser = user;

    if(user){

      accountBtn.textContent =
        "👤 " +
        (user.email?.split("@")[0] || "Compte");

      if(isAdmin()){
        adminBtn.style.display = "";
      }else{
        adminBtn.style.display = "none";
      }

    }else{

      accountBtn.textContent =
        "👤 Compte";

      adminBtn.style.display = "none";
    }
  }
);


/* =========================================================
   INIT
========================================================= */

applyTheme();
renderCategories();
renderProducts();
renderCart();


/* =========================================================
   PUBLIC API
========================================================= */

window.NovaShop = {
  products,
  addToCart,
  openCart,
  openAccount,
  openOrders,
  openAdmin,
  openCheckout,
  renderProducts,
  renderCart
};
