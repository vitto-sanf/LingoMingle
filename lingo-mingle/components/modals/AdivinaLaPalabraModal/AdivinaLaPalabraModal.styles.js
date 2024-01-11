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
    maxHeight: "100%",
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
    width: "80%",
    height: "60%",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 5,
    width:"70%",
    height:"15%",
    flex:0,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  buttonBack: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 5,
    width:"35%",
    height:"70%",
    flex:0,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  buttonSend: {
    backgroundColor: COLOR.primary,
  },
  buttonClose: {
    backgroundColor: COLOR.red,
  },
  buttonCancel: {
    backgroundColor: COLOR.white,
    borderColor: "#D9D9D9",
    borderWidth: 1,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize:10,
    textAlign: "center",
    paddingLeft:20,
    paddingRight:20
  },
  cancelTextStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    height: 40,
    width: "100%",
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOR.lightGrey,
    padding: 10,
  },
  userNameInput: {
    height: 40,
    width: "85%",
    margin: 12,
    borderWidth: 0,
    borderRadius: 10,
    borderColor: COLOR.lightGrey,
    padding: 8,
  },
  dateTimeInput: {
    height: 40,
    width: "45%",
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOR.lightGrey,
    paddingLeft:15,
    paddingTop:3
  },
  dateTimeInputText: {
    color:COLOR.black
  },
  
  formview: {
    flex: 1,
    //alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  searchContainer: {
    height: 40,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    borderColor: COLOR.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    height: 40,
    margin: 12,
    padding: 8,
  },
  dropdown:{
    alignItems:"left",
    justifyContent:"center",
    backgroundColor:COLOR.white,
    flex:1,
    flexDirection:"column",
    borderWidth:1,
    borderColor:COLOR.lightGrey,
    width:"100%",
    height:"100%"
  },
  dropdownEmpty:{
    backgroundColor:COLOR.white,
    flex:1,
    flexDirection:"column",
  },
  dropdownRow:{
    textAlign:"center",
    marginTop:2,
   
    
  },
  friendStyle:{
    color:COLOR.black,
    
  },
  errros:{
    color:COLOR.red,
    fontWeight:"bold"
  },
  dateTimeErrors:{
    color:COLOR.red,
    fontWeight:"bold",
    marginTop: 7
  },
  column: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headContainer:{
    alignItems: 'center',
    flexDirection:"row"
  }
});

  export default styles;