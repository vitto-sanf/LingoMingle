// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT, COLOR } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "75%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  modalText: {
    textAlign: "center",
    fontFamily: FONT.bold,
    fontSize: 20,
  },
  closeButtonText: {
    fontFamily: FONT.bold,
    fontSize: 20,
  },
  button: {
    width: "90%",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLOR.primary,
  },
  buttonText: {
    color: "white",
    fontFamily: FONT.bold,
    fontSize: 17,
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
  },
});

export default styles;
