// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT,COLOR } from "../../../constants";
import { isEmpty } from "@firebase/util";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    maxHeight: "50%",
    maxWidth: "100%",
  },
  modalView: {
    margin: 20,
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
    width: "90%",
    height: "60%",
  },
  buttons:{
    flexDirection:"row",
    padding:20,
    justifyContent:"space-around"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  pressable:{
    paddingRight:30,
    paddingLeft:30
  },
});

  export default styles;