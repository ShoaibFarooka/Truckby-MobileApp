const verifyAuthentication = (token) => {
    return !!token;
};

const verifyAuthorization = (userRole, allowedRoles = []) => {
    console.log('Verifying Authorization...', userRole);
    if (!userRole || allowedRoles.length === 0) {
        return false;
    }

    return allowedRoles.includes(userRole);
};

export { verifyAuthentication, verifyAuthorization };