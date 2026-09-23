// ============================================================
// NOVASHOP - APP.JS COMPLET RECONSTRUIT
// Produits + catalogue + panier + favoris + fiches produit
// Recherche + catégories + tri + avis + checkout démo
// Commandes + suivi livraison + administration locale
// ============================================================

"use strict";


// ============================================================
// CONFIGURATION
// ============================================================

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";

const STORAGE = {
  cart: "novaCart",
  favorites: "novaFavorites",
  orders: "novaOrders",
  reviews: "novaReviews",
  admin: "novaAdminUnlocked",
  dark: "novaDark",
  sound: "novaSound",
  profiles: "novaProfiles"
};


// ============================================================
// PRODUITS
// ============================================================

const products = [

  // ----------------------------------------------------------
  // COMPOSANTS
  // ----------------------------------------------------------

  {
    id: "p1",
    name: "Gigabyte B650 AORUS Elite AX",
    category: "Composants",
    price: 189.99,
    image: "https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"
  },

  {
    id: "p2",
    name: "ASUS TUF Gaming B650-PLUS",
    category: "Composants",
    price: 179.90,
    image: ""
  },

  {
    id: "p3",
    name: "MSI MAG B650 Tomahawk",
    category: "Composants",
    price: 189.90,
    image: ""
  },

  {
    id: "p4",
    name: "AMD Ryzen 7 7800X3D",
    category: "Composants",
    price: 0,
    image: ""
  },

  {
    id: "p5",
    name: "AMD Ryzen 7 9800X3D",
    category: "Composants",
    price: 0,
    image: ""
  },

  {
    id: "p6",
    name: "AMD Ryzen 9 9950X3D",
    category: "Composants",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // PC GAMER
  // ----------------------------------------------------------

  {
    id: "p7",
    name: "PC Gamer Ryzen 7 7800X3D / RX 9070 XT / 32 Go DDR5",
    category: "PC Gamer",
    price: 2237.65,
    image: ""
  },


  // ----------------------------------------------------------
  // CASQUES
  // ----------------------------------------------------------

  {
    id: "p8",
    name: "HyperX Cloud II",
    category: "Casques",
    price: 49.99,
    image: ""
  },


  // ----------------------------------------------------------
  // CLAVIERS
  // ----------------------------------------------------------

  {
    id: "p9",
    name: "TECORS 60% AZERTY",
    category: "Claviers",
    price: 30,
    image: ""
  },

  {
    id: "p10",
    name: "Celshading 65%",
    category: "Claviers",
    price: 120.90,
    image: ""
  },


  // ----------------------------------------------------------
  // SOURIS
  // ----------------------------------------------------------

  {
    id: "p11",
    name: "Ajazz AJ199 MAX",
    category: "Souris",
    price: 49.99,
    image: ""
  },

  {
    id: "p12",
    name: "Logitech G PRO X2 Superstrike",
    category: "Souris",
    price: 150.99,
    image: ""
  },


  // ----------------------------------------------------------
  // STOCKAGE
  // ----------------------------------------------------------

  {
    id: "p13",
    name: "Samsung 990 PRO 1TB",
    category: "Stockage",
    price: 249.99,
    image: ""
  },

  {
    id: "p14",
    name: "Samsung 990 PRO 2TB",
    category: "Stockage",
    price: 199.93,
    image: ""
  },


  // ----------------------------------------------------------
  // ALIMENTATIONS
  // ----------------------------------------------------------

  {
    id: "p15",
    name: "Corsair RM1000x",
    category: "Alimentations",
    price: 159.90,
    image: ""
  },

  {
    id: "p16",
    name: "Corsair RM850x",
    category: "Alimentations",
    price: 134.90,
    image: ""
  },


  // ----------------------------------------------------------
  // BOÎTIERS
  // ----------------------------------------------------------

  {
    id: "p17",
    name: "Corsair Frame 5000D",
    category: "Boîtiers",
    price: 159.90,
    image: ""
  },


  // ----------------------------------------------------------
  // REFROIDISSEMENT
  // ----------------------------------------------------------

  {
    id: "p18",
    name: "Arctic Liquid Freezer III Pro 360",
    category: "Refroidissement",
    price: 129.90,
    image: ""
  },


  // ----------------------------------------------------------
  // ÉCRANS
  // ----------------------------------------------------------

  {
    id: "p19",
    name: "Samsung 27 QD-OLED Odyssey G6",
    category: "Écrans",
    price: 399.95,
    image: ""
  },


  // ----------------------------------------------------------
  // STREAMING
  // ----------------------------------------------------------

  {
    id: "p20",
    name: "Elgato Wave Mic Arm Pro",
    category: "Streaming",
    price: 229.90,
    image: ""
  },


  // ----------------------------------------------------------
  // MANETTES
  // ----------------------------------------------------------

  {
    id: "p21",
    name: "DualSense Cosmic Red",
    category: "Manettes",
    price: 74.90,
    image: ""
  },


  // ----------------------------------------------------------
  // TAPIS DE SOURIS
  // ----------------------------------------------------------

  {
    id: "p22",
    name: "Razer Gigantus V2 XXL",
    category: "Tapis de souris",
    price: 21,
    image: ""
  },

  {
    id: "p23",
    name: "Logitech G840",
    category: "Tapis de souris",
    price: 15,
    image: ""
  },


  // ----------------------------------------------------------
  // CHAISES GAMING
  // ----------------------------------------------------------

  {
    id: "p24",
    name: "Chaise Gaming",
    category: "Chaises gaming",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // BUREAUX GAMING
  // ----------------------------------------------------------

  {
    id: "p25",
    name: "Bureau Gaming",
    category: "Bureaux gaming",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // MICROPHONES
  // ----------------------------------------------------------

  {
    id: "p26",
    name: "Microphone Gaming USB",
    category: "Microphones",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // ÉCLAIRAGE RGB
  // ----------------------------------------------------------

  {
    id: "p27",
    name: "Éclairage RGB Gaming",
    category: "Éclairage RGB",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // CARTES GRAPHIQUES
  // ----------------------------------------------------------

  {
    id: "p28",
    name: "GeForce RTX 5090",
    category: "Cartes graphiques",
    price: 0,
    image: ""
  },

  {
    id: "p29",
    name: "Radeon RX 9070 XT",
    category: "Cartes graphiques",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // SMARTPHONES
  // ----------------------------------------------------------

  {
    id: "p30",
    name: "Smartphone Gaming",
    category: "Smartphones",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // IMPRIMANTES 3D
  // ----------------------------------------------------------

  {
    id: "p31",
    name: "Imprimante 3D",
    category: "Imprimantes 3D",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // LOGICIELS & LICENCES
  // ----------------------------------------------------------

  {
    id: "p32",
    name: "Licence Windows",
    category: "Logiciels & licences",
    price: 0,
    image: ""
  },

  {
    id: "p33",
    name: "Clé de jeu vidéo",
    category: "Logiciels & licences",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // ACCESSOIRES COMPOSANTS PC
  // ----------------------------------------------------------

  {
    id: "p34",
    name: "Accessoire composant PC",
    category: "Accessoires composants PC",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // ADAPTATEURS / CÂBLES / CHARGEURS
  // ----------------------------------------------------------

  {
    id: "p35",
    name: "Câble HDMI",
    category: "Adaptateurs / câbles / chargeurs",
    price: 0,
    image: ""
  },

  {
    id: "p36",
    name: "Câble USB-C",
    category: "Adaptateurs / câbles / chargeurs",
    price: 0,
    image: ""
  },

  {
    id: "p37",
    name: "Câble Lightning",
    category: "Adaptateurs / câbles / chargeurs",
    price: 0,
    image: ""
  },

  {
    id: "p38",
    name: "Câble Apple Watch",
    category: "Adaptateurs / câbles / chargeurs",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // CAMÉRAS & WEBCAMS
  // ----------------------------------------------------------

  {
    id: "p39",
    name: "Webcam Gaming",
    category: "Caméras & webcams",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // BARRES LUMINEUSES
  // ----------------------------------------------------------

  {
    id: "p40",
    name: "Barre lumineuse pour écran",
    category: "Barres lumineuses pour écran",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // SUPPORTS / ÉCRANS / TV
  // ----------------------------------------------------------

  {
    id: "p41",
    name: "Support écran",
    category: "Supports écrans / écrans / TV",
    price: 0,
    image: ""
  },

  {
    id: "p42",
    name: "Écran Gaming",
    category: "Supports écrans / écrans / TV",
    price: 0,
    image: ""
  },

  {
    id: "p43",
    name: "TV Gaming",
    category: "Supports écrans / écrans / TV",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // MANETTES & CONSOLES
  // ----------------------------------------------------------

  {
    id: "p44",
    name: "Console Gaming",
    category: "Manettes & consoles",
    price: 0,
    image: ""
  },

  {
    id: "p45",
    name: "Manette Gaming",
    category: "Manettes & consoles",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // COMPOSANTS PC
  // ----------------------------------------------------------

  {
    id: "p46",
    name: "Composant PC Gaming",
    category: "Composants PC",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // PC GAMER PRÉCONSTRUITS
  // ----------------------------------------------------------

  {
    id: "p47",
    name: "PC Gamer préconstruit",
    category: "PC Gamer préconstruits",
    price: 0,
    image: ""
  },


  // ----------------------------------------------------------
  // PC PORTABLES
  // ----------------------------------------------------------

  {
    id: "p48",
    name: "PC portable Gaming",
    category: "PC portables Gaming & Travail",
    price: 0,
    image: ""
  },

  {
    id: "p49",
    name: "PC portable Travail",
    category: "PC portables Gaming & Travail",
    price: 0,
    image: ""
  }

];


// ============================================================
// NOTES AUTOMATIQUES
// ============================================================

products.forEach((product, index) => {

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
  document.getElementById("productModal") ||
  document.getElementById("modal");

const modalContent =
  document.getElementById("modalContent");

const modalClose =
  document.getElementById("modalClose");

const modalTitle =
  document.getElementById("modalTitle");

const toastContainer =
  document.getElementById("toastContainer");

const settingsBtn =
  document.getElementById("settingsBtn");

const accountBtn =
  document.getElementById("accountBtn");

const ordersBtn =
  document.getElementById("ordersBtn");

const adminBtn =
  document.getElementById("adminBtn");

const heroCartBtn =
  document.getElementById("heroCartBtn");


// ============================================================
// ÉTAT
// ============================================================

let selectedCategory = "Tous";
let searchValue = "";
let sortValue = "default";

let cart = [];
let favorites = [];

let currentProduct = null;


// ============================================================
// LOCAL STORAGE
// ============================================================

try {
  cart =
    JSON.parse(
      localStorage.getItem(STORAGE.cart)
    ) || [];
} catch {
  cart = [];
}

try {
  favorites =
    JSON.parse(
      localStorage.getItem(STORAGE.favorites)
    ) || [];
} catch {
  favorites = [];
}


// ============================================================
// UTILITAIRES
// ============================================================

function money(value) {

  const number =
    Number.isFinite(Number(value))
      ? Number(value)
      : 0;

  return number.toLocaleString(
    "fr-FR",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  ) + " €";
}


function escapeHTML(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function getProduct(id) {

  return products.find(
    product => product.id === id
  );
}


function saveCart() {

  localStorage.setItem(
    STORAGE.cart,
    JSON.stringify(cart)
  );
}


function saveFavorites() {

  localStorage.setItem(
    STORAGE.favorites,
    JSON.stringify(favorites)
  );
}


function getCartCount() {

  return cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );
}


function getCartSubtotal() {

  return cart.reduce(
    (total, item) => {

      const product =
        getProduct(item.id);

      if (!product) {
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
// TOAST
// ============================================================

function toast(message) {

  if (!toastContainer) {
    return;
  }

  const element =
    document.createElement("div");

  element.className = "toast";

  element.textContent = message;

  toastContainer.appendChild(element);

  setTimeout(() => {

    element.remove();

  }, 2600);
}


// ============================================================
// CATÉGORIES
// ============================================================

function getCategories() {

  const categories =
    [
      "Tous",
      ...new Set(
        products.map(
          product => product.category
        )
      )
    ];

  return categories;
}


function renderCategories() {

  if (!categoriesEl) {
    return;
  }

  categoriesEl.innerHTML =
    getCategories()
      .map(category => {

        const active =
          selectedCategory === category
            ? "active"
            : "";

        return `
          <button
            class="category-btn ${active}"
            data-category="${escapeHTML(category)}"
          >
            ${escapeHTML(category)}
          </button>
        `;

      })
      .join("");

  categoriesEl
    .querySelectorAll(".category-btn")
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
// FILTRAGE
// ============================================================

function getFilteredProducts() {

  let result =
    [...products];

  if (
    selectedCategory !== "Tous"
  ) {

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

  if (search) {

    result =
      result.filter(product => {

        return (
          product.name
            .toLowerCase()
            .includes(search)
          ||
          product.category
            .toLowerCase()
            .includes(search)
        );

      });

  }

  if (
    sortValue === "priceAsc" ||
    sortValue === "price-low"
  ) {

    result.sort(
      (a, b) =>
        Number(a.price) -
        Number(b.price)
    );

  }

  else if (
    sortValue === "priceDesc" ||
    sortValue === "price-high"
  ) {

    result.sort(
      (a, b) =>
        Number(b.price) -
        Number(a.price)
    );

  }

  else if (
    sortValue === "name"
  ) {

    result.sort(
      (a, b) =>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );

  }

  else if (
    sortValue === "new"
  ) {

    result.reverse();

  }

  return result;
}


// ============================================================
// ÉTOILES
// ============================================================

function getRatingStars(rating) {

  const rounded =
    Math.round(Number(rating));

  return Array.from(
    { length: 5 },
    (_, index) =>
      index < rounded
        ? "★"
        : "☆"
  ).join("");

}


// ============================================================
// IMAGE PRODUIT
// ============================================================

function productImageHTML(product) {

  if (!product.image) {
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
// RENDU DES PRODUITS
// ============================================================

function renderProducts() {

  if (!productsGrid) {
    return;
  }

  const filtered =
    getFilteredProducts();

  if (productCount) {

    productCount.textContent =
      `${filtered.length} produit${
        filtered.length > 1
          ? "s"
          : ""
      }`;

  }

  if (!filtered.length) {

    productsGrid.innerHTML = `
      <div class="empty-products">
        Aucun produit trouvé.
      </div>
    `;

    return;
  }

  productsGrid.innerHTML =
    filtered
      .map(product => {

        const favorite =
          favorites.includes(product.id);

        return `
          <article
            class="product-card"
            data-product-id="${escapeHTML(product.id)}"
          >

            <button
              class="favorite-btn ${
                favorite ? "active" : ""
              }"
              data-favorite="${escapeHTML(product.id)}"
              aria-label="Ajouter aux favoris"
            >
              ${favorite ? "♥" : "♡"}
            </button>

            <div
              class="product-image-wrap"
              data-open-product="${escapeHTML(product.id)}"
            >
              ${productImageHTML(product)}
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
                  ${getRatingStars(product.rating)}
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

      })
      .join("");

  productsGrid
    .querySelectorAll("[data-add-product]")
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
    .querySelectorAll("[data-favorite]")
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
    .querySelectorAll("[data-open-product]")
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


  productsGrid
    .querySelectorAll(".product-info h3")
    .forEach(element => {

      element.addEventListener(
        "click",
        () => {

          const card =
            element.closest(
              ".product-card"
            );

          if (card) {

            openProduct(
              card.dataset.productId
            );

          }

        }
      );

    });

}


// ============================================================
// FAVORIS
// ============================================================

function toggleFavorite(id) {

  if (
    favorites.includes(id)
  ) {

    favorites =
      favorites.filter(
        item => item !== id
      );

    toast("Retiré des favoris");

  }

  else {

    favorites.push(id);

    toast("Ajouté aux favoris ❤️");

  }

  saveFavorites();

  renderProducts();

}


// ============================================================
// PANIER
// ============================================================

function findCartItem(id) {

  return cart.find(
    item => item.id === id
  );

}


function addToCart(id, quantity = 1) {

  const product =
    getProduct(id);

  if (!product) {
    return;
  }

  const existing =
    findCartItem(id);

  if (existing) {

    existing.quantity =
      Number(existing.quantity || 0) +
      Number(quantity || 1);

  }

  else {

    cart.push({
      id,
      quantity:
        Number(quantity || 1)
    });

  }

  saveCart();

  renderCart();

  toast(
    `${product.name} ajouté au panier`
  );

}


function removeFromCart(id) {

  cart =
    cart.filter(
      item => item.id !== id
    );

  saveCart();

  renderCart();

}


function changeCartQuantity(
  id,
  quantity
) {

  const item =
    findCartItem(id);

  if (!item) {
    return;
  }

  const newQuantity =
    Number(quantity);

  if (
    !Number.isFinite(newQuantity) ||
    newQuantity <= 0
  ) {

    removeFromCart(id);

    return;

  }

  item.quantity =
    Math.floor(newQuantity);

  saveCart();

  renderCart();

}


function renderCart() {

  if (cartBadge) {

    cartBadge.textContent =
      getCartCount();

    cartBadge.style.display =
      getCartCount() > 0
        ? ""
        : "none";

  }

  if (!cartItems) {
    return;
  }

  const validCart =
    cart.filter(
      item =>
        getProduct(item.id)
    );

  if (
    validCart.length !==
    cart.length
  ) {

    cart = validCart;

    saveCart();

  }

  if (!cart.length) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        Votre panier est vide.
      </div>
    `;

  }

  else {

    cartItems.innerHTML =
      cart
        .map(item => {

          const product =
            getProduct(item.id);

          if (!product) {
            return "";
          }

          return `
            <div
              class="cart-item"
              data-cart-item="${escapeHTML(product.id)}"
            >

              <div class="cart-item-image">
                ${productImageHTML(product)}
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
                  class="remove-cart"
                  data-remove="${escapeHTML(product.id)}"
                >
                  Supprimer
                </button>

              </div>

            </div>
          `;

        })
        .join("");

  }

  if (cartTotal) {

    cartTotal.textContent =
      money(getCartSubtotal());

  }


  cartItems
    ?.querySelectorAll("[data-minus]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const item =
            findCartItem(
              button.dataset.minus
            );

          if (item) {

            changeCartQuantity(
              item.id,
              item.quantity - 1
            );

          }

        }
      );

    });


  cartItems
    ?.querySelectorAll("[data-plus]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const item =
            findCartItem(
              button.dataset.plus
            );

          if (item) {

            changeCartQuantity(
              item.id,
              item.quantity + 1
            );

          }

        }
      );

    });


  cartItems
    ?.querySelectorAll("[data-remove]")
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
// OUVERTURE PANIER
// ============================================================

function openCart() {

  if (cartOverlay) {

    cartOverlay.classList.add(
      "active"
    );

  }

  if (cartDrawer) {

    cartDrawer.classList.add(
      "active"
    );

  }

  renderCart();

}


function closeCart() {

  if (cartOverlay) {

    cartOverlay.classList.remove(
      "active"
    );

  }

  if (cartDrawer) {

    cartDrawer.classList.remove(
      "active"
    );

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
// MODAL
// ============================================================

function showModal(
  title,
  content
) {

  if (!modal) {
    return;
  }

  if (modalTitle) {

    modalTitle.textContent =
      title;

  }

  if (modalContent) {

    modalContent.innerHTML =
      content;

  }

  modal.classList.add(
    "active"
  );

}


function closeModal() {

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

function openProduct(id) {

  const product =
    getProduct(id);

  if (!product) {
    return;
  }

  currentProduct =
    product;

  showModal(
    product.name,
    `
      <div class="product-modal">

        <div class="product-modal-image">
          ${productImageHTML(product)}
        </div>

        <div class="product-modal-info">

          <div class="product-category">
            ${escapeHTML(product.category)}
          </div>

          <h2>
            ${escapeHTML(product.name)}
          </h2>

          <div class="product-rating">
            ${getRatingStars(product.rating)}
            ${product.rating}/5
            (${product.reviewCount} avis)
          </div>

          <div class="product-modal-price">
            ${money(product.price)}
          </div>

          <button
            class="modal-add-btn"
            id="modalAddProduct"
          >
            Ajouter au panier
          </button>

          <button
            class="modal-favorite-btn"
            id="modalFavoriteProduct"
          >
            ${
              favorites.includes(product.id)
                ? "♥ Retirer des favoris"
                : "♡ Ajouter aux favoris"
            }
          </button>

          <button
            class="modal-reviews-btn"
            id="modalReviewsProduct"
          >
            Voir les avis
          </button>

        </div>

      </div>
    `
  );


  document
    .getElementById("modalAddProduct")
    ?.addEventListener(
      "click",
      () => {

        addToCart(product.id);

      }
    );


  document
    .getElementById("modalFavoriteProduct")
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


  document
    .getElementById("modalReviewsProduct")
    ?.addEventListener(
      "click",
      () => {

        openProductReviews(
          product.id
        );

      }
    );

}


// ============================================================
// AVIS
// ============================================================

function getReviews() {

  try {

    return JSON.parse(
      localStorage.getItem(
        STORAGE.reviews
      )
    ) || {};

  }

  catch {

    return {};

  }

}


function saveReviews(reviews) {

  localStorage.setItem(
    STORAGE.reviews,
    JSON.stringify(reviews)
  );

}


function openProductReviews(id) {

  const product =
    getProduct(id);

  if (!product) {
    return;
  }

  const allReviews =
    getReviews();

  const reviews =
    allReviews[id] || [];

  showModal(
    `Avis - ${product.name}`,
    `
      <div class="reviews-modal">

        <div class="reviews-summary">

          <strong>
            ${product.rating}/5
          </strong>

          <span>
            ${getRatingStars(product.rating)}
          </span>

          <small>
            ${product.reviewCount} avis
          </small>

        </div>

        ${
          reviews.length
            ? reviews.map(review => `
                <div class="review-item">

                  <strong>
                    ${escapeHTML(
                      review.name ||
                      "Client"
                    )}
                  </strong>

                  <div>
                    ${getRatingStars(
                      review.rating || 5
                    )}
                  </div>

                  <p>
                    ${escapeHTML(
                      review.text || ""
                    )}
                  </p>

                </div>
              `).join("")
            : `
              <div class="empty-reviews">
                Aucun nouvel avis local.
              </div>
            `
        }

      </div>
    `
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
// CHECKOUT DÉMO
// ============================================================

function openCheckout() {

  if (!cart.length) {

    toast(
      "Votre panier est vide."
    );

    return;

  }

  showModal(
    "Finaliser la commande",
    `
      <div class="checkout-demo">

        <h3>
          Récapitulatif
        </h3>

        <div class="checkout-summary">

          <span>
            Sous-total
          </span>

          <strong>
            ${money(
              getCartSubtotal()
            )}
          </strong>

        </div>

        <p>
          Paiement de démonstration.
          Aucun paiement réel ne sera effectué.
        </p>

        <button
          id="demoOrderBtn"
          class="free-order"
        >
          Commander gratuitement
        </button>

      </div>
    `
  );


  document
    .getElementById("demoOrderBtn")
    ?.addEventListener(
      "click",
      createDemoOrder
    );

}


checkoutBtn?.addEventListener(
  "click",
  openCheckout
);


// ============================================================
// COMMANDES
// ============================================================

function getOrders() {

  try {

    return JSON.parse(
      localStorage.getItem(
        STORAGE.orders
      )
    ) || [];

  }

  catch {

    return [];

  }

}


function saveOrders(orders) {

  localStorage.setItem(
    STORAGE.orders,
    JSON.stringify(orders)
  );

}


function createDemoOrder() {

  const orders =
    getOrders();

  const order = {

    id:
      "NOVA-" +
      Date.now()
        .toString()
        .slice(-8),

    createdAt:
      new Date().toISOString(),

    status:
      "Commande confirmée",

    truckLocation:
      "Entrepôt NovaShop",

    destination:
      "",

    tracking:
      "En préparation",

    durationSeconds:
      0,

    deliveryDate:
      "",

    total:
      getCartSubtotal(),

    items:
      cart.map(item => {

        const product =
          getProduct(item.id);

        return {

          id: item.id,

          name:
            product?.name || "",

          price:
            product?.price || 0,

          quantity:
            item.quantity

        };

      })

  };


  orders.unshift(
    order
  );

  saveOrders(
    orders
  );


  cart = [];

  saveCart();

  renderCart();

  closeModal();

  toast(
    `Commande ${order.id} créée`
  );

}


// ============================================================
// AFFICHAGE DES COMMANDES
// ============================================================

function openOrders() {

  const orders =
    getOrders();

  if (!orders.length) {

    showModal(
      "Mes commandes",
      `
        <div class="empty-orders">
          Vous n'avez aucune commande.
        </div>
      `
    );

    return;

  }


  showModal(
    "Mes commandes",
    `
      <div class="orders-list">

        ${orders.map(order => `

          <div
            class="order-card"
            data-order="${escapeHTML(order.id)}"
          >

            <strong>
              ${escapeHTML(order.id)}
            </strong>

            <span>
              ${money(order.total)}
            </span>

            <span>
              ${escapeHTML(
                order.status ||
                "Commande"
              )}
            </span>

            <button
              data-track-order="${escapeHTML(
                order.id
              )}"
            >
              Suivre la commande
            </button>

          </div>

        `).join("")}

      </div>
    `
  );


  document
    .querySelectorAll(
      "[data-track-order]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          openOrderTracking(
            button.dataset.trackOrder
          );

        }
      );

    });

}


ordersBtn?.addEventListener(
  "click",
  openOrders
);


// ============================================================
// SUIVI LIVRAISON
// ============================================================

function openOrderTracking(
  orderId
) {

  const orders =
    getOrders();

  const order =
    orders.find(
      item =>
        item.id === orderId
    );

  if (!order) {
    return;
  }

  showModal(
    `Suivi ${order.id}`,
    `
      <div class="tracking-modal">

        <h3>
          ${escapeHTML(
            order.status ||
            "Commande"
          )}
        </h3>

        <div class="tracking-location">
          <strong>
            Localisation du colis
          </strong>

          <span>
            ${escapeHTML(
              order.truckLocation ||
              "Non renseignée"
            )}
          </span>
        </div>

        <div class="tracking-destination">
          <strong>
            Destination
          </strong>

          <span>
            ${escapeHTML(
              order.destination ||
              "Non renseignée"
            )}
          </span>
        </div>

        <div class="tracking-number">
          <strong>
            Suivi
          </strong>

          <span>
            ${escapeHTML(
              order.tracking ||
              "Non renseigné"
            )}
          </span>
        </div>

        <div class="tracking-date">
          <strong>
            Livraison
          </strong>

          <span>
            ${escapeHTML(
              order.deliveryDate ||
              "À définir"
            )}
          </span>
        </div>

      </div>
    `
  );

}


// ============================================================
// COMPTE
// ============================================================

function openAccount() {

  showModal(
    "Mon compte",
    `
      <div class="account-panel">

        <h3>
          Compte NovaShop
        </h3>

        <p>
          Gestion locale du compte.
        </p>

        <button
          id="accountOrdersBtn"
        >
          Mes commandes
        </button>

      </div>
    `
  );


  document
    .getElementById(
      "accountOrdersBtn"
    )
    ?.addEventListener(
      "click",
      openOrders
    );

}


accountBtn?.addEventListener(
  "click",
  openAccount
);


// ============================================================
// PARAMÈTRES
// ============================================================

function openSettings() {

  const dark =
    localStorage.getItem(
      STORAGE.dark
    ) !== "false";

  showModal(
    "Paramètres",
    `
      <div class="settings-panel">

        <label>
          <input
            type="checkbox"
            id="darkModeSetting"
            ${dark ? "checked" : ""}
          >
          Mode sombre
        </label>

        <button
          id="saveSettingsBtn"
        >
          Enregistrer
        </button>

      </div>
    `
  );


  document
    .getElementById(
      "saveSettingsBtn"
    )
    ?.addEventListener(
      "click",
      () => {

        const checkbox =
          document.getElementById(
            "darkModeSetting"
          );

        const enabled =
          checkbox?.checked ?? true;

        localStorage.setItem(
          STORAGE.dark,
          String(enabled)
        );

        document.body.classList.toggle(
          "light-mode",
          !enabled
        );

        closeModal();

        toast(
          "Paramètres enregistrés"
        );

      }
    );

}


settingsBtn?.addEventListener(
  "click",
  openSettings
);


// ============================================================
// ADMIN
// ============================================================

function isAdminUnlocked() {

  return (
    localStorage.getItem(
      STORAGE.admin
    ) === "true"
  );

}


function openAdmin() {

  if (!isAdminUnlocked()) {

    showModal(
      "Administration",
      `
        <form id="adminLoginForm">

          <label>
            E-mail administrateur
          </label>

          <input
            id="adminEmail"
            type="email"
            required
            placeholder="E-mail"
          >

          <label>
            Code administrateur
          </label>

          <input
            id="adminCode"
            type="password"
            required
            placeholder="Code"
          >

          <button
            type="submit"
          >
            Connexion admin
          </button>

        </form>
      `
    );


    document
      .getElementById(
        "adminLoginForm"
      )
      ?.addEventListener(
        "submit",
        event => {

          event.preventDefault();

          const email =
            document.getElementById(
              "adminEmail"
            )?.value.trim();

          const code =
            document.getElementById(
              "adminCode"
            )?.value.trim();

          if (
            email === ADMIN_EMAIL &&
            code === ADMIN_CODE
          ) {

            localStorage.setItem(
              STORAGE.admin,
              "true"
            );

            toast(
              "Administration activée"
            );

            openAdmin();

          }

          else {

            toast(
              "Identifiants administrateur incorrects"
            );

          }

        }
      );

    return;

  }


  renderAdminDashboard();

}


function renderAdminDashboard() {

  const orders =
    getOrders();

  showModal(
    "Dashboard NovaShop",
    `
      <div class="admin-dashboard">

        <h3>
          Administration
        </h3>

        <p>
          ${orders.length}
          commande${
            orders.length > 1
              ? "s"
              : ""
          }
        </p>

        ${
          orders.length
            ? orders.map(order => `

                <div
                  class="admin-order"
                  data-admin-order="${escapeHTML(
                    order.id
                  )}"
                >

                  <strong>
                    ${escapeHTML(order.id)}
                  </strong>

                  <input
                    class="admin-status"
                    value="${escapeHTML(
                      order.status || ""
                    )}"
                    placeholder="Statut"
                  >

                  <input
                    class="admin-location"
                    value="${escapeHTML(
                      order.truckLocation || ""
                    )}"
                    placeholder="Localisation"
                  >

                  <input
                    class="admin-destination"
                    value="${escapeHTML(
                      order.destination || ""
                    )}"
                    placeholder="Destination"
                  >

                  <input
                    class="admin-tracking"
                    value="${escapeHTML(
                      order.tracking || ""
                    )}"
                    placeholder="Suivi"
                  >

                  <input
                    class="admin-date"
                    value="${escapeHTML(
                      order.deliveryDate || ""
                    )}"
                    placeholder="Date de livraison"
                  >

                  <button
                    data-save-order="${escapeHTML(
                      order.id
                    )}"
                  >
                    Enregistrer
                  </button>

                  <button
                    data-delete-order="${escapeHTML(
                      order.id
                    )}"
                  >
                    Supprimer
                  </button>

                </div>

              `).join("")
            : `
              <p>
                Aucune commande.
              </p>
            `
        }

        <button
          id="adminLogoutBtn"
        >
          Déconnexion admin
        </button>

      </div>
    `
  );


  document
    .querySelectorAll(
      "[data-save-order]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          saveAdminOrder(
            button.dataset.saveOrder
          );

        }
      );

    });


  document
    .querySelectorAll(
      "[data-delete-order]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          deleteAdminOrder(
            button.dataset.deleteOrder
          );

        }
      );

    });


  document
    .getElementById(
      "adminLogoutBtn"
    )
    ?.addEventListener(
      "click",
      () => {

        localStorage.removeItem(
          STORAGE.admin
        );

        closeModal();

        toast(
          "Déconnexion admin"
        );

      }
    );

}


// ============================================================
// SAUVEGARDE COMMANDE ADMIN
// ============================================================

function saveAdminOrder(id) {

  const orders =
    getOrders();

  const order =
    orders.find(
      item => item.id === id
    );

  const container =
    document.querySelector(
      `[data-admin-order="${CSS.escape(id)}"]`
    );

  if (!order || !container) {
    return;
  }

  order.status =
    container.querySelector(
      ".admin-status"
    )?.value || "";

  order.truckLocation =
    container.querySelector(
      ".admin-location"
    )?.value || "";

  order.destination =
    container.querySelector(
      ".admin-destination"
    )?.value || "";

  order.tracking =
    container.querySelector(
      ".admin-tracking"
    )?.value || "";

  order.deliveryDate =
    container.querySelector(
      ".admin-date"
    )?.value || "";

  saveOrders(
    orders
  );

  toast(
    "Commande mise à jour"
  );

}


// ============================================================
// SUPPRESSION COMMANDE ADMIN
// ============================================================

function deleteAdminOrder(id) {

  const orders =
    getOrders();

  const filtered =
    orders.filter(
      order =>
        order.id !== id
    );

  saveOrders(
    filtered
  );

  renderAdminDashboard();

  toast(
    "Commande supprimée"
  );

}


// ============================================================
// BOUTON ADMIN
// ============================================================

adminBtn?.addEventListener(
  "click",
  openAdmin
);


// ============================================================
// FERMETURE MODAL AVEC OVERLAY
// ============================================================

modal?.addEventListener(
  "click",
  event => {

    if (
      event.target === modal
    ) {

      closeModal();

    }

  }
);


// ============================================================
// ESCAPE
// ============================================================

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeModal();
      closeCart();

    }

  }
);


// ============================================================
// MODE SOMBRE
// ============================================================

(function loadTheme() {

  const dark =
    localStorage.getItem(
      STORAGE.dark
    ) !== "false";

  document.body.classList.toggle(
    "light-mode",
    !dark
  );

})();


// ============================================================
// INITIALISATION
// ============================================================

function initNovaShop() {

  renderCategories();

  renderProducts();

  renderCart();

}


initNovaShop();


// ============================================================
// DEBUG
// ============================================================

console.log(
  `NovaShop chargé : ${products.length} produits`
);
