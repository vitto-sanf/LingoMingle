// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: 140,
    alignItems: "center",
    padding: 15,
    margin: 10,
    elevation: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: 10,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 40,
  },
  userName: {
    marginTop: 5,
    marginBottom: 15,
    fontFamily: FONT.medium,
    fontSize: 22,
  },
  actions: {
    flexDirection: "row",
  },
  sendFriendRequestBtn: {
    marginRight: 25,
  },
});

export default styles;
