// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT, COLOR } from "../constants";
import { CollectionReference } from "firebase/firestore";

const styles = StyleSheet.create({

    container: {
        backgroundColor: COLOR.lightWhite,
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        justifyContent: "center",
        /* alignItems: 'center', */
      },
      title: {
        fontFamily: FONT.bold,
        fontSize: 32,
        textAlign: "center",
      },
      sectionContainer: {
        marginTop: 30,
        alignItems: 'center',
        
      },
      searchContainer: {
        flex: 1,
        flexDirection: 'row', // Orizzontale per posizionare l'input e il pulsante su una riga
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
      },
      searchInput: { 
        padding: 5,
        fontSize: 16,
        borderColor: COLOR.gray,
        borderWidth: 1,
        borderRadius: 5,
        width:"70%",
        color: COLOR.black
      },
      friendsContainer:{
        marginTop: 10,
        borderBottomColor: COLOR.gray,
        borderBottomWidth:1
        
      }, 
      itemContainer :{
        flexDirection: 'row',
        alignItems:'center',
        padding :10,
        borderTopColor: COLOR.gray,
        borderTopWidth: 1,
      },
      textItem : {
        marginLeft: 15 ,
        fontSize: 25,
        fontFamily:FONT.medium
      },
       image :{
        borderRadius: 100,
        resizeMode: "cover",
      }, 
      iconsContainer:{
        flexDirection: "row", 
        justifyContent: "flex-end", 
        flex: 1
      },
      //modal style 
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: COLOR.white,
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
     cancellButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: COLOR.red,
        width: 80 ,
        alignItems:'center',
        marginLeft:20
      
      },
      backButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: COLOR.secondary,
        width: 80, 
        alignItems:'center',
        marginRight:20
      },
      buttontext:{
        fontFamily: FONT.medium,
        fontSize: 17, 
        color: COLOR.WHITE
      },
      
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: FONT.medium,
        fontSize:16,
      },

})
export default styles;