// Imports
import { View, Text, Image, Pressable } from "react-native";
import React from "react";

// Styles
import styles from "./LastFriendCard.styles";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import userImage from "../../../assets/profileAvatar.png";
import { COLOR } from "../../../constants";
const LastFriendCard = ({ item }) => {
  const handleSendFriendRequest = () => {
    // TODO: Implement interaction with db
  };

  const handleStartVideoCall = () => {
    // TODO: Implement this functionality
  };

  // TODO: Evaluate whether to make the card clickable!
  // TODO: Change icon color
  return (
    <View style={styles.container}>
      <Image source={userImage} style={styles.userImage} />
      <Text style={styles.userName}>{item.username}</Text>
      <View style={styles.actions}>
        <Pressable
          onPress={() => handleSendFriendRequest()}
          style={styles.sendFriendRequestBtn}
        >
          <FA5Icon name="comment" color={COLOR.lightBlue} solid size={22} />
        </Pressable>
        <Pressable onPress={() => handleStartVideoCall()}>
          <FA5Icon name="video" size={22} />
        </Pressable>
      </View>
    </View>
  );
};

export default LastFriendCard;