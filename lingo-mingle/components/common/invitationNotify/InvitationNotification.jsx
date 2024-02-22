// Imports
import React from "react";
import { View, Text } from "react-native";

// Styles
import styles from "./InvitationNotification.style";

const InvitationNotification = ({ sender, isLastItem }) => {
  return (
    <View style={[styles.container, !isLastItem && { marginBottom: 10 }]}>
      <Text style={styles.message}>
        You have received a new invitation from {sender}.
      </Text>
    </View>
  );
};

export default InvitationNotification;
