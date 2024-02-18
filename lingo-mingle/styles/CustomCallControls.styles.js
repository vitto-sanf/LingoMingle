// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT, COLOR } from "../constants";

const styles = StyleSheet.create({
  customCallControlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    right: 0,
    top: 0,
    gap: 10,
    marginHorizontal: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#272b2e",
    borderRadius: 0,
    borderColor: "#1d1e23",
    borderWidth: 1,
    zIndex: 5,
  },

  gamesButton: {
    backgroundColor: COLOR.white,
    borderRadius: 100,
    width: 50,
    height: 50,
  },

  gamesButtonPressed: {
    backgroundColor: COLOR.gray,
    borderRadius: 100,
    width: 50,
    height: 50,
  },

  gamesButtonView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
