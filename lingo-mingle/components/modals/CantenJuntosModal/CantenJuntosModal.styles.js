// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT, COLOR } from "../../../constants";

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: COLOR.gray,
    borderRadius: 20,
    paddingLeft: 15,
    marginVertical: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "75%",
    height: "50%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 2,
  },
  modalHeaderText: {
    fontFamily: FONT.bold,
    fontSize: 20,
  },
  gameIcon: {
    marginVertical: 25,
  },
  gameOptionsContainer: {
    flex: 1,
    flexDirection: "column",
  },
  gameOptionsColumn: {
    alignItems: "center",
  },
  gameOptionButton: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "75%",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 0.5,
  },
  gameOptionTextButton: {
    fontFamily: FONT.medium,
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  playButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: COLOR.primary,
  },
  playButtonText: {
    fontFamily: FONT.bold,
    color: COLOR.white,
    fontSize: 15,
  },
  WinText: {
    fontFamily: FONT.bold,
    color: COLOR.red,
  },
  instructions: {
    fontFamily: FONT.regular,
    fontSize: 17,
    marginTop: 15,
    marginBottom: 10,
  },
  haveFunText: {
    fontFamily: FONT.bold,
    marginBottom: 30,
    fontSize: 18,
  },
  songName: {
    fontFamily: FONT.bold,
    fontSize: 18,
    marginVertical: 12,
  },
  songText: {
    fontFamily: FONT.regular,
    fontSize: 16,
  },
});

export default styles;
