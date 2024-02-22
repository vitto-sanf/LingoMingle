// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT, COLOR } from "../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.lightWhite,
    flex: 1,
    paddingVertical: 10,
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
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: FONT.medium,
    fontSize: 20,
  },
  sectionContainer: {
    marginTop: 20,
    marginLeft: 5,
  },
  button: {
    position: "absolute",
    bottom: 0,
    right: 10,
    margin: 0,
    backgroundColor: COLOR.lightWhite,
    borderRadius: 100,
  },
  
  topNav: {
    paddingTop: 10,
    paddingBottom: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  topNavLinks: {
    width: "33%",
    textAlign: "center",
  },
  topNavLinkText: {
    textAlign: "center",
    fontFamily: FONT.medium,
    fontSize: 16,
    marginBottom: 4,
  },
  topNavLinksSelected: {
    width: "33%",
    borderBottomColor: COLOR.primary,
    borderBottomWidth: 2,
  },
});

export default styles;
