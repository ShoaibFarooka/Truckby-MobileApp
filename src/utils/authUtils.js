const verifyAuthentication = (token) => {
    return !!token;
};

const verifyAuthorization = (userRole, allowedRoles = []) => {
    if (!userRole || allowedRoles.length === 0) {
        return false;
    }

    return allowedRoles.includes(userRole);
};

export { verifyAuthentication, verifyAuthorization };