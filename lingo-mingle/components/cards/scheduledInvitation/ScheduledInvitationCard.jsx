// Imports
import { View, Text, Image, Pressable } from "react-native";
import React from "react";

// Styles
import styles from "./ScheduledInvitationCard.styles";
import FA5Icon from "react-native-vector-icons/FontAwesome5";

import { COLOR } from "../../../constants";

// Hooks
import useNotification from "../../../hooks/useNotification";

const ScheduledInvitationCard = ({
  item,
  setModalVisible,
  confirmationModalVisible,
  setConfirmationModalVisible,
  setConfirmationModalStatus,
  setInvitationUUID,
}) => {
  const notify = useNotification();
  const invitationUUID = item.uuid;

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
          <Pressable
            style={styles.pressableEdit}
            onPress={() => {
              setModalVisible(true, item);
            }}
          >
            <Text>Edit</Text>
          </Pressable>
          <Pressable
            style={styles.pressableCancel}
            onPress={() => {
              setConfirmationModalVisible(true);
              setInvitationUUID(invitationUUID);
              setConfirmationModalStatus("cancel");
            }}
          >
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ScheduledInvitationCard;
