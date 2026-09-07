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