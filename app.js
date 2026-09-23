// ============================================================
// NOVASHOP - APP.JS
// PARTIE 1/3
// Firebase Auth + Firestore + Catalogue
// ============================================================

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

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

const firebaseApp =
  initializeApp(firebaseConfig);

const auth =
  getAuth(firebaseApp);

const db =
  getFirestore(firebaseApp);

const ADMIN_EMAIL =
  "pc2alex.les@gmail.com";

const ADMIN_CODE =
  "NOVA-ADMIN-2026";

const ADMIN_ACCESS_KEY =
  "novaAdminAuthorized";

const TEST_CARD_STORAGE_KEY =
  "novaTestCard";


// ============================================================
// PRODUITS
// 104 PRODUITS
// GOOGLE PIXEL 10 SUPPRIMÉ
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
      Couleur:[
        "Rouge",
        "Blanc",
        "Noir",
        "Bleu"
      ]
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
    name:'iiyama 23.8" LED - G-Master GB2471HS-B1 Red Eagle',
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
  }

];


// ============================================================
// PRODUITS 36 À 70
// ============================================================

products.push(

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
    name:'Apple iPhone 14 Pro 6,1" 5G Double SIM 128 Go Argent',
    category:"Smartphones",
    price:400,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/07/3b/32/20069127/1540-1/tsp20260630131025/Apple-iPhone-14-Pro-6-1-5G-Double-SIM-128-Go-Argent.jpg"
  },

  {
    id:"p45",
    name:'Apple iPhone 15 6,1" 5G Double SIM 128 Go Noir',
    category:"Smartphones",
    price:750,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/cd/f0/52/22212813/1540-1/tsp20260914144304/Apple-iPhone-15-6-1-5G-Double-SIM-128-Go-Noir.jpg"
  },

  {
    id:"p46",
    name:'Apple iPhone 16 6,1" 5G 128 Go Double SIM Noir',
    category:"Smartphones",
    price:949.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/fe/47/66/23480318/3756-1/tsp20260920085557/Apple-iPhone-16-6-1-5G-128-Go-Double-SIM-Noir.jpg"
  },

  {
    id:"p47",
    name:'Apple iPhone 17 6,3" 5G Double SIM 256 Go Noir',
    category:"Smartphones",
    price:1000,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/19/86/b6/28739097/3756-1/tsp20260909180923/Apple-iPhone-17-6-3-5G-Double-SIM-256-Go-Noir.jpg"
  },

  {
    id:"p48",
    name:'Apple iPhone 18 Pro 6,3" 5G Double SIM 256 Go Noir',
    category:"Smartphones",
    price:1199.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/62/73/c7/29848418/1540-1/tsp20260920091102/Apple-iPhone-18-Pro-6-3-5G-Double-SIM-256-Go-Noir.jpg"
  },

  {
    id:"p49",
    name:'Samsung Galaxy S23 6,1" 5G 8 Go RAM 256 Go Noir',
    category:"Smartphones",
    price:230,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/0d/c0/44/21282829/1540-1/tsp20260829031739/Smartphone-Samsung-Galaxy-S23-6-1-Nano-SIM-5G-8-Go-RAM-256-Go-Noir.jpg"
  },

  {
    id:"p50",
    name:'Samsung Galaxy S24 6,2" 5G 256 Go Noir',
    category:"Smartphones",
    price:449.90,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/a6/f6/5a/22738598/1540-1/tsp20260319135101/Smartphone-Samsung-Galaxy-S24-6-2-5G-Nano-SIM-256-Go-Noir.jpg"
  },

  {
    id:"p51",
    name:'Samsung Galaxy S25 Edge 6,7" 5G 256 Go Noir absolu Titane',
    category:"Smartphones",
    price:469.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/42/7b/ab/28015426/1540-1/tsp20260909180103/Smartphone-Samsung-Galaxy-S25-Edge-6-7-5G-Nano-SIM-256-Go-Noir-absolu-Titane.jpg"
  },

  {
    id:"p52",
    name:'Samsung Galaxy S26 6,3" 5G 256 Go Noir + Buds4 Noir',
    category:"Smartphones",
    price:650.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/e8/a2/c7/29860584/1540-1/tsp20260903144909/Pack-Smartphone-Samsung-Galaxy-S26-6-3-5G-Nano-SIM-256-Go-Noir-Buds4-Noir.jpg"
  },

  {
    id:"p53",
    name:'Google Pixel 8 6,2" 5G Double SIM 128 Go Vert Sauge',
    category:"Smartphones",
    price:200,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/37/bc/52/22199351/1540-1/tsp20260722081937/Smartphone-Google-Pixel-8-6-2-5G-Double-SIM-128-Go-Vert-Sauge.jpg"
  },

  {
    id:"p54",
    name:'Google Pixel 9 6,3" 5G Double nano-SIM 128 Go Noir Obsidienne',
    category:"Smartphones",
    price:400,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/f6/00/6d/23920886/1540-1/tsp20260914084700/Smartphone-Google-Pixel-9-6-3-5G-Double-nano-SIM-128-Go-Noir-Obsidienne.jpg"
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
  }

);


// ============================================================
// ETAT
// ============================================================

let currentUser = null;

let cart =
  loadStorage(
    "nova_cart",
    []
  );

let favorites =
  loadStorage(
    "nova_favorites",
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

const searchInput =
  $("searchInput");

const sortSelect =
  $("sortSelect");

const categoriesContainer =
  $("categories");

const productGrid =
  $("productGrid");

const productCount =
  $("productCount");

const cartBtn =
  $("cartBtn");

const heroCartBtn =
  $("heroCartBtn");

const cartBadge =
  $("cartBadge");

const cartDrawer =
  $("cartDrawer");

const overlay =
  $("overlay");

const closeCartBtn =
  $("closeCart");

const cartItems =
  $("cartItems");

const cartTotal =
  $("cartTotal");

const checkoutBtn =
  $("checkoutBtn");

const settingsBtn =
  $("settingsBtn");

const accountBtn =
  $("accountBtn");

const ordersBtn =
  $("ordersBtn");

const adminBtn =
  $("adminBtn");

const modal =
  $("modalLayer");

const modalTitle =
  $("modalTitle");

const modalContent =
  $("modalContent");

const modalClose =
  $("modalClose");

const toastElement =
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

    console.error(
      "Storage error:",
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

    console.error(
      "Storage save error:",
      error
    );

  }

}


function saveCart(){

  saveStorage(
    "nova_cart",
    cart
  );

}


function saveFavorites(){

  saveStorage(
    "nova_favorites",
    favorites
  );

}


// ============================================================
// UTILITAIRES
// ============================================================

function money(value){

  const number =
    Number(value);

  return (
    Number.isFinite(number)
      ? number
      : 0
  ).toLocaleString(
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
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


function escapeAttr(value){

  return escapeHTML(
    value
  );

}


function getProduct(id){

  return products.find(
    product =>
      product.id === id
  );

}


function toast(
  message,
  type="info"
){

  if(!toastElement){

    console.log(
      message
    );

    return;

  }

  toastElement.textContent =
    message;

  toastElement.className =
    `toast ${type}`;

  toastElement.classList.add(
    "show"
  );

  clearTimeout(
    toastElement._timer
  );

  toastElement._timer =
    setTimeout(
      () => {

        toastElement.classList.remove(
          "show"
        );

      },
      3000
    );

}


// ============================================================
// IMAGE PRODUIT
// ============================================================

function productImageHTML(
  product
){

  if(!product?.image){
    return "";
  }

  return `
    <img
      src="${escapeAttr(product.image)}"
      alt="${escapeAttr(product.name)}"
      loading="lazy"
      onerror="
        this.onerror=null;
        this.style.display='none';
      "
    >
  `;

}


// ============================================================
// CATEGORIES
// ============================================================

function getCategories(){

  const categories = [
    "Toutes",
    ...new Set(
      products.map(
        product =>
          product.category
      )
    )
  ];

  return categories;

}


function renderCategories(){

  if(!categoriesContainer){
    return;
  }

  categoriesContainer.innerHTML =
    getCategories()
      .map(
        category => `

          <button
            type="button"
            class="category-btn ${
              state.category === category
                ? "active"
                : ""
            }"
            data-category="${escapeAttr(
              category
            )}"
          >
            ${escapeHTML(
              category
            )}
          </button>

        `
      )
      .join("");


  categoriesContainer
    .querySelectorAll(
      ".category-btn"
    )
    .forEach(
      button => {

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

      }
    );

}


// ============================================================
// FILTRAGE
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

  if(
    state.sort ===
    "price-asc"
  ){

    result.sort(
      (a,b) =>
        Number(a.price) -
        Number(b.price)
    );

  }

  if(
    state.sort ===
    "price-desc"
  ){

    result.sort(
      (a,b) =>
        Number(b.price) -
        Number(a.price)
    );

  }

  if(
    state.sort ===
    "name"
  ){

    result.sort(
      (a,b) =>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );

  }

  if(
    state.sort ===
    "new"
  ){

    result.sort(
      (a,b) =>
        Number(Boolean(b.new)) -
        Number(Boolean(a.new))
    );

  }

  return result;

}


// ============================================================
// PRODUITS
// ============================================================

function renderProducts(){

  if(!productGrid){
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

      <div
        style="
          grid-column:1/-1;
          text-align:center;
          padding:50px 20px;
        "
      >

        <div style="
          font-size:50px;
          margin-bottom:15px;
        ">
          🔎
        </div>

        <h3>
          Aucun produit trouvé
        </h3>

        <p style="
          opacity:.65;
          margin-top:8px;
        ">
          Essaie une autre recherche ou une autre catégorie.
        </p>

      </div>

    `;

    return;

  }

  productGrid.innerHTML =
    result.map(
      product => {

        const isFavorite =
          favorites.includes(
            product.id
          );

        return `

          <article
            class="product"
            data-id="${escapeAttr(
              product.id
            )}"
          >

            <div class="product-img">

              ${
                product.new
                  ? `
                    <span class="product-badge">
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
                data-favorite="${escapeAttr(
                  product.id
                )}"
                aria-label="Favori"
              >
                ${
                  isFavorite
                    ? "♥"
                    : "♡"
                }
              </button>

              ${productImageHTML(
                product
              )}

            </div>

            <div class="product-body">

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

              <div class="price">
                ${money(
                  product.price
                )}
              </div>

              <div class="product-actions">

                <button
                  type="button"
                  class="view-btn product-view"
                  data-id="${escapeAttr(
                    product.id
                  )}"
                >
                  Voir
                </button>

                <button
                  type="button"
                  class="add-btn product-add"
                  data-id="${escapeAttr(
                    product.id
                  )}"
                >
                  🛒 Ajouter
                </button>

              </div>

            </div>

          </article>

        `;

      }
    ).join("");


  productGrid
    .querySelectorAll(
      ".product-add"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            addToCart(
              button.dataset.id
            );

          }
        );

      }
    );


  productGrid
    .querySelectorAll(
      ".product-view"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            openProduct(
              button.dataset.id
            );

          }
        );

      }
    );


  productGrid
    .querySelectorAll(
      ".favorite-btn"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          event => {

            event.stopPropagation();

            toggleFavorite(
              button.dataset.favorite
            );

          }
        );

      }
    );

}


// ============================================================
// FAVORIS
// ============================================================

function toggleFavorite(id){

  if(!id){
    return;
  }

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
// PANIER
// ============================================================

function getCartCount(){

  return cart.reduce(
    (total,item) =>
      total +
      Number(
        item.quantity || 1
      ),
    0
  );

}


function getCartSubtotal(){

  return cart.reduce(
    (total,item) => {

      const product =
        getProduct(
          item.id
        );

      if(!product){
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


function addToCart(
  id,
  option=""
){

  const product =
    getProduct(id);

  if(!product){
    toast(
      "Produit introuvable.",
      "error"
    );
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
      Number(
        existing.quantity || 1
      ) + 1;

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
  option=""
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
  quantity
){

  const item =
    cart.find(
      entry =>
        entry.id === id &&
        entry.option === option
    );

  if(!item){
    return;
  }

  item.quantity =
    Math.max(
      1,
      Number(quantity) || 1
    );

  saveCart();

  renderCart();

}


function renderCart(){

  if(cartBadge){

    cartBadge.textContent =
      String(
        getCartCount()
      );

  }

  if(cartTotal){

    cartTotal.textContent =
      money(
        getCartSubtotal()
      );

  }

  if(!cartItems){
    return;
  }

  if(!cart.length){

    cartItems.innerHTML = `

      <div class="nova-empty">

        <div class="nova-empty-icon">
          🛒
        </div>

        <h3>
          Ton panier est vide
        </h3>

        <p style="
          margin-top:8px;
          opacity:.65;
        ">
          Ajoute des produits pour commencer.
        </p>

      </div>

    `;

    return;

  }

  cartItems.innerHTML =
    cart.map(
      item => {

        const product =
          getProduct(
            item.id
          );

        if(!product){
          return "";
        }

        return `

          <div
            class="cart-item"
            data-id="${escapeAttr(
              item.id
            )}"
          >

            <div class="cart-item-image">

              ${productImageHTML(
                product
              )}

            </div>

            <div class="cart-item-info">

              <strong>
                ${escapeHTML(
                  product.name
                )}
              </strong>

              ${
                item.option
                  ? `
                    <small>
                      ${escapeHTML(
                        item.option
                      )}
                    </small>
                  `
                  : ""
              }

              <div class="cart-item-price">
                ${money(
                  product.price
                )}
              </div>

              <div class="cart-item-controls">

                <button
                  type="button"
                  class="cart-minus"
                  data-id="${escapeAttr(
                    item.id
                  )}"
                  data-option="${escapeAttr(
                    item.option || ""
                  )}"
                >
                  −
                </button>

                <span>
                  ${Number(
                    item.quantity || 1
                  )}
                </span>

                <button
                  type="button"
                  class="cart-plus"
                  data-id="${escapeAttr(
                    item.id
                  )}"
                  data-option="${escapeAttr(
                    item.option || ""
                  )}"
                >
                  +
                </button>

                <button
                  type="button"
                  class="cart-remove"
                  data-id="${escapeAttr(
                    item.id
                  )}"
                  data-option="${escapeAttr(
                    item.option || ""
                  )}"
                >
                  🗑️
                </button>

              </div>

            </div>

          </div>

        `;

      }
    ).join("");


  cartItems
    .querySelectorAll(
      ".cart-minus"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const id =
              button.dataset.id;

            const option =
              button.dataset.option || "";

            const item =
              cart.find(
                entry =>
                  entry.id === id &&
                  entry.option === option
              );

            if(!item){
              return;
            }

            const quantity =
              Number(
                item.quantity || 1
              );

            if(quantity <= 1){

              removeFromCart(
                id,
                option
              );

            }else{

              changeCartQuantity(
                id,
                option,
                quantity - 1
              );

            }

          }
        );

      }
    );


  cartItems
    .querySelectorAll(
      ".cart-plus"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const id =
              button.dataset.id;

            const option =
              button.dataset.option || "";

            const item =
              cart.find(
                entry =>
                  entry.id === id &&
                  entry.option === option
              );

            if(item){

              changeCartQuantity(
                id,
                option,
                Number(
                  item.quantity || 1
                ) + 1
              );

            }

          }
        );

      }
    );


  cartItems
    .querySelectorAll(
      ".cart-remove"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            removeFromCart(
              button.dataset.id,
              button.dataset.option || ""
            );

          }
        );

      }
    );

}


// ============================================================
// PANIER OUVERTURE / FERMETURE
// ============================================================

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


cartBtn?.addEventListener(
  "click",
  openCart
);

heroCartBtn?.addEventListener(
  "click",
  openCart
);

closeCartBtn?.addEventListener(
  "click",
  closeCart
);

overlay?.addEventListener(
  "click",
  closeCart
);


// ============================================================
// MODAL
// ============================================================

function showModal(
  title,
  content
){

  if(modalTitle){

    modalTitle.textContent =
      title;

  }

  if(modalContent){

    modalContent.innerHTML =
      content;

  }

  modal?.classList.add(
    "show"
  );

}


function closeModal(){

  modal?.classList.remove(
    "show"
  );

}


modalClose?.addEventListener(
  "click",
  closeModal
);


// ============================================================
// PRODUIT
// ============================================================

function openProduct(id){

  const product =
    getProduct(id);

  if(!product){
    return;
  }

  let optionsHTML = "";

  if(product.options){

    Object.entries(
      product.options
    ).forEach(
      ([name,values]) => {

        optionsHTML += `

          <label
            for="option-${escapeAttr(
              name
            )}"
          >
            ${escapeHTML(name)}
          </label>

          <select
            id="option-${escapeAttr(
              name
            )}"
            class="product-option"
            data-option-name="${escapeAttr(
              name
            )}"
          >

            ${values.map(
              value => `
                <option
                  value="${escapeAttr(
                    value
                  )}"
                >
                  ${escapeHTML(
                    value
                  )}
                </option>
              `
            ).join("")}

          </select>

        `;

      }
    );

  }

  showModal(
    product.name,
    `

      <div class="product-modal">

        <div class="product-modal-image">
          ${productImageHTML(
            product
          )}
        </div>

        <div>

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

          <div class="price">
            ${money(
              product.price
            )}
          </div>

          ${
            optionsHTML
              ? `
                <div style="
                  margin-top:18px;
                  display:grid;
                  gap:8px;
                ">
                  ${optionsHTML}
                </div>
              `
              : ""
          }

          <div style="
            display:flex;
            gap:10px;
            margin-top:20px;
            flex-wrap:wrap;
          ">

            <button
              type="button"
              class="add-btn"
              id="modalAddCart"
              style="
                flex:1;
                min-width:170px;
              "
            >
              🛒 Ajouter au panier
            </button>

            <button
              type="button"
              class="view-btn"
              id="modalFavorite"
              style="
                flex:1;
                min-width:170px;
              "
            >
              ❤️ ${
                favorites.includes(
                  product.id
                )
                  ? "Retirer des favoris"
                  : "Ajouter aux favoris"
              }
            </button>

          </div>

        </div>

      </div>

    `
  );


  $("modalAddCart")
    ?.addEventListener(
      "click",
      () => {

        const selected =
          Array.from(
            document.querySelectorAll(
              ".product-option"
            )
          )
            .map(
              select =>
                `${select.dataset.optionName}: ${select.value}`
            )
            .join(" | ");

        addToCart(
          product.id,
          selected
        );

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
// RECHERCHE / TRI
// ============================================================

searchInput?.addEventListener(
  "input",
  event => {

    state.search =
      event.target.value || "";

    renderProducts();

  }
);


sortSelect?.addEventListener(
  "change",
  event => {

    state.sort =
      event.target.value || "default";

    renderProducts();

  }
);


// ============================================================
// STYLES DES BOUTONS
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

    .view-btn,
    .add-btn,
    .category-btn,
    .payment-choice{
      cursor:pointer;
      border:1px solid var(--line);
      border-radius:10px;
      padding:10px 14px;
      font-weight:700;
      transition:.2s ease;
    }

    .view-btn:hover,
    .add-btn:hover,
    .category-btn:hover,
    .payment-choice:hover{
      transform:translateY(-1px);
    }

    .add-btn{
      background:#2d8cff;
      color:#fff;
      border-color:#2d8cff;
    }

    .view-btn{
      background:rgba(255,255,255,.06);
      color:var(--text);
    }

    .category-btn{
      background:var(--card);
      color:var(--text);
    }

    .category-btn.active,
    .payment-choice.selected{
      background:#2d8cff;
      color:#fff;
      border-color:#2d8cff;
    }

    .product-actions{
      display:flex;
      gap:8px;
    }

    .product-actions button{
      flex:1;
    }

    .product-badge{
      position:absolute;
      top:10px;
      left:10px;
      z-index:2;
      padding:5px 8px;
      border-radius:8px;
      background:#25d695;
      color:#04110c;
      font-size:11px;
      font-weight:900;
    }

    .favorite-btn{
      position:absolute;
      top:10px;
      right:10px;
      z-index:3;
      width:34px;
      height:34px;
      border-radius:50%;
      border:1px solid rgba(0,0,0,.12);
      background:rgba(255,255,255,.9);
      color:#111;
      cursor:pointer;
      font-size:19px;
    }

    .favorite-btn.active{
      color:#ff3d71;
    }

    .product-img{
      height:165px !important;
      padding:12px !important;
    }

    .product-img img{
      width:100%;
      height:100%;
      max-width:100%;
      max-height:100%;
      object-fit:contain;
    }

    .product-body{
      padding:13px;
    }

    .product h3{
      font-size:14px;
      min-height:58px;
    }

    .price{
      font-size:19px;
      font-weight:900;
      margin-top:10px;
    }

    #heroCartBtn{
      cursor:pointer;
    }

    #cartBtn,
    #settingsBtn,
    #accountBtn,
    #ordersBtn,
    #adminBtn{
      cursor:pointer;
    }

    button:disabled{
      opacity:.5;
      cursor:not-allowed !important;
      transform:none !important;
    }

    @media(max-width:520px){

      .product-img{
        height:190px !important;
      }

      .product-actions{
        flex-direction:column;
      }

    }

  `;

  document.head.appendChild(
    style
  );

}


injectNovaStyles();


// ============================================================
// AUTH
// ============================================================

function authError(
  error
){

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
      "Mot de passe incorrect.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard."

  };

  return (
    messages[code] ||
    error?.message ||
    "Une erreur est survenue."
  );

}


// ============================================================
// LOGIN
// ============================================================

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
            margin-top:16px;
          "
        >
          Se connecter
        </button>

        <button
          type="button"
          class="view-btn"
          id="showRegister"
          style="
            width:100%;
            margin-top:10px;
          "
        >
          Créer un compte
        </button>

        <div
          id="loginError"
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
            ?.value
            .trim() || "";

        const password =
          $("loginPassword")
            ?.value || "";

        const error =
          $("loginError");

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

        }catch(err){

          if(error){

            error.textContent =
              authError(err);

            error.style.display =
              "block";

          }

        }

      }
    );


  $("showRegister")
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
        >

        <button
          type="submit"
          class="add-btn"
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
          id="showLogin"
          style="
            width:100%;
            margin-top:10px;
          "
        >
          J'ai déjà un compte
        </button>

        <div
          id="registerError"
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
            ?.value
            .trim() || "";

        const password =
          $("registerPassword")
            ?.value || "";

        const error =
          $("registerError");

        try{

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

        }catch(err){

          if(error){

            error.textContent =
              authError(err);

            error.style.display =
              "block";

          }

        }

      }
    );


  $("showLogin")
    ?.addEventListener(
      "click",
      showLoginForm
    );

}


function openAccount(){

  if(!currentUser){

    showLoginForm();

    return;

  }

  showModal(
    "Mon compte",
    `

      <div style="
        display:grid;
        gap:14px;
      ">

        <div style="
          padding:16px;
          border-radius:15px;
          background:rgba(255,255,255,.05);
        ">

          <strong>
            👤 Compte connecté
          </strong>

          <p style="
            margin-top:8px;
            opacity:.75;
          ">
            ${escapeHTML(
              currentUser.email ||
              ""
            )}
          </p>

        </div>

        <button
          type="button"
          class="view-btn"
          id="accountOrders"
        >
          📦 Mes commandes
        </button>

        <button
          type="button"
          class="view-btn"
          id="accountLogout"
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

        try{

          await signOut(
            auth
          );

          closeModal();

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
    );

}


// ============================================================
// BOUTONS DU HAUT
// ============================================================

accountBtn?.addEventListener(
  "click",
  openAccount
);

ordersBtn?.addEventListener(
  "click",
  openOrders
);

settingsBtn?.addEventListener(
  "click",
  openSettings
);

adminBtn?.addEventListener(
  "click",
  openAdmin
);


// ============================================================
// FIN PARTIE 1
// ============================================================// ============================================================
// NOVASHOP - APP.JS
// PARTIE 2/3
// Commandes + Checkout + Facture
// ============================================================


// ============================================================
// COMMANDES
// ============================================================

async function openOrders(){

  if(!currentUser){

    toast(
      "Connecte-toi pour voir tes commandes."
    );

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

      <div id="ordersContent"></div>

    `
  );

  try{

    const ordersQuery =
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
      await getDocs(
        ordersQuery
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

    renderOrders(
      orders
    );

  }catch(error){

    console.error(
      "Orders error:",
      error
    );

    const loading =
      $("ordersLoading");

    if(loading){

      loading.innerHTML = `
        <div style="
          color:#ff7777;
        ">
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

      <div class="nova-empty">

        <div class="nova-empty-icon">
          📦
        </div>

        <h3>
          Aucune commande
        </h3>

        <p style="
          margin-top:8px;
          opacity:.65;
        ">
          Tes commandes apparaîtront ici.
        </p>

      </div>

    `;

    return;

  }

  content.innerHTML =
    orders.map(
      order => `

        <div style="
          padding:16px;
          border:1px solid var(--line);
          border-radius:16px;
          margin-bottom:12px;
        ">

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

            <strong>
              ${money(
                order.total || 0
              )}
            </strong>

          </div>

          <div style="
            margin-top:9px;
            font-size:14px;
          ">

            Statut :
            <strong>
              ${escapeHTML(
                order.status ||
                "Enregistrée"
              )}
            </strong>

          </div>

          ${
            order.city
              ? `
                <div style="
                  margin-top:7px;
                  opacity:.8;
                ">
                  📍 ${escapeHTML(
                    order.city
                  )}
                </div>
              `
              : ""
          }

          ${
            order.estimatedDelivery
              ? `
                <div style="
                  margin-top:7px;
                  opacity:.8;
                ">
                  🚚 Livraison :
                  ${escapeHTML(
                    order.estimatedDelivery
                  )}
                </div>
              `
              : ""
          }

          ${
            order.tracking
              ? `
                <div style="
                  margin-top:7px;
                  opacity:.8;
                ">
                  🔎 Suivi :
                  ${escapeHTML(
                    order.tracking
                  )}
                </div>
              `
              : ""
          }

          <button
            type="button"
            class="view-btn order-detail"
            data-id="${escapeAttr(
              order.id
            )}"
            style="
              margin-top:14px;
              width:100%;
            "
          >
            📦 Voir le détail
          </button>

        </div>

      `
    ).join("");


  document
    .querySelectorAll(
      ".order-detail"
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

            showOrderDetail(
              order
            );

          }

        }
      );

    });

}


// ============================================================
// DÉTAIL COMMANDE
// ============================================================

function showOrderDetail(
  order
){

  const status =
    order.status ||
    "Enregistrée";

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

  const currentIndex =
    statuses.indexOf(
      status
    );

  const items =
    Array.isArray(order.items)
      ? order.items
      : [];

  const itemsHTML =
    items.map(
      item => {

        const product =
          getProduct(
            item.id
          );

        const name =
          item.name ||
          product?.name ||
          "Produit";

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
            padding:12px 0;
            border-bottom:1px solid var(--line);
          ">

            <div>

              <strong>
                ${escapeHTML(
                  name
                )}
              </strong>

              ${
                item.option
                  ? `
                    <div style="
                      margin-top:4px;
                      opacity:.65;
                      font-size:13px;
                    ">
                      ${escapeHTML(
                        item.option
                      )}
                    </div>
                  `
                  : ""
              }

              <div style="
                margin-top:4px;
                opacity:.7;
                font-size:13px;
              ">
                ×${quantity}
              </div>

            </div>

            <strong>
              ${money(
                price * quantity
              )}
            </strong>

          </div>

        `;

      }
    ).join("");


  const timelineHTML =
    statuses.map(
      (item,index) => {

        const active =
          currentIndex >= index;

        return `

          <div style="
            display:flex;
            gap:12px;
            align-items:flex-start;
            margin-bottom:14px;
          ">

            <div style="
              width:24px;
              height:24px;
              min-width:24px;
              border-radius:50%;
              display:flex;
              align-items:center;
              justify-content:center;
              background:${
                active
                  ? "#2d8cff"
                  : "rgba(255,255,255,.08)"
              };
              color:${
                active
                  ? "#fff"
                  : "var(--muted)"
              };
              font-size:12px;
              font-weight:800;
            ">
              ${
                active
                  ? "✓"
                  : index + 1
              }
            </div>

            <div>

              <strong>
                ${escapeHTML(
                  item
                )}
              </strong>

            </div>

          </div>

        `;

      }
    ).join("");


  showModal(
    `Commande #${escapeHTML(
      order.id.slice(0,8)
    )}`,
    `

      <div style="
        display:grid;
        gap:16px;
      ">

        <div style="
          padding:16px;
          border-radius:16px;
          background:rgba(45,140,255,.08);
          border:1px solid rgba(45,140,255,.18);
        ">

          <div style="
            font-size:13px;
            opacity:.65;
          ">
            Statut actuel
          </div>

          <div style="
            font-size:20px;
            font-weight:800;
            margin-top:5px;
          ">
            ${escapeHTML(
              status
            )}
          </div>

          ${
            order.city
              ? `
                <div style="
                  margin-top:10px;
                ">
                  📍 Destination :
                  <strong>
                    ${escapeHTML(
                      order.city
                    )}
                  </strong>
                </div>
              `
              : ""
          }

          ${
            order.estimatedDelivery
              ? `
                <div style="
                  margin-top:7px;
                ">
                  🚚 Livraison estimée :
                  <strong>
                    ${escapeHTML(
                      order.estimatedDelivery
                    )}
                  </strong>
                </div>
              `
              : ""
          }

          ${
            order.tracking
              ? `
                <div style="
                  margin-top:7px;
                ">
                  🔎 Suivi :
                  <strong>
                    ${escapeHTML(
                      order.tracking
                    )}
                  </strong>
                </div>
              `
              : ""
          }

        </div>

        <div style="
          padding:16px;
          border-radius:16px;
          background:rgba(255,255,255,.04);
        ">

          <h3>
            Suivi de la commande
          </h3>

          <div style="
            margin-top:16px;
          ">
            ${timelineHTML}
          </div>

        </div>

        <div style="
          padding:16px;
          border-radius:16px;
          background:rgba(255,255,255,.04);
        ">

          <h3>
            Produits
          </h3>

          <div style="
            margin-top:10px;
          ">
            ${itemsHTML}
          </div>

          <div style="
            display:flex;
            justify-content:space-between;
            margin-top:16px;
            font-size:20px;
          ">

            <span>
              Total
            </span>

            <strong>
              ${money(
                order.total || 0
              )}
            </strong>

          </div>

        </div>

        <div style="
          padding:16px;
          border-radius:16px;
          background:rgba(255,255,255,.04);
        ">

          <h3>
            Livraison
          </h3>

          <p style="
            margin-top:10px;
            opacity:.8;
          ">
            ${escapeHTML(
              order.address ||
              "Adresse non renseignée"
            )}
          </p>

        </div>

        <div style="
          display:flex;
          gap:10px;
          flex-wrap:wrap;
        ">

          <button
            type="button"
            class="add-btn"
            id="orderInvoiceBtn"
            style="
              flex:1;
              min-width:180px;
            "
          >
            🧾 Voir la facture
          </button>

          <button
            type="button"
            class="view-btn"
            id="orderBackBtn"
            style="
              flex:1;
              min-width:180px;
            "
          >
            ← Retour aux commandes
          </button>

        </div>

      </div>

    `
  );


  $("orderInvoiceBtn")
    ?.addEventListener(
      "click",
      () => {

        printInvoice(
          order
        );

      }
    );


  $("orderBackBtn")
    ?.addEventListener(
      "click",
      () => {

        closeModal();

        setTimeout(
          openOrders,
          100
        );

      }
    );

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
              required
              placeholder="Ton prénom"
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
              required
              placeholder="Ton nom"
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
              ${money(
                subtotal
              )}
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
              ${money(
                subtotal
              )}
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
          style="
            margin-bottom:14px;
          "
        ></div>

        <button
          type="submit"
          class="add-btn"
          id="checkoutSubmit"
          style="
            width:100%;
          "
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
    .forEach(
      button => {

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
              .forEach(
                item => {

                  item.classList.remove(
                    "selected"
                  );

                }
              );

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

      }
    );


  $("checkoutForm")
    ?.addEventListener(
      "submit",
      async event => {

        event// ============================================================
// NOVASHOP - APP.JS
// PARTIE 2/3
// Commandes + Checkout + Facture
// ============================================================


// ============================================================
// COMMANDES
// ============================================================

async function openOrders(){

  if(!currentUser){

    toast(
      "Connecte-toi pour voir tes commandes."
    );

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

      <div id="ordersContent"></div>

    `
  );

  try{

    const ordersQuery =
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
      await getDocs(
        ordersQuery
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

    renderOrders(
      orders
    );

  }catch(error){

    console.error(
      "Orders error:",
      error
    );

    const loading =
      $("ordersLoading");

    if(loading){

      loading.innerHTML = `
        <div style="
          color:#ff7777;
        ">
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

      <div class="nova-empty">

        <div class="nova-empty-icon">
          📦
        </div>

        <h3>
          Aucune commande
        </h3>

        <p style="
          margin-top:8px;
          opacity:.65;
        ">
          Tes commandes apparaîtront ici.
        </p>

      </div>

    `;

    return;

  }

  content.innerHTML =
    orders.map(
      order => `

        <div style="
          padding:16px;
          border:1px solid var(--line);
          border-radius:16px;
          margin-bottom:12px;
        ">

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

            <strong>
              ${money(
                order.total || 0
              )}
            </strong>

          </div>

          <div style="
            margin-top:9px;
            font-size:14px;
          ">

            Statut :
            <strong>
              ${escapeHTML(
                order.status ||
                "Enregistrée"
              )}
            </strong>

          </div>

          ${
            order.city
              ? `
                <div style="
                  margin-top:7px;
                  opacity:.8;
                ">
                  📍 ${escapeHTML(
                    order.city
                  )}
                </div>
              `
              : ""
          }

          ${
            order.estimatedDelivery
              ? `
                <div style="
                  margin-top:7px;
                  opacity:.8;
                ">
                  🚚 Livraison :
                  ${escapeHTML(
                    order.estimatedDelivery
                  )}
                </div>
              `
              : ""
          }

          ${
            order.tracking
              ? `
                <div style="
                  margin-top:7px;
                  opacity:.8;
                ">
                  🔎 Suivi :
                  ${escapeHTML(
                    order.tracking
                  )}
                </div>
              `
              : ""
          }

          <button
            type="button"
            class="view-btn order-detail"
            data-id="${escapeAttr(
              order.id
            )}"
            style="
              margin-top:14px;
              width:100%;
            "
          >
            📦 Voir le détail
          </button>

        </div>

      `
    ).join("");


  document
    .querySelectorAll(
      ".order-detail"
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

            showOrderDetail(
              order
            );

          }

        }
      );

    });

}


// ============================================================
// DÉTAIL COMMANDE
// ============================================================

function showOrderDetail(
  order
){

  const status =
    order.status ||
    "Enregistrée";

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

  const currentIndex =
    statuses.indexOf(
      status
    );

  const items =
    Array.isArray(order.items)
      ? order.items
      : [];

  const itemsHTML =
    items.map(
      item => {

        const product =
          getProduct(
            item.id
          );

        const name =
          item.name ||
          product?.name ||
          "Produit";

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
            padding:12px 0;
            border-bottom:1px solid var(--line);
          ">

            <div>

              <strong>
                ${escapeHTML(
                  name
                )}
              </strong>

              ${
                item.option
                  ? `
                    <div style="
                      margin-top:4px;
                      opacity:.65;
                      font-size:13px;
                    ">
                      ${escapeHTML(
                        item.option
                      )}
                    </div>
                  `
                  : ""
              }

              <div style="
                margin-top:4px;
                opacity:.7;
                font-size:13px;
              ">
                ×${quantity}
              </div>

            </div>

            <strong>
              ${money(
                price * quantity
              )}
            </strong>

          </div>

        `;

      }
    ).join("");


  const timelineHTML =
    statuses.map(
      (item,index) => {

        const active =
          currentIndex >= index;

        return `

          <div style="
            display:flex;
            gap:12px;
            align-items:flex-start;
            margin-bottom:14px;
          ">

            <div style="
              width:24px;
              height:24px;
              min-width:24px;
              border-radius:50%;
              display:flex;
              align-items:center;
              justify-content:center;
              background:${
                active
                  ? "#2d8cff"
                  : "rgba(255,255,255,.08)"
              };
              color:${
                active
                  ? "#fff"
                  : "var(--muted)"
              };
              font-size:12px;
              font-weight:800;
            ">
              ${
                active
                  ? "✓"
                  : index + 1
              }
            </div>

            <div>

              <strong>
                ${escapeHTML(
                  item
                )}
              </strong>

            </div>

          </div>

        `;

      }
    ).join("");


  showModal(
    `Commande #${escapeHTML(
      order.id.slice(0,8)
    )}`,
    `

      <div style="
        display:grid;
        gap:16px;
      ">

        <div style="
          padding:16px;
          border-radius:16px;
          background:rgba(45,140,255,.08);
          border:1px solid rgba(45,140,255,.18);
        ">

          <div style="
            font-size:13px;
            opacity:.65;
          ">
            Statut actuel
          </div>

          <div style="
            font-size:20px;
            font-weight:800;
            margin-top:5px;
          ">
            ${escapeHTML(
              status
            )}
          </div>

          ${
            order.city
              ? `
                <div style="
                  margin-top:10px;
                ">
                  📍 Destination :
                  <strong>
                    ${escapeHTML(
                      order.city
                    )}
                  </strong>
                </div>
              `
              : ""
          }

          ${
            order.estimatedDelivery
              ? `
                <div style="
                  margin-top:7px;
                ">
                  🚚 Livraison estimée :
                  <strong>
                    ${escapeHTML(
                      order.estimatedDelivery
                    )}
                  </strong>
                </div>
              `
              : ""
          }

          ${
            order.tracking
              ? `
                <div style="
                  margin-top:7px;
                ">
                  🔎 Suivi :
                  <strong>
                    ${escapeHTML(
                      order.tracking
                    )}
                  </strong>
                </div>
              `
              : ""
          }

        </div>

        <div style="
          padding:16px;
          border-radius:16px;
          background:rgba(255,255,255,.04);
        ">

          <h3>
            Suivi de la commande
          </h3>

          <div style="
            margin-top:16px;
          ">
            ${timelineHTML}
          </div>

        </div>

        <div style="
          padding:16px;
          border-radius:16px;
          background:rgba(255,255,255,.04);
        ">

          <h3>
            Produits
          </h3>

          <div style="
            margin-top:10px;
          ">
            ${itemsHTML}
          </div>

          <div style="
            display:flex;
            justify-content:space-between;
            margin-top:16px;
            font-size:20px;
          ">

            <span>
              Total
            </span>

            <strong>
              ${money(
                order.total || 0
              )}
            </strong>

          </div>

        </div>

        <div style="
          padding:16px;
          border-radius:16px;
          background:rgba(255,255,255,.04);
        ">

          <h3>
            Livraison
          </h3>

          <p style="
            margin-top:10px;
            opacity:.8;
          ">
            ${escapeHTML(
              order.address ||
              "Adresse non renseignée"
            )}
          </p>

        </div>

        <div style="
          display:flex;
          gap:10px;
          flex-wrap:wrap;
        ">

          <button
            type="button"
            class="add-btn"
            id="orderInvoiceBtn"
            style="
              flex:1;
              min-width:180px;
            "
          >
            🧾 Voir la facture
          </button>

          <button
            type="button"
            class="view-btn"
            id="orderBackBtn"
            style="
              flex:1;
              min-width:180px;
            "
          >
            ← Retour aux commandes
          </button>

        </div>

      </div>

    `
  );


  $("orderInvoiceBtn")
    ?.addEventListener(
      "click",
      () => {

        printInvoice(
          order
        );

      }
    );


  $("orderBackBtn")
    ?.addEventListener(
      "click",
      () => {

        closeModal();

        setTimeout(
          openOrders,
          100
        );

      }
    );

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
              required
              placeholder="Ton prénom"
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
              required
              placeholder="Ton nom"
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
              ${money(
                subtotal
              )}
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
              ${money(
                subtotal
              )}
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
          style="
            margin-bottom:14px;
          "
        ></div>

        <button
          type="submit"
          class="add-btn"
          id="checkoutSubmit"
          style="
            width:100%;
          "
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
    .forEach(
      button => {

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
              .forEach(
                item => {

                  item.classList.remove(
                    "selected"
                  );

                }
              );

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

      }
    );


  $("checkoutForm")
    ?.addEventListener(
      "submit",
      async event => {

        event        event.preventDefault();

        const firstName =
          $("checkoutFirstName")
            ?.value
            .trim() || "";

        const lastName =
          $("checkoutLastName")
            ?.value
            .trim() || "";

        const address =
          $("checkoutAddress")
            ?.value
            .trim() || "";

        const errorBox =
          $("checkoutError");


        function checkoutError(message){

          if(errorBox){

            errorBox.textContent =
              message;

            errorBox.style.display =
              "block";

          }

        }


        if(!firstName){

          checkoutError(
            "Indique ton prénom."
          );

          return;

        }


        if(!lastName){

          checkoutError(
            "Indique ton nom."
          );

          return;

        }


        if(!address){

          checkoutError(
            "Indique ton adresse de livraison."
          );

          return;

        }


        if(!paymentMethod){

          checkoutError(
            "Choisis un moyen de paiement."
          );

          return;

        }


        const submit =
          $("checkoutSubmit");


        if(submit){

          submit.disabled =
            true;

          submit.textContent =
            "Création...";

        }


        try{

          const total =
            getCartSubtotal();


          if(!Number.isFinite(total)){

            throw new Error(
              "Le montant de la commande est invalide."
            );

          }


          let paymentStatus =
            "En attente";


          // ==================================================
          // PAIEMENT CARTE DE TEST
          // ==================================================

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
                .replace(
                  /\s+/g,
                  ""
                )
                .trim();


            const storedNumber =
              String(
                card.number || ""
              )
                .replace(
                  /\s+/g,
                  ""
                )
                .trim();


            const enteredHolder =
              (
                $("cardHolder")
                  ?.value || ""
              )
                .trim()
                .toLowerCase();


            const storedHolder =
              String(
                card.holder || ""
              )
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


            const storedExpiry =
              String(
                card.expiry || ""
              )
                .trim();


            const storedCvv =
              String(
                card.cvv || ""
              )
                .trim();


            if(
              enteredNumber !==
                storedNumber ||
              enteredHolder !==
                storedHolder ||
              enteredExpiry !==
                storedExpiry ||
              enteredCvv !==
                storedCvv
            ){

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
            cart.map(
              item => {

                const product =
                  getProduct(
                    item.id
                  );


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
                    item.option ||
                    "",

                  price:
                    Number(
                      product?.price ??
                      0
                    ),

                  quantity:
                    Number(
                      item.quantity ||
                      1
                    )

                };

              }
            );


          if(!orderItems.length){

            throw new Error(
              "Le panier est vide."
            );

          }


          // ==================================================
          // CRÉATION COMMANDE FIRESTORE
          // ==================================================

          const orderData = {

            userId:
              currentUser.uid,

            userEmail:
              currentUser.email ||
              "",

            firstName:
              firstName,

            lastName:
              lastName,

            items:
              orderItems,

            subtotal:
              total,

            total:
              total,

            address:
              address,

            city:
              "",

            status:
              "Enregistrée",

            paymentMethod:
              paymentMethod,

            paymentStatus:
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


          // ==================================================
          // VIDER LE PANIER
          // ==================================================

          cart = [];

          saveCart();

          renderCart();


          // ==================================================
          // FERMER CHECKOUT
          // ==================================================

          closeModal();


          toast(
            `Commande #${orderRef.id.slice(0,8)} créée 🎉`,
            "success"
          );


          // ==================================================
          // PAYPAL
          // ==================================================

          if(
            paymentMethod ===
              "paypal" &&
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

            submit.disabled =
              false;

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

function printInvoice(
  order
){

  const items =
    Array.isArray(
      order.items
    )
      ? order.items
      : [];


  const rows =
    items.map(
      item => {

        const product =
          getProduct(
            item.id
          );


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
            item.quantity ||
            1
          );


        return `

          <tr>

            <td>
              ${escapeHTML(
                name
              )}
            </td>

            <td>
              ${quantity}
            </td>

            <td>
              ${money(
                price
              )}
            </td>

            <td>
              ${money(
                price *
                quantity
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

        *{
          box-sizing:border-box;
        }

        body{
          font-family:Arial,sans-serif;
          padding:40px;
          color:#111827;
          background:#fff;
        }

        h1{
          margin:0 0 5px;
        }

        h3{
          margin-top:28px;
        }

        .top{
          display:flex;
          justify-content:space-between;
          gap:30px;
          margin-bottom:40px;
        }

        .brand{
          font-size:28px;
          font-weight:800;
        }

        table{
          width:100%;
          border-collapse:collapse;
          margin-top:20px;
        }

        th,
        td{
          border-bottom:1px solid #ddd;
          padding:12px;
          text-align:left;
        }

        th{
          background:#f5f5f5;
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

        .status{
          margin-top:20px;
          padding:12px;
          background:#f5f5f5;
          border-radius:8px;
        }

        @media print{

          body{
            padding:20px;
          }

        }

      </style>

    </head>


    <body>

      <div class="top">

        <div>

          <div class="brand">
            NovaShop
          </div>

          <p>
            Boutique gaming
          </p>

        </div>


        <div>

          <strong>
            FACTURE
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


      ${
        order.userEmail
          ? `
            <p>
              ${escapeHTML(
                order.userEmail
              )}
            </p>
          `
          : ""
      }


      ${
        order.address
          ? `
            <p>
              ${escapeHTML(
                order.address
              )}
            </p>
          `
          : ""
      }


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

            <th>
              Produit
            </th>

            <th>
              Qté
            </th>

            <th>
              Prix
            </th>

            <th>
              Total
            </th>

          </tr>

        </thead>


        <tbody>

          ${rows}

        </tbody>

      </table>


      <div class="total">

        Total :
        ${money(
          order.total ||
          0
        )}

      </div>


      <div class="status">

        Statut :
        <strong>
          ${escapeHTML(
            order.status ||
            "Enregistrée"
          )}
        </strong>

      </div>


      <p class="small">

        NovaShop
        •
        Boutique gaming

      </p>


      <script>

        window.onload =
          function(){

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
      currentUser.email ||
      ""
    )
      .toLowerCase() ===
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
    ) ===
    "true";


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

      <div
        id="adminContent"
      ></div>

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

          id:
            item.id,

          ...item.data()

        });

      }
    );


    orders.sort(
      (a,b) => {

        const aTime =
          a.createdAt?.seconds ||
          0;

        const bTime =
          b.createdAt?.seconds ||
          0;

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
            error.message ||
            ""
          )}

        </div>

      `;

    }

  }

}


function renderAdmin(
  orders
){

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

        commande${
          orders.length > 1
            ? "s"
            : ""
        }

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


                      return `
                        ${baseName}${
                          item.option
                            ? ` (${item.option})`
                            : ""
                        } ×${
                          item.quantity ||
                          1
                        }
                      `;

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
                          order.total ||
                          0
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

                      📧

                      ${escapeHTML(
                        order.userEmail ||
                        "Inconnu"
                      )}

                    </p>


                    <p style="
                      margin:8px 0;
                    ">

                      💳

                      ${escapeHTML(
                        order.paymentMethod ||
                        "N/A"
                      )}

                      |

                      ${escapeHTML(
                        order.paymentStatus ||
                        "En attente"
                      )}

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
                        order.city ||
                        ""
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
                        order.tracking ||
                        ""
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
                        order.estimatedDelivery ||
                        ""
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
    .forEach(
      button => {

        button.addEventListener(
          "click",
          async () => {

            await saveAdminOrder(
              button.dataset.id
            );

          }
        );

      }
    );


  document
    .querySelectorAll(
      ".admin-paid"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          async () => {

            await markOrderPaid(
              button.dataset.id
            );

          }
        );

      }
    );


  document
    .querySelectorAll(
      ".admin-invoice"
    )
    .forEach(
      button => {

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

      }
    );


  document
    .querySelectorAll(
      ".admin-delete"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          async () => {

            await deleteAdminOrder(
              button.dataset.id
            );

          }
        );

      }
    );

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


async function saveAdminOrder(
  id
){

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

    console.error(
      error
    );


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


async function markOrderPaid(
  id
){

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

    console.error(
      error
    );


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


async function deleteAdminOrder(
  id
){

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

    console.error(
      error
    );


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
// FIN PARTIE 2/3
// ============================================================// ============================================================
// NOVASHOP - APP.JS
// PARTIE 3/3
// Paramètres + boutons + sécurité + initialisation
// ============================================================


// ============================================================
// PARAMÈTRES
// ============================================================

settingsBtn?.addEventListener("click", openSettings);

function getTheme(){

  return localStorage.getItem("novaThemeChoice") || "dark";

}

function applyTheme(){

  const theme = getTheme();

  if(theme === "light"){

    document.documentElement.dataset.theme = "light";

  }else{

    document.documentElement.dataset.theme = "dark";

  }

}

function saveTheme(theme){

  localStorage.setItem("novaThemeChoice", theme);

  applyTheme();

}

function openSettings(){

  const currentTheme = getTheme();

  showModal(
    "⚙️ Paramètres",
    `
      <div style="
        display:flex;
        flex-direction:column;
        gap:18px;
      ">

        <div style="
          background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.08);
          border-radius:16px;
          padding:18px;
        ">

          <h3 style="margin-bottom:12px;">
            Apparence
          </h3>

          <div style="
            display:flex;
            gap:10px;
            flex-wrap:wrap;
          ">

            <button
              class="theme-choice"
              data-theme-choice="dark"
              style="
                padding:12px 16px;
                border-radius:10px;
                border:1px solid rgba(255,255,255,.12);
                background:#0b1424;
                color:white;
                cursor:pointer;
              "
            >
              🌙 Mode sombre
            </button>

            <button
              class="theme-choice"
              data-theme-choice="light"
              style="
                padding:12px 16px;
                border-radius:10px;
                border:1px solid rgba(255,255,255,.12);
                background:#f4f7fb;
                color:#111;
                cursor:pointer;
              "
            >
              ☀️ Mode clair
            </button>

          </div>

        </div>


        <div style="
          background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.08);
          border-radius:16px;
          padding:18px;
        ">

          <h3 style="margin-bottom:8px;">
            NovaShop
          </h3>

          <p style="
            opacity:.7;
            line-height:1.6;
          ">
            Version actuelle de NovaShop.
          </p>

        </div>

      </div>
    `
  );

  document
    .querySelectorAll(".theme-choice")
    .forEach(button => {

      const selected =
        button.dataset.themeChoice === currentTheme;

      if(selected){

        button.style.outline =
          "2px solid #2d8cff";

      }

      button.addEventListener("click", () => {

        saveTheme(
          button.dataset.themeChoice
        );

        openSettings();

        toast(
          button.dataset.themeChoice === "dark"
            ? "Mode sombre activé."
            : "Mode clair activé.",
          "success"
        );

      });

    });

}


// ============================================================
// BOUTONS DU HAUT
// ============================================================

accountBtn?.addEventListener(
  "click",
  openAccount
);

ordersBtn?.addEventListener(
  "click",
  openOrders
);

cartBtn?.addEventListener(
  "click",
  openCart
);

heroCartBtn?.addEventListener(
  "click",
  openCart
);

closeCart?.addEventListener(
  "click",
  closeCart
);

modalClose?.addEventListener(
  "click",
  closeModal
);


// ============================================================
// BOUTON VOIR MON PANIER
// ============================================================

if(heroCartBtn){

  heroCartBtn.textContent =
    "🛒 Voir mon panier";

}


// ============================================================
// ÉTAT FIREBASE / UTILISATEUR
// ============================================================

onAuthStateChanged(
  auth,
  user => {

    currentUser = user || null;

    if(accountBtn){

      if(user){

        accountBtn.textContent =
          "👤 Mon compte";

      }else{

        accountBtn.textContent =
          "👤 Connexion";

      }

    }

    if(adminBtn){

      adminBtn.style.display =
        isAdminUser()
          ? "inline-flex"
          : "none";

    }

  }
);


// ============================================================
// TOUCHE ESCAPE
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
// FERMETURE DU MODAL EN CLIQUANT À L'EXTÉRIEUR
// ============================================================

modal?.addEventListener(
  "click",
  event => {

    if(event.target === modal){

      closeModal();

    }

  }
);


// ============================================================
// FERMETURE DU PANIER EN CLIQUANT À L'EXTÉRIEUR
// ============================================================

cartDrawer?.addEventListener(
  "click",
  event => {

    if(event.target === cartDrawer){

      closeCart();

    }

  }
);


// ============================================================
// ERREURS JAVASCRIPT
// ============================================================

window.addEventListener(
  "error",
  event => {

    console.error(
      "NovaShop JS error :",
      event.error || event.message
    );

  }
);


// ============================================================
// ERREURS PROMESSES / FIREBASE
// ============================================================

window.addEventListener(
  "unhandledrejection",
  event => {

    console.error(
      "NovaShop Promise error :",
      event.reason
    );

  }
);


// ============================================================
// STYLE DES BOUTONS
// ============================================================

function injectNovaButtonStyles(){

  if(document.getElementById("novaButtonStyles")){
    return;
  }

  const style =
    document.createElement("style");

  style.id =
    "novaButtonStyles";

  style.textContent = `

    button{
      -webkit-tap-highlight-color:transparent;
    }

    #heroCartBtn,
    .view-btn,
    .add-btn{
      cursor:pointer;
      transition:
        transform .18s ease,
        filter .18s ease,
        opacity .18s ease;
    }

    #heroCartBtn:hover,
    .view-btn:hover,
    .add-btn:hover{
      transform:translateY(-1px);
      filter:brightness(1.08);
    }

    #heroCartBtn:active,
    .view-btn:active,
    .add-btn:active{
      transform:translateY(0);
    }

    button:disabled{
      cursor:not-allowed !important;
      opacity:.55 !important;
      transform:none !important;
    }

    .payment-choice.selected{
      border-color:#2d8cff !important;
      background:rgba(45,140,255,.12) !important;
      box-shadow:
        0 0 0 2px rgba(45,140,255,.12);
    }

    .theme-choice{
      transition:
        transform .15s ease,
        border-color .15s ease;
    }

    .theme-choice:hover{
      transform:translateY(-1px);
    }

  `;

  document.head.appendChild(style);

}


// ============================================================
// MISE À JOUR DES BOUTONS DU HEADER
// ============================================================

function updateHeaderButtons(){

  if(!cartBadge){
    return;
  }

  const count =
    getCartCount();

  cartBadge.textContent =
    String(count);

  if(count > 0){

    cartBadge.style.display =
      "inline-flex";

  }else{

    cartBadge.style.display =
      "none";

  }

}


// ============================================================
// INITIALISATION NOVASHOP
// ============================================================

function initNovaShop(){

  try{

    injectNovaButtonStyles();

    applyTheme();

    renderCategories();

    renderProducts();

    renderCart();

    updateHeaderButtons();

    if(heroCartBtn){

      heroCartBtn.textContent =
        "🛒 Voir mon panier";

    }

    console.log(
      `NovaShop chargé avec succès 🚀 | ${products.length} produits`
    );

  }catch(error){

    console.error(
      "Erreur initialisation NovaShop :",
      error
    );

    if(productGrid){

      productGrid.innerHTML = `

        <div style="
          grid-column:1/-1;
          padding:40px 20px;
          text-align:center;
          border-radius:18px;
          background:rgba(255,70,70,.08);
          border:1px solid rgba(255,70,70,.2);
          color:#ff7777;
        ">

          <h2 style="
            margin-bottom:10px;
          ">
            ❌ Erreur de chargement
          </h2>

          <p style="
            opacity:.8;
            line-height:1.6;
          ">
            Les produits n'ont pas pu être chargés.
          </p>

          <small style="
            display:block;
            margin-top:10px;
            opacity:.55;
            word-break:break-word;
          ">
            ${escapeHTML(
              error?.message ||
              "Erreur inconnue"
            )}
          </small>

        </div>

      `;

    }

    if(productCount){

      productCount.textContent =
        "Erreur";

    }

  }

}


// ============================================================
// LANCEMENT
// ============================================================

initNovaShop();


// ============================================================
// API PUBLIQUE NOVASHOP
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

  openCheckout,

  openAdmin,

  renderProducts,

  renderCart,

  getCartCount,

  getCartSubtotal,

  money

};


// ============================================================
// FIN PARTIE 3/3
// ============================================================
