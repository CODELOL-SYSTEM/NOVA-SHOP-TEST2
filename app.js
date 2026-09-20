import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

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
  apiKey: "AIzaSyAZ5vAkAEfIbpfLyhxgO7uvNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe0b1aede48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


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

const searchInput = document.getElementById("searchInput");
const categories = document.getElementById("categories");
const productGrid = document.getElementById("productGrid");
const productCount = document.getElementById("productCount");

const cartBtn = document.getElementById("cartBtn");
const cartBadge = document.getElementById("cartBadge");
const overlay = document.getElementById("overlay");
const cartDrawer = document.getElementById("cartDrawer");
const closeCartBtn = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

const settingsBtn = document.getElementById("settingsBtn");
const accountBtn = document.getElementById("accountBtn");
const ordersBtn = document.getElementById("ordersBtn");
const adminBtn = document.getElementById("adminBtn");

const modalLayer = document.getElementById("modalLayer");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");

const toastContainer = document.getElementById("toast");
const heroCartBtn = document.getElementById("heroCartBtn");
const sortSelect = document.getElementById("sortSelect");


/* =========================================================
   43 PRODUITS
   EXACTEMENT LES IMAGES DONNÉES
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
   ÉTAT
========================================================= */

let currentUser = null;
let selectedCategory = "Tous";
let searchValue = "";
let sortValue = "default";

let cart = [];
let reviewsCache = {};

try {
  cart = JSON.parse(localStorage.getItem("novaCart") || "[]");

  if (!Array.isArray(cart)) {
    cart = [];
  }
} catch {
  cart = [];
}


/* =========================================================
   UTILITAIRES
========================================================= */

function money(value) {
  if (Number(value) === 0) {
    return "Gratuit";
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(Number(value));
}


function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function randomRating(id) {
  let hash = 0;

  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash |= 0;
  }

  const rating = 4.2 + (Math.abs(hash) % 8) / 10;

  return Math.min(4.9, Number(rating.toFixed(1)));
}


function stars(rating) {
  const rounded = Math.round(rating);

  let result = "";

  for (let i = 1; i <= 5; i++) {
    result += i <= rounded ? "★" : "☆";
  }

  return result;
}


function saveCart() {
  localStorage.setItem("novaCart", JSON.stringify(cart));
}


function getProduct(id) {
  return products.find(product => product.id === id);
}


function getCartCount() {
  return cart.reduce((total, item) => {
    return total + Number(item.quantity || 0);
  }, 0);
}


function getCartSubtotal() {
  return cart.reduce((total, item) => {
    const product = getProduct(item.id);

    if (!product) {
      return total;
    }

    return total + product.price * Number(item.quantity || 0);
  }, 0);
}


/* =========================================================
   TOAST
========================================================= */

function toast(message, type = "success") {
  if (!toastContainer) {
    return;
  }

  const item = document.createElement("div");

  item.className = `toast-item ${type}`;

  item.innerHTML = `
    <span>${escapeHTML(message)}</span>
    <button type="button" aria-label="Fermer">×</button>
  `;

  toastContainer.appendChild(item);

  const close = item.querySelector("button");

  if (close) {
    close.addEventListener("click", () => {
      item.remove();
    });
  }

  setTimeout(() => {
    item.remove();
  }, 4000);
}


/* =========================================================
   MODALE
========================================================= */

function showModal(title, html) {
  if (!modalLayer) {
    return;
  }

  if (modalTitle) {
    modalTitle.textContent = title;
  }

  if (modalContent) {
    modalContent.innerHTML = html;
  }

  modalLayer.classList.add("open");
  modalLayer.style.display = "flex";

  document.body.classList.add("modal-open");
}


function closeModal() {
  if (!modalLayer) {
    return;
  }

  modalLayer.classList.remove("open");
  modalLayer.style.display = "";

  document.body.classList.remove("modal-open");
}


modalClose?.addEventListener("click", closeModal);


/* =========================================================
   CATÉGORIES
========================================================= */

function renderCategories() {
  if (!categories) {
    return;
  }

  const categoryList = [
    "Tous",
    ...new Set(products.map(product => product.category))
  ];

  categories.innerHTML = categoryList.map(category => `
    <button
      type="button"
      class="category-btn ${selectedCategory === category ? "active" : ""}"
      data-category="${escapeHTML(category)}"
    >
      ${escapeHTML(category)}
    </button>
  `).join("");
}


categories?.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");

  if (!button) {
    return;
  }

  selectedCategory = button.dataset.category || "Tous";

  renderCategories();
  renderProducts();
});


/* =========================================================
   PRODUITS
========================================================= */

function getFilteredProducts() {
  let list = [...products];

  if (selectedCategory !== "Tous") {
    list = list.filter(product => {
      return product.category === selectedCategory;
    });
  }

  const search = searchValue.trim().toLowerCase();

  if (search) {
    list = list.filter(product => {
      return (
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search)
      );
    });
  }

  switch (sortValue) {
    case "price-low":
      list.sort((a, b) => a.price - b.price);
      break;

    case "price-high":
      list.sort((a, b) => b.price - a.price);
      break;

    case "name":
      list.sort((a, b) => a.name.localeCompare(b.name, "fr"));
      break;

    case "new":
      list.sort((a, b) => {
        return Number(Boolean(b.new)) - Number(Boolean(a.new));
      });
      break;

    default:
      break;
  }

  return list;
}


function renderProducts() {
  if (!productGrid) {
    return;
  }

  const list = getFilteredProducts();

  if (productCount) {
    productCount.textContent =
      `${list.length} produit${list.length > 1 ? "s" : ""}`;
  }

  if (!list.length) {
    productGrid.innerHTML = `
      <div class="empty-products">
        <div class="empty-icon">🔎</div>
        <h3>Aucun produit trouvé</h3>
        <p>Essaie une autre recherche ou une autre catégorie.</p>
      </div>
    `;

    return;
  }

  productGrid.innerHTML = list.map(product => {

    const rating = randomRating(product.id);

    return `
      <article class="product" data-product-id="${escapeHTML(product.id)}">

        <div class="product-img">

          ${product.new ? `
            <span class="new-badge">NOUVEAU</span>
          ` : ""}

          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
            decoding="async"
            referrerpolicy="no-referrer"
            onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
          >

        </div>

        <div class="product-body">

          <div class="product-cat">
            ${escapeHTML(product.category)}
          </div>

          <h3>
            ${escapeHTML(product.name)}
          </h3>

          <div class="product-rating">
            <span>${stars(rating)}</span>
            <small>${rating.toFixed(1)}/5</small>
          </div>

          <div class="product-bottom">

            <strong class="product-price">
              ${money(product.price)}
            </strong>

            <div class="product-actions">

              <button
                type="button"
                class="view-btn"
                data-action="view"
                data-id="${escapeHTML(product.id)}"
              >
                Voir
              </button>

              <button
                type="button"
                class="add-btn"
                data-action="add"
                data-id="${escapeHTML(product.id)}"
              >
                Ajouter
              </button>

            </div>

          </div>

        </div>

      </article>
    `;
  }).join("");
}


productGrid?.addEventListener("click", event => {

  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  const id = button.dataset.id;

  if (button.dataset.action === "view") {
    openProduct(id);
  }

  if (button.dataset.action === "add") {
    addToCart(id);
  }
});


searchInput?.addEventListener("input", event => {
  searchValue = event.target.value || "";

  renderProducts();
});


sortSelect?.addEventListener("change", event => {
  sortValue = event.target.value || "default";

  renderProducts();
});


/* =========================================================
   PRODUIT DÉTAIL
========================================================= */

function openProduct(id) {

  const product = getProduct(id);

  if (!product) {
    toast("Produit introuvable", "error");
    return;
  }

  const rating = randomRating(product.id);

  showModal(
    product.name,
    `
      <div class="product-detail">

        <div class="product-detail-image">
          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            referrerpolicy="no-referrer"
            onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
          >
        </div>

        <div class="product-detail-info">

          <div class="product-cat">
            ${escapeHTML(product.category)}
          </div>

          <h2>
            ${escapeHTML(product.name)}
          </h2>

          <div class="product-rating">
            <span>${stars(rating)}</span>
            <span>${rating.toFixed(1)}/5</span>
          </div>

          <div class="detail-price">
            ${money(product.price)}
          </div>

          <button
            type="button"
            class="add-btn large"
            data-detail-add="${escapeHTML(product.id)}"
          >
            Ajouter au panier
          </button>

        </div>

      </div>
    `
  );
}


modalContent?.addEventListener("click", event => {

  const button = event.target.closest("[data-detail-add]");

  if (!button) {
    return;
  }

  addToCart(button.dataset.detailAdd);
});


/* =========================================================
   PANIER
========================================================= */

function addToCart(id) {

  const product = getProduct(id);

  if (!product) {
    toast("Produit introuvable", "error");
    return;
  }

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id,
      quantity: 1
    });
  }

  saveCart();
  renderCart();

  toast(`${product.name} ajouté au panier 🛒`);
}


function removeFromCart(id) {

  cart = cart.filter(item => item.id !== id);

  saveCart();
  renderCart();

  toast("Produit retiré du panier");
}


function changeCartQuantity(id, delta) {

  const item = cart.find(cartItem => cartItem.id === id);

  if (!item) {
    return;
  }

  item.quantity += delta;

  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart();
  renderCart();
}


function renderCart() {

  const count = getCartCount();
  const subtotal = getCartSubtotal();

  if (cartBadge) {
    cartBadge.textContent = count;
    cartBadge.style.display = count > 0 ? "" : "none";
  }

  if (cartTotal) {
    cartTotal.textContent = money(subtotal);
  }

  if (!cartItems) {
    return;
  }

  if (!cart.length) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h3>Ton panier est vide</h3>
        <p>Ajoute des produits pour commencer.</p>
      </div>
    `;

    return;
  }

  cartItems.innerHTML = cart.map(item => {

    const product = getProduct(item.id);

    if (!product) {
      return "";
    }

    const quantity = Number(item.quantity || 1);

    return `
      <div class="cart-item">

        <div class="cart-item-image">
          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            referrerpolicy="no-referrer"
            onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
          >
        </div>

        <div class="cart-item-info">

          <h4>
            ${escapeHTML(product.name)}
          </h4>

          <strong>
            ${money(product.price)}
          </strong>

          <div class="cart-controls">

            <button
              type="button"
              data-cart-action="minus"
              data-id="${escapeHTML(product.id)}"
            >
              −
            </button>

            <span>
              ${quantity}
            </span>

            <button
              type="button"
              data-cart-action="plus"
              data-id="${escapeHTML(product.id)}"
            >
              +
            </button>

            <button
              type="button"
              class="cart-delete"
              data-cart-action="delete"
              data-id="${escapeHTML(product.id)}"
            >
              🗑
            </button>

          </div>

        </div>

      </div>
    `;
  }).join("");
}


cartItems?.addEventListener("click", event => {

  const button = event.target.closest("[data-cart-action]");

  if (!button) {
    return;
  }

  const id = button.dataset.id;
  const action = button.dataset.cartAction;

  if (action === "minus") {
    changeCartQuantity(id, -1);
  }

  if (action === "plus") {
    changeCartQuantity(id, 1);
  }

  if (action === "delete") {
    removeFromCart(id);
  }
});


function openCart() {

  cartDrawer?.classList.add("open");
  overlay?.classList.add("open");

  if (cartDrawer) {
    cartDrawer.style.display = "";
  }

  if (overlay) {
    overlay.style.display = "";
  }

  renderCart();
}


function closeCart() {

  cartDrawer?.classList.remove("open");
  overlay?.classList.remove("open");
}


cartBtn?.addEventListener("click", openCart);
heroCartBtn?.addEventListener("click", openCart);
closeCartBtn?.addEventListener("click", closeCart);
overlay?.addEventListener("click", closeCart);


/* =========================================================
   AUTH ERRORS
========================================================= */

function authError(error) {

  const code = error?.code || "";

  const errors = {

    "auth/email-already-in-use":
      "Cette adresse email est déjà utilisée.",

    "auth/invalid-email":
      "Adresse email invalide.",

    "auth/weak-password":
      "Mot de passe trop faible.",

    "auth/password-does-not-meet-requirements":
      "Le mot de passe ne respecte pas les exigences.",

    "auth/user-not-found":
      "Aucun compte trouvé avec cette adresse.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/invalid-credential":
      "Email ou mot de passe incorrect.",

    "auth/invalid-login-credentials":
      "Email ou mot de passe incorrect.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard.",

    "auth/network-request-failed":
      "Erreur réseau. Vérifie ta connexion.",

    "auth/operation-not-allowed":
      "La connexion email/mot de passe n'est pas activée.",

    "auth/unauthorized-domain":
      "Ce domaine n'est pas autorisé dans Firebase.",

    "auth/api-key-not-valid":
      "Clé API Firebase invalide.",

    "auth/app-not-authorized":
      "Cette application n'est pas autorisée.",

    "auth/invalid-api-key":
      "Clé API invalide.",

    "auth/internal-error":
      "Erreur interne Firebase.",

    "auth/configuration-not-found":
      "Configuration Firebase introuvable.",

    "auth/invalid-continue-uri":
      "URL de continuation invalide."
  };

  return errors[code] ||
    error?.message ||
    "Une erreur est survenue.";
}


/* =========================================================
   COMPTE
========================================================= */

function openAccount() {

  if (currentUser) {

    const admin = isAdminUser();

    showModal(
      "Mon compte",
      `
        <div class="account-box">

          <div class="account-avatar">
            👤
          </div>

          <h3>
            ${escapeHTML(currentUser.email)}
          </h3>

          ${admin ? `
            <div class="admin-badge">
              ADMINISTRATEUR
            </div>
          ` : ""}

          <div class="account-actions">

            <button
              type="button"
              class="add-btn"
              data-account-action="orders"
            >
              Mes commandes
            </button>

            <button
              type="button"
              class="secondary-btn"
              data-account-action="logout"
            >
              Se déconnecter
            </button>

          </div>

        </div>
      `
    );

    return;
  }

  showLoginForm();
}


function showLoginForm(errorMessage = "") {

  showModal(
    "Connexion",
    `
      <form id="loginForm" class="auth-form">

        <input
          id="loginEmail"
          type="email"
          placeholder="Adresse email"
          required
          autocomplete="email"
        >

        <input
          id="loginPassword"
          type="password"
          placeholder="Mot de passe"
          required
          autocomplete="current-password"
        >

        ${errorMessage ? `
          <div class="form-error">
            ${escapeHTML(errorMessage)}
          </div>
        ` : ""}

        <button type="submit" class="add-btn">
          Se connecter
        </button>

        <button
          type="button"
          class="secondary-btn"
          id="switchRegister"
        >
          Créer un compte
        </button>

      </form>
    `
  );


  document.getElementById("loginForm")?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const email =
        document.getElementById("loginEmail")?.value.trim();

      const password =
        document.getElementById("loginPassword")?.value;

      if (!email || !password) {
        return;
      }

      const submitButton =
        event.target.querySelector("button[type='submit']");

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Connexion...";
      }

      try {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        closeModal();

        toast("Connexion réussie 👋");

      } catch (error) {

        showLoginForm(authError(error));

      }

    }
  );


  document.getElementById("switchRegister")
    ?.addEventListener("click", () => {
      showRegisterForm();
    });
}


function showRegisterForm(errorMessage = "") {

  showModal(
    "Créer un compte",
    `
      <form id="registerForm" class="auth-form">

        <input
          id="registerEmail"
          type="email"
          placeholder="Adresse email"
          required
          autocomplete="email"
        >

        <input
          id="registerPassword"
          type="password"
          placeholder="Mot de passe"
          required
          autocomplete="new-password"
        >

        ${errorMessage ? `
          <div class="form-error">
            ${escapeHTML(errorMessage)}
          </div>
        ` : ""}

        <button type="submit" class="add-btn">
          Créer mon compte
        </button>

        <button
          type="button"
          class="secondary-btn"
          id="switchLogin"
        >
          J'ai déjà un compte
        </button>

      </form>
    `
  );


  document.getElementById("registerForm")?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const email =
        document.getElementById("registerEmail")?.value.trim();

      const password =
        document.getElementById("registerPassword")?.value;

      if (!email || !password) {
        return;
      }

      const submitButton =
        event.target.querySelector("button[type='submit']");

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Création...";
      }

      try {

        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        closeModal();

        toast("Compte créé avec succès 🎉");

      } catch (error) {

        showRegisterForm(authError(error));

      }

    }
  );


  document.getElementById("switchLogin")
    ?.addEventListener("click", () => {
      showLoginForm();
    });
}


modalContent?.addEventListener("click", async event => {

  const button = event.target.closest("[data-account-action]");

  if (!button) {
    return;
  }

  const action = button.dataset.accountAction;

  if (action === "orders") {

    closeModal();

    openOrders();

  }

  if (action === "logout") {

    try {

      await signOut(auth);

      closeModal();

      toast("Déconnexion réussie");

    } catch (error) {

      toast(authError(error), "error");

    }

  }

});


onAuthStateChanged(auth, user => {

  currentUser = user || null;

  if (accountBtn) {

    if (currentUser) {

      accountBtn.textContent = "Mon compte";

    } else {

      accountBtn.textContent = "Compte";

    }

  }

  if (adminBtn) {

    if (isAdminUser()) {

      adminBtn.style.display = "";

    } else {

      adminBtn.style.display = "none";

    }

  }

});


accountBtn?.addEventListener("click", openAccount);


/* =========================================================
   COMMANDES
========================================================= */

ordersBtn?.addEventListener("click", openOrders);


async function openOrders() {

  if (!currentUser) {

    showLoginForm();

    return;
  }

  showModal(
    "Mes commandes",
    `
      <div class="loading-box">
        Chargement des commandes...
      </div>
    `
  );


  try {

    const ordersQuery = query(
      collection(db, "orders"),
      where("userId", "==", currentUser.uid)
    );

    const snapshot = await getDocs(ordersQuery);

    const orders = [];

    snapshot.forEach(item => {

      orders.push({
        id: item.id,
        ...item.data()
      });

    });


    orders.sort((a, b) => {

      const aSeconds =
        a.createdAt?.seconds || 0;

      const bSeconds =
        b.createdAt?.seconds || 0;

      return bSeconds - aSeconds;

    });


    if (!orders.length) {

      showModal(
        "Mes commandes",
        `
          <div class="empty-orders">

            <div class="empty-icon">
              📦
            </div>

            <h3>
              Aucune commande
            </h3>

            <p>
              Tes commandes apparaîtront ici.
            </p>

          </div>
        `
      );

      return;
    }


    showModal(
      "Mes commandes",
      `
        <div class="orders-list">

          ${orders.map(order => {

            const date = order.createdAt?.seconds
              ? new Date(order.createdAt.seconds * 1000)
                  .toLocaleDateString("fr-FR")
              : "Date inconnue";

            return `
              <div class="order-card">

                <div>
                  <strong>
                    Commande #${escapeHTML(order.id.slice(-8))}
                  </strong>

                  <small>
                    ${date}
                  </small>
                </div>

                <div>
                  <strong>
                    ${money(order.total)}
                  </strong>

                  <span class="order-status">
                    ${escapeHTML(order.status || "Enregistrée")}
                  </span>
                </div>

                <button
                  type="button"
                  class="view-btn"
                  data-order-id="${escapeHTML(order.id)}"
                >
                  Voir
                </button>

              </div>
            `;
          }).join("")}

        </div>
      `
    );


    const orderButtons =
      modalContent?.querySelectorAll("[data-order-id]");

    orderButtons?.forEach(button => {

      button.addEventListener("click", () => {

        const order =
          orders.find(item => item.id === button.dataset.orderId);

        if (order) {
          openOrderDetails(order);
        }

      });

    });


  } catch (error) {

    console.error(error);

    showModal(
      "Mes commandes",
      `
        <div class="form-error">
          Impossible de charger les commandes.
        </div>
      `
    );

  }

}


/* =========================================================
   DÉTAIL COMMANDE
========================================================= */

function openOrderDetails(order) {

  const statuses = [
    "Enregistrée",
    "Acceptée",
    "Préparation",
    "En transit",
    "Livraison proche",
    "Livrée"
  ];

  const currentStatus =
    order.status || "Enregistrée";

  const currentIndex =
    statuses.indexOf(currentStatus);


  const tracking = order.tracking || "Pas encore disponible";

  const city = order.city || "Non renseignée";

  const estimatedDelivery =
    order.estimatedDelivery || "À définir";


  showModal(
    `Commande #${order.id.slice(-8)}`,
    `
      <div class="order-details">

        <div class="order-summary">

          <div>
            <span>Statut</span>
            <strong>
              ${escapeHTML(currentStatus)}
            </strong>
          </div>

          <div>
            <span>Total</span>
            <strong>
              ${money(order.total)}
            </strong>
          </div>

        </div>


        <div class="order-timeline">

          ${statuses.map((status, index) => {

            const done =
              currentIndex >= index;

            return `
              <div class="timeline-item ${done ? "done" : ""}">

                <div class="timeline-dot">
                  ${done ? "✓" : index + 1}
                </div>

                <span>
                  ${escapeHTML(status)}
                </span>

              </div>
            `;

          }).join("")}

        </div>


        <div class="order-info">

          <p>
            <strong>Ville :</strong>
            ${escapeHTML(city)}
          </p>

          <p>
            <strong>Suivi :</strong>
            ${escapeHTML(tracking)}
          </p>

          <p>
            <strong>Livraison estimée :</strong>
            ${escapeHTML(estimatedDelivery)}
          </p>

        </div>


        <div class="order-products">

          <h3>
            Produits
          </h3>

          ${(order.items || []).map(item => `
            <div class="order-product">

              <span>
                ${escapeHTML(item.name || "Produit")}
                × ${Number(item.quantity || 1)}
              </span>

              <strong>
                ${money(
                  Number(item.price || 0) *
                  Number(item.quantity || 1)
                )}
              </strong>

            </div>
          `).join("")}

        </div>


        <div class="order-address">

          <h3>
            Adresse de livraison
          </h3>

          <p>
            ${escapeHTML(order.address || "Non renseignée")}
          </p>

        </div>


        <button
          type="button"
          class="add-btn"
          data-print-order="${escapeHTML(order.id)}"
        >
          🧾 Télécharger / imprimer la facture
        </button>

      </div>
    `
  );


  modalContent
    ?.querySelector("[data-print-order]")
    ?.addEventListener("click", () => {
      printInvoice(order);
    });
}


/* =========================================================
   FACTURE
========================================================= */

function printInvoice(order) {

  const date = order.createdAt?.seconds
    ? new Date(order.createdAt.seconds * 1000)
        .toLocaleDateString("fr-FR")
    : new Date().toLocaleDateString("fr-FR");


  const invoiceWindow = window.open(
    "",
    "_blank",
    "width=900,height=700"
  );

  if (!invoiceWindow) {

    toast(
      "La fenêtre de facture a été bloquée par le navigateur.",
      "error"
    );

    return;
  }


  invoiceWindow.document.write(`
    <!DOCTYPE html>

    <html lang="fr">

    <head>

      <meta charset="UTF-8">

      <title>
        Facture NovaShop
      </title>

      <style>

        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          color: #111;
        }

        h1 {
          margin-bottom: 5px;
        }

        .muted {
          color: #666;
        }

        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
        }

        .line {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #ddd;
        }

        .total {
          font-size: 22px;
          font-weight: bold;
          margin-top: 25px;
          text-align: right;
        }

      </style>

    </head>

    <body>

      <div class="header">

        <div>
          <h1>NovaShop</h1>
          <div class="muted">
            Facture de commande
          </div>
        </div>

        <div>
          <strong>
            #${escapeHTML(order.id)}
          </strong>

          <br>

          ${date}
        </div>

      </div>


      <p>
        <strong>Client :</strong>
        ${escapeHTML(order.userEmail || "")}
      </p>

      <p>
        <strong>Adresse :</strong>
        ${escapeHTML(order.address || "")}
      </p>


      <h2>
        Produits
      </h2>


      ${(order.items || []).map(item => `

        <div class="line">

          <span>
            ${escapeHTML(item.name || "Produit")}
            × ${Number(item.quantity || 1)}
          </span>

          <strong>
            ${money(
              Number(item.price || 0) *
              Number(item.quantity || 1)
            )}
          </strong>

        </div>

      `).join("")}


      <div class="total">
        Total : ${money(order.total)}
      </div>


      <script>
        window.onload = function() {
          window.print();
        };
      <\/script>

    </body>

    </html>
  `);


  invoiceWindow.document.close();
}


/* =========================================================
   CHECKOUT
========================================================= */

checkoutBtn?.addEventListener("click", openCheckout);


function openCheckout() {

  if (!cart.length) {

    toast(
      "Ton panier est vide.",
      "error"
    );

    return;
  }


  if (!currentUser) {

    toast(
      "Connecte-toi avant de commander.",
      "error"
    );

    showLoginForm();

    return;
  }


  const subtotal = getCartSubtotal();


  showModal(
    "Finaliser la commande",
    `
      <form id="checkoutForm" class="checkout-form">

        <label>
          Adresse de livraison
        </label>

        <textarea
          id="checkoutAddress"
          placeholder="Adresse complète"
          required
        ></textarea>


        <label>
          Code promo
        </label>

        <input
          id="promoCode"
          type="text"
          placeholder="Entre NOVA100..."
          autocomplete="off"
        >


        <div class="checkout-summary">

          <div>
            <span>Sous-total</span>
            <strong id="checkoutSubtotal">
              ${money(subtotal)}
            </strong>
          </div>

          <div>
            <span>Réduction</span>
            <strong id="checkoutDiscount">
              ${money(0)}
            </strong>
          </div>

          <div class="checkout-final">
            <span>Total</span>
            <strong id="checkoutFinal">
              ${money(subtotal)}
            </strong>
          </div>

        </div>


        <div class="payment-choice">

          <button
            type="button"
            class="payment-btn active"
            data-payment="PayPal"
          >
            PayPal
          </button>

          <button
            type="button"
            class="payment-btn"
            data-payment="Carte bancaire"
          >
            💳 Carte bancaire
          </button>

        </div>


        <input
          type="hidden"
          id="paymentMethod"
          value="PayPal"
        >


        <div id="paymentInfo" class="payment-info">
          Paiement via PayPal.
        </div>


        <button
          type="submit"
          class="add-btn large"
        >
          Continuer
        </button>

      </form>
    `
  );


  const promoInput =
    document.getElementById("promoCode");

  const discountElement =
    document.getElementById("checkoutDiscount");

  const finalElement =
    document.getElementById("checkoutFinal");

  const paymentMethod =
    document.getElementById("paymentMethod");

  const paymentInfo =
    document.getElementById("paymentInfo");


  function updateCheckout() {

    const code =
      promoInput?.value.trim().toUpperCase() || "";

    const discount =
      code === "NOVA100"
        ? subtotal
        : 0;

    const total =
      Math.max(0, subtotal - discount);


    if (discountElement) {
      discountElement.textContent =
        money(discount);
    }

    if (finalElement) {
      finalElement.textContent =
        money(total);
    }

  }


  promoInput?.addEventListener(
    "input",
    updateCheckout
  );


  modalContent
    ?.querySelectorAll("[data-payment]")
    .forEach(button => {

      button.addEventListener("click", () => {

        modalContent
          .querySelectorAll("[data-payment]")
          .forEach(item => {
            item.classList.remove("active");
          });

        button.classList.add("active");

        const method =
          button.dataset.payment;

        if (paymentMethod) {
          paymentMethod.value = method;
        }

        if (paymentInfo) {

          paymentInfo.textContent =
            method === "PayPal"
              ? "Paiement via PayPal."
              : "Paiement par carte bancaire.";
        }

      });

    });


  document
    .getElementById("checkoutForm")
    ?.addEventListener("submit", async event => {

      event.preventDefault();


      const address =
        document
          .getElementById("checkoutAddress")
          ?.value
          .trim();


      const promoCode =
        promoInput?.value
          .trim()
          .toUpperCase() || "";


      const discount =
        promoCode === "NOVA100"
          ? subtotal
          : 0;


      const total =
        Math.max(0, subtotal - discount);


      const method =
        paymentMethod?.value ||
        "PayPal";


      if (!address) {

        toast(
          "Entre ton adresse de livraison.",
          "error"
        );

        return;
      }


      const submitButton =
        event.target.querySelector(
          "button[type='submit']"
        );


      if (submitButton) {

        submitButton.disabled = true;
        submitButton.textContent =
          "Création de la commande...";

      }


      try {

        const items = cart.map(item => {

          const product =
            getProduct(item.id);

          return {
            id: item.id,
            name: product?.name || "Produit",
            price: product?.price || 0,
            quantity: item.quantity
          };

        });


        const orderData = {

          userId: currentUser.uid,

          userEmail: currentUser.email,

          items,

          subtotal,

          discount,

          total,

          promoCode,

          address,

          status: "Enregistrée",

          paymentMethod: method,

          paymentStatus: "En attente",

          tracking: "",

          city: "",

          estimatedDelivery: "",

          createdAt: serverTimestamp()

        };


        const orderRef =
          await addDoc(
            collection(db, "orders"),
            orderData
          );


        cart = [];

        saveCart();
        renderCart();

        closeModal();
        closeCart();


        toast(
          "Commande enregistrée 🎉"
        );


        if (method === "PayPal") {

          const paypalUrl =
            `https://paypal.me/SH0PNOVA/${encodeURIComponent(
              total.toFixed(2)
            )}EUR`;

          window.open(
            paypalUrl,
            "_blank"
          );

        } else {

          showModal(
            "Paiement par carte",
            `
              <div class="payment-demo">

                <div class="payment-icon">
                  💳
                </div>

                <h3>
                  Paiement par carte
                </h3>

                <p>
                  Ta commande a été créée.
                </p>

                <p>
                  Référence :
                  <strong>
                    #${escapeHTML(orderRef.id)}
                  </strong>
                </p>

                <p>
                  Le paiement par carte est actuellement en mode démonstration.
                </p>

                <button
                  type="button"
                  class="add-btn"
                  data-close-payment
                >
                  Fermer
                </button>

              </div>
            `
          );

          modalContent
            ?.querySelector("[data-close-payment]")
            ?.addEventListener(
              "click",
              closeModal
            );

        }


      } catch (error) {

        console.error(error);

        toast(
          "Impossible de créer la commande.",
          "error"
        );


        if (submitButton) {

          submitButton.disabled = false;
          submitButton.textContent =
            "Continuer";

        }

      }

    });

}


/* =========================================================
   ADMIN
========================================================= */

function isAdminUser() {

  return Boolean(
    currentUser &&
    currentUser.email &&
    currentUser.email.toLowerCase() ===
      ADMIN_EMAIL.toLowerCase()
  );

}


adminBtn?.addEventListener(
  "click",
  openAdmin
);


function openAdmin() {

  if (!currentUser) {

    toast(
      "Connecte-toi d'abord.",
      "error"
    );

    showLoginForm();

    return;
  }


  if (!isAdminUser()) {

    toast(
      "Accès administrateur refusé.",
      "error"
    );

    return;
  }


  const authorized =
    localStorage.getItem(
      ADMIN_ACCESS_KEY
    );


  if (authorized !== "true") {

    const code =
      window.prompt(
        "Entre le code administrateur :"
      );


    if (code !== ADMIN_CODE) {

      toast(
        "Code administrateur incorrect.",
        "error"
      );

      return;
    }


    localStorage.setItem(
      ADMIN_ACCESS_KEY,
      "true"
    );

  }


  loadAdmin();

}


async function loadAdmin() {

  showModal(
    "Administration NovaShop",
    `
      <div class="loading-box">
        Chargement des commandes...
      </div>
    `
  );


  try {

    const snapshot =
      await getDocs(
        collection(db, "orders")
      );


    const orders = [];

    snapshot.forEach(item => {

      orders.push({
        id: item.id,
        ...item.data()
      });

    });


    orders.sort((a, b) => {

      const aSeconds =
        a.createdAt?.seconds || 0;

      const bSeconds =
        b.createdAt?.seconds || 0;

      return bSeconds - aSeconds;

    });


    renderAdmin(orders);


  } catch (error) {

    console.error(error);

    showModal(
      "Administration NovaShop",
      `
        <div class="form-error">
          Impossible de charger les commandes.
        </div>
      `
    );

  }

}


function renderAdmin(orders) {

  const statuses = [
    "Enregistrée",
    "Acceptée",
    "Préparation",
    "En transit",
    "Livraison proche",
    "Livrée",
    "Annulée",
    "Remboursement en cours"
  ];


  showModal(
    "Administration NovaShop",
    `
      <div class="admin-panel">

        <div class="admin-top">

          <strong>
            ${orders.length}
            commande${orders.length > 1 ? "s" : ""}
          </strong>

          <button
            type="button"
            class="secondary-btn"
            data-admin-refresh
          >
            Actualiser
          </button>

        </div>


        ${
          orders.length
            ? orders.map(order => {

                return `
                  <div
                    class="admin-order"
                    data-admin-order="${escapeHTML(order.id)}"
                  >

                    <div class="admin-order-header">

                      <div>

                        <strong>
                          #${escapeHTML(order.id.slice(-8))}
                        </strong>

                        <small>
                          ${escapeHTML(order.userEmail || "")}
                        </small>

                      </div>

                      <strong>
                        ${money(order.total)}
                      </strong>

                    </div>


                    <div class="admin-fields">

                      <label>
                        Statut

                        <select data-admin-status>

                          ${statuses.map(status => `
                            <option
                              value="${escapeHTML(status)}"
                              ${order.status === status ? "selected" : ""}
                            >
                              ${escapeHTML(status)}
                            </option>
                          `).join("")}

                        </select>

                      </label>


                      <label>
                        Ville

                        <input
                          type="text"
                          data-admin-city
                          value="${escapeHTML(order.city || "")}"
                          placeholder="Ville"
                        >

                      </label>


                      <label>
                        Suivi

                        <input
                          type="text"
                          data-admin-tracking
                          value="${escapeHTML(order.tracking || "")}"
                          placeholder="Numéro de suivi"
                        >

                      </label>


                      <label>
                        Livraison estimée

                        <input
                          type="text"
                          data-admin-delivery
                          value="${escapeHTML(order.estimatedDelivery || "")}"
                          placeholder="Ex : 25 septembre"
                        >

                      </label>

                    </div>


                    <div class="admin-payment">

                      <span>
                        Paiement :
                        <strong>
                          ${escapeHTML(order.paymentMethod || "Inconnu")}
                        </strong>
                      </span>

                      <span>
                        État :
                        <strong>
                          ${escapeHTML(order.paymentStatus || "En attente")}
                        </strong>
                      </span>

                    </div>


                    <div class="admin-actions">

                      <button
                        type="button"
                        class="add-btn"
                        data-admin-save
                      >
                        💾 Sauvegarder
                      </button>

                      <button
                        type="button"
                        class="secondary-btn"
                        data-admin-paid
                      >
                        ✓ Marquer payé
                      </button>

                      <button
                        type="button"
                        class="view-btn"
                        data-admin-invoice
                      >
                        🧾 Facture
                      </button>

                    </div>

                  </div>
                `;

              }).join("")
            : `
              <div class="empty-orders">

                <div class="empty-icon">
                  📦
                </div>

                <h3>
                  Aucune commande
                </h3>

              </div>
            `
        }


        <button
          type="button"
          class="secondary-btn"
          data-admin-quit
        >
          Quitter l'administration
        </button>

      </div>
    `
  );


  modalContent
    ?.querySelector("[data-admin-refresh]")
    ?.addEventListener(
      "click",
      loadAdmin
    );


  modalContent
    ?.querySelector("[data-admin-quit]")
    ?.addEventListener(
      "click",
      closeModal
    );


  modalContent
    ?.querySelectorAll("[data-admin-order]")
    ?.forEach(orderElement => {

      const orderId =
        orderElement.dataset.adminOrder;

      const order =
        orders.find(item => item.id === orderId);

      if (!order) {
        return;
      }


      orderElement
        .querySelector("[data-admin-save]")
        ?.addEventListener(
          "click",
          () => saveAdminOrder(order)
        );


      orderElement
        .querySelector("[data-admin-paid]")
        ?.addEventListener(
          "click",
          () => markOrderPaid(order)
        );


      orderElement
        .querySelector("[data-admin-invoice]")
        ?.addEventListener(
          "click",
          () => printInvoice(order)
        );

    });

}


async function saveAdminOrder(order) {

  const element =
    modalContent?.querySelector(
      `[data-admin-order="${CSS.escape(order.id)}"]`
    );


  if (!element) {
    return;
  }


  const status =
    element.querySelector(
      "[data-admin-status]"
    )?.value || "Enregistrée";


  const city =
    element.querySelector(
      "[data-admin-city]"
    )?.value.trim() || "";


  const tracking =
    element.querySelector(
      "[data-admin-tracking]"
    )?.value.trim() || "";


  const estimatedDelivery =
    element.querySelector(
      "[data-admin-delivery]"
    )?.value.trim() || "";


  try {

    await updateDoc(
      doc(db, "orders", order.id),
      {
        status,
        city,
        tracking,
        estimatedDelivery
      }
    );


    toast(
      "Commande mise à jour ✅"
    );


    order.status = status;
    order.city = city;
    order.tracking = tracking;
    order.estimatedDelivery =
      estimatedDelivery;


  } catch (error) {

    console.error(error);

    toast(
      "Impossible de sauvegarder.",
      "error"
    );

  }

}


async function markOrderPaid(order) {

  try {

    await updateDoc(
      doc(db, "orders", order.id),
      {
        paymentStatus: "Payé"
      }
    );


    toast(
      "Commande marquée comme payée 💳"
    );


    order.paymentStatus = "Payé";


    const element =
      modalContent?.querySelector(
        `[data-admin-order="${CSS.escape(order.id)}"]`
      );


    if (element) {

      const paymentArea =
        element.querySelector(
          ".admin-payment"
        );

      if (paymentArea) {

        paymentArea.innerHTML = `
          <span>
            Paiement :
            <strong>
              ${escapeHTML(order.paymentMethod || "Inconnu")}
            </strong>
          </span>

          <span>
            État :
            <strong>
              Payé
            </strong>
          </span>
        `;

      }

    }


  } catch (error) {

    console.error(error);

    toast(
      "Impossible de modifier le paiement.",
      "error"
    );

  }

}


/* =========================================================
   SETTINGS
========================================================= */

function getTheme() {

  return localStorage.getItem(
    "novaThemeChoice"
  ) || "dark";

}


function applyTheme() {

  const theme =
    getTheme();

  if (theme === "light") {

    document.documentElement.dataset.theme =
      "light";

  } else if (theme === "dark") {

    document.documentElement.dataset.theme =
      "dark";

  } else {

    const prefersDark =
      window.matchMedia &&
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

    document.documentElement.dataset.theme =
      prefersDark ? "dark" : "light";

  }

}


function openSettings() {

  const current =
    getTheme();


  showModal(
    "Paramètres",
    `
      <div class="settings-panel">

        <h3>
          Apparence
        </h3>

        <div class="theme-options">

          <button
            type="button"
            class="theme-btn ${current === "dark" ? "active" : ""}"
            data-theme-choice="dark"
          >
            🌙 Sombre
          </button>

          <button
            type="button"
            class="theme-btn ${current === "light" ? "active" : ""}"
            data-theme-choice="light"
          >
            ☀️ Claire
          </button>

          <button
            type="button"
            class="theme-btn ${current === "auto" ? "active" : ""}"
            data-theme-choice="auto"
          >
            🖥️ Automatique
          </button>

        </div>

      </div>
    `
  );


  modalContent
    ?.querySelectorAll("[data-theme-choice]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const choice =
            button.dataset.themeChoice;

          localStorage.setItem(
            "novaThemeChoice",
            choice
          );

          applyTheme();

          modalContent
            .querySelectorAll(
              "[data-theme-choice]"
            )
            .forEach(item => {
              item.classList.remove("active");
            });

          button.classList.add("active");

          toast(
            "Thème enregistré ✓"
          );

        }
      );

    });

}


settingsBtn?.addEventListener(
  "click",
  openSettings
);


/* =========================================================
   NOVA100
========================================================= */

function handleNova100() {

  const code =
    window.prompt(
      "Entre le code promo :"
    );


  if (!code) {
    return;
  }


  if (code.trim().toUpperCase() !== "NOVA100") {

    toast(
      "Code incorrect.",
      "error"
    );

    return;
  }


  if (!cart.length) {

    toast(
      "Ajoute d'abord un produit au panier.",
      "error"
    );

    return;
  }


  openCart();


  toast(
    "Code NOVA100 détecté 🎉"
  );

}


searchInput?.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Enter") {
      return;
    }

    const value =
      searchInput.value
        .trim()
        .toUpperCase();

    if (value === "NOVA100") {

      event.preventDefault();

      handleNova100();

    }

  }
);


/* =========================================================
   ESCAPE / FERMETURE
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") {
      return;
    }

    closeModal();
    closeCart();

  }
);


modalLayer?.addEventListener(
  "click",
  event => {

    if (event.target === modalLayer) {
      closeModal();
    }

  }
);


/* =========================================================
   ERREURS PROMESSES
========================================================= */

window.addEventListener(
  "unhandledrejection",
  event => {

    console.error(
      "NovaShop unhandled rejection:",
      event.reason
    );

  }
);


/* =========================================================
   INITIALISATION
========================================================= */

applyTheme();
renderCategories();
renderProducts();
renderCart();


/* =========================================================
   API PUBLIQUE
========================================================= */

window.NovaShop = {

  products,

  get currentUser() {
    return currentUser;
  },

  addToCart,

  removeFromCart,

  changeCartQuantity,

  openCart,

  closeCart,

  openProduct,

  openAccount,

  openOrders,

  openSettings,

  renderProducts,

  renderCart,

  getCartCount,

  getCartSubtotal,

  money,

  handleNova100

};


console.log(
  "NovaShop chargé avec succès 🚀"
);
