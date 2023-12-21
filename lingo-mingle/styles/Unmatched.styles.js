// Imports
import { StyleSheet } from "react-native";

// Constants
import { FONT, COLOR } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.lightWhite,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: 80,
  },
  subTitle: {
    fontFamily: FONT.medium,
    fontSize: 40,
  },
  message: {
    fontFamily: FONT.regular,
    fontSize: 15,
    marginTop: 20,
  },
  button: {
    backgroundColor: COLOR.primary,
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 25,
  },
  buttonText: {
    fontFamily: FONT.medium,
    color: "white",
  },
});

export default styles;
