// Imports
import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useContext } from "react";
// Styles
import styles from "./LastUserCard.styles";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import maleAvatar from "../../../assets/images/maleAvatar.png";
import femaleAvatar from "../../../assets/images/femaleAvatar.png";
import { COLOR } from "../../../constants";

// Services
import api from "../../../services/api";

// Hooks
import useNotification from "../../../hooks/useNotification";

//Context
import { DirectCallContext } from "../../../contexts/directCallContext";

const LastUserCard = ({ item, myUUID }) => {
  const notify = useNotification();
  const friendRequestUUID = item.uuid;
  const router = useRouter ();
  const {setCallInfo,setContactedUser}= useContext(DirectCallContext)
  const [friendRequestSent, setFriendRequestSent] = useState(false);

  const handleSendFriendRequest = () => {
    api
      .sendFriendRequest(myUUID, friendRequestUUID)
      .then((res) => {
        setFriendRequestSent(true);
        notify.success(res.message);
      })
      .catch((err) => notify.error(err.message));
  };

  const handleCancelFriendRequest = () => {
    api
      .cancelFriendRequest(myUUID, friendRequestUUID)
      .then((res) => {
        setFriendRequestSent(false);
        notify.success(res.message);
      })
      .catch((err) => notify.error(err.message));
  };

  const handleStartVideoCall = () => {
    const generatedUuid = Math.floor(Math.random() * (100000 - 2000)) + 2000;
    api.directCall(myUUID,item.uuid,generatedUuid).then((doc)=>{
      setCallInfo(doc.id)
      setContactedUser(item)
      router.push('/outgoingCall')
    })
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
          onPress={
            !friendRequestSent &&
            !item.friends_request.some((request) => {
              return request.sender === myUUID;
            })
              ? handleSendFriendRequest
              : handleCancelFriendRequest
          }
          style={styles.sendFriendRequestBtn}
        >
          {!friendRequestSent &&
          !item.friends_request.some((request) => {
            return request.sender === myUUID;
          }) ? (
            <FA5Icon name="user-plus" size={20} />
          ) : (
            <FA5Icon name="user-minus" size={20} color={COLOR.red} />
          )}
        </Pressable>
        <Pressable onPress={() => handleStartVideoCall()}>
          <FA5Icon name="video" size={20} />
        </Pressable>
      </View>
    </View>
  );
};

export default LastUserCard;
