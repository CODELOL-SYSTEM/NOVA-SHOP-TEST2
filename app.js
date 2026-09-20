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
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSyAZ5vAkAEfIbLyhxG0o7uvNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


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
    name:"AMD Ryzen 5 7600",
    category:"Composants",
    price:199.99,
    image:"https://m.media-amazon.com/images/I/51m2oQ9J7TL._AC_SL1000_.jpg"
  },

  {
    id:"p3",
    name:"RTX 4060 8GB",
    category:"Cartes graphiques",
    price:329.99,
    image:"https://m.media-amazon.com/images/I/71M8fY7G5VL._AC_SL1500_.jpg"
  },

  {
    id:"p4",
    name:"Kingston Fury Beast 32GB DDR5",
    category:"Mémoire",
    price:74.99,
    image:"https://m.media-amazon.com/images/I/81G4yJmGxEL._AC_SL1500_.jpg"
  },

  {
    id:"p5",
    name:"Samsung 990 EVO 1TB",
    category:"Stockage",
    price:89.99,
    image:"https://m.media-amazon.com/images/I/71w8w2M9zUL._AC_SL1500_.jpg"
  },

  {
    id:"p6",
    name:"Corsair RM750e",
    category:"Alimentations",
    price:109.99,
    image:"https://m.media-amazon.com/images/I/71X9fYwKQWL._AC_SL1500_.jpg"
  },

  {
    id:"p7",
    name:"NZXT H5 Flow",
    category:"Boîtiers",
    price:89.99,
    image:"https://m.media-amazon.com/images/I/71VQ9fK4zBL._AC_SL1500_.jpg"
  },

  {
    id:"p8",
    name:"Arctic P12 PWM PST",
    category:"Ventilation",
    price:9.99,
    image:"https://m.media-amazon.com/images/I/61nRrVQ8wVL._AC_SL1500_.jpg"
  },

  {
    id:"p9",
    name:"ASUS TUF Gaming 27 pouces 180Hz",
    category:"Écrans",
    price:199.99,
    image:"https://m.media-amazon.com/images/I/81xK7kzV7UL._AC_SL1500_.jpg"
  },

  {
    id:"p10",
    name:"Logitech G502 HERO",
    category:"Périphériques",
    price:49.99,
    image:"https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg"
  },

  {
    id:"p11",
    name:"Clavier mécanique RGB",
    category:"Périphériques",
    price:59.99,
    image:"https://m.media-amazon.com/images/I/71Z9X7J9JEL._AC_SL1500_.jpg"
  },

  {
    id:"p12",
    name:"SteelSeries Arctis Nova",
    category:"Audio",
    price:99.99,
    image:"https://m.media-amazon.com/images/I/71K8m9K2JVL._AC_SL1500_.jpg"
  },

  {
    id:"p13",
    name:"WD Black SN850X 2TB",
    category:"Stockage",
    price:149.99,
    image:"https://m.media-amazon.com/images/I/71X8m3K7RLL._AC_SL1500_.jpg"
  },

  {
    id:"p14",
    name:"Ryzen 7 7800X3D",
    category:"Composants",
    price:379.99,
    image:"https://m.media-amazon.com/images/I/51m2oQ9J7TL._AC_SL1000_.jpg"
  },

  {
    id:"p15",
    name:"RTX 4070 SUPER",
    category:"Cartes graphiques",
    price:649.99,
    image:"https://m.media-amazon.com/images/I/71M8fY7G5VL._AC_SL1500_.jpg"
  },

  {
    id:"p16",
    name:"RX 7800 XT",
    category:"Cartes graphiques",
    price:529.99,
    image:"https://m.media-amazon.com/images/I/71M8fY7G5VL._AC_SL1500_.jpg"
  },

  {
    id:"p17",
    name:"32GB DDR5 6000MHz",
    category:"Mémoire",
    price:84.99,
    image:"https://m.media-amazon.com/images/I/81G4yJmGxEL._AC_SL1500_.jpg"
  },

  {
    id:"p18",
    name:"64GB DDR5 6000MHz",
    category:"Mémoire",
    price:159.99,
    image:"https://m.media-amazon.com/images/I/81G4yJmGxEL._AC_SL1500_.jpg"
  },

  {
    id:"p19",
    name:"Crucial P3 Plus 1TB",
    category:"Stockage",
    price:64.99,
    image:"https://m.media-amazon.com/images/I/71w8w2M9zUL._AC_SL1500_.jpg"
  },

  {
    id:"p20",
    name:"Seagate Barracuda 2TB",
    category:"Stockage",
    price:59.99,
    image:"https://m.media-amazon.com/images/I/71w8w2M9zUL._AC_SL1500_.jpg"
  },

  {
    id:"p21",
    name:"Corsair 850W Gold",
    category:"Alimentations",
    price:129.99,
    image:"https://m.media-amazon.com/images/I/71X9fYwKQWL._AC_SL1500_.jpg"
  },

  {
    id:"p22",
    name:"be quiet! Pure Power 12M",
    category:"Alimentations",
    price:119.99,
    image:"https://m.media-amazon.com/images/I/71X9fYwKQWL._AC_SL1500_.jpg"
  },

  {
    id:"p23",
    name:"Lian Li Lancool 216",
    category:"Boîtiers",
    price:109.99,
    image:"https://m.media-amazon.com/images/I/71VQ9fK4zBL._AC_SL1500_.jpg"
  },

  {
    id:"p24",
    name:"Corsair 4000D Airflow",
    category:"Boîtiers",
    price:94.99,
    image:"https://m.media-amazon.com/images/I/71VQ9fK4zBL._AC_SL1500_.jpg"
  },

  {
    id:"p25",
    name:"Arctic Liquid Freezer III 240",
    category:"Refroidissement",
    price:74.99,
    image:"https://m.media-amazon.com/images/I/61nRrVQ8wVL._AC_SL1500_.jpg"
  },

  {
    id:"p26",
    name:"DeepCool AK620",
    category:"Refroidissement",
    price:59.99,
    image:"https://m.media-amazon.com/images/I/61nRrVQ8wVL._AC_SL1500_.jpg"
  },

  {
    id:"p27",
    name:"AOC 24G2SP 165Hz",
    category:"Écrans",
    price:139.99,
    image:"https://m.media-amazon.com/images/I/81xK7kzV7UL._AC_SL1500_.jpg"
  },

  {
    id:"p28",
    name:"Samsung Odyssey G5",
    category:"Écrans",
    price:219.99,
    image:"https://m.media-amazon.com/images/I/81xK7kzV7UL._AC_SL1500_.jpg"
  },

  {
    id:"p29",
    name:"Razer DeathAdder V3",
    category:"Périphériques",
    price:69.99,
    image:"https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg"
  },

  {
    id:"p30",
    name:"Logitech G305",
    category:"Périphériques",
    price:39.99,
    image:"https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg"
  },

  {
    id:"p31",
    name:"HyperX Alloy Origins",
    category:"Périphériques",
    price:89.99,
    image:"https://m.media-amazon.com/images/I/71Z9X7J9JEL._AC_SL1500_.jpg"
  },

  {
    id:"p32",
    name:"Keychron K2",
    category:"Périphériques",
    price:89.99,
    image:"https://m.media-amazon.com/images/I/71Z9X7J9JEL._AC_SL1500_.jpg"
  },

  {
    id:"p33",
    name:"HyperX Cloud III",
    category:"Audio",
    price:89.99,
    image:"https://m.media-amazon.com/images/I/71K8m9K2JVL._AC_SL1500_.jpg"
  },

  {
    id:"p34",
    name:"Logitech G Pro X",
    category:"Audio",
    price:119.99,
    image:"https://m.media-amazon.com/images/I/71K8m9K2JVL._AC_SL1500_.jpg"
  },

  {
    id:"p35",
    name:"Ryzen 5 7600X",
    category:"Composants",
    price:219.99,
    image:"https://m.media-amazon.com/images/I/51m2oQ9J7TL._AC_SL1000_.jpg"
  },

  {
    id:"p36",
    name:"Intel Core i5-14600KF",
    category:"Composants",
    price:269.99,
    image:"https://m.media-amazon.com/images/I/51m2oQ9J7TL._AC_SL1000_.jpg"
  },

  {
    id:"p37",
    name:"RTX 4060 Ti",
    category:"Cartes graphiques",
    price:399.99,
    image:"https://m.media-amazon.com/images/I/71M8fY7G5VL._AC_SL1500_.jpg"
  },

  {
    id:"p38",
    name:"RX 7600 XT",
    category:"Cartes graphiques",
    price:349.99,
    image:"https://m.media-amazon.com/images/I/71M8fY7G5VL._AC_SL1500_.jpg"
  },

  {
    id:"p39",
    name:"Samsung Odyssey 240Hz",
    category:"Écrans",
    price:329.99,
    image:"https://m.media-amazon.com/images/I/81xK7kzV7UL._AC_SL1500_.jpg"
  },

  {
    id:"p40",
    name:"LG UltraGear 27GP850",
    category:"Écrans",
    price:299.99,
    image:"https://m.media-amazon.com/images/I/81xK7kzV7UL._AC_SL1500_.jpg"
  },

  {
    id:"p41",
    name:"Noctua NF-A12x25",
    category:"Ventilation",
    price:29.99,
    image:"https://m.media-amazon.com/images/I/61nRrVQ8wVL._AC_SL1500_.jpg"
  },

  {
    id:"p42",
    name:"Thermal Grizzly Kryonaut",
    category:"Refroidissement",
    price:12.99,
    image:"https://m.media-amazon.com/images/I/61nRrVQ8wVL._AC_SL1500_.jpg"
  },

  {
    id:"p43",
    name:"SSD NVMe 2TB Gen4",
    category:"Stockage",
    price:119.99,
    image:"https://m.media-amazon.com/images/I/71w8w2M9zUL._AC_SL1500_.jpg"
  }

];


/* =========================================================
   DOM
========================================================= */

const $ = id => document.getElementById(id);

const settingsBtn = $("settingsBtn");
const accountBtn = $("accountBtn");
const ordersBtn = $("ordersBtn");
const adminBtn = $("adminBtn");
const cartBtn = $("cartBtn");
const cartBadge = $("cartBadge");
const heroCartBtn = $("heroCartBtn");

const searchInput = $("searchInput");
const sortSelect = $("sortSelect");
const categories = $("categories");
const productGrid = $("productGrid");

const overlay = $("overlay");
const cartDrawer = $("cartDrawer");
const closeCart = $("closeCart");
const cartItems = $("cartItems");
const cartTotal = $("cartTotal");
const checkoutBtn = $("checkoutBtn");

const modalLayer = $("modalLayer");
const modalTitle = $("modalTitle");
const modalClose = $("modalClose");
const modalContent = $("modalContent");

const toast = $("toast");


/* =========================================================
   UTILITAIRES
========================================================= */

function money(value){
  return Number(value || 0)
    .toFixed(2)
    .replace(".", ",") + " €";
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
  return products.find(product => product.id === id);
}


/* =========================================================
   PANIER
========================================================= */

let cart = [];

try{
  const saved = JSON.parse(
    localStorage.getItem("novaShopCart") || "[]"
  );

  cart = Array.isArray(saved) ? saved : [];

}catch{
  cart = [];
}


function normalizeCart(){

  cart = cart
    .map(item => {

      const id = item?.id;

      const qty =
        Number(
          item?.qty ??
          item?.quantity ??
          0
        );

      return {
        id,
        qty: Number.isFinite(qty) ? Math.floor(qty) : 0
      };

    })
    .filter(item =>
      getProduct(item.id) &&
      item.qty > 0
    );

}


normalizeCart();


function saveCart(){

  localStorage.setItem(
    "novaShopCart",
    JSON.stringify(cart)
  );

}


function getCartCount(){

  return cart.reduce(
    (total,item) =>
      total + Number(item.qty || 0),
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
        product.price *
        Number(item.qty || 0);

    },
    0
  );

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message){

  if(!toast){
    return;
  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(
    window.__novaToastTimer
  );

  window.__novaToastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    },3000);

}


/* =========================================================
   MODAL
========================================================= */

function openModal(title,content){

  if(!modalLayer){
    return;
  }

  if(modalTitle){
    modalTitle.textContent = title;
  }

  if(modalContent){
    modalContent.innerHTML = content;
  }

  modalLayer.classList.add("show");

}


function closeModal(){

  modalLayer?.classList.remove("show");

}


/* =========================================================
   CATEGORIES
========================================================= */

let activeCategory = "Tous";


function renderCategories(){

  if(!categories){
    return;
  }

  const cats = [
    "Tous",
    ...new Set(
      products.map(
        product => product.category
      )
    )
  ];

  categories.innerHTML =
    cats.map(category => `

      <button
        type="button"
        class="${category === activeCategory ? "active" : ""}"
        data-category="${escapeHTML(category)}"
      >
        ${escapeHTML(category)}
      </button>

    `).join("");


  categories
    .querySelectorAll("button")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          activeCategory =
            button.dataset.category ||
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

function randomRating(){

  return (
    4 +
    Math.random()
  ).toFixed(1);

}


function stars(rating){

  const rounded =
    Math.max(
      0,
      Math.min(
        5,
        Math.round(
          Number(rating)
        )
      )
    );

  return (
    "★".repeat(rounded) +
    "☆".repeat(5 - rounded)
  );

}


function renderProducts(){

  if(!productGrid){
    return;
  }

  let list = [
    ...products
  ];

  const search =
    searchInput?.value
      .trim()
      .toLowerCase() ||
    "";


  if(search){

    list =
      list.filter(product =>
        product.name
          .toLowerCase()
          .includes(search) ||

        product.category
          .toLowerCase()
          .includes(search)
      );

  }


  if(activeCategory !== "Tous"){

    list =
      list.filter(
        product =>
          product.category ===
          activeCategory
      );

  }


  const sort =
    sortSelect?.value ||
    "";


  if(sort === "price-asc"){

    list.sort(
      (a,b) =>
        a.price - b.price
    );

  }


  if(sort === "price-desc"){

    list.sort(
      (a,b) =>
        b.price - a.price
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


  if(!list.length){

    productGrid.innerHTML = `

      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:50px 20px;
      ">

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
          Essaie une autre recherche.
        </p>

      </div>

    `;

    return;

  }


  productGrid.innerHTML =
    list.map(product => {

      const rating =
        randomRating();

      return `

        <article class="product">

          <div class="product-img">

            <img
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
            >

          </div>

          <div class="product-cat">
            ${escapeHTML(product.category)}
          </div>

          <h3>
            ${escapeHTML(product.name)}
          </h3>

          <div class="rating">

            <span>
              ${stars(rating)}
            </span>

            <small>
              ${rating}
            </small>

          </div>

          <strong class="price">
            ${money(product.price)}
          </strong>

          <div class="product-actions">

            <button
              type="button"
              class="details-btn"
              data-id="${escapeHTML(product.id)}"
            >
              Voir
            </button>

            <button
              type="button"
              class="add-btn"
              data-id="${escapeHTML(product.id)}"
            >
              Ajouter
            </button>

          </div>

        </article>

      `;

    }).join("");


  productGrid
    .querySelectorAll(".add-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          addToCart(
            button.dataset.id
          );

        }
      );

    });


  productGrid
    .querySelectorAll(".details-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          showProduct(
            button.dataset.id
          );

        }
      );

    });

}


/* =========================================================
   DÉTAIL PRODUIT
========================================================= */

function showProduct(id){

  const product =
    getProduct(id);

  if(!product){
    return;
  }

  openModal(
    product.name,
    `

      <div class="product-detail">

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
        >

        <div>

          <p class="product-cat">
            ${escapeHTML(product.category)}
          </p>

          <h2>
            ${escapeHTML(product.name)}
          </h2>

          <div class="rating">
            ★★★★★
          </div>

          <h3>
            ${money(product.price)}
          </h3>

          <button
            type="button"
            class="primary-btn"
            id="detailAddBtn"
          >
            Ajouter au panier
          </button>

        </div>

      </div>

    `
  );


  $("detailAddBtn")
    ?.addEventListener(
      "click",
      () => {

        addToCart(id);
        closeModal();

      }
    );

}


/* =========================================================
   AJOUT PANIER
========================================================= */

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

    existing.qty =
      Number(existing.qty || 0) + 1;

  }else{

    cart.push({
      id,
      qty:1
    });

  }


  saveCart();
  renderCart();

  showToast(
    `${product.name} ajouté au panier 🛒`
  );

}


/* =========================================================
   SUPPRESSION
========================================================= */

function removeFromCart(id){

  cart =
    cart.filter(
      item => item.id !== id
    );

  saveCart();
  renderCart();

  showToast(
    "Produit supprimé du panier."
  );

}


/* =========================================================
   QUANTITÉ
========================================================= */

function changeQuantity(id,amount){

  const item =
    cart.find(
      product => product.id === id
    );

  if(!item){
    return;
  }

  item.qty =
    Number(item.qty || 0) +
    Number(amount || 0);


  if(item.qty <= 0){

    cart =
      cart.filter(
        product => product.id !== id
      );

  }


  saveCart();
  renderCart();

}


/* =========================================================
   RENDU PANIER
========================================================= */

function renderCart(){

  if(!cartItems){
    return;
  }

  normalizeCart();


  if(!cart.length){

    cartItems.innerHTML = `

      <div class="empty-cart">

        Ton panier est vide 🛒

      </div>

    `;

  }else{

    cartItems.innerHTML =
      cart.map(item => {

        const product =
          getProduct(item.id);

        if(!product){
          return "";
        }

        return `

          <div class="cart-item">

            <img
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(product.name)}"
            >

            <div class="cart-item-info">

              <strong>
                ${escapeHTML(product.name)}
              </strong>

              <span>
                ${money(product.price)}
              </span>

              <div class="quantity">

                <button
                  type="button"
                  data-action="minus"
                  data-id="${escapeHTML(product.id)}"
                >
                  −
                </button>

                <span>
                  ${item.qty}
                </span>

                <button
                  type="button"
                  data-action="plus"
                  data-id="${escapeHTML(product.id)}"
                >
                  +
                </button>

              </div>

              <button
                type="button"
                class="remove-cart"
                data-action="remove"
                data-id="${escapeHTML(product.id)}"
              >
                Supprimer
              </button>

            </div>

          </div>

        `;

      }).join("");

  }


  const subtotal =
    getCartSubtotal();


  if(cartTotal){

    cartTotal.textContent =
      money(subtotal);

  }


  if(cartBadge){

    const count =
      getCartCount();

    cartBadge.textContent =
      count;

    cartBadge.style.display =
      count > 0
        ? "flex"
        : "none";

  }


  cartItems
    .querySelectorAll(
      "button[data-action]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.id;

          const action =
            button.dataset.action;


          if(action === "minus"){
            changeQuantity(id,-1);
          }

          if(action === "plus"){
            changeQuantity(id,1);
          }

          if(action === "remove"){
            removeFromCart(id);
          }

        }
      );

    });

}


/* =========================================================
   PANIER OUVERTURE
========================================================= */

function openCart(){

  overlay?.classList.add("show");
  cartDrawer?.classList.add("show");

}


function closeCartDrawer(){

  overlay?.classList.remove("show");
  cartDrawer?.classList.remove("show");

}


/* =========================================================
   AUTH ERREURS
========================================================= */

function firebaseError(error){

  const code =
    error?.code || "";


  const messages = {

    "auth/operation-not-allowed":
      "La connexion par e-mail n'est pas activée dans Firebase.",

    "auth/unauthorized-domain":
      "Ce domaine n'est pas autorisé dans Firebase.",

    "auth/api-key-not-valid":
      "La clé API Firebase est incorrecte.",

    "auth/app-not-authorized":
      "Cette application n'est pas autorisée par Firebase.",

    "auth/invalid-api-key":
      "La clé API Firebase est invalide.",

    "auth/internal-error":
      "Erreur interne Firebase.",

    "auth/configuration-not-found":
      "Configuration Firebase introuvable.",

    "auth/invalid-email":
      "Adresse e-mail invalide.",

    "auth/user-not-found":
      "Aucun compte trouvé avec cet e-mail.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/invalid-credential":
      "E-mail ou mot de passe incorrect.",

    "auth/email-already-in-use":
      "Cette adresse e-mail est déjà utilisée.",

    "auth/weak-password":
      "Le mot de passe doit contenir au moins 6 caractères.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard.",

    "auth/network-request-failed":
      "Problème de connexion Internet.",

    "auth/user-disabled":
      "Ce compte a été désactivé.",

    "auth/missing-password":
      "Entre un mot de passe.",

    "auth/missing-email":
      "Entre une adresse e-mail."

  };


  return (
    messages[code] ||
    error?.message ||
    "Une erreur est survenue."
  );

}


/* =========================================================
   AUTH
========================================================= */

function showAuth(){

  openModal(
    "Compte NovaShop",
    `

      <div class="auth-box">

        <div class="auth-tabs">

          <button
            type="button"
            id="loginTab"
            class="active"
          >
            Connexion
          </button>

          <button
            type="button"
            id="registerTab"
          >
            Créer un compte
          </button>

        </div>


        <form id="authForm">

          <input
            id="authEmail"
            type="email"
            placeholder="Adresse e-mail"
            autocomplete="email"
            required
          >

          <input
            id="authPassword"
            type="password"
            placeholder="Mot de passe"
            autocomplete="current-password"
            minlength="6"
            required
          >


          <div
            id="authError"
            style="
              display:none;
              margin:10px 0;
              padding:10px;
              border-radius:10px;
              background:#3b1010;
              color:#ff8b8b;
            "
          ></div>


          <button
            type="submit"
            class="primary-btn"
            id="authSubmit"
          >
            Se connecter
          </button>

        </form>

      </div>

    `
  );


  let mode = "login";


  const form =
    $("authForm");

  const loginTab =
    $("loginTab");

  const registerTab =
    $("registerTab");

  const errorBox =
    $("authError");

  const submit =
    $("authSubmit");


  if(!form){
    return;
  }


  function setMode(newMode){

    mode = newMode;


    loginTab?.classList.toggle(
      "active",
      mode === "login"
    );

    registerTab?.classList.toggle(
      "active",
      mode === "register"
    );


    if(submit){

      submit.textContent =
        mode === "login"
          ? "Se connecter"
          : "Créer mon compte";

    }


    if(errorBox){

      errorBox.style.display =
        "none";

      errorBox.textContent =
        "";

    }

  }


  loginTab?.addEventListener(
    "click",
    () => setMode("login")
  );

  registerTab?.addEventListener(
    "click",
    () => setMode("register")
  );


  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const email =
        $("authEmail")
          ?.value
          .trim() ||
        "";

      const password =
        $("authPassword")
          ?.value ||
        "";


      if(!email || !password){

        if(errorBox){

          errorBox.textContent =
            "Remplis tous les champs.";

          errorBox.style.display =
            "block";

        }

        return;

      }


      if(password.length < 6){

        if(errorBox){

          errorBox.textContent =
            "Le mot de passe doit contenir au moins 6 caractères.";

          errorBox.style.display =
            "block";

        }

        return;

      }


      if(submit){

        submit.disabled = true;

        submit.textContent =
          mode === "login"
            ? "Connexion..."
            : "Création...";

      }


      if(errorBox){

        errorBox.style.display =
          "none";

        errorBox.textContent =
          "";

      }


      try{

        if(mode === "login"){

          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          showToast(
            "Connexion réussie ✅"
          );

        }else{

          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          showToast(
            "Compte créé avec succès 🎉"
          );

        }


        closeModal();


      }catch(error){

        console.error(
          "Firebase Auth:",
          error
        );


        if(errorBox){

          errorBox.innerHTML =
            escapeHTML(
              firebaseError(error)
            ) +
            `<br><small style="opacity:.7;">
              Code : ${escapeHTML(error.code || "unknown")}
            </small>`;

          errorBox.style.display =
            "block";

        }

      }finally{

        if(submit){

          submit.disabled = false;

          submit.textContent =
            mode === "login"
              ? "Se connecter"
              : "Créer mon compte";

        }

      }

    }
  );

}


/* =========================================================
   COMPTE
========================================================= */

async function showAccount(){

  const user =
    auth.currentUser;


  if(!user){

    showAuth();
    return;

  }


  openModal(
    "Mon compte",
    `

      <div class="account-box">

        <p>
          Connecté avec :
        </p>

        <strong>
          ${escapeHTML(user.email || "")}
        </strong>

        <br><br>

        <button
          type="button"
          class="primary-btn"
          id="logoutBtn"
        >
          Se déconnecter
        </button>

      </div>

    `
  );


  $("logoutBtn")
    ?.addEventListener(
      "click",
      async () => {

        try{

          await signOut(auth);

          closeModal();

          showToast(
            "Déconnexion effectuée 👋"
          );

        }catch(error){

          console.error(error);

          showToast(
            "Erreur de déconnexion ❌"
          );

        }

      }
    );

}


/* =========================================================
   COMMANDES
========================================================= */

async function showOrders(){

  const user =
    auth.currentUser;


  if(!user){

    showAuth();
    return;

  }


  openModal(
    "Mes commandes",
    `

      <div
        style="
          text-align:center;
          padding:20px;
        "
      >
        Chargement des commandes...
      </div>

    `
  );


  try{

    const q =
      query(
        collection(
          db,
          "orders"
        ),
        where(
          "userId",
          "==",
          user.uid
        )
      );


    const snapshot =
      await getDocs(q);


    if(snapshot.empty){

      modalContent.innerHTML = `

        <div
          class="empty-orders"
          style="
            text-align:center;
            padding:30px;
          "
        >

          <div style="
            font-size:50px;
            margin-bottom:10px;
          ">
            📦
          </div>

          <h3>
            Aucune commande
          </h3>

          <p style="
            opacity:.7;
            margin-top:8px;
          ">
            Tes commandes apparaîtront ici.
          </p>

        </div>

      `;

      return;

    }


    const orders = [];


    snapshot.forEach(item => {

      orders.push({
        id:item.id,
        ...item.data()
      });

    });


    orders.sort(
      (a,b) => {

        const ta =
          a.createdAt?.seconds ||
          0;

        const tb =
          b.createdAt?.seconds ||
          0;

        return tb - ta;

      }
    );


    modalContent.innerHTML =
      orders.map(order => {

        return `

          <div
            class="order-card"
            style="
              margin-bottom:14px;
              padding:16px;
              border-radius:16px;
              border:1px solid rgba(255,255,255,.1);
            "
          >

            <strong>
              Commande #${escapeHTML(
                order.id.slice(0,8)
              )}
            </strong>

            <p style="
              margin:8px 0;
            ">
              Total :
              <strong>
                ${money(order.total || 0)}
              </strong>
            </p>

            <p style="
              margin-bottom:12px;
            ">
              Statut :
              ${escapeHTML(
                order.status ||
                "En attente"
              )}
            </p>

            <button
              type="button"
              class="order-detail-btn"
              data-id="${escapeHTML(order.id)}"
            >
              Voir la commande
            </button>

          </div>

        `;

      }).join("");


    modalContent
      .querySelectorAll(
        ".order-detail-btn"
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


  }catch(error){

    console.error(
      "Firestore Orders:",
      error
    );


    modalContent.innerHTML = `

      <div style="
        color:#ff7777;
        padding:15px;
      ">

        Impossible de charger les commandes.

        <br><br>

        ${escapeHTML(
          error.message ||
          error.code ||
          ""
        )}

      </div>

    `;

  }

}


/* =========================================================
   DÉTAIL COMMANDE
========================================================= */

function showOrderDetail(order){

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


      const price =
        Number(
          product?.price ??
          item.price ??
          0
        );


      const quantity =
        Number(
          item.qty ??
          item.quantity ??
          1
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
            ${escapeHTML(name)}
            × ${quantity}
          </span>

          <strong>
            ${money(
              price * quantity
            )}
          </strong>

        </div>

      `;

    }).join("");


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


  openModal(
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

          <strong>
            Statut :
            ${escapeHTML(status)}
          </strong>


          ${
            order.tracking
              ? `

                <div style="
                  margin-top:8px;
                ">

                  📦 Suivi :
                  ${escapeHTML(
                    order.tracking
                  )}

                </div>

              `
              : ""
          }


          ${
            order.estimatedDelivery
              ? `

                <div style="
                  margin-top:8px;
                ">

                  🚚 Livraison estimée :
                  ${escapeHTML(
                    order.estimatedDelivery
                  )}

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
                ${escapeHTML(
                  order.address
                )}
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
            ${money(
              order.total || 0
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
      () => printInvoice(order)
    );

}


/* =========================================================
   CHECKOUT
========================================================= */

function showCheckout(){

  if(!cart.length){

    showToast(
      "Ton panier est vide 🛒"
    );

    return;

  }


  if(!auth.currentUser){

    showToast(
      "Connecte-toi pour commander."
    );

    showAuth();

    return;

  }


  const subtotal =
    getCartSubtotal();


  openModal(
    "Finaliser la commande",
    `

      <form id="checkoutForm">

        <label>
          Nom complet
        </label>

        <input
          id="checkoutName"
          type="text"
          placeholder="Ton nom complet"
          required
        >


        <label>
          Adresse
        </label>

        <textarea
          id="checkoutAddress"
          rows="3"
          placeholder="Adresse de livraison"
          required
        ></textarea>


        <label>
          Ville
        </label>

        <input
          id="checkoutCity"
          type="text"
          placeholder="Ville"
          required
        >


        <label>
          Code postal
        </label>

        <input
          id="checkoutPostal"
          type="text"
          placeholder="Code postal"
          required
        >


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
              Total
            </span>

            <strong>
              ${money(subtotal)}
            </strong>

          </div>

        </div>


        <h3>
          Mode de paiement
        </h3>


        <div
          class="payment-buttons"
          style="
            display:grid;
            gap:10px;
            margin:12px 0;
          "
        >

          <button
            type="button"
            id="paypalPaymentBtn"
            class="payment-btn"
          >
            🅿️ PayPal
          </button>


          <button
            type="button"
            id="cardPaymentBtn"
            class="payment-btn"
          >
            💳 Carte bancaire
          </button>

        </div>


        <div id="paymentStatus"></div>


        <div
          id="cardPaymentArea"
          style="margin-top:12px;"
        ></div>


        <button
          type="submit"
          class="primary-btn"
          id="checkoutSubmit"
          style="
            width:100%;
            margin-top:16px;
          "
        >
          Créer la commande
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


  $("paypalPaymentBtn")
    ?.addEventListener(
      "click",
      () => {

        paymentMethod =
          "paypal";


        $("paymentStatus").innerHTML = `

          <div style="
            padding:12px;
            border-radius:12px;
            background:rgba(50,120,255,.12);
          ">

            🅿️ Paiement PayPal sélectionné.

          </div>

        `;


        $("cardPaymentArea").innerHTML =
          "";

      }
    );


  $("cardPaymentBtn")
    ?.addEventListener(
      "click",
      () => {

        paymentMethod =
          "card";


        $("paymentStatus").innerHTML = `

          <div style="
            padding:12px;
            border-radius:12px;
            background:rgba(255,180,0,.12);
          ">

            💳 Mode démonstration.
            Aucune donnée bancaire réelle
            n'est traitée.

          </div>

        `;


        $("cardPaymentArea").innerHTML = `

          <div
            class="card-payment-box"
            style="
              margin-top:12px;
              padding:15px;
              border-radius:15px;
              border:1px solid rgba(255,255,255,.1);
            "
          >

            <h3>
              Carte bancaire
            </h3>

            <p style="
              opacity:.7;
              margin:8px 0 14px;
            ">
              Démo uniquement.
            </p>


            <label>
              Identifiant fictif
            </label>

            <input
              id="fakeCardNumber"
              type="text"
              inputmode="numeric"
              maxlength="16"
              placeholder="16 caractères fictifs"
              autocomplete="off"
            >


            <label>
              Expiration fictive
            </label>

            <input
              id="fakeCardExpiry"
              type="text"
              maxlength="5"
              placeholder="MM/AA"
              autocomplete="off"
            >

          </div>

        `;

      }
    );


  $("checkoutForm")
    ?.addEventListener(
      "submit",
      async event => {

        event.preventDefault();


        const errorBox =
          $("checkoutError");


        const name =
          $("checkoutName")
            ?.value
            .trim() ||
          "";


        const address =
          $("checkoutAddress")
            ?.value
            .trim() ||
          "";


        const city =
          $("checkoutCity")
            ?.value
            .trim() ||
          "";


        const postal =
          $("checkoutPostal")
            ?.value
            .trim() ||
          "";


        if(
          !name ||
          !address ||
          !city ||
          !postal
        ){

          if(errorBox){

            errorBox.textContent =
              "Remplis toutes les informations de livraison.";

            errorBox.style.display =
              "block";

          }

          return;

        }


        if(!paymentMethod){

          if(errorBox){

            errorBox.textContent =
              "Choisis un moyen de paiement.";

            errorBox.style.display =
              "block";

          }

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

          const user =
            auth.currentUser;


          if(!user){

            showAuth();
            return;

          }


          const total =
            getCartSubtotal();


          const orderItems =
            cart.map(item => {

              const product =
                getProduct(item.id);


              return {

                id:item.id,

                name:
                  product?.name ||
                  "Produit",

                price:
                  product?.price ||
                  0,

                qty:
                  item.qty

              };

            });


          const orderData = {

            userId:
              user.uid,

            userEmail:
              user.email ||
              "",

            email:
              user.email ||
              "",

            customerName:
              name,

            address,

            city,

            postalCode:
              postal,

            items:
              orderItems,

            subtotal:
              total,

            discount:
              0,

            total,

            paymentMethod,

            paymentStatus:
              paymentMethod === "card"
                ? "Démonstration"
                : "En attente",

            status:
              "Enregistrée",

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


          cart = [];

          saveCart();
          renderCart();

          closeModal();


          showToast(
            `Commande #${orderRef.id.slice(0,8)} créée 🎉`
          );


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


          if(
            paymentMethod ===
              "card"
          ){

            setTimeout(
              () => {

                openModal(
                  "Paiement CB",
                  `

                    <div style="
                      text-align:center;
                      padding:20px;
                    ">

                      <div style="
                        font-size:60px;
                      ">
                        💳
                      </div>

                      <h3>
                        Mode démonstration
                      </h3>

                      <p style="
                        margin:15px 0;
                      ">
                        La commande a été créée,
                        mais aucun paiement CB réel
                        n'a été effectué.
                      </p>

                      <p style="
                        opacity:.7;
                      ">
                        Aucune donnée bancaire réelle
                        n'est enregistrée.
                      </p>

                      <button
                        type="button"
                        class="primary-btn"
                        id="closeCardDemo"
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


                $("closeCardDemo")
                  ?.addEventListener(
                    "click",
                    closeModal
                  );

              },
              300
            );

          }


        }catch(error){

          console.error(
            "Firestore Checkout:",
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
              "Créer la commande";

          }

        }

      }
    );

}


/* =========================================================
   FACTURE
========================================================= */

function printInvoice(order){

  const items =
    Array.isArray(order.items)
      ? order.items
      : [];


  const rows =
    items.map(item => {

      const product =
        getProduct(item.id);


      const name =
        product?.name ||
        item.name ||
        "Produit";


      const price =
        Number(
          product?.price ??
          item.price ??
          0
        );


      const quantity =
        Number(
          item.qty ??
          item.quantity ??
          1
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
              price * quantity
            )}
          </td>

        </tr>

      `;

    }).join("");


  const invoiceWindow =
    window.open(
      "",
      "_blank",
      "width=900,height=700"
    );


  if(!invoiceWindow){

    showToast(
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

        h1{
          margin-bottom:5px;
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

        .small{
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
            Commande #${escapeHTML(
              order.id
            )}
          </p>

        </div>

      </div>


      <h3>
        Client
      </h3>

      <p>
        ${escapeHTML(
          order.userEmail ||
          order.email ||
          ""
        )}
      </p>

      <p>
        ${escapeHTML(
          order.customerName ||
          ""
        )}
      </p>

      <p>
        ${escapeHTML(
          order.address ||
          ""
        )}
      </p>

      <p>
        ${escapeHTML(
          order.postalCode ||
          ""
        )}
        ${escapeHTML(
          order.city ||
          ""
        )}
      </p>


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
          order.total || 0
        )}

      </div>


      <p class="small">

        Statut :
        ${escapeHTML(
          order.status ||
          "Enregistrée"
        )}

      </p>


      <script>

        window.onload = function(){

          window.print();

        };

      <\/script>

    </body>

    </html>

  `);


  invoiceWindow.document.close();

}


/* =========================================================
   ADMIN
========================================================= */

const ADMIN_EMAIL =
  "helpy.nova.sh0p@gmail.com";


function isAdmin(){

  const user =
    auth.currentUser;


  return !!(
    user &&
    user.email &&
    user.email.toLowerCase() ===
    ADMIN_EMAIL.toLowerCase()
  );

}


async function showAdmin(){

  if(!auth.currentUser){

    showAuth();
    return;

  }


  if(!isAdmin()){

    showToast(
      "Accès administrateur refusé ❌"
    );

    return;

  }


  openModal(
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

    const snapshot =
      await getDocs(
        collection(
          db,
          "orders"
        )
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

        const ta =
          a.createdAt?.seconds ||
          0;

        const tb =
          b.createdAt?.seconds ||
          0;

        return tb - ta;

      }
    );


    renderAdmin(
      orders
    );


  }catch(error){

    console.error(
      "Admin Firestore:",
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

          <br><br>

          ${escapeHTML(
            error.message ||
            error.code ||
            ""
          )}

        </div>

      `;

    }

  }

}


function renderAdmin(orders){

  const loading =
    $("adminLoading");

  const content =
    $("adminContent");


  loading?.remove();


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
        🛡️ Administration NovaShop
      </strong>

      <p style="
        margin-top:6px;
      ">

        ${orders.length}
        commande${orders.length > 1 ? "s" : ""}

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

          ? orders.map(order => {

              const items =
                Array.isArray(
                  order.items
                )
                  ? order.items
                  : [];


              const productsText =
                items
                  .map(
                    item =>
                      `${
                        item.name ||
                        item.id ||
                        "Produit"
                      } ×${
                        item.qty ??
                        item.quantity ??
                        1
                      }`
                  )
                  .join(", ");


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


                  <p style="
                    margin:8px 0;
                  ">

                    👤
                    ${escapeHTML(
                      order.userEmail ||
                      order.email ||
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
                    data-id="${escapeHTML(
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
                            value="${escapeHTML(
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
                    data-id="${escapeHTML(
                      order.id
                    )}"
                    value="${escapeHTML(
                      order.city || ""
                    )}"
                    placeholder="Ville"
                    style="
                      width:100%;
                      margin-bottom:8px;
                    "
                  >


                  <input
                    class="admin-tracking"
                    data-id="${escapeHTML(
                      order.id
                    )}"
                    value="${escapeHTML(
                      order.tracking || ""
                    )}"
                    placeholder="Numéro de suivi"
                    style="
                      width:100%;
                      margin-bottom:8px;
                    "
                  >


                  <input
                    class="admin-delivery"
                    data-id="${escapeHTML(
                      order.id
                    )}"
                    value="${escapeHTML(
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
                      data-id="${escapeHTML(
                        order.id
                      )}"
                    >
                      💾 Enregistrer
                    </button>


                    <button
                      type="button"
                      class="view-btn admin-paid"
                      data-id="${escapeHTML(
                        order.id
                      )}"
                    >
                      💰 Marquer payé
                    </button>


                    <button
                      type="button"
                      class="view-btn admin-invoice"
                      data-id="${escapeHTML(
                        order.id
                      )}"
                    >
                      🧾 Facture
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
      showAdmin
    );


  $("adminLogout")
    ?.addEventListener(
      "click",
      () => {

        closeModal();

        showToast(
          "Mode admin fermé."
        );

      }
    );


  document
    .querySelectorAll(".admin-save")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          saveAdminOrder(
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
        () => {

          markOrderPaid(
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


          if(order){

            printInvoice(
              order
            );

          }

        }
      );

    });

}


async function saveAdminOrder(id){

  if(!isAdmin()){

    showToast(
      "Accès refusé ❌"
    );

    return;

  }


  try{

    const selectorId =
      CSS.escape(id);


    const status =
      document.querySelector(
        `.admin-status[data-id="${selectorId}"]`
      )?.value ||
      "Enregistrée";


    const city =
      document.querySelector(
        `.admin-city[data-id="${selectorId}"]`
      )?.value ||
      "";


    const tracking =
      document.querySelector(
        `.admin-tracking[data-id="${selectorId}"]`
      )?.value ||
      "";


    const estimatedDelivery =
      document.querySelector(
        `.admin-delivery[data-id="${selectorId}"]`
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


    showToast(
      "Commande mise à jour ✅"
    );


  }catch(error){

    console.error(
      "Admin update:",
      error
    );


    showToast(
      `Erreur : ${
        error.message ||
        error.code ||
        "inconnue"
      }`
    );

  }

}


async function markOrderPaid(id){

  if(!isAdmin()){

    showToast(
      "Accès refusé ❌"
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
        paymentStatus:
          "Payé"
      }
    );


    showToast(
      "Paiement marqué comme payé 💰"
    );


    showAdmin();


  }catch(error){

    console.error(
      "Payment update:",
      error
    );


    showToast(
      `Erreur : ${
        error.message ||
        error.code ||
        "inconnue"
      }`
    );

  }

}


/* =========================================================
   PARAMÈTRES
========================================================= */

function showSettings(){

  const current =
    localStorage.getItem(
      "novaTheme"
    ) || "dark";


  openModal(
    "Paramètres",
    `

      <div class="settings-box">

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
            id="themeDark"
          >
            🌙 Mode sombre
          </button>


          <button
            type="button"
            id="themeLight"
          >
            ☀️ Mode clair
          </button>

        </div>


        <p style="
          margin-top:18px;
          opacity:.7;
        ">

          Thème actuel :
          ${escapeHTML(current)}

        </p>


        <button
          type="button"
          id="clearCart"
          style="
            margin-top:20px;
          "
        >
          🗑️ Vider le panier
        </button>

      </div>

    `
  );


  $("themeDark")
    ?.addEventListener(
      "click",
      () => {

        document.body
          .classList
          .remove("light");

        localStorage.setItem(
          "novaTheme",
          "dark"
        );

        showToast(
          "Mode sombre activé 🌙"
        );

        closeModal();

      }
    );


  $("themeLight")
    ?.addEventListener(
      "click",
      () => {

        document.body
          .classList
          .add("light");

        localStorage.setItem(
          "novaTheme",
          "light"
        );

        showToast(
          "Mode clair activé ☀️"
        );

        closeModal();

      }
    );


  $("clearCart")
    ?.addEventListener(
      "click",
      () => {

        cart = [];

        saveCart();
        renderCart();

        showToast(
          "Panier vidé 🗑️"
        );

      }
    );

}


/* =========================================================
   AUTH STATE
========================================================= */

let currentUser =
  null;


onAuthStateChanged(
  auth,
  user => {

    currentUser =
      user;


    if(accountBtn){

      accountBtn.textContent =
        user
          ? "Compte"
          : "Connexion";

    }


    if(ordersBtn){

      ordersBtn.style.display =
        user
          ? ""
          : "";

    }


    if(adminBtn){

      adminBtn.style.display =
        user &&
        user.email &&
        user.email.toLowerCase() ===
        ADMIN_EMAIL.toLowerCase()
          ? ""
          : "none";

    }

  }
);


/* =========================================================
   EVENTS
========================================================= */

settingsBtn?.addEventListener(
  "click",
  showSettings
);


accountBtn?.addEventListener(
  "click",
  showAccount
);


ordersBtn?.addEventListener(
  "click",
  showOrders
);


adminBtn?.addEventListener(
  "click",
  showAdmin
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
  closeCartDrawer
);


overlay?.addEventListener(
  "click",
  closeCartDrawer
);


checkoutBtn?.addEventListener(
  "click",
  showCheckout
);


modalClose?.addEventListener(
  "click",
  closeModal
);


modalLayer?.addEventListener(
  "click",
  event => {

    if(
      event.target ===
      modalLayer
    ){

      closeModal();

    }

  }
);


searchInput?.addEventListener(
  "input",
  renderProducts
);


sortSelect?.addEventListener(
  "change",
  renderProducts
);


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if(
      event.key ===
      "Escape"
    ){

      closeModal();
      closeCartDrawer();

    }

  }
);


/* =========================================================
   THÈME
========================================================= */

const savedTheme =
  localStorage.getItem(
    "novaTheme"
  );


if(savedTheme === "light"){

  document.body
    .classList
    .add("light");

}else{

  document.body
    .classList
    .remove("light");

}


/* =========================================================
   ERREURS GLOBALES
========================================================= */

window.addEventListener(
  "unhandledrejection",
  event => {

    console.error(
      "Unhandled promise rejection:",
      event.reason
    );


    const error =
      event.reason;


    if(
      error?.code?.startsWith(
        "auth/"
      )
    ){

      showToast(
        firebaseError(error)
      );

    }

  }
);


/* =========================================================
   INIT
========================================================= */

renderCategories();

renderProducts();

renderCart();


/* =========================================================
   API GLOBALE
========================================================= */

window.NovaShop = {

  products,

  get currentUser(){
    return currentUser;
  },

  addToCart,

  removeFromCart,

  changeQuantity,

  openCart,

  closeCart:
    closeCartDrawer,

  showAccount,

  showOrders,

  showAdmin,

  showCheckout,

  showSettings,

  showProduct,

  getCartCount,

  getCartSubtotal,

  money

};


console.log(
  "NovaShop chargé avec succès 🚀"
);
