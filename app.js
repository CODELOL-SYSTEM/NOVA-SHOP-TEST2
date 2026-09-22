// ============================================================
// NOVASHOP - APP.JS COMPLET
// PARTIE 1
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

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// ============================================================
// CONFIGURATION
// ============================================================

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";

const ADMIN_ACCESS_KEY = "novaAdminAuthorized";
const TEST_CARD_STORAGE_KEY = "novaTestCard";

// ============================================================
// DOM
// ============================================================

const $ = id => document.getElementById(id);

const searchInput = $("searchInput");
const categoriesEl = $("categories");
const productsGrid = $("productGrid");
const productCount = $("productCount");

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

// ============================================================
// PRODUITS
// ============================================================

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
    image: "https://www.memorypc.fr/media/image/1e/18/3f/amd-ryzen-7-7800x3d-rx-9070-xt-pc-gamer.jpg"
  },

  {
    id: "p3",
    name: "HyperX Cloud II",
    category: "Casques",
    price: 49.99,
    image: "https://hyperx.com/cdn/shop/products/hyperx_cloud_ii_black_red_1.jpg"
  },

  {
    id: "p4",
    name: "TECORS Clavier Gamer Mécanique 60% AZERTY",
    category: "Claviers",
    price: 30,
    image: "https://m.media-amazon.com/images/I/71vXJYQxJVL._AC_SL1500_.jpg"
  },

  {
    id: "p5",
    name: "Clavier Magnétique 65% Celshading Noir",
    category: "Claviers",
    price: 120.90,
    image: "https://tryhard.gg/cdn/shop/files/celshading-keyboard.jpg"
  },

  {
    id: "p6",
    name: "Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category: "Souris",
    price: 49.99,
    image: "https://ae01.alicdn.com/kf/Sajazz-aj199-max-carbon-fiber.jpg"
  },

  {
    id: "p7",
    name: "Logitech G PRO X2 Superstrike Blanc et Noir",
    category: "Souris",
    price: 150.99,
    image: "https://imagefnac.com/images/logitech-g-pro-x2-superstrike.jpg"
  },

  {
    id: "p8",
    name: "Samsung 990 PRO 1TB",
    category: "Stockage",
    price: 249.99,
    image: "https://www.pearl.fr/media/catalog/product/samsung-990-pro-1tb.jpg"
  },

  {
    id: "p9",
    name: "Samsung 990 PRO 2TB",
    category: "Stockage",
    price: 199.93,
    image: "https://www.comparer.fr/images/samsung-990-pro-2tb.jpg"
  },

  {
    id: "p10",
    name: "CORSAIR RM1000x EU",
    category: "Alimentations",
    price: 159.90,
    image: "https://www.corsair.com/corsairmedia/sys_master/productcontent/RM1000x_01.jpg"
  },

  {
    id: "p11",
    name: "CORSAIR RM850x EU",
    category: "Alimentations",
    price: 134.90,
    image: "https://www.corsair.com/corsairmedia/sys_master/productcontent/RM850x_01.jpg"
  },

  {
    id: "p12",
    name: "Corsair Frame 5000D RS ARGB Noir",
    category: "Boîtiers",
    price: 159.90,
    image: "https://www.ldlc.com/images/corsair-frame-5000d.jpg"
  },

  {
    id: "p13",
    name: "ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category: "Refroidissement",
    price: 129.90,
    image: "https://images.idealo.com/arctic-liquid-freezer-iii-pro-360.jpg"
  },

  {
    id: "p14",
    name: "Samsung 27 QD-OLED Odyssey G6",
    category: "Écrans",
    price: 399.95,
    image: "https://www.ldlc.com/images/samsung-odyssey-g6-qd-oled.jpg"
  },

  {
    id: "p15",
    name: "ELGATO Wave Mic Arm Pro",
    category: "Streaming",
    price: 229.90,
    image: "https://www.digit-photo.com/images/elgato-wave-mic-arm-pro.jpg"
  },

  {
    id: "p16",
    name: "Sony DualSense PS5/PC",
    category: "Manettes",
    price: 74.90,
    image: "https://images.carrefour.fr/sony-dualsense.jpg",
    options: {
      "Couleur": [
        "Rouge",
        "Blanc",
        "Noir",
        "Bleu"
      ]
    }
  },

  {
    id: "p17",
    name: "ASUS TUF Gaming B650-PLUS",
    category: "Composants",
    price: 179.90,
    image: "https://www.materiel.net/images/asus-tuf-b650-plus.jpg"
  },

  {
    id: "p18",
    name: "MSI MAG B650 Tomahawk WiFi",
    category: "Composants",
    price: 189.90,
    image: "https://m.media-amazon.com/images/I/msi-mag-b650-tomahawk.jpg"
  },

  {
    id: "p19",
    name: "KOORUI Ecran PC Gamer 27 Pouces 200Hz IPS QHD HDR400 1ms",
    category: "Écrans",
    price: 74.99,
    image: "https://m.media-amazon.com/images/I/koorui-27-200hz.jpg"
  },

  {
    id: "p20",
    name: 'iiyama 23.8" LED - G-Master GB2471HS-B1 Red Eagle',
    category: "Écrans",
    price: 65.99,
    image: "https://www.ldlc.com/images/iiyama-g-master-gb2471hs.jpg"
  },

  {
    id: "p21",
    name: "SONGMICS Chaise de jeu ergonomique avec repose-pieds 150 kg gris ardoise",
    category: "Chaises gaming",
    price: 129.99,
    image: "https://songmics.fr/cdn/shop/gaming-chair.jpg"
  },

  {
    id: "p22",
    name: "Dowinx Série Luxe Suède LS-66D68E Blanc",
    category: "Chaises gaming",
    price: 79.99,
    image: "https://dowinx.com/cdn/shop/products/ls-66d68e-white.jpg"
  },

  {
    id: "p23",
    name: "Chaise GTPLAYER Ergonomique Gaming Soutien Lombaire Repose-pieds",
    category: "Chaises gaming",
    price: 109.99,
    image: "https://www.pccomponentes.fr/images/gtplayer-gaming-chair.jpg"
  },

  {
    id: "p24",
    name: "Desk Lite - Height-Adjustable Desk",
    category: "Bureaux gaming",
    price: 110.99,
    image: "https://yaasa.com/cdn/shop/products/desk-lite.jpg"
  },

  {
    id: "p25",
    name: "EUREKA ERGONOMIC Bureau Gaming LED 182x76cm en Forme d'Aile",
    category: "Bureaux gaming",
    price: 86.99,
    image: "https://m.media-amazon.com/images/I/eureka-ergonomic-desk.jpg"
  },

  {
    id: "p26",
    name: "Bureau gaming d’angle HOMCOM réversible support écran",
    category: "Bureaux gaming",
    price: 44.99,
    image: "https://www.manomano.fr/images/homcom-bureau-gaming.jpg"
  },

  {
    id: "p27",
    name: "Logitech G Pro X 2 Lightspeed Noir + Repose casque",
    category: "Casques",
    price: 99.99,
    image: "https://imagefnac.com/images/logitech-g-pro-x2-lightspeed.jpg"
  },

  {
    id: "p28",
    name: "Razer BlackShark V2 Pro 2023 Noir",
    category: "Casques",
    price: 75.99,
    image: "https://www.ldlc.com/images/razer-blackshark-v2-pro.jpg"
  },

  {
    id: "p29",
    name: "beyerdynamic DT-990 Pro 250 Ohm",
    category: "Casques",
    price: 60.99,
    image: "https://www.thomann.de/pics/beyerdynamic-dt990-pro.jpg"
  },

  {
    id: "p30",
    name: "Logitech PRO X TKL Rapid Noir, filaire AZERTY",
    category: "Claviers",
    price: 78.99,
    image: "https://imagefnac.com/images/logitech-pro-x-tkl-rapid.jpg"
  },

  {
    id: "p31",
    name: "QwertyKey75 HE Striker, Magnetic Hall Effect, Rapid Trigger, Snap Tap",
    category: "Claviers",
    price: 56.99,
    image: "https://shopify.com/qwertykey75-he-striker.jpg"
  },

  {
    id: "p32",
    name: "GravaStar Mercury K1 Clavier Gamer sans Fil en Aluminium, Noir Dégradé",
    category: "Claviers",
    price: 91.99,
    image: "https://m.media-amazon.com/images/I/gravastar-mercury-k1.jpg"
  },

  {
    id: "p33",
    name: "ATTACK SHARK R11 Ultra, fibre de carbone, 8000Hz, 49g, 42000 DPI",
    category: "Souris",
    price: 26.99,
    image: "https://m.media-amazon.com/images/I/attack-shark-r11-ultra.jpg"
  },

  {
    id: "p34",
    name: "HyperX QuadCast 2 – Microphone USB – RGB",
    category: "Microphones",
    price: 98.99,
    image: "https://hyperx.com/cdn/shop/products/quadcast-2.jpg"
  },

  {
    id: "p35",
    name: "Shure SM7 dB",
    category: "Microphones",
    price: 121.99,
    image: "https://www.thomann.de/pics/shure-sm7db.jpg"
  },

  {
    id: "p36",
    name: "Razer Seiren V3 Chroma Noir",
    category: "Microphones",
    price: 13.99,
    image: "https://www.ldlc.com/images/razer-seiren-v3-chroma.jpg"
  },

  {
    id: "p37",
    name: "Stairville LED Pixel Rail 40 RGB MKII",
    category: "Éclairage RGB",
    price: 18.90,
    image: "https://www.thomann.de/pics/stairville-led-pixel-rail.jpg"
  },

  {
    id: "p38",
    name: "Govee LED Strip Light RGBIC Wi-Fi + Bluetooth 5m Matter",
    category: "Éclairage RGB",
    price: 8,
    image: "https://imagefnac.com/images/govee-led-strip.jpg"
  },

  {
    id: "p39",
    name: "Lampe de plafond hexagone nid d’abeille LED 2.4m x 4.8m contour bleu",
    category: "Éclairage RGB",
    price: 91.10,
    image: "https://www.discount-autosport.com/images/lampe-led-hexagone.jpg"
  },

  {
    id: "p40",
    name: "GIGABYTE GeForce RTX 5050 WINDFORCE OC 8G",
    category: "Cartes graphiques",
    price: 147,
    image: "https://m.media-amazon.com/images/I/gigabyte-rtx-5050-windforce.jpg"
  },

  {
    id: "p41",
    name: "MSI GeForce RTX 3050 LP E 6G OC",
    category: "Cartes graphiques",
    price: 100,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:msi-rtx-3050.jpg"
  },

  {
    id: "p42",
    name: "ASUS Dual Radeon RX 7600 EVO OC Edition 8GB GDDR6",
    category: "Cartes graphiques",
    price: 140,
    image: "https://m.media-amazon.com/images/I/asus-rx-7600-evo.jpg"
  },

  {
    id: "p43",
    name: "PC Gamer Fixe, Ryzen 7 5700G, Vega 8, 16G DDR4, 1T SSD",
    category: "PC Gamer",
    price: 650,
    image: "https://m.media-amazon.com/images/I/pc-gamer-ryzen-5700g.jpg",
    new: true
  },

  {
    id: "p44",
    name: 'Apple iPhone 14 Pro 6,1" 5G Double SIM 128 Go Argent',
    category: "Smartphones",
    price: 400,
    image: "https://imagefnac.com/images/iphone-14-pro.jpg"
  },

  {
    id: "p45",
    name: 'Apple iPhone 15 6,1" 5G Double SIM 128 Go Noir',
    category: "Smartphones",
    price: 750,
    image: "https://imagefnac.com/images/iphone-15.jpg"
  },

  {
    id: "p46",
    name: 'Apple iPhone 16 6,1" 5G 128 Go Double SIM Noir',
    category: "Smartphones",
    price: 949.99,
    image: "https://imagefnac.com/images/iphone-16.jpg"
  },

  {
    id: "p47",
    name: 'Apple iPhone 17 6,3" 5G Double SIM 256 Go Noir',
    category: "Smartphones",
    price: 1000,
    image: "https://imagefnac.com/images/iphone-17.jpg"
  },

  {
    id: "p48",
    name: 'Apple iPhone 18 Pro 6,3" 5G Double SIM 256 Go Noir',
    category: "Smartphones",
    price: 1199.99,
    image: "https://imagefnac.com/images/iphone-18-pro.jpg"
  },

  {
    id: "p49",
    name: 'Samsung Galaxy S23 6,1" 5G 8 Go RAM 256 Go Noir',
    category: "Smartphones",
    price: 230,
    image: "https://imagefnac.com/images/galaxy-s23.jpg"
  },

  {
    id: "p50",
    name: 'Samsung Galaxy S24 6,2" 5G 256 Go Noir',
    category: "Smartphones",
    price: 449.90,
    image: "https://imagefnac.com/images/galaxy-s24.jpg"
  },

  {
    id: "p51",
    name: 'Samsung Galaxy S25 Edge 6,7" 5G 256 Go Noir absolu Titane',
    category: "Smartphones",
    price: 469.99,
    image: "https://imagefnac.com/images/galaxy-s25-edge.jpg"
  },

  {
    id: "p52",
    name: 'Samsung Galaxy S26 6,3" 5G 256 Go Noir + Buds4 Noir',
    category: "Smartphones",
    price: 650.99,
    image: "https://imagefnac.com/images/galaxy-s26-buds4.jpg"
  },

  {
    id: "p53",
    name: 'Google Pixel 8 6,2" 5G Double SIM 128 Go Vert Sauge',
    category: "Smartphones",
    price: 200,
    image: "https://imagefnac.com/images/google-pixel-8.jpg"
  },

  {
    id: "p54",
    name: 'Google Pixel 9 6,3" 5G Double nano-SIM 128 Go Noir Obsidienne',
    category: "Smartphones",
    price: 400,
    image: "https://imagefnac.com/images/google-pixel-9.jpg"
  },

  {
    id: "p55",
    name: 'Google Pixel 10 6,3" 5G Double SIM 256 Go Noir Volcanique',
    category: "Smartphones",
    price: 600,
    image: "https://imagefnac.com/images/google-pixel-10.jpg"
  },

  {
    id: "p56",
    name: "Flashforge Adventurer 5M Pro",
    category: "Imprimantes 3D",
    price: 115,
    image: "https://www.makershop.fr/images/flashforge-adventurer-5m-pro.jpg"
  },

  {
    id: "p57",
    name: "Elegoo Centauri 2",
    category: "Imprimantes 3D",
    price: 200,
    image: "https://www.elegoo.com/cdn/shop/products/centauri-2.jpg"
  },

  {
    id: "p58",
    name: "Anycubic Photon P1 Max",
    category: "Imprimantes 3D",
    price: 600,
    image: "https://store.anycubic.com/cdn/shop/products/photon-p1-max.jpg"
  },

  {
    id: "p59",
    name: "GTA VI Key PlayStation",
    category: "Logiciels & licences",
    price: 0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:gta-vi-key.jpg"
  },

  {
    id: "p60",
    name: "Microsoft Windows 11 Pro Key",
    category: "Logiciels & licences",
    price: 0,
    image: "https://www.eneba.com/resized-products/windows-11-pro-key.jpg"
  },

  {
    id: "p61",
    name: "AsiaHorse Aurora-CO Gaines de Câble ARGB",
    category: "Accessoires composants PC",
    price: 15.99,
    image: "https://m.media-amazon.com/images/I/asiahorse-aurora-co.jpg"
  },

  {
    id: "p62",
    name: "Câble vidéo Accsup HDMI 2.0 4K UHD avec Ethernet 5 m Noir",
    category: "Adaptateurs / câbles / chargeurs",
    price: 12.99,
    image: "https://imagefnac.com/images/cable-hdmi-accsup.jpg"
  },

  {
    id: "p63",
    name: "Cable Relier ecran pour pc Certifié Câble DP vers DP 10K 240Hz",
    category: "Adaptateurs / câbles / chargeurs",
    price: 0,
    image: "https://m.media-amazon.com/images/I/cable-displayport-10k-240hz.jpg"
  },

  {
    id: "p64",
    name: "Câble USB-C ESSENTIELB vers USB-C 1M Noir",
    category: "Adaptateurs / câbles / chargeurs",
    price: 1,
    image: "https://www.boulanger.com/ref/cable-usbc-essentielb.jpg"
  },

  {
    id: "p65",
    name: "Cables USB Accsup CABLE USB-C VERS USB-A 1M NOIR",
    category: "Adaptateurs / câbles / chargeurs",
    price: 1,
    image: "https://m.media-amazon.com/images/I/61iB-a5cJ2L._SL1500_.jpg"
  },

  {
    id: "p66",
    name: "Câble USB-C vers Lightning pour Apple iPhone/iPad/iPod 1m Blanc",
    category: "Adaptateurs / câbles / chargeurs",
    price: 1,
    image: "https://imagefnac.com/images/cable-usbc-lightning.jpg"
  },

  {
    id: "p67",
    name: "BSTOEM pour Apple Watch Chargeur, Station de Charge USB C Magnétique 1M",
    category: "Adaptateurs / câbles / chargeurs",
    price: 2.99,
    image: "https://m.media-amazon.com/images/I/apple-watch-charger.jpg"
  },

  {
    id: "p68",
    name: "StarTech Cordon d'alimentation PC de 1m - CEE 7/7 à C13",
    category: "Adaptateurs / câbles / chargeurs",
    price: 4.50,
    image: "https://m.media-amazon.com/images/I/startech-c13-power-cable.jpg"
  },

  {
    id: "p69",
    name: "Unicavu Webcam PC 2K 30 FPS Full HD 1080P",
    category: "Caméras & webcams",
    price: 10,
    image: "https://m.media-amazon.com/images/I/unicavu-webcam-2k.jpg"
  },

  {
    id: "p70",
    name: "eMeet Nova 4K Webcam 4K Ultra HD avec 2 Microphones",
    category: "Caméras & webcams",
    price: 23.99,
    image: "https://m.media-amazon.com/images/I/emeet-nova-4k.jpg"
  },

  {
    id: "p71",
    name: "Quntis Lampe Écran Pc RGB, Monitor Light Bar IM 40 cm Noir",
    category: "Barres lumineuses pour écran",
    price: 8.99,
    image: "https://m.media-amazon.com/images/I/quntis-monitor-light-bar.jpg"
  },

  {
    id: "p72",
    name: "TONOR Micro Cardioïde Dynamique USB/XLR TD510+",
    category: "Microphones",
    price: 20.99,
    image: "https://m.media-amazon.com/images/I/tonor-td510.jpg"
  },

  {
    id: "p73",
    name: "BONTEC Bras Ecran PC à Ressort à Gaz, 13-32 Pouces",
    category: "Supports écrans / écrans / TV",
    price: 16,
    image: "https://m.media-amazon.com/images/I/bontec-monitor-arm.jpg"
  },

  {
    id: "p74",
    name: "BONTEC Support Ecran PC 2 Ecran Articulé à Ressort à Gaz, 13-32 Pouces",
    category: "Supports écrans / écrans / TV",
    price: 0,
    image: "https://m.media-amazon.com/images/I/bontec-dual-monitor-arm.jpg"
  },

  {
    id: "p75",
    name: "BONTEC Bras Ecran PC Mural à Ressort à Gaz, 13-42 Pouces, Charge 38kg",
    category: "Supports écrans / écrans / TV",
    price: 0,
    image: "https://m.media-amazon.com/images/I/bontec-wall-monitor-arm.jpg"
  },

  {
    id: "p76",
    name: "KTC Écran PC Gamer Incurvé 24 Pouces FHD 240 Hz (VESA 100×100 mm)",
    category: "Supports écrans / écrans / TV",
    price: 80,
    image: "https://m.media-amazon.com/images/I/ktc-24-240hz.jpg"
  },

  {
    id: "p77",
    name: "KTC Écran PC Gamer Incurvé 27 Pouces QHD 180Hz (OC 185Hz) H27S5",
    category: "Supports écrans / écrans / TV",
    price: 110,
    image: "https://m.media-amazon.com/images/I/ktc-27-180hz.jpg"
  },

  {
    id: "p78",
    name: "HKC Écran PC Gaming 34 Pouces Incurvé UWQHD 120 Hz HDR400",
    category: "Supports écrans / écrans / TV",
    price: 170,
    image: "https://m.media-amazon.com/images/I/hkc-34-120hz.jpg"
  },

  {
    id: "p79",
    name: "HKC 27 Pouces Ecran Gaming 4K Dual Mode UHD 160Hz / FHD 320Hz G27H7P",
    category: "Supports écrans / écrans / TV",
    price: 140,
    image: "https://m.media-amazon.com/images/I/hkc-g27h7p.jpg"
  },

  {
    id: "p80",
    name: "XIAOMI TV F 65 Pouces 2025 4K UHD Smart TV",
    category: "Supports écrans / écrans / TV",
    price: 249.99,
    image: "https://m.media-amazon.com/images/I/xiaomi-tv-f-65.jpg"
  },

  {
    id: "p81",
    name: "Xbox Manette sans fil",
    category: "Manettes & consoles",
    price: 59.99,
    image: "https://m.media-amazon.com/images/I/71fQ5g9X8PL._AC_SL1500_.jpg",
    options: {
      "Couleur": [
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
    id: "p82",
    name: "PlayStation 5 avec 1 Manette Sans Fil DualSense",
    category: "Manettes & consoles",
    price: 320,
    image: "https://m.media-amazon.com/images/I/ps5-console.jpg",
    options: {
      "Console": [
        "PS5 avec lecteur",
        "PS5 Pro"
      ]
    }
  },

  {
    id: "p83",
    name: "Xbox Series X - 1TB Digital Edition avec 1 manette sans fil",
    category: "Manettes & consoles",
    price: 599.99,
    image: "https://m.media-amazon.com/images/I/xbox-series-x-digital.jpg"
  },

  {
    id: "p84",
    name: "Xbox Series S - All Digital Gaming Console - 512GB SSD",
    category: "Manettes & consoles",
    price: 500,
    image: "https://m.media-amazon.com/images/I/xbox-series-s.jpg"
  }

];

// ============================================================
// NOTES / AVIS AUTOMATIQUES
// ============================================================

products.forEach((product, index) => {

  product.rating = Number(
    (
      4.2 +
      ((index * 17) % 81) / 100
    ).toFixed(1)
  );

  product.reviewCount =
    1248 +
    ((index * 137) % 2028);

});

// ============================================================
// ÉTAT
// ============================================================

let currentUser = null;

let selectedCategory = "Tous";

let searchValue = "";

let sortValue = "default";

let cart = [];

let favorites = [];

let reviewsCache = {};

// ============================================================
// LOCAL STORAGE
// ============================================================

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

function loadLocalData() {

  try {

    const savedCart =
      localStorage.getItem("novaCart");

    const savedFavorites =
      localStorage.getItem("novaFavorites");

    cart =
      savedCart
        ? JSON.parse(savedCart)
        : [];

    favorites =
      savedFavorites
        ? JSON.parse(savedFavorites)
        : [];

  } catch (error) {

    console.error(
      "Erreur chargement données locales :",
      error
    );

    cart = [];
    favorites = [];

  }

}

// ============================================================
// UTILITAIRES
// ============================================================

function money(value) {

  return Number(value || 0).toLocaleString(
    "fr-FR",
    {
      style: "currency",
      currency: "EUR"
    }
  );

}

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

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
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

}

function getCartSubtotal() {

  return cart.reduce(

    (total, item) => {

      const product =
        getProduct(item.id);

      if (!product) {
        return total;
      }

      return total +
        Number(product.price || 0) *
        Number(item.quantity || 0);

    },

    0

  );

}

// ============================================================
// OPTIONS PRODUITS
// ============================================================

function hasRequiredOption(product) {

  if (!product.options) {
    return false;
  }

  return Object.keys(product.options).length > 0;

}

function getCartProductName(item) {

  const product =
    getProduct(item.id);

  if (!product) {
    return "Produit";
  }

  if (!item.options) {
    return product.name;
  }

  const optionText =
    Object.entries(item.options)
      .map(
        ([key, value]) =>
          `${key}: ${value}`
      )
      .join(" • ");

  return `${product.name} (${optionText})`;

}

function findCartItem(id, options = {}) {

  return cart.find(item => {

    if (item.id !== id) {
      return false;
    }

    const itemOptions =
      item.options || {};

    const optionKeys =
      Object.keys(options);

    const itemOptionKeys =
      Object.keys(itemOptions);

    if (
      optionKeys.length !==
      itemOptionKeys.length
    ) {
      return false;
    }

    return optionKeys.every(
      key =>
        itemOptions[key] ===
        options[key]
    );

  });

}

function showProductOptions(product) {

  if (!hasRequiredOption(product)) {
    return {};
  }

  const options = {};

  for (
    const [key, values]
    of Object.entries(product.options)
  ) {

    const value =
      prompt(
        `${key}\n\n${values.join("\n")}`
      );

    if (!value) {
      return null;
    }

    if (!values.includes(value)) {

      toast(
        `Option ${key} invalide.`
      );

      return null;

    }

    options[key] = value;

  }

  return options;

}

function setupProductOptions(product) {

  if (!hasRequiredOption(product)) {
    return "";
  }

  return Object.entries(product.options)
    .map(([key, values]) => {

      return `
        <label class="product-option">
          <span>${escapeHTML(key)}</span>

          <select
            data-option-key="${escapeAttr(key)}"
          >

            ${values
              .map(
                value => `
                  <option value="${escapeAttr(value)}">
                    ${escapeHTML(value)}
                  </option>
                `
              )
              .join("")
            }

          </select>

        </label>
      `;

    })
    .join("");

}

function getSelectedProductOption() {

  const options = {};

  document
    .querySelectorAll(
      "#modalContent [data-option-key]"
    )
    .forEach(select => {

      options[
        select.dataset.optionKey
      ] = select.value;

    });

  return options;

}

// ============================================================
// ÉTOILES
// ============================================================

function getRatingStars(rating) {

  const rounded =
    Math.round(Number(rating || 0));

  return Array.from(
    { length: 5 },
    (_, index) =>
      index < rounded
        ? "★"
        : "☆"
  ).join("");

}

// ============================================================
// TOAST
// ============================================================

function toast(message) {

  if (!toastContainer) {
    return;
  }

  const element =
    document.createElement("div");

  element.className = "toast-item";

  element.textContent = message;

  toastContainer.appendChild(element);

  setTimeout(() => {

    element.classList.add("hide");

    setTimeout(
      () => element.remove(),
      250
    );

  }, 2600);

}

// ============================================================
// MODAL
// ============================================================

function showModal(title, html) {

  if (!modal) {
    return;
  }

  if (modalTitle) {
    modalTitle.textContent = title;
  }

  if (modalContent) {
    modalContent.innerHTML = html;
  }

  modal.classList.add("open");

  document.body.classList.add(
    "modal-open"
  );

}

function closeModal() {

  if (!modal) {
    return;
  }

  modal.classList.remove("open");

  document.body.classList.remove(
    "modal-open"
  );

}

modalClose?.addEventListener(
  "click",
  closeModal
);

// ============================================================
// PANIER
// ============================================================

function openCart() {

  cartOverlay?.classList.add("show");

  cartDrawer?.classList.add("open");

  renderCart();

}

function closeCart() {

  cartOverlay?.classList.remove("show");

  cartDrawer?.classList.remove("open");

}

cartBtn?.addEventListener(
  "click",
  openCart
);

heroCartBtn?.addEventListener(
  "click",
  openCart
);

cartClose?.addEventListener(
  "click",
  closeCart
);

cartOverlay?.addEventListener(
  "click",
  closeCart
);

// ============================================================
// AJOUT PANIER
// ============================================================

function addToCart(
  productId,
  options = {}
) {

  const product =
    getProduct(productId);

  if (!product) {
    toast("Produit introuvable.");
    return;
  }

  const existing =
    findCartItem(
      productId,
      options
    );

  if (existing) {

    existing.quantity =
      Number(existing.quantity || 0) + 1;

  } else {

    cart.push({

      id: productId,

      quantity: 1,

      options: {
        ...options
      }

    });

  }

  saveCart();

  renderCart();

  toast(
    `${product.name} ajouté au panier.`
  );

}

function removeFromCart(
  index
) {

  cart.splice(index, 1);

  saveCart();

  renderCart();

}

function changeCartQuantity(
  index,
  amount
) {

  const item = cart[index];

  if (!item) {
    return;
  }

  item.quantity =
    Number(item.quantity || 0) +
    Number(amount || 0);

  if (item.quantity <= 0) {

    cart.splice(index, 1);

  }

  saveCart();

  renderCart();

}

// ============================================================
// RENDU PANIER
// ============================================================

function renderCart() {

  if (cartBadge) {

    const count =
      getCartCount();

    cartBadge.textContent =
      count;

    cartBadge.style.display =
      count > 0
        ? "inline-flex"
        : "none";

  }

  if (!cartItems) {
    return;
  }

  if (!cart.length) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        <strong>Votre panier est vide</strong>
        <span>Ajoutez des produits pour commencer.</span>
      </div>
    `;

    if (cartTotal) {
      cartTotal.textContent =
        money(0);
    }

    return;

  }

  cartItems.innerHTML =
    cart
      .map((item, index) => {

        const product =
          getProduct(item.id);

        if (!product) {
          return "";
        }

        const quantity =
          Number(item.quantity || 0);

        const subtotal =
          Number(product.price || 0) *
          quantity;

        return `
          <div class="cart-item">

            <div class="cart-item-image">

              ${
                product.image
                  ? `
                    <img
                      src="${escapeAttr(product.image)}"
                      alt="${escapeAttr(product.name)}"
                      onerror="
                        this.onerror=null;
                        this.style.display='none';
                      "
                    >
                  `
                  : ""
              }

            </div>

            <div class="cart-item-info">

              <strong>
                ${escapeHTML(
                  getCartProductName(item)
                )}
              </strong>

              <span>
                ${money(product.price)}
              </span>

              <div class="cart-item-controls">

                <button
                  type="button"
                  data-cart-minus="${index}"
                >
                  −
                </button>

                <span>
                  ${quantity}
                </span>

                <button
                  type="button"
                  data-cart-plus="${index}"
                >
                  +
                </button>

                <button
                  type="button"
                  data-cart-remove="${index}"
                >
                  Supprimer
                </button>

              </div>

              <b>
                ${money(subtotal)}
              </b>

            </div>

          </div>
        `;

      })
      .join("");

  if (cartTotal) {

    cartTotal.textContent =
      money(
        getCartSubtotal()
      );

  }

  cartItems
    .querySelectorAll(
      "[data-cart-minus]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () =>
          changeCartQuantity(
            Number(
              button.dataset.cartMinus
            ),
            -1
          )
      );

    });

  cartItems
    .querySelectorAll(
      "[data-cart-plus]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () =>
          changeCartQuantity(
            Number(
              button.dataset.cartPlus
            ),
            1
          )
      );

    });

  cartItems
    .querySelectorAll(
      "[data-cart-remove]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () =>
          removeFromCart(
            Number(
              button.dataset.cartRemove
            )
          )
      );

    });

}

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
        product =>
          product.category
      )
    )
  ];

  categoriesEl.innerHTML =
    categories
      .map(category => {

        const active =
          category === selectedCategory;

        return `
          <button
            type="button"
            class="
              category-btn
              ${active ? "active" : ""}
            "
            data-category="${escapeAttr(category)}"
          >
            ${escapeHTML(category)}
          </button>
        `;

      })
      .join("");

  categoriesEl
    .querySelectorAll(
      "[data-category]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          selectedCategory =
            button.dataset.category;

          renderCategories();

          renderProducts();

        }
      );

    });

}

// ============================================================
// FILTRAGE
// ============================================================

function getFilteredProducts() {

  let result =
    products.filter(product => {

      const categoryMatch =
        selectedCategory === "Tous" ||
        product.category ===
          selectedCategory;

      const text =
        `${product.name} ${product.category}`
          .toLowerCase();

      const searchMatch =
        !searchValue ||
        text.includes(
          searchValue.toLowerCase()
        );

      return (
        categoryMatch &&
        searchMatch
      );

    });

  if (sortValue === "priceAsc") {

    result.sort(
      (a, b) =>
        Number(a.price) -
        Number(b.price)
    );

  }

  if (sortValue === "priceDesc") {

    result.sort(
      (a, b) =>
        Number(b.price) -
        Number(a.price)
    );

  }

  if (sortValue === "name") {

    result.sort(
      (a, b) =>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );

  }

  if (sortValue === "new") {

    result.sort(
      (a, b) =>
        Number(Boolean(b.new)) -
        Number(Boolean(a.new))
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

  if (productCount) {

    productCount.textContent =
      `${filtered.length} produits`;

  }

  if (!filtered.length) {

    productsGrid.innerHTML = `
      <div class="no-products">
        Aucun produit trouvé.
      </div>
    `;

    return;

  }

  productsGrid.innerHTML =
    filtered
      .map(product => {

        const isFavorite =
          favorites.includes(
            product.id
          );

        return `
          <article
            class="product-card"
            data-product-id="${escapeAttr(product.id)}"
          >

            <div class="product-image">

              ${
                product.image
                  ? `
                    <img
                      src="${escapeAttr(product.image)}"
                      alt="${escapeAttr(product.name)}"
                      loading="lazy"
                      onerror="
                        this.onerror=null;
                        this.style.display='none';
                      "
                    >
                  `
                  : ""
              }

              ${
                product.new
                  ? `
                    <span class="product-new">
                      NOUVEAU
                    </span>
                  `
                  : ""
              }

              <button
                type="button"
                class="favorite-btn ${
                  isFavorite
                    ? "active"
                    : ""
                }"
                data-favorite="${escapeAttr(product.id)}"
                aria-label="Favori"
              >
                ${
                  isFavorite
                    ? "♥"
                    : "♡"
                }
              </button>

            </div>

            <div class="product-info">

              <div class="product-category">
                ${escapeHTML(
                  product.category
                )}
              </div>

              <h3>
                ${escapeHTML(
                  product.name
                )}
              </h3>

              <div class="product-rating">

                <span>
                  ${getRatingStars(
                    product.rating
                  )}
                </span>

                <small>
                  ${product.rating}
                  (${product.reviewCount})
                </small>

              </div>

              <div class="product-bottom">

                <strong class="product-price">
                  ${money(product.price)}
                </strong>

                <button
                  type="button"
                  class="add-product-btn"
                  data-add="${escapeAttr(product.id)}"
                >
                  AJOUTER
                </button>

              </div>

            </div>

          </article>
        `;

      })
      .join("");

  productsGrid
    .querySelectorAll(
      "[data-add]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          const product =
            getProduct(
              button.dataset.add
            );

          if (!product) {
            return;
          }

          if (
            hasRequiredOption(product)
          ) {

            openProduct(
              product.id
            );

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
      "[data-favorite]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          const id =
            button.dataset.favorite;

          if (
            favorites.includes(id)
          ) {

            favorites =
              favorites.filter(
                favoriteId =>
                  favoriteId !== id
              );

          } else {

            favorites.push(id);

          }

          saveFavorites();

          renderProducts();

        }
      );

    });

  productsGrid
    .querySelectorAll(
      ".product-card"
    )
    .forEach(card => {

      card.addEventListener(
        "click",
        () => {

          openProduct(
            card.dataset.productId
          );

        }
      );

    });

}

// ============================================================
// RECHERCHE
// ============================================================

searchInput?.addEventListener(
  "input",
  () => {

    searchValue =
      searchInput.value.trim();

    renderProducts();

  }
);

// ============================================================
// TRI
// ============================================================

sortSelect?.addEventListener(
  "change",
  () => {

    sortValue =
      sortSelect.value;

    renderProducts();

  }
);

// ============================================================
// OUVRIR UN PRODUIT
// ============================================================

function openProduct(id) {

  const product =
    getProduct(id);

  if (!product) {
    return;
  }

  const optionsHTML =
    setupProductOptions(product);

  showModal(
    product.name,
    `

      <div class="product-modal">

        <div class="product-modal-image">

          ${
            product.image
              ? `
                <img
                  src="${escapeAttr(product.image)}"
                  alt="${escapeAttr(product.name)}"
                  onerror="
                    this.onerror=null;
                    this.style.display='none';
                  "
                >
              `
              : ""
          }

        </div>

        <div class="product-modal-info">

          <div class="product-category">
            ${escapeHTML(
              product.category
            )}
          </div>

          <h2>
            ${escapeHTML(
              product.name
            )}
          </h2>

          <div class="product-rating">

            <span>
              ${getRatingStars(
                product.rating
              )}
            </span>

            <span>
              ${product.rating}
              / 5
            </span>

            <small>
              ${product.reviewCount} avis
            </small>

          </div>

          <div class="product-modal-price">
            ${money(product.price)}
          </div>

          ${
            optionsHTML
              ? `
                <div class="product-options">
                  ${optionsHTML}
                </div>
              `
              : ""
          }

          <div class="product-modal-actions">

            <button
              type="button"
              id="modalAddToCart"
              class="primary-btn"
            >
              AJOUTER AU PANIER
            </button>

            <button
              type="button"
              id="modalReviews"
              class="secondary-btn"
            >
              VOIR LES AVIS
            </button>

          </div>

        </div>

      </div>

    `
  );

  $("modalAddToCart")
    ?.addEventListener(
      "click",
      () => {

        const options =
          getSelectedProductOption();

        addToCart(
          product.id,
          options
        );

        closeModal();

      }
    );

  $("modalReviews")
    ?.addEventListener(
      "click",
      () => {

        openProductReviews(
          product.id
        );

      }
    );

}

// ============================================================
// CHARGEMENT INITIAL PARTIE 1
// ============================================================

loadLocalData();

renderCategories();

renderProducts();

renderCart();
// ============================================================
// AVIS
// ============================================================

async function openProductReviews(productId) {

  const product =
    getProduct(productId);

  if (!product) {
    return;
  }

  showModal(
    `Avis - ${product.name}`,
    `
      <div style="
        padding:15px;
        border-radius:14px;
        background:rgba(255,255,255,.04);
        margin-bottom:15px;
      ">

        <div style="
          color:#ffd45a;
          font-size:20px;
          letter-spacing:1px;
        ">
          ${getRatingStars(product.rating)}
        </div>

        <strong>
          ${Number(product.rating).toFixed(1)}/5
        </strong>

        <span style="
          opacity:.6;
          margin-left:6px;
        ">
          ${Number(product.reviewCount).toLocaleString("fr-FR")} avis
        </span>

      </div>

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

    const reviewsQuery =
      query(
        collection(db, "reviews"),
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

    const reviews = [];

    snapshot.forEach(item => {

      reviews.push({
        id: item.id,
        ...item.data()
      });

    });

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

}

// ============================================================
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
            👤 Compte connecté// ============================================================
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
                  créée depuis l’administration.
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


          // ==================================================
          // PAIEMENT PAR CARTE
          // ==================================================

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
                .replace(/\s+/g, "")
                .trim();


            const storedNumber =
              card.number
                .replace(/\s+/g, "")
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
              )
                .trim();


            const enteredCvv =
              (
                $("cardCvv")
                  ?.value || ""
              )
                .trim();


            if (
              enteredNumber !==
                storedNumber ||
              enteredHolder !==
                storedHolder ||
              enteredExpiry !==
                card.expiry ||
              enteredCvv !==
                card.cvv
            ) {

              throw new Error(
                "Les informations de carte sont incorrectes."
              );

            }


            paymentStatus =
              "Payé";

          }


          // ==================================================
          // PRODUITS DE LA COMMANDE
          // ==================================================

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

                id:
                  item.id,

                name:
                  displayName,

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


          // ==================================================
          // COMMANDE FIRESTORE
          // ==================================================

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

            city:
              "",

            status:
              "Enregistrée",

            paymentMethod,

            paymentStatus,

            tracking:
              "",

            estimatedDelivery:
              "",

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


          // ==================================================
          // PAYPAL
          // ==================================================

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
        collection(
          db,
          "orders"
        )
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
