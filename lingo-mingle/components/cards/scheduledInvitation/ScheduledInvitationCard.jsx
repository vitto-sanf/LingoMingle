// Imports
import { View, Text, Image, Pressable } from "react-native";
import React from "react";

// Styles
import styles from "./ScheduledInvitationCard.styles";
import FA5Icon from "react-native-vector-icons/FontAwesome5";

import { COLOR } from "../../../constants";

// Services
//import api from "../../../services/api";

// Hooks
import useNotification from "../../../hooks/useNotification";

const NewInvitationCard = ({ item, myUUID }) => {
  const notify = useNotification();

  //const friendRequestUUID = item.uuid;
  const handleAcceptInvitation = () => {
   
  };

  const handleRejectInvitation = () => {
   
  };

 
  return (
    <View style={styles.container} key={item.uuid}>
      <Text style={styles.userName}>{item.username}</Text>
      <View style={styles.container2}>
        <View style={styles.infos}>
          <Text>
            <FA5Icon name="calendar" solid size={24} />
            {item.timestamp}
          </Text>
          <Text>
            <FA5Icon name="map-pin" solid size={24} />
            {item.place}
          </Text>
        </View>

        <View style={styles.buttons}>
          <Pressable style={styles.pressableEdit} onPress={handleAcceptInvitation}>
            <Text>Edit</Text>
          </Pressable>
          <Pressable style={styles.pressableCancel} onPress={handleRejectInvitation}>
          <Text>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default NewInvitationCard;