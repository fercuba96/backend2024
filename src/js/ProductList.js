import { renderListWithTemplate } from "./utils.mjs";

function productTemplate (product){
    const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
    const discountPercentage = isDiscounted ?  Math.round(
    ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100) : null;
    return `<li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="${product.Name}" class="product-image" />
      <h3 class="card_brand">${product.Brand.Name}</h3>
      <h2 class="card_name">${product.Name}</h2>
      <p class="product-card_price">Price: $${product.SuggestedRetailPrice}</p></a>
      ${
        isDiscounted
         ? `<p class="cart-card_discount">Discount: ${discountPercentage}% off</p>` : ""
      }
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
   document.title = `Top Products: ${this.category.charAt(0).toUpperCase() + this.category.slice(1)}`;
  const categoryNameElement = document.getElementById("category-name");
  if (categoryNameElement) {
    categoryNameElement.textContent = `Top products: ${this.category.charAt(0).toUpperCase() + this.category.slice(1)}`;
  }    
  const list = await this.dataSource.getData(this.category);
    const filteredProducts = this.filterProducts(list);
    this.renderList(filteredProducts); 
  } catch (error) {
    console.error("Error initializing product listing:", error);
  }

renderList(list) {
    renderListWithTemplate(productTemplate,this.listElement,list);
  }
}