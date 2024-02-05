// Imports
import React, { useEffect, useState, useContext, useRef } from "react";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import {
  CallContent,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";

// Components
import CustomBottomSheet from "../../components/videocall/CustomBottomSheet";
import CustomCallControls from "../../components/videocall/CustomCallControl";

// Context
import { AuthContext } from "../../contexts/AuthContext";

const Room = () => {
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
    onChatOpenHandler: handleChat,
    onHangupCallHandler: goToHomeScreen,
  };

  if (!call) return null;

  return (
    <View style={{ flex: 1 }}>
      <Spinner visible={!call} />

      <StreamCall call={call}>
        <CallContent
          CallControls={() => (
            <CustomCallControls {...customCallControlsProps} />
          )}
          onHangupCallHandler={goToHomeScreen}
          onChatOpenHandler={handleChat}
        />
        <CustomBottomSheet
          channelId={id}
          setIsChatOpen={setIsChatOpen}
          ref={BottomSheetModalRef}
        />
      </StreamCall>
    </View>
  );
};

export default Room;
