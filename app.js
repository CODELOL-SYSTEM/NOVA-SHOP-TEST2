// ============================================================
// NOVASHOP - APP.JS - BLOC 1/2
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
  getDoc,
  doc,
  query,
  where,
  orderBy,
  updateDoc,
  deleteDoc,
  serverTimestamp
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
// ADMIN
// ============================================================

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";
const ADMIN_ACCESS_KEY = "novaAdminAuthorized";

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
    },
    required:true
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
    price:80,
    image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ9VsG_IxAanmrCSqCyACtuyCqCD5rwiQ3P3Iylexch3XnCT4sevDBCz-vnqlVCBvZroOpYIX9T0Flc8EzGSZuyPMibCcQm"
  },

  {
    id:"p60",
    name:"Microsoft Windows 11 Pro Key",
    category:"Logiciels & licences",
    price:2.55,
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
    price:0,
    image:"https://media.ldlc.com/r705/ld/products/00/02/92/76/LD0002927652_2.jpg"
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
    image:"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQc0G0oeTkaEJ6JvVV0ZXd71PPCYpoIZHL_hoaAXgTucxOK8acM9uU4eStYeQv15uPfYyTuRWd7WFzsbcElQs98IXEsb48xCpW5bOL9kCWqpZ7x_ItlfqWH"
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
    category:"Supports écrans",
    price:16,
    image:"https://m.media-amazon.com/images/I/61gjjZxKbeL._AC_SL1500_.jpg"
  },

  {
    id:"p74",
    name:"BONTEC Support Ecran PC 2 Ecran Articulé à Ressort à Gaz, 13-32 Pouces",
    category:"Supports écrans",
    price:23,
    image:"https://m.media-amazon.com/images/I/71kZjwcU4SL._AC_SL1500_.jpg"
  },

  {
    id:"p75",
    name:"BONTEC Bras Ecran PC Mural à Ressort à Gaz, 13-42 Pouces, Charge 38kg",
    category:"Supports écrans",
    price:16,
    image:"https://m.media-amazon.com/images/I/71-oseIdQXL._AC_SL1500_.jpg"
  },

  {
    id:"p76",
    name:"KTC Écran PC Gamer Incurvé 24 Pouces FHD 240 Hz (VESA 100×100 mm)",
    category:"Écrans",
    price:80,
    image:"https://m.media-amazon.com/images/I/71wUlFXcaZL._AC_SL1500_.jpg"
  },

  {
    id:"p77",
    name:"KTC Écran PC Gamer Incurvé 27 Pouces QHD 180Hz (OC 185Hz) H27S5 (VESA 100×100 mm)",
    category:"Écrans",
    price:110,
    image:"https://m.media-amazon.com/images/I/61Rehn5YTWL._AC_SL1000_.jpg"
  },

  {
    id:"p78",
    name:"HKC Écran PC Gaming 34 Pouces Incurvé UWQHD 120 Hz HDR400 (VESA 100×100 mm)",
    category:"Écrans",
    price:170,
    image:"https://m.media-amazon.com/images/I/71useoNrGEL._AC_SL1500_.jpg"
  },

  {
    id:"p79",
    name:"HKC 27 Pouces Ecran Gaming 4K Dual Mode UHD 160Hz / FHD 320Hz G27H7P (VESA 100×100 mm)",
    category:"Écrans",
    price:140,
    image:"https://m.media-amazon.com/images/I/81MjOWRE0SL._AC_SL1500_.jpg"
  },

  {
    id:"p80",
    name:"XIAOMI TV F 65 Pouces 2025 4K UHD Smart TV",
    category:"Écrans",
    price:249.99,
    image:"https://m.media-amazon.com/images/I/61Jk8xxkLZL._AC_SL1000_.jpg"
  },

  {
    id:"p81",
    name:"Xbox Manette sans fil",
    category:"Manettes & consoles",
    price:59.99,
    image:"https://img.pccomponentes.com/articles/1066/10665216/1642-microsoft-mando-inalambrico-xbox-series-one-pc-blanco.jpg",
    options:{
      Couleur:["Rose","Bleu","Noir","Rouge","Blanc","Vert"]
    },
    required:true
  },

  {
    id:"p82",
    name:"PlayStation 5 avec 1 Manette Sans Fil DualSense",
    category:"Manettes & consoles",
    price:320,
    image:"https://m.media-amazon.com/images/I/61h7VjYt-fL._AC_SL1500_.jpg",
    options:{
      Console:["PS5 avec lecteur","PS5 Pro"]
    },
    required:true
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
// NOTES PRODUITS
// ============================================================

products.forEach((product,index) => {
  product.rating = Number(
    (4.2 + ((index * 17) % 81) / 100).toFixed(1)
  );

  product.reviewCount = 1248 + ((index * 137) % 2028);
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

const CART_STORAGE_KEY = "novaCart";
const FAVORITES_STORAGE_KEY = "novaFavorites";

try {
  cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
  if(!Array.isArray(cart)) cart = [];
} catch {
  cart = [];
}

try {
  favorites = JSON.parse(
    localStorage.getItem(FAVORITES_STORAGE_KEY) || "[]"
  );

  if(!Array.isArray(favorites)) favorites = [];
} catch {
  favorites = [];
}


// ============================================================
// HELPERS
// ============================================================

function $(selector){
  return document.querySelector(selector);
}

function money(value){
  return Number(value || 0).toLocaleString("fr-FR",{
    style:"currency",
    currency:"EUR"
  });
}

function escapeHTML(value){
  return String(value ?? "")
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
  return products.find(product => product.id === id);
}

function saveCart(){
  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(cart)
  );
}

function saveFavorites(){
  localStorage.setItem(
    FAVORITES_STORAGE_KEY,
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
  return cart.reduce((total,item)=>{
    const product = getProduct(item.productId);

    if(!product) return total;

    return total +
      Number(product.price || 0) *
      Number(item.quantity || 0);
  },0);
}

function hasRequiredOption(product){
  return Boolean(
    product &&
    product.required &&
    product.options &&
    Object.keys(product.options).length
  );
}

function getCartProductName(item){
  const product = getProduct(item.productId);

  if(!product) return "Produit inconnu";

  let name = product.name;

  if(item.options){
    const values = Object.entries(item.options)
      .map(([key,value]) => `${key}: ${value}`)
      .join(" • ");

    if(values){
      name += ` (${values})`;
    }
  }

  return name;
}

function findCartItem(productId,options={}){
  return cart.find(item=>{
    if(item.productId !== productId) return false;

    const currentOptions = item.options || {};
    const newOptions = options || {};

    return JSON.stringify(currentOptions) ===
      JSON.stringify(newOptions);
  });
}


// ============================================================
// OPTIONS PRODUITS
// ============================================================

function showProductOptions(product){

  if(!product || !product.options){
    return "";
  }

  return Object.entries(product.options).map(
    ([optionName,values]) => `
      <label class="product-option">
        <span>${escapeHTML(optionName)}</span>

        <select
          class="product-option-select"
          data-option="${escapeAttr(optionName)}"
        >
          ${values.map(value=>`
            <option value="${escapeAttr(value)}">
              ${escapeHTML(value)}
            </option>
          `).join("")}
        </select>
      </label>
    `
  ).join("");
}

function setupProductOptions(container){

  if(!container) return;

  container
    .querySelectorAll(".product-option-select")
    .forEach(select=>{
      select.addEventListener("change",()=>{
        select.dataset.value = select.value;
      });
    });
}

function getSelectedProductOption(container){

  const options = {};

  if(!container) return options;

  container
    .querySelectorAll(".product-option-select")
    .forEach(select=>{
      const name = select.dataset.option;

      if(name){
        options[name] = select.value;
      }
    });

  return options;
}


// ============================================================
// ÉTOILES
// ============================================================

function getRatingStars(rating){

  const value = Number(rating || 0);

  let result = "";

  for(let i=1;i<=5;i++){

    if(value >= i){
      result += "★";
    } else if(value >= i - 0.5){
      result += "★";
    } else {
      result += "☆";
    }
  }

  return result;
}


// ============================================================
// DOM
// ============================================================

const productsGrid = $("#productsGrid");
const categoriesEl = $("#categories");
const productCountEl = $("#productCount");

const searchInput = $("#searchInput");
const sortSelect = $("#sortSelect");

const cartDrawer = $("#cartDrawer");
const cartOverlay = $("#cartOverlay");
const cartItems = $("#cartItems");
const cartCount = $("#cartCount");
const cartSubtotal = $("#cartSubtotal");

const modal = $("#modal");
const modalTitle = $("#modalTitle");
const modalBody = $("#modalBody");
const modalClose = $("#modalClose");

const toastContainer = $("#toastContainer");

const accountBtn = $("#accountBtn");
const adminBtn = $("#adminBtn");
const settingsBtn = $("#settingsBtn");
const checkoutBtn = $("#checkoutBtn");


// ============================================================
// TOAST
// ============================================================

function toast(message,type="info"){

  if(!toastContainer){
    alert(message);
    return;
  }

  const element = document.createElement("div");

  element.className = `toast toast-${type}`;

  element.innerHTML = `
    <span>${escapeHTML(message)}</span>
  `;

  toastContainer.appendChild(element);

  setTimeout(()=>{
    element.classList.add("show");
  },10);

  setTimeout(()=>{
    element.classList.remove("show");

    setTimeout(()=>{
      element.remove();
    },250);

  },2800);
}


// ============================================================
// MODAL
// ============================================================

function openModal(title,html){

  if(!modal) return;

  if(modalTitle){
    modalTitle.textContent = title;
  }

  if(modalBody){
    modalBody.innerHTML = html;
  }

  modal.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeModal(){

  if(!modal) return;

  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
}

modalClose?.addEventListener("click",closeModal);

modal?.addEventListener("click",event=>{

  if(event.target === modal){
    closeModal();
  }

});

document.addEventListener("keydown",event=>{

  if(event.key === "Escape"){
    closeModal();
    closeCart();
  }

});


// ============================================================
// CART
// ============================================================

function openCart(){

  cartDrawer?.classList.add("open");
  cartOverlay?.classList.add("open");
  document.body.classList.add("cart-open");
}

function closeCart(){

  cartDrawer?.classList.remove("open");
  cartOverlay?.classList.remove("open");
  document.body.classList.remove("cart-open");
}

cartOverlay?.addEventListener("click",closeCart);


function addToCart(productId,options={}){

  const product = getProduct(productId);

  if(!product) return;

  if(hasRequiredOption(product) &&
     Object.keys(options).length === 0){

    openProduct(productId);
    return;
  }

  const existing = findCartItem(productId,options);

  if(existing){

    existing.quantity =
      Number(existing.quantity || 0) + 1;

  } else {

    cart.push({
      productId,
      quantity:1,
      options
    });

  }

  saveCart();
  renderCart();

  toast(
    `${product.name} ajouté au panier`,
    "success"
  );
}


function removeFromCart(productId,options={}){

  cart = cart.filter(item=>{

    if(item.productId !== productId){
      return true;
    }

    const currentOptions = item.options || {};

    return JSON.stringify(currentOptions) !==
      JSON.stringify(options || {});
  });

  saveCart();
  renderCart();
}


function changeCartQuantity(productId,delta,options={}){

  const item = findCartItem(productId,options);

  if(!item) return;

  item.quantity =
    Number(item.quantity || 0) + Number(delta || 0);

  if(item.quantity <= 0){

    cart = cart.filter(currentItem=>{
      if(currentItem.productId !== productId){
        return true;
      }

      return JSON.stringify(currentItem.options || {}) !==
        JSON.stringify(options || {});
    });

  }

  saveCart();
  renderCart();
}


// ============================================================
// RENDU PANIER
// ============================================================

function renderCart(){

  if(cartCount){
    cartCount.textContent = String(getCartCount());
  }

  if(cartSubtotal){
    cartSubtotal.textContent =
      money(getCartSubtotal());
  }

  if(!cartItems) return;

  if(!cart.length){

    cartItems.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h3>Ton panier est vide</h3>
        <p>Ajoute des produits NovaShop pour commencer.</p>
      </div>
    `;

    return;
  }

  cartItems.innerHTML = cart.map(item=>{

    const product = getProduct(item.productId);

    if(!product) return "";

    const optionsText = item.options
      ? Object.entries(item.options)
          .map(([key,value]) =>
            `${escapeHTML(key)}: ${escapeHTML(value)}`
          )
          .join(" • ")
      : "";

    const quantity = Number(item.quantity || 1);

    const total =
      Number(product.price || 0) * quantity;

    return `
      <div class="cart-item">

        <div class="cart-item-image">
          <img
            src="${escapeAttr(product.image || "")}"
            alt="${escapeAttr(product.name)}"
            onerror="this.style.display='none'"
          >
        </div>

        <div class="cart-item-info">

          <div class="cart-item-name">
            ${escapeHTML(product.name)}
          </div>

          ${
            optionsText
              ? `<div class="cart-item-options">${optionsText}</div>`
              : ""
          }

          <div class="cart-item-price">
            ${money(product.price)}
          </div>

          <div class="cart-item-actions">

            <button
              type="button"
              class="cart-qty-btn"
              data-action="minus"
              data-product-id="${escapeAttr(product.id)}"
            >
              −
            </button>

            <span>${quantity}</span>

            <button
              type="button"
              class="cart-qty-btn"
              data-action="plus"
              data-product-id="${escapeAttr(product.id)}"
            >
              +
            </button>

            <button
              type="button"
              class="cart-remove"
              data-product-id="${escapeAttr(product.id)}"
            >
              Supprimer
            </button>

          </div>

        </div>

        <div class="cart-item-total">
          ${money(total)}
        </div>

      </div>
    `;

  }).join("");

  cartItems
    .querySelectorAll(".cart-qty-btn")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        const productId =
          button.dataset.productId;

        const item =
          cart.find(currentItem =>
            currentItem.productId === productId
          );

        if(!item) return;

        changeCartQuantity(
          productId,
          button.dataset.action === "plus" ? 1 : -1,
          item.options || {}
        );

      });

    });

  cartItems
    .querySelectorAll(".cart-remove")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        const productId =
          button.dataset.productId;

        const item =
          cart.find(currentItem =>
            currentItem.productId === productId
          );

        removeFromCart(
          productId,
          item?.options || {}
        );

        toast("Produit supprimé du panier","info");

      });

    });
}


// ============================================================
// CATÉGORIES
// ============================================================

function renderCategories(){

  if(!categoriesEl) return;

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
          category === selectedCategory
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

      button.addEventListener("click",()=>{

        selectedCategory =
          button.dataset.category || "Tous";

        renderCategories();
        renderProducts();

      });

    });
}


// ============================================================
// FILTRE PRODUITS
// ============================================================

function getFilteredProducts(){

  let result = [...products];

  if(
    selectedCategory &&
    selectedCategory !== "Tous"
  ){

    result = result.filter(
      product =>
        product.category === selectedCategory
    );

  }

  const search =
    searchValue.trim().toLowerCase();

  if(search){

    result = result.filter(product => {

      const text =
        `${product.name} ${product.category}`
          .toLowerCase();

      return text.includes(search);

    });

  }

  switch(sortValue){

    case "price-asc":

      result.sort(
        (a,b) =>
          Number(a.price) - Number(b.price)
      );

      break;

    case "price-desc":

      result.sort(
        (a,b) =>
          Number(b.price) - Number(a.price)
      );

      break;

    case "name-asc":

      result.sort(
        (a,b) =>
          a.name.localeCompare(
            b.name,
            "fr"
          )
      );

      break;

    case "rating-desc":

      result.sort(
        (a,b) =>
          Number(b.rating) -
          Number(a.rating)
      );

      break;

  }

  return result;
}


// ============================================================
// RENDU PRODUITS
// ============================================================

function renderProducts(){

  if(!productsGrid) return;

  const result = getFilteredProducts();

  if(productCountEl){

    productCountEl.textContent =
      `${result.length} produit${result.length > 1 ? "s" : ""}`;

  }

  if(!result.length){

    productsGrid.innerHTML = `
      <div class="no-products">
        <div>🔎</div>
        <h3>Aucun produit trouvé</h3>
        <p>Essaie une autre recherche ou catégorie.</p>
      </div>
    `;

    return;
  }

  productsGrid.innerHTML =
    result.map(product=>{

      const isFavorite =
        favorites.includes(product.id);

      const rating =
        Number(product.rating || 0);

      return `

        <article
          class="product-card"
          data-product-id="${escapeAttr(product.id)}"
        >

          <button
            type="button"
            class="product-favorite ${
              isFavorite ? "active" : ""
            }"
            data-product-id="${escapeAttr(product.id)}"
            aria-label="Ajouter aux favoris"
          >
            ${isFavorite ? "♥" : "♡"}
          </button>

          ${
            product.new
              ? `<span class="product-new">NOUVEAU</span>`
              : ""
          }

          <div class="product-image-wrap">

            <img
              class="product-image"
              src="${escapeAttr(product.image || "")}"
              alt="${escapeAttr(product.name)}"
              loading="lazy"
              onerror="this.style.display='none'"
            >

          </div>

          <div class="product-card-content">

            <div class="product-category">
              ${escapeHTML(product.category)}
            </div>

            <h3 class="product-name">
              ${escapeHTML(product.name)}
            </h3>

            <div class="product-rating">

              <span class="stars">
                ${getRatingStars(rating)}
              </span>

              <span class="rating-number">
                ${rating.toFixed(1)}
              </span>

              <span class="review-count">
                (${product.reviewCount})
              </span>

            </div>

            <div class="product-bottom">

              <div class="product-price">
                ${money(product.price)}
              </div>

              <button
                type="button"
                class="product-add"
                data-product-id="${escapeAttr(product.id)}"
              >
                AJOUTER
              </button>

            </div>

            <button
              type="button"
              class="product-view"
              data-product-id="${escapeAttr(product.id)}"
            >
              Voir le produit
            </button>

          </div>

        </article>

      `;

    }).join("");
}


// ============================================================
// CLICS PRODUITS
// ============================================================

productsGrid?.addEventListener(
  "click",
  event=>{

    const favoriteButton =
      event.target.closest(".product-favorite");

    if(favoriteButton){

      const id =
        favoriteButton.dataset.productId;

      if(!id) return;

      if(favorites.includes(id)){

        favorites =
          favorites.filter(
            item => item !== id
          );

        toast(
          "Retiré des favoris",
          "info"
        );

      } else {

        favorites.push(id);

        toast(
          "Ajouté aux favoris ❤️",
          "success"
        );

      }

      saveFavorites();
      renderProducts();

      return;
    }


    const addButton =
      event.target.closest(".product-add");

    if(addButton){

      const id =
        addButton.dataset.productId;

      const product =
        getProduct(id);

      if(!product) return;

      if(hasRequiredOption(product)){

        openProduct(id);

        return;
      }

      addToCart(id);

      return;
    }


    const viewButton =
      event.target.closest(".product-view");

    if(viewButton){

      const id =
        viewButton.dataset.productId;

      if(id){
        openProduct(id);
      }

    }

  }
);


// ============================================================
// RECHERCHE
// ============================================================

searchInput?.addEventListener(
  "input",
  ()=>{
    searchValue =
      searchInput.value || "";

    renderProducts();
  }
);


// ============================================================
// TRI
// ============================================================

sortSelect?.addEventListener(
  "change",
  ()=>{
    sortValue =
      sortSelect.value || "default";

    renderProducts();
  }
);


// ============================================================
// OUVRIR PRODUIT
// ============================================================

function openProduct(productId){

  const product =
    getProduct(productId);

  if(!product) return;

  const rating =
    Number(product.rating || 0);

  const options =
    showProductOptions(product);

  openModal(
    product.name,
    `

      <div
        class="product-modal"
        data-product-id="${escapeAttr(product.id)}"
      >

        <div class="product-modal-image">

          <img
            src="${escapeAttr(product.image || "")}"
            alt="${escapeAttr(product.name)}"
            onerror="this.style.display='none'"
          >

        </div>

        <div class="product-modal-info">

          <div class="product-category">
            ${escapeHTML(product.category)}
          </div>

          <h2>
            ${escapeHTML(product.name)}
          </h2>

          <div class="product-rating">

            <span class="stars">
              ${getRatingStars(rating)}
            </span>

            <span>
              ${rating.toFixed(1)}
            </span>

            <span>
              (${product.reviewCount} avis)
            </span>

          </div>

          <div class="product-modal-price">
            ${money(product.price)}
          </div>

          ${
            options
              ? `
                <div class="product-options">
                  ${options}
                </div>
              `
              : ""
          }

          <div class="product-modal-actions">

            <button
              type="button"
              class="modal-add-cart"
              id="modalAddCart"
            >
              AJOUTER AU PANIER
            </button>

            <button
              type="button"
              class="modal-reviews"
              id="modalReviews"
            >
              ⭐ Voir les avis
            </button>

          </div>

        </div>

      </div>

    `
  );

  const productModal =
    document.querySelector(".product-modal");

  setupProductOptions(productModal);

  $("#modalAddCart")?.addEventListener(
    "click",
    ()=>{

      const selectedOptions =
        getSelectedProductOption(
          productModal
        );

      addToCart(
        product.id,
        selectedOptions
      );

      closeModal();
    }
  );

  $("#modalReviews")?.addEventListener(
    "click",
    ()=>{

      openProductReviews(
        product.id
      );

    }
  );
}


// ============================================================
// AVIS PRODUIT
// ============================================================

async function openProductReviews(productId){

  const product =
    getProduct(productId);

  if(!product) return;

  openModal(
    `Avis - ${product.name}`,
    `
      <div class="reviews-loading">
        Chargement des avis...
      </div>
    `
  );

  try {

    const reviewsRef =
      collection(
        db,
        "reviews"
      );

    const reviewsQuery =
      query(
        reviewsRef,
        where(
          "productId",
          "==",
          productId
        )
      );

    const snapshot =
      await getDocs(reviewsQuery);

    const reviews =
      snapshot.docs.map(
        reviewDoc => ({
          id:reviewDoc.id,
          ...reviewDoc.data()
        })
      );

    reviewsCache[productId] =
      reviews;

    if(!reviews.length){

      modalBody.innerHTML = `
        <div class="empty-reviews">
          <div>⭐</div>
          <h3>Aucun avis pour le moment</h3>
          <p>Ce produit n'a pas encore reçu d'avis.</p>
        </div>
      `;

      return;
    }

    modalBody.innerHTML = `

      <div class="reviews-list">

        ${reviews.map(review=>{

          const rating =
            Number(review.rating || 0);

          const name =
            review.displayName ||
            review.userName ||
            "Client NovaShop";

          const text =
            review.text ||
            review.comment ||
            "";

          return `

            <div class="review-card">

              <div class="review-header">

                <strong>
                  ${escapeHTML(name)}
                </strong>

                <span class="stars">
                  ${getRatingStars(rating)}
                </span>

              </div>

              <div class="review-text">
                ${escapeHTML(text)}
              </div>

            </div>

          `;

        }).join("")}

      </div>

    `;

  } catch(error){

    console.error(
      "Erreur chargement avis:",
      error
    );

    modalBody.innerHTML = `
      <div class="error-box">
        Impossible de charger les avis.
      </div>
    `;
  }
}


// ============================================================
// AUTHENTIFICATION
// ============================================================

function showLoginForm(){

  openModal(
    "Connexion",
    `

      <form
        id="loginForm"
        class="auth-form"
      >

        <label>
          Email
          <input
            id="loginEmail"
            type="email"
            required
            autocomplete="email"
          >
        </label>

        <label>
          Mot de passe
          <input
            id="loginPassword"
            type="password"
            required
            autocomplete="current-password"
          >
        </label>

        <div
          id="authError"
          class="auth-error"
        ></div>

        <button
          type="submit"
          class="primary-btn"
        >
          SE CONNECTER
        </button>

        <button
          type="button"
          class="secondary-btn"
          id="showRegister"
        >
          CRÉER UN COMPTE
        </button>

      </form>

    `
  );

  $("#loginForm")?.addEventListener(
    "submit",
    async event=>{

      event.preventDefault();

      const email =
        $("#loginEmail")?.value.trim();

      const password =
        $("#loginPassword")?.value || "";

      const errorEl =
        $("#authError");

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

      } catch(error){

        console.error(error);

        if(errorEl){

          errorEl.textContent =
            getAuthErrorMessage(error);

        }

      }

    }
  );

  $("#showRegister")?.addEventListener(
    "click",
    showRegisterForm
  );
}


function showRegisterForm(){

  openModal(
    "Créer un compte",
    `

      <form
        id="registerForm"
        class="auth-form"
      >

        <label>
          Email
          <input
            id="registerEmail"
            type="email"
            required
            autocomplete="email"
          >
        </label>

        <label>
          Mot de passe
          <input
            id="registerPassword"
            type="password"
            minlength="6"
            required
            autocomplete="new-password"
          >
        </label>

        <div
          id="authError"
          class="auth-error"
        ></div>

        <button
          type="submit"
          class="primary-btn"
        >
          CRÉER MON COMPTE
        </button>

        <button
          type="button"
          class="secondary-btn"
          id="showLogin"
        >
          J'AI DÉJÀ UN COMPTE
        </button>

      </form>

    `
  );

  $("#registerForm")?.addEventListener(
    "submit",
    async event=>{

      event.preventDefault();

      const email =
        $("#registerEmail")?.value.trim();

      const password =
        $("#registerPassword")?.value || "";

      const errorEl =
        $("#authError");

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

      } catch(error){

        console.error(error);

        if(errorEl){

          errorEl.textContent =
            getAuthErrorMessage(error);

        }

      }

    }
  );

  $("#showLogin")?.addEventListener(
    "click",
    showLoginForm
  );
}


function getAuthErrorMessage(error){

  switch(error?.code){

    case "auth/invalid-email":
      return "Adresse email invalide.";

    case "auth/user-not-found":
      return "Aucun compte trouvé avec cet email.";

    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email ou mot de passe incorrect.";

    case "auth/email-already-in-use":
      return "Cette adresse email est déjà utilisée.";

    case "auth/weak-password":
      return "Le mot de passe doit contenir au moins 6 caractères.";

    case "auth/too-many-requests":
      return "Trop de tentatives. Réessaie plus tard.";

    default:
      return "Une erreur est survenue. Réessaie.";
  }
}


// ============================================================
// ÉTAT AUTH
// ============================================================

onAuthStateChanged(
  auth,
  user=>{
    
    currentUser = user || null;

    if(accountBtn){

      if(currentUser){

        accountBtn.textContent =
          "👤 Mon compte";

      } else {

        accountBtn.textContent =
          "👤 Connexion";

      }

    }

    if(adminBtn){

      const isAdmin =
        Boolean(
          currentUser &&
          currentUser.email === ADMIN_EMAIL
        );

      adminBtn.style.display =
        isAdmin ? "" : "none";
    }

  }
);


// ============================================================
// COMPTE
// ============================================================

function openAccount(){

  if(!currentUser){

    showLoginForm();

    return;
  }

  openModal(
    "Mon compte",
    `

      <div class="account-panel">

        <div class="account-avatar">
          👤
        </div>

        <h3>
          Mon compte NovaShop
        </h3>

        <p>
          ${escapeHTML(currentUser.email)}
        </p>

        <div class="account-actions">

          <button
            type="button"
            class="primary-btn"
            id="accountOrders"
          >
            📦 Mes commandes
          </button>

          <button
            type="button"
            class="secondary-btn"
            id="accountLogout"
          >
            🚪 Se déconnecter
          </button>

        </div>

      </div>

    `
  );

  $("#accountOrders")?.addEventListener(
    "click",
    openOrders
  );

  $("#accountLogout")?.addEventListener(
    "click",
    async()=>{

      await signOut(auth);

      closeModal();

      toast(
        "Déconnexion réussie",
        "success"
      );

    }
  );
}


accountBtn?.addEventListener(
  "click",
  openAccount
);


// ============================================================
// COMMANDES
// ============================================================

async function openOrders(){

  if(!currentUser){

    showLoginForm();

    return;
  }

  openModal(
    "Mes commandes",
    `
      <div class="orders-loading">
        Chargement des commandes...
      </div>
    `
  );

  try {

    const ordersRef =
      collection(
        db,
        "orders"
      );

    const ordersQuery =
      query(
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
      await getDocs(
        ordersQuery
      );

    const orders =
      snapshot.docs.map(
        orderDoc=>({
          id:orderDoc.id,
          ...orderDoc.data()
        })
      );

    if(!orders.length){

      modalBody.innerHTML = `
        <div class="empty-orders">

          <div>📦</div>

          <h3>
            Aucune commande
          </h3>

          <p>
            Tes commandes apparaîtront ici.
          </p>

        </div>
      `;

      return;
    }

    modalBody.innerHTML = `

      <div class="orders-list">

        ${orders.map(order=>{

          const date =
            order.createdAt?.toDate
              ? order.createdAt.toDate()
              : null;

          return `

            <div
              class="order-card"
              data-order-id="${escapeAttr(order.id)}"
            >

              <div class="order-card-top">

                <strong>
                  Commande #${escapeHTML(
                    order.id.slice(0,8)
                  )}
                </strong>

                <span class="order-status">
                  ${escapeHTML(
                    order.status || "Enregistrée"
                  )}
                </span>

              </div>

              <div class="order-card-date">

                ${
                  date
                    ? date.toLocaleString("fr-FR")
                    : "Date indisponible"
                }

              </div>

              <div class="order-card-total">

                ${money(order.total)}

              </div>

              <button
                type="button"
                class="secondary-btn order-details-btn"
                data-order-id="${escapeAttr(order.id)}"
              >
                📦 Voir le suivi
              </button>

            </div>

          `;

        }).join("")}

      </div>

    `;

    modalBody
      .querySelectorAll(".order-details-btn")
      .forEach(button=>{

        button.addEventListener(
          "click",
          ()=>{
            openOrderDetails(
              button.dataset.orderId
            );
          }
        );

      });

  } catch(error){

    console.error(
      "Erreur commandes:",
      error
    );

    modalBody.innerHTML = `
      <div class="error-box">
        Impossible de charger les commandes.
      </div>
    `;
  }
}


// ============================================================
// DÉTAIL COMMANDE
// ============================================================

async function openOrderDetails(orderId){

  if(!orderId) return;

  try {

    const orderSnapshot =
      await getDoc(
        doc(
          db,
          "orders",
          orderId
        )
      );

    if(!orderSnapshot.exists()){

      toast(
        "Commande introuvable",
        "error"
      );

      return;
    }

    const order = {
      id:orderSnapshot.id,
      ...orderSnapshot.data()
    };

    if(
      !currentUser ||
      order.userId !== currentUser.uid
    ){

      toast(
        "Accès refusé",
        "error"
      );

      return;
    }

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
      statuses.indexOf(
        currentStatus
      );

    modalTitle.textContent =
      `Commande #${order.id.slice(0,8)}`;

    modalBody.innerHTML = `

      <div class="order-detail">

        <div class="tracking-box">

          <h3>
            📦 Suivi de livraison
          </h3>

          <div class="tracking-status">
            ${escapeHTML(currentStatus)}
          </div>

          ${
            order.tracking
              ? `
                <div class="tracking-number">
                  🚚 Tracking :
                  ${escapeHTML(order.tracking)}
                </div>
              `
              : ""
          }

          ${
            order.city
              ? `
                <div class="tracking-location">
                  📍 Destination :
                  ${escapeHTML(order.city)}
                </div>
              `
              : ""
          }

          ${
            order.estimatedDelivery
              ? `
                <div class="tracking-eta">
                  🕒 Livraison estimée :
                  ${escapeHTML(order.estimatedDelivery)}
                </div>
              `
              : ""
          }

        </div>

        <div class="order-timeline">

          ${statuses.map((status,index)=>{

            const active =
              currentIndex >= index;

            return `

              <div
                class="timeline-step ${
                  active ? "active" : ""
                }"
              >

                <div class="timeline-dot">
                  ${active ? "✓" : ""}
                </div>

                <div class="timeline-label">
                  ${escapeHTML(status)}
                </div>

              </div>

            `;

          }).join("")}

        </div>

        ${
          currentStatus === "Annulée"
            ? `
              <div class="order-cancelled">
                ❌ Cette commande a été annulée.
              </div>
            `
            : ""
        }

        <div class="order-detail-items">

          <h3>
            Produits
          </h3>

          ${
            (order.items || []).map(item=>`

              <div class="order-detail-item">

                <span>
                  ${escapeHTML(
                    item.name ||
                    item.productName ||
                    "Produit"
                  )}
                </span>

                <span>
                  ×${Number(item.quantity || 1)}
                </span>

              </div>

            `).join("")
          }

        </div>

        <div class="order-detail-total">

          Total :
          <strong>
            ${money(order.total)}
          </strong>

        </div>

      </div>

    `;

  } catch(error){

    console.error(
      "Erreur détail commande:",
      error
    );

    toast(
      "Impossible de charger la commande",
      "error"
    );
  }
}


// ============================================================
// BOUTON COMMANDES
// ============================================================

document.addEventListener(
  "click",
  event=>{

    const button =
      event.target.closest(
        "#ordersBtn"
      );

    if(button){
      openOrders();
    }

  }
);


// ============================================================
// CHECKOUT
// ============================================================

function openCheckout(){

  if(!currentUser){

    toast(
      "Connecte-toi pour passer commande.",
      "error"
    );

    showLoginForm();

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

  openModal(
    "Finaliser ma commande",
    `

      <form
        id="checkoutForm"
        class="checkout-form"
      >

        <div class="checkout-summary">

          <div>
            Sous-total
          </div>

          <strong>
            ${money(subtotal)}
          </strong>

        </div>

        <label>
          Prénom
          <input
            id="checkoutFirstName"
            type="text"
            required
          >
        </label>

        <label>
          Nom
          <input
            id="checkoutLastName"
            type="text"
            required
          >
        </label>

        <label>
          Adresse
          <input
            id="checkoutAddress"
            type="text"
            required
          >
        </label>

        <label>
          Ville
          <input
            id="checkoutCity"
            type="text"
            required
          >
        </label>

        <label>
          Paiement
          <select
            id="checkoutPayment"
            required
          >
            <option value="paypal">
              PayPal
            </option>

            <option value="card">
              Carte bancaire
            </option>
          </select>
        </label>

        <div
          id="cardFields"
          style="display:none"
        >

          <label>
            Numéro de carte
            <input
              id="cardNumber"
              type="text"
              inputmode="numeric"
              maxlength="19"
            >
          </label>

          <div class="checkout-card-row">

            <label>
              Expiration
              <input
                id="cardExpiry"
                type="text"
                placeholder="MM/AA"
                maxlength="5"
              >
            </label>

            <label>
              CVV
              <input
                id="cardCvv"
                type="password"
                inputmode="numeric"
                maxlength="4"
              >
            </label>

          </div>

        </div>

        <div
          id="checkoutError"
          class="auth-error"
        ></div>

        <button
          type="submit"
          class="primary-btn"
        >
          VALIDER LA COMMANDE
        </button>

      </form>

    `
  );

  const paymentSelect =
    $("#checkoutPayment");

  const cardFields =
    $("#cardFields");

  paymentSelect?.addEventListener(
    "change",
    ()=>{

      if(!cardFields) return;

      cardFields.style.display =
        paymentSelect.value === "card"
          ? "block"
          : "none";

    }
  );

  $("#checkoutForm")?.addEventListener(
    "submit",
    handleCheckout
  );
}


// ============================================================
// CHECKOUT TRAITEMENT
// ============================================================

async function handleCheckout(event){

  event.preventDefault();

  if(!currentUser){

    showLoginForm();

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
    $("#checkoutFirstName")?.value.trim();

  const lastName =
    $("#checkoutLastName")?.value.trim();

  const address =
    $("#checkoutAddress")?.value.trim();

  const city =
    $("#checkoutCity")?.value.trim();

  const paymentMethod =
    $("#checkoutPayment")?.value;

  const errorEl =
    $("#checkoutError");

  if(
    !firstName ||
    !lastName ||
    !address ||
    !city
  ){

    if(errorEl){
      errorEl.textContent =
        "Remplis tous les champs obligatoires.";
    }

    return;
  }

  if(!paymentMethod){

    if(errorEl){
      errorEl.textContent =
        "Choisis un moyen de paiement.";
    }

    return;
  }

  const subtotal =
    getCartSubtotal();

  const items =
    cart.map(item=>{

      const product =
        getProduct(item.productId);

      return {
        productId:item.productId,
        name:getCartProductName(item),
        price:Number(product?.price || 0),
        quantity:Number(item.quantity || 1),
        options:item.options || {}
      };

    });

  let paymentStatus =
    paymentMethod === "paypal"
      ? "En attente PayPal"
      : "En attente";

  if(paymentMethod === "card"){

    const cardNumber =
      $("#cardNumber")?.value
        .replace(/\s/g,"");

    const cardExpiry =
      $("#cardExpiry")?.value.trim();

    const cardCvv =
      $("#cardCvv")?.value.trim();

    if(
      !cardNumber ||
      !cardExpiry ||
      !cardCvv
    ){

      if(errorEl){
        errorEl.textContent =
          "Remplis les informations de carte.";
      }

      return;
    }

    const testCard =
      getTestCard();

    if(
      cardNumber !== testCard.number ||
      cardExpiry !== testCard.expiry ||
      cardCvv !== testCard.cvv
    ){

      if(errorEl){
        errorEl.textContent =
          "Carte de démonstration incorrecte.";
      }

      return;
    }

    paymentStatus =
      "Payée - carte de démonstration";
  }

  try {

    const orderData = {

      userId:currentUser.uid,

      userEmail:
        currentUser.email || "",

      firstName,

      lastName,

      items,

      subtotal,

      total:subtotal,

      address,

      city,

      status:"Enregistrée",

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
    closeCart();

    toast(
      "Commande enregistrée 📦",
      "success"
    );

    if(
      paymentMethod === "paypal" &&
      subtotal > 0
    ){

      setTimeout(()=>{

        const paypalUrl =
          `https://paypal.me/SH0PNOVA/${encodeURIComponent(
            subtotal.toFixed(2)
          )}EUR`;

        window.open(
          paypalUrl,
          "_blank",
          "noopener"
        );

      },400);

    }

    console.log(
      "Commande créée:",
      orderRef.id
    );

  } catch(error){

    console.error(
      "Erreur création commande:",
      error
    );

    if(errorEl){

      errorEl.textContent =
        "Impossible d'enregistrer la commande.";

    }

  }
}


// ============================================================
// BOUTON CHECKOUT
// ============================================================

checkoutBtn?.addEventListener(
  "click",
  openCheckout
);


// ============================================================
// BOUTON PANIER
// ============================================================

document.addEventListener(
  "click",
  event=>{

    const button =
      event.target.closest(
        "#cartBtn"
      );

    if(button){
      openCart();
    }

  }
);


// ============================================================
// CARTE DE TEST
// ============================================================

function getTestCard(){

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          TEST_CARD_STORAGE_KEY
        ) || "null"
      );

    if(
      saved &&
      saved.number &&
      saved.expiry &&
      saved.cvv
    ){

      return saved;
    }

  } catch(error){

    console.warn(
      "Carte test invalide:",
      error
    );

  }

  return generateTestCard();
}


function generateTestCard(){

  const number =
    "9999 " +
    String(
      Math.floor(
        1000 + Math.random()*9000
      )
    ) +
    " " +
    String(
      Math.floor(
        1000 + Math.random()*9000
      )
    ) +
    " " +
    String(
      Math.floor(
        1000 + Math.random()*9000
      )
    );

  const now =
    new Date();

  const year =
    now.getFullYear() +
    Math.floor(
      1 + Math.random()*5
    );

  const month =
    String(
      Math.floor(
        1 + Math.random()*12
      )
    ).padStart(2,"0");

  const expiry =
    `${month}/${String(year).slice(-2)}`;

  const cvv =
    String(
      Math.floor(
        100 + Math.random()*900
      )
    );

  const card = {

    number,

    holder:"NOVASHOP CARD",

    expiry,

    cvv

  };

  localStorage.setItem(
    TEST_CARD_STORAGE_KEY,
    JSON.stringify(card)
  );

  return card;
}


function renderTestCardHTML(){

  const card =
    getTestCard();

  return `

    <div class="test-card-box">

      <div class="test-card-title">
        💳 Carte de démonstration
      </div>

      <div class="test-card-number">
        ${escapeHTML(card.number)}
      </div>

      <div class="test-card-details">

        <span>
          ${escapeHTML(card.holder)}
        </span>

        <span>
          ${escapeHTML(card.expiry)}
        </span>

        <span>
          CVV ${escapeHTML(card.cvv)}
        </span>

      </div>

    </div>

  `;
}


// ============================================================
// EXPORTS PUBLICS
// ============================================================

window.NovaShopTemp = {

  products,

  getProduct,

  getTestCard,

  renderTestCardHTML,

  openProduct,

  openCart,

  closeCart,

  addToCart,

  removeFromCart,

  changeCartQuantity,

  getCartCount,

  getCartSubtotal

};
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
