// Imports
import { View, Text, Pressable } from "react-native";
import React from "react";

// Styles
import styles from "./NewInvitationsCard.styles";
import FA5Icon from "react-native-vector-icons/FontAwesome5";

import { COLOR } from "../../../constants";

const NewInvitationCard = ({
  item,
  lastItem,
  setModalVisible,
  setInvitationUUID,
  setConfirmationModalStatus,
}) => {
  const invitationUUID = item.uuid;

  return (
    <View style={lastItem ? styles.lastItemContainer : styles.container}>
      <Text style={styles.userName}>{item.username}</Text>
      <View style={styles.row}>
        <View style={styles.meetingContainer}>
          <FA5Icon name="calendar-alt" solid size={24} style={styles.icon} />
          <Text style={styles.iconText}>{item.timestamp}</Text>
        </View>
        <Pressable
          onPress={() => {
            setInvitationUUID(invitationUUID);
            setModalVisible(true);
            setConfirmationModalStatus("accept");
          }}
        >
          <FA5Icon name="check-circle" color={COLOR.green} solid size={30} />
        </Pressable>
      </View>
      <View style={styles.row}>
        <View style={styles.meetingContainer}>
          <FA5Icon
            name="map-pin"
            size={24}
            style={[styles.icon, { marginRight: 18 }]}
          />
          <Text style={styles.iconText}>{item.place}</Text>
        </View>
        <Pressable
          onPress={() => {
            setInvitationUUID(invitationUUID);
            setModalVisible(true);
            setConfirmationModalStatus("decline");
          }}
        >
          <FA5Icon name="times-circle" color={COLOR.red} solid size={30} />
        </Pressable>
      </View>
    </View>
  );
};

export default NewInvitationCard;
