export const formatNumberWithCommas = (value) => {

    if (value === null || value === undefined) {
        return "";
    }

    const number = Number(value);

    if (isNaN(number)) {
        return value;
    }

    return number.toLocaleString("en-US");
};

export const formatPhoneNumber = (value) => {
    if (value === undefined || value === null) return value;
    const digits = value.toString().replace(/\D/g, '').slice(-10);
    if (digits.length !== 10) return value;
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
};