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
import styles from "./AdivinaLaPalabraModal.styles";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../../constants";
import api from "../../../services/api";
import DateTimePicker from "@react-native-community/datetimepicker";
// Hooks
import useNotification from "../../../hooks/useNotification";
//Form Validation
//import * as yup from "yup";
//import { useForm, Controller } from "react-hook-form";
//import { yupResolver } from "@hookform/resolvers/yup";

//TODO: fix the styling
const AdivinaLaPalabraModal = ({
  modalVisible,
  setModalVisible,
  toEdit,
  setDirty,
}) => {
  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";
  const notify = useNotification();
 
  

  const onCancel = (formData) => {
    setModalVisible(!modalVisible);
    
  };

  const onSubmit = () => {
    
  };

  return (
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
        <View style={styles.modalView}>
          
          <Text style={styles.modalText}>Adivina La Palabra</Text>
          
          <View styles={styles.formview}>
          <Pressable
              style={[styles.button, styles.buttonSend]}
              //onPress={onCancel}
            >
            
              <Text style={styles.textStyle}>SOL </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSend]}
              //onPress={onCancel}
            >
            
              <Text style={styles.textStyle}>NUBE</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSend]}
              //onPress={onCancel}
            >
            
              <Text style={styles.textStyle}>SUEL</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSend]}
              //onPress={onCancel}
            >
            
              <Text style={styles.textStyle}>LUNA</Text>
            </Pressable>
          
          </View>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onCancel}
            >
            <FA5Icon name="arrow-left" color={COLOR.white} size={10} />
              <Text style={styles.textStyle}>Back</Text>
            </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AdivinaLaPalabraModal;