// Imports
import { View, Text, Pressable } from "react-native";
import React, { useState,useEffect } from "react";

// Styles
import styles from "./PendingInvitationCard.styles";
import FA5Icon from "react-native-vector-icons/FontAwesome5";

//Server
import api from "../../../services/api";

const PendingInvitationCard = ({
  item,
  lastItem,
  setModalVisible,
  setConfirmationModalStatus,
  setInvitationUUID,
}) => {
  const invitationUUID = item.uuid;
  const [receiver,setReceiver]=useState("");
  
  useEffect(()=>{
    api.getUser(item.receiverUUid)
    .then((data)=>{
      setReceiver(data.username)})
    .catch((err)=>console.log(err))


    
  },[])
  //console.log(item.receiver["_j"]);
  return (
    <View style={lastItem ? styles.lastItemContainer : styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.userName}>{receiver}</Text>
        <View style={styles.meetingContainer}>
          <FA5Icon name="calendar-alt" solid size={24} style={styles.icon} />
          <Text>{item.timestamp}</Text>
        </View>
        <View style={styles.meetingContainer}>
          <FA5Icon
            name="map-pin"
            solid
            size={24}
            style={[styles.icon, { marginRight: 18 }]}
          />
          <Text style={styles.iconText}>{item.place}</Text>
        </View>
      </View>
      <Pressable
        onPress={() => {
          setModalVisible(true);
          setInvitationUUID(invitationUUID);
          setConfirmationModalStatus("cancel");
        }}
        style={styles.trashIconContainer}
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
  );
};

export default PendingInvitationCard;
