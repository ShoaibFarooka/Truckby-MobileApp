const router = require("express").Router();
const controller = require("../controllers/stripeController");
const authMiddleware = require("../middleware/authMiddleware");
const stripeSchemas = require('../validationSchemas/stripeSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.post(
    "/create-checkout-session",
    authMiddleware.authenticateRequest,
    // authMiddleware.verifyRole(['seller']),
    validationMiddleware.validateRequest(stripeSchemas.createCheckoutSchema),
    controller.CreateCheckoutSession
);

router.post(
    "/webhooks",
    controller.StripeHooks
);

module.exports = router;
