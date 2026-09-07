const totalProducts = document.querySelector("#total-products");
const subtotalPrice = document.querySelector("#subtotal-number");
const shippingPrice = document.querySelector("#shipping-number");
const totalPrice = document.querySelector("#total-number");
const cartStorage = window.RavenclawCart;
const SHIPPING_COST = 0;

const catalog = [
  {
    id: 1,
    name: "Weasleys' Wizard Wheezes Magnet",
    price: 305.00,
    image: "https://via.placeholder.com/140"
  },
  {
    id: 2,
    name: "Chocolate Frog",
    price: 180.00,
    image: "https://via.placeholder.com/140"
  },
  {
    id: 3,
    name: "Bertie Bott's Every Flavour Beans",
    price: 220.00,
    image: "https://via.placeholder.com/140"
  }
];

let cartProducts = [];

function formatPrice(value) {
  return Number(value || 0).toLocaleString('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function syncCartProducts() {
  cartProducts = cartStorage ? cartStorage.getItems() : [];
}

function renderSummary() {
  const totalQuantity = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = totalQuantity > 0 ? SHIPPING_COST : 0;

  totalProducts.textContent = totalQuantity;
  subtotalPrice.textContent = formatPrice(subtotal);
  shippingPrice.textContent = formatPrice(shipping);
  totalPrice.textContent = formatPrice(subtotal + shipping);
}

// Renderizar las tarjetas del catálogo
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

// Agregar producto al carrito
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

// Renderizar la lista del carrito
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

// Cambiar la cantidad de un producto
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

// Eliminar un producto
function removeProduct(id) {
  if (cartStorage) {
    cartStorage.removeItem(id);
  }
  syncCartProducts();
  renderCartItems();
}

// Inicializar la página
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  renderCartItems();
});