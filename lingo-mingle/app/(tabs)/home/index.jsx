// Imports
import { ScrollView, Text, FlatList , Pressable} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Styles
import { HomePageStyle as styles } from "../../../styles";

import { COLOR, FONT } from "../../../constants";

// Components
import LastUserCard from "../../../components/cards/lastUsers/LastUserCard";
import LastFriendCard from "../../../components/cards/lastFriends/LastFriendCard";
import FriendCard from "../../../components/cards/friendsContacted/FriendsContacted";

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
  //TODO: rimuovere effetto bounce nello scorrimento verticale delle cards
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>LingoMingle</Text>
      <ScrollView showsVerticalScrollIndicator= {false} style={styles.sectionContainer}>
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
          renderItem={({ item }) => <FriendCard item={item} />}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
      <Pressable style={styles.button}>
      
      <Text style = {styles.buttonTitle}> Start Videocall</Text>
      
      </Pressable> 

    </SafeAreaView>
  );
};

export default HomePage;
