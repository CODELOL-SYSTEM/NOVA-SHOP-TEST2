import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

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


/* =========================================================
   CONFIGURATION
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";

const PAYPAL_BASE = "https://paypal.me/SH0PNOVA";

/*
  Carte UNIQUEMENT pour la démonstration locale.
  Aucun numéro de carte n'est envoyé à Firestore.
*/
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
  }

];


/* =========================================================
   ETAT
========================================================= */

let cart = [];
let favorites = [];
let selectedCategory = "Tous";
let currentUser = null;
let isAdmin = false;
let adminOrders = [];
let currentPaymentMethod = "Carte";


/* =========================================================
   ELEMENTS
========================================================= */

const productsGrid = document.getElementById("productsGrid");
const categoriesEl = document.getElementById("categories");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const ratingFilter = document.getElementById("ratingFilter");
const minReviewsFilter = document.getElementById("minReviewsFilter");
const maxReviewsFilter = document.getElementById("maxReviewsFilter");
const minReviewsValue = document.getElementById("minReviewsValue");
const maxReviewsValue = document.getElementById("maxReviewsValue");
const cartCount = document.getElementById("cartCount");
const productsResultText = document.getElementById("productsResultText");

const mainModal = document.getElementById("mainModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeModalBtn = document.getElementById("closeModal");
const toast = document.getElementById("toast");


/* =========================================================
   LOCAL STORAGE
========================================================= */

function loadLocalData(){

  try{
    const rawCart = JSON.parse(
      localStorage.getItem("novaCart") || "[]"
    );

    if(Array.isArray(rawCart)){
      cart = rawCart
        .map(item => ({
          id:item.id,
          qty:Math.max(1,Number(item.qty)||1)
        }))
        .filter(item =>
          products.some(product => product.id === item.id)
        );
    }
  }catch{
    cart = [];
  }


  try{
    const rawFavorites = JSON.parse(
      localStorage.getItem("novaFavorites") || "[]"
    );

    if(Array.isArray(rawFavorites)){
      favorites = rawFavorites.filter(id =>
        products.some(product => product.id === id)
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


/* =========================================================
   UTILITAIRES
========================================================= */

function money(value){

  const n = Number(value);

  if(!Number.isFinite(n)){
    return "0,00 €";
  }

  return n.toLocaleString("fr-FR",{
    minimumFractionDigits:2,
    maximumFractionDigits:2
  }) + " €";
}


function escapeHTML(value){

  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}


function showToast(message){

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(()=>{
    toast.classList.remove("show");
  },3000);
}


function openModal(title,content){

  modalTitle.textContent = title;
  modalContent.innerHTML = content;
  mainModal.classList.add("show");
  document.body.style.overflow = "hidden";
}


function closeModal(){

  mainModal.classList.remove("show");
  document.body.style.overflow = "";
}


function getProduct(id){

  return products.find(p => p.id === id);
}


function getCartCount(){

  return cart.reduce(
    (total,item) => total + Math.max(0,Number(item.qty)||0),
    0
  );
}


function getCartTotal(){

  return cart.reduce((total,item)=>{

    const product = getProduct(item.id);

    if(!product) return total;

    return total +
      Number(product.price || 0) *
      Math.max(0,Number(item.qty)||0);

  },0);
}


/* =========================================================
   PRODUITS
========================================================= */

function buildCategories(){

  const cats = [
    "Tous",
    ...new Set(products.map(p => p.category))
  ];

  categoriesEl.innerHTML = cats.map(category => `
    <button
      class="category-btn ${selectedCategory === category ? "active" : ""}"
      data-category="${escapeHTML(category)}"
    >
      ${escapeHTML(category)}
    </button>
  `).join("");


  categoriesEl
    .querySelectorAll(".category-btn")
    .forEach(button => {

      button.addEventListener("click",()=>{

        selectedCategory =
          button.dataset.category;

        buildCategories();
        renderProducts();

      });

    });
}


function getFakeRating(product){

  const index =
    Number(product.id.replace("p","")) || 1;

  return 4.1 + ((index * 7) % 9) / 10;
}


function getFakeReviews(product){

  const index =
    Number(product.id.replace("p","")) || 1;

  return 321 + ((index * 743) % 9462);
}


function renderProducts(){

  let list = [...products];

  const search =
    String(searchInput?.value || "")
      .trim()
      .toLowerCase();

  const minRating =
    Number(ratingFilter?.value || 3.1);

  const minReviews =
    Number(minReviewsFilter?.value || 321);

  const maxReviews =
    Number(maxReviewsFilter?.value || 9782);


  if(search){

    list = list.filter(product =>

      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(search)

    );

  }


  if(selectedCategory !== "Tous"){

    list = list.filter(
      product => product.category === selectedCategory
    );

  }


  list = list.filter(product => {

    const rating = getFakeRating(product);
    const reviews = getFakeReviews(product);

    return rating >= minRating &&
           reviews >= minReviews &&
           reviews <= maxReviews;

  });


  switch(sortSelect?.value){

    case "priceAsc":
      list.sort((a,b)=>Number(a.price)-Number(b.price));
      break;

    case "priceDesc":
      list.sort((a,b)=>Number(b.price)-Number(a.price));
      break;

    case "ratingDesc":
      list.sort((a,b)=>getFakeRating(b)-getFakeRating(a));
      break;

    case "reviewsDesc":
      list.sort((a,b)=>getFakeReviews(b)-getFakeReviews(a));
      break;

    case "nameAsc":
      list.sort((a,b)=>a.name.localeCompare(b.name));
      break;

  }


  productsResultText.textContent =
    `${list.length} produit${list.length > 1 ? "s" : ""}`;


  if(!list.length){

    productsGrid.innerHTML = `
      <div class="empty" style="grid-column:1/-1">
        Aucun produit ne correspond aux filtres.
      </div>
    `;

    return;
  }


  productsGrid.innerHTML = list.map(product => {

    const rating =
      getFakeRating(product).toFixed(1);

    const reviews =
      getFakeReviews(product);

    const isFavorite =
      favorites.includes(product.id);

    return `

      <article class="product-card">

        <div class="product-image">

          ${
            product.new
              ? `<div class="new-badge">NOUVEAU</div>`
              : ""
          }

          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
            onerror="this.style.display='none'"
          >

          <button
            class="favorite-btn ${isFavorite ? "active" : ""}"
            data-favorite="${product.id}"
            title="Favoris"
          >
            ${isFavorite ? "♥" : "♡"}
          </button>

        </div>


        <div class="product-body">

          <div class="product-category">
            ${escapeHTML(product.category)}
          </div>

          <div class="product-name">
            ${escapeHTML(product.name)}
          </div>

          <div class="rating">

            <span>★</span>

            <span class="rating-number">
              ${rating}
            </span>

            <span class="review-count">
              (${reviews.toLocaleString("fr-FR")} avis)
            </span>

          </div>


          <div class="price">
            ${money(product.price)}
          </div>


          <div class="product-actions">

            <button data-view="${product.id}">
              Voir
            </button>

            <button
              class="add-btn"
              data-add="${product.id}"
            >
              Ajouter
            </button>

          </div>


          <button
            style="
              width:100%;
              margin-top:8px;
              border:0;
              background:transparent;
              color:#78adff;
              padding:7px;
            "
            data-product-reviews="${product.id}"
          >
            + Voir les avis
          </button>

        </div>

      </article>

    `;

  }).join("");


  productsGrid
    .querySelectorAll("[data-add]")
    .forEach(button => {

      button.addEventListener("click",()=>{

        addToCart(button.dataset.add);

      });

    });


  productsGrid
    .querySelectorAll("[data-view]")
    .forEach(button => {

      button.addEventListener("click",()=>{

        showProduct(button.dataset.view);

      });

    });


  productsGrid
    .querySelectorAll("[data-favorite]")
    .forEach(button => {

      button.addEventListener("click",()=>{

        toggleFavorite(button.dataset.favorite);

      });

    });


  productsGrid
    .querySelectorAll("[data-product-reviews]")
    .forEach(button => {

      button.addEventListener("click",()=>{

        showProductReviews(
          button.dataset.productReviews
        );

      });

    });

}


/* =========================================================
   FAVORIS
========================================================= */

function toggleFavorite(id){

  if(favorites.includes(id)){

    favorites =
      favorites.filter(x => x !== id);

    showToast("💔 Retiré des favoris");

  }else{

    favorites.push(id);

    showToast("❤️ Ajouté aux favoris");

  }

  saveLocalData();
  renderProducts();
}


function showFavorites(){

  const favProducts =
    favorites
      .map(id => getProduct(id))
      .filter(Boolean);


  if(!favProducts.length){

    openModal(
      "Favoris",
      `<div class="empty">
        Aucun produit dans tes favoris ❤️
      </div>`
    );

    return;
  }


  modalTitle.textContent = "Favoris";

  modalContent.innerHTML = `

    <div class="cart-items">

      ${favProducts.map(product=>`

        <div class="cart-item">

          <img
            src="${escapeHTML(product.image)}"
            alt=""
          >

          <div>

            <div class="cart-name">
              ${escapeHTML(product.name)}
            </div>

            <div class="cart-price">
              ${money(product.price)}
            </div>

          </div>

          <div class="cart-controls">

            <button
              data-fav-add="${product.id}"
            >
              +
            </button>

            <button
              class="cart-remove"
              data-fav-remove="${product.id}"
            >
              ♥
            </button>

          </div>

        </div>

      `).join("")}

    </div>

  `;


  mainModal.classList.add("show");
  document.body.style.overflow = "hidden";


  modalContent
    .querySelectorAll("[data-fav-add]")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        addToCart(button.dataset.favAdd);

      });

    });


  modalContent
    .querySelectorAll("[data-fav-remove]")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        toggleFavorite(button.dataset.favRemove);
        showFavorites();

      });

    });

}


/* =========================================================
   PANIER
========================================================= */

function addToCart(id){

  const product = getProduct(id);

  if(!product){
    showToast("Produit introuvable");
    return;
  }


  const existing =
    cart.find(item => item.id === id);


  if(existing){

    existing.qty =
      Math.max(1,Number(existing.qty)||1) + 1;

  }else{

    cart.push({
      id,
      qty:1
    });

  }


  saveLocalData();
  updateCartCount();

  showToast(`🛒 ${product.name} ajouté au panier`);

}


function changeCartQty(id,delta){

  const item =
    cart.find(x => x.id === id);

  if(!item) return;


  item.qty =
    Math.max(
      0,
      (Number(item.qty)||0) + delta
    );


  if(item.qty <= 0){

    cart =
      cart.filter(x => x.id !== id);

  }


  saveLocalData();
  updateCartCount();
  showCart();

}


function removeFromCart(id){

  cart =
    cart.filter(x => x.id !== id);

  saveLocalData();
  updateCartCount();
  showCart();

}


function updateCartCount(){

  cartCount.textContent =
    getCartCount();

}


function showCart(){

  if(!cart.length){

    openModal(
      "Panier",
      `<div class="empty">
        Ton panier est vide 🛒
      </div>`
    );

    return;
  }


  const total =
    getCartTotal();


  openModal(
    "Panier",
    `

      <div class="cart-items">

        ${cart.map(item=>{

          const product =
            getProduct(item.id);

          if(!product) return "";

          const qty =
            Math.max(1,Number(item.qty)||1);

          const subtotal =
            Number(product.price) * qty;


          return `

            <div class="cart-item">

              <img
                src="${escapeHTML(product.image)}"
                alt=""
              >

              <div>

                <div class="cart-name">
                  ${escapeHTML(product.name)}
                </div>

                <div class="cart-price">
                  ${money(subtotal)}
                </div>

              </div>


              <div class="cart-controls">

                <button
                  data-minus="${product.id}"
                >
                  −
                </button>

                <span>
                  ${qty}
                </span>

                <button
                  data-plus="${product.id}"
                >
                  +
                </button>

                <button
                  class="cart-remove"
                  data-remove="${product.id}"
                >
                  ×
                </button>

              </div>

            </div>

          `;

        }).join("")}

      </div>


      <div class="cart-total">

        <span>Total</span>

        <span>
          ${money(total)}
        </span>

      </div>


      <button
        class="primary-btn"
        style="width:100%;margin-top:17px;"
        id="checkoutBtn"
      >
        Passer la commande
      </button>

    `
  );


  modalContent
    .querySelectorAll("[data-minus]")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        changeCartQty(
          button.dataset.minus,
          -1
        );

      });

    });


  modalContent
    .querySelectorAll("[data-plus]")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        changeCartQty(
          button.dataset.plus,
          1
        );

      });

    });


  modalContent
    .querySelectorAll("[data-remove]")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        removeFromCart(
          button.dataset.remove
        );

      });

    });


  document
    .getElementById("checkoutBtn")
    ?.addEventListener(
      "click",
      showCheckout
    );

}


/* =========================================================
   PRODUIT
========================================================= */

function showProduct(id){

  const product = getProduct(id);

  if(!product) return;


  const rating =
    getFakeRating(product).toFixed(1);

  const reviews =
    getFakeReviews(product);


  openModal(
    "Produit",
    `

      <div class="product-detail">

        <div class="detail-image">

          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
          >

        </div>


        <div class="detail-info">

          <div class="product-category">
            ${escapeHTML(product.category)}
          </div>

          <h2>
            ${escapeHTML(product.name)}
          </h2>


          <div class="rating">

            <span>★</span>

            <span class="rating-number">
              ${rating}
            </span>

            <span class="review-count">
              ${reviews.toLocaleString("fr-FR")} avis
            </span>

          </div>


          <div class="detail-price">
            ${money(product.price)}
          </div>


          <p class="detail-description">
            Produit disponible sur NovaShop.
            Consulte les informations de commande et ajoute
            l'article à ton panier pour continuer.
          </p>


          <div class="quantity">

            <button id="detailMinus">
              −
            </button>

            <span id="detailQty">
              1
            </span>

            <button id="detailPlus">
              +
            </button>

          </div>


          <div class="detail-actions">

            <button
              class="primary-btn"
              id="detailAdd"
            >
              Ajouter au panier
            </button>

            <button
              class="secondary-btn"
              id="detailFavorite"
            >
              ❤️ Favoris
            </button>

          </div>

        </div>

      </div>

    `
  );


  let quantity = 1;

  const qtyEl =
    document.getElementById("detailQty");


  document
    .getElementById("detailMinus")
    ?.addEventListener("click",()=>{

      quantity =
        Math.max(1,quantity-1);

      qtyEl.textContent =
        quantity;

    });


  document
    .getElementById("detailPlus")
    ?.addEventListener("click",()=>{

      quantity++;

      qtyEl.textContent =
        quantity;

    });


  document
    .getElementById("detailAdd")
    ?.addEventListener("click",()=>{

      for(let i=0;i<quantity;i++){
        addToCart(id);
      }

    });


  document
    .getElementById("detailFavorite")
    ?.addEventListener("click",()=>{

      toggleFavorite(id);

    });

}


function showProductReviews(id){

  const product = getProduct(id);

  if(!product) return;


  openModal(
    `Avis • ${product.name}`,
    `

      <div class="review-list">

        ${[
          ["Lucas","Très bon produit, conforme à la description."],
          ["Mathis","Commande reçue correctement."],
          ["Alex","Produit intéressant pour le prix."],
          ["Tom","Installation facile et produit fonctionnel."],
          ["Enzo","Bonne expérience sur NovaShop."]
        ].map((review,index)=>`

          <div class="review-person">

            <div class="review-person-top">

              <span class="review-name">
                ${review[0]}
              </span>

              <span class="review-stars">
                ${"★".repeat(index % 2 ? 4 : 5)}
              </span>

            </div>

            <div class="review-text">
              ${review[1]}
            </div>

          </div>

        `).join("")}

      </div>

    `
  );

}


function showAllReviews(){

  openModal(
    "Avis clients",
    `

      <div class="reviews-summary">

        <div>

          <div class="reviews-big">
            4,6/5
          </div>

          <div class="reviews-stars">
            ★★★★★
          </div>

          <div class="reviews-total">
            81 591 avis
          </div>

        </div>

      </div>

      <div class="review-list" style="margin-top:15px;">

        <div class="review-person">
          <div class="review-person-top">
            <span class="review-name">Lucas</span>
            <span class="review-stars">★★★★★</span>
          </div>
          <div class="review-text">
            Très bonne expérience.
          </div>
        </div>

        <div class="review-person">
          <div class="review-person-top">
            <span class="review-name">Nathan</span>
            <span class="review-stars">★★★★★</span>
          </div>
          <div class="review-text">
            Produits bien présentés et commande simple.
          </div>
        </div>

        <div class="review-person">
          <div class="review-person-top">
            <span class="review-name">Thomas</span>
            <span class="review-stars">★★★★☆</span>
          </div>
          <div class="review-text">
            Site agréable à utiliser.
          </div>
        </div>

      </div>

    `
  );

}


/* =========================================================
   AUTH
========================================================= */

function authError(error){

  const code =
    error?.code || "";

  const messages = {

    "auth/invalid-credential":
      "Email ou mot de passe incorrect.",

    "auth/invalid-login-credentials":
      "Email ou mot de passe incorrect.",

    "auth/user-not-found":
      "Compte introuvable.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/email-already-in-use":
      "Cette adresse email est déjà utilisée.",

    "auth/weak-password":
      "Le mot de passe est trop faible.",

    "auth/invalid-email":
      "Adresse email invalide.",

    "auth/operation-not-allowed":
      "La connexion email/mot de passe n'est pas activée dans Firebase.",

    "auth/unauthorized-domain":
      "Ce domaine n'est pas autorisé dans Firebase.",

    "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
      "La clé API Firebase est refusée par Firebase."

  };

  return messages[code] || `Erreur : ${code || "inconnue"}`;

}


function showAccount(){

  if(currentUser){

    openModal(
      "Mon compte",
      `

        <div>

          <p style="color:#9caac0;margin-bottom:15px;">
            Connecté avec :
          </p>

          <div
            style="
              padding:15px;
              border:1px solid var(--line);
              border-radius:12px;
              background:#0d192b;
            "
          >
            ${escapeHTML(currentUser.email)}
          </div>


          <button
            class="primary-btn"
            id="ordersBtn"
            style="width:100%;margin-top:12px;"
          >
            📦 Mes commandes
          </button>


          <button
            class="secondary-btn"
            id="logoutBtn"
            style="width:100%;margin-top:10px;"
          >
            Se déconnecter
          </button>

        </div>

      `
    );


    document
      .getElementById("ordersBtn")
      ?.addEventListener(
        "click",
        showMyOrders
      );


    document
      .getElementById("logoutBtn")
      ?.addEventListener(
        "click",
        async()=>{

          await signOut(auth);

          closeModal();

          showToast("👋 Déconnecté");

        }
      );

    return;
  }


  showAuth();

}


function showAuth(){

  openModal(
    "Compte",
    `

      <div class="account-tabs">

        <button
          class="account-tab active"
          id="loginTab"
        >
          Connexion
        </button>

        <button
          class="account-tab"
          id="signupTab"
        >
          Inscription
        </button>

      </div>


      <form id="authForm">

        <div class="field">

          <label>Email</label>

          <input
            id="authEmail"
            type="email"
            required
            placeholder="ton@email.com"
          >

        </div>


        <div
          class="field"
          style="margin-top:12px;"
        >

          <label>Mot de passe</label>

          <input
            id="authPassword"
            type="password"
            required
            placeholder="Mot de passe"
          >

        </div>


        <button
          class="primary-btn"
          style="width:100%;margin-top:15px;"
          id="authSubmit"
        >
          Se connecter
        </button>

      </form>

    `
  );


  let mode = "login";


  const loginTab =
    document.getElementById("loginTab");

  const signupTab =
    document.getElementById("signupTab");

  const submit =
    document.getElementById("authSubmit");


  loginTab.onclick = ()=>{

    mode = "login";

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    submit.textContent =
      "Se connecter";

  };


  signupTab.onclick = ()=>{

    mode = "signup";

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    submit.textContent =
      "Créer mon compte";

  };


  document
    .getElementById("authForm")
    .addEventListener("submit",async event=>{

      event.preventDefault();

      const email =
        document.getElementById("authEmail").value.trim();

      const password =
        document.getElementById("authPassword").value;


      try{

        if(mode === "login"){

          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          showToast("✅ Connexion réussie");

        }else{

          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          showToast("✅ Compte créé");

        }

        closeModal();

      }catch(error){

        showToast(authError(error));

      }

    });

}


/* =========================================================
   CHECKOUT
========================================================= */

function showCheckout(){

  if(!currentUser){

    showToast("Connecte-toi pour commander.");
    showAuth();
    return;
  }


  if(!cart.length){

    showToast("Ton panier est vide.");
    return;
  }


  const total =
    getCartTotal();


  openModal(
    "Finaliser la commande",
    `

      <form id="checkoutForm">

        <h3 style="margin-bottom:15px;">
          📦 Adresse de livraison
        </h3>


        <div class="form-grid">

          <div class="field full">

            <label>
              Nom complet
            </label>

            <input
              id="shipName"
              type="text"
              required
              placeholder="Prénom et nom"
            >

          </div>


          <div class="field full">

            <label>
              Adresse complète
            </label>

            <input
              id="shipAddress"
              type="text"
              required
              placeholder="Numéro et nom de rue"
            >

          </div>


          <div class="field full">

            <label>
              Complément d'adresse
            </label>

            <input
              id="shipComplement"
              type="text"
              placeholder="Appartement, bâtiment, étage... (facultatif)"
            >

          </div>


          <div class="field">

            <label>
              Code postal
            </label>

            <input
              id="shipPostcode"
              type="text"
              required
              placeholder="59000"
            >

          </div>


          <div class="field">

            <label>
              Ville
            </label>

            <input
              id="shipCity"
              type="text"
              required
              placeholder="Lille"
            >

          </div>


          <div class="field full">

            <label>
              Pays
            </label>

            <select
              id="shipCountry"
              required
            >

              <option value="">
                Choisir un pays
              </option>

              <option value="France">
                France
              </option>

              <option value="Belgique">
                Belgique
              </option>

              <option value="Luxembourg">
                Luxembourg
              </option>

              <option value="Suisse">
                Suisse
              </option>

              <option value="Espagne">
                Espagne
              </option>

              <option value="Allemagne">
                Allemagne
              </option>

              <option value="Italie">
                Italie
              </option>

              <option value="Portugal">
                Portugal
              </option>

            </select>

          </div>

        </div>


        <h3 style="margin-top:25px;">
          💳 Paiement
        </h3>


        <div class="payment-options">

          <button
            type="button"
            class="payment-choice active"
            id="cardChoice"
          >

            <strong>💳 Carte</strong>

            <span>
              Paiement de démonstration
            </span>

          </button>


          <button
            type="button"
            class="payment-choice"
            id="paypalChoice"
          >

            <strong>🅿️ PayPal</strong>

            <span>
              Paiement via PayPal
            </span>

          </button>

        </div>


        <div
          class="payment-panel active"
          id="cardPanel"
        >

          <div class="demo-note">
            💡 Mode démonstration local.
            Les informations saisies ne sont pas enregistrées.
          </div>


          <div class="field">

            <label>
              Numéro de carte
            </label>

            <input
              id="cardNumber"
              inputmode="numeric"
              autocomplete="off"
              maxlength="19"
              placeholder="•••• •••• •••• ••••"
              required
            >

          </div>


          <div
            class="form-grid"
            style="margin-top:12px;"
          >

            <div class="field">

              <label>
                Expiration
              </label>

              <input
                id="cardExpiry"
                inputmode="numeric"
                autocomplete="off"
                maxlength="5"
                placeholder="••/••"
                required
              >

            </div>


            <div class="field">

              <label>
                CVV
              </label>

              <input
                id="cardCvv"
                type="password"
                inputmode="numeric"
                autocomplete="off"
                maxlength="3"
                placeholder="•••"
                required
              >

            </div>

          </div>


          <div class="card-preview">

            <div class="card-preview-title">
              CB
            </div>

            <div class="card-preview-number">
              •••• •••• •••• ••••
            </div>

            <div class="card-preview-bottom">

              <span>
                EXP ••/••
              </span>

              <span>
                CVV •••
              </span>

            </div>

          </div>

        </div>


        <div
          class="payment-panel"
          id="paypalPanel"
        >

          <div class="demo-note">

            Tu seras redirigé vers PayPal pour effectuer
            le paiement.

          </div>


          <div
            style="
              padding:20px;
              text-align:center;
              border:1px solid var(--line);
              border-radius:14px;
              background:#0e1b2e;
            "
          >

            <div style="font-size:42px;">
              🅿️
            </div>

            <div style="margin-top:10px;">
              PayPal
            </div>

            <div
              style="
                margin-top:8px;
                color:#7eaef5;
                font-size:24px;
                font-weight:900;
              "
            >
              ${money(total)}
            </div>

          </div>

        </div>


        <div
          style="
            margin-top:22px;
            display:flex;
            justify-content:space-between;
            gap:15px;
            align-items:center;
          "
        >

          <span style="color:#9ca9bd;">
            Total
          </span>

          <strong style="font-size:25px;">
            ${money(total)}
          </strong>

        </div>


        <button
          type="submit"
          class="primary-btn"
          style="width:100%;margin-top:17px;"
        >
          ${
            currentPaymentMethod === "Carte"
              ? "Payer par carte"
              : "Continuer vers PayPal"
          }
        </button>

      </form>

    `
  );


  setupPaymentChoices();
  setupCardFormatting();
  setupCheckoutSubmit();

}


function setupPaymentChoices(){

  const cardChoice =
    document.getElementById("cardChoice");

  const paypalChoice =
    document.getElementById("paypalChoice");

  const cardPanel =
    document.getElementById("cardPanel");

  const paypalPanel =
    document.getElementById("paypalPanel");


  function setMethod(method){

    currentPaymentMethod = method;


    cardChoice.classList.toggle(
      "active",
      method === "Carte"
    );

    paypalChoice.classList.toggle(
      "active",
      method === "PayPal"
    );


    cardPanel.classList.toggle(
      "active",
      method === "Carte"
    );

    paypalPanel.classList.toggle(
      "active",
      method === "PayPal"
    );


    const submit =
      document.querySelector(
        "#checkoutForm button[type='submit']"
      );

    if(submit){

      submit.textContent =
        method === "Carte"
          ? "Payer par carte"
          : "Continuer vers PayPal";

    }


    document
      .getElementById("cardNumber")
      ?.toggleAttribute(
        "required",
        method === "Carte"
      );

    document
      .getElementById("cardExpiry")
      ?.toggleAttribute(
        "required",
        method === "Carte"
      );

    document
      .getElementById("cardCvv")
      ?.toggleAttribute(
        "required",
        method === "Carte"
      );

  }


  cardChoice.addEventListener(
    "click",
    ()=>setMethod("Carte")
  );

  paypalChoice.addEventListener(
    "click",
    ()=>setMethod("PayPal")
  );


  setMethod(currentPaymentMethod);

}


function setupCardFormatting(){

  const number =
    document.getElementById("cardNumber");

  const expiry =
    document.getElementById("cardExpiry");

  const cvv =
    document.getElementById("cardCvv");


  number?.addEventListener("input",()=>{

    let value =
      number.value.replace(/\D/g,"").slice(0,16);

    let groups =
      value.match(/.{1,4}/g) || [];

    number.value =
      groups.join(" ");

  });


  expiry?.addEventListener("input",()=>{

    let value =
      expiry.value.replace(/\D/g,"").slice(0,4);

    if(value.length > 2){

      value =
        value.slice(0,2) +
        "/" +
        value.slice(2);

    }

    expiry.value = value;

  });


  cvv?.addEventListener("input",()=>{

    cvv.value =
      cvv.value
        .replace(/\D/g,"")
        .slice(0,3);

  });

}


function getShippingAddress(){

  return {

    name:
      document.getElementById("shipName")?.value.trim(),

    address:
      document.getElementById("shipAddress")?.value.trim(),

    addressComplement:
      document.getElementById("shipComplement")?.value.trim(),

    postcode:
      document.getElementById("shipPostcode")?.value.trim(),

    city:
      document.getElementById("shipCity")?.value.trim(),

    country:
      document.getElementById("shipCountry")?.value.trim()

  };

}


function validateShippingAddress(address){

  return Boolean(
    address.name &&
    address.address &&
    address.postcode &&
    address.city &&
    address.country
  );

}


function getOrderItems(){

  return cart.map(item=>{

    const product =
      getProduct(item.id);

    return {

      id:product.id,

      name:product.name,

      price:Number(product.price)||0,

      quantity:
        Math.max(1,Number(item.qty)||1),

      image:product.image

    };

  });

}


function setupCheckoutSubmit(){

  const form =
    document.getElementById("checkoutForm");


  form?.addEventListener(
    "submit",
    async event=>{

      event.preventDefault();


      if(!currentUser){

        showToast(
          "Connecte-toi avant de commander."
        );

        return;

      }


      const address =
        getShippingAddress();


      if(!validateShippingAddress(address)){

        showToast(
          "❌ Remplis toute l'adresse de livraison."
        );

        return;

      }


      const total =
        getCartTotal();


      const items =
        getOrderItems();


      if(currentPaymentMethod === "Carte"){

        const number =
          document
            .getElementById("cardNumber")
            .value
            .trim();

        const expiry =
          document
            .getElementById("cardExpiry")
            .value
            .trim();

        const cvv =
          document
            .getElementById("cardCvv")
            .value
            .trim();


        if(
          number !== DEMO_CARD.number ||
          expiry !== DEMO_CARD.expiry ||
          cvv !== DEMO_CARD.cvv
        ){

          showToast(
            "❌ Carte incorrecte."
          );

          return;

        }


        try{

          await addDoc(
            collection(db,"orders"),
            {

              userId:currentUser.uid,

              email:currentUser.email,

              items,

              total,

              paymentMethod:"Carte",

              paymentStatus:"Payée",

              status:
                "En cours de préparation",

              trackingLocation:
                "Entrepôt NovaShop",

              durationSeconds:3600,

              durationUpdatedAt:
                Timestamp.now(),

              shippingAddress:address,

              createdAt:
                serverTimestamp()

            }
          );


          cart = [];

          saveLocalData();
          updateCartCount();

          showToast(
            "✅ Commande créée."
          );

          closeModal();

        }catch(error){

          console.error(error);

          showToast(
            "❌ Impossible de créer la commande."
          );

        }

        return;

      }


      /*
        PayPal :
        ouverture immédiate pour éviter les blocages
        de popup sur téléphone.
      */

      const paypalUrl =
        `${PAYPAL_BASE}/${encodeURIComponent(
          total.toFixed(2)
        )}`;


      window.open(
        paypalUrl,
        "_blank"
      );


      try{

        await addDoc(
          collection(db,"orders"),
          {

            userId:currentUser.uid,

            email:currentUser.email,

            items,

            total,

            paymentMethod:"PayPal",

            paymentStatus:"En attente",

            status:
              "En cours de préparation",

            trackingLocation:
              "Entrepôt NovaShop",

            durationSeconds:3600,

            durationUpdatedAt:
              Timestamp.now(),

            shippingAddress:address,

            createdAt:
              serverTimestamp()

          }
        );


        cart = [];

        saveLocalData();
        updateCartCount();

        showToast(
          "🅿️ Commande enregistrée. Paiement PayPal en attente."
        );

        closeModal();

      }catch(error){

        console.error(error);

        showToast(
          "❌ Commande PayPal non enregistrée."
        );

      }

    }
  );

}


/* =========================================================
   TIMERS
========================================================= */

function getTimestampMs(value){

  if(!value) return null;

  if(
    typeof value.toMillis === "function"
  ){
    return value.toMillis();
  }

  if(
    typeof value.seconds === "number"
  ){
    return value.seconds * 1000;
  }

  return null;

}


function getRemainingSeconds(order){

  const total =
    Math.max(
      0,
      Number(order.durationSeconds)||0
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
      (Date.now()-updated)/1000
    )
  );

}


function formatDuration(seconds){

  seconds =
    Math.max(
      0,
      Math.floor(Number(seconds)||0)
    );


  const h =
    Math.floor(seconds/3600);

  const m =
    Math.floor(
      (seconds%3600)/60
    );

  const s =
    seconds%60;


  if(h > 0){

    return `${h}h ${String(m).padStart(2,"0")}m ${String(s).padStart(2,"0")}s`;

  }


  return `${m}m ${String(s).padStart(2,"0")}s`;

}


/* =========================================================
   COMMANDES UTILISATEUR
========================================================= */

async function showMyOrders(){

  if(!currentUser){

    showAuth();
    return;

  }


  openModal(
    "Mes commandes",
    `<div class="empty">Chargement...</div>`
  );


  try{

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );


    let orders =
      snapshot.docs
        .map(document=>({

          id:document.id,
          ...document.data()

        }))
        .filter(order =>
          order.userId === currentUser.uid
        );


    orders.sort((a,b)=>{

      const ta =
        getTimestampMs(a.createdAt)||0;

      const tb =
        getTimestampMs(b.createdAt)||0;

      return tb-ta;

    });


    if(!orders.length){

      modalContent.innerHTML = `
        <div class="empty">
          Tu n'as encore aucune commande.
        </div>
      `;

      return;

    }


    modalContent.innerHTML = `

      <div class="orders-list">

        ${orders.map(renderUserOrder).join("")}

      </div>

    `;


    startCountdownRefresh();

  }catch(error){

    console.error(error);

    modalContent.innerHTML = `
      <div class="empty">
        ❌ Impossible de charger les commandes.
      </div>
    `;

  }

}


function renderUserOrder(order){

  const address =
    order.shippingAddress || {};

  const remaining =
    getRemainingSeconds(order);


  return `

    <div
      class="order-card"
      data-user-order="${order.id}"
    >

      <div class="order-top">

        <div>

          <div class="order-id">
            Commande #${escapeHTML(order.id.slice(0,8))}
          </div>

          <div class="order-meta">
            ${escapeHTML(order.paymentMethod || "Paiement")}
          </div>

        </div>


        <div>

          <div class="status-badge">
            ${escapeHTML(order.status || "En cours")}
          </div>

          <div
            class="order-meta"
            style="margin-top:6px;"
          >
            Paiement :
            ${escapeHTML(order.paymentStatus || "En attente")}
          </div>

        </div>

      </div>


      <div class="tracking">

        <div>
          📍
          ${escapeHTML(
            order.trackingLocation ||
            "En préparation"
          )}
        </div>


        <div class="tracking-row">

          <span>
            Temps restant
          </span>

          <span
            class="countdown"
            data-countdown="${order.id}"
            data-duration="${remaining}"
          >
            ${formatDuration(remaining)}
          </span>

        </div>

      </div>


      <div
        class="admin-section"
        style="border-top:0;padding-top:12px;"
      >

        <strong>
          📦 Adresse de livraison
        </strong>

        <div
          style="
            color:#9ca9bd;
            line-height:1.6;
            margin-top:7px;
          "
        >

          ${escapeHTML(address.name || "")}<br>

          ${escapeHTML(address.address || "")}

          ${
            address.addressComplement
              ? `<br>${escapeHTML(address.addressComplement)}`
              : ""
          }

          <br>

          ${escapeHTML(address.postcode || "")}
          ${escapeHTML(address.city || "")}

          <br>

          ${escapeHTML(address.country || "")}

        </div>

      </div>


      <div
        style="
          margin-top:14px;
          color:#9ca9bd;
        "
      >
        Total :
        <strong style="color:white;">
          ${money(order.total)}
        </strong>
      </div>

    </div>

  `;

}


/* =========================================================
   ADMIN
========================================================= */

function showDashboard(){

  if(!currentUser){

    showToast(
      "Connecte-toi pour ouvrir le dashboard."
    );

    showAuth();

    return;

  }


  if(
    currentUser.email?.toLowerCase() !==
    ADMIN_EMAIL.toLowerCase()
  ){

    showToast(
      "⛔ Accès réservé à l'administration."
    );

    return;

  }


  openAdminCode();

}


function openAdminCode(){

  openModal(
    "Dashboard",
    `

      <div>

        <p style="color:#9ca9bd;line-height:1.5;">
          Entre le code administrateur.
        </p>


        <div
          class="field"
          style="margin-top:15px;"
        >

          <label>
            Code
          </label>

          <input
            id="adminCodeInput"
            type="password"
            placeholder="Code administrateur"
          >

        </div>


        <button
          class="primary-btn"
          id="adminCodeSubmit"
          style="width:100%;margin-top:15px;"
        >
          Ouvrir le dashboard
        </button>

      </div>

    `
  );


  document
    .getElementById("adminCodeSubmit")
    ?.addEventListener(
      "click",
      async()=>{

        const code =
          document
            .getElementById("adminCodeInput")
            .value
            .trim();


        if(code !== ADMIN_CODE){

          showToast(
            "❌ Code administrateur incorrect."
          );

          return;

        }


        await loadAdminDashboard();

      }
    );

}


async function loadAdminDashboard(){

  modalTitle.textContent =
    "Dashboard";

  modalContent.innerHTML =
    `<div class="empty">Chargement des commandes...</div>`;


  try{

    /*
      Pas de orderBy Firestore ici.
      On récupère puis on trie côté JavaScript.
      Cela évite les problèmes d'index Firestore.
    */

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );


    adminOrders =
      snapshot.docs
        .map(document=>({

          id:document.id,
          ...document.data()

        }));


    adminOrders.sort((a,b)=>{

      const ta =
        getTimestampMs(a.createdAt)||0;

      const tb =
        getTimestampMs(b.createdAt)||0;

      return tb-ta;

    });


    renderAdminDashboard();

  }catch(error){

    console.error(error);

    modalContent.innerHTML = `

      <div class="empty">

        ❌ Impossible de charger les commandes.

        <br><br>

        Vérifie les règles Firestore et la connexion Firebase.

      </div>

    `;

  }

}


function renderAdminDashboard(){

  const totalOrders =
    adminOrders.length;


  const paidOrders =
    adminOrders.filter(
      o => o.paymentStatus === "Payée"
    ).length;


  const pendingOrders =
    adminOrders.filter(
      o => o.paymentStatus === "En attente"
    ).length;


  const revenue =
    adminOrders.reduce(
      (sum,o)=>sum + Number(o.total||0),
      0
    );


  modalContent.innerHTML = `

    <div class="admin-stats">

      <div class="stat-card">
        <span>Commandes</span>
        <strong>${totalOrders}</strong>
      </div>

      <div class="stat-card">
        <span>Payées</span>
        <strong>${paidOrders}</strong>
      </div>

      <div class="stat-card">
        <span>En attente</span>
        <strong>${pendingOrders}</strong>
      </div>

      <div class="stat-card">
        <span>Total</span>
        <strong>${money(revenue)}</strong>
      </div>

    </div>


    <div
      style="
        padding:15px;
        border:1px solid var(--line);
        border-radius:13px;
        background:#0d192b;
        margin-bottom:15px;
      "
    >

      <h3>
        CB
      </h3>

      <div
        style="
          margin-top:12px;
          color:#b8c4d5;
          line-height:1.8;
        "
      >

        <div>
          Numéro :
          <strong>
            3254 3765 2821 1834
          </strong>
        </div>

        <div>
          EXPIR :
          <strong>
            02/14
          </strong>
        </div>

        <div>
          CVV :
          <strong>
            534
          </strong>
        </div>

      </div>

    </div>


    <div>

      ${
        adminOrders.length
          ? adminOrders.map(renderAdminOrder).join("")
          : `
            <div class="empty">
              Aucune commande.
            </div>
          `
      }

    </div>

  `;


  bindAdminEvents();
  startCountdownRefresh();

}


function renderAdminOrder(order){

  const address =
    order.shippingAddress || {};


  const remaining =
    getRemainingSeconds(order);


  const durationSeconds =
    Math.max(
      0,
      Number(order.durationSeconds)||0
    );


  return `

    <div
      class="admin-order"
      data-admin-order="${order.id}"
    >

      <div class="order-top">

        <div>

          <div class="order-id">
            Commande #${escapeHTML(order.id.slice(0,8))}
          </div>

          <div class="order-meta">
            ${escapeHTML(order.email || "Email inconnu")}
          </div>

        </div>


        <div
          class="status-badge"
          data-status-display="${order.id}"
        >
          ${escapeHTML(
            order.status ||
            "En cours de préparation"
          )}
        </div>

      </div>


      <!-- STATUTS -->

      <div class="admin-section">

        <div class="admin-grid">

          <div class="admin-field">

            <label>
              Statut commande
            </label>

            <select
              data-status="${order.id}"
            >

              ${ORDER_STATUSES.map(status=>`

                <option
                  value="${escapeHTML(status)}"
                  ${
                    order.status === status
                      ? "selected"
                      : ""
                  }
                >
                  ${escapeHTML(status)}
                </option>

              `).join("")}

            </select>

          </div>


          <div class="admin-field">

            <label>
              Statut paiement
            </label>

            <select
              data-payment-status="${order.id}"
            >

              ${PAYMENT_STATUSES.map(status=>`

                <option
                  value="${escapeHTML(status)}"
                  ${
                    order.paymentStatus === status
                      ? "selected"
                      : ""
                  }
                >
                  ${escapeHTML(status)}
                </option>

              `).join("")}

            </select>

          </div>

        </div>

      </div>


      <!-- PAIEMENT -->

      <div class="admin-section">

        <h3>
          💳 Paiement
        </h3>

        <div
          style="
            margin-top:8px;
            color:#a0aec1;
          "
        >

          Mode :
          <strong style="color:white;">
            ${escapeHTML(
              order.paymentMethod || "Inconnu"
            )}
          </strong>

          <br>

          Statut :
          <strong style="color:white;">
            ${escapeHTML(
              order.paymentStatus || "En attente"
            )}
          </strong>

        </div>

      </div>


      <!-- CB -->

      ${
        order.paymentMethod === "Carte"
          ? `

            <div class="admin-section">

              <h3>
                CB
              </h3>

              <div
                style="
                  margin-top:9px;
                  padding:14px;
                  border-radius:12px;
                  background:#101c2e;
                  border:1px solid var(--line);
                  color:#b9c5d6;
                  line-height:1.8;
                "
              >

                <div>
                  3254 3765 2821 1834
                </div>

                <div>
                  EXPIR 02/14
                </div>

                <div>
                  CVV 534
                </div>

              </div>

            </div>

          `
          : ""
      }


      <!-- SUIVI -->

      <div class="admin-section">

        <h3>
          📍 Suivi
        </h3>


        <div
          class="admin-field"
          style="margin-top:10px;"
        >

          <label>
            Localisation
          </label>

          <input
            type="text"
            data-location="${order.id}"
            value="${escapeHTML(
              order.trackingLocation ||
              ""
            )}"
            placeholder="Centre de tri..."
          >

        </div>


        <div class="preset-location">

          <button
            data-preset="${order.id}"
            data-value="Aéroport de Paris"
          >
            Aéroport de Paris
          </button>

          <button
            data-preset="${order.id}"
            data-value="Centre de tri"
          >
            Centre de tri
          </button>

          <button
            data-preset="${order.id}"
            data-value="Entrepôt"
          >
            Entrepôt
          </button>

          <button
            data-preset="${order.id}"
            data-value="En livraison"
          >
            En livraison
          </button>

        </div>

      </div>


      <!-- DUREE -->

      <div class="admin-section">

        <h3>
          ⏱️ Durée
        </h3>


        <div
          style="
            margin-top:10px;
            color:#8fa0b6;
          "
        >
          Temps restant :
          <strong
            class="countdown"
            data-countdown="${order.id}"
            data-duration="${remaining}"
          >
            ${formatDuration(remaining)}
          </strong>
        </div>


        <div
          class="admin-grid"
          style="margin-top:10px;"
        >

          <div class="admin-field">

            <label>
              Durée
            </label>

            <input
              type="number"
              min="0"
              data-duration-value="${order.id}"
              value="${
                durationSeconds >= 3600
                  ? Math.floor(durationSeconds/3600)
                  : durationSeconds >= 60
                    ? Math.floor(durationSeconds/60)
                    : durationSeconds
              }"
            >

          </div>


          <div class="admin-field">

            <label>
              Unité
            </label>

            <select
              data-duration-unit="${order.id}"
            >

              <option
                value="seconds"
                ${
                  durationSeconds < 60
                    ? "selected"
                    : ""
                }
              >
                Secondes
              </option>

              <option
                value="minutes"
                ${
                  durationSeconds >= 60 &&
                  durationSeconds < 3600
                    ? "selected"
                    : ""
                }
              >
                Minutes
              </option>

              <option
                value="hours"
                ${
                  durationSeconds >= 3600
                    ? "selected"
                    : ""
                }
              >
                Heures
              </option>

            </select>

          </div>

        </div>

      </div>


      <!-- ADRESSE COMPLETE -->

      <div class="admin-section">

        <h3>
          📦 Adresse de livraison
        </h3>


        <div
          style="
            margin-top:10px;
            color:#a1afc2;
            line-height:1.7;
          "
        >

          <strong style="color:white;">
            ${escapeHTML(address.name || "Non renseigné")}
          </strong>

          <br>

          ${escapeHTML(
            address.address ||
            "Adresse non renseignée"
          )}

          ${
            address.addressComplement
              ? `<br>${escapeHTML(address.addressComplement)}`
              : ""
          }

          <br>

          ${escapeHTML(address.postcode || "")}
          ${escapeHTML(address.city || "")}

          <br>

          ${escapeHTML(
            address.country ||
            "Pays non renseigné"
          )}

        </div>

      </div>


      <!-- PRODUITS -->

      <div class="admin-section">

        <h3>
          🛒 Produits
        </h3>


        <div
          style="
            margin-top:10px;
            display:grid;
            gap:7px;
          "
        >

          ${
            Array.isArray(order.items)
              ? order.items.map(item=>`

                <div
                  style="
                    display:flex;
                    justify-content:space-between;
                    gap:10px;
                    padding:9px;
                    background:#101c2e;
                    border-radius:8px;
                    color:#a5b2c4;
                  "
                >

                  <span>
                    ${escapeHTML(item.name || "Produit")}
                    × ${Number(item.quantity)||1}
                  </span>

                  <strong style="color:white;">
                    ${money(
                      (Number(item.price)||0) *
                      (Number(item.quantity)||1)
                    )}
                  </strong>

                </div>

              `).join("")
              : ""
          }

        </div>


        <div
          style="
            margin-top:12px;
            text-align:right;
            font-size:19px;
          "
        >
          Total :
          <strong>
            ${money(order.total)}
          </strong>
        </div>

      </div>


      <!-- ACTIONS -->

      <div class="admin-actions">

        <button
          class="save-order-btn"
          data-save-order="${order.id}"
        >
          💾 Enregistrer
        </button>

        <button
          class="delete-order-btn"
          data-delete-order="${order.id}"
        >
          🗑️ Supprimer
        </button>

      </div>

    </div>

  `;

}


function bindAdminEvents(){

  document
    .querySelectorAll("[data-preset]")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{

          const id =
            button.dataset.preset;

          const input =
            document.querySelector(
              `[data-location="${CSS.escape(id)}"]`
            );

          if(input){

            input.value =
              button.dataset.value;

          }

        }
      );

    });


  document
    .querySelectorAll("[data-save-order]")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>saveOrderChanges(
          button.dataset.saveOrder
        )
      );

    });


  document
    .querySelectorAll("[data-delete-order]")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>deleteOrder(
          button.dataset.deleteOrder
        )
      );

    });

}


async function saveOrderChanges(orderId){

  const order =
    adminOrders.find(
      x => x.id === orderId
    );

  if(!order) return;


  const status =
    document.querySelector(
      `[data-status="${CSS.escape(orderId)}"]`
    )?.value;


  const paymentStatus =
    document.querySelector(
      `[data-payment-status="${CSS.escape(orderId)}"]`
    )?.value;


  const location =
    document.querySelector(
      `[data-location="${CSS.escape(orderId)}"]`
    )?.value.trim();


  const durationValue =
    Number(
      document.querySelector(
        `[data-duration-value="${CSS.escape(orderId)}"]`
      )?.value || 0
    );


  const durationUnit =
    document.querySelector(
      `[data-duration-unit="${CSS.escape(orderId)}"]`
    )?.value;


  let durationSeconds =
    Math.max(0,durationValue);


  if(durationUnit === "minutes"){

    durationSeconds *= 60;

  }

  if(durationUnit === "hours"){

    durationSeconds *= 3600;

  }


  try{

    await updateDoc(
      doc(db,"orders",orderId),
      {

        status,

        paymentStatus,

        trackingLocation:
          location || "Entrepôt NovaShop",

        durationSeconds,

        durationUpdatedAt:
          Timestamp.now()

      }
    );


    order.status = status;
    order.paymentStatus = paymentStatus;
    order.trackingLocation =
      location || "Entrepôt NovaShop";
    order.durationSeconds =
      durationSeconds;
    order.durationUpdatedAt =
      Timestamp.now();


    showToast(
      "✅ Commande mise à jour."
    );


    renderAdminDashboard();

  }catch(error){

    console.error(error);

    showToast(
      "❌ Erreur pendant la sauvegarde."
    );

  }

}


async function deleteOrder(orderId){

  const confirmed =
    confirm(
      "Supprimer définitivement cette commande ?"
    );


  if(!confirmed) return;


  try{

    await deleteDoc(
      doc(db,"orders",orderId)
    );


    adminOrders =
      adminOrders.filter(
        order => order.id !== orderId
      );


    showToast(
      "🗑️ Commande supprimée."
    );


    renderAdminDashboard();

  }catch(error){

    console.error(error);

    showToast(
      "❌ Impossible de supprimer la commande."
    );

  }

}


/* =========================================================
   REFRESH COUNTDOWN
========================================================= */

let countdownTimer = null;

function startCountdownRefresh(){

  clearInterval(countdownTimer);


  countdownTimer =
    setInterval(()=>{

      document
        .querySelectorAll("[data-countdown]")
        .forEach(element=>{

          const id =
            element.dataset.countdown;


          const order =
            adminOrders.find(
              x => x.id === id
            );


          if(order){

            element.textContent =
              formatDuration(
                getRemainingSeconds(order)
              );

            return;

          }


          const original =
            Number(
              element.dataset.duration || 0
            );


          /*
            Pour les commandes utilisateur,
            le serveur peut être relu lors du prochain affichage.
          */

          if(
            Number.isFinite(original) &&
            original > 0
          ){

            element.dataset.duration =
              Math.max(
                0,
                original - 1
              );

            element.textContent =
              formatDuration(
                Number(element.dataset.duration)
              );

          }

        });

    },1000);

}


/* =========================================================
   FAQ
========================================================= */

function setupFAQ(){

  document
    .querySelectorAll(".faq-question")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{

          const item =
            button.closest(".faq-item");

          item.classList.toggle("open");

          const icon =
            button.querySelector("span");

          if(icon){

            icon.textContent =
              item.classList.contains("open")
                ? "−"
                : "＋";

          }

        }
      );

    });

}


/* =========================================================
   NAVIGATION
========================================================= */

document
  .getElementById("productsBtn")
  ?.addEventListener("click",()=>{

    document
      .getElementById("productsSection")
      ?.scrollIntoView({
        behavior:"smooth"
      });

  });


document
  .getElementById("heroDashboard")
  ?.addEventListener(
    "click",
    showDashboard
  );


document
  .getElementById("dashboardBtn")
  ?.addEventListener(
    "click",
    showDashboard
  );


document
  .getElementById("accountBtn")
  ?.addEventListener(
    "click",
    showAccount
  );


document
  .getElementById("cartBtn")
  ?.addEventListener(
    "click",
    showCart
  );


document
  .getElementById("favoritesBtn")
  ?.addEventListener(
    "click",
    showFavorites
  );


document
  .getElementById("moreReviewsBtn")
  ?.addEventListener(
    "click",
    showAllReviews
  );


document
  .getElementById("reviewsOpenBtn")
  ?.addEventListener(
    "click",
    showAllReviews
  );


document
  .getElementById("footerProducts")
  ?.addEventListener("click",()=>{

    document
      .getElementById("productsSection")
      ?.scrollIntoView({
        behavior:"smooth"
      });

  });


document
  .getElementById("footerFaq")
  ?.addEventListener("click",()=>{

    document
      .getElementById("faq")
      ?.scrollIntoView({
        behavior:"smooth"
      });

  });


document
  .getElementById("footerRefund")
  ?.addEventListener("click",()=>{

    document
      .getElementById("refund")
      ?.scrollIntoView({
        behavior:"smooth"
      });

  });


document
  .getElementById("footerReviews")
  ?.addEventListener("click",()=>{

    document
      .getElementById("reviewsSection")
      ?.scrollIntoView({
        behavior:"smooth"
      });

  });


/* =========================================================
   RECHERCHE + FILTRES
========================================================= */

searchInput?.addEventListener(
  "input",
  renderProducts
);


sortSelect?.addEventListener(
  "change",
  renderProducts
);


ratingFilter?.addEventListener(
  "change",
  renderProducts
);


minReviewsFilter?.addEventListener(
  "input",
  ()=>{

    minReviewsValue.textContent =
      minReviewsFilter.value;

    if(
      Number(minReviewsFilter.value) >
      Number(maxReviewsFilter.value)
    ){

      maxReviewsFilter.value =
        minReviewsFilter.value;

      maxReviewsValue.textContent =
        maxReviewsFilter.value;

    }

    renderProducts();

  }
);


maxReviewsFilter?.addEventListener(
  "input",
  ()=>{

    maxReviewsValue.textContent =
      maxReviewsFilter.value;

    if(
      Number(maxReviewsFilter.value) <
      Number(minReviewsFilter.value)
    ){

      minReviewsFilter.value =
        maxReviewsFilter.value;

      minReviewsValue.textContent =
        minReviewsFilter.value;

    }

    renderProducts();

  }
);


/* =========================================================
   MODAL
========================================================= */

closeModalBtn?.addEventListener(
  "click",
  closeModal
);


mainModal?.addEventListener(
  "click",
  event=>{

    if(event.target === mainModal){

      closeModal();

    }

  }
);


document.addEventListener(
  "keydown",
  event=>{

    if(event.key === "Escape"){

      closeModal();

    }

  }
);


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user=>{

    currentUser = user;

    isAdmin =
      Boolean(
        user &&
        user.email?.toLowerCase() ===
        ADMIN_EMAIL.toLowerCase()
      );

  }
);


/* =========================================================
   INITIALISATION
========================================================= */

loadLocalData();

updateCartCount();

buildCategories();

renderProducts();

setupFAQ();

startCountdownRefresh();
