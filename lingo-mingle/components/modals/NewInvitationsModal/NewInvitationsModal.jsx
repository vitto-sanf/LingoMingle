import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import styles from './NewInvitationsModal.style';

const NewInvitationModal = ({ modalVisible, setModalVisible }) => {
  //const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>New invitation</Text>


            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.cancelTextStyle}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSend]}
              /*onPress={() => /*setModalVisible(!modalVisible)}*/>
              <Text style={styles.textStyle}>Send</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};



export default NewInvitationModal;