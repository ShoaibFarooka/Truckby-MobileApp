import { useState, useCallback } from "react";

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
            console.log("UseAPI Error: ", err?.response?.data || err);
            const data = err?.response?.data;
            const candidate = data?.error || data?.message || data || err?.message;
            // Always a string, since callers pass it straight to Toast.error
            const errMsg = typeof candidate === "string" && candidate ? candidate : "Something went wrong";
            setError(errMsg);
            throw errMsg;
        } finally {
            setLoading(false);
        }
    }, [apiFunction]);

    return { data, loading, error, execute };
}

export default useApi;
