// Imports
import "react-native-gesture-handler";
import React from "react";
import { useCallback, useState, useEffect, useContext } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";
import { Stack } from "expo-router";
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider } from "stream-chat-expo";

// Context
import { AuthProvider, AuthContext } from "../contexts/AuthContext";

// Config
import toastConfig from "../config/toastConfig";

SplashScreen.preventAutoHideAsync();

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

const InitialLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  const [client, setClient] = useState(null);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      const userId = { id: user.uuid };

      try {
        const clientInfo = new StreamVideoClient({
          apiKey: STREAM_KEY,
          userId,
          token,
        });
        setClient(clientInfo);
      } catch (e) {
        console.log("Error creating client: ", e);
      }
    }
  }, [token, user]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <StreamVideo client={client}>
      <OverlayProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast config={toastConfig} />
      </OverlayProvider>
    </StreamVideo>
  );
};

// Wrap the app with the AuthProvider
const RootLayout = () => {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <InitialLayout />
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default RootLayout;
