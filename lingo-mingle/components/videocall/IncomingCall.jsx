// Imports
import { StyleSheet, View, Pressable, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { onSnapshot, doc } from "firebase/firestore";
import { database } from "../../config/firebase";

// Services
import api from "../../services/api";

// Hooks
import useNotification from "../../hooks/useNotification";

// Styles
import styles from "../../styles/IncomingCalls.styles";
import femaleAvatar from "../../assets/images/femaleAvatar.png";
import maleAvatar from "../../assets/images/maleAvatar.png";

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

const IncomingCallButtonGroup = ({
  setComingCall,
  setCallData,
  callRef,
  callData,
}) => {
  const router = useRouter();
  const acceptCallHandler = () => {
    api.acceptCall(callRef).then(() => {
      setComingCall();
      setCallData();
      router.push(`/rooms/${callData.roomId}`);
    });
  };

  const rejectCallHandler = () => {
    api.rejectCall(callRef).then(() => {
      setComingCall();
      setCallData();
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

const IncomingCall = ({ callData, setCallData, setComingCall }) => {
  const [caller, setCaller] = useState(undefined);
  const notify = useNotification();

  useEffect(() => {
    const listener = onSnapshot(
      doc(database, "directCall", callData.id),
      (doc) => {
        console.log("Incoming Current Data: ", callData.id, doc.data());

        if (doc.data().status == "Rejected") {
          setCallData();
          setComingCall();
        }
      }
    );

    return listener;
  }, []);

  useEffect(() => {
    api
      .getUser(callData.callerId)
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
      <IncomingCallButtonGroup
        setCallData={setCallData}
        setComingCall={setComingCall}
        callRef={callData.id}
        callData={callData}
      />
    </View>
  );
};
export default IncomingCall;
