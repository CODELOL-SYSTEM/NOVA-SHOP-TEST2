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

let analytics = null;

try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn("Analytics indisponible :", error);
}

const auth = getAuth(app);
const db = getFirestore(app);


/* =========================================================
   ADMIN
========================================================= */

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
    id: "p1",
    name: "Gigabyte B650 AORUS Elite AX",
    category: "Composants",
    price: 189.99,
    image: "https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"
  },

  {
    id: "p2",
    name: "PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category: "PC Gamer",
    price: 2237.65,
    image: "https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png"
  },

  {
    id: "p3",
    name: "HyperX Cloud II",
    category: "Casques",
    price: 49.99,
    image: "https://fr.hyperx.com/cdn/shop/files/hyperx_cloud_ii_red_1_main.jpg?v=1764129756"
  },

  {
    id: "p4",
    name: "TECORS Clavier Gamer Mécanique 60% AZERTY",
    category: "Claviers",
    price: 30,
    image: "https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg"
  },

  {
    id: "p5",
    name: "Clavier Magnétique 65% Celshading Noir",
    category: "Claviers",
    price: 120.90,
    image: "https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832"
  },

  {
    id: "p6",
    name: "Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category: "Souris",
    price: 49.99,
    image: "https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif"
  },

  {
    id: "p7",
    name: "Logitech G PRO X2 Superstrike Blanc et Noir",
    category: "Souris",
    price: 150.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg"
  },

  {
    id: "p8",
    name: "Samsung 990 PRO 1TB",
    category: "Stockage",
    price: 249.99,
    image: "https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg"
  },

  {
    id: "p9",
    name: "Samsung 990 PRO 2TB",
    category: "Stockage",
    price: 199.93,
    image: "https://pc.comparer.fr/500x500/310191422.webp"
  },

  {
    id: "p10",
    name: "CORSAIR RM1000x EU",
    category: "Alimentations",
    price: 159.90,
    image: "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp"
  },

  {
    id: "p11",
    name: "CORSAIR RM850x EU",
    category: "Alimentations",
    price: 134.90,
    image: "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp"
  },

  {
    id: "p12",
    name: "Corsair Frame 5000D RS ARGB Noir",
    category: "Boîtiers",
    price: 159.90,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg"
  },

  {
    id: "p13",
    name: "ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category: "Refroidissement",
    price: 129.90,
    image: "https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg"
  },

  {
    id: "p14",
    name: "Samsung 27 QD-OLED Odyssey G6",
    category: "Écrans",
    price: 399.95,
    image: "https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg"
  },

  {
    id: "p15",
    name: "ELGATO Wave Mic Arm Pro",
    category: "Streaming",
    price: 229.90,
    image: "https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg"
  },

  {
    id: "p16",
    name: "Sony DualSense Cosmic Red PS5/PC",
    category: "Manettes",
    price: 74.90,
    image: "https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg"
  },

  {
    id: "p17",
    name: "ASUS TUF Gaming B650-PLUS",
    category: "Composants",
    price: 179.90,
    image: "https://media.materiel.net/r550/products/MN0005986139.jpg"
  },

  {
    id: "p18",
    name: "MSI MAG B650 Tomahawk WiFi",
    category: "Composants",
    price: 189.90,
    image: "https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg"
  },

  {
    id: "p19",
    name: "KOORUI Ecran PC Gamer 27 Pouces 200Hz IPS QHD HDR400 1ms",
    category: "Écrans",
    price: 74.99,
    image: "https://m.media-amazon.com/images/I/71CJ1DF-8sL._AC_SL1500_.jpg"
  },

  {
    id: "p20",
    name: 'iiyama 23.8" LED - G-Master GB2471HS-B1 Red Eagle',
    category: "Écrans",
    price: 65.99,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/34/20/LD0006342033.jpg"
  },

  {
    id: "p21",
    name: "SONGMICS Chaise de jeu ergonomique avec repose-pieds 150 kg gris ardoise",
    category: "Chaises gaming",
    price: 129.99,
    image: "https://static.songmics.fr/fit-in/1000x1000/image/Product/B34OBG077G01/B34OBG077G01-1.jpg"
  },

  {
    id: "p22",
    name: "Dowinx Série Luxe Suède LS-66D68E Blanc",
    category: "Chaises gaming",
    price: 79.99,
    image: "https://eu.dowinx.com/cdn/shop/files/11_5f72b693-5f79-4d06-b48a-7cb2b2f0244a.png?v=1752139814&width=1220"
  },

  {
    id: "p23",
    name: "Chaise GTPLAYER Ergonomique Gaming Soutien Lombaire Repose-pieds",
    category: "Chaises gaming",
    price: 109.99,
    image: "https://thumb.pccomponentes.com/w-530-530/articles/1118/11186247/167-silla-gaming-gtplayer-ergonomica-con-reposapies-y-soporte-lumbar-4d.jpg"
  },

  {
    id: "p24",
    name: "Desk Lite - Height-Adjustable Desk",
    category: "Bureaux gaming",
    price: 110.99,
    image: "https://yaasa.com/cdn/shop/files/yaasa-desk-lite_nr01_black_100_01-04545-01_1200x.jpg?v=1753169928"
  },

  {
    id: "p25",
    name: "EUREKA ERGONOMIC Bureau Gaming LED 182x76cm en Forme d'Aile",
    category: "Bureaux gaming",
    price: 86.99,
    image: "https://m.media-amazon.com/images/I/71Gd5G3wRsL._AC_SL1500_.jpg"
  },

  {
    id: "p26",
    name: "Bureau gaming d’angle HOMCOM réversible support écran",
    category: "Bureaux gaming",
    price: 44.99,
    image: "https://cdn.manomano.com/pim-media/images/medium/74eca1cb1cefa063c8f600ee293ae6ee826794f8.jpg"
  },

  {
    id: "p27",
    name: "Logitech G Pro X 2 Lightspeed Noir + Repose casque",
    category: "Casques",
    price: 99.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/6d/e9/6e/24045933/1540-1/tsp20260429154901/Casque-PC-gaming-sans-fil-Logitech-G-Pro-X-2-Lightspeed-Noir-Repose-casque.jpg"
  },

  {
    id: "p28",
    name: "Razer BlackShark V2 Pro 2023 Noir",
    category: "Casques",
    price: 75.99,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/07/71/LD0006077125.jpg"
  },

  {
    id: "p29",
    name: "beyerdynamic DT-990 Pro 250 Ohm",
    category: "Casques",
    price: 60.99,
    image: "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_10/106865/18443258_800.jpg"
  },

  {
    id: "p30",
    name: "Logitech PRO X TKL Rapid Noir, filaire AZERTY",
    category: "Claviers",
    price: 78.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/6a/89/8f/26184042/1540-1.jpg"
  },

  {
    id: "p31",
    name: "QwertyKey75 HE Striker, Magnetic Hall Effect, Rapid Trigger, Snap Tap",
    category: "Claviers",
    price: 56.99,
    image: "https://cdn.shopify.com/s/files/1/0814/2530/1746/files/QK75-HE-STRIKER-qwertykey-tastatura-mecanica-gaming-hotswap-2025_1eee355b-72ca-46e6-a458-751384d0595c_1800x.webp?v=1771799537"
  },

  {
    id: "p32",
    name: "GravaStar Mercury K1 Clavier Gamer sans Fil en Aluminium, Noir Dégradé",
    category: "Claviers",
    price: 91.99,
    image: "https://m.media-amazon.com/images/I/6144lt2l5JL._AC_SL1200_.jpg"
  },

  {
    id: "p33",
    name: "ATTACK SHARK R11 Ultra, fibre de carbone, 8000Hz, 49g, 42000 DPI",
    category: "Souris",
    price: 26.99,
    image: "https://m.media-amazon.com/images/I/71bMz15SqcL._AC_SL1500_.jpg"
  },

  {
    id: "p34",
    name: "HyperX QuadCast 2 – Microphone USB – RGB",
    category: "Microphones",
    price: 98.99,
    image: "https://fr.hyperx.com/cdn/shop/files/hyperx_quadcast_2_872v1aa_main_1_2d47a555-f537-457b-9002-8b9e9010dc00.jpg?v=1763067608"
  },

  {
    id: "p35",
    name: "Shure SM7 dB",
    category: "Microphones",
    price: 121.99,
    image: "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_57/573672/18492412_800.jpg"
  },

  {
    id: "p36",
    name: "Razer Seiren V3 Chroma Noir",
    category: "Microphones",
    price: 13.99,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/13/25/LD0006132588.jpg"
  },

  {
    id: "p37",
    name: "Stairville LED Pixel Rail 40 RGB MKII",
    category: "Éclairage RGB",
    price: 18.90,
    image: "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449739/14448905_800.jpg"
  },

  {
    id: "p38",
    name: "Govee LED Strip Light RGBIC Wi-Fi + Bluetooth 5m Matter",
    category: "Éclairage RGB",
    price: 8,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/ab/7a/9d/27097771/1520-2/tsp20260429155350/Ruban-LED-Govee-LED-Strip-Light-RGBIC-Wi-Fi-avec-BT-5M-Matter.jpg"
  },

  {
    id: "p39",
    name: "Lampe de plafond hexagone nid d’abeille LED 2.4m x 4.8m contour bleu",
    category: "Éclairage RGB",
    price: 91.10,
    image: "https://www.discount-autosport.com/wp-content/webp-express/webp-images/uploads/2025/02/lampe-hexagone-plafond-led-4m80-contour-bleu-.jpg.webp"
  },

  {
    id: "p40",
    name: "GIGABYTE GeForce RTX 5050 WINDFORCE OC 8G",
    category: "Cartes graphiques",
    price: 147,
    image: "https://m.media-amazon.com/images/I/41kmHFMFPOL._SL500_.jpg"
  },

  {
    id: "p41",
    name: "MSI GeForce RTX 3050 LP E 6G OC",
    category: "Cartes graphiques",
    price: 100,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTCe_rha_tAAHPWnQ8VV7GIvF-uSqUaEyU61TSnwgM4CK8g3-x_3Hq4wOgH36Ri63eAiWHsvhmRJHzVrUQR9-IwMx31WH0w"
  },

  {
    id: "p42",
    name: "ASUS Dual Radeon RX 7600 EVO OC Edition 8GB GDDR6",
    category: "Cartes graphiques",
    price: 140,
    image: "https://m.media-amazon.com/images/I/81QItJufypL._AC_SL1500_.jpg"
  },

  {
    id: "p43",
    name: "PC Gamer Fixe, Ryzen 7 5700G, Vega 8, 16G DDR4, 1T SSD",
    category: "PC Gamer",
    price: 650,
    image: "https://m.media-amazon.com/images/I/81M3iU5S4QL._AC_SL1500_.jpg",
    new: true
  }

];


/* =========================================================
   DOM
========================================================= */

const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];


/* =========================================================
   STATE
========================================================= */

let currentUser = null;

let cart = JSON.parse(
  localStorage.getItem("novaCart") || "[]"
);

let favorites = JSON.parse(
  localStorage.getItem("novaFavorites") || "[]"
);

let currentCategory = "Tous";
let currentSort = "default";
let currentSearch = "";

let currentProduct = null;

let nova100Active =
  localStorage.getItem("nova100Active") === "true";

let selectedPayment = "card";

let currentOrder = null;

let adminMode =
  localStorage.getItem(ADMIN_ACCESS_KEY) === "true";


/* =========================================================
   UTILITAIRES
========================================================= */

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


function money(value) {

  return Number(value || 0).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR"
  });

}


function saveCart() {

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );

}


function saveFavorites() {

  localStorage.setItem(
    "novaFavorites",
    JSON.stringify(favorites)
  );

}


function getProduct(id) {

  return products.find(
    product => product.id === id
  );

}


function cartCount() {

  return cart.reduce(
    (total, item) => total + Number(item.qty || 0),
    0
  );

}


function cartTotal() {

  return cart.reduce((total, item) => {

    const product = getProduct(item.id);

    if (!product) return total;

    return total +
      product.price *
      Number(item.qty || 0);

  }, 0);

}


function toast(message, type = "info") {

  let container = $("#toast-container");

  if (!container) {

    container = document.createElement("div");

    container.id = "toast-container";

    container.style.position = "fixed";
    container.style.right = "20px";
    container.style.bottom = "20px";
    container.style.zIndex = "99999";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "10px";

    document.body.appendChild(container);

  }

  const element = document.createElement("div");

  element.textContent = message;

  element.style.padding = "13px 17px";
  element.style.borderRadius = "12px";
  element.style.background =
    type === "error"
      ? "#dc2626"
      : type === "success"
      ? "#16a34a"
      : "#111827";

  element.style.color = "#fff";
  element.style.fontWeight = "700";
  element.style.boxShadow =
    "0 10px 30px rgba(0,0,0,.3)";

  container.appendChild(element);

  setTimeout(() => {

    element.style.opacity = "0";
    element.style.transform = "translateY(8px)";
    element.style.transition = ".25s";

    setTimeout(() => element.remove(), 250);

  }, 2500);

}


/* =========================================================
   MODALS
========================================================= */

function closeModal() {

  $$(".modal, .overlay").forEach(element => {

    element.classList.remove("active");
    element.classList.remove("open");

  });

}


function openModal(id) {

  closeModal();

  const element = document.getElementById(id);

  if (!element) return;

  element.classList.add("active");
  element.classList.add("open");

}


/* =========================================================
   CATEGORIES
========================================================= */

function categories() {

  const categoriesList = [
    "Tous",
    ...new Set(
      products.map(product => product.category)
    )
  ];

  return categoriesList;

}


/* =========================================================
   FILTER
========================================================= */

function filteredProducts() {

  let result = [...products];

  if (currentCategory !== "Tous") {

    result = result.filter(
      product =>
        product.category === currentCategory
    );

  }

  if (currentSearch.trim()) {

    const search =
      currentSearch
        .trim()
        .toLowerCase();

    result = result.filter(product =>

      product.name
        .toLowerCase()
        .includes(search)

      ||

      product.category
        .toLowerCase()
        .includes(search)

    );

  }

  if (currentSort === "price-asc") {

    result.sort(
      (a, b) => a.price - b.price
    );

  }

  if (currentSort === "price-desc") {

    result.sort(
      (a, b) => b.price - a.price
    );

  }

  if (currentSort === "name") {

    result.sort(
      (a, b) =>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );

  }

  if (currentSort === "new") {

    result.sort(
      (a, b) =>
        Number(b.new) -
        Number(a.new)
    );

  }

  return result;

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function productCard(product) {

  const isFavorite =
    favorites.includes(product.id);

  const inCart =
    cart.find(item => item.id === product.id);

  return `

    <article
      class="product-card"
      data-product="${escapeHTML(product.id)}"
    >

      <div class="product-image">

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          referrerpolicy="no-referrer"
          onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
        >

        ${
          product.new
            ? `<span class="product-badge">NOUVEAU</span>`
            : ""
        }

        <button
          class="favorite-btn ${isFavorite ? "active" : ""}"
          data-favorite="${escapeHTML(product.id)}"
          type="button"
          aria-label="Favori"
        >
          ${isFavorite ? "♥" : "♡"}
        </button>

      </div>

      <div class="product-content">

        <div class="product-category">
          ${escapeHTML(product.category)}
        </div>

        <h3>
          ${escapeHTML(product.name)}
        </h3>

        <div class="product-bottom">

          <strong>
            ${money(product.price)}
          </strong>

          <button
            class="add-cart-btn"
            data-add-cart="${escapeHTML(product.id)}"
            type="button"
          >
            ${inCart ? "AJOUTÉ" : "AJOUTER"}
          </button>

        </div>

      </div>

    </article>

  `;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

  const grid =
    $("#products-grid") ||
    $("#product-grid") ||
    $(".products-grid");

  if (!grid) return;

  const result =
    filteredProducts();

  if (!result.length) {

    grid.innerHTML = `

      <div class="empty-products">

        <h3>Aucun produit trouvé</h3>

        <p>
          Essaie une autre recherche ou catégorie.
        </p>

      </div>

    `;

    return;

  }

  grid.innerHTML =
    result
      .map(productCard)
      .join("");

  updateProductEvents();

}


/* =========================================================
   PRODUCT EVENTS
========================================================= */

function updateProductEvents() {

  $$("[data-product]").forEach(card => {

    card.addEventListener(
      "click",
      event => {

        if (
          event.target.closest(
            "[data-add-cart], [data-favorite]"
          )
        ) return;

        const id =
          card.dataset.product;

        openProduct(id);

      }
    );

  });

  $$("[data-add-cart]").forEach(button => {

    button.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        addToCart(
          button.dataset.addCart
        );

      }
    );

  });

  $$("[data-favorite]").forEach(button => {

    button.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        toggleFavorite(
          button.dataset.favorite
        );

      }
    );

  });

}


/* =========================================================
   PRODUCT DETAIL
========================================================= */

function openProduct(id) {

  const product =
    getProduct(id);

  if (!product) return;

  currentProduct = product;

  const modal =
    $("#product-modal") ||
    $("#productModal");

  if (!modal) {

    addToCart(id);

    return;

  }

  modal.innerHTML = `

    <div class="product-detail">

      <button
        class="modal-close"
        data-close-modal
        type="button"
      >
        ×
      </button>

      <div
        class="product-detail-image"
        style="
          width:100%;
          height:420px;
          display:flex;
          align-items:center;
          justify-content:center;
          overflow:hidden;
          border-radius:18px;
          background:#111827;
        "
      >

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          referrerpolicy="no-referrer"
          onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
          style="
            width:100%;
            height:100%;
            object-fit:contain;
            display:block;
            max-width:100%;
            max-height:100%;
          "
        >

      </div>

      <div class="product-detail-info">

        <div class="product-category">
          ${escapeHTML(product.category)}
        </div>

        <h2>
          ${escapeHTML(product.name)}
        </h2>

        <div class="product-detail-price">
          ${money(product.price)}
        </div>

        <button
          type="button"
          class="add-cart-btn"
          data-detail-add="${escapeHTML(product.id)}"
        >
          AJOUTER AU PANIER
        </button>

      </div>

    </div>

  `;

  openModal(
    modal.id
  );

  const addButton =
    modal.querySelector(
      "[data-detail-add]"
    );

  if (addButton) {

    addButton.addEventListener(
      "click",
      () => {

        addToCart(id);

        closeModal();

      }
    );

  }

}


/* =========================================================
   CART
========================================================= */

function addToCart(id) {

  const product =
    getProduct(id);

  if (!product) return;

  const existing =
    cart.find(item => item.id === id);

  if (existing) {

    existing.qty =
      Number(existing.qty || 0) + 1;

  } else {

    cart.push({
      id,
      qty: 1
    });

  }

  saveCart();

  renderCart();

  updateCartBadge();

  toast(
    "Produit ajouté au panier",
    "success"
  );

}


function removeFromCart(id) {

  cart =
    cart.filter(
      item => item.id !== id
    );

  saveCart();

  renderCart();

  updateCartBadge();

}


function changeCartQty(id, amount) {

  const item =
    cart.find(
      product => product.id === id
    );

  if (!item) return;

  item.qty =
    Number(item.qty || 0) +
    Number(amount);

  if (item.qty <= 0) {

    removeFromCart(id);

    return;

  }

  saveCart();

  renderCart();

  updateCartBadge();

}


function updateCartBadge() {

  const count =
    cartCount();

  $$(
    "#cart-count, .cart-count, [data-cart-count]"
  ).forEach(element => {

    element.textContent =
      count;

    element.style.display =
      count > 0
        ? ""
        : "none";

  });

}


function renderCart() {

  const container =
    $("#cart-items") ||
    $("#cartItems");

  if (!container) return;

  if (!cart.length) {

    container.innerHTML = `

      <div class="empty-cart">

        <h3>Ton panier est vide 🛒</h3>

        <p>
          Ajoute des produits pour commencer.
        </p>

      </div>

    `;

  } else {

    container.innerHTML =
      cart.map(item => {

        const product =
          getProduct(item.id);

        if (!product) return "";

        return `

          <div
            class="cart-item"
            data-cart-item="${product.id}"
          >

            <img
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(product.name)}"
              referrerpolicy="no-referrer"
              onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
            >

            <div class="cart-item-info">

              <strong>
                ${escapeHTML(product.name)}
              </strong>

              <span>
                ${money(product.price)}
              </span>

              <div class="cart-quantity">

                <button
                  type="button"
                  data-cart-minus="${product.id}"
                >
                  −
                </button>

                <span>
                  ${item.qty}
                </span>

                <button
                  type="button"
                  data-cart-plus="${product.id}"
                >
                  +
                </button>

              </div>

            </div>

            <button
              type="button"
              data-cart-remove="${product.id}"
            >
              🗑
            </button>

          </div>

        `;

      }).join("");

  }

  const total =
    $("#cart-total") ||
    $("#cartTotal");

  if (total) {

    total.textContent =
      money(cartTotal());

  }

  $$("[data-cart-minus]").forEach(button => {

    button.onclick = () =>
      changeCartQty(
        button.dataset.cartMinus,
        -1
      );

  });

  $$("[data-cart-plus]").forEach(button => {

    button.onclick = () =>
      changeCartQty(
        button.dataset.cartPlus,
        1
      );

  });

  $$("[data-cart-remove]").forEach(button => {

    button.onclick = () =>
      removeFromCart(
        button.dataset.cartRemove
      );

  });

}


/* =========================================================
   FAVORITES
========================================================= */

function toggleFavorite(id) {

  if (
    favorites.includes(id)
  ) {

    favorites =
      favorites.filter(
        favorite => favorite !== id
      );

    toast(
      "Retiré des favoris"
    );

  } else {

    favorites.push(id);

    toast(
      "Ajouté aux favoris",
      "success"
    );

  }

  saveFavorites();

  renderProducts();

}


/* =========================================================
   AUTH ERROR
========================================================= */

function authErrorMessage(error) {

  const code =
    error?.code || "";

  const messages = {

    "auth/invalid-credential":
      "Email ou mot de passe incorrect.",

    "auth/invalid-login-credentials":
      "Email ou mot de passe incorrect.",

    "auth/user-not-found":
      "Aucun compte avec cet email.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/email-already-in-use":
      "Cet email est déjà utilisé.",

    "auth/weak-password":
      "Le mot de passe doit contenir au moins 6 caractères.",

    "auth/invalid-email":
      "Adresse email invalide.",

    "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
      "La clé API Firebase n'est pas acceptée.",

    "auth/network-request-failed":
      "Problème de connexion Internet."

  };

  return (
    messages[code] ||
    error?.message ||
    "Une erreur est survenue."
  );

}


/* =========================================================
   LOGIN
========================================================= */

async function login(email, password) {

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    toast(
      "Connexion réussie",
      "success"
    );

    closeModal();

  } catch (error) {

    console.error(error);

    toast(
      authErrorMessage(error),
      "error"
    );

  }

}


/* =========================================================
   REGISTER
========================================================= */

async function register(email, password) {

  try {

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    toast(
      "Compte créé avec succès",
      "success"
    );

    closeModal();

  } catch (error) {

    console.error(error);

    toast(
      authErrorMessage(error),
      "error"
    );

  }

}


/* =========================================================
   AUTH MODAL
========================================================= */

function setupAuth() {

  $$("[data-login]").forEach(button => {

    button.addEventListener(
      "click",
      () => openAuthModal("login")
    );

  });

  $$("[data-register]").forEach(button => {

    button.addEventListener(
      "click",
      () => openAuthModal("register")
    );

  });

}


function openAuthModal(mode = "login") {

  const modal =
    $("#auth-modal") ||
    $("#authModal");

  if (!modal) return;

  const registerMode =
    mode === "register";

  modal.innerHTML = `

    <div class="auth-box">

      <button
        type="button"
        class="modal-close"
        data-close-modal
      >
        ×
      </button>

      <h2>
        ${registerMode ? "Créer un compte" : "Connexion"}
      </h2>

      <form id="auth-form">

        <input
          id="auth-email"
          type="email"
          placeholder="Email"
          required
        >

        <input
          id="auth-password"
          type="password"
          placeholder="Mot de passe"
          minlength="6"
          required
        >

        <button type="submit">

          ${registerMode
            ? "CRÉER MON COMPTE"
            : "SE CONNECTER"}

        </button>

      </form>

      <button
        type="button"
        id="switch-auth"
      >

        ${
          registerMode
            ? "J'ai déjà un compte"
            : "Créer un compte"
        }

      </button>

    </div>

  `;

  openModal(
    modal.id
  );

  $("#auth-form")?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const email =
        $("#auth-email").value.trim();

      const password =
        $("#auth-password").value;

      if (registerMode) {

        await register(
          email,
          password
        );

      } else {

        await login(
          email,
          password
        );

      }

    }
  );

  $("#switch-auth")?.addEventListener(
    "click",
    () => {

      openAuthModal(
        registerMode
          ? "login"
          : "register"
      );

    }
  );

}


/* =========================================================
   ACCOUNT
========================================================= */

function updateAccountUI() {

  $$(
    "[data-user-email], .user-email"
  ).forEach(element => {

    element.textContent =
      currentUser
        ? currentUser.email
        : "Compte";

  });

  $$(
    "[data-logout]"
  ).forEach(button => {

    button.style.display =
      currentUser
        ? ""
        : "none";

  });

  $$(
    "[data-login]"
  ).forEach(button => {

    button.style.display =
      currentUser
        ? "none"
        : "";

  });

}


function setupAccount() {

  $$("[data-logout]").forEach(button => {

    button.addEventListener(
      "click",
      async () => {

        try {

          await signOut(auth);

          toast(
            "Déconnexion réussie",
            "success"
          );

        } catch (error) {

          toast(
            error.message,
            "error"
          );

        }

      }
    );

  });

}


/* =========================================================
   ORDERS
========================================================= */

async function getUserOrders() {

  if (!currentUser)
    return [];

  try {

    const q =
      query(
        collection(db, "orders"),
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

    return snapshot.docs.map(
      document => ({
        id: document.id,
        ...document.data()
      })
    );

  } catch (error) {

    console.error(
      "Erreur commandes :",
      error
    );

    return [];

  }

}


async function openOrders() {

  if (!currentUser) {

    openAuthModal("login");

    return;

  }

  const modal =
    $("#orders-modal") ||
    $("#ordersModal");

  if (!modal) return;

  modal.innerHTML = `

    <div class="orders-box">

      <button
        class="modal-close"
        data-close-modal
        type="button"
      >
        ×
      </button>

      <h2>Mes commandes</h2>

      <div id="orders-list">
        Chargement...
      </div>

    </div>

  `;

  openModal(
    modal.id
  );

  const orders =
    await getUserOrders();

  const list =
    $("#orders-list");

  if (!list) return;

  if (!orders.length) {

    list.innerHTML = `
      <p>Aucune commande pour le moment.</p>
    `;

    return;

  }

  list.innerHTML =
    orders.map(order => `

      <button
        type="button"
        class="order-card"
        data-order-id="${order.id}"
      >

        <strong>
          Commande #${order.id.slice(0, 8)}
        </strong>

        <span>
          ${money(order.total)}
        </span>

        <small>
          ${escapeHTML(order.status || "En attente")}
        </small>

      </button>

    `).join("");

  $$("[data-order-id]").forEach(button => {

    button.onclick = () =>
      openOrderDetail(
        button.dataset.orderId
      );

  });

}


/* =========================================================
   ORDER DETAIL
========================================================= */

async function openOrderDetail(orderId) {

  if (!currentUser) return;

  try {

    const snapshot =
      await getDoc(
        doc(db, "orders", orderId)
      );

    if (!snapshot.exists()) {

      toast(
        "Commande introuvable",
        "error"
      );

      return;

    }

    const order =
      snapshot.data();

    const isOwner =
      order.userId === currentUser.uid;

    const isAdminUser =
      currentUser.email?.toLowerCase() ===
      ADMIN_EMAIL.toLowerCase() &&
      adminMode;

    if (
      !isOwner &&
      !isAdminUser
    ) {

      toast(
        "Accès refusé",
        "error"
      );

      return;

    }

    currentOrder = {
      id: snapshot.id,
      ...order
    };

    const modal =
      $("#order-detail-modal") ||
      $("#orderDetailModal");

    if (!modal) return;

    modal.innerHTML = `

      <div class="order-detail-box">

        <button
          class="modal-close"
          data-close-modal
          type="button"
        >
          ×
        </button>

        <h2>
          Commande #${snapshot.id.slice(0, 8)}
        </h2>

        <p>
          Statut :
          <strong>
            ${escapeHTML(order.status || "En attente")}
          </strong>
        </p>

        <p>
          Paiement :
          <strong>
            ${escapeHTML(order.paymentMethod || "Non défini")}
          </strong>
        </p>

        <p>
          Paiement :
          <strong>
            ${escapeHTML(order.paymentStatus || "pending")}
          </strong>
        </p>

        <div class="order-products">

          ${
            (order.items || [])
              .map(item => `

                <div class="order-product">

                  <span>
                    ${escapeHTML(item.name)}
                    × ${item.qty}
                  </span>

                  <strong>
                    ${money(item.price * item.qty)}
                  </strong>

                </div>

              `)
              .join("")
          }

        </div>

        <div class="order-total">

          Total :
          ${money(order.total)}

        </div>

      </div>

    `;

    openModal(
      modal.id
    );

  } catch (error) {

    console.error(error);

    toast(
      "Impossible d'ouvrir la commande",
      "error"
    );

  }

}


/* =========================================================
   NOVA100
========================================================= */

function nova100Total() {

  const total =
    cartTotal();

  if (!nova100Active)
    return total;

  return Math.max(
    0,
    total * 0.90
  );

}


function activateNova100() {

  const code =
    ($("#search") ||
     $("#search-input") ||
     $("input[type='search']"))
      ?.value
      ?.trim()
      .toUpperCase();

  if (code !== "NOVA100") {

    toast(
      "Entre NOVA100 pour activer le code.",
      "error"
    );

    return;

  }

  nova100Active = true;

  localStorage.setItem(
    "nova100Active",
    "true"
  );

  toast(
    "Code NOVA100 activé : -10% 🎉",
    "success"
  );

  renderCheckout();

}


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout() {

  if (!currentUser) {

    toast(
      "Connecte-toi avant de commander.",
      "error"
    );

    openAuthModal("login");

    return;

  }

  if (!cart.length) {

    toast(
      "Ton panier est vide.",
      "error"
    );

    return;

  }

  renderCheckout();

}


function renderCheckout(saved = {}) {

  const modal =
    $("#checkout-modal") ||
    $("#checkoutModal");

  if (!modal) return;

  const subtotal =
    cartTotal();

  const total =
    nova100Total();

  modal.innerHTML = `

    <div class="checkout-box">

      <button
        class="modal-close"
        data-close-modal
        type="button"
      >
        ×
      </button>

      <h2>
        Finaliser la commande
      </h2>

      <div class="checkout-summary">

        <span>
          Sous-total
        </span>

        <strong>
          ${money(subtotal)}
        </strong>

        ${
          nova100Active
            ? `
              <span>
                NOVA100 (-10%)
              </span>

              <strong>
                -${money(subtotal - total)}
              </strong>
            `
            : ""
        }

        <span>
          Total
        </span>

        <strong>
          ${money(total)}
        </strong>

      </div>

      <form id="checkout-form">

        <input
          id="checkout-name"
          type="text"
          placeholder="Nom complet"
          value="${escapeHTML(saved.name || "")}"
          required
        >

        <input
          id="checkout-email"
          type="email"
          placeholder="Email"
          value="${escapeHTML(
            saved.email ||
            currentUser?.email ||
            ""
          )}"
          required
        >

        <input
          id="checkout-address"
          type="text"
          placeholder="Adresse"
          value="${escapeHTML(saved.address || "")}"
          required
        >

        <input
          id="checkout-city"
          type="text"
          placeholder="Ville"
          value="${escapeHTML(saved.city || "")}"
          required
        >

        <input
          id="checkout-postcode"
          type="text"
          placeholder="Code postal"
          value="${escapeHTML(saved.postcode || "")}"
          required
        >

        <div class="payment-methods">

          <button
            type="button"
            class="payment-choice ${
              selectedPayment === "card"
                ? "active"
                : ""
            }"
            data-payment="card"
          >
            💳 Carte bancaire
          </button>

          <button
            type="button"
            class="payment-choice ${
              selectedPayment === "paypal"
                ? "active"
                : ""
            }"
            data-payment="paypal"
          >
            🅿️ PayPal
          </button>

        </div>

        <input
          type="hidden"
          id="selected-payment"
          value="${escapeHTML(selectedPayment)}"
        >

        <button
          type="submit"
          id="create-order-btn"
        >
          CONFIRMER LA COMMANDE
        </button>

      </form>

    </div>

  `;

  openModal(
    modal.id
  );

  $$("[data-payment]", modal)
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          selectedPayment =
            button.dataset.payment;

          $$(
            "[data-payment]",
            modal
          ).forEach(item =>
            item.classList.remove("active")
          );

          button.classList.add("active");

          const hidden =
            $("#selected-payment");

          if (hidden)
            hidden.value =
              selectedPayment;

        }
      );

    });

  $("#checkout-form")
    ?.addEventListener(
      "submit",
      async event => {

        event.preventDefault();

        await createOrder();

      }
    );

}


/* =========================================================
   CREATE ORDER
========================================================= */

async function createOrder() {

  if (!currentUser) {

    toast(
      "Connecte-toi avant de commander.",
      "error"
    );

    return;

  }

  if (!cart.length) {

    toast(
      "Ton panier est vide.",
      "error"
    );

    return;

  }

  const button =
    $("#create-order-btn");

  if (button) {

    button.disabled = true;
    button.textContent =
      "CRÉATION...";

  }

  try {

    const items =
      cart
        .map(item => {

          const product =
            getProduct(item.id);

          if (!product)
            return null;

          return {
            id: product.id,
            name: product.name,
            price: product.price,
            qty: Number(item.qty)
          };

        })
        .filter(Boolean);

    const subtotal =
      items.reduce(
        (sum, item) =>
          sum +
          item.price *
          item.qty,
        0
      );

    const total =
      nova100Active
        ? Math.max(
            0,
            subtotal * 0.90
          )
        : subtotal;

    const name =
      $("#checkout-name")?.value.trim();

    const email =
      $("#checkout-email")?.value.trim();

    const address =
      $("#checkout-address")?.value.trim();

    const city =
      $("#checkout-city")?.value.trim();

    const postcode =
      $("#checkout-postcode")?.value.trim();

    if (
      !name ||
      !email ||
      !address ||
      !city ||
      !postcode
    ) {

      toast(
        "Remplis toutes les informations.",
        "error"
      );

      if (button) {

        button.disabled = false;
        button.textContent =
          "CONFIRMER LA COMMANDE";

      }

      return;

    }

    const order = {

      userId:
        currentUser.uid,

      userEmail:
        currentUser.email,

      customer: {
        name,
        email,
        address,
        city,
        postcode
      },

      items,

      subtotal,

      discount:
        nova100Active
          ? subtotal * 0.10
          : 0,

      total,

      nova100:
        nova100Active,

      paymentMethod:
        selectedPayment,

      paymentStatus:
        "pending",

      status:
        "pending",

      createdAt:
        serverTimestamp()

    };

    const reference =
      await addDoc(
        collection(db, "orders"),
        order
      );

    cart = [];

    saveCart();

    nova100Active = false;

    localStorage.removeItem(
      "nova100Active"
    );

    renderCart();

    updateCartBadge();

    closeModal();

    toast(
      `Commande #${reference.id.slice(0, 8)} créée !`,
      "success"
    );

  } catch (error) {

    console.error(
      "Erreur création commande :",
      error
    );

    toast(
      "Impossible de créer la commande.",
      "error"
    );

    if (button) {

      button.disabled = false;

      button.textContent =
        "CONFIRMER LA COMMANDE";

    }

  }

}


/* =========================================================
   ADMIN
========================================================= */

function isAdmin() {

  return Boolean(
    currentUser &&
    currentUser.email?.toLowerCase() ===
      ADMIN_EMAIL.toLowerCase() &&
    adminMode
  );

}


function openAdmin() {

  if (!currentUser) {

    toast(
      "Connecte-toi d'abord.",
      "error"
    );

    openAuthModal("login");

    return;

  }

  if (!adminMode) {

    const code =
      prompt("Code administrateur NovaShop :");

    if (code !== ADMIN_CODE) {

      toast(
        "Code administrateur incorrect.",
        "error"
      );

      return;

    }

    if (
      currentUser.email?.toLowerCase() !==
      ADMIN_EMAIL.toLowerCase()
    ) {

      toast(
        "Ce compte n'est pas administrateur.",
        "error"
      );

      return;

    }

    adminMode = true;

    localStorage.setItem(
      ADMIN_ACCESS_KEY,
      "true"
    );

  }

  renderAdminOrders();

}


async function renderAdminOrders() {

  if (!isAdmin()) {

    toast(
      "Accès administrateur refusé.",
      "error"
    );

    return;

  }

  const modal =
    $("#admin-modal") ||
    $("#adminModal");

  if (!modal) return;

  modal.innerHTML = `

    <div class="admin-box">

      <button
        class="modal-close"
        data-close-modal
        type="button"
      >
        ×
      </button>

      <h2>
        NovaShop Admin
      </h2>

      <div id="admin-orders">
        Chargement...
      </div>

    </div>

  `;

  openModal(
    modal.id
  );

  try {

    const q =
      query(
        collection(db, "orders"),
        orderBy(
          "createdAt",
          "desc"
        )
      );

    const snapshot =
      await getDocs(q);

    const container =
      $("#admin-orders");

    if (!container)
      return;

    if (snapshot.empty) {

      container.innerHTML =
        "<p>Aucune commande.</p>";

      return;

    }

    container.innerHTML =
      snapshot.docs
        .map(document => {

          const order =
            document.data();

          return `

            <div
              class="admin-order"
              data-admin-order="${document.id}"
            >

              <div>

                <strong>
                  #${document.id.slice(0, 8)}
                </strong>

                <span>
                  ${escapeHTML(
                    order.userEmail || ""
                  )}
                </span>

              </div>

              <div>

                <strong>
                  ${money(order.total)}
                </strong>

                <span>
                  ${escapeHTML(
                    order.status || "pending"
                  )}
                </span>

              </div>

              <div>

                <button
                  type="button"
                  data-paid="${document.id}"
                >
                  MARQUER PAYÉ
                </button>

                <select
                  data-status="${document.id}"
                >

                  <option
                    value="pending"
                    ${
                      order.status === "pending"
                        ? "selected"
                        : ""
                    }
                  >
                    En attente
                  </option>

                  <option
                    value="processing"
                    ${
                      order.status === "processing"
                        ? "selected"
                        : ""
                    }
                  >
                    En préparation
                  </option>

                  <option
                    value="shipped"
                    ${
                      order.status === "shipped"
                        ? "selected"
                        : ""
                    }
                  >
                    Expédiée
                  </option>

                  <option
                    value="completed"
                    ${
                      order.status === "completed"
                        ? "selected"
                        : ""
                    }
                  >
                    Terminée
                  </option>

                  <option
                    value="cancelled"
                    ${
                      order.status === "cancelled"
                        ? "selected"
                        : ""
                    }
                  >
                    Annulée
                  </option>

                </select>

              </div>

            </div>

          `;

        })
        .join("");

    $$("[data-paid]")
      .forEach(button => {

        button.onclick = () =>
          adminMarkPaid(
            button.dataset.paid
          );

      });

    $$("[data-status]")
      .forEach(select => {

        select.onchange = () =>
          adminUpdateStatus(
            select.dataset.status,
            select.value
          );

      });

  } catch (error) {

    console.error(error);

    const container =
      $("#admin-orders");

    if (container) {

      container.innerHTML = `

        <p>
          Erreur lors du chargement des commandes.
        </p>

      `;

    }

  }

}


async function adminMarkPaid(orderId) {

  if (!isAdmin()) return;

  try {

    await updateDoc(
      doc(db, "orders", orderId),
      {
        paymentStatus: "paid"
      }
    );

    toast(
      "Commande marquée comme payée.",
      "success"
    );

    renderAdminOrders();

  } catch (error) {

    console.error(error);

    toast(
      "Impossible de modifier la commande.",
      "error"
    );

  }

}


async function adminUpdateStatus(
  orderId,
  status
) {

  if (!isAdmin()) return;

  try {

    await updateDoc(
      doc(db, "orders", orderId),
      {
        status
      }
    );

    toast(
      "Statut mis à jour.",
      "success"
    );

  } catch (error) {

    console.error(error);

    toast(
      "Impossible de modifier le statut.",
      "error"
    );

  }

}


/* =========================================================
   THEME
========================================================= */

function setupTheme() {

  $$("[data-theme]").forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const theme =
          button.dataset.theme;

        document.documentElement
          .setAttribute(
            "data-theme",
            theme
          );

        localStorage.setItem(
          "novaTheme",
          theme
        );

      }
    );

  });

}


function initTheme() {

  const theme =
    localStorage.getItem(
      "novaTheme"
    );

  if (theme) {

    document.documentElement
      .setAttribute(
        "data-theme",
        theme
      );

  }

}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

  const input =
    $("#search") ||
    $("#search-input") ||
    $("input[type='search']");

  if (!input) return;

  input.addEventListener(
    "input",
    () => {

      currentSearch =
        input.value;

      renderProducts();

      updateNova100Button();

    }
  );

  input.addEventListener(
    "keydown",
    event => {

      if (
        event.key !== "Enter"
      )
        return;

      const value =
        input.value
          .trim()
          .toUpperCase();

      if (
        value === "NOVA100"
      ) {

        activateNova100();

      }

    }
  );

}


/* =========================================================
   NOVA100 BUTTON
========================================================= */

function updateNova100Button() {

  const input =
    $("#search") ||
    $("#search-input") ||
    $("input[type='search']");

  if (!input) return;

  const wrapper =
    input.parentElement;

  if (!wrapper) return;

  let button =
    $("#nova100-search-btn");

  const isNova =
    input.value
      .trim()
      .toUpperCase() ===
    "NOVA100";

  if (!isNova) {

    if (button)
      button.remove();

    return;

  }

  if (button)
    return;

  button =
    document.createElement("button");

  button.id =
    "nova100-search-btn";

  button.type =
    "button";

  button.textContent =
    "🎁 ACTIVER NOVA100";

  button.style.marginTop =
    "8px";

  button.style.padding =
    "10px 14px";

  button.style.border =
    "0";

  button.style.borderRadius =
    "10px";

  button.style.cursor =
    "pointer";

  button.style.fontWeight =
    "800";

  button.addEventListener(
    "click",
    activateNova100
  );

  wrapper.appendChild(button);

}


/* =========================================================
   CATEGORIES UI
========================================================= */

function setupCategories() {

  $$("[data-category]").forEach(button => {

    button.addEventListener(
      "click",
      () => {

        currentCategory =
          button.dataset.category;

        $$(
          "[data-category]"
        ).forEach(item =>
          item.classList.remove("active")
        );

        button.classList.add("active");

        renderProducts();

      }
    );

  });

}


/* =========================================================
   SORT
========================================================= */

function setupSort() {

  const select =
    $("#sort") ||
    $("#sort-select");

  if (!select) return;

  select.addEventListener(
    "change",
    () => {

      currentSort =
        select.value;

      renderProducts();

    }
  );

}


/* =========================================================
   GLOBAL BUTTONS
========================================================= */

function setupGlobalButtons() {

  $$("[data-cart]").forEach(button => {

    button.addEventListener(
      "click",
      () => {

        renderCart();

        const modal =
          $("#cart-modal") ||
          $("#cartModal");

        if (modal)
          openModal(modal.id);

      }
    );

  });

  $$("[data-checkout]").forEach(button => {

    button.addEventListener(
      "click",
      openCheckout
    );

  });

  $$("[data-orders]").forEach(button => {

    button.addEventListener(
      "click",
      openOrders
    );

  });

  $$("[data-admin]").forEach(button => {

    button.addEventListener(
      "click",
      openAdmin
    );

  });

  $$("[data-close-modal]").forEach(button => {

    button.addEventListener(
      "click",
      closeModal
    );

  });

}


/* =========================================================
   EXISTING CART
========================================================= */

function setupExistingCart() {

  renderCart();

  $$(
    "#checkout-btn, .checkout-btn"
  ).forEach(button => {

    button.addEventListener(
      "click",
      openCheckout
    );

  });

}


/* =========================================================
   MODAL CLOSE
========================================================= */

document.addEventListener(
  "click",
  event => {

    if (
      event.target.matches(
        "[data-close-modal]"
      )
    ) {

      closeModal();

    }

  }
);


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeModal();

    }

  }
);


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser =
      user || null;

    updateAccountUI();

    console.log(
      currentUser
        ? "NovaShop connecté : " +
          currentUser.email
        : "NovaShop : utilisateur déconnecté"
    );

  }
);


/* =========================================================
   INIT
========================================================= */

function initNovaShop() {

  initTheme();

  renderProducts();

  renderCart();

  updateCartBadge();

  setupSearch();

  setupCategories();

  setupSort();

  setupAuth();

  setupAccount();

  setupTheme();

  setupGlobalButtons();

  setupExistingCart();

  updateNova100Button();

}


if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initNovaShop
  );

} else {

  initNovaShop();

}


/* =========================================================
   PUBLIC API
========================================================= */

window.NovaShop = {

  products,

  get cart() {
    return cart;
  },

  get favorites() {
    return favorites;
  },

  addToCart,

  removeFromCart,

  changeCartQty,

  toggleFavorite,

  openProduct,

  openCheckout,

  openOrders,

  activateNova100,

  openAdmin,

  login,

  register,

  logout: () => signOut(auth),

  get currentUser() {
    return currentUser;
  }

};

console.log(
  "NovaShop chargé avec",
  products.length,
  "produits."
);
