const express = require('express');
const UserRoutes = require('./userRoutes');
const imageRoutes = require('./s3Images');
const truckRoutes = require('./truckRoute');
const stripeRoutes = require('./stripeRoutes');
const productRoutes = require('./productRoutes')
const subscriptionRoutes = require('./subscriptionRoutes')

const router = express.Router();

// Set up routes
router.use('/user', UserRoutes);
router.use('/image', imageRoutes);
router.use('/truck', truckRoutes);
router.use('/product', productRoutes);
router.use('/stripe', stripeRoutes);
router.use('/subscription', subscriptionRoutes);


module.exports = router;