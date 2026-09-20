import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
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
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSy5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
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

/* =========================================================
   CONFIG
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";

const PAYPAL_BASE = "https://paypal.me/SH0PNOVA";

const DEMO_CARD = {
  number: "3254 3765 2821 1834",
  expiry: "02/14",
  cvv: "534"
};

const ORDER_STATUSES = [
  "En cours de préparation",
  "Acceptée",
  "Annulée",
  "En transit",
  "Proche de la livraison",
  "Livrée",
  "En cours de remboursement",
  "Remboursée"
];

const PAYMENT_STATUSES = [
  "En attente",
  "Payée",
  "Remboursée"
];

/* =========================================================
   PRODUITS
========================================================= */

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
    name:"Sony DualSense Cosmic Red PS5/PC",
    category:"Manettes",
    price:74.90,
    image:"https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg"
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
    image:"https://thumb.pccomponentes.com/w-530-530/articles/1118/11186247/167-silla-gaming-gtplayer-ergonomica-con-reposapies-y-supporte-lumbar-4d.jpg"
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
  }
];

/* =========================================================
   500 PRÉNOMS UNIQUES
   FILLE + GARÇON
========================================================= */

const reviewNames = [
"Lucas","Emma","Hugo","Chloé","Nathan","Léa","Tom","Manon","Mathis","Camille",
"Enzo","Clara","Louis","Jade","Gabriel","Inès","Arthur","Zoé","Raphaël","Louise",
"Ethan","Alice","Noah","Lina","Jules","Sarah","Théo","Eva","Léo","Juliette",
"Maxime","Mia","Paul","Elena","Alexis","Nina","Sacha","Ambre","Antoine","Romane",
"Valentin","Lola","Gabin","Maëlle","Benjamin","Agathe","Martin","Anaïs","Oscar","Margot",
"Axel","Charlotte","Simon","Élise","Romain","Océane","Clément","Mélanie","Baptiste","Amandine",
"Thomas","Laura","Sofia","Victor","Noémie","Quentin","Émilie","Adrien","Lucie","Samuel",
"Lisa","Kylian","Marine","Yanis","Amélie","Corentin","Lou","Nolan","Jeanne","Malo",
"Iris","Matéo","Léna","Rose","Thibault","Clémence","Florian","Éloïse","Damien","Mathilde",
"Côme","Victoire","Bastien","Anaëlle","Dorian","Salomé","Rayan","Margaux","Robin","Naïa",

"Adam","Lénaïg","Liam","Yasmine","Milan","Alicia","Nino","Morgane","Eliott","Louna",
"Marceau","Apolline","Aaron","Maya","Evan","Évaëlle","Ilyan","Léonie","Maël","Capucine",
"Esteban","Célia","Eden","Mélissa","Lenny","Yuna","Noham","Énora","Noé","Lison",
"Matteo","Nour","Ilan","Lya","Loan","Mila","Rafael","Ava","Tiago","Lénaëlle",
"Diego","Alix","Pablo","Maëlys","Kais","Mélina","Ismaël","Soline","Amine","Léana",
"Youssef","Dounia","Ibrahim","Imane","Khalil","Nawel","Samy","Hana","Mehdi","Aya",
"Yanis","Lara","Rayan","Meryem","Owen","Lola","Gauthier","Lénaïse","Gaspard","Louisa",
"Félix","Éléonore","Gustave","Margot","Léandre","Clara","Augustin","Agathe","Basile","Romane",
"Joseph","Pauline","César","Valentine","Oscar","Éva","Marius","Louane","Hector","Léaëlle",
"Timéo","Maëva","Matis","Élodie","Ruben","Céleste","Niels","Mélodie","Soren","Aurore",

"Johan","Ysé","Kévin","Lénaïc","Jonathan","Morgane","Dylan","Sabrina","Bryan","Jennifer",
"Killian","Kelly","Jordan","Océane","Steven","Mélanie","Anthony","Aurélie","Kevin","Laura",
"Christopher","Cassandra","Thomas","Justine","Alexandre","Anaïs","Benjamin","Marine","Nathan","Émilie",
"Valentin","Coralie","Florian","Élodie","Maxence","Pauline","Romain","Sophie","Benoît","Cécile",
"Rémi","Caroline","Loïc","Charlotte","Gaëtan","Mathilde","Fabien","Élodie","Damien","Fanny",
"Julien","Hélène","Nicolas","Marion","François","Claire","Pierre","Élodie","Guillaume","Amélie",
"Vincent","Céline","Jérémy","Mélissa","Jonathan","Émilie","Sébastien","Vanessa","Alexis","Nathalie",
"Christophe","Stéphanie","Mickaël","Jennifer","Maxime","Jessica","Laurent","Aurélie","Grégory","Sandrine",
"Patrice","Virginie","Cédric","Delphine","Arnaud","Valérie","Olivier","Isabelle","Damien","Catherine",
"Xavier","Bérénice","Éric","Claudia","Hervé","Élodie","Yohan","Ludivine","Mickaël","Célia",

"Alban","Adèle","Amaury","Agathe","Anatole","Albane","Armand","Alma","Arthur","Ariane",
"Augustin","Astrid","Aurélien","Aurore","Aymeric","Blandine","Benoît","Brune","Boris","Bianca",
"Bruno","Béatrice","Charles","Cassandre","Charlie","Célestine","Clément","Constance","Constantin","Diane",
"Damien","Daphné","Édouard","Élina","Émile","Émilie","Ferdinand","Flavie","Gaspard","Garance",
"Georges","Gaëlle","Gérald","Gisèle","Grégoire","Héloïse","Henri","Honorine","Jérôme","Joséphine",
"Jérémie","Justine","Léon","Léna","Léonard","Livia","Luc","Louna","Marin","Mélina",
"Martin","Mélusine","Mathieu","Maëline","Morgan","Morgane","Nathanaël","Nélia","Nicolas","Nora",
"Octave","Ophélie","Philippe","Prune","Régis","Roxane","Renaud","Romane","Sylvain","Suzanne",
"Tristan","Thaïs","Ulysse","Ursula","Valentin","Victoire","William","Wendy","Xavier","Yvette",
"Yann","Yseult","Zacharie","Zélie","Zéphyr","Zora","Alessio","Amaya","Briac","Candice",

"Évan","Éléa","Félix","Fleur","Hadrien","Héloïse","Isaac","Iris","Jonas","Julia",
"Joris","Kiara","Lilian","Lina","Malo","Mélissa","Nolan","Naëlle","Orion","Paloma",
"Robin","Romy","Sami","Sana","Thibault","Tess","Valentin","Violette","Wassim","Yara",
"Younès","Zahra","Achille","Alicia","Baptiste","Béryl","Célian","Dana","Eliott","Élisa",
"Fabien","Fiona","Gabin","Giulia","Hugo","Hana","Ilan","Iseult","Johan","Jade",
"Kylian","Kenza","Lenny","Léna","Maël","Maya","Naim","Nour","Owen","Olivia",
"Paco","Paola","Rayan","Rania","Sohan","Sofia","Tao","Tania","Ugo","Uma",
"Yacine","Yasmine","Zayn","Zoé","Aaron","Aïcha","Bilal","Dina","Ewen","Elsa",
"Farès","Fatou","Ilyes","Ilona","Kamil","Kenza","Loris","Léana","Matisse","Mina",
"Naël","Nina","Riyad","Rita","Sofiane","Sanaé","Tiago","Talia","Wassim","Wendy"
];

/*
  Nettoyage automatique :
  si un prénom apparaît deux fois accidentellement,
  on garde une seule occurrence.
*/
const uniqueReviewNames = [...new Set(reviewNames)];

let shuffledReviewNames = [];
let reviewNameIndex = 0;

function shuffle(array){
  const copy = [...array];

  for(let i = copy.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function resetReviewNames(){
  shuffledReviewNames = shuffle(uniqueReviewNames);
  reviewNameIndex = 0;
}

function getUniqueReviewName(){
  if(reviewNameIndex >= shuffledReviewNames.length){
    resetReviewNames();
  }

  return shuffledReviewNames[reviewNameIndex++];
}

resetReviewNames();

/* =========================================================
   AVIS PAR PRODUIT
========================================================= */

const reviewTexts = [
  "Très bon produit, conforme à la description.",
  "Livraison rapide et produit bien emballé.",
  "Très satisfait de mon achat.",
  "Le produit fonctionne parfaitement.",
  "Bonne qualité pour le prix.",
  "Je recommande, rien à signaler.",
  "Produit reçu rapidement.",
  "Très bonne expérience sur NovaShop.",
  "La qualité est vraiment correcte.",
  "Tout fonctionne comme prévu.",
  "Emballage propre et livraison rapide.",
  "Produit conforme à mes attentes.",
  "Très pratique pour mon setup.",
  "Aucun problème après plusieurs utilisations.",
  "Je suis satisfait de mon achat.",
  "Bonne surprise, produit de qualité.",
  "Commande reçue sans problème.",
  "Excellent produit pour mon utilisation.",
  "Rapport qualité-prix intéressant.",
  "Je recommande ce produit."
];

const productReviewData = {};

products.forEach((product,index) => {

  /*
    Chaque produit possède :
    - une note
    - un nombre d'avis
    - plusieurs avis
  */

  const ratings = [
    4.1,4.2,4.3,4.4,4.5,4.6,4.7,4.8,4.9,5
  ];

  const rating = ratings[index % ratings.length];

  const reviewCount =
    321 +
    ((index * 733) % 9462);

  const reviews = [];

  for(let i = 0; i < 8; i++){

    reviews.push({
      name:getUniqueReviewName(),
      rating:Math.min(5, Math.max(3, Math.round(
        rating - 0.3 + Math.random() * 0.6
      ))),
      text:reviewTexts[
        (index + i * 3) % reviewTexts.length
      ]
    });

  }

  productReviewData[product.id] = {
    rating,
    reviewCount,
    reviews
  };
});

/* =========================================================
   ÉTAT
========================================================= */

let cart = [];
let favorites = [];
let currentUser = null;
let currentProduct = null;
let currentCategory = "Tous";
let currentSort = "default";

/* =========================================================
   LOCAL STORAGE
========================================================= */

function loadLocalData(){

  try{
    const savedCart = JSON.parse(
      localStorage.getItem("novaCart") || "[]"
    );

    if(Array.isArray(savedCart)){
      cart = savedCart
        .map(item => {

          const product = products.find(
            p => p.id === item.id
          );

          if(!product) return null;

          return {
            id:product.id,
            quantity:Math.max(
              1,
              Number(item.quantity) || 1
            )
          };

        })
        .filter(Boolean);
    }

  }catch{
    cart = [];
  }

  try{
    const savedFavorites = JSON.parse(
      localStorage.getItem("novaFavorites") || "[]"
    );

    if(Array.isArray(savedFavorites)){
      favorites = savedFavorites.filter(
        id => products.some(p => p.id === id)
      );
    }

  }catch{
    favorites = [];
  }

  saveLocalData();
}

function saveLocalData(){

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );

  localStorage.setItem(
    "novaFavorites",
    JSON.stringify(favorites)
  );
}

loadLocalData();

/* =========================================================
   HELPERS DOM
========================================================= */

function $(selector){
  return document.querySelector(selector);
}

function $$(selector){
  return [...document.querySelectorAll(selector)];
}

function money(value){
  return Number(value || 0)
    .toFixed(2)
    .replace(".",",") + " €";
}

function escapeHTML(value){
  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function getProduct(id){
  return products.find(p => p.id === id);
}

/* =========================================================
   TOAST
========================================================= */

function toast(message){

  let box = $("#toast");

  if(!box){
    box = document.createElement("div");
    box.id = "toast";

    Object.assign(box.style,{
      position:"fixed",
      right:"20px",
      bottom:"20px",
      zIndex:"99999",
      background:"#101a2d",
      color:"#fff",
      padding:"14px 18px",
      borderRadius:"12px",
      border:"1px solid rgba(255,255,255,.12)",
      boxShadow:"0 15px 50px rgba(0,0,0,.35)",
      maxWidth:"360px",
      transition:"opacity .2s"
    });

    document.body.appendChild(box);
  }

  box.textContent = message;
  box.style.opacity = "1";

  clearTimeout(box._timer);

  box._timer = setTimeout(() => {
    box.style.opacity = "0";
  },2800);
}

/* =========================================================
   PANIER
========================================================= */

function getCartItems(){

  return cart
    .map(item => {

      const product = getProduct(item.id);

      if(!product) return null;

      return {
        ...product,
        quantity:Math.max(
          1,
          Number(item.quantity) || 1
        )
      };

    })
    .filter(Boolean);
}

function getCartTotal(){

  return getCartItems().reduce(
    (total,item) =>
      total +
      Number(item.price || 0) *
      Number(item.quantity || 1),
    0
  );
}

function getCartCount(){

  return getCartItems().reduce(
    (total,item) =>
      total + Number(item.quantity || 1),
    0
  );
}

function addToCart(id){

  const product = getProduct(id);

  if(!product) return;

  const existing = cart.find(
    item => item.id === id
  );

  if(existing){
    existing.quantity =
      Number(existing.quantity || 0) + 1;
  }else{
    cart.push({
      id,
      quantity:1
    });
  }

  saveLocalData();
  renderCart();

  toast(`🛒 ${product.name} ajouté au panier`);
}

function removeFromCart(id){

  cart = cart.filter(
    item => item.id !== id
  );

  saveLocalData();
  renderCart();
}

function changeQuantity(id,delta){

  const item = cart.find(
    x => x.id === id
  );

  if(!item) return;

  item.quantity =
    Math.max(
      1,
      Number(item.quantity || 1) + delta
    );

  saveLocalData();
  renderCart();
}

function clearCart(){

  cart = [];

  saveLocalData();
  renderCart();
}

/* =========================================================
   FAVORIS
========================================================= */

function toggleFavorite(id){

  const product = getProduct(id);

  if(!product) return;

  if(favorites.includes(id)){

    favorites = favorites.filter(
      x => x !== id
    );

    toast("💙 Retiré des favoris");

  }else{

    favorites.push(id);

    toast("⭐ Ajouté aux favoris");
  }

  saveLocalData();

  renderProducts();
  updateCounters();
}

/* =========================================================
   COMPTEURS
========================================================= */

function updateCounters(){

  const cartCount = getCartCount();

  $$("#cartCount").forEach(el => {
    el.textContent = cartCount;
  });

  $$("#cartBadge").forEach(el => {
    el.textContent = cartCount;
  });

  $$("#favoriteCount").forEach(el => {
    el.textContent = favorites.length;
  });
}

/* =========================================================
   ÉTOILES
========================================================= */

function starsHTML(rating){

  const rounded = Math.round(
    Number(rating || 0)
  );

  let html = "";

  for(let i = 1; i <= 5; i++){

    html +=
      i <= rounded
      ? "★"
      : "☆";
  }

  return html;
}

/* =========================================================
   CATÉGORIES
========================================================= */

function getCategories(){

  return [
    "Tous",
    ...new Set(
      products.map(p => p.category)
    )
  ];
}

/* =========================================================
   RENDU PRODUITS
========================================================= */

function renderCategories(){

  const container =
    $("#categories") ||
    $("#categoryFilters") ||
    $(".categories");

  if(!container) return;

  container.innerHTML = "";

  getCategories().forEach(category => {

    const button =
      document.createElement("button");

    button.className =
      "category-btn" +
      (category === currentCategory
        ? " active"
        : "");

    button.textContent = category;

    button.addEventListener(
      "click",
      () => {

        currentCategory = category;

        renderCategories();
        renderProducts();

      }
    );

    container.appendChild(button);
  });
}

function getVisibleProducts(){

  let result = [...products];

  if(currentCategory !== "Tous"){
    result = result.filter(
      p => p.category === currentCategory
    );
  }

  const searchInput =
    $("#searchInput") ||
    $("#search");

  const search = (
    searchInput?.value || ""
  ).trim().toLowerCase();

  if(search){

    result = result.filter(product =>
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  }

  /*
    IMPORTANT :
    Aucun tri par :
    - note
    - nombre d'avis
  */

  if(currentSort === "price-low"){
    result.sort(
      (a,b) => a.price - b.price
    );
  }

  if(currentSort === "price-high"){
    result.sort(
      (a,b) => b.price - a.price
    );
  }

  if(currentSort === "name"){
    result.sort(
      (a,b) =>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );
  }

  return result;
}

function renderProducts(){

  const container =
    $("#productsGrid") ||
    $("#productGrid") ||
    $("#products");

  if(!container) return;

  const visible =
    getVisibleProducts();

  container.innerHTML = "";

  visible.forEach(product => {

    const info =
      productReviewData[product.id];

    const card =
      document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `

      <div class="product-image-wrap">

        ${
          product.new
            ? `<span class="product-new">NOUVEAU</span>`
            : ""
        }

        <button
          class="favorite-btn"
          data-favorite="${escapeHTML(product.id)}"
          aria-label="Favori"
        >
          ${
            favorites.includes(product.id)
              ? "♥"
              : "♡"
          }
        </button>

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          onerror="this.style.display='none'"
        >

      </div>

      <div class="product-info">

        <div class="product-category">
          ${escapeHTML(product.category)}
        </div>

        <h3>
          ${escapeHTML(product.name)}
        </h3>

        <div class="product-rating">

          <span class="stars">
            ${starsHTML(info.rating)}
          </span>

          <span>
            ${info.rating.toFixed(1)}/5
          </span>

          <span class="review-count">
            (${info.reviewCount.toLocaleString("fr-FR")} avis)
          </span>

        </div>

        <div class="product-price">
          ${money(product.price)}
        </div>

        <div class="product-actions">

          <button
            class="view-product"
            data-view="${escapeHTML(product.id)}"
          >
            Voir
          </button>

          <button
            class="add-cart"
            data-add="${escapeHTML(product.id)}"
          >
            Ajouter
          </button>

        </div>

        <button
          class="reviews-btn"
          data-reviews="${escapeHTML(product.id)}"
        >
          ★ Voir les 3 avis
        </button>

      </div>
    `;

    container.appendChild(card);
  });

  bindProductButtons();
  updateCounters();
}

/* =========================================================
   BOUTONS PRODUITS
========================================================= */

function bindProductButtons(){

  $$("[data-add]").forEach(button => {

    button.onclick = () => {
      addToCart(button.dataset.add);
    };

  });

  $$("[data-favorite]").forEach(button => {

    button.onclick = () => {
      toggleFavorite(button.dataset.favorite);
    };

  });

  $$("[data-view]").forEach(button => {

    button.onclick = () => {
      openProduct(button.dataset.view);
    };

  });

  $$("[data-reviews]").forEach(button => {

    button.onclick = () => {
      openProductReviews(
        button.dataset.reviews
      );
    };

  });
}

/* =========================================================
   AVIS
========================================================= */

function reviewCardHTML(review){

  return `
    <div class="review-card">

      <div class="review-top">

        <strong>
          ${escapeHTML(review.name)}
        </strong>

        <span class="stars">
          ${starsHTML(review.rating)}
        </span>

      </div>

      <p>
        ${escapeHTML(review.text)}
      </p>

    </div>
  `;
}

function openProductReviews(id){

  const product = getProduct(id);

  if(!product) return;

  const info =
    productReviewData[id];

  const reviews =
    info.reviews.slice(0,3);

  showModal(`
    <div class="modal-product">

      <button
        class="modal-close"
        data-close-modal
      >
        ×
      </button>

      <h2>
        Avis sur ${escapeHTML(product.name)}
      </h2>

      <div class="modal-rating">

        <span class="stars">
          ${starsHTML(info.rating)}
        </span>

        <strong>
          ${info.rating.toFixed(1)}/5
        </strong>

        <span>
          ${info.reviewCount.toLocaleString("fr-FR")} avis
        </span>

      </div>

      <div class="reviews-list">
        ${reviews.map(reviewCardHTML).join("")}
      </div>

      <p class="demo-review-note">
        Avis de démonstration du site.
      </p>

    </div>
  `);
}

/* =========================================================
   PRODUIT
========================================================= */

function openProduct(id){

  const product = getProduct(id);

  if(!product) return;

  currentProduct = product;

  const info =
    productReviewData[id];

  showModal(`
    <div class="modal-product">

      <button
        class="modal-close"
        data-close-modal
      >
        ×
      </button>

      <div class="product-detail">

        <div class="product-detail-image">
          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
          >
        </div>

        <div class="product-detail-content">

          <div class="product-category">
            ${escapeHTML(product.category)}
          </div>

          <h2>
            ${escapeHTML(product.name)}
          </h2>

          <div class="product-rating">

            <span class="stars">
              ${starsHTML(info.rating)}
            </span>

            <strong>
              ${info.rating.toFixed(1)}/5
            </strong>

            <span>
              ${info.reviewCount.toLocaleString("fr-FR")} avis
            </span>

          </div>

          <div class="product-price">
            ${money(product.price)}
          </div>

          <button
            class="primary-btn"
            id="detailAddCart"
          >
            🛒 Ajouter au panier
          </button>

          <button
            class="secondary-btn"
            id="detailReviews"
          >
            ★ Voir les 3 avis
          </button>

        </div>

      </div>

    </div>
  `);

  $("#detailAddCart")?.addEventListener(
    "click",
    () => addToCart(product.id)
  );

  $("#detailReviews")?.addEventListener(
    "click",
    () => openProductReviews(product.id)
  );
}

/* =========================================================
   MODAL
========================================================= */

function getModal(){

  let modal = $("#modal");

  if(!modal){

    modal = document.createElement("div");

    modal.id = "modal";

    Object.assign(modal.style,{
      position:"fixed",
      inset:"0",
      background:"rgba(0,0,0,.72)",
      zIndex:"99990",
      display:"none",
      alignItems:"center",
      justifyContent:"center",
      padding:"20px"
    });

    document.body.appendChild(modal);

  }

  return modal;
}

function showModal(html){

  const modal = getModal();

  modal.innerHTML = `
    <div
      class="modal-inner"
      style="
        width:min(100%,900px);
        max-height:90vh;
        overflow:auto;
      "
    >
      ${html}
    </div>
  `;

  modal.style.display = "flex";

  $$("[data-close-modal]").forEach(
    button => {
      button.onclick = closeModal;
    }
  );
}

function closeModal(){

  const modal = getModal();

  modal.style.display = "none";
  modal.innerHTML = "";
}

document.addEventListener(
  "keydown",
  event => {

    if(event.key === "Escape"){
      closeModal();
    }

  }
);

/* =========================================================
   PANIER MODAL
========================================================= */

function openCart(){

  const items =
    getCartItems();

  if(!items.length){

    showModal(`
      <div class="modal-product">

        <button
          class="modal-close"
          data-close-modal
        >
          ×
        </button>

        <h2>🛒 Ton panier</h2>

        <p>
          Ton panier est vide.
        </p>

      </div>
    `);

    return;
  }

  showModal(`
    <div class="modal-product">

      <button
        class="modal-close"
        data-close-modal
      >
        ×
      </button>

      <h2>🛒 Ton panier</h2>

      <div class="cart-list">

        ${items.map(item => `

          <div class="cart-row">

            <img
              src="${escapeHTML(item.image)}"
              alt=""
            >

            <div class="cart-row-info">

              <strong>
                ${escapeHTML(item.name)}
              </strong>

              <span>
                ${money(item.price)}
              </span>

            </div>

            <div class="quantity-controls">

              <button
                data-cart-minus="${item.id}"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                data-cart-plus="${item.id}"
              >
                +
              </button>

            </div>

            <button
              class="remove-cart"
              data-cart-remove="${item.id}"
            >
              🗑️
            </button>

          </div>

        `).join("")}

      </div>

      <div class="cart-total">
        Total : <strong>${money(getCartTotal())}</strong>
      </div>

      <div class="cart-actions">

        <button
          class="secondary-btn"
          id="clearCartBtn"
        >
          Vider
        </button>

        <button
          class="primary-btn"
          id="checkoutBtn"
        >
          Commander
        </button>

      </div>

    </div>
  `);

  $$("[data-cart-minus]").forEach(
    btn => btn.onclick = () =>
      changeQuantity(
        btn.dataset.cartMinus,
        -1
      )
  );

  $$("[data-cart-plus]").forEach(
    btn => btn.onclick = () =>
      changeQuantity(
        btn.dataset.cartPlus,
        1
      )
  );

  $$("[data-cart-remove]").forEach(
    btn => btn.onclick = () =>
      removeFromCart(
        btn.dataset.cartRemove
      )
  );

  $("#clearCartBtn")?.addEventListener(
    "click",
    clearCart
  );

  $("#checkoutBtn")?.addEventListener(
    "click",
    openCheckout
  );
}

/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout(){

  if(!getCartItems().length){

    toast("🛒 Ton panier est vide.");
    return;
  }

  showModal(`
    <div class="modal-product">

      <button
        class="modal-close"
        data-close-modal
      >
        ×
      </button>

      <h2>
        📦 Livraison et paiement
      </h2>

      <form id="checkoutForm">

        <h3>Adresse de livraison</h3>

        <div class="form-grid">

          <label>
            Nom complet
            <input
              id="shippingName"
              required
            >
          </label>

          <label>
            Adresse / numéro + rue
            <input
              id="shippingAddress"
              required
            >
          </label>

          <label>
            Complément d’adresse
            <input
              id="shippingComplement"
            >
          </label>

          <label>
            Code postal
            <input
              id="shippingPostcode"
              required
            >
          </label>

          <label>
            Ville
            <input
              id="shippingCity"
              required
            >
          </label>

          <label>
            Pays
            <input
              id="shippingCountry"
              value="France"
              required
            >
          </label>

        </div>

        <h3>Paiement</h3>

        <div class="payment-choice">

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Carte"
              checked
            >
            💳 Carte
          </label>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="PayPal"
            >
            🅿️ PayPal
          </label>

        </div>

        <div id="cardPaymentBox">

          <div class="demo-card">

            <div class="demo-card-number">
              •••• •••• •••• ••••
            </div>

            <div class="demo-card-bottom">
              <span>••/••</span>
              <span>•••</span>
            </div>

          </div>

          <label>
            Numéro de carte
            <input
              id="cardNumber"
              inputmode="numeric"
              maxlength="19"
              placeholder="•••• •••• •••• ••••"
              autocomplete="off"
              required
            >
          </label>

          <div class="form-grid">

            <label>
              Expiration
              <input
                id="cardExpiry"
                placeholder="••/••"
                maxlength="5"
                required
              >
            </label>

            <label>
              CVV
              <input
                id="cardCVV"
                placeholder="•••"
                maxlength="3"
                type="password"
                required
              >
            </label>

          </div>

          <p>
            Paiement de démonstration local.
          </p>

        </div>

        <div
          id="paypalPaymentBox"
          style="display:none"
        >

          <p>
            Tu seras redirigé vers PayPal pour le paiement.
          </p>

        </div>

        <div class="checkout-total">
          Total :
          <strong>
            ${money(getCartTotal())}
          </strong>
        </div>

        <button
          type="submit"
          class="primary-btn"
        >
          Payer ${money(getCartTotal())}
        </button>

      </form>

    </div>
  `);

  $$('input[name="paymentMethod"]').forEach(
    radio => {

      radio.addEventListener(
        "change",
        updatePaymentBox
      );

    }
  );

  $("#checkoutForm")?.addEventListener(
    "submit",
    processCheckout
  );
}

function updatePaymentBox(){

  const method =
    document.querySelector(
      'input[name="paymentMethod"]:checked'
    )?.value;

  const cardBox =
    $("#cardPaymentBox");

  const paypalBox =
    $("#paypalPaymentBox");

  if(!cardBox || !paypalBox) return;

  if(method === "PayPal"){

    cardBox.style.display = "none";
    paypalBox.style.display = "block";

    $("#cardNumber")?.removeAttribute("required");
    $("#cardExpiry")?.removeAttribute("required");
    $("#cardCVV")?.removeAttribute("required");

  }else{

    cardBox.style.display = "block";
    paypalBox.style.display = "none";

    $("#cardNumber")?.setAttribute(
      "required",
      ""
    );

    $("#cardExpiry")?.setAttribute(
      "required",
      ""
    );

    $("#cardCVV")?.setAttribute(
      "required",
      ""
    );
  }
}

/* =========================================================
   COMMANDE
========================================================= */

async function processCheckout(event){

  event.preventDefault();

  if(!currentUser){

    toast("🔐 Connecte-toi avant de commander.");
    openLogin();
    return;
  }

  const items =
    getCartItems();

  if(!items.length){

    toast("🛒 Panier vide.");
    return;
  }

  const shippingAddress = {

    name:$("#shippingName")?.value.trim() || "",

    address:
      $("#shippingAddress")?.value.trim() || "",

    addressComplement:
      $("#shippingComplement")?.value.trim() || "",

    postcode:
      $("#shippingPostcode")?.value.trim() || "",

    city:
      $("#shippingCity")?.value.trim() || "",

    country:
      $("#shippingCountry")?.value.trim() || "France"
  };

  if(
    !shippingAddress.name ||
    !shippingAddress.address ||
    !shippingAddress.postcode ||
    !shippingAddress.city ||
    !shippingAddress.country
  ){

    toast("⚠️ Remplis toute l'adresse.");
    return;
  }

  const method =
    document.querySelector(
      'input[name="paymentMethod"]:checked'
    )?.value;

  if(method === "Carte"){

    const number =
      ($("#cardNumber")?.value || "")
        .replace(/\s/g,"");

    const expiry =
      ($("#cardExpiry")?.value || "")
        .trim();

    const cvv =
      ($("#cardCVV")?.value || "")
        .trim();

    if(
      number !==
      DEMO_CARD.number.replace(/\s/g,"") ||
      expiry !== DEMO_CARD.expiry ||
      cvv !== DEMO_CARD.cvv
    ){

      toast("❌ Carte incorrecte.");
      return;
    }

    try{

      await createOrder({
        paymentMethod:"Carte",
        paymentStatus:"Payée",
        shippingAddress
      });

      toast("✅ Commande payée.");

      clearCart();
      closeModal();

    }catch(error){

      console.error(error);

      toast(
        "❌ Impossible de créer la commande."
      );
    }

    return;
  }

  /*
    PayPal :
    ouverture DIRECTE avant tout await pour éviter
    le blocage des popups sur iPhone.
  */

  const paypalUrl =
    `${PAYPAL_BASE}/${getCartTotal().toFixed(2)}`;

  window.open(
    paypalUrl,
    "_blank"
  );

  try{

    await createOrder({
      paymentMethod:"PayPal",
      paymentStatus:"En attente",
      shippingAddress
    });

    toast(
      "🅿️ Commande créée. Paiement PayPal en attente."
    );

    clearCart();
    closeModal();

  }catch(error){

    console.error(error);

    toast(
      "❌ Erreur lors de la création de la commande."
    );
  }
}

async function createOrder({
  paymentMethod,
  paymentStatus,
  shippingAddress
}){

  const items =
    getCartItems().map(item => ({
      id:item.id,
      name:item.name,
      price:Number(item.price),
      quantity:Number(item.quantity),
      image:item.image
    }));

  const total =
    items.reduce(
      (sum,item) =>
        sum +
        item.price *
        item.quantity,
      0
    );

  await addDoc(
    collection(db,"orders"),
    {
      userId:currentUser.uid,

      email:
        currentUser.email || "",

      items,

      total,

      paymentMethod,

      paymentStatus,

      status:
        "En cours de préparation",

      trackingLocation:
        "Entrepôt NovaShop",

      durationSeconds:
        3600,

      durationUpdatedAt:
        Timestamp.now(),

      shippingAddress,

      createdAt:
        serverTimestamp()
    }
  );
}

/* =========================================================
   AUTH
========================================================= */

function friendlyAuthError(error){

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
      "Utilisateur introuvable.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/operation-not-allowed":
      "La connexion Email/Mot de passe n'est pas activée dans Firebase.",

    "auth/unauthorized-domain":
      "Le domaine du site n'est pas autorisé dans Firebase."
  };

  return messages[code] ||
    "Une erreur Firebase est survenue.";
}

function openLogin(){

  showModal(`
    <div class="modal-product">

      <button
        class="modal-close"
        data-close-modal
      >
        ×
      </button>

      <h2>🔐 Connexion</h2>

      <form id="loginForm">

        <label>
          Email
          <input
            type="email"
            id="loginEmail"
            required
          >
        </label>

        <label>
          Mot de passe
          <input
            type="password"
            id="loginPassword"
            required
          >
        </label>

        <button
          type="submit"
          class="primary-btn"
        >
          Se connecter
        </button>

      </form>

      <button
        class="secondary-btn"
        id="openRegisterBtn"
      >
        Créer un compte
      </button>

    </div>
  `);

  $("#loginForm")?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      try{

        await signInWithEmailAndPassword(
          auth,
          $("#loginEmail").value.trim(),
          $("#loginPassword").value
        );

        toast("✅ Connexion réussie.");
        closeModal();

      }catch(error){

        toast(
          "❌ " +
          friendlyAuthError(error)
        );
      }

    }
  );

  $("#openRegisterBtn")?.addEventListener(
    "click",
    openRegister
  );
}

function openRegister(){

  showModal(`
    <div class="modal-product">

      <button
        class="modal-close"
        data-close-modal
      >
        ×
      </button>

      <h2>👤 Créer un compte</h2>

      <form id="registerForm">

        <label>
          Email
          <input
            type="email"
            id="registerEmail"
            required
          >
        </label>

        <label>
          Mot de passe
          <input
            type="password"
            id="registerPassword"
            minlength="6"
            required
          >
        </label>

        <button
          type="submit"
          class="primary-btn"
        >
          Créer mon compte
        </button>

      </form>

      <button
        class="secondary-btn"
        id="backLoginBtn"
      >
        Retour à la connexion
      </button>

    </div>
  `);

  $("#registerForm")?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      try{

        await createUserWithEmailAndPassword(
          auth,
          $("#registerEmail").value.trim(),
          $("#registerPassword").value
        );

        toast("✅ Compte créé.");
        closeModal();

      }catch(error){

        toast(
          "❌ " +
          friendlyAuthError(error)
        );
      }

    }
  );

  $("#backLoginBtn")?.addEventListener(
    "click",
    openLogin
  );
}

/* =========================================================
   COMPTE
========================================================= */

function openAccount(){

  if(!currentUser){

    openLogin();
    return;
  }

  showModal(`
    <div class="modal-product">

      <button
        class="modal-close"
        data-close-modal
      >
        ×
      </button>

      <h2>👤 Mon compte</h2>

      <p>
        ${escapeHTML(currentUser.email || "")}
      </p>

      <button
        class="primary-btn"
        id="myOrdersBtn"
      >
        📦 Mes commandes
      </button>

      <button
        class="secondary-btn"
        id="logoutBtn"
      >
        Se déconnecter
      </button>

    </div>
  `);

  $("#logoutBtn")?.addEventListener(
    "click",
    async () => {

      await signOut(auth);

      toast("👋 Déconnexion effectuée.");
      closeModal();

    }
  );

  $("#myOrdersBtn")?.addEventListener(
    "click",
    openMyOrders
  );
}

/* =========================================================
   COMMANDES UTILISATEUR
========================================================= */

function getTimestampMs(value){

  if(!value) return null;

  if(typeof value.toMillis === "function"){
    return value.toMillis();
  }

  if(typeof value.seconds === "number"){
    return value.seconds * 1000;
  }

  return null;
}

function getRemainingSeconds(order){

  const total =
    Math.max(
      0,
      Number(order.durationSeconds) || 0
    );

  const updated =
    getTimestampMs(
      order.durationUpdatedAt
    );

  if(!updated){
    return total;
  }

  return Math.max(
    0,
    Math.ceil(
      total -
      (Date.now() - updated) / 1000
    )
  );
}

function formatDuration(seconds){

  seconds =
    Math.max(
      0,
      Math.floor(
        Number(seconds) || 0
      )
    );

  const h =
    Math.floor(seconds / 3600);

  const m =
    Math.floor(
      (seconds % 3600) / 60
    );

  const s =
    seconds % 60;

  if(h > 0){

    return `${h}h ${String(m).padStart(2,"0")}m ${String(s).padStart(2,"0")}s`;

  }

  return `${m}m ${String(s).padStart(2,"0")}s`;
}

async function openMyOrders(){

  if(!currentUser) return;

  try{

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );

    const orders =
      snapshot.docs
        .map(d => ({
          id:d.id,
          ...d.data()
        }))
        .filter(
          order =>
            order.userId === currentUser.uid
        )
        .sort(
          (a,b) =>
            (getTimestampMs(b.createdAt) || 0) -
            (getTimestampMs(a.createdAt) || 0)
        );

    showModal(`
      <div class="modal-product">

        <button
          class="modal-close"
          data-close-modal
        >
          ×
        </button>

        <h2>📦 Mes commandes</h2>

        ${
          orders.length
            ? orders.map(renderUserOrder).join("")
            : `<p>Aucune commande.</p>`
        }

      </div>
    `);

  }catch(error){

    console.error(error);

    toast(
      "❌ Impossible de charger les commandes."
    );
  }
}

function renderUserOrder(order){

  const remaining =
    getRemainingSeconds(order);

  const address =
    order.shippingAddress || {};

  return `
    <div class="user-order">

      <h3>
        Commande #${escapeHTML(order.id.slice(0,8))}
      </h3>

      <p>
        Statut :
        <strong>
          ${escapeHTML(order.status || "")}
        </strong>
      </p>

      <p>
        Paiement :
        ${escapeHTML(order.paymentMethod || "")}
        ·
        ${escapeHTML(order.paymentStatus || "")}
      </p>

      <p>
        Suivi :
        ${escapeHTML(
          order.trackingLocation ||
          "Non renseigné"
        )}
      </p>

      <p>
        ⏱️
        ${formatDuration(remaining)}
      </p>

      <p>
        📍
        ${escapeHTML(address.name || "")}<br>
        ${escapeHTML(address.address || "")}<br>
        ${
          address.addressComplement
            ? escapeHTML(address.addressComplement) + "<br>"
            : ""
        }
        ${escapeHTML(address.postcode || "")}
        ${escapeHTML(address.city || "")}<br>
        ${escapeHTML(address.country || "")}
      </p>

      <div>
        ${(order.items || []).map(item => `
          <div>
            ${escapeHTML(item.name)}
            × ${Number(item.quantity || 1)}
          </div>
        `).join("")}
      </div>

      <strong>
        Total : ${money(order.total)}
      </strong>

    </div>
  `;
}

/* =========================================================
   ADMIN
========================================================= */

function isAdmin(){

  return (
    currentUser &&
    currentUser.email?.toLowerCase() ===
    ADMIN_EMAIL.toLowerCase()
  );
}

function openAdminLogin(){

  showModal(`
    <div class="modal-product">

      <button
        class="modal-close"
        data-close-modal
      >
        ×
      </button>

      <h2>🛠️ Dashboard admin</h2>

      <form id="adminLoginForm">

        <label>
          Code administrateur
          <input
            type="password"
            id="adminCode"
            required
          >
        </label>

        <button
          type="submit"
          class="primary-btn"
        >
          Ouvrir
        </button>

      </form>

    </div>
  `);

  $("#adminLoginForm")?.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const code =
        $("#adminCode")?.value || "";

      if(
        isAdmin() &&
        code === ADMIN_CODE
      ){

        openAdminDashboard();

      }else{

        toast(
          "❌ Accès administrateur refusé."
        );
      }

    }
  );
}

/* =========================================================
   ADMIN DASHBOARD
========================================================= */

async function openAdminDashboard(){

  if(!isAdmin()){

    toast("❌ Accès refusé.");
    return;
  }

  try{

    /*
      PAS de orderBy Firestore.
      On récupère tout puis on trie en JS.
      Cela évite les problèmes d'index Firestore.
    */

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );

    const orders =
      snapshot.docs
        .map(d => ({
          id:d.id,
          ...d.data()
        }))
        .sort(
          (a,b) =>
            (getTimestampMs(b.createdAt) || 0) -
            (getTimestampMs(a.createdAt) || 0)
        );

    showModal(`
      <div class="admin-dashboard">

        <button
          class="modal-close"
          data-close-modal
        >
          ×
        </button>

        <h2>🛠️ Dashboard NovaShop</h2>

        <div class="admin-stats">

          <div>
            <strong>${orders.length}</strong>
            <span>Commandes</span>
          </div>

          <div>
            <strong>
              ${money(
                orders.reduce(
                  (sum,o) =>
                    sum +
                    Number(o.total || 0),
                  0
                )
              )}
            </strong>
            <span>Total commandes</span>
          </div>

        </div>

        <section class="admin-card">

          <h3>CB</h3>

          <div class="admin-demo-card">

            <div>
              3254 3765 2821 1834
            </div>

            <div>
              EXPIR 02/14
              ·
              CVV 534
            </div>

          </div>

        </section>

        <section>

          <h3>
            Commandes
          </h3>

          <div class="admin-orders">

            ${
              orders.length
                ? orders.map(renderAdminOrder).join("")
                : "<p>Aucune commande.</p>"
            }

          </div>

        </section>

      </div>
    `);

    bindAdminButtons();

  }catch(error){

    console.error(error);

    toast(
      "❌ Impossible de charger le dashboard."
    );
  }
}

/* =========================================================
   ADMIN ORDER HTML
========================================================= */

function renderAdminOrder(order){

  const address =
    order.shippingAddress || {};

  const remaining =
    getRemainingSeconds(order);

  const currentDuration =
    Math.max(
      0,
      Number(order.durationSeconds) || 0
    );

  const hours =
    Math.floor(
      currentDuration / 3600
    );

  const minutes =
    Math.floor(
      currentDuration / 60
    ) % 60;

  const durationUnit =
    currentDuration % 3600 === 0
      ? "hours"
      : "minutes";

  const durationValue =
    durationUnit === "hours"
      ? hours
      : minutes || Math.floor(currentDuration / 60);

  return `
    <article
      class="admin-order"
      data-admin-order="${escapeHTML(order.id)}"
    >

      <div class="admin-order-header">

        <div>

          <h4>
            Commande #${escapeHTML(order.id.slice(0,8))}
          </h4>

          <p>
            ${escapeHTML(order.email || "")}
          </p>

        </div>

        <strong>
          ${money(order.total)}
        </strong>

      </div>

      <div class="admin-order-section">

        <h4>💳 Paiement</h4>

        <p>
          Méthode :
          <strong>
            ${escapeHTML(
              order.paymentMethod || "Inconnue"
            )}
          </strong>
        </p>

        <label>
          Statut paiement

          <select
            data-payment-status
            data-id="${escapeHTML(order.id)}"
          >

            ${
              PAYMENT_STATUSES.map(status => `
                <option
                  value="${escapeHTML(status)}"
                  ${
                    status === order.paymentStatus
                      ? "selected"
                      : ""
                  }
                >
                  ${escapeHTML(status)}
                </option>
              `).join("")
            }

          </select>

        </label>

        ${
          order.paymentMethod === "Carte"
            ? `
              <div class="admin-cb">

                <h4>CB</h4>

                <div>
                  3254 3765 2821 1834
                </div>

                <div>
                  EXPIR 02/14
                  ·
                  CVV 534
                </div>

              </div>
            `
            : ""
        }

      </div>

      <div class="admin-order-section">

        <h4>📦 Livraison</h4>

        <label>
          Statut

          <select
            data-status
            data-id="${escapeHTML(order.id)}"
          >

            ${
              ORDER_STATUSES.map(status => `
                <option
                  value="${escapeHTML(status)}"
                  ${
                    status === order.status
                      ? "selected"
                      : ""
                  }
                >
                  ${escapeHTML(status)}
                </option>
              `).join("")
            }

          </select>

        </label>

        <label>
          Lieu de suivi

          <input
            data-tracking
            data-id="${escapeHTML(order.id)}"
            value="${escapeHTML(
              order.trackingLocation ||
              ""
            )}"
          >
        </label>

        <div class="tracking-presets">

          <button
            data-tracking-preset
            data-id="${escapeHTML(order.id)}"
            data-value="Aéroport de Paris"
          >
            Aéroport de Paris
          </button>

          <button
            data-tracking-preset
            data-id="${escapeHTML(order.id)}"
            data-value="Centre de tri"
          >
            Centre de tri
          </button>

          <button
            data-tracking-preset
            data-id="${escapeHTML(order.id)}"
            data-value="Entrepôt"
          >
            Entrepôt
          </button>

          <button
            data-tracking-preset
            data-id="${escapeHTML(order.id)}"
            data-value="En livraison"
          >
            En livraison
          </button>

        </div>

      </div>

      <div class="admin-order-section">

        <h4>⏱️ Durée</h4>

        <div class="duration-editor">

          <input
            type="number"
            min="0"
            data-duration-value
            data-id="${escapeHTML(order.id)}"
            value="${durationValue}"
          >

          <select
            data-duration-unit
            data-id="${escapeHTML(order.id)}"
          >

            <option
              value="minutes"
              ${
                durationUnit === "minutes"
                  ? "selected"
                  : ""
              }
            >
              minutes
            </option>

            <option
              value="hours"
              ${
                durationUnit === "hours"
                  ? "selected"
                  : ""
              }
            >
              heures
            </option>

          </select>

        </div>

        <div class="order-countdown">

          ⏳
          <span
            data-countdown="${escapeHTML(order.id)}"
          >
            ${formatDuration(remaining)}
          </span>

        </div>

      </div>

      <div class="admin-order-section">

        <h4>📍 Adresse</h4>

        <p>

          <strong>
            ${escapeHTML(address.name || "")}
          </strong><br>

          ${escapeHTML(address.address || "")}<br>

          ${
            address.addressComplement
              ? escapeHTML(
                  address.addressComplement
                ) + "<br>"
              : ""
          }

          ${escapeHTML(address.postcode || "")}
          ${escapeHTML(address.city || "")}<br>

          ${escapeHTML(address.country || "")}

        </p>

      </div>

      <div class="admin-order-section">

        <h4>🛒 Articles</h4>

        ${
          (order.items || []).map(item => `
            <div class="admin-item">

              <img
                src="${escapeHTML(item.image || "")}"
                alt=""
              >

              <span>
                ${escapeHTML(item.name)}
              </span>

              <span>
                ×${Number(item.quantity || 1)}
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

      <div class="admin-order-actions">

        <button
          class="primary-btn"
          data-save-order
          data-id="${escapeHTML(order.id)}"
        >
          💾 Enregistrer
        </button>

        <button
          class="danger-btn"
          data-delete-order
          data-id="${escapeHTML(order.id)}"
        >
          🗑️ Supprimer
        </button>

      </div>

    </article>
  `;
}

/* =========================================================
   ADMIN BUTTONS
========================================================= */

function bindAdminButtons(){

  $$("[data-tracking-preset]").forEach(
    button => {

      button.onclick = () => {

        const id =
          button.dataset.id;

        const input =
          document.querySelector(
            `[data-tracking][data-id="${CSS.escape(id)}"]`
          );

        if(input){
          input.value =
            button.dataset.value;
        }

      };

    }
  );

  $$("[data-save-order]").forEach(
    button => {

      button.onclick = () => {

        saveOrderChanges(
          button.dataset.id
        );

      };

    }
  );

  $$("[data-delete-order]").forEach(
    button => {

      button.onclick = () => {

        deleteOrder(
          button.dataset.id
        );

      };

    }
  );
}

/* =========================================================
   SAUVEGARDE ADMIN
========================================================= */

async function saveOrderChanges(orderId){

  if(!isAdmin()) return;

  const status =
    document.querySelector(
      `[data-status][data-id="${CSS.escape(orderId)}"]`
    )?.value;

  const paymentStatus =
    document.querySelector(
      `[data-payment-status][data-id="${CSS.escape(orderId)}"]`
    )?.value;

  const trackingLocation =
    document.querySelector(
      `[data-tracking][data-id="${CSS.escape(orderId)}"]`
    )?.value.trim() || "";

  const durationValue =
    Number(
      document.querySelector(
        `[data-duration-value][data-id="${CSS.escape(orderId)}"]`
      )?.value || 0
    );

  const durationUnit =
    document.querySelector(
      `[data-duration-unit][data-id="${CSS.escape(orderId)}"]`
    )?.value || "minutes";

  let durationSeconds =
    durationValue * 60;

  if(durationUnit === "hours"){
    durationSeconds =
      durationValue * 3600;
  }

  try{

    await updateDoc(
      doc(db,"orders",orderId),
      {
        status,
        paymentStatus,
        trackingLocation,
        durationSeconds,
        durationUpdatedAt:
          Timestamp.now()
      }
    );

    toast("✅ Commande mise à jour.");

    openAdminDashboard();

  }catch(error){

    console.error(error);

    toast(
      "❌ Impossible de modifier la commande."
    );
  }
}

/* =========================================================
   SUPPRESSION COMMANDE
========================================================= */

async function deleteOrder(orderId){

  if(!isAdmin()) return;

  const confirmed =
    confirm(
      "Supprimer définitivement cette commande ?"
    );

  if(!confirmed) return;

  try{

    await deleteDoc(
      doc(db,"orders",orderId)
    );

    toast("🗑️ Commande supprimée.");

    openAdminDashboard();

  }catch(error){

    console.error(error);

    toast(
      "❌ Impossible de supprimer la commande."
    );
  }
}

/* =========================================================
   COUNTDOWN GLOBAL
========================================================= */

async function refreshCountdowns(){

  const elements =
    $$("[data-countdown]");

  if(!elements.length) return;

  /*
    Le dashboard est rendu depuis Firestore.
    Pour le compte à rebours local, on conserve
    les données actuellement affichées.
  */

  elements.forEach(element => {

    const id =
      element.dataset.countdown;

    if(!window.__novaAdminOrders) return;

    const order =
      window.__novaAdminOrders.find(
        x => x.id === id
      );

    if(!order) return;

    element.textContent =
      formatDuration(
        getRemainingSeconds(order)
      );

  });
}

/* =========================================================
   RECHERCHE
========================================================= */

function setupSearch(){

  const search =
    $("#searchInput") ||
    $("#search");

  if(!search) return;

  search.addEventListener(
    "input",
    renderProducts
  );
}

/* =========================================================
   TRI
========================================================= */

function setupSort(){

  const select =
    $("#sortSelect") ||
    $("#sort");

  if(!select) return;

  /*
    On supprime les anciennes possibilités
    note / nombre d'avis si elles existent
    dans le HTML.
  */

  [...select.options].forEach(
    option => {

      const text =
        option.textContent.toLowerCase();

      const value =
        option.value.toLowerCase();

      if(
        text.includes("note") ||
        text.includes("avis") ||
        value.includes("rating") ||
        value.includes("review")
      ){

        option.remove();

      }

    }
  );

  select.addEventListener(
    "change",
    () => {

      currentSort =
        select.value;

      renderProducts();

    }
  );
}

/* =========================================================
   BOUTONS GÉNÉRAUX
========================================================= */

function bindGlobalButtons(){

  const cartButtons = [
    "#cartBtn",
    "#openCart",
    "[data-open-cart]"
  ];

  cartButtons.forEach(selector => {

    $$(selector).forEach(
      button => {

        button.onclick =
          openCart;

      }
    );

  });

  const accountButtons = [
    "#accountBtn",
    "#openAccount",
    "[data-open-account]"
  ];

  accountButtons.forEach(selector => {

    $$(selector).forEach(
      button => {

        button.onclick =
          openAccount;

      }
    );

  });

  const adminButtons = [
    "#adminBtn",
    "#dashboardBtn",
    "#openAdmin",
    "[data-open-admin]"
  ];

  adminButtons.forEach(selector => {

    $$(selector).forEach(
      button => {

        button.onclick =
          () => {

            if(isAdmin()){
              openAdminDashboard();
            }else{
              openAdminLogin();
            }

          };

      }
    );

  });

  const productsButton =
    $("#seeProducts") ||
    $("#viewProducts");

  productsButton?.addEventListener(
    "click",
    () => {

      document
        .querySelector("#productsSection")
        ?.scrollIntoView({
          behavior:"smooth"
        });

    }
  );

  const reviewsButton =
    $("#seeReviews");

  reviewsButton?.addEventListener(
    "click",
    () => {

      document
        .querySelector("#reviewsSection")
        ?.scrollIntoView({
          behavior:"smooth"
        });

    }
  );
}

/* =========================================================
   FAQ
========================================================= */

function setupFAQ(){

  $$("[data-faq]").forEach(
    item => {

      item.addEventListener(
        "click",
        () => {

          item.classList.toggle("open");

        }
      );

    }
  );

  $$(".faq-question").forEach(
    question => {

      question.addEventListener(
        "click",
        () => {

          const parent =
            question.parentElement;

          parent?.classList.toggle(
            "open"
          );

        }
      );

    }
  );
}

/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;

    const accountLabels =
      $$("[data-account-label]");

    accountLabels.forEach(
      el => {

        el.textContent =
          user
            ? (user.email || "Compte")
            : "Compte";

      }
    );

    const adminButtons =
      $$("[data-admin-only]");

    adminButtons.forEach(
      el => {

        el.style.display =
          isAdmin()
            ? ""
            : "none";

      }
    );
  }
);

/* =========================================================
   DÉMARRAGE
========================================================= */

function initNovaShop(){

  renderCategories();

  renderProducts();

  updateCounters();

  setupSearch();

  setupSort();

  setupFAQ();

  bindGlobalButtons();

  /*
    Si l'ancien HTML contient des boutons
    qui utilisent ces noms.
  */

  window.openCart = openCart;
  window.openAccount = openAccount;
  window.openLogin = openLogin;
  window.openRegister = openRegister;
  window.openAdminDashboard = openAdminDashboard;
  window.addToCart = addToCart;
  window.toggleFavorite = toggleFavorite;
  window.openProduct = openProduct;
  window.openProductReviews = openProductReviews;
  window.closeModal = closeModal;

  /*
    Compte à rebours toutes les secondes.
  */

  setInterval(() => {

    $$("[data-countdown]").forEach(
      element => {

        const id =
          element.dataset.countdown;

        const order =
          window.__novaAdminOrders?.find(
            o => o.id === id
          );

        if(order){

          element.textContent =
            formatDuration(
              getRemainingSeconds(order)
            );

        }

      }
    );

  },1000);
}

if(
  document.readyState === "loading"
){

  document.addEventListener(
    "DOMContentLoaded",
    initNovaShop
  );

}else{

  initNovaShop();

}

/* =========================================================
   EXPORT GLOBAL
========================================================= */

window.NovaShop = {

  products,

  reviews:
    productReviewData,

  getCartItems,

  getCartTotal,

  getCartCount,

  addToCart,

  removeFromCart,

  changeQuantity,

  toggleFavorite,

  openProduct,

  openProductReviews,

  openCart,

  openCheckout,

  openAccount,

  openAdminDashboard,

  saveOrderChanges,

  deleteOrder

};
