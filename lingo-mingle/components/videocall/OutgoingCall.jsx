import { StyleSheet, View, Pressable, Image, Text } from "react-native";
import React, { useCallback, useContext, useEffect } from "react";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { database } from "../../config/firebase";
import { useRouter } from "expo-router";

//images
import femaleAvatar from "../../assets/images/femaleAvatar.png";
import maleAvatar from "../../assets/images/maleAvatar.png";
//styles
import styles from "../../styles/OutgoingCalls.styles";
//api
import api from "../../services/api";
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

const OutgoingCallButtonGroup = ({ setIsCalling, callRef,setCallRef }) => {
  const hangupCallHandler = () => {
    api.rejectCall(callRef).then(() => {
      setIsCalling();
      setCallRef();
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

const OutgoingCall = ({ contactedUser, setIsCalling, callRef,setCallRef }) => {
    const router = useRouter();

  useEffect(() => {
    const listener = onSnapshot(doc(database, "directCall", callRef), (doc) => {
      console.log("Outgoing Current Data: ", callRef,doc.data());

      if (doc.data().status == "Rejected") {
        setIsCalling();
        setCallRef();
      }else if (doc.data().status == "Accepted"){
        setIsCalling();
        setCallRef();
        router.push(`/rooms/${doc.data().roomId}`);
      }
    });

    return listener;
  }, []);

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <UserInfoComponent contactedUser={contactedUser} />
      <OutgoingCallButtonGroup setIsCalling={setIsCalling} callRef={callRef} setCallRef={setCallRef} />
    </View>
  );
};
export default OutgoingCall;
