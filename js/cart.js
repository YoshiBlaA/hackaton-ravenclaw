/**
 * Elementos del resumen del carrito y la lógica de almacenamiento local.
 * @type {HTMLElement|null}
 */
const totalProducts = document.querySelector("#total-products");
/** @type {HTMLElement|null} */
const subtotalPrice = document.querySelector("#subtotal-number");
/** @type {HTMLElement|null} */
const shippingPrice = document.querySelector("#shipping-number");
/** @type {HTMLElement|null} */
const totalPrice = document.querySelector("#total-number");
/** @type {object|undefined} */
const cartStorage = window.RavenclawCart;
/** @constant {number} */
const SHIPPING_COST = 0;

const catalog = [
  {
    id: 1,
    name: "Taza RavenClaw",
    price: 300.00,
    image: "./assets/taza.jpeg"
  },
  {
    id: 2,
    name: "Uniforme RavenClaw",
    price: 400.00,
    image: "./assets/uniformeRavenclaw.jpg"
  },
  {
    id: 3,
    name: "Puff",
    price: 600.00,
    image: "./assets/puf.webp"
  }
];

/**
 * Productos actualmente cargados en el carrito.
 * @type {Array<{id:number, name:string, price:number, image:string, quantity:number, source?:string}>}
 */
let cartProducts = [];

/**
 * Sincroniza los productos del carrito con el almacenamiento y vuelve a renderizar la vista.
 * @returns {void}
 */
function syncAndRenderCart() {
    syncCartProducts();
    renderCartItems();
}

/**
 * Configura los listeners para reaccionar a cambios del almacenamiento y a la reactivación de la pestaña.
 * @returns {void}
 */
function setupCartWatchers() {
    if (!cartStorage) return;

    window.addEventListener('storage', (event) => {
        if (event.key === cartStorage.STORAGE_KEY) {
            syncAndRenderCart();
        }
    });

    // Refresh when the tab becomes active again.
    window.addEventListener('focus', syncAndRenderCart);
    window.addEventListener('pageshow', syncAndRenderCart);
}

/**
 * Formatea un valor monetario al formato mexicano.
 * @param {number|string} value - Valor a convertir.
 * @returns {string} Valor formateado con dos decimales.
 */
function formatPrice(value) {
    return Number(value || 0).toLocaleString('es-MX', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

/**
 * Obtiene los productos actuales del carrito desde el almacenamiento.
 * @returns {void}
 */
function syncCartProducts() {
    cartProducts = cartStorage ? cartStorage.getItems() : [];
}

/**
 * Actualiza los datos del resumen del carrito: cantidad total, subtotal y costo de envío.
 * @returns {void}
 */
function renderSummary() {
    const totalQuantity = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = totalQuantity > 0 ? SHIPPING_COST : 0;

    totalProducts.textContent = totalQuantity;
    subtotalPrice.textContent = formatPrice(subtotal);
    shippingPrice.textContent = formatPrice(shipping);
    totalPrice.textContent = formatPrice(subtotal + shipping);
}

/**
 * Renderiza las tarjetas del catálogo disponible para agregar productos al carrito.
 * @returns {void}
 */
function renderCatalog() {
    const catalogContainer = document.getElementById("catalog-list");
    catalogContainer.innerHTML = "";

    catalog.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("catalog-card");
        card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h3 class="catalog-card-title">${product.name}</h3>
        <p class="catalog-card-price">$ ${product.price.toFixed(2)}</p>
      </div>
      <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
        Agregar al carrito
      </button>
    `;
        catalogContainer.appendChild(card);
    });
}

/**
 * Agrega un producto del catálogo al carrito.
 * @param {number} productId - Identificador del producto a agregar.
 * @returns {void}
 */
function addToCart(productId) {
    const productToBuy = catalog.find(item => item.id === productId);
    if (!productToBuy) return;

    if (cartStorage) {
        cartStorage.addItem({
            ...productToBuy,
            source: 'catalog'
        });
        syncCartProducts();
    }

    renderCartItems();
}

/**
 * Renderiza los productos actuales del carrito con su cantidad, precio unitario y total.
 * @returns {void}
 */
function renderCartItems() {
    syncCartProducts();

    const container = document.getElementById("cart-items-list");
    container.innerHTML = "";

    if (cartProducts.length === 0) {
        container.innerHTML = '<p class="empty-cart-msg">Carrito vacio.</p>';
        renderSummary();
        return;
    }

    cartProducts.forEach(product => {
        const itemTotal = formatPrice(product.price * product.quantity);

        const itemHTML = document.createElement("div");
        itemHTML.classList.add("cart-item");
        itemHTML.innerHTML = `
      <div class="item-image">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="item-details">
        <h2 class="item-name">${product.name}</h2>
        <span class="item-unit-price">$ ${formatPrice(product.price)}/cu</span>

        <div class="quantity-wrapper">
          <span class="quantity-label">Cantidad</span>
          <div class="quantity-control">
            <button class="qty-btn js-qty-decrease">—</button>
            <span class="qty-number">${product.quantity}</span>
            <button class="qty-btn js-qty-increase">+</button>
          </div>
        </div>

        <div class="item-actions">
          <button class="action-btn js-remove-product" aria-label="Delete item">
            <svg viewBox="0 0 24 24">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
          <button class="action-btn" aria-label="Add to wishlist">
            <svg viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="item-total-price">
        $ ${itemTotal}
      </div>
    `;

        const decreaseButton = itemHTML.querySelector('.js-qty-decrease');
        const increaseButton = itemHTML.querySelector('.js-qty-increase');
        const removeButton = itemHTML.querySelector('.js-remove-product');

        decreaseButton.addEventListener('click', () => changeQuantity(product.id, -1));
        increaseButton.addEventListener('click', () => changeQuantity(product.id, 1));
        removeButton.addEventListener('click', () => removeProduct(product.id));

        container.appendChild(itemHTML);
    });

    renderSummary();
}

/**
 * Cambia la cantidad de un producto del carrito en una cantidad determinada.
 * @param {number} id - Identificador del producto.
 * @param {number} amount - Cantidad a sumar o restar.
 * @returns {void}
 */
function changeQuantity(id, amount) {
    const product = cartProducts.find(item => item.id === id);
    if (product) {
        const nextQuantity = product.quantity + amount;
        if (nextQuantity <= 0) {
            removeProduct(id);
        } else {
            if (cartStorage) {
                cartStorage.updateQuantity(id, nextQuantity);
            }
            syncCartProducts();
            renderCartItems();
        }
    }
}

/**
 * Elimina un producto del carrito por su identificador.
 * @param {number} id - Identificador del producto a eliminar.
 * @returns {void}
 */
function removeProduct(id) {
    if (cartStorage) {
        cartStorage.removeItem(id);
    }
    syncCartProducts();
    renderCartItems();
}

/**
 * Inicializa la página al cargar el DOM.
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", () => {
    renderCatalog();
    renderCartItems();
});

setupCartWatchers();

/**
 * Formulario y elementos del proceso de pago.
 * @type {HTMLElement|null}
 */
const paymentDiv = document.getElementById('payment');
/** @type {HTMLElement|null} */
const userForm = document.getElementById('user-form');
/** @type {HTMLButtonElement|null} */
const payBtn = paymentDiv.querySelector('button');
/** @type {HTMLFormElement|null} */
const form = userForm.querySelector('form');
/** @type {HTMLButtonElement|null} */
const cancelBtn = userForm.querySelector('.btn-danger');

// Estado inicial: oculto con animación (en vez de la clase "hide")
userForm.classList.remove('hide');
userForm.classList.add('hide-anim');

/**
 * Muestra el formulario de usuario al hacer clic en pagar.
 * @returns {void}
 */
payBtn.addEventListener('click', () => {
    userForm.classList.remove('hide-anim');
    payBtn.classList.add('hide');
});

/**
 * Oculta el formulario de usuario al cancelar el pedido.
 * @param {Event} e - Evento del botón de cancelación.
 * @returns {void}
 */
cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    userForm.classList.add('hide-anim');
    payBtn.classList.remove('hide');
});

/**
 * Envía el pedido o cancela la operación según el botón del formulario.
 * @param {Event} e - Evento del submit del formulario.
 * @returns {void}
 */
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (e.submitter && e.submitter.classList.contains('btn-danger')) {
        userForm.classList.add('hide-anim');
        payBtn.classList.remove('hide');
        return;
    }

    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const direccion = document.getElementById('direccion').value;

    alert(
        `¡Pedido enviado!\n\n` +
        `Nombre: ${name}\n` +
        `Correo: ${email}\n` +
        `Dirección: ${direccion}`
    );

});