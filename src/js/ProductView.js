import Storage from "./Storage.js";

const addNewProductBtn = document.getElementById("add-new-product");
const searchInput = document.querySelector('#search-input');
const selectedSort = document.querySelector("#sort-products");

class ProductView {
    constructor() {
        addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
        searchInput.addEventListener('input', (e) => this.searchProducts(e));
        selectedSort.addEventListener('change' , (e) => this.sortProducts(e));
        this.products = [];
    }

    setApp() {
        this.products = Storage.getAllProducts();
    }

    addNewProduct(e) {
        e.preventDefault();
        const title = document.querySelector('#product-title').value;
        const quantity = document.querySelector('#product-quantity').value;
        const category = document.querySelector('#product-category').value;
        if (!title || !quantity || !category ) return;
        Storage.saveProducts({title, quantity , category});
        this.products = Storage.getAllProducts();
        this.createProductsList(this.products);
        console.log(this.products);
    }

        createProductsList(products){
        const productsDOM = document.querySelector("#products-list");
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let result = '';
        products.forEach((item) => {
            const selectedCategory = Storage.getAllCategories().find((c) => c.id == item.category)
            console.log(selectedCategory);
            result += 
            `<div class="flex items-center justify-between mb-2">
            <span class="text-slate-400">${item.title}</span>
                    <div class="flex items-center gap-x-3">
                    <span class="text-slate-400">${new Date().toLocaleDateString("fa-IR", options)}</span>
                    <span class="block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm rounded-2xl">${selectedCategory.title}</span>
                    <span class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 border-2 border-slate-300 font-bold text-slate-300">${item.quantity}</span>
                    <button class="delete-product border px-2 py-0.5 rounded-2xl border-red-800 bg-red-600 text-red-100" data-product-id=${item.id}>حذف</button>
                    </div>
        </div>`
                });

        productsDOM.innerHTML = result;
        const deleteBtns = [...document.querySelectorAll(".delete-product")];
        deleteBtns.forEach((item) => {
            item.addEventListener('click', (e) => this.deleteProduct(e));
        });
    }

    // createProductsList(products) {
    //     const productsDOM = document.getElementById("products-list");
    //     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //     let result = '';
    //     products.forEach((item) => {
    //         const selectedCategory = Storage.getAllCategories().find(c => c.id === item.category)
    //         result += 
    //         `<div class="flex items-center justify-between mb-2">
    //         <span class="text-slate-400">${item.title}</span>
    //         <div class="flex items-center gap-x-3">
    //             <span class="text-slate-400">${new Date().toLocaleDateString("fa-IR" , options)}</span>
    //             <span class="block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm rounded-2xl">${selectedCategory.title}</span>
    //             <span class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 border-2 border-slate-300 text-slate-300">${item.quantity}</span>
    //             <button class="delete-product border px-2 py-0.5 rounded-2xl border-red-800 text-red-400" data-product-id=${item.id}>حذف</button>
    //         </div>
    //     </div>`
    //     });
    searchProducts(e) {
        const value = e.target.value.trim();
        const filteredProducts = this.products.filter(p => p.title.includes(value));
        console.log(this.products);
        this.createProductsList(filteredProducts);
    }
    sortProducts(e) {
        const value = e.target.value;
        this.products = Storage.getAllProducts(value);
        this.createProductsList(this.products)
    }
    deleteProduct(e) {
        const productId = e.target.dataset.productId;
        Storage.deleteProduct(productId);
        this.products = Storage.getAllProducts();
        this.createProductsList(this.products)
    }

    totalProducts(products) {
        const appbarTotalProducts = document.querySelector("#totalproducts");
        this.products.length = Storage.getAllProducts();
        appbarTotalProducts.innerHTML = this.products.length;
    }
}

export default new ProductView();
