import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Layout from '../components/Layout/Layout';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import AuthenticatedRedirect from '../components/AuthenticatedRedirect/AuthenticatedRedirect';
import routes from './NavigationConfig';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            {routes.map((route, index) => (
                <Stack.Screen
                    key={index}
                    name={route.name}
                >
                    {(props) => (
                        <Layout showHeader={route.showHeader} showFooter={route.showFooter}>
                            {/* <route.component {...props} /> */}
                            {route.protected ?
                                <ProtectedRoute>
                                    <route.component {...props} />
                                </ProtectedRoute>
                                : route.authRedirect ?
                                    <AuthenticatedRedirect>
                                        <route.component {...props} />
                                    </AuthenticatedRedirect>
                                    :
                                    <route.component {...props} />
                            }
                        </Layout>
                    )}
                </Stack.Screen>
            ))}
        </Stack.Navigator>
    )
};

export default Navigator;
