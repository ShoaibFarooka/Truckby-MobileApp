const stripeService = require('../services/stripeService');
const userService = require('../services/userService');
const subscriptionService = require('../services/subscriptionService');

const CreateCheckoutSession = async (req, res, next) => {
    try {
        const clientType = req.get('x-client-type');
        const CLIENT_URL = req.get('origin');
        const { priceId } = req.body;
        const userId = req.user?.id;

        let stripeCustomerId = await userService.fetchUserStripeCustomerId(userId);
        if (!stripeCustomerId) {
            const user = await userService.fetchUser(userId);
            stripeCustomerId = await stripeService.createCustomer(user.name, user.email);
            await userService.updateUser(userId, { stripeCustomerId });
        }

        const isMobile = clientType === 'native';
        const redirectBase = isMobile
            ? process.env.MOBILE_REDIRECT_BASE_URL
            : CLIENT_URL;
        if (!redirectBase) {
            const err = new Error('Missing redirect base URL — origin/client-type header not provided');
            err.code = 400;
            throw err;
        }

        const sessionURL = await stripeService.createCheckoutSession(priceId, stripeCustomerId, redirectBase, isMobile);
        res.status(200).json({ url: sessionURL });
    } catch (error) {
        next(error);
    }
};

const StripeHooks = async (req, res, next) => {
    try {
        const sig = req.headers['stripe-signature'];
        const data = req.body;
        const event = await stripeService.constructEvent(sig, data);
        // console.log(event, 'eventData')

        switch (event?.type) {
            case 'invoice.payment_succeeded':
                const paymentData = await stripeService.handlePaymentSucceededEvent(event);
                console.log("Payment Data: ", paymentData);
                await subscriptionService.addSubscription(paymentData);
                res.status(200).json({ message: 'Subscription created!' });
                break;
            default:
                res.status(200).json({ message: 'Unhandled webhooks event!' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    CreateCheckoutSession,
    StripeHooks,
};
