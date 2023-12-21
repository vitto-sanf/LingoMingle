// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT,COLOR } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: 500,
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
    paddingRight:90
  },
  buttons:{
    flexDirection:"row"
  },
  container2:{
    flexDirection:"row",
  },
  pressable:{
    paddingRight:10
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
  }
});

export default styles;
