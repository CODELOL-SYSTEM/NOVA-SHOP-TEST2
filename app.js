// ============================================================
// NOVASHOP - APP.JS COMPLET
// PARTIE 1/2
// Firebase Auth + Firestore
// Produits + panier + comptes + commandes + admin
// Carte de test fictive générable depuis le dashboard
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
  appId:"1:1044964015809:web:4eafe48f8539e40",
  measurementId:"G-XNY5X2VMY9"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


// ============================================================
// CONFIG
// ============================================================

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";
const ADMIN_ACCESS_KEY = "novaAdminAuthorized";

const PAYPAL_BASE = "https://paypal.me/SH0PNOVA";

const FALLBACK_IMAGE =
  "https://placehold.co/800x800/111827/ffffff?text=NovaShop";

const TEST_CARD_KEY = "novaTestCard";


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


// ============================================================
// ÉTAT
// ============================================================

let currentUser = null;
let selectedCategory = "Tous";
let searchValue = "";
let sortValue = "default";
let cart = [];

try{

  cart = JSON.parse(
    localStorage.getItem("novaCart") || "[]"
  );

  if(!Array.isArray(cart)){
    cart=[];
  }

}catch{
  cart=[];
}


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
// UTILITAIRES
// ============================================================

function money(value){

  const number=Number(value)||0;

  if(number===0){
    return "Gratuit";
  }

  return number.toLocaleString("fr-FR",{
    style:"currency",
    currency:"EUR"
  });
}


function escapeHTML(value){

  return String(value??"")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}


function getProduct(id){

  return products.find(
    product=>product.id===id
  );
}


function randomRating(id){

  let hash=0;

  for(let i=0;i<id.length;i++){

    hash=
      ((hash<<5)-hash)+
      id.charCodeAt(i);

    hash|=0;
  }

  return Math.min(
    4.9,
    Number(
      (
        4.2+
        (Math.abs(hash)%9)/10
      ).toFixed(1)
    )
  );
}


function stars(rating){

  const rounded=Math.round(rating);

  return "★".repeat(rounded)+
    "☆".repeat(5-rounded);
}


function saveCart(){

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );
}


function getCartCount(){

  return cart.reduce(
    (total,item)=>
      total+Number(item.quantity||0),
    0
  );
}


function getCartSubtotal(){

  return cart.reduce(
    (total,item)=>{

      const product=
        getProduct(item.id);

      if(!product){
        return total;
      }

      return total+
        product.price*
        Number(item.quantity||0);

    },
    0
  );
}


// ============================================================
// CARTE DE TEST
// ============================================================

function getTestCard(){

  try{

    const card=
      JSON.parse(
        localStorage.getItem(TEST_CARD_KEY)||"null"
      );

    if(
      card&&
      card.number&&
      card.expiry&&
      card.cvv&&
      card.name
    ){
      return card;
    }

  }catch(error){

    console.warn(
      "Impossible de lire la carte de test.",
      error
    );
  }

  return null;
}


function saveTestCard(card){

  localStorage.setItem(
    TEST_CARD_KEY,
    JSON.stringify(card)
  );
}


function generateTestCard(){

  let number="";

  for(let i=0;i<4;i++){

    const block=
      String(
        Math.floor(
          1000+
          Math.random()*9000
        )
      );

    number+=
      block;
  }

  const month=
    String(
      Math.floor(
        1+
        Math.random()*12
      )
    ).padStart(2,"0");

  const year=
    String(
      new Date().getFullYear()+
      2+
      Math.floor(Math.random()*4)
    ).slice(-2);

  const cvv=
    String(
      Math.floor(
        100+
        Math.random()*900
      )
    );

  const card={
    number,
    expiry:`${month}/${year}`,
    cvv,
    name:"NOVASHOP TEST",
    type:"TEST",
    createdAt:new Date().toISOString()
  };

  saveTestCard(card);

  return card;
}


function maskCardNumber(number){

  const clean=
    String(number||"")
      .replace(/\D/g,"");

  if(clean.length<4){
    return "•••• •••• •••• ••••";
  }

  return `•••• •••• •••• ${clean.slice(-4)}`;
}


function formatCardNumber(value){

  return String(value||"")
    .replace(/\D/g,"")
    .slice(0,16)
    .replace(/(.{4})/g,"$1 ")
    .trim();
}


function validCardNumber(value){

  const number=
    String(value||"")
      .replace(/\D/g,"");

  return /^\d{16}$/.test(number);
}


function validExpiry(value){

  const match=
    String(value||"")
      .match(/^(\d{2})\/(\d{2})$/);

  if(!match){
    return false;
  }

  const month=
    Number(match[1]);

  return month>=1&&month<=12;
}


function validCVV(value){

  return /^\d{3,4}$/.test(
    String(value||"")
  );
}


// ============================================================
// TOAST
// ============================================================

function toast(message,type="normal"){

  if(!toastContainer){

    alert(message);

    return;
  }

  const item=
    document.createElement("div");

  item.className=
    `toast-item ${type}`;

  item.innerHTML=`
    <span>${escapeHTML(message)}</span>
    <button type="button">×</button>
  `;

  toastContainer.appendChild(item);

  item.querySelector("button")
    ?.addEventListener(
      "click",
      ()=>item.remove()
    );

  setTimeout(
    ()=>item.remove(),
    4000
  );
}


// ============================================================
// MODAL
// ============================================================

function showModal(title,html){

  if(!modal||!modalContent){
    return;
  }

  if(modalTitle){
    modalTitle.textContent=title;
  }

  modalContent.innerHTML=html;

  modal.classList.add("open");
  modal.style.display="flex";

  document.body.classList.add("modal-open");
}


function closeModal(){

  if(!modal){
    return;
  }

  modal.classList.remove("open");
  modal.style.display="";

  document.body.classList.remove("modal-open");
}


modalClose?.addEventListener(
  "click",
  closeModal
);


modal?.addEventListener(
  "click",
  event=>{

    if(event.target===modal){
      closeModal();
    }

  }
);


// ============================================================
// CATÉGORIES
// ============================================================

function renderCategories(){

  if(!categoriesEl){
    return;
  }

  const categories=[
    "Tous",
    ...new Set(
      products.map(
        product=>product.category
      )
    )
  ];

  categoriesEl.innerHTML=
    categories.map(category=>`

      <button
        type="button"
        class="category-btn ${
          selectedCategory===category
            ?"active"
            :""
        }"
        data-category="${escapeHTML(category)}"
      >
        ${escapeHTML(category)}
      </button>

    `).join("");
}


categoriesEl?.addEventListener(
  "click",
  event=>{

    const button=
      event.target.closest(
        "[data-category]"
      );

    if(!button){
      return;
    }

    selectedCategory=
      button.dataset.category||
      "Tous";

    renderCategories();
    renderProducts();
  }
);


// ============================================================
// PRODUITS
// ============================================================

function getFilteredProducts(){

  let list=[...products];

  if(selectedCategory!=="Tous"){

    list=list.filter(
      product=>
        product.category===
        selectedCategory
    );
  }

  if(searchValue.trim()){

    const search=
      searchValue
        .trim()
        .toLowerCase();

    list=list.filter(product=>
      product.name
        .toLowerCase()
        .includes(search)||
      product.category
        .toLowerCase()
        .includes(search)
    );
  }

  if(sortValue==="price-low"){

    list.sort(
      (a,b)=>a.price-b.price
    );

  }else if(sortValue==="price-high"){

    list.sort(
      (a,b)=>b.price-a.price
    );

  }else if(sortValue==="name"){

    list.sort(
      (a,b)=>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );

  }else if(sortValue==="new"){

    list.sort(
      (a,b)=>
        Number(Boolean(b.new))-
        Number(Boolean(a.new))
    );
  }

  return list;
}


function renderProducts(){

  if(!productsGrid){
    return;
  }

  const list=
    getFilteredProducts();

  if(productCount){

    productCount.textContent=
      `${list.length} produit${
        list.length>1?"s":""
      }`;
  }

  if(!list.length){

    productsGrid.innerHTML=`

      <div class="empty-products">

        <div style="font-size:42px">
          🔎
        </div>

        <h3>Aucun produit trouvé</h3>

        <p style="margin-top:8px">
          Essaie une autre recherche
          ou une autre catégorie.
        </p>

      </div>

    `;

    return;
  }

  productsGrid.innerHTML=
    list.map(product=>{

      const rating=
        randomRating(product.id);

      return `

        <article
          class="product"
          data-product-id="${product.id}"
        >

          <div class="product-img">

            ${
              product.new
                ? `<span class="new-badge">
                    NOUVEAU
                  </span>`
                :""
            }

            <img
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              onerror="
                this.onerror=null;
                this.src='${FALLBACK_IMAGE}'
              "
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
                ${stars(rating)}
              </span>

              <span>
                ${rating}
              </span>

            </div>

            <div class="price">
              ${money(product.price)}
            </div>

            <div class="product-actions">

              <button
                type="button"
                class="view-btn"
                data-action="view"
                data-id="${product.id}"
              >
                Voir
              </button>

              <button
                type="button"
                class="add-btn"
                data-action="add"
                data-id="${product.id}"
              >
                Ajouter
              </button>

            </div>

          </div>

        </article>

      `;

    }).join("");
}


productsGrid?.addEventListener(
  "click",
  event=>{

    const button=
      event.target.closest(
        "[data-action]"
      );

    if(!button){
      return;
    }

    const id=button.dataset.id;

    if(!id){
      return;
    }

    if(button.dataset.action==="add"){
      addToCart(id);
    }

    if(button.dataset.action==="view"){
      openProduct(id);
    }
  }
);


// ============================================================
// RECHERCHE / TRI
// ============================================================

searchInput?.addEventListener(
  "input",
  event=>{

    searchValue=
      event.target.value||"";

    renderProducts();
  }
);


sortSelect?.addEventListener(
  "change",
  event=>{

    sortValue=
      event.target.value||
      "default";

    renderProducts();
  }
);


// ============================================================
// AVIS PRODUIT
// ============================================================

function getReviews(product){

  const rating=
    randomRating(product.id);

  return [

    {
      name:"Lucas",
      rating,
      text:"Très bon produit, conforme à la description."
    },

    {
      name:"Maxime",
      rating:Math.max(4,rating-.1),
      text:"Bonne expérience et produit intéressant."
    },

    {
      name:"Enzo",
      rating:Math.min(5,rating+.1),
      text:"Je suis satisfait de mon achat."
    },

    {
      name:"Thomas",
      rating,
      text:"Bon rapport qualité/prix."
    }

  ];
}


function openProductReviews(id){

  const product=getProduct(id);

  if(!product){
    return;
  }

  const reviews=
    getReviews(product);

  showModal(
    `Avis - ${product.name}`,
    `

      <div>

        <div style="
          text-align:center;
          padding:15px;
          margin-bottom:15px;
          background:rgba(79,140,255,.08);
          border-radius:14px;
        ">

          <div class="stars" style="font-size:22px">
            ${stars(randomRating(product.id))}
          </div>

          <strong>
            ${randomRating(product.id)}/5
          </strong>

        </div>

        ${reviews.map(review=>`

          <div style="
            padding:15px;
            border-bottom:1px solid var(--line);
          ">

            <strong>
              ${escapeHTML(review.name)}
            </strong>

            <div class="rating">

              <span class="stars">
                ${stars(review.rating)}
              </span>

              ${review.rating}/5

            </div>

            <p style="
              color:var(--muted);
              margin-top:8px;
            ">
              ${escapeHTML(review.text)}
            </p>

          </div>

        `).join("")}

        <p style="
          margin-top:15px;
          opacity:.65;
          font-size:13px;
        ">
          Avis de démonstration NovaShop.
        </p>

      </div>

    `
  );
}


// ============================================================
// PRODUIT DÉTAIL
// ============================================================

function openProduct(id){

  const product=getProduct(id);

  if(!product){
    return;
  }

  const rating=
    randomRating(product.id);

  showModal(
    product.name,
    `

      <div class="product-detail">

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          onerror="
            this.onerror=null;
            this.src='${FALLBACK_IMAGE}'
          "
          style="
            width:100%;
            max-width:420px;
            height:380px;
            object-fit:contain;
            display:block;
            margin:0 auto 20px;
            background:#fff;
            border-radius:18px;
          "
        >

        <div class="product-cat">
          ${escapeHTML(product.category)}
        </div>

        <h2 style="margin-top:8px">
          ${escapeHTML(product.name)}
        </h2>

        <div class="rating">

          <span class="stars">
            ${stars(rating)}
          </span>

          ${rating}/5

        </div>

        <div
          class="price"
          style="font-size:28px"
        >
          ${money(product.price)}
        </div>

        <div style="
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
          margin-top:18px;
        ">

          <button
            type="button"
            class="add-btn"
            id="modalAddProduct"
          >
            Ajouter
          </button>

          <button
            type="button"
            class="view-btn"
            id="modalReviews"
          >
            ⭐ Avis
          </button>

        </div>

      </div>

    `
  );

  $("modalAddProduct")
    ?.addEventListener(
      "click",
      ()=>{

        addToCart(product.id);
        closeModal();

      }
    );

  $("modalReviews")
    ?.addEventListener(
      "click",
      ()=>{

        openProductReviews(product.id);

      }
    );
}


// ============================================================
// PANIER
// ============================================================

function addToCart(id,quantity=1){

  const product=getProduct(id);

  if(!product){
    return;
  }

  const existing=
    cart.find(
      item=>item.id===id
    );

  if(existing){

    existing.quantity+=quantity;

  }else{

    cart.push({
      id,
      quantity
    });
  }

  saveCart();
  renderCart();

  toast(
    `${product.name} ajouté au panier 🛒`,
    "success"
  );
}


function removeFromCart(id){

  const product=getProduct(id);

  cart=cart.filter(
    item=>item.id!==id
  );

  saveCart();
  renderCart();

  if(product){

    toast(
      `${product.name} retiré du panier`
    );
  }
}


function changeCartQuantity(
  id,
  amount
){

  const item=
    cart.find(
      item=>item.id===id
    );

  if(!item){
    return;
  }

  item.quantity+=amount;

  if(item.quantity<=0){

    removeFromCart(id);

    return;
  }

  saveCart();
  renderCart();
}


function renderCart(){

  const count=
    getCartCount();

  if(cartBadge){

    cartBadge.textContent=count;

    cartBadge.style.display=
      count>0
        ?"flex"
        :"none";
  }

  if(!cartItems){
    return;
  }

  if(!cart.length){

    cartItems.innerHTML=`

      <div class="empty-cart">

        <div style="font-size:50px">
          🛒
        </div>

        <h3>Ton panier est vide</h3>

        <p style="margin-top:8px">
          Ajoute des produits pour commencer.
        </p>

      </div>

    `;

  }else{

    cartItems.innerHTML=
      cart.map(item=>{

        const product=
          getProduct(item.id);

        if(!product){
          return "";
        }

        const quantity=
          Number(item.quantity||1);

        return `

          <div
            class="cart-item"
            data-cart-id="${product.id}"
          >

            <img
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(product.name)}"
              onerror="
                this.onerror=null;
                this.src='${FALLBACK_IMAGE}'
              "
            >

            <div class="cart-item-info">

              <strong>
                ${escapeHTML(product.name)}
              </strong>

              <span>
                ${money(product.price)}
              </span>

              <div class="cart-quantity">

                <button
                  type="button"
                  data-cart-action="minus"
                  data-id="${product.id}"
                >
                  −
                </button>

                <span>
                  ${quantity}
                </span>

                <button
                  type="button"
                  data-cart-action="plus"
                  data-id="${product.id}"
                >
                  +
                </button>

              </div>

            </div>

            <button
              type="button"
              class="remove-cart"
              data-cart-action="remove"
              data-id="${product.id}"
            >
              ×
            </button>

          </div>

        `;

      }).join("");
  }

  if(cartTotal){

    cartTotal.textContent=
      money(getCartSubtotal());
  }
}


cartItems?.addEventListener(
  "click",
  event=>{

    const button=
      event.target.closest(
        "[data-cart-action]"
      );

    if(!button){
      return;
    }

    const action=
      button.dataset.cartAction;

    const id=
      button.dataset.id;

    if(!id){
      return;
    }

    if(action==="plus"){
      changeCartQuantity(id,1);
    }

    if(action==="minus"){
      changeCartQuantity(id,-1);
    }

    if(action==="remove"){
      removeFromCart(id);
    }
  }
);


function openCart(){

  cartOverlay?.classList.add("open");
  cartDrawer?.classList.add("open");

  if(cartOverlay){
    cartOverlay.style.display="block";
  }
}


function closeCart(){

  cartOverlay?.classList.remove("open");
  cartDrawer?.classList.remove("open");

  if(cartOverlay){
    cartOverlay.style.display="";
  }
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
// AUTH ERRORS
// ============================================================

function authError(error){

  const code=error?.code||"";

  const errors={

    "auth/email-already-in-use":
      "Cette adresse e-mail possède déjà un compte.",

    "auth/invalid-email":
      "L'adresse e-mail n'est pas valide.",

    "auth/weak-password":
      "Le mot de passe est trop faible.",

    "auth/password-does-not-meet-requirements":
      "Le mot de passe ne respecte pas les exigences.",

    "auth/user-not-found":
      "Aucun compte ne correspond à cette adresse.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/invalid-credential":
      "E-mail ou mot de passe incorrect.",

    "auth/invalid-login-credentials":
      "E-mail ou mot de passe incorrect.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard.",

    "auth/network-request-failed":
      "Problème de connexion Internet.",

    "auth/operation-not-allowed":
      "La connexion e-mail/mot de passe n'est pas activée dans Firebase.",

    "auth/unauthorized-domain":
      "Ce domaine n'est pas autorisé dans Firebase Authentication.",

    "auth/invalid-api-key":
      "La clé API Firebase est invalide."
  };

  return errors[code]||
    `${error?.message||"Erreur inconnue."} (${code||"code inconnu"})`;
}


// ============================================================
// COMPTE
// ============================================================

function openAccount(){

  if(currentUser){

    const email=
      currentUser.email||"";

    const isAdmin=
      email.toLowerCase()===
      ADMIN_EMAIL.toLowerCase();

    showModal(
      "Mon compte",
      `

        <div style="text-align:center">

          <div style="font-size:50px">
            👤
          </div>

          <h3>
            ${escapeHTML(email)}
          </h3>

          <p style="
            color:var(--muted);
            margin:10px 0 20px;
          ">
            Ton compte NovaShop est connecté.
          </p>

          ${
            isAdmin
              ?`
                <div style="
                  padding:12px;
                  border-radius:12px;
                  background:rgba(255,170,0,.12);
                  margin-bottom:12px;
                ">
                  🛡️ Compte administrateur
                </div>
              `
              :""
          }

          <button
            type="button"
            class="add-btn"
            id="accountOrdersBtn"
            style="width:100%;margin-bottom:10px"
          >
            📦 Mes commandes
          </button>

          <button
            type="button"
            class="view-btn"
            id="logoutBtn"
            style="width:100%"
          >
            Se déconnecter
          </button>

        </div>

      `
    );

    $("accountOrdersBtn")
      ?.addEventListener(
        "click",
        ()=>{

          closeModal();
          openOrders();

        }
      );

    $("logoutBtn")
      ?.addEventListener(
        "click",
        async()=>{

          try{

            await signOut(auth);

            closeModal();

            toast(
              "Déconnexion réussie 👋",
              "success"
            );

          }catch(error){

            toast(
              authError(error),
              "error"
            );

          }

        }
      );

    return;
  }

  showLoginForm();
}


// ============================================================
// CONNEXION
// ============================================================

function showLoginForm(){

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
      async event=>{

        event.preventDefault();

        const email=
          $("loginEmail")
            ?.value.trim()||"";

        const password=
          $("loginPassword")
            ?.value||"";

        const errorBox=
          $("loginError");

        const submit=
          $("loginSubmit");

        if(submit){

          submit.disabled=true;

          submit.textContent=
            "Connexion...";
        }

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

          if(errorBox){

            errorBox.textContent=
              authError(error);

            errorBox.style.display=
              "block";
          }

        }finally{

          if(submit){

            submit.disabled=false;

            submit.textContent=
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

function showRegisterForm(){

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
      async event=>{

        event.preventDefault();

        const email=
          $("registerEmail")
            ?.value.trim()||"";

        const password=
          $("registerPassword")
            ?.value||"";

        const password2=
          $("registerPassword2")
            ?.value||"";

        const errorBox=
          $("registerError");

        if(password!==password2){

          if(errorBox){

            errorBox.textContent=
              "Les deux mots de passe sont différents.";

            errorBox.style.display=
              "block";
          }

          return;
        }

        const submit=
          $("registerSubmit");

        if(submit){

          submit.disabled=true;

          submit.textContent=
            "Création...";
        }

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

        }catch(error){

          if(errorBox){

            errorBox.textContent=
              authError(error);

            errorBox.style.display=
              "block";
          }

        }finally{

          if(submit){

            submit.disabled=false;

            submit.textContent=
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
// AUTH STATE
// ============================================================

onAuthStateChanged(
  auth,
  user=>{

    currentUser=user;

    if(accountBtn){

      if(user){

        const email=
          user.email||"";

        const username=
          email.split("@")[0]||
          "Compte";

        accountBtn.textContent=
          `👤 ${username}`;

      }else{

        accountBtn.textContent=
          "👤 Compte";
      }
    }

    if(adminBtn){

      const isAdmin=
        !!user&&
        (user.email||"").toLowerCase()===
        ADMIN_EMAIL.toLowerCase();

      adminBtn.style.display=
        isAdmin?"":"none";
    }
  }
);


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
        Chargement des commandes...
      </div>

      <div id="ordersList"></div>

    `
  );

  try{

    const ordersQuery=
      query(
        collection(db,"orders"),
        where(
          "userId",
          "==",
          currentUser.uid
        )
      );

    const snapshot=
      await getDocs(ordersQuery);

    const orders=[];

    snapshot.forEach(item=>{

      orders.push({
        id:item.id,
        ...item.data()
      });

    });

    orders.sort(
      (a,b)=>
        (b.createdAt?.seconds||0)-
        (a.createdAt?.seconds||0)
    );

    $("ordersLoading")?.remove();

    const list=
      $("ordersList");

    if(!list){
      return;
    }

    if(!orders.length){

      list.innerHTML=`

        <div style="
          text-align:center;
          padding:30px;
        ">

          <div style="font-size:50px">
            📦
          </div>

          <h3>
            Aucune commande
          </h3>

          <p style="
            color:var(--muted);
            margin-top:8px;
          ">
            Tu n'as pas encore passé
            de commande.
          </p>

        </div>

      `;

      return;
    }

    list.innerHTML=
      orders.map(order=>`

        <div
          class="order-card"
          style="
            padding:16px;
            margin-bottom:12px;
            border:1px solid var(--line);
            border-radius:16px;
          "
        >

          <div style="
            display:flex;
            justify-content:space-between;
            gap:10px;
          ">

            <strong>
              Commande #${escapeHTML(
                order.id.slice(0,8)
              )}
            </strong>

            <strong>
              ${money(order.total||0)}
            </strong>

          </div>

          <p style="
            margin:10px 0 12px;
            color:var(--muted);
          ">
            Statut :
            <strong style="color:var(--text)">
              ${escapeHTML(
                order.status||
                "Enregistrée"
              )}
            </strong>
          </p>

          <button
            type="button"
            class="view-btn"
            data-order-id="${escapeHTML(order.id)}"
          >
            Voir la commande
          </button>

        </div>

      `).join("");

    list.addEventListener(
      "click",
      event=>{

        const button=
          event.target.closest(
            "[data-order-id]"
          );

        if(!button){
          return;
        }

        const order=
          orders.find(
            item=>
              item.id===
              button.dataset.orderId
          );

        if(order){
          openOrderDetails(order);
        }
      }
    );

  }catch(error){

    console.error(error);

    const loading=
      $("ordersLoading");

    if(loading){

      loading.innerHTML=`
        <div style="color:#ff7777">
          Impossible de charger les commandes.
          <br><br>
          ${escapeHTML(
            error.message||""
          )}
        </div>
      `;
    }
  }
}// ============================================================
// NOVASHOP - APP.JS COMPLET
// PARTIE 2/2
// ============================================================


// ============================================================
// DÉTAIL COMMANDE
// ============================================================

function openOrderDetails(order){

  const items=
    Array.isArray(order.items)
      ?order.items
      :[];

  const status=
    order.status||
    "Enregistrée";

  const timeline=[
    "Enregistrée",
    "Acceptée",
    "Préparation",
    "En transit",
    "Livraison proche",
    "Livrée"
  ];

  const currentIndex=
    timeline.indexOf(status);

  const productsHTML=
    items.map(item=>{

      const product=
        getProduct(item.id);

      const name=
        product?.name||
        item.name||
        "Produit";

      const price=
        Number(
          product?.price??
          item.price??
          0
        );

      const quantity=
        Number(
          item.quantity||1
        );

      return `

        <div style="
          display:flex;
          justify-content:space-between;
          gap:12px;
          padding:10px 0;
          border-bottom:1px solid var(--line);
        ">

          <span>
            ${escapeHTML(name)}
            × ${quantity}
          </span>

          <strong>
            ${money(price*quantity)}
          </strong>

        </div>

      `;

    }).join("");

  const address=
    order.address||{};

  const hasStructuredAddress=
    typeof address==="object"&&
    !Array.isArray(address);

  const addressHTML=
    hasStructuredAddress
      ?`

        <div style="
          line-height:1.8;
          color:var(--muted);
        ">

          <div>
            ${escapeHTML(
              `${address.firstName||""} ${address.lastName||""}`.trim()
            )}
          </div>

          <div>
            ${escapeHTML(address.street||"")}
          </div>

          <div>
            ${escapeHTML(
              `${address.postalCode||""} ${address.city||""}`.trim()
            )}
          </div>

          <div>
            ${escapeHTML(address.country||"")}
          </div>

        </div>

      `
      :`

        <p style="
          color:var(--muted);
          line-height:1.7;
        ">
          ${escapeHTML(address||"")}
        </p>

      `;

  const timelineHTML=
    status==="Annulée"
      ?`
        <div style="
          padding:12px;
          border-radius:12px;
          background:rgba(255,60,60,.12);
          color:#ff7777;
        ">
          ❌ Commande annulée
        </div>
      `
      :
      timeline.map(
        (step,index)=>{

          const active=
            currentIndex>=index;

          return `

            <div class="
              timeline-step
              ${active?"active":""}
            ">

              <span>
                ${active?"●":"○"}
              </span>

              <span>
                ${step}
              </span>

            </div>

          `;
        }
      ).join("");

  showModal(
    `Commande #${order.id.slice(0,8)}`,
    `

      <div>

        <div style="
          padding:16px;
          border-radius:16px;
          background:rgba(80,120,255,.08);
          margin-bottom:18px;
        ">

          <strong>
            Statut :
            ${escapeHTML(status)}
          </strong>

          ${
            order.tracking
              ?`
                <div style="margin-top:8px">
                  📦 Suivi :
                  ${escapeHTML(order.tracking)}
                </div>
              `
              :""
          }

          ${
            order.city
              ?`
                <div style="margin-top:8px">
                  📍 Ville :
                  ${escapeHTML(order.city)}
                </div>
              `
              :""
          }

          ${
            order.estimatedDelivery
              ?`
                <div style="margin-top:8px">
                  🚚 Livraison estimée :
                  ${escapeHTML(
                    order.estimatedDelivery
                  )}
                </div>
              `
              :""
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

        <h3>
          Livraison
        </h3>

        <div style="
          padding:14px;
          margin:10px 0 20px;
          border-radius:14px;
          background:rgba(255,255,255,.04);
        ">
          ${addressHTML}
        </div>

        <div style="
          display:flex;
          justify-content:space-between;
          font-size:20px;
          padding-top:15px;
          border-top:1px solid var(--line);
        ">

          <strong>
            Total
          </strong>

          <strong>
            ${money(order.total||0)}
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
      ()=>printInvoice(order)
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

  const subtotal=
    getCartSubtotal();

  const testCard=
    getTestCard();

  showModal(
    "Finaliser la commande",
    `

      <form id="checkoutForm">

        <h3>
          📦 Adresse de livraison
        </h3>

        <div style="
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:12px;
          margin-top:12px;
        ">

          <div>
            <label for="checkoutFirstName">
              Prénom
            </label>

            <input
              id="checkoutFirstName"
              type="text"
              required
              placeholder="Prénom"
              autocomplete="given-name"
            >
          </div>

          <div>
            <label for="checkoutLastName">
              Nom
            </label>

            <input
              id="checkoutLastName"
              type="text"
              required
              placeholder="Nom"
              autocomplete="family-name"
            >
          </div>

          <div style="
            grid-column:1 / -1;
          ">

            <label for="checkoutStreet">
              Adresse
            </label>

            <input
              id="checkoutStreet"
              type="text"
              required
              placeholder="12 rue Exemple"
              autocomplete="street-address"
            >

          </div>

          <div>

            <label for="checkoutPostalCode">
              Code postal
            </label>

            <input
              id="checkoutPostalCode"
              type="text"
              required
              inputmode="numeric"
              maxlength="10"
              placeholder="59000"
              autocomplete="postal-code"
            >

          </div>

          <div>

            <label for="checkoutCity">
              Ville
            </label>

            <input
              id="checkoutCity"
              type="text"
              required
              placeholder="Lille"
              autocomplete="address-level2"
            >

          </div>

          <div style="
            grid-column:1 / -1;
          ">

            <label for="checkoutCountry">
              Pays
            </label>

            <input
              id="checkoutCountry"
              type="text"
              required
              value="France"
              autocomplete="country-name"
            >

          </div>

        </div>

        <div style="
          padding:15px;
          border-radius:14px;
          background:rgba(255,255,255,.05);
          margin:20px 0;
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
          💳 Mode de paiement
        </h3>

        <div style="
          display:grid;
          gap:10px;
          margin:12px 0;
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
          id="cardFields"
          style="
            display:none;
            margin-top:15px;
          "
        >

          <div style="
            padding:15px;
            border-radius:16px;
            background:linear-gradient(
              135deg,
              #111827,
              #172554
            );
            border:1px solid rgba(255,255,255,.12);
            margin-bottom:16px;
          ">

            <div style="
              display:flex;
              justify-content:space-between;
              align-items:center;
            ">

              <strong>
                NOVASHOP
              </strong>

              <span>
                💳
              </span>

            </div>

            <div
              id="cardPreviewNumber"
              style="
                font-size:20px;
                letter-spacing:2px;
                margin:25px 0 18px;
              "
            >
              ${testCard
                ?escapeHTML(
                  maskCardNumber(testCard.number)
                )
                :"•••• •••• •••• ••••"}
            </div>

            <div style="
              display:flex;
              justify-content:space-between;
              font-size:12px;
            ">

              <div>

                <div style="opacity:.6">
                  TITULAIRE
                </div>

                <strong id="cardPreviewName">
                  ${testCard
                    ?escapeHTML(testCard.name)
                    :"NOM TITULAIRE"}
                </strong>

              </div>

              <div>

                <div style="opacity:.6">
                  EXP
                </div>

                <strong id="cardPreviewExpiry">
                  ${testCard
                    ?escapeHTML(testCard.expiry)
                    :"MM/AA"}
                </strong>

              </div>

            </div>

          </div>

          <label for="checkoutCardNumber">
            Numéro de carte
          </label>

          <input
            id="checkoutCardNumber"
            type="text"
            inputmode="numeric"
            autocomplete="cc-number"
            maxlength="19"
            placeholder="0000 0000 0000 0000"
            value="${
              testCard
                ?escapeHTML(
                  formatCardNumber(testCard.number)
                )
                :""
            }"
          >

          <label
            for="checkoutCardName"
            style="margin-top:12px"
          >
            Nom sur la carte
          </label>

          <input
            id="checkoutCardName"
            type="text"
            autocomplete="cc-name"
            placeholder="NOM TITULAIRE"
            value="${
              testCard
                ?escapeHTML(testCard.name)
                :""
            }"
          >

          <div style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:12px;
            margin-top:12px;
          ">

            <div>

              <label for="checkoutCardExpiry">
                Expiration
              </label>

              <input
                id="checkoutCardExpiry"
                type="text"
                inputmode="numeric"
                autocomplete="cc-exp"
                maxlength="5"
                placeholder="MM/AA"
                value="${
                  testCard
                    ?escapeHTML(testCard.expiry)
                    :""
                }"
              >

            </div>

            <div>

              <label for="checkoutCardCVV">
                CVV
              </label>

              <input
                id="checkoutCardCVV"
                type="password"
                inputmode="numeric"
                autocomplete="cc-csc"
                maxlength="4"
                placeholder="•••"
                value="${
                  testCard
                    ?escapeHTML(testCard.cvv)
                    :""
                }"
              >

            </div>

          </div>

          <div style="
            margin-top:12px;
            padding:10px 12px;
            border-radius:10px;
            background:rgba(80,120,255,.08);
            font-size:12px;
            color:var(--muted);
          ">
            🔒 Les données de carte saisies ici
            ne sont pas enregistrées dans la commande.
          </div>

        </div>

        <div
          id="paymentInfo"
          style="margin:12px 0"
        ></div>

        <button
          type="submit"
          class="add-btn"
          id="checkoutSubmit"
          style="width:100%"
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

  let paymentMethod="";

  const subtotalEl=
    $("checkoutSubtotal");

  const finalEl=
    $("checkoutFinal");


  function updateCheckout(){

    const currentSubtotal=
      getCartSubtotal();

    if(subtotalEl){

      subtotalEl.textContent=
        money(currentSubtotal);
    }

    if(finalEl){

      finalEl.textContent=
        money(currentSubtotal);
    }
  }


  updateCheckout();


  const cardNumberInput=
    $("checkoutCardNumber");

  const cardNameInput=
    $("checkoutCardName");

  const cardExpiryInput=
    $("checkoutCardExpiry");

  const cardCVVInput=
    $("checkoutCardCVV");


  cardNumberInput?.addEventListener(
    "input",
    event=>{

      const formatted=
        formatCardNumber(
          event.target.value
        );

      event.target.value=
        formatted;

      const preview=
        $("cardPreviewNumber");

      if(preview){

        preview.textContent=
          formatted||
          "•••• •••• •••• ••••";
      }
    }
  );


  cardNameInput?.addEventListener(
    "input",
    event=>{

      const preview=
        $("cardPreviewName");

      if(preview){

        preview.textContent=
          event.target.value
            .toUpperCase()||
          "NOM TITULAIRE";
      }
    }
  );


  cardExpiryInput?.addEventListener(
    "input",
    event=>{

      let value=
        event.target.value
          .replace(/\D/g,"")
          .slice(0,4);

      if(value.length>2){

        value=
          `${value.slice(0,2)}/${value.slice(2)}`;
      }

      event.target.value=value;

      const preview=
        $("cardPreviewExpiry");

      if(preview){

        preview.textContent=
          value||
          "MM/AA";
      }
    }
  );


  cardCVVInput?.addEventListener(
    "input",
    event=>{

      event.target.value=
        event.target.value
          .replace(/\D/g,"")
          .slice(0,4);
    }
  );


  document
    .querySelectorAll(
      ".payment-choice"
    )
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{

          paymentMethod=
            button.dataset.payment||
            "";

          $("paymentMethod").value=
            paymentMethod;

          document
            .querySelectorAll(
              ".payment-choice"
            )
            .forEach(item=>
              item.classList.remove(
                "selected"
              )
            );

          button.classList.add(
            "selected"
          );

          const info=
            $("paymentInfo");

          const cardFields=
            $("cardFields");

          if(paymentMethod==="paypal"){

            if(cardFields){
              cardFields.style.display="none";
            }

            if(info){

              info.innerHTML=`
                <div style="
                  padding:12px;
                  border-radius:12px;
                  background:rgba(60,130,255,.1);
                ">
                  🅿️ Tu seras redirigé vers
                  PayPal pour effectuer le paiement.
                </div>
              `;
            }

          }else{

            if(cardFields){
              cardFields.style.display="block";
            }

            if(info){

              info.innerHTML=`
                <div style="
                  padding:12px;
                  border-radius:12px;
                  background:rgba(80,120,255,.08);
                ">
                  💳 Entre les informations de ta carte
                  pour continuer.
                </div>
              `;
            }
          }
        }
      );
    });


  $("checkoutForm")
    ?.addEventListener(
      "submit",
      async event=>{

        event.preventDefault();

        const firstName=
          $("checkoutFirstName")
            ?.value.trim()||"";

        const lastName=
          $("checkoutLastName")
            ?.value.trim()||"";

        const street=
          $("checkoutStreet")
            ?.value.trim()||"";

        const postalCode=
          $("checkoutPostalCode")
            ?.value.trim()||"";

        const city=
          $("checkoutCity")
            ?.value.trim()||"";

        const country=
          $("checkoutCountry")
            ?.value.trim()||"";

        const errorBox=
          $("checkoutError");


        if(
          !firstName||
          !lastName||
          !street||
          !postalCode||
          !city||
          !country
        ){

          errorBox.textContent=
            "Remplis tous les champs de livraison.";

          errorBox.style.display=
            "block";

          return;
        }


        if(!paymentMethod){

          errorBox.textContent=
            "Choisis un moyen de paiement.";

          errorBox.style.display=
            "block";

          return;
        }


        if(paymentMethod==="card"){

          const cardNumber=
            $("checkoutCardNumber")
              ?.value.trim()||"";

          const cardName=
            $("checkoutCardName")
              ?.value.trim()||"";

          const cardExpiry=
            $("checkoutCardExpiry")
              ?.value.trim()||"";

          const cardCVV=
            $("checkoutCardCVV")
              ?.value.trim()||"";


          if(!validCardNumber(cardNumber)){

            errorBox.textContent=
              "Le numéro de carte doit contenir 16 chiffres.";

            errorBox.style.display=
              "block";

            return;
          }


          if(!cardName){

            errorBox.textContent=
              "Indique le nom présent sur la carte.";

            errorBox.style.display=
              "block";

            return;
          }


          if(!validExpiry(cardExpiry)){

            errorBox.textContent=
              "Indique une expiration valide au format MM/AA.";

            errorBox.style.display=
              "block";

            return;
          }


          if(!validCVV(cardCVV)){

            errorBox.textContent=
              "Le CVV doit contenir 3 ou 4 chiffres.";

            errorBox.style.display=
              "block";

            return;
          }
        }


        const submit=
          $("checkoutSubmit");

        if(submit){

          submit.disabled=true;

          submit.textContent=
            "Création...";
        }


        try{

          const subtotal=
            getCartSubtotal();

          const total=
            subtotal;


          const orderItems=
            cart.map(item=>{

              const product=
                getProduct(item.id);

              return {

                id:item.id,

                name:
                  product?.name||
                  "Produit",

                price:
                  product?.price||
                  0,

                quantity:
                  Number(
                    item.quantity||1
                  ),

                image:
                  product?.image||
                  ""
              };
            });


          const orderData={

            userId:
              currentUser.uid,

            userEmail:
              currentUser.email||"",

            items:
              orderItems,

            subtotal,

            total,

            address:{

              firstName,

              lastName,

              street,

              postalCode,

              city,

              country

            },

            status:
              "Enregistrée",

            paymentMethod,

            paymentStatus:
              "En attente",

            tracking:"",

            city,

            estimatedDelivery:"",

            createdAt:
              serverTimestamp()
          };


          const orderRef=
            await addDoc(
              collection(db,"orders"),
              orderData
            );


          cart=[];

          saveCart();
          renderCart();
          closeModal();


          toast(
            `Commande #${orderRef.id.slice(0,8)} créée 🎉`,
            "success"
          );


          if(
            paymentMethod==="paypal"&&
            total>0
          ){

            const paypalUrl=
              `${PAYPAL_BASE}/${
                encodeURIComponent(
                  total.toFixed(2)
                )
              }EUR`;

            setTimeout(
              ()=>{

                window.open(
                  paypalUrl,
                  "_blank",
                  "noopener,noreferrer"
                );

              },
              400
            );

          }else if(
            paymentMethod==="card"&&
            total>0
          ){

            showModal(
              "Paiement CB",
              `

                <div style="
                  text-align:center;
                  padding:20px;
                ">

                  <div style="
                    font-size:60px
                  ">
                    💳
                  </div>

                  <h3>
                    Paiement accepté
                  </h3>

                  <p style="
                    margin:15px 0;
                    color:var(--muted);
                  ">
                    Ta commande a été enregistrée.
                  </p>

                  <p style="
                    opacity:.7;
                    font-size:13px;
                  ">
                    Les informations de carte
                    n'ont pas été enregistrées
                    dans la commande.
                  </p>

                  <button
                    type="button"
                    class="add-btn"
                    id="closePayment"
                    style="
                      width:100%;
                      margin-top:15px;
                    "
                  >
                    Fermer
                  </button>

                </div>

              `
            );

            $("closePayment")
              ?.addEventListener(
                "click",
                closeModal
              );
          }

        }catch(error){

          console.error(
            "Checkout error:",
            error
          );

          errorBox.textContent=
            `Erreur : ${
              error.message||
              error.code||
              "inconnue"
            }`;

          errorBox.style.display=
            "block";

        }finally{

          if(submit){

            submit.disabled=false;

            submit.textContent=
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

  const items=
    Array.isArray(order.items)
      ?order.items
      :[];

  const rows=
    items.map(item=>{

      const product=
        getProduct(item.id);

      const name=
        product?.name||
        item.name||
        "Produit";

      const price=
        Number(
          product?.price??
          item.price??
          0
        );

      const quantity=
        Number(
          item.quantity||1
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
            ${money(price*quantity)}
          </td>

        </tr>
      `;

    }).join("");


  const address=
    order.address||{};

  const addressText=
    typeof address==="object"
      ?`
        ${escapeHTML(
          `${address.firstName||""} ${address.lastName||""}`.trim()
        )}<br>
        ${escapeHTML(address.street||"")}<br>
        ${escapeHTML(
          `${address.postalCode||""} ${address.city||""}`.trim()
        )}<br>
        ${escapeHTML(address.country||"")}
      `
      :escapeHTML(address);


  const invoiceWindow=
    window.open(
      "",
      "_blank",
      "width=900,height=700"
    );

  if(!invoiceWindow){

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

        body{
          font-family:Arial,sans-serif;
          padding:40px;
          color:#111827;
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

        th,td{
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

      <p>
        ${escapeHTML(order.userEmail||"")}
      </p>

      <h3>
        Livraison
      </h3>

      <p>
        ${addressText}
      </p>

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
        ${money(order.total||0)}

      </div>

      <p style="margin-top:30px;color:#666">

        Statut :
        ${escapeHTML(
          order.status||
          "Enregistrée"
        )}

      </p>

      <script>

        window.onload=function(){
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

  return !!currentUser&&
    (currentUser.email||"")
      .toLowerCase()===
    ADMIN_EMAIL.toLowerCase();
}


function openAdmin(){

  if(!isAdminUser()){

    toast(
      "Accès administrateur refusé.",
      "error"
    );

    return;
  }

  const authorized=
    localStorage.getItem(
      ADMIN_ACCESS_KEY
    )==="true";

  if(!authorized){

    const code=
      prompt(
        "Code administrateur NovaShop :"
      );

    if(code!==ADMIN_CODE){

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

    const snapshot=
      await getDocs(
        collection(db,"orders")
      );

    const orders=[];

    snapshot.forEach(item=>{

      orders.push({
        id:item.id,
        ...item.data()
      });

    });

    orders.sort(
      (a,b)=>
        (b.createdAt?.seconds||0)-
        (a.createdAt?.seconds||0)
    );

    renderAdmin(orders);

  }catch(error){

    console.error(error);

    $("adminLoading").innerHTML=`

      <div style="color:#ff7777">

        Erreur Firestore :
        ${escapeHTML(
          error.message||""
        )}

      </div>

    `;
  }
}


// ============================================================
// ADMIN - CARTE DE TEST
// ============================================================

function renderTestCardAdmin(){

  const card=
    getTestCard();

  if(!card){

    return `

      <div style="
        padding:16px;
        border-radius:16px;
        border:1px solid var(--line);
        background:rgba(255,255,255,.03);
        margin-bottom:20px;
      ">

        <h3>
          💳 Carte de test NovaShop
        </h3>

        <p style="
          color:var(--muted);
          margin:8px 0 14px;
        ">
          Génère une carte fictive pour tester
          l'interface de paiement.
        </p>

        <button
          type="button"
          class="add-btn"
          id="generateTestCard"
        >
          💳 Générer une carte
        </button>

      </div>

    `;
  }


  return `

    <div style="
      padding:16px;
      border-radius:16px;
      border:1px solid var(--line);
      background:rgba(255,255,255,.03);
      margin-bottom:20px;
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:10px;
      ">

        <div>

          <h3>
            💳 Carte de test NovaShop
          </h3>

          <p style="
            color:var(--muted);
            margin-top:5px;
          ">
            Carte fictive non utilisable.
          </p>

        </div>

        <span style="
          padding:5px 9px;
          border-radius:8px;
          background:rgba(80,120,255,.15);
          font-size:11px;
        ">
          TEST
        </span>

      </div>

      <div style="
        margin-top:15px;
        padding:20px;
        border-radius:18px;
        background:
          linear-gradient(
            135deg,
            #111827,
            #172554,
            #0f172a
          );
        border:1px solid rgba(255,255,255,.12);
        box-shadow:0 15px 35px rgba(0,0,0,.25);
      ">

        <div style="
          display:flex;
          justify-content:space-between;
        ">

          <strong>
            NOVASHOP
          </strong>

          <span>
            💳
          </span>

        </div>

        <div style="
          margin:28px 0 20px;
          font-size:21px;
          letter-spacing:3px;
        ">
          ${escapeHTML(
            formatCardNumber(card.number)
          )}
        </div>

        <div style="
          display:flex;
          justify-content:space-between;
          font-size:12px;
        ">

          <div>

            <div style="opacity:.55">
              TITULAIRE
            </div>

            <strong>
              ${escapeHTML(card.name)}
            </strong>

          </div>

          <div>

            <div style="opacity:.55">
              EXP
            </div>

            <strong>
              ${escapeHTML(card.expiry)}
            </strong>

          </div>

          <div>

            <div style="opacity:.55">
              CVV
            </div>

            <strong>
              ${escapeHTML(card.cvv)}
            </strong>

          </div>

        </div>

      </div>

      <div style="
        display:flex;
        gap:8px;
        flex-wrap:wrap;
        margin-top:12px;
      ">

        <button
          type="button"
          class="add-btn"
          id="generateTestCard"
        >
          🔄 Générer une nouvelle carte
        </button>

        <button
          type="button"
          class="view-btn"
          id="copyTestCard"
        >
          📋 Copier
        </button>

      </div>

    </div>

  `;
}


function setupTestCardAdmin(){

  $("generateTestCard")
    ?.addEventListener(
      "click",
      ()=>{

        const card=
          generateTestCard();

        toast(
          "Nouvelle carte de test générée 💳",
          "success"
        );

        renderAdminAfterCardChange();

      }
    );


  $("copyTestCard")
    ?.addEventListener(
      "click",
      async()=>{

        const card=
          getTestCard();

        if(!card){
          return;
        }

        const text=
          `Numéro : ${formatCardNumber(card.number)}
Expiration : ${card.expiry}
CVV : ${card.cvv}
Titulaire : ${card.name}`;

        try{

          await navigator.clipboard.writeText(
            text
          );

          toast(
            "Informations copiées 📋",
            "success"
          );

        }catch{

          toast(
            text
          );
        }
      }
    );
}


async function renderAdminAfterCardChange(){

  try{

    const snapshot=
      await getDocs(
        collection(db,"orders")
      );

    const orders=[];

    snapshot.forEach(item=>{

      orders.push({
        id:item.id,
        ...item.data()
      });

    });

    orders.sort(
      (a,b)=>
        (b.createdAt?.seconds||0)-
        (a.createdAt?.seconds||0)
    );

    renderAdmin(orders);

  }catch(error){

    console.error(error);

    toast(
      `Erreur : ${
        error.message||
        "Impossible d'actualiser."
      }`,
      "error"
    );
  }
}


function renderAdmin(orders){

  $("adminLoading")?.remove();

  const content=
    $("adminContent");

  if(!content){
    return;
  }

  const statuses=[
    "Enregistrée",
    "Acceptée",
    "Préparation",
    "En transit",
    "Livraison proche",
    "Livrée",
    "Annulée",
    "Remboursement en cours"
  ];

  content.innerHTML=`

    ${renderTestCardAdmin()}

    <div style="
      padding:15px;
      margin-bottom:18px;
      border-radius:16px;
      background:rgba(80,120,255,.08);
    ">

      <strong>
        🛡️ Administration
      </strong>

      <p style="margin-top:6px">

        ${orders.length}
        commande${orders.length>1?"s":""}

      </p>

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
          ?
          orders.map(order=>{

            const items=
              Array.isArray(order.items)
                ?order.items
                :[];

            const productsText=
              items.map(
                item=>
                  `${item.name||item.id} ×${
                    item.quantity||1
                  }`
              ).join(", ");

            const address=
              order.address||{};

            const structured=
              typeof address==="object"&&
              !Array.isArray(address);

            const firstName=
              structured
                ?address.firstName||""
                :"";

            const lastName=
              structured
                ?address.lastName||""
                :"";

            const street=
              structured
                ?address.street||""
                :"";

            const postalCode=
              structured
                ?address.postalCode||""
                :"";

            const city=
              structured
                ?address.city||order.city||""
                :order.city||"";

            const country=
              structured
                ?address.country||""
                :"";


            return `

              <div
                class="admin-order"
                style="
                  padding:16px;
                  margin-bottom:15px;
                  border:1px solid var(--line);
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
                    ${money(order.total||0)}
                  </strong>

                </div>

                <p style="margin:8px 0">

                  👤 ${
                    escapeHTML(
                      order.userEmail||
                      "Inconnu"
                    )
                  }

                </p>

                <p style="margin:8px 0">

                  💳 ${
                    escapeHTML(
                      order.paymentMethod||
                      "N/A"
                    )
                  }

                  |

                  ${
                    escapeHTML(
                      order.paymentStatus||
                      "En attente"
                    )
                  }

                </p>

                <p style="
                  margin:8px 0;
                  opacity:.75;
                ">

                  ${escapeHTML(productsText)}

                </p>


                <div style="
                  margin:14px 0;
                  padding:14px;
                  border-radius:14px;
                  background:rgba(255,255,255,.04);
                ">

                  <strong>
                    📦 Adresse de livraison
                  </strong>

                  ${
                    structured
                      ?`

                        <div style="
                          margin-top:9px;
                          line-height:1.7;
                          color:var(--muted);
                        ">

                          <div>
                            ${escapeHTML(
                              `${firstName} ${lastName}`.trim()
                            )}
                          </div>

                          <div>
                            ${escapeHTML(street)}
                          </div>

                          <div>
                            ${escapeHTML(
                              `${postalCode} ${city}`.trim()
                            )}
                          </div>

                          <div>
                            ${escapeHTML(country)}
                          </div>

                        </div>

                      `
                      :`

                        <div style="
                          margin-top:9px;
                          color:var(--muted);
                        ">
                          ${escapeHTML(
                            order.address||""
                          )}
                        </div>

                      `
                  }

                </div>


                <label>
                  Statut
                </label>

                <select
                  class="admin-status"
                  data-id="${escapeHTML(order.id)}"
                  style="
                    width:100%;
                    margin:6px 0 10px;
                  "
                >

                  ${
                    statuses.map(status=>`

                      <option
                        value="${escapeHTML(status)}"
                        ${
                          order.status===status
                            ?"selected"
                            :""
                        }
                      >
                        ${escapeHTML(status)}
                      </option>

                    `).join("")
                  }

                </select>


                <input
                  class="input admin-city"
                  data-id="${escapeHTML(order.id)}"
                  value="${escapeHTML(order.city||city||"")}"
                  placeholder="Ville de livraison"
                  style="margin-bottom:8px"
                >

                <input
                  class="input admin-tracking"
                  data-id="${escapeHTML(order.id)}"
                  value="${escapeHTML(order.tracking||"")}"
                  placeholder="Numéro de suivi"
                  style="margin-bottom:8px"
                >

                <input
                  class="input admin-delivery"
                  data-id="${escapeHTML(order.id)}"
                  value="${escapeHTML(order.estimatedDelivery||"")}"
                  placeholder="Livraison estimée"
                  style="margin-bottom:10px"
                >


                <div style="
                  display:flex;
                  gap:8px;
                  flex-wrap:wrap;
                ">

                  <button
                    type="button"
                    class="add-btn admin-save"
                    data-id="${escapeHTML(order.id)}"
                  >
                    💾 Enregistrer
                  </button>

                  <button
                    type="button"
                    class="view-btn admin-paid"
                    data-id="${escapeHTML(order.id)}"
                  >
                    💰 Marquer payé
                  </button>

                  <button
                    type="button"
                    class="view-btn admin-invoice"
                    data-id="${escapeHTML(order.id)}"
                  >
                    🧾 Facture
                  </button>

                  <button
                    type="button"
                    class="view-btn admin-delete"
                    data-id="${escapeHTML(order.id)}"
                    style="color:#ff7777"
                  >
                    🗑️ Supprimer
                  </button>

                </div>

              </div>

            `;

          }).join("")
          :
          `

            <div style="
              text-align:center;
              padding:30px;
            ">

              <div style="font-size:50px">
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


  setupTestCardAdmin();


  $("adminRefresh")
    ?.addEventListener(
      "click",
      loadAdmin
    );


  $("adminLogout")
    ?.addEventListener(
      "click",
      ()=>{

        localStorage.removeItem(
          ADMIN_ACCESS_KEY
        );

        closeModal();

        toast(
          "Mode admin fermé."
        );

      }
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
    .querySelectorAll(".admin-invoice")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{

          const order=
            orders.find(
              item=>
                item.id===
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
// SAUVEGARDE ADMIN
// ============================================================

async function saveAdminOrder(id){

  try{

    const status=
      document.querySelector(
        `.admin-status[data-id="${CSS.escape(id)}"]`
      )?.value||
      "Enregistrée";

    const city=
      document.querySelector(
        `.admin-city[data-id="${CSS.escape(id)}"]`
      )?.value||"";

    const tracking=
      document.querySelector(
        `.admin-tracking[data-id="${CSS.escape(id)}"]`
      )?.value||"";

    const estimatedDelivery=
      document.querySelector(
        `.admin-delivery[data-id="${CSS.escape(id)}"]`
      )?.value||"";


    await updateDoc(
      doc(db,"orders",id),
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


    loadAdmin();

  }catch(error){

    toast(
      `Erreur : ${
        error.message||
        error.code||
        "inconnue"
      }`,
      "error"
    );
  }
}


// ============================================================
// MARQUER PAYÉ
// ============================================================

async function markOrderPaid(id){

  try{

    await updateDoc(
      doc(db,"orders",id),
      {
        paymentStatus:"Payé"
      }
    );

    toast(
      "Paiement marqué comme payé 💰",
      "success"
    );

    loadAdmin();

  }catch(error){

    toast(
      `Erreur : ${
        error.message||
        error.code||
        "inconnue"
      }`,
      "error"
    );
  }
}


// ============================================================
// SUPPRIMER COMMANDE
// ============================================================

async function deleteAdminOrder(id){

  const confirmed=
    confirm(
      "Supprimer définitivement cette commande ?"
    );

  if(!confirmed){
    return;
  }

  try{

    await deleteDoc(
      doc(db,"orders",id)
    );

    toast(
      "Commande supprimée 🗑️",
      "success"
    );

    loadAdmin();

  }catch(error){

    toast(
      `Erreur : ${
        error.message||
        error.code||
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

  return localStorage.getItem(
    "novaThemeChoice"
  )||"dark";
}


function applyTheme(){

  const theme=getTheme();

  if(theme==="light"){

    document.documentElement.dataset.theme=
      "light";

  }else if(theme==="dark"){

    document.documentElement.dataset.theme=
      "dark";

  }else{

    const prefersDark=
      window.matchMedia?.(
        "(prefers-color-scheme: dark)"
      ).matches;

    document.documentElement.dataset.theme=
      prefersDark
        ?"dark"
        :"light";
  }
}


function openSettings(){

  const current=
    getTheme();

  showModal(
    "Paramètres",
    `

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
        color:var(--muted);
      ">

        Thème actuel :
        ${escapeHTML(current)}

      </p>

    `
  );

  document
    .querySelectorAll(
      ".theme-choice"
    )
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{

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
  event=>{

    if(event.key!=="Escape"){
      return;
    }

    closeModal();
    closeCart();

  }
);


// ============================================================
// ERREURS FIREBASE
// ============================================================

window.addEventListener(
  "unhandledrejection",
  event=>{

    const error=
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
// API NOVASHOP
// ============================================================

window.NovaShop={

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
  openProductReviews,

  openAccount,
  openOrders,

  openSettings,

  renderProducts,
  renderCart,

  getCartCount,
  getCartSubtotal,

  getTestCard,
  generateTestCard,

  money
};


console.log(
  "NovaShop chargé avec succès 🚀"
);
