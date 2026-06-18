const router = require("express").Router();
const controller = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
    "/fetch-all-products",
     authMiddleware.authenticateRequest,
    controller.FetchAllProducts
);

module.exports = router;
