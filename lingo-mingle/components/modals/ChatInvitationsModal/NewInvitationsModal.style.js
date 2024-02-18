// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT, COLOR } from "../../../constants";
import { isEmpty } from "@firebase/util";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  modalText: {
    fontFamily: FONT.bold,
    fontSize: 20,
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
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOR.lightGrey,
    padding: 10,
  },
  namePicker: {
    width: "100%",
    height: 40,
    borderColor: COLOR.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  userNameInput: {
    height: 40,
    width: "100%",
    borderRadius: 10,
    borderColor: COLOR.lightGrey,
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
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  searchContainer: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderColor: COLOR.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  dropdown: {
    alignItems: "left",
    justifyContent: "center",
    backgroundColor: COLOR.white,
    flex: 1,
    flexDirection: "column",
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    width: "100%",
    height: "100%",
  },
  dropdownEmpty: {
    backgroundColor: COLOR.white,
    flex: 1,
    flexDirection: "column",
  },
  dropdownRow: {
    textAlign: "center",
    marginTop: 2,
  },
  friendStyle: {
    color: COLOR.black,
  },
  errors: {
    width: "100%",
    color: COLOR.red,
    fontFamily: FONT.regular,
    textAlign: "left",
    marginVertical: 5,
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
