// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT,COLOR } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: 330,
    alignItems: "left",
    justifyContent:"center",
    padding: 15,
    margin: 10,
    borderColor:'#D9D9D9',
    borderWidth:0.8,
    borderRightWidth:0,
    borderLeftWidth:0,
    backgroundColor: COLOR.lightWhite,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    
  },
  userName: {
    marginBottom: 10,
    fontFamily: FONT.medium,
    fontSize: 20,
  },
  infos: {
    flexDirection: "column",
    paddingRight:30
  },
  buttons:{
    flexDirection:"column",
    paddingLeft:30
  },
  container2:{
    flexDirection:"row",
  },
  pressableEdit:{
    alignItems:"center",
    justifyContent:"center",
    paddingRight:10,
    backgroundColor:COLOR.orange,
    margin:5,
    width:60,
    height:20,
    borderRadius:20
  },
  pressableCancel:{
    alignItems:"center",
    justifyContent:"center",
    paddingRight:10,
    backgroundColor:COLOR.red,
    margin:5,
    width:60,
    height:20,
    borderRadius:20
  },
  textInfo:{
    
    flexDirection:"row",
    paddingBottom:5
  },
  textIcons:{
    flexDirection:"row"
    
  },
  icons:{
    padding:20
  },
  textInfo: {
    flexDirection: 'column',
    paddingBottom: 5, // Adjust as needed
  },
  textIcons: {
    flexDirection: 'row',
    alignItems: 'center', // Adjust as needed
    marginBottom: 5, // Adjust as needed
  },
  iconText: {
    marginLeft: 8, // Adjust margin as needed
  },
  iconStyle: {
    marginRight: 8, // Padding between icon and text
  }
});

export default styles;