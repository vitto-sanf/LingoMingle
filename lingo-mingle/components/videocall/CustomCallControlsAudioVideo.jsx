// Imports
import { View } from "react-native";
import React from "react";
import {
  useCall,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  ToggleCameraFaceButton,
} from "@stream-io/video-react-native-sdk";

// Styles
import styles from "../../styles/CustomCallControlsAudioVideo.styles";

const CustomCallControlsAudioVideo = ({ isChatOpen }) => {
  const call = useCall();

  return (
    !isChatOpen &&
    call && (
      <View style={styles.customCallControlsContainer}>
        <ToggleAudioPublishingButton
          onPressHandler={() => call?.microphone.toggle()}
        />
        <ToggleVideoPublishingButton
          onPressHandler={() => call?.camera.toggle()}
        />
        <ToggleCameraFaceButton onPressHandler={() => call?.camera.flip()} />
      </View>
    )
  );
};

export default CustomCallControlsAudioVideo;
