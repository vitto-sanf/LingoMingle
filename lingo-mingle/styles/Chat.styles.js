// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT, COLOR } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
    borderTopWidth: 1,
    borderColor: COLOR.gray,
    alignItems: "center",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  messageInput: {
    flex: 1,
    borderColor: COLOR.gray,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  messageSystemContainer: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  systemMessageContainer: {
    backgroundColor: COLOR.gray2,
    alignSelf: "flex-start",
    maxWidth: "85%",
  },
  userMessageContainer: {
    backgroundColor: "#3498DB",
    alignSelf: "flex-end",
    maxWidth: "60%",
  },
  otherMessageContainer: {
    backgroundColor: "#F1EFEF",
    alignSelf: "flex-start",
  },
  messageText: {
    fontFamily: FONT.regular,
    fontSize: 16,
  },
  time: {
    fontFamily: FONT.regular,
    fontSize: 12,
    alignSelf: "flex-end",
  },
  imageUser: {
    width: 53,
    height: 53,
    marginRight: 5,
  },
  imageOther: {
    width: 53,
    height: 53,
    marginLeft: 5,
  },
  sendButton: {
    borderRadius: 100,
    padding: 10,
  },
  editButton: {
    flexDirection: "row",
    borderWidth: 1,
    padding: 5,
    borderRadius: 15,
  },
  dateSeparatorContainer: {
    alignSelf: "center",
    marginVertical: 10,
    padding: 5,
    backgroundColor: COLOR.gray,
    borderRadius: 5,
  },
  dateSeparatorText: {
    color: COLOR.white,
    fontFamily: FONT.regular,
  },
  icon: {
    marginRight: 5,
  },
});
export default styles;
