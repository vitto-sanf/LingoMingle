// Imports
import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Styles
import { HomePageStyle as styles } from "../../../styles";

// Components
import LastUserCard from "../../../components/cards/lastUsers/LastUserCard";

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

const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>LingoMingle</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Last users contacted</Text>
        <FlatList
          data={lastUsersContacted}
          renderItem={({ item }) => <LastUserCard item={item} />}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
