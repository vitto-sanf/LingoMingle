// Imports
import React from "react";
import { Text, View, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";

// Styles
import styles from "../styles/Unmatched.styles";
import { COLOR } from "../constants";

const NotFoundScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: COLOR.lightWhite },
        }}
      />
      <Text style={styles.title}>404</Text>
      <Text style={styles.subTitle}>Page Not Found</Text>
      <Text style={styles.message}>
        {" "}
        Sorry, the page you are looking for is not available.
      </Text>
      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
    </View>
  );
};

export default NotFoundScreen;
