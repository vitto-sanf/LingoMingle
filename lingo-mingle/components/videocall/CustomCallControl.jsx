// Imports
import { View } from "react-native";
import React from "react";
import styles from "../../styles/CustomCallControls.styles";
import {
  useCall,
  HangUpCallButton,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  ToggleCameraFaceButton,
  ChatButton,
} from "@stream-io/video-react-native-sdk";

const CustomCallControls = (props) => {
  const call = useCall();

  return (
    <View style={styles.customCallControlsContainer}>
      <ToggleAudioPublishingButton
        onPressHandler={() => call?.microphone.toggle()}
      />
      <ToggleVideoPublishingButton
        onPressHandler={() => call?.camera.toggle()}
      />
      <ChatButton onPressHandler={props.onChatOpenHandler} />
      <ToggleCameraFaceButton onPressHandler={() => call?.camera.flip()} />
      <HangUpCallButton onHangupCallHandler={props.onHangupCallHandler} />
    </View>
  );
};

export default CustomCallControls;
