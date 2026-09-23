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
  apiKey:"AIzaSyAZ5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
  authDomain:"novashop-4ee63.firebaseapp.com",
  projectId:"novashop-4ee63",
  storageBucket:"novashop-4ee63.firebasestorage.app",
  messagingSenderId:"1044964015809",
  appId:"1:1044964015809:web:4eafe0b1aede48f8539e40",
  measurementId:"G-XNY5X2VMY9"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


// ============================================================
// ADMIN
// ============================================================

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";
const ADMIN_ACCESS_KEY = "novaAdminAuthorized";


// ============================================================
// STOCKAGE
// ============================================================

const CART_KEY = "nova_cart";
const FAVORITES_KEY = "nova_favorites";
const TEST_CARD_STORAGE_KEY = "novaTestCard";


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
      Couleur:["Rouge","Blanc","Noir","Bleu"]
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
    name:"iiyama 23.8\" LED - G-Master GB2471HS-B1 Red Eagle",
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
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/4a/5f/b3/28532554/1540-1/Google-Pixel-10-6-3-5G-Double-SIM-256-Go-Noir-Volcanique.jpg"
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
    image:"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRTbZBP9B2ZFpEsUD0AvNVwSq0_B-6_0GsDu3IetIMN8RMZJ2lyTDuYx7bb9GPIQjXhISHbaR4aEk-SzagBrynePs6wAuNpNgtJ3t4ZQj0FS9_oBKzFpPBG7Q"
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
    name:"KTC Écran PC Gamer Incurvé 24 Pouces FHD 240 Hz",
    category:"Supports écrans / écrans / TV",
    price:80,
    image:"https://m.media-amazon.com/images/I/71wUlFXcaZL._AC_SL1500_.jpg"
  },

  {
    id:"p77",
    name:"KTC Écran PC Gamer Incurvé 27 Pouces QHD 180Hz",
    category:"Supports écrans / écrans / TV",
    price:110,
    image:"https://m.media-amazon.com/images/I/61Rehn5YTWL._AC_SL1000_.jpg"
  },

  {
    id:"p78",
    name:"HKC Écran PC Gaming 34 Pouces Incurvé UWQHD 120 Hz HDR400",
    category:"Supports écrans / écrans / TV",
    price:170,
    image:"https://m.media-amazon.com/images/I/71useoNrGEL._AC_SL1500_.jpg"
  },

  {
    id:"p79",
    name:"HKC 27 Pouces Ecran Gaming 4K Dual Mode UHD 160Hz / FHD 320Hz G27H7P",
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
    image:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ6wIhtxNP2QaG-jop_9zEc3ocgOoyylR8yGQtaOLB03vo8XmDPnxXQ28G-mPSoQrkAa8KKzGM2epP28dnD111Wswi0WwK5SzwB6lXHJD3HehOVs4qWa_hJ",
    options:{
      Couleur:["Rose","Bleu","Noir","Rouge","Blanc","Vert"]
    }
  },

  {
    id:"p82",
    name:"PlayStation 5 avec 1 Manette Sans Fil DualSense",
    category:"Manettes & consoles",
    price:320,
    image:"https://m.media-amazon.com/images/I/61h7VjYt-fL._AC_SL1500_.jpg",
    options:{
      Console:["PS5 avec lecteur","PS5 Pro"]
    }
  },

  {
    id:"p83",
    name:"Xbox Series X - 1TB Digital Edition avec 1 manette sans fil",
    category:"Manettes & consoles",
    price:599.99,
    image:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTcusD9yD4CjvQ0KMaGfy7gks_86ZGPuTzO_g1WC408gKBPciVCGw0ZWdXs1XwR0ShylmqAB0NldAlBiHbyg-vFex0zI51YOExZsztGXboUXrL31Z5qHNHDew"
  },

  {
    id:"p84",
    name:"Xbox Series S - All Digital Gaming Console - 512GB SSD",
    category:"Manettes & consoles",
    price:500,
    image:"https://m.media-amazon.com/images/I/61PI59RfWvL._AC_SX425_.jpg"
  },

  {
    id:"p85",
    name:"AMD Ryzen 7 7800X3D Processeur avec La Technologie 3D V-Cache",
    category:"Composants PC",
    price:210,
    image:"https://m.media-amazon.com/images/I/51HqC0rU9HL._AC_SL1500_.jpg"
  },

  {
    id:"p86",
    name:"Gigabyte GeForce RTX 5060 Gaming OC 8 GB GDDR7 Carte Graphique",
    category:"Composants PC",
    price:370,
    image:"https://owp.klarna.com/product/3255091236/Gigabyte-GeForce-RTX-5060-Gaming-OC-8-GB-GDDR7-Carte-Graphique.jpg"
  },

  {
    id:"p87",
    name:"Kingston Fury Beast 16 Go (kit de 2 x 8 Go) DDR4 3200 MHz CL16",
    category:"Composants PC",
    price:130,
    image:"https://media.carrefour.fr/medias/200b40feb62d42f6a4c771cda396d77b/p_1500x1500/243be29db1e34fc180ed7c680853713a_image.jpg"
  },

  {
    id:"p88",
    name:"Kingston Fury Beast RGB - 2 x 8 Go (16 Go) - DDR5 5600 MHz - CL40",
    category:"Composants PC",
    price:224.99,
    image:"https://media.materiel.net/r1600/products/MN0005959138_0005959149_0005959155.jpg"
  },

  {
    id:"p89",
    name:"PC de bureau gaming NitroPC Avancé - AMD Ryzen 5 3400G, Radeon Graphics, 16 GB RAM, 480 GB SSD, Windows 11 Pro",
    category:"PC Gamer préconstruits",
    price:400,
    image:"https://media.cdn.kaufland.de/product-images/1024x1024/57311bd00475df1753bd85ef932af8d2.webp"
  },

  {
    id:"p90",
    name:"PC Gamer FIREFLY",
    category:"PC Gamer préconstruits",
    price:500,
    image:"https://powerlab.fr/24081-large_default/pc-gamer-firefly-rtx-5060-ti.jpg"
  },

  {
    id:"p91",
    name:"PC - CSL Sprint 5700 (Ryzen 7)",
    category:"PC Gamer préconstruits",
    price:700,
    image:"https://www.csl-computer.com/fr/media/catalog/product/cache/5/image/3000x3000/9df78eab33525d08d6e5fb8d27136e95/c/s/csl_aerovision-haupt_c40_nvidia_rot_3000px_3.webp"
  },

  {
    id:"p92",
    name:"STGsivir PC Gamer Fixe, Ryzen 5 3400G, Vega 11, 16G DDR4, 512G SSD",
    category:"PC Gamer préconstruits",
    price:499.99,
    image:"https://m.media-amazon.com/images/I/71klP2vcMEL._AC_SL1500_.jpg"
  },

  {
    id:"p93",
    name:"Unité centrale Gamer MSI EDM0009-R5/RTX 5060/16Go/480Go",
    category:"PC Gamer préconstruits",
    price:565.99,
    image:"https://www.electrodepot.fr/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/P10019951.jpg"
  },

  {
    id:"p94",
    name:"ROG Strix G16 (2025) G615",
    category:"PC portables Gaming & Travail",
    price:1200,
    image:"https://dlcdnwebimgs.asus.com/gain/E20134EE-F6B3-4AB7-A1B5-73795E91011D/w717/h525/fwebp"
  },

  {
    id:"p95",
    name:"PC Portable HP OmniBook 3 17-dk0006nf",
    category:"PC portables Gaming & Travail",
    price:600,
    image:"https://www.hp.com/fr-fr/shop/media/catalog/product/c/o/costa_17_dfplus_ob3_cs_glaciersilver_t_nt_fhd_ir_non-backlit_freedos_catalog_front_5964372_cus_1.png?store=fr-fr&image-type=image&auto=avif&quality=100&format=jpg&bg-color=ffffff&type=image-product&width=100p&fit=bounds"
  },

  {
    id:"p96",
    name:"PC portable HP Victus by HP Laptop 16-d1148nf",
    category:"PC portables Gaming & Travail",
    price:500,
    image:"https://image.darty.com/darty?type=image&source=photos/2022/10/26/7081693A_163303179.jpg&height=457"
  },

  {
    id:"p97",
    name:"Razer BlackWidow V4 Pro (Switches Jaune) - Clavier Gamer Mécanique Snap Tap, 8 Touches Macro, Repose-Poignet, AZERTY FR",
    category:"Claviers",
    price:76.99,
    image:"https://m.media-amazon.com/images/I/81az+Oft-qL._AC_SL1500_.jpg"
  },

  {
    id:"p98",
    name:"SteelSeries Apex Pro TKL Gen 3 – Commutateurs magnétiques analogiques OmniPoint 3.0, OLED, RGB, USB-C, FR AZERTY",
    category:"Claviers",
    price:44.90,
    image:"https://m.media-amazon.com/images/I/719h65mTOEL._AC_SL1500_.jpg"
  },

  {
    id:"p99",
    name:"ROG Strix Scope II 96 WL - Clavier gaming 96%, switches mécaniques, AZERTY",
    category:"Claviers",
    price:40,
    image:"https://m.media-amazon.com/images/I/71zmZbiUeAL._AC_SL1500_.jpg"
  },

  {
    id:"p100",
    name:"CORSAIR K70 PRO TKL - Clavier gaming programmable à effet Hall hautes performances avec déclenchement rapide (FR)",
    category:"Claviers",
    price:56,
    image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_1100,w_1100/products/Gaming-Keyboards/K70-PRO-TKL-APAC/Gallery/CH-911911G-JP/K70_PRO_TKL_BLACK_03.webp"
  },

  {
    id:"p101",
    name:"Razer Viper V3 Pro",
    category:"Souris",
    price:42,
    image:"https://assets3.razerzone.com/02qK-glNv1jIlWfqTGAu7tkinI8=/1500x1000/https%3A%2F%2Fmedias-p1.phoenix.razer.com%2Fsys-master-phoenix-images-container%2Fhf0%2Fhba%2F9926492422174%2F250630-viper-v3-pro-faker-1500x1000-1.jpg"
  },

  {
    id:"p102",
    name:"SteelSeries Aerox 5 Wireless",
    category:"Souris",
    price:50,
    image:"https://images.ctfassets.net/hmm5mo4qf4mf/Y5b4NuEOsLlGhzxCjj9Vf/697e03b1c784f66cb82b3a529964666f/aerox_5_wl_black_img_buy_01.png__1920x1080_crop-fit_optimize_subsampling-2-900.png?fm=webp&q=90&fit=scale&w=1200"
  },

  {
    id:"p103",
    name:"Razer Gigantus V2 XXL - Tapis de souris gaming souple 940 x 410 x 4mm",
    category:"Tapis de souris",
    price:15,
    image:"https://m.media-amazon.com/images/I/61HtU7NkHQL._AC_SL1500_.jpg"
  },

  {
    id:"p104",
    name:"Logitech G840 Tapis de Souris de Jeu Extra Large - 900 x 400 x 3 mm",
    category:"Tapis de souris",
    price:30,
    image:"https://m.media-amazon.com/images/I/51jlC3sL0BL._AC_SL1500_.jpg"
  },

  {
    id:"p105",
    name:"SteelSeries QcK Heavy XXL - Tapis de souris gaming en tissu - Base antidérapante 6mm",
    category:"Tapis de souris",
    price:15,
    image:"https://m.media-amazon.com/images/I/41HRqeeyZ0L._AC_SL1500_.jpg"
  }

];


// ============================================================
// ÉTAT
// ============================================================

let currentUser = null;

let cart = loadStorage(
  CART_KEY,
  []
);

let favorites = loadStorage(
  FAVORITES_KEY,
  []
);

const state = {
  search:"",
  category:"Toutes",
  sort:"default"
};


// ============================================================
// DOM
// ============================================================

const $ = id =>
  document.getElementById(id);

const settingsBtn =
  $("settingsBtn");

const accountBtn =
  $("accountBtn");

const ordersBtn =
  $("ordersBtn");

const adminBtn =
  $("adminBtn");

const cartBtn =
  $("cartBtn");

const cartBadge =
  $("cartBadge");

const heroCartBtn =
  $("heroCartBtn");

const searchInput =
  $("searchInput");

const sortSelect =
  $("sortSelect");

const categoriesEl =
  $("categories");

const productCount =
  $("productCount");

const productGrid =
  $("productGrid");

const overlay =
  $("overlay");

const cartDrawer =
  $("cartDrawer");

const closeCartBtn =
  $("closeCart");

const cartItemsEl =
  $("cartItems");

const cartTotalEl =
  $("cartTotal");

const checkoutBtn =
  $("checkoutBtn");

const modal =
  $("modalLayer");

const modalTitle =
  $("modalTitle");

const modalClose =
  $("modalClose");

const modalContent =
  $("modalContent");

const toastEl =
  $("toast");


// ============================================================
// STORAGE
// ============================================================

function loadStorage(
  key,
  fallback
){

  try{

    const value =
      localStorage.getItem(key);

    if(!value){
      return fallback;
    }

    const parsed =
      JSON.parse(value);

    return parsed;

  }catch(error){

    console.warn(
      "Storage error:",
      key,
      error
    );

    return fallback;

  }

}


function saveStorage(
  key,
  value
){

  try{

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  }catch(error){

    console.warn(
      "Impossible de sauvegarder:",
      key,
      error
    );

  }

}


function saveCart(){

  saveStorage(
    CART_KEY,
    cart
  );

}


function saveFavorites(){

  saveStorage(
    FAVORITES_KEY,
    favorites
  );

}


// ============================================================
// UTILITAIRES
// ============================================================

function money(value){

  const number =
    Number(value) || 0;

  return number.toLocaleString(
    "fr-FR",
    {
      minimumFractionDigits:2,
      maximumFractionDigits:2
    }
  ) + " €";

}


function escapeHTML(value){

  return String(
    value ?? ""
  )
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");

}


function escapeAttr(value){

  return escapeHTML(value);

}


function getProduct(id){

  return products.find(
    product =>
      product.id === id
  );

}


// ============================================================
// TOAST
// ============================================================

function toast(
  message,
  type = "info"
){

  if(!toastEl){

    alert(message);

    return;

  }

  toastEl.textContent =
    message;

  toastEl.className =
    `toast show ${type}`;

  clearTimeout(
    toastEl._timer
  );

  toastEl._timer =
    setTimeout(
      () => {

        toastEl.className =
          "toast";

      },
      3000
    );

}


// ============================================================
// STYLE DES BOUTONS
// ============================================================

function injectNovaStyles(){

  if(
    document.getElementById(
      "novaInjectedStyles"
    )
  ){

    return;

  }

  const style =
    document.createElement(
      "style"
    );

  style.id =
    "novaInjectedStyles";

  style.textContent = `

    .product-actions{
      display:flex;
      gap:8px;
      align-items:center;
      margin-top:12px;
    }

    .product-actions button{
      border:0;
      cursor:pointer;
      transition:.2s ease;
      font-family:inherit;
    }

    .product-actions .add-btn{
      flex:1;
    }

    .favorite-btn{
      width:42px;
      height:42px;
      border-radius:12px;
      display:flex;
      align-items:center;
      justify-content:center;
      background:rgba(255,255,255,.07);
      border:1px solid rgba(255,255,255,.10)!important;
      color:#fff;
      font-size:18px;
    }

    .favorite-btn:hover{
      transform:translateY(-2px);
      background:rgba(45,140,255,.16);
    }

    .favorite-btn.active{
      color:#ff4f81;
      border-color:rgba(255,79,129,.35)!important;
      background:rgba(255,79,129,.10);
    }

    .add-btn,
    .view-btn{
      border:0;
      cursor:pointer;
      border-radius:12px;
      padding:11px 15px;
      font-weight:700;
      transition:.2s ease;
      font-family:inherit;
    }

    .add-btn{
      background:#2d8cff;
      color:#fff;
      box-shadow:0 8px 20px rgba(45,140,255,.20);
    }

    .add-btn:hover{
      transform:translateY(-2px);
      box-shadow:0 12px 26px rgba(45,140,255,.30);
    }

    .view-btn{
      background:rgba(255,255,255,.07);
      color:inherit;
      border:1px solid rgba(255,255,255,.10);
    }

    .view-btn:hover{
      transform:translateY(-2px);
      background:rgba(45,140,255,.12);
      border-color:rgba(45,140,255,.35);
    }

    .payment-choice.selected,
    .theme-choice.selected{
      border-color:#2d8cff;
      background:rgba(45,140,255,.15);
      box-shadow:0 0 0 2px rgba(45,140,255,.10);
    }

    .cart-quantity{
      display:flex;
      align-items:center;
      gap:7px;
    }

    .cart-quantity button{
      width:30px;
      height:30px;
      border-radius:9px;
      border:1px solid rgba(255,255,255,.10);
      background:rgba(255,255,255,.06);
      color:inherit;
      cursor:pointer;
      font-weight:800;
    }

    .cart-quantity button:hover{
      background:#2d8cff;
      color:#fff;
    }

    .admin-order button{
      min-height:40px;
    }

    input,
    textarea,
    select{
      border-radius:11px!important;
    }

    .nova-empty{
      grid-column:1/-1;
      text-align:center;
      padding:50px 20px;
      border:1px solid rgba(255,255,255,.08);
      border-radius:18px;
      background:rgba(255,255,255,.03);
    }

    .nova-product-image{
      width:100%;
      height:100%;
      object-fit:contain;
      display:block;
    }

    .nova-image-box{
      width:100%;
      height:165px;
      display:flex;
      align-items:center;
      justify-content:center;
      overflow:hidden;
      background:#fff;
      border-radius:14px;
    }

  `;

  document.head.appendChild(
    style
  );

}


// ============================================================
// CATÉGORIES
// ============================================================

function renderCategories(){

  if(!categoriesEl){
    return;
  }

  const categories = [
    "Toutes",
    ...new Set(
      products.map(
        product =>
          product.category
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
      "button"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          state.category =
            button.dataset.category ||
            "Toutes";

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
    [...products];

  const search =
    state.search
      .trim()
      .toLowerCase();

  if(search){

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

  if(
    state.category !==
    "Toutes"
  ){

    result =
      result.filter(
        product =>
          product.category ===
          state.category
      );

  }

  switch(
    state.sort
  ){

    case "price-low":

      result.sort(
        (a,b) =>
          Number(a.price) -
          Number(b.price)
      );

      break;

    case "price-high":

      result.sort(
        (a,b) =>
          Number(b.price) -
          Number(a.price)
      );

      break;

    case "name":

      result.sort(
        (a,b) =>
          a.name.localeCompare(
            b.name,
            "fr"
          )
      );

      break;

    case "new":

      result.sort(
        (a,b) =>
          Number(Boolean(b.new)) -
          Number(Boolean(a.new))
      );

      break;

  }

  return result;

}


// ============================================================
// IMAGE PRODUIT
// ============================================================

function productImageHTML(
  product
){

  if(!product.image){

    return `
      <div
        class="nova-image-box"
        aria-hidden="true"
      ></div>
    `;

  }

  return `
    <div class="nova-image-box">
      <img
        class="nova-product-image"
        src="${escapeAttr(product.image)}"
        alt="${escapeAttr(product.name)}"
        loading="lazy"
        onerror="
          this.style.display='none';
        "
      >
    </div>
  `;

}


// ============================================================
// RENDU PRODUITS
// ============================================================

function renderProducts(){

  if(!productGrid){
    console.error(
      "NovaShop: productGrid introuvable."
    );
    return;
  }

  const result =
    getFilteredProducts();

  if(productCount){

    productCount.textContent =
      `${result.length} produit${
        result.length > 1
          ? "s"
          : ""
      }`;

  }

  if(!result.length){

    productGrid.innerHTML = `
      <div class="nova-empty">

        <div style="
          font-size:42px;
          margin-bottom:10px;
        ">
          🔎
        </div>

        <h3>
          Aucun produit trouvé
        </h3>

        <p style="
          opacity:.7;
          margin-top:8px;
        ">
          Essaie une autre recherche ou catégorie.
        </p>

      </div>
    `;

    return;

  }

  productGrid.innerHTML =
    result.map(
      product => {

        const favorite =
          favorites.includes(
            product.id
          );

        return `
          <article
            class="product"
            data-id="${escapeAttr(product.id)}"
          >

            <div class="product-img">
              ${productImageHTML(product)}
            </div>

            <div class="product-body">

              ${
                product.new
                  ? `
                    <span style="
                      display:inline-block;
                      padding:5px 8px;
                      border-radius:8px;
                      background:rgba(37,214,149,.12);
                      color:#25d695;
                      font-size:11px;
                      font-weight:800;
                      margin-bottom:8px;
                    ">
                      NOUVEAU
                    </span>
                  `
                  : ""
              }

              <div style="
                font-size:11px;
                opacity:.6;
                margin-bottom:5px;
              ">
                ${escapeHTML(
                  product.category
                )}
              </div>

              <h3>
                ${escapeHTML(
                  product.name
                )}
              </h3>

              <div class="price">
                ${money(product.price)}
              </div>

              <div class="product-actions">

                <button
                  type="button"
                  class="add-btn"
                  data-action="add"
                  data-id="${escapeAttr(product.id)}"
                >
                  Ajouter
                </button>

                <button
                  type="button"
                  class="favorite-btn ${
                    favorite
                      ? "active"
                      : ""
                  }"
                  data-action="favorite"
                  data-id="${escapeAttr(product.id)}"
                  aria-label="Favori"
                >
                  ${
                    favorite
                      ? "♥"
                      : "♡"
                  }
                </button>

              </div>

              <button
                type="button"
                class="view-btn"
                data-action="view"
                data-id="${escapeAttr(product.id)}"
                style="
                  width:100%;
                  margin-top:8px;
                "
              >
                Voir le produit
              </button>

            </div>

          </article>
        `;

      }
    ).join("");

  productGrid
    .querySelectorAll(
      "[data-action]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.id;

          const action =
            button.dataset.action;

          if(action === "add"){

            addToCart(id);

          }else if(
            action === "favorite"
          ){

            toggleFavorite(id);

          }else if(
            action === "view"
          ){

            openProduct(id);

          }

        }
      );

    });

}


// ============================================================
// FAVORIS
// ============================================================

function toggleFavorite(id){

  if(
    favorites.includes(id)
  ){

    favorites =
      favorites.filter(
        item =>
          item !== id
      );

    toast(
      "Retiré des favoris."
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


// ============================================================
// OPTIONS PRODUIT
// ============================================================

function buildProductOptions(
  product
){

  if(
    !product.options ||
    !Object.keys(product.options).length
  ){

    return "";

  }

  return `
    <div style="
      display:grid;
      gap:12px;
      margin:18px 0;
    ">

      ${
        Object.entries(
          product.options
        ).map(
          ([name,values]) => `
            <div>

              <label
                for="option_${escapeAttr(name)}"
              >
                ${escapeHTML(name)}
              </label>

              <select
                id="option_${escapeAttr(name)}"
                class="product-option"
                data-option-name="${escapeAttr(name)}"
              >

                <option value="">
                  Choisir
                </option>

                ${
                  values.map(
                    value => `
                      <option
                        value="${escapeAttr(value)}"
                      >
                        ${escapeHTML(value)}
                      </option>
                    `
                  ).join("")
                }

              </select>

            </div>
          `
        ).join("")
      }

    </div>
  `;

}


// ============================================================
// MODAL
// ============================================================

function showModal(
  title,
  content
){

  if(!modal){
    return;
  }

  if(modalTitle){
    modalTitle.textContent =
      title;
  }

  if(modalContent){
    modalContent.innerHTML =
      content;
  }

  modal.classList.add(
    "show"
  );

  document.body.classList.add(
    "modal-open"
  );

}


function closeModal(){

  if(!modal){
    return;
  }

  modal.classList.remove(
    "show"
  );

  document.body.classList.remove(
    "modal-open"
  );

}


// ============================================================
// PRODUIT
// ============================================================

function openProduct(id){

  const product =
    getProduct(id);

  if(!product){
    return;
  }

  showModal(
    product.name,
    `

      <div>

        ${productImageHTML(product)}

        <div style="
          margin-top:18px;
        ">

          <div style="
            opacity:.6;
            font-size:13px;
          ">
            ${escapeHTML(
              product.category
            )}
          </div>

          <h2 style="
            margin-top:5px;
          ">
            ${escapeHTML(
              product.name
            )}
          </h2>

          <div style="
            font-size:25px;
            font-weight:900;
            margin-top:12px;
          ">
            ${money(product.price)}
          </div>

        </div>

        ${buildProductOptions(product)}

        <div style="
          display:flex;
          gap:10px;
          margin-top:15px;
        ">

          <button
            type="button"
            class="add-btn"
            id="modalAddToCart"
            style="flex:1;"
          >
            🛒 Ajouter au panier
          </button>

          <button
            type="button"
            class="favorite-btn ${
              favorites.includes(product.id)
                ? "active"
                : ""
            }"
            id="modalFavorite"
          >
            ${
              favorites.includes(product.id)
                ? "♥"
                : "♡"
            }
          </button>

        </div>

      </div>

    `
  );

  $("modalAddToCart")
    ?.addEventListener(
      "click",
      () => {

        const optionElements =
          document.querySelectorAll(
            ".product-option"
          );

        const selectedOptions = [];

        optionElements.forEach(
          select => {

            const value =
              select.value;

            if(value){

              selectedOptions.push(
                `${select.dataset.optionName}: ${value}`
              );

            }

          }
        );

        if(
          optionElements.length &&
          selectedOptions.length !==
          optionElements.length
        ){

          toast(
            "Choisis toutes les options.",
            "error"
          );

          return;

        }

        const option =
          selectedOptions.join(
            " | "
          );

        addToCart(
          product.id,
          option
        );

        closeModal();

      }
    );

  $("modalFavorite")
    ?.addEventListener(
      "click",
      () => {

        toggleFavorite(
          product.id
        );

        closeModal();

      }
    );

}


// ============================================================
// PANIER
// ============================================================

function getCartCount(){

  return cart.reduce(
    (total,item) =>
      total +
      Number(item.quantity || 1),
    0
  );

}


function getCartSubtotal(){

  return cart.reduce(
    (total,item) => {

      const product =
        getProduct(item.id);

      if(!product){
        return total;
      }

      return total +
        Number(product.price || 0) *
        Number(item.quantity || 1);

    },
    0
  );

}


function addToCart(
  id,
  option = ""
){

  const product =
    getProduct(id);

  if(!product){
    return;
  }

  const existing =
    cart.find(
      item =>
        item.id === id &&
        item.option === option
    );

  if(existing){

    existing.quantity =
      Number(existing.quantity || 1) +
      1;

  }else{

    cart.push({
      id,
      option,
      quantity:1
    });

  }

  saveCart();
  renderCart();

  toast(
    "Produit ajouté au panier 🛒",
    "success"
  );

}


function removeFromCart(
  id,
  option = ""
){

  cart =
    cart.filter(
      item =>
        !(
          item.id === id &&
          item.option === option
        )
    );

  saveCart();
  renderCart();

}


function changeCartQuantity(
  id,
  option,
  change
){

  const item =
    cart.find(
      item =>
        item.id === id &&
        item.option === option
    );

  if(!item){
    return;
  }

  item.quantity =
    Number(item.quantity || 1) +
    Number(change);

  if(item.quantity <= 0){

    removeFromCart(
      id,
      option
    );

    return;

  }

  saveCart();
  renderCart();

}


function renderCart(){

  const count =
    getCartCount();

  if(cartBadge){

    cartBadge.textContent =
      count;

    cartBadge.style.display =
      count
        ? "inline-flex"
        : "none";

  }

  if(cartTotalEl){

    cartTotalEl.textContent =
      money(
        getCartSubtotal()
      );

  }

  if(!cartItemsEl){
    return;
  }

  if(!cart.length){

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

        <strong>
          Ton panier est vide
        </strong>

      </div>
    `;

    return;

  }

  cartItemsEl.innerHTML =
    cart.map(
      item => {

        const product =
          getProduct(item.id);

        if(!product){
          return "";
        }

        return `
          <div style="
            padding:13px 0;
            border-bottom:1px solid rgba(255,255,255,.08);
          ">

            <div style="
              display:flex;
              justify-content:space-between;
              gap:10px;
            ">

              <strong style="
                font-size:14px;
              ">
                ${escapeHTML(
                  product.name
                )}
              </strong>

              <strong>
                ${money(
                  product.price *
                  Number(item.quantity || 1)
                )}
              </strong>

            </div>

            ${
              item.option
                ? `
                  <div style="
                    opacity:.65;
                    font-size:12px;
                    margin-top:5px;
                  ">
                    ${escapeHTML(
                      item.option
                    )}
                  </div>
                `
                : ""
            }

            <div style="
              display:flex;
              justify-content:space-between;
              align-items:center;
              margin-top:10px;
            ">

              <div class="cart-quantity">

                <button
                  type="button"
                  data-cart-action="minus"
                  data-id="${escapeAttr(item.id)}"
                  data-option="${escapeAttr(item.option || "")}"
                >
                  −
                </button>

                <strong>
                  ${Number(item.quantity || 1)}
                </strong>

                <button
                  type="button"
                  data-cart-action="plus"
                  data-id="${escapeAttr(item.id)}"
                  data-option="${escapeAttr(item.option || "")}"
                >
                  +
                </button>

              </div>

              <button
                type="button"
                class="view-btn"
                data-cart-action="remove"
                data-id="${escapeAttr(item.id)}"
                data-option="${escapeAttr(item.option || "")}"
                style="
                  color:#ff7777;
                  padding:7px 10px;
                "
              >
                Supprimer
              </button>

            </div>

          </div>
        `;

      }
    ).join("");

  cartItemsEl
    .querySelectorAll(
      "[data-cart-action]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.id;

          const option =
            button.dataset.option || "";

          const action =
            button.dataset.cartAction;

          if(action === "minus"){

            changeCartQuantity(
              id,
              option,
              -1
            );

          }else if(
            action === "plus"
          ){

            changeCartQuantity(
              id,
              option,
              1
            );

          }else if(
            action === "remove"
          ){

            removeFromCart(
              id,
              option
            );

          }

        }
      );

    });

}


function openCart(){

  cartDrawer?.classList.add(
    "open"
  );

  overlay?.classList.add(
    "show"
  );

}


function closeCart(){

  cartDrawer?.classList.remove(
    "open"
  );

  overlay?.classList.remove(
    "show"
  );

}


// ============================================================
// AUTH
// ============================================================

function authError(error){

  const code =
    error?.code || "";

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
      "Mot de passe incorrect."

  };

  return (
    messages[code] ||
    error?.message ||
    "Une erreur est survenue."
  );

}


function showLoginForm(){

  showModal(
    "Connexion",
    `

      <form id="loginForm">

        <label for="loginEmail">
          Email
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
          style="
            display:block;
            margin-top:12px;
          "
        >
          Mot de passe
        </label>

        <input
          id="loginPassword"
          type="password"
          autocomplete="current-password"
          required
          placeholder="Mot de passe"
        >

        <button
          type="submit"
          class="add-btn"
          style="
            width:100%;
            margin-top:15px;
          "
        >
          Se connecter
        </button>

        <button
          type="button"
          class="view-btn"
          id="registerSwitch"
          style="
            width:100%;
            margin-top:8px;
          "
        >
          Créer un compte
        </button>

        <div
          id="authError"
          style="
            display:none;
            color:#ff7777;
            margin-top:12px;
          "
        ></div>

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
            ?.value.trim();

        const password =
          $("loginPassword")
            ?.value || "";

        const errorBox =
          $("authError");

        try{

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

        }catch(error){

          console.error(error);

          if(errorBox){

            errorBox.textContent =
              authError(error);

            errorBox.style.display =
              "block";

          }

        }

      }
    );

  $("registerSwitch")
    ?.addEventListener(
      "click",
      showRegisterForm
    );

}


function showRegisterForm(){

  showModal(
    "Créer un compte",
    `

      <form id="registerForm">

        <label for="registerEmail">
          Email
        </label>

        <input
          id="registerEmail"
          type="email"
          autocomplete="email"
          required
          placeholder="ton@email.com"
        >

        <label
          for="registerPassword"
          style="
            display:block;
            margin-top:12px;
          "
        >
          Mot de passe
        </label>

        <input
          id="registerPassword"
          type="password"
          autocomplete="new-password"
          required
          minlength="6"
          placeholder="Minimum 6 caractères"
        >

        <button
          type="submit"
          class="add-btn"
          style="
            width:100%;
            margin-top:15px;
          "
        >
          Créer mon compte
        </button>

        <button
          type="button"
          class="view-btn"
          id="loginSwitch"
          style="
            width:100%;
            margin-top:8px;
          "
        >
          J'ai déjà un compte
        </button>

        <div
          id="authError"
          style="
            display:none;
            color:#ff7777;
            margin-top:12px;
          "
        ></div>

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
            ?.value.trim();

        const password =
          $("registerPassword")
            ?.value || "";

        const errorBox =
          $("authError");

        try{

          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          closeModal();

          toast(
            "Compte créé 🎉",
            "success"
          );

        }catch(error){

          console.error(error);

          if(errorBox){

            errorBox.textContent =
              authError(error);

            errorBox.style.display =
              "block";

          }

        }

      }
    );

  $("loginSwitch")
    ?.addEventListener(
      "click",
      showLoginForm
    );

}


async function logout(){

  try{

    await signOut(auth);

    toast(
      "Déconnexion réussie."
    );

  }catch(error){

    toast(
      authError(error),
      "error"
    );

  }

}


// ============================================================
// COMPTE
// ============================================================

accountBtn?.addEventListener(
  "click",
  openAccount
);


function openAccount(){

  if(!currentUser){

    showLoginForm();

    return;

  }

  showModal(
    "Mon compte",
    `

      <div>

        <div style="
          padding:16px;
          border-radius:16px;
          background:rgba(45,140,255,.08);
        ">

          <strong>
            👤 Compte connecté
          </strong>

          <p style="
            margin-top:8px;
            opacity:.75;
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
            margin-top:14px;
          "
        >
          📦 Mes commandes
        </button>

        <button
          type="button"
          class="view-btn"
          id="accountLogout"
          style="
            width:100%;
            margin-top:8px;
          "
        >
          Se déconnecter
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
      () => {

        closeModal();
        logout();

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


async function openOrders(){

  if(!currentUser){

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
        Chargement...
      </div>

      <div id="ordersContent"></div>
    `
  );

  try{

    const q =
      query(
        collection(
          db,
          "orders"
        ),
        where(
          "userId",
          "==",
          currentUser.uid
        )
      );

    const snapshot =
      await getDocs(q);

    const orders = [];

    snapshot.forEach(
      item => {

        orders.push({
          id:item.id,
          ...item.data()
        });

      }
    );

    orders.sort(
      (a,b) => {

        const aTime =
          a.createdAt?.seconds || 0;

        const bTime =
          b.createdAt?.seconds || 0;

        return bTime - aTime;

      }
    );

    renderOrders(
      orders
    );

  }catch(error){

    console.error(
      "Orders Error:",
      error
    );

    const loading =
      $("ordersLoading");

    if(loading){

      loading.innerHTML = `
        <div style="
          color:#ff7777;
        ">
          ${escapeHTML(
            error.message ||
            "Erreur lors du chargement."
          )}
        </div>
      `;

    }

  }

}


function renderOrders(
  orders
){

  $("ordersLoading")?.remove();

  const content =
    $("ordersContent");

  if(!content){
    return;
  }

  if(!orders.length){

    content.innerHTML = `
      <div style="
        text-align:center;
        padding:35px;
      ">

        <div style="
          font-size:50px;
        ">
          📦
        </div>

        <h3>
          Aucune commande
        </h3>

        <p style="
          opacity:.7;
          margin-top:7px;
        ">
          Tes commandes apparaîtront ici.
        </p>

      </div>
    `;

    return;

  }

  content.innerHTML =
    orders.map(
      order => {

        const status =
          order.status ||
          "Enregistrée";

        const items =
          Array.isArray(order.items)
            ? order.items
            : [];

        const productsText =
          items.map(
            item =>
              `${item.name || item.id} ×${
                item.quantity || 1
              }`
          ).join(", ");

        return `
          <div style="
            padding:16px;
            margin-bottom:13px;
            border:1px solid rgba(255,255,255,.08);
            border-radius:16px;
          ">

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

            <p style="
              margin-top:9px;
            ">
              📦 ${escapeHTML(status)}
            </p>

            <p style="
              opacity:.7;
              margin-top:7px;
              font-size:13px;
            ">
              ${escapeHTML(productsText)}
            </p>

            ${
              order.city
                ? `
                  <p style="
                    margin-top:7px;
                    opacity:.75;
                  ">
                    📍 ${escapeHTML(order.city)}
                  </p>
                `
                : ""
            }

            ${
              order.tracking
                ? `
                  <p style="
                    margin-top:7px;
                    opacity:.75;
                  ">
                    🚚 Suivi :
                    ${escapeHTML(order.tracking)}
                  </p>
                `
                : ""
            }

            ${
              order.estimatedDelivery
                ? `
                  <p style="
                    margin-top:7px;
                    opacity:.75;
                  ">
                    🗓️ Livraison :
                    ${escapeHTML(
                      order.estimatedDelivery
                    )}
                  </p>
                `
                : ""
            }

            <button
              type="button"
              class="view-btn order-invoice"
              data-id="${escapeAttr(order.id)}"
              style="
                margin-top:12px;
              "
            >
              🧾 Facture
            </button>

          </div>
        `;

      }
    ).join("");

  content
    .querySelectorAll(
      ".order-invoice"
    )
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

          if(order){
            printInvoice(order);
          }

        }
      );

    });

}


// ============================================================
// CHECKOUT
// ============================================================

checkoutBtn?.addEventListener(
  "click",
  openCheckout
);


function openCheckout(){

  if(!cart.length){

    toast(
      "Ton panier est vide 🛒"
    );

    return;

  }

  if(!currentUser){

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

            <strong>
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
    .querySelectorAll(
      ".payment-choice"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          paymentMethod =
            button.dataset.payment ||
            "";

          const input =
            $("paymentMethod");

          if(input){
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

          if(!info){
            return;
          }

          if(
            paymentMethod ===
            "paypal"
          ){

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

          }else{

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
                  placeholder="Numéro de carte"
                  required
                >

                <label
                  for="cardHolder"
                  style="
                    display:block;
                    margin-top:10px;
                  "
                >
                  Nom sur la carte
                </label>

                <input
                  id="cardHolder"
                  type="text"
                  autocomplete="off"
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

        if(!firstName){

          if(errorBox){

            errorBox.textContent =
              "Indique ton prénom.";

            errorBox.style.display =
              "block";

          }

          return;

        }

        if(!lastName){

          if(errorBox){

            errorBox.textContent =
              "Indique ton nom.";

            errorBox.style.display =
              "block";

          }

          return;

        }

        if(!address){

          if(errorBox){

            errorBox.textContent =
              "Indique ton adresse de livraison.";

            errorBox.style.display =
              "block";

          }

          return;

        }

        if(!paymentMethod){

          if(errorBox){

            errorBox.textContent =
              "Choisis un moyen de paiement.";

            errorBox.style.display =
              "block";

          }

          return;

        }

        const submit =
          $("checkoutSubmit");

        if(submit){

          submit.disabled = true;
          submit.textContent =
            "Création...";

        }

        try{

          const total =
            getCartSubtotal();

          let paymentStatus =
            "En attente";

          if(
            paymentMethod ===
            "card"
          ){

            const card =
              getTestCard();

            if(!card){

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
              String(card.number)
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
              String(card.holder)
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

            if(
              enteredNumber !== storedNumber ||
              enteredHolder !== storedHolder ||
              enteredExpiry !== card.expiry ||
              enteredCvv !== card.cvv
            ){

              throw new Error(
                "Les informations de carte sont incorrectes."
              );

            }

            paymentStatus =
              "Payé";

          }

          const orderItems =
            cart.map(
              item => {

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
                    Number(
                      product?.price || 0
                    ),

                  quantity:
                    Number(
                      item.quantity || 1
                    )

                };

              }
            );

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

          if(
            paymentMethod === "paypal" &&
            total > 0
          ){

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

        }catch(error){

          console.error(
            "Firestore Checkout Error:",
            error
          );

          if(errorBox){

            errorBox.textContent =
              `Erreur : ${
                error.message ||
                error.code ||
                "inconnue"
              }`;

            errorBox.style.display =
              "block";

          }

        }finally{

          if(submit){

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

function printInvoice(order){

  const items =
    Array.isArray(order.items)
      ? order.items
      : [];

  const rows =
    items.map(
      item => {

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
              ${money(
                price * quantity
              )}
            </td>

          </tr>
        `;

      }
    ).join("");

  const customerName =
    `${order.firstName || ""} ${order.lastName || ""}`
      .trim();

  const invoiceWindow =
    window.open(
      "",
      "_blank",
      "width=900,height=700"
    );

  if(!invoiceWindow){

    toast(
      "La fenêtre de facture a été bloquée.",
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

        body{
          font-family:Arial,sans-serif;
          padding:40px;
          color:#111827;
        }

        h1{
          margin-bottom:5px;
        }

        .top{
          display:flex;
          justify-content:space-between;
          margin-bottom:40px;
        }

        table{
          width:100%;
          border-collapse:collapse;
          margin-top:30px;
        }

        th,
        td{
          border-bottom:1px solid #ddd;
          padding:12px;
          text-align:left;
        }

        .total{
          margin-top:30px;
          text-align:right;
          font-size:24px;
          font-weight:bold;
        }

        .small{
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
            Commande #${escapeHTML(
              order.id
            )}
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
                ${escapeHTML(
                  customerName
                )}
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
              ${escapeHTML(
                order.city
              )}
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
        ${money(
          order.total || 0
        )}
      </div>

      <p class="small">
        Statut :
        ${escapeHTML(
          order.status ||
          "Enregistrée"
        )}
      </p>

      <script>
        window.onload = function(){
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


function isAdminUser(){

  return (
    currentUser &&
    (
      currentUser.email || ""
    ).toLowerCase() ===
    ADMIN_EMAIL.toLowerCase()
  );

}


function openAdmin(){

  if(!isAdminUser()){

    toast(
      "Accès administrateur refusé.",
      "error"
    );

    return;

  }

  const authorized =
    localStorage.getItem(
      ADMIN_ACCESS_KEY
    ) === "true";

  if(!authorized){

    const code =
      prompt(
        "Code administrateur NovaShop :"
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

  loadAdmin();

}


async function loadAdmin(){

  if(!isAdminUser()){

    toast(
      "Accès administrateur refusé.",
      "error"
    );

    return;

  }

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

  try{

    const snapshot =
      await getDocs(
        collection(
          db,
          "orders"
        )
      );

    const orders = [];

    snapshot.forEach(
      item => {

        orders.push({
          id:item.id,
          ...item.data()
        });

      }
    );

    orders.sort(
      (a,b) => {

        const aTime =
          a.createdAt?.seconds || 0;

        const bTime =
          b.createdAt?.seconds || 0;

        return bTime - aTime;

      }
    );

    renderAdmin(
      orders
    );

  }catch(error){

    console.error(
      "Admin Firestore Error:",
      error
    );

    const loading =
      $("adminLoading");

    if(loading){

      loading.innerHTML = `
        <div style="
          color:#ff7777;
        ">
          Erreur Firestore :
          ${escapeHTML(
            error.message || ""
          )}
        </div>
      `;

    }

  }

}


function renderAdmin(orders){

  $("adminLoading")?.remove();

  const content =
    $("adminContent");

  if(!content){
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

      <p style="
        margin-top:6px;
      ">
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
          ? orders.map(
              order => {

                const items =
                  Array.isArray(
                    order.items
                  )
                    ? order.items
                    : [];

                const productsText =
                  items.map(
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
                  ).join(", ");

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
                            👤
                            <strong>
                              ${escapeHTML(
                                customerName
                              )}
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
                      data-id="${escapeAttr(
                        order.id
                      )}"
                      style="
                        width:100%;
                        margin:6px 0 10px;
                      "
                    >

                      ${
                        statuses.map(
                          status => `
                            <option
                              value="${escapeAttr(
                                status
                              )}"
                              ${
                                order.status ===
                                status
                                  ? "selected"
                                  : ""
                              }
                            >
                              ${escapeHTML(
                                status
                              )}
                            </option>
                          `
                        ).join("")
                      }

                    </select>

                    <input
                      class="admin-city"
                      data-id="${escapeAttr(
                        order.id
                      )}"
                      value="${escapeAttr(
                        order.city || ""
                      )}"
                      placeholder="Ville de destination"
                      style="
                        width:100%;
                        margin-bottom:8px;
                      "
                    >

                    <input
                      class="admin-tracking"
                      data-id="${escapeAttr(
                        order.id
                      )}"
                      value="${escapeAttr(
                        order.tracking || ""
                      )}"
                      placeholder="Numéro de suivi"
                      style="
                        width:100%;
                        margin-bottom:8px;
                      "
                    >

                    <input
                      class="admin-delivery"
                      data-id="${escapeAttr(
                        order.id
                      )}"
                      value="${escapeAttr(
                        order.estimatedDelivery || ""
                      )}"
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
                        data-id="${escapeAttr(
                          order.id
                        )}"
                      >
                        💾 Enregistrer
                      </button>

                      <button
                        type="button"
                        class="view-btn admin-paid"
                        data-id="${escapeAttr(
                          order.id
                        )}"
                      >
                        💰 Marquer payé
                      </button>

                      <button
                        type="button"
                        class="view-btn admin-invoice"
                        data-id="${escapeAttr(
                          order.id
                        )}"
                      >
                        🧾 Facture
                      </button>

                      <button
                        type="button"
                        class="view-btn admin-delete"
                        data-id="${escapeAttr(
                          order.id
                        )}"
                        style="
                          color:#ff7777;
                        "
                      >
                        🗑️ Supprimer
                      </button>

                    </div>

                  </div>

                `;

              }
            ).join("")
          : `
            <div style="
              text-align:center;
              padding:30px;
            ">

              <div style="
                font-size:50px;
              ">
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
    .querySelectorAll(
      ".admin-save"
    )
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
    .querySelectorAll(
      ".admin-paid"
    )
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
    .querySelectorAll(
      ".admin-invoice"
    )
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

          if(order){

            printInvoice(
              order
            );

          }

        }
      );

    });


  document
    .querySelectorAll(
      ".admin-delete"
    )
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


function attachTestCardButton(){

  const button =
    $("generateTestCard");

  if(!button){
    return;
  }

  button.addEventListener(
    "click",
    () => {

      generateTestCard();

      const container =
        $("testCardContainer");

      if(container){

        container.innerHTML =
          renderTestCardHTML();

        attachTestCardButton();

      }

    }
  );

}


async function saveAdminOrder(id){

  try{

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
        estimatedDelivery,
        updatedAt:
          serverTimestamp()
      }
    );

    toast(
      "Commande mise à jour ✅",
      "success"
    );

  }catch(error){

    console.error(error);

    toast(
      `Erreur : ${
        error.message ||
        error.code ||
        "inconnue"
      }`,
      "error"
    );

  }

}


async function markOrderPaid(id){

  try{

    await updateDoc(
      doc(
        db,
        "orders",
        id
      ),
      {
        paymentStatus:
          "Payé",

        updatedAt:
          serverTimestamp()

      }
    );

    toast(
      "Paiement marqué comme payé 💰",
      "success"
    );

    loadAdmin();

  }catch(error){

    console.error(error);

    toast(
      `Erreur : ${
        error.message ||
        error.code ||
        "inconnue"
      }`,
      "error"
    );

  }

}


async function deleteAdminOrder(id){

  const confirmed =
    confirm(
      "Supprimer définitivement cette commande ?"
    );

  if(!confirmed){
    return;
  }

  try{

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

  }catch(error){

    console.error(error);

    toast(
      `Erreur : ${
        error.message ||
        error.code ||
        "inconnue"
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


function getTheme(){

  return (
    localStorage.getItem(
      "novaThemeChoice"
    ) || "dark"
  );

}


function applyTheme(){

  const theme =
    getTheme();

  if(theme === "light"){

    document.documentElement.dataset.theme =
      "light";

  }else if(theme === "dark"){

    document.documentElement.dataset.theme =
      "dark";

  }else{

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


function openSettings(){

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
          ${escapeHTML(
            current
          )}
        </p>

      </div>
    `
  );

  document
    .querySelectorAll(
      ".theme-choice"
    )
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
// AUTH STATE
// ============================================================

onAuthStateChanged(
  auth,
  user => {

    currentUser =
      user || null;

    if(adminBtn){

      adminBtn.style.display =
        isAdminUser()
          ? "inline-flex"
          : "none";

    }

  }
);


// ============================================================
// ESC
// ============================================================

document.addEventListener(
  "keydown",
  event => {

    if(event.key !== "Escape"){
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

    if(
      event.target ===
      modal
    ){

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

    if(
      error?.code?.startsWith(
        "auth/"
      )
    ){

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


console.log(
  "NovaShop chargé avec succès 🚀"
);
               
