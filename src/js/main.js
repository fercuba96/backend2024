import ProductData from "./ProductData.mjs";

import ProductListing from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const productListing = new ProductListing(dataSource, "product-list");

productListing.init();