// ============================================================
// NOVASHOP - APP.JS
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
    name:"Sony DualSense PS5/PC",
    category:"Manettes",
    price:74.90,
    image:"https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg",
    options:{
      "Couleur":["Rouge","Blanc","Noir","Bleu"]
    }
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
  },

  {
    id:"p44",
    name:"Apple iPhone 14 Pro 6,1\" 5G Double SIM 128 Go Argent",
    category:"Smartphones",
    price:400,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/07/3b/32/20069127/1540-1/tsp20260630131025/Apple-iPhone-14-Pro-6-1-5G-Double-SIM-128-Go-Argent.jpg"
  },

  {
    id:"p45",
    name:"Apple iPhone 15 6,1\" 5G Double SIM 128 Go Noir",
    category:"Smartphones",
    price:750,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/cd/f0/52/22212813/1540-1/tsp20260914144304/Apple-iPhone-15-6-1-5G-Double-SIM-128-Go-Noir.jpg"
  },

  {
    id:"p46",
    name:"Apple iPhone 16 6,1\" 5G 128 Go Double SIM Noir",
    category:"Smartphones",
    price:949.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/fe/47/66/23480318/3756-1/tsp20260920085557/Apple-iPhone-16-6-1-5G-128-Go-Double-SIM-Noir.jpg"
  },

  {
    id:"p47",
    name:"Apple iPhone 17 6,3\" 5G Double SIM 256 Go Noir",
    category:"Smartphones",
    price:1000,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/19/86/b6/28739097/3756-1/tsp20260909180923/Apple-iPhone-17-6-3-5G-Double-SIM-256-Go-Noir.jpg"
  },

  {
    id:"p48",
    name:"Apple iPhone 18 Pro 6,3\" 5G Double SIM 256 Go Noir",
    category:"Smartphones",
    price:1199.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/62/73/c7/29848418/1540-1/tsp20260920091102/Apple-iPhone-18-Pro-6-3-5G-Double-SIM-256-Go-Noir.jpg"
  },

  {
    id:"p49",
    name:"Samsung Galaxy S23 6,1\" 5G 8 Go RAM 256 Go Noir",
    category:"Smartphones",
    price:230,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/0d/c0/44/21282829/1540-1/tsp20260829031739/Smartphone-Samsung-Galaxy-S23-6-1-Nano-SIM-5G-8-Go-RAM-256-Go-Noir.jpg"
  },

  {
    id:"p50",
    name:"Samsung Galaxy S24 6,2\" 5G 256 Go Noir",
    category:"Smartphones",
    price:449.90,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/a6/f6/5a/22738598/1540-1/tsp20260319135101/Smartphone-Samsung-Galaxy-S24-6-2-5G-Nano-SIM-256-Go-Noir.jpg"
  },

  {
    id:"p51",
    name:"Samsung Galaxy S25 Edge 6,7\" 5G 256 Go Noir absolu Titane",
    category:"Smartphones",
    price:469.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/42/7b/ab/28015426/1540-1/tsp20260909180103/Smartphone-Samsung-Galaxy-S25-Edge-6-7-5G-Nano-SIM-256-Go-Noir-absolu-Titane.jpg"
  },

  {
    id:"p52",
    name:"Samsung Galaxy S26 6,3\" 5G 256 Go Noir + Buds4 Noir",
    category:"Smartphones",
    price:650.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/e8/a2/c7/29860584/1540-1/tsp20260903144909/Pack-Smartphone-Samsung-Galaxy-S26-6-3-5G-Nano-SIM-256-Go-Noir-Buds4-Noir.jpg"
  },

  {
    id:"p53",
    name:"Google Pixel 8 6,2\" 5G Double SIM 128 Go Vert Sauge",
    category:"Smartphones",
    price:200,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/37/bc/52/22199351/1540-1/tsp20260722081937/Smartphone-Google-Pixel-8-6-2-5G-Double-SIM-128-Go-Vert-Sauge.jpg"
  },

  {
    id:"p54",
    name:"Google Pixel 9 6,3\" 5G Double nano-SIM 128 Go Noir Obsidienne",
    category:"Smartphones",
    price:400,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/f6/00/6d/23920886/1540-1/tsp20260914084700/Smartphone-Google-Pixel-9-6-3-5G-Double-nano-SIM-128-Go-Noir-Obsidienne.jpg"
  },

  {
    id:"p55",
    name:"Google Pixel 10 6,3\" 5G Double SIM 256 Go Noir Volcanique",
    category:"Smartphones",
    price:600,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/4a/5f/b3/28532554/1540-1/tsp20260717111851/Smartphone-Google-Pixel-10-6-3-5G-Double-SIM-256-Go-Noir-Volcanique.jpg"
  },

  {
    id:"p56",
    name:"Flashforge Adventurer 5M Pro",
    category:"Imprimantes 3D",
    price:115,
    image:"https://www.makershop.fr/cdn/shop/files/13458.jpg?v=1760745366&width=150"
  },

  {
    id:"p57",
    name:"Elegoo Centauri 2",
    category:"Imprimantes 3D",
    price:200,
    image:"https://fr.elegoo.com/cdn/shop/files/C2-_-260811.jpg?crop=center&v=1786696280&width=345"
  },

  {
    id:"p58",
    name:"Anycubic Photon P1 Max",
    category:"Imprimantes 3D",
    price:600,
    image:"https://fr.anycubic.com/cdn/shop/files/P1M_8bd4d344-b751-4497-a535-4e647ecef572.jpg?v=1784100048&width=150"
  },

  {
    id:"p59",
    name:"GTA VI Key PlayStation",
    category:"Logiciels & licences",
    price:69.99,
    image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ9VsG_IxAanmrCSqCyACtuyCqCD5rwiQ3P3Iylexch3XnCT4sevDBCz-vnqlVCBvZroOpYIX9T0Flc8EzGSZuyPMibCcQm"
  },

  {
    id:"p60",
    name:"Microsoft Windows 11 Pro Key",
    category:"Logiciels & licences",
    price:24.99,
    image:"https://imgproxy.eneba.games/0A9PW8DP7_YSTA-WUru4IVJnFXsKikaoYM5RHNb3nHQ/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy93/YUFhcnZicFhzSm8y/NjZSZ3hKSVpuYjVX/ZzRkVWY3a3YyUDQx/bm1nakJjLnBuZw"
  },

  {
    id:"p61",
    name:"AsiaHorse Aurora-CO Gaines de Câble ARGB",
    category:"Accessoires composants PC",
    price:15.99,
    image:"https://m.media-amazon.com/images/I/71NF0H-6FXL._SL1500_.jpg"
  },

  {
    id:"p62",
    name:"Câble vidéo Accsup HDMI 2.0 4K UHD avec Ethernet 5 m Noir",
    category:"Adaptateurs / câbles / chargeurs",
    price:12.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/db/90/4a/21663963/1540-1/tsp20260909104107/Cable-video-Accsup-HDMI-2-0-4K-UHD-avec-Ethernet-5-m-Noir.jpg"
  },

  {
    id:"p63",
    name:"Cable Relier ecran pour pc Certifié Câble DP vers DP 10K 240Hz",
    category:"Adaptateurs / câbles / chargeurs",
    price:19.99,
    image:"https://m.media-amazon.com/images/I/71BeNtX7nuL._SL1500_.jpg"
  },

  {
    id:"p64",
    name:"Câble USB-C ESSENTIELB vers USB-C 1M Noir",
    category:"Adaptateurs / câbles / chargeurs",
    price:1,
    image:"https://boulanger.scene7.com/is/image/Boulanger/3497674179939_h_f_l_2?wid=2140&hei=2140&resMode=sharp2&op_usm=1.75,0.3,2,0&fmt=png-alpha"
  },

  {
    id:"p65",
    name:"Cables USB Accsup CABLE USB-C VERS USB-A 1M NOIR",
    category:"Adaptateurs / câbles / chargeurs",
    price:1,
    image:""
  },

  {
    id:"p66",
    name:"Câble USB-C vers Lightning pour Apple iPhone/iPad/iPod 1m Blanc",
    category:"Adaptateurs / câbles / chargeurs",
    price:1,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/a6/b8/07/17283238/1540-1/tsp20260617130730/Cable-USB-C-vers-Lightning-pour-Apple-iPhone-iPad-iPod-1m-Blanc.jpg"
  },

  {
    id:"p67",
    name:"BSTOEM pour Apple Watch Chargeur, Station de Charge USB C Magnétique 1M",
    category:"Adaptateurs / câbles / chargeurs",
    price:2.99,
    image:"https://m.media-amazon.com/images/I/61rGkIZqqCL._SL1500_.jpg"
  },

  {
    id:"p68",
    name:"StarTech Cordon d'alimentation PC de 1m - CEE 7/7 à C13",
    category:"Adaptateurs / câbles / chargeurs",
    price:4.50,
    image:"https://m.media-amazon.com/images/I/81b1fyIWcOL._AC_SL1500_.jpg"
  },

  {
    id:"p69",
    name:"Unicavu Webcam PC 2K 30 FPS Full HD 1080P",
    category:"Caméras & webcams",
    price:10,
    image:"https://m.media-amazon.com/images/I/61CJsbKfonL._AC_SL1500_.jpg"
  },

  {
    id:"p70",
    name:"eMeet Nova 4K Webcam 4K Ultra HD avec 2 Microphones",
    category:"Caméras & webcams",
    price:23.99,
    image:"https://m.media-amazon.com/images/I/61bCeQBjUwL._AC_SL1500_.jpg"
  },

  {
    id:"p71",
    name:"Quntis Lampe Écran Pc RGB, Monitor Light Bar IM 40 cm Noir",
    category:"Barres lumineuses pour écran",
    price:8.99,
    image:"https://m.media-amazon.com/images/I/71ESgk4ETPL._AC_SL1500_.jpg"
  },

  {
    id:"p72",
    name:"TONOR Micro Cardioïde Dynamique USB/XLR TD510+",
    category:"Microphones",
    price:20.99,
    image:"https://m.media-amazon.com/images/I/61EZnm+ijZL._AC_SL1500_.jpg"
  },

  {
    id:"p73",
    name:"BONTEC Bras Ecran PC à Ressort à Gaz, 13-32 Pouces",
    category:"Supports écrans / écrans / TV",
    price:16,
    image:"https://m.media-amazon.com/images/I/61gjjZxKbeL._AC_SL1500_.jpg"
  },

  {
    id:"p74",
    name:"BONTEC Support Ecran PC 2 Ecran Articulé à Ressort à Gaz, 13-32 Pouces",
    category:"Supports écrans / écrans / TV",
    price:29.99,
    image:"https://m.media-amazon.com/images/I/71kZjwcU4SL._AC_SL1500_.jpg"
  },

  {
    id:"p75",
    name:"BONTEC Bras Ecran PC Mural à Ressort à Gaz, 13-42 Pouces, Charge 38kg",
    category:"Supports écrans / écrans / TV",
    price:34.99,
    image:"https://m.media-amazon.com/images/I/71-oseIdQXL._AC_SL1500_.jpg"
  },

  {
    id:"p76",
    name:"KTC Écran PC Gamer Incurvé 24 Pouces FHD 240 Hz (VESA 100×100 mm)",
    category:"Supports écrans / écrans / TV",
    price:80,
    image:"https://m.media-amazon.com/images/I/71wUlFXcaZL._AC_SL1500_.jpg"
  },

  {
    id:"p77",
    name:"KTC Écran PC Gamer Incurvé 27 Pouces QHD 180Hz (OC 185Hz) H27S5 (VESA 100×100 mm)",
    category:"Supports écrans / écrans / TV",
    price:110,
    image:"https://m.media-amazon.com/images/I/61Rehn5YTWL._AC_SL1000_.jpg"
  },

  {
    id:"p78",
    name:"HKC Écran PC Gaming 34 Pouces Incurvé UWQHD 120 Hz HDR400 (VESA 100×100 mm)",
    category:"Supports écrans / écrans / TV",
    price:170,
    image:"https://m.media-amazon.com/images/I/71useoNrGEL._AC_SL1500_.jpg"
  },

  {
    id:"p79",
    name:"HKC 27 Pouces Ecran Gaming 4K Dual Mode UHD 160Hz / FHD 320Hz G27H7P (VESA 100×100 mm)",
    category:"Supports écrans / écrans / TV",
    price:140,
    image:"https://m.media-amazon.com/images/I/81MjOWRE0SL._AC_SL1500_.jpg"
  },

  {
    id:"p80",
    name:"XIAOMI TV F 65 Pouces 2025 4K UHD Smart TV",
    category:"Supports écrans / écrans / TV",
    price:249.99,
    image:"https://m.media-amazon.com/images/I/61Jk8xxkLZL._AC_SL1000_.jpg"
  },

  {
    id:"p81",
    name:"Xbox Manette sans fil",
    category:"Manettes & consoles",
    price:59.99,
    image:"https://m.media-amazon.com/images/I/71fQ5g9X8PL._AC_SL1500_.jpg",
    options:{
      "Couleur":["Rose","Bleu","Noir","Rouge","Blanc","Vert"]
    }
  },

  {
    id:"p82",
    name:"PlayStation 5 avec 1 Manette Sans Fil DualSense",
    category:"Manettes & consoles",
    price:320,
    image:"https://m.media-amazon.com/images/I/61h7VjYt-fL._AC_SL1500_.jpg",
    options:{
      "Console":["PS5 avec lecteur","PS5 Pro"]
    }
  },

  {
    id:"p83",
    name:"Xbox Series X - 1TB Digital Edition avec 1 manette sans fil",
    category:"Manettes & consoles",
    price:599.99,
    image:"https://m.media-amazon.com/images/I/51OVjV4-GqL._AC_SL1500_.jpg"
  },

  {
    id:"p84",
    name:"Xbox Series S - All Digital Gaming Console - 512GB SSD",
    category:"Manettes & consoles",
    price:500,
    image:"https://m.media-amazon.com/images/I/61PI59RfWvL._AC_SX425_.jpg"
  }

];


// ============================================================
// NOTES / AVIS
// ============================================================

products.forEach((product,index)=>{
  product.rating = Number(
    (4.2 + ((index * 17) % 81) / 100).toFixed(1)
  );

  product.reviewCount =
    1248 + ((index * 137) % 2028);
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

try{
  cart = JSON.parse(
    localStorage.getItem("novaCart") || "[]"
  );

  if(!Array.isArray(cart)){
    cart = [];
  }
}catch{
  cart = [];
}

try{
  favorites = JSON.parse(
    localStorage.getItem("novaFavorites") || "[]"
  );

  if(!Array.isArray(favorites)){
    favorites = [];
  }
}catch{
  favorites = [];
}


// ============================================================
// UTILITAIRES
// ============================================================

function money(value){

  return Number(value || 0).toLocaleString(
    "fr-FR",
    {
      minimumFractionDigits:2,
      maximumFractionDigits:2
    }
  ) + " €";

}


function escapeHTML(value){

  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}


function escapeAttr(value){
  return escapeHTML(value);
}


function getProduct(id){

  return products.find(
    product => product.id === id
  );

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


function getCartCount(){

  return cart.reduce(
    (total,item) => total + Number(item.quantity || 0),
    0
  );

}


function getCartSubtotal(){

  return cart.reduce(
    (total,item)=>{

      const product = getProduct(item.productId);

      if(!product){
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
// OPTIONS PRODUIT
// ============================================================

function hasRequiredOption(product){

  return product &&
    product.options &&
    Object.keys(product.options).length > 0;

}


function getCartProductName(item){

  const product = getProduct(item.productId);

  if(!product){
    return "Produit";
  }

  let name = product.name;

  if(item.options){

    Object.entries(item.options).forEach(
      ([key,value])=>{
        name += ` • ${key}: ${value}`;
      }
    );

  }

  return name;

}


function findCartItem(productId,options={}){

  return cart.find(item=>{

    if(item.productId !== productId){
      return false;
    }

    return JSON.stringify(item.options || {}) ===
      JSON.stringify(options || {});

  });

}


function showProductOptions(product){

  if(!hasRequiredOption(product)){
    return {};
  }

  const options = {};

  for(const [key,values] of Object.entries(product.options)){

    const selected =
      prompt(
        `${key} :\n\n${values.join("\n")}`
      );

    if(selected === null){
      return null;
    }

    const clean = selected.trim();

    if(!values.includes(clean)){

      toast(
        `Choix invalide pour ${key}.`,
        "error"
      );

      return null;
    }

    options[key] = clean;
  }

  return options;

}


function setupProductOptions(product){

  if(!hasRequiredOption(product)){
    return;
  }

  Object.entries(product.options).forEach(
    ([key,values])=>{

      const select =
        document.querySelector(
          `[data-option="${product.id}-${escapeAttr(key)}"]`
        );

      if(!select){
        return;
      }

      values.forEach(value=>{

        const option =
          document.createElement("option");

        option.value = value;
        option.textContent = value;

        select.appendChild(option);

      });

    }
  );

}


function getSelectedProductOption(product){

  if(!hasRequiredOption(product)){
    return {};
  }

  const options = {};

  for(const key of Object.keys(product.options)){

    const select =
      document.querySelector(
        `[data-option="${product.id}-${escapeAttr(key)}"]`
      );

    if(!select || !select.value){
      toast(
        `Choisis ${key}.`,
        "error"
      );
      return null;
    }

    options[key] = select.value;

  }

  return options;

}


// ============================================================
// ÉTOILES
// ============================================================

function getRatingStars(rating){

  const rounded =
    Math.max(
      0,
      Math.min(
        5,
        Math.round(Number(rating || 0))
      )
    );

  return "★".repeat(rounded) +
    "☆".repeat(5-rounded);

}


// ============================================================
// TOAST
// ============================================================

function toast(message,type="success"){

  if(!toastContainer){
    return;
  }

  const item =
    document.createElement("div");

  item.className =
    `toast-item ${type}`;

  item.innerHTML = `
    <span>${escapeHTML(message)}</span>
    <button type="button">×</button>
  `;

  item.querySelector("button")
    .addEventListener(
      "click",
      ()=>item.remove()
    );

  toastContainer.appendChild(item);

  setTimeout(
    ()=>item.remove(),
    3500
  );

}


// ============================================================
// MODAL
// ============================================================

function showModal(title,html){

  modalTitle.textContent = title;
  modalContent.innerHTML = html;

  modal.classList.add("open");

  document.body.classList.add("modal-open");

}


function closeModal(){

  modal.classList.remove("open");

  document.body.classList.remove("modal-open");

}


modalClose?.addEventListener(
  "click",
  closeModal
);

modal?.addEventListener(
  "click",
  event=>{

    if(event.target === modal){
      closeModal();
    }

  }
);


// ============================================================
// PANIER
// ============================================================

function openCart(){

  cartOverlay.classList.add("open");
  cartDrawer.classList.add("open");

}


function closeCart(){

  cartOverlay.classList.remove("open");
  cartDrawer.classList.remove("open");

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

function addToCart(productId){

  const product =
    getProduct(productId);

  if(!product){
    return;
  }

  const options =
    showProductOptions(product);

  if(options === null){
    return;
  }

  const existing =
    findCartItem(
      productId,
      options
    );

  if(existing){

    existing.quantity =
      Number(existing.quantity || 0) + 1;

  }else{

    cart.push({
      productId,
      quantity:1,
      options
    });

  }

  saveCart();
  renderCart();

  toast(
    `${product.name} ajouté au panier.`,
    "success"
  );

}


// ============================================================
// SUPPRESSION
// ============================================================

function removeFromCart(productId,options={}){

  cart =
    cart.filter(
      item =>
        !(
          item.productId === productId &&
          JSON.stringify(item.options || {}) ===
          JSON.stringify(options || {})
        )
    );

  saveCart();
  renderCart();

}


function changeCartQuantity(
  productId,
  options,
  delta
){

  const item =
    findCartItem(
      productId,
      options
    );

  if(!item){
    return;
  }

  item.quantity =
    Number(item.quantity || 0) + delta;

  if(item.quantity <= 0){

    removeFromCart(
      productId,
      options
    );

    return;
  }

  saveCart();
  renderCart();

}


// ============================================================
// RENDU PANIER
// ============================================================

function renderCart(){

  const count =
    getCartCount();

  cartBadge.textContent =
    count;

  cartBadge.style.display =
    count > 0 ? "flex" : "none";

  cartTotal.textContent =
    money(getCartSubtotal());

  if(!cart.length){

    cartItems.innerHTML = `
      <div class="empty-cart">
        <h3>Ton panier est vide 🛒</h3>
        <p style="margin-top:8px">
          Ajoute un produit pour commencer.
        </p>
      </div>
    `;

    checkoutBtn.disabled = true;

    return;

  }

  checkoutBtn.disabled = false;

  cartItems.innerHTML =
    cart.map(item=>{

      const product =
        getProduct(item.productId);

      if(!product){
        return "";
      }

      const options =
        item.options || {};

      return `
        <div
          class="cart-item"
          data-product-id="${escapeAttr(product.id)}"
        >

          <img
            src="${escapeAttr(product.image)}"
            alt="${escapeAttr(product.name)}"
            onerror="this.style.display='none'"
          >

          <div class="cart-item-info">

            <strong>
              ${escapeHTML(getCartProductName(item))}
            </strong>

            <span>
              ${money(product.price)}
            </span>

            <div class="cart-quantity">

              <button
                type="button"
                class="cart-minus"
                data-id="${escapeAttr(product.id)}"
              >
                −
              </button>

              <strong>
                ${Number(item.quantity || 0)}
              </strong>

              <button
                type="button"
                class="cart-plus"
                data-id="${escapeAttr(product.id)}"
              >
                +
              </button>

            </div>

          </div>

          <button
            type="button"
            class="remove-cart"
            data-id="${escapeAttr(product.id)}"
            aria-label="Supprimer"
          >
            ×
          </button>

        </div>
      `;

    }).join("");


  cartItems
    .querySelectorAll(".cart-minus")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{

          const item =
            cart.find(
              x => x.productId === button.dataset.id
            );

          if(item){

            changeCartQuantity(
              item.productId,
              item.options || {},
              -1
            );

          }

        }
      );

    });


  cartItems
    .querySelectorAll(".cart-plus")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{

          const item =
            cart.find(
              x => x.productId === button.dataset.id
            );

          if(item){

            changeCartQuantity(
              item.productId,
              item.options || {},
              1
            );

          }

        }
      );

    });


  cartItems
    .querySelectorAll(".remove-cart")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{

          const item =
            cart.find(
              x => x.productId === button.dataset.id
            );

          if(item){

            removeFromCart(
              item.productId,
              item.options || {}
            );

          }

        }
      );

    });

}


// ============================================================
// CATÉGORIES
// ============================================================

function renderCategories(){

  const categories = [
    "Tous",
    ...new Set(
      products.map(product=>product.category)
    )
  ];

  categoriesEl.innerHTML =
    categories.map(category=>`

      <button
        type="button"
        class="category-btn ${
          selectedCategory === category
            ? "active"
            : ""
        }"
        data-category="${escapeAttr(category)}"
      >
        ${escapeHTML(category)}
      </button>

    `).join("");

  categoriesEl
    .querySelectorAll(".category-btn")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{

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

function getFilteredProducts(){

  let result =
    products.filter(product=>{

      const categoryOK =
        selectedCategory === "Tous" ||
        product.category === selectedCategory;

      const text =
        `${product.name} ${product.category}`
          .toLowerCase();

      const searchOK =
        !searchValue ||
        text.includes(
          searchValue.toLowerCase()
        );

      return categoryOK && searchOK;

    });


  if(
    sortValue === "price-low" ||
    sortValue === "priceAsc"
  ){

    result.sort(
      (a,b)=>Number(a.price)-Number(b.price)
    );

  }


  if(
    sortValue === "price-high" ||
    sortValue === "priceDesc"
  ){

    result.sort(
      (a,b)=>Number(b.price)-Number(a.price)
    );

  }


  if(sortValue === "name"){

    result.sort(
      (a,b)=>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );

  }


  if(sortValue === "new"){

    result =
      result.filter(
        product => product.new === true
      );

  }

  return result;

}


// ============================================================
// PRODUITS
// ============================================================

function renderProducts(){

  const result =
    getFilteredProducts();

  productCount.textContent =
    `${result.length} produit${result.length > 1 ? "s" : ""}`;

  if(!result.length){

    productsGrid.innerHTML = `
      <div class="empty-products">
        <h3>Aucun produit trouvé</h3>
        <p style="margin-top:8px">
          Essaie une autre recherche ou catégorie.
        </p>
      </div>
    `;

    return;

  }

  productsGrid.innerHTML =
    result.map(product=>{

      const favorite =
        favorites.includes(product.id);

      return `
        <article
          class="product product-card"
          data-product-id="${escapeAttr(product.id)}"
        >

          <div class="product-img">

            ${
              product.new
              ? `<span class="new-badge">NOUVEAU</span>`
              : ""
            }

            <img
              src="${escapeAttr(product.image)}"
              alt="${escapeAttr(product.name)}"
              loading="lazy"
              onerror="this.style.display='none'"
            >

          </div>

          <div class="product-body">

            <div class="product-cat">
              ${escapeHTML(product.category)}
            </div>

            <h3>
              ${escapeHTML(product.name)}
            </h3>

            <div class="rating">

              <span class="stars">
                ${getRatingStars(product.rating)}
              </span>

              <span>
                ${product.rating} (${product.reviewCount})
              </span>

            </div>

            <div class="price">
              ${money(product.price)}
            </div>

            <div class="product-actions">

              <button
                type="button"
                class="add-btn add-product"
                data-id="${escapeAttr(product.id)}"
              >
                🛒 Ajouter
              </button>

              <button
                type="button"
                class="view-btn view-product"
                data-id="${escapeAttr(product.id)}"
              >
                Voir
              </button>

            </div>

            <button
              type="button"
              class="view-btn favorite-product"
              data-id="${escapeAttr(product.id)}"
              style="width:100%;margin-top:8px"
            >
              ${favorite ? "❤️ Retirer des favoris" : "♡ Ajouter aux favoris"}
            </button>

          </div>

        </article>
      `;

    }).join("");


  productsGrid
    .querySelectorAll(".add-product")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{
          addToCart(
            button.dataset.id
          );
        }
      );

    });


  productsGrid
    .querySelectorAll(".view-product")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{
          openProduct(
            button.dataset.id
          );
        }
      );

    });


  productsGrid
    .querySelectorAll(".favorite-product")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{

          const id =
            button.dataset.id;

          if(favorites.includes(id)){

            favorites =
              favorites.filter(
                x => x !== id
              );

            toast(
              "Retiré des favoris.",
              "success"
            );

          }else{

            favorites.push(id);

            toast(
              "Ajouté aux favoris ❤️",
              "success"
            );

          }

          saveFavorites();
          renderProducts();

        }
      );

    });

}


// ============================================================
// RECHERCHE + TRI
// ============================================================

searchInput?.addEventListener(
  "input",
  ()=>{
    searchValue =
      searchInput.value.trim();

    renderProducts();
  }
);

sortSelect?.addEventListener(
  "change",
  ()=>{
    sortValue =
      sortSelect.value;

    renderProducts();
  }
);


// ============================================================
// PRODUIT
// ============================================================

function openProduct(productId){

  const product =
    getProduct(productId);

  if(!product){
    return;
  }

  let optionsHTML = "";

  if(hasRequiredOption(product)){

    optionsHTML =
      Object.entries(product.options)
        .map(([key,values])=>`

          <label
            style="
              display:block;
              margin-top:15px;
              font-weight:800
            "
          >

            ${escapeHTML(key)}

            <select
              class="input product-option"
              data-option="${escapeAttr(product.id)}-${escapeAttr(key)}"
              style="margin-top:7px"
            >

              <option value="">
                Choisir...
              </option>

              ${values.map(value=>`
                <option value="${escapeAttr(value)}">
                  ${escapeHTML(value)}
                </option>
              `).join("")}

            </select>

          </label>

        `).join("");

  }


  showModal(
    product.name,
    `

      <div style="
        display:grid;
        gap:20px;
      ">

        <img
          src="${escapeAttr(product.image)}"
          alt="${escapeAttr(product.name)}"
          style="
            width:100%;
            max-height:320px;
            object-fit:contain;
            background:#fff;
            border-radius:15px;
          "
          onerror="this.style.display='none'"
        >

        <div>

          <div class="product-cat">
            ${escapeHTML(product.category)}
          </div>

          <h2>
            ${escapeHTML(product.name)}
          </h2>

          <div class="rating">
            <span class="stars">
              ${getRatingStars(product.rating)}
            </span>
            ${product.rating}/5
          </div>

          <div class="price">
            ${money(product.price)}
          </div>

          ${optionsHTML}

          <button
            type="button"
            id="modalAddProduct"
            class="add-btn"
            style="
              width:100%;
              margin-top:20px;
            "
          >
            🛒 Ajouter au panier
          </button>

          <button
            type="button"
            id="modalReviews"
            class="view-btn"
            style="
              width:100%;
              margin-top:8px;
            "
          >
            ⭐ Voir les avis
          </button>

        </div>

      </div>

    `
  );


  document
    .getElementById("modalAddProduct")
    ?.addEventListener(
      "click",
      ()=>{

        const options =
          getSelectedProductOption(product);

        if(options === null){
          return;
        }

        const existing =
          findCartItem(
            product.id,
            options
          );

        if(existing){

          existing.quantity++;

        }else{

          cart.push({
            productId:product.id,
            quantity:1,
            options
          });

        }

        saveCart();
        renderCart();

        closeModal();

        toast(
          "Produit ajouté au panier 🛒",
          "success"
        );

      }
    );


  document
    .getElementById("modalReviews")
    ?.addEventListener(
      "click",
      ()=>{
        openProductReviews(product.id);
      }
    );

}


// ============================================================
// AVIS PRODUIT
// ============================================================

async function openProductReviews(productId){

  const product =
    getProduct(productId);

  if(!product){
    return;
  }

  showModal(
    `Avis - ${product.name}`,
    `
      <p>
        Chargement des avis...
      </p>
    `
  );

  try{

    const q =
      query(
        collection(db,"reviews"),
        where(
          "productId",
          "==",
          productId
        )
      );

    const snapshot =
      await getDocs(q);

    const reviews =
      snapshot.docs.map(
        review=>({
          id:review.id,
          ...review.data()
        })
      );

    reviewsCache[productId] =
      reviews;

    showModal(
      `Avis - ${product.name}`,
      `

        ${
          reviews.length
          ?
          reviews.map(review=>`

            <div
              class="trust-card"
              style="margin-bottom:10px"
            >

              <strong>
                ${escapeHTML(
                  review.name || "Client"
                )}
                ⭐ ${Number(
                  review.rating || 5
                )}
              </strong>

              <p
                style="
                  margin-top:8px;
                  color:var(--muted)
                "
              >
                ${escapeHTML(
                  review.comment || ""
                )}
              </p>

            </div>

          `).join("")
          :
          `
            <div class="empty-products">
              Aucun avis pour le moment.
            </div>
          `
        }

        <button
          type="button"
          class="add-btn"
          id="writeReviewBtn"
          style="width:100%;margin-top:12px"
        >
          ✍️ Écrire un avis
        </button>

      `
    );


    document
      .getElementById("writeReviewBtn")
      ?.addEventListener(
        "click",
        ()=>writeReview(product)
      );

  }catch(error){

    console.error(error);

    showModal(
      `Avis - ${product.name}`,
      `
        <p>
          Impossible de charger les avis pour le moment.
        </p>
      `
    );

  }

}


async function writeReview(product){

  if(!currentUser){

    toast(
      "Connecte-toi pour laisser un avis.",
      "error"
    );

    openAccount();

    return;

  }

  const rating =
    Number(
      prompt(
        "Note sur 5 :"
      )
    );

  if(
    !rating ||
    rating < 1 ||
    rating > 5
  ){

    toast(
      "Note invalide.",
      "error"
    );

    return;
  }

  const comment =
    prompt(
      "Ton avis :"
    );

  if(!comment || !comment.trim()){
    return;
  }

  try{

    await addDoc(
      collection(db,"reviews"),
      {
        productId:product.id,
        uid:currentUser.uid,
        name:
          currentUser.email
            ? currentUser.email.split("@")[0]
            : "Client",
        rating,
        comment:comment.trim(),
        createdAt:serverTimestamp()
      }
    );

    toast(
      "Avis publié ⭐",
      "success"
    );

    openProductReviews(product.id);

  }catch(error){

    console.error(error);

    toast(
      "Impossible de publier l'avis.",
      "error"
    );

  }

}// ============================================================
// ERREURS FIREBASE
// ============================================================

function firebaseErrorMessage(error){

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
      "Aucun compte trouvé avec cet email.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard.",

    "auth/network-request-failed":
      "Erreur réseau.",

    "permission-denied":
      "Accès refusé par Firebase."
  };

  return messages[code] ||
    error?.message ||
    "Une erreur est survenue.";

}


// ============================================================
// COMPTE
// ============================================================

async function login(){

  const email =
    prompt("Ton adresse email :");

  if(email === null){
    return;
  }

  const password =
    prompt("Ton mot de passe :");

  if(password === null){
    return;
  }

  if(!email.trim() || !password){

    toast(
      "Remplis tous les champs.",
      "error"
    );

    return;
  }

  try{

    await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    toast(
      "Connexion réussie 👋",
      "success"
    );

  }catch(error){

    console.error(error);

    toast(
      firebaseErrorMessage(error),
      "error"
    );

  }

}


async function register(){

  const email =
    prompt("Ton adresse email :");

  if(email === null){
    return;
  }

  const password =
    prompt(
      "Choisis un mot de passe :"
    );

  if(password === null){
    return;
  }

  if(!email.trim() || !password){

    toast(
      "Remplis tous les champs.",
      "error"
    );

    return;
  }

  if(password.length < 6){

    toast(
      "Le mot de passe doit contenir au moins 6 caractères.",
      "error"
    );

    return;
  }

  try{

    await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    toast(
      "Compte créé avec succès 🎉",
      "success"
    );

  }catch(error){

    console.error(error);

    toast(
      firebaseErrorMessage(error),
      "error"
    );

  }

}


async function logout(){

  try{

    await signOut(auth);

    toast(
      "Déconnexion réussie.",
      "success"
    );

  }catch(error){

    console.error(error);

    toast(
      "Impossible de se déconnecter.",
      "error"
    );

  }

}


// ============================================================
// OUVRIR LE COMPTE
// ============================================================

function openAccount(){

  if(!currentUser){

    showModal(
      "👤 Compte",
      `

        <div style="display:grid;gap:12px">

          <p style="color:var(--muted)">
            Connecte-toi ou crée ton compte NovaShop.
          </p>

          <button
            type="button"
            class="add-btn"
            id="loginBtn"
          >
            🔐 Se connecter
          </button>

          <button
            type="button"
            class="view-btn"
            id="registerBtn"
          >
            📝 Créer un compte
          </button>

        </div>

      `
    );

    document
      .getElementById("loginBtn")
      ?.addEventListener(
        "click",
        async ()=>{

          closeModal();
          await login();

        }
      );

    document
      .getElementById("registerBtn")
      ?.addEventListener(
        "click",
        async ()=>{

          closeModal();
          await register();

        }
      );

    return;
  }


  showModal(
    "👤 Mon compte",
    `

      <div style="display:grid;gap:15px">

        <div class="trust-card">

          <strong>
            Compte connecté
          </strong>

          <p style="
            margin-top:8px;
            color:var(--muted)
          ">
            ${escapeHTML(
              currentUser.email || ""
            )}
          </p>

        </div>

        <button
          type="button"
          class="add-btn"
          id="accountOrdersBtn"
        >
          📦 Mes commandes
        </button>

        <button
          type="button"
          class="view-btn"
          id="accountSettingsBtn"
        >
          ⚙️ Paramètres
        </button>

        <button
          type="button"
          class="view-btn"
          id="accountLogoutBtn"
          style="color:var(--red)"
        >
          🚪 Se déconnecter
        </button>

      </div>

    `
  );


  document
    .getElementById("accountOrdersBtn")
    ?.addEventListener(
      "click",
      ()=>{
        closeModal();
        openOrders();
      }
    );


  document
    .getElementById("accountSettingsBtn")
    ?.addEventListener(
      "click",
      ()=>{
        closeModal();
        openSettings();
      }
    );


  document
    .getElementById("accountLogoutBtn")
    ?.addEventListener(
      "click",
      async ()=>{

        closeModal();
        await logout();

      }
    );

}


// ============================================================
// COMMANDES
// ============================================================

async function openOrders(){

  if(!currentUser){

    toast(
      "Connecte-toi pour voir tes commandes.",
      "error"
    );

    openAccount();

    return;
  }


  showModal(
    "📦 Mes commandes",
    `
      <p style="color:var(--muted)">
        Chargement de tes commandes...
      </p>
    `
  );


  try{

    const q =
      query(
        collection(db,"orders"),
        where(
          "uid",
          "==",
          currentUser.uid
        )
      );

    const snapshot =
      await getDocs(q);

    const orders =
      snapshot.docs
        .map(order=>({
          id:order.id,
          ...order.data()
        }))
        .sort(
          (a,b)=>{
            const aTime =
              a.createdAt?.seconds || 0;

            const bTime =
              b.createdAt?.seconds || 0;

            return bTime - aTime;
          }
        );


    if(!orders.length){

      showModal(
        "📦 Mes commandes",
        `
          <div class="empty-products">

            <h3>
              Aucune commande
            </h3>

            <p style="margin-top:8px">
              Tes commandes apparaîtront ici.
            </p>

          </div>
        `
      );

      return;
    }


    showModal(
      "📦 Mes commandes",
      `

        <div style="
          display:grid;
          gap:14px;
        ">

          ${orders.map(order=>{

            const status =
              order.status ||
              "Enregistrée";

            const destination =
              order.destination ||
              order.city ||
              "Non renseignée";

            const tracking =
              order.tracking ||
              "En attente";

            const items =
              Array.isArray(order.items)
                ? order.items
                : [];

            const total =
              Number(order.total || 0);

            return `

              <div
                class="order-card trust-card"
                style="
                  border:1px solid var(--line);
                "
              >

                <div style="
                  display:flex;
                  justify-content:space-between;
                  gap:10px;
                  flex-wrap:wrap;
                ">

                  <strong>
                    Commande #${escapeHTML(
                      order.id.slice(0,8)
                    )}
                  </strong>

                  <span
                    style="
                      color:var(--accent);
                      font-weight:900;
                    "
                  >
                    ${escapeHTML(status)}
                  </span>

                </div>

                <p style="
                  margin-top:10px;
                  color:var(--muted);
                ">
                  Destination :
                  ${escapeHTML(destination)}
                </p>

                <p style="
                  margin-top:6px;
                  color:var(--muted);
                ">
                  Suivi :
                  ${escapeHTML(tracking)}
                </p>

                <p style="
                  margin-top:6px;
                  color:var(--muted);
                ">
                  ${items.length}
                  article${items.length > 1 ? "s" : ""}
                </p>

                <strong
                  style="
                    display:block;
                    margin-top:10px;
                    font-size:20px;
                  "
                >
                  ${money(total)}
                </strong>

                <button
                  type="button"
                  class="view-btn order-details-btn"
                  data-order-id="${escapeAttr(order.id)}"
                  style="
                    width:100%;
                    margin-top:12px;
                  "
                >
                  📦 Voir le suivi
                </button>

              </div>

            `;

          }).join("")}

        </div>

      `
    );


    document
      .querySelectorAll(".order-details-btn")
      .forEach(button=>{

        button.addEventListener(
          "click",
          ()=>{

            const order =
              orders.find(
                item =>
                  item.id ===
                  button.dataset.orderId
              );

            if(order){
              showOrderDetails(order);
            }

          }
        );

      });


  }catch(error){

    console.error(error);

    showModal(
      "📦 Mes commandes",
      `
        <div class="empty-products">
          Impossible de charger les commandes.
        </div>
      `
    );

  }

}


// ============================================================
// DÉTAILS COMMANDE
// ============================================================

function showOrderDetails(order){

  const status =
    order.status ||
    "Enregistrée";

  const destination =
    order.destination ||
    order.city ||
    "Non renseignée";

  const truckLocation =
    order.truckLocation ||
    "En attente";

  const tracking =
    order.tracking ||
    "En attente";

  const deliveryDate =
    order.deliveryDate ||
    "À définir";

  const items =
    Array.isArray(order.items)
      ? order.items
      : [];


  const steps = [
    "Commande enregistrée",
    "Préparation",
    "Expédiée",
    "En livraison",
    "Livrée"
  ];


  const statusIndex =
    steps.findIndex(
      step =>
        step.toLowerCase() ===
        String(status).toLowerCase()
    );


  showModal(
    "📦 Suivi de commande",
    `

      <div style="
        display:grid;
        gap:18px;
      ">

        <div class="trust-card">

          <strong>
            Commande #${escapeHTML(
              order.id.slice(0,8)
            )}
          </strong>

          <p style="
            margin-top:8px;
            color:var(--muted)
          ">
            Statut :
            <strong>
              ${escapeHTML(status)}
            </strong>
          </p>

        </div>


        <div class="timeline">

          ${steps.map(
            (step,index)=>`

              <div
                class="timeline-step ${
                  index <= statusIndex
                    ? "active"
                    : ""
                }"
              >

                <span>
                  ${
                    index <= statusIndex
                      ? "✅"
                      : "⚪"
                  }
                </span>

                <span>
                  ${escapeHTML(step)}
                </span>

              </div>

            `
          ).join("")}

        </div>


        <div class="trust-card">

          <strong>
            📍 Livraison
          </strong>

          <p style="
            margin-top:8px;
            color:var(--muted)
          ">
            Destination :
            ${escapeHTML(destination)}
          </p>

          <p style="
            margin-top:6px;
            color:var(--muted)
          ">
            Localisation du colis :
            ${escapeHTML(truckLocation)}
          </p>

          <p style="
            margin-top:6px;
            color:var(--muted)
          ">
            Numéro de suivi :
            ${escapeHTML(tracking)}
          </p>

          <p style="
            margin-top:6px;
            color:var(--muted)
          ">
            Livraison estimée :
            ${escapeHTML(deliveryDate)}
          </p>

        </div>


        <div class="trust-card">

          <strong>
            🛍️ Produits
          </strong>

          <div style="
            display:grid;
            gap:8px;
            margin-top:10px;
          ">

            ${
              items.map(item=>`

                <div style="
                  display:flex;
                  justify-content:space-between;
                  gap:10px;
                ">

                  <span>
                    ${escapeHTML(
                      item.name || "Produit"
                    )}
                    ×${Number(
                      item.quantity || 1
                    )}
                  </span>

                  <strong>
                    ${money(
                      Number(item.price || 0) *
                      Number(item.quantity || 1)
                    )}
                  </strong>

                </div>

              `).join("")
            }

          </div>

        </div>

      </div>

    `
  );

}


// ============================================================
// PARAMÈTRES
// ============================================================

function openSettings(){

  const savedTheme =
    localStorage.getItem(
      "novaThemeChoice"
    ) || "dark";


  showModal(
    "⚙️ Paramètres",
    `

      <div style="
        display:grid;
        gap:16px;
      ">

        <div class="trust-card">

          <strong>
            Apparence
          </strong>

          <select
            id="themeChoice"
            class="input"
            style="margin-top:10px"
          >

            <option
              value="dark"
              ${savedTheme === "dark" ? "selected" : ""}
            >
              🌙 Sombre
            </option>

            <option
              value="light"
              ${savedTheme === "light" ? "selected" : ""}
            >
              ☀️ Claire
            </option>

            <option
              value="auto"
              ${savedTheme === "auto" ? "selected" : ""}
            >
              🖥️ Automatique
            </option>

          </select>

        </div>


        <button
          type="button"
          class="view-btn"
          id="clearCartSettings"
        >
          🗑️ Vider le panier
        </button>


        <button
          type="button"
          class="view-btn"
          id="closeSettings"
        >
          Fermer
        </button>

      </div>

    `
  );


  document
    .getElementById("themeChoice")
    ?.addEventListener(
      "change",
      event=>{

        localStorage.setItem(
          "novaThemeChoice",
          event.target.value
        );

        applyTheme();

      }
    );


  document
    .getElementById("clearCartSettings")
    ?.addEventListener(
      "click",
      ()=>{

        cart = [];

        saveCart();
        renderCart();

        toast(
          "Panier vidé.",
          "success"
        );

      }
    );


  document
    .getElementById("closeSettings")
    ?.addEventListener(
      "click",
      closeModal
    );

}


// ============================================================
// THÈME
// ============================================================

function applyTheme(){

  const choice =
    localStorage.getItem(
      "novaThemeChoice"
    ) || "dark";


  let theme = choice;


  if(choice === "auto"){

    theme =
      window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches
        ? "light"
        : "dark";

  }


  document.documentElement
    .setAttribute(
      "data-theme",
      theme
    );

}


// ============================================================
// CHECKOUT
// ============================================================

const TEST_CARD = {
  number:"4242424242424242",
  holder:"NOVA SHOP",
  expiry:"12/30",
  cvv:"123"
};


function getSavedTestCard(){

  try{

    const saved =
      JSON.parse(
        localStorage.getItem(
          TEST_CARD_STORAGE_KEY
        ) || "null"
      );

    if(saved){
      return saved;
    }

  }catch{}

  return TEST_CARD;

}


function normalizeCardNumber(value){

  return String(value || "")
    .replace(/\s+/g,"");

}


function validateAddress(
  firstName,
  lastName,
  address,
  city
){

  if(
    !firstName ||
    !lastName ||
    !address ||
    !city
  ){

    return false;
  }

  if(address.length < 5){
    return false;
  }

  if(city.length < 2){
    return false;
  }

  return true;

}


function openCheckout(){

  if(!currentUser){

    toast(
      "Connecte-toi avant de passer commande.",
      "error"
    );

    closeCart();
    openAccount();

    return;
  }


  if(!cart.length){

    toast(
      "Ton panier est vide.",
      "error"
    );

    return;
  }


  const subtotal =
    getCartSubtotal();


  showModal(
    "💳 Passer la commande",
    `

      <div style="
        display:grid;
        gap:14px;
      ">

        <div class="trust-card">

          <strong>
            Total de la commande
          </strong>

          <div
            style="
              margin-top:8px;
              font-size:26px;
              font-weight:950;
            "
          >
            ${money(subtotal)}
          </div>

        </div>


        <input
          id="checkoutFirstName"
          class="input"
          placeholder="Prénom"
        >

        <input
          id="checkoutLastName"
          class="input"
          placeholder="Nom"
        >

        <input
          id="checkoutAddress"
          class="input"
          placeholder="Adresse"
        >

        <input
          id="checkoutCity"
          class="input"
          placeholder="Ville"
        >


        <select
          id="checkoutPayment"
          class="input"
        >

          <option value="card">
            💳 Carte bancaire de démonstration
          </option>

          <option value="paypal">
            🅿️ PayPal
          </option>

        </select>


        <div
          id="cardFields"
          style="
            display:grid;
            gap:10px;
          "
        >

          <input
            id="cardNumber"
            class="input"
            placeholder="Numéro de carte"
            inputmode="numeric"
          >

          <input
            id="cardHolder"
            class="input"
            placeholder="Nom sur la carte"
          >

          <div style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:10px;
          ">

            <input
              id="cardExpiry"
              class="input"
              placeholder="MM/AA"
            >

            <input
              id="cardCvv"
              class="input"
              placeholder="CVV"
              inputmode="numeric"
            >

          </div>

        </div>


        <button
          type="button"
          class="add-btn"
          id="confirmCheckout"
        >
          ✅ Confirmer la commande
        </button>

        <p style="
          color:var(--muted);
          font-size:12px;
          line-height:1.5;
        ">
          Mode carte de démonstration uniquement.
          Les informations utilisées ici ne servent pas
          à effectuer un paiement bancaire réel.
        </p>

      </div>

    `
  );


  const paymentSelect =
    document.getElementById(
      "checkoutPayment"
    );

  const cardFields =
    document.getElementById(
      "cardFields"
    );


  paymentSelect?.addEventListener(
    "change",
    ()=>{

      cardFields.style.display =
        paymentSelect.value === "card"
          ? "grid"
          : "none";

    }
  );


  document
    .getElementById("confirmCheckout")
    ?.addEventListener(
      "click",
      confirmCheckout
    );

}


checkoutBtn?.addEventListener(
  "click",
  openCheckout
);


// ============================================================
// CONFIRMER CHECKOUT
// ============================================================

async function confirmCheckout(){

  if(!currentUser){

    toast(
      "Connecte-toi avant de commander.",
      "error"
    );

    return;
  }


  if(!cart.length){

    toast(
      "Panier vide.",
      "error"
    );

    return;
  }


  const firstName =
    document
      .getElementById("checkoutFirstName")
      ?.value
      .trim();


  const lastName =
    document
      .getElementById("checkoutLastName")
      ?.value
      .trim();


  const address =
    document
      .getElementById("checkoutAddress")
      ?.value
      .trim();


  const city =
    document
      .getElementById("checkoutCity")
      ?.value
      .trim();


  if(
    !validateAddress(
      firstName,
      lastName,
      address,
      city
    )
  ){

    toast(
      "Adresse invalide ou incomplète.",
      "error"
    );

    return;
  }


  const payment =
    document
      .getElementById("checkoutPayment")
      ?.value;


  const total =
    getCartSubtotal();


  if(payment === "card"){

    const savedCard =
      getSavedTestCard();


    const number =
      normalizeCardNumber(
        document
          .getElementById("cardNumber")
          ?.value
      );


    const holder =
      document
        .getElementById("cardHolder")
        ?.value
        .trim()
        .toUpperCase();


    const expiry =
      document
        .getElementById("cardExpiry")
        ?.value
        .trim();


    const cvv =
      document
        .getElementById("cardCvv")
        ?.value
        .trim();


    if(
      number !==
        normalizeCardNumber(
          savedCard.number
        ) ||
      holder !==
        String(
          savedCard.holder
        ).toUpperCase() ||
      expiry !==
        savedCard.expiry ||
      cvv !==
        savedCard.cvv
    ){

      toast(
        "Carte de démonstration incorrecte.",
        "error"
      );

      return;
    }

  }


  const orderItems =
    cart.map(item=>{

      const product =
        getProduct(
          item.productId
        );

      return {
        productId:item.productId,
        name:getCartProductName(item),
        price:Number(product?.price || 0),
        quantity:Number(item.quantity || 1),
        options:item.options || {}
      };

    });


  const order = {
    uid:currentUser.uid,
    email:currentUser.email || "",
    firstName,
    lastName,
    address,
    city,
    destination:city,
    items:orderItems,
    total,
    status:"Commande enregistrée",
    paymentMethod:
      payment === "card"
        ? "Carte bancaire"
        : "PayPal",
    paymentStatus:
      payment === "card"
        ? "Payé"
        : "En attente",
    truckLocation:"Centre de préparation",
    tracking:"En attente",
    deliveryDate:"À définir",
    createdAt:serverTimestamp(),
    updatedAt:serverTimestamp()
  };


  try{

    const orderRef =
      await addDoc(
        collection(db,"orders"),
        order
      );


    if(payment === "paypal"){

      const paypalUrl =
        `https://paypal.me/SH0PNOVA/${total}EUR`;

      window.open(
        paypalUrl,
        "_blank"
      );

    }


    cart = [];

    saveCart();
    renderCart();

    closeModal();
    closeCart();


    showInvoice({
      ...order,
      id:orderRef.id
    });


    toast(
      "Commande enregistrée 📦",
      "success"
    );


  }catch(error){

    console.error(error);

    toast(
      "Impossible d'enregistrer la commande.",
      "error"
    );

  }

}


// ============================================================
// FACTURE
// ============================================================

function showInvoice(order){

  const items =
    Array.isArray(order.items)
      ? order.items
      : [];


  showModal(
    "🧾 Commande confirmée",
    `

      <div style="
        display:grid;
        gap:16px;
      ">

        <div class="trust-card">

          <strong>
            Merci pour ta commande 🎉
          </strong>

          <p style="
            margin-top:8px;
            color:var(--muted)
          ">
            Numéro :
            #${escapeHTML(
              order.id
            )}
          </p>

          <p style="
            margin-top:6px;
            color:var(--muted)
          ">
            Statut :
            ${escapeHTML(
              order.status
            )}
          </p>

        </div>


        <div class="trust-card">

          ${items.map(item=>`

            <div style="
              display:flex;
              justify-content:space-between;
              gap:12px;
              padding:8px 0;
              border-bottom:1px solid var(--line);
            ">

              <span>
                ${escapeHTML(item.name)}
                ×${Number(item.quantity || 1)}
              </span>

              <strong>
                ${money(
                  Number(item.price || 0) *
                  Number(item.quantity || 1)
                )}
              </strong>

            </div>

          `).join("")}


          <div style="
            display:flex;
            justify-content:space-between;
            margin-top:14px;
            font-size:22px;
          ">

            <strong>
              Total
            </strong>

            <strong>
              ${money(order.total)}
            </strong>

          </div>

        </div>


        <button
          type="button"
          class="add-btn"
          id="invoiceOrdersBtn"
        >
          📦 Voir ma commande
        </button>

      </div>

    `
  );


  document
    .getElementById("invoiceOrdersBtn")
    ?.addEventListener(
      "click",
      openOrders
    );

}// ============================================================
// ADMIN
// ============================================================

function isAdmin(){

  return currentUser &&
    currentUser.email?.toLowerCase() ===
      ADMIN_EMAIL.toLowerCase();

}


// ============================================================
// OUVRIR ADMIN
// ============================================================

function openAdmin(){

  if(!isAdmin()){

    toast(
      "Accès administrateur refusé.",
      "error"
    );

    return;
  }


  const alreadyAuthorized =
    localStorage.getItem(
      ADMIN_ACCESS_KEY
    ) === "true";


  if(!alreadyAuthorized){

    const code =
      prompt(
        "Code administrateur :"
      );

    if(code !== ADMIN_CODE){

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


  loadAdminOrders();

}


// ============================================================
// CHARGER COMMANDES ADMIN
// ============================================================

async function loadAdminOrders(){

  showModal(
    "🛡️ Administration NovaShop",
    `
      <p style="color:var(--muted)">
        Chargement des commandes...
      </p>
    `
  );


  try{

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );


    const orders =
      snapshot.docs
        .map(item=>({
          id:item.id,
          ...item.data()
        }))
        .sort(
          (a,b)=>{

            const aTime =
              a.createdAt?.seconds || 0;

            const bTime =
              b.createdAt?.seconds || 0;

            return bTime - aTime;

          }
        );


    showAdminOrders(orders);


  }catch(error){

    console.error(error);

    showModal(
      "🛡️ Administration",
      `
        <div class="empty-products">
          Impossible de charger les commandes.
        </div>
      `
    );

  }

}


// ============================================================
// AFFICHER ADMIN
// ============================================================

function showAdminOrders(orders){

  showModal(
    "🛡️ Administration NovaShop",
    `

      <div style="
        display:grid;
        gap:15px;
      ">

        <div class="trust-card">

          <strong>
            Administration
          </strong>

          <p style="
            margin-top:8px;
            color:var(--muted)
          ">
            ${orders.length}
            commande${orders.length > 1 ? "s" : ""}
          </p>

        </div>


        ${
          orders.length
          ?
          orders.map(order=>`

            <div
              class="admin-order trust-card"
              data-admin-order="${escapeAttr(order.id)}"
            >

              <div style="
                display:flex;
                justify-content:space-between;
                gap:12px;
                flex-wrap:wrap;
              ">

                <strong>
                  #${escapeHTML(
                    order.id.slice(0,8)
                  )}
                </strong>

                <span style="
                  color:var(--accent);
                  font-weight:900;
                ">
                  ${escapeHTML(
                    order.status ||
                    "Commande enregistrée"
                  )}
                </span>

              </div>


              <p style="
                margin-top:8px;
                color:var(--muted)
              ">
                Client :
                ${escapeHTML(
                  order.email || "Inconnu"
                )}
              </p>


              <p style="
                margin-top:5px;
                color:var(--muted)
              ">
                Total :
                <strong>
                  ${money(order.total)}
                </strong>
              </p>


              <label style="
                display:block;
                margin-top:14px;
                font-weight:800;
              ">
                Statut

                <select
                  class="input admin-status"
                  data-id="${escapeAttr(order.id)}"
                  style="margin-top:6px"
                >

                  <option
                    value="Commande enregistrée"
                    ${
                      order.status ===
                      "Commande enregistrée"
                      ? "selected"
                      : ""
                    }
                  >
                    Commande enregistrée
                  </option>

                  <option
                    value="Préparation"
                    ${
                      order.status ===
                      "Préparation"
                      ? "selected"
                      : ""
                    }
                  >
                    Préparation
                  </option>

                  <option
                    value="Expédiée"
                    ${
                      order.status ===
                      "Expédiée"
                      ? "selected"
                      : ""
                    }
                  >
                    Expédiée
                  </option>

                  <option
                    value="En livraison"
                    ${
                      order.status ===
                      "En livraison"
                      ? "selected"
                      : ""
                    }
                  >
                    En livraison
                  </option>

                  <option
                    value="Livrée"
                    ${
                      order.status ===
                      "Livrée"
                      ? "selected"
                      : ""
                    }
                  >
                    Livrée
                  </option>

                </select>

              </label>


              <label style="
                display:block;
                margin-top:12px;
                font-weight:800;
              ">
                Ville de destination

                <input
                  class="input admin-destination"
                  data-id="${escapeAttr(order.id)}"
                  value="${escapeAttr(
                    order.destination ||
                    order.city ||
                    ""
                  )}"
                  style="margin-top:6px"
                  placeholder="Ville"
                >

              </label>


              <label style="
                display:block;
                margin-top:12px;
                font-weight:800;
              ">
                Localisation du colis

                <input
                  class="input admin-location"
                  data-id="${escapeAttr(order.id)}"
                  value="${escapeAttr(
                    order.truckLocation ||
                    ""
                  )}"
                  style="margin-top:6px"
                  placeholder="Ex : Centre de Lille"
                >

              </label>


              <label style="
                display:block;
                margin-top:12px;
                font-weight:800;
              ">
                Numéro de suivi

                <input
                  class="input admin-tracking"
                  data-id="${escapeAttr(order.id)}"
                  value="${escapeAttr(
                    order.tracking ||
                    ""
                  )}"
                  style="margin-top:6px"
                  placeholder="Numéro de suivi"
                >

              </label>


              <label style="
                display:block;
                margin-top:12px;
                font-weight:800;
              ">
                Livraison estimée

                <input
                  class="input admin-delivery"
                  data-id="${escapeAttr(order.id)}"
                  value="${escapeAttr(
                    order.deliveryDate ||
                    ""
                  )}"
                  style="margin-top:6px"
                  placeholder="Ex : 25 septembre 2026"
                >

              </label>


              <div style="
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:8px;
                margin-top:15px;
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
                  💳 Marquer payé
                </button>

              </div>


              <div style="
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:8px;
                margin-top:8px;
              ">

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
                  style="color:var(--red)"
                >
                  🗑️ Supprimer
                </button>

              </div>

            </div>

          `).join("")
          :
          `
            <div class="empty-products">
              Aucune commande.
            </div>
          `
        }


        <button
          type="button"
          class="view-btn"
          id="adminLogout"
        >
          🔒 Verrouiller l'administration
        </button>

      </div>

    `
  );


  document
    .querySelectorAll(".admin-save")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>saveAdminOrder(
          button.dataset.id
        )
      );

    });


  document
    .querySelectorAll(".admin-paid")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>markOrderPaid(
          button.dataset.id
        )
      );

    });


  document
    .querySelectorAll(".admin-invoice")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{

          const order =
            orders.find(
              item =>
                item.id ===
                button.dataset.id
            );

          if(order){
            showInvoice(order);
          }

        }
      );

    });


  document
    .querySelectorAll(".admin-delete")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>deleteAdminOrder(
          button.dataset.id
        )
      );

    });


  document
    .getElementById("adminLogout")
    ?.addEventListener(
      "click",
      ()=>{

        localStorage.removeItem(
          ADMIN_ACCESS_KEY
        );

        closeModal();

        toast(
          "Administration verrouillée.",
          "success"
        );

      }
    );

}


// ============================================================
// ENREGISTRER MODIFICATIONS ADMIN
// ============================================================

async function saveAdminOrder(orderId){

  if(!isAdmin()){
    return;
  }


  const status =
    document
      .querySelector(
        `.admin-status[data-id="${CSS.escape(orderId)}"]`
      )
      ?.value ||
      "Commande enregistrée";


  const destination =
    document
      .querySelector(
        `.admin-destination[data-id="${CSS.escape(orderId)}"]`
      )
      ?.value
      .trim() ||
      "";


  const truckLocation =
    document
      .querySelector(
        `.admin-location[data-id="${CSS.escape(orderId)}"]`
      )
      ?.value
      .trim() ||
      "";


  const tracking =
    document
      .querySelector(
        `.admin-tracking[data-id="${CSS.escape(orderId)}"]`
      )
      ?.value
      .trim() ||
      "";


  const deliveryDate =
    document
      .querySelector(
        `.admin-delivery[data-id="${CSS.escape(orderId)}"]`
      )
      ?.value
      .trim() ||
      "";


  try{

    await updateDoc(
      doc(db,"orders",orderId),
      {
        status,
        destination,
        truckLocation,
        tracking,
        deliveryDate,
        updatedAt:serverTimestamp()
      }
    );


    toast(
      "Commande mise à jour ✅",
      "success"
    );


    setTimeout(
      loadAdminOrders,
      400
    );


  }catch(error){

    console.error(error);

    toast(
      "Impossible de modifier la commande.",
      "error"
    );

  }

}


// ============================================================
// MARQUER PAYÉ
// ============================================================

async function markOrderPaid(orderId){

  if(!isAdmin()){
    return;
  }


  try{

    await updateDoc(
      doc(db,"orders",orderId),
      {
        paymentStatus:"Payé",
        updatedAt:serverTimestamp()
      }
    );


    toast(
      "Commande marquée comme payée 💳",
      "success"
    );


    setTimeout(
      loadAdminOrders,
      400
    );


  }catch(error){

    console.error(error);

    toast(
      "Impossible de modifier le paiement.",
      "error"
    );

  }

}


// ============================================================
// SUPPRIMER COMMANDE
// ============================================================

async function deleteAdminOrder(orderId){

  if(!isAdmin()){
    return;
  }


  const confirmDelete =
    confirm(
      "Supprimer définitivement cette commande ?"
    );


  if(!confirmDelete){
    return;
  }


  try{

    await deleteDoc(
      doc(db,"orders",orderId)
    );


    toast(
      "Commande supprimée.",
      "success"
    );


    setTimeout(
      loadAdminOrders,
      400
    );


  }catch(error){

    console.error(error);

    toast(
      "Impossible de supprimer la commande.",
      "error"
    );

  }

}


// ============================================================
// BOUTONS
// ============================================================

settingsBtn?.addEventListener(
  "click",
  openSettings
);

accountBtn?.addEventListener(
  "click",
  openAccount
);

ordersBtn?.addEventListener(
  "click",
  openOrders
);

adminBtn?.addEventListener(
  "click",
  openAdmin
);


// ============================================================
// AUTHENTIFICATION
// ============================================================

onAuthStateChanged(
  auth,
  user=>{

    currentUser = user;


    if(currentUser){

      accountBtn.textContent =
        "👤 Compte";

      if(isAdmin()){

        adminBtn.style.display =
          "inline-flex";

      }else{

        adminBtn.style.display =
          "none";

      }

    }else{

      accountBtn.textContent =
        "👤 Compte";

      adminBtn.style.display =
        "none";

    }

  }
);


// ============================================================
// RACCOURCIS CLAVIER
// ============================================================

document.addEventListener(
  "keydown",
  event=>{

    if(event.key === "Escape"){

      closeModal();
      closeCart();

    }

  }
);


// ============================================================
// ERREURS NON GÉRÉES
// ============================================================

window.addEventListener(
  "unhandledrejection",
  event=>{

    console.error(
      "NovaShop erreur :",
      event.reason
    );

  }
);


// ============================================================
// INITIALISATION
// ============================================================

function initNovaShop(){

  try{

    applyTheme();

    renderCategories();

    renderProducts();

    renderCart();

    console.log(
      "NovaShop chargé avec succès 🚀"
    );

  }catch(error){

    console.error(
      "Erreur initialisation NovaShop :",
      error
    );

    if(productsGrid){

      productsGrid.innerHTML = `
        <div class="empty-products">
          <h3>
            Erreur de chargement
          </h3>

          <p style="margin-top:8px">
            Ouvre la console du navigateur
            pour voir l'erreur.
          </p>
        </div>
      `;

    }

  }

}


initNovaShop();


// ============================================================
// API NOVASHOP
// ============================================================

window.NovaShop = {

  products,

  get currentUser(){
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
