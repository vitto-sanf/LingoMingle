import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../constants";
import styles from "../../styles/CustomCallControls.styles";
import {
  CallControlProps,
  useCall,
  HangUpCallButton,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  ToggleCameraFaceButton,
  ReactionsButton,
  StreamReactionType,
} from "@stream-io/video-react-native-sdk";

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
