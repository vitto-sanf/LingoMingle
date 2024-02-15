// Imports
import { StyleSheet } from "react-native";

// Styles
import { FONT, COLOR } from "../../../constants";

const styles = StyleSheet.create({
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
    height: "35%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 2,
  },
  modalHeaderText: {
    fontFamily: FONT.bold,
    fontSize: 20,
  },
  gameOptionsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  gameQuestion: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  gameQuestionText: {
    fontFamily: FONT.regular,
    fontSize: 16,
  },
  gameOptionsColumn: {
    marginTop: 15,
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
  },
  nextButton: {
    flexDirection: "row",
    backgroundColor: COLOR.orange,
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    fontFamily: FONT.bold,
    fontSize: 16,
    textAlign: "center",
    marginLeft: 5,
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
  instructions: {
    fontFamily: FONT.regular,
    fontSize: 16,
  },
  haveFunText: {
    fontFamily: FONT.bold,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 18,
  },
});

export default styles;
