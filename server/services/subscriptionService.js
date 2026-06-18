const Subscription = require('../models/subscriptionModel');
const moment = require("moment");

const addSubscription = async (data) => {

    try {
        const { user, customerId, subscriptionInfo } = data;
        // console.log(user, customerId, subscriptionInfo, 'addSubscription')
        const existingUserSubscription = await Subscription.findOne({ user });
        if (!existingUserSubscription) {
            const newSubscription = await Subscription.create({
                user,
                customerId,
                subscriptions: [subscriptionInfo]
            });
            // console.log(newSubscription, 'newSubscription')
        }
        else {
            // console.log(existingUserSubscription, 'existingUserSubscription')

            existingUserSubscription.customerId = customerId;
            existingUserSubscription.subscriptions.push(subscriptionInfo);
            await existingUserSubscription.save();
        }
    } catch (error) {
        console.log('AddSubscriptionError: ', error);
        const newError = new Error(`Unable to add subscription!`);
        newError.code = 400;
        throw newError;
    }
};

const getUserSubscriptionStatus = async (userId) => {

    const subscription = await Subscription.findOne({ user: userId });
    if (!subscription) {
        return {
            status: [],
            paymentStatus: 'Failed'
        };
    }
    const now = new Date();
    let isActive = false;
    let isNew = false;
    let paymentStatus = 'Failed';

    isActive = subscription.subscriptions.some(sub => {
        return sub.endDate >= now && sub.status === 'active';
    });

    // Check for new memberships
    isNew = subscription.subscriptions.some(sub => {
        return sub.endDate >= now && sub.status === 'active' && sub.startDate >= moment().subtract(30, 'days').toDate() &&
            sub.billingReason === 'subscription_create';
    });

    // Determine status and paymentStatus
    let status = [];
    if (isActive, isNew) {
        status = ['New', 'Active'];
        paymentStatus = 'Success';
    } else if (isNew) {
        status = ['New'];
        paymentStatus = 'Success';
    } else if (isActive) {
        status = ['Active'];
        paymentStatus = 'Success';
    } else {
        status = ['Lost'];
    }

    // console.log(paymentStatus,'paymentStatus');

    return {
        status: status,
        paymentStatus: paymentStatus
    };
};

const getUserSubscriptionInfo = async (userId) => {

    const subscription = await Subscription.findOne({ user: userId });
    if (!subscription) {
        return {
            status: false,
            subscriptionId: '',
            planName: '',
            productId: '',
            amount: null,
            autoRenew: false
        };
    }
    const now = new Date();
    let status = false;
    let subscriptionId = '';
    let planName = '';
    let productId = '';
    let amount = null;
    let autoRenew = false;

    const activeSubscription = subscription.subscriptions.find(sub => {
        return sub.endDate >= now && sub.status === 'active';
    });

    // console.log(subscription,'subscription')

    if (activeSubscription) {
        status = true;
        subscriptionId = activeSubscription.subscriptionId;
        planName = activeSubscription.planInfo.name;
        productId = activeSubscription.planInfo.productId;
        amount = activeSubscription.planInfo.amount;
        autoRenew = activeSubscription.autoRenew;
    }

    return {
        status,
        subscriptionId,
        planName,
        productId,
        amount,
        autoRenew
    };
};

module.exports = {
    addSubscription,
    getUserSubscriptionStatus,
    getUserSubscriptionInfo,
}