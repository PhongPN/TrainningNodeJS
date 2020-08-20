const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    product_id:{
        type: Number,
        required: true,
        unique: true
    },
    product_name:{
        type: String,
        required: true
    },
    product_category:{
        type: String,
        required: true
    },
    product_cost:{
        type: Number,
        required: true
    }
}, { collection: "product" });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;