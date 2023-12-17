// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT } from "../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: "center",
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: 32,
  },
});

export default styles;
