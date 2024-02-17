// Imports
import { StyleSheet, View, Pressable, Image, Text } from "react-native";
import React, { useContext, useEffect ,useState} from "react";
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
  const {setContactedUser,setCallInfo}= useContext(DirectCallContext)
  const hangupCallHandler = () => {
    api.rejectCall(callRef).then(() => {
      setCallInfo(undefined);
      setContactedUser(undefined)
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
  const { contactedUser, callInfo } = useContext(DirectCallContext);
  const [callStatus, setCallStatus] = useState(null);

  useEffect(() => {
    if (!callInfo) return;

    const unsubscribe = onSnapshot(doc(database, "directCall", callInfo), (doc) => {
      if (!doc.exists()) {
        console.log("Document does not exist");
        return;
      }

      const callData = doc.data();
      console.log("Outgoing Current Data: ", callData);

      setCallStatus(callData.status); // Aggiorna lo stato della chiamata

      if (callData.status === "Rejected") {
        console.log("rejected")
        router.back();
      } else if (callData.status === "Accepted") {
        router.push(`/rooms/${callData.roomId}`);
      }
    }, (error) => {
      console.error("Error while listening to directCall document:", error);
    });

    return () => {
      unsubscribe();
    };
  }, [callInfo]);

  useEffect(() => {
    // Utilizza lo stato della chiamata dal contesto
    if (callStatus === "Rejected") {
      console.log("rejected")
      router.back();
    } else if (callStatus === "Accepted") {
      router.push(`/rooms/${callData.roomId}`);
    }
  }, [callStatus]);

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
