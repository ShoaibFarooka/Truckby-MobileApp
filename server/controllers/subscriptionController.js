const stripe = require('../configs/stripe.config');
const Product = require('../models/prooductModel');
const Subscription = require('../models/subscriptionModel');
const subscriptionService = require('../services/subscriptionService');

const GetUserSubscriptionInfo = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const info = await subscriptionService.getUserSubscriptionInfo(userId);
        let productData;
        // console.log(info.productId, 'info')

        if (info.productId) {
            productData = await Product.findOne({ productId: info.productId });
        }

        res.status(200).json({ info, productData });
    } catch (error) {
        // console.log(error, 'GetUserSubscriptionInfo')
        next(error);
    }
};

const ToggleAutoRenew = async (req, res, next) => {
    try {
        const userId = req.user?.id;

        const userSubscription = await Subscription.findOne({ user: userId });

        if (!userSubscription || !userSubscription.subscriptions.length) {
            return res.status(404).json({ message: 'No subscription found for user.' });
        }

        // Assuming the most recent subscription is the one to cancel
        const latestSubscription = userSubscription.subscriptions[userSubscription.subscriptions.length - 1];
        const stripeSubscriptionId = latestSubscription.subscriptionId;

        // Cancel subscription at period end
        const canceledSubscription = await stripe.subscriptions.update(stripeSubscriptionId, {
            cancel_at_period_end: latestSubscription.autoRenew,
        });

        // Update the local subscription record
        latestSubscription.autoRenew = !latestSubscription.autoRenew;

        await userSubscription.save();

        res.status(200).json({ canceledSubscription });
    } catch (error) {
        // console.log(error, 'ToggleAutoRenew');
        next(error);
    }
};

module.exports = {
    GetUserSubscriptionInfo,
    ToggleAutoRenew,
};
