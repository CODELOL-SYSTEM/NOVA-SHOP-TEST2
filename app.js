/* =========================================================
   NOVASHOP - APP.JS
   Firebase CDN 12.19.0
   ========================================================= */

/* =========================================================
   1. FIREBASE
   ========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAnalytics
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";

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
   2. FIREBASE CONFIG
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
   3. ADMIN
   ========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";
const ADMIN_ACCESS_KEY = "novaAdminAuthorized";

const FALLBACK_IMAGE =
  "https://placehold.co/800x800/111827/ffffff?text=NovaShop";


/* =========================================================
   4. PRODUITS
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
   5. DOM
   ========================================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];


/* =========================================================
   6. STATE
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

let nova100Active = false;
let selectedPayment = "card";

let currentOrder = null;

let adminMode = false;


/* =========================================================
   7. UTILITAIRES
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
    (total, item) => total + item.quantity,
    0
  );
}


function cartTotal() {
  return cart.reduce((total, item) => {
    const product = getProduct(item.id);
    if (!product) return total;

    return total + product.price * item.quantity;
  }, 0);
}


function toast(message, type = "info") {
  let container = $("#toast-container");

  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";

    Object.assign(container.style, {
      position: "fixed",
      right: "20px",
      bottom: "20px",
      zIndex: "99999",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    });

    document.body.appendChild(container);
  }

  const item = document.createElement("div");

  item.textContent = message;

  Object.assign(item.style, {
    padding: "13px 17px",
    borderRadius: "12px",
    background: type === "error"
      ? "#7f1d1d"
      : type === "success"
        ? "#14532d"
        : "#111827",
    color: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,.35)",
    fontWeight: "700",
    maxWidth: "360px"
  });

  container.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, 3000);
}


/* =========================================================
   8. MODAL
   ========================================================= */

function closeModal() {
  const modal = $("#nova-modal");

  if (modal) {
    modal.remove();
  }
}


function openModal(content) {
  closeModal();

  const modal = document.createElement("div");

  modal.id = "nova-modal";

  Object.assign(modal.style, {
    position: "fixed",
    inset: "0",
    zIndex: "99990",
    background: "rgba(0,0,0,.78)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    overflow: "auto"
  });

  modal.innerHTML = `
    <div
      class="nova-modal-inner"
      style="
        width:min(1100px,100%);
        max-height:90vh;
        overflow:auto;
        background:#0b1220;
        color:white;
        border-radius:22px;
        padding:24px;
        box-shadow:0 25px 80px rgba(0,0,0,.55);
        position:relative;
      "
    >
      <button
        data-close-modal
        style="
          position:absolute;
          top:14px;
          right:14px;
          width:38px;
          height:38px;
          border:0;
          border-radius:50%;
          background:#1f2937;
          color:white;
          cursor:pointer;
          font-size:20px;
        "
      >×</button>

      ${content}
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener("click", event => {
    if (
      event.target === modal ||
      event.target.closest("[data-close-modal]")
    ) {
      closeModal();
    }
  });
}


/* =========================================================
   9. CATEGORIES
   ========================================================= */

const categories = [
  "Tous",
  ...new Set(products.map(product => product.category))
];


/* =========================================================
   10. FILTER / SORT
   ========================================================= */

function getFilteredProducts() {
  let result = [...products];

  if (currentCategory !== "Tous") {
    result = result.filter(
      product => product.category === currentCategory
    );
  }

  if (currentSearch.trim()) {
    const search = currentSearch
      .trim()
      .toLowerCase();

    result = result.filter(product =>
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  }

  if (currentSort === "price-low") {
    result.sort((a, b) => a.price - b.price);
  }

  if (currentSort === "price-high") {
    result.sort((a, b) => b.price - a.price);
  }

  if (currentSort === "name") {
    result.sort((a, b) =>
      a.name.localeCompare(b.name, "fr")
    );
  }

  if (currentSort === "new") {
    result.sort((a, b) =>
      Number(Boolean(b.new)) -
      Number(Boolean(a.new))
    );
  }

  return result;
}


/* =========================================================
   11. PRODUCT CARD
   ========================================================= */

function productCard(product) {
  const isFavorite =
    favorites.includes(product.id);

  return `
    <article
      class="product-card"
      data-product-id="${escapeHTML(product.id)}"
      style="
        position:relative;
        overflow:hidden;
      "
    >

      ${
        product.new
          ? `
            <span
              style="
                position:absolute;
                top:12px;
                left:12px;
                z-index:2;
                background:#2563eb;
                color:#fff;
                padding:6px 10px;
                border-radius:999px;
                font-size:12px;
                font-weight:800;
              "
            >NOUVEAU</span>
          `
          : ""
      }

      <button
        class="favorite-product"
        data-favorite="${escapeHTML(product.id)}"
        aria-label="Ajouter aux favoris"
        style="
          position:absolute;
          top:10px;
          right:10px;
          z-index:3;
          width:38px;
          height:38px;
          border:0;
          border-radius:50%;
          cursor:pointer;
          background:rgba(0,0,0,.6);
          color:${isFavorite ? "#ef4444" : "#fff"};
          font-size:20px;
        "
      >
        ${isFavorite ? "♥" : "♡"}
      </button>

      <div class="product-image">
        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          referrerpolicy="no-referrer"
          onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
          style="
            width:100%;
            height:100%;
            object-fit:contain;
            display:block;
          "
        >
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

          <button
            class="add-cart"
            data-add-cart="${escapeHTML(product.id)}"
          >
            Ajouter
          </button>

        </div>

      </div>
    </article>
  `;
}


/* =========================================================
   12. PRODUCT RENDER
   ========================================================= */

function renderProducts() {
  const container =
    $("#products-grid") ||
    $(".products-grid") ||
    $("#products");

  if (!container) return;

  const result = getFilteredProducts();

  if (!result.length) {
    container.innerHTML = `
      <div
        style="
          grid-column:1/-1;
          padding:50px;
          text-align:center;
        "
      >
        <h2>Aucun produit trouvé</h2>
        <p>Essaie une autre recherche.</p>
      </div>
    `;

    return;
  }

  container.innerHTML =
    result.map(productCard).join("");

  updateProductEvents();
}


/* =========================================================
   13. EVENTS PRODUCTS
   ========================================================= */

function updateProductEvents() {

  $$("[data-add-cart]").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();

      addToCart(
        button.dataset.addCart
      );
    });
  });


  $$("[data-favorite]").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();

      toggleFavorite(
        button.dataset.favorite
      );
    });
  });


  $$(".product-card").forEach(card => {
    card.addEventListener("click", event => {

      if (
        event.target.closest("button")
      ) {
        return;
      }

      openProduct(
        card.dataset.productId
      );
    });
  });
}


/* =========================================================
   14. PRODUCT DETAIL
   ========================================================= */

function openProduct(id) {
  const product = getProduct(id);

  if (!product) return;

  currentProduct = product;

  openModal(`
    <div
      style="
        display:grid;
        grid-template-columns:minmax(0,1fr) minmax(0,1fr);
        gap:28px;
        align-items:center;
      "
    >

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

      <div>

        <div
          style="
            color:#60a5fa;
            font-weight:800;
            margin-bottom:8px;
          "
        >
          ${escapeHTML(product.category)}
        </div>

        <h2
          style="
            font-size:clamp(24px,4vw,38px);
            margin-bottom:16px;
          "
        >
          ${escapeHTML(product.name)}
        </h2>

        <div
          style="
            font-size:30px;
            font-weight:900;
            margin-bottom:22px;
          "
        >
          ${money(product.price)}
        </div>

        <button
          id="detail-add-cart"
          data-id="${escapeHTML(product.id)}"
          style="
            width:100%;
            padding:15px;
            border:0;
            border-radius:13px;
            background:#2563eb;
            color:#fff;
            font-size:16px;
            font-weight:900;
            cursor:pointer;
          "
        >
          🛒 Ajouter au panier
        </button>

      </div>

    </div>
  `);

  $("#detail-add-cart")?.addEventListener(
    "click",
    () => addToCart(product.id)
  );
}


/* =========================================================
   15. CART
   ========================================================= */

function addToCart(id) {
  const product = getProduct(id);

  if (!product) return;

  const existing = cart.find(
    item => item.id === id
  );

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
  updateCartBadge();

  toast(
    `${product.name} ajouté au panier`,
    "success"
  );
}


function removeFromCart(id) {
  cart = cart.filter(
    item => item.id !== id
  );

  saveCart();

  renderCart();
  updateCartBadge();
}


function changeQuantity(id, amount) {
  const item = cart.find(
    item => item.id === id
  );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart();
  renderCart();
  updateCartBadge();
}


function updateCartBadge() {
  const count = cartCount();

  $$("[data-cart-count], .cart-count").forEach(
    element => {
      element.textContent = count;
    }
  );
}


function renderCart() {
  const container =
    $("#cart-items") ||
    $(".cart-items");

  if (!container) return;

  if (!cart.length) {
    container.innerHTML = `
      <div
        style="
          padding:30px;
          text-align:center;
        "
      >
        🛒<br><br>
        Ton panier est vide.
      </div>
    `;

    const total =
      $("#cart-total") ||
      $(".cart-total");

    if (total) {
      total.textContent = money(0);
    }

    return;
  }

  container.innerHTML =
    cart.map(item => {

      const product = getProduct(item.id);

      if (!product) return "";

      return `
        <div
          class="cart-item"
          style="
            display:flex;
            gap:14px;
            align-items:center;
            padding:14px 0;
            border-bottom:1px solid rgba(255,255,255,.08);
          "
        >

          <img
            src="${escapeHTML(product.image)}"
            alt=""
            referrerpolicy="no-referrer"
            onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
            style="
              width:75px;
              height:75px;
              object-fit:contain;
              border-radius:12px;
              background:#111827;
            "
          >

          <div style="flex:1">

            <strong>
              ${escapeHTML(product.name)}
            </strong>

            <div>
              ${money(product.price)}
            </div>

            <div
              style="
                display:flex;
                align-items:center;
                gap:8px;
                margin-top:8px;
              "
            >

              <button
                data-minus="${escapeHTML(product.id)}"
              >−</button>

              <span>
                ${item.quantity}
              </span>

              <button
                data-plus="${escapeHTML(product.id)}"
              >+</button>

              <button
                data-remove="${escapeHTML(product.id)}"
                style="margin-left:8px"
              >
                Supprimer
              </button>

            </div>

          </div>

          <strong>
            ${money(product.price * item.quantity)}
          </strong>

        </div>
      `;
    }).join("");


  $$("[data-minus]", container).forEach(
    button => {
      button.addEventListener(
        "click",
        () => changeQuantity(
          button.dataset.minus,
          -1
        )
      );
    }
  );


  $$("[data-plus]", container).forEach(
    button => {
      button.addEventListener(
        "click",
        () => changeQuantity(
          button.dataset.plus,
          1
        )
      );
    }
  );


  $$("[data-remove]", container).forEach(
    button => {
      button.addEventListener(
        "click",
        () => removeFromCart(
          button.dataset.remove
        )
      );
    }
  );


  const total =
    $("#cart-total") ||
    $(".cart-total");

  if (total) {
    total.textContent = money(
      cartTotal()
    );
  }
}


/* =========================================================
   16. FAVORITES
   ========================================================= */

function toggleFavorite(id) {

  if (favorites.includes(id)) {
    favorites =
      favorites.filter(
        favorite => favorite !== id
      );

    toast("Retiré des favoris");
  } else {
    favorites.push(id);

    toast(
      "Ajouté aux favoris ❤️",
      "success"
    );
  }

  saveFavorites();
  renderProducts();
}


/* =========================================================
   17. AUTH ERROR
   ========================================================= */

function authErrorMessage(error) {

  const code = error?.code || "";

  const messages = {
    "auth/invalid-credential":
      "Email ou mot de passe incorrect.",

    "auth/invalid-email":
      "Adresse email invalide.",

    "auth/email-already-in-use":
      "Cette adresse email est déjà utilisée.",

    "auth/weak-password":
      "Le mot de passe est trop faible.",

    "auth/user-not-found":
      "Compte introuvable.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard.",

    "auth/network-request-failed":
      "Problème de connexion internet.",

    "auth/api-key-not-valid":
      "La clé API Firebase est invalide.",

    "auth/configuration-not-found":
      "La configuration Firebase est introuvable."
  };

  return (
    messages[code] ||
    error?.message ||
    "Une erreur est survenue."
  );
}


/* =========================================================
   18. LOGIN
   ========================================================= */

async function login(email, password) {

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    toast(
      "Connexion réussie ✅",
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
   19. REGISTER
   ========================================================= */

async function register(email, password) {

  try {

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    toast(
      "Compte créé avec succès 🎉",
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
   20. AUTH MODAL
   ========================================================= */

function openAuth() {

  openModal(`
    <div style="max-width:500px;margin:auto">

      <h2 style="margin-bottom:20px">
        👤 Compte NovaShop
      </h2>

      <div
        style="
          display:flex;
          gap:10px;
          margin-bottom:20px;
        "
      >

        <button
          id="auth-login-tab"
          style="flex:1;padding:12px"
        >
          Connexion
        </button>

        <button
          id="auth-register-tab"
          style="flex:1;padding:12px"
        >
          Inscription
        </button>

      </div>

      <input
        id="auth-email"
        type="email"
        placeholder="Email"
        style="
          width:100%;
          padding:13px;
          margin-bottom:10px;
        "
      >

      <input
        id="auth-password"
        type="password"
        placeholder="Mot de passe"
        style="
          width:100%;
          padding:13px;
          margin-bottom:15px;
        "
      >

      <button
        id="auth-submit"
        style="
          width:100%;
          padding:14px;
          background:#2563eb;
          color:white;
          border:0;
          border-radius:10px;
          font-weight:800;
          cursor:pointer;
        "
      >
        Se connecter
      </button>

      <p
        id="auth-mode-text"
        style="
          text-align:center;
          margin-top:15px;
          opacity:.7;
        "
      >
        Pas encore de compte ?
      </p>

    </div>
  `);


  let mode = "login";

  const submit =
    $("#auth-submit");

  const modeText =
    $("#auth-mode-text");


  $("#auth-login-tab")
    ?.addEventListener(
      "click",
      () => {

        mode = "login";

        submit.textContent =
          "Se connecter";

        modeText.textContent =
          "Pas encore de compte ?";
      }
    );


  $("#auth-register-tab")
    ?.addEventListener(
      "click",
      () => {

        mode = "register";

        submit.textContent =
          "Créer mon compte";

        modeText.textContent =
          "Créer un compte NovaShop";
      }
    );


  submit?.addEventListener(
    "click",
    async () => {

      const email =
        $("#auth-email")?.value.trim();

      const password =
        $("#auth-password")?.value;

      if (!email || !password) {
        toast(
          "Remplis tous les champs.",
          "error"
        );

        return;
      }

      if (mode === "login") {
        await login(
          email,
          password
        );
      } else {
        await register(
          email,
          password
        );
      }
    }
  );
}


/* =========================================================
   21. ACCOUNT
   ========================================================= */

function renderAccount() {

  $$("[data-account-name], .account-name")
    .forEach(element => {

      element.textContent =
        currentUser
          ? currentUser.email
          : "Compte";
    });


  $$("[data-login]").forEach(button => {

    button.onclick = () => {

      if (currentUser) {
        openAccountMenu();
      } else {
        openAuth();
      }

    };

  });
}


function openAccountMenu() {

  openModal(`
    <div style="max-width:500px;margin:auto">

      <h2>👤 Mon compte</h2>

      <p style="margin:15px 0">
        ${escapeHTML(currentUser?.email || "")}
      </p>

      <button
        id="my-orders"
        style="
          width:100%;
          padding:13px;
          margin-bottom:10px;
        "
      >
        📦 Mes commandes
      </button>

      <button
        id="logout-btn"
        style="
          width:100%;
          padding:13px;
        "
      >
        🚪 Se déconnecter
      </button>

    </div>
  `);


  $("#logout-btn")
    ?.addEventListener(
      "click",
      async () => {

        await signOut(auth);

        toast(
          "Déconnexion réussie",
          "success"
        );

        closeModal();
      }
    );


  $("#my-orders")
    ?.addEventListener(
      "click",
      () => {

        closeModal();

        setTimeout(
          () => openOrders(),
          100
        );
      }
    );
}


/* =========================================================
   22. ORDERS
   ========================================================= */

async function getUserOrders() {

  if (!currentUser) {
    return [];
  }

  try {

    const ordersRef =
      collection(db, "orders");

    const q = query(
      ordersRef,
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
      item => ({
        id: item.id,
        ...item.data()
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
    openAuth();
    return;
  }

  openModal(`
    <div>
      <h2>📦 Mes commandes</h2>

      <div
        id="orders-list"
        style="margin-top:20px"
      >
        Chargement...
      </div>
    </div>
  `);

  const orders =
    await getUserOrders();

  const container =
    $("#orders-list");

  if (!container) return;

  if (!orders.length) {

    container.innerHTML = `
      <div style="padding:30px;text-align:center">
        Aucune commande pour le moment.
      </div>
    `;

    return;
  }

  container.innerHTML =
    orders.map(order => `
      <div
        style="
          padding:16px;
          margin-bottom:12px;
          background:#111827;
          border-radius:14px;
        "
      >

        <strong>
          Commande #${escapeHTML(order.id.slice(0,8))}
        </strong>

        <p>
          Total :
          ${money(order.total)}
        </p>

        <p>
          Statut :
          ${escapeHTML(order.status || "En attente")}
        </p>

        <button
          data-order-detail="${escapeHTML(order.id)}"
        >
          Voir la commande
        </button>

      </div>
    `).join("");


  $$("[data-order-detail]", container)
    .forEach(button => {

      button.addEventListener(
        "click",
        () => openOrderDetail(
          button.dataset.orderDetail
        )
      );

    });
}


/* =========================================================
   23. ORDER DETAIL
   ========================================================= */

async function openOrderDetail(orderId) {

  if (!currentUser) return;

  try {

    const orderSnap =
      await getDoc(
        doc(db, "orders", orderId)
      );

    if (!orderSnap.exists()) {

      toast(
        "Commande introuvable.",
        "error"
      );

      return;
    }

    const order = {
      id: orderSnap.id,
      ...orderSnap.data()
    };

    if (
      order.userId !== currentUser.uid &&
      currentUser.email !== ADMIN_EMAIL
    ) {
      toast(
        "Accès refusé.",
        "error"
      );

      return;
    }

    currentOrder = order;

    openModal(`
      <div>

        <h2>
          📦 Commande #${escapeHTML(order.id)}
        </h2>

        <p style="margin:15px 0">
          Statut :
          <strong>
            ${escapeHTML(order.status || "En attente")}
          </strong>
        </p>

        <div>

          ${
            (order.items || []).map(item => `
              <div
                style="
                  display:flex;
                  gap:12px;
                  padding:12px 0;
                  border-bottom:1px solid rgba(255,255,255,.08);
                "
              >

                <img
                  src="${escapeHTML(item.image || FALLBACK_IMAGE)}"
                  style="
                    width:65px;
                    height:65px;
                    object-fit:contain;
                  "
                >

                <div style="flex:1">

                  <strong>
                    ${escapeHTML(item.name)}
                  </strong>

                  <div>
                    Quantité : ${item.quantity}
                  </div>

                </div>

                <strong>
                  ${money(
                    Number(item.price) *
                    Number(item.quantity)
                  )}
                </strong>

              </div>
            `).join("")
          }

        </div>

        <h3 style="margin-top:20px">
          Total : ${money(order.total)}
        </h3>

        ${
          order.tracking
            ? `
              <p style="margin-top:12px">
                Suivi :
                ${escapeHTML(order.tracking)}
              </p>
            `
            : ""
        }

        ${
          order.city
            ? `
              <p>
                Ville :
                ${escapeHTML(order.city)}
              </p>
            `
            : ""
        }

        ${
          order.estimatedDelivery
            ? `
              <p>
                Livraison estimée :
                ${escapeHTML(order.estimatedDelivery)}
              </p>
            `
            : ""
        }

      </div>
    `);

  } catch (error) {

    console.error(error);

    toast(
      "Impossible de charger la commande.",
      "error"
    );
  }
}


/* =========================================================
   24. NOVA100
   ========================================================= */

function activateNova100(code) {

  if (
    String(code || "")
      .trim()
      .toUpperCase() !== "NOVA100"
  ) {

    nova100Active = false;

    toast(
      "Code invalide.",
      "error"
    );

    return false;
  }

  nova100Active = true;

  toast(
    "Code NOVA100 activé 🎉",
    "success"
  );

  renderCheckout();

  return true;
}


function getDiscountedTotal() {

  const total = cartTotal();

  if (!nova100Active) {
    return total;
  }

  return Math.max(
    0,
    total - 100
  );
}


/* =========================================================
   25. CHECKOUT
   ========================================================= */

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

    openAuth();

    return;
  }

  renderCheckout();
}


function renderCheckout() {

  const subtotal =
    cartTotal();

  const total =
    getDiscountedTotal();

  openModal(`
    <div style="max-width:900px;margin:auto">

      <h2>
        💳 Finaliser la commande
      </h2>

      <div
        style="
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:20px;
          margin-top:20px;
        "
      >

        <div>

          <h3>📍 Livraison</h3>

          <input
            id="checkout-name"
            placeholder="Nom complet"
            style="
              width:100%;
              padding:12px;
              margin-top:10px;
            "
          >

          <input
            id="checkout-address"
            placeholder="Adresse"
            style="
              width:100%;
              padding:12px;
              margin-top:10px;
            "
          >

          <input
            id="checkout-city"
            placeholder="Ville"
            style="
              width:100%;
              padding:12px;
              margin-top:10px;
            "
          >

          <input
            id="checkout-postcode"
            placeholder="Code postal"
            style="
              width:100%;
              padding:12px;
              margin-top:10px;
            "
          >

          <h3 style="margin-top:25px">
            🎁 Code promo
          </h3>

          <div
            style="
              display:flex;
              gap:8px;
              margin-top:10px;
            "
          >

            <input
              id="nova100-input"
              placeholder="NOVA100"
              style="
                flex:1;
                padding:12px;
              "
            >

            <button
              id="nova100-btn"
              style="
                padding:12px 16px;
              "
            >
              Appliquer
            </button>

          </div>

        </div>


        <div>

          <h3>
            💰 Résumé
          </h3>

          <div style="margin-top:15px">

            ${
              cart.map(item => {

                const product =
                  getProduct(item.id);

                if (!product) return "";

                return `
                  <div
                    style="
                      display:flex;
                      justify-content:space-between;
                      gap:10px;
                      padding:8px 0;
                    "
                  >

                    <span>
                      ${escapeHTML(product.name)}
                      ×${item.quantity}
                    </span>

                    <strong>
                      ${money(
                        product.price *
                        item.quantity
                      )}
                    </strong>

                  </div>
                `;

              }).join("")
            }

          </div>

          <hr style="margin:15px 0">

          <div>
            Sous-total :
            <strong>
              ${money(subtotal)}
            </strong>
          </div>

          ${
            nova100Active
              ? `
                <div
                  style="
                    color:#4ade80;
                    margin-top:8px;
                  "
                >
                  NOVA100 : -100,00 €
                </div>
              `
              : ""
          }

          <div
            style="
              font-size:25px;
              font-weight:900;
              margin-top:12px;
            "
          >
            Total :
            ${money(total)}
          </div>


          <h3 style="margin-top:25px">
            💳 Paiement
          </h3>

          <div
            style="
              display:grid;
              gap:10px;
              margin-top:10px;
            "
          >

            <button
              class="payment-choice"
              data-payment="card"
              style="
                padding:14px;
                cursor:pointer;
              "
            >
              💳 Carte bancaire
            </button>

            <button
              class="payment-choice"
              data-payment="paypal"
              style="
                padding:14px;
                cursor:pointer;
              "
            >
              🅿️ PayPal
            </button>

          </div>

          <button
            id="confirm-order"
            style="
              width:100%;
              padding:16px;
              margin-top:20px;
              border:0;
              border-radius:12px;
              background:#2563eb;
              color:#fff;
              font-weight:900;
              cursor:pointer;
            "
          >
            Confirmer la commande
          </button>

        </div>

      </div>

    </div>
  `);


  $$(".payment-choice")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          selectedPayment =
            button.dataset.payment;

          $$(".payment-choice")
            .forEach(item => {
              item.style.outline =
                item === button
                  ? "2px solid #3b82f6"
                  : "none";
            });

        }
      );

    });


  $("#nova100-btn")
    ?.addEventListener(
      "click",
      () => {

        activateNova100(
          $("#nova100-input")?.value
        );

      }
    );


  $("#confirm-order")
    ?.addEventListener(
      "click",
      createOrder
    );
}


/* =========================================================
   26. CREATE ORDER
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
      "Panier vide.",
      "error"
    );

    return;
  }


  const name =
    $("#checkout-name")?.value.trim();

  const address =
    $("#checkout-address")?.value.trim();

  const city =
    $("#checkout-city")?.value.trim();

  const postcode =
    $("#checkout-postcode")?.value.trim();


  if (
    !name ||
    !address ||
    !city ||
    !postcode
  ) {

    toast(
      "Remplis toutes les informations de livraison.",
      "error"
    );

    return;
  }


  const items =
    cart.map(item => {

      const product =
        getProduct(item.id);

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: item.quantity
      };

    });


  const subtotal =
    cartTotal();

  const total =
    getDiscountedTotal();


  const order = {

    userId: currentUser.uid,

    email:
      currentUser.email || "",

    customerName: name,

    address,

    city,

    postcode,

    items,

    subtotal,

    discount:
      nova100Active ? 100 : 0,

    total,

    paymentMethod:
      selectedPayment,

    paymentStatus:
      "pending",

    status:
      "En attente",

    tracking:
      "",

    estimatedDelivery:
      "",

    createdAt:
      serverTimestamp()

  };


  try {

    const docRef =
      await addDoc(
        collection(db, "orders"),
        order
      );


    cart = [];

    saveCart();

    updateCartBadge();

    nova100Active = false;


    toast(
      "Commande créée ✅",
      "success"
    );


    openModal(`
      <div
        style="
          text-align:center;
          padding:30px;
        "
      >

        <div style="font-size:60px">
          ✅
        </div>

        <h2>
          Commande confirmée !
        </h2>

        <p style="margin:15px 0">
          Numéro :
          <strong>
            ${escapeHTML(docRef.id)}
          </strong>
        </p>

        <p>
          Total :
          <strong>
            ${money(total)}
          </strong>
        </p>

        <button
          data-close-modal
          style="
            margin-top:20px;
            padding:13px 25px;
          "
        >
          Fermer
        </button>

      </div>
    `);


  } catch (error) {

    console.error(
      "Erreur création commande :",
      error
    );

    toast(
      "Impossible de créer la commande.",
      "error"
    );
  }
}


/* =========================================================
   27. ADMIN
   ========================================================= */

function isAdmin() {

  return (
    currentUser &&
    currentUser.email === ADMIN_EMAIL &&
    sessionStorage.getItem(
      ADMIN_ACCESS_KEY
    ) === "true"
  );
}


function openAdminLogin() {

  openModal(`
    <div
      style="
        max-width:450px;
        margin:auto;
      "
    >

      <h2>
        🔐 Administration NovaShop
      </h2>

      <input
        id="admin-code"
        type="password"
        placeholder="Code administrateur"
        style="
          width:100%;
          padding:13px;
          margin-top:20px;
        "
      >

      <button
        id="admin-login"
        style="
          width:100%;
          padding:14px;
          margin-top:12px;
          background:#2563eb;
          color:#fff;
          border:0;
          border-radius:10px;
          font-weight:900;
        "
      >
        Entrer
      </button>

    </div>
  `);


  $("#admin-login")
    ?.addEventListener(
      "click",
      () => {

        const code =
          $("#admin-code")?.value;

        if (
          code !== ADMIN_CODE
        ) {

          toast(
            "Code administrateur incorrect.",
            "error"
          );

          return;
        }

        if (
          !currentUser ||
          currentUser.email !== ADMIN_EMAIL
        ) {

          toast(
            "Compte administrateur requis.",
            "error"
          );

          return;
        }

        sessionStorage.setItem(
          ADMIN_ACCESS_KEY,
          "true"
        );

        adminMode = true;

        toast(
          "Mode admin activé 🔐",
          "success"
        );

        closeModal();

        setTimeout(
          () => openAdmin(),
          100
        );

      }
    );
}


async function openAdmin() {

  if (!isAdmin()) {

    if (!currentUser) {
      openAuth();
      return;
    }

    openAdminLogin();
    return;
  }


  openModal(`
    <div>

      <h2>
        🛠️ Administration NovaShop
      </h2>

      <div
        id="admin-orders"
        style="margin-top:20px"
      >
        Chargement...
      </div>

    </div>
  `);


  await renderAdminOrders();
}


async function renderAdminOrders() {

  const container =
    $("#admin-orders");

  if (!container) return;


  try {

    const snapshot =
      await getDocs(
        query(
          collection(db, "orders"),
          orderBy(
            "createdAt",
            "desc"
          )
        )
      );


    if (snapshot.empty) {

      container.innerHTML = `
        <div style="padding:30px">
          Aucune commande.
        </div>
      `;

      return;
    }


    container.innerHTML =
      snapshot.docs.map(
        orderDoc => {

          const order = {
            id: orderDoc.id,
            ...orderDoc.data()
          };

          return `
            <div
              style="
                padding:18px;
                margin-bottom:15px;
                border-radius:16px;
                background:#111827;
              "
            >

              <h3>
                Commande #${escapeHTML(order.id)}
              </h3>

              <p>
                Client :
                ${escapeHTML(order.email || "")}
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
                  order.paymentMethod || ""
                )}
              </p>

              <label>
                Statut
                <select
                  data-admin-status="${escapeHTML(order.id)}"
                  style="
                    width:100%;
                    padding:9px;
                    margin-top:5px;
                  "
                >

                  ${
                    [
                      "En attente",
                      "Payée",
                      "Préparation",
                      "Expédiée",
                      "Livrée",
                      "Annulée"
                    ].map(status => `
                      <option
                        value="${status}"
                        ${
                          order.status === status
                            ? "selected"
                            : ""
                        }
                      >
                        ${status}
                      </option>
                    `).join("")
                  }

                </select>
              </label>


              <input
                data-admin-tracking="${escapeHTML(order.id)}"
                value="${escapeHTML(order.tracking || "")}"
                placeholder="Numéro de suivi"
                style="
                  width:100%;
                  padding:9px;
                  margin-top:10px;
                "
              >


              <input
                data-admin-city="${escapeHTML(order.id)}"
                value="${escapeHTML(order.city || "")}"
                placeholder="Ville"
                style="
                  width:100%;
                  padding:9px;
                  margin-top:10px;
                "
              >


              <input
                data-admin-delivery="${escapeHTML(order.id)}"
                value="${escapeHTML(order.estimatedDelivery || "")}"
                placeholder="Livraison estimée"
                style="
                  width:100%;
                  padding:9px;
                  margin-top:10px;
                "
              >


              <button
                data-admin-save="${escapeHTML(order.id)}"
                style="
                  width:100%;
                  padding:12px;
                  margin-top:12px;
                  background:#2563eb;
                  color:white;
                  border:0;
                  border-radius:10px;
                  font-weight:800;
                  cursor:pointer;
                "
              >
                💾 Enregistrer
              </button>

              <button
                data-admin-paid="${escapeHTML(order.id)}"
                style="
                  width:100%;
                  padding:12px;
                  margin-top:8px;
                "
              >
                💳 Marquer comme payée
              </button>

            </div>
          `;

        }
      ).join("");


    $$("[data-admin-save]", container)
      .forEach(button => {

        button.addEventListener(
          "click",
          () => saveAdminOrder(
            button.dataset.adminSave
          )
        );

      });


    $$("[data-admin-paid]", container)
      .forEach(button => {

        button.addEventListener(
          "click",
          () => markOrderPaid(
            button.dataset.adminPaid
          )
        );

      });


  } catch (error) {

    console.error(error);

    container.innerHTML = `
      <div>
        Erreur lors du chargement des commandes.
      </div>
    `;
  }
}


/* =========================================================
   28. ADMIN SAVE
   ========================================================= */

async function saveAdminOrder(orderId) {

  if (!isAdmin()) {
    toast(
      "Accès refusé.",
      "error"
    );

    return;
  }


  const status =
    $(`[data-admin-status="${orderId}"]`)
      ?.value || "En attente";

  const tracking =
    $(`[data-admin-tracking="${orderId}"]`)
      ?.value.trim() || "";

  const city =
    $(`[data-admin-city="${orderId}"]`)
      ?.value.trim() || "";

  const estimatedDelivery =
    $(`[data-admin-delivery="${orderId}"]`)
      ?.value.trim() || "";


  try {

    await updateDoc(
      doc(db, "orders", orderId),
      {
        status,
        tracking,
        city,
        estimatedDelivery
      }
    );


    toast(
      "Commande mise à jour ✅",
      "success"
    );

  } catch (error) {

    console.error(error);

    toast(
      "Impossible de modifier la commande.",
      "error"
    );
  }
}


/* =========================================================
   29. ADMIN PAID
   ========================================================= */

async function markOrderPaid(orderId) {

  if (!isAdmin()) {
    return;
  }


  try {

    await updateDoc(
      doc(db, "orders", orderId),
      {
        paymentStatus: "paid",
        status: "Payée"
      }
    );


    toast(
      "Commande marquée comme payée 💳",
      "success"
    );


    await renderAdminOrders();

  } catch (error) {

    console.error(error);

    toast(
      "Erreur.",
      "error"
    );
  }
}


/* =========================================================
   30. SETTINGS
   ========================================================= */

function applyTheme(theme) {

  if (theme === "auto") {

    const dark =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

    document.documentElement.dataset.theme =
      dark ? "dark" : "light";

    return;
  }

  document.documentElement.dataset.theme =
    theme;
}


function saveTheme(theme) {

  localStorage.setItem(
    "novaTheme",
    theme
  );

  applyTheme(theme);
}


function openSettings() {

  const current =
    localStorage.getItem(
      "novaTheme"
    ) || "dark";


  openModal(`
    <div style="max-width:450px;margin:auto">

      <h2>
        ⚙️ Paramètres
      </h2>

      <label
        style="
          display:block;
          margin-top:20px;
        "
      >
        Thème
      </label>

      <select
        id="theme-select"
        style="
          width:100%;
          padding:13px;
          margin-top:8px;
        "
      >

        <option
          value="dark"
          ${current === "dark" ? "selected" : ""}
        >
          Sombre
        </option>

        <option
          value="light"
          ${current === "light" ? "selected" : ""}
        >
          Clair
        </option>

        <option
          value="auto"
          ${current === "auto" ? "selected" : ""}
        >
          Automatique
        </option>

      </select>

    </div>
  `);


  $("#theme-select")
    ?.addEventListener(
      "change",
      event => {
        saveTheme(
          event.target.value
        );
      }
    );
}


/* =========================================================
   31. SEARCH
   ========================================================= */

function setupSearch() {

  const searchInputs = $$(
    'input[type="search"], [data-search]'
  );


  searchInputs.forEach(input => {

    input.addEventListener(
      "input",
      () => {

        currentSearch =
          input.value;

        renderProducts();

      }
    );


    input.addEventListener(
      "keydown",
      event => {

        if (
          event.key.toLowerCase() ===
          "enter"
        ) {

          const value =
            input.value
              .trim()
              .toUpperCase();

          if (
            value === "NOVA100"
          ) {

            activateNova100(
              value
            );

          }

        }

      }
    );

  });
}


/* =========================================================
   32. CATEGORY BUTTONS
   ========================================================= */

function setupCategories() {

  $$(
    "[data-category]"
  ).forEach(button => {

    button.addEventListener(
      "click",
      () => {

        currentCategory =
          button.dataset.category;

        renderProducts();

      }
    );

  });
}


/* =========================================================
   33. SORT
   ========================================================= */

function setupSort() {

  const selects =
    $$("[data-sort], #sort-select");

  selects.forEach(select => {

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
   34. GLOBAL BUTTONS
   ========================================================= */

function setupGlobalButtons() {

  $$("[data-open-cart]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const cartElement =
            $("#cart");

          if (
            cartElement
          ) {

            cartElement.scrollIntoView({
              behavior: "smooth"
            });

          } else {

            openModal(`
              <div>

                <h2>
                  🛒 Mon panier
                </h2>

                <div
                  id="cart-items"
                  style="margin-top:20px"
                ></div>

                <div
                  style="
                    display:flex;
                    justify-content:space-between;
                    margin-top:20px;
                    font-size:20px;
                  "
                >

                  <strong>
                    Total
                  </strong>

                  <strong
                    id="cart-total"
                  >
                    ${money(cartTotal())}
                  </strong>

                </div>

                <button
                  id="checkout-button"
                  style="
                    width:100%;
                    margin-top:20px;
                    padding:15px;
                    background:#2563eb;
                    color:#fff;
                    border:0;
                    border-radius:12px;
                    font-weight:900;
                  "
                >
                  Passer la commande
                </button>

              </div>
            `);

            renderCart();

            $("#checkout-button")
              ?.addEventListener(
                "click",
                openCheckout
              );
          }

        }
      );

    });


  $$("[data-open-account]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          if (currentUser) {
            openAccountMenu();
          } else {
            openAuth();
          }

        }
      );

    });


  $$("[data-open-settings]")
    .forEach(button => {

      button.addEventListener(
        "click",
        openSettings
      );

    });


  $$("[data-open-admin]")
    .forEach(button => {

      button.addEventListener(
        "click",
        openAdmin
      );

    });


  $$("[data-checkout]")
    .forEach(button => {

      button.addEventListener(
        "click",
        openCheckout
      );

    });

}


/* =========================================================
   35. FIND EXISTING CART BUTTON
   ========================================================= */

function setupExistingCart() {

  const checkoutButtons = $$(
    "#checkout-btn, .checkout-btn, [data-checkout]"
  );

  checkoutButtons.forEach(button => {

    button.addEventListener(
      "click",
      event => {

        event.preventDefault();

        openCheckout();

      }
    );

  });
}


/* =========================================================
   36. ESCAPE
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
   37. AUTH STATE
   ========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;

    if (
      !user ||
      user.email !== ADMIN_EMAIL
    ) {

      sessionStorage.removeItem(
        ADMIN_ACCESS_KEY
      );

      adminMode = false;

    }

    renderAccount();

  }
);


/* =========================================================
   38. THEME INIT
   ========================================================= */

const savedTheme =
  localStorage.getItem(
    "novaTheme"
  ) || "dark";

applyTheme(savedTheme);


/* =========================================================
   39. INIT
   ========================================================= */

function initNovaShop() {

  renderProducts();

  renderCart();

  updateCartBadge();

  setupSearch();

  setupCategories();

  setupSort();

  setupGlobalButtons();

  setupExistingCart();

  renderAccount();

  console.log(
    "NovaShop chargé avec succès 🚀"
  );

  console.log(
    `${products.length} produits disponibles.`
  );

}


/* =========================================================
   40. START
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
   41. PUBLIC API
   ========================================================= */

window.NovaShop = {

  products,

  cart,

  addToCart,

  removeFromCart,

  changeQuantity,

  openProduct,

  openCheckout,

  openAuth,

  openOrders,

  openAdmin,

  openSettings,

  activateNova100,

  getProduct,

  getFilteredProducts

};
