// Imports
import { View } from "react-native";
import React, { useEffect } from "react";
import {
  useCall,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  ToggleCameraFaceButton,
} from "@stream-io/video-react-native-sdk";

// Styles
import styles from "../../styles/CustomCallControlsAudioVideo.styles";

const CustomCallControlsAudioVideo = ({ isChatOpen,activateModalTimer, }) => {
  const call = useCall();


  return (
    !isChatOpen &&
    call && (
      <View style={styles.customCallControlsContainer}>
        <ToggleAudioPublishingButton
          onPressHandler={() => {
            if(call?.microphone?.state?.status==="enabled")
            {
          activateModalTimer();}
          call?.microphone.toggle();
          }
          }
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
