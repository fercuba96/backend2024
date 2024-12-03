import { getLocalStorage } from "./utils.mjs";

import {loadHeaderFooter} from "./utils.mjs";
loadHeaderFooter();


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
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
