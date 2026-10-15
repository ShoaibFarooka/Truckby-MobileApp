import { useState, useCallback } from "react";
import { getErrorMessage } from "../utils/apiError";

function useApi(apiFunction) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiFunction(...args);
            setData(result);
            return result;
        } catch (err) {
            console.log("UseAPI Error: ", err?.response?.data || err?.message);
            setError(getErrorMessage(err));
            // Rethrow the original error so callers can use showApiError, which
            // stays silent for session expiry and shows the server message otherwise
            throw err;
        } finally {
            setLoading(false);
        }
    }, [apiFunction]);

    return { data, loading, error, execute };
}

export default useApi;
