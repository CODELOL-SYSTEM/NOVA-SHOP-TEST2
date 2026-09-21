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
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


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

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


/* =========================================================
   CONFIGURATION
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";
const PAYPAL_BASE = "https://paypal.me/SH0PNOVA";

const CART_STORAGE_KEY = "novaCart";
const FAVORITES_STORAGE_KEY = "novaFavorites";
const TEST_CARD_STORAGE_KEY = "novaTestCard";


/* =========================================================
   PRODUITS
========================================================= */

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
    name: "Sony DualSense Cosmic Red PS5/PC",
    category: "Manettes",
    price: 74.90,
    image: "https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg"
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
  }

];


/* =========================================================
   DOM
========================================================= */

const $ = id => document.getElementById(id);

const searchInput = $("searchInput");
const sortSelect = $("sortSelect");
const categoryList = $("categoryList");
const productGrid = $("productGrid");

const cartCount = $("cartCount");
const cartTotal = $("cartTotal");
const cartItems = $("cartItems");
const cartDrawer = $("cartDrawer");
const cartOverlay = $("cartOverlay");

const modal = $("modal");
const modalTitle = $("modalTitle");
const modalBody = $("modalBody");

const toastContainer = $("toastContainer");

const checkoutBtn = $("checkoutBtn");
const accountBtn = $("accountBtn");
const ordersBtn = $("ordersBtn");
const adminBtn = $("adminBtn");
const settingsBtn = $("settingsBtn");


/* =========================================================
   ÉTAT
========================================================= */

let cart = [];
let favorites = [];
let currentUser = null;

let state = {
  search: "",
  category: "Tous",
  sort: "default"
};


/* =========================================================
   STORAGE
========================================================= */

function loadCart(){

  try{

    const raw =
      localStorage.getItem(
        CART_STORAGE_KEY
      );

    if(!raw){
      cart=[];
      return;
    }

    const parsed=
      JSON.parse(raw);

    cart=
      Array.isArray(parsed)
        ?parsed
        :[];

  }catch{

    cart=[];

  }

}


function saveCart(){

  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(cart)
  );

}


function loadFavorites(){

  try{

    const raw=
      localStorage.getItem(
        FAVORITES_STORAGE_KEY
      );

    if(!raw){
      favorites=[];
      return;
    }

    const parsed=
      JSON.parse(raw);

    favorites=
      Array.isArray(parsed)
        ?parsed
        :[];

  }catch{

    favorites=[];

  }

}


function saveFavorites(){

  localStorage.setItem(
    FAVORITES_STORAGE_KEY,
    JSON.stringify(favorites)
  );

}


/* =========================================================
   UTILITAIRES
========================================================= */

function escapeHTML(value){

  return String(value??"")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}


function money(value){

  return new Intl.NumberFormat(
    "fr-FR",
    {
      style:"currency",
      currency:"EUR"
    }
  ).format(
    Number(value)||0
  );

}


function getProduct(id){

  return products.find(
    product=>product.id===id
  );

}


function getCartCount(){

  return cart.reduce(
    (total,item)=>
      total+
      Number(item.quantity||0),
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
        Number(product.price||0)*
        Number(item.quantity||1);

    },
    0
  );

}


/* =========================================================
   TOAST
========================================================= */

function toast(
  message,
  type="info"
){

  if(!toastContainer){

    alert(message);
    return;

  }

  const element=
    document.createElement("div");

  element.className=
    `toast ${type}`;

  element.textContent=
    message;

  toastContainer.appendChild(
    element
  );

  setTimeout(
    ()=>{

      element.classList.add(
        "hide"
      );

      setTimeout(
        ()=>element.remove(),
        300
      );

    },
    3000
  );

}


/* =========================================================
   MODAL
========================================================= */

function showModal(
  title,
  body
){

  if(!modal){
    return;
  }

  if(modalTitle){
    modalTitle.textContent=
      title;
  }

  if(modalBody){
    modalBody.innerHTML=
      body;
  }

  modal.classList.add(
    "open"
  );

}


function closeModal(){

  modal?.classList.remove(
    "open"
  );

}


/* =========================================================
   CATÉGORIES
========================================================= */

function renderCategories(){

  if(!categoryList){
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

  categoryList.innerHTML=
    categories.map(
      category=>`

        <button
          type="button"
          class="category-btn ${
            state.category===category
              ?"active"
              :""
          }"
          data-category="${escapeHTML(
            category
          )}"
        >
          ${escapeHTML(category)}
        </button>

      `
    ).join("");

  categoryList
    .querySelectorAll(
      ".category-btn"
    )
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{

          state.category=
            button.dataset.category||
            "Tous";

          renderCategories();
          renderProducts();

        }
      );

    });

}


/* =========================================================
   PRODUITS
========================================================= */

function renderProducts(){

  if(!productGrid){
    return;
  }

  let list=[
    ...products
  ];

  const search=
    state.search
      .trim()
      .toLowerCase();

  if(search){

    list=
      list.filter(
        product=>
          product.name
            .toLowerCase()
            .includes(search)
          ||
          product.category
            .toLowerCase()
            .includes(search)
      );

  }

  if(
    state.category!=="Tous"
  ){

    list=
      list.filter(
        product=>
          product.category===
          state.category
      );

  }

  switch(state.sort){

    case "price-asc":

      list.sort(
        (a,b)=>a.price-b.price
      );

      break;

    case "price-desc":

      list.sort(
        (a,b)=>b.price-a.price
      );

      break;

    case "name":

      list.sort(
        (a,b)=>
          a.name.localeCompare(
            b.name,
            "fr"
          )
      );

      break;

    default:
      break;

  }

  if(!list.length){

    productGrid.innerHTML=`

      <div class="empty-state">

        <div style="font-size:48px">
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

  productGrid.innerHTML=
    list.map(
      product=>{

        const favorite=
          favorites.includes(
            product.id
          );

        return `

          <article
            class="product-card"
            data-product-id="${product.id}"
          >

            <div class="product-image-wrap">

              ${
                product.new
                  ?`
                    <span class="new-badge">
                      NOUVEAU
                    </span>
                  `
                  :""
              }

              <button
                type="button"
                class="favorite-btn ${
                  favorite?"active":""
                }"
                data-favorite="${product.id}"
                aria-label="Favori"
              >
                ${favorite?"♥":"♡"}
              </button>

              <img
                src="${escapeHTML(
                  product.image
                )}"
                alt="${escapeHTML(
                  product.name
                )}"
                loading="lazy"
                onerror="this.style.display='none'"
              >

            </div>

            <div class="product-info">

              <div class="product-category">
                ${escapeHTML(
                  product.category
                )}
              </div>

              <h3 class="product-name">
                ${escapeHTML(
                  product.name
                )}
              </h3>

              <div class="product-bottom">

                <strong class="product-price">
                  ${money(
                    product.price
                  )}
                </strong>

                <button
                  type="button"
                  class="add-btn"
                  data-add="${product.id}"
                >
                  Ajouter
                </button>

              </div>

              <button
                type="button"
                class="view-btn"
                data-view="${product.id}"
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
      "[data-add]"
    )
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>addToCart(
          button.dataset.add
        )
      );

    });

  productGrid
    .querySelectorAll(
      "[data-view]"
    )
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>openProduct(
          button.dataset.view
        )
      );

    });

  productGrid
    .querySelectorAll(
      "[data-favorite]"
    )
    .forEach(button=>{

      button.addEventListener(
        "click",
        event=>{

          event.stopPropagation();

          toggleFavorite(
            button.dataset.favorite
          );

        }
      );

    });

}


/* =========================================================
   FAVORIS
========================================================= */

function toggleFavorite(id){

  if(
    favorites.includes(id)
  ){

    favorites=
      favorites.filter(
        item=>item!==id
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


/* =========================================================
   PANIER
========================================================= */

function addToCart(id){

  const product=
    getProduct(id);

  if(!product){
    return;
  }

  const existing=
    cart.find(
      item=>item.id===id
    );

  if(existing){

    existing.quantity=
      Number(
        existing.quantity||0
      )+1;

  }else{

    cart.push({
      id,
      quantity:1
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

  cart=
    cart.filter(
      item=>item.id!==id
    );

  saveCart();
  renderCart();

}


function changeCartQuantity(
  id,
  change
){

  const item=
    cart.find(
      item=>item.id===id
    );

  if(!item){
    return;
  }

  item.quantity=
    Number(
      item.quantity||1
    )+change;

  if(item.quantity<=0){

    removeFromCart(id);
    return;

  }

  saveCart();
  renderCart();

}


function renderCart(){

  if(cartCount){

    cartCount.textContent=
      getCartCount();

  }

  if(cartTotal){

    cartTotal.textContent=
      money(
        getCartSubtotal()
      );

  }

  if(!cartItems){
    return;
  }

  if(!cart.length){

    cartItems.innerHTML=`

      <div class="empty-state">

        <div style="font-size:46px">
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

    return;

  }

  cartItems.innerHTML=
    cart.map(
      item=>{

        const product=
          getProduct(item.id);

        if(!product){
          return "";
        }

        const quantity=
          Number(
            item.quantity||1
          );

        return `

          <div class="cart-item">

            <img
              src="${escapeHTML(
                product.image
              )}"
              alt="${escapeHTML(
                product.name
              )}"
              onerror="this.style.display='none'"
            >

            <div class="cart-item-info">

              <strong>
                ${escapeHTML(
                  product.name
                )}
              </strong>

              <span>
                ${money(
                  product.price
                )}
              </span>

              <div class="quantity-controls">

                <button
                  type="button"
                  data-minus="${product.id}"
                >
                  −
                </button>

                <span>
                  ${quantity}
                </span>

                <button
                  type="button"
                  data-plus="${product.id}"
                >
                  +
                </button>

              </div>

            </div>

            <button
              type="button"
              class="remove-cart"
              data-remove="${product.id}"
            >
              ✕
            </button>

          </div>

        `;

      }
    ).join("");

  cartItems
    .querySelectorAll(
      "[data-minus]"
    )
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>changeCartQuantity(
          button.dataset.minus,
          -1
        )
      );

    });

  cartItems
    .querySelectorAll(
      "[data-plus]"
    )
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>changeCartQuantity(
          button.dataset.plus,
          1
        )
      );

    });

  cartItems
    .querySelectorAll(
      "[data-remove]"
    )
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>removeFromCart(
          button.dataset.remove
        )
      );

    });

}


function openCart(){

  cartDrawer?.classList.add(
    "open"
  );

  cartOverlay?.classList.add(
    "open"
  );

}


function closeCart(){

  cartDrawer?.classList.remove(
    "open"
  );

  cartOverlay?.classList.remove(
    "open"
  );

}


cartOverlay?.addEventListener(
  "click",
  closeCart
);


/* =========================================================
   PRODUIT
========================================================= */

function openProduct(id){

  const product=
    getProduct(id);

  if(!product){
    return;
  }

  showModal(
    product.name,
    `

      <div class="product-detail">

        <img
          src="${escapeHTML(
            product.image
          )}"
          alt="${escapeHTML(
            product.name
          )}"
          style="
            width:100%;
            max-height:320px;
            object-fit:contain;
            border-radius:18px;
          "
          onerror="this.style.display='none'"
        >

        <div style="margin-top:18px">

          <span class="product-category">
            ${escapeHTML(
              product.category
            )}
          </span>

          <h2 style="margin:8px 0">
            ${escapeHTML(
              product.name
            )}
          </h2>

          <div style="
            font-size:26px;
            font-weight:800;
            margin:15px 0;
          ">
            ${money(
              product.price
            )}
          </div>

          <button
            type="button"
            class="add-btn"
            id="productAddButton"
            style="width:100%"
          >
            🛒 Ajouter au panier
          </button>

          <button
            type="button"
            class="view-btn"
            id="productReviewsButton"
            style="
              width:100%;
              margin-top:10px;
            "
          >
            ⭐ Voir les avis
          </button>

        </div>

      </div>

    `
  );

  $("productAddButton")
    ?.addEventListener(
      "click",
      ()=>{

        addToCart(
          product.id
        );

        closeModal();

      }
    );

  $("productReviewsButton")
    ?.addEventListener(
      "click",
      ()=>openProductReviews(
        product.id
      )
    );

}


function openProductReviews(id){

  const product=
    getProduct(id);

  if(!product){
    return;
  }

  const reviews=[

    {
      name:"Alex",
      rating:5,
      text:"Très bon produit, livraison rapide."
    },

    {
      name:"Max",
      rating:4,
      text:"Produit conforme à la description."
    },

    {
      name:"Lucas",
      rating:5,
      text:"Très satisfait de mon achat."
    }

  ];

  showModal(
    `Avis - ${product.name}`,
    `

      <div>

        ${
          reviews.map(
            review=>`

              <div style="
                padding:14px;
                border-bottom:1px solid var(--line);
              ">

                <strong>
                  ${escapeHTML(
                    review.name
                  )}
                </strong>

                <div style="margin:5px 0">
                  ${"⭐".repeat(
                    review.rating
                  )}
                </div>

                <p style="
                  color:var(--muted)
                ">
                  ${escapeHTML(
                    review.text
                  )}
                </p>

              </div>

            `
          ).join("")
        }

      </div>

    `
  );

}


/* =========================================================
   AUTH
========================================================= */

function authError(error){

  const code=
    error?.code||
    "";

  const messages={

    "auth/invalid-credential":
      "Adresse e-mail ou mot de passe incorrect.",

    "auth/invalid-email":
      "Adresse e-mail invalide.",

    "auth/email-already-in-use":
      "Cette adresse e-mail est déjà utilisée.",

    "auth/weak-password":
      "Le mot de passe est trop faible.",

    "auth/user-not-found":
      "Compte introuvable.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard."

  };

  return messages[code]||
    "Une erreur est survenue. Réessaie.";

}


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
            ?.value
            .trim()||
          "";

        const password=
          $("loginPassword")
            ?.value||
          "";

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
            ?.value
            .trim()||
          "";

        const password=
          $("registerPassword")
            ?.value||
          "";

        const password2=
          $("registerPassword2")
            ?.value||
          "";

        const errorBox=
          $("registerError");

        if(
          password!==password2
        ){

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


/* =========================================================
   COMPTE
========================================================= */

function openAccount(){

  if(!currentUser){

    showLoginForm();
    return;

  }

  const email=
    currentUser.email||
    "";

  const username=
    email.split("@")[0]||
    "Compte";

  showModal(
    "Mon compte",
    `

      <div>

        <div style="
          padding:18px;
          border-radius:16px;
          background:rgba(80,120,255,.08);
        ">

          <div style="font-size:34px">
            👤
          </div>

          <h3 style="margin-top:8px">
            ${escapeHTML(
              username
            )}
          </h3>

          <p style="
            color:var(--muted);
            margin-top:5px;
          ">
            ${escapeHTML(
              email
            )}
          </p>

        </div>

        <button
          type="button"
          class="add-btn"
          id="accountOrders"
          style="
            width:100%;
            margin-top:15px;
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
            margin-top:10px;
          "
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
      logout
    );

}


async function logout(){

  try{

    await signOut(auth);

    closeModal();

    toast(
      "Déconnexion réussie.",
      "success"
    );

  }catch{

    toast(
      "Impossible de se déconnecter.",
      "error"
    );

  }

}


/* =========================================================
   COMMANDES
========================================================= */

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

      <div style="
        text-align:center;
        padding:25px;
      ">
        Chargement des commandes...
      </div>

    `
  );

  try{

    const q=
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

    const snapshot=
      await getDocs(q);

    const orders=
      snapshot.docs
        .map(
          item=>({
            id:item.id,
            ...item.data()
          })
        )
        .sort(
          (a,b)=>{

            const aTime=
              a.createdAt?.seconds||
              0;

            const bTime=
              b.createdAt?.seconds||
              0;

            return bTime-aTime;

          }
        );

    if(!orders.length){

      showModal(
        "Mes commandes",
        `

          <div class="empty-state">

            <div style="font-size:50px">
              📦
            </div>

            <h3>
              Aucune commande
            </h3>

            <p>
              Tes commandes apparaîtront ici.
            </p>

          </div>

        `
      );

      return;

    }

    showModal(
      "Mes commandes",
      `

        <div style="
          display:grid;
          gap:12px;
        ">

          ${
            orders.map(
              order=>`

                <button
                  type="button"
                  class="view-btn order-card"
                  data-order="${order.id}"
                  style="
                    text-align:left;
                    padding:16px;
                  "
                >

                  <div style="
                    display:flex;
                    justify-content:space-between;
                    gap:12px;
                  ">

                    <strong>
                      #${escapeHTML(
                        order.id.slice(0,8)
                      )}
                    </strong>

                    <strong>
                      ${money(
                        order.total||0
                      )}
                    </strong>

                  </div>

                  <div style="
                    margin-top:8px;
                    color:var(--muted);
                  ">
                    ${escapeHTML(
                      order.status||
                      "Enregistrée"
                    )}
                  </div>

                  ${
                    order.city
                      ?`

                        <div style="
                          margin-top:5px;
                          color:var(--muted);
                        ">
                          📍
                          ${escapeHTML(
                            order.city
                          )}
                        </div>

                      `
                      :""
                  }

                </button>

              `
            ).join("")
          }

        </div>

      `
    );

    document
      .querySelectorAll(
        "[data-order]"
      )
      .forEach(button=>{

        button.addEventListener(
          "click",
          ()=>{

            const order=
              orders.find(
                item=>
                  item.id===
                  button.dataset.order
              );

            if(order){

              openOrderDetails(
                order
              );

            }

          }
        );

      });

  }catch(error){

    console.error(
      "Orders error:",
      error
    );

    showModal(
      "Mes commandes",
      `

        <div style="
          color:#ff7777;
          padding:15px;
        ">
          Impossible de charger les commandes.
        </div>

      `
    );

  }

}


/* =========================================================
   DÉTAIL COMMANDE
========================================================= */

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
    items.map(
      item=>{

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
              ${money(
                price*quantity
              )}
            </strong>

          </div>

        `;

      }
    ).join("");

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

            <div class="timeline-step ${
              active?"active":""
            }">

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
                  Suivi :
                  ${escapeHTML(
                    order.tracking
                  )}
                </div>

              `
              :""
          }

          ${
            order.city
              ?`

                <div style="margin-top:8px">
                  📍 Ville :
                  ${escapeHTML(
                    order.city
                  )}
                </div>

              `
              :""
          }

          ${
            order.estimatedDelivery
              ?`

                <div style="margin-top:8px">
                  Livraison estimée :
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

        ${
          order.address
            ?`

              <h3>
                Livraison
              </h3>

              <p style="
                margin:8px 0 20px;
                color:var(--muted);
              ">
                ${escapeHTML(
                  order.address
                )}
              </p>

            `
            :""
        }

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
            ${money(
              order.total||0
            )}
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


/* =========================================================
   FACTURE
========================================================= */

function printInvoice(order){

  const items=
    Array.isArray(order.items)
      ?order.items
      :[];

  const rows=
    items.map(
      item=>{

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
              ${money(
                price*quantity
              )}
            </td>

          </tr>

        `;

      }
    ).join("");

  const invoiceWindow=
    window.open(
      "",
      "_blank",
      "width=900,height=700"
    );

  if(!invoiceWindow){

    toast(
      "Autorise les fenêtres pop-up pour voir la facture.",
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
          color:#111;
        }

        h1{
          margin-bottom:5px;
        }

        .muted{
          color:#666;
        }

        table{
          width:100%;
          border-collapse:collapse;
          margin-top:30px;
        }

        th,
        td{
          padding:12px;
          border-bottom:1px solid #ddd;
          text-align:left;
        }

        .total{
          margin-top:30px;
          text-align:right;
          font-size:24px;
          font-weight:800;
        }

        .box{
          margin-top:20px;
          padding:15px;
          border:1px solid #ddd;
          border-radius:10px;
        }

        @media print{

          button{
            display:none;
          }

        }

      </style>

    </head>

    <body>

      <h1>
        NovaShop
      </h1>

      <p class="muted">
        Facture de commande
      </p>

      <div class="box">

        <strong>
          Commande :
        </strong>

        #${escapeHTML(order.id)}

        <br>

        <strong>
          Client :
        </strong>

        ${escapeHTML(
          order.userEmail||""
        )}

        <br>

        <strong>
          Adresse :
        </strong>

        ${escapeHTML(
          order.address||""
        )}

      </div>

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
          order.total||0
        )}

      </div>

      <button
        onclick="window.print()"
        style="
          margin-top:30px;
          padding:12px 20px;
        "
      >
        Imprimer
      </button>

    </body>

    </html>

  `);

  invoiceWindow.document.close();

}


/* =========================================================
   CARTE
========================================================= */

function getNovaCard(){

  try{

    const raw=
      localStorage.getItem(
        TEST_CARD_STORAGE_KEY
      );

    if(!raw){
      return null;
    }

    const card=
      JSON.parse(raw);

    if(
      !card||
      typeof card.number!=="string"||
      typeof card.holder!=="string"||
      typeof card.expiry!=="string"||
      typeof card.cvv!=="string"
    ){

      return null;

    }

    return card;

  }catch{

    return null;

  }

}


function generateNovaCard(){

  const randomDigits=
    Array.from(
      {
        length:12
      },
      ()=>Math.floor(
        Math.random()*10
      )
    ).join("");

  const number=
    `9999 ${
      randomDigits.slice(0,4)
    } ${
      randomDigits.slice(4,8)
    } ${
      randomDigits.slice(8,12)
    }`;

  const month=
    String(
      Math.floor(
        Math.random()*12
      )+1
    ).padStart(
      2,
      "0"
    );

  const year=
    String(
      new Date().getFullYear()+
      Math.floor(
        Math.random()*5
      )+
      1
    ).slice(-2);

  const cvv=
    String(
      Math.floor(
        Math.random()*900
      )+100
    );

  const card={

    number,

    holder:
      "CARTE NOVASHOP",

    expiry:
      `${month}/${year}`,

    cvv

  };

  localStorage.setItem(
    TEST_CARD_STORAGE_KEY,
    JSON.stringify(card)
  );

  return card;

}


/* =========================================================
   CARTE VISUELLE ADMIN
========================================================= */

function novaCardHTML(card){

  if(!card){

    return `

      <div style="
        color:rgba(255,255,255,.65);
        font-size:14px;
      ">
        Aucune carte créée.
      </div>

    `;

  }

  return `

    <div
      style="
        width:100%;
        max-width:430px;
        aspect-ratio:1.586;
        border-radius:22px;
        padding:25px;
        position:relative;
        overflow:hidden;
        color:#fff;
        background:
          linear-gradient(
            135deg,
            #111827 0%,
            #26354d 48%,
            #0b101a 100%
          );
        box-shadow:
          0 20px 45px rgba(0,0,0,.45);
        border:1px solid rgba(255,255,255,.15);
        font-family:Arial,sans-serif;
      "
    >

      <div style="
        position:absolute;
        width:180px;
        height:180px;
        right:-60px;
        top:-70px;
        border-radius:50%;
        background:rgba(255,255,255,.08);
      "></div>

      <div style="
        position:absolute;
        width:150px;
        height:150px;
        left:-70px;
        bottom:-80px;
        border-radius:50%;
        background:rgba(255,255,255,.05);
      "></div>

      <div style="
        position:relative;
        z-index:2;
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
      ">

        <div style="
          display:flex;
          justify-content:flex-end;
        ">

          <div style="
            width:45px;
            height:32px;
            border-radius:7px;
            background:
              linear-gradient(
                135deg,
                #d7d7d7,
                #858585
              );
            opacity:.9;
          "></div>

        </div>

        <div style="
          font-size:24px;
          font-weight:700;
          letter-spacing:3px;
          text-shadow:
            0 2px 5px rgba(0,0,0,.4);
        ">
          ${escapeHTML(
            card.number
          )}
        </div>

        <div style="
          display:grid;
          grid-template-columns:1fr auto auto;
          gap:20px;
          align-items:end;
        ">

          <div>

            <div style="
              font-size:9px;
              letter-spacing:1px;
              opacity:.65;
              margin-bottom:4px;
            ">
              TITULAIRE
            </div>

            <div style="
              font-size:13px;
              font-weight:700;
              letter-spacing:1px;
            ">
              ${escapeHTML(
                card.holder
              )}
            </div>

          </div>

          <div>

            <div style="
              font-size:9px;
              letter-spacing:1px;
              opacity:.65;
              margin-bottom:4px;
            ">
              EXP
            </div>

            <div style="
              font-size:13px;
              font-weight:700;
            ">
              ${escapeHTML(
                card.expiry
              )}
            </div>

          </div>

          <div>

            <div style="
              font-size:9px;
              letter-spacing:1px;
              opacity:.65;
              margin-bottom:4px;
            ">
              CVV
            </div>

            <div style="
              font-size:13px;
              font-weight:700;
            ">
              ${escapeHTML(
                card.cvv
              )}
            </div>

          </div>

        </div>

      </div>

    </div>

  `;

}


/* =========================================================
   ADMIN CARTE
========================================================= */

function renderNovaCardAdmin(){

  const card=
    getNovaCard();

  return `

    <div style="
      margin-top:20px;
      padding:18px;
      border-radius:18px;
      background:rgba(255,255,255,.035);
      border:1px solid var(--line);
    ">

      <div style="
        margin-bottom:16px;
      ">

        <strong>
          Carte
        </strong>

      </div>

      <div
        id="adminNovaCardDisplay"
        style="
          display:flex;
          justify-content:center;
        "
      >

        ${novaCardHTML(card)}

      </div>

      <button
        type="button"
        class="add-btn"
        id="generateNovaCard"
        style="
          width:100%;
          margin-top:18px;
        "
      >
        💳 ${
          card
            ?"Créer une nouvelle carte"
            :"Créer une carte"
        }
      </button>

    </div>

  `;

}


/* =========================================================
   CHECKOUT
========================================================= */

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

  showModal(
    "Finaliser la commande",
    `

      <form id="checkoutForm">

        <label for="checkoutAddress">
          Adresse de livraison
        </label>

        <textarea
          id="checkoutAddress"
          required
          rows="4"
          placeholder="Adresse complète"
        ></textarea>

        <div style="
          padding:15px;
          border-radius:14px;
          background:rgba(255,255,255,.05);
          margin:18px 0;
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
            💳 Carte
          </button>

        </div>

        <input
          type="hidden"
          id="paymentMethod"
          value=""
        >

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

          if(!info){
            return;
          }

          if(
            paymentMethod===
            "paypal"
          ){

            info.innerHTML=`

              <div style="
                padding:12px;
                border-radius:12px;
                background:rgba(60,130,255,.1);
              ">

                🅿️
                Tu seras redirigé vers PayPal
                pour effectuer le paiement.

              </div>

            `;

            return;

          }

          const card=
            getNovaCard();

          if(!card){

            info.innerHTML=`

              <div style="
                padding:14px;
                border-radius:12px;
                background:rgba(255,80,80,.10);
                color:#ff9999;
              ">

                💳
                Aucune carte disponible.

                <br><br>

                Crée une carte depuis
                ton espace administration.

              </div>

            `;

            return;

          }

          info.innerHTML=`

            <div style="
              padding:15px;
              border-radius:14px;
              background:rgba(255,255,255,.04);
              border:1px solid var(--line);
            ">

              <label for="cardNumber">
                Numéro de carte
              </label>

              <input
                id="cardNumber"
                type="text"
                inputmode="numeric"
                autocomplete="off"
                required
                value="${escapeHTML(
                  card.number
                )}"
                placeholder="Numéro de carte"
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
                required
                value="${escapeHTML(
                  card.holder
                )}"
                placeholder="Nom sur la carte"
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
                    required
                    value="${escapeHTML(
                      card.expiry
                    )}"
                    placeholder="12/31"
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
                    required
                    value="${escapeHTML(
                      card.cvv
                    )}"
                    placeholder="CVV"
                  >

                </div>

              </div>

            </div>

          `;

        }

      );

    });


  $("checkoutForm")
    ?.addEventListener(
      "submit",
      async event=>{

        event.preventDefault();

        const address=
          $("checkoutAddress")
            ?.value
            .trim()||
          "";

        const errorBox=
          $("checkoutError");

        if(!address){

          errorBox.textContent=
            "Indique ton adresse de livraison.";

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

        if(
          paymentMethod===
          "card"
        ){

          const card=
            getNovaCard();

          if(!card){

            errorBox.textContent=
              "Aucune carte disponible.";

            errorBox.style.display=
              "block";

            return;

          }

          const number=
            (
              $("cardNumber")
                ?.value||
              ""
            )
            .replace(
              /\s+/g,
              ""
            )
            .trim();

          const holder=
            (
              $("cardHolder")
                ?.value||
              ""
            )
            .trim();

          const expiry=
            (
              $("cardExpiry")
                ?.value||
              ""
            )
            .trim();

          const cvv=
            (
              $("cardCvv")
                ?.value||
              ""
            )
            .trim();

          if(
            number!==
              card.number.replace(
                /\s+/g,
                ""
              )||
            holder!==card.holder||
            expiry!==card.expiry||
            cvv!==card.cvv
          ){

            errorBox.textContent=
              "Les informations de la carte sont incorrectes.";

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
            cart.map(
              item=>{

                const product=
                  getProduct(
                    item.id
                  );

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

              }
            );

          const orderData={

            userId:
              currentUser.uid,

            userEmail:
              currentUser.email||
              "",

            items:
              orderItems,

            subtotal,

            total,

            address,

            status:
              "Enregistrée",

            paymentMethod,

            paymentStatus:
              paymentMethod==="card"
                ?"Payé"
                :"En attente",

            tracking:
              "",

            city:
              "",

            estimatedDelivery:
              "",

            createdAt:
              serverTimestamp()

          };

          const orderRef=
            await addDoc(
              collection(
                db,
                "orders"
              ),
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
              `${PAYPAL_BASE}/${encodeURIComponent(
                total.toFixed(2)
              )}EUR`;

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

          }

          if(
            paymentMethod==="card"
          ){

            toast(
              "Paiement accepté 💳",
              "success"
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


/* =========================================================
   ADMIN
========================================================= */

adminBtn?.addEventListener(
  "click",
  openAdmin
);


function isAdminUser(){

  return !!currentUser&&
    (
      currentUser.email||
      ""
    ).toLowerCase()===
    ADMIN_EMAIL.toLowerCase();

}


async function openAdmin(){

  if(!isAdminUser()){

    toast(
      "Accès administrateur refusé.",
      "error"
    );

    return;

  }

  const authorized=
    localStorage.getItem(
      "novaAdminAuthorized"
    )===
    "true";

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
      "novaAdminAuthorized",
      "true"
    );

  }

  await loadAdmin();

}


async function loadAdmin(){

  showModal(
    "Administration NovaShop",
    `

      <div style="
        text-align:center;
        padding:25px;
      ">
        Chargement...
      </div>

    `
  );

  try{

    const snapshot=
      await getDocs(
        collection(
          db,
          "orders"
        )
      );

    const orders=
      snapshot.docs
        .map(
          item=>({
            id:item.id,
            ...item.data()
          })
        )
        .sort(
          (a,b)=>{

            const aTime=
              a.createdAt?.seconds||
              0;

            const bTime=
              b.createdAt?.seconds||
              0;

            return bTime-aTime;

          }
        );

    renderAdmin(
      orders
    );

  }catch(error){

    console.error(
      "Admin error:",
      error
    );

    showModal(
      "Administration",
      `

        <div style="
          color:#ff7777;
          padding:15px;
        ">
          Impossible de charger l'administration.
        </div>

      `
    );

  }

}


function renderAdmin(orders){

  showModal(
    "Administration NovaShop",
    `

      <div>

        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:10px;
          flex-wrap:wrap;
          margin-bottom:15px;
        ">

          <strong>
            ${orders.length}
            commande(s)
          </strong>

          <div style="
            display:flex;
            gap:8px;
            flex-wrap:wrap;
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
              Quitter
            </button>

          </div>

        </div>

        ${renderNovaCardAdmin()}

        <div style="
          display:grid;
          gap:14px;
          margin-top:20px;
        ">

          ${
            orders.length
              ?
              orders.map(
                order=>`

                  <div style="
                    padding:16px;
                    border:1px solid var(--line);
                    border-radius:16px;
                    background:rgba(255,255,255,.03);
                  ">

                    <div style="
                      display:flex;
                      justify-content:space-between;
                      gap:12px;
                      flex-wrap:wrap;
                    ">

                      <strong>
                        Commande #
                        ${escapeHTML(
                          order.id.slice(0,8)
                        )}
                      </strong>

                      <strong>
                        ${money(
                          order.total||0
                        )}
                      </strong>

                    </div>

                    <div style="
                      margin-top:8px;
                      color:var(--muted);
                    ">

                      👤
                      ${escapeHTML(
                        order.userEmail||""
                      )}

                    </div>

                    <label style="
                      display:block;
                      margin-top:14px;
                    ">
                      Statut
                    </label>

                    <select
                      id="status-${order.id}"
                      style="width:100%"
                    >

                      ${
                        [
                          "Enregistrée",
                          "Acceptée",
                          "Préparation",
                          "En transit",
                          "Livraison proche",
                          "Livrée",
                          "Annulée"
                        ]
                        .map(
                          status=>`

                            <option
                              value="${escapeHTML(
                                status
                              )}"
                              ${
                                (
                                  order.status||
                                  "Enregistrée"
                                )===status
                                  ?"selected"
                                  :""
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

                    <label style="
                      display:block;
                      margin-top:10px;
                    ">
                      Ville
                    </label>

                    <input
                      id="city-${order.id}"
                      type="text"
                      value="${escapeHTML(
                        order.city||""
                      )}"
                      placeholder="Ville"
                    >

                    <label style="
                      display:block;
                      margin-top:10px;
                    ">
                      Numéro de suivi
                    </label>

                    <input
                      id="tracking-${order.id}"
                      type="text"
                      value="${escapeHTML(
                        order.tracking||""
                      )}"
                      placeholder="Numéro de suivi"
                    >

                    <label style="
                      display:block;
                      margin-top:10px;
                    ">
                      Livraison estimée
                    </label>

                    <input
                      id="delivery-${order.id}"
                      type="text"
                      value="${escapeHTML(
                        order.estimatedDelivery||""
                      )}"
                      placeholder="Ex : 25 septembre"
                    >

                    <div style="
                      display:flex;
                      gap:8px;
                      flex-wrap:wrap;
                      margin-top:14px;
                    ">

                      <button
                        type="button"
                        class="add-btn"
                        data-save-order="${order.id}"
                      >
                        💾 Enregistrer
                      </button>

                      <button
                        type="button"
                        class="view-btn"
                        data-paid-order="${order.id}"
                      >
                        💳 Marquer payé
                      </button>

                      <button
                        type="button"
                        class="view-btn"
                        data-invoice-order="${order.id}"
                      >
                        🧾 Facture
                      </button>

                      <button
                        type="button"
                        class="view-btn"
                        data-delete-order="${order.id}"
                        style="color:#ff7777"
                      >
                        🗑️ Supprimer
                      </button>

                    </div>

                  </div>

                `
              ).join("")
              :
              `

                <div class="empty-state">

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

      </div>

    `
  );

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
          "novaAdminAuthorized"
        );

        closeModal();

      }
    );

  $("generateNovaCard")
    ?.addEventListener(
      "click",
      ()=>{

        const card=
          generateNovaCard();

        const display=
          $("adminNovaCardDisplay");

        if(display){

          display.innerHTML=
            novaCardHTML(card);

        }

        toast(
          "Carte créée 💳",
          "success"
        );

      }
    );

  document
    .querySelectorAll(
      "[data-save-order]"
    )
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>saveAdminOrder(
          button.dataset.saveOrder
        )
      );

    });

  document
    .querySelectorAll(
      "[data-paid-order]"
    )
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>markOrderPaid(
          button.dataset.paidOrder
        )
      );

    });

  document
    .querySelectorAll(
      "[data-invoice-order]"
    )
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{

          const order=
            orders.find(
              item=>
                item.id===
                button.dataset.invoiceOrder
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
      "[data-delete-order]"
    )
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>deleteAdminOrder(
          button.dataset.deleteOrder
        )
      );

    });

}


async function saveAdminOrder(id){

  if(!isAdminUser()){

    toast(
      "Accès refusé.",
      "error"
    );

    return;

  }

  const status=
    $(`status-${id}`)
      ?.value||
    "Enregistrée";

  const city=
    $(`city-${id}`)
      ?.value
      .trim()||
    "";

  const tracking=
    $(`tracking-${id}`)
      ?.value
      .trim()||
    "";

  const estimatedDelivery=
    $(`delivery-${id}`)
      ?.value
      .trim()||
    "";

  try{

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

  }catch(error){

    console.error(
      "Save admin order error:",
      error
    );

    toast(
      "Impossible d'enregistrer.",
      "error"
    );

  }

}


async function markOrderPaid(id){

  if(!isAdminUser()){

    toast(
      "Accès refusé.",
      "error"
    );

    return;

  }

  try{

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
      "Commande marquée comme payée 💳",
      "success"
    );

  }catch(error){

    console.error(
      "Mark paid error:",
      error
    );

    toast(
      "Impossible de modifier le paiement.",
      "error"
    );

  }

}


async function deleteAdminOrder(id){

  if(!isAdminUser()){

    toast(
      "Accès refusé.",
      "error"
    );

    return;

  }

  const confirmed=
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
      "Commande supprimée.",
      "success"
    );

    await loadAdmin();

  }catch(error){

    console.error(
      "Delete order error:",
      error
    );

    toast(
      "Impossible de supprimer la commande.",
      "error"
    );

  }

}


/* =========================================================
   PARAMÈTRES
========================================================= */

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

  const theme=
    getTheme();

  if(theme==="light"){

    document.documentElement.dataset.theme=
      "light";

  }else if(theme==="dark"){

    document.documentElement.dataset.theme=
      "dark";

  }else{

    const prefersDark=
      window
        .matchMedia?.(
          "(prefers-color-scheme: dark)"
        )
        .matches;

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
        ${escapeHTML(
          current
        )}
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


/* =========================================================
   RECHERCHE / TRI
========================================================= */

searchInput?.addEventListener(
  "input",
  event=>{

    state.search=
      event.target.value||
      "";

    renderProducts();

  }
);


sortSelect?.addEventListener(
  "change",
  event=>{

    state.sort=
      event.target.value||
      "default";

    renderProducts();

  }
);


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
  "keydown",
  event=>{

    if(
      event.key!=="Escape"
    ){
      return;
    }

    closeModal();
    closeCart();

  }
);


/* =========================================================
   FIREBASE ERREURS
========================================================= */

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


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user=>{

    currentUser=
      user;

    if(accountBtn){

      if(user){

        const email=
          user.email||
          "";

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
        (
          user.email||
          ""
        ).toLowerCase()===
        ADMIN_EMAIL.toLowerCase();

      adminBtn.style.display=
        isAdmin
          ?""
          :"none";

    }

  }
);


/* =========================================================
   INITIALISATION
========================================================= */

loadCart();
loadFavorites();

applyTheme();

renderCategories();
renderProducts();
renderCart();


/* =========================================================
   API NOVASHOP
========================================================= */

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

  money,

  generateNovaCard,

  getNovaCard

};


console.log(
  "NovaShop chargé avec succès 🚀"
);
