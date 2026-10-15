import axiosInstance, { UPLOAD_TIMEOUT } from "./axiosInstance";

const BASE_URL = "/api/image";

const uploadService = {
    uploadImg: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/upload`, payload, {
                headers: { "Content-Type": "multipart/form-data" },
                timeout: UPLOAD_TIMEOUT,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default uploadService;

