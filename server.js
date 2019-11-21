const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/products', {
    useNewUrlParser: true
});

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    url: String,
    orders: { type: Number, default: 0 },
});

const Product = mongoose.model('product', productSchema);

app.post("/api/products", async(req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        url: req.body.url
    });
    try {
        console.log("product posted: ", product);
        await product.save();
        res.send(product);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/products', async(req, res) => {
    try {
        let products = await Product.find();
        res.send(products);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/products/:id', async(req, res) => {
    console.log("in delete: ", req.params.id);
    try {
        Product.deleteOne({ _id: req.params.id }, function(err) {
            if (err) console.log(err);
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/products/:id', async(req, res) => {
    console.log("updated order for: ", req.body.name)
    try {
        console.log("(put) ID: ", req.body);
        Product.updateOne({ _id: req.params.id }, { orders: req.body.orders }, function(err) {
            if (err) console.log(err);
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3003, () => console.log('Server listening on port 3003!'));
