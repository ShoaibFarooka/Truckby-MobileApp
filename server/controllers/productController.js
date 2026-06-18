const productService = require('../services/productService');
const stripeService = require('../services/stripeService');

const FetchAllProducts = async (req, res, next) => {
    try {
        const ProductsFromDB = await productService.fetchAllProducts();


        const detailedProducts = await Promise.all(ProductsFromDB.map(async (product) => {
            const stripeInfo = await stripeService.fetchProductInfo(product.productId);

            const { duration, features, listings } = product;

            return { ...stripeInfo, _id: product._id, duration, features, listings };
        }));

        res.status(200).json({ products: detailedProducts });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    FetchAllProducts,
};
