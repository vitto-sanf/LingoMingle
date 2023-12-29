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

const ScheduledInvitationCard = ({ item, myUUID,onDeleteInvitation,modalVisible,setModalVisible }) => {
  const notify = useNotification();
  const invitationUUID = item.uuid;

  //const friendRequestUUID = item.uuid;
  const handleEditInvitation = () => {
   
  };

  const handleCancelInvitation = () => {
    onDeleteInvitation(invitationUUID)
   
  };

 
  return (
    <View style={styles.container} key={item.uuid}>
      <Text style={styles.userName}>{item.username}</Text>
      <View style={styles.container2}>
        <View style={styles.infos}>
          <View style={styles.textInfo}>
            <View style={styles.textIcons}>
              <FA5Icon
                name="calendar"
                solid
                size={24}
                style={styles.iconStyle}
              />
              <Text>{item.timestamp}</Text>
            </View>
            <View style={styles.textIcons}>
              <FA5Icon name="map-pin" solid size={24} />
              <Text style={styles.iconText}>{item.place}</Text>
            </View>
          </View>
        </View>
        

        <View style={styles.buttons}>
          <Pressable style={styles.pressableEdit} onPress={() => setModalVisible(true)}>
            <Text>Edit</Text>
          </Pressable>
          <Pressable style={styles.pressableCancel} onPress={handleCancelInvitation}>
          <Text>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ScheduledInvitationCard;