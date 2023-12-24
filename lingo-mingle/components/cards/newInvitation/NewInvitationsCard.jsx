// Imports
import { View, Text, Image, Pressable } from "react-native";
import React from "react";

// Styles
import styles from "./NewInvitationCard.styles";
import FA5Icon from "react-native-vector-icons/FontAwesome5";

import { COLOR } from "../../../constants";
import api from "../../../services/api";

// Services
//import api from "../../../services/api";

// Hooks
import useNotification from "../../../hooks/useNotification";

const NewInvitationCard = ({ item, myUUID,onAcceptInvitation,onRejectInvitation }) => {
  const notify = useNotification();

  const invitationUUID = item.uuid;
  
  
  const handleAcceptInvitation = () => {
    onAcceptInvitation(invitationUUID);
  };

  const handleRejectInvitation = () => {
    onRejectInvitation(invitationUUID);
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
          <Pressable style={styles.pressable} onPress={handleAcceptInvitation}>
            <FA5Icon name="check-circle" color={COLOR.green} solid size={44} />
          </Pressable>
          <Pressable style={styles.pressable} onPress={handleRejectInvitation}>
            <FA5Icon name="times-circle" color={COLOR.red} solid size={44} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default NewInvitationCard;