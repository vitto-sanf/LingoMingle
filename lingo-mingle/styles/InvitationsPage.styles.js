// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT, COLOR } from "../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.lightWhite,
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: 32,
    textAlign: "center",
  },
  noInfoText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONT.medium,
    fontSize: 40
  },
  sectionContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontFamily: FONT.medium,
    fontSize: 18,
    marginTop: 6,
    marginLeft: 10,
  },
  button: {
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius:200,
    elevation: 3,
    backgroundColor: COLOR.primary,
    height: 60,
    width: 60,
  },

  buttonTitle: {
    fontFamily: FONT.bold,
    fontSize: 15,
    color: COLOR.white,
  },
  buttonView:{
    flexDirection: "column",
    flex: 1,
    width:360,
    paddingVertical: 2,
    paddingHorizontal: 2,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  topNav:{
    paddingTop:10,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row"
  },
  topNavLinks:{
    width:190,
    textAlign:"center",
    padding:10,
    borderColor:'#D9D9D9',
    borderWidth:1
  },
  topNavLinksSelected:{
    width:190,
    textAlign:"center",
    padding:10,
    borderColor:'#D9D9D9',
    backgroundColor:'#D9D9D9'
  }
});

export default styles;