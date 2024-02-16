// Imports
import React, { useEffect, useState, useContext, useRef } from "react";
import { Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import {
  CallContent,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { CallTopView } from "@stream-io/video-react-native-sdk";
import { SafeAreaView } from "react-native-safe-area-context";
import { onSnapshot, collection } from "firebase/firestore";
import { database } from "../../config/firebase";

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
  CustomCallTopView,
} from "../../components/videocall";

// Context
import { AuthContext } from "../../contexts/AuthContext";

// Services
import api from "../../services/api";

const Room = () => {
  const { user, token } = useContext(AuthContext);
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [advinaLaPalabraVisible, setAdivinaLaPalabraVisible] = useState(false);
  const [cantenJuntosVisible, setCantenJuntosVisible] = useState(false);
  const [nuevoTemaVisible, setNuevoTemaVisible] = useState(false);
  const [gamesData, setGamesData] = useState({});

  const [call, setCall] = useState(null);
  const client = useStreamVideoClient();
  const { id } = useLocalSearchParams();

  const BottomSheetModalRef = useRef();

  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    console.log(BottomSheetModalRef.current);
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

  const goToHomeScreen = async () => {
    await call.endCall();
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

  const customCallTopViewProps ={
    callid: id
  };

  if (!call) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Spinner visible={!call} />

      <StreamCall call={call}>
        <CallContent
          CallControls={(props) => (
            <CustomCallControls {...customCallControlsProps} />
          )}
          
          CallTopView={(props) => (
            
            <CustomCallTopView {...customCallTopViewProps} />
          )}
          onHangupCallHandler={goToHomeScreen}
          onChatOpenHandler={handleChat}
          toggleModal={toggleModal}
        />

           
        {!advinaLaPalabraVisible && !cantenJuntosVisible
        && !nuevoTemaVisible &&
        <GamesModal
          modalVisible={modalVisible}
          setModalVisible={toggleModal}
          AdivinamodalVisible={advinaLaPalabraVisible}
          setModalAdivinaVisible={toggleModalAdivina}
          setModalCantenJuntosVisible={toggleModalCantenJuntos}
          setModalNuevoTemaVisible={toggleModalNuevoTema}
        />
        }
        
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
