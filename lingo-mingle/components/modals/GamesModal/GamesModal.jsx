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
import styles from "./GamesModal.style";
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
const GamesModal = ({
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
          
          <Text style={styles.modalText}>Choose a game</Text>
          
          <View styles={styles.formview}>
            <Pressable
              style={[styles.button, styles.buttonSend]}
              //onPress={handleSubmit(onSubmit)}
            >
            <FA5Icon name="search" color={COLOR.white} size={20} />
              <Text style={styles.textStyle}>Adivina la palabra</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSend]}
              //onPress={handleSubmit(onSubmit)}
            >
            <FA5Icon name="music" color={COLOR.white} size={20} />
              <Text style={styles.textStyle}>Canten juntos      </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSend]}
              //onPress={handleSubmit(onSubmit)}
            >
            <FA5Icon name="stack-exchange" color={COLOR.white} size={20} />
              <Text style={styles.textStyle}>Nuevo tema         </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              //onPress={handleSubmit(onSubmit)}
            >
            <FA5Icon name="times-circle" color={COLOR.white} size={20} />
              <Text style={styles.textStyle}>Close                    </Text>
            </Pressable>
            
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GamesModal;
