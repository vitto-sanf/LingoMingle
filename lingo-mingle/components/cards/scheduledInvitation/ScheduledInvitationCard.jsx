// Imports
import { View, Text, Pressable } from "react-native";
import React from "react";

// Styles
import styles from "./ScheduledInvitationCard.styles";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import MIICon from "react-native-vector-icons/MaterialIcons";

const ScheduledInvitationCard = ({
  item,
  lastItem,
  setModalVisible,
  setConfirmationModalVisible,
  setConfirmationModalStatus,
  setInvitationUUID,
}) => {
  const invitationUUID = item.uuid;

  return (
    <View style={lastItem ? styles.lastItemContainer : styles.container}>
      <Text style={styles.userName}>{item.username}</Text>
      <View style={styles.row}>
        <View style={styles.meetingContainer}>
          <FA5Icon name="calendar-alt" solid size={24} style={styles.icon} />
          <Text>{item.timestamp}</Text>
        </View>
        <Pressable
          onPress={() => {
            //console.log("SIC",item);
            setModalVisible(true, item);
          }}
        >
          <MIICon name="edit" size={24} />
        </Pressable>
      </View>
      <View style={styles.row}>
        <View style={styles.meetingContainer}>
          <FA5Icon
            name="map-pin"
            solid
            size={24}
            style={[styles.icon, { marginRight: 18 }]}
          />
          <Text style={styles.iconText}>{item.place}</Text>
        </View>
        <Pressable
          onPress={() => {
            setConfirmationModalVisible(true);
            setInvitationUUID(invitationUUID);
            setConfirmationModalStatus("cancel");
          }}
        >
          <FA5Icon
            name="trash-alt"
            solid
            size={22}
            color="red"
            style={{ marginRight: 4 }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ScheduledInvitationCard;
