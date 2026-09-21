const seedCart=()=>{
  try{
    const x=JSON.parse(localStorage.getItem("novaCart")||"[]");
    return Array.isArray(x)?x:[];
  }catch{
    return[];
  }
};

cart=seedCart();

const saveCart=()=>{
  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );
};

const reviews=p=>{
  const n=parseInt(
    p.id.replace("p",""),
    10
  )||1;

  return{
    rating:Number(
      (4.4+(n%6)*.1).toFixed(1)
    ),
    count:132+(n*173%1604)
  };
};

const stars=r=>
  "★★★★★".slice(
    0,
    Math.round(r)
  )+
  "☆☆☆☆☆".slice(
    0,
    5-Math.round(r)
  );

function getCategories(){
  return[
    "Toutes",
    ...new Set(
      products.map(p=>p.category)
    )
  ];
}

function renderCategories(){
  if(!categoriesEl)return;

  categoriesEl.innerHTML=
    getCategories()
      .map(c=>`
        <button
          class="category-btn ${c===selectedCategory?"active":""}"
          data-category="${esc(c)}"
        >
          ${esc(c)}
        </button>
      `)
      .join("");

  categoriesEl
    .querySelectorAll("[data-category]")
    .forEach(b=>{
      b.onclick=()=>{
        selectedCategory=
          b.dataset.category;

        renderCategories();
        renderProducts();
      };
    });
}

function filtered(){
  const q=
    searchValue
      .trim()
      .toLowerCase();

  return products.filter(p=>
    (
      selectedCategory==="Toutes"||
      p.category===selectedCategory
    )&&(
      !q||
      p.name
        .toLowerCase()
        .includes(q)||
      p.category
        .toLowerCase()
        .includes(q)
    )
  );
}

function card(p){
  const r=reviews(p);

  return`
    <article class="product-card">

      <div class="product-image">
        ${
          p.new
            ? '<span class="new-badge">Nouveau</span>'
            : ''
        }

        <img
          src="${imageSrc(p.image)}"
          data-original="${esc(p.image)}"
          alt="${esc(p.name)}"
          loading="lazy"
          decoding="async"
          referrerpolicy="no-referrer"
          onerror="imageError(this)"
        >
      </div>

      <div class="product-body">

        <div class="product-category">
          ${esc(p.category)}
        </div>

        <div class="product-name">
          ${esc(p.name)}
        </div>

        <div class="rating">

          <span class="stars">
            ${stars(r.rating)}
          </span>

          <span class="rating-score">
            ${r.rating
              .toFixed(1)
              .replace(".",",")}
          </span>

          <span class="rating-count">
            · ${r.count.toLocaleString("fr-FR")} avis
          </span>

        </div>

        <div class="product-bottom">

          <div class="price">
            ${productPrice(p.price)}
          </div>

        </div>

        <div class="product-actions">

          <button
            class="btn btn-secondary btn-small"
            data-view="${p.id}"
          >
            Voir
          </button>

          <button
            class="btn btn-primary btn-small"
            data-add="${p.id}"
          >
            🛒 Ajouter
          </button>

        </div>

      </div>

    </article>
  `;
}

function renderProducts(){
  if(!productsGrid)return;

  const list=filtered();

  if(productCount){
    productCount.textContent=
      `${list.length} produit${
        list.length>1?"s":""
      }`;
  }

  productsGrid.innerHTML=
    list.length
      ? list.map(card).join("")
      : `
        <div class="empty">
          <h3>Aucun produit trouvé</h3>
          <p>
            Essaie une autre recherche ou catégorie.
          </p>
        </div>
      `;

  productsGrid
    .querySelectorAll("[data-view]")
    .forEach(b=>{
      b.onclick=()=>{
        openProduct(
          b.dataset.view
        );
      };
    });

  productsGrid
    .querySelectorAll("[data-add]")
    .forEach(b=>{
      b.onclick=e=>{
        const p=products.find(
          x=>x.id===b.dataset.add
        );

        if(p){
          addToCart(
            p,
            e.currentTarget
          );
        }
      };
    });
}

function openModal(){
  modal?.classList.add("open");
  document.body.style.overflow="hidden";
}

function closeModal(){
  modal?.classList.remove("open");
  document.body.style.overflow="";
}

function openProduct(id){

  const p=products.find(
    x=>x.id===id
  );

  if(!p||!modalContent)return;

  const r=reviews(p);

  modalContent.innerHTML=`
    <div class="product-modal">

      <div class="modal-image">

        <img
          src="${imageSrc(p.image)}"
          data-original="${esc(p.image)}"
          alt="${esc(p.name)}"
          onerror="imageError(this)"
        >

      </div>

      <div class="modal-info">

        <div class="product-category">
          ${esc(p.category)}
        </div>

        <h2>
          ${esc(p.name)}
        </h2>

        <div class="rating">
          <span class="stars">
            ${stars(r.rating)}
          </span>

          <span>
            ${r.rating
              .toFixed(1)
              .replace(".",",")}
          </span>

          <span>
            · ${r.count.toLocaleString("fr-FR")} avis
          </span>
        </div>

        <div class="modal-price">
          ${productPrice(p.price)}
        </div>

        <button
          class="btn btn-primary btn-wide"
          id="modalAdd"
        >
          🛒 Ajouter au panier
        </button>

      </div>

    </div>
  `;

  $("modalAdd").onclick=e=>
    addToCart(
      p,
      e.currentTarget
    );

  openModal();
}

function addToCart(p,button){

  const x=cart.find(
    i=>i.id===p.id
  );

  if(x){
    x.qty++;
  }else{
    cart.push({
      id:p.id,
      qty:1
    });
  }

  saveCart();
  renderCart();

  if(button){
    animateToCart(
      button,
      p.image
    );
  }

  toast(
    "Produit ajouté au panier"
  );
}

function removeFromCart(id){

  cart=cart.filter(
    i=>i.id!==id
  );

  saveCart();
  renderCart();
}

function changeQty(id,d){

  const x=cart.find(
    i=>i.id===id
  );

  if(!x)return;

  x.qty+=d;

  if(x.qty<=0){
    removeFromCart(id);
    return;
  }

  saveCart();
  renderCart();
}

function cartData(){

  return cart
    .map(i=>{
      const p=products.find(
        x=>x.id===i.id
      );

      return p
        ? {...p,qty:i.qty}
        : null;
    })
    .filter(Boolean);
}

function renderCart(){

  if(!cartItems)return;

  const items=cartData();

  const count=items.reduce(
    (s,i)=>s+i.qty,
    0
  );

  if(cartBadge){
    cartBadge.textContent=
      count>99
        ?"99+"
        :count;
  }

  cartItems.innerHTML=
    items.length
      ? items.map(i=>`
          <div class="cart-item">

            <img
              src="${imageSrc(i.image)}"
              data-original="${esc(i.image)}"
              alt=""
              onerror="imageError(this)"
            >

            <div>

              <div class="cart-item-name">
                ${esc(i.name)}
              </div>

              <div class="cart-item-price">
                ${productPrice(i.price)}
              </div>

              <div class="qty">

                <button
                  data-minus="${i.id}"
                >
                  −
                </button>

                <span>
                  ${i.qty}
                </span>

                <button
                  data-plus="${i.id}"
                >
                  +
                </button>

              </div>

            </div>

            <button
              class="remove"
              data-remove="${i.id}"
            >
              Suppr.
            </button>

          </div>
        `).join("")
      : `
        <div class="empty">
          <div class="empty-icon">🛒</div>

          <h3>
            Ton panier est vide
          </h3>

          <p>
            Ajoute un produit pour commencer.
          </p>
        </div>
      `;

  let total=0;

  items.forEach(i=>{
    total+=
      Number(i.price)*
      i.qty;
  });

  if(cartTotal){
    cartTotal.textContent=
      money(total);
  }

  cartItems
    .querySelectorAll("[data-minus]")
    .forEach(b=>{
      b.onclick=()=>{
        changeQty(
          b.dataset.minus,
          -1
        );
      };
    });

  cartItems
    .querySelectorAll("[data-plus]")
    .forEach(b=>{
      b.onclick=()=>{
        changeQty(
          b.dataset.plus,
          1
        );
      };
    });

  cartItems
    .querySelectorAll("[data-remove]")
    .forEach(b=>{
      b.onclick=()=>{
        removeFromCart(
          b.dataset.remove
        );
      };
    });
}

function openCart(){

  overlay?.classList.add("open");
  cartDrawer?.classList.add("open");

  document.body.style.overflow=
    "hidden";
}

function closeCart(){

  overlay?.classList.remove("open");
  cartDrawer?.classList.remove("open");

  document.body.style.overflow="";
}

function animateToCart(button,url){

  if(!button||!cartBtn)return;

  const a=button.getBoundingClientRect();
  const b=cartBtn.getBoundingClientRect();

  const img=document.createElement("img");

  img.src=imageUrl(url);
  img.className="fly";

  img.style.cssText=`
    position:fixed;
    z-index:10000;
    left:${a.left+a.width/2-23}px;
    top:${a.top+a.height/2-23}px;
    width:46px;
    height:46px;
    object-fit:contain;
    transition:all .55s ease;
    pointer-events:none;
  `;

  document.body.appendChild(img);

  requestAnimationFrame(()=>{

    img.style.left=
      `${b.left+b.width/2-13}px`;

    img.style.top=
      `${b.top+b.height/2-13}px`;

    img.style.width="26px";
    img.style.height="26px";
    img.style.opacity="0";

  });

  setTimeout(()=>{
    img.remove();
  },650);
}

function total(){
  return cartData().reduce(
    (s,i)=>
      s+
      Number(i.price)*
      i.qty,
    0
  );
}

function checkout(){

  if(!currentUser){
    return openAccount();
  }

  const items=cartData();

  if(!items.length){
    return toast("Panier vide");
  }

  const t=total();

  modalContent.innerHTML=`
    <div class="panel">

      <h2>
        Finaliser la commande
      </h2>

      <div class="form">

        <input
          id="firstName"
          placeholder="Prénom"
        >

        <input
          id="lastName"
          placeholder="Nom"
        >

        <input
          id="orderAddress"
          placeholder="Adresse"
        >

        <input
          id="orderCity"
          placeholder="Ville"
        >

        <select
          id="paymentMethod"
          class="select"
        >

          <option value="card">
            Carte bancaire
          </option>

          <option value="paypal">
            PayPal
          </option>

        </select>

        <div id="cardFields">

          <input
            id="cardNumber"
            inputmode="numeric"
            autocomplete="off"
            placeholder="Numéro de carte"
          >

          <input
            id="cardHolder"
            autocomplete="off"
            placeholder="Titulaire"
          >

          <div
            style="
              display:grid;
              grid-template-columns:1fr 1fr;
              gap:10px;
            "
          >

            <input
              id="cardExpiry"
              inputmode="numeric"
              autocomplete="off"
              placeholder="MM/AA"
            >

            <input
              id="cardCVV"
              inputmode="numeric"
              autocomplete="off"
              placeholder="CVV"
            >

          </div>

        </div>

        <div
          style="
            font-weight:800;
            font-size:20px;
          "
        >
          Total : ${money(t)}
        </div>

        <button
          class="btn btn-primary btn-wide"
          id="placeOrder"
        >
          Payer / commander
        </button>

      </div>

    </div>
  `;

  const pm=$("paymentMethod");
  const cf=$("cardFields");

  pm.onchange=()=>{
    cf.style.display=
      pm.value==="card"
        ?"grid"
        :"none";
  };

  $("placeOrder").onclick=()=>{
    placeOrder(
      t,
      items,
      pm.value
    );
  };

  openModal();
}

function validAddress(v){
  return v.trim().length>=5;
}

function normCard(v){
  return v.replace(/\s+/g,"");
}

function getTestCard(){

  try{
    return JSON.parse(
      localStorage.getItem(
        "novaTestCard"
      )||"null"
    );
  }catch{
    return null;
  }
}

function createTestCard(){

  const digits=
    Array.from(
      {length:12},
      ()=>Math.floor(
        Math.random()*10
      )
    ).join("");

  return{
    number:"9999"+digits,
    holder:"NOVASHOP CARD",
    expiry:
      String(
        Math.floor(
          Math.random()*12
        )+1
      ).padStart(2,"0")+
      "/"+
      String(
        new Date().getFullYear()+3
      ).slice(-2),

    cvv:String(
      Math.floor(
        100+
        Math.random()*900
      )
    )
  };
}

async function placeOrder(
  t,
  items,
  pm
){

  const first=
    $("firstName")?.value.trim();

  const last=
    $("lastName")?.value.trim();

  const address=
    $("orderAddress")?.value.trim();

  const city=
    $("orderCity")?.value.trim();

  if(
    !first||
    !last||
    !validAddress(address)||
    !city
  ){
    return toast(
      "Remplis correctement le prénom, nom, adresse et ville."
    );
  }

  let paymentStatus=
    t===0
      ?"Payé"
      :"En attente";

  if(
    pm==="card"&&
    t>0
  ){

    const c=getTestCard();

    const ok=
      c&&
      normCard(
        $("cardNumber")?.value||""
      )===
      normCard(c.number)&&

      (
        $("cardHolder")?.value||""
      )
      .trim()
      .toUpperCase()===
      c.holder.toUpperCase()&&

      (
        $("cardExpiry")?.value||""
      )
      .trim()===
      c.expiry&&

      (
        $("cardCVV")?.value||""
      )
      .trim()===
      c.cvv;

    if(!ok){
      return toast(
        "Carte incorrecte."
      );
    }

    paymentStatus="Payé";
  }

  if(
    pm==="paypal"&&
    t>0
  ){
    window.open(
      PAYPAL_URL,
      "_blank"
    );
  }

  try{

    const order={
      firstName:first,
      lastName:last,
      userEmail:currentUser.email,

      items:items.map(
        ({
          id,
          name,
          price,
          qty,
          image,
          category
        })=>({
          id,
          name,
          price,
          qty,
          image,
          category
        })
      ),

      subtotal:t,
      total:t,
      address,
      city,

      status:"Enregistrée",

      paymentMethod:
        pm==="paypal"
          ?"PayPal.Me"
          :"Carte bancaire",

      paymentStatus,

      tracking:"",
      packageCity:city,
      trackingNumber:"",
      deliveryDuration:"",
      estimatedDelivery:"",

      createdAt:
        serverTimestamp()
    };

    await addDoc(
      collection(
        db,
        "orders"
      ),
      order
    );

    cart=[];
    saveCart();
    renderCart();

    closeModal();

    toast(
      "Commande enregistrée"
    );

    openOrders();

  }catch(e){

    toast(
      "Erreur : "+
      e.message
    );
  }
}

function openAccount(){

  if(currentUser){

    modalContent.innerHTML=`
      <div class="panel">

        <h2>
          Mon compte
        </h2>

        <p>
          ${esc(currentUser.email)}
        </p>

        <button
          class="btn btn-danger btn-wide"
          id="logoutBtn"
        >
          Se déconnecter
        </button>

      </div>
    `;

    $("logoutBtn").onclick=
      async()=>{

        await signOut(auth);

        localStorage.removeItem(
          ADMIN_KEY
        );

        closeModal();

        toast(
          "Déconnexion effectuée"
        );
      };

    openModal();
    return;
  }

  let mode="login";

  const draw=()=>{

    modalContent.innerHTML=`
      <div class="panel">

        <h2>
          ${
            mode==="login"
              ?"Connexion"
              :"Créer un compte"
          }
        </h2>

        <div class="form">

          <input
            id="authEmail"
            type="email"
            placeholder="Adresse e-mail"
          >

          <input
            id="authPassword"
            type="password"
            placeholder="Mot de passe"
          >

          <button
            class="btn btn-primary btn-wide"
            id="authSubmit"
          >
            ${
              mode==="login"
                ?"Se connecter"
                :"Créer mon compte"
            }
          </button>

          <button
            class="text-btn"
            id="authSwitch"
          >
            ${
              mode==="login"
                ?"Créer un compte"
                :"J’ai déjà un compte"
            }
          </button>

        </div>

      </div>
    `;

    $("authSwitch").onclick=()=>{
      mode=
        mode==="login"
          ?"signup"
          :"login";

      draw();
    };

    $("authSubmit").onclick=
      async()=>{

        const email=
          $("authEmail")
            .value
            .trim();

        const pass=
          $("authPassword")
            .value;

        if(!email||!pass){
          return toast(
            "Remplis les champs."
          );
        }

        try{

          if(mode==="login"){
            await signInWithEmailAndPassword(
              auth,
              email,
              pass
            );
          }else{
            await createUserWithEmailAndPassword(
              auth,
              email,
              pass
            );
          }

          closeModal();

          toast(
            "Compte connecté"
          );

        }catch(e){

          toast(
            authError(
              e.code
            )
          );
        }
      };
  };

  draw();
  openModal();
}

function authError(code){

  return{

    "auth/invalid-credential":
      "E-mail ou mot de passe incorrect.",

    "auth/email-already-in-use":
      "Cette adresse est déjà utilisée.",

    "auth/weak-password":
      "Le mot de passe est trop faible.",

    "auth/invalid-email":
      "Adresse e-mail invalide.",

    "auth/network-request-failed":
      "Problème de connexion réseau."

  }[code]||
  "Une erreur est survenue.";
}

function formatDate(t){

  if(!t){
    return "Date inconnue";
  }

  try{

    return new Intl.DateTimeFormat(
      "fr-FR",
      {
        dateStyle:"medium",
        timeStyle:"short"
      }
    ).format(
      new Date(
        (t.seconds||0)*1000
      )
    );

  }catch{

    return "Date inconnue";
  }
}

async function loadOrders(){

  if(!currentUser)return[];

  const q=query(
    collection(db,"orders"),
    where(
      "userEmail",
      "==",
      currentUser.email
    )
  );

  const snap=
    await getDocs(q);

  return snap.docs
    .map(d=>({
      id:d.id,
      ...d.data()
    }))
    .sort(
      (a,b)=>
        (b.createdAt?.seconds||0)-
        (a.createdAt?.seconds||0)
    );
}

function statusClass(status){

  const s=
    (status||"")
      .toLowerCase();

  if(s.includes("livr")){
    return "delivered";
  }

  if(s.includes("annul")){
    return "cancelled";
  }

  if(
    s.includes("transport")||
    s.includes("expédi")
  ){
    return "transit";
  }

  if(s.includes("proche")){
    return "nearby";
  }

  return "";
}

async function openOrders(){

  if(!currentUser){
    return openAccount();
  }

  try{

    const orders=
      await loadOrders();

    modalContent.innerHTML=`
      <div class="panel">

        <h2>
          Mes commandes
        </h2>

        ${
          orders.length

          ? orders.map(o=>`

              <div
                class="order nova-order-card"
              >

                <div
                  class="order-top nova-order-head"
                >

                  <div>

                    <strong>
                      #${esc(
                        o.id.slice(0,8)
                      )}
                    </strong>

                    <div
                      class="order-date"
                    >
                      ${formatDate(
                        o.createdAt
                      )}
                    </div>

                  </div>

                  <span
                    class="
                      nova-status
                      ${statusClass(
                        o.status
                      )}
                    "
                  >
                    ${esc(
                      o.status||
                      "Enregistrée"
                    )}
                  </span>

                </div>

                <div
                  class="nova-order-items"
                >

                  ${
                    (o.items||[])
                      .map(i=>`
                        <div
                          class="nova-order-item"
                        >

                          <span>
                            ${esc(i.name)}
                            × ${i.qty}
                          </span>

                          <strong>
                            ${money(
                              Number(i.price)*
                              Number(i.qty)
                            )}
                          </strong>

                        </div>
                      `)
                      .join("")
                  }

                </div>

                <div
                  class="nova-package-box"
                >

                  <div>
                    Total :
                    <strong>
                      ${money(o.total)}
                    </strong>
                  </div>

                  <div>
                    Destination :
                    <strong>
                      ${esc(
                        o.city||
                        o.packageCity||
                        ""
                      )}
                    </strong>
                  </div>

                  <div>
                    Suivi :
                    <strong>
                      ${esc(
                        o.trackingNumber||
                        o.tracking||
                        "Non renseigné"
                      )}
                    </strong>
                  </div>

                  <div>
                    Livraison estimée :
                    <strong>
                      ${esc(
                        o.estimatedDelivery||
                        o.deliveryDuration||
                        "Non renseignée"
                      )}
                    </strong>
                  </div>

                </div>

                <button
                  class="btn btn-secondary btn-wide"
                  data-print="${o.id}"
                >
                  🖨️ Facture
                </button>

              </div>

            `).join("")

          : "<p>Aucune commande.</p>"
        }

      </div>
    `;

    modalContent
      .querySelectorAll("[data-print]")
      .forEach(b=>{
        b.onclick=()=>{
          printOrder(
            b.dataset.print,
            orders
          );
        };
      });

    openModal();

  }catch(e){

    toast(e.message);
  }
}

function isAdmin(){

  return !!currentUser&&
    currentUser.email?.toLowerCase()===
    ADMIN_EMAIL.toLowerCase()&&
    localStorage.getItem(
      ADMIN_KEY
    )==="1";
}

function ensureAdmin(){

  if(
    !currentUser||
    currentUser.email?.toLowerCase()!==
    ADMIN_EMAIL.toLowerCase()
  ){
    return false;
  }

  if(
    localStorage.getItem(
      ADMIN_KEY
    )==="1"
  ){
    return true;
  }

  const code=
    prompt("Code admin");

  if(code===ADMIN_CODE){

    localStorage.setItem(
      ADMIN_KEY,
      "1"
    );

    return true;
  }

  toast(
    "Code admin incorrect"
  );

  return false;
}

async function openAdmin(){

  if(!ensureAdmin())return;

  try{

    const snap=
      await getDocs(
        collection(
          db,
          "orders"
        )
      );

    const orders=
      snap.docs
        .map(d=>({
          id:d.id,
          ...d.data()
        }))
        .sort(
          (a,b)=>
            (b.createdAt?.seconds||0)-
            (a.createdAt?.seconds||0)
        );

    const testCard=
      getTestCard();

    modalContent.innerHTML=`
      <div class="panel">

        <h2>
          NovaShop Admin
        </h2>

        <div class="setting">

          <label>
            Carte de test locale
          </label>

          <small>
            Stockée uniquement dans le navigateur,
            jamais dans Firestore.
          </small>

          ${
            testCard

            ? `
              <div
                style="
                  background:#050505;
                  color:#fff;
                  border-radius:16px;
                  padding:18px;
                  margin-top:10px;
                  border:1px solid #222;
                "
              >

                <div
                  style="
                    font-size:12px;
                    opacity:.8;
                  "
                >
                  NOVASHOP
                </div>

                <div
                  style="
                    margin:28px 0 14px;
                    font-size:22px;
                    letter-spacing:2px;
                  "
                >
                  ${esc(
                    testCard.number
                  )}
                </div>

                <div
                  style="
                    display:flex;
                    justify-content:space-between;
                    gap:10px;
                    font-size:12px;
                  "
                >

                  <b>
                    NOVASHOP CARD
                  </b>

                  <span>
                    ${esc(
                      testCard.expiry
                    )}
                    ·
                    ${esc(
                      testCard.cvv
                    )}
                  </span>

                </div>

              </div>
            `

            : "<p>Aucune carte de test.</p>"
          }

          <button
            class="btn btn-secondary btn-wide"
            id="newTestCard"
          >
            Générer une nouvelle carte
          </button>

        </div>

        <div id="adminOrders">

          ${
            orders.length

            ? orders
                .map(adminOrderHTML)
                .join("")

            : "<p>Aucune commande.</p>"
          }

        </div>

      </div>
    `;

    $("newTestCard").onclick=()=>{
      localStorage.setItem(
        "novaTestCard",
        JSON.stringify(
          createTestCard()
        )
      );

      openAdmin();
    };

    modalContent
      .querySelectorAll(
        "[data-accept-paypal]"
      )
      .forEach(b=>{
        b.onclick=()=>{
          acceptPaypal(
            b.dataset.acceptPaypal
          );
        };
      });

    modalContent
      .querySelectorAll(
        "[data-save-order]"
      )
      .forEach(b=>{
        b.onclick=()=>{
          saveAdminOrder(
            b.dataset.saveOrder
          );
        };
      });

    modalContent
      .querySelectorAll(
        "[data-delete-order]"
      )
      .forEach(b=>{
        b.onclick=()=>{
          deleteOrder(
            b.dataset.deleteOrder
          );
        };
      });

    modalContent
      .querySelectorAll(
        "[data-print-order]"
      )
      .forEach(b=>{
        b.onclick=()=>{
          printOrder(
            b.dataset.printOrder,
            orders
          );
        };
      });

    openModal();

  }catch(e){

    toast(
      "Erreur : "+
      e.message
    );
  }
}

function adminOrderHTML(o){

  const st=
    o.status||
    "Enregistrée";

  return`
    <div
      class="order"
      style="
        margin-top:14px;
        padding:16px;
        border:1px solid rgba(255,255,255,.08);
        border-radius:14px;
      "
    >

      <div class="order-top">

        <div>

          <strong>
            #${esc(
              o.id.slice(0,8)
            )}
          </strong>

          <div>
            ${esc(
              o.firstName||""
            )}
            ${esc(
              o.lastName||""
            )}
          </div>

          <div
            class="order-date"
          >
            ${esc(
              o.userEmail||
              o.email||
              ""
            )}
          </div>

          <div
            class="order-date"
          >
            ${formatDate(
              o.createdAt
            )}
          </div>

        </div>

        <span
          class="
            nova-status
            ${statusClass(st)}
          "
        >
          ${esc(st)}
        </span>

      </div>

      <div
        style="
          margin-top:10px;
        "
      >
        Total :
        <strong>
          ${money(o.total)}
        </strong>
      </div>

      <div
        style="
          margin-top:12px;
          display:grid;
          gap:10px;
        "
      >

        ${
          o.paymentMethod==="PayPal.Me"&&
          o.paymentStatus!=="Payé"

          ? `
            <button
              class="btn btn-primary btn-wide"
              data-accept-paypal="${o.id}"
            >
              ✓ Paiement PayPal reçu
            </button>
          `

          : ""
        }

        <select
          class="select"
          data-status="${o.id}"
        >

          ${
            [
              "Enregistrée",
              "Préparation",
              "Expédiée",
              "En transit",
              "Proche de la destination",
              "Livrée",
              "Annulée"
            ]
            .map(s=>`
              <option
                value="${esc(s)}"
                ${
                  s===st
                    ?"selected"
                    :""
                }
              >
                ${esc(s)}
              </option>
            `)
            .join("")
          }

        </select>

        <input
          class="input"
          data-city="${o.id}"
          placeholder="Ville du colis"
          value="${esc(
            o.packageCity||
            o.city||
            ""
          )}"
        >

        <input
          class="input"
          data-tracking="${o.id}"
          placeholder="Numéro de suivi"
          value="${esc(
            o.trackingNumber||
            o.tracking||
            ""
          )}"
        >

        <input
          class="input"
          data-duration="${o.id}"
          placeholder="Durée estimée avant livraison"
          value="${esc(
            o.deliveryDuration||
            ""
          )}"
        >

        <input
          class="input"
          type="date"
          data-date="${o.id}"
          value="${esc(
            o.estimatedDelivery||
            ""
          )}"
        >

        <button
          class="btn btn-secondary btn-wide"
          data-save-order="${o.id}"
        >
          💾 Enregistrer le suivi
        </button>

        <button
          class="btn btn-secondary btn-wide"
          data-print-order="${o.id}"
        >
          🖨️ Facture
        </button>

        <button
          class="btn btn-danger btn-wide"
          data-delete-order="${o.id}"
        >
          Supprimer la commande
        </button>

      </div>

    </div>
  `;
}

async function acceptPaypal(id){

  if(!isAdmin())return;

  try{

    await updateDoc(
      doc(
        db,
        "orders",
        id
      ),
      {
        paymentStatus:"Payé",
        status:"Acceptée",
        paymentAcceptedAt:
          serverTimestamp()
      }
    );

    toast(
      "Paiement PayPal accepté"
    );

    openAdmin();

  }catch(e){

    toast(
      e.message
    );
  }
}

async function saveAdminOrder(id){

  if(!isAdmin())return;

  const get=sel=>
    document.querySelector(sel);

  try{

    await updateDoc(
      doc(
        db,
        "orders",
        id
      ),
      {
        status:
          get(
            `[data-status="${CSS.escape(id)}"]`
          ).value,

        packageCity:
          get(
            `[data-city="${CSS.escape(id)}"]`
          )?.value.trim()||
          "",

        trackingNumber:
          get(
            `[data-tracking="${CSS.escape(id)}"]`
          )?.value.trim()||
          "",

        deliveryDuration:
          get(
            `[data-duration="${CSS.escape(id)}"]`
          )?.value.trim()||
          "",

        estimatedDelivery:
          get(
            `[data-date="${CSS.escape(id)}"]`
          )?.value||
          "",

        updatedAt:
          serverTimestamp()
      }
    );

    toast(
      "Suivi enregistré"
    );

    openAdmin();

  }catch(e){

    toast(
      e.message
    );
  }
}

async function deleteOrder(id){

  if(!isAdmin())return;

  try{

    await deleteDoc(
      doc(
        db,
        "orders",
        id
      )
    );

    toast(
      "Commande supprimée"
    );

    openAdmin();

  }catch(e){

    toast(
      e.message
    );
  }
}

function printOrder(
  id,
  orders
){

  const o=
    orders.find(
      x=>x.id===id
    );

  if(!o)return;

  const w=
    window.open(
      "",
      "_blank",
      "width=900,height=700"
    );

  if(!w){
    return toast(
      "Autorise les fenêtres popup pour imprimer."
    );
  }

  w.document.write(`
    <!doctype html>

    <html lang="fr">

      <head>

        <meta charset="utf-8">

        <title>
          Facture NovaShop
        </title>

        <style>

          body{
            font-family:Arial,sans-serif;
            padding:40px;
            color:#111;
            background:#fff
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:25px
          }

          th,td{
            padding:12px;
            border-bottom:1px solid #ddd;
            text-align:left
          }

          .box{
            padding:15px;
            border:1px solid #ddd;
            border-radius:10px;
            margin-top:20px
          }

          .total{
            text-align:right;
            font-size:22px;
            font-weight:700;
            margin-top:25px
          }

        </style>

      </head>

      <body>

        <h1>
          NovaShop
        </h1>

        <div class="box">

          <b>Commande :</b>
          #${esc(o.id)}

          <br>

          <b>Client :</b>
          ${esc(o.firstName||"")}
          ${esc(o.lastName||"")}

          <br>

          <b>E-mail :</b>
          ${esc(
            o.userEmail||
            o.email||
            ""
          )}

          <br>

          <b>Date :</b>
          ${formatDate(
            o.createdAt
          )}

          <br>

          <b>Adresse :</b>
          ${esc(
            o.address||
            ""
          )},
          ${esc(
            o.city||
            ""
          )}

        </div>

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

            ${
              (o.items||[])
                .map(i=>`
                  <tr>

                    <td>
                      ${esc(
                        i.name
                      )}
                    </td>

                    <td>
                      ${i.qty}
                    </td>

                    <td>
                      ${money(
                        i.price
                      )}
                    </td>

                    <td>
                      ${money(
                        Number(i.price)*
                        Number(i.qty)
                      )}
                    </td>

                  </tr>
                `)
                .join("")
            }

          </tbody>

        </table>

        <div class="box">

          <b>Paiement :</b>
          ${esc(
            o.paymentMethod||
            ""
          )}

          <br>

          <b>État paiement :</b>
          ${esc(
            o.paymentStatus||
            ""
          )}

          <br>

          <b>Statut :</b>
          ${esc(
            o.status||
            ""
          )}

        </div>

        <div class="total">
          Total :
          ${money(o.total)}
        </div>

        <script>
          window.onload=()=>window.print()
        <\/script>

      </body>

    </html>
  `);

  w.document.close();
}

function openSettings(){

  const theme=
    localStorage.getItem(
      "novaThemeChoice"
    )||"dark";

  const lang=
    localStorage.getItem(
      "novaLanguage"
    )||"fr";

  const anim=
    localStorage.getItem(
      "novaAnimations"
    )!=="false";

  modalContent.innerHTML=`
    <div class="panel">

      <h2>
        Paramètres
      </h2>

      <div class="setting">

        <label>
          Apparence
        </label>

        <select
          id="themeSelect"
          class="select"
        >

          <option
            value="dark"
            ${
              theme==="dark"
                ?"selected"
                :""
            }
          >
            Sombre
          </option>

          <option
            value="light"
            ${
              theme==="light"
                ?"selected"
                :""
            }
          >
            Claire
          </option>

          <option
            value="auto"
            ${
              theme==="auto"
                ?"selected"
                :""
            }
          >
            Automatique
          </option>

        </select>

      </div>

      <div class="setting">

        <label>
          Langue
        </label>

        <select
          id="languageSelect"
          class="select"
        >

          <option
            value="fr"
            ${
              lang==="fr"
                ?"selected"
                :""
            }
          >
            🇫🇷 Français
          </option>

          <option
            value="en"
            ${
              lang==="en"
                ?"selected"
                :""
            }
          >
            🇬🇧 English
          </option>

        </select>

      </div>

      <div class="setting">

        <label>
          Animations
        </label>

        <button
          class="switch ${anim?"on":""}"
          id="animationSwitch"
        >
          <span></span>
        </button>

      </div>

      <div class="setting">

        <small>
          NovaShop contient actuellement
          ${products.length} produits.
        </small>

      </div>

    </div>
  `;

  $("themeSelect").onchange=e=>{

    localStorage.setItem(
      "novaThemeChoice",
      e.target.value
    );

    applyTheme();
  };

  $("languageSelect").onchange=e=>{

    localStorage.setItem(
      "novaLanguage",
      e.target.value
    );

    applyLanguage(
      e.target.value
    );
  };

  $("animationSwitch").onclick=()=>{

    const x=
      localStorage.getItem(
        "novaAnimations"
      )!=="false";

    localStorage.setItem(
      "novaAnimations",
      String(!x)
    );

    $("animationSwitch")
      .classList.toggle(
        "on",
        !x
      );
  };

  openModal();
}

function applyTheme(){

  const c=
    localStorage.getItem(
      "novaThemeChoice"
    )||"dark";

  document.body.classList.toggle(
    "light",
    c==="light"||
    (
      c==="auto"&&
      matchMedia(
        "(prefers-color-scheme:light)"
      ).matches
    )
  );
}

function applyLanguage(language){

  if(searchInput){

    searchInput.placeholder=
      language==="en"
        ?"Search for a product..."
        :"Rechercher un produit...";
  }
}

onAuthStateChanged(
  auth,
  user=>{
    currentUser=user;

    const ok=
      user?.email?.toLowerCase()===
      ADMIN_EMAIL.toLowerCase();

    if(adminBtn){
      adminBtn.style.display=
        ok
          ?"grid"
          :"none";
    }

    if(!ok){
      localStorage.removeItem(
        ADMIN_KEY
      );
    }
  }
);

if(modalClose){
  modalClose.onclick=
    closeModal;
}

if(modal){

  modal.addEventListener(
    "click",
    e=>{
      if(e.target===modal){
        closeModal();
      }
    }
  );
}

if(cartBtn){
  cartBtn.onclick=
    openCart;
}

if(cartClose){
  cartClose.onclick=
    closeCart;
}

if(overlay){
  overlay.onclick=
    closeCart;
}

if(checkoutBtn){
  checkoutBtn.onclick=
    checkout;
}

if(accountBtn){
  accountBtn.onclick=
    openAccount;
}

if(ordersBtn){
  ordersBtn.onclick=
    openOrders;
}

if(settingsBtn){
  settingsBtn.onclick=
    openSettings;
}

if(adminBtn){
  adminBtn.onclick=
    openAdmin;
}

if(searchInput){

  searchInput.addEventListener(
    "input",
    e=>{
      searchValue=
        e.target.value;

      renderProducts();
    }
  );
}

document.addEventListener(
  "keydown",
  e=>{
    if(e.key==="Escape"){
      closeModal();
      closeCart();
    }
  }
);

const responsiveStyle=
  document.createElement(
    "style"
  );

responsiveStyle.textContent=`

  .nova-order-card{
    overflow:hidden
  }

  .nova-order-head{
    gap:12px;
    align-items:flex-start
  }

  .nova-status{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    padding:7px 10px;
    border-radius:999px;
    font-size:12px;
    font-weight:800;
    background:rgba(255,255,255,.08)
  }

  .nova-status.delivered{
    background:rgba(34,197,94,.15);
    color:#4ade80
  }

  .nova-status.cancelled{
    background:rgba(239,68,68,.15);
    color:#f87171
  }

  .nova-status.transit{
    background:rgba(59,130,246,.15);
    color:#60a5fa
  }

  .nova-status.nearby{
    background:rgba(168,85,247,.15);
    color:#c084fc
  }

  @media(max-width:600px){

    .nova-order-head{
      flex-direction:column
    }

    .nova-status{
      width:100%
    }

  }

`;

document.head.appendChild(
  responsiveStyle
);

applyTheme();

applyLanguage(
  localStorage.getItem(
    "novaLanguage"
  )||"fr"
);

renderCategories();
renderProducts();
renderCart();

window.NovaShop={
  products,
  openCart,
  closeCart,
  openProduct,
  renderProducts,
  renderCart,
  showToast:toast,

  state:()=>({
    products:products.length,
    cart:cartData(),
    category:selectedCategory,
    search:searchValue,
    user:
      currentUser?.email||
      null
  })
};

console.log(
  `NovaShop chargé : ${products.length} produits`
);// ============================================================
// NOVASHOP - APP.JS
// PARTIE 2 / 2 - FINALE
// Interface + produits + panier + favoris + recherche
// ============================================================


// ============================================================
// ÉLÉMENTS DOM
// ============================================================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];


// ============================================================
// TOAST
// ============================================================

function showToast(message, type = "success") {

  let toast = document.querySelector(".nova-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "nova-toast";

    toast.style.cssText = `
      position:fixed;
      right:20px;
      bottom:20px;
      z-index:99999;
      padding:14px 18px;
      border-radius:12px;
      background:#0d1728;
      color:#fff;
      border:1px solid rgba(255,255,255,.1);
      box-shadow:0 15px 40px rgba(0,0,0,.45);
      font-family:Arial,sans-serif;
      font-size:14px;
      opacity:0;
      transform:translateY(15px);
      transition:.25s ease;
      pointer-events:none;
    `;

    document.body.appendChild(toast);
  }

  toast.textContent = message;

  toast.style.borderColor =
    type === "error"
      ? "rgba(255,70,70,.5)"
      : "rgba(37,214,149,.35)";

  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";

  clearTimeout(toast._timer);

  toast._timer = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(15px)";
  }, 2600);
}


// ============================================================
// PRODUITS FILTRÉS
// ============================================================

function getFilteredProducts() {

  let result = [...products];

  const search = state.search
    .trim()
    .toLowerCase();

  if (search) {
    result = result.filter(product => {

      const name = product.name.toLowerCase();
      const category = product.category.toLowerCase();

      return (
        name.includes(search) ||
        category.includes(search)
      );
    });
  }

  if (
    state.category &&
    state.category !== "Tous"
  ) {
    result = result.filter(
      product => product.category === state.category
    );
  }

  if (
    state.brand &&
    state.brand !== "Toutes"
  ) {
    result = result.filter(product =>
      product.name
        .toLowerCase()
        .includes(
          state.brand.toLowerCase()
        )
    );
  }

  switch (state.sort) {

    case "price-asc":
      result.sort(
        (a, b) => a.price - b.price
      );
      break;

    case "price-desc":
      result.sort(
        (a, b) => b.price - a.price
      );
      break;

    case "name":
      result.sort(
        (a, b) =>
          a.name.localeCompare(
            b.name,
            "fr"
          )
      );
      break;

    default:
      break;
  }

  return result;
}


// ============================================================
// PRODUIT DANS LE PANIER
// ============================================================

function getCartQuantity(productId) {

  const item = state.cart.find(
    item => item.id === productId
  );

  return item
    ? Number(item.quantity || 0)
    : 0;
}


// ============================================================
// AJOUT PANIER
// ============================================================

function addToCart(productId) {

  const product =
    NovaShopCatalog.getById(productId);

  if (!product) return;

  if (!product.price || product.price <= 0) {
    showToast(
      "Prix du produit non disponible.",
      "error"
    );
    return;
  }

  const existing =
    state.cart.find(
      item => item.id === productId
    );

  if (existing) {
    existing.quantity =
      Number(existing.quantity || 0) + 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();

  renderProducts();
  renderCart();

  showToast(
    `${product.name} ajouté au panier`
  );
}


// ============================================================
// RETIRER DU PANIER
// ============================================================

function removeFromCart(productId) {

  state.cart =
    state.cart.filter(
      item => item.id !== productId
    );

  saveCart();

  renderProducts();
  renderCart();
}


// ============================================================
// MODIFIER QUANTITÉ
// ============================================================

function changeCartQuantity(
  productId,
  amount
) {

  const item =
    state.cart.find(
      item => item.id === productId
    );

  if (!item) return;

  item.quantity =
    Number(item.quantity || 0) + amount;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();

  renderProducts();
  renderCart();
}


// ============================================================
// FAVORIS
// ============================================================

function toggleFavorite(productId) {

  const index =
    state.favorites.indexOf(productId);

  if (index >= 0) {

    state.favorites.splice(index, 1);

    showToast(
      "Retiré des favoris"
    );

  } else {

    state.favorites.push(productId);

    showToast(
      "Ajouté aux favoris"
    );
  }

  saveFavorites();

  renderProducts();
}


// ============================================================
// TOTAL PANIER
// ============================================================

function getCartSubtotal() {

  return state.cart.reduce(
    (total, item) => {

      return total +
        Number(item.price || 0) *
        Number(item.quantity || 0);

    },
    0
  );
}


// ============================================================
// NOMBRE D'ARTICLES
// ============================================================

function getCartCount() {

  return state.cart.reduce(
    (total, item) =>
      total +
      Number(item.quantity || 0),
    0
  );
}


// ============================================================
// RENDU DES PRODUITS
// ============================================================

function renderProducts() {

  const container =
    document.querySelector(
      "#productsGrid"
    ) ||
    document.querySelector(
      ".products-grid"
    ) ||
    document.querySelector(
      ".products"
    );

  if (!container) return;

  const filtered =
    getFilteredProducts();

  const start =
    (state.page - 1) *
    state.perPage;

  const visible =
    filtered.slice(
      start,
      start + state.perPage
    );

  if (!visible.length) {

    container.innerHTML = `
      <div style="
        grid-column:1/-1;
        padding:50px 20px;
        text-align:center;
        color:#9aa8bd;
      ">
        <div style="
          font-size:42px;
          margin-bottom:12px;
        ">🔎</div>

        <strong style="
          color:white;
          font-size:18px;
        ">
          Aucun produit trouvé
        </strong>

        <p style="
          margin-top:8px;
        ">
          Essaie une autre recherche ou catégorie.
        </p>
      </div>
    `;

    updateCartCounters();
    return;
  }

  container.innerHTML =
    visible.map(product => {

      const favorite =
        state.favorites.includes(
          product.id
        );

      const quantity =
        getCartQuantity(
          product.id
        );

      return `
        <article
          class="product-card"
          data-product-id="${escapeHTML(product.id)}"
          style="
            position:relative;
            overflow:hidden;
          "
        >

          <button
            class="favorite-btn"
            data-favorite="${escapeHTML(product.id)}"
            aria-label="Favoris"
            style="
              position:absolute;
              top:10px;
              right:10px;
              z-index:5;
              width:34px;
              height:34px;
              border:0;
              border-radius:10px;
              cursor:pointer;
              background:rgba(5,9,18,.85);
              color:${favorite ? "#ff4d6d" : "#fff"};
              font-size:18px;
            "
          >
            ${favorite ? "♥" : "♡"}
          </button>

          <div
            class="product-image"
            style="
              height:125px;
              width:100%;
              display:flex;
              align-items:center;
              justify-content:center;
              overflow:hidden;
              padding:12px;
            "
          >

            <img
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              style="
                width:100%;
                height:100%;
                object-fit:contain;
                display:block;
              "
              onerror="
                this.style.display='none';
              "
            >

          </div>

          <div
            class="product-info"
            style="
              padding:12px;
            "
          >

            <div
              style="
                color:#7f8da3;
                font-size:11px;
                margin-bottom:6px;
              "
            >
              ${escapeHTML(product.category)}
            </div>

            <h3
              style="
                color:#fff;
                font-size:14px;
                line-height:1.35;
                min-height:38px;
                margin:0 0 10px;
              "
            >
              ${escapeHTML(product.name)}
            </h3>

            <div
              style="
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:8px;
              "
            >

              <strong
                style="
                  color:#fff;
                  font-size:17px;
                "
              >
                ${
                  product.price > 0
                    ? formatPrice(product.price)
                    : "Prix à venir"
                }
              </strong>

              <button
                class="add-cart-btn"
                data-add-cart="${escapeHTML(product.id)}"
                style="
                  border:0;
                  border-radius:9px;
                  padding:9px 12px;
                  cursor:pointer;
                  background:#2d8cff;
                  color:white;
                  font-weight:700;
                  font-size:12px;
                "
              >
                ${
                  quantity > 0
                    ? `+ Ajouter (${quantity})`
                    : "Ajouter"
                }
              </button>

            </div>

          </div>

        </article>
      `;

    }).join("");

  updateCartCounters();
  renderPagination(filtered.length);
}


// ============================================================
// PAGINATION
// ============================================================

function renderPagination(total) {

  const container =
    document.querySelector(
      "#pagination"
    ) ||
    document.querySelector(
      ".pagination"
    );

  if (!container) return;

  const pages =
    Math.max(
      1,
      Math.ceil(
        total / state.perPage
      )
    );

  if (pages <= 1) {

    container.innerHTML = "";
    return;
  }

  let html = "";

  for (
    let page = 1;
    page <= pages;
    page++
  ) {

    html += `
      <button
        data-page="${page}"
        style="
          min-width:36px;
          height:36px;
          margin:3px;
          border:0;
          border-radius:9px;
          cursor:pointer;
          background:${
            page === state.page
              ? "#2d8cff"
              : "#111c2d"
          };
          color:white;
        "
      >
        ${page}
      </button>
    `;
  }

  container.innerHTML = html;
}


// ============================================================
// PANIER
// ============================================================

function renderCart() {

  const container =
    document.querySelector(
      "#cartItems"
    ) ||
    document.querySelector(
      ".cart-items"
    );

  if (!container) {
    updateCartCounters();
    return;
  }

  if (!state.cart.length) {

    container.innerHTML = `
      <div style="
        text-align:center;
        padding:35px 15px;
        color:#8d9bb0;
      ">
        <div style="
          font-size:42px;
          margin-bottom:10px;
        ">
          🛒
        </div>

        <strong style="
          display:block;
          color:#fff;
          margin-bottom:6px;
        ">
          Ton panier est vide
        </strong>

        <span>
          Ajoute des produits pour commencer.
        </span>
      </div>
    `;

  } else {

    container.innerHTML =
      state.cart.map(item => {

        return `
          <div
            class="cart-item"
            style="
              display:flex;
              gap:10px;
              padding:12px 0;
              border-bottom:1px solid rgba(255,255,255,.07);
            "
          >

            <img
              src="${escapeHTML(item.image)}"
              alt=""
              style="
                width:65px;
                height:65px;
                object-fit:contain;
                border-radius:9px;
                background:#09111f;
              "
              onerror="
                this.style.display='none';
              "
            >

            <div
              style="
                flex:1;
                min-width:0;
              "
            >

              <div style="
                color:#fff;
                font-size:13px;
                font-weight:700;
                line-height:1.3;
              ">
                ${escapeHTML(item.name)}
              </div>

              <div style="
                color:#2d8cff;
                font-weight:700;
                margin-top:5px;
              ">
                ${formatPrice(item.price)}
              </div>

              <div style="
                display:flex;
                align-items:center;
                gap:7px;
                margin-top:8px;
              ">

                <button
                  data-cart-minus="${escapeHTML(item.id)}"
                  style="
                    width:28px;
                    height:28px;
                    border:0;
                    border-radius:7px;
                    cursor:pointer;
                  "
                >
                  −
                </button>

                <span style="
                  color:#fff;
                  min-width:20px;
                  text-align:center;
                ">
                  ${item.quantity}
                </span>

                <button
                  data-cart-plus="${escapeHTML(item.id)}"
                  style="
                    width:28px;
                    height:28px;
                    border:0;
                    border-radius:7px;
                    cursor:pointer;
                  "
                >
                  +
                </button>

                <button
                  data-cart-remove="${escapeHTML(item.id)}"
                  style="
                    margin-left:auto;
                    border:0;
                    background:none;
                    color:#ff667d;
                    cursor:pointer;
                  "
                >
                  Supprimer
                </button>

              </div>

            </div>

          </div>
        `;

      }).join("");
  }

  updateCartTotals();
  updateCartCounters();
}


// ============================================================
// TOTALS DU PANIER
// ============================================================

function updateCartTotals() {

  const subtotal =
    getCartSubtotal();

  const elements = [
    "#cartSubtotal",
    "#checkoutSubtotal"
  ];

  elements.forEach(selector => {

    const element =
      document.querySelector(selector);

    if (element) {
      element.textContent =
        formatPrice(subtotal);
    }
  });

  const totalElements = [
    "#cartTotal",
    "#checkoutTotal"
  ];

  totalElements.forEach(selector => {

    const element =
      document.querySelector(selector);

    if (element) {
      element.textContent =
        formatPrice(subtotal);
    }
  });

  const discount =
    document.querySelector(
      "#checkoutDiscount"
    );

  if (discount) {
    discount.textContent =
      formatPrice(0);
  }
}


// ============================================================
// COMPTEURS PANIER
// ============================================================

function updateCartCounters() {

  const count =
    getCartCount();

  document
    .querySelectorAll(
      "[data-cart-count], #cartCount, .cart-count"
    )
    .forEach(element => {

      element.textContent = count;

      element.style.display =
        count > 0
          ? ""
          : "none";
    });
}


// ============================================================
// CATÉGORIES
// ============================================================

function renderCategories() {

  const containers = [
    document.querySelector("#categories"),
    document.querySelector(".categories"),
    document.querySelector("[data-categories]")
  ];

  const container =
    containers.find(Boolean);

  if (!container) return;

  const categories =
    NovaShopCatalog.getCategories();

  container.innerHTML = `
    <button
      data-category="Tous"
      class="${
        state.category === "Tous"
          ? "active"
          : ""
      }"
    >
      Tous
    </button>

    ${
      categories.map(category => `
        <button
          data-category="${escapeHTML(category)}"
          class="${
            state.category === category
              ? "active"
              : ""
          }"
        >
          ${escapeHTML(category)}
        </button>
      `).join("")
    }
  `;
}


// ============================================================
// RECHERCHE
// ============================================================

function setupSearch() {

  const searchInputs =
    document.querySelectorAll(
      "#searchInput, .search-input, [data-search]"
    );

  searchInputs.forEach(input => {

    input.addEventListener(
      "input",
      event => {

        state.search =
          event.target.value;

        state.page = 1;

        renderProducts();
      }
    );
  });
}


// ============================================================
// TRI
// ============================================================

function setupSort() {

  const sortInputs =
    document.querySelectorAll(
      "#sortSelect, .sort-select, [data-sort]"
    );

  sortInputs.forEach(select => {

    select.addEventListener(
      "change",
      event => {

        state.sort =
          event.target.value;

        state.page = 1;

        renderProducts();
      }
    );
  });
}


// ============================================================
// CLICS PRODUITS / PANIER / FAVORIS
// ============================================================

document.addEventListener(
  "click",
  event => {

    const addButton =
      event.target.closest(
        "[data-add-cart]"
      );

    if (addButton) {

      addToCart(
        addButton.dataset.addCart
      );

      return;
    }

    const favoriteButton =
      event.target.closest(
        "[data-favorite]"
      );

    if (favoriteButton) {

      toggleFavorite(
        favoriteButton.dataset.favorite
      );

      return;
    }

    const plusButton =
      event.target.closest(
        "[data-cart-plus]"
      );

    if (plusButton) {

      changeCartQuantity(
        plusButton.dataset.cartPlus,
        1
      );

      return;
    }

    const minusButton =
      event.target.closest(
        "[data-cart-minus]"
      );

    if (minusButton) {

      changeCartQuantity(
        minusButton.dataset.cartMinus,
        -1
      );

      return;
    }

    const removeButton =
      event.target.closest(
        "[data-cart-remove]"
      );

    if (removeButton) {

      removeFromCart(
        removeButton.dataset.cartRemove
      );

      return;
    }

    const pageButton =
      event.target.closest(
        "[data-page]"
      );

    if (pageButton) {

      state.page =
        Number(
          pageButton.dataset.page
        );

      renderProducts();

      window.scrollTo({
        top:0,
        behavior:"smooth"
      });

      return;
    }

    const categoryButton =
      event.target.closest(
        "[data-category]"
      );

    if (categoryButton) {

      state.category =
        categoryButton.dataset.category;

      state.page = 1;

      renderCategories();
      renderProducts();

      return;
    }
  }
);


// ============================================================
// OUVERTURE / FERMETURE PANIER
// ============================================================

function openCart() {

  const cart =
    document.querySelector(
      "#cartDrawer"
    ) ||
    document.querySelector(
      ".cart-drawer"
    );

  if (!cart) return;

  cart.classList.add("open");

  cart.style.display =
    "block";

  renderCart();
}


function closeCart() {

  const cart =
    document.querySelector(
      "#cartDrawer"
    ) ||
    document.querySelector(
      ".cart-drawer"
    );

  if (!cart) return;

  cart.classList.remove("open");
}


// ============================================================
// BOUTONS PANIER
// ============================================================

document.addEventListener(
  "click",
  event => {

    if (
      event.target.closest(
        "#openCart, [data-open-cart], .open-cart"
      )
    ) {
      openCart();
    }

    if (
      event.target.closest(
        "#closeCart, [data-close-cart], .close-cart"
      )
    ) {
      closeCart();
    }
  }
);


// ============================================================
// AUTHENTIFICATION GOOGLE
// ============================================================

async function loginWithGoogle() {

  try {

    await signInWithPopup(
      auth,
      googleProvider
    );

    showToast(
      "Connexion réussie"
    );

  } catch (error) {

    console.error(error);

    showToast(
      "Connexion impossible",
      "error"
    );
  }
}


async function logoutUser() {

  try {

    await signOut(auth);

    showToast(
      "Déconnexion réussie"
    );

  } catch (error) {

    console.error(error);

    showToast(
      "Erreur de déconnexion",
      "error"
    );
  }
}


// ============================================================
// ÉTAT UTILISATEUR FIREBASE
// ============================================================

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;

    window.NovaShopUser =
      currentUser;

    document
      .querySelectorAll(
        "[data-user-email], #userEmail"
      )
      .forEach(element => {

        element.textContent =
          user?.email ||
          "Non connecté";
      });

    document
      .querySelectorAll(
        "[data-login]"
      )
      .forEach(button => {

        button.style.display =
          user
            ? "none"
            : "";
      });

    document
      .querySelectorAll(
        "[data-logout]"
      )
      .forEach(button => {

        button.style.display =
          user
            ? ""
            : "none";
      });
  }
);


// ============================================================
// ÉVÉNEMENTS LOGIN / LOGOUT
// ============================================================

document.addEventListener(
  "click",
  event => {

    if (
      event.target.closest(
        "[data-login]"
      )
    ) {
      loginWithGoogle();
    }

    if (
      event.target.closest(
        "[data-logout]"
      )
    ) {
      logoutUser();
    }
  }
);


// ============================================================
// INITIALISATION
// ============================================================

function initNovaShop() {

  renderCategories();

  renderProducts();

  renderCart();

  setupSearch();

  setupSort();

  updateCartCounters();

  updateCartTotals();

  console.log(
    `NovaShop chargé : ${products.length} produits`
  );
}


// ============================================================
// DÉMARRAGE
// ============================================================

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initNovaShop
  );

} else {

  initNovaShop();
}


// ============================================================
// API GLOBALE NOVASHOP
// ============================================================

window.NovaShop = {

  products,

  state,

  addToCart,

  removeFromCart,

  changeCartQuantity,

  toggleFavorite,

  getCartCount,

  getCartSubtotal,

  renderProducts,

  renderCart,

  formatPrice,

  openCart,

  closeCart,

  loginWithGoogle,

  logoutUser
};


// ============================================================
// FIN APP.JS
// ============================================================
