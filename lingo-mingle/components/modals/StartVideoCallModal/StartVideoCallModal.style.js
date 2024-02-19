// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT } from "../../../constants";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    height: "22%",
  },
  modalText: {
    fontSize: 18,
    fontFamily: FONT.bold,
    textAlign: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  button: {
    borderRadius: 100,
    width: "46%",
    overflow: "hidden",
    margin:10
  },
  buttonText: {
    textAlign: "center",
    fontFamily: FONT.medium,
    fontSize: 16,
    padding: 10,
  },
});

export default styles;
