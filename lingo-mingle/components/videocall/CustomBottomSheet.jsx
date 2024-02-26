// Imports
import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, Text, KeyboardAvoidingView, Platform } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

// Components
import ChatView from "./ChatView";

// Styles
import { COLOR, FONT } from "../../constants";

// Custom Bottom Sheet to display the chat
const CustomBottomSheet = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ["90%"], []);

  const renderBackDrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const handleChange = (e) => {
    if (e === -1) props.setIsChatOpen(false);
    else props.setIsChatOpen(true);
  };

  return (
    <BottomSheet
      index={-1}
      snapPoints={snapPoints}
      ref={ref}
      enablePanDownToClose
      handleIndicatorStyle={{ backgroundColor: COLOR.primary }}
      backdropComponent={renderBackDrop}
      backgroundStyle={{ backgroundColor: "#fff" }}
      onChange={handleChange}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.containerHeadline}>Chat</Text>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={120}
          style={{ flex: 1 }}
        > */}
        <ChatView channelId={props.channelId} />
        {/* </KeyboardAvoidingView> */}
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  containerHeadline: {
    fontSize: 24,
    fontFamily: FONT.bold,
    padding: 10,
    textAlign: "center",
  },
});

export default CustomBottomSheet;
