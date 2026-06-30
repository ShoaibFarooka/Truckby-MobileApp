import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from 'react-redux';
import store from './src/redux/store.js';
import ToastManager from 'toastify-react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from "./src/navigator/Navigator.js";
import Loader from "./src/components/Loader/Loader.js";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <Loader />

          <NavigationContainer>
            <Navigator />
          </NavigationContainer>

          <StatusBar style="auto" />
          <ToastManager showCloseIcon={false} showProgressBar={false} topOffset={60}
          />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};