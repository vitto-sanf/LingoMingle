// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT, COLOR } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    borderBottomColor: COLOR.lightGrey,
    borderBottomWidth: 1,
    width: 350,
    marginBottom: 10,
  },
  lastItemContainer: {
    width: 350,
  },
  userName: {
    marginBottom: 10,
    fontFamily: FONT.medium,
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meetingContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  iconText: {
    fontFamily: FONT.regular,
    fontSize: 15,
  },
});

export default styles;
