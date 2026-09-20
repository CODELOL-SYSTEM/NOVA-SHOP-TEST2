/* =========================================================
   NOVASHOP - APP.JS COMPLET
   Firebase CDN + 43 produits + boutons fonctionnels
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
} catch (e) {
  console.warn("Analytics indisponible :", e);
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

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];


/* =========================================================
   STATE
========================================================= */

let currentUser = null;

let cart = JSON.parse(localStorage.getItem("novaCart") || "[]");
let favorites = JSON.parse(localStorage.getItem("novaFavorites") || "[]");

let currentCategory = "Tous";
let currentSort = "default";
let currentSearch = "";

let currentProduct = null;

let nova100Active =
  localStorage.getItem("nova100Active") === "true";

let selectedPayment = null;
let currentOrder = null;
let adminMode = false;


/* =========================================================
   UTILITAIRES
========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function money(value) {
  return Number(value || 0).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR"
  });
}


function saveCart() {
  localStorage.setItem("novaCart", JSON.stringify(cart));
}


function saveFavorites() {
  localStorage.setItem(
    "novaFavorites",
    JSON.stringify(favorites)
  );
}


function getProduct(id) {
  return products.find(p => p.id === id);
}


function cartCount() {
  return cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );
}


function cartTotal() {
  return cart.reduce((total, item) => {
    const product = getProduct(item.id);

    if (!product) return total;

    return total +
      product.price *
      Number(item.quantity || 0);
  }, 0);
}


function discountedTotal() {
  const total = cartTotal();

  if (!nova100Active) {
    return total;
  }

  return total * 0.9;
}


function toast(message) {

  let element = $("#nova-toast");

  if (!element) {
    element = document.createElement("div");
    element.id = "nova-toast";

    Object.assign(element.style, {
      position: "fixed",
      right: "20px",
      bottom: "20px",
      zIndex: "99999",
      padding: "14px 18px",
      borderRadius: "12px",
      background: "#111827",
      color: "white",
      border: "1px solid rgba(255,255,255,.15)",
      boxShadow: "0 15px 40px rgba(0,0,0,.35)",
      fontWeight: "700",
      transition: "opacity .25s"
    });

    document.body.appendChild(element);
  }

  element.textContent = message;
  element.style.opacity = "1";

  clearTimeout(element._timer);

  element._timer = setTimeout(() => {
    element.style.opacity = "0";
  }, 2200);
}


/* =========================================================
   MODALES
========================================================= */

function closeModal() {

  $$(".nova-modal,.modal,.popup,.overlay").forEach(el => {
    el.classList.remove("active");
    el.style.display = "";
  });

  document.body.classList.remove("modal-open");
}


function openModal(element) {

  if (!element) return;

  element.classList.add("active");
  element.style.display = "flex";

  document.body.classList.add("modal-open");
}


/* =========================================================
   CATÉGORIES
========================================================= */

const categories = [
  "Tous",
  ...new Set(products.map(product => product.category))
];


/* =========================================================
   FILTRAGE
========================================================= */

function filteredProducts() {

  let result = [...products];

  if (currentCategory !== "Tous") {
    result = result.filter(
      product => product.category === currentCategory
    );
  }

  const search = currentSearch
    .trim()
    .toLowerCase();

  if (search) {
    result = result.filter(product =>
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  }

  switch (currentSort) {

    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;

    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;

    case "name":
      result.sort((a, b) =>
        a.name.localeCompare(b.name, "fr")
      );
      break;

    case "new":
      result.sort((a, b) =>
        Number(b.new) - Number(a.new)
      );
      break;
  }

  return result;
}


/* =========================================================
   CARTE PRODUIT
========================================================= */

function productCard(product) {

  const isFavorite =
    favorites.includes(product.id);

  return `
    <article class="product-card" data-product-id="${product.id}">

      <div
        class="product-image"
        data-product="${product.id}"
        style="
          cursor:pointer;
          height:240px;
          display:flex;
          align-items:center;
          justify-content:center;
          overflow:hidden;
        "
      >

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          referrerpolicy="no-referrer"
          style="
            width:100%;
            height:100%;
            object-fit:contain;
            display:block;
          "
          onerror="
            this.onerror=null;
            this.src='${FALLBACK_IMAGE}';
          "
        >

        ${
          product.new
            ? `<span class="product-new">NOUVEAU</span>`
            : ""
        }

      </div>

      <div class="product-info">

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

          <div class="product-actions">

            <button
              type="button"
              class="favorite-btn ${isFavorite ? "active" : ""}"
              data-favorite="${product.id}"
              aria-label="Favori"
            >
              ${isFavorite ? "❤️" : "♡"}
            </button>

            <button
              type="button"
              class="add-cart-btn"
              data-add-cart="${product.id}"
            >
              🛒 Ajouter
            </button>

          </div>

        </div>

      </div>

    </article>
  `;
}


/* =========================================================
   RENDU PRODUITS
========================================================= */

function findProductsContainer() {

  return $(
    "#products-grid, " +
    "#product-grid, " +
    ".products-grid, " +
    ".product-grid, " +
    "[data-products]"
  );
}


function renderProducts() {

  const container = findProductsContainer();

  if (!container) return;

  const list = filteredProducts();

  if (!list.length) {

    container.innerHTML = `
      <div style="
        grid-column:1/-1;
        padding:60px 20px;
        text-align:center;
      ">
        <div style="font-size:48px">🔎</div>
        <h2>Aucun produit trouvé</h2>
        <p>Essaie une autre recherche.</p>
      </div>
    `;

    return;
  }

  container.innerHTML =
    list.map(productCard).join("");

  updateProductEvents();
}


function updateProductEvents() {

  $$("[data-add-cart]").forEach(button => {

    button.onclick = event => {

      event.preventDefault();
      event.stopPropagation();

      addToCart(
        button.dataset.addCart
      );
    };
  });


  $$("[data-favorite]").forEach(button => {

    button.onclick = event => {

      event.preventDefault();
      event.stopPropagation();

      toggleFavorite(
        button.dataset.favorite
      );
    };
  });


  $$("[data-product-id]").forEach(card => {

    card.onclick = event => {

      if (
        event.target.closest(
          "button,input,a,select"
        )
      ) return;

      openProduct(
        card.dataset.productId
      );
    };
  });


  $$("[data-product]").forEach(image => {

    image.onclick = event => {

      event.preventDefault();
      event.stopPropagation();

      openProduct(
        image.dataset.product
      );
    };
  });
}


/* =========================================================
   DÉTAIL PRODUIT
========================================================= */

function openProduct(id) {

  const product = getProduct(id);

  if (!product) return;

  currentProduct = product;

  const modal =
    $("#product-modal") ||
    $("#productModal") ||
    $("#product-detail-modal");

  if (!modal) {
    toast(product.name);
    return;
  }

  modal.innerHTML = `
    <div class="modal-content">

      <button
        type="button"
        class="modal-close"
        data-close-modal
      >
        ✕
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
          onerror="
            this.onerror=null;
            this.src='${FALLBACK_IMAGE}';
          "
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

        <small>
          ${escapeHTML(product.category)}
        </small>

        <h2>
          ${escapeHTML(product.name)}
        </h2>

        <div class="detail-price">
          ${money(product.price)}
        </div>

        <button
          type="button"
          class="add-cart-btn"
          data-detail-add="${product.id}"
        >
          🛒 Ajouter au panier
        </button>

        <button
          type="button"
          class="favorite-btn"
          data-detail-favorite="${product.id}"
        >
          ${
            favorites.includes(product.id)
              ? "❤️ Retirer des favoris"
              : "♡ Ajouter aux favoris"
          }
        </button>

      </div>

    </div>
  `;

  openModal(modal);

  const add =
    $("[data-detail-add]", modal);

  if (add) {
    add.onclick = () => {
      addToCart(product.id);
    };
  }

  const fav =
    $("[data-detail-favorite]", modal);

  if (fav) {
    fav.onclick = () => {
      toggleFavorite(product.id);
      openProduct(product.id);
    };
  }

  $("[data-close-modal]", modal)?.addEventListener(
    "click",
    closeModal
  );
}


/* =========================================================
   PANIER
========================================================= */

function addToCart(id) {

  const product = getProduct(id);

  if (!product) return;

  const existing =
    cart.find(item => item.id === id);

  if (existing) {
    existing.quantity =
      Number(existing.quantity || 0) + 1;
  } else {
    cart.push({
      id,
      quantity: 1
    });
  }

  saveCart();
  updateCartBadge();
  renderCart();

  toast(`${product.name} ajouté au panier 🛒`);
}


function removeFromCart(id) {

  cart = cart.filter(
    item => item.id !== id
  );

  saveCart();
  updateCartBadge();
  renderCart();
}


function changeQuantity(id, quantity) {

  const item =
    cart.find(item => item.id === id);

  if (!item) return;

  quantity = Number(quantity);

  if (!Number.isFinite(quantity) || quantity < 1) {
    removeFromCart(id);
    return;
  }

  item.quantity = Math.floor(quantity);

  saveCart();
  updateCartBadge();
  renderCart();
}


function updateCartBadge() {

  const count = cartCount();

  $$(
    "#cart-count, " +
    ".cart-count, " +
    "[data-cart-count]"
  ).forEach(element => {
    element.textContent = count;
    element.style.display =
      count > 0 ? "" : "none";
  });
}


function renderCart() {

  const container =
    $(
      "#cart-items, " +
      ".cart-items, " +
      "[data-cart-items]"
    );

  if (!container) return;

  if (!cart.length) {

    container.innerHTML = `
      <div class="empty-cart">
        <div style="font-size:50px">🛒</div>
        <h3>Ton panier est vide</h3>
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
              alt=""
              referrerpolicy="no-referrer"
              onerror="
                this.onerror=null;
                this.src='${FALLBACK_IMAGE}';
              "
            >

            <div class="cart-item-info">

              <strong>
                ${escapeHTML(product.name)}
              </strong>

              <span>
                ${money(product.price)}
              </span>

              <div class="quantity-controls">

                <button
                  type="button"
                  data-cart-minus="${product.id}"
                >
                  −
                </button>

                <input
                  type="number"
                  min="1"
                  value="${item.quantity}"
                  data-cart-quantity="${product.id}"
                >

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
              🗑️
            </button>

          </div>
        `;
      }).join("");
  }

  updateCartTotals();
  updateCartEvents();
}


function updateCartTotals() {

  const total = cartTotal();
  const finalTotal = discountedTotal();

  $$(
    "#cart-total, " +
    ".cart-total, " +
    "[data-cart-total]"
  ).forEach(element => {
    element.textContent =
      money(finalTotal);
  });

  $$(
    "#cart-subtotal, " +
    ".cart-subtotal, " +
    "[data-cart-subtotal]"
  ).forEach(element => {
    element.textContent =
      money(total);
  });

  $$(
    "#cart-discount, " +
    ".cart-discount, " +
    "[data-cart-discount]"
  ).forEach(element => {
    element.textContent =
      nova100Active
        ? `-${money(total * 0.1)}`
        : money(0);
  });
}


function updateCartEvents() {

  $$("[data-cart-minus]").forEach(button => {

    button.onclick = () => {

      const id =
        button.dataset.cartMinus;

      const item =
        cart.find(x => x.id === id);

      if (item) {
        changeQuantity(
          id,
          Number(item.quantity) - 1
        );
      }
    };
  });


  $$("[data-cart-plus]").forEach(button => {

    button.onclick = () => {

      const id =
        button.dataset.cartPlus;

      const item =
        cart.find(x => x.id === id);

      if (item) {
        changeQuantity(
          id,
          Number(item.quantity) + 1
        );
      }
    };
  });


  $$("[data-cart-quantity]").forEach(input => {

    input.onchange = () => {

      changeQuantity(
        input.dataset.cartQuantity,
        input.value
      );
    };
  });


  $$("[data-cart-remove]").forEach(button => {

    button.onclick = () => {

      removeFromCart(
        button.dataset.cartRemove
      );
    };
  });
}


/* =========================================================
   FAVORIS
========================================================= */

function toggleFavorite(id) {

  const index =
    favorites.indexOf(id);

  if (index >= 0) {

    favorites.splice(index, 1);

    toast("Retiré des favoris");

  } else {

    favorites.push(id);

    toast("Ajouté aux favoris ❤️");
  }

  saveFavorites();

  renderProducts();
  renderFavorites();
}


function renderFavorites() {

  const container =
    $(
      "#favorites-items, " +
      ".favorites-items, " +
      "[data-favorites]"
    );

  if (!container) return;

  const favoriteProducts =
    favorites
      .map(id => getProduct(id))
      .filter(Boolean);

  if (!favoriteProducts.length) {

    container.innerHTML = `
      <div style="padding:30px;text-align:center">
        ❤️ Aucun favori
      </div>
    `;

    return;
  }

  container.innerHTML =
    favoriteProducts
      .map(productCard)
      .join("");

  updateProductEvents();
}


/* =========================================================
   AUTH
========================================================= */

function authErrorMessage(error) {

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
      "Le mot de passe est trop faible.",

    "auth/api-key-not-valid":
      "La clé API Firebase est invalide.",

    "auth/network-request-failed":
      "Erreur réseau.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard."
  };

  return (
    messages[code] ||
    error?.message ||
    "Une erreur est survenue."
  );
}


async function login(email, password) {

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    toast("Connexion réussie ✅");
    closeModal();

  } catch (error) {

    toast(authErrorMessage(error));
    console.error(error);
  }
}


async function register(email, password) {

  try {

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    toast("Compte créé ✅");
    closeModal();

  } catch (error) {

    toast(authErrorMessage(error));
    console.error(error);
  }
}


function openAuthModal() {

  const modal =
    $("#auth-modal") ||
    $("#authModal") ||
    $("#login-modal");

  if (!modal) return;

  modal.innerHTML = `

    <div class="modal-content">

      <button
        type="button"
        class="modal-close"
        data-close-modal
      >
        ✕
      </button>

      <h2>Connexion</h2>

      <form id="nova-auth-form">

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
          required
        >

        <button type="submit">
          Se connecter
        </button>

      </form>

      <button
        type="button"
        id="nova-register-btn"
      >
        Créer un compte
      </button>

    </div>
  `;

  openModal(modal);

  $("[data-close-modal]", modal)
    ?.addEventListener("click", closeModal);


  $("#nova-auth-form", modal)
    ?.addEventListener("submit", event => {

      event.preventDefault();

      login(
        $("#auth-email", modal).value.trim(),
        $("#auth-password", modal).value
      );
    });


  $("#nova-register-btn", modal)
    ?.addEventListener("click", () => {

      const email =
        $("#auth-email", modal).value.trim();

      const password =
        $("#auth-password", modal).value;

      if (!email || !password) {

        toast("Entre ton email et ton mot de passe.");
        return;
      }

      register(email, password);
    });
}


/* =========================================================
   COMPTE
========================================================= */

function renderAccount() {

  $$(
    "#account-name, " +
    ".account-name, " +
    "[data-account-name]"
  ).forEach(element => {

    element.textContent =
      currentUser
        ? currentUser.email
        : "Mon compte";
  });


  $$(
    "[data-login], #login-btn, .login-btn"
  ).forEach(button => {

    button.onclick = event => {

      event.preventDefault();

      if (currentUser) {
        signOut(auth);
      } else {
        openAuthModal();
      }
    };
  });


  $$(
    "[data-logout], #logout-btn, .logout-btn"
  ).forEach(button => {

    button.onclick = async () => {

      try {
        await signOut(auth);
        toast("Déconnexion réussie");
      } catch (error) {
        toast("Erreur de déconnexion");
      }
    };
  });
}


/* =========================================================
   COMMANDES
========================================================= */

async function getUserOrders() {

  if (!currentUser) {
    return [];
  }

  try {

    const q = query(
      collection(db, "orders"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(item => ({
      id: item.id,
      ...item.data()
    }));

  } catch (error) {

    console.error(
      "Impossible de récupérer les commandes :",
      error
    );

    return [];
  }
}


async function openOrders() {

  if (!currentUser) {

    toast("Connecte-toi pour voir tes commandes.");
    openAuthModal();
    return;
  }

  const modal =
    $("#orders-modal") ||
    $("#ordersModal");

  if (!modal) return;

  modal.innerHTML = `
    <div class="modal-content">

      <button
        type="button"
        class="modal-close"
        data-close-modal
      >
        ✕
      </button>

      <h2>Mes commandes</h2>

      <div id="orders-list">
        Chargement...
      </div>

    </div>
  `;

  openModal(modal);

  $("[data-close-modal]", modal)
    ?.addEventListener("click", closeModal);

  const orders =
    await getUserOrders();

  const list =
    $("#orders-list", modal);

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
        class="order-row"
        data-open-order="${order.id}"
      >

        <strong>
          Commande #${order.id.slice(0, 8)}
        </strong>

        <span>
          ${money(order.total)}
        </span>

        <span>
          ${escapeHTML(order.paymentMethod || "Non défini")}
        </span>

        <span>
          ${escapeHTML(order.paymentStatus || "pending")}
        </span>

      </button>

    `).join("");


  $$("[data-open-order]", modal)
    .forEach(button => {

      button.onclick = () => {

        openOrderDetail(
          button.dataset.openOrder
        );
      };
    });
}


async function openOrderDetail(id) {

  try {

    const snapshot =
      await getDoc(
        doc(db, "orders", id)
      );

    if (!snapshot.exists()) {

      toast("Commande introuvable.");
      return;
    }

    const order = {
      id: snapshot.id,
      ...snapshot.data()
    };

    currentOrder = order;

    const modal =
      $("#order-detail-modal") ||
      $("#orderDetailModal") ||
      $("#orders-modal");

    if (!modal) return;

    modal.innerHTML = `

      <div class="modal-content">

        <button
          type="button"
          class="modal-close"
          data-close-modal
        >
          ✕
        </button>

        <h2>
          Commande #${order.id.slice(0, 8)}
        </h2>

        <p>
          Statut :
          <strong>
            ${escapeHTML(order.paymentStatus || "pending")}
          </strong>
        </p>

        <p>
          Paiement :
          ${escapeHTML(order.paymentMethod || "Non défini")}
        </p>

        <hr>

        <div>
          ${
            (order.items || [])
              .map(item => `
                <div style="
                  display:flex;
                  justify-content:space-between;
                  gap:15px;
                  padding:8px 0;
                ">
                  <span>
                    ${escapeHTML(item.name)}
                    × ${item.quantity}
                  </span>
                  <strong>
                    ${money(
                      Number(item.price) *
                      Number(item.quantity)
                    )}
                  </strong>
                </div>
              `)
              .join("")
          }
        </div>

        <hr>

        <h3>
          Total :
          ${money(order.total)}
        </h3>

      </div>
    `;

    openModal(modal);

    $("[data-close-modal]", modal)
      ?.addEventListener("click", closeModal);

  } catch (error) {

    console.error(error);
    toast("Impossible de charger la commande.");
  }
}


/* =========================================================
   NOVA100
========================================================= */

function updateNova100Button() {

  const button =
    $("#nova100-search-btn");

  if (!button) return;

  const search =
    currentSearch.trim().toUpperCase();

  button.style.display =
    search === "NOVA100"
      ? "inline-flex"
      : "none";
}


function activateNova100() {

  if (!cart.length) {

    toast("Ajoute au moins un produit au panier.");
    return;
  }

  nova100Active = true;

  localStorage.setItem(
    "nova100Active",
    "true"
  );

  updateCartTotals();
  renderCheckout();

  toast("Code NOVA100 activé : -10% 🔥");
}


function deactivateNova100() {

  nova100Active = false;

  localStorage.setItem(
    "nova100Active",
    "false"
  );

  updateCartTotals();
  renderCheckout();

  toast("NOVA100 retiré.");
}


/* =========================================================
   CHECKOUT
========================================================= */

function renderCheckout(savedValues = {}) {

  const container =
    $(
      "#checkout-content, " +
      ".checkout-content, " +
      "[data-checkout-content]"
    );

  if (!container) return;

  const total =
    discountedTotal();

  container.innerHTML = `

    <div class="checkout-box">

      <h2>Finaliser la commande</h2>

      <div class="checkout-summary">

        <p>
          Sous-total :
          <strong>${money(cartTotal())}</strong>
        </p>

        ${
          nova100Active
            ? `
              <p>
                Réduction NOVA100 :
                <strong>-10%</strong>
              </p>
            `
            : ""
        }

        <p>
          Total :
          <strong>${money(total)}</strong>
        </p>

      </div>


      <label>
        Nom
        <input
          id="checkout-name"
          value="${escapeHTML(savedValues.name || "")}"
          required
        >
      </label>


      <label>
        Email
        <input
          id="checkout-email"
          type="email"
          value="${escapeHTML(
            savedValues.email ||
            currentUser?.email ||
            ""
          )}"
          required
        >
      </label>


      <label>
        Adresse
        <input
          id="checkout-address"
          value="${escapeHTML(savedValues.address || "")}"
          required
        >
      </label>


      <h3>Moyen de paiement</h3>

      <div class="payment-buttons">

        <button
          type="button"
          data-payment="card"
          class="${selectedPayment === "card" ? "selected" : ""}"
        >
          💳 Carte bancaire
        </button>

        <button
          type="button"
          data-payment="paypal"
          class="${selectedPayment === "paypal" ? "selected" : ""}"
        >
          🅿️ PayPal
        </button>

      </div>


      <button
        type="button"
        id="confirm-order-btn"
      >
        Commander ${money(total)}
      </button>

    </div>
  `;


  $$("[data-payment]", container)
    .forEach(button => {

      button.onclick = () => {

        selectedPayment =
          button.dataset.payment;

        $$("[data-payment]", container)
          .forEach(item =>
            item.classList.remove("selected")
          );

        button.classList.add("selected");
      };
    });


  $("#confirm-order-btn", container)
    ?.addEventListener(
      "click",
      createOrder
    );
}


function openCheckout() {

  if (!cart.length) {

    toast("Ton panier est vide 🛒");
    return;
  }

  if (!currentUser) {

    toast("Connecte-toi avant de commander.");
    openAuthModal();
    return;
  }

  const modal =
    $("#checkout-modal") ||
    $("#checkoutModal");

  if (!modal) {

    toast("Fenêtre de paiement introuvable.");
    return;
  }

  modal.innerHTML = `
    <div class="modal-content">

      <button
        type="button"
        class="modal-close"
        data-close-modal
      >
        ✕
      </button>

      <div id="checkout-content"></div>

    </div>
  `;

  openModal(modal);

  $("[data-close-modal]", modal)
    ?.addEventListener("click", closeModal);

  renderCheckout();
}


/* =========================================================
   CRÉER COMMANDE
========================================================= */

async function createOrder() {

  if (!currentUser) {

    toast("Connecte-toi d'abord.");
    return;
  }

  if (!cart.length) {

    toast("Panier vide.");
    return;
  }

  if (!selectedPayment) {

    toast("Choisis un moyen de paiement.");
    return;
  }

  const name =
    $("#checkout-name")?.value.trim();

  const email =
    $("#checkout-email")?.value.trim();

  const address =
    $("#checkout-address")?.value.trim();

  if (!name || !email || !address) {

    toast("Remplis tous les champs.");
    return;
  }

  const button =
    $("#confirm-order-btn");

  if (button) {
    button.disabled = true;
    button.textContent =
      "Création de la commande...";
  }

  const items =
    cart.map(item => {

      const product =
        getProduct(item.id);

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: Number(item.quantity)
      };
    });


  const subtotal =
    cartTotal();

  const discount =
    nova100Active
      ? subtotal * 0.1
      : 0;

  const total =
    subtotal - discount;


  try {

    const orderRef =
      await addDoc(
        collection(db, "orders"),
        {
          userId: currentUser.uid,
          customer: {
            name,
            email,
            address
          },

          items,

          subtotal,
          discount,
          total,

          paymentMethod:
            selectedPayment,

          paymentStatus:
            "pending",

          nova100:
            nova100Active,

          createdAt:
            serverTimestamp()
        }
      );


    cart = [];

    saveCart();

    nova100Active = false;

    localStorage.setItem(
      "nova100Active",
      "false"
    );

    selectedPayment = null;

    updateCartBadge();
    renderCart();

    closeModal();

    toast(
      `Commande créée #${orderRef.id.slice(0, 8)} ✅`
    );

  } catch (error) {

    console.error(
      "Erreur création commande :",
      error
    );

    toast(
      "Impossible de créer la commande."
    );

    if (button) {
      button.disabled = false;
      button.textContent =
        `Commander ${money(total)}`;
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
    localStorage.getItem(
      ADMIN_ACCESS_KEY
    ) === "true"
  );
}


function openAdmin() {

  if (!currentUser) {

    toast("Connecte-toi d'abord.");
    openAuthModal();
    return;
  }

  if (
    currentUser.email?.toLowerCase() !==
    ADMIN_EMAIL.toLowerCase()
  ) {

    toast("Accès administrateur refusé.");
    return;
  }

  const code =
    prompt("Code administrateur :");

  if (code !== ADMIN_CODE) {

    toast("Code incorrect.");
    return;
  }

  localStorage.setItem(
    ADMIN_ACCESS_KEY,
    "true"
  );

  adminMode = true;

  renderAdminOrders();
}


async function renderAdminOrders() {

  if (!isAdmin()) {

    toast("Accès admin refusé.");
    return;
  }

  const modal =
    $("#admin-modal") ||
    $("#adminModal");

  if (!modal) return;

  modal.innerHTML = `

    <div class="modal-content">

      <button
        type="button"
        class="modal-close"
        data-close-modal
      >
        ✕
      </button>

      <h2>⚙️ Administration NovaShop</h2>

      <div id="admin-orders-list">
        Chargement...
      </div>

    </div>
  `;

  openModal(modal);

  $("[data-close-modal]", modal)
    ?.addEventListener("click", closeModal);


  try {

    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const snapshot =
      await getDocs(q);

    const orders =
      snapshot.docs.map(item => ({
        id: item.id,
        ...item.data()
      }));

    const list =
      $("#admin-orders-list", modal);

    if (!orders.length) {

      list.innerHTML =
        "<p>Aucune commande.</p>";

      return;
    }


    list.innerHTML =
      orders.map(order => `

        <div
          class="admin-order"
          style="
            padding:16px;
            margin:10px 0;
            border:1px solid rgba(255,255,255,.1);
            border-radius:14px;
          "
        >

          <strong>
            #${order.id.slice(0, 8)}
          </strong>

          <p>
            ${escapeHTML(
              order.customer?.name || ""
            )}
          </p>

          <p>
            ${escapeHTML(
              order.customer?.email || ""
            )}
          </p>

          <p>
            Total :
            ${money(order.total)}
          </p>

          <p>
            Paiement :
            ${escapeHTML(
              order.paymentMethod || ""
            )}
          </p>

          <p>
            Statut :
            <strong>
              ${escapeHTML(
                order.paymentStatus || "pending"
              )}
            </strong>
          </p>

          <button
            type="button"
            data-mark-paid="${order.id}"
          >
            ✅ Marquer payé
          </button>

        </div>

      `).join("");


    $$("[data-mark-paid]", modal)
      .forEach(button => {

        button.onclick = () => {

          markOrderPaid(
            button.dataset.markPaid
          );
        };
      });

  } catch (error) {

    console.error(error);

    $("#admin-orders-list", modal).innerHTML =
      `<p>Erreur : ${escapeHTML(error.message)}</p>`;
  }
}


async function markOrderPaid(id) {

  if (!isAdmin()) return;

  try {

    await updateDoc(
      doc(db, "orders", id),
      {
        paymentStatus: "paid",
        paidAt: serverTimestamp()
      }
    );

    toast("Commande marquée comme payée ✅");

    renderAdminOrders();

  } catch (error) {

    console.error(error);
    toast("Impossible de modifier la commande.");
  }
}


/* =========================================================
   THÈME
========================================================= */

function setupTheme() {

  const saved =
    localStorage.getItem("novaTheme");

  if (saved === "light") {
    document.body.classList.add("light");
  }

  $$(
    "[data-theme], #theme-btn, .theme-btn"
  ).forEach(button => {

    button.onclick = () => {

      document.body.classList.toggle("light");

      localStorage.setItem(
        "novaTheme",
        document.body.classList.contains("light")
          ? "light"
          : "dark"
      );
    };
  });
}


/* =========================================================
   RECHERCHE
========================================================= */

function setupSearch() {

  const inputs =
    $$(
      "#search, " +
      "#search-input, " +
      ".search-input, " +
      "[data-search]"
    );

  inputs.forEach(input => {

    input.addEventListener("input", () => {

      currentSearch =
        input.value;

      renderProducts();
      updateNova100Button();
    });


    input.addEventListener("keydown", event => {

      if (event.key === "Enter") {

        currentSearch =
          input.value;

        renderProducts();
        updateNova100Button();
      }
    });
  });


  const novaButton =
    $("#nova100-search-btn");

  if (novaButton) {

    novaButton.onclick =
      activateNova100;
  }
}


/* =========================================================
   CATÉGORIES
========================================================= */

function setupCategories() {

  $$(
    "[data-category]"
  ).forEach(button => {

    button.onclick = event => {

      event.preventDefault();

      currentCategory =
        button.dataset.category;

      $$("[data-category]")
        .forEach(item =>
          item.classList.remove("active")
        );

      button.classList.add("active");

      renderProducts();
    };
  });


  $$(
    ".category-btn"
  ).forEach(button => {

    if (button.dataset.category) return;

    button.onclick = () => {

      const category =
        button.textContent.trim();

      const found =
        categories.find(
          c => c.toLowerCase() ===
            category.toLowerCase()
        );

      if (found) {

        currentCategory = found;

        renderProducts();
      }
    };
  });
}


/* =========================================================
   TRI
========================================================= */

function setupSort() {

  $$(
    "#sort, " +
    "#sort-select, " +
    "[data-sort]"
  ).forEach(select => {

    select.addEventListener(
      "change",
      () => {

        currentSort =
          select.value;

        renderProducts();
      }
    );
  });
}


/* =========================================================
   BOUTONS GLOBAUX
========================================================= */

function setupGlobalButtons() {

  /* PANIER */

  $$(
    "[data-cart], " +
    "#cart-btn, " +
    ".cart-btn"
  ).forEach(button => {

    button.onclick = event => {

      event.preventDefault();

      const modal =
        $("#cart-modal") ||
        $("#cartModal");

      if (modal) {

        openModal(modal);
        renderCart();

      } else {

        toast(
          `Panier : ${cartCount()} article(s)`
        );
      }
    };
  });


  /* CHECKOUT */

  $$(
    "[data-checkout], " +
    "#checkout-btn, " +
    ".checkout-btn"
  ).forEach(button => {

    button.onclick = event => {

      event.preventDefault();

      openCheckout();
    };
  });


  /* FAVORIS */

  $$(
    "[data-open-favorites], " +
    "#favorites-btn, " +
    ".favorites-btn"
  ).forEach(button => {

    button.onclick = event => {

      event.preventDefault();

      const modal =
        $("#favorites-modal") ||
        $("#favoritesModal");

      if (modal) {

        openModal(modal);
        renderFavorites();

      } else {

        toast(
          `${favorites.length} favori(s) ❤️`
        );
      }
    };
  });


  /* COMPTE */

  $$(
    "[data-account], " +
    "#account-btn, " +
    ".account-btn"
  ).forEach(button => {

    button.onclick = event => {

      event.preventDefault();

      if (currentUser) {

        renderAccount();

        const modal =
          $("#account-modal") ||
          $("#accountModal");

        if (modal) {
          openModal(modal);
        }

      } else {

        openAuthModal();
      }
    };
  });


  /* COMMANDES */

  $$(
    "[data-orders], " +
    "#orders-btn, " +
    ".orders-btn"
  ).forEach(button => {

    button.onclick = event => {

      event.preventDefault();

      openOrders();
    };
  });


  /* ADMIN */

  $$(
    "[data-admin], " +
    "#admin-btn, " +
    ".admin-btn"
  ).forEach(button => {

    button.onclick = event => {

      event.preventDefault();

      openAdmin();
    };
  });


  /* NOVA100 */

  $$(
    "[data-nova100], " +
    "#nova100-btn, " +
    ".nova100-btn"
  ).forEach(button => {

    button.onclick = event => {

      event.preventDefault();

      activateNova100();
    };
  });


  /* FERMETURE */

  $$(
    "[data-close-modal], " +
    ".modal-close, " +
    ".close-modal, " +
    ".modal-close-btn"
  ).forEach(button => {

    button.onclick = event => {

      event.preventDefault();

      closeModal();
    };
  });


  /* OUVERTURE PRODUIT */

  $$(
    "[data-open-product]"
  ).forEach(button => {

    button.onclick = event => {

      event.preventDefault();

      openProduct(
        button.dataset.openProduct
      );
    };
  });
}


/* =========================================================
   PANIER EXISTANT
========================================================= */

function setupExistingCart() {

  renderCart();
  updateCartBadge();

  $$("[data-add-cart]").forEach(button => {

    button.onclick = event => {

      event.preventDefault();
      event.stopPropagation();

      addToCart(
        button.dataset.addCart
      );
    };
  });
}


/* =========================================================
   FERMETURE ESC
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {
      closeModal();
    }
  }
);


/* =========================================================
   FERMETURE EN CLIQUANT L'OVERLAY
========================================================= */

document.addEventListener(
  "click",
  event => {

    const target = event.target;

    if (
      target.classList.contains("modal") ||
      target.classList.contains("nova-modal") ||
      target.classList.contains("overlay")
    ) {
      closeModal();
    }
  }
);


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;

    if (
      !user ||
      user.email?.toLowerCase() !==
        ADMIN_EMAIL.toLowerCase()
    ) {

      adminMode = false;

      localStorage.removeItem(
        ADMIN_ACCESS_KEY
      );
    }

    renderAccount();
  }
);


/* =========================================================
   INIT
========================================================= */

function initNovaShop() {

  renderProducts();

  renderCart();

  renderFavorites();

  updateCartBadge();

  setupSearch();

  setupCategories();

  setupSort();

  setupGlobalButtons();

  setupExistingCart();

  setupTheme();

  updateNova100Button();

  console.log(
    `NovaShop chargé : ${products.length} produits`
  );
}


/* =========================================================
   LANCEMENT
========================================================= */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initNovaShop
  );

} else {

  initNovaShop();
}


/* =========================================================
   API PUBLIQUE
========================================================= */

window.NovaShop = {

  products,

  getProduct,

  addToCart,

  removeFromCart,

  changeQuantity,

  toggleFavorite,

  openProduct,

  openCheckout,

  openAuthModal,

  openOrders,

  openAdmin,

  activateNova100,

  deactivateNova100,

  get cart() {
    return cart;
  },

  get favorites() {
    return favorites;
  },

  get currentUser() {
    return currentUser;
  },

  get total() {
    return discountedTotal();
  }

};
