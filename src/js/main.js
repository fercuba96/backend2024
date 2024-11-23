import ProductData from "./ProductData.mjs";

import ProductListing from "./ProductList.mjs";

import {loadHeaderFooter} from "./utils.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productListing = new ProductListing("Tents",dataSource,element);

document.addEventListener("DOMContentLoaded", () => {loadHeaderFooter();})

productListing.init();