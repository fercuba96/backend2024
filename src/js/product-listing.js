import ProductData from "./ProductData.mjs";

import ProductListing from "./ProductList.mjs";

import {loadHeaderFooter, getParams} from "./utils.mjs";

const category = getParams("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const productListing = new ProductListing(category,dataSource,element);

loadHeaderFooter();

productListing.init();