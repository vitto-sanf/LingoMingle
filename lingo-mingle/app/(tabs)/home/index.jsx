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
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [dirty, setDirty] = useState(true);
  const [lastUsersContacted, setLasUserContacted] = useState([]);
  const [lastFriendsContacted, setLastFriendsContacted] = useState([]);
  const [friendsRequests, setFriendsRequest] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      // Cleanup function to set isMounted to false when component unmounts
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (dirty && isMounted) {
      api
        .getUser("YVBwXkN7cIk7WmZ8oUXG")
        .then((data) => {
          setUserInfo(data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          if (
            dirty &&
            userInfo.last_user_contacted &&
            userInfo.last_friends_contacted &&
            userInfo.friends_request
          ) {
            const lastUserContacted = api.getLastUserContacted(
              userInfo?.last_user_contacted
            );

            const lastFriendsContacted = api.getLastFriendsContacted(
              userInfo?.last_friends_contacted
            );

            const friendsRequest = api.getFriendsRequest(
              userInfo?.friends_request
            );

            Promise.all([
              lastUserContacted,
              lastFriendsContacted,
              friendsRequest,
            ])

              .then(
                ([
                  UserContactedList,
                  FriendsContactedList,
                  FriendsRequestList,
                ]) => {
                  setLasUserContacted(UserContactedList);
                  setLastFriendsContacted(FriendsContactedList);
                  setFriendsRequest(FriendsRequestList);
                  setDirty(false);
                  setLoading(false);
                }
              )
              .catch((error) => {
                console.error(
                  "Errore durante le chiamate API parallele:",
                  error
                );
              });
          }
        });
    }
  }, [dirty, userInfo]);

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>LingoMingle</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.sectionContainer}
        bounces={false}
      >
        <Text style={styles.sectionTitle}>Last Users Contacted</Text>
        <FlatList
          data={lastUsersContacted}
          renderItem={({ item }) => <LastUserCard item={item} />}
          keyExtractor={(item) => item.uuid}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.sectionTitle}>Last Friends Contacted</Text>
        <FlatList
          data={lastFriendsContacted}
          renderItem={({ item }) => <LastFriendCard item={item} />}
          keyExtractor={(item) => item.uuid}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.sectionTitle}>Friends Request</Text>
        <FlatList
          data={friendsRequests}
          renderItem={({ item }) => <FriendsContactedCard item={item} />}
          keyExtractor={(item) => item.uuid}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
      <Pressable style={styles.button}>
        <Text style={styles.buttonTitle}> Start Videocall</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomePage;
