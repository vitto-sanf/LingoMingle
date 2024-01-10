import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Share,
  Text,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import GamesModal from "../../components/modals/GamesModal/GamesModal";
import Spinner from "react-native-loading-spinner-overlay";
import {
  Call,
  CallContent,
  StreamCall,
  StreamVideoEvent,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import Toast from "react-native-toast-message";

import { Ionicons } from "@expo/vector-icons";

import CustomBottomSheet from "../../components/videocall/CustomBottomSheet";
import ChatView from "../../components/videocall/ChatView";

import { AuthContext } from "../../contexts/AuthContext";
import CustomCallControls from "../../components/videocall/CustomCallControls";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Room = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user, token } = useContext(AuthContext);
  const router = useRouter();
  const navigation = useNavigation();

  const [call, setCall] = useState(null);
  const client = useStreamVideoClient();
  const { id } = useLocalSearchParams();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Join the call
  useEffect(() => {
    if (!client || call) return;

    const joinCall = async () => {
      const call = client.call("default", id);
      await client.connectUser({ id: user.uuid }, token);
      await call.join({ create: true });
      setCall(call);
    };

    joinCall();
  }, [client, call]);

  // useEffect(() => {
  //   // Listen to call events
  //   const unsubscribe = client.on("all", (event) => {
  //     console.log(event);

  //     if (event.type === "call.reaction_new") {
  //       console.log(`New reaction: ${event.reaction}`);
  //     }

  //     if (event.type === "call.session_participant_joined") {
  //       console.log(`New user joined the call: ${event.participant}`);
  //       const user = event.participant.user.name;
  //       Toast.show({
  //         text1: "User joined",
  //         text2: `Say hello to ${user} 👋`,
  //       });
  //     }

  //     if (event.type === "call.session_participant_left") {
  //       console.log(`Someone left the call: ${event.participant}`);
  //       const user = event.participant.user.name;
  //       Toast.show({
  //         text1: "User left",
  //         text2: `Say goodbye to ${user} 👋`,
  //       });
  //     }
  //   });

  //   // Stop the listener when the component unmounts
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // Navigate back home on hangup
  const goToHomeScreen = async () => {
    await call.endCall();
    router.back();
  };

  const customCallControlsProps = {
    
    toggleModal: toggleModal
    
  };

  if (!call) return null;

  

  return (
    <View style={{ flex: 1 }}>
      <Spinner visible={!call} />

      <StreamCall call={call}>
        <CallContent 
        CallControls={(props)=><CustomCallControls {...customCallControlsProps}/>}
        onHangupCallHandler={goToHomeScreen} 
        toggleModal={toggleModal}

        />

      <GamesModal
          modalVisible={modalVisible}
          setModalVisible={toggleModal}
        />
        {/* <View style={styles.container}>
          <CallContent onHangupCallHandler={goToHomeScreen} layout="grid" />

          {WIDTH > HEIGHT ? (
            <View style={styles.videoContainer}>
              <Text>Tablet chat</Text>
            </View>
          ) : (
            <Text>Mobile chat</Text>
          )}
        </View> */}
      </StreamCall>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: WIDTH > HEIGHT ? "row" : "column",
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#fff",
  },

  topView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default Room;
