// Imports
import { View, Text, Image, Pressable } from "react-native";
import React from "react";

// Styles
import styles from "./NewInvitationCard.styles";
import FA5Icon from "react-native-vector-icons/FontAwesome5";

import { COLOR } from "../../../constants";

const NewInvitationCard = ({
  item,
  setModalVisible,
  setInvitationUUID,
  setConfirmationModalStatus,
}) => {
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
            style={styles.pressable}
            onPress={() => {
              setInvitationUUID(invitationUUID);
              setModalVisible(true);
              setConfirmationModalStatus("accept");
            }}
          >
            <FA5Icon name="check-circle" color={COLOR.green} solid size={44} />
          </Pressable>
          <Pressable
            style={styles.pressable}
            onPress={() => {
              setInvitationUUID(invitationUUID);
              setModalVisible(true);
              setConfirmationModalStatus("decline");
            }}
          >
            <FA5Icon name="times-circle" color={COLOR.red} solid size={44} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default NewInvitationCard;
