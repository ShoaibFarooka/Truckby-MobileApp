import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from 'react-redux';
import store from './src/redux/store.js';
import ToastManager from 'toastify-react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from "./src/navigator/Navigator.js";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>

        <NavigationContainer>
          <Navigator />
        </NavigationContainer>

        <StatusBar style="auto" />
        <ToastManager showCloseIcon={false} showProgressBar={false} />
      </SafeAreaProvider>
    </Provider>
  );
};