import ExternalServices from "./ExternalServices.mjs";

import ProductListing from "./ProductList.js";

import {loadHeaderFooter, getParams} from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const productListing = new ProductListing(category,dataSource,element);

productListing.init();