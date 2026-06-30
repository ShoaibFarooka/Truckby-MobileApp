import axiosInstance from "./axiosInstance";

// add report
export const uploadImg = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/image/upload", payload, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

