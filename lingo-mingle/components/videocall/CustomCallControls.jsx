import { View, Text, Pressable } from 'react-native'
import React, { useState, useEffect} from 'react'
import { StyleSheet } from "react-native";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import {COLOR} from "../../constants";
import {
  CallControlProps,
  useCall,
  HangUpCallButton,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  ToggleCameraFaceButton,
  ReactionsButton,
  StreamReactionType,
} from '@stream-io/video-react-native-sdk';

const CustomCallControls = (props) => {
  const call = useCall();
  

  
  
  
  return (
    <View style={styles.customCallControlsContainer}>
      <ToggleAudioPublishingButton onPressHandler={() => call?.microphone.toggle()} />
      <ToggleVideoPublishingButton onPressHandler={() => call?.camera.toggle()} />
      <Pressable style={styles.gamesButton} onPress={()=>{
        props.toggleModal();
        }} >
        <View style={styles.gamesButtonView}>
          <FA5Icon name="dice-four" color={COLOR.black} size={20} />
        </View>
      </Pressable>
      <ToggleCameraFaceButton onPressHandler={() => call?.camera.flip()} />
      <HangUpCallButton onHangupCallHandler={props.onHangupCallHandler} />
      
    </View>
  );
};

const styles = StyleSheet.create({
customCallControlsContainer:{
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"space-around",
  right: 0,
  top: 0,
  gap: 10,
  marginHorizontal: 0,
  paddingVertical: 10,
  paddingHorizontal: 10,
  backgroundColor: '#272b2e',
  borderRadius: 0,
  borderColor: '#1d1e23',
  borderWidth: 1,
  zIndex: 5
},

gamesButton:{
  backgroundColor: COLOR.white,
  borderRadius:100,
  width:50,
  height:50
},

gamesButtonPressed:{
  backgroundColor:"#141414",
  borderRadius:100,
  width:50,
  height:50
},

gamesButtonView:{
  flex:1,
  alignItems:"center",
  justifyContent:"center"
}
});

export default CustomCallControls