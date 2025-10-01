import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { verifyAuthentication, verifyAuthorization } from "../../utils/authUtils";
import Unauthorized from "../../screens/common/Unauthorized/Unauthorized";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { accessToken, user } = useSelector((state) => state.auth);
    const isAuthenticated = verifyAuthentication(accessToken);
    const navigation = useNavigation();

    useEffect(() => {
        if (!isAuthenticated) {
            navigation.replace("Login");
        }
    }, [isAuthenticated, navigation]);

    if (!isAuthenticated) {
        return null; //loader while navigation
    }

    const userRole = user?.role;
    if (!verifyAuthorization(userRole, allowedRoles)) {
        return <Unauthorized />;
    }

    return children;
};

export default ProtectedRoute;
