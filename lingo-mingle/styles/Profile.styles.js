// Imports
import { StyleSheet } from "react-native";

// Constants
import { COLOR, FONT } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  userInfoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerBackground: {
    width: "100%",
    height: "55%",
    backgroundColor: COLOR.primary,
    position: "absolute",
    top: 0,
    left: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImage: {
    borderRadius: 100,
    resizeMode: "cover",
    marginTop: 100,
  },
  username: {
    fontSize: 30,
    fontFamily: FONT.bold,
    marginVertical: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageContainer: {
    marginHorizontal: 15,
  },
  languageHeaderText: {
    fontSize: 18,
    fontFamily: FONT.medium,
    marginTop: 20,
    marginBottom: 10,
  },
  languageInfoText: {
    fontFamily: FONT.regular,
    marginLeft: 10,
  },
});

export default styles;
