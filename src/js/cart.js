import { getLocalStorage, setLocalStorage } from "./utils.mjs";

import {loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productListElement = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");

  if (cartItems.length === 0) {
    productListElement.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.classList.add("hide");
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productListElement.innerHTML = htmlItems.join("");

  const totalAmount = cartItems.reduce((sum, item) => sum + item.FinalPrice * item.quantity, 0);
  cartFooter.querySelector(".cart-total").innerHTML = `Total: ${totalAmount.toFixed(2)}`;
  cartFooter.classList.remove("hide");

  addCartEventListeners();

}

function cartItemTemplate(item, index) {
  const isDiscounted = item.FinalPrice < item.SuggestedRetailPrice;
  const discountPercentage = isDiscounted ?  Math.round(
    ((item.SuggestedRetailPrice - item.FinalPrice) / item.SuggestedRetailPrice) * 100) : null;
  const newItem = `<li class="cart-card divider" data-index="${index}">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">Quantity: 
    <input type="number" class="quantity-input" value="${item.quantity}" min="1" /></p>
  <p class="cart-card__suggested">Suggested Price: $${item.SuggestedRetailPrice}</p>
  <p class="cart-card__price">Final Price: $${item.FinalPrice}</p>
  ${
    isDiscounted
     ? `<p class="cart-card_discount">Discount: ${discountPercentage}% off</p>` : ""
  }
  <button class="delete-item">Remove</button>
</li>`;

  return newItem;
}

function addCartEventListeners() {
  document.querySelectorAll(".quantity-input").forEach((input, index) => {
    input.addEventListener("change", (e) => updateQuantity(index, parseInt(e.target.value, 10)));
  });

  document.querySelectorAll(".delete-item").forEach((button, index) => {
    button.addEventListener("click", () => deleteCartItem(index));
  });
}

function updateQuantity(index, newQuantity) {
  const cartItems = getLocalStorage("so-cart") || [];
  if (newQuantity > 0) {
    cartItems[index].quantity = newQuantity;
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
  } else {
    alert("Quantity must be at least 1.");
  }
}

function deleteCartItem(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

renderCartContents();
