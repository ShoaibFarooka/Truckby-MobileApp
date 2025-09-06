import axiosInstance from "./axiosInstance";

const BASE_URL = "/api/image";

const uploadService = {
    uploadImg: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/upload`, payload, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default uploadService;

