// Imports
import React, { useState, useEffect } from "react";
import { Alert, Modal, Text, Pressable, View } from "react-native";

// Styles
import styles from "./CantenJuntosModal.styles";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import { COLOR } from "../../../constants";
import { Audio } from 'expo-av';

const CantenJuntosModal = ({ modalVisible, setModalVisible }) => {


  const [sound, setSound] = useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../../../assets/sounds/testSound.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);



  /*const words = [
    { word: "SOL", correctAnswer: true },
    { word: "NUBE", correctAnswer: false },
    { word: "SUEL", correctAnswer: false },
    { word: "LUNA", correctAnswer: false },
    { word: "NUBE", correctAnswer: true },
    { word: "FUERTE", correctAnswer: false },
    { word: "LLUVIA", correctAnswer: false },
    { word: "NIEVE", correctAnswer: false },
  ];*/

  /*
  const icons = [{ icon: "day-sunny" }, { icon: "cloudy" }];

  const initialButtonStates = Array.from(
    { length: words.length + 1 },
    () => null
  );

  const [buttonStates, setButtonStates] = useState(initialButtonStates);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
*/
  const onCancel = () => {
    setModalVisible(!modalVisible);
  };

  const handleBackButton = () => {
    setCurrentWordIndex(0);
    setCurrentIconIndex(0);
    onCancel();
  };
/*
  const checkAnswer = (isCorrect, index) => {
    const newButtonStates = initialButtonStates.slice();
    newButtonStates[index] = isCorrect;
    setButtonStates(newButtonStates);

    if (isCorrect) {
      setCurrentWordIndex((prevIndex) => (prevIndex + 4) % words.length);
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }
  };*/

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
          <View style={styles.modalHeader}>
            <Pressable onPress={handleBackButton} style={styles.backButton}>
              <FontistoIcon name="arrow-left" size={20} />
            </Pressable>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.modalHeaderText}>Canten Juntos</Text>
            </View>
          </View>
          <View style={styles.gameOptionsContainer}>
          <Pressable
                  /*key={index}
                  style={[
                    styles.gameOptionButton,
                    {
                      backgroundColor:
                        buttonStates[index] === true
                          ? COLOR.green
                          : buttonStates[index] === false
                          ? COLOR.red
                          : COLOR.lightWhite,
                    },
                  ]}*/
                  onPress={playSound}
                >
                  <Text style={styles.gameOptionTextButton}>
                    Play
                  </Text>
                </Pressable>
          </View>
          {/*
          <FontistoIcon
            name={icons[currentIconIndex].icon}
            color="black"
            size={70}
            style={styles.gameIcon}
          />
          <View style={styles.gameOptionsContainer}>
            <View style={styles.gameOptionsColumn}>
              {[0, 1].map((index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.gameOptionButton,
                    {
                      backgroundColor:
                        buttonStates[index] === true
                          ? COLOR.green
                          : buttonStates[index] === false
                          ? COLOR.red
                          : COLOR.lightWhite,
                    },
                  ]}
                  onPress={() =>
                    checkAnswer(
                      words[currentWordIndex + index].correctAnswer,
                      index
                    )
                  }
                >
                  <Text style={styles.gameOptionTextButton}>
                    {words[currentWordIndex + index].word}
                  </Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.gameOptionsColumn}>
              {[2, 3].map((index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.gameOptionButton,
                    {
                      backgroundColor:
                        buttonStates[index] === true
                          ? COLOR.green
                          : buttonStates[index] === false
                          ? COLOR.red
                          : COLOR.lightWhite,
                    },
                  ]}
                  onPress={() =>
                    checkAnswer(
                      words[currentWordIndex + index].correctAnswer,
                      index
                    )
                  }
                >
                  <Text style={styles.gameOptionTextButton}>
                    {words[currentWordIndex + index].word}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        */}

        </View>
      </View>
    </Modal>
  );
};

export default CantenJuntosModal;
