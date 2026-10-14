import { Toast } from 'toastify-react-native';

export const SESSION_EXPIRED = 'SESSION_EXPIRED';

// Error used when the refresh token is missing or rejected. The interceptor shows
// a single "session expired" toast, so screens should stay silent for it.
export const createSessionExpiredError = () => {
    const error = new Error('Your session has expired. Please log in again.');
    error.code = SESSION_EXPIRED;
    return error;
};

export const isSessionExpiredError = (error) => error?.code === SESSION_EXPIRED;

// User-facing message for any API error: the server's message when it sends one,
// otherwise the fallback. Raw axios texts like "Request failed with status code 500"
// are replaced by the fallback.
export const getErrorMessage = (error, fallback = 'Something went wrong') => {
    if (typeof error === 'string') return error || fallback;

    const data = error?.response?.data;
    const candidate = data?.error || data?.message || (typeof data === 'string' ? data : null) || error?.message;

    if (typeof candidate !== 'string' || !candidate) return fallback;
    if (/^Request failed with status code \d+$/.test(candidate)) return fallback;
    return candidate;
};

// Shows an API error to the user, except for session expiry (already announced once)
export const showApiError = (error, fallback) => {
    if (isSessionExpiredError(error)) return;
    Toast.error(getErrorMessage(error, fallback));
};
