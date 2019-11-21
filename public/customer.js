/*global Vue*/
/*global axios*/

let app = new Vue({
    el: "#app",
    data: {
        products: [],
        selectedProducts: [],
    },
    methods: {
        async getProducts() {
            try {
                let response = await axios.get("/api/products");
                this.products = response.data;
                console.log("got products: ", this.products);
                return true;
            }
            catch (error) {
                console.log(error);
            }
        },
        submitOrder() {
            this.products.forEach(product => {
                if (product.selected) {
                    console.log("product selected: ", product);
                    this.selectedProducts.push(product);
                    this.incrementOrder(product);
                }
            });
        },
        async incrementOrder(product) {
            try {
                let response = axios.put("/api/products/" + product._id, {
                    name: product.name,
                    orders: product.orders + 1
                });
            }
            catch (error) {
                console.log(error);
            }
        },
        updateSelectedProducts() {
            console.log("selected products:", this.selectedProducts);
            this.selectedProducts = [];
            this.products.forEach(product => {
                product.selected = false;
            });
        }
    },
    created() {
        this.getProducts();
        this.updateSelectedProducts();
    }
});
