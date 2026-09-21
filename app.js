// ============================================================
// NOVASHOP - APP.JS COMPLET
// Firebase Auth + Firestore
// ============================================================

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

// ============================================================
// FIREBASE
// ============================================================

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

// ============================================================
// CONFIG
// ============================================================

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";

const ADMIN_ACCESS_KEY = "novaAdminAuthorized";
const TEST_CARD_STORAGE_KEY = "novaTestCard";
const CART_STORAGE_KEY = "nova_cart";
const FAVORITES_STORAGE_KEY = "nova_favorites";

// ============================================================
// DOM
// ============================================================

const $ = id => document.getElementById(id);

const productsGrid = $("productsGrid");
const categoriesEl = $("categories");
const searchInput = $("searchInput");
const sortSelect = $("sortSelect");
const productCount = $("productCount");

const cartDrawer = $("cartDrawer");
const cartOverlay = $("cartOverlay");
const cartItemsEl = $("cartItems");
const cartCountEl = $("cartCount");
const cartSubtotalEl = $("cartSubtotal");
const checkoutBtn = $("checkoutBtn");

const modal = $("modal");
const modalTitle = $("modalTitle");
const modalBody = $("modalBody");
const modalClose = $("modalClose");

const accountBtn = $("accountBtn");
const ordersBtn = $("ordersBtn");
const adminBtn = $("adminBtn");
const settingsBtn = $("settingsBtn");

// ============================================================
// PRODUITS
// ============================================================

const products = [

  {
    id:"p1",
    name:"Gigabyte B650 AORUS Elite AX",
    category:"Composants",
    price:189.99,
    image:"https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg",
    rating:4.8
  },

  {
    id:"p2",
    name:"PC Gamer Ryzen 7 7800X3D / RX 9070 XT / 32 Go DDR5",
    category:"PC Gamer",
    price:2237.65,
    image:"",
    rating:4.9
  },

  {
    id:"p3",
    name:"HyperX Cloud II",
    category:"Casques",
    price:49.99,
    image:"",
    rating:4.7
  },

  {
    id:"p4",
    name:"TECORS 60% AZERTY",
    category:"Claviers",
    price:30,
    image:"",
    rating:4.5
  },

  {
    id:"p5",
    name:"Celshading 65% Keyboard",
    category:"Claviers",
    price:120.90,
    image:"",
    rating:4.6
  },

  {
    id:"p6",
    name:"Ajazz AJ199 MAX",
    category:"Souris",
    price:49.99,
    image:"",
    rating:4.7
  },

  {
    id:"p7",
    name:"Logitech G PRO X2 Superstrike",
    category:"Souris",
    price:150.99,
    image:"",
    rating:4.8
  },

  {
    id:"p8",
    name:"Samsung 990 PRO 1TB",
    category:"Stockage",
    price:249.99,
    image:"",
    rating:4.9
  },

  {
    id:"p9",
    name:"Samsung 990 PRO 2TB",
    category:"Stockage",
    price:199.93,
    image:"",
    rating:4.9
  },

  {
    id:"p10",
    name:"Corsair RM1000x",
    category:"Alimentations",
    price:159.90,
    image:"",
    rating:4.8
  },

  {
    id:"p11",
    name:"Corsair RM850x",
    category:"Alimentations",
    price:134.90,
    image:"",
    rating:4.8
  },

  {
    id:"p12",
    name:"Corsair Frame 5000D",
    category:"Boîtiers",
    price:159.90,
    image:"",
    rating:4.7
  },

  {
    id:"p13",
    name:"Arctic Liquid Freezer III Pro 360",
    category:"Refroidissement",
    price:129.90,
    image:"",
    rating:4.8
  },

  {
    id:"p14",
    name:"Samsung 27 QD-OLED Odyssey G6",
    category:"Écrans",
    price:399.95,
    image:"",
    rating:4.9
  },

  {
    id:"p15",
    name:"Elgato Wave Mic Arm Pro",
    category:"Streaming",
    price:229.90,
    image:"",
    rating:4.8
  },

  {
    id:"p16",
    name:"Sony DualSense PS5/PC",
    category:"Manettes",
    price:74.90,
    image:"",
    rating:4.8,
    options:{
      label:"Couleur",
      values:[
        "Rouge",
        "Blanc",
        "Noir",
        "Bleu"
      ]
    }
  },

  {
    id:"p17",
    name:"ASUS TUF B650-PLUS",
    category:"Composants",
    price:179.90,
    image:"",
    rating:4.7
  },

  {
    id:"p18",
    name:"MSI MAG B650 Tomahawk WiFi",
    category:"Composants",
    price:189.90,
    image:"",
    rating:4.8
  },

  {
    id:"p19",
    name:'KOORUI 27" 200Hz',
    category:"Écrans",
    price:74.99,
    image:"",
    rating:4.5
  },

  {
    id:"p20",
    name:'iiyama 23.8" G-Master',
    category:"Écrans",
    price:65.99,
    image:"",
    rating:4.5
  },

  {
    id:"p21",
    name:"SONGMICS Chaise Gaming",
    category:"PC Gamer",
    price:129.99,
    image:"",
    rating:4.5
  },

  {
    id:"p22",
    name:"Dowinx Chaise Gaming",
    category:"PC Gamer",
    price:79.99,
    image:"",
    rating:4.4
  },

  {
    id:"p23",
    name:"GTPLAYER Chaise Gaming",
    category:"PC Gamer",
    price:109.99,
    image:"",
    rating:4.5
  },

  {
    id:"p24",
    name:"Desk Lite",
    category:"PC Gamer",
    price:110.99,
    image:"",
    rating:4.4
  },

  {
    id:"p25",
    name:"EUREKA Gaming Desk",
    category:"PC Gamer",
    price:86.99,
    image:"",
    rating:4.5
  },

  {
    id:"p26",
    name:"HOMCOM Corner Desk",
    category:"PC Gamer",
    price:44.99,
    image:"",
    rating:4.3
  },

  {
    id:"p27",
    name:"Logitech G Pro X 2 Lightspeed",
    category:"Casques",
    price:99.99,
    image:"",
    rating:4.7
  },

  {
    id:"p28",
    name:"Razer BlackShark V2 Pro",
    category:"Casques",
    price:75.99,
    image:"",
    rating:4.7
  },

  {
    id:"p29",
    name:"beyerdynamic DT-990 Pro",
    category:"Casques",
    price:60.99,
    image:"",
    rating:4.8
  },

  {
    id:"p30",
    name:"Logitech PRO X TKL Rapid",
    category:"Claviers",
    price:78.99,
    image:"",
    rating:4.7
  },

  {
    id:"p31",
    name:"QwertyKey75 HE Striker",
    category:"Claviers",
    price:56.99,
    image:"",
    rating:4.6
  },

  {
    id:"p32",
    name:"GravaStar Mercury K1",
    category:"Claviers",
    price:91.99,
    image:"",
    rating:4.7
  },

  {
    id:"p33",
    name:"ATTACK SHARK R11 Ultra",
    category:"Souris",
    price:26.99,
    image:"",
    rating:4.5
  },

  {
    id:"p34",
    name:"HyperX QuadCast 2",
    category:"Streaming",
    price:98.99,
    image:"",
    rating:4.8
  },

  {
    id:"p35",
    name:"Shure SM7 dB",
    category:"Streaming",
    price:121.99,
    image:"",
    rating:4.8
  },

  {
    id:"p36",
    name:"Razer Seiren V3 Chroma",
    category:"Streaming",
    price:13.99,
    image:"",
    rating:4.5
  },

  {
    id:"p37",
    name:"Stairville LED Pixel Rail",
    category:"Streaming",
    price:18.90,
    image:"",
    rating:4.3
  },

  {
    id:"p38",
    name:"Govee LED Strip",
    category:"Streaming",
    price:8,
    image:"",
    rating:4.5
  },

  {
    id:"p39",
    name:"Hexagon Ceiling Lamp",
    category:"Streaming",
    price:91.10,
    image:"",
    rating:4.5
  },

  {
    id:"p40",
    name:"Gigabyte RTX 5050",
    category:"Composants",
    price:147,
    image:"",
    rating:4.5
  },

  {
    id:"p41",
    name:"MSI RTX 3050 LP",
    category:"Composants",
    price:100,
    image:"",
    rating:4.4
  },

  {
    id:"p42",
    name:"ASUS RX 7600",
    category:"Composants",
    price:140,
    image:"",
    rating:4.6
  },

  {
    id:"p43",
    name:"PC Gamer Ryzen 7 5700G",
    category:"PC Gamer",
    price:650,
    image:"",
    rating:4.6
  },

  {
    id:"p44",
    name:"iPhone 14 Pro",
    category:"Smartphones",
    price:400,
    image:"",
    rating:4.6
  },

  {
    id:"p45",
    name:"iPhone 15",
    category:"Smartphones",
    price:750,
    image:"",
    rating:4.7
  },

  {
    id:"p46",
    name:"iPhone 16",
    category:"Smartphones",
    price:949.99,
    image:"",
    rating:4.8
  },

  {
    id:"p47",
    name:"iPhone 17",
    category:"Smartphones",
    price:1000,
    image:"",
    rating:4.8
  },

  {
    id:"p48",
    name:"iPhone 18 Pro",
    category:"Smartphones",
    price:1199.99,
    image:"",
    rating:4.9
  },

  {
    id:"p49",
    name:"Samsung Galaxy S23",
    category:"Smartphones",
    price:230,
    image:"",
    rating:4.6
  },

  {
    id:"p50",
    name:"Samsung Galaxy S24",
    category:"Smartphones",
    price:449.90,
    image:"",
    rating:4.7
  },

  {
    id:"p51",
    name:"Samsung Galaxy S25 Edge",
    category:"Smartphones",
    price:469.99,
    image:"",
    rating:4.7
  },

  {
    id:"p52",
    name:"Samsung Galaxy S26 + Buds4",
    category:"Smartphones",
    price:650.99,
    image:"",
    rating:4.8
  },

  {
    id:"p53",
    name:"Pixel 8",
    category:"Smartphones",
    price:200,
    image:"",
    rating:4.5
  },

  {
    id:"p54",
    name:"Pixel 9",
    category:"Smartphones",
    price:400,
    image:"",
    rating:4.6
  },

  {
    id:"p55",
    name:"Pixel 10",
    category:"Smartphones",
    price:600,
    image:"",
    rating:4.7
  },

  {
    id:"p56",
    name:"Flashforge Adventurer 5M Pro",
    category:"Impression 3D",
    price:115,
    image:"",
    rating:4.6
  },

  {
    id:"p57",
    name:"Elegoo Centauri 2",
    category:"Impression 3D",
    price:200,
    image:"",
    rating:4.6
  },

  {
    id:"p58",
    name:"Anycubic Photon P1 Max",
    category:"Impression 3D",
    price:600,
    image:"",
    rating:4.6
  },

  {
    id:"p59",
    name:"GTA VI Key PlayStation",
    category:"Jeux",
    price:0,
    image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ9VsG_IxAanmrCSqCyACtuyCqCD5rwiQ3P3Iylexch3XnCT4sevDBCz-vnqlVCBvZroOpYIX9T0Flc8EzGSZuyPMibCcQm",
    rating:4.8
  },

  {
    id:"p60",
    name:"Microsoft Windows 11 Pro Key",
    category:"Logiciels",
    price:0,
    image:"https://imgproxy.eneba.games/0A9PW8DP7_YSTA-WUru4IVJnFXsKikaoYM5RHNb3nHQ/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy93/YUFhcnZibFhzSm8y/NjZSZ3hKSVpuYjVX/ZzRkVWY3a3YyUDQx/bm1nakJjLnBuZw",
    rating:4.7
  },

  {
    id:"p61",
    name:"AsiaHorse Cable Extensions",
    category:"Câbles",
    price:15.99,
    image:"",
    rating:4.5
  },

  {
    id:"p62",
    name:"Accsup HDMI",
    category:"Câbles",
    price:12.99,
    image:"",
    rating:4.5
  },

  {
    id:"p63",
    name:"DisplayPort Cable",
    category:"Câbles",
    price:3.99,
    image:"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRm_giprPsrHS9tHCl8S1HvZZH2NBMjueiKEcKFI5Uk-c2ZJth2HlBIPsYV76hrKG3FGKWtGqn4i8-PUJRvz4iGcnrratMemE77bQ34ngW1fNk6odqDbjjJ",
    rating:4.5
  },

  {
    id:"p64",
    name:"USB-C vers USB-C",
    category:"Câbles",
    price:1,
    image:"",
    rating:4.3
  },

  {
    id:"p65",
    name:"USB-C vers USB-A",
    category:"Câbles",
    price:1,
    image:"",
    rating:4.3
  },

  {
    id:"p66",
    name:"USB-C vers Lightning",
    category:"Câbles",
    price:1,
    image:"",
    rating:4.3
  },

  {
    id:"p67",
    name:"Apple Watch Charger",
    category:"Câbles",
    price:2.99,
    image:"",
    rating:4.4
  },

  {
    id:"p68",
    name:"StarTech PC Power Cord",
    category:"Câbles",
    price:4.50,
    image:"",
    rating:4.4
  },

  {
    id:"p69",
    name:"Unicavu Webcam",
    category:"Streaming",
    price:10,
    image:"",
    rating:4.3
  },

  {
    id:"p70",
    name:"eMeet Nova 4K Webcam",
    category:"Streaming",
    price:23.99,
    image:"",
    rating:4.5
  },

  {
    id:"p71",
    name:"Quntis Monitor Light Bar",
    category:"Streaming",
    price:8.99,
    image:"",
    rating:4.4
  },

  {
    id:"p72",
    name:"TONOR TD510+",
    category:"Streaming",
    price:20.99,
    image:"",
    rating:4.4
  },

  {
    id:"p73",
    name:"BONTEC Gas Spring 13-32",
    category:"Supports",
    price:16,
    image:"",
    rating:4.4
  },

  {
    id:"p74",
    name:"BONTEC Support 2 Moniteurs",
    category:"Supports",
    price:24,
    image:"https://m.media-amazon.com/images/I/71kZjwcU4SL._AC_SL1500_.jpg",
    rating:4.5
  },

  {
    id:"p75",
    name:"BONTEC Support Mural",
    category:"Supports",
    price:16,
    image:"https://m.media-amazon.com/images/I/71-oseIdQXL._AC_SL1500_.jpg",
    rating:4.4
  },

  {
    id:"p76",
    name:'KTC 24" 240Hz',
    category:"Écrans",
    price:80,
    image:"",
    rating:4.6
  },

  {
    id:"p77",
    name:'KTC 27" QHD 180Hz',
    category:"Écrans",
    price:110,
    image:"",
    rating:4.7
  },

  {
    id:"p78",
    name:'HKC 34" UWQHD 120Hz',
    category:"Écrans",
    price:170,
    image:"",
    rating:4.6
  },

  {
    id:"p79",
    name:'HKC 27" 4K Dual Mode',
    category:"Écrans",
    price:140,
    image:"",
    rating:4.6
  },

  {
    id:"p80",
    name:'Xiaomi TV F 65"',
    category:"Écrans",
    price:249.99,
    image:"",
    rating:4.6
  },

  {
    id:"p81",
    name:"Xbox Manette sans fil",
    category:"Manettes",
    price:59.99,
    image:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT8EvMRtXOuLmrhtm_S4Bwd886onZ8JYKcXZo1gWIvW8RHk8w-rz7ReiA7I9IKK6ZgFhMNTT1dR69dUj4BGJCwe2z_cVJAES9jG5er_Lfq_gaaEHwVbz2v0",
    rating:4.7,
    options:{
      label:"Couleur",
      values:[
        "Rose",
        "Bleu",
        "Noir",
        "Rouge",
        "Blanc",
        "Vert"
      ]
    }
  },

  {
    id:"p82",
    name:"PlayStation 5",
    category:"Consoles",
    price:320,
    image:"",
    rating:4.8,
    options:{
      label:"Console",
      values:[
        "PS5 avec lecteur",
        "PS5 Pro"
      ]
    }
  },

  {
    id:"p83",
    name:"Xbox Series X",
    category:"Consoles",
    price:599.99,
    image:"",
    rating:4.8
  },

  {
    id:"p84",
    name:"Xbox Series S",
    category:"Consoles",
    price:500,
    image:"",
    rating:4.7
  }

];

// ============================================================
// ÉTAT
// ============================================================

let currentUser = null;

let cart = [];

let favorites = [];

let state = {
  search:"",
  category:"Tous",
  sort:"default",
  page:1,
  perPage:12
};

const reviewsCache = {};

// ============================================================
// STOCKAGE
// ============================================================

function loadCart() {

  try {

    const raw =
      localStorage.getItem(
        CART_STORAGE_KEY
      );

    const parsed =
      raw
        ? JSON.parse(raw)
        : [];

    cart =
      Array.isArray(parsed)
        ? parsed
        : [];

  } catch {

    cart = [];

  }

}

function saveCart() {

  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(cart)
  );

}

function loadFavorites() {

  try {

    const raw =
      localStorage.getItem(
        FAVORITES_STORAGE_KEY
      );

    const parsed =
      raw
        ? JSON.parse(raw)
        : [];

    favorites =
      Array.isArray(parsed)
        ? parsed
        : [];

  } catch {

    favorites = [];

  }

}

function saveFavorites() {

  localStorage.setItem(
    FAVORITES_STORAGE_KEY,
    JSON.stringify(favorites)
  );

}

loadCart();
loadFavorites();

// ============================================================
// UTILITAIRES
// ============================================================

function money(value) {

  return Number(value || 0).toLocaleString(
    "fr-FR",
    {
      style:"currency",
      currency:"EUR"
    }
  );

}

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");

}

function escapeAttr(value) {

  return escapeHTML(value);

}

function getProduct(id) {

  return products.find(
    product => product.id === id
  );

}

function getCartCount() {

  return cart.reduce(
    (total,item) =>
      total + Number(item.quantity || 0),
    0
  );

}

function getCartSubtotal() {

  return cart.reduce(
    (total,item) => {

      const product =
        getProduct(item.id);

      return total +
        Number(product?.price || 0) *
        Number(item.quantity || 0);

    },
    0
  );

}

function toast(message,type="info") {

  let container =
    $("toastContainer");

  if (!container) {

    container =
      document.createElement("div");

    container.id =
      "toastContainer";

    container.style.cssText =
      "position:fixed;right:20px;bottom:20px;z-index:99999;display:flex;flex-direction:column;gap:10px;";

    document.body.appendChild(
      container
    );

  }

  const item =
    document.createElement("div");

  item.textContent =
    message;

  item.style.cssText =
    `
      padding:13px 16px;
      border-radius:12px;
      background:${
        type === "error"
          ? "#6b2020"
          : "#132238"
      };
      color:#fff;
      box-shadow:0 10px 30px rgba(0,0,0,.3);
      max-width:360px;
    `;

  container.appendChild(item);

  setTimeout(
    () => item.remove(),
    3500
  );

}

// ============================================================
// OPTIONS PRODUITS
// ============================================================

function hasRequiredOption(product) {

  return !!(
    product?.options?.values?.length
  );

}

function getCartProductName(
  product,
  option
) {

  if (!product) {
    return "Produit";
  }

  return option
    ? `${product.name} (${option})`
    : product.name;

}

function findCartItem(
  id,
  option=""
) {

  return cart.find(
    item =>
      item.id === id &&
      (item.option || "") ===
      (option || "")
  );

}

function showProductOptions(
  product,
  containerId="productOptions"
) {

  if (!hasRequiredOption(product)) {
    return "";
  }

  return `
    <div
      id="${escapeAttr(containerId)}"
      style="
        margin-top:16px;
      "
    >

      <label>
        ${escapeHTML(
          product.options.label
        )}
      </label>

      <div style="
        display:flex;
        gap:8px;
        flex-wrap:wrap;
        margin-top:9px;
      ">

        ${product.options.values.map(
          (value,index) => `
            <button
              type="button"
              class="view-btn product-option"
              data-option="${escapeAttr(value)}"
              style="
                flex:0 0 auto;
              "
            >
              ${escapeHTML(value)}
            </button>
          `
        ).join("")}

      </div>

      <input
        type="hidden"
        id="${escapeAttr(containerId)}Value"
        value=""
      >

    </div>
  `;

}

function setupProductOptions(
  containerId="productOptions"
) {

  const container =
    $(containerId);

  if (!container) {
    return;
  }

  const buttons =
    container.querySelectorAll(
      ".product-option"
    );

  buttons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        buttons.forEach(
          item =>
            item.classList.remove(
              "selected"
            )
        );

        button.classList.add(
          "selected"
        );

        const input =
          $(`${containerId}Value`);

        if (input) {

          input.value =
            button.dataset.option || "";

        }

      }
    );

  });

}

function getSelectedProductOption(
  containerId="productOptions"
) {

  return (
    $(`${containerId}Value`)
      ?.value || ""
  );

}

// ============================================================
// PANIER
// ============================================================

function addToCart(
  id,
  option=""
) {

  const product =
    getProduct(id);

  if (!product) {

    toast(
      "Produit introuvable.",
      "error"
    );

    return;

  }

  if (
    hasRequiredOption(product) &&
    !option
  ) {

    toast(
      `Choisis ${product.options.label.toLowerCase()}.`,
      "error"
    );

    return;

  }

  if (
    Number(product.price || 0) <= 0
  ) {

    toast(
      "Le prix de ce produit n'est pas encore défini.",
      "error"
    );

    return;

  }

  const existing =
    findCartItem(
      id,
      option
    );

  if (existing) {

    existing.quantity =
      Number(existing.quantity || 0) + 1;

  } else {

    cart.push({
      id,
      option:option || "",
      quantity:1
    });

  }

  saveCart();
  renderCart();

  toast(
    `${getCartProductName(product,option)} ajouté au panier 🛒`,
    "success"
  );

}

function removeFromCart(
  id,
  option=""
) {

  cart =
    cart.filter(
      item =>
        !(
          item.id === id &&
          (item.option || "") ===
          (option || "")
        )
    );

  saveCart();
  renderCart();

}

function changeCartQuantity(
  id,
  quantity,
  option=""
) {

  const item =
    findCartItem(
      id,
      option
    );

  if (!item) {
    return;
  }

  item.quantity =
    Math.max(
      1,
      Number(quantity || 1)
    );

  saveCart();
  renderCart();

}

function openCart() {

  cartDrawer?.classList.add(
    "open"
  );

  cartOverlay?.classList.add(
    "open"
  );

  document.body.style.overflow =
    "hidden";

}

function closeCart() {

  cartDrawer?.classList.remove(
    "open"
  );

  cartOverlay?.classList.remove(
    "open"
  );

  document.body.style.overflow =
    "";

}

cartOverlay?.addEventListener(
  "click",
  closeCart
);

// ============================================================
// MODAL
// ============================================================

function showModal(
  title,
  body
) {

  if (!modal) {
    return;
  }

  if (modalTitle) {
    modalTitle.textContent =
      title;
  }

  if (modalBody) {
    modalBody.innerHTML =
      body;
  }

  modal.style.display =
    "flex";

  document.body.style.overflow =
    "hidden";

}

function closeModal() {

  if (modal) {
    modal.style.display =
      "none";
  }

  document.body.style.overflow =
    "";

}

modalClose?.addEventListener(
  "click",
  closeModal
);

// ============================================================
// CATÉGORIES
// ============================================================

function renderCategories() {

  if (!categoriesEl) {
    return;
  }

  const categories = [
    "Tous",
    ...new Set(
      products.map(
        product => product.category
      )
    )
  ];

  categoriesEl.innerHTML =
    categories.map(
      category => `
        <button
          type="button"
          class="${
            state.category === category
              ? "active"
              : ""
          }"
          data-category="${escapeAttr(category)}"
        >
          ${escapeHTML(category)}
        </button>
      `
    ).join("");

  categoriesEl
    .querySelectorAll(
      "[data-category]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          state.category =
            button.dataset.category ||
            "Tous";

          state.page = 1;

          renderCategories();
          renderProducts();

        }
      );

    });

}

// ============================================================
// FILTRES
// ============================================================

function getFilteredProducts() {

  let result =
    [...products];

  const search =
    state.search
      .trim()
      .toLowerCase();

  if (search) {

    result =
      result.filter(
        product =>
          product.name
            .toLowerCase()
            .includes(search) ||
          product.category
            .toLowerCase()
            .includes(search)
      );

  }

  if (
    state.category !== "Tous"
  ) {

    result =
      result.filter(
        product =>
          product.category ===
          state.category
      );

  }

  if (
    state.sort === "priceAsc"
  ) {

    result.sort(
      (a,b) =>
        Number(a.price || 0) -
        Number(b.price || 0)
    );

  } else if (
    state.sort === "priceDesc"
  ) {

    result.sort(
      (a,b) =>
        Number(b.price || 0) -
        Number(a.price || 0)
    );

  } else if (
    state.sort === "name"
  ) {

    result.sort(
      (a,b) =>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );

  } else if (
    state.sort === "rating"
  ) {

    result.sort(
      (a,b) =>
        Number(b.rating || 0) -
        Number(a.rating || 0)
    );

  }

  return result;

}

// ============================================================
// RENDU PRODUITS
// ============================================================

function renderProducts() {

  if (!productsGrid) {
    return;
  }

  const filtered =
    getFilteredProducts();

  const start =
    (state.page - 1) *
    state.perPage;

  const visible =
    filtered.slice(
      start,
      start + state.perPage
    );

  if (productCount) {

    productCount.textContent =
      `${filtered.length} produit${
        filtered.length > 1
          ? "s"
          : ""
      }`;

  }

  if (!visible.length) {

    productsGrid.innerHTML = `
      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:50px 20px;
        opacity:.7;
      ">
        Aucun produit trouvé.
      </div>
    `;

    return;

  }

  productsGrid.innerHTML =
    visible.map(
      product => {

        const imageHTML =
          product.image
            ? `
              <img
                src="${escapeAttr(product.image)}"
                alt="${escapeAttr(product.name)}"
                loading="lazy"
                onerror="this.style.display='none'"
              >
            `
            : "";

        const priceHTML =
          Number(product.price || 0) > 0
            ? money(product.price)
            : "Prix à définir";

        return `
          <article
            class="product-card"
            data-id="${escapeAttr(product.id)}"
          >

            <div class="product-image">
              ${imageHTML}
            </div>

            <div class="product-info">

              <div class="product-category">
                ${escapeHTML(product.category)}
              </div>

              <h3>
                ${escapeHTML(product.name)}
              </h3>

              <div class="product-rating">
                ⭐ ${Number(product.rating || 5).toFixed(1)}
              </div>

              <div class="product-bottom">

                <strong class="product-price">
                  ${priceHTML}
                </strong>

                <button
                  type="button"
                  class="add-btn"
                  data-add-id="${escapeAttr(product.id)}"
                >
                  Ajouter
                </button>

              </div>

              <button
                type="button"
                class="view-btn"
                data-view-id="${escapeAttr(product.id)}"
                style="width:100%;margin-top:8px;"
              >
                Voir le produit
              </button>

            </div>

          </article>
        `;

      }
    ).join("");

  productsGrid
    .querySelectorAll(
      "[data-add-id]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          const product =
            getProduct(
              button.dataset.addId
            );

          if (!product) {
            return;
          }

          if (
            hasRequiredOption(product)
          ) {

            openProduct(product.id);

            return;

          }

          addToCart(
            product.id
          );

        }
      );

    });

  productsGrid
    .querySelectorAll(
      "[data-view-id]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () =>
          openProduct(
            button.dataset.viewId
          )
      );

    });

}

searchInput?.addEventListener(
  "input",
  () => {

    state.search =
      searchInput.value || "";

    state.page = 1;

    renderProducts();

  }
);

sortSelect?.addEventListener(
  "change",
  () => {

    state.sort =
      sortSelect.value || "default";

    state.page = 1;

    renderProducts();

  }
);

// ============================================================
// RENDU PANIER
// ============================================================

function renderCart() {

  if (cartCountEl) {

    cartCountEl.textContent =
      String(
        getCartCount()
      );

  }

  if (cartSubtotalEl) {

    cartSubtotalEl.textContent =
      money(
        getCartSubtotal()
      );

  }

  if (!cartItemsEl) {
    return;
  }

  if (!cart.length) {

    cartItemsEl.innerHTML = `
      <div style="
        text-align:center;
        padding:35px 15px;
        opacity:.7;
      ">
        <div style="
          font-size:45px;
          margin-bottom:10px;
        ">
          🛒
        </div>

        Ton panier est vide.
      </div>
    `;

    return;

  }

  cartItemsEl.innerHTML =
    cart.map(
      item => {

        const product =
          getProduct(item.id);

        if (!product) {
          return "";
        }

        const imageHTML =
          product.image
            ? `
              <img
                src="${escapeAttr(product.image)}"
                alt="${escapeAttr(product.name)}"
                onerror="this.style.display='none'"
              >
            `
            : "";

        const name =
          getCartProductName(
            product,
            item.option
          );

        const quantity =
          Number(
            item.quantity || 1
          );

        return `
          <div
            class="cart-item"
            style="
              display:flex;
              gap:12px;
              padding:12px 0;
              border-bottom:1px solid rgba(255,255,255,.08);
            "
          >

            <div style="
              width:70px;
              height:70px;
              flex:0 0 70px;
              overflow:hidden;
              border-radius:10px;
            ">
              ${imageHTML}
            </div>

            <div style="
              flex:1;
              min-width:0;
            ">

              <strong>
                ${escapeHTML(name)}
              </strong>

              <div style="
                margin-top:5px;
                opacity:.8;
              ">
                ${money(product.price)}
              </div>

              <div style="
                display:flex;
                align-items:center;
                gap:8px;
                margin-top:9px;
              ">

                <button
                  type="button"
                  class="view-btn"
                  data-cart-minus-id="${escapeAttr(item.id)}"
                  data-cart-option="${escapeAttr(item.option || "")}"
                >
                  −
                </button>

                <strong>
                  ${quantity}
                </strong>

                <button
                  type="button"
                  class="view-btn"
                  data-cart-plus-id="${escapeAttr(item.id)}"
                  data-cart-option="${escapeAttr(item.option || "")}"
                >
                  +
                </button>

                <button
                  type="button"
                  class="view-btn"
                  data-cart-remove-id="${escapeAttr(item.id)}"
                  data-cart-option="${escapeAttr(item.option || "")}"
                  style="margin-left:auto;color:#ff7777;"
                >
                  🗑️
                </button>

              </div>

            </div>

          </div>
        `;

      }
    ).join("");

  cartItemsEl
    .querySelectorAll(
      "[data-cart-minus-id]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.cartMinusId;

          const option =
            button.dataset.cartOption || "";

          const item =
            findCartItem(
              id,
              option
            );

          if (!item) {
            return;
          }

          if (
            Number(item.quantity || 1) <= 1
          ) {

            removeFromCart(
              id,
              option
            );

          } else {

            changeCartQuantity(
              id,
              Number(item.quantity) - 1,
              option
            );

          }

        }
      );

    });

  cartItemsEl
    .querySelectorAll(
      "[data-cart-plus-id]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.cartPlusId;

          const option =
            button.dataset.cartOption || "";

          const item =
            findCartItem(
              id,
              option
            );

          if (!item) {
            return;
          }

          changeCartQuantity(
            id,
            Number(item.quantity || 1) + 1,
            option
          );

        }
      );

    });

  cartItemsEl
    .querySelectorAll(
      "[data-cart-remove-id]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          removeFromCart(
            button.dataset.cartRemoveId,
            button.dataset.cartOption || ""
          );

        }
      );

    });

}

// ============================================================
// PRODUIT
// ============================================================

function openProduct(id) {

  const product =
    getProduct(id);

  if (!product) {
    return;
  }

  const imageHTML =
    product.image
      ? `
        <img
          src="${escapeAttr(product.image)}"
          alt="${escapeAttr(product.name)}"
          style="
            width:100%;
            max-height:320px;
            object-fit:contain;
            border-radius:16px;
          "
          onerror="this.style.display='none'"
        >
      `
      : "";

  const priceHTML =
    Number(product.price || 0) > 0
      ? money(product.price)
      : "Prix à définir";

  showModal(
    product.name,
    `
      <div>

        <div style="
          min-height:120px;
          display:flex;
          align-items:center;
          justify-content:center;
          margin-bottom:16px;
        ">
          ${imageHTML}
        </div>

        <div style="
          opacity:.7;
          margin-bottom:7px;
        ">
          ${escapeHTML(product.category)}
        </div>

        <div style="
          color:#ffd45a;
          margin-bottom:10px;
        ">
          ⭐ ${Number(product.rating || 5).toFixed(1)}
        </div>

        <div style="
          font-size:28px;
          font-weight:800;
          margin-bottom:12px;
        ">
          ${priceHTML}
        </div>

        ${
          showProductOptions(product)
        }

        <button
          type="button"
          class="add-btn"
          id="modalAddToCart"
          style="
            width:100%;
            margin-top:18px;
          "
        >
          🛒 Ajouter au panier
        </button>

        <button
          type="button"
          class="view-btn"
          id="modalReviews"
          style="
            width:100%;
            margin-top:9px;
          "
        >
          ⭐ Voir les avis
        </button>

      </div>
    `
  );

  setupProductOptions();

  $("modalAddToCart")
    ?.addEventListener(
      "click",
      () => {

        const option =
          getSelectedProductOption();

        if (
          hasRequiredOption(product) &&
          !option
        ) {

          toast(
            `Choisis ${product.options.label.toLowerCase()}.`,
            "error"
          );

          return;

        }

        if (
          Number(product.price || 0) <= 0
        ) {

          toast(
            "Le prix de ce produit n'est pas encore défini.",
            "error"
          );

          return;

        }

        addToCart(
          product.id,
          option
        );

        closeModal();

      }
    );

  $("modalReviews")
    ?.addEventListener(
      "click",
      () =>
        openProductReviews(
          product.id
        )
    );

}

// ============================================================
// AVIS
// ============================================================

async function openProductReviews(
  productId
) {

  const product =
    getProduct(productId);

  if (!product) {
    return;
  }

  showModal(
    `Avis - ${product.name}`,
    `
      <div
        id="reviewsLoading"
        style="
          text-align:center;
          padding:25px;
        "
      >
        Chargement des avis...
      </div>

      <div id="reviewsList"></div>
    `
  );

  try {

    let reviews =
      reviewsCache[productId];

    if (!reviews) {

      const reviewsQuery =
        query(
          collection(
            db,
            "reviews"
          ),
          where(
            "productId",
            "==",
            productId
          )
        );

      const snapshot =
        await getDocs(
          reviewsQuery
        );

      reviews = [];

      snapshot.forEach(
        item => {

          reviews.push({
            id:item.id,
            ...item.data()
          });

        }
      );

    }

    reviewsCache[productId] =
      reviews;

    $("reviewsLoading")?.remove();

    const list =
      $("reviewsList");

    if (!list) {
      return;
    }

    if (!reviews.length) {

      list.innerHTML = `
        <div style="
          text-align:center;
          padding:25px;
          opacity:.7;
        ">
          ⭐ Aucun avis détaillé pour le moment.
        </div>
      `;

      return;

    }

    list.innerHTML =
      reviews.map(review => {

        const rating =
          Math.max(
            1,
            Math.min(
              5,
              Number(
                review.rating || 5
              )
            )
          );

        const stars =
          "★".repeat(
            Math.round(rating)
          ) +
          "☆".repeat(
            5 -
            Math.round(rating)
          );

        return `
          <div style="
            padding:14px 0;
            border-bottom:1px solid rgba(255,255,255,.08);
          ">

            <div style="
              color:#ffd45a;
              font-size:18px;
            ">
              ${stars}
            </div>

            <strong>
              ${escapeHTML(
                review.userName ||
                "Client"
              )}
            </strong>

            <p style="
              margin-top:7px;
              opacity:.85;
            ">
              ${escapeHTML(
                review.text || ""
              )}
            </p>

          </div>
        `;

      }).join("");

  } catch (error) {

    console.error(error);

    $("reviewsLoading")?.remove();

    const list =
      $("reviewsList");

    if (list) {

      list.innerHTML = `
        <div style="
          color:#ff7777;
          padding:20px;
        ">
          Impossible de charger les avis.
        </div>
      `;

    }

  }

}// ============================================================
// AUTH
// ============================================================

function authError(error) {

  const code =
    error?.code || "";

  const messages = {

    "auth/invalid-credential":
      "E-mail ou mot de passe incorrect.",

    "auth/invalid-email":
      "Adresse e-mail invalide.",

    "auth/email-already-in-use":
      "Cette adresse e-mail est déjà utilisée.",

    "auth/weak-password":
      "Le mot de passe doit contenir au moins 6 caractères.",

    "auth/user-not-found":
      "Aucun compte trouvé avec cette adresse.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard.",

    "auth/network-request-failed":
      "Erreur réseau."

  };

  return (
    messages[code] ||
    error?.message ||
    "Une erreur est survenue."
  );

}

function showLoginForm() {

  showModal(
    "Connexion",
    `
      <form id="loginForm">

        <label for="loginEmail">
          Adresse e-mail
        </label>

        <input
          id="loginEmail"
          type="email"
          autocomplete="email"
          required
          placeholder="ton@email.com"
        >

        <label
          for="loginPassword"
          style="margin-top:14px"
        >
          Mot de passe
        </label>

        <input
          id="loginPassword"
          type="password"
          autocomplete="current-password"
          required
          placeholder="Ton mot de passe"
        >

        <div
          id="loginError"
          style="
            display:none;
            margin-top:12px;
            color:#ff7777;
          "
        ></div>

        <button
          type="submit"
          class="add-btn"
          id="loginSubmit"
          style="
            width:100%;
            margin-top:16px;
          "
        >
          Se connecter
        </button>

        <button
          type="button"
          class="view-btn"
          id="goRegister"
          style="
            width:100%;
            margin-top:10px;
          "
        >
          Créer un compte
        </button>

      </form>
    `
  );

  $("loginForm")
    ?.addEventListener(
      "submit",
      async event => {

        event.preventDefault();

        const email =
          $("loginEmail")
            ?.value.trim() || "";

        const password =
          $("loginPassword")
            ?.value || "";

        const errorBox =
          $("loginError");

        const submit =
          $("loginSubmit");

        if (submit) {

          submit.disabled = true;
          submit.textContent =
            "Connexion...";

        }

        try {

          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          closeModal();

          toast(
            "Connexion réussie 👋",
            "success"
          );

        } catch (error) {

          console.error(error);

          if (errorBox) {

            errorBox.textContent =
              authError(error);

            errorBox.style.display =
              "block";

          }

        } finally {

          if (submit) {

            submit.disabled = false;
            submit.textContent =
              "Se connecter";

          }

        }

      }
    );

  $("goRegister")
    ?.addEventListener(
      "click",
      showRegisterForm
    );

}

// ============================================================
// INSCRIPTION
// ============================================================

function showRegisterForm() {

  showModal(
    "Créer un compte",
    `
      <form id="registerForm">

        <label for="registerEmail">
          Adresse e-mail
        </label>

        <input
          id="registerEmail"
          type="email"
          required
          placeholder="ton@email.com"
        >

        <label
          for="registerPassword"
          style="margin-top:14px"
        >
          Mot de passe
        </label>

        <input
          id="registerPassword"
          type="password"
          minlength="6"
          required
          placeholder="Minimum 6 caractères"
        >

        <label
          for="registerPassword2"
          style="margin-top:14px"
        >
          Confirmer le mot de passe
        </label>

        <input
          id="registerPassword2"
          type="password"
          minlength="6"
          required
          placeholder="Retape ton mot de passe"
        >

        <div
          id="registerError"
          style="
            display:none;
            margin-top:12px;
            color:#ff7777;
          "
        ></div>

        <button
          type="submit"
          class="add-btn"
          id="registerSubmit"
          style="
            width:100%;
            margin-top:16px;
          "
        >
          Créer mon compte
        </button>

        <button
          type="button"
          class="view-btn"
          id="goLogin"
          style="
            width:100%;
            margin-top:10px;
          "
        >
          J'ai déjà un compte
        </button>

      </form>
    `
  );

  $("registerForm")
    ?.addEventListener(
      "submit",
      async event => {

        event.preventDefault();

        const email =
          $("registerEmail")
            ?.value.trim() || "";

        const password =
          $("registerPassword")
            ?.value || "";

        const password2 =
          $("registerPassword2")
            ?.value || "";

        const errorBox =
          $("registerError");

        if (password !== password2) {

          if (errorBox) {

            errorBox.textContent =
              "Les deux mots de passe sont différents.";

            errorBox.style.display =
              "block";

          }

          return;

        }

        const submit =
          $("registerSubmit");

        if (submit) {

          submit.disabled = true;
          submit.textContent =
            "Création...";

        }

        try {

          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          closeModal();

          toast(
            "Compte créé avec succès 🎉",
            "success"
          );

        } catch (error) {

          console.error(error);

          if (errorBox) {

            errorBox.textContent =
              authError(error);

            errorBox.style.display =
              "block";

          }

        } finally {

          if (submit) {

            submit.disabled = false;
            submit.textContent =
              "Créer mon compte";

          }

        }

      }
    );

  $("goLogin")
    ?.addEventListener(
      "click",
      showLoginForm
    );

}

accountBtn?.addEventListener(
  "click",
  openAccount
);

// ============================================================
// ÉTAT AUTH
// ============================================================

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;

    if (accountBtn) {

      if (user) {

        const email =
          user.email || "";

        const username =
          email.split("@")[0] ||
          "Compte";

        accountBtn.textContent =
          `👤 ${username}`;

      } else {

        accountBtn.textContent =
          "👤 Compte";

      }

    }

    if (adminBtn) {

      const isAdmin =
        !!user &&
        (
          user.email || ""
        ).toLowerCase() ===
        ADMIN_EMAIL.toLowerCase();

      adminBtn.style.display =
        isAdmin
          ? ""
          : "none";

    }

  }
);

// ============================================================
// COMPTE
// ============================================================

function openAccount() {

  if (!currentUser) {

    showLoginForm();

    return;
  }

  showModal(
    "Mon compte",
    `
      <div>

        <div style="
          padding:16px;
          border-radius:15px;
          background:rgba(80,120,255,.08);
          margin-bottom:15px;
        ">

          <strong>
            👤 Compte connecté
          </strong>

          <p style="
            margin-top:7px;
            opacity:.8;
          ">
            ${escapeHTML(
              currentUser.email || ""
            )}
          </p>

        </div>

        <button
          type="button"
          class="add-btn"
          id="accountOrders"
          style="
            width:100%;
            margin-bottom:8px;
          "
        >
          📦 Mes commandes
        </button>

        <button
          type="button"
          class="view-btn"
          id="accountLogout"
          style="width:100%;"
        >
          🚪 Se déconnecter
        </button>

      </div>
    `
  );

  $("accountOrders")
    ?.addEventListener(
      "click",
      openOrders
    );

  $("accountLogout")
    ?.addEventListener(
      "click",
      async () => {

        try {

          await signOut(auth);

          closeModal();

          toast(
            "Déconnexion réussie.",
            "success"
          );

        } catch (error) {

          toast(
            authError(error),
            "error"
          );

        }

      }
    );

}

// ============================================================
// COMMANDES
// ============================================================

ordersBtn?.addEventListener(
  "click",
  openOrders
);

async function openOrders() {

  if (!currentUser) {

    showLoginForm();

    return;
  }

  showModal(
    "Mes commandes",
    `
      <div
        id="ordersLoading"
        style="
          text-align:center;
          padding:30px;
        "
      >
        Chargement des commandes...
      </div>

      <div id="ordersList"></div>
    `
  );

  try {

    const ordersQuery =
      query(
        collection(db, "orders"),
        where(
          "userId",
          "==",
          currentUser.uid
        )
      );

    const snapshot =
      await getDocs(
        ordersQuery
      );

    const orders = [];

    snapshot.forEach(item => {

      orders.push({
        id:item.id,
        ...item.data()
      });

    });

    orders.sort(
      (a,b) => {

        const dateA =
          a.createdAt?.seconds || 0;

        const dateB =
          b.createdAt?.seconds || 0;

        return dateB - dateA;

      }
    );

    $("ordersLoading")?.remove();

    const list =
      $("ordersList");

    if (!list) {
      return;
    }

    if (!orders.length) {

      list.innerHTML = `
        <div style="
          text-align:center;
          padding:30px;
        ">

          <div style="font-size:50px;">
            📦
          </div>

          <h3>
            Aucune commande
          </h3>

          <p>
            Tu n'as pas encore passé de commande.
          </p>

        </div>
      `;

      return;

    }

    list.innerHTML =
      orders.map(order => {

        const total =
          Number(
            order.total || 0
          );

        const status =
          order.status ||
          "Enregistrée";

        const customerName =
          `${order.firstName || ""} ${order.lastName || ""}`
            .trim();

        return `
          <div
            class="order-card"
            style="
              padding:16px;
              margin-bottom:12px;
              border:1px solid rgba(255,255,255,.08);
              border-radius:16px;
            "
          >

            <div style="
              display:flex;
              justify-content:space-between;
              gap:10px;
              margin-bottom:8px;
            ">

              <strong>
                Commande #${escapeHTML(
                  order.id.slice(0,8)
                )}
              </strong>

              <strong>
                ${money(total)}
              </strong>

            </div>

            ${
              customerName
                ? `
                  <div style="
                    margin-bottom:8px;
                    opacity:.9;
                  ">
                    👤 ${escapeHTML(customerName)}
                  </div>
                `
                : ""
            }

            <div style="margin-bottom:12px;">
              Statut :
              <strong>
                ${escapeHTML(status)}
              </strong>
            </div>

            <button
              type="button"
              class="view-btn"
              data-order-id="${escapeAttr(order.id)}"
            >
              Voir la commande
            </button>

          </div>
        `;

      }).join("");

    list.addEventListener(
      "click",
      event => {

        const button =
          event.target.closest(
            "[data-order-id]"
          );

        if (!button) {
          return;
        }

        const order =
          orders.find(
            item =>
              item.id ===
              button.dataset.orderId
          );

        if (order) {
          openOrderDetails(order);
        }

      }
    );

  } catch (error) {

    console.error(
      "Firestore Orders Error:",
      error
    );

    const loading =
      $("ordersLoading");

    if (loading) {

      loading.innerHTML = `
        <div style="color:#ff7777;">
          Impossible de charger les commandes.
          <br><br>
          ${escapeHTML(
            error.message || ""
          )}
        </div>
      `;

    }

  }

}

// ============================================================
// DÉTAIL COMMANDE
// ============================================================

function openOrderDetails(order) {

  const items =
    Array.isArray(order.items)
      ? order.items
      : [];

  const status =
    order.status ||
    "Enregistrée";

  const timeline = [
    "Enregistrée",
    "Acceptée",
    "Préparation",
    "En transit",
    "Livraison proche",
    "Livrée"
  ];

  const currentIndex =
    timeline.indexOf(status);

  const productsHTML =
    items.map(item => {

      const product =
        getProduct(item.id);

      const name =
        product?.name ||
        item.name ||
        "Produit";

      const displayName =
        item.option
          ? `${name} (${item.option})`
          : name;

      const price =
        Number(
          product?.price ??
          item.price ??
          0
        );

      const quantity =
        Number(
          item.quantity || 1
        );

      return `
        <div style="
          display:flex;
          justify-content:space-between;
          gap:12px;
          padding:10px 0;
          border-bottom:1px solid rgba(255,255,255,.07);
        ">

          <span>
            ${escapeHTML(displayName)}
            × ${quantity}
          </span>

          <strong>
            ${money(price * quantity)}
          </strong>

        </div>
      `;

    }).join("");

  const customerName =
    `${order.firstName || ""} ${order.lastName || ""}`
      .trim();

  const timelineHTML =
    status === "Annulée"
      ? `
        <div style="
          padding:12px;
          border-radius:12px;
          background:rgba(255,60,60,.12);
          color:#ff7777;
        ">
          ❌ Commande annulée
        </div>
      `
      : timeline.map(
          (step,index) => {

            const active =
              currentIndex >= index;

            return `
              <div style="
                display:flex;
                align-items:center;
                gap:10px;
                margin:8px 0;
                opacity:${active ? 1 : .4};
              ">

                <span>
                  ${active ? "●" : "○"}
                </span>

                <span>
                  ${step}
                </span>

              </div>
            `;

          }
        ).join("");

  showModal(
    `Commande #${escapeHTML(
      order.id.slice(0,8)
    )}`,
    `
      <div>

        <div style="
          padding:16px;
          border-radius:16px;
          background:rgba(80,120,255,.08);
          margin-bottom:18px;
        ">

          ${
            customerName
              ? `
                <div style="
                  margin-bottom:9px;
                  font-weight:700;
                ">
                  👤 ${escapeHTML(customerName)}
                </div>
              `
              : ""
          }

          ${
            order.userEmail
              ? `
                <div style="
                  margin-bottom:9px;
                  opacity:.8;
                ">
                  📧 ${escapeHTML(order.userEmail)}
                </div>
              `
              : ""
          }

          <strong>
            Statut :
            ${escapeHTML(status)}
          </strong>

          ${
            order.tracking
              ? `
                <div style="margin-top:8px;">
                  Suivi :
                  ${escapeHTML(order.tracking)}
                </div>
              `
              : ""
          }

          ${
            order.estimatedDelivery
              ? `
                <div style="margin-top:8px;">
                  Livraison estimée :
                  ${escapeHTML(order.estimatedDelivery)}
                </div>
              `
              : ""
          }

          ${
            order.city
              ? `
                <div style="margin-top:8px;">
                  📍 Destination :
                  ${escapeHTML(order.city)}
                </div>
              `
              : ""
          }

        </div>

        <h3>
          Suivi
        </h3>

        <div style="
          margin:12px 0 20px;
        ">
          ${timelineHTML}
        </div>

        <h3>
          Produits
        </h3>

        <div style="
          margin:10px 0 20px;
        ">
          ${productsHTML}
        </div>

        ${
          order.address
            ? `
              <h3>
                Livraison
              </h3>

              <p style="
                margin:8px 0 20px;
              ">
                ${escapeHTML(order.address)}
              </p>
            `
            : ""
        }

        <div style="
          display:flex;
          justify-content:space-between;
          font-size:20px;
          padding-top:15px;
          border-top:1px solid rgba(255,255,255,.1);
        ">

          <strong>
            Total
          </strong>

          <strong>
            ${money(order.total || 0)}
          </strong>

        </div>

        <button
          type="button"
          class="add-btn"
          id="invoiceBtn"
          style="
            width:100%;
            margin-top:18px;
          "
        >
          🧾 Voir la facture
        </button>

      </div>
    `
  );

  $("invoiceBtn")
    ?.addEventListener(
      "click",
      () => printInvoice(order)
    );

}

// ============================================================
// CARTE TEST
// ============================================================

function getTestCard() {

  try {

    const raw =
      localStorage.getItem(
        TEST_CARD_STORAGE_KEY
      );

    if (!raw) {
      return null;
    }

    const parsed =
      JSON.parse(raw);

    if (
      !parsed ||
      typeof parsed.number !== "string" ||
      typeof parsed.expiry !== "string" ||
      typeof parsed.cvv !== "string" ||
      typeof parsed.holder !== "string"
    ) {
      return null;
    }

    return parsed;

  } catch {

    return null;

  }

}

function generateTestCard() {

  const digits =
    Array.from(
      {length:12},
      () =>
        Math.floor(
          Math.random() * 10
        )
    ).join("");

  const number =
    `9999 ${digits.slice(0,4)} ${digits.slice(4,8)} ${digits.slice(8,12)}`;

  const month =
    String(
      Math.floor(
        Math.random() * 12
      ) + 1
    ).padStart(2,"0");

  const year =
    String(
      new Date().getFullYear() +
      Math.floor(
        Math.random() * 5
      ) + 1
    ).slice(-2);

  const cvv =
    String(
      Math.floor(
        Math.random() * 900
      ) + 100
    );

  const card = {
    number,
    holder:"NOVASHOP CARD",
    expiry:`${month}/${year}`,
    cvv
  };

  localStorage.setItem(
    TEST_CARD_STORAGE_KEY,
    JSON.stringify(card)
  );

  return card;

}

function renderTestCardHTML() {

  const card =
    getTestCard();

  if (!card) {

    return `
      <div style="
        padding:16px;
        border-radius:15px;
        background:rgba(255,255,255,.04);
        margin-top:15px;
      ">

        <strong>
          💳 Carte
        </strong>

        <p style="
          margin-top:7px;
          opacity:.7;
        ">
          Aucune carte créée.
        </p>

        <button
          type="button"
          class="add-btn"
          id="generateTestCard"
          style="
            width:100%;
            margin-top:12px;
          "
        >
          Générer une carte
        </button>

      </div>
    `;

  }

  return `
    <div style="margin-top:15px;">

      <div style="
        width:100%;
        max-width:420px;
        min-height:235px;
        margin:12px auto 16px;
        padding:24px;
        border-radius:22px;
        background:#050505;
        color:#fff !important;
        border:1px solid #252525;
        box-shadow:0 18px 50px rgba(0,0,0,.45);
        display:flex;
        flex-direction:column;
        justify-content:space-between;
      ">

        <div style="
          font-size:24px;
          font-weight:700;
          letter-spacing:3px;
          color:#fff !important;
        ">
          ${escapeHTML(card.number)}
        </div>

        <div style="
          display:grid;
          grid-template-columns:1fr auto auto;
          gap:18px;
          align-items:end;
        ">

          <div>

            <div style="
              font-size:10px;
              letter-spacing:1.5px;
              color:#fff !important;
            ">
              TITULAIRE
            </div>

            <div style="
              font-size:15px;
              font-weight:700;
              color:#fff !important;
              margin-top:4px;
            ">
              ${escapeHTML(card.holder)}
            </div>

          </div>

          <div>

            <div style="
              font-size:10px;
              letter-spacing:1.5px;
              color:#fff !important;
            ">
              EXP
            </div>

            <div style="
              font-size:15px;
              font-weight:700;
              color:#fff !important;
              margin-top:4px;
            ">
              ${escapeHTML(card.expiry)}
            </div>

          </div>

          <div>

            <div style="
              font-size:10px;
              letter-spacing:1.5px;
              color:#fff !important;
            ">
              CVV
            </div>

            <div style="
              font-size:15px;
              font-weight:700;
              color:#fff !important;
              margin-top:4px;
            ">
              ${escapeHTML(card.cvv)}
            </div>

          </div>

        </div>

      </div>

      <button
        type="button"
        class="add-btn"
        id="generateTestCard"
        style="width:100%;"
      >
        🔄 Générer une nouvelle carte
      </button>

    </div>
  `;

}

// ============================================================
// CHECKOUT
// ============================================================

checkoutBtn?.addEventListener(
  "click",
  openCheckout
);

function openCheckout() {

  if (!cart.length) {

    toast(
      "Ton panier est vide 🛒"
    );

    return;
  }

  if (!currentUser) {

    toast(
      "Connecte-toi pour commander."
    );

    showLoginForm();

    return;
  }

  const subtotal =
    getCartSubtotal();

  showModal(
    "Finaliser la commande",
    `
      <form id="checkoutForm">

        <div style="
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
          margin-bottom:14px;
        ">

          <div>

            <label for="checkoutFirstName">
              Prénom
            </label>

            <input
              id="checkoutFirstName"
              type="text"
              autocomplete="given-name"
              placeholder="Ton prénom"
              required
            >

          </div>

          <div>

            <label for="checkoutLastName">
              Nom
            </label>

            <input
              id="checkoutLastName"
              type="text"
              autocomplete="family-name"
              placeholder="Ton nom"
              required
            >

          </div>

        </div>

        <div style="
          margin-bottom:14px;
        ">

          <label for="checkoutAddress">
            Adresse de livraison
          </label>

          <textarea
            id="checkoutAddress"
            required
            rows="4"
            autocomplete="street-address"
            placeholder="Adresse complète"
          ></textarea>

        </div>

        <div style="
          padding:15px;
          border-radius:14px;
          background:rgba(255,255,255,.05);
          margin:15px 0;
        ">

          <div style="
            display:flex;
            justify-content:space-between;
          ">

            <span>
              Sous-total
            </span>

            <strong id="checkoutSubtotal">
              ${money(subtotal)}
            </strong>

          </div>

          <div style="
            display:flex;
            justify-content:space-between;
            margin-top:12px;
            font-size:22px;
          ">

            <span>
              Total
            </span>

            <strong id="checkoutFinal">
              ${money(subtotal)}
            </strong>

          </div>

        </div>

        <h3>
          Mode de paiement
        </h3>

        <div style="
          display:grid;
          gap:10px;
          margin:12px 0 18px;
        ">

          <button
            type="button"
            class="view-btn payment-choice"
            data-payment="paypal"
          >
            🅿️ PayPal
          </button>

          <button
            type="button"
            class="view-btn payment-choice"
            data-payment="card"
          >
            💳 Carte bancaire
          </button>

        </div>

        <input
          type="hidden"
          id="paymentMethod"
          value=""
        >

        <div
          id="paymentInfo"
          style="margin-bottom:14px;"
        ></div>

        <button
          type="submit"
          class="add-btn"
          id="checkoutSubmit"
          style="width:100%;"
        >
          Continuer
        </button>

        <div
          id="checkoutError"
          style="
            display:none;
            color:#ff7777;
            margin-top:12px;
          "
        ></div>

      </form>
    `
  );

  let paymentMethod = "";

  document
    .querySelectorAll(".payment-choice")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          paymentMethod =
            button.dataset.payment || "";

          const input =
            $("paymentMethod");

          if (input) {
            input.value =
              paymentMethod;
          }

          document
            .querySelectorAll(
              ".payment-choice"
            )
            .forEach(item => {

              item.classList.remove(
                "selected"
              );

            });

          button.classList.add(
            "selected"
          );

          const info =
            $("paymentInfo");

          if (!info) {
            return;
          }

          if (
            paymentMethod ===
            "paypal"
          ) {

            info.innerHTML = `
              <div style="
                padding:12px;
                border-radius:12px;
                background:rgba(60,130,255,.1);
              ">
                Tu seras redirigé vers PayPal
                pour effectuer le paiement.
              </div>
            `;

          } else {

            info.innerHTML = `
              <div style="
                padding:15px;
                border-radius:14px;
                background:rgba(255,255,255,.05);
              ">

                <div style="
                  font-weight:700;
                  margin-bottom:12px;
                ">
                  💳 Informations de carte
                </div>

                <label for="cardNumber">
                  Numéro de carte
                </label>

                <input
                  id="cardNumber"
                  type="text"
                  inputmode="numeric"
                  autocomplete="off"
                  value=""
                  placeholder="Numéro de carte"
                  required
                >

                <label
                  for="cardHolder"
                  style="margin-top:10px"
                >
                  Nom sur la carte
                </label>

                <input
                  id="cardHolder"
                  type="text"
                  autocomplete="off"
                  value=""
                  placeholder="Nom sur la carte"
                  required
                >

                <div style="
                  display:grid;
                  grid-template-columns:1fr 1fr;
                  gap:10px;
                  margin-top:10px;
                ">

                  <div>

                    <label for="cardExpiry">
                      Expiration
                    </label>

                    <input
                      id="cardExpiry"
                      type="text"
                      autocomplete="off"
                      value=""
                      placeholder="MM/AA"
                      required
                    >

                  </div>

                  <div>

                    <label for="cardCvv">
                      CVV
                    </label>

                    <input
                      id="cardCvv"
                      type="text"
                      inputmode="numeric"
                      autocomplete="off"
                      value=""
                      placeholder="CVV"
                      required
                    >

                  </div>

                </div>

                <p style="
                  margin-top:12px;
                  color:var(--muted);
                  font-size:13px;
                ">
                  Entre les informations de la carte
                  créée depuis l'administration.
                </p>

              </div>
            `;

          }

        }
      );

    });

  $("checkoutForm")
    ?.addEventListener(
      "submit",
      async event => {

        event.preventDefault();

        const firstName =
          $("checkoutFirstName")
            ?.value.trim() || "";

        const lastName =
          $("checkoutLastName")
            ?.value.trim() || "";

        const address =
          $("checkoutAddress")
            ?.value.trim() || "";

        const errorBox =
          $("checkoutError");

        if (!firstName) {

          if (errorBox) {

            errorBox.textContent =
              "Indique ton prénom.";

            errorBox.style.display =
              "block";

          }

          return;

        }

        if (!lastName) {

          if (errorBox) {

            errorBox.textContent =
              "Indique ton nom.";

            errorBox.style.display =
              "block";

          }

          return;

        }

        if (!address) {

          if (errorBox) {

            errorBox.textContent =
              "Indique ton adresse de livraison.";

            errorBox.style.display =
              "block";

          }

          return;

        }

        if (!paymentMethod) {

          if (errorBox) {

            errorBox.textContent =
              "Choisis un moyen de paiement.";

            errorBox.style.display =
              "block";

          }

          return;

        }

        const submit =
          $("checkoutSubmit");

        if (submit) {

          submit.disabled = true;
          submit.textContent =
            "Création...";

        }

        try {

          const total =
            getCartSubtotal();

          let paymentStatus =
            total === 0
              ? "Payé"
              : "En attente";

          if (
            paymentMethod ===
            "card"
          ) {

            const card =
              getTestCard();

            if (!card) {

              throw new Error(
                "Aucune carte n'a été créée dans l'administration."
              );

            }

            const enteredNumber =
              (
                $("cardNumber")
                  ?.value || ""
              )
                .replace(/\s+/g,"")
                .trim();

            const storedNumber =
              card.number
                .replace(/\s+/g,"")
                .trim();

            const enteredHolder =
              (
                $("cardHolder")
                  ?.value || ""
              )
                .trim()
                .toLowerCase();

            const storedHolder =
              card.holder
                .trim()
                .toLowerCase();

            const enteredExpiry =
              (
                $("cardExpiry")
                  ?.value || ""
              ).trim();

            const enteredCvv =
              (
                $("cardCvv")
                  ?.value || ""
              ).trim();

            if (
              enteredNumber !== storedNumber ||
              enteredHolder !== storedHolder ||
              enteredExpiry !== card.expiry ||
              enteredCvv !== card.cvv
            ) {

              throw new Error(
                "Les informations de carte sont incorrectes."
              );

            }

            paymentStatus =
              "Payé";

          }

          const orderItems =
            cart.map(item => {

              const product =
                getProduct(item.id);

              const baseName =
                product?.name ||
                "Produit";

              const displayName =
                item.option
                  ? `${baseName} (${item.option})`
                  : baseName;

              return {

                id:item.id,

                name:displayName,

                option:
                  item.option || "",

                price:
                  product?.price || 0,

                quantity:
                  Number(
                    item.quantity || 1
                  )

              };

            });

          const orderData = {

            userId:
              currentUser.uid,

            userEmail:
              currentUser.email || "",

            firstName,
            lastName,

            items:
              orderItems,

            subtotal:
              total,

            total,

            address,

            city:"",

            status:
              "Enregistrée",

            paymentMethod,

            paymentStatus,

            tracking:"",

            estimatedDelivery:"",

            createdAt:
              serverTimestamp()

          };

          const orderRef =
            await addDoc(
              collection(
                db,
                "orders"
              ),
              orderData
            );

          cart = [];

          saveCart();
          renderCart();

          closeModal();

          toast(
            `Commande #${orderRef.id.slice(0,8)} créée 🎉`,
            "success"
          );

          if (
            paymentMethod === "paypal" &&
            total > 0
          ) {

            const paypalUrl =
              `https://paypal.me/SH0PNOVA/${encodeURIComponent(
                total.toFixed(2)
              )}EUR`;

            setTimeout(
              () => {

                window.open(
                  paypalUrl,
                  "_blank",
                  "noopener,noreferrer"
                );

              },
              400
            );

          }

        } catch (error) {

          console.error(
            "Firestore Checkout Error:",
            error
          );

          if (errorBox) {

            errorBox.textContent =
              `Erreur : ${
                error.message ||
                error.code ||
                "inconnue"
              }`;

            errorBox.style.display =
              "block";

          }

        } finally {

          if (submit) {

            submit.disabled = false;
            submit.textContent =
              "Continuer";

          }

        }

      }
    );

}

// ============================================================
// FACTURE
// ============================================================

function printInvoice(order) {

  const items =
    Array.isArray(order.items)
      ? order.items
      : [];

  const rows =
    items.map(item => {

      const product =
        getProduct(item.id);

      const baseName =
        product?.name ||
        item.name ||
        "Produit";

      const name =
        item.option
          ? `${baseName} (${item.option})`
          : baseName;

      const price =
        Number(
          product?.price ??
          item.price ??
          0
        );

      const quantity =
        Number(
          item.quantity || 1
        );

      return `
        <tr>

          <td>
            ${escapeHTML(name)}
          </td>

          <td>
            ${quantity}
          </td>

          <td>
            ${money(price)}
          </td>

          <td>
            ${money(price * quantity)}
          </td>

        </tr>
      `;

    }).join("");

  const customerName =
    `${order.firstName || ""} ${order.lastName || ""}`
      .trim();

  const invoiceWindow =
    window.open(
      "",
      "_blank",
      "width=900,height=700"
    );

  if (!invoiceWindow) {

    toast(
      "La fenêtre de facture a été bloquée."
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
          font-family:Arial,sans-serif;
          padding:40px;
          color:#111827;
        }

        h1 {
          margin-bottom:5px;
        }

        .top {
          display:flex;
          justify-content:space-between;
          margin-bottom:40px;
        }

        table {
          width:100%;
          border-collapse:collapse;
          margin-top:30px;
        }

        th,
        td {
          border-bottom:1px solid #ddd;
          padding:12px;
          text-align:left;
        }

        .total {
          margin-top:30px;
          text-align:right;
          font-size:24px;
          font-weight:bold;
        }

        .small {
          color:#666;
          margin-top:30px;
        }

      </style>

    </head>

    <body>

      <div class="top">

        <div>

          <h1>
            NovaShop
          </h1>

          <p>
            Boutique gaming
          </p>

        </div>

        <div>

          <strong>
            Facture
          </strong>

          <p>
            Commande #${escapeHTML(order.id)}
          </p>

        </div>

      </div>

      <h3>
        Client
      </h3>

      ${
        customerName
          ? `
            <p>
              <strong>
                ${escapeHTML(customerName)}
              </strong>
            </p>
          `
          : ""
      }

      <p>
        ${escapeHTML(
          order.userEmail || ""
        )}
      </p>

      <p>
        ${escapeHTML(
          order.address || ""
        )}
      </p>

      ${
        order.city
          ? `
            <p>
              ${escapeHTML(order.city)}
            </p>
          `
          : ""
      }

      <h3>
        Produits
      </h3>

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
          ${rows}
        </tbody>

      </table>

      <div class="total">
        Total :
        ${money(order.total || 0)}
      </div>

      <p class="small">
        Statut :
        ${escapeHTML(
          order.status ||
          "Enregistrée"
        )}
      </p>

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

// ============================================================
// ADMIN
// ============================================================

adminBtn?.addEventListener(
  "click",
  openAdmin
);

function isAdminUser() {

  return (
    currentUser &&
    (
      currentUser.email || ""
    ).toLowerCase() ===
    ADMIN_EMAIL.toLowerCase()
  );

}

function openAdmin() {

  if (!isAdminUser()) {

    toast(
      "Accès administrateur refusé."
    );

    return;

  }

  const authorized =
    localStorage.getItem(
      ADMIN_ACCESS_KEY
    ) === "true";

  if (!authorized) {

    const code =
      prompt(
        "Code administrateur NovaShop :"
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
      <div
        id="adminLoading"
        style="
          text-align:center;
          padding:30px;
        "
      >
        Chargement...
      </div>

      <div id="adminContent"></div>
    `
  );

  try {

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );

    const orders = [];

    snapshot.forEach(item => {

      orders.push({
        id:item.id,
        ...item.data()
      });

    });

    orders.sort(
      (a,b) => {

        const aTime =
          a.createdAt?.seconds || 0;

        const bTime =
          b.createdAt?.seconds || 0;

        return bTime - aTime;

      }
    );

    renderAdmin(orders);

  } catch(error) {

    console.error(
      "Admin Firestore Error:",
      error
    );

    const loading =
      $("adminLoading");

    if (loading) {

      loading.innerHTML = `
        <div style="color:#ff7777;">
          Erreur Firestore :
          ${escapeHTML(
            error.message || ""
          )}
        </div>
      `;

    }

  }

}

function renderAdmin(orders) {

  $("adminLoading")?.remove();

  const content =
    $("adminContent");

  if (!content) {
    return;
  }

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

  content.innerHTML = `

    <div style="
      padding:15px;
      margin-bottom:18px;
      border-radius:16px;
      background:rgba(80,120,255,.08);
    ">

      <strong>
        🛡️ Administration
      </strong>

      <p style="margin-top:6px;">
        ${orders.length}
        commande${orders.length > 1 ? "s" : ""}
      </p>

    </div>

    <div style="
      padding:16px;
      margin-bottom:18px;
      border-radius:16px;
      background:rgba(255,255,255,.04);
    ">

      <strong>
        💳 Carte
      </strong>

      <p style="
        margin-top:6px;
        opacity:.7;
      ">
        Carte utilisable uniquement sur NovaShop.
      </p>

      <div id="testCardContainer">
        ${renderTestCardHTML()}
      </div>

    </div>

    <div style="
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      margin-bottom:20px;
    ">

      <button
        type="button"
        class="view-btn"
        id="adminRefresh"
      >
        🔄 Actualiser
      </button>

      <button
        type="button"
        class="view-btn"
        id="adminLogout"
      >
        🔐 Quitter admin
      </button>

    </div>

    <div id="adminOrders">

      ${
        orders.length
          ? orders.map(order => {

              const items =
                Array.isArray(order.items)
                  ? order.items
                  : [];

              const productsText =
                items
                  .map(
                    item => {

                      const baseName =
                        item.name ||
                        item.id;

                      return `${
                        baseName
                      }${
                        item.option
                          ? ` (${item.option})`
                          : ""
                      } ×${
                        item.quantity || 1
                      }`;

                    }
                  )
                  .join(", ");

              const customerName =
                `${order.firstName || ""} ${order.lastName || ""}`
                  .trim();

              return `

                <div
                  class="admin-order"
                  style="
                    padding:16px;
                    margin-bottom:15px;
                    border:1px solid rgba(255,255,255,.1);
                    border-radius:16px;
                  "
                >

                  <div style="
                    display:flex;
                    justify-content:space-between;
                    gap:10px;
                    flex-wrap:wrap;
                  ">

                    <strong>
                      #${escapeHTML(
                        order.id.slice(0,8)
                      )}
                    </strong>

                    <strong>
                      ${money(
                        order.total || 0
                      )}
                    </strong>

                  </div>

                  ${
                    customerName
                      ? `
                        <p style="
                          margin:8px 0;
                        ">
                          👤 <strong>
                            ${escapeHTML(customerName)}
                          </strong>
                        </p>
                      `
                      : `
                        <p style="
                          margin:8px 0;
                        ">
                          👤 Nom non renseigné
                        </p>
                      `
                  }

                  <p style="
                    margin:8px 0;
                    opacity:.85;
                  ">
                    📧 ${
                      escapeHTML(
                        order.userEmail ||
                        "Inconnu"
                      )
                    }
                  </p>

                  <p style="
                    margin:8px 0;
                  ">
                    💳 ${
                      escapeHTML(
                        order.paymentMethod ||
                        "N/A"
                      )
                    }
                    |
                    ${
                      escapeHTML(
                        order.paymentStatus ||
                        "En attente"
                      )
                    }
                  </p>

                  <p style="
                    margin:8px 0;
                    opacity:.8;
                  ">
                    ${escapeHTML(
                      productsText
                    )}
                  </p>

                  <label>
                    Statut
                  </label>

                  <select
                    class="admin-status"
                    data-id="${escapeAttr(order.id)}"
                    style="
                      width:100%;
                      margin:6px 0 10px;
                    "
                  >

                    ${
                      statuses
                        .map(
                          status => `
                            <option
                              value="${escapeAttr(status)}"
                              ${
                                order.status ===
                                status
                                  ? "selected"
                                  : ""
                              }
                            >
                              ${escapeHTML(status)}
                            </option>
                          `
                        )
                        .join("")
                    }

                  </select>

                  <input
                    class="admin-city"
                    data-id="${escapeAttr(order.id)}"
                    value="${escapeAttr(order.city || "")}"
                    placeholder="Ville de destination"
                    style="
                      width:100%;
                      margin-bottom:8px;
                    "
                  >

                  <input
                    class="admin-tracking"
                    data-id="${escapeAttr(order.id)}"
                    value="${escapeAttr(order.tracking || "")}"
                    placeholder="Numéro de suivi"
                    style="
                      width:100%;
                      margin-bottom:8px;
                    "
                  >

                  <input
                    class="admin-delivery"
                    data-id="${escapeAttr(order.id)}"
                    value="${escapeAttr(order.estimatedDelivery || "")}"
                    placeholder="Livraison estimée"
                    style="
                      width:100%;
                      margin-bottom:10px;
                    "
                  >

                  <div style="
                    display:flex;
                    gap:8px;
                    flex-wrap:wrap;
                  ">

                    <button
                      type="button"
                      class="add-btn admin-save"
                      data-id="${escapeAttr(order.id)}"
                    >
                      💾 Enregistrer
                    </button>

                    <button
                      type="button"
                      class="view-btn admin-paid"
                      data-id="${escapeAttr(order.id)}"
                    >
                      💰 Marquer payé
                    </button>

                    <button
                      type="button"
                      class="view-btn admin-invoice"
                      data-id="${escapeAttr(order.id)}"
                    >
                      🧾 Facture
                    </button>

                    <button
                      type="button"
                      class="view-btn admin-delete"
                      data-id="${escapeAttr(order.id)}"
                      style="color:#ff7777;"
                    >
                      🗑️ Supprimer
                    </button>

                  </div>

                </div>

              `;

            }).join("")
          : `
            <div style="
              text-align:center;
              padding:30px;
            ">

              <div style="font-size:50px;">
                📦
              </div>

              <h3>
                Aucune commande
              </h3>

            </div>
          `
      }

    </div>
  `;

  $("adminRefresh")
    ?.addEventListener(
      "click",
      loadAdmin
    );

  $("adminLogout")
    ?.addEventListener(
      "click",
      () => {

        localStorage.removeItem(
          ADMIN_ACCESS_KEY
        );

        closeModal();

        toast(
          "Mode admin fermé."
        );

      }
    );

  attachTestCardButton();

  document
    .querySelectorAll(".admin-save")
    .forEach(button => {

      button.addEventListener(
        "click",
        async () => {

          await saveAdminOrder(
            button.dataset.id
          );

        }
      );

    });

  document
    .querySelectorAll(".admin-paid")
    .forEach(button => {

      button.addEventListener(
        "click",
        async () => {

          await markOrderPaid(
            button.dataset.id
          );

        }
      );

    });

  document
    .querySelectorAll(".admin-invoice")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const order =
            orders.find(
              item =>
                item.id ===
                button.dataset.id
            );

          if (order) {
            printInvoice(order);
          }

        }
      );

    });

  document
    .querySelectorAll(".admin-delete")
    .forEach(button => {

      button.addEventListener(
        "click",
        async () => {

          await deleteAdminOrder(
            button.dataset.id
          );

        }
      );

    });

}

function attachTestCardButton() {

  const button =
    $("generateTestCard");

  if (!button) {
    return;
  }

  button.addEventListener(
    "click",
    () => {

      generateTestCard();

      const container =
        $("testCardContainer");

      if (container) {

        container.innerHTML =
          renderTestCardHTML();

        attachTestCardButton();

      }

    }
  );

}

async function saveAdminOrder(id) {

  try {

    const safeId =
      typeof CSS !== "undefined" &&
      typeof CSS.escape === "function"
        ? CSS.escape(id)
        : id.replace(
            /["\\]/g,
            "\\$&"
          );

    const status =
      document.querySelector(
        `.admin-status[data-id="${safeId}"]`
      )?.value ||
      "Enregistrée";

    const city =
      document.querySelector(
        `.admin-city[data-id="${safeId}"]`
      )?.value ||
      "";

    const tracking =
      document.querySelector(
        `.admin-tracking[data-id="${safeId}"]`
      )?.value ||
      "";

    const estimatedDelivery =
      document.querySelector(
        `.admin-delivery[data-id="${safeId}"]`
      )?.value ||
      "";

    await updateDoc(
      doc(
        db,
        "orders",
        id
      ),
      {
        status,
        city,
        tracking,
        estimatedDelivery
      }
    );

    toast(
      "Commande mise à jour ✅",
      "success"
    );

  } catch(error) {

    console.error(error);

    toast(
      `Erreur : ${
        error.message ||
        error.code
      }`,
      "error"
    );

  }

}

async function markOrderPaid(id) {

  try {

    await updateDoc(
      doc(
        db,
        "orders",
        id
      ),
      {
        paymentStatus:"Payé"
      }
    );

    toast(
      "Paiement marqué comme payé 💰",
      "success"
    );

    loadAdmin();

  } catch(error) {

    console.error(error);

    toast(
      `Erreur : ${
        error.message ||
        error.code
      }`,
      "error"
    );

  }

}

async function deleteAdminOrder(id) {

  const confirmed =
    confirm(
      "Supprimer définitivement cette commande ?"
    );

  if (!confirmed) {
    return;
  }

  try {

    await deleteDoc(
      doc(
        db,
        "orders",
        id
      )
    );

    toast(
      "Commande supprimée 🗑️",
      "success"
    );

    loadAdmin();

  } catch(error) {

    console.error(error);

    toast(
      `Erreur : ${
        error.message ||
        error.code
      }`,
      "error"
    );

  }

}

// ============================================================
// SETTINGS
// ============================================================

settingsBtn?.addEventListener(
  "click",
  openSettings
);

function getTheme() {

  return (
    localStorage.getItem(
      "novaThemeChoice"
    ) || "dark"
  );

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
      prefersDark
        ? "dark"
        : "light";

  }

}

function openSettings() {

  const current =
    getTheme();

  showModal(
    "Paramètres",
    `
      <div>

        <h3>
          Apparence
        </h3>

        <div style="
          display:grid;
          gap:10px;
          margin-top:12px;
        ">

          <button
            type="button"
            class="view-btn theme-choice"
            data-theme="dark"
          >
            🌙 Mode sombre
          </button>

          <button
            type="button"
            class="view-btn theme-choice"
            data-theme="light"
          >
            ☀️ Mode clair
          </button>

          <button
            type="button"
            class="view-btn theme-choice"
            data-theme="auto"
          >
            🖥️ Automatique
          </button>

        </div>

        <p style="
          margin-top:20px;
          opacity:.7;
        ">
          Thème actuel :
          ${escapeHTML(current)}
        </p>

      </div>
    `
  );

  document
    .querySelectorAll(".theme-choice")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          localStorage.setItem(
            "novaThemeChoice",
            button.dataset.theme
          );

          applyTheme();

          toast(
            "Thème mis à jour ✨",
            "success"
          );

          closeModal();

        }
      );

    });

}

// ============================================================
// ESC
// ============================================================

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

// ============================================================
// CLIC DEHORS MODAL
// ============================================================

modal?.addEventListener(
  "click",
  event => {

    if (event.target === modal) {
      closeModal();
    }

  }
);

// ============================================================
// ERREURS FIREBASE
// ============================================================

window.addEventListener(
  "unhandledrejection",
  event => {

    const error =
      event.reason;

    console.error(
      "Unhandled Promise Rejection:",
      error
    );

    if (
      error?.code?.startsWith("auth/")
    ) {

      toast(
        authError(error),
        "error"
      );

    }

  }
);

// ============================================================
// INITIALISATION
// ============================================================

applyTheme();

renderCategories();

renderProducts();

renderCart();

// ============================================================
// API PUBLIQUE
// ============================================================

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

  money

};

console.log(
  "NovaShop chargé avec succès 🚀"
);
