// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT, COLOR } from "../../../constants";

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
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
    height: "35%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 4,
  },
  modalHeaderText: {
    fontFamily: FONT.bold,
    fontSize: 20,
  },
  gameIcon: {
    marginVertical: 25,
  },
  gameOptionsContainer: {
    flex: 1,
    flexDirection: "column",
  },
  gameQuestion :{
    marginTop:10,
    alignItems: "center",
    flexDirection: "row",
  },
  gameOptionsColumn: {
    marginTop:10,
    alignItems: "center",
  },
  instructions:{
    textAlign:"center",
    fontFamily:FONT.regular,
    fontSize:17
  },
  playButton:{
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: COLOR.primary,
   
  },
  playButtonText:{
    fontFamily: FONT.bold,
    color:COLOR.white
  },
  next:{
    marginTop:5,
    position:"fixed",
    alignItems: "flex-end",
    
  },
  gameOptionButton: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "75%",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 0.5,
  },
  gameOptionTextButton: {
    fontFamily: FONT.medium,
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default styles;
