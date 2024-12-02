import { renderListWithTemplate } from "./utils.mjs";

function productTemplate (product){
    return `<li class="product-card">
      <a href="produc_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Name}" class="product-image" />
      <h3 class="card_brand">${product.Brand.Name}</h3>
      <h2 class="card_name">${product.Name}</h2>
      <p class="product-card_price">Price: $${product.FinalPrice}</p></a>
    </li>
  `;
}

export default class ProductListing {
constructor(category, dataSource, listElement){
   this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
}

filterProducts(list) {return list.slice(0, 4);}

async init(){
    const list = await this.dataSource.getData();
    const filteredProducts = this.filterProducts(list);
    this.renderList(filteredProducts); 
  } catch (error) {
    console.error("Error initializing product listing:", error);
  }

renderList(list) {
    renderListWithTemplate(productTemplate,this.listElement,list);
  }
}