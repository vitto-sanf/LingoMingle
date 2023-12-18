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

import userImage from "../../../assets/profileAvatar.png";

const lastUsersContacted = [
  {
    id: 1,
    username: "User 1",
    image: userImage,
  },
  {
    id: 2,
    username: "User 2",
    image: userImage,
  },
  {
    id: 3,
    username: "User 3",
    image: userImage,
  },
];

const lastFriendsContacted = [
  {
    id: 1,
    username: "User 1",
    image: userImage,
  },
  {
    id: 2,
    username: "User 2",
    image: userImage,
  },
  {
    id: 3,
    username: "User 3",
    image: userImage,
  },
];

const friendsRequests = [
  {
    id: 1,
    username: "User 1",
    image: userImage,
  },
  {
    id: 2,
    username: "User 2",
    image: userImage,
  },
  {
    id: 3,
    username: "User 3",
    image: userImage,
  },
];

const HomePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getUserField("YVBwXkN7cIk7WmZ8oUXG")
      .then((data) => setUserInfo(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

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
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.sectionTitle}>Last Friends Contacted</Text>
        <FlatList
          data={lastFriendsContacted}
          renderItem={({ item }) => <LastFriendCard item={item} />}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.sectionTitle}>Friends Request</Text>
        <FlatList
          data={friendsRequests}
          renderItem={({ item }) => <FriendsContactedCard item={item} />}
          keyExtractor={(item) => item.id}
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
