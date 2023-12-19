// Imports
import { ScrollView, Text, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
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

// Services
import api from "../../../services/api";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [lastUsersContacted, setLastUserContacted] = useState([]);
  const [lastFriendsContacted, setLastFriendsContacted] = useState([]);
  const [friendsRequests, setFriendsRequest] = useState([]);

  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";

  useEffect(() => {
    api
      .getUser(MY_UUID)
      .then(async (userInfo) => {
        const lastUserContacted = await api.getLastUserContacted(
          userInfo?.last_user_contacted
        );

        const lastFriendsContacted = await api.getLastFriendsContacted(
          userInfo?.last_friends_contacted
        );

        const friendsRequest = await api.getFriendsRequest(
          userInfo?.friends_request
        );

        Promise.all([lastUserContacted, lastFriendsContacted, friendsRequest])
          .then(
            ([UserContactedList, FriendsContactedList, FriendsRequestList]) => {
              setLastUserContacted(UserContactedList);
              setLastFriendsContacted(FriendsContactedList);
              setFriendsRequest(FriendsRequestList);
            }
          )
          .catch((error) => {
            console.error("Error during api calling", error);
          });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

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
                  <LastUserCard item={item} myUUID={MY_UUID} />
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
                renderItem={({ item }) => <LastFriendCard item={item} />}
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
      <Pressable style={styles.button}>
        <Text style={styles.buttonTitle}>Start Videocall</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomePage;
