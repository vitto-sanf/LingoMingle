// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT, COLOR } from "../../../constants";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  buttonSend: {
    backgroundColor: COLOR.primary,
  },
  buttonCancel: {
    backgroundColor: COLOR.lightGrey,
  },
  textStyle: {
    color: "white",
    fontFamily: FONT.bold,
    textAlign: "center",
  },
  cancelTextStyle: {
    color: "black",
    fontFamily: FONT.bold,
    textAlign: "center",
  },
  modalText: {
    fontFamily: FONT.bold,
    fontSize: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOR.lightGrey,
    padding: 10,
  },
  dateTimeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  dateTimeInput: {
    height: 40,
    width: "48%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOR.lightGrey,
    paddingLeft: 10,
    paddingTop: 5,
  },
  dateTimeInputText: {
    color: COLOR.black,
  },
  formview: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  errros: {
    color: COLOR.red,
    fontFamily: FONT.bold,
  },
  dateTimeErrors: {
    color: COLOR.red,
    fontFamily: FONT.bold,
    marginTop: 7,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
});

export default styles;
