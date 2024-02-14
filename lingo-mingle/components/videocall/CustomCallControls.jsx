// Imports
import { View, Pressable } from "react-native";
import React, { useState } from "react";
import {
  useCall,
  HangUpCallButton,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  ToggleCameraFaceButton,
  ChatButton,
} from "@stream-io/video-react-native-sdk";

// Styles
import styles from "../../styles/CustomCallControls.styles";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../constants";

const CustomCallControls = (props) => {
  const call = useCall();
  const [isPressed, setIsPressed] = useState(false);
  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  return (
    <View style={styles.customCallControlsContainer}>
      <ToggleAudioPublishingButton
        onPressHandler={() => call?.microphone.toggle()}
      />
      <ToggleVideoPublishingButton
        onPressHandler={() => call?.camera.toggle()}
      />
      <ChatButton onPressHandler={props.onChatOpenHandler} />
      <Pressable
        style={isPressed ? styles.gamesButtonPressed : styles.gamesButton}
        onPress={() => {
          {
            handlePress;
          }
          props.toggleModal();
        }}
      >
        <View style={styles.gamesButtonView}>
          <FA5Icon name="dice-four" color={COLOR.black} size={20} />
        </View>
      </Pressable>
      <ToggleCameraFaceButton onPressHandler={() => call?.camera.flip()} />
      <HangUpCallButton onHangupCallHandler={props.onHangupCallHandler} />
    </View>
  );
};

export default CustomCallControls;
