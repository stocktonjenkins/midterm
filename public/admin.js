/*global Vue*/
/*global axios*/

let app = new Vue({
    el: "#admin",
    data: {
        products: [],
        productName: "",
        productPrice: "",
        productUrl: ""
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
        async addProduct() {
            try {
                let product = await axios.post("/api/products", {
                    name: this.productName,
                    price: this.productPrice,
                    url: this.productUrl
                });
                console.log("added product: ", product);
                this.productName = "";
                this.productPrice = "";
                this.productUrl = "";
                this.getProducts();
            }
            catch (error) {
                console.log(error);
            }
        },
        async deleteProduct(product) {
            try {
                let response = axios.delete("/api/products/" + product._id);
                console.log("deleted item: ", product);
                this.getProducts();
                return true;
            }
            catch (error) {
                console.log(error);
            }
            console.log("test");
        }
    },
    created() {
        this.getProducts();
    }
});
