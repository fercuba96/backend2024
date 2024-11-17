export default class ProductListing {
constructor(category, dataSource, listElement){
   this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
}

filterProducts(list) {
    return products.slice(0, 4);
}

async init(){
    const list = await this.dataSource.getData();
    const filteredProducts = this.filterProducts(list);
    this.renderList(filteredProducts); 
  } catch (error) {
    console.error("Error initializing product listing:", error);
  }

renderList(list) {
    renderListWithTemplate(
        this.productTemplate,
        this.listElement, 
        list, 
        "afterbegin", 
        true 
      );
  }
  productTemplate(product) {
    return `
      <div class="product-card">
        <img src="${product.Image}" alt="${product.Name}" class="product-image" />
        <h3>${product.Name}</h3>
        <p>${product.Description}</p>
        <p>Price: $${product.FinalPrice}</p>
        <a href="product.html?product=${product.Id}" class="button">View Details</a>
      </div>
    `;
  }

}