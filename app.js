/* =========================================================
   NOVASHOP APP.JS
   Firebase + 43 produits + Dashboard + PayPal
   AUCUN CODE PROMO / AUCUNE REDUCTION
========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";

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
  query,
  where,
  orderBy,
  doc,
  getDoc,
  updateDoc,
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

try {
  getAnalytics(app);
} catch(error) {
  console.warn("Analytics indisponible :", error);
}

const auth = getAuth(app);
const db = getFirestore(app);


/* =========================================================
   CONFIG
========================================================= */

const PAYPAL_LINK = "https://paypal.me/SH0PNOVA";

const ADMIN_EMAIL = "pc2alex.les@gmail.com";

const ADMIN_CODE = "NOVA-ADMIN-2026";

const ADMIN_ACCESS_KEY = "novaAdminAuthorized";

const FALLBACK_IMAGE =
  "https://placehold.co/800x800/111827/ffffff?text=NovaShop";


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

let cart = JSON.parse(
  localStorage.getItem("novaCart") || "[]"
);

let favorites = JSON.parse(
  localStorage.getItem("novaFavorites") || "[]"
);

let currentCategory = "Tous";
let currentSort = "default";
let searchText = "";
let currentUser = null;
let selectedPayment = "card";
let adminMode = false;


/* =========================================================
   OUTILS
========================================================= */

const $ = id => document.getElementById(id);

function money(value){

  return Number(value || 0)
    .toLocaleString("fr-FR",{
      style:"currency",
      currency:"EUR"
    });

}

function saveCart(){

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );

}

function saveFavorites(){

  localStorage.setItem(
    "novaFavorites",
    JSON.stringify(favorites)
  );

}

function getProduct(id){

  return products.find(
    product => product.id === id
  );

}

function cartCount(){

  return cart.reduce(
    (total,item) =>
      total + Number(item.qty || 0),
    0
  );

}

function cartTotal(){

  return cart.reduce(
    (total,item)=>{

      const product =
        getProduct(item.id);

      if(!product)return total;

      return total +
        product.price *
        Number(item.qty || 0);

    },
    0
  );

}

function toast(message){

  const element = $("toast");

  if(!element)return;

  element.textContent = message;

  element.classList.add("show");

  clearTimeout(element._timer);

  element._timer =
    setTimeout(()=>{
      element.classList.remove("show");
    },2200);

}

function escapeHTML(value){

  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}


/* =========================================================
   MODAL
========================================================= */

function openModal(html){

  $("modalContent").innerHTML = html;

  $("overlay").classList.add("open");

}

function closeModal(){

  $("overlay").classList.remove("open");

}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories(){

  const categories = [
    "Tous",
    ...new Set(
      products.map(
        product => product.category
      )
    )
  ];

  $("categories").innerHTML =
    categories.map(category=>`

      <button
        type="button"
        class="cat ${
          category === currentCategory
          ? "active"
          : ""
        }"
        data-category="${escapeHTML(category)}"
      >
        ${escapeHTML(category)}
      </button>

    `).join("");

  document
    .querySelectorAll("[data-category]")
    .forEach(button=>{

      button.onclick = ()=>{

        currentCategory =
          button.dataset.category;

        renderCategories();

        renderProducts();

      };

    });

}


/* =========================================================
   FILTRE
========================================================= */

function filteredProducts(){

  let list = [...products];

  if(currentCategory !== "Tous"){

    list =
      list.filter(
        product =>
          product.category === currentCategory
      );

  }

  if(searchText.trim()){

    const query =
      searchText
        .toLowerCase()
        .trim();

    list =
      list.filter(product =>
        product.name
          .toLowerCase()
          .includes(query) ||
        product.category
          .toLowerCase()
          .includes(query)
      );

  }

  if(currentSort === "priceAsc"){

    list.sort(
      (a,b)=>a.price-b.price
    );

  }

  if(currentSort === "priceDesc"){

    list.sort(
      (a,b)=>b.price-a.price
    );

  }

  if(currentSort === "name"){

    list.sort(
      (a,b)=>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );

  }

  return list;

}


/* =========================================================
   PRODUITS
========================================================= */

function renderProducts(){

  const list =
    filteredProducts();

  if(!list.length){

    $("products").innerHTML = `

      <div class="empty">

        <h2>Aucun produit trouvé 😕</h2>

        <p>
          Essaie une autre recherche.
        </p>

      </div>

    `;

    return;

  }

  $("products").innerHTML =
    list.map(product=>`

      <article class="card">

        <div
          class="card-img"
          data-product="${product.id}"
        >

          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
            referrerpolicy="no-referrer"
            onerror="
              this.onerror=null;
              this.src='${FALLBACK_IMAGE}'
            "
          >

        </div>

        <div class="card-body">

          ${
            product.new
            ? `<span class="badge">NOUVEAU</span>`
            : ""
          }

          <h3>
            ${escapeHTML(product.name)}
          </h3>

          <div class="category">
            ${escapeHTML(product.category)}
          </div>

          <div class="price">
            ${money(product.price)}
          </div>

          <div class="card-actions">

            <button
              type="button"
              class="buy"
              data-open-product="${product.id}"
            >
              Voir
            </button>

            <button
              type="button"
              class="fav ${
                favorites.includes(product.id)
                ? "active"
                : ""
              }"
              data-favorite="${product.id}"
            >
              ${
                favorites.includes(product.id)
                ? "♥"
                : "♡"
              }
            </button>

          </div>

        </div>

      </article>

    `).join("");

  document
    .querySelectorAll("[data-open-product]")
    .forEach(button=>{

      button.onclick = event => {

        event.stopPropagation();

        openProduct(
          button.dataset.openProduct
        );

      };

    });

  document
    .querySelectorAll("[data-product]")
    .forEach(image=>{

      image.onclick = ()=>{

        openProduct(
          image.dataset.product
        );

      };

    });

  document
    .querySelectorAll("[data-favorite]")
    .forEach(button=>{

      button.onclick = event => {

        event.stopPropagation();

        toggleFavorite(
          button.dataset.favorite
        );

      };

    });

}


/* =========================================================
   DETAIL PRODUIT
========================================================= */

function openProduct(id){

  const product =
    getProduct(id);

  if(!product)return;

  openModal(`

    <div class="product-detail">

      <div class="product-detail-image">

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          referrerpolicy="no-referrer"
          onerror="
            this.onerror=null;
            this.src='${FALLBACK_IMAGE}'
          "
        >

      </div>

      <div class="detail-info">

        ${
          product.new
          ? `<span class="badge">NOUVEAU</span>`
          : ""
        }

        <h1>
          ${escapeHTML(product.name)}
        </h1>

        <div class="category">
          ${escapeHTML(product.category)}
        </div>

        <div class="price">
          ${money(product.price)}
        </div>

        <p>
          Produit disponible sur NovaShop.
          Ajoute-le à ton panier pour continuer.
        </p>

        <button
          type="button"
          class="primary"
          id="detailAdd"
          style="width:100%"
        >
          🛒 Ajouter au panier
        </button>

        <button
          type="button"
          class="secondary"
          id="detailFavorite"
          style="width:100%;margin-top:10px"
        >
          ${
            favorites.includes(product.id)
            ? "♥ Retirer des favoris"
            : "♡ Ajouter aux favoris"
          }
        </button>

      </div>

    </div>

  `);

  $("detailAdd").onclick = ()=>{

    addToCart(product.id);

    closeModal();

  };

  $("detailFavorite").onclick = ()=>{

    toggleFavorite(product.id);

    openProduct(product.id);

  };

}


/* =========================================================
   PANIER
========================================================= */

function addToCart(id){

  const product =
    getProduct(id);

  if(!product)return;

  const existing =
    cart.find(
      item => item.id === id
    );

  if(existing){

    existing.qty =
      Number(existing.qty || 0) + 1;

  }else{

    cart.push({
      id:id,
      qty:1
    });

  }

  saveCart();

  updateBadge();

  toast(
    "Produit ajouté au panier 🛒"
  );

}

function removeFromCart(id){

  cart =
    cart.filter(
      item => item.id !== id
    );

  saveCart();

  updateBadge();

  renderCart();

}

function changeQty(id,amount){

  const item =
    cart.find(
      x => x.id === id
    );

  if(!item)return;

  item.qty =
    Number(item.qty || 0) + amount;

  if(item.qty <= 0){

    removeFromCart(id);

    return;

  }

  saveCart();

  updateBadge();

  renderCart();

}


/* =========================================================
   BADGE
========================================================= */

function updateBadge(){

  const badge =
    $("cartBadge");

  if(!badge)return;

  badge.textContent =
    cartCount();

}


/* =========================================================
   RENDU PANIER
========================================================= */

function renderCart(){

  if(!cart.length){

    openModal(`

      <h2>🛒 Ton panier</h2>

      <div class="empty">

        <h3>Ton panier est vide</h3>

        <p>
          Ajoute un produit pour continuer.
        </p>

      </div>

    `);

    return;

  }

  let html = `

    <h2>🛒 Ton panier</h2>

  `;

  cart.forEach(item=>{

    const product =
      getProduct(item.id);

    if(!product)return;

    html += `

      <div class="cart-item">

        <img
          src="${escapeHTML(product.image)}"
          alt=""
          referrerpolicy="no-referrer"
          onerror="
            this.onerror=null;
            this.src='${FALLBACK_IMAGE}'
          "
        >

        <div class="cart-info">

          <h3>
            ${escapeHTML(product.name)}
          </h3>

          <div class="category">
            ${money(product.price)} / unité
          </div>

          <div class="qty">

            <button
              type="button"
              data-minus="${product.id}"
            >
              −
            </button>

            <b>
              ${item.qty}
            </b>

            <button
              type="button"
              data-plus="${product.id}"
            >
              +
            </button>

            <button
              type="button"
              data-remove="${product.id}"
              style="margin-left:8px"
            >
              🗑️
            </button>

          </div>

        </div>

      </div>

    `;

  });

  html += `

    <div class="cart-total">

      <span>Total</span>

      <span>
        ${money(cartTotal())}
      </span>

    </div>

    <button
      type="button"
      class="primary"
      id="goCheckout"
      style="width:100%;margin-top:18px"
    >
      💳 Passer au paiement
    </button>

  `;

  openModal(html);

  document
    .querySelectorAll("[data-minus]")
    .forEach(button=>{

      button.onclick = ()=>{

        changeQty(
          button.dataset.minus,
          -1
        );

      };

    });

  document
    .querySelectorAll("[data-plus]")
    .forEach(button=>{

      button.onclick = ()=>{

        changeQty(
          button.dataset.plus,
          1
        );

      };

    });

  document
    .querySelectorAll("[data-remove]")
    .forEach(button=>{

      button.onclick = ()=>{

        removeFromCart(
          button.dataset.remove
        );

      };

    });

  $("goCheckout").onclick =
    renderCheckout;

}


/* =========================================================
   FAVORIS
========================================================= */

function toggleFavorite(id){

  if(favorites.includes(id)){

    favorites =
      favorites.filter(
        x => x !== id
      );

    toast(
      "Retiré des favoris"
    );

  }else{

    favorites.push(id);

    toast(
      "Ajouté aux favoris ❤️"
    );

  }

  saveFavorites();

  renderProducts();

}


/* =========================================================
   FAVORIS
========================================================= */

function renderFavorites(){

  const list =
    products.filter(
      product =>
        favorites.includes(product.id)
    );

  if(!list.length){

    openModal(`

      <h2>❤️ Mes favoris</h2>

      <div class="empty">

        <h3>Aucun favori</h3>

        <p>
          Ajoute des produits avec ♡.
        </p>

      </div>

    `);

    return;

  }

  openModal(`

    <h2>❤️ Mes favoris</h2>

    <div
      class="products"
      id="favoriteProducts"
    ></div>

  `);

  $("favoriteProducts").innerHTML =
    list.map(product=>`

      <article class="card">

        <div
          class="card-img"
          data-fav-product="${product.id}"
        >

          <img
            src="${escapeHTML(product.image)}"
            alt=""
            referrerpolicy="no-referrer"
            onerror="
              this.onerror=null;
              this.src='${FALLBACK_IMAGE}'
            "
          >

        </div>

        <div class="card-body">

          <h3>
            ${escapeHTML(product.name)}
          </h3>

          <div class="category">
            ${escapeHTML(product.category)}
          </div>

          <div class="price">
            ${money(product.price)}
          </div>

          <button
            type="button"
            class="primary"
            data-fav-open="${product.id}"
            style="width:100%;margin-top:12px"
          >
            Voir
          </button>

        </div>

      </article>

    `).join("");

  document
    .querySelectorAll("[data-fav-open]")
    .forEach(button=>{

      button.onclick = ()=>{

        openProduct(
          button.dataset.favOpen
        );

      };

    });

}


/* =========================================================
   CHECKOUT
========================================================= */

function renderCheckout(){

  if(!cart.length){

    renderCart();

    return;

  }

  const total =
    cartTotal();

  openModal(`

    <h2>💳 Paiement</h2>

    <div
      style="
        margin-top:18px;
        padding:16px;
        background:#101c2e;
        border:1px solid #24344c;
        border-radius:14px;
      "
    >

      <div
        style="
          color:#94a3b8;
          font-size:14px;
        "
      >
        Total de la commande
      </div>

      <div
        style="
          font-size:30px;
          font-weight:900;
          margin-top:7px;
        "
      >
        ${money(total)}
      </div>

    </div>

    <div class="payment-grid">

      <button
        type="button"
        class="payment ${
          selectedPayment === "card"
          ? "active"
          : ""
        }"
        data-payment="card"
      >

        <div class="payment-icon">
          💳
        </div>

        <div class="payment-name">
          Carte bancaire
        </div>

        <div class="payment-desc">
          Paiement sécurisé via PayPal
        </div>

      </button>

      <button
        type="button"
        class="payment ${
          selectedPayment === "paypal"
          ? "active"
          : ""
        }"
        data-payment="paypal"
      >

        <div class="payment-icon">
          🅿️
        </div>

        <div class="payment-name">
          PayPal
        </div>

        <div class="payment-desc">
          Payer avec PayPal
        </div>

      </button>

    </div>

    <div class="payment-panel">

      ${
        selectedPayment === "card"
        ? `

          <p>
            Tu vas être envoyé vers PayPal
            pour effectuer le paiement par carte.
          </p>

          <button
            type="button"
            class="primary"
            id="payButton"
            style="width:100%;margin-top:12px"
          >
            💳 Continuer avec PayPal
          </button>

        `
        : `

          <p>
            Tu vas être envoyé vers PayPal
            pour effectuer le paiement.
          </p>

          <button
            type="button"
            class="primary"
            id="payButton"
            style="width:100%;margin-top:12px"
          >
            🅿️ Payer avec PayPal
          </button>

        `
      }

    </div>

    <div
      class="form"
      style="margin-top:18px"
    >

      <input
        id="customerName"
        placeholder="Nom"
      >

      <input
        id="customerEmail"
        type="email"
        placeholder="Email"
      >

    </div>

  `);

  document
    .querySelectorAll("[data-payment]")
    .forEach(button=>{

      button.onclick = ()=>{

        selectedPayment =
          button.dataset.payment;

        renderCheckout();

      };

    });

  $("payButton").onclick =
    openPayPal;

}


/* =========================================================
   PAYPAL
========================================================= */

function openPayPal(){

  const total =
    cartTotal();

  if(!total || total <= 0){

    toast(
      "Montant invalide"
    );

    return;

  }

  const name =
    $("customerName")
    ?.value
    ?.trim() || "";

  const email =
    $("customerEmail")
    ?.value
    ?.trim() || "";

  saveOrderLocal(
    name,
    email
  );

  const amount =
    total.toFixed(2);

  const url =
    PAYPAL_LINK + "/" + amount;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

  toast(
    selectedPayment === "card"
    ? "Ouverture de PayPal pour la carte 💳"
    : "Ouverture de PayPal 🅿️"
  );

}


/* =========================================================
   COMMANDE LOCALE
========================================================= */

function saveOrderLocal(
  name,
  email
){

  const order = {

    id:
      "NOVA-" +
      Date.now(),

    name:name,

    email:email,

    payment:
      selectedPayment,

    total:
      cartTotal(),

    items:
      cart.map(item=>({
        id:item.id,
        qty:item.qty
      })),

    status:
      "pending",

    date:
      new Date().toISOString()

  };

  const orders =
    JSON.parse(
      localStorage.getItem(
        "novaOrders"
      ) || "[]"
    );

  orders.push(order);

  localStorage.setItem(
    "novaOrders",
    JSON.stringify(orders)
  );

}


/* =========================================================
   FIREBASE AUTH
========================================================= */

function authErrorMessage(error){

  const code =
    error?.code || "";

  const messages = {

    "auth/invalid-credential":
      "Email ou mot de passe incorrect.",

    "auth/invalid-email":
      "Adresse email invalide.",

    "auth/user-not-found":
      "Utilisateur introuvable.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/email-already-in-use":
      "Cette adresse email est déjà utilisée.",

    "auth/weak-password":
      "Mot de passe trop faible.",

    "auth/api-key-not-valid":
      "La clé API Firebase est invalide.",

    "auth/network-request-failed":
      "Erreur réseau.",

    "auth/too-many-requests":
      "Trop de tentatives."

  };

  return (
    messages[code] ||
    error?.message ||
    "Erreur inconnue."
  );

}


/* =========================================================
   CONNEXION
========================================================= */

async function login(
  email,
  password
){

  try{

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    toast(
      "Connexion réussie ✅"
    );

    closeModal();

  }catch(error){

    console.error(error);

    toast(
      authErrorMessage(error)
    );

  }

}


/* =========================================================
   INSCRIPTION
========================================================= */

async function register(
  email,
  password
){

  try{

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    toast(
      "Compte créé ✅"
    );

    closeModal();

  }catch(error){

    console.error(error);

    toast(
      authErrorMessage(error)
    );

  }

}


/* =========================================================
   MODAL COMPTE
========================================================= */

function openAccount(){

  if(currentUser){

    openModal(`

      <h2>👤 Mon compte</h2>

      <div class="account-box">

        <div
          style="
            padding:16px;
            background:#111c2d;
            border-radius:12px;
          "
        >

          <b>Connecté</b>

          <p
            style="
              color:#94a3b8;
              margin-top:7px;
            "
          >
            ${escapeHTML(
              currentUser.email
            )}
          </p>

        </div>

        <button
          type="button"
          class="secondary"
          id="myOrdersBtn"
        >
          📦 Mes commandes
        </button>

        <button
          type="button"
          class="danger"
          id="logoutBtn"
        >
          🚪 Se déconnecter
        </button>

      </div>

    `);

    $("myOrdersBtn").onclick =
      openOrders;

    $("logoutBtn").onclick =
      async ()=>{

        await signOut(auth);

        closeModal();

        toast(
          "Déconnexion réussie"
        );

      };

    return;

  }

  openModal(`

    <h2>👤 Connexion</h2>

    <form
      id="loginForm"
      class="form"
    >

      <input
        id="loginEmail"
        type="email"
        placeholder="Email"
        required
      >

      <input
        id="loginPassword"
        type="password"
        placeholder="Mot de passe"
        required
      >

      <button
        type="submit"
        class="primary"
      >
        Se connecter
      </button>

    </form>

    <button
      type="button"
      class="secondary"
      id="registerBtn"
      style="width:100%;margin-top:10px"
    >
      Créer un compte
    </button>

  `);

  $("loginForm").onsubmit =
    event=>{

      event.preventDefault();

      login(
        $("loginEmail").value.trim(),
        $("loginPassword").value
      );

    };

  $("registerBtn").onclick =
    openRegister;

}


/* =========================================================
   INSCRIPTION MODAL
========================================================= */

function openRegister(){

  openModal(`

    <h2>📝 Créer un compte</h2>

    <form
      id="registerForm"
      class="form"
    >

      <input
        id="registerEmail"
        type="email"
        placeholder="Email"
        required
      >

      <input
        id="registerPassword"
        type="password"
        placeholder="Mot de passe"
        required
      >

      <button
        type="submit"
        class="primary"
      >
        Créer mon compte
      </button>

    </form>

    <button
      type="button"
      class="secondary"
      id="backLoginBtn"
      style="width:100%;margin-top:10px"
    >
      Retour à la connexion
    </button>

  `);

  $("registerForm").onsubmit =
    event=>{

      event.preventDefault();

      register(
        $("registerEmail").value.trim(),
        $("registerPassword").value
      );

    };

  $("backLoginBtn").onclick =
    openAccount;

}


/* =========================================================
   COMMANDES UTILISATEUR
========================================================= */

async function openOrders(){

  if(!currentUser){

    openAccount();

    return;

  }

  try{

    const q =
      query(
        collection(db,"orders"),
        where(
          "userId",
          "==",
          currentUser.uid
        ),
        orderBy(
          "createdAt",
          "desc"
        )
      );

    const snapshot =
      await getDocs(q);

    const orders =
      snapshot.docs.map(
        item=>({
          id:item.id,
          ...item.data()
        })
      );

    if(!orders.length){

      openModal(`

        <h2>📦 Mes commandes</h2>

        <div class="empty">

          <h3>Aucune commande</h3>

          <p>
            Tes commandes apparaîtront ici.
          </p>

        </div>

      `);

      return;

    }

    openModal(`

      <h2>📦 Mes commandes</h2>

      ${
        orders.map(order=>`

          <div
            style="
              padding:15px;
              border:1px solid #1e293b;
              border-radius:12px;
              margin-bottom:10px;
              background:#0d1728;
            "
          >

            <b>
              Commande #${order.id.slice(0,8)}
            </b>

            <p style="margin-top:8px">
              Total :
              <strong>
                ${money(order.total)}
              </strong>
            </p>

            <p style="margin-top:6px;color:#94a3b8">
              Paiement :
              ${escapeHTML(
                order.paymentMethod ||
                order.payment ||
                "Non défini"
              )}
            </p>

            <p style="margin-top:6px;color:#94a3b8">
              Statut :
              ${escapeHTML(
                order.paymentStatus ||
                order.status ||
                "pending"
              )}
            </p>

          </div>

        `).join("")
      }

    `);

  }catch(error){

    console.error(error);

    toast(
      "Impossible de charger les commandes."
    );

  }

}


/* =========================================================
   DASHBOARD ADMIN
========================================================= */

function isAdmin(){

  return Boolean(
    currentUser &&
    currentUser.email?.toLowerCase() ===
      ADMIN_EMAIL.toLowerCase() &&
    localStorage.getItem(
      ADMIN_ACCESS_KEY
    ) === "true"
  );

}


/* =========================================================
   OUVRIR ADMIN
========================================================= */

function openAdmin(){

  if(!currentUser){

    toast(
      "Connecte-toi d'abord."
    );

    openAccount();

    return;

  }

  if(
    currentUser.email?.toLowerCase() !==
    ADMIN_EMAIL.toLowerCase()
  ){

    toast(
      "Accès administrateur refusé."
    );

    return;

  }

  const code =
    prompt(
      "Code administrateur :"
    );

  if(code !== ADMIN_CODE){

    toast(
      "Code administrateur incorrect."
    );

    return;

  }

  localStorage.setItem(
    ADMIN_ACCESS_KEY,
    "true"
  );

  adminMode = true;

  renderAdmin();

}


/* =========================================================
   DASHBOARD
========================================================= */

async function renderAdmin(){

  if(!isAdmin()){

    toast(
      "Accès admin refusé."
    );

    return;

  }

  openModal(`

    <h2>⚙️ Dashboard NovaShop</h2>

    <div
      style="
        padding:16px;
        background:#111c2d;
        border-radius:12px;
        margin-bottom:18px;
      "
    >

      <strong>
        👑 Administrateur
      </strong>

      <p
        style="
          color:#94a3b8;
          margin-top:7px;
        "
      >
        ${ADMIN_EMAIL}
      </p>

    </div>

    <div id="adminOrders">
      Chargement des commandes...
    </div>

  `);

  try{

    const q =
      query(
        collection(db,"orders"),
        orderBy(
          "createdAt",
          "desc"
        )
      );

    const snapshot =
      await getDocs(q);

    const orders =
      snapshot.docs.map(
        item=>({
          id:item.id,
          ...item.data()
        })
      );

    const container =
      $("adminOrders");

    if(!orders.length){

      container.innerHTML = `

        <div class="empty">

          <h3>
            Aucune commande
          </h3>

        </div>

      `;

      return;

    }

    container.innerHTML =
      orders.map(order=>`

        <div class="admin-order">

          <strong>
            📦 #${order.id.slice(0,8)}
          </strong>

          <p>
            Client :
            ${escapeHTML(
              order.customer?.name ||
              order.name ||
              "Client"
            )}
          </p>

          <p>
            Email :
            ${escapeHTML(
              order.customer?.email ||
              order.email ||
              ""
            )}
          </p>

          <p>
            Total :
            <strong>
              ${money(order.total)}
            </strong>
          </p>

          <p>
            Paiement :
            ${escapeHTML(
              order.paymentMethod ||
              order.payment ||
              "Non défini"
            )}
          </p>

          <p>
            Statut :
            <strong>
              ${escapeHTML(
                order.paymentStatus ||
                order.status ||
                "pending"
              )}
            </strong>
          </p>

          <button
            type="button"
            class="primary"
            data-mark-paid="${order.id}"
            style="margin-top:12px"
          >
            ✅ Marquer payé
          </button>

        </div>

      `).join("");

    document
      .querySelectorAll(
        "[data-mark-paid]"
      )
      .forEach(button=>{

        button.onclick =
          ()=>markOrderPaid(
            button.dataset.markPaid
          );

      });

  }catch(error){

    console.error(error);

    $("adminOrders").innerHTML = `

      <div
        style="
          padding:15px;
          background:#3f1111;
          border-radius:12px;
        "
      >
        Erreur :
        ${escapeHTML(error.message)}
      </div>

    `;

  }

}


/* =========================================================
   MARQUER PAYE
========================================================= */

async function markOrderPaid(id){

  if(!isAdmin()){

    toast(
      "Accès refusé."
    );

    return;

  }

  try{

    await updateDoc(
      doc(db,"orders",id),
      {
        paymentStatus:"paid",
        paidAt:serverTimestamp()
      }
    );

    toast(
      "Commande marquée comme payée ✅"
    );

    renderAdmin();

  }catch(error){

    console.error(error);

    toast(
      "Impossible de modifier la commande."
    );

  }

}


/* =========================================================
   BOUTONS PRINCIPAUX
========================================================= */

$("closeModal").onclick =
  closeModal;


$("overlay").addEventListener(
  "click",
  event=>{

    if(
      event.target ===
      $("overlay")
    ){

      closeModal();

    }

  }
);


$("cartBtn").onclick =
  renderCart;


$("favoritesBtn").onclick =
  renderFavorites;


$("accountBtn").onclick =
  openAccount;


$("adminBtn").onclick =
  openAdmin;


$("shopBtn").onclick =
  ()=>{

    $("shop").scrollIntoView({
      behavior:"smooth"
    });

  };


/* =========================================================
   RECHERCHE
========================================================= */

$("search").addEventListener(
  "input",
  event=>{

    searchText =
      event.target.value;

    renderProducts();

  }
);


/* =========================================================
   TRI
========================================================= */

$("sort").addEventListener(
  "change",
  event=>{

    currentSort =
      event.target.value;

    renderProducts();

  }
);


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
  "keydown",
  event=>{

    if(event.key === "Escape"){

      closeModal();

    }

  }
);


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user=>{

    currentUser = user;

    if(
      !user ||
      user.email?.toLowerCase() !==
      ADMIN_EMAIL.toLowerCase()
    ){

      adminMode = false;

      localStorage.removeItem(
        ADMIN_ACCESS_KEY
      );

    }

  }
);


/* =========================================================
   INITIALISATION
========================================================= */

renderCategories();

renderProducts();

updateBadge();

console.log(
  "NovaShop chargé :",
  products.length,
  "produits ✅"
);

console.log(
  "Paiement PayPal :",
  PAYPAL_LINK
);


/* =========================================================
   API
========================================================= */

window.NovaShop = {

  products,

  getProduct,

  addToCart,

  removeFromCart,

  changeQty,

  toggleFavorite,

  openProduct,

  renderCart,

  renderCheckout,

  openAccount,

  openOrders,

  openAdmin,

  get cart(){
    return cart;
  },

  get favorites(){
    return favorites;
  },

  get currentUser(){
    return currentUser;
  },

  get total(){
    return cartTotal();
  }

};
