// Imports
import React from 'react';
import { View, Text } from 'react-native';

// Styles
import styles from './InvitationNotification.style';

// Utils
import { formatTimestamp } from '../../../utils/formatDate';

const InvitationNotification = ({ sender, timestamp }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        You have received a new invitation from {sender}.
      </Text>
      {/* <Text style={styles.timestamp}>{formatTimestamp(timestamp)}</Text> */}
    </View>
  );
};

export default InvitationNotification;
