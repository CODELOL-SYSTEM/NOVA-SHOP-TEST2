// ============================================================
// NOVASHOP - APP.JS
// Produits + recherche + catégories + panier + favoris
// compte + commandes + admin + paramètres
// ============================================================


// ============================================================
// PRODUITS
// ============================================================

const products = [

  {
    id:"p1",
    name:"Gigabyte B650 AORUS Elite AX",
    category:"Composants PC",
    price:189.99,
    image:"https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"
  },

  {
    id:"p2",
    name:"PC Gamer Ryzen 7 7800X3D / RX 9070 XT / 32 Go DDR5",
    category:"PC Gamer",
    price:2237.65,
    image:""
  },

  {
    id:"p3",
    name:"HyperX Cloud II",
    category:"Casques",
    price:49.99,
    image:""
  },

  {
    id:"p4",
    name:"TECORS 60% AZERTY",
    category:"Claviers",
    price:30,
    image:""
  },

  {
    id:"p5",
    name:"Celshading 65% Keyboard",
    category:"Claviers",
    price:120.90,
    image:""
  },

  {
    id:"p6",
    name:"Ajazz AJ199 MAX",
    category:"Souris",
    price:49.99,
    image:""
  },

  {
    id:"p7",
    name:"Logitech G PRO X2 Superstrike",
    category:"Souris",
    price:150.99,
    image:""
  },

  {
    id:"p8",
    name:"Samsung 990 PRO 1TB",
    category:"Stockage",
    price:249.99,
    image:""
  },

  {
    id:"p9",
    name:"Samsung 990 PRO 2TB",
    category:"Stockage",
    price:199.93,
    image:""
  },

  {
    id:"p10",
    name:"Corsair RM1000x",
    category:"Alimentations",
    price:159.90,
    image:""
  },

  {
    id:"p11",
    name:"Corsair RM850x",
    category:"Alimentations",
    price:134.90,
    image:""
  },

  {
    id:"p12",
    name:"Corsair Frame 5000D",
    category:"Boîtiers",
    price:159.90,
    image:""
  },

  {
    id:"p13",
    name:"Arctic Liquid Freezer III Pro 360",
    category:"Refroidissement",
    price:129.90,
    image:""
  },

  {
    id:"p14",
    name:"Samsung 27 QD-OLED Odyssey G6",
    category:"Écrans",
    price:399.95,
    image:""
  },

  {
    id:"p15",
    name:"Elgato Wave Mic Arm Pro",
    category:"Streaming",
    price:229.90,
    image:""
  },

  {
    id:"p16",
    name:"DualSense Cosmic Red",
    category:"Manettes",
    price:74.90,
    image:""
  },

  {
    id:"p17",
    name:"ASUS TUF B650-PLUS",
    category:"Composants PC",
    price:179.90,
    image:""
  },

  {
    id:"p18",
    name:"MSI MAG B650 Tomahawk",
    category:"Composants PC",
    price:189.90,
    image:""
  },


  // ==========================================================
  // P85 À P105
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
// STOCKAGE
// ============================================================

const STORAGE = {
  cart:"nova_cart",
  favorites:"nova_favorites",
  orders:"nova_orders",
  reviews:"nova_reviews",
  dark:"nova_dark",
  sound:"nova_sound",
  profiles:"nova_profiles",
  admin:"nova_admin_unlocked"
};


// ============================================================
// ETAT
// ============================================================

const state = {
  category:"Toutes",
  search:"",
  sort:"default",
  cart:loadJSON(STORAGE.cart,[]),
  favorites:loadJSON(STORAGE.favorites,[])
};


// ============================================================
// DOM
// ============================================================

const searchInput = document.getElementById("searchInput");
const categoriesEl = document.getElementById("categories");
const productGrid = document.getElementById("productGrid");
const productCount = document.getElementById("productCount");
const sortSelect = document.getElementById("sortSelect");

const cartBtn = document.getElementById("cartBtn");
const cartBadge = document.getElementById("cartBadge");
const cartOverlay = document.getElementById("overlay");
const cartDrawer = document.getElementById("cartDrawer");
const cartClose = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

const settingsBtn = document.getElementById("settingsBtn");
const accountBtn = document.getElementById("accountBtn");
const ordersBtn = document.getElementById("ordersBtn");
const adminBtn = document.getElementById("adminBtn");
const heroCartBtn = document.getElementById("heroCartBtn");

const modalLayer = document.getElementById("modalLayer");
const modalContent = document.getElementById("modalContent");
const modalTitle = document.getElementById("modalTitle");
const modalClose = document.getElementById("modalClose");

const toast = document.getElementById("toast");


// ============================================================
// UTILITAIRES
// ============================================================

function loadJSON(key,fallback){

  try{
    const value = localStorage.getItem(key);

    if(!value){
      return fallback;
    }

    return JSON.parse(value);

  }catch{
    return fallback;
  }
}


function saveJSON(key,value){

  try{
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  }catch{}
}


function escapeHTML(value){

  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}


function money(value){

  return Number(value || 0).toLocaleString(
    "fr-FR",
    {
      minimumFractionDigits:2,
      maximumFractionDigits:2
    }
  ) + " €";
}


function getProduct(id){

  return products.find(
    product => product.id === id
  );
}


function cartQuantity(){

  return state.cart.reduce(
    (total,item) => total + Number(item.qty || 0),
    0
  );
}


function cartAmount(){

  return state.cart.reduce(
    (total,item) => {

      const product = getProduct(item.id);

      if(!product){
        return total;
      }

      return total +
        Number(product.price || 0) *
        Number(item.qty || 0);

    },
    0
  );
}


// ============================================================
// TOAST
// ============================================================

function showToast(message,type="success"){

  const item = document.createElement("div");

  item.className =
    "toast-item " +
    (type === "error" ? "error" : "success");

  item.innerHTML = `
    <span>${escapeHTML(message)}</span>

    <button type="button">
      ×
    </button>
  `;

  item.querySelector("button").onclick = () => {
    item.remove();
  };

  toast.appendChild(item);

  setTimeout(() => {

    if(item.isConnected){
      item.remove();
    }

  },3500);
}


// ============================================================
// CATEGORIES
// ============================================================

function renderCategories(){

  const categories = [
    "Toutes",
    ...new Set(
      products
        .map(product => product.category)
        .filter(Boolean)
    )
  ];

  categoriesEl.innerHTML = categories.map(category => `

    <button
      type="button"
      class="category-btn ${state.category === category ? "active" : ""}"
      data-category="${escapeHTML(category)}">

      ${escapeHTML(category)}

    </button>

  `).join("");

  categoriesEl
    .querySelectorAll(".category-btn")
    .forEach(button => {

      button.addEventListener("click",() => {

        state.category =
          button.dataset.category;

        renderCategories();
        renderProducts();

      });

    });
}


// ============================================================
// IMAGE PRODUIT
// ============================================================

function productImageHTML(product){

  if(!product.image){
    return "";
  }

  return `
    <img
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
// PRODUITS FILTRES
// ============================================================

function getFilteredProducts(){

  let result = [...products];

  if(state.category !== "Toutes"){

    result = result.filter(
      product =>
        product.category === state.category
    );

  }

  const search =
    state.search.trim().toLowerCase();

  if(search){

    result = result.filter(product => {

      const name =
        String(product.name || "").toLowerCase();

      const category =
        String(product.category || "").toLowerCase();

      return (
        name.includes(search) ||
        category.includes(search)
      );

    });

  }

  switch(state.sort){

    case "price-low":

      result.sort(
        (a,b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );

      break;

    case "price-high":

      result.sort(
        (a,b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );

      break;

    case "name":

      result.sort(
        (a,b) =>
          a.name.localeCompare(
            b.name,
            "fr"
          )
      );

      break;

    case "new":

      result.reverse();

      break;

  }

  return result;
}


// ============================================================
// FAVORIS
// ============================================================

function isFavorite(id){

  return state.favorites.includes(id);
}


function toggleFavorite(id){

  if(isFavorite(id)){

    state.favorites =
      state.favorites.filter(
        favoriteId => favoriteId !== id
      );

    showToast(
      "Produit retiré des favoris"
    );

  }else{

    state.favorites.push(id);

    showToast(
      "Produit ajouté aux favoris"
    );

  }

  saveJSON(
    STORAGE.favorites,
    state.favorites
  );

  renderProducts();
}


// ============================================================
// RENDU PRODUITS
// ============================================================

function renderProducts(){

  const result =
    getFilteredProducts();

  productCount.textContent =
    `${result.length} produit${result.length > 1 ? "s" : ""}`;

  if(!result.length){

    productGrid.innerHTML = `
      <div class="empty-products">
        Aucun produit trouvé.
      </div>
    `;

    return;
  }

  productGrid.innerHTML =
    result.map((product,index) => {

      const favorite =
        isFavorite(product.id);

      return `

        <article
          class="product"
          data-id="${escapeHTML(product.id)}">

          <div class="product-img">

            ${
              index < 10
                ? `<span class="new-badge">NOUVEAU</span>`
                : ""
            }

            <button
              type="button"
              class="favorite-btn ${favorite ? "active" : ""}"
              data-favorite="${escapeHTML(product.id)}"
              aria-label="Favori">

              ${favorite ? "♥" : "♡"}

            </button>

            ${productImageHTML(product)}

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
                ★★★★★
              </span>

              <span>
                4.8
              </span>

            </div>

            <div class="price">
              ${money(product.price)}
            </div>

            <div class="product-actions">

              <button
                type="button"
                class="view-btn"
                data-view="${escapeHTML(product.id)}">

                Voir

              </button>

              <button
                type="button"
                class="add-btn"
                data-add="${escapeHTML(product.id)}">

                Ajouter

              </button>

            </div>

          </div>

        </article>

      `;

    }).join("");

  productGrid
    .querySelectorAll("[data-add]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => addToCart(
          button.dataset.add
        )
      );

    });

  productGrid
    .querySelectorAll("[data-view]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => openProduct(
          button.dataset.view
        )
      );

    });

  productGrid
    .querySelectorAll("[data-favorite]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => toggleFavorite(
          button.dataset.favorite
        )
      );

    });
}


// ============================================================
// MODAL
// ============================================================

function openModal(title,html){

  modalTitle.textContent = title;
  modalContent.innerHTML = html;

  modalLayer.classList.add("open");

  document.body.classList.add(
    "modal-open"
  );
}


function closeModal(){

  modalLayer.classList.remove("open");

  document.body.classList.remove(
    "modal-open"
  );
}


function openProduct(id){

  const product = getProduct(id);

  if(!product){
    return;
  }

  openModal(
    product.name,
    `

      <div style="
        display:grid;
        gap:20px;
      ">

        <div style="
          background:#fff;
          border-radius:16px;
          min-height:260px;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:20px;
        ">

          ${
            product.image
              ? `
                <img
                  src="${escapeHTML(product.image)}"
                  alt="${escapeHTML(product.name)}"
                  style="
                    max-width:100%;
                    max-height:260px;
                    object-fit:contain;
                  "
                  onerror="
                    this.onerror=null;
                    this.style.display='none';
                  "
                >
              `
              : ""
          }

        </div>

        <div>

          <div style="
            color:var(--accent);
            font-size:12px;
            font-weight:900;
            text-transform:uppercase;
          ">
            ${escapeHTML(product.category)}
          </div>

          <h3 style="
            margin-top:8px;
            font-size:24px;
            line-height:1.35;
          ">
            ${escapeHTML(product.name)}
          </h3>

          <div style="
            margin-top:15px;
            font-size:28px;
            font-weight:950;
          ">
            ${money(product.price)}
          </div>

          <button
            type="button"
            class="add-btn"
            id="modalAddButton"
            style="
              margin-top:18px;
              width:100%;
            ">

            🛒 Ajouter au panier

          </button>

        </div>

      </div>

    `
  );

  const addButton =
    document.getElementById(
      "modalAddButton"
    );

  if(addButton){

    addButton.onclick = () => {

      addToCart(product.id);

      closeModal();

    };

  }
}


// ============================================================
// PANIER
// ============================================================

function addToCart(id){

  const product = getProduct(id);

  if(!product){
    return;
  }

  const existing =
    state.cart.find(
      item => item.id === id
    );

  if(existing){

    existing.qty =
      Number(existing.qty || 0) + 1;

  }else{

    state.cart.push({
      id,
      qty:1
    });

  }

  saveJSON(
    STORAGE.cart,
    state.cart
  );

  renderCart();

  showToast(
    "Produit ajouté au panier"
  );
}


function removeFromCart(id){

  state.cart =
    state.cart.filter(
      item => item.id !== id
    );

  saveJSON(
    STORAGE.cart,
    state.cart
  );

  renderCart();
}


function changeQuantity(id,change){

  const item =
    state.cart.find(
      entry => entry.id === id
    );

  if(!item){
    return;
  }

  item.qty =
    Number(item.qty || 0) + change;

  if(item.qty <= 0){

    state.cart =
      state.cart.filter(
        entry => entry.id !== id
      );

  }

  saveJSON(
    STORAGE.cart,
    state.cart
  );

  renderCart();
}


function renderCart(){

  const quantity =
    cartQuantity();

  cartBadge.textContent =
    quantity;

  cartBadge.style.display =
    quantity > 0
      ? "flex"
      : "none";

  const total =
    cartAmount();

  cartTotal.textContent =
    money(total);

  if(!state.cart.length){

    cartItems.innerHTML = `
      <div class="empty-cart">
        🛒 Ton panier est vide.
      </div>
    `;

    checkoutBtn.disabled = true;

    return;
  }

  checkoutBtn.disabled = false;

  cartItems.innerHTML =
    state.cart.map(item => {

      const product =
        getProduct(item.id);

      if(!product){
        return "";
      }

      return `

        <div class="cart-item">

          <div>

            ${
              product.image
                ? `
                  <img
                    src="${escapeHTML(product.image)}"
                    alt=""
                    onerror="
                      this.onerror=null;
                      this.style.display='none';
                    "
                  >
                `
                : ""
            }

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
                type="button"
                data-minus="${escapeHTML(product.id)}">
                −
              </button>

              <strong>
                ${Number(item.qty || 0)}
              </strong>

              <button
                type="button"
                data-plus="${escapeHTML(product.id)}">
                +
              </button>

            </div>

          </div>

          <button
            type="button"
            class="remove-cart"
            data-remove="${escapeHTML(product.id)}">

            ×

          </button>

        </div>

      `;

    }).join("");

  cartItems
    .querySelectorAll("[data-minus]")
    .forEach(button => {

      button.onclick = () => {

        changeQuantity(
          button.dataset.minus,
          -1
        );

      };

    });

  cartItems
    .querySelectorAll("[data-plus]")
    .forEach(button => {

      button.onclick = () => {

        changeQuantity(
          button.dataset.plus,
          1
        );

      };

    });

  cartItems
    .querySelectorAll("[data-remove]")
    .forEach(button => {

      button.onclick = () => {

        removeFromCart(
          button.dataset.remove
        );

      };

    });
}


// ============================================================
// PANIER DRAWER
// ============================================================

function openCart(){

  renderCart();

  cartOverlay.classList.add("open");
  cartDrawer.classList.add("open");
}


function closeCartDrawer(){

  cartOverlay.classList.remove("open");
  cartDrawer.classList.remove("open");
}


cartBtn.addEventListener(
  "click",
  openCart
);


heroCartBtn.addEventListener(
  "click",
  openCart
);


cartClose.addEventListener(
  "click",
  closeCartDrawer
);


cartOverlay.addEventListener(
  "click",
  closeCartDrawer
);


// ============================================================
// RECHERCHE
// ============================================================

searchInput.addEventListener(
  "input",
  event => {

    state.search =
      event.target.value;

    renderProducts();

  }
);


// ============================================================
// TRI
// ============================================================

sortSelect.addEventListener(
  "change",
  event => {

    state.sort =
      event.target.value;

    renderProducts();

  }
);


// ============================================================
// MODAL EVENTS
// ============================================================

modalClose.addEventListener(
  "click",
  closeModal
);


modalLayer.addEventListener(
  "click",
  event => {

    if(event.target === modalLayer){
      closeModal();
    }

  }
);


document.addEventListener(
  "keydown",
  event => {

    if(event.key === "Escape"){

      closeModal();
      closeCartDrawer();

    }

  }
);


// ============================================================
// COMPTE
// ============================================================

function openAccount(){

  const profile =
    loadJSON(
      STORAGE.profiles,
      {}
    );

  openModal(
    "👤 Mon compte",
    `

      <div style="
        display:grid;
        gap:15px;
      ">

        <div class="trust-card">

          <strong>
            👤 Compte NovaShop
          </strong>

          <span>
            ${
              profile.email
                ? escapeHTML(profile.email)
                : "Aucun compte connecté."
            }
          </span>

        </div>

        <button
          type="button"
          class="add-btn"
          id="accountOrdersButton">

          📦 Mes commandes

        </button>

      </div>

    `
  );

  const ordersButton =
    document.getElementById(
      "accountOrdersButton"
    );

  if(ordersButton){

    ordersButton.onclick = () => {

      closeModal();
      openOrders();

    };

  }
}


accountBtn.addEventListener(
  "click",
  openAccount
);


// ============================================================
// COMMANDES
// ============================================================

function openOrders(){

  const orders =
    loadJSON(
      STORAGE.orders,
      []
    );

  if(!orders.length){

    openModal(
      "📦 Mes commandes",
      `

        <div class="empty-products">
          Tu n'as encore aucune commande.
        </div>

      `
    );

    return;
  }

  openModal(
    "📦 Mes commandes",
    orders.map(order => `

      <div
        class="order-card"
        style="
          border:1px solid var(--line);
          border-radius:16px;
          padding:18px;
          margin-bottom:12px;
        ">

        <strong>
          Commande #${escapeHTML(order.id)}
        </strong>

        <p style="
          margin-top:8px;
          color:var(--muted);
        ">
          Statut :
          ${escapeHTML(order.status || "En préparation")}
        </p>

        <p style="
          margin-top:5px;
          font-weight:900;
        ">
          ${money(order.total)}
        </p>

      </div>

    `).join("")
  );
}


ordersBtn.addEventListener(
  "click",
  openOrders
);


// ============================================================
// ADMIN
// ============================================================

function openAdmin(){

  const unlocked =
    localStorage.getItem(
      STORAGE.admin
    ) === "true";

  if(!unlocked){

    openModal(
      "🛡️ Administration",
      `

        <div style="
          display:grid;
          gap:12px;
        ">

          <input
            id="adminPassword"
            class="input"
            type="password"
            placeholder="Mot de passe admin"
          >

          <button
            type="button"
            class="add-btn"
            id="adminLoginButton">

            Se connecter

          </button>

        </div>

      `
    );

    document.getElementById(
      "adminLoginButton"
    ).onclick = () => {

      const password =
        document.getElementById(
          "adminPassword"
        ).value;

      if(password === "admin"){

        localStorage.setItem(
          STORAGE.admin,
          "true"
        );

        showToast(
          "Administration activée"
        );

        closeModal();

      }else{

        showToast(
          "Mot de passe incorrect",
          "error"
        );

      }

    };

    return;
  }

  const orders =
    loadJSON(
      STORAGE.orders,
      []
    );

  openModal(
    "🛡️ Administration",
    `

      <div style="
        display:grid;
        gap:15px;
      ">

        <div class="trust-card">

          <strong>
            Administration NovaShop
          </strong>

          <span>
            ${orders.length} commande(s)
          </span>

        </div>

        ${
          orders.length
            ? orders.map(order => `

              <div
                class="admin-order"
                style="
                  border:1px solid var(--line);
                  border-radius:15px;
                  padding:15px;
                ">

                <strong>
                  #${escapeHTML(order.id)}
                </strong>

                <input
                  class="input admin-status"
                  data-order="${escapeHTML(order.id)}"
                  value="${escapeHTML(order.status || "En préparation")}"
                  style="margin-top:10px"
                >

                <button
                  type="button"
                  class="add-btn admin-save"
                  data-order="${escapeHTML(order.id)}"
                  style="margin-top:8px">

                  Sauvegarder

                </button>

              </div>

            `).join("")
            : `
              <div class="empty-products">
                Aucune commande.
              </div>
            `
        }

      </div>

    `
  );

  document
    .querySelectorAll(".admin-save")
    .forEach(button => {

      button.onclick = () => {

        const id =
          button.dataset.order;

        const input =
          document.querySelector(
            `.admin-status[data-order="${CSS.escape(id)}"]`
          );

        const orders =
          loadJSON(
            STORAGE.orders,
            []
          );

        const order =
          orders.find(
            item => item.id === id
          );

        if(order && input){

          order.status =
            input.value;

          saveJSON(
            STORAGE.orders,
            orders
          );

          showToast(
            "Commande mise à jour"
          );

        }

      };

    });
}


adminBtn.addEventListener(
  "click",
  openAdmin
);


// ============================================================
// PARAMÈTRES
// ============================================================

function applyTheme(){

  const dark =
    localStorage.getItem(
      STORAGE.dark
    ) !== "false";

  document.documentElement.dataset.theme =
    dark
      ? "dark"
      : "light";
}


function openSettings(){

  const dark =
    localStorage.getItem(
      STORAGE.dark
    ) !== "false";

  openModal(
    "⚙️ Paramètres",
    `

      <div style="
        display:grid;
        gap:12px;
      ">

        <button
          type="button"
          class="btn"
          id="themeButton">

          ${dark ? "☀️ Mode clair" : "🌙 Mode sombre"}

        </button>

        <button
          type="button"
          class="btn"
          id="clearCartButton">

          🗑️ Vider le panier

        </button>

      </div>

    `
  );

  document.getElementById(
    "themeButton"
  ).onclick = () => {

    localStorage.setItem(
      STORAGE.dark,
      String(!dark)
    );

    applyTheme();
    closeModal();

  };

  document.getElementById(
    "clearCartButton"
  ).onclick = () => {

    state.cart = [];

    saveJSON(
      STORAGE.cart,
      state.cart
    );

    renderCart();

    showToast(
      "Panier vidé"
    );

  };
}


settingsBtn.addEventListener(
  "click",
  openSettings
);


// ============================================================
// CHECKOUT DEMO
// ============================================================

checkoutBtn.addEventListener(
  "click",
  () => {

    if(!state.cart.length){

      showToast(
        "Ton panier est vide",
        "error"
      );

      return;
    }

    const total =
      cartAmount();

    openModal(
      "💳 Passer la commande",
      `

        <div style="
          display:grid;
          gap:14px;
        ">

          <div class="trust-card">

            <strong>
              Total
            </strong>

            <span style="
              font-size:24px;
              font-weight:950;
              color:var(--text);
            ">
              ${money(total)}
            </span>

          </div>

          <input
            id="checkoutName"
            class="input"
            placeholder="Nom complet"
          >

          <input
            id="checkoutAddress"
            class="input"
            placeholder="Adresse"
          >

          <input
            id="checkoutCity"
            class="input"
            placeholder="Ville"
          >

          <button
            type="button"
            class="add-btn"
            id="freeOrderButton">

            Confirmer la commande

          </button>

        </div>

      `
    );

    document.getElementById(
      "freeOrderButton"
    ).onclick = () => {

      const name =
        document.getElementById(
          "checkoutName"
        ).value.trim();

      const address =
        document.getElementById(
          "checkoutAddress"
        ).value.trim();

      const city =
        document.getElementById(
          "checkoutCity"
        ).value.trim();

      if(!name || !address || !city){

        showToast(
          "Remplis tous les champs",
          "error"
        );

        return;
      }

      const orders =
        loadJSON(
          STORAGE.orders,
          []
        );

      const order = {

        id:
          "NS-" +
          Date.now()
            .toString()
            .slice(-8),

        total,

        status:
          "Commande reçue",

        destination:
          city,

        address,

        name,

        createdAt:
          new Date().toISOString()

      };

      orders.unshift(order);

      saveJSON(
        STORAGE.orders,
        orders
      );

      state.cart = [];

      saveJSON(
        STORAGE.cart,
        state.cart
      );

      renderCart();

      closeModal();
      closeCartDrawer();

      showToast(
        "Commande créée avec succès"
      );

    };

  }
);


// ============================================================
// INITIALISATION
// ============================================================

applyTheme();

renderCategories();

renderProducts();

renderCart();

if(
  localStorage.getItem(
    STORAGE.admin
  ) === "true"
){

  adminBtn.style.display =
    "inline-flex";

}


// ============================================================
// EXPORT GLOBAL
// ============================================================

window.NovaShopCatalog = {

  getAll(){
    return [...products];
  },

  getById(id){
    return getProduct(id);
  }

};
