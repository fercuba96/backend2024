import {getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import {loadHeaderFooter} from "./utils.mjs";
document.addEventListener("DOMContentLoaded", () => {loadHeaderFooter();})


const dataSource = new ProductData("tents");
const productId = getParams('product');
const product = new ProductDetails(productId,dataSource);

product.init();