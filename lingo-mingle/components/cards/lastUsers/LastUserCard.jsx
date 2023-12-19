// Imports
import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { COLOR } from "../../../constants";
// Styles
import styles from "./LastUserCard.styles";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import userImage from "../../../assets/profileAvatar.png";

const LastUserCard = ({ item }) => {
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
          <FA5Icon name="user-plus" color={COLOR.green} size={22} />
        </Pressable>
        <Pressable onPress={() => handleStartVideoCall()}>
          <FA5Icon name="video" size={22} />
        </Pressable>
      </View>
    </View>
  );
};

export default LastUserCard;
