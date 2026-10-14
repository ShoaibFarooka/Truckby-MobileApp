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
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>

          {/* Rendered after the navigator so the overlay sits on top of every screen */}
          <Loader />

          <StatusBar style="auto" />
          {/* useModal={false}: the default Modal mode blocks every tap and scroll
              on the screen until the toast disappears */}
          <ToastManager
            useModal={false}
            showCloseIcon={false}
            showProgressBar={false}
            topOffset={60}
          />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};