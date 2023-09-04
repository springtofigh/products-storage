// import CategoryView from "./CategoryView.js";
// import ProductView from "./ProductView.js";

// document.addEventListener("DOMContentLoaded", () => {
//   // setApp => categories : OK
  // CategoryView.setApp();
  // ProductView.setApp();
  // create categories options
//   CategoryView.createCategoriesList();
  
//   ProductView.createProductsList(ProductView.products);
// });

import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setApp();
  ProductView.setApp();

  CategoryView.createCategoriesList();
  ProductView.createProductsList();
});