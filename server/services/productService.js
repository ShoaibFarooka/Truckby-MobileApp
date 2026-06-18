const Product = require('../models/prooductModel');

const fetchAllProducts = async () => {
    const products = await Product.find();
    if (!products || products.length === 0) {
        const error = new Error('Products not found!');
        error.code = 404;
        throw error;
    }
    return products;
};

module.exports = {
    fetchAllProducts,
};
