import React, { useEffect, useState, useContext, useRef } from "react";
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
import AdivinaLaPalabraModal from "../../components/modals/AdivinaLaPalabraModal/AdivinaLaPalabraModal";
import CantenJuntosModal from "../../components/modals/CantenJuntosModal/CantenJuntosModal";
import NuevoTemaModal from "../../components/modals/NuevoTemaModal/NuevoTemaModal";
import Spinner from "react-native-loading-spinner-overlay";
import {
  CallContent,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";

// Components
import CustomBottomSheet from "../../components/videocall/CustomBottomSheet";

// Context
import { AuthContext } from "../../contexts/AuthContext";
import CustomCallControls from "../../components/videocall/CustomCallControls";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../services/api";
import { onSnapshot, collection } from "firebase/firestore";
import { database } from "../../config/firebase";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Room = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [advinaLaPalabraVisible, setAdivinaLaPalabraVisible] = useState(false);
  const [cantenJuntosVisible, setCantenJuntosVisible] = useState(false);
  const [nuevoTemaVisible, setNuevoTemaVisible] = useState(false);
  const [gamesData, setGamesData] = useState({});
  const [dirty, setDirty] = useState(true);
  const { user, token } = useContext(AuthContext);
  const router = useRouter();

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

    //console.log("client data", newData);
    await api.setGamesData(newData);
  };
  const toggleModalCantenJuntos = async () => {
    //setModalVisible(!gamesData.ModalGameVisible);
    setCantenJuntosVisible(!gamesData.ModalCantenJuntosVisible);

    const newData = {
      ...gamesData,
      ModalCantenJuntosVisible: !gamesData.ModalCantenJuntosVisible,
      playGame: false,
    };

    setGamesData(newData);

    await api.setGamesData(newData);

    /*
    setModalVisible(!modalVisible);
    setCantenJuntosVisible(!cantenJuntosVisible);*/
  };

  const toggleModalAdivina = async () => {
    //setModalVisible(!gamesData.ModalGameVisible);
    setAdivinaLaPalabraVisible(!gamesData.ModalAdivinaVisible);

    const newData = {
      ...gamesData,
      ModalAdivinaVisible: !gamesData.ModalAdivinaVisible,
    };

    setGamesData(newData);

    await api.setGamesData(newData);
    /*setModalVisible(!modalVisible);
    setAdivinaLaPalabraVisible(!advinaLaPalabraVisible);*/
  };

  const toggleModalNuevoTema = async () => {
    //setModalVisible(!gamesData.ModalGameVisible);
    setNuevoTemaVisible(!gamesData.ModalNuevoTemaVisible);

    const newData = {
      ...gamesData,
      ModalNuevoTemaVisible: !gamesData.ModalNuevoTemaVisible,
    };

    setGamesData(newData);

    await api.setGamesData(newData);
    /*setModalVisible(!modalVisible);
    setNuevoTemaVisible(!nuevoTemaVisible);*/
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

  // Navigate back home on hangup
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

  if (!call) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Spinner visible={!call} />

      <StreamCall call={call}>
        <CallContent
          CallControls={(props) => (
            <CustomCallControls {...customCallControlsProps} />
          )}
          onHangupCallHandler={goToHomeScreen}
          onChatOpenHandler={handleChat}
          toggleModal={toggleModal}
        />

        <GamesModal
          modalVisible={modalVisible}
          setModalVisible={toggleModal}
          AdivinamodalVisible={advinaLaPalabraVisible}
          setModalAdivinaVisible={toggleModalAdivina}
          setModalCantenJuntosVisible={toggleModalCantenJuntos}
          setModalNuevoTemaVisible={toggleModalNuevoTema}
        />
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
    </SafeAreaView>
  );
};

export default Room;
