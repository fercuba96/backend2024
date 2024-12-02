// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function getParams(param){
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear =false
){
  if (!parentElement){
    console.error("Parent element not found");
    return;
  }

  if(!Array.isArray(list) || list.length ===0 ){
console.warn("No items to render");
  }

  const validPositions = ["beforebegin","afterbegin","beforeend","afterend"];
if(!validPositions.includes(position)){
  console.error(`Invalid position: ${position}`);
  return;
}

   const htmlStrings = list.map(templateFn);

   if(clear){
    parentElement.innerHTML="";
   }
   if(!parentElement.insertAdjacentHTML){
    console.warn("insertAdjacentHTML not supported. Using innerHTML as fallback.");
    parentElement.innerHTML += htmlStrings.join("");
   } else {
    parentElement.insertAdjacentHTML(position,htmlStrings.join(""));
  }
   }

export async function loadTemplate(path) {
      try {
        const res = await fetch(path);
        const templateText = await res.text();
        return templateText;
      } catch (error) {
        console.error(`Error loading template from ${path}:`, error);
        throw error;
      }
    }

export function renderWithTemplate(template, parentElement) {

  parentElement.insertAdjacentHTML("afterbegin",template);
}
export async function loadHeaderFooter(){
  try{
    const headerTemplate = await loadTemplate("../partials/header.html");
    const footerTemplate = await loadTemplate("../partials/footer.html");

    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");

    if(headerElement){
      renderWithTemplate(headerTemplate,headerElement);
    }else{
      console.warn("Header element not found.");
    }
    if(footerElement){
      renderWithTemplate(footerTemplate,footerElement);
    }else{
      console.warn("Footer element not found.");
    }
  }
  catch (error){
    console.error("Error loading header or footer:", error);
  }
  
}
