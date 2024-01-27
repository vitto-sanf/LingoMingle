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
    // marginTop: 0,
    // maxHeight: "100%",
    // maxWidth: "100%",
  },
  modalView: {
    // margin: 20,
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
    // height: "82%",
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    // elevation: 2,
    // margin: 5,
  },
  buttonSend: {
    backgroundColor: COLOR.primary,
  },
  buttonCancel: {
    backgroundColor: COLOR.lightGrey,
    // borderColor: "#D9D9D9",
    // borderWidth: 1,
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
    marginBottom: 15,
    // textAlign: "center",
    fontFamily: FONT.bold,
    fontSize: 20,
  },
  input: {
    height: 40,
    width: "100%",
    // margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOR.lightGrey,
    padding: 10,
  },
  userNameInput: {
    height: 40,
    width: "100%",
    // margin: 12,
    // borderWidth: 0,
    borderRadius: 10,
    borderColor: COLOR.lightGrey,
    // padding: 8,
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
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
    paddingLeft: 10,
    paddingTop: 5,
  },
  dateTimeInputText: {
    color: COLOR.black,
  },
  formview: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  searchContainer: {
    height: 40,
    flexDirection: "row",
    // alignSelf: "center",
    alignItems: "center",
    borderColor: COLOR.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
    // width: "100%",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    // margin: 12,
    // padding: 8,
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
