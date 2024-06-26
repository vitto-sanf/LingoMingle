// Imports
import { View, Text, Image, Pressable } from "react-native";
import React  from "react";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { useContext } from "react";
// Styles
import styles from "./LastFriendCard.styles";
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

const LastFriendCard = ({ item, my_uuid }) => {
  const router = useRouter ();
  const notify = useNotification();
  const {setCallInfo,setContactedUser}= useContext(DirectCallContext)

  const chatId = item.friends.map((e) => {
    if (e.id === my_uuid){ return e.chatId};
  });

  const handleStartVideoCall = () => {
    const generatedUuid = Math.floor(Math.random() * (100000 - 2000)) + 2000;
    api.directCall(my_uuid,item.uuid,generatedUuid).then((doc)=>{
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
      <Link href={`/chats/${chatId}`} asChild>
          <Pressable style={styles.sendFriendRequestBtn}>
            <FA5Icon name="comment" color={COLOR.lightBlue} solid size={20} />
          </Pressable>
        </Link>

        <Pressable onPress={() => handleStartVideoCall()}>
          <FA5Icon name="video" size={20} />
        </Pressable>
      </View>
    </View>
  );
};

export default LastFriendCard;
