import ProductListing from "./ProductList.mjs";

import {loadHeaderFooter} from "./utils.mjs";

const productListing = new ProductListing("Tents",dataSource,element);

loadHeaderFooter();

productListing.init();