// Imports
import { ScrollView, Text, FlatList, Pressable } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Styles
import { HomePageStyle as styles } from "../../../styles";

// Components
import {
  LastFriendCard,
  LastUserCard,
  FriendsContactedCard,
} from "../../../components/cards";
import { Loader } from "../../../components/common";
import { StartVideoCallModal } from "../../../components/modals";
import { OutgoingCall } from "../../../components/videocall";

// Services
import api from "../../../services/api";

//Contexts
import { AuthContext } from "../../../contexts/AuthContext";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [lastUsersContacted, setLastUserContacted] = useState([]);
  const [lastFriendsContacted, setLastFriendsContacted] = useState([]);
  const [friendsRequests, setFriendsRequest] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isCalling, setIsCalling] = useState(false);
  const [callRef, setCallRef] = useState(undefined);
  const [item, setItem] = useState(undefined);

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
  if (isCalling && callRef && item)
    return (
      <OutgoingCall
        contactedUser={item}
        setIsCalling={() => setIsCalling(false)}
        setCallRef={() => {
          setCallRef(undefined);
        }}
        callRef={callRef}
      />
    );
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
                  <LastUserCard
                    item={item}
                    myUUID={MY_UUID}
                    setIsCalling={() => setIsCalling(true)}
                    setCallRef={(ref) => setCallRef(ref)}
                    setItem={(item) => setItem(item)}
                  />
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
                  <LastFriendCard
                    item={item}
                    my_uuid={MY_UUID}
                    setIsCalling={() => setIsCalling(true)}
                    setCallRef={(ref) => setCallRef(ref)}
                    setItem={(item) => setItem(item)}
                  />
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
