// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT, COLOR } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.lightWhite,
    padding: 8,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    gap:10,
    backgroundColor:COLOR.white,
    alignItems: "center"
  },
  messageInput: {
    flex: 1,
    borderColor: COLOR.gray,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    marginTop:10,
    marginHorizontal:10,
    borderRadius: 10,
    maxWidth: '80%'
    
  },
  userMessageContainer: {
    backgroundColor: COLOR.green,
    alignSelf: 'flex-end'
    
  },
  otherMessageContainer: {
    backgroundColor: COLOR.lightBlue,
    alignSelf: 'flex-start'
  },
  messageText: {
    fontFamily: FONT.regular,
    fontSize:16
  },
  time :{
    fontFamily: FONT.regular,
    fontSize:12,
    color: '#777',
    alignSelf: 'flex-end'
  },
  imageUser:{
    width: 53, 
    height: 53 ,
    
  },
  imageOther:{
    width: 53, 
    height: 53 ,
    
  },
  sendButton:{
    width:40,
    height:40,
    borderRadius: 100,
    backgroundColor:COLOR.primary,
    padding:7,
    alignItems:'center'
  }
});
export default styles;
