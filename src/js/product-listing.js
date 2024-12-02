import ProductData from "./ProductData.mjs";

import ProductListing from "./ProductList.js";

import {loadHeaderFooter, getParams} from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const productListing = new ProductListing(category,dataSource,element);

productListing.init();