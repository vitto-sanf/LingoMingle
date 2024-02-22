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
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: 32,
    textAlign: "center",
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  notificationCounter: {
    fontFamily: FONT.bold,
    fontSize: 18
  },
  notificationMenu: {
    position: 'absolute',
    top: '50%', 
    right: 0,
    left: 0,
    // backgroundColor: 'white',
    padding: 20,
    zIndex: 1
  },
  noInfoText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: FONT.medium,
    fontSize: 40,
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
    marginBottom: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: COLOR.primary,
    height: 60,
    width: 280,
    alignSelf: "center",
  },
  buttonTitle: {
    fontFamily: FONT.bold,
    fontSize: 20,
    color: COLOR.white,
  },
  modalText: {
    fontFamily: FONT.medium,
    fontSize: 16
  }
});

export default styles;
