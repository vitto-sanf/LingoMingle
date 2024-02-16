// Imports
import { StyleSheet, View, Pressable, Image, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { database } from "../../config/firebase";
import { useRouter } from "expo-router";

// Services
import api from "../../services/api";

// Styles
import styles from "../../styles/OutgoingCalls.styles";
import femaleAvatar from "../../assets/images/femaleAvatar.png";
import maleAvatar from "../../assets/images/maleAvatar.png";

//context 
import { DirectCallContext } from "../../contexts/directCallContext";

const UserInfoComponent = ({ contactedUser }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={contactedUser.gender == "M" ? maleAvatar : femaleAvatar}
          style={styles.avatar}
        />
        <Text style={styles.title}>{contactedUser.username}</Text>
      </View>
    </View>
  );
};

const OutgoingCallButtonGroup = ({callRef}) => {
  const router = useRouter();

  const hangupCallHandler = () => {
    api.rejectCall(callRef).then(() => {
      router.back()
    });
  };

  return (
    <View style={styles.buttonGroup}>
      <Pressable
        style={[styles.button, styles.hangupButton]}
        onPress={hangupCallHandler}
      >
        <Text style={styles.callButtonText}>Hang up</Text>
      </Pressable>
    </View>
  );
};

const OutgoingCall = () => {
  const router = useRouter();
  const {contactedUser,callInfo}= useContext(DirectCallContext)

  useEffect(() => {
    const listener = onSnapshot(doc(database, "directCall", callInfo), (doc) => {
      console.log("Outgoing Current Data: ", callInfo, doc.data());

      if (doc.data().status == "Rejected") {
        router.back();
      } else if (doc.data().status == "Accepted") {
        router.push(`/rooms/${doc.data().roomId}`);
      }
    });

    return listener;
  }, []);

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <UserInfoComponent contactedUser={contactedUser} />
      <OutgoingCallButtonGroup
      
        callRef={callInfo}
       
      />
    </View>
  );
};
export default OutgoingCall;
