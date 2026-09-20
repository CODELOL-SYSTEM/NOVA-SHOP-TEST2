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
  doc,
  serverTimestamp
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

const PAYPAL_BASE = "https://paypal.me/SH0PNOVA";


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
let currentCategory = "Tous";
let currentSort = "default";
let currentUser = null;
let countdownTimer = null;


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


/* =========================================================
   DOM
========================================================= */

const $ = id => document.getElementById(id);

const modalBg = $("modalBg");
const modalContent = $("modalContent");
const toast = $("toast");


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message){

  clearTimeout(toastTimer);

  toast.textContent = message;
  toast.classList.add("show");

  toastTimer = setTimeout(()=>{
    toast.classList.remove("show");
  },3000);
}


/* =========================================================
   MODAL
========================================================= */

function openModal(html){

  modalContent.innerHTML = html;
  modalBg.classList.add("show");

  setTimeout(()=>{
    document.querySelector(".modal input")?.focus();
  },100);
}

function closeModal(){
  modalBg.classList.remove("show");
}

$("closeModal").addEventListener("click",closeModal);

modalBg.addEventListener("click",e=>{
  if(e.target === modalBg) closeModal();
});

document.addEventListener("keydown",e=>{
  if(e.key === "Escape") closeModal();
});


/* =========================================================
   LOCAL STORAGE
========================================================= */

function loadLocal(){

  try{
    const savedCart = JSON.parse(localStorage.getItem("novaCart") || "[]");

    cart = Array.isArray(savedCart)
      ? savedCart
          .map(item=>{
            const product = products.find(p=>p.id===item.id);
            if(!product) return null;

            return {
              id:product.id,
              qty:Math.max(1,Number(item.qty)||1)
            };
          })
          .filter(Boolean)
      : [];

  }catch{
    cart=[];
  }

  try{
    const savedFav = JSON.parse(localStorage.getItem("novaFavorites") || "[]");

    favorites = Array.isArray(savedFav)
      ? savedFav.filter(id=>products.some(p=>p.id===id))
      : [];

  }catch{
    favorites=[];
  }

  saveLocal();
}

function saveLocal(){

  localStorage.setItem("novaCart",JSON.stringify(cart));
  localStorage.setItem("novaFavorites",JSON.stringify(favorites));
}


/* =========================================================
   CART
========================================================= */

function cartCount(){

  return cart.reduce((sum,item)=>{
    return sum + Math.max(0,Number(item.qty)||0);
  },0);

}

function updateCartCount(){

  $("cartCount").textContent = cartCount();

}

function addToCart(id){

  const product = products.find(p=>p.id===id);

  if(!product){
    showToast("Produit introuvable.");
    return;
  }

  const item = cart.find(x=>x.id===id);

  if(item){
    item.qty++;
  }else{
    cart.push({
      id,
      qty:1
    });
  }

  saveLocal();
  updateCartCount();

  showToast("✅ Produit ajouté au panier");

}

function changeQty(id,delta){

  const item = cart.find(x=>x.id===id);

  if(!item) return;

  item.qty += delta;

  if(item.qty <= 0){
    cart = cart.filter(x=>x.id!==id);
  }

  saveLocal();
  updateCartCount();
  showCart();

}

function removeFromCart(id){

  cart = cart.filter(x=>x.id!==id);

  saveLocal();
  updateCartCount();
  showCart();

}

function getCartTotal(){

  return cart.reduce((sum,item)=>{

    const product = products.find(p=>p.id===item.id);

    if(!product) return sum;

    return sum + Number(product.price)*Number(item.qty);

  },0);

}

function money(value){

  return Number(value||0).toLocaleString("fr-FR",{
    minimumFractionDigits:2,
    maximumFractionDigits:2
  })+" €";

}


/* =========================================================
   FAVORITES
========================================================= */

function toggleFavorite(id){

  if(favorites.includes(id)){
    favorites = favorites.filter(x=>x!==id);
    showToast("♡ Retiré des favoris");
  }else{
    favorites.push(id);
    showToast("❤️ Ajouté aux favoris");
  }

  saveLocal();
  renderProducts();

}

function isFavorite(id){

  return favorites.includes(id);

}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories(){

  const categories = [
    "Tous",
    ...new Set(products.map(p=>p.category))
  ];

  $("categories").innerHTML = categories.map(category=>`

    <button
      type="button"
      class="category ${category===currentCategory?"active":""}"
      data-category="${escapeHTML(category)}"
    >
      ${escapeHTML(category)}
    </button>

  `).join("");

  document.querySelectorAll(".category").forEach(btn=>{

    btn.addEventListener("click",()=>{

      currentCategory = btn.dataset.category;

      renderCategories();
      renderProducts();

    });

  });

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value){

  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}


/* =========================================================
   PRODUITS
========================================================= */

function getFilteredProducts(){

  let list = [...products];

  if(currentCategory !== "Tous"){
    list = list.filter(p=>p.category===currentCategory);
  }

  const search = ($("searchInput")?.value || "")
    .trim()
    .toLowerCase();

  if(search){

    list = list.filter(p=>
      p.name.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search)
    );

  }

  if(currentSort==="priceAsc"){
    list.sort((a,b)=>a.price-b.price);
  }

  if(currentSort==="priceDesc"){
    list.sort((a,b)=>b.price-a.price);
  }

  if(currentSort==="name"){
    list.sort((a,b)=>a.name.localeCompare(b.name));
  }

  return list;

}


function renderProducts(){

  const list = getFilteredProducts();

  if(!list.length){

    $("products").innerHTML = `
      <div class="empty" style="grid-column:1/-1">
        <strong>Aucun produit trouvé</strong>
        Essaie une autre recherche ou catégorie.
      </div>
    `;

    return;
  }

  $("products").innerHTML = list.map(product=>`

    <article class="product">

      <div class="product-image">

        ${
          product.new
          ? `<div class="new-badge">NOUVEAU</div>`
          : ""
        }

        <button
          class="favorite ${isFavorite(product.id)?"active":""}"
          type="button"
          data-favorite="${product.id}"
          title="Favori"
        >
          ${isFavorite(product.id)?"♥":"♡"}
        </button>

        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          onerror="this.src='https://via.placeholder.com/600x500?text=NovaShop'"
        >

      </div>

      <div class="product-info">

        <div class="product-category">
          ${escapeHTML(product.category)}
        </div>

        <div class="product-name">
          ${escapeHTML(product.name)}
        </div>

        <div class="product-price">
          ${money(product.price)}
        </div>

        <div class="product-actions">

          <button
            class="secondary"
            type="button"
            data-detail="${product.id}"
          >
            👁️ Voir
          </button>

          <button
            class="primary"
            type="button"
            data-add="${product.id}"
          >
            🛒 Ajouter
          </button>

        </div>

      </div>

    </article>

  `).join("");


  document.querySelectorAll("[data-add]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      addToCart(btn.dataset.add);
    });
  });


  document.querySelectorAll("[data-detail]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      showProduct(btn.dataset.detail);
    });
  });


  document.querySelectorAll("[data-favorite]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      toggleFavorite(btn.dataset.favorite);
    });
  });

}


/* =========================================================
   PRODUIT DETAIL
========================================================= */

function showProduct(id){

  const p = products.find(x=>x.id===id);

  if(!p) return;

  openModal(`

    <div class="detail">

      <div class="detail-image">

        <img
          src="${p.image}"
          alt="${escapeHTML(p.name)}"
          onerror="this.src='https://via.placeholder.com/600x500?text=NovaShop'"
        >

      </div>

      <div class="detail-info">

        <div class="product-category">
          ${escapeHTML(p.category)}
        </div>

        <h2>
          ${escapeHTML(p.name)}
        </h2>

        <div class="stars">
          ★★★★★
        </div>

        <div class="price">
          ${money(p.price)}
        </div>

        <p>
          Produit disponible sur NovaShop.
          Ajoute-le au panier pour continuer ta commande.
        </p>

        <div style="display:grid;gap:9px;margin-top:22px">

          <button
            class="primary full"
            id="detailAdd"
            type="button"
          >
            🛒 Ajouter au panier
          </button>

          <button
            class="secondary full"
            id="detailFav"
            type="button"
          >
            ${isFavorite(p.id)?"♥ Retirer des favoris":"♡ Ajouter aux favoris"}
          </button>

        </div>

      </div>

    </div>

  `);


  $("detailAdd").addEventListener("click",()=>{

    addToCart(p.id);

  });


  $("detailFav").addEventListener("click",()=>{

    toggleFavorite(p.id);

    $("detailFav").textContent =
      isFavorite(p.id)
      ? "♥ Retirer des favoris"
      : "♡ Ajouter aux favoris";

  });

}


/* =========================================================
   CART MODAL
========================================================= */

function showCart(){

  if(!cart.length){

    openModal(`

      <div class="empty">

        <strong>🛒 Ton panier est vide</strong>

        Ajoute des produits pour commencer.

        <div style="margin-top:17px">

          <button
            class="primary"
            id="emptyCartProducts"
            type="button"
          >
            Voir les produits
          </button>

        </div>

      </div>

    `);

    $("emptyCartProducts").addEventListener("click",()=>{

      closeModal();

      document
        .getElementById("shop")
        .scrollIntoView({behavior:"smooth"});

    });

    return;
  }


  const total = getCartTotal();


  openModal(`

    <h2 style="margin-bottom:18px">
      🛒 Ton panier
    </h2>

    <div class="cart-list">

      ${cart.map(item=>{

        const p = products.find(x=>x.id===item.id);

        if(!p) return "";

        const qty = Number(item.qty)||1;

        return `

          <div class="cart-item">

            <img
              src="${p.image}"
              alt=""
              onerror="this.src='https://via.placeholder.com/200?text=NovaShop'"
            >

            <div class="cart-item-info">

              <h3>
                ${escapeHTML(p.name)}
              </h3>

              <p>
                ${money(p.price)}
              </p>

              <div class="qty">

                <button
                  type="button"
                  data-minus="${p.id}"
                >
                  −
                </button>

                <span>${qty}</span>

                <button
                  type="button"
                  data-plus="${p.id}"
                >
                  +
                </button>

              </div>

            </div>

            <div class="cart-right">

              <strong>
                ${money(p.price*qty)}
              </strong>

              <button
                class="remove"
                type="button"
                data-remove="${p.id}"
              >
                Supprimer
              </button>

            </div>

          </div>

        `;

      }).join("")}

    </div>


    <div class="total">

      <span>Total</span>

      <span>${money(total)}</span>

    </div>


    <button
      class="primary full"
      id="checkoutButton"
      type="button"
    >
      💳 Continuer vers le paiement
    </button>

  `);


  document.querySelectorAll("[data-minus]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      changeQty(btn.dataset.minus,-1);
    });
  });


  document.querySelectorAll("[data-plus]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      changeQty(btn.dataset.plus,1);
    });
  });


  document.querySelectorAll("[data-remove]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      removeFromCart(btn.dataset.remove);
    });
  });


  $("checkoutButton").addEventListener("click",()=>{

    if(!currentUser){
      showAccount(true);
      return;
    }

    showCheckout();

  });

}


/* =========================================================
   ACCOUNT
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


function showAccount(forceLogin=false){

  if(currentUser){

    openModal(`

      <div class="account-box">

        <h2>👤 Mon compte</h2>

        <p>
          Connecté avec ${escapeHTML(currentUser.email)}
        </p>

        <div style="display:grid;gap:9px">

          <button
            class="primary"
            id="myOrdersButton"
            type="button"
          >
            📦 Mes commandes
          </button>

          ${
            currentUser.email.toLowerCase()===ADMIN_EMAIL.toLowerCase()
            ?
            `<button class="secondary" id="accountDashboard" type="button">
              ⚙️ Dashboard administrateur
            </button>`
            :
            ""
          }

          <button
            class="danger"
            id="logoutButton"
            type="button"
          >
            🚪 Se déconnecter
          </button>

        </div>

      </div>

    `);


    $("myOrdersButton").addEventListener("click",showMyOrders);

    $("logoutButton").addEventListener("click",async()=>{

      await signOut(auth);

      closeModal();

      showToast("👋 Déconnecté");

    });


    if($("accountDashboard")){

      $("accountDashboard").addEventListener("click",()=>{

        showDashboard();

      });

    }

    return;
  }


  openModal(`

    <div class="account-box">

      <h2>👤 ${forceLogin?"Connexion":"Mon compte"}</h2>

      <p>
        Connecte-toi ou crée ton compte NovaShop.
      </p>

      <div class="account-switch">

        <button
          class="primary"
          id="loginTab"
          type="button"
        >
          Connexion
        </button>

        <button
          class="secondary"
          id="registerTab"
          type="button"
        >
          Inscription
        </button>

      </div>


      <form class="form" id="authForm">

        <label>Email</label>

        <input
          id="authEmail"
          type="email"
          required
          autocomplete="email"
          placeholder="ton@email.com"
        >


        <label>Mot de passe</label>

        <input
          id="authPassword"
          type="password"
          required
          minlength="6"
          autocomplete="current-password"
          placeholder="••••••••"
        >


        <div id="authError" class="error"></div>


        <button
          class="primary full"
          type="submit"
          id="authSubmit"
        >
          Se connecter
        </button>

      </form>

    </div>

  `);


  let mode = "login";


  $("loginTab").addEventListener("click",()=>{

    mode="login";

    $("loginTab").className="primary";
    $("registerTab").className="secondary";
    $("authSubmit").textContent="Se connecter";

  });


  $("registerTab").addEventListener("click",()=>{

    mode="register";

    $("loginTab").className="secondary";
    $("registerTab").className="primary";
    $("authSubmit").textContent="Créer mon compte";

  });


  $("authForm").addEventListener("submit",async e=>{

    e.preventDefault();

    const email = $("authEmail").value.trim();
    const password = $("authPassword").value;

    $("authError").textContent="";

    try{

      if(mode==="login"){

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

      $("authError").textContent =
        firebaseAuthMessage(error);

    }

  });

}


/* =========================================================
   CHECKOUT
========================================================= */

function showCheckout(){

  const total = getCartTotal();

  if(total<=0){
    showToast("Panier vide.");
    return;
  }

  openModal(`

    <div class="checkout-box">

      <div class="checkout-title">
        💳 Paiement
      </div>

      <div style="color:#8e9bb0;font-size:13px">
        Total à payer :
        <strong style="color:white">
          ${money(total)}
        </strong>
      </div>


      <div class="payment-choice">

        <button
          class="payment-option selected"
          id="cardChoice"
          type="button"
        >

          <strong>💳 Carte</strong>

          <small>
            Paiement de démonstration NovaShop
          </small>

        </button>


        <button
          class="payment-option"
          id="paypalChoice"
          type="button"
        >

          <strong>🅿️ PayPal</strong>

          <small>
            Ouvrir PayPal
          </small>

        </button>

      </div>


      <div id="paymentArea"></div>

    </div>

  `);


  let method="card";


  function renderPayment(){

    if(method==="card"){

      $("paymentArea").innerHTML=`

        <div class="fake-card">

          <div class="fake-card-title">
            💳 Carte NovaShop
          </div>

          <div class="fake-card-note">
            Ceci est uniquement un formulaire de démonstration
            local. Aucun numéro de carte réel n'est enregistré.
          </div>


          <div class="form">

            <label>Numéro de carte</label>

            <input
              id="cardNumber"
              inputmode="numeric"
              maxlength="19"
              placeholder="1234 5678 9012 3456"
            >


            <div class="form-row">

              <div>

                <label>Expiration</label>

                <input
                  id="cardExpiry"
                  maxlength="5"
                  placeholder="12/42"
                >

              </div>


              <div>

                <label>CVV</label>

                <input
                  id="cardCvv"
                  inputmode="numeric"
                  maxlength="3"
                  placeholder="144"
                >

              </div>

            </div>


            <div id="cardError" class="error"></div>


            <button
              class="primary full"
              id="cardPay"
              type="button"
            >
              Payer ${money(total)}
            </button>

          </div>

        </div>

      `;


      $("cardPay").addEventListener(
        "click",
        processCardPayment
      );

    }else{

      $("paymentArea").innerHTML=`

        <div class="paypal-box">

          <div class="paypal-logo">
            PayPal
          </div>

          <p style="color:#8998ad;margin:10px 0 18px;line-height:1.5">
            Tu vas être redirigé vers PayPal pour continuer.
          </p>

          <button
            class="primary full"
            id="paypalPay"
            type="button"
          >
            🅿️ Continuer avec PayPal
          </button>

        </div>

      `;


      $("paypalPay").addEventListener(
        "click",
        showPayPalPayment
      );

    }

  }


  $("cardChoice").addEventListener("click",()=>{

    method="card";

    $("cardChoice").classList.add("selected");
    $("paypalChoice").classList.remove("selected");

    renderPayment();

  });


  $("paypalChoice").addEventListener("click",()=>{

    method="paypal";

    $("paypalChoice").classList.add("selected");
    $("cardChoice").classList.remove("selected");

    renderPayment();

  });


  renderPayment();

}


/* =========================================================
   PAIEMENT CARTE DEMO
========================================================= */

async function processCardPayment(){

  const number = $("cardNumber").value.trim();
  const expiry = $("cardExpiry").value.trim();
  const cvv = $("cardCvv").value.trim();

  if(
    number!=="1234 5678 9012 3456" ||
    expiry!=="12/42" ||
    cvv!=="144"
  ){

    $("cardError").textContent =
      "❌ Carte incorrecte";

    return;
  }

  if(!currentUser){

    $("cardError").textContent =
      "❌ Connecte-toi avant de payer.";

    return;
  }


  const items = cart.map(item=>{

    const p = products.find(x=>x.id===item.id);

    return {
      id:p.id,
      name:p.name,
      price:Number(p.price),
      quantity:Number(item.qty)||1,
      image:p.image
    };

  });


  try{

    await addDoc(
      collection(db,"orders"),
      {
        userId:currentUser.uid,
        email:currentUser.email,

        items,

        total:Number(getCartTotal().toFixed(2)),

        paymentMethod:"Carte",
        paymentStatus:"Payée",

        status:"En cours de préparation",

        trackingLocation:"Entrepôt NovaShop",

        durationSeconds:3600,
        durationUpdatedAt:serverTimestamp(),

        createdAt:serverTimestamp()
      }
    );


    cart=[];

    saveLocal();
    updateCartCount();

    openModal(`

      <div class="empty">

        <strong>✅ Paiement accepté</strong>

        Ta commande a été créée avec succès.

        <div style="margin-top:8px">
          💳 Paiement : Carte
        </div>

        <div style="margin-top:17px">

          <button
            class="primary"
            id="goOrders"
            type="button"
          >
            📦 Voir ma commande
          </button>

        </div>

      </div>

    `);


    $("goOrders").addEventListener(
      "click",
      showMyOrders
    );


  }catch(error){

    $("cardError").textContent =
      "❌ Erreur : "+error.code;

    console.error(error);

  }

}


/* =========================================================
   PAYPAL
========================================================= */

async function showPayPalPayment(){

  if(!currentUser){
    showAccount(true);
    return;
  }

  const total = getCartTotal();

  if(total<=0){
    showToast("Panier vide.");
    return;
  }


  const url =
    PAYPAL_BASE+
    "/"+
    encodeURIComponent(total.toFixed(2));


  /*
    Ouverture IMMÉDIATE pour éviter le blocage
    des popups sur mobile/iPhone.
  */

  const popup = window.open(
    url,
    "_blank"
  );


  const items = cart.map(item=>{

    const p = products.find(x=>x.id===item.id);

    return {
      id:p.id,
      name:p.name,
      price:Number(p.price),
      quantity:Number(item.qty)||1,
      image:p.image
    };

  });


  try{

    await addDoc(
      collection(db,"orders"),
      {
        userId:currentUser.uid,
        email:currentUser.email,

        items,

        total:Number(total.toFixed(2)),

        paymentMethod:"PayPal",
        paymentStatus:"En attente",

        status:"En cours de préparation",

        trackingLocation:"En attente de prise en charge",

        durationSeconds:3600,
        durationUpdatedAt:serverTimestamp(),

        createdAt:serverTimestamp()
      }
    );


    cart=[];

    saveLocal();
    updateCartCount();

    if(!popup){

      window.location.href=url;

    }else{

      showToast("🅿️ PayPal ouvert. Commande enregistrée.");

    }

  }catch(error){

    console.error(error);

    showToast(
      "❌ Impossible de créer la commande : "+
      error.code
    );

  }

}


/* =========================================================
   DATE FIRESTORE
========================================================= */

function timestampMillis(value){

  if(!value) return null;

  if(typeof value.toMillis==="function"){
    return value.toMillis();
  }

  if(typeof value.seconds==="number"){
    return value.seconds*1000;
  }

  if(value instanceof Date){
    return value.getTime();
  }

  return null;

}


/* =========================================================
   DUREE
========================================================= */

function getRemainingSeconds(order){

  const base =
    Math.max(
      0,
      Number(order.durationSeconds)||0
    );

  const start =
    timestampMillis(order.durationUpdatedAt);

  if(!start){
    return base;
  }

  const elapsed =
    Math.floor(
      (Date.now()-start)/1000
    );

  return Math.max(
    0,
    base-elapsed
  );

}


function formatDuration(seconds){

  seconds=Math.max(
    0,
    Math.floor(Number(seconds)||0)
  );

  const h=Math.floor(seconds/3600);
  const m=Math.floor((seconds%3600)/60);
  const s=seconds%60;

  if(h>0){

    return `${h}h ${String(m).padStart(2,"0")}m ${String(s).padStart(2,"0")}s`;

  }

  return `${m}m ${String(s).padStart(2,"0")}s`;

}


/* =========================================================
   COMMANDES CLIENT
========================================================= */

async function getOrdersForUser(){

  if(!currentUser) return [];

  const snap =
    await getDocs(
      collection(db,"orders")
    );

  const orders=[];

  snap.forEach(item=>{

    const data=item.data();

    if(data.userId===currentUser.uid){

      orders.push({
        id:item.id,
        ...data
      });

    }

  });


  orders.sort((a,b)=>{

    const ta =
      timestampMillis(a.createdAt)||0;

    const tb =
      timestampMillis(b.createdAt)||0;

    return tb-ta;

  });


  return orders;

}


function statusIcon(status){

  if(status==="Livrée") return "✅";
  if(status==="Annulée") return "❌";
  if(status==="Remboursée") return "💰";
  if(status==="En cours de remboursement") return "💸";
  if(status==="En transit") return "🚚";
  if(status==="Proche de la livraison") return "📍";
  if(status==="Acceptée") return "👍";

  return "📦";

}


function orderHTML(order){

  const remaining =
    getRemainingSeconds(order);

  const created =
    timestampMillis(order.createdAt);

  const date =
    created
    ? new Date(created).toLocaleString("fr-FR")
    : "Date en attente";


  return `

    <div
      class="order-box"
      data-countdown="${order.id}"
    >

      <div class="order-head">

        <div>

          <strong>
            Commande
          </strong>

          <div class="order-id">
            ${escapeHTML(order.id)}
          </div>

          <div style="margin-top:6px;color:#75849a;font-size:11px">
            ${date}
          </div>

        </div>


        <div class="order-status">

          ${statusIcon(order.status)}
          ${escapeHTML(order.status || "En cours de préparation")}

        </div>

      </div>


      <div class="order-grid">

        <div class="order-field">

          <small>Total</small>

          <strong>
            ${money(order.total)}
          </strong>

        </div>


        <div class="order-field">

          <small>Paiement</small>

          <strong>
            ${
              order.paymentMethod==="Carte"
              ? "💳 Carte"
              : "🅿️ PayPal"
            }
          </strong>

        </div>


        <div class="order-field">

          <small>Paiement</small>

          <strong>
            ${escapeHTML(order.paymentStatus || "En attente")}
          </strong>

        </div>


        <div class="order-field">

          <small>Temps restant</small>

          <strong
            class="countdown"
            data-order-countdown="${order.id}"
          >
            ${formatDuration(remaining)}
          </strong>

        </div>

      </div>


      <div class="tracking">

        <div class="tracking-title">
          📍 LOCALISATION DU COLIS
        </div>

        <div class="tracking-location">
          ${escapeHTML(
            order.trackingLocation ||
            "Localisation en attente"
          )}
        </div>

      </div>


      <div style="margin-top:15px">

        <strong style="font-size:13px">
          Produits
        </strong>

        <div style="margin-top:8px;color:#8998ad;font-size:12px">

          ${
            (order.items||[]).map(item=>
              `${escapeHTML(item.name)} × ${item.quantity}`
            ).join("<br>")
          }

        </div>

      </div>

    </div>

  `;

}


async function showMyOrders(){

  if(!currentUser){

    showAccount(true);
    return;

  }


  openModal(`

    <div>

      <h2 style="margin-bottom:18px">
        📦 Mes commandes
      </h2>

      <div id="myOrdersContent">
        Chargement...
      </div>

    </div>

  `);


  try{

    const orders =
      await getOrdersForUser();


    if(!orders.length){

      $("myOrdersContent").innerHTML=`

        <div class="empty">

          <strong>Aucune commande</strong>

          Tu n'as encore aucune commande.

        </div>

      `;

      return;
    }


    $("myOrdersContent").innerHTML=`

      <div class="order-list">

        ${orders.map(orderHTML).join("")}

      </div>

    `;


    startCountdowns();

  }catch(error){

    $("myOrdersContent").innerHTML=`

      <div class="empty">

        <strong>Erreur</strong>

        ${escapeHTML(error.code || error.message)}

      </div>

    `;

  }

}


/* =========================================================
   ADMIN
========================================================= */

async function showDashboard(){

  if(!currentUser){

    openModal(`

      <div class="account-box">

        <h2>⚙️ Dashboard</h2>

        <p>
          Connecte-toi pour accéder au dashboard.
        </p>

        <button
          class="primary full"
          id="dashLogin"
          type="button"
        >
          Se connecter
        </button>

      </div>

    `);

    $("dashLogin").addEventListener(
      "click",
      ()=>showAccount(true)
    );

    return;
  }


  if(
    currentUser.email.toLowerCase() !==
    ADMIN_EMAIL.toLowerCase()
  ){

    openModal(`

      <div class="account-box">

        <h2>🔐 Accès administrateur</h2>

        <p>
          Entre le code administrateur.
        </p>

        <form class="form" id="adminLoginForm">

          <label>Code administrateur</label>

          <input
            id="adminCode"
            type="password"
            required
            placeholder="Code"
          >

          <div
            id="adminLoginError"
            class="error"
          ></div>

          <button
            class="primary full"
            type="submit"
          >
            Entrer
          </button>

        </form>

      </div>

    `);


    $("adminLoginForm").addEventListener(
      "submit",
      e=>{

        e.preventDefault();

        if($("adminCode").value===ADMIN_CODE){

          renderAdminDashboard();

        }else{

          $("adminLoginError").textContent =
            "❌ Code incorrect.";

        }

      }
    );

    return;

  }


  renderAdminDashboard();

}


async function renderAdminDashboard(){

  openModal(`

    <div>

      <div class="admin-title">
        ⚙️ Dashboard NovaShop
      </div>

      <div class="admin-subtitle">
        Gestion des commandes, paiements, statuts,
        localisations et durées.
      </div>

      <div id="adminContent">
        Chargement des commandes...
      </div>

    </div>

  `);


  try{

    const snap =
      await getDocs(
        collection(db,"orders")
      );

    const orders=[];

    snap.forEach(item=>{

      orders.push({
        id:item.id,
        ...item.data()
      });

    });


    orders.sort((a,b)=>{

      const ta =
        timestampMillis(a.createdAt)||0;

      const tb =
        timestampMillis(b.createdAt)||0;

      return tb-ta;

    });


    const totalRevenue =
      orders.reduce(
        (sum,o)=>sum+(Number(o.total)||0),
        0
      );


    $("adminContent").innerHTML=`

      <div class="stats">

        <div class="admin-stat">

          <small>Commandes</small>

          <strong>
            ${orders.length}
          </strong>

        </div>


        <div class="admin-stat">

          <small>Chiffre affiché</small>

          <strong>
            ${money(totalRevenue)}
          </strong>

        </div>


        <div class="admin-stat">

          <small>Payées</small>

          <strong>
            ${orders.filter(o=>o.paymentStatus==="Payée").length}
          </strong>

        </div>


        <div class="admin-stat">

          <small>Remboursées</small>

          <strong>
            ${orders.filter(o=>o.status==="Remboursée").length}
          </strong>

        </div>

      </div>


      ${
        orders.length
        ?
        orders.map(adminOrderHTML).join("")
        :
        `
          <div class="empty">
            <strong>Aucune commande</strong>
            Les nouvelles commandes apparaîtront ici.
          </div>
        `
      }

    `;


    document
      .querySelectorAll("[data-save-order]")
      .forEach(btn=>{

        btn.addEventListener("click",()=>{

          saveOrderChanges(
            btn.dataset.saveOrder
          );

        });

      });


    startCountdowns();

  }catch(error){

    $("adminContent").innerHTML=`

      <div class="empty">

        <strong>Erreur Firebase</strong>

        ${escapeHTML(error.code || error.message)}

      </div>

    `;

    console.error(error);

  }

}


function adminOrderHTML(order){

  const remaining =
    getRemainingSeconds(order);


  return `

    <div
      class="admin-order"
      data-admin-countdown="${order.id}"
    >

      <div class="admin-order-head">

        <div>

          <strong>
            📦 Commande
          </strong>

          <div class="admin-order-id">
            ${escapeHTML(order.id)}
          </div>

          <div style="margin-top:5px;color:#718198;font-size:11px">
            ${escapeHTML(order.email || "Email inconnu")}
          </div>

        </div>


        <div class="order-status">
          ${statusIcon(order.status)}
          ${escapeHTML(order.status || "En cours de préparation")}
        </div>

      </div>


      <div class="order-grid" style="margin-bottom:15px">

        <div class="order-field">

          <small>Total</small>

          <strong>
            ${money(order.total)}
          </strong>

        </div>


        <div class="order-field">

          <small>Paiement</small>

          <strong>
            ${
              order.paymentMethod==="Carte"
              ? "💳 Carte"
              : "🅿️ PayPal"
            }
          </strong>

        </div>


        <div class="order-field">

          <small>Temps restant</small>

          <strong
            class="countdown"
            data-order-countdown="${order.id}"
          >
            ${formatDuration(remaining)}
          </strong>

        </div>

      </div>


      <div class="admin-fields">

        <div class="admin-field">

          <label>Statut commande</label>

          <select id="status-${order.id}">

            ${ORDER_STATUSES.map(status=>`

              <option
                value="${escapeHTML(status)}"
                ${
                  status===(order.status||"En cours de préparation")
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

          <label>Paiement</label>

          <select id="payment-${order.id}">

            <option
              value="En attente"
              ${order.paymentStatus==="En attente"?"selected":""}
            >
              En attente
            </option>

            <option
              value="Payée"
              ${order.paymentStatus==="Payée"?"selected":""}
            >
              Payée
            </option>

            <option
              value="Remboursée"
              ${order.paymentStatus==="Remboursée"?"selected":""}
            >
              Remboursée
            </option>

          </select>

        </div>


        <div class="admin-field">

          <label>Localisation du colis</label>

          <input
            id="location-${order.id}"
            value="${escapeHTML(
              order.trackingLocation ||
              ""
            )}"
            placeholder="Ex : Aéroport de Paris"
          >

        </div>


        <div class="admin-field">

          <label>Durée</label>

          <div class="admin-duration">

            <input
              id="duration-${order.id}"
              type="number"
              min="0"
              value="${remaining}"
            >

            <select id="durationUnit-${order.id}">

              <option value="seconds">
                sec
              </option>

              <option value="minutes" selected>
                min
              </option>

              <option value="hours">
                h
              </option>

            </select>

          </div>

        </div>


        <div class="admin-field">

          <label>Emplacements rapides</label>

          <select
            id="quickLocation-${order.id}"
            data-quick-location="${order.id}"
          >

            <option value="">
              Choisir...
            </option>

            <option value="Entrepôt NovaShop">
              Entrepôt NovaShop
            </option>

            <option value="Centre de tri">
              Centre de tri
            </option>

            <option value="Aéroport de Paris">
              Aéroport de Paris
            </option>

            <option value="Aéroport de Lille">
              Aéroport de Lille
            </option>

            <option value="En transit">
              En transit
            </option>

            <option value="Centre de livraison local">
              Centre de livraison local
            </option>

            <option value="Véhicule de livraison">
              Véhicule de livraison
            </option>

          </select>

        </div>

      </div>


      <div class="admin-actions">

        <button
          class="green"
          type="button"
          data-save-order="${order.id}"
        >
          💾 Enregistrer
        </button>

      </div>

    </div>

  `;

}


async function saveOrderChanges(orderId){

  const status =
    $(`status-${orderId}`).value;

  const paymentStatus =
    $(`payment-${orderId}`).value;

  const location =
    $(`location-${orderId}`).value.trim() ||
    "Localisation non renseignée";


  let duration =
    Number(
      $(`duration-${orderId}`).value
    );

  const unit =
    $(`durationUnit-${orderId}`).value;


  if(!Number.isFinite(duration) || duration<0){

    showToast("❌ Durée incorrecte");
    return;

  }


  if(unit==="minutes"){
    duration *= 60;
  }

  if(unit==="hours"){
    duration *= 3600;
  }


  duration =
    Math.floor(duration);


  try{

    await updateDoc(
      doc(db,"orders",orderId),
      {

        status,

        paymentStatus,

        trackingLocation:location,

        durationSeconds:duration,

        durationUpdatedAt:serverTimestamp(),

        updatedAt:serverTimestamp()

      }
    );


    showToast("✅ Commande mise à jour");

    renderAdminDashboard();

  }catch(error){

    showToast(
      "❌ Erreur : "+
      (error.code || error.message)
    );

    console.error(error);

  }

}


/* =========================================================
   COUNTDOWN
========================================================= */

function updateCountdowns(){

  document
    .querySelectorAll("[data-order-countdown]")
    .forEach(element=>{

      const id =
        element.dataset.orderCountdown;

      const admin =
        document.querySelector(
          `[data-admin-countdown="${CSS.escape(id)}"]`
        );

      const client =
        document.querySelector(
          `[data-countdown="${CSS.escape(id)}"]`
        );


      /*
        On récupère les données directement depuis
        l'attribut stocké dans la page lorsque possible.
      */

      if(admin || client){

        const input =
          document.querySelector(
            `#duration-${CSS.escape(id)}`
          );

        if(input){

          let value =
            Number(input.value)||0;

          const unit =
            document.querySelector(
              `#durationUnit-${CSS.escape(id)}`
            )?.value;

          if(unit==="minutes") value*=60;
          if(unit==="hours") value*=3600;

          /*
            Le dashboard recharge l'heure après
            chaque sauvegarde.
          */

        }

      }

    });

}


/*
  Vrai moteur de countdown.
  Il recharge les commandes Firebase périodiquement
  afin de conserver les durées synchronisées.
*/

let countdownOrders=[];

async function refreshCountdownOrders(){

  try{

    const snap =
      await getDocs(
        collection(db,"orders")
      );

    countdownOrders=[];

    snap.forEach(item=>{

      countdownOrders.push({
        id:item.id,
        ...item.data()
      });

    });

  }catch(error){

    console.error(error);

  }

}


function renderCountdownsFromData(){

  countdownOrders.forEach(order=>{

    const seconds =
      getRemainingSeconds(order);

    document
      .querySelectorAll(
        `[data-order-countdown="${CSS.escape(order.id)}"]`
      )
      .forEach(el=>{

        el.textContent =
          formatDuration(seconds);

      });

  });

}


function startCountdowns(){

  clearInterval(countdownTimer);

  refreshCountdownOrders();

  countdownTimer =
    setInterval(()=>{

      renderCountdownsFromData();

      if(
        Date.now()%10000 < 1000
      ){
        refreshCountdownOrders();
      }

    },1000);

}


/* =========================================================
   FAQ
========================================================= */

function setupFAQ(){

  document.querySelectorAll(".faq button")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        const parent =
          button.parentElement;

        const wasOpen =
          parent.classList.contains("open");


        document
          .querySelectorAll(".faq")
          .forEach(item=>{
            item.classList.remove("open");
            const span=item.querySelector("button span");
            if(span) span.textContent="＋";
          });


        if(!wasOpen){

          parent.classList.add("open");

          const span =
            button.querySelector("span");

          if(span) span.textContent="−";

        }

      });

    });

}


/* =========================================================
   NAVIGATION
========================================================= */

function scrollToId(id){

  const el=$(id);

  if(!el) return;

  el.scrollIntoView({
    behavior:"smooth",
    block:"start"
  });

}


$("productsBtn").addEventListener("click",()=>{

  scrollToId("shop");

});


$("heroDashboard").addEventListener("click",()=>{

  showDashboard();

});


$("cartBtn").addEventListener("click",()=>{

  showCart();

});


$("accountBtn").addEventListener("click",()=>{

  showAccount();

});


$("favoritesBtn").addEventListener("click",()=>{

  showFavorites();

});


$("dashboardBtn").addEventListener("click",()=>{

  showDashboard();

});


$("searchInput").addEventListener("input",()=>{

  renderProducts();

});


$("sortSelect").addEventListener("change",()=>{

  currentSort =
    $("sortSelect").value;

  renderProducts();

});


/* FOOTER */

$("footerProducts").addEventListener(
  "click",
  ()=>scrollToId("shop")
);

$("footerReviews").addEventListener(
  "click",
  ()=>scrollToId("reviews")
);

$("footerFaq").addEventListener(
  "click",
  ()=>scrollToId("faq")
);

$("footerRefund").addEventListener(
  "click",
  ()=>scrollToId("refund")
);

$("footerAccount").addEventListener(
  "click",
  ()=>showAccount()
);

$("footerOrders").addEventListener(
  "click",
  ()=>showMyOrders()
);


/* =========================================================
   FAVORIS MODAL
========================================================= */

function showFavorites(){

  const list =
    products.filter(p=>favorites.includes(p.id));


  if(!list.length){

    openModal(`

      <div class="empty">

        <strong>❤️ Aucun favori</strong>

        Ajoute des produits avec le bouton cœur.

        <div style="margin-top:17px">

          <button
            class="primary"
            id="favProducts"
            type="button"
          >
            Voir les produits
          </button>

        </div>

      </div>

    `);


    $("favProducts").addEventListener(
      "click",
      ()=>{
        closeModal();
        scrollToId("shop");
      }
    );

    return;

  }


  openModal(`

    <h2 style="margin-bottom:18px">
      ❤️ Mes favoris
    </h2>

    <div class="grid">

      ${list.map(p=>`

        <div class="product">

          <div class="product-image">

            <img
              src="${p.image}"
              alt=""
              onerror="this.src='https://via.placeholder.com/600x500?text=NovaShop'"
            >

          </div>

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
                type="button"
                data-fav-detail="${p.id}"
              >
                👁️ Voir
              </button>

              <button
                class="primary"
                type="button"
                data-fav-add="${p.id}"
              >
                🛒 Ajouter
              </button>

            </div>

          </div>

        </div>

      `).join("")}

    </div>

  `);


  document
    .querySelectorAll("[data-fav-add]")
    .forEach(btn=>{

      btn.addEventListener(
        "click",
        ()=>{
          addToCart(btn.dataset.favAdd);
        }
      );

    });


  document
    .querySelectorAll("[data-fav-detail]")
    .forEach(btn=>{

      btn.addEventListener(
        "click",
        ()=>{
          showProduct(btn.dataset.favDetail);
        }
      );

    });

}


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(auth,user=>{

  currentUser=user;

  if(user){

    $("accountBtn").title =
      "Compte : "+user.email;

  }else{

    $("accountBtn").title =
      "Connexion";

  }

});


/* =========================================================
   QUICK LOCATION ADMIN
========================================================= */

document.addEventListener("change",e=>{

  if(!e.target.matches("[data-quick-location]")){
    return;
  }

  const id =
    e.target.dataset.quickLocation;

  const location =
    e.target.value;

  if(location && $(`location-${id}`)){

    $(`location-${id}`).value=location;

  }

});


/* =========================================================
   START
========================================================= */

loadLocal();

renderCategories();

renderProducts();

updateCartCount();

setupFAQ();

startCountdowns();
