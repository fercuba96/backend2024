const baseURL = import.meta.env.VITE_SERVER_URL;
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor(category) {
   // this.category = category;
   // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async getOrder(orderObject) {
    const url = `${this.baseURL}/checkout`; 
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderObject),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Checkout failed: ${response.statusText}`);
      }
      return await response.json(); 
    } catch (error) {
      console.error("Error during checkout:", error);
      throw error; 
    }
  }
}
