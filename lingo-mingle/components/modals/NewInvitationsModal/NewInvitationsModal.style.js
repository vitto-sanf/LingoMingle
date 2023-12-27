// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT,COLOR } from "../../../constants";

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
    },
    buttonSend: {
      backgroundColor: COLOR.primary,
    },
    buttonCancel: {
      backgroundColor: COLOR.white,
      borderColor:'#D9D9D9',
      borderWidth: 1
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cancelTextStyle: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: COLOR.lightGrey,
      padding: 10,
    },
    formview :{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"row",
      maxHeight:"40%",
      maxWidth:"40%"
      
    }
  });

  export default styles;