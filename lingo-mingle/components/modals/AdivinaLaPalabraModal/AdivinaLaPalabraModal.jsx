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

  const onSubmit = () => {};

  const words = [
    { word: 'SOL', correctAnswer: true },
    { word: 'NUBE', correctAnswer: false },
    { word: 'SUEL', correctAnswer: false },
    { word: 'LUNA', correctAnswer: false },
    { word: 'NUBE', correctAnswer: true },
    { word: 'FUERTE', correctAnswer: false },
    { word: 'LLUVIA', correctAnswer: false },
    { word: 'NIEVE', correctAnswer: false },
  ];

  const icons=[
    { icon: 'sun'},
    { icon: 'cloud'},
  ]



  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  const checkAnswer = (isCorrect) => {
    if (isCorrect) {
      Alert.alert('Risposta corretta!', 'Passa alla parola successiva.');
      setCurrentWordIndex((prevIndex) => (prevIndex + 4) % words.length);
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    } else {
      Alert.alert('Risposta sbagliata', 'Prova di nuovo.');
    }
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
          <View style={styles.headContainer}>
          <Pressable
              style={[styles.buttonBack, styles.buttonClose]}
              onPress={()=>{
                setCurrentWordIndex(0)
                setCurrentIconIndex(0)
                onCancel()
                }}
            >
              <FA5Icon name="arrow-left" color={COLOR.white} size={10} />
              <Text style={styles.textStyle}>Back</Text>
            </Pressable>
            <Text style={styles.modalText}>                                        </Text>
            
          </View>
          <Text style={styles.modalText}>Adivina La Palabra</Text>
          <Text>
            <FA5Icon name={icons[currentIconIndex].icon} color={COLOR.black} size={60} />
          </Text>

          <View style={styles.formview}>
            <View style={styles.column}>
              <Pressable
                style={[styles.button, styles.buttonSend]}
                onPress={() => checkAnswer(words[currentWordIndex].correctAnswer)}
              >
                <Text style={styles.textStyle}>{words[currentWordIndex].word}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonSend]}
                onPress={() => checkAnswer(words[currentWordIndex+1].correctAnswer)}
              >
                <Text style={styles.textStyle}>{words[currentWordIndex+1].word}</Text>
              </Pressable>
            </View>
            <View style={styles.column}>
              <Pressable
                style={[styles.button, styles.buttonSend]}
                onPress={() => checkAnswer(words[currentWordIndex+2].correctAnswer)}
              >
                <Text style={styles.textStyle}>{words[currentWordIndex+2].word}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonSend]}
                onPress={() => checkAnswer(words[currentWordIndex+3].correctAnswer)}
              >
                <Text style={styles.textStyle}>{words[currentWordIndex+3].word}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AdivinaLaPalabraModal;
