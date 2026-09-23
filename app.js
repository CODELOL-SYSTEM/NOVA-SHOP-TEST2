// ============================================================
// NOVASHOP - APP.JS
// PRODUITS UNIQUEMENT
// ============================================================

"use strict";


// ============================================================
// PRODUITS
// ============================================================

const products = [

  // ==========================================================
  // COMPOSANTS
  // ==========================================================

  {
    id:"p1",
    name:"Gigabyte B650 AORUS Elite AX",
    category:"Composants",
    price:189.99,
    image:"https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"
  },

  {
    id:"p2",
    name:"ASUS TUF Gaming B650-PLUS",
    category:"Composants",
    price:179.90,
    image:""
  },

  {
    id:"p3",
    name:"MSI MAG B650 Tomahawk",
    category:"Composants",
    price:189.90,
    image:""
  },

  {
    id:"p4",
    name:"AMD Ryzen 7 7800X3D",
    category:"Composants",
    price:0,
    image:""
  },

  {
    id:"p5",
    name:"AMD Ryzen 7 9800X3D",
    category:"Composants",
    price:0,
    image:""
  },

  {
    id:"p6",
    name:"AMD Ryzen 9 9950X3D",
    category:"Composants",
    price:0,
    image:""
  },


  // ==========================================================
  // PC GAMER
  // ==========================================================

  {
    id:"p7",
    name:"PC Gamer Ryzen 7 7800X3D / RX 9070 XT / 32 Go DDR5",
    category:"PC Gamer",
    price:2237.65,
    image:""
  },


  // ==========================================================
  // CASQUES
  // ==========================================================

  {
    id:"p8",
    name:"HyperX Cloud II",
    category:"Casques",
    price:49.99,
    image:""
  },


  // ==========================================================
  // CLAVIERS
  // ==========================================================

  {
    id:"p9",
    name:"TECORS 60% AZERTY",
    category:"Claviers",
    price:30,
    image:""
  },

  {
    id:"p10",
    name:"Celshading 65%",
    category:"Claviers",
    price:120.90,
    image:""
  },


  // ==========================================================
  // SOURIS
  // ==========================================================

  {
    id:"p11",
    name:"Ajazz AJ199 MAX",
    category:"Souris",
    price:49.99,
    image:""
  },

  {
    id:"p12",
    name:"Logitech G PRO X2 Superstrike",
    category:"Souris",
    price:150.99,
    image:""
  },


  // ==========================================================
  // STOCKAGE
  // ==========================================================

  {
    id:"p13",
    name:"Samsung 990 PRO 1TB",
    category:"Stockage",
    price:249.99,
    image:""
  },

  {
    id:"p14",
    name:"Samsung 990 PRO 2TB",
    category:"Stockage",
    price:199.93,
    image:""
  },


  // ==========================================================
  // ALIMENTATIONS
  // ==========================================================

  {
    id:"p15",
    name:"Corsair RM1000x",
    category:"Alimentations",
    price:159.90,
    image:""
  },

  {
    id:"p16",
    name:"Corsair RM850x",
    category:"Alimentations",
    price:134.90,
    image:""
  },


  // ==========================================================
  // BOÎTIERS
  // ==========================================================

  {
    id:"p17",
    name:"Corsair Frame 5000D",
    category:"Boîtiers",
    price:159.90,
    image:""
  },


  // ==========================================================
  // REFROIDISSEMENT
  // ==========================================================

  {
    id:"p18",
    name:"Arctic Liquid Freezer III Pro 360",
    category:"Refroidissement",
    price:129.90,
    image:""
  },


  // ==========================================================
  // ÉCRANS
  // ==========================================================

  {
    id:"p19",
    name:"Samsung 27 QD-OLED Odyssey G6",
    category:"Écrans",
    price:399.95,
    image:""
  },


  // ==========================================================
  // STREAMING
  // ==========================================================

  {
    id:"p20",
    name:"Elgato Wave Mic Arm Pro",
    category:"Streaming",
    price:229.90,
    image:""
  },


  // ==========================================================
  // MANETTES
  // ==========================================================

  {
    id:"p21",
    name:"DualSense Cosmic Red",
    category:"Manettes",
    price:74.90,
    image:""
  },


  // ==========================================================
  // TAPIS DE SOURIS
  // ==========================================================

  {
    id:"p22",
    name:"Razer Gigantus V2 XXL",
    category:"Tapis de souris",
    price:21,
    image:""
  },

  {
    id:"p23",
    name:"Logitech G840",
    category:"Tapis de souris",
    price:15,
    image:""
  },


  // ==========================================================
  // CHAISES GAMING
  // ==========================================================

  {
    id:"p24",
    name:"Chaise Gaming",
    category:"Chaises gaming",
    price:0,
    image:""
  },


  // ==========================================================
  // BUREAUX GAMING
  // ==========================================================

  {
    id:"p25",
    name:"Bureau Gaming",
    category:"Bureaux gaming",
    price:0,
    image:""
  },


  // ==========================================================
  // MICROPHONES
  // ==========================================================

  {
    id:"p26",
    name:"Microphone Gaming USB",
    category:"Microphones",
    price:0,
    image:""
  },


  // ==========================================================
  // ÉCLAIRAGE RGB
  // ==========================================================

  {
    id:"p27",
    name:"Éclairage RGB Gaming",
    category:"Éclairage RGB",
    price:0,
    image:""
  },


  // ==========================================================
  // CARTES GRAPHIQUES
  // ==========================================================

  {
    id:"p28",
    name:"GeForce RTX 5090",
    category:"Cartes graphiques",
    price:0,
    image:""
  },

  {
    id:"p29",
    name:"Radeon RX 9070 XT",
    category:"Cartes graphiques",
    price:0,
    image:""
  },


  // ==========================================================
  // SMARTPHONES
  // ==========================================================

  {
    id:"p30",
    name:"Smartphone Gaming",
    category:"Smartphones",
    price:0,
    image:""
  },


  // ==========================================================
  // IMPRIMANTES 3D
  // ==========================================================

  {
    id:"p31",
    name:"Imprimante 3D",
    category:"Imprimantes 3D",
    price:0,
    image:""
  },


  // ==========================================================
  // LOGICIELS & LICENCES
  // ==========================================================

  {
    id:"p32",
    name:"Licence Windows",
    category:"Logiciels & licences",
    price:0,
    image:""
  },

  {
    id:"p33",
    name:"Clé de jeu vidéo",
    category:"Logiciels & licences",
    price:0,
    image:""
  },


  // ==========================================================
  // ACCESSOIRES COMPOSANTS PC
  // ==========================================================

  {
    id:"p34",
    name:"Accessoire composant PC",
    category:"Accessoires composants PC",
    price:0,
    image:""
  },


  // ==========================================================
  // ADAPTATEURS / CÂBLES / CHARGEURS
  // ==========================================================

  {
    id:"p35",
    name:"Câble HDMI",
    category:"Adaptateurs / câbles / chargeurs",
    price:0,
    image:""
  },

  {
    id:"p36",
    name:"Câble USB-C",
    category:"Adaptateurs / câbles / chargeurs",
    price:0,
    image:""
  },

  {
    id:"p37",
    name:"Câble Lightning",
    category:"Adaptateurs / câbles / chargeurs",
    price:0,
    image:""
  },

  {
    id:"p38",
    name:"Câble Apple Watch",
    category:"Adaptateurs / câbles / chargeurs",
    price:0,
    image:""
  },


  // ==========================================================
  // CAMÉRAS & WEBCAMS
  // ==========================================================

  {
    id:"p39",
    name:"Webcam Gaming",
    category:"Caméras & webcams",
    price:0,
    image:""
  },


  // ==========================================================
  // BARRES LUMINEUSES
  // ==========================================================

  {
    id:"p40",
    name:"Barre lumineuse pour écran",
    category:"Barres lumineuses pour écran",
    price:0,
    image:""
  },


  // ==========================================================
  // SUPPORTS ÉCRANS / ÉCRANS / TV
  // ==========================================================

  {
    id:"p41",
    name:"Support écran",
    category:"Supports écrans / écrans / TV",
    price:0,
    image:""
  },

  {
    id:"p42",
    name:"Écran Gaming",
    category:"Supports écrans / écrans / TV",
    price:0,
    image:""
  },

  {
    id:"p43",
    name:"TV Gaming",
    category:"Supports écrans / écrans / TV",
    price:0,
    image:""
  },


  // ==========================================================
  // MANETTES & CONSOLES
  // ==========================================================

  {
    id:"p44",
    name:"Console Gaming",
    category:"Manettes & consoles",
    price:0,
    image:""
  },

  {
    id:"p45",
    name:"Manette Gaming",
    category:"Manettes & consoles",
    price:0,
    image:""
  },


  // ==========================================================
  // COMPOSANTS PC
  // ==========================================================

  {
    id:"p46",
    name:"Composant PC Gaming",
    category:"Composants PC",
    price:0,
    image:""
  },


  // ==========================================================
  // PC GAMER PRÉCONSTRUITS
  // ==========================================================

  {
    id:"p47",
    name:"PC Gamer préconstruit",
    category:"PC Gamer préconstruits",
    price:0,
    image:""
  },


  // ==========================================================
  // PC PORTABLES
  // ==========================================================

  {
    id:"p48",
    name:"PC portable Gaming",
    category:"PC portables Gaming & Travail",
    price:0,
    image:""
  },

  {
    id:"p49",
    name:"PC portable Travail",
    category:"PC portables Gaming & Travail",
    price:0,
    image:""
  },


  // ==========================================================
  // PRODUITS 85 À 105
  // ==========================================================

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
// NOTES
// ============================================================

products.forEach((product,index) => {

  product.rating =
    Number(
      (
        4.2 +
        ((index * 17) % 81) / 100
      ).toFixed(1)
    );

  product.reviewCount =
    1248 +
    ((index * 137) % 2028);

});


// ============================================================
// ÉTAT
// ============================================================

let selectedCategory = "Tous";
let searchValue = "";
let sortValue = "default";

let cart = [];
let favorites = [];


// ============================================================
// LOCAL STORAGE
// ============================================================

try {

  cart =
    JSON.parse(
      localStorage.getItem("novaCart")
    ) || [];

} catch {

  cart = [];

}


try {

  favorites =
    JSON.parse(
      localStorage.getItem("novaFavorites")
    ) || [];

} catch {

  favorites = [];

}


// ============================================================
// DOM
// ============================================================

const searchInput =
  document.getElementById("searchInput");

const categoriesEl =
  document.getElementById("categories");

const productsGrid =
  document.getElementById("productGrid");

const productCount =
  document.getElementById("productCount");

const sortSelect =
  document.getElementById("sortSelect");

const cartBtn =
  document.getElementById("cartBtn");

const cartBadge =
  document.getElementById("cartBadge");

const cartOverlay =
  document.getElementById("cartOverlay");

const cartDrawer =
  document.getElementById("cartDrawer");

const cartClose =
  document.getElementById("cartClose");

const cartItems =
  document.getElementById("cartItems");

const cartTotal =
  document.getElementById("cartTotal");

const checkoutBtn =
  document.getElementById("checkoutBtn");

const modal =
  document.getElementById("modal");

const modalContent =
  document.getElementById("modalContent");

const modalClose =
  document.getElementById("modalClose");

const modalTitle =
  document.getElementById("modalTitle");

const toastContainer =
  document.getElementById("toastContainer");


// ============================================================
// UTILITAIRES
// ============================================================

function money(value){

  return Number(value || 0)
    .toLocaleString(
      "fr-FR",
      {
        minimumFractionDigits:2,
        maximumFractionDigits:2
      }
    ) + " €";

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

  return products.find(
    product => product.id === id
  );

}


function saveCart(){

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );

}


function saveFavorites(){

  localStorage.setItem(
    "novaFavorites",
    JSON.stringify(favorites)
  );

}


function getCartCount(){

  return cart.reduce(
    (total,item) =>
      total + Number(item.quantity || 0),
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
        Number(item.quantity || 0);

    },
    0
  );

}


// ============================================================
// IMAGE
// ============================================================

function imageHTML(product){

  if(!product.image){
    return "";
  }

  return `
    <img
      class="product-image"
      src="${escapeHTML(product.image)}"
      alt="${escapeHTML(product.name)}"
      loading="lazy"
      onerror="
        this.onerror=null;
        this.style.display='none';
      "
    >
  `;

}


// ============================================================
// CATÉGORIES
// ============================================================

function renderCategories(){

  if(!categoriesEl){
    return;
  }

  const categories = [
    "Tous",
    ...new Set(
      products.map(
        product => product.category
      )
    )
  ];

  categoriesEl.innerHTML =
    categories.map(category => {

      return `
        <button
          class="category-btn ${
            selectedCategory === category
              ? "active"
              : ""
          }"
          data-category="${escapeHTML(category)}"
        >
          ${escapeHTML(category)}
        </button>
      `;

    }).join("");


  categoriesEl
    .querySelectorAll("[data-category]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          selectedCategory =
            button.dataset.category;

          renderCategories();
          renderProducts();

        }
      );

    });

}


// ============================================================
// FILTRE
// ============================================================

function getFilteredProducts(){

  let result =
    [...products];


  if(
    selectedCategory !== "Tous"
  ){

    result =
      result.filter(
        product =>
          product.category ===
          selectedCategory
      );

  }


  const search =
    searchValue
      .trim()
      .toLowerCase();


  if(search){

    result =
      result.filter(product =>
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
    sortValue === "priceAsc" ||
    sortValue === "price-low"
  ){

    result.sort(
      (a,b) =>
        Number(a.price) -
        Number(b.price)
    );

  }

  else if(
    sortValue === "priceDesc" ||
    sortValue === "price-high"
  ){

    result.sort(
      (a,b) =>
        Number(b.price) -
        Number(a.price)
    );

  }

  else if(
    sortValue === "name"
  ){

    result.sort(
      (a,b) =>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );

  }

  else if(
    sortValue === "new"
  ){

    result.reverse();

  }


  return result;

}


// ============================================================
// ÉTOILES
// ============================================================

function ratingStars(rating){

  const rounded =
    Math.round(
      Number(rating)
    );

  return Array
    .from(
      {length:5},
      (_,index) =>
        index < rounded
          ? "★"
          : "☆"
    )
    .join("");

}


// ============================================================
// PRODUITS
// ============================================================

function renderProducts(){

  if(!productsGrid){
    return;
  }


  const filtered =
    getFilteredProducts();


  if(productCount){

    productCount.textContent =
      `${filtered.length} produit${
        filtered.length > 1
          ? "s"
          : ""
      }`;

  }


  if(!filtered.length){

    productsGrid.innerHTML = `
      <div class="empty-products">
        Aucun produit trouvé.
      </div>
    `;

    return;

  }


  productsGrid.innerHTML =
    filtered.map(product => {

      const isFavorite =
        favorites.includes(
          product.id
        );


      return `
        <article
          class="product-card"
          data-product-id="${escapeHTML(product.id)}"
        >

          <button
            class="favorite-btn ${
              isFavorite
                ? "active"
                : ""
            }"
            data-favorite="${escapeHTML(product.id)}"
          >
            ${
              isFavorite
                ? "♥"
                : "♡"
            }
          </button>


          <div
            class="product-image-wrap"
            data-open-product="${escapeHTML(product.id)}"
          >
            ${imageHTML(product)}
          </div>


          <div class="product-info">

            <div class="product-category">
              ${escapeHTML(product.category)}
            </div>

            <h3>
              ${escapeHTML(product.name)}
            </h3>


            <div class="product-rating">

              <span>
                ${ratingStars(product.rating)}
              </span>

              <span>
                ${product.rating}
              </span>

              <span>
                (${product.reviewCount})
              </span>

            </div>


            <div class="product-bottom">

              <strong>
                ${money(product.price)}
              </strong>

              <button
                class="add-product-btn"
                data-add-product="${escapeHTML(product.id)}"
              >
                Ajouter
              </button>

            </div>

          </div>

        </article>
      `;

    }).join("");


  productsGrid
    .querySelectorAll(
      "[data-add-product]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          addToCart(
            button.dataset.addProduct
          );

        }
      );

    });


  productsGrid
    .querySelectorAll(
      "[data-favorite]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          toggleFavorite(
            button.dataset.favorite
          );

        }
      );

    });


  productsGrid
    .querySelectorAll(
      "[data-open-product]"
    )
    .forEach(element => {

      element.addEventListener(
        "click",
        () => {

          openProduct(
            element.dataset.openProduct
          );

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
        item => item !== id
      );

  }

  else{

    favorites.push(id);

  }

  saveFavorites();

  renderProducts();

}


// ============================================================
// PANIER
// ============================================================

function addToCart(id){

  const product =
    getProduct(id);

  if(!product){
    return;
  }


  const existing =
    cart.find(
      item => item.id === id
    );


  if(existing){

    existing.quantity =
      Number(existing.quantity || 0) + 1;

  }

  else{

    cart.push({
      id:id,
      quantity:1
    });

  }


  saveCart();

  renderCart();

  toast(
    `${product.name} ajouté au panier`
  );

}


function removeFromCart(id){

  cart =
    cart.filter(
      item => item.id !== id
    );

  saveCart();

  renderCart();

}


function changeQuantity(
  id,
  quantity
){

  const item =
    cart.find(
      entry => entry.id === id
    );

  if(!item){
    return;
  }


  if(quantity <= 0){

    removeFromCart(id);

    return;

  }


  item.quantity =
    Math.floor(quantity);

  saveCart();

  renderCart();

}


// ============================================================
// RENDU PANIER
// ============================================================

function renderCart(){

  const count =
    getCartCount();


  if(cartBadge){

    cartBadge.textContent =
      count;

    cartBadge.style.display =
      count > 0
        ? ""
        : "none";

  }


  if(!cartItems){
    return;
  }


  if(!cart.length){

    cartItems.innerHTML = `
      <div class="empty-cart">
        Votre panier est vide.
      </div>
    `;

  }

  else{

    cartItems.innerHTML =
      cart.map(item => {

        const product =
          getProduct(item.id);

        if(!product){
          return "";
        }


        return `
          <div class="cart-item">

            <div class="cart-item-image">
              ${imageHTML(product)}
            </div>

            <div class="cart-item-info">

              <strong>
                ${escapeHTML(product.name)}
              </strong>

              <span>
                ${money(product.price)}
              </span>

              <div class="cart-quantity">

                <button
                  data-minus="${escapeHTML(product.id)}"
                >
                  −
                </button>

                <span>
                  ${item.quantity}
                </span>

                <button
                  data-plus="${escapeHTML(product.id)}"
                >
                  +
                </button>

              </div>

              <button
                data-remove="${escapeHTML(product.id)}"
                class="remove-cart"
              >
                Supprimer
              </button>

            </div>

          </div>
        `;

      }).join("");

  }


  if(cartTotal){

    cartTotal.textContent =
      money(
        getCartSubtotal()
      );

  }


  cartItems
    .querySelectorAll(
      "[data-minus]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.minus;

          const item =
            cart.find(
              entry =>
                entry.id === id
            );

          if(item){

            changeQuantity(
              id,
              item.quantity - 1
            );

          }

        }
      );

    });


  cartItems
    .querySelectorAll(
      "[data-plus]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.plus;

          const item =
            cart.find(
              entry =>
                entry.id === id
            );

          if(item){

            changeQuantity(
              id,
              item.quantity + 1
            );

          }

        }
      );

    });


  cartItems
    .querySelectorAll(
      "[data-remove]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          removeFromCart(
            button.dataset.remove
          );

        }
      );

    });

}


// ============================================================
// OUVRIR / FERMER PANIER
// ============================================================

function openCart(){

  cartOverlay?.classList.add(
    "active"
  );

  cartDrawer?.classList.add(
    "active"
  );

  renderCart();

}


function closeCart(){

  cartOverlay?.classList.remove(
    "active"
  );

  cartDrawer?.classList.remove(
    "active"
  );

}


cartBtn?.addEventListener(
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
    "active"
  );

}


function closeModal(){

  modal?.classList.remove(
    "active"
  );

}


modalClose?.addEventListener(
  "click",
  closeModal
);


// ============================================================
// FICHE PRODUIT
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
      <div class="product-modal">

        <div class="product-modal-image">
          ${imageHTML(product)}
        </div>

        <div class="product-modal-info">

          <div class="product-category">
            ${escapeHTML(product.category)}
          </div>

          <h2>
            ${escapeHTML(product.name)}
          </h2>

          <div class="product-rating">
            ${ratingStars(product.rating)}
            ${product.rating}/5
          </div>

          <div class="product-modal-price">
            ${money(product.price)}
          </div>

          <button
            id="modalAddProduct"
          >
            Ajouter au panier
          </button>

          <button
            id="modalFavoriteProduct"
          >
            ${
              favorites.includes(product.id)
                ? "♥ Retirer des favoris"
                : "♡ Ajouter aux favoris"
            }
          </button>

        </div>

      </div>
    `
  );


  document
    .getElementById(
      "modalAddProduct"
    )
    ?.addEventListener(
      "click",
      () => {

        addToCart(
          product.id
        );

      }
    );


  document
    .getElementById(
      "modalFavoriteProduct"
    )
    ?.addEventListener(
      "click",
      () => {

        toggleFavorite(
          product.id
        );

        openProduct(
          product.id
        );

      }
    );

}


// ============================================================
// RECHERCHE
// ============================================================

searchInput?.addEventListener(
  "input",
  event => {

    searchValue =
      event.target.value;

    renderProducts();

  }
);


// ============================================================
// TRI
// ============================================================

sortSelect?.addEventListener(
  "change",
  event => {

    sortValue =
      event.target.value;

    renderProducts();

  }
);


// ============================================================
// TOAST
// ============================================================

function toast(message){

  if(!toastContainer){
    return;
  }


  const element =
    document.createElement(
      "div"
    );

  element.className =
    "toast";

  element.textContent =
    message;

  toastContainer.appendChild(
    element
  );


  setTimeout(
    () => element.remove(),
    2500
  );

}


// ============================================================
// INITIALISATION
// ============================================================

renderCategories();

renderProducts();

renderCart();


// ============================================================
// DEBUG
// ============================================================

console.log(
  "NovaShop :",
  products.length,
  "produits chargés."
);
