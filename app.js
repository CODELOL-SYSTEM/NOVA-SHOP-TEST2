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
  apiKey: "AIzaSyAZ5vAkAEfIBpfLyhxGgO7uvNdJ67KYKWD0",
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
    name: "Sony DualSense PS5/PC",
    category: "Manettes",
    price: 74.90,
    image: "https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg",
    options: {
      label: "Couleur",
      required: true,
      values: ["Rouge", "Blanc", "Noir", "Bleu"]
    }
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
  },

  {
    id: "p44",
    name: "Apple iPhone 14 Pro 6,1\" 5G Double SIM 128 Go Argent",
    category: "Smartphones",
    price: 400,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/07/3b/32/20069127/1540-1/tsp20260630131025/Apple-iPhone-14-Pro-6-1-5G-Double-SIM-128-Go-Argent.jpg"
  },

  {
    id: "p45",
    name: "Apple iPhone 15 6,1\" 5G Double SIM 128 Go Noir",
    category: "Smartphones",
    price: 750,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/cd/f0/52/22212813/1540-1/tsp20260914144304/Apple-iPhone-15-6-1-5G-Double-SIM-128-Go-Noir.jpg"
  },

  {
    id: "p46",
    name: "Apple iPhone 16 6,1\" 5G 128 Go Double SIM Noir",
    category: "Smartphones",
    price: 949.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/fe/47/66/23480318/3756-1/tsp20260920085557/Apple-iPhone-16-6-1-5G-128-Go-Double-SIM-Noir.jpg"
  },

  {
    id: "p47",
    name: "Apple iPhone 17 6,3\" 5G Double SIM 256 Go Noir",
    category: "Smartphones",
    price: 1000,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/19/86/b6/28739097/3756-1/tsp20260909180923/Apple-iPhone-17-6-3-5G-Double-SIM-256-Go-Noir.jpg"
  },

  {
    id: "p48",
    name: "Apple iPhone 18 Pro 6,3\" 5G Double SIM 256 Go Noir",
    category: "Smartphones",
    price: 1199.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/62/73/c7/29848418/1540-1/tsp20260920091102/Apple-iPhone-18-Pro-6-3-5G-Double-SIM-256-Go-Noir.jpg"
  },

  {
    id: "p49",
    name: "Samsung Galaxy S23 6,1\" 5G 8 Go RAM 256 Go Noir",
    category: "Smartphones",
    price: 230,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/0d/c0/44/21282829/1540-1/tsp20260829031739/Smartphone-Samsung-Galaxy-S23-6-1-Nano-SIM-5G-8-Go-RAM-256-Go-Noir.jpg"
  },

  {
    id: "p50",
    name: "Samsung Galaxy S24 6,2\" 5G 256 Go Noir",
    category: "Smartphones",
    price: 449.90,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/a6/f6/5a/22738598/1540-1/tsp20260319135101/Smartphone-Samsung-Galaxy-S24-6-2-5G-Nano-SIM-256-Go-Noir.jpg"
  },

  {
    id: "p51",
    name: "Samsung Galaxy S25 Edge 6,7\" 5G 256 Go Noir absolu Titane",
    category: "Smartphones",
    price: 469.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/42/7b/ab/28015426/1540-1/tsp20260909180103/Smartphone-Samsung-Galaxy-S25-Edge-6-7-5G-Nano-SIM-256-Go-Noir-absolu-Titane.jpg"
  },

  {
    id: "p52",
    name: "Samsung Galaxy S26 6,3\" 5G 256 Go Noir + Buds4 Noir",
    category: "Smartphones",
    price: 650.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/e8/a2/c7/29860584/1540-1/tsp20260903144909/Pack-Smartphone-Samsung-Galaxy-S26-6-3-5G-Nano-SIM-256-Go-Noir-Buds4-Noir.jpg"
  },

  {
    id: "p53",
    name: "Google Pixel 8 6,2\" 5G Double SIM 128 Go Vert Sauge",
    category: "Smartphones",
    price: 200,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/37/bc/52/22199351/1540-1/tsp20260722081937/Smartphone-Google-Pixel-8-6-2-5G-Double-SIM-128-Go-Vert-Sauge.jpg"
  },

  {
    id: "p54",
    name: "Google Pixel 9 6,3\" 5G Double nano-SIM 128 Go Noir Obsidienne",
    category: "Smartphones",
    price: 400,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/f6/00/6d/23920886/1540-1/tsp20260914084700/Google-Pixel-9-6-3-5G-Double-nano-SIM-128-Go-Noir-Obsidienne.jpg"
  },

  {
    id: "p55",
    name: "Google Pixel 10 6,3\" 5G Double SIM 256 Go Noir Volcanique",
    category: "Smartphones",
    price: 600,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/4a/5f/b3/28532554/1540-1/tsp20260717111851/Google-Pixel-10-6-3-5G-Double-SIM-256-Go-Noir-Volcanique.jpg"
  },

  {
    id: "p56",
    name: "Flashforge Adventurer 5M Pro",
    category: "Imprimantes 3D",
    price: 115,
    image: "https://www.makershop.fr/cdn/shop/files/13458.jpg?v=1760745366&width=150"
  },

  {
    id: "p57",
    name: "Elegoo Centauri 2",
    category: "Imprimantes 3D",
    price: 200,
    image: "https://fr.elegoo.com/cdn/shop/files/C2-_-260811.jpg?crop=center&v=1786696280&width=345"
  },

  {
    id: "p58",
    name: "Anycubic Photon P1 Max",
    category: "Imprimantes 3D",
    price: 600,
    image: "https://fr.anycubic.com/cdn/shop/files/P1M_8bd4d344-b751-4497-a535-4e647ecef572.jpg?v=1784100048&width=150"
  },

  {
    id: "p59",
    name: "GTA VI Key PlayStation",
    category: "Logiciels & licences",
    price: 0,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ9VsG_IxAanmrCSqCyACtuyCqCD5rwiQ3P3Iylexch3XnCT4sevDBCz-vnqlVCBvZroOpYIX9T0Flc8EzGSZuyPMibCcQm"
  },

  {
    id: "p60",
    name: "Microsoft Windows 11 Pro Key",
    category: "Logiciels & licences",
    price: 0,
    image: "https://imgproxy.eneba.games/0A9PW8DP7_YSTA-WUru4IVJnFXsKikaoYM5RHNb3nHQ/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy93/YUFhcnZicFhzSm8yNjZSZ3hKSVpuYjVX/ZzRkVWY3a3YyUDQx/bm1nakJjLnBuZw"
  },

  {
    id: "p61",
    name: "AsiaHorse Aurora-CO Gaines de Câble ARGB",
    category: "Accessoires composants PC",
    price: 15.99,
    image: "https://m.media-amazon.com/images/I/71NF0H-6FXL._SL1500_.jpg"
  },

  {
    id: "p62",
    name: "Câble vidéo Accsup HDMI 2.0 4K UHD avec Ethernet 5 m Noir",
    category: "Adaptateurs / câbles / chargeurs",
    price: 12.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/db/90/4a/21663963/1540-1/tsp20260909104107/Cable-video-Accsup-HDMI-2-0-4K-UHD-avec-Ethernet-5-m-Noir.jpg"
  },

  {
    id: "p63",
    name: "Cable Relier ecran pour pc Certifié Câble DP vers DP 10K 240Hz",
    category: "Adaptateurs / câbles / chargeurs",
    price: 0,
    image: "https://m.media-amazon.com/images/I/71BeNtX7nuL._SL1500_.jpg"
  },

  {
    id: "p64",
    name: "Câble USB-C ESSENTIELB vers USB-C 1M Noir",
    category: "Adaptateurs / câbles / chargeurs",
    price: 1,
    image: "https://boulanger.scene7.com/is/image/Boulanger/3497674179939_h_f_l_2?wid=2140&hei=2140&resMode=sharp2&op_usm=1.75,0.3,2,0&fmt=png-alpha"
  },

  {
    id: "p65",
    name: "Cables USB Accsup CABLE USB-C VERS USB-A 1M NOIR",
    category: "Adaptateurs / câbles / chargeurs",
    price: 1,
    image: ""
  },

  {
    id: "p66",
    name: "Câble USB-C vers Lightning pour Apple iPhone/iPad/iPod 1m Blanc",
    category: "Adaptateurs / câbles / chargeurs",
    price: 1,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/a6/b8/07/17283238/1540-1/tsp20260617130730/Cable-USB-C-vers-Lightning-pour-Apple-iPhone-iPad-iPod-1m-Blanc.jpg"
  },

  {
    id: "p67",
    name: "BSTOEM pour Apple Watch Chargeur, Station de Charge USB C Magnétique 1M",
    category: "Adaptateurs / câbles / chargeurs",
    price: 2.99,
    image: "https://m.media-amazon.com/images/I/61rGkIZqqCL._SL1500_.jpg"
  },

  {
    id: "p68",
    name: "StarTech Cordon d'alimentation PC de 1m - CEE 7/7 à C13",
    category: "Adaptateurs / câbles / chargeurs",
    price: 4.50,
    image: "https://m.media-amazon.com/images/I/81b1fyIWcOL._AC_SL1500_.jpg"
  },

  {
    id: "p69",
    name: "Unicavu Webcam PC 2K 30 FPS Full HD 1080P",
    category: "Caméras & webcams",
    price: 10,
    image: "https://m.media-amazon.com/images/I/61CJsbKfonL._AC_SL1500_.jpg"
  },

  {
    id: "p70",
    name: "eMeet Nova 4K Webcam 4K Ultra HD avec 2 Microphones",
    category: "Caméras & webcams",
    price: 23.99,
    image: "https://m.media-amazon.com/images/I/61bCeQBjUwL._AC_SL1500_.jpg"
  },

  {
    id: "p71",
    name: "Quntis Lampe Écran Pc RGB, Monitor Light Bar IM 40 cm Noir",
    category: "Barres lumineuses pour écran",
    price: 8.99,
    image: "https://m.media-amazon.com/images/I/71ESgk4ETPL._AC_SL1500_.jpg"
  },

  {
    id: "p72",
    name: "TONOR Micro Cardioïde Dynamique USB/XLR TD510+",
    category: "Microphones",
    price: 20.99,
    image: "https://m.media-amazon.com/images/I/61EZnm+ijZL._AC_SL1500_.jpg"
  },

  {
    id: "p73",
    name: "BONTEC Bras Ecran PC à Ressort à Gaz, 13-32 Pouces",
    category: "Supports écrans / écrans / TV",
    price: 16,
    image: "https://m.media-amazon.com/images/I/61gjjZxKbeL._AC_SL1500_.jpg"
  },

  {
    id: "p74",
    name: "BONTEC Support Ecran PC 2 Ecran Articulé à Ressort à Gaz, 13-32 Pouces",
    category: "Supports écrans / écrans / TV",
    price: 0,
    image: "https://m.media-amazon.com/images/I/71kZjwcU4SL._AC_SL1500_.jpg"
  },

  {
    id: "p75",
    name: "BONTEC Bras Ecran PC Mural à Ressort à Gaz, 13-42 Pouces, Charge 38kg",
    category: "Supports écrans / écrans / TV",
    price: 0,
    image: "https://m.media-amazon.com/images/I/71-oseIdQXL._AC_SL1500_.jpg"
  },

  {
    id: "p76",
    name: "KTC Écran PC Gamer Incurvé 24 Pouces FHD 240 Hz (VESA 100×100 mm)",
    category: "Supports écrans / écrans / TV",
    price: 80,
    image: "https://m.media-amazon.com/images/I/71wUlFXcaZL._AC_SL1500_.jpg"
  },

  {
    id: "p77",
    name: "KTC Écran PC Gamer Incurvé 27 Pouces QHD 180Hz (OC 185Hz) H27S5 (VESA 100×100 mm)",
    category: "Supports écrans / écrans / TV",
    price: 110,
    image: "https://m.media-amazon.com/images/I/61Rehn5YTWL._AC_SL1000_.jpg"
  },

  {
    id: "p78",
    name: "HKC Écran PC Gaming 34 Pouces Incurvé UWQHD 120 Hz HDR400 (VESA 100×100 mm)",
    category: "Supports écrans / écrans / TV",
    price: 170,
    image: "https://m.media-amazon.com/images/I/71useoNrGEL._AC_SL1500_.jpg"
  },

  {
    id: "p79",
    name: "HKC 27 Pouces Ecran Gaming 4K Dual Mode UHD 160Hz / FHD 320Hz G27H7P (VESA 100×100 mm)",
    category: "Supports écrans / écrans / TV",
    price: 140,
    image: "https://m.media-amazon.com/images/I/81MjOWRE0SL._AC_SL1500_.jpg"
  },

  {
    id: "p80",
    name: "XIAOMI TV F 65 Pouces 2025 4K UHD Smart TV",
    category: "Supports écrans / écrans / TV",
    price: 249.99,
    image: "https://m.media-amazon.com/images/I/61Jk8xxkLZL._AC_SL1000_.jpg"
  },

  {
    id: "p81",
    name: "Xbox Manette sans fil",
    category: "Manettes & consoles",
    price: 59.99,
    image: "https://m.media-amazon.com/images/I/71fQ5g9X8PL._AC_SL1500_.jpg",
    options: {
      label: "Couleur",
      required: true,
      values: ["Rose", "Bleu", "Noir", "Rouge", "Blanc", "Vert"]
    }
  },

  {
    id: "p82",
    name: "PlayStation 5 avec 1 Manette Sans Fil DualSense",
    category: "Manettes & consoles",
    price: 320,
    image: "https://m.media-amazon.com/images/I/61h7VjYt-fL._AC_SL1500_.jpg",
    options: {
      label: "Console",
      required: true,
      values: ["PS5 avec lecteur", "PS5 Pro"]
    }
  },

  {
    id: "p83",
    name: "Xbox Series X - 1TB Digital Edition avec 1 manette sans fil",
    category: "Manettes & consoles",
    price: 599.99,
    image: "https://m.media-amazon.com/images/I/51OVjV4-GqL._AC_SL1500_.jpg"
  },

  {
    id: "p84",
    name: "Xbox Series S - All Digital Gaming Console - 512GB SSD",
    category: "Manettes & consoles",
    price: 500,
    image: "https://m.media-amazon.com/images/I/61PI59RfWvL._AC_SX425_.jpg"
  },

  // ==========================================================
  // P85 À P105
  // ==========================================================

  {
    id: "p85",
    name: "AMD Ryzen 7 7800X3D Processeur avec La Technologie 3D V-Cache",
    category: "Composants PC",
    price: 210,
    image: "https://m.media-amazon.com/images/I/51HqC0rU9HL._AC_SL1500_.jpg"
  },

  {
    id: "p86",
    name: "Gigabyte GeForce RTX 5060 Gaming OC 8 GB GDDR7 Carte Graphique",
    category: "Composants PC",
    price: 370,
    image: "https://owp.klarna.com/product/3255091236/Gigabyte-GeForce-RTX-5060-Gaming-OC-8-GB-GDDR7-Carte-Graphique.jpg"
  },

  {
    id: "p87",
    name: "Kingston Fury Beast 16 Go (kit de 2 x 8 Go) DDR4 3200 MHz CL16",
    category: "Composants PC",
    price: 130,
    image: "https://media.carrefour.fr/medias/200b40feb62d42f6a4c771cda396d77b/p_1500x1500/243be29db1e34fc180ed7c680853713a_image.jpg"
  },

  {
    id: "p88",
    name: "Kingston Fury Beast RGB - 2 x 8 Go (16 Go) - DDR5 5600 MHz - CL40",
    category: "Composants PC",
    price: 224.99,
    image: "https://media.materiel.net/r1600/products/MN0005959138_0005959149_0005959155.jpg"
  },

  {
    id: "p89",
    name: "PC de bureau gaming NitroPC Avancé - AMD Ryzen 5 3400G, Radeon Graphics, 16 GB RAM, 480 GB SSD, Windows 11 Pro",
    category: "PC Gamer préconstruits",
    price: 400,
    image: "https://media.cdn.kaufland.de/product-images/1024x1024/57311bd00475df1753bd85ef932af8d2.webp"
  },

  {
    id: "p90",
    name: "PC Gamer FIREFLY",
    category: "PC Gamer préconstruits",
    price: 500,
    image: "https://powerlab.fr/24081-large_default/pc-gamer-firefly-rtx-5060-ti.jpg"
  },

  {
    id: "p91",
    name: "PC - CSL Sprint 5700 (Ryzen 7)",
    category: "PC Gamer préconstruits",
    price: 700,
    image: "https://www.csl-computer.com/fr/media/catalog/product/cache/5/image/3000x3000/9df78eab33525d08d6e5fb8d27136e95/c/s/csl_aerovision-haupt_c40_nvidia_rot_3000px_3.webp"
  },

  {
    id: "p92",
    name: "STGsivir PC Gamer Fixe, Ryzen 5 3400G, Vega 11, 16G DDR4, 512G SSD",
    category: "PC Gamer préconstruits",
    price: 499.99,
    image: "https://m.media-amazon.com/images/I/71klP2vcMEL._AC_SL1500_.jpg"
  },

  {
    id: "p93",
    name: "Unité centrale Gamer MSI EDM0009-R5/RTX 5060/16Go/480Go",
    category: "PC Gamer préconstruits",
    price: 565.99,
    image: "https://www.electrodepot.fr/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/P10019951.jpg"
  },

  {
    id: "p94",
    name: "ROG Strix G16 (2025) G615",
    category: "PC portables Gaming & Travail",
    price: 1200,
    image: "https://dlcdnwebimgs.asus.com/gain/E20134EE-F6B3-4AB7-A1B5-73795E91011D/w717/h525/fwebp"
  },

  {
    id: "p95",
    name: "PC Portable HP OmniBook 3 17-dk0006nf",
    category: "PC portables Gaming & Travail",
    price: 600,
    image: "https://www.hp.com/fr-fr/shop/media/catalog/product/c/o/costa_17_dfplus_ob3_cs_glaciersilver_t_nt_fhd_ir_non-backlit_freedos_catalog_front_5964372_cus_1.png?store=fr-fr&image-type=image&auto=avif&quality=100&format=jpg&bg-color=ffffff&type=image-product&width=100p&fit=bounds"
  },

  {
    id: "p96",
    name: "PC portable HP Victus by HP Laptop 16-d1148nf",
    category: "PC portables Gaming & Travail",
    price: 500,
    image: "https://image.darty.com/darty?type=image&source=photos/2022/10/26/7081693A_163303179.jpg&height=457"
  },

  {
    id: "p97",
    name: "Razer BlackWidow V4 Pro (Switches Jaune) - Clavier Gamer Mécanique Snap Tap, 8 Touches Macro, Repose-Poignet, AZERTY FR",
    category: "Claviers",
    price: 76.99,
    image: "https://m.media-amazon.com/images/I/81az+Oft-qL._AC_SL1500_.jpg"
  },

  {
    id: "p98",
    name: "SteelSeries Apex Pro TKL Gen 3 – Commutateurs magnétiques analogiques OmniPoint 3.0, OLED, RGB, USB-C, FR AZERTY",
    category: "Claviers",
    price: 44.90,
    image: "https://m.media-amazon.com/images/I/719h65mTOEL._AC_SL1500_.jpg"
  },

  {
    id: "p99",
    name: "ROG Strix Scope II 96 WL - Clavier gaming 96%, switches mécaniques, AZERTY",
    category: "Claviers",
    price: 40,
    image: "https://m.media-amazon.com/images/I/71zmZbiUeAL._AC_SL1500_.jpg"
  },

  {
    id: "p100",
    name: "CORSAIR K70 PRO TKL - Clavier gaming programmable à effet Hall hautes performances avec déclenchement rapide (FR)",
    category: "Claviers",
    price: 56,
    image: "https://assets.corsair.com/image/upload/c_pad,q_85,h_1100,w_1100/products/Gaming-Keyboards/K70-PRO-TKL-APAC/Gallery/CH-911911G-JP/K70_PRO_TKL_BLACK_03.webp"
  },

  {
    id: "p101",
    name: "Razer Viper V3 Pro",
    category: "Souris",
    price: 42,
    image: "https://assets3.razerzone.com/02qK-glNv1jIlWfqTGAu7tkinI8=/1500x1000/https%3A%2F%2Fmedias-p1.phoenix.razer.com%2Fsys-master-phoenix-images-container%2Fhf0%2Fhba%2F9926492422174%2F250630-viper-v3-pro-faker-1500x1000-1.jpg"
  },

  {
    id: "p102",
    name: "SteelSeries Aerox 5 Wireless",
    category: "Souris",
    price: 50,
    image: "https://images.ctfassets.net/hmm5mo4qf4mf/Y5b4NuEOsLlGhzxCjj9Vf/697e03b1c784f66cb82b3a529964666f/aerox_5_wl_black_img_buy_01.png__1920x1080_crop-fit_optimize_subsampling-2-900.png?fm=webp&q=90&fit=scale&w=1200"
  },

  {
    id: "p103",
    name: "Razer Gigantus V2 XXL - Tapis de souris gaming souple 940 x 410 x 4mm",
    category: "Tapis de souris",
    price: 15,
    image: "https://m.media-amazon.com/images/I/61HtU7NkHQL._AC_SL1500_.jpg"
  },

  {
    id: "p104",
    name: "Logitech G840 Tapis de Souris de Jeu Extra Large - 900 x 400 x 3 mm",
    category: "Tapis de souris",
    price: 30,
    image: "https://m.media-amazon.com/images/I/51jlC3sL0BL._AC_SL1500_.jpg"
  },

  {
    id: "p105",
    name: "SteelSeries QcK Heavy XXL - Tapis de souris gaming en tissu - Base antidérapante 6mm",
    category: "Tapis de souris",
    price: 15,
    image: "https://m.media-amazon.com/images/I/41HRqeeyZ0L._AC_SL1500_.jpg"
  }

];

// ============================================================
// NOTES AUTOMATIQUES
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

try {

  cart = JSON.parse(
    localStorage.getItem("novaCart") || "[]"
  );

  if (!Array.isArray(cart)) {
    cart = [];
  }

} catch {

  cart = [];

}

try {

  favorites = JSON.parse(
    localStorage.getItem("novaFavorites") || "[]"
  );

  if (!Array.isArray(favorites)) {
    favorites = [];
  }

} catch {

  favorites = [];

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

      const product = getProduct(item.id);

      if (!product) {
        return total;
      }

      return (
        total +
        Number(product.price || 0) *
        Number(item.quantity || 1)
      );

    },
    0
  );

}

// ============================================================
// VARIANTES / OPTIONS
// ============================================================

function hasRequiredOption(product) {

  return !!(
    product?.options?.required &&
    Array.isArray(product.options.values) &&
    product.options.values.length
  );

}

function getCartProductName(item) {

  const product = getProduct(item.id);

  const name =
    product?.name ||
    item.name ||
    "Produit";

  if (item.option) {
    return `${name} (${item.option})`;
  }

  return name;

}

function findCartItem(id, option = "") {

  return cart.find(
    item =>
      item.id === id &&
      (item.option || "") === option
  );

}

function showProductOptions(
  product,
  containerId = "productOptions"
) {

  if (!hasRequiredOption(product)) {
    return "";
  }

  return `
    <div
      id="${escapeAttr(containerId)}"
      style="
        margin:15px 0;
        padding:14px;
        border-radius:14px;
        background:rgba(255,255,255,.045);
      "
    >

      <strong style="
        display:block;
        margin-bottom:10px;
      ">
        ${escapeHTML(product.options.label)}
      </strong>

      <div style="
        display:flex;
        flex-wrap:wrap;
        gap:8px;
      ">

        ${
          product.options.values.map(
            value => `
              <button
                type="button"
                class="view-btn product-option"
                data-option="${escapeAttr(value)}"
                style="
                  flex:1 1 110px;
                  min-width:100px;
                "
              >
                ${escapeHTML(value)}
              </button>
            `
          ).join("")
        }

      </div>

      <div
        id="${escapeAttr(containerId)}Error"
        style="
          display:none;
          color:#ff7777;
          margin-top:10px;
          font-size:13px;
        "
      >
        Choisis une option avant d'ajouter au panier.
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
  containerId = "productOptions"
) {

  const container = $(containerId);

  if (!container) {
    return;
  }

  const input = $(`${containerId}Value`);
  const error = $(`${containerId}Error`);

  container
    .querySelectorAll(".product-option")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          container
            .querySelectorAll(".product-option")
            .forEach(item => {

              item.classList.remove("selected");
              item.style.border = "";

            });

          button.classList.add("selected");

          button.style.border =
            "2px solid var(--accent,#2d8cff)";

          if (input) {
            input.value =
              button.dataset.option || "";
          }

          if (error) {
            error.style.display = "none";
          }

        }
      );

    });

}

function getSelectedProductOption(
  containerId = "productOptions"
) {

  return (
    $(`${containerId}Value`)?.value.trim() ||
    ""
  );

}

// ============================================================
// ÉTOILES
// ============================================================

function getRatingStars(rating) {

  const value = Math.max(
    1,
    Math.min(
      5,
      Number(rating || 4.2)
    )
  );

  const full = Math.round(value);

  return (
    "★".repeat(full) +
    "☆".repeat(5 - full)
  );

}

// ============================================================
// TOAST
// ============================================================

function toast(message, type = "info") {

  if (!toastContainer) {
    return;
  }

  const item =
    document.createElement("div");

  item.className =
    `toast-item toast-${type}`;

  item.textContent = message;

  item.style.cssText = `
    padding:12px 16px;
    margin-top:10px;
    border-radius:12px;
    background:#111827;
    color:white;
    border:1px solid rgba(255,255,255,.1);
    box-shadow:0 10px 30px rgba(0,0,0,.35);
    animation:novaToastIn .2s ease;
  `;

  toastContainer.appendChild(item);

  setTimeout(() => {

    item.style.opacity = "0";

    setTimeout(() => {
      item.remove();
    }, 250);

  }, 2800);

}

// ============================================================
// MODAL
// ============================================================

function showModal(title, content) {

  if (!modal) {
    return;
  }

  if (modalTitle) {
    modalTitle.textContent = title;
  }

  if (modalContent) {
    modalContent.innerHTML = content;
  }

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

}

function closeModal() {

  if (!modal) {
    return;
  }

  modal.style.display = "none";
  document.body.style.overflow = "";

}

modalClose?.addEventListener(
  "click",
  closeModal
);

// ============================================================
// PANIER
// ============================================================

function openCart() {

  if (!cartDrawer) {
    return;
  }

  renderCart();

  cartDrawer.classList.add("open");
  cartOverlay?.classList.add("open");

}

function closeCart() {

  cartDrawer?.classList.remove("open");
  cartOverlay?.classList.remove("open");

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

function addToCart(id, option = null) {

  const product = getProduct(id);

  if (!product) {
    return false;
  }

  if (hasRequiredOption(product) && !option) {

    openProduct(id);

    toast(
      `Choisis ${product.options.label.toLowerCase()} avant d'ajouter.`,
      "error"
    );

    return false;
  }

  const safeOption = option || "";

  const existing =
    findCartItem(
      id,
      safeOption
    );

  if (existing) {

    existing.quantity =
      Number(existing.quantity || 0) + 1;

  } else {

    cart.push({
      id,
      option: safeOption,
      quantity: 1
    });

  }

  saveCart();
  renderCart();

  toast(
    `${getCartProductName({
      id,
      option: safeOption
    })} ajouté au panier 🛒`,
    "success"
  );

  return true;

}

function removeFromCart(id, option = "") {

  cart = cart.filter(
    item =>
      !(
        item.id === id &&
        (item.option || "") === option
      )
  );

  saveCart();
  renderCart();

}

function changeCartQuantity(
  id,
  quantity,
  option = ""
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

// ============================================================
// AFFICHAGE PANIER
// ============================================================

function renderCart() {

  if (cartBadge) {
    cartBadge.textContent =
      getCartCount();
  }

  if (!cartItems) {
    return;
  }

  if (!cart.length) {

    cartItems.innerHTML = `
      <div style="
        text-align:center;
        padding:30px 15px;
        opacity:.75;
      ">
        <div style="font-size:45px;">
          🛒
        </div>

        <h3>
          Ton panier est vide
        </h3>

        <p>
          Ajoute des produits pour commencer.
        </p>
      </div>
    `;

    cartTotal &&
      (cartTotal.textContent = money(0));

    checkoutBtn &&
      (checkoutBtn.disabled = true);

    return;
  }

  cartItems.innerHTML =
    cart.map(item => {

      const product =
        getProduct(item.id);

      if (!product) {
        return "";
      }

      const quantity =
        Number(item.quantity || 1);

      const optionText =
        item.option
          ? ` (${escapeHTML(item.option)})`
          : "";

      const imageHTML =
        product.image
          ? `
            <img
              src="${escapeAttr(product.image)}"
              alt="${escapeHTML(product.name)}"
              style="
                width:100%;
                height:100%;
                object-fit:contain;
                display:block;
              "
              onerror="
                this.onerror=null;
                this.style.display='none';
              "
            >
          `
          : "";

      return `
        <div style="
          display:grid;
          grid-template-columns:70px 1fr;
          gap:12px;
          padding:12px 0;
          border-bottom:1px solid rgba(255,255,255,.08);
        ">

          <div style="
            width:70px;
            height:60px;
            display:flex;
            align-items:center;
            justify-content:center;
            overflow:hidden;
            border-radius:10px;
            background:rgba(255,255,255,.04);
          ">
            ${imageHTML}
          </div>

          <div>

            <strong style="
              display:block;
              font-size:14px;
              line-height:1.3;
            ">
              ${escapeHTML(product.name)}
              ${optionText}
            </strong>

            <div style="
              margin-top:5px;
              color:var(--accent,#2d8cff);
              font-weight:700;
            ">
              ${money(product.price)}
            </div>

            <div style="
              display:flex;
              align-items:center;
              gap:7px;
              margin-top:8px;
            ">

              <button
                type="button"
                class="view-btn cart-minus"
                data-id="${escapeAttr(item.id)}"
                data-option="${escapeAttr(item.option || "")}"
              >
                −
              </button>

              <strong>
                ${quantity}
              </strong>

              <button
                type="button"
                class="view-btn cart-plus"
                data-id="${escapeAttr(item.id)}"
                data-option="${escapeAttr(item.option || "")}"
              >
                +
              </button>

              <button
                type="button"
                class="view-btn cart-remove"
                data-id="${escapeAttr(item.id)}"
                data-option="${escapeAttr(item.option || "")}"
                style="margin-left:auto;"
              >
                Supprimer
              </button>

            </div>

          </div>

        </div>
      `;

    }).join("");

  if (cartTotal) {
    cartTotal.textContent =
      money(getCartSubtotal());
  }

  if (checkoutBtn) {
    checkoutBtn.disabled = false;
  }

  cartItems
    .querySelectorAll(".cart-minus")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.id;

          const option =
            button.dataset.option || "";

          const item =
            findCartItem(id, option);

          if (!item) {
            return;
          }

          if (Number(item.quantity) <= 1) {

            removeFromCart(id, option);

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

  cartItems
    .querySelectorAll(".cart-plus")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.id;

          const option =
            button.dataset.option || "";

          const item =
            findCartItem(id, option);

          if (item) {

            changeCartQuantity(
              id,
              Number(item.quantity) + 1,
              option
            );

          }

        }
      );

    });

  cartItems
    .querySelectorAll(".cart-remove")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          removeFromCart(
            button.dataset.id,
            button.dataset.option || ""
          );

        }
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
        product => product.category
      )
    )
  ];

  categoriesEl.innerHTML =
    categories.map(
      category => `
        <button
          type="button"
          class="category-btn ${
            category === selectedCategory
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
    .querySelectorAll(".category-btn")
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
// FILTRES
// ============================================================

function getFilteredProducts() {

  let result =
    products.filter(product => {

      const categoryMatch =
        selectedCategory === "Tous" ||
        product.category === selectedCategory;

      const searchMatch =
        !searchValue ||
        product.name
          .toLowerCase()
          .includes(
            searchValue.toLowerCase()
          );

      return (
        categoryMatch &&
        searchMatch
      );

    });

  if (
    sortValue === "priceAsc" ||
    sortValue === "price-low"
  ) {

    result.sort(
      (a, b) =>
        Number(a.price || 0) -
        Number(b.price || 0)
    );

  } else if (
    sortValue === "priceDesc" ||
    sortValue === "price-high"
  ) {

    result.sort(
      (a, b) =>
        Number(b.price || 0) -
        Number(a.price || 0)
    );

  } else if (
    sortValue === "name"
  ) {

    result.sort(
      (a, b) =>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );

  } else if (
    sortValue === "new"
  ) {

    result.sort(
      (a, b) =>
        Number(!!b.new) -
        Number(!!a.new)
    );

  }

  return result;

}

// ============================================================
// AFFICHAGE PRODUITS
// ============================================================

function renderProducts() {

  if (!productsGrid) {
    return;
  }

  const filtered =
    getFilteredProducts();

  if (productCount) {

    productCount.textContent =
      `${filtered.length} produit${
        filtered.length > 1
          ? "s"
          : ""
      }`;

  }

  if (!filtered.length) {

    productsGrid.innerHTML = `
      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:40px;
      ">
        <div style="font-size:50px;">
          🔎
        </div>

        <h3>
          Aucun produit trouvé
        </h3>

        <p>
          Essaie une autre recherche.
        </p>
      </div>
    `;

    return;
  }

  productsGrid.innerHTML =
    filtered.map(product => {

      const isFavorite =
        favorites.includes(product.id);

      const rating =
        Number(product.rating || 4.2);

      const reviewCount =
        Number(product.reviewCount || 1248);

      const imageHTML =
        product.image
          ? `
            <img
              class="product-image"
              src="${escapeAttr(product.image)}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              style="
                display:block;
                width:auto !important;
                height:auto !important;
                max-width:90% !important;
                max-height:110px !important;
                object-fit:contain !important;
                object-position:center;
                margin:auto;
              "
              onerror="
                this.onerror=null;
                this.style.display='none';
              "
            >
          `
          : "";

      return `
        <article
          class="product-card"
          data-product-id="${escapeAttr(product.id)}"
          style="overflow:hidden;"
        >

          <div
            class="product-image-wrap"
            style="
              width:100%;
              height:120px !important;
              min-height:120px !important;
              max-height:120px !important;
              display:flex;
              align-items:center;
              justify-content:center;
              overflow:hidden;
              border-radius:12px;
              background:rgba(255,255,255,.035);
              margin-bottom:10px;
            "
          >
            ${imageHTML}
          </div>

          <div
            class="product-info"
            style="min-width:0;"
          >

            ${
              product.new
                ? `
                  <span style="
                    display:inline-block;
                    padding:4px 7px;
                    border-radius:7px;
                    background:rgba(37,214,149,.12);
                    color:#25d695;
                    font-size:10px;
                    font-weight:800;
                    margin-bottom:6px;
                  ">
                    NOUVEAU
                  </span>
                `
                : ""
            }

            <div style="
              color:var(--muted,#8c96a8);
              font-size:11px;
              margin-bottom:4px;
            ">
              ${escapeHTML(product.category)}
            </div>

            <h3 style="
              font-size:14px;
              line-height:1.25;
              margin:0;
              min-height:35px;
            ">
              ${escapeHTML(product.name)}
            </h3>

            <div style="
              display:flex;
              align-items:center;
              gap:6px;
              margin-top:7px;
              white-space:nowrap;
            ">

              <span style="
                color:#ffd45a;
                font-size:13px;
                letter-spacing:1px;
              ">
                ${getRatingStars(rating)}
              </span>

              <strong style="
                font-size:12px;
              ">
                ${rating.toFixed(1)}
              </strong>

              <span style="
                opacity:.58;
                font-size:11px;
              ">
                (${reviewCount.toLocaleString("fr-FR")})
              </span>

            </div>

            <div style="
              display:flex;
              align-items:center;
              justify-content:space-between;
              gap:8px;
              margin-top:8px;
            ">

              <strong style="
                font-size:17px;
                color:var(--accent,#2d8cff);
              ">
                ${money(product.price)}
              </strong>

              <button
                type="button"
                class="favorite-btn"
                data-favorite="${escapeAttr(product.id)}"
                title="Favori"
                style="
                  border:0;
                  background:transparent;
                  cursor:pointer;
                  font-size:17px;
                "
              >
                ${isFavorite ? "❤️" : "🤍"}
              </button>

            </div>

            <div style="
              display:grid;
              grid-template-columns:1fr;
              gap:6px;
              margin-top:9px;
            ">

              <button
                type="button"
                class="add-btn product-add"
                data-add="${escapeAttr(product.id)}"
                style="
                  width:100%;
                  padding:8px 10px;
                  font-size:12px;
                "
              >
                Ajouter
              </button>

              <button
                type="button"
                class="view-btn product-view"
                data-view="${escapeAttr(product.id)}"
                style="
                  width:100%;
                  padding:7px 10px;
                  font-size:12px;
                "
              >
                Voir
              </button>

            </div>

          </div>

        </article>
      `;

    }).join("");

  productsGrid
    .querySelectorAll("[data-add]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const product =
            getProduct(button.dataset.add);

          if (!product) {
            return;
          }

          if (hasRequiredOption(product)) {

            openProduct(product.id);

            toast(
              `Choisis ${product.options.label.toLowerCase()} avant d'ajouter.`,
              "info"
            );

            return;
          }

          addToCart(product.id);

        }
      );

    });

  productsGrid
    .querySelectorAll("[data-view]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          openProduct(
            button.dataset.view
          );

        }
      );

    });

  productsGrid
    .querySelectorAll("[data-favorite]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.favorite;

          if (favorites.includes(id)) {

            favorites =
              favorites.filter(
                item => item !== id
              );

          } else {

            favorites.push(id);

          }

          saveFavorites();
          renderProducts();

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
// PRODUIT
// ============================================================

function openProduct(id) {

  const product = getProduct(id);

  if (!product) {
    return;
  }

  const rating =
    Number(product.rating || 4.2);

  const reviewCount =
    Number(product.reviewCount || 1248);

  const imageHTML =
    product.image
      ? `
        <img
          src="${escapeAttr(product.image)}"
          alt="${escapeHTML(product.name)}"
          style="
            width:auto;
            height:auto;
            max-width:90%;
            max-height:165px;
            object-fit:contain;
          "
          onerror="
            this.onerror=null;
            this.style.display='none';
          "
        >
      `
      : "";

  showModal(
    product.name,
    `
      <div>

        <div style="
          width:100%;
          height:180px;
          display:flex;
          align-items:center;
          justify-content:center;
          overflow:hidden;
          border-radius:15px;
          background:rgba(255,255,255,.04);
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

        <h2>
          ${escapeHTML(product.name)}
        </h2>

        <div style="
          display:flex;
          align-items:center;
          gap:7px;
          margin-top:10px;
        ">

          <span style="
            color:#ffd45a;
            font-size:19px;
            letter-spacing:1px;
          ">
            ${getRatingStars(rating)}
          </span>

          <strong>
            ${rating.toFixed(1)}/5
          </strong>

          <span style="opacity:.6;">
            ${reviewCount.toLocaleString("fr-FR")} avis
          </span>

        </div>

        <div style="
          font-size:24px;
          font-weight:800;
          color:var(--accent,#2d8cff);
          margin:12px 0;
        ">
          ${money(product.price)}
        </div>

        ${showProductOptions(product)}

        <button
          type="button"
          class="add-btn"
          id="modalAddProduct"
          style="width:100%;"
        >
          🛒 Ajouter au panier
        </button>

        <button
          type="button"
          class="view-btn"
          id="modalReviews"
          style="
            width:100%;
            margin-top:8px;
          "
        >
          ⭐ Voir les avis
        </button>

      </div>
    `
  );

  setupProductOptions();

  $("modalAddProduct")
    ?.addEventListener(
      "click",
      () => {

        const option =
          getSelectedProductOption();

        if (
          hasRequiredOption(product) &&
          !option
        ) {

          $("productOptionsError") &&
            (
              $("productOptionsError").style.display =
                "block"
            );

          toast(
            `Choisis ${product.options.label.toLowerCase()} avant d'ajouter.`,
            "error"
          );

          return;
        }

        if (
          addToCart(
            product.id,
            option
          )
        ) {

          closeModal();

        }

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
      await getDocs(reviewsQuery);

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
              Number(review.rating || 5)
            )
          );

        const stars =
          "★".repeat(
            Math.round(rating)
          ) +
          "☆".repeat(
            5 - Math.round(rating)
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
          $("loginEmail")?.value.trim() || "";

        const password =
          $("loginPassword")?.value || "";

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
       
