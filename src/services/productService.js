import axiosInstance from './axiosInstance';

const BASE_URL = '/api/product';

const productService = {
    fetchAllProducts: async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/fetch-all-products`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default productService;
