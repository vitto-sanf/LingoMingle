// Imports
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";
import { Tabs, router } from "expo-router";

// Config
import toastConfig from "../config/toastConfig"

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <Tabs initialRouteName="home">
        <Tabs.Screen name="home" options={{ tabBarLabel: 'Home', title: 'Home'}}/>
        <Tabs.Screen name="index" options={{href: null}} />
        </Tabs>
      <Toast config={toastConfig} />
    </>
  );
};

export default MainLayout;
