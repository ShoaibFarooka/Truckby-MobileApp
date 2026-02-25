import axiosInstance from "./axiosInstance";

const BASE_URL = "/api/truck";

const truckService = {
    createTruck: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    sendMessage: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/send-message`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    newsLetter: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/news-letter`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllTrucks: async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAllTrucksByUser: async (page = 1, limit = 5) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/by-user?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllTrucksWithFilter: async (combinedFilters) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/get-all`, {
                params: combinedFilters,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getTruckById: async (id) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateTruck: async (id, payload) => {
        try {
            const response = await axiosInstance.put(`${BASE_URL}/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteTruck: async (id) => {
        try {
            const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getUserInventory: async (userId, page = 1, limit = 10) => {
        try {
            const response = await axiosInstance.get(
                `${BASE_URL}/inventory/${userId}?page=${page}&limit=${limit}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

};

export default truckService;