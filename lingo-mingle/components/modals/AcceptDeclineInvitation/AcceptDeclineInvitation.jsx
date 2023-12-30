import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  FlatList,
} from "react-native";
import styles from "./AcceptDeclineInvitation.style";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../../constants";
import api from "../../../services/api";
import DateTimePicker from "@react-native-community/datetimepicker";
// Hooks
import useNotification from "../../../hooks/useNotification";
//Form Validation
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


const AcceptDeclineInvitationsModal = ({
  modalVisible,
  setModalVisible,
  handleAcceptInvitation,
  handleRejectInvitation,
  invitationUUID,
  confirmationModalStatus,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          {confirmationModalStatus === "accept" ? (
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to ACCEPT the invitation?
              </Text>

              <View style={styles.buttons}>
                <Pressable
                  style={styles.pressable}
                  onPress={() => handleAcceptInvitation(invitationUUID)}
                >
                  <FA5Icon
                    name="check-circle"
                    color={COLOR.green}
                    solid
                    size={44}
                  />
                </Pressable>
                <Pressable
                  style={styles.pressable}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <FA5Icon
                    name="times-circle"
                    color={COLOR.red}
                    solid
                    size={44}
                  />
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to DECLINE the invitation?
              </Text>

              <View style={styles.buttons}>
                <Pressable
                  style={styles.pressable}
                  onPress={() => handleRejectInvitation(invitationUUID)}
                >
                  <FA5Icon
                    name="check-circle"
                    color={COLOR.green}
                    solid
                    size={44}
                  />
                </Pressable>
                <Pressable
                  style={styles.pressable}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <FA5Icon
                    name="times-circle"
                    color={COLOR.red}
                    solid
                    size={44}
                  />
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default AcceptDeclineInvitationsModal;
