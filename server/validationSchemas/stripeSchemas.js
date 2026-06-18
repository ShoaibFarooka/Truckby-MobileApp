const yup = require('yup');

const createCheckoutSchema = yup.object().shape({
    priceId: yup.string().trim().required('Price Id is required'),
});

module.exports = {
    createCheckoutSchema,
}