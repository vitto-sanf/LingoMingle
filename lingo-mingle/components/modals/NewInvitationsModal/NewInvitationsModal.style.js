// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT,COLOR } from "../../../constants";

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 80,
      maxHeight:"60%",
      maxWidth:"100%"
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width:"80%",
      height:"80%"
    },
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      margin:5
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
      fontWeight:"bold",
      fontSize:20
    },
    input: {
      height: 40,
      width:"100%",
      margin: 12,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: COLOR.lightGrey,
      padding: 10,
    },
    dateTimeInput:
    {
      height: 40,
      width:"40%",
      margin: 12,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: COLOR.lightGrey,
      padding: 10,
    },
    formview :{
      flex:1,
      alignItems:"center",
      justifyContent:"space-between",
      flexDirection:"row",
      
      
    }
  });

  export default styles;