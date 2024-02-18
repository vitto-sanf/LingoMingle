// Imports
import { ScrollView, Text, FlatList, Pressable } from "react-native";
import React, { useEffect, useState, useContext,useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { database } from "../../../config/firebase";
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


// Services
import api from "../../../services/api";

//Contexts
import { AuthContext } from "../../../contexts/AuthContext";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [lastUsersContacted, setLastUserContacted] = useState([]);
  const [lastFriendsContacted, setLastFriendsContacted] = useState([]);
  const [friendsRequests, setFriendsRequest] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);


  const { user } = useContext(AuthContext);
  const MY_UUID = user.uuid;

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(database,'user', user.uuid), async (doc) => {
      try {
        const lastUserContacted = await api.getLastUserContacted(doc.data().last_user_contacted);
        const lastFriendsContacted = await api.getLastFriendsContacted(doc.data().last_friends_contacted);
        const friendsRequest = await api.getFriendsRequest(doc.data().friends_request, MY_UUID);
  
        setLastUserContacted(lastUserContacted);
        setLastFriendsContacted(lastFriendsContacted);
        setFriendsRequest(friendsRequest);
        setLoading(false);
      } catch (error) {
        console.error("Error during API call:", error);
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, [user.uuid]);

  if (loading) return <Loader />;
 
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
                    /* setIsCalling={() => setIsCalling(true)}
                    setCallRef={(ref) => setCallRef(ref)}
                    setItem={(item) => setItem(item)} */
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
