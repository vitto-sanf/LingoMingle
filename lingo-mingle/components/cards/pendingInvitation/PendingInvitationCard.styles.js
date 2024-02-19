// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT, COLOR } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: COLOR.lightGrey,
    borderBottomWidth: 1,
    width: 350,
    marginBottom: 10,
  },
  lastItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 350,
    paddingHorizontal: 10,
  },
  leftContainer: {
    flex: 1,
  },
  userName: {
    marginBottom: 10,
    fontFamily: FONT.medium,
    fontSize: 20,
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
  trashIconContainer: {
    justifyContent: "flex-end",
    marginBottom: 10,
  },
});

export default styles;
