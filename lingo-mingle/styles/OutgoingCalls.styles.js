// Imports
import { StyleSheet } from "react-native";

// Styles
import { COLOR } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272A30",
    justifyContent: "space-evenly",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "center",
    marginBottom: 50,
  },
  hangupButton: {
    backgroundColor: "#FF3742",
  },
  callButtonText: {
    color: "white",
    textAlign: "center",
  },
  userInfo: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "white",
    marginVertical: 20,
    textAlign: "center",
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: COLOR.white,
  },
});
export default styles;
