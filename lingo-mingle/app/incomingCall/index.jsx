// Imports
import { StyleSheet, View, Pressable, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { onSnapshot, doc } from "firebase/firestore";
import { database } from "../../config/firebase";
import { useContext } from "react";
// Services
import api from "../../services/api";

// Hooks
import useNotification from "../../hooks/useNotification";

// Styles
import styles from "../../styles/IncomingCalls.styles";
import femaleAvatar from "../../assets/images/femaleAvatar.png";
import maleAvatar from "../../assets/images/maleAvatar.png";

//context 
import { DirectCallContext } from "../../contexts/directCallContext";
import { AuthContext } from "../../contexts/AuthContext";

const UserInfoComponent = ({ caller }) => {
  console.log("CALLER", caller);
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={caller?.gender == "M" ? maleAvatar : femaleAvatar}
          style={styles.avatar}
        />
        <Text style={styles.title}>{caller?.username}</Text>
      </View>
    </View>
  );
};

const IncomingCallButtonGroup = ({caller}) => {

  const router = useRouter();
  const {callInfo,setCallInfo}= useContext(DirectCallContext)
  const {user}= useContext(AuthContext)

  const acceptCallHandler = () => {
    api.acceptCall(callInfo.id).then(() => {
      setCallInfo(undefined)
      api.editFriendContacted(user,caller.uuid).then(()=>{
        router.push(`/rooms/${callInfo.roomId}`);
      })
     
    });
  };

  const rejectCallHandler = () => {
    api.rejectCall(callInfo.id).then(() => {
      setCallInfo(undefined);
      router.back()
    });
  };

  return (
    <View style={styles.buttonGroup}>
      <Pressable
        style={[styles.button, styles.rejectButton]}
        onPress={rejectCallHandler}
      >
        <Text style={styles.callButtonText}>Reject</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.acceptButton]}
        onPress={acceptCallHandler}
      >
        <Text style={styles.callButtonText}>Accept</Text>
      </Pressable>
    </View>
  );
};

const IncomingCall = () => {
  const [caller, setCaller] = useState(undefined);
  const notify = useNotification();
  const router = useRouter();
  const {callInfo}= useContext(DirectCallContext)

  useEffect(() => {
    const listener = onSnapshot(
      doc(database, "directCall", callInfo.id),
      (doc) => {
        console.log("Incoming Current Data: ", callInfo.id, doc.data());

        if (doc.data().status == "Rejected") {
          router.back();
        }
      }
    );

    return listener;
  }, []);

  useEffect(() => {
    api
      .getUser(callInfo.callerId)
      .then((data) => {
        setCaller(data);
      })
      .catch((error) => {
        notify.error(error.message);
      });
  }, []);

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <UserInfoComponent caller={caller} />
      <IncomingCallButtonGroup caller={caller}/>
    </View>
  );
};
export default IncomingCall;
