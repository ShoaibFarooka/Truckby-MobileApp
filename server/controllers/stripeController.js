const stripeService = require('../services/stripeService');
const userService = require('../services/userService');
const subscriptionService = require('../services/subscriptionService');

const CreateCheckoutSession = async (req, res, next) => {
    try {
        const CLIENT_URL = req.get('origin');
        const { priceId } = req.body;
        // console.log(priceId, 'priceId')
        const userId = req.user?.id;
        let stripeCustomerId = await userService.fetchUserStripeCustomerId(userId);
        if (!stripeCustomerId) {
            const user = await userService.fetchUser(userId);
            stripeCustomerId = await stripeService.createCustomer(user.name, user.email);
            await userService.updateUser(userId, { stripeCustomerId });
        }
        const sessionURL = await stripeService.createCheckoutSession(priceId, stripeCustomerId, CLIENT_URL);
        res.status(200).json({ url: sessionURL });
    } catch (error) {
        // console.log(error, 'CreateCheckoutSession')
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
