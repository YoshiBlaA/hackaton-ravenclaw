const summaryObject = {
    subtotal: 602345,
    shipping: 232345,
}

const totalProducts = document.querySelector("#total-products")
const subtotalPrice = document.querySelector("#subtotal-number");
const shippingPrice = document.querySelector("#shipping-number");
const totalPrice = document.querySelector("#total-number");

subtotalPrice.textContent = summaryObject.subtotal;
shippingPrice.textContent = summaryObject.shipping;
totalPrice.textContent = summaryObject.subtotal + summaryObject.shipping;

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

// Arreglo del carrito (inicia vacío o con items por defecto)
let cartProducts = [];

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

  const existingInCart = cartProducts.find(item => item.id === productId);

  if (existingInCart) {
    // Si ya existe en el carrito, aumentamos la cantidad
    existingInCart.quantity += 1;
  } else {
    // Si no existe, lo agregamos con cantidad 1
    cartProducts.push({
      ...productToBuy,
      quantity: 1
    });
  }

  renderCartItems();
}

// Renderizar la lista del carrito
function renderCartItems() {
  const container = document.getElementById("cart-items-list");
  container.innerHTML = "";

  if (cartProducts.length === 0) {
    container.innerHTML = '<p class="empty-cart-msg">Carrito vacio.</p>';
    return;
  }

  cartProducts.forEach(product => {
    const itemTotal = (product.price * product.quantity).toFixed(2);
    
    const itemHTML = document.createElement("div");
    itemHTML.classList.add("cart-item");
    itemHTML.innerHTML = `
      <div class="item-image">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="item-details">
        <h2 class="item-name">${product.name}</h2>
        <span class="item-unit-price">$ ${product.price.toFixed(2)}/cu</span>

        <div class="quantity-wrapper">
          <span class="quantity-label">Cantidad</span>
          <div class="quantity-control">
            <button class="qty-btn" onclick="changeQuantity(${product.id}, -1)">—</button>
            <span class="qty-number">${product.quantity}</span>
            <button class="qty-btn" onclick="changeQuantity(${product.id}, 1)">+</button>
          </div>
        </div>

        <div class="item-actions">
          <button class="action-btn" onclick="removeProduct(${product.id})" aria-label="Delete item">
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

    container.appendChild(itemHTML);
  });
}

// Cambiar la cantidad de un producto
function changeQuantity(id, amount) {
  const product = cartProducts.find(item => item.id === id);
  if (product) {
    product.quantity += amount;
    if (product.quantity <= 0) {
      removeProduct(id);
    } else {
      renderCartItems();
    }
  }
}

// Eliminar un producto
function removeProduct(id) {
  cartProducts = cartProducts.filter(item => item.id !== id);
  renderCartItems();
}

// Inicializar la página
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  renderCartItems();
});

const paymentDiv = document.getElementById('payment');
const userForm = document.getElementById('user-form');
const payBtn = paymentDiv.querySelector('button');
const form = userForm.querySelector('form');
const cancelBtn = userForm.querySelector('.btn-danger');

// Estado inicial: oculto con animación (en vez de la clase "hide")
userForm.classList.remove('hide');
userForm.classList.add('hide-anim');

payBtn.addEventListener('click', () => {
    userForm.classList.remove('hide-anim');
    payBtn.classList.add('hide');
});

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    userForm.classList.add('hide-anim');
    payBtn.classList.remove('hide');
});

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