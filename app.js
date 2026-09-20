import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAnalytics
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";

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
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  serverTimestamp
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

let analytics = null;

try{
  analytics = getAnalytics(app);
}catch(e){
  console.warn("Analytics indisponible.");
}

const auth = getAuth(app);
const db = getFirestore(app);


/* =========================================================
   ADMIN
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";


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
   ÉTAT
========================================================= */

let cart = loadCart();
let favorites = JSON.parse(
  localStorage.getItem("novaFavorites") || "[]"
);

let currentCategory = "Tous";
let currentSearch = "";
let selectedPayment = "card";
let authMode = "login";
let currentUser = null;


/* =========================================================
   HELPERS
========================================================= */

const $ = id => document.getElementById(id);

function money(value){
  return Number(value).toLocaleString("fr-FR",{
    style:"currency",
    currency:"EUR"
  });
}

function escapeHTML(value){
  return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function toast(message){
  const el = $("toast");

  el.textContent = message;
  el.classList.add("show");

  clearTimeout(window.novaToastTimer);

  window.novaToastTimer = setTimeout(()=>{
    el.classList.remove("show");
  },2500);
}

function openModal(html){
  $("modalContent").innerHTML = html;
  $("overlay").classList.add("show");
}

function closeModal(){
  $("overlay").classList.remove("show");
}

function getProduct(id){
  return products.find(p => p.id === id);
}


/* =========================================================
   PANIER
========================================================= */

function loadCart(){

  try{

    const saved = JSON.parse(
      localStorage.getItem("novaCart") || "[]"
    );

    return saved
      .map(item => ({
        id:item.id,
        qty:Number(item.qty ?? item.quantity ?? 1)
      }))
      .filter(item =>
        getProductSafe(item.id)
      )
      .filter(item => item.qty > 0);

  }catch{

    return [];

  }
}

function getProductSafe(id){
  return products.find(p => p.id === id);
}

function saveCart(){

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );

  updateCartBadge();
}

function addToCart(id, qty=1){

  const existing = cart.find(item => item.id === id);

  if(existing){
    existing.qty += qty;
  }else{
    cart.push({
      id,
      qty
    });
  }

  saveCart();

  toast("Produit ajouté au panier 🛒");
}

function removeFromCart(id){

  cart = cart.filter(item => item.id !== id);

  saveCart();

  renderCart();
}

function changeQty(id, amount){

  const item = cart.find(item => item.id === id);

  if(!item) return;

  item.qty += amount;

  if(item.qty <= 0){
    removeFromCart(id);
    return;
  }

  saveCart();

  renderCart();
}

function cartCount(){

  return cart.reduce(
    (total,item) => total + item.qty,
    0
  );
}

function cartTotal(){

  return cart.reduce((total,item)=>{

    const product = getProduct(item.id);

    return total + (
      product
      ? product.price * item.qty
      : 0
    );

  },0);
}

function updateCartBadge(){

  $("cartBadge").textContent = cartCount();
}


/* =========================================================
   FAVORIS
========================================================= */

function isFavorite(id){
  return favorites.includes(id);
}

function toggleFavorite(id){

  if(isFavorite(id)){

    favorites = favorites.filter(
      x => x !== id
    );

    toast("Retiré des favoris");

  }else{

    favorites.push(id);

    toast("Ajouté aux favoris ❤️");

  }

  localStorage.setItem(
    "novaFavorites",
    JSON.stringify(favorites)
  );

  renderProducts();
}


/* =========================================================
   CATÉGORIES
========================================================= */

function renderCategories(){

  const categories = [
    "Tous",
    ...new Set(products.map(p => p.category))
  ];

  $("categories").innerHTML =
    categories.map(category => `
      <button
        class="category-btn ${currentCategory === category ? "active":""}"
        data-category="${escapeHTML(category)}"
      >
        ${escapeHTML(category)}
      </button>
    `).join("");

  document
    .querySelectorAll(".category-btn")
    .forEach(button => {

      button.addEventListener("click",()=>{

        currentCategory =
          button.dataset.category;

        renderCategories();
        renderProducts();

      });

    });
}


/* =========================================================
   FILTRE + TRI
========================================================= */

function getVisibleProducts(){

  let list = [...products];

  if(currentCategory !== "Tous"){

    list = list.filter(
      p => p.category === currentCategory
    );

  }

  if(currentSearch.trim()){

    const search =
      currentSearch.toLowerCase();

    list = list.filter(p =>
      p.name.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search)
    );

  }

  const sort = $("sort").value;

  if(sort === "priceAsc"){
    list.sort((a,b)=>a.price-b.price);
  }

  if(sort === "priceDesc"){
    list.sort((a,b)=>b.price-a.price);
  }

  if(sort === "name"){
    list.sort((a,b)=>
      a.name.localeCompare(b.name,"fr")
    );
  }

  return list;
}


/* =========================================================
   PRODUITS
========================================================= */

function renderProducts(){

  const list = getVisibleProducts();

  if(!list.length){

    $("products").innerHTML = `
      <div class="empty">
        Aucun produit trouvé 🔎
      </div>
    `;

    return;
  }

  $("products").innerHTML = list.map(product => `

    <article class="product-card">

      ${
        product.new
        ? `<div class="new-badge">NOUVEAU</div>`
        : ""
      }

      <div class="product-image">
        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
        >
      </div>

      <div class="product-info">

        <div class="product-category">
          ${escapeHTML(product.category)}
        </div>

        <div class="product-name">
          ${escapeHTML(product.name)}
        </div>

        <div class="product-bottom">

          <div class="price">
            ${money(product.price)}
          </div>

          <div class="card-actions">

            <button
              class="small-btn favorite ${isFavorite(product.id) ? "active":""}"
              data-favorite="${product.id}"
              title="Favoris"
            >
              ${isFavorite(product.id) ? "♥":"♡"}
            </button>

            <button
              class="small-btn"
              data-detail="${product.id}"
              title="Voir"
            >
              👁️
            </button>

            <button
              class="small-btn add-btn"
              data-add="${product.id}"
              title="Ajouter"
            >
              +
            </button>

          </div>

        </div>

      </div>

    </article>

  `).join("");

  document
    .querySelectorAll("[data-add]")
    .forEach(button => {

      button.addEventListener("click",()=>{

        addToCart(button.dataset.add);

      });

    });

  document
    .querySelectorAll("[data-detail]")
    .forEach(button => {

      button.addEventListener("click",()=>{

        openProduct(button.dataset.detail);

      });

    });

  document
    .querySelectorAll("[data-favorite]")
    .forEach(button => {

      button.addEventListener("click",()=>{

        toggleFavorite(button.dataset.favorite);

      });

    });

}


/* =========================================================
   DÉTAIL PRODUIT
========================================================= */

function openProduct(id){

  const product = getProduct(id);

  if(!product) return;

  openModal(`

    <div class="modal-inner">

      <div class="product-detail">

        <div class="detail-image">

          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
          >

        </div>

        <div>

          <div class="detail-category">
            ${escapeHTML(product.category)}
          </div>

          <h2 class="detail-name">
            ${escapeHTML(product.name)}
          </h2>

          <div class="detail-price">
            ${money(product.price)}
          </div>

          <div class="qty-row">

            <button
              class="qty-btn"
              id="detailMinus"
            >
              −
            </button>

            <span
              class="qty-value"
              id="detailQty"
            >
              1
            </span>

            <button
              class="qty-btn"
              id="detailPlus"
            >
              +
            </button>

          </div>

          <div class="detail-buttons">

            <button
              class="primary"
              id="detailAdd"
            >
              🛒 Ajouter au panier
            </button>

            <button
              class="secondary"
              id="detailFav"
            >
              ❤️ Favori
            </button>

          </div>

        </div>

      </div>

    </div>

  `);

  let qty = 1;

  $("detailMinus").onclick = ()=>{

    qty = Math.max(1,qty-1);

    $("detailQty").textContent = qty;

  };

  $("detailPlus").onclick = ()=>{

    qty++;

    $("detailQty").textContent = qty;

  };

  $("detailAdd").onclick = ()=>{

    addToCart(id,qty);

    closeModal();

  };

  $("detailFav").onclick = ()=>{

    toggleFavorite(id);

    $("detailFav").textContent =
      isFavorite(id)
      ? "❤️ Favori"
      : "♡ Ajouter aux favoris";

  };

}


/* =========================================================
   PANIER
========================================================= */

function renderCart(){

  const items = cart
    .map(item => ({
      ...item,
      product:getProduct(item.id)
    }))
    .filter(item => item.product);

  if(!items.length){

    openModal(`

      <div class="modal-inner">

        <h2 class="modal-title">
          🛒 Ton panier
        </h2>

        <div class="empty">
          Ton panier est vide.
        </div>

      </div>

    `);

    return;
  }

  openModal(`

    <div class="modal-inner">

      <h2 class="modal-title">
        🛒 Ton panier
      </h2>

      <div>

        ${items.map(item => `

          <div class="cart-item">

            <img
              src="${escapeHTML(item.product.image)}"
              alt=""
            >

            <div>

              <div class="cart-item-name">
                ${escapeHTML(item.product.name)}
              </div>

              <div class="cart-item-price">
                ${money(item.product.price)}
              </div>

            </div>

            <div class="cart-controls">

              <button
                data-cart-minus="${item.id}"
              >
                −
              </button>

              <b>${item.qty}</b>

              <button
                data-cart-plus="${item.id}"
              >
                +
              </button>

              <button
                data-cart-remove="${item.id}"
              >
                🗑️
              </button>

            </div>

          </div>

        `).join("")}

      </div>

      <div class="total-box">

        <div class="total-line">
          <span>Sous-total</span>
          <b>${money(cartTotal())}</b>
        </div>

        <div class="total-line final">
          <span>Total</span>
          <b>${money(cartTotal())}</b>
        </div>

      </div>

      <button
        class="primary"
        id="checkoutBtn"
        style="width:100%;margin-top:15px"
      >
        💳 Passer au paiement
      </button>

    </div>

  `);

  document
    .querySelectorAll("[data-cart-minus]")
    .forEach(button => {

      button.onclick = ()=>{
        changeQty(button.dataset.cartMinus,-1);
      };

    });

  document
    .querySelectorAll("[data-cart-plus]")
    .forEach(button => {

      button.onclick = ()=>{
        changeQty(button.dataset.cartPlus,1);
      };

    });

  document
    .querySelectorAll("[data-cart-remove]")
    .forEach(button => {

      button.onclick = ()=>{
        removeFromCart(button.dataset.cartRemove);
      };

    });

  $("checkoutBtn").onclick = openCheckout;
}


/* =========================================================
   FAVORIS
========================================================= */

function openFavorites(){

  const list = products.filter(
    p => favorites.includes(p.id)
  );

  openModal(`

    <div class="modal-inner">

      <h2 class="modal-title">
        ❤️ Mes favoris
      </h2>

      ${
        !list.length
        ? `
          <div class="empty">
            Aucun favori pour le moment.
          </div>
        `
        : `
          <div class="products">

            ${list.map(product => `

              <article class="product-card">

                <div class="product-image">
                  <img
                    src="${escapeHTML(product.image)}"
                    alt=""
                  >
                </div>

                <div class="product-info">

                  <div class="product-category">
                    ${escapeHTML(product.category)}
                  </div>

                  <div class="product-name">
                    ${escapeHTML(product.name)}
                  </div>

                  <div class="product-bottom">

                    <div class="price">
                      ${money(product.price)}
                    </div>

                    <button
                      class="small-btn add-btn"
                      data-fav-add="${product.id}"
                    >
                      +
                    </button>

                  </div>

                </div>

              </article>

            `).join("")}

          </div>
        `
      }

    </div>

  `);

  document
    .querySelectorAll("[data-fav-add]")
    .forEach(button => {

      button.onclick = ()=>{
        addToCart(button.dataset.favAdd);
      };

    });

}


/* =========================================================
   AUTH
========================================================= */

function openAuth(){

  openModal(`

    <div class="account-box">

      <h2 class="modal-title">
        👤 ${authMode === "login" ? "Connexion":"Créer un compte"}
      </h2>

      <div class="auth-tabs">

        <button
          class="auth-tab ${authMode === "login" ? "active":""}"
          id="loginTab"
        >
          Connexion
        </button>

        <button
          class="auth-tab ${authMode === "signup" ? "active":""}"
          id="signupTab"
        >
          Inscription
        </button>

      </div>

      <form class="form" id="authForm">

        ${
          authMode === "signup"
          ? `
            <input
              id="authName"
              type="text"
              placeholder="Prénom / nom"
              required
            >
          `
          : ""
        }

        <input
          id="authEmail"
          type="email"
          placeholder="Adresse e-mail"
          required
        >

        <input
          id="authPassword"
          type="password"
          placeholder="Mot de passe"
          required
        >

        <div id="authError"></div>

        <button
          class="primary"
          type="submit"
        >
          ${authMode === "login" ? "Se connecter":"Créer mon compte"}
        </button>

      </form>

    </div>

  `);

  $("loginTab").onclick = ()=>{
    authMode = "login";
    openAuth();
  };

  $("signupTab").onclick = ()=>{
    authMode = "signup";
    openAuth();
  };

  $("authForm").onsubmit = handleAuth;

}

async function handleAuth(event){

  event.preventDefault();

  const email =
    $("authEmail").value.trim();

  const password =
    $("authPassword").value;

  const error =
    $("authError");

  error.textContent = "";

  try{

    if(authMode === "login"){

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast("Connexion réussie ✅");

    }else{

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast("Compte créé ✅");

    }

    closeModal();

  }catch(err){

    console.error(err);

    error.innerHTML = `
      <div class="error">
        ${escapeHTML(
          authErrorMessage(err.code)
        )}
      </div>
    `;

  }

}

function authErrorMessage(code){

  const messages = {

    "auth/invalid-email":
      "Adresse e-mail incorrecte.",

    "auth/user-not-found":
      "Compte introuvable.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/invalid-credential":
      "E-mail ou mot de passe incorrect.",

    "auth/email-already-in-use":
      "Cette adresse possède déjà un compte.",

    "auth/weak-password":
      "Le mot de passe est trop faible.",

    "auth/api-key-not-valid":
      "La clé Firebase est invalide. Vérifie la configuration Firebase."

  };

  return messages[code] ||
    "Une erreur est survenue. Réessaie.";
}


/* =========================================================
   COMPTE
========================================================= */

function openAccount(){

  if(!currentUser){

    authMode = "login";

    openAuth();

    return;
  }

  openModal(`

    <div class="account-box">

      <h2 class="modal-title">
        👤 Mon compte
      </h2>

      <div class="account-email">
        ${escapeHTML(currentUser.email || "")}
      </div>

      <div class="hero-buttons">

        <button
          class="primary"
          id="myOrdersBtn"
        >
          📦 Mes commandes
        </button>

        <button
          class="secondary"
          id="logoutBtn"
        >
          🚪 Se déconnecter
        </button>

      </div>

    </div>

  `);

  $("myOrdersBtn").onclick = openMyOrders;

  $("logoutBtn").onclick = async ()=>{

    await signOut(auth);

    closeModal();

    toast("Déconnexion réussie");

  };

}


/* =========================================================
   COMMANDES UTILISATEUR
========================================================= */

async function openMyOrders(){

  if(!currentUser){

    openAuth();

    return;
  }

  openModal(`

    <div class="modal-inner">

      <h2 class="modal-title">
        📦 Mes commandes
      </h2>

      <div id="ordersContent">
        Chargement...
      </div>

    </div>

  `);

  try{

    const q = query(
      collection(db,"orders"),
      where("userId","==",currentUser.uid),
      orderBy("createdAt","desc")
    );

    const snapshot =
      await getDocs(q);

    if(snapshot.empty){

      $("ordersContent").innerHTML = `
        <div class="empty">
          Aucune commande.
        </div>
      `;

      return;
    }

    $("ordersContent").innerHTML =
      snapshot.docs.map(docSnap => {

        const order = docSnap.data();

        return `

          <div class="order-card">

            <div class="order-head">

              <b>
                Commande #${escapeHTML(docSnap.id.slice(0,8))}
              </b>

              <span class="status ${order.paymentStatus || "pending"}">
                ${escapeHTML(
                  order.paymentStatus || "pending"
                )}
              </span>

            </div>

            <div style="margin-top:8px;color:#9aacbf">
              ${escapeHTML(
                order.paymentMethod === "card"
                ? "Carte bancaire"
                : "PayPal"
              )}
            </div>

            <div style="margin-top:7px;font-weight:900">
              ${money(order.total || 0)}
            </div>

          </div>

        `;

      }).join("");

  }catch(error){

    console.error(error);

    $("ordersContent").innerHTML = `
      <div class="error">
        Impossible de charger les commandes.
      </div>
    `;

  }

}


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout(){

  if(!currentUser){

    toast("Connecte-toi pour commander 👤");

    authMode = "login";

    openAuth();

    return;
  }

  if(!cart.length){

    toast("Ton panier est vide.");

    return;
  }

  selectedPayment = "card";

  renderCheckout();
}

function renderCheckout(){

  const total = cartTotal();

  openModal(`

    <div class="modal-inner">

      <h2 class="modal-title">
        💳 Paiement
      </h2>

      <form class="form" id="checkoutForm">

        <input
          id="customerName"
          type="text"
          placeholder="Nom complet"
          required
        >

        <input
          id="customerEmail"
          type="email"
          value="${escapeHTML(currentUser?.email || "")}"
          placeholder="E-mail"
          required
        >

        <div class="payment-grid">

          <div
            class="payment-card active"
            id="cardPayment"
          >

            <div class="payment-icon">
              💳
            </div>

            <div class="payment-title">
              Carte bancaire
            </div>

            <div class="payment-text">
              Paiement par carte.
            </div>

          </div>

          <div
            class="payment-card"
            id="paypalPayment"
          >

            <div class="payment-icon">
              🅿️
            </div>

            <div class="payment-title">
              PayPal
            </div>

            <div class="payment-text">
              Paiement avec ton compte PayPal.
            </div>

          </div>

        </div>

        <div
          class="card-fields show"
          id="cardFields"
        >

          <input
            id="cardNumber"
            type="text"
            inputmode="numeric"
            maxlength="19"
            placeholder="Numéro de carte"
            autocomplete="off"
            required
          >

          <div class="exp-cvv">

            <input
              id="cardExpiry"
              type="text"
              inputmode="numeric"
              maxlength="5"
              placeholder="MM/AA"
              autocomplete="off"
              required
            >

            <input
              id="cardCvv"
              type="password"
              inputmode="numeric"
              maxlength="3"
              placeholder="CVV"
              autocomplete="off"
              required
            >

          </div>

          <div id="cardError"></div>

        </div>

        <div
          class="paypal-box"
          id="paypalBox"
        >

          <div class="payment-text">
            Tu seras redirigé vers PayPal pour effectuer le paiement.
          </div>

        </div>

        <div class="total-box">

          <div class="total-line">
            <span>Sous-total</span>
            <b>${money(total)}</b>
          </div>

          <div class="total-line final">
            <span>Total</span>
            <b>${money(total)}</b>
          </div>

        </div>

        <button
          class="primary"
          id="payButton"
          type="submit"
        >
          💳 Payer
        </button>

      </form>

    </div>

  `);

  $("cardPayment").onclick = ()=>{

    selectedPayment = "card";

    $("cardPayment").classList.add("active");
    $("paypalPayment").classList.remove("active");

    $("cardFields").classList.add("show");
    $("paypalBox").classList.remove("show");

    $("cardNumber").required = true;
    $("cardExpiry").required = true;
    $("cardCvv").required = true;

    $("payButton").textContent =
      "💳 Payer par carte";

  };

  $("paypalPayment").onclick = ()=>{

    selectedPayment = "paypal";

    $("paypalPayment").classList.add("active");
    $("cardPayment").classList.remove("active");

    $("cardFields").classList.remove("show");
    $("paypalBox").classList.add("show");

    $("cardNumber").required = false;
    $("cardExpiry").required = false;
    $("cardCvv").required = false;

    $("payButton").textContent =
      "🅿️ Payer avec PayPal";

  };

  $("cardNumber").addEventListener(
    "input",
    formatCardNumber
  );

  $("cardExpiry").addEventListener(
    "input",
    formatExpiry
  );

  $("cardCvv").addEventListener(
    "input",
    ()=>{
      $("cardCvv").value =
        $("cardCvv").value
          .replace(/\D/g,"")
          .slice(0,3);
    }
  );

  $("checkoutForm").onsubmit =
    handlePayment;

}


/* =========================================================
   FORMAT CARTE FICTIVE
========================================================= */

function formatCardNumber(){

  let value =
    $("cardNumber").value
      .replace(/\D/g,"")
      .slice(0,16);

  value =
    value.match(/.{1,4}/g)?.join(" ") || "";

  $("cardNumber").value = value;
}

function formatExpiry(){

  let value =
    $("cardExpiry").value
      .replace(/\D/g,"")
      .slice(0,4);

  if(value.length > 2){

    value =
      value.slice(0,2) +
      "/" +
      value.slice(2);

  }

  $("cardExpiry").value = value;
}


/* =========================================================
   PAIEMENT
========================================================= */

async function handlePayment(event){

  event.preventDefault();

  const name =
    $("customerName").value.trim();

  const email =
    $("customerEmail").value.trim();

  if(!name || !email){

    toast("Remplis tes informations.");

    return;
  }

  const total = cartTotal();

  if(total <= 0){

    toast("Panier vide.");

    return;
  }

  if(selectedPayment === "card"){

    const number =
      $("cardNumber").value
        .replace(/\s/g,"");

    const expiry =
      $("cardExpiry").value;

    const cvv =
      $("cardCvv").value;

    /*
      CARTE DE TEST LOCALE UNIQUEMENT

      Numéro : 1234 5678 9012 3456
      Expiration : 12/42
      CVV : 144

      Rien n'est envoyé à une banque.
      Rien n'est sauvegardé.
    */

    const validCard =
      number === "1234567890123456" &&
      expiry === "12/42" &&
      cvv === "144";

    if(!validCard){

      $("cardError").innerHTML = `
        <div class="error">
          ❌ Carte incorrecte
        </div>
      `;

      return;
    }

    await createOrder(
      name,
      email,
      total,
      "card",
      "paid"
    );

    cart = [];

    saveCart();

    openPaymentSuccess();

    return;
  }

  if(selectedPayment === "paypal"){

    await createOrder(
      name,
      email,
      total,
      "paypal",
      "pending"
    );

    const paypalUrl =
      "https://paypal.me/SH0PNOVA/" +
      encodeURIComponent(
        total.toFixed(2)
      );

    window.open(
      paypalUrl,
      "_blank",
      "noopener,noreferrer"
    );

    cart = [];

    saveCart();

    toast("Ouverture de PayPal 🅿️");

    closeModal();

  }

}


/* =========================================================
   COMMANDE FIRESTORE
========================================================= */

async function createOrder(
  name,
  email,
  total,
  paymentMethod,
  paymentStatus
){

  if(!currentUser){

    throw new Error(
      "Utilisateur non connecté."
    );

  }

  const items = cart.map(item => {

    const product =
      getProduct(item.id);

    return {

      id:item.id,
      name:product?.name || "",
      price:product?.price || 0,
      quantity:item.qty

    };

  });

  try{

    await addDoc(
      collection(db,"orders"),
      {

        userId:currentUser.uid,

        customerName:name,

        customerEmail:email,

        items,

        total,

        paymentMethod,

        paymentStatus,

        createdAt:serverTimestamp()

      }
    );

  }catch(error){

    console.error(
      "Erreur création commande:",
      error
    );

    throw error;

  }

}


/* =========================================================
   SUCCÈS
========================================================= */

function openPaymentSuccess(){

  openModal(`

    <div class="account-box" style="text-align:center">

      <div style="font-size:60px">
        ✅
      </div>

      <h2 class="modal-title">
        Paiement accepté
      </h2>

      <p class="payment-text" style="font-size:15px">
        Ta commande a été enregistrée avec succès.
      </p>

      <button
        class="primary"
        id="successClose"
        style="margin-top:20px"
      >
        Continuer
      </button>

    </div>

  `);

  $("successClose").onclick =
    closeModal;

}


/* =========================================================
   DASHBOARD ADMIN
========================================================= */

async function openAdmin(){

  if(!currentUser){

    toast("Connecte-toi pour accéder au Dashboard.");

    authMode = "login";

    openAuth();

    return;
  }

  if(
    currentUser.email.toLowerCase() !==
    ADMIN_EMAIL.toLowerCase()
  ){

    toast("Accès Dashboard refusé ❌");

    return;
  }

  const code =
    prompt("Code administrateur NovaShop :");

  if(code !== ADMIN_CODE){

    toast("Code administrateur incorrect ❌");

    return;
  }

  localStorage.setItem(
    "novaAdminAuthorized",
    "true"
  );

  renderAdmin();

}


/* =========================================================
   DASHBOARD
========================================================= */

async function renderAdmin(){

  openModal(`

    <div class="modal-inner">

      <h2 class="modal-title">
        ⚙️ Dashboard NovaShop
      </h2>

      <div class="payment-grid">

        <div class="payment-card active">

          <div class="payment-icon">
            📦
          </div>

          <div class="payment-title">
            Commandes
          </div>

          <div class="payment-text">
            Gestion des commandes clients.
          </div>

        </div>

        <div class="payment-card">

          <div class="payment-icon">
            🛍️
          </div>

          <div class="payment-title">
            Produits
          </div>

          <div class="payment-text">
            ${products.length} produits disponibles.
          </div>

        </div>

      </div>

      <div id="adminOrders">
        Chargement des commandes...
      </div>

    </div>

  `);

  await renderAdminOrders();

}


/* =========================================================
   COMMANDES ADMIN
========================================================= */

async function renderAdminOrders(){

  const container =
    $("adminOrders");

  try{

    const snapshot =
      await getDocs(
        query(
          collection(db,"orders"),
          orderBy("createdAt","desc")
        )
      );

    if(snapshot.empty){

      container.innerHTML = `
        <div class="empty">
          Aucune commande.
        </div>
      `;

      return;
    }

    container.innerHTML = `

      <table class="admin-table">

        <thead>

          <tr>

            <th>Commande</th>
            <th>Client</th>
            <th>Total</th>
            <th>Paiement</th>
            <th>Statut</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          ${snapshot.docs.map(orderDoc => {

            const order =
              orderDoc.data();

            return `

              <tr>

                <td>
                  #${escapeHTML(
                    orderDoc.id.slice(0,8)
                  )}
                </td>

                <td>
                  ${escapeHTML(
                    order.customerEmail || ""
                  )}
                </td>

                <td>
                  ${money(order.total || 0)}
                </td>

                <td>
                  ${
                    order.paymentMethod === "card"
                    ? "💳 Carte"
                    : "🅿️ PayPal"
                  }
                </td>

                <td>

                  <span
                    class="status ${
                      order.paymentStatus || "pending"
                    }"
                  >
                    ${escapeHTML(
                      order.paymentStatus || "pending"
                    )}
                  </span>

                </td>

                <td>

                  ${
                    order.paymentStatus !== "paid"
                    ? `
                      <button
                        class="small-btn add-btn"
                        data-paid="${orderDoc.id}"
                      >
                        ✓ Payé
                      </button>
                    `
                    : `
                      <span class="success">
                        ✓
                      </span>
                    `
                  }

                </td>

              </tr>

            `;

          }).join("")}

        </tbody>

      </table>

    `;

    document
      .querySelectorAll("[data-paid]")
      .forEach(button => {

        button.onclick = async ()=>{

          try{

            await updateDoc(
              doc(
                db,
                "orders",
                button.dataset.paid
              ),
              {
                paymentStatus:"paid"
              }
            );

            toast(
              "Commande marquée comme payée ✅"
            );

            await renderAdminOrders();

          }catch(error){

            console.error(error);

            toast(
              "Erreur lors de la mise à jour."
            );

          }

        };

      });

  }catch(error){

    console.error(error);

    container.innerHTML = `

      <div class="error">
        Impossible de charger les commandes.
        Vérifie les règles Firestore et l'index.
      </div>

    `;

  }

}


/* =========================================================
   EVENTS
========================================================= */

$("search").addEventListener(
  "input",
  event => {

    currentSearch =
      event.target.value;

    renderProducts();

  }
);

$("sort").addEventListener(
  "change",
  renderProducts
);

$("accountBtn").addEventListener(
  "click",
  openAccount
);

$("favoritesBtn").addEventListener(
  "click",
  openFavorites
);

$("cartBtn").addEventListener(
  "click",
  renderCart
);

$("dashboardBtn").addEventListener(
  "click",
  openAdmin
);

$("heroDashboardBtn").addEventListener(
  "click",
  openAdmin
);

$("shopBtn").addEventListener(
  "click",
  ()=>{
    $("shop").scrollIntoView({
      behavior:"smooth"
    });
  }
);

$("closeModal").addEventListener(
  "click",
  closeModal
);

$("overlay").addEventListener(
  "click",
  event => {

    if(event.target === $("overlay")){
      closeModal();
    }

  }
);

document.addEventListener(
  "keydown",
  event => {

    if(event.key === "Escape"){
      closeModal();
    }

  }
);


/* =========================================================
   FIREBASE AUTH
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;

    if(user){

      $("accountBtn").title =
        "Compte connecté";

    }else{

      $("accountBtn").title =
        "Connexion";

    }

  }
);


/* =========================================================
   INITIALISATION
========================================================= */

renderCategories();

renderProducts();

updateCartBadge();


/* =========================================================
   DEBUG / UTILITAIRES
========================================================= */

window.NovaShop = {

  products,

  getProduct,

  addToCart,

  renderCart,

  openCheckout,

  openAdmin,

  openAccount,

  openFavorites,

  currentUser:()=>{
    return currentUser;
  }

};

console.log(
  `NovaShop chargé : ${products.length} produits`
);
