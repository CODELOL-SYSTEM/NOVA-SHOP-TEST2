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
  apiKey:"AIzaSy5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
  authDomain:"novashop-4ee63.firebaseapp.com",
  projectId:"novashop-4ee63",
  storageBucket:"novashop-4ee63.firebasestorage.app",
  messagingSenderId:"1044964015809",
  appId:"1:1044964015809:web:4eafe0b1aede48f8539e40",
  measurementId:"G-XNY5X2VMY9"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


/* =========================================================
   ADMIN
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";

const ADMIN_CODE = "NOVA-ADMIN-2026";

const PAYPAL_USERNAME = "SH0PNOVA";


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
   VARIABLES
========================================================= */

let cart =
  JSON.parse(
    localStorage.getItem("novaCart") || "[]"
  );

let favorites =
  JSON.parse(
    localStorage.getItem("novaFavorites") || "[]"
  );

let selectedCategory = "Tous";

let selectedPayment = "card";

let currentUser = null;


/* =========================================================
   HELPERS
========================================================= */

const $ = id =>
  document.getElementById(id);


function money(value){

  return Number(value || 0).toLocaleString(
    "fr-FR",
    {
      style:"currency",
      currency:"EUR"
    }
  );

}


function escapeHTML(value){

  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}


function saveCart(){

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );

  updateCounters();

}


function saveFavorites(){

  localStorage.setItem(
    "novaFavorites",
    JSON.stringify(favorites)
  );

  updateCounters();

}


function toast(message){

  const el = $("toast");

  el.textContent = message;

  el.classList.add("show");

  clearTimeout(window.novaToastTimer);

  window.novaToastTimer =
    setTimeout(
      () => el.classList.remove("show"),
      2500
    );

}


function openModal(html){

  $("modalContent").innerHTML = html;

  $("modalOverlay").classList.add("show");

}


function closeModal(){

  $("modalOverlay").classList.remove("show");

  $("modalContent").innerHTML = "";

}


function cartTotal(){

  return cart.reduce(
    (sum,item) =>
      sum +
      item.price *
      item.quantity,
    0
  );

}


function cartCount(){

  return cart.reduce(
    (sum,item) =>
      sum + item.quantity,
    0
  );

}


/* =========================================================
   COMPTEURS
========================================================= */

function updateCounters(){

  $("cartCount").textContent =
    cartCount();

  $("favoritesCount").textContent =
    favorites.length;

}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories(){

  const categories = [
    "Tous",
    ...new Set(
      products.map(
        product => product.category
      )
    )
  ];

  $("categories").innerHTML =
    categories.map(category => `

      <button
        class="category ${
          category === selectedCategory
          ? "active"
          : ""
        }"
        data-category="${escapeHTML(category)}"
      >
        ${escapeHTML(category)}
      </button>

    `).join("");

  document
    .querySelectorAll("[data-category]")
    .forEach(button => {

      button.onclick = () => {

        selectedCategory =
          button.dataset.category;

        renderCategories();

        renderProducts();

      };

    });

}


/* =========================================================
   PRODUITS
========================================================= */

function getFilteredProducts(){

  const search =
    $("searchInput")
      .value
      .trim()
      .toLowerCase();

  let list =
    products.filter(product => {

      const categoryOK =
        selectedCategory === "Tous" ||
        product.category === selectedCategory;

      const searchOK =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search);

      return categoryOK && searchOK;

    });

  const sort =
    $("sortSelect").value;

  if(sort === "priceAsc"){

    list.sort(
      (a,b) => a.price - b.price
    );

  }

  if(sort === "priceDesc"){

    list.sort(
      (a,b) => b.price - a.price
    );

  }

  if(sort === "name"){

    list.sort(
      (a,b) =>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );

  }

  if(sort === "new"){

    list.sort(
      (a,b) =>
        Number(Boolean(b.new)) -
        Number(Boolean(a.new))
    );

  }

  return list;

}


function renderProducts(){

  const list =
    getFilteredProducts();

  if(!list.length){

    $("productsGrid").innerHTML = `
      <div class="empty">
        Aucun produit trouvé 🔎
      </div>
    `;

    return;

  }

  $("productsGrid").innerHTML =
    list.map(product => {

      const isFavorite =
        favorites.includes(product.id);

      return `

        <article
          class="product-card"
          data-product="${product.id}"
        >

          ${
            product.new
            ? `
              <div class="new-tag">
                NOUVEAU
              </div>
            `
            : ""
          }

          <button
            class="favorite ${
              isFavorite ? "active" : ""
            }"
            data-favorite="${product.id}"
          >
            ${
              isFavorite
              ? "♥"
              : "♡"
            }
          </button>

          <img
            class="product-image"
            src="${product.image}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
          >

          <div class="product-content">

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
                data-details="${product.id}"
              >
                Voir
              </button>

              <button
                class="primary"
                data-add="${product.id}"
              >
                🛒 Ajouter
              </button>

            </div>

          </div>

        </article>

      `;

    }).join("");

  bindProductButtons();

}


function bindProductButtons(){

  document
    .querySelectorAll("[data-add]")
    .forEach(button => {

      button.onclick = () => {

        addToCart(
          button.dataset.add
        );

      };

    });


  document
    .querySelectorAll("[data-details]")
    .forEach(button => {

      button.onclick = () => {

        openProduct(
          button.dataset.details
        );

      };

    });


  document
    .querySelectorAll("[data-favorite]")
    .forEach(button => {

      button.onclick = event => {

        event.stopPropagation();

        toggleFavorite(
          button.dataset.favorite
        );

      };

    });

}


/* =========================================================
   FAVORIS
========================================================= */

function toggleFavorite(id){

  if(favorites.includes(id)){

    favorites =
      favorites.filter(
        x => x !== id
      );

    toast("Retiré des favoris.");

  }else{

    favorites.push(id);

    toast("Ajouté aux favoris ❤️");

  }

  saveFavorites();

  renderProducts();

}


function showFavorites(){

  const list =
    products.filter(
      product =>
        favorites.includes(product.id)
    );

  openModal(`

    <h2 class="section-title">
      ❤️ Mes favoris
    </h2>

    ${
      list.length
      ? `
        <div class="products-grid">
          ${list.map(product => `

            <article class="product-card">

              <img
                class="product-image"
                src="${product.image}"
                alt=""
              >

              <div class="product-content">

                <div class="product-name">
                  ${escapeHTML(product.name)}
                </div>

                <div class="product-price">
                  ${money(product.price)}
                </div>

                <button
                  class="primary"
                  data-fav-add="${product.id}"
                  style="width:100%"
                >
                  🛒 Ajouter
                </button>

              </div>

            </article>

          `).join("")}
        </div>
      `
      : `
        <div class="empty">
          Aucun favori pour le moment ❤️
        </div>
      `
    }

  `);

  document
    .querySelectorAll("[data-fav-add]")
    .forEach(button => {

      button.onclick = () => {

        addToCart(
          button.dataset.favAdd
        );

      };

    });

}


/* =========================================================
   PANIER
========================================================= */

function addToCart(id){

  const product =
    products.find(
      p => p.id === id
    );

  if(!product) return;

  const existing =
    cart.find(
      item => item.id === id
    );

  if(existing){

    existing.quantity++;

  }else{

    cart.push({
      id:product.id,
      name:product.name,
      price:product.price,
      image:product.image,
      quantity:1
    });

  }

  saveCart();

  toast("Produit ajouté au panier 🛒");

}


function changeQuantity(id, amount){

  const item =
    cart.find(
      x => x.id === id
    );

  if(!item) return;

  item.quantity += amount;

  if(item.quantity <= 0){

    cart =
      cart.filter(
        x => x.id !== id
      );

  }

  saveCart();

  showCart();

}


function showCart(){

  openModal(`

    <h2 class="section-title">
      🛒 Mon panier
    </h2>

    ${
      cart.length
      ? `

        <div>

          ${cart.map(item => `

            <div class="cart-item">

              <img
                src="${item.image}"
                alt=""
              >

              <div class="cart-info">

                <div class="cart-name">
                  ${escapeHTML(item.name)}
                </div>

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

        </div>

        <div class="total-box">

          <div class="total-line">

            <span>
              Total
            </span>

            <span>
              ${money(cartTotal())}
            </span>

          </div>

          <button
            class="primary"
            id="checkoutBtn"
            style="width:100%;margin-top:15px"
          >
            Passer au paiement
          </button>

        </div>

      `
      : `

        <div class="empty">
          Ton panier est vide 🛒
        </div>

      `
    }

  `);

  document
    .querySelectorAll("[data-minus]")
    .forEach(button => {

      button.onclick = () => {

        changeQuantity(
          button.dataset.minus,
          -1
        );

      };

    });

  document
    .querySelectorAll("[data-plus]")
    .forEach(button => {

      button.onclick = () => {

        changeQuantity(
          button.dataset.plus,
          1
        );

      };

    });

  const checkout =
    $("checkoutBtn");

  if(checkout){

    checkout.onclick =
      showCheckout;

  }

}


/* =========================================================
   PRODUIT
========================================================= */

function openProduct(id){

  const product =
    products.find(
      p => p.id === id
    );

  if(!product) return;

  openModal(`

    <div class="detail">

      <img
        src="${product.image}"
        alt="${escapeHTML(product.name)}"
      >

      <div>

        <div class="product-category">
          ${escapeHTML(product.category)}
        </div>

        <h2>
          ${escapeHTML(product.name)}
        </h2>

        <div class="detail-price">
          ${money(product.price)}
        </div>

        <p style="color:#8e9bb0;line-height:1.6">
          Produit disponible sur NovaShop.
        </p>

        <button
          class="primary"
          id="detailAdd"
          style="width:100%;margin-top:25px"
        >
          🛒 Ajouter au panier
        </button>

      </div>

    </div>

  `);

  $("detailAdd").onclick = () => {

    addToCart(product.id);

  };

}


/* =========================================================
   AUTH
========================================================= */

function showAccount(){

  if(currentUser){

    openModal(`

      <h2 class="section-title">
        👤 Mon compte
      </h2>

      <div class="account-box">

        <div>
          Connecté avec :
        </div>

        <strong>
          ${escapeHTML(currentUser.email)}
        </strong>

        <button
          class="secondary"
          id="myOrdersBtn"
        >
          📦 Mes commandes
        </button>

        <button
          class="danger"
          id="logoutBtn"
        >
          Se déconnecter
        </button>

      </div>

    `);

    $("logoutBtn").onclick =
      async () => {

        await signOut(auth);

        closeModal();

        toast("Déconnecté.");

      };

    $("myOrdersBtn").onclick =
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


  $("loginBtn").onclick =
    async () => {

      const email =
        $("authEmail").value.trim();

      const password =
        $("authPassword").value;

      try{

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        closeModal();

        toast("Connexion réussie ✅");

      }catch(error){

        console.error(error);

        $("authError").innerHTML = `
          <div class="error">
            ❌ Email ou mot de passe incorrect.
          </div>
        `;

      }

    };


  $("registerBtn").onclick =
    async () => {

      const email =
        $("authEmail").value.trim();

      const password =
        $("authPassword").value;

      if(password.length < 6){

        $("authError").innerHTML = `
          <div class="error">
            ❌ Le mot de passe doit contenir au moins 6 caractères.
          </div>
        `;

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

        console.error(error);

        $("authError").innerHTML = `
          <div class="error">
            ❌ Impossible de créer le compte.
          </div>
        `;

      }

    };

}


/* =========================================================
   MES COMMANDES
========================================================= */

async function showMyOrders(){

  if(!currentUser){

    showAccount();

    return;

  }

  openModal(`

    <h2 class="section-title">
      📦 Mes commandes
    </h2>

    <div id="myOrders">
      Chargement...
    </div>

  `);

  try{

    const q =
      query(
        collection(db,"orders"),
        where(
          "customerEmail",
          "==",
          currentUser.email
        )
      );

    const snapshot =
      await getDocs(q);

    if(snapshot.empty){

      $("myOrders").innerHTML = `
        <div class="empty">
          Aucune commande.
        </div>
      `;

      return;

    }

    const orders =
      snapshot.docs
        .map(orderDoc => ({
          id:orderDoc.id,
          ...orderDoc.data()
        }))
        .sort((a,b) => {

          const dateA =
            a.createdAt?.seconds || 0;

          const dateB =
            b.createdAt?.seconds || 0;

          return dateB - dateA;

        });


    $("myOrders").innerHTML =
      orders.map(order => `

        <div class="order-card">

          <strong>
            Commande #${escapeHTML(
              order.id.slice(0,8)
            )}
          </strong>

          <br><br>

          Total :
          <strong>
            ${money(order.total)}
          </strong>

          <br>

          Paiement :
          ${
            order.paymentMethod === "card"
            ? "💳 Carte"
            : "🅿️ PayPal"
          }

          <br>

          Statut :
          <span class="status ${
            order.paymentStatus || "pending"
          }">
            ${escapeHTML(
              order.paymentStatus || "pending"
            )}
          </span>

        </div>

      `).join("");

  }catch(error){

    console.error(error);

    $("myOrders").innerHTML = `
      <div class="error">
        ❌ Impossible de charger les commandes.
      </div>
    `;

  }

}


/* =========================================================
   CHECKOUT
========================================================= */

function showCheckout(){

  if(!cart.length){

    toast("Ton panier est vide.");

    return;

  }

  if(!currentUser){

    toast("Connecte-toi avant de payer.");

    showAccount();

    return;

  }

  openModal(`

    <h2 class="section-title">
      💳 Paiement
    </h2>

    <div class="form">

      <input
        id="customerName"
        placeholder="Nom complet"
      >

      <input
        id="customerEmail"
        type="email"
        value="${escapeHTML(
          currentUser.email
        )}"
        placeholder="Email"
      >

      <div class="total-box">

        <div class="total-line">

          <span>
            Total
          </span>

          <span>
            ${money(cartTotal())}
          </span>

        </div>

      </div>

      <div class="payment-choice">

        <button
          type="button"
          class="payment-btn active"
          id="cardPaymentBtn"
        >
          💳 Carte
        </button>

        <button
          type="button"
          class="payment-btn"
          id="paypalPaymentBtn"
        >
          🅿️ PayPal
        </button>

      </div>

      <div id="paymentArea"></div>

      <button
        class="primary"
        id="payBtn"
      >
        Payer ${money(cartTotal())}
      </button>

    </div>

  `);

  renderPaymentArea();

  $("cardPaymentBtn").onclick =
    () => {

      selectedPayment = "card";

      $("cardPaymentBtn")
        .classList.add("active");

      $("paypalPaymentBtn")
        .classList.remove("active");

      renderPaymentArea();

    };


  $("paypalPaymentBtn").onclick =
    () => {

      selectedPayment = "paypal";

      $("paypalPaymentBtn")
        .classList.add("active");

      $("cardPaymentBtn")
        .classList.remove("active");

      renderPaymentArea();

    };


  $("payBtn").onclick =
    handlePayment;

}


/* =========================================================
   ZONE PAIEMENT
========================================================= */

function renderPaymentArea(){

  if(selectedPayment === "card"){

    $("paymentArea").innerHTML = `

      <div class="card-box">

        <strong>
          💳 Paiement par carte
        </strong>

        <p style="color:#8e9bb0;margin:8px 0 14px">
          Mode test local NovaShop.
        </p>

        <div class="form">

          <input
            id="cardNumber"
            inputmode="numeric"
            maxlength="19"
            placeholder="Numéro de carte"
          >

          <div class="card-grid">

            <input
              id="cardExpiry"
              placeholder="MM/AA"
              maxlength="5"
            >

            <input
              id="cardCvv"
              inputmode="numeric"
              placeholder="CVV"
              maxlength="4"
            >

          </div>

          <div id="cardError"></div>

        </div>

      </div>

    `;

    $("cardNumber").addEventListener(
      "input",
      event => {

        let value =
          event.target.value
            .replace(/\D/g,"")
            .slice(0,16);

        value =
          value.match(/.{1,4}/g)?.join(" ")
          || "";

        event.target.value = value;

      }
    );

    $("cardExpiry").addEventListener(
      "input",
      event => {

        let value =
          event.target.value
            .replace(/\D/g,"")
            .slice(0,4);

        if(value.length > 2){

          value =
            value.slice(0,2) +
            "/" +
            value.slice(2);

        }

        event.target.value = value;

      }
    );

    return;

  }


  $("paymentArea").innerHTML = `

    <div class="paypal-box">

      <strong>
        🅿️ Paiement PayPal
      </strong>

      <p style="color:#8e9bb0;margin-top:8px;line-height:1.5">
        Tu seras redirigé vers PayPal pour effectuer le paiement.
      </p>

      <p style="margin-top:10px">
        Montant :
        <strong>
          ${money(cartTotal())}
        </strong>
      </p>

    </div>

  `;

}


/* =========================================================
   CREATION COMMANDE
========================================================= */

async function createOrder(
  name,
  email,
  total,
  paymentMethod,
  paymentStatus
){

  if(!currentUser){

    throw new Error(
      "Utilisateur non connecté"
    );

  }

  return await addDoc(
    collection(db,"orders"),
    {
      customerName:name,
      customerEmail:email,
      userId:currentUser.uid,

      items:cart.map(item => ({
        id:item.id,
        name:item.name,
        price:item.price,
        quantity:item.quantity
      })),

      total:Number(total),

      paymentMethod,
      paymentStatus,

      createdAt:serverTimestamp()
    }
  );

}


/* =========================================================
   PAIEMENT
========================================================= */

async function handlePayment(event){

  event.preventDefault();

  const name =
    $("customerName").value.trim();

  const email =
    $("customerEmail").value.trim();

  const total =
    cartTotal();


  if(!name || !email){

    toast(
      "Remplis tes informations."
    );

    return;

  }


  if(total <= 0){

    toast(
      "Ton panier est vide."
    );

    return;

  }


  /* =========================
     CARTE
  ========================= */

  if(selectedPayment === "card"){

    const number =
      $("cardNumber")
        .value
        .replace(/\s/g,"");

    const expiry =
      $("cardExpiry").value;

    const cvv =
      $("cardCvv").value;


    const validCard =
      number === "1234567890123456" &&
      expiry === "12/42" &&
      cvv === "144";


    if(!validCard){

      $("cardError").innerHTML = `

        <div class="error">
          ❌ Carte incorrecte
        </div>

      `;

      return;

    }


    try{

      await createOrder(
        name,
        email,
        total,
        "card",
        "paid"
      );

      cart = [];

      saveCart();

      openPaymentSuccess();

    }catch(error){

      console.error(error);

      toast(
        "Impossible d'enregistrer la commande."
      );

    }

    return;

  }


  /* =========================
     PAYPAL
  ========================= */

  if(selectedPayment === "paypal"){

    const paypalUrl =
      "https://paypal.me/" +
      PAYPAL_USERNAME +
      "/" +
      encodeURIComponent(
        total.toFixed(2)
      );


    /*
      On ouvre immédiatement le lien.
      Sur iPhone, iOS peut alors reconnaître
      le lien PayPal et proposer/lancer l'application
      PayPal si elle est installée.
    */

    let paypalWindow = null;

    try{

      paypalWindow =
        window.open(
          paypalUrl,
          "_blank"
        );

    }catch(error){

      console.log(
        "Ouverture PayPal bloquée",
        error
      );

    }


    try{

      await createOrder(
        name,
        email,
        total,
        "paypal",
        "pending"
      );

      cart = [];

      saveCart();


      /*
        Si Safari bloque le nouvel onglet,
        on redirige directement la page actuelle.
      */

      if(!paypalWindow){

        window.location.href =
          paypalUrl;

      }

      closeModal();

    }catch(error){

      console.error(error);

      if(paypalWindow){

        try{
          paypalWindow.close();
        }catch(e){}
        
      }

      toast(
        "Impossible d'enregistrer la commande."
      );

    }

  }

}


/* =========================================================
   SUCCÈS
========================================================= */

function openPaymentSuccess(){

  openModal(`

    <div style="
      text-align:center;
      padding:30px 10px;
    ">

      <div style="
        font-size:60px;
        margin-bottom:15px;
      ">
        ✅
      </div>

      <h2>
        Paiement accepté
      </h2>

      <p style="
        color:#8e9bb0;
        margin:15px 0 25px;
      ">
        Ta commande a été enregistrée.
      </p>

      <button
        class="primary"
        id="successClose"
      >
        Fermer
      </button>

    </div>

  `);

  $("successClose").onclick =
    closeModal;

}


/* =========================================================
   ADMIN
========================================================= */

function isAdmin(){

  return currentUser &&
    currentUser.email
      .toLowerCase() ===
    ADMIN_EMAIL.toLowerCase();

}


/* =========================================================
   DASHBOARD
========================================================= */

async function showDashboard(){

  if(!currentUser){

    toast(
      "Connecte-toi pour accéder au dashboard."
    );

    showAccount();

    return;

  }


  if(!isAdmin()){

    openModal(`

      <h2 class="section-title">
        👑 Dashboard
      </h2>

      <div class="error">
        ❌ Accès administrateur requis.
      </div>

    `);

    return;

  }


  openModal(`

    <h2 class="section-title">
      👑 Dashboard NovaShop
    </h2>

    <div
      id="adminDashboard"
    >
      Chargement...
    </div>

  `);


  $("adminDashboard").innerHTML = `

    <div
      style="
        display:grid;
        gap:15px;
      "
    >

      <div class="total-box">

        <strong>
          Administrateur
        </strong>

        <p style="color:#8e9bb0;margin-top:5px">
          ${escapeHTML(currentUser.email)}
        </p>

      </div>

      <div
        id="adminOrders"
        class="admin-wrap"
      >
        Chargement des commandes...
      </div>

    </div>

  `;


  await renderAdminOrders();

}


/* =========================================================
   COMMANDES ADMIN
========================================================= */

async function renderAdminOrders(){

  const container =
    $("adminOrders");


  try{

    /*
      IMPORTANT :
      Pas de orderBy Firebase ici.
      On récupère les commandes puis
      on les trie directement en JavaScript.
    */

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );


    if(snapshot.empty){

      container.innerHTML = `

        <div class="empty">
          Aucune commande.
        </div>

      `;

      return;

    }


    const orders =
      snapshot.docs
        .map(orderDoc => ({
          id:orderDoc.id,
          ...orderDoc.data()
        }))
        .sort((a,b) => {

          const dateA =
            a.createdAt?.seconds || 0;

          const dateB =
            b.createdAt?.seconds || 0;

          return dateB - dateA;

        });


    container.innerHTML = `

      <table class="admin-table">

        <thead>

          <tr>

            <th>
              Commande
            </th>

            <th>
              Client
            </th>

            <th>
              Total
            </th>

            <th>
              Paiement
            </th>

            <th>
              Statut
            </th>

            <th>
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          ${orders.map(order => `

            <tr>

              <td>
                #${escapeHTML(
                  order.id.slice(0,8)
                )}
              </td>

              <td>

                ${escapeHTML(
                  order.customerEmail || "?"
                )}

              </td>

              <td>

                ${money(
                  order.total || 0
                )}

              </td>

              <td>

                ${
                  order.paymentMethod === "card"
                  ? "💳 Carte"
                  : "🅿️ PayPal"
                }

              </td>

              <td>

                <span
                  class="status ${
                    order.paymentStatus ||
                    "pending"
                  }"
                >

                  ${escapeHTML(
                    order.paymentStatus ||
                    "pending"
                  )}

                </span>

              </td>

              <td>

                ${
                  order.paymentStatus !== "paid"

                  ? `

                    <button
                      class="small-btn"
                      data-paid="${order.id}"
                    >
                      ✓ Payé
                    </button>

                  `

                  : `

                    <span class="success">
                      ✓ Payé
                    </span>

                  `
                }

              </td>

            </tr>

          `).join("")}

        </tbody>

      </table>

    `;


    document
      .querySelectorAll("[data-paid]")
      .forEach(button => {

        button.onclick =
          async () => {

            try{

              await updateDoc(
                doc(
                  db,
                  "orders",
                  button.dataset.paid
                ),
                {
                  paymentStatus:"paid"
                }
              );


              toast(
                "Commande marquée comme payée ✅"
              );


              await renderAdminOrders();

            }catch(error){

              console.error(error);

              toast(
                "Erreur lors de la mise à jour."
              );

            }

          };

      });


  }catch(error){

    console.error(
      "ERREUR FIRESTORE COMMANDES :",
      error
    );


    container.innerHTML = `

      <div class="error">

        ❌ Impossible de charger les commandes.

        <br><br>

        Vérifie les règles Firestore.

      </div>

    `;

  }

}


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;

    updateCounters();

  }
);


/* =========================================================
   EVENTS
========================================================= */

$("searchInput").addEventListener(
  "input",
  renderProducts
);


$("sortSelect").addEventListener(
  "change",
  renderProducts
);


$("closeModal").onclick =
  closeModal;


$("modalOverlay").addEventListener(
  "click",
  event => {

    if(
      event.target ===
      $("modalOverlay")
    ){

      closeModal();

    }

  }
);


$("cartBtn").onclick =
  showCart;


$("favoritesBtn").onclick =
  showFavorites;


$("accountBtn").onclick =
  showAccount;


$("dashboardBtn").onclick =
  showDashboard;


$("heroDashboardBtn").onclick =
  showDashboard;


$("productsBtn").onclick =
  () => {

    document
      .querySelector(".container")
      .scrollIntoView({
        behavior:"smooth"
      });

  };


/* =========================================================
   INIT
========================================================= */

renderCategories();

renderProducts();

updateCounters();


/* =========================================================
   EXPORT
========================================================= */

window.NovaShop = {

  products,

  cart,

  favorites,

  showCart,

  showAccount,

  showDashboard,

  renderProducts

};
