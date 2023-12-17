// Imports
import "expo-dev-client";
import { View, Text } from "react-native";
import React from "react";
import { useSegments } from "expo-router";

import { FONT } from "../../constants";

const Home = () => {
  const seg = useSegments()

  console.log(seg);
  return (
    <View>
      <Text style={{fontFamily: FONT.bold}}>Home </Text>
      <Text style={{fontFamily: FONT.medium}}>Home 2 </Text>
      <Text style={{fontFamily: FONT.regular}}>Home 3</Text>
      <Text>test</Text>
    </View>
  );
};

export default Home;
