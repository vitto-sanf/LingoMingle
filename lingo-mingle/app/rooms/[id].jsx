// Imports
import React, { useEffect, useState, useContext, useRef } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import {
  CallContent,
  StreamCall,
  useStreamVideoClient,
  useCallStateHooks,
} from "@stream-io/video-react-native-sdk";
import { CallTopView } from "@stream-io/video-react-native-sdk";
import { SafeAreaView } from "react-native-safe-area-context";
import { onSnapshot, collection } from "firebase/firestore";
import { database } from "../../config/firebase";
import useNotification from "../../hooks/useNotification";

// Components
import {
  GamesModal,
  AdivinaLaPalabraModal,
  CantenJuntosModal,
  NuevoTemaModal,
} from "../../components/modals";

import {
  CustomBottomSheet,
  CustomCallControls,
  CustomCallControlsAudioVideo,
  CustomCallTopView,
} from "../../components/videocall";

// Context
import { AuthContext } from "../../contexts/AuthContext";

// Services
import api from "../../services/api";

const Room = () => {
  const { user, token } = useContext(AuthContext);
  const MY_UUID = user.uuid;
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [advinaLaPalabraVisible, setAdivinaLaPalabraVisible] = useState(false);
  const [cantenJuntosVisible, setCantenJuntosVisible] = useState(false);
  const [nuevoTemaVisible, setNuevoTemaVisible] = useState(false);
  const [gamesData, setGamesData] = useState({});

  const [call, setCall] = useState(null);
  const client = useStreamVideoClient();
  const { id } = useLocalSearchParams();
  const notify = useNotification();
  const BottomSheetModalRef = useRef();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFriend, setIsFriend] = useState(undefined);
  const [participantId, setParticipantId] = useState(undefined);

  useEffect(() => {
    console.log(BottomSheetModalRef.current);
  }, []);

  useEffect(() => {
    const run = async () => {
      if (Platform.OS === "android") {
        await PermissionsAndroid.requestMultiple([
          "android.permission.POST_NOTIFICATIONS",
          "android.permission.BLUETOOTH_CONNECT",
        ]);
      }
    };
    run();
  }, []);

  useEffect(() => {
    const listener = onSnapshot(collection(database, "games"), (snapshot) => {
      snapshot.forEach((doc) => {
        setGamesData(doc.data());
        setModalVisible(doc.data().ModalGameVisible);
        setAdivinaLaPalabraVisible(doc.data().ModalAdivinaVisible);
        setCantenJuntosVisible(doc.data().ModalCantenJuntosVisible);
        setNuevoTemaVisible(doc.data().ModalNuevoTemaVisible);
      });
    });
  }, []);

  const toggleModal = async () => {
    setModalVisible(!gamesData.ModalGameVisible);

    const newData = {
      ...gamesData,
      ModalGameVisible: !gamesData.ModalGameVisible,
    };

    setGamesData(newData);

    await api.setGamesData(newData);
  };
  const toggleModalCantenJuntos = async () => {
    setCantenJuntosVisible(!gamesData.ModalCantenJuntosVisible);

    const newData = {
      ...gamesData,
      ModalCantenJuntosVisible: !gamesData.ModalCantenJuntosVisible,
      playGame: false,
    };

    setGamesData(newData);

    await api.setGamesData(newData);
  };

  const toggleModalAdivina = async () => {
    setAdivinaLaPalabraVisible(!gamesData.ModalAdivinaVisible);

    const newData = {
      ...gamesData,
      ModalAdivinaVisible: !gamesData.ModalAdivinaVisible,
    };

    setGamesData(newData);

    await api.setGamesData(newData);
  };

  const toggleModalNuevoTema = async () => {
    setNuevoTemaVisible(!gamesData.ModalNuevoTemaVisible);

    const newData = {
      ...gamesData,
      ModalNuevoTemaVisible: !gamesData.ModalNuevoTemaVisible,
    };

    setGamesData(newData);

    await api.setGamesData(newData);
  };

  // Join the call
  /*  useEffect(() => {
    if (!client || call) return;
    console.log("CALL",call)
    const joinCall = async () => {
      const call = client.call("default", id);
      await client.connectUser({ id: user.uuid }, token);
      await call.join({ create: true });
      setCall(call);
    };

    joinCall();
  }, [client, call]); */

  useEffect(() => {
    if (!client || call) return;
    console.log("CALL", call);
    const joinCall = async () => {
      const call = client.call("default", id);
      await client.connectUser({ id: user.uuid }, token);
      await call.join({ create: true });
      setCall(call);
    };

    joinCall();
  }, [client, call]);

  const goToHomeScreen = async () => {
    /* await call.leave(); */
    console.log("ISFRIEND", isFriend),
      console.log("participantId", participantId[0]);
    if (isFriend == false) {
      api.editUserContacted(user, participantId[0]);
    }
    router.back();
  };

  const handleChat = () => {
    if (isChatOpen) BottomSheetModalRef.current?.close();
    else BottomSheetModalRef.current?.expand();
    setIsChatOpen(!isChatOpen);
  };

  const customCallControlsProps = {
    toggleModal: toggleModal,
    onChatOpenHandler: handleChat,
    onHangupCallHandler: goToHomeScreen,
  };

  const customCallTopViewProps = {
    callid: id,
  };

  if (!call) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Spinner visible={!call} />

      <StreamCall call={call}>
        <CallContent
          CallControls={(props) => {
            return (
              <>
                <CustomCallControls
                  {...props}
                  {...customCallControlsProps}
                  modalVisible={modalVisible}
                />
                <CustomCallControlsAudioVideo isChatOpen={isChatOpen} />
              </>
            );
          }}
          CallTopView={(props) => (
            <CustomCallTopView
              {...customCallTopViewProps}
              setIsUserFriend={(friend) => setIsFriend(friend)}
              setPartcipantId={(id) => setParticipantId(id)}
            />
          )}
          onHangupCallHandler={goToHomeScreen}
          onChatOpenHandler={handleChat}
          toggleModal={toggleModal}
        />

        {!advinaLaPalabraVisible &&
          !cantenJuntosVisible &&
          !nuevoTemaVisible && (
            <GamesModal
              modalVisible={modalVisible}
              setModalVisible={toggleModal}
              AdivinamodalVisible={advinaLaPalabraVisible}
              setModalAdivinaVisible={toggleModalAdivina}
              setModalCantenJuntosVisible={toggleModalCantenJuntos}
              setModalNuevoTemaVisible={toggleModalNuevoTema}
            />
          )}

        <AdivinaLaPalabraModal
          modalVisible={advinaLaPalabraVisible}
          setModalVisible={toggleModalAdivina}
        />
        {cantenJuntosVisible ? (
          <CantenJuntosModal
            modalVisible={cantenJuntosVisible}
            setModalVisible={toggleModalCantenJuntos}
          />
        ) : (
          ""
        )}
        <NuevoTemaModal
          modalVisible={nuevoTemaVisible}
          setModalVisible={toggleModalNuevoTema}
        />
        <CustomBottomSheet
          channelId={id}
          setIsChatOpen={setIsChatOpen}
          ref={BottomSheetModalRef}
        />
      </StreamCall>
    </SafeAreaView>
  );
};

export default Room;
