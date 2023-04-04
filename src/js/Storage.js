export default class Storage {
    static getAllCategories() {
        const savedCategories = JSON.parse(localStorage.getItem('category')) || [];

        const sortedCategories = savedCategories.sort((a,b) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
        });

        return sortedCategories;
    }


    static saveCategory(categoryToSave) {
        const saveCategories = Storage.getAllCategories();

        const existedItem = saveCategories.find((category) => category.id === categoryToSave.id);
        if (existedItem) {
            // EDITE CATEGORY
            existedItem.title = categoryToSave.title;
            existedItem.description = categoryToSave.description;
        } else {
            // NEW CATEGORY
            categoryToSave.id = new Date().getTime();
            categoryToSave.createAt = new Date().toISOString();
            saveCategories.push(categoryToSave);

        }
        localStorage.setItem('category' , JSON.stringify(saveCategories))
    }

    static getAllProducts(sort = "newest") {
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        // default: newest
        return savedProducts.sort((a,b) => {
            if (sort ==="newest") {
                return new Date(a.createAt) > new Date(b.createAt) ? -1 : 1;
            } else if (sort === "oldest") {
                return new Date(a.createAt) > new Date(b.createAt) ? 1 : -1;
            }
        });

    }

    static saveProducts(productToSave) {
        const saveProducts = Storage.getAllProducts();

        const existedItem = saveProducts.find((product) => product.id === productToSave.id);
        if (existedItem) {
            // EDITE product
            existedItem.title = productToSave.title;
            existedItem.quantity = productToSave.quantity;
            existedItem.category = productToSave.category;

        } else {
            // NEW product
            productToSave.id = new Date().getTime();
            productToSave.createAt = new Date().toISOString();
            saveProducts.push(productToSave);

        }
        localStorage.setItem('products' , JSON.stringify(saveProducts))
    }
    static deleteProduct(id) {
        const savedProducts = Storage.getAllProducts();
        const filteredProducts = savedProducts.filter(p => p.id !== parseInt(id));
        localStorage.setItem("products" , JSON.stringify(filteredProducts))
    }
}