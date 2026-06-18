const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        listings: {
            type: Number,
            trim: true
        },
        duration: {
            type: Number,
            required: true,
            trim: true
        },
        features: [String],
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;