const router = require("express").Router();
const controller = require("../controllers/subscriptionController");
const authMiddleware = require("../middleware/authMiddleware");
const subscriptionSchemas = require('../validationSchemas/subscriptionSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get(
    "/get-user-subscription-info",
    authMiddleware.authenticateRequest,
    // authMiddleware.verifyRole(['user']),
    controller.GetUserSubscriptionInfo
);

router.put('/toggleAutoRenew',
    authMiddleware.authenticateRequest,
    controller.ToggleAutoRenew
)

module.exports = router;
