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


/* =========================
   FIREBASE
========================= */

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


/* =========================
   PRODUITS
========================= */

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


/* =========================
   DOM
========================= */

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


/* =========================
   CART
========================= */

let cart = JSON.parse(localStorage.getItem("novaShopCart") || "[]");

function saveCart(){
  localStorage.setItem("novaShopCart", JSON.stringify(cart));
}

function money(value){
  return Number(value).toFixed(2).replace(".", ",") + " €";
}

function escapeHTML(value){
  return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function getProduct(id){
  return products.find(p => p.id === id);
}

function getCartCount(){
  return cart.reduce((total,item) => total + item.qty, 0);
}

function getCartSubtotal(){
  return cart.reduce((total,item) => {
    const product = getProduct(item.id);
    return total + (product ? product.price * item.qty : 0);
  },0);
}


/* =========================
   TOAST
========================= */

function showToast(message){
  if(!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.__novaToastTimer);

  window.__novaToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  },3000);
}


/* =========================
   MODAL
========================= */

function openModal(title,content){
  if(!modalLayer) return;

  modalTitle.textContent = title;
  modalContent.innerHTML = content;

  modalLayer.classList.add("show");
}

function closeModal(){
  modalLayer?.classList.remove("show");
}


/* =========================
   CATEGORIES
========================= */

let activeCategory = "Tous";

function renderCategories(){

  if(!categories) return;

  const cats = [
    "Tous",
    ...new Set(products.map(p => p.category))
  ];

  categories.innerHTML = cats.map(cat => `
    <button
      class="${cat === activeCategory ? "active" : ""}"
      data-category="${escapeHTML(cat)}"
    >
      ${escapeHTML(cat)}
    </button>
  `).join("");

  categories.querySelectorAll("button").forEach(button => {

    button.addEventListener("click",() => {

      activeCategory = button.dataset.category;

      renderCategories();
      renderProducts();

    });

  });

}


/* =========================
   PRODUCTS
========================= */

function randomRating(){
  return (4 + Math.random()).toFixed(1);
}

function stars(rating){
  const rounded = Math.round(Number(rating));

  return "★".repeat(rounded) +
         "☆".repeat(5-rounded);
}

function renderProducts(){

  if(!productGrid) return;

  let list = [...products];

  const search = searchInput?.value.trim().toLowerCase() || "";

  if(search){
    list = list.filter(product =>
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  }

  if(activeCategory !== "Tous"){
    list = list.filter(p => p.category === activeCategory);
  }

  const sort = sortSelect?.value;

  if(sort === "price-asc"){
    list.sort((a,b) => a.price-b.price);
  }

  if(sort === "price-desc"){
    list.sort((a,b) => b.price-a.price);
  }

  if(sort === "name"){
    list.sort((a,b) => a.name.localeCompare(b.name));
  }

  productGrid.innerHTML = list.map(product => {

    const rating = randomRating();

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

        <h3>${escapeHTML(product.name)}</h3>

        <div class="rating">
          <span>${stars(rating)}</span>
          <small>${rating}</small>
        </div>

        <strong class="price">
          ${money(product.price)}
        </strong>

        <div class="product-actions">

          <button
            class="details-btn"
            data-id="${product.id}"
          >
            Voir
          </button>

          <button
            class="add-btn"
            data-id="${product.id}"
          >
            Ajouter
          </button>

        </div>

      </article>
    `;

  }).join("");

  productGrid.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click",() => {
      addToCart(button.dataset.id);
    });

  });

  productGrid.querySelectorAll(".details-btn").forEach(button => {

    button.addEventListener("click",() => {
      showProduct(button.dataset.id);
    });

  });

}


/* =========================
   PRODUCT DETAILS
========================= */

function showProduct(id){

  const product = getProduct(id);

  if(!product) return;

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

          <h2>${escapeHTML(product.name)}</h2>

          <div class="rating">
            ★★★★★
          </div>

          <h3>
            ${money(product.price)}
          </h3>

          <button
            class="primary-btn"
            id="detailAddBtn"
          >
            Ajouter au panier
          </button>

        </div>

      </div>
    `
  );

  setTimeout(() => {

    $("detailAddBtn")?.addEventListener("click",() => {

      addToCart(id);
      closeModal();

    });

  },0);

}


/* =========================
   ADD CART
========================= */

function addToCart(id){

  const existing = cart.find(item => item.id === id);

  if(existing){
    existing.qty++;
  }else{
    cart.push({
      id,
      qty:1
    });
  }

  saveCart();
  renderCart();

  showToast("Produit ajouté au panier 🛒");

}


/* =========================
   REMOVE CART
========================= */

function removeFromCart(id){

  cart = cart.filter(item => item.id !== id);

  saveCart();
  renderCart();

}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(id,amount){

  const item = cart.find(i => i.id === id);

  if(!item) return;

  item.qty += amount;

  if(item.qty <= 0){
    cart = cart.filter(i => i.id !== id);
  }

  saveCart();
  renderCart();

}


/* =========================
   CART RENDER
========================= */

function renderCart(){

  if(!cartItems) return;

  if(cart.length === 0){

    cartItems.innerHTML = `
      <div class="empty-cart">
        Ton panier est vide 🛒
      </div>
    `;

  }else{

    cartItems.innerHTML = cart.map(item => {

      const product = getProduct(item.id);

      if(!product) return "";

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
                data-action="minus"
                data-id="${product.id}"
              >
                −
              </button>

              <span>${item.qty}</span>

              <button
                data-action="plus"
                data-id="${product.id}"
              >
                +
              </button>

            </div>

            <button
              class="remove-cart"
              data-action="remove"
              data-id="${product.id}"
            >
              Supprimer
            </button>

          </div>

        </div>
      `;

    }).join("");

  }

  const subtotal = getCartSubtotal();

  if(cartTotal){
    cartTotal.textContent = money(subtotal);
  }

  if(cartBadge){
    const count = getCartCount();

    cartBadge.textContent = count;
    cartBadge.style.display = count ? "flex" : "none";
  }

  cartItems.querySelectorAll("button[data-action]").forEach(button => {

    const id = button.dataset.id;
    const action = button.dataset.action;

    button.addEventListener("click",() => {

      if(action === "minus"){
        changeQuantity(id,-1);
      }

      if(action === "plus"){
        changeQuantity(id,1);
      }

      if(action === "remove"){
        removeFromCart(id);
      }

    });

  });

}


/* =========================
   OPEN CART
========================= */

function openCart(){

  overlay?.classList.add("show");
  cartDrawer?.classList.add("show");

}

function closeCartDrawer(){

  overlay?.classList.remove("show");
  cartDrawer?.classList.remove("show");

}


/* =========================
   AUTH ERROR
========================= */

function firebaseError(error){

  const code = error?.code || "";

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
      "Le mot de passe est trop faible.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard."

  };

  return messages[code] || "Une erreur est survenue.";

}


/* =========================
   AUTH MODAL
========================= */

function showAuth(){

  openModal(
    "Compte NovaShop",
    `
      <div class="auth-box">

        <div class="auth-tabs">

          <button id="loginTab" class="active">
            Connexion
          </button>

          <button id="registerTab">
            Créer un compte
          </button>

        </div>

        <form id="authForm">

          <input
            id="authEmail"
            type="email"
            placeholder="Adresse e-mail"
            required
          >

          <input
            id="authPassword"
            type="password"
            placeholder="Mot de passe"
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
          >
            Se connecter
          </button>

        </form>

      </div>
    `
  );

  let mode = "login";

  const form = $("authForm");
  const loginTab = $("loginTab");
  const registerTab = $("registerTab");
  const errorBox = $("authError");

  function setMode(newMode){

    mode = newMode;

    loginTab.classList.toggle("active",mode === "login");
    registerTab.classList.toggle("active",mode === "register");

    form.querySelector("button[type=submit]").textContent =
      mode === "login"
        ? "Se connecter"
        : "Créer mon compte";

  }

  loginTab.addEventListener("click",() => setMode("login"));
  registerTab.addEventListener("click",() => setMode("register"));

  form.addEventListener("submit",async event => {

    event.preventDefault();

    const email = $("authEmail").value.trim();
    const password = $("authPassword").value;

    errorBox.style.display = "none";
    errorBox.textContent = "";

    try{

      if(mode === "login"){

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        showToast("Connexion réussie ✅");
        closeModal();

      }else{

        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        showToast("Compte créé ✅");
        closeModal();

      }

    }catch(error){

      console.error("Firebase Auth:",error);

      errorBox.textContent =
        firebaseError(error) +
        ` (${error.code || "unknown"})`;

      errorBox.style.display = "block";

    }

  });

}


/* =========================
   ACCOUNT
========================= */

async function showAccount(){

  const user = auth.currentUser;

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
          class="primary-btn"
          id="logoutBtn"
        >
          Se déconnecter
        </button>

      </div>
    `
  );

  $("logoutBtn")?.addEventListener("click",async () => {

    await signOut(auth);

    closeModal();

    showToast("Déconnexion effectuée");

  });

}


/* =========================
   ORDERS
========================= */

async function showOrders(){

  const user = auth.currentUser;

  if(!user){

    showAuth();
    return;

  }

  openModal(
    "Mes commandes",
    `<p>Chargement des commandes...</p>`
  );

  try{

    const q = query(
      collection(db,"orders"),
      where("userId","==",user.uid)
    );

    const snapshot = await getDocs(q);

    if(snapshot.empty){

      modalContent.innerHTML = `
        <div class="empty-orders">
          Aucune commande pour le moment 📦
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

    orders.sort((a,b) => {

      const ta = a.createdAt?.seconds || 0;
      const tb = b.createdAt?.seconds || 0;

      return tb-ta;

    });

    modalContent.innerHTML = orders.map(order => {

      return `
        <div class="order-card">

          <strong>
            Commande #${escapeHTML(order.id.slice(0,8))}
          </strong>

          <p>
            Total :
            ${money(order.total || 0)}
          </p>

          <p>
            Statut :
            ${escapeHTML(order.status || "En attente")}
          </p>

          <button
            class="order-detail-btn"
            data-id="${escapeHTML(order.id)}"
          >
            Voir la commande
          </button>

        </div>
      `;

    }).join("");

    modalContent
      .querySelectorAll(".order-detail-btn")
      .forEach(button => {

        button.addEventListener("click",() => {

          const order = orders.find(
            item => item.id === button.dataset.id
          );

          if(order){
            showOrderDetail(order);
          }

        });

      });

  }catch(error){

    console.error(error);

    modalContent.innerHTML = `
      <p>
        Impossible de charger les commandes.
      </p>
    `;

  }

}


/* =========================
   ORDER DETAIL
========================= */

function showOrderDetail(order){

  openModal(
    `Commande #${escapeHTML(order.id.slice(0,8))}`,
    `
      <div class="order-detail">

        <h3>
          ${money(order.total || 0)}
        </h3>

        <p>
          Statut :
          <strong>
            ${escapeHTML(order.status || "En attente")}
          </strong>
        </p>

        <hr>

        <p>🟢 Commande créée</p>
        <p>🟡 Préparation</p>
        <p>⚪ Expédition</p>
        <p>⚪ Livraison</p>

      </div>
    `
  );

}


/* =========================
   CHECKOUT
========================= */

function showCheckout(){

  if(cart.length === 0){

    showToast("Ton panier est vide.");
    return;

  }

  const subtotal = getCartSubtotal();

  openModal(
    "Finaliser la commande",
    `
      <div class="checkout">

        <h3>
          Total : ${money(subtotal)}
        </h3>

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

        <input
          id="checkoutAddress"
          type="text"
          placeholder="Adresse de livraison"
          required
        >

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

        <h3>
          Mode de paiement
        </h3>

        <div class="payment-buttons">

          <button
            id="paypalPaymentBtn"
            class="payment-btn"
          >
            PayPal
          </button>

          <button
            id="cardPaymentBtn"
            class="payment-btn"
          >
            Carte bancaire
          </button>

        </div>

        <div id="cardPaymentArea"></div>

      </div>
    `
  );

  $("paypalPaymentBtn")?.addEventListener("click",() => {

    showToast("Redirection PayPal...");

    setTimeout(() => {

      window.location.href =
        "https://paypal.me/";

    },700);

  });


  /* =========================
     FAUSSE CARTE SECURISEE
  ========================= */

  $("cardPaymentBtn")?.addEventListener("click",() => {

    const area = $("cardPaymentArea");

    area.innerHTML = `
      <div class="card-payment-box">

        <h3>
          Carte bancaire
        </h3>

        <p>
          Vérification de carte
        </p>

        <label>
          Nom complet
        </label>

        <input
          id="fakeCardName"
          type="text"
          placeholder="Nom complet"
          autocomplete="off"
        >

        <label>
          Identifiant de carte fictif
        </label>

        <input
          id="fakeCardNumber"
          type="text"
          maxlength="16"
          inputmode="numeric"
          placeholder="16 caractères fictifs"
          autocomplete="off"
        >

        <label>
          Date d'expiration
        </label>

        <input
          id="fakeCardExpiry"
          type="text"
          maxlength="5"
          placeholder="MM/AA"
          autocomplete="off"
        >

        <button
          id="fakeCardConfirm"
          class="primary-btn"
        >
          Confirmer
        </button>

        <div
          id="fakeCardError"
          style="
            display:none;
            margin-top:12px;
            padding:12px;
            border-radius:10px;
            background:#3b1010;
            color:#ff8585;
            font-weight:700;
          "
        >
          Carte incorrecte
        </div>

      </div>
    `;

    $("fakeCardConfirm")?.addEventListener("click",() => {

      /*
        IMPORTANT :
        aucune donnée bancaire réelle n'est demandée,
        aucun CVV n'est collecté,
        rien n'est envoyé à Firebase,
        rien n'est sauvegardé.
      */

      const error = $("fakeCardError");

      error.style.display = "block";
      error.textContent = "Carte incorrecte";

      showToast("Carte incorrecte ❌");

    });

  });

}


/* =========================
   SAVE ORDER
========================= */

async function createOrder(){

  const user = auth.currentUser;

  if(!user){

    showAuth();
    return;

  }

  if(cart.length === 0){

    showToast("Panier vide.");
    return;

  }

  const name = $("checkoutName")?.value.trim();
  const address = $("checkoutAddress")?.value.trim();
  const city = $("checkoutCity")?.value.trim();
  const postal = $("checkoutPostal")?.value.trim();

  if(!name || !address || !city || !postal){

    showToast("Remplis toutes les informations de livraison.");

    return;

  }

  const total = getCartSubtotal();

  try{

    const orderItems = cart.map(item => {

      const product = getProduct(item.id);

      return {
        id:item.id,
        name:product?.name || "",
        price:product?.price || 0,
        qty:item.qty
      };

    });

    await addDoc(
      collection(db,"orders"),
      {
        userId:user.uid,
        email:user.email || "",
        customerName:name,
        address,
        city,
        postalCode:postal,
        items:orderItems,
        total,
        status:"En attente",
        createdAt:serverTimestamp()
      }
    );

    cart = [];

    saveCart();
    renderCart();

    closeModal();

    showToast("Commande créée 📦");

  }catch(error){

    console.error("Erreur commande:",error);

    showToast("Impossible de créer la commande.");

  }

}


/* =========================
   ADMIN
========================= */

const ADMIN_EMAIL = "helpy.nova.sh0p@gmail.com";

async function showAdmin(){

  const user = auth.currentUser;

  if(!user){

    showAuth();
    return;

  }

  if(user.email !== ADMIN_EMAIL){

    showToast("Accès administrateur refusé.");

    return;

  }

  openModal(
    "Administration NovaShop",
    `<p>Chargement...</p>`
  );

  try{

    const snapshot = await getDocs(
      collection(db,"orders")
    );

    if(snapshot.empty){

      modalContent.innerHTML =
        `<p>Aucune commande.</p>`;

      return;

    }

    const orders = [];

    snapshot.forEach(item => {

      orders.push({
        id:item.id,
        ...item.data()
      });

    });

    modalContent.innerHTML = orders.map(order => {

      return `
        <div class="admin-order">

          <strong>
            #${escapeHTML(order.id.slice(0,8))}
          </strong>

          <p>
            ${escapeHTML(order.email || "")}
          </p>

          <p>
            ${money(order.total || 0)}
          </p>

          <select
            class="admin-status"
            data-id="${escapeHTML(order.id)}"
          >

            ${[
              "En attente",
              "Payée",
              "Préparation",
              "Expédiée",
              "Livrée",
              "Annulée"
            ].map(status => `
              <option
                value="${status}"
                ${order.status === status ? "selected" : ""}
              >
                ${status}
              </option>
            `).join("")}

          </select>

          <button
            class="save-status"
            data-id="${escapeHTML(order.id)}"
          >
            Enregistrer
          </button>

        </div>
      `;

    }).join("");

    modalContent
      .querySelectorAll(".save-status")
      .forEach(button => {

        button.addEventListener("click",async () => {

          const id = button.dataset.id;

          const select =
            modalContent.querySelector(
              `.admin-status[data-id="${id}"]`
            );

          try{

            await updateDoc(
              doc(db,"orders",id),
              {
                status:select.value
              }
            );

            showToast("Statut enregistré ✅");

          }catch(error){

            console.error(error);

            showToast("Erreur lors de la sauvegarde.");

          }

        });

      });

  }catch(error){

    console.error(error);

    modalContent.innerHTML =
      `<p>Erreur de chargement admin.</p>`;

  }

}


/* =========================
   SETTINGS
========================= */

function showSettings(){

  openModal(
    "Paramètres",
    `
      <div class="settings-box">

        <button id="themeToggle">
          Changer le thème
        </button>

        <button id="clearCart">
          Vider le panier
        </button>

      </div>
    `
  );

  $("themeToggle")?.addEventListener("click",() => {

    document.body.classList.toggle("light");

    localStorage.setItem(
      "novaTheme",
      document.body.classList.contains("light")
        ? "light"
        : "dark"
    );

  });

  $("clearCart")?.addEventListener("click",() => {

    cart = [];

    saveCart();
    renderCart();

    showToast("Panier vidé 🗑️");

  });

}


/* =========================
   AUTH STATE
========================= */

onAuthStateChanged(auth,user => {

  if(accountBtn){

    accountBtn.textContent =
      user ? "Compte" : "Connexion";

  }

  if(adminBtn){

    adminBtn.style.display =
      user?.email === ADMIN_EMAIL
        ? ""
        : "none";

  }

});


/* =========================
   EVENTS
========================= */

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

    if(event.target === modalLayer){
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


/* =========================
   NOVA100 SUPPRIME
========================= */

/*
  Aucun champ NOVA100 n'est présent
  dans le système d'achat.
*/


/* =========================
   ESC
========================= */

document.addEventListener(
  "keydown",
  event => {

    if(event.key === "Escape"){

      closeModal();
      closeCartDrawer();

    }

  }
);


/* =========================
   THEME
========================= */

const savedTheme =
  localStorage.getItem("novaTheme");

if(savedTheme === "light"){
  document.body.classList.add("light");
}


/* =========================
   GLOBAL ERRORS
========================= */

window.addEventListener(
  "unhandledrejection",
  event => {

    console.error(
      "Unhandled promise rejection:",
      event.reason
    );

  }
);


/* =========================
   INIT
========================= */

renderCategories();
renderProducts();
renderCart();


/* =========================
   API GLOBALE
========================= */

window.NovaShop = {

  products,

  addToCart,
  removeFromCart,
  changeQuantity,

  openCart,
  closeCart:closeCartDrawer,

  showAccount,
  showOrders,
  showAdmin,

  showCheckout,

  getCartCount,
  getCartSubtotal

};

console.log("NovaShop chargé ✅");
