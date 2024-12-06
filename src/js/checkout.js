import {loadHeaderFooter} from "./utils.mjs";

import { getLocalStorage } from "./utils.mjs";

loadHeaderFooter();

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key) || [];
      this.calculateItemSummary();
      this.calculateOrderTotal();
    }
  
    calculateItemSummary() {
      this.itemTotal = this.list.reduce(
        (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
        0
      );
    }
  
    calculateOrderTotal() {
      const totalItems = this.list.reduce(
        (count, item) => count + (item.quantity || 1),
        0
      );
  
      this.shipping = totalItems > 0 ? 10 + (totalItems - 1) * 2 : 0;
  
      const taxRate = 0.06;
      this.tax = this.itemTotal * taxRate;
  
      this.orderTotal = this.itemTotal + this.shipping + this.tax;
  
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      document.querySelector(`${this.outputSelector} #subtotal`).textContent = `$${this.itemTotal.toFixed(2)}`;
      document.querySelector(`${this.outputSelector} #shipping-estimate`).textContent = `$${this.shipping.toFixed(2)}`;
      document.querySelector(`${this.outputSelector} #tax`).textContent = `$${this.tax.toFixed(2)}`;
      document.querySelector(`${this.outputSelector} #order-total`).textContent = `$${this.orderTotal.toFixed(2)}`;
    }
  }
  
  const checkout = new CheckoutProcess("so-cart", ".order-summary");
  checkout.init();
