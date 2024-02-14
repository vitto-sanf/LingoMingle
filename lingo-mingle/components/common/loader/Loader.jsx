// Imports
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

// Styles
import styles from "./loader.style";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#06729F" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default Loader;
