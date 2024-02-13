// Imports
import {
  ScrollView,
  Text,
  FlatList,
  Pressable,
  Modal,
  View,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Styles
import { HomePageStyle as styles } from "../../../styles";

// Components
import {
  LastFriendCard,
  LastUserCard,
  FriendsContactedCard,
} from "../../../components/cards";
import { Loader } from "../../../components/common";
import OutgoingCall from "../../../components/videocall/OutgoingCall";

// Services
import api from "../../../services/api";
//Contexts
import { AuthContext } from "../../../contexts/AuthContext";
import { COLOR, FONT } from "../../../constants";

// TODO: Inserire questo modal all'interno della cartella modal dopo il merge di tutti i branch
const StartVideoCallModal = ({ isModalVisible, setIsModalVisible }) => {
  const router = useRouter();

  const onConfirmStartMeeting = () => {
    const roomId = 100000;
    router.push(`/rooms/${roomId}`);
    setIsModalVisible(false);
  };

  const onCancelStartMeeting = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setIsModalVisible(!isModalVisible);
      }}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: FONT.bold,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            You are going to be connected with random user on videocall
          </Text>
          <View style={modalStyles.buttonContainer}>
            <Pressable
              onPress={onConfirmStartMeeting}
              style={modalStyles.button}
            >
              <Text
                style={[
                  modalStyles.buttonText,
                  { backgroundColor: COLOR.green },
                ]}
              >
                Continue
              </Text>
            </Pressable>
            <Pressable
              onPress={onCancelStartMeeting}
              style={modalStyles.button}
            >
              <Text
                style={[modalStyles.buttonText, { backgroundColor: COLOR.red }]}
              >
                Exit
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    height: "22%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  button: {
    borderRadius: 100,
    width: "40%",
    overflow: "hidden",
  },
  buttonText: {
    textAlign: "center",
    fontFamily: FONT.medium,
    fontSize: 16,
    padding: 10,
  },
});

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [lastUsersContacted, setLastUserContacted] = useState([]);
  const [lastFriendsContacted, setLastFriendsContacted] = useState([]);
  const [friendsRequests, setFriendsRequest] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const[isCalling,setIsCalling]= useState(false)
  const [callRef, setCallRef]= useState(undefined)
  const [item,setItem]= useState(undefined)

  const { user } = useContext(AuthContext);
  const MY_UUID = user.uuid;

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const lastUserContacted = await api.getLastUserContacted(
          user?.last_user_contacted
        );

        const lastFriendsContacted = await api.getLastFriendsContacted(
          user?.last_friends_contacted
        );

        const friendsRequest = await api.getFriendsRequest(
          user?.friends_request,
          MY_UUID
        );

        Promise.all([lastUserContacted, lastFriendsContacted, friendsRequest])
          .then(
            ([UserContactedList, FriendsContactedList, FriendsRequestList]) => {
              setLastUserContacted(UserContactedList);
              setLastFriendsContacted(FriendsContactedList);
              setFriendsRequest(FriendsRequestList);
              setLoading(false);
            }
          )
          .catch((error) => {
            console.error("Error during api calling", error);
          });
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfo();
  }, [MY_UUID]);

  if (loading) return <Loader />;
  if(isCalling && callRef &&item) return <OutgoingCall contactedUser={item}  setIsCalling={()=>setIsCalling(false)} setCallRef={()=>{setCallRef(undefined)}}  callRef= {callRef}/>
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>LingoMingle</Text>
      {lastUsersContacted.length === 0 &&
      lastFriendsContacted.length === 0 &&
      friendsRequests.length === 0 ? (
        <Text style={styles.noInfoText}>
          Start a new videocall to meet new people!
        </Text>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.sectionContainer}
          bounces={false}
        >
          {lastUsersContacted.length !== 0 && (
            <>
              <Text style={styles.sectionTitle}>Last Users Contacted</Text>
              <FlatList
                data={lastUsersContacted}
                renderItem={({ item }) => (
                  <LastUserCard item={item} myUUID={MY_UUID} setIsCalling={()=>setIsCalling(true)} setCallRef={(ref)=>setCallRef(ref)} setItem={(item)=>setItem(item)} />
                )}
                keyExtractor={(item) => item.uuid}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}

          {lastFriendsContacted.length !== 0 && (
            <>
              <Text style={styles.sectionTitle}>Last Friends Contacted</Text>
              <FlatList
                data={lastFriendsContacted}
                renderItem={({ item }) => (
                  <LastFriendCard item={item} my_uuid={MY_UUID}  setIsCalling={()=>setIsCalling(true)} setCallRef={(ref)=>setCallRef(ref)} setItem={(item)=>setItem(item)} />
                )}
                keyExtractor={(item) => item.uuid}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}

          {friendsRequests.length !== 0 && (
            <>
              <Text style={styles.sectionTitle}>Friends Request</Text>
              <FlatList
                data={friendsRequests}
                renderItem={({ item }) => (
                  <FriendsContactedCard item={item} myUUID={MY_UUID} />
                )}
                keyExtractor={(item) => item.uuid}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}
        </ScrollView>
      )}
      <Pressable onPress={() => setIsModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonTitle}>Start Videocall</Text>
      </Pressable>
      {isModalVisible && (
        <StartVideoCallModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </SafeAreaView>
  );
};

export default HomePage;
