import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { verifyAuthentication } from '../../utils/authUtils';

const AuthenticatedRedirect = ({ children }) => {
    const { accessToken } = useSelector((state) => state.auth);
    const isAuthenticated = verifyAuthentication(accessToken);
    const navigation = useNavigation();

    useEffect(() => {
        if (isAuthenticated) {
            navigation.replace('Home');
        }
    }, [isAuthenticated, navigation]);

    if (isAuthenticated) {
        return null; //loader
    }

    return children;
};

export default AuthenticatedRedirect;
