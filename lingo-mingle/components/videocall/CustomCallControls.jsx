// Imports
import { View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
  HangUpCallButton,
  ChatButton,
} from "@stream-io/video-react-native-sdk";

// Styles
import styles from "../../styles/CustomCallControls.styles";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../constants";

const CustomCallControls = ({ modalVisible, ...props }) => {
  const [isPressed, setIsPressed] = useState(false);
  const handlePress = () => {
    setIsPressed(!isPressed);
  };
  console.log(modalVisible);
  return (
    <View style={styles.customCallControlsContainer}>
      <ChatButton onPressHandler={props.onChatOpenHandler} />
      <Pressable
        style={modalVisible ? styles.gamesButtonPressed : styles.gamesButton}
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
      <HangUpCallButton onHangupCallHandler={props.onHangupCallHandler} />
    </View>
  );
};

export default CustomCallControls;
