// Imports
import { View, Text, Image, Pressable } from "react-native";
import React from "react";

// Styles
import styles from "./FriendsContacted.styles";
import FA5Icon from "react-native-vector-icons/FontAwesome5";

const FriendCard = ({ item }) => {
  const handleSendFriendRequest = () => {
    // TODO: Implement interaction with db
  };

  const handleStartVideoCall = () => {
    // TODO: Implement this functionality
  };

  // TODO: Evaluate whether to make the card clickable!
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.userImage} />
      <Text style={styles.userName}>{item.username}</Text>
      <View style={styles.actions}>
        <Pressable
          onPress={() => handleSendFriendRequest()}
          style={styles.sendFriendRequestBtn}
        >
          <FA5Icon name="check-circle"  solid size={22}/>  
        </Pressable>
        <Pressable onPress={() => handleStartVideoCall()}>
          <FA5Icon name="times-circle" solid size={22} />
        </Pressable>
      </View>
    </View>
  );
};

export default FriendCard;