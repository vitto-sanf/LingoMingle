// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT, COLOR } from "../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.lightWhite,
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: 32,
    textAlign: "center",
  },
  sectionContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontFamily: FONT.medium,
    fontSize: 18,
    marginBottom: 6,
    marginLeft: 10,
  },
});

export default styles;
