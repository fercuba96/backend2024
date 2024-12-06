import { getLocalStorage } from "./utils.mjs";

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

  const totalAmount = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  cartFooter.querySelector(".cart-total").innerHTML = `Total: ${totalAmount.toFixed(2)}`;
  cartFooter.classList.remove("hide");

}

function cartItemTemplate(item) {
  const isDiscounted = item.FinalPrice < item.SuggestedRetailPrice;
  const discountPercentage = isDiscounted ?  Math.round(
    ((item.SuggestedRetailPrice - item.FinalPrice) / item.SuggestedRetailPrice) * 100) : null;
  const newItem = `<li class="cart-card divider">
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
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__suggested">Suggested Price: $${item.SuggestedRetailPrice}</p>
  <p class="cart-card__price">Final Price: $${item.FinalPrice}</p>
  ${
    isDiscounted
     ? `<p class="cart-card_discount">Discount: ${discountPercentage}% off</p>` : ""
  }

</li>`;

  return newItem;
}

renderCartContents();
