// Imports
import { View, Text, Image, Pressable, } from "react-native";
import React from "react";
import { useContext } from "react";
// Styles
import styles from "./FriendsContactedCard.styles";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import maleAvatar from "../../../assets/images/maleAvatar.png";
import femaleAvatar from "../../../assets/images/femaleAvatar.png";
import { COLOR } from "../../../constants";

// Services
import api from "../../../services/api";

// Hooks
import useNotification from "../../../hooks/useNotification";
//context
import { AuthContext } from "../../../contexts/AuthContext";

const FriendCard = ({ item, myUUID }) => {
  const notify = useNotification();

  const friendRequestUUID = item.uuid;
  const {user} = useContext (AuthContext)
  const handleAcceptFriendRequest = () => {
    api
      .acceptFriendRequest(user, friendRequestUUID)
      .then((res) => notify.success(res.message))
      .catch((err) => notify.error(err.message));
  };

  const handleRejectFriendRequest = () => {
    api
      .rejectFriendRequest(myUUID, friendRequestUUID)
      .then((res) => notify.success(res.message))
      .catch((err) => notify.error(err.message));
  };

  // TODO: Evaluate whether to make the card clickable!
  return (
  
    <View style={styles.container}>
      
      <Image
        source={item.gender === "M" ? maleAvatar : femaleAvatar}
        style={styles.userImage}
      />
      <Text style={styles.userName}>{item.username}</Text>
      <View style={styles.actions}>
        <Pressable
          onPress={handleAcceptFriendRequest}
          style={styles.sendFriendRequestBtn}
        >
          <FA5Icon name="check-circle" color={COLOR.green} solid size={24} />
        </Pressable>
        <Pressable onPress={handleRejectFriendRequest}>
          <FA5Icon name="times-circle" color={COLOR.red} solid size={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default FriendCard;
