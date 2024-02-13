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
  title: {
    fontFamily: FONT.bold,
    fontSize: 32,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    borderColor: COLOR.gray,
    borderWidth: 0.7,
    borderRadius: 20,
    width: "80%",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    fontSize: 16,
    color: COLOR.black,
    marginLeft: 10,
    width: "100%",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 0.7,
  },
  textItem: {
    marginLeft: 10,
    fontSize: 22,
    fontFamily: FONT.medium,
  },
  image: {
    borderRadius: 100,
    resizeMode: "cover",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  // Modal style
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "70%",
    backgroundColor: COLOR.white,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: FONT.medium,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    borderRadius: 15,
    paddingVertical: 10,
    elevation: 2,
    flex: 1,
  },
  buttonText: {
    fontFamily: FONT.regular,
    fontSize: 16,
    color: COLOR.white,
    textAlign: "center",
  },
});
export default styles;
