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
        
       
      }

})
export default styles;