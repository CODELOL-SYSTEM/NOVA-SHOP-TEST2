import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  where
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
   CONFIG
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";

const PAYPAL_URL = "https://paypal.me/SH0PNOVA";

const TEST_CARD = "1234567890123456";
const TEST_EXPIRY = "12/42";
const TEST_CVV = "144";


/* =========================================================
   PRODUITS
========================================================= */

const products = [
  {id:"p1",name:"Gigabyte B650 AORUS Elite AX",category:"Composants",price:189.99,image:"https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"},
  {id:"p2",name:"PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",category:"PC Gamer",price:2237.65,image:"https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png"},
  {id:"p3",name:"HyperX Cloud II",category:"Casques",price:49.99,image:"https://fr.hyperx.com/cdn/shop/files/hyperx_cloud_ii_red_1_main.jpg?v=1764129756"},
  {id:"p4",name:"TECORS Clavier Gamer Mécanique 60% AZERTY",category:"Claviers",price:30,image:"https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg"},
  {id:"p5",name:"Clavier Magnétique 65% Celshading Noir",category:"Claviers",price:120.90,image:"https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832"},
  {id:"p6",name:"Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",category:"Souris",price:49.99,image:"https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif"},
  {id:"p7",name:"Logitech G PRO X2 Superstrike Blanc et Noir",category:"Souris",price:150.99,image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg"},
  {id:"p8",name:"Samsung 990 PRO 1TB",category:"Stockage",price:249.99,image:"https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg"},
  {id:"p9",name:"Samsung 990 PRO 2TB",category:"Stockage",price:199.93,image:"https://pc.comparer.fr/500x500/310191422.webp"},
  {id:"p10",name:"CORSAIR RM1000x EU",category:"Alimentations",price:159.90,image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp"},
  {id:"p11",name:"CORSAIR RM850x EU",category:"Alimentations",price:134.90,image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp"},
  {id:"p12",name:"Corsair Frame 5000D RS ARGB Noir",category:"Boîtiers",price:159.90,image:"https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg"},
  {id:"p13",name:"ARCTIC Liquid Freezer III Pro 360 A-RGB Black",category:"Refroidissement",price:129.90,image:"https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg"},
  {id:"p14",name:"Samsung 27 QD-OLED Odyssey G6",category:"Écrans",price:399.95,image:"https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg"},
  {id:"p15",name:"ELGATO Wave Mic Arm Pro",category:"Streaming",price:229.90,image:"https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg"},
  {id:"p16",name:"Sony DualSense Cosmic Red PS5/PC",category:"Manettes",price:74.90,image:"https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg"},
  {id:"p17",name:"ASUS TUF Gaming B650-PLUS",category:"Composants",price:179.90,image:"https://media.materiel.net/r550/products/MN0005986139.jpg"},
  {id:"p18",name:"MSI MAG B650 Tomahawk WiFi",category:"Composants",price:189.90,image:"https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg"},
  {id:"p19",name:"KOORUI Ecran PC Gamer 27 Pouces 200Hz IPS QHD HDR400 1ms",category:"Écrans",price:74.99,image:"https://m.media-amazon.com/images/I/71CJ1DF-8sL._AC_SL1500_.jpg"},
  {id:"p20",name:'iiyama 23.8" LED - G-Master GB2471HS-B1 Red Eagle',category:"Écrans",price:65.99,image:"https://media.ldlc.com/r1600/ld/products/00/06/34/20/LD0006342033.jpg"},
  {id:"p21",name:"SONGMICS Chaise de jeu ergonomique avec repose-pieds 150 kg gris ardoise",category:"Chaises gaming",price:129.99,image:"https://static.songmics.fr/fit-in/1000x1000/image/Product/B34OBG077G01/B34OBG077G01-1.jpg"},
  {id:"p22",name:"Dowinx Série Luxe Suède LS-66D68E Blanc",category:"Chaises gaming",price:79.99,image:"https://eu.dowinx.com/cdn/shop/files/11_5f72b693-5f79-4d06-b48a-7cb2b2f0244a.png?v=1752139814&width=1220"},
  {id:"p23",name:"Chaise GTPLAYER Ergonomique Gaming Soutien Lombaire Repose-pieds",category:"Chaises gaming",price:109.99,image:"https://thumb.pccomponentes.com/w-530-530/articles/1118/11186247/167-silla-gaming-gtplayer-ergonomica-con-reposapies-y-soporte-lumbar-4d.jpg"},
  {id:"p24",name:"Desk Lite - Height-Adjustable Desk",category:"Bureaux gaming",price:110.99,image:"https://yaasa.com/cdn/shop/files/yaasa-desk-lite_nr01_black_100_01-04545-01_1200x.jpg?v=1753169928"},
  {id:"p25",name:"EUREKA ERGONOMIC Bureau Gaming LED 182x76cm en Forme d'Aile",category:"Bureaux gaming",price:86.99,image:"https://m.media-amazon.com/images/I/71Gd5G3wRsL._AC_SL1500_.jpg"},
  {id:"p26",name:"Bureau gaming d’angle HOMCOM réversible support écran",category:"Bureaux gaming",price:44.99,image:"https://cdn.manomano.com/pim-media/images/medium/74eca1cb1cefa063c8f600ee293ae6ee826794f8.jpg"},
  {id:"p27",name:"Logitech G Pro X 2 Lightspeed Noir + Repose casque",category:"Casques",price:99.99,image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/6d/e9/6e/24045933/1540-1/tsp20260429154901/Casque-PC-gaming-sans-fil-Logitech-G-Pro-X-2-Lightspeed-Noir-Repose-casque.jpg"},
  {id:"p28",name:"Razer BlackShark V2 Pro 2023 Noir",category:"Casques",price:75.99,image:"https://media.ldlc.com/r1600/ld/products/00/06/07/71/LD0006077125.jpg"},
  {id:"p29",name:"beyerdynamic DT-990 Pro 250 Ohm",category:"Casques",price:60.99,image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_10/106865/18443258_800.jpg"},
  {id:"p30",name:"Logitech PRO X TKL Rapid Noir, filaire AZERTY",category:"Claviers",price:78.99,image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/6a/89/8f/26184042/1540-1.jpg"},
  {id:"p31",name:"QwertyKey75 HE Striker, Magnetic Hall Effect, Rapid Trigger, Snap Tap",category:"Claviers",price:56.99,image:"https://cdn.shopify.com/s/files/1/0814/2530/1746/files/QK75-HE-STRIKER-qwertykey-tastatura-mecanica-gaming-hotswap-2025_1eee355b-72ca-46e6-a458-751384d0595c_1800x.webp?v=1771799537"},
  {id:"p32",name:"GravaStar Mercury K1 Clavier Gamer sans Fil en Aluminium, Noir Dégradé",category:"Claviers",price:91.99,image:"https://m.media-amazon.com/images/I/6144lt2l5JL._AC_SL1200_.jpg"},
  {id:"p33",name:"ATTACK SHARK R11 Ultra, fibre de carbone, 8000Hz, 49g, 42000 DPI",category:"Souris",price:26.99,image:"https://m.media-amazon.com/images/I/71bMz15SqcL._AC_SL1500_.jpg"},
  {id:"p34",name:"HyperX QuadCast 2 – Microphone USB – RGB",category:"Microphones",price:98.99,image:"https://fr.hyperx.com/cdn/shop/files/hyperx_quadcast_2_872v1aa_main_1_2d47a555-f537-457b-9002-8b9e9010dc00.jpg?v=1763067608"},
  {id:"p35",name:"Shure SM7 dB",category:"Microphones",price:121.99,image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_57/573672/18492412_800.jpg"},
  {id:"p36",name:"Razer Seiren V3 Chroma Noir",category:"Microphones",price:13.99,image:"https://media.ldlc.com/r1600/ld/products/00/06/13/25/LD0006132588.jpg"},
  {id:"p37",name:"Stairville LED Pixel Rail 40 RGB MKII",category:"Éclairage RGB",price:18.90,image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449739/14448905_800.jpg"},
  {id:"p38",name:"Govee LED Strip Light RGBIC Wi-Fi + Bluetooth 5m Matter",category:"Éclairage RGB",price:8,image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/ab/7a/9d/27097771/1520-2/tsp20260429155350/Ruban-LED-Govee-LED-Strip-Light-RGBIC-Wi-Fi-avec-BT-5M-Matter.jpg"},
  {id:"p39",name:"Lampe de plafond hexagone nid d’abeille LED 2.4m x 4.8m contour bleu",category:"Éclairage RGB",price:91.10,image:"https://www.discount-autosport.com/wp-content/webp-express/webp-images/uploads/2025/02/lampe-hexagone-plafond-led-4m80-contour-bleu-.jpg.webp"},
  {id:"p40",name:"GIGABYTE GeForce RTX 5050 WINDFORCE OC 8G",category:"Cartes graphiques",price:147,image:"https://m.media-amazon.com/images/I/41kmHFMFPOL._SL500_.jpg"},
  {id:"p41",name:"MSI GeForce RTX 3050 LP E 6G OC",category:"Cartes graphiques",price:100,image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTCe_rha_tAAHPWnQ8VV7GIvF-uSqUaEyU61TSnwgM4CK8g3-x_3Hq4wOgH36Ri63eAiWHsvhmRJHzVrUQR9-IwMx31WH0w"},
  {id:"p42",name:"ASUS Dual Radeon RX 7600 EVO OC Edition 8GB GDDR6",category:"Cartes graphiques",price:140,image:"https://m.media-amazon.com/images/I/81QItJufypL._AC_SL1500_.jpg"},
  {id:"p43",name:"PC Gamer Fixe, Ryzen 7 5700G, Vega 8, 16G DDR4, 1T SSD",category:"PC Gamer",price:650,image:"https://m.media-amazon.com/images/I/81M3iU5S4QL._AC_SL1500_.jpg",new:true}
];


/* =========================================================
   ETAT
========================================================= */

let cart = [];
let favorites = [];
let currentUser = null;
let currentCategory = "Tous";


/* =========================================================
   STATUTS
========================================================= */

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

const DEFAULT_LOCATION = "En préparation";


/* =========================================================
   OUTILS
========================================================= */

const $ = id => document.getElementById(id);

function escapeHTML(value){
  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function money(value){
  const n = Number(value);
  return Number.isFinite(n)
    ? n.toFixed(2).replace(".",",")+" €"
    : "0,00 €";
}

function toast(message){

  const el = $("toast");

  if(!el) return;

  el.textContent = message;
  el.classList.add("show");

  clearTimeout(window.__toast);

  window.__toast = setTimeout(()=>{
    el.classList.remove("show");
  },2500);
}

function openModal(content){

  $("modalContent").innerHTML = content;
  $("modalBg").classList.add("open");

}

function closeModal(){

  $("modalBg").classList.remove("open");
  $("modalContent").innerHTML = "";

}


/* =========================================================
   PANIER
========================================================= */

function saveCart(){

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );

  updateCartCount();
}

function loadCart(){

  try{

    const raw =
      JSON.parse(localStorage.getItem("novaCart") || "[]");

    cart = Array.isArray(raw)
      ? raw
          .map(item=>{

            const p =
              products.find(x=>x.id===item.id);

            if(!p) return null;

            return {
              id:p.id,
              name:p.name,
              price:Number(p.price),
              image:p.image,
              quantity:Math.max(
                1,
                Number(item.quantity)||1
              )
            };

          })
          .filter(Boolean)
      : [];

    saveCart();

  }catch{

    cart = [];
    saveCart();

  }

}

function updateCartCount(){

  const count =
    cart.reduce(
      (s,x)=>s+Number(x.quantity||0),
      0
    );

  $("cartCount").textContent = count;
}

function cartTotal(){

  return cart.reduce(
    (s,x)=>
      s+
      Number(x.price||0)*
      Number(x.quantity||0),
    0
  );

}

function addToCart(id){

  const product =
    products.find(x=>x.id===id);

  if(!product){
    toast("Produit introuvable.");
    return;
  }

  const existing =
    cart.find(x=>x.id===id);

  if(existing){

    existing.quantity++;

  }else{

    cart.push({
      id:product.id,
      name:product.name,
      price:Number(product.price),
      image:product.image,
      quantity:1
    });

  }

  saveCart();

  toast("Ajouté au panier 🛒");

}

function changeQuantity(id,amount){

  const item =
    cart.find(x=>x.id===id);

  if(!item) return;

  item.quantity += amount;

  if(item.quantity<=0){

    cart =
      cart.filter(x=>x.id!==id);

  }

  saveCart();

  showCart();

}

function showCart(){

  if(cart.length===0){

    openModal(`
      <h2 class="section-title">🛒 Panier</h2>
      <div class="empty">
        <div style="font-size:55px">🛒</div>
        <p>Ton panier est vide.</p>
      </div>
    `);

    return;
  }

  openModal(`

    <h2 class="section-title">
      🛒 Panier
    </h2>

    ${cart.map(item=>`

      <div class="cart-item">

        <img
          src="${escapeHTML(item.image)}"
          alt=""
        >

        <div class="cart-item-info">

          <strong>
            ${escapeHTML(item.name)}
          </strong>

          <div>
            ${money(item.price)}
          </div>

        </div>

        <div class="qty">

          <button
            data-minus="${item.id}"
          >
            −
          </button>

          <strong>
            ${item.quantity}
          </strong>

          <button
            data-plus="${item.id}"
          >
            +
          </button>

        </div>

      </div>

    `).join("")}

    <div class="total">
      Total : ${money(cartTotal())}
    </div>

    <button
      class="primary"
      id="checkoutBtn"
      style="width:100%"
    >
      💳 Passer au paiement
    </button>

  `);

  document.querySelectorAll("[data-minus]")
    .forEach(btn=>{
      btn.onclick=()=>{
        changeQuantity(btn.dataset.minus,-1);
      };
    });

  document.querySelectorAll("[data-plus]")
    .forEach(btn=>{
      btn.onclick=()=>{
        changeQuantity(btn.dataset.plus,1);
      };
    });

  $("checkoutBtn").onclick =
    showCheckout;

}


/* =========================================================
   FAVORIS
========================================================= */

function loadFavorites(){

  try{

    const raw =
      JSON.parse(
        localStorage.getItem("novaFavorites") || "[]"
      );

    favorites =
      Array.isArray(raw)
        ? raw
        : [];

  }catch{

    favorites=[];

  }

}

function saveFavorites(){

  localStorage.setItem(
    "novaFavorites",
    JSON.stringify(favorites)
  );

}

function toggleFavorite(id){

  if(favorites.includes(id)){

    favorites =
      favorites.filter(x=>x!==id);

  }else{

    favorites.push(id);

  }

  saveFavorites();

  renderProducts();

}


/* =========================================================
   PRODUITS
========================================================= */

function productCard(p){

  const fav =
    favorites.includes(p.id);

  return `

    <article class="product">

      <button
        class="favorite ${fav?"active":""}"
        data-favorite="${p.id}"
      >
        ${fav?"♥":"♡"}
      </button>

      <img
        class="product-image"
        src="${escapeHTML(p.image)}"
        alt=""
        loading="lazy"
      >

      <div class="product-info">

        <div class="product-category">
          ${escapeHTML(p.category)}
        </div>

        <div class="product-name">
          ${escapeHTML(p.name)}
        </div>

        <div class="product-price">
          ${money(p.price)}
        </div>

        <div class="product-actions">

          <button
            class="secondary"
            data-detail="${p.id}"
          >
            Voir
          </button>

          <button
            class="primary"
            data-add="${p.id}"
          >
            🛒
          </button>

        </div>

      </div>

    </article>

  `;
}

function attachProductEvents(){

  document.querySelectorAll("[data-add]")
    .forEach(btn=>{
      btn.onclick=()=>{
        addToCart(btn.dataset.add);
      };
    });

  document.querySelectorAll("[data-favorite]")
    .forEach(btn=>{
      btn.onclick=()=>{
        toggleFavorite(btn.dataset.favorite);
      };
    });

  document.querySelectorAll("[data-detail]")
    .forEach(btn=>{
      btn.onclick=()=>{
        showProduct(btn.dataset.detail);
      };
    });

}

function showProduct(id){

  const p =
    products.find(x=>x.id===id);

  if(!p) return;

  openModal(`

    <div class="product-detail">

      <img
        src="${escapeHTML(p.image)}"
        alt=""
      >

      <div>

        <div class="product-category">
          ${escapeHTML(p.category)}
        </div>

        <h2>
          ${escapeHTML(p.name)}
        </h2>

        <div class="price">
          ${money(p.price)}
        </div>

        <button
          class="primary"
          id="detailAdd"
          style="width:100%;margin-bottom:10px"
        >
          🛒 Ajouter au panier
        </button>

      </div>

    </div>

  `);

  $("detailAdd").onclick=()=>{
    addToCart(p.id);
  };

}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories(){

  const cats =
    ["Tous",...new Set(
      products.map(p=>p.category)
    )];

  $("categories").innerHTML =
    cats.map(cat=>`

      <button
        class="category-btn ${
          currentCategory===cat?"active":""
        }"
        data-category="${escapeHTML(cat)}"
      >
        ${escapeHTML(cat)}
      </button>

    `).join("");

  document.querySelectorAll("[data-category]")
    .forEach(btn=>{

      btn.onclick=()=>{

        currentCategory =
          btn.dataset.category;

        renderCategories();
        renderProducts();

      };

    });

}

function renderProducts(){

  const search =
    $("searchInput").value
      .trim()
      .toLowerCase();

  let list =
    products.filter(p=>{

      const categoryOK =
        currentCategory==="Tous" ||
        p.category===currentCategory;

      const searchOK =
        !search ||
        p.name.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search);

      return categoryOK && searchOK;

    });

  const sort =
    $("sortSelect").value;

  if(sort==="priceAsc")
    list.sort((a,b)=>a.price-b.price);

  if(sort==="priceDesc")
    list.sort((a,b)=>b.price-a.price);

  if(sort==="name")
    list.sort((a,b)=>
      a.name.localeCompare(b.name)
    );

  $("products").innerHTML =
    list.length
      ? list.map(productCard).join("")
      : `<div class="empty">Aucun produit trouvé 🔎</div>`;

  attachProductEvents();

}


/* =========================================================
   AUTH
========================================================= */

function firebaseAuthMessage(error){

  switch(error?.code){

    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "❌ Email ou mot de passe incorrect.";

    case "auth/email-already-in-use":
      return "❌ Cet email possède déjà un compte.";

    case "auth/invalid-email":
      return "❌ Email invalide.";

    case "auth/weak-password":
      return "❌ Mot de passe trop faible.";

    case "auth/operation-not-allowed":
      return "❌ Active Email/Password dans Firebase Authentication.";

    case "auth/unauthorized-domain":
      return "❌ Ajoute codelol-system.github.io dans les domaines autorisés Firebase.";

    default:
      return `❌ ${error?.code || "Erreur Firebase"}`;

  }

}

function showAccount(){

  if(currentUser){

    openModal(`

      <h2 class="section-title">
        👤 Mon compte
      </h2>

      <div class="account-box">

        <strong>
          ${escapeHTML(currentUser.email)}
        </strong>

        <button
          class="secondary"
          id="ordersBtn"
          style="width:100%;margin-top:15px"
        >
          📦 Mes commandes
        </button>

        <button
          class="danger"
          id="logoutBtn"
          style="width:100%;margin-top:8px"
        >
          Déconnexion
        </button>

      </div>

    `);

    $("logoutBtn").onclick=async()=>{

      await signOut(auth);
      closeModal();
      toast("Déconnecté.");

    };

    $("ordersBtn").onclick =
      showMyOrders;

    return;
  }

  openModal(`

    <h2 class="section-title">
      👤 Connexion
    </h2>

    <div class="form">

      <input
        id="authEmail"
        type="email"
        placeholder="Email"
      >

      <input
        id="authPassword"
        type="password"
        placeholder="Mot de passe"
      >

      <button
        class="primary"
        id="loginBtn"
      >
        Se connecter
      </button>

      <button
        class="secondary"
        id="registerBtn"
      >
        Créer un compte
      </button>

      <div id="authError"></div>

    </div>

  `);

  $("loginBtn").onclick=async()=>{

    try{

      await signInWithEmailAndPassword(
        auth,
        $("authEmail").value.trim(),
        $("authPassword").value
      );

      closeModal();
      toast("Connexion réussie ✅");

    }catch(error){

      $("authError").innerHTML =
        `<div class="error">${firebaseAuthMessage(error)}</div>`;

      console.error(error);

    }

  };

  $("registerBtn").onclick=async()=>{

    const email =
      $("authEmail").value.trim();

    const password =
      $("authPassword").value;

    if(password.length<6){

      $("authError").innerHTML =
        `<div class="error">
          ❌ 6 caractères minimum.
        </div>`;

      return;
    }

    try{

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      closeModal();
      toast("Compte créé ✅");

    }catch(error){

      $("authError").innerHTML =
        `<div class="error">${firebaseAuthMessage(error)}</div>`;

      console.error(error);

    }

  };

}


/* =========================================================
   CHECKOUT
========================================================= */

function showCheckout(){

  if(!currentUser){

    showAccount();
    return;

  }

  openModal(`

    <h2 class="section-title">
      💳 Paiement
    </h2>

    <div class="checkout-box">

      <div class="total">
        ${money(cartTotal())}
      </div>

      <div class="payment-choice">

        <button
          id="cardChoice"
          class="selected"
        >
          💳 Carte
        </button>

        <button id="paypalChoice">
          🅿️ PayPal
        </button>

      </div>

      <div id="paymentArea"></div>

    </div>

  `);

  showCardPayment();

  $("cardChoice").onclick=()=>{

    $("cardChoice").classList.add("selected");
    $("paypalChoice").classList.remove("selected");

    showCardPayment();

  };

  $("paypalChoice").onclick=()=>{

    $("paypalChoice").classList.add("selected");
    $("cardChoice").classList.remove("selected");

    showPayPalPayment();

  };

}

function showCardPayment(){

  $("paymentArea").innerHTML=`

    <div class="form">

      <input
        id="cardNumber"
        placeholder="Numéro de carte"
        maxlength="19"
      >

      <input
        id="cardExpiry"
        placeholder="MM/AA"
        maxlength="5"
      >

      <input
        id="cardCVV"
        placeholder="CVV"
        maxlength="3"
      >

      <button
        class="primary"
        id="payCardBtn"
      >
        Payer ${money(cartTotal())}
      </button>

      <div id="cardError"></div>

    </div>

  `;

  $("cardNumber").oninput=e=>{

    let v =
      e.target.value
        .replace(/\D/g,"")
        .slice(0,16);

    e.target.value =
      v.match(/.{1,4}/g)?.join(" ") || "";

  };

  $("cardExpiry").oninput=e=>{

    let v =
      e.target.value
        .replace(/\D/g,"")
        .slice(0,4);

    if(v.length>2)
      v=v.slice(0,2)+"/"+v.slice(2);

    e.target.value=v;

  };

  $("payCardBtn").onclick =
    processCardPayment;

}

async function processCardPayment(){

  const number =
    $("cardNumber").value.replace(/\s/g,"");

  const expiry =
    $("cardExpiry").value.trim();

  const cvv =
    $("cardCVV").value.trim();

  if(
    number!==TEST_CARD ||
    expiry!==TEST_EXPIRY ||
    cvv!==TEST_CVV
  ){

    $("cardError").innerHTML=
      `<div class="error">❌ Carte incorrecte.</div>`;

    return;

  }

  try{

    const total =
      cartTotal();

    await addDoc(
      collection(db,"orders"),
      {
        userId:currentUser.uid,
        email:currentUser.email,

        items:cart.map(x=>({
          id:x.id,
          name:x.name,
          price:Number(x.price),
          quantity:Number(x.quantity)
        })),

        total:Number(total.toFixed(2)),

        paymentMethod:"Carte",

        status:"En cours de préparation",

        trackingLocation:"En préparation",

        durationSeconds:3600,

        durationUpdatedAt:serverTimestamp(),

        createdAt:serverTimestamp()
      }
    );

    cart=[];

    saveCart();

    openModal(`

      <div style="text-align:center;padding:30px">

        <div style="font-size:60px">
          ✅
        </div>

        <h2>
          Commande enregistrée
        </h2>

        <p style="color:#8e9bb0;margin:15px 0">
          Tu peux suivre ta commande depuis ton compte.
        </p>

        <button
          class="primary"
          id="done"
        >
          Continuer
        </button>

      </div>

    `);

    $("done").onclick=closeModal;

  }catch(error){

    console.error(error);

    $("cardError").innerHTML=
      `<div class="error">
        ❌ Erreur lors de l'enregistrement.
      </div>`;

  }

}

function showPayPalPayment(){

  const total =
    cartTotal();

  $("paymentArea").innerHTML=`

    <div class="account-box">

      <div style="font-size:45px;text-align:center">
        🅿️
      </div>

      <p style="text-align:center;color:#8e9bb0;margin:15px">
        Paiement via PayPal
      </p>

      <button
        class="primary"
        id="paypalBtn"
        style="width:100%"
      >
        Continuer avec PayPal
      </button>

    </div>

  `;

  $("paypalBtn").onclick=()=>{

    const url =
      `${PAYPAL_URL}/${Number(total).toFixed(2)}`;

    const popup =
      window.open(url,"_blank");

    if(!popup)
      window.location.href=url;

  };

}


/* =========================================================
   TEMPS
========================================================= */

function getRemainingSeconds(order){

  if(!order.durationSeconds)
    return 0;

  const start =
    order.durationUpdatedAt?.seconds
      ? order.durationUpdatedAt.seconds * 1000
      : Date.now();

  const elapsed =
    Math.floor(
      (Date.now()-start)/1000
    );

  return Math.max(
    0,
    Number(order.durationSeconds)-elapsed
  );

}

function formatDuration(seconds){

  seconds =
    Math.max(0,Math.floor(seconds));

  const days =
    Math.floor(seconds/86400);

  seconds %= 86400;

  const hours =
    Math.floor(seconds/3600);

  seconds %= 3600;

  const minutes =
    Math.floor(seconds/60);

  const secs =
    seconds%60;

  if(days)
    return `${days}j ${hours}h ${minutes}m`;

  if(hours)
    return `${hours}h ${minutes}m ${secs}s`;

  return `${minutes}m ${String(secs).padStart(2,"0")}s`;

}


/* =========================================================
   SUIVI CLIENT
========================================================= */

function trackingHTML(order){

  const remaining =
    getRemainingSeconds(order);

  return `

    <div class="order-box">

      <strong>
        📦 Commande #${escapeHTML(order.id.slice(0,8))}
      </strong>

      <div style="margin:12px 0">

        <span class="order-status">
          ${escapeHTML(
            order.status ||
            "En cours de préparation"
          )}
        </span>

      </div>

      <div style="margin:10px 0">

        📍
        <strong>
          ${escapeHTML(
            order.trackingLocation ||
            DEFAULT_LOCATION
          )}
        </strong>

      </div>

      <div style="margin:10px 0">

        💳
        ${escapeHTML(
          order.paymentMethod ||
          "Non renseigné"
        )}

      </div>

      <div style="margin:10px 0">

        💰
        ${money(order.total)}

      </div>

      <div
        style="
          margin-top:15px;
          padding:12px;
          background:#07111f;
          border-radius:10px;
        "
      >

        ⏱️ Temps restant :

        <strong
          class="countdown"
          data-end-time="${Date.now()+remaining*1000}"
        >
          ${formatDuration(remaining)}
        </strong>

      </div>

    </div>

  `;

}

async function showMyOrders(){

  if(!currentUser){

    showAccount();
    return;

  }

  openModal(`
    <h2 class="section-title">
      📦 Mes commandes
    </h2>
    <div class="empty">
      Chargement...
    </div>
  `);

  try{

    const q =
      query(
        collection(db,"orders"),
        where(
          "userId",
          "==",
          currentUser.uid
        )
      );

    const snapshot =
      await getDocs(q);

    let orders =
      snapshot.docs.map(d=>({
        id:d.id,
        ...d.data()
      }));

    orders.sort((a,b)=>
      (b.createdAt?.seconds||0)-
      (a.createdAt?.seconds||0)
    );

    $("modalContent").innerHTML=`

      <h2 class="section-title">
        📦 Mes commandes
      </h2>

      ${
        orders.length
        ?
        orders.map(trackingHTML).join("")
        :
        `
        <div class="empty">
          Aucune commande.
        </div>
        `
      }

    `;

    startCountdowns();

  }catch(error){

    console.error(error);

    $("modalContent").innerHTML=`

      <h2 class="section-title">
        📦 Mes commandes
      </h2>

      <div class="error">
        ❌ Impossible de charger les commandes.
      </div>

    `;

  }

}


/* =========================================================
   DASHBOARD
========================================================= */

function showDashboard(){

  if(
    currentUser &&
    currentUser.email?.toLowerCase() ===
    ADMIN_EMAIL.toLowerCase()
  ){

    showAdminDashboard();
    return;

  }

  openModal(`

    <h2 class="section-title">
      ⚙️ Dashboard
    </h2>

    <div class="form">

      <input
        id="adminCode"
        type="password"
        placeholder="Code administrateur"
      >

      <button
        class="primary"
        id="adminAccess"
      >
        Accéder
      </button>

      <div id="adminError"></div>

    </div>

  `);

  $("adminAccess").onclick=()=>{

    if(
      $("adminCode").value ===
      ADMIN_CODE
    ){

      showAdminDashboard();

    }else{

      $("adminError").innerHTML=
        `<div class="error">❌ Code incorrect.</div>`;

    }

  };

}


/* =========================================================
   DASHBOARD COMMANDES
========================================================= */

async function showAdminDashboard(){

  openModal(`

    <h2 class="section-title">
      ⚙️ Dashboard Admin
    </h2>

    <div class="empty">
      Chargement des commandes...
    </div>

  `);

  try{

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );

    let orders =
      snapshot.docs.map(d=>({
        id:d.id,
        ...d.data()
      }));

    orders.sort((a,b)=>
      (b.createdAt?.seconds||0)-
      (a.createdAt?.seconds||0)
    );

    const revenue =
      orders
        .filter(x=>x.status==="Livrée")
        .reduce(
          (s,x)=>s+Number(x.total||0),
          0
        );

    $("modalContent").innerHTML=`

      <h2 class="section-title">
        ⚙️ Dashboard Admin
      </h2>

      <div class="admin-box">

        📦 Commandes

        <div class="admin-stat">
          ${orders.length}
        </div>

      </div>

      <div class="admin-box">

        💰 Commandes livrées

        <div class="admin-stat">
          ${money(revenue)}
        </div>

      </div>

      <h3 style="margin-top:25px">
        Gestion des commandes
      </h3>

      ${
        orders.length
        ?
        orders.map(adminOrderHTML).join("")
        :
        `
        <div class="empty">
          Aucune commande.
        </div>
        `
      }

    `;

    attachAdminEvents();

    startCountdowns();

  }catch(error){

    console.error(error);

    $("modalContent").innerHTML=`

      <h2 class="section-title">
        ⚙️ Dashboard Admin
      </h2>

      <div class="error">
        ❌ Impossible de charger les commandes.
      </div>

    `;

  }

}

function adminOrderHTML(order){

  const remaining =
    getRemainingSeconds(order);

  return `

    <div
      class="order-box"
      data-order-box="${order.id}"
    >

      <strong>
        📦 #${escapeHTML(order.id.slice(0,8))}
      </strong>

      <div style="margin:8px 0;color:#8e9bb0">
        ${escapeHTML(order.email || "Email inconnu")}
      </div>

      <div style="margin:8px 0">
        💰 <strong>${money(order.total)}</strong>
      </div>

      <div style="margin:8px 0">
        💳
        <strong>
          ${escapeHTML(
            order.paymentMethod || "Non renseigné"
          )}
        </strong>
      </div>

      <div
        style="
          margin:15px 0;
          padding:12px;
          background:#07111f;
          border-radius:10px;
        "
      >

        ⏱️ Temps restant :

        <strong
          class="countdown"
          data-end-time="${Date.now()+remaining*1000}"
        >
          ${formatDuration(remaining)}
        </strong>

      </div>

      <label style="display:block;margin-top:12px">
        📊 Statut
      </label>

      <select
        class="admin-status"
        data-id="${order.id}"
        style="width:100%;margin-top:6px"
      >

        ${ORDER_STATUSES.map(status=>`

          <option
            value="${escapeHTML(status)}"
            ${
              order.status===status
                ? "selected"
                : ""
            }
          >
            ${escapeHTML(status)}
          </option>

        `).join("")}

      </select>


      <label style="display:block;margin-top:12px">
        📍 Localisation du colis
      </label>

      <input
        class="admin-location"
        data-id="${order.id}"
        value="${escapeHTML(
          order.trackingLocation || ""
        )}"
        placeholder="Ex : Aéroport de Paris"
        style="
          width:100%;
          margin-top:6px;
          background:#0b1728;
          color:white;
          border:1px solid #1b2b46;
          padding:12px;
          border-radius:9px;
        "
      >


      <label style="display:block;margin-top:12px">
        ⏱️ Durée restante
      </label>

      <div
        style="
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:8px;
          margin-top:6px;
        "
      >

        <input
          class="admin-duration"
          data-id="${order.id}"
          type="number"
          min="0"
          value="${Math.ceil(remaining/60)}"
          placeholder="Durée"
          style="
            width:100%;
            background:#0b1728;
            color:white;
            border:1px solid #1b2b46;
            padding:12px;
            border-radius:9px;
          "
        >

        <select
          class="admin-duration-unit"
          data-id="${order.id}"
          style="width:100%"
        >

          <option value="60">Minutes</option>
          <option value="3600">Heures</option>
          <option value="86400">Jours</option>

        </select>

      </div>


      <button
        class="primary admin-save"
        data-id="${order.id}"
        style="width:100%;margin-top:15px"
      >
        💾 Enregistrer les modifications
      </button>

    </div>

  `;

}


/* =========================================================
   MODIFICATION ADMIN
========================================================= */

function attachAdminEvents(){

  document
    .querySelectorAll(".admin-save")
    .forEach(btn=>{

      btn.onclick =
        ()=>saveOrderChanges(btn.dataset.id);

    });

}

async function saveOrderChanges(orderId){

  const statusEl =
    document.querySelector(
      `.admin-status[data-id="${orderId}"]`
    );

  const locationEl =
    document.querySelector(
      `.admin-location[data-id="${orderId}"]`
    );

  const durationEl =
    document.querySelector(
      `.admin-duration[data-id="${orderId}"]`
    );

  const unitEl =
    document.querySelector(
      `.admin-duration-unit[data-id="${orderId}"]`
    );

  if(
    !statusEl ||
    !locationEl ||
    !durationEl ||
    !unitEl
  ){
    return;
  }

  const value =
    Math.max(
      0,
      Number(durationEl.value)||0
    );

  const multiplier =
    Number(unitEl.value)||60;

  const durationSeconds =
    value*multiplier;

  try{

    await updateDoc(
      doc(db,"orders",orderId),
      {

        status:
          statusEl.value,

        trackingLocation:
          locationEl.value.trim() ||
          DEFAULT_LOCATION,

        durationSeconds:

          durationSeconds,

        durationUpdatedAt:
          serverTimestamp()

      }
    );

    toast("Commande mise à jour ✅");

    showAdminDashboard();

  }catch(error){

    console.error(error);

    toast(
      "❌ Impossible de modifier la commande."
    );

  }

}


/* =========================================================
   COMPTE A REBOURS
========================================================= */

let countdownInterval = null;

function startCountdowns(){

  clearInterval(countdownInterval);

  countdownInterval =
    setInterval(()=>{

      document
        .querySelectorAll(".countdown")
        .forEach(el=>{

          const end =
            Number(
              el.dataset.endTime
            );

          const remaining =
            Math.max(
              0,
              Math.floor(
                (end-Date.now())/1000
              )
            );

          el.textContent =
            formatDuration(remaining);

        });

    },1000);

}


/* =========================================================
   EVENTS
========================================================= */

$("closeModal").onclick =
  closeModal;

$("modalBg").onclick=e=>{

  if(e.target === $("modalBg"))
    closeModal();

};

$("cartBtn").onclick =
  showCart;

$("favoritesBtn").onclick=()=>{

  const list =
    products.filter(
      p=>favorites.includes(p.id)
    );

  openModal(`

    <h2 class="section-title">
      ❤️ Favoris
    </h2>

    ${
      list.length
      ?
      `<div class="grid">
        ${list.map(productCard).join("")}
      </div>`
      :
      `<div class="empty">
        Aucun favori.
      </div>`
    }

  `);

  attachProductEvents();

};

$("accountBtn").onclick =
  showAccount;

$("dashboardBtn").onclick =
  showDashboard;

$("heroDashboard").onclick =
  showDashboard;

$("productsBtn").onclick=()=>{

  window.scrollTo({
    top:document.querySelector(".section-head").offsetTop-80,
    behavior:"smooth"
  });

};

$("searchInput").oninput =
  renderProducts;

$("sortSelect").onchange =
  renderProducts;


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user=>{
    currentUser=user;
  }
);


/* =========================================================
   START
========================================================= */

loadCart();
loadFavorites();

renderCategories();
renderProducts();
updateCartCount();

console.log("NovaShop chargé ✅");
console.log("Produits :",products.length);
