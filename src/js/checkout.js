import {loadHeaderFooter} from "./utils.mjs";

import { getLocalStorage } from "./utils.mjs";

import ExternalServices from "./ExternalServices.mjs";

import { alertMessage } from "./utils.mjs";


loadHeaderFooter();

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};
    
    formData.forEach((value, key) => {
      convertedJSON[key] = value;
    });
  
    return convertedJSON;
  }

function packageItems(items) {
    return items.map(item => ({
      id: item.Id,
      name: item.Name,
      quantity: item.quantity || 1,
      price: item.FinalPrice
    }));
  }

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
    }
  
    calculateItemSummary() {
        this.itemTotal = this.list.reduce(
          (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
          0
        );
        this.shipping = this.calculateShipping(this.list.length);
        this.tax = this.itemTotal * 0.06;
        this.orderTotal = this.itemTotal + this.shipping + this.tax;
        this.displayOrderTotals();
      }
  
    displayOrderTotals() {
      document.querySelector(`${this.outputSelector} #subtotal`).textContent = `$${this.itemTotal.toFixed(2)}`;
      document.querySelector(`${this.outputSelector} #shipping-estimate`).textContent = `$${this.shipping.toFixed(2)}`;
      document.querySelector(`${this.outputSelector} #tax`).textContent = `$${this.tax.toFixed(2)}`;
      document.querySelector(`${this.outputSelector} #order-total`).textContent = `$${this.orderTotal.toFixed(2)}`;
    }
    calculateShipping(itemCount) {
        if (itemCount === 0) return 0;
        return 10 + (itemCount - 1) * 2;}
    
    async checkout() {

            const formElement = document.forms["checkout"];        
            const customerDetails = formDataToJSON(formElement);
        
            customerDetails.orderDate = new Date();
            customerDetails.orderTotal = this.orderTotal;
            customerDetails.tax = this.tax;
            customerDetails.shipping = this.shipping;
            customerDetails.items = packageItems(this.list);
            console.log(customerDetails);
        
            try {
        
              const response = await ExternalServices.getOrder(customerDetails);
              console.log("Order submitted successfully:", response);
              alert("Order placed successfully!");
               if (response.ok){
                      localStorage.removeItem(this.key);
                      window.location.href = "/checkout/success.html";
                         } else {
                          throw new Error(`Checkout failed: ${response.statusText}`);
                             }
            } catch (error) {
              console.error("Error submitting order:", error);
              alert("There was an error processing your order. Please try again.");
            }
          }
  }
  
const checkout = new CheckoutProcess("so-cart", ".order-summary");

checkout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", checkout.calculateItemSummary.bind(checkout));
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  const myForm = document.forms[0];

  const chk_status = myForm.checkValidity();

  myForm.reportValidity();

  if (chk_status){
    checkout.checkout();
  }
  else{
    alertMessage("Please correct the errors in the form before proceeding.", true);
    console.error("Form validation failed. Please check your input fields.");
    alert("Please fill out all required fields correctly.");
  }
});