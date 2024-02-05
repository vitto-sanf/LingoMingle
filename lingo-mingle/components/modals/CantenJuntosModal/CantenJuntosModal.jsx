// Imports
import React, { useState, useEffect } from "react";
import { Alert, Modal, Text, Pressable, View, TextInput } from "react-native";

// Styles
import styles from "./CantenJuntosModal.styles";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import { COLOR } from "../../../constants";
import { Audio } from 'expo-av';

const CantenJuntosModal = ({ modalVisible, setModalVisible }) => {


  const [sound, setSound] = useState();
  const [playGame, setPlayGame]=useState(false);
  const [nameSong, setNameSong]= useState(0);
  const [answer, setAnswer]= useState("");

  const text = [
    "Voy a reír voy a gozar Vivir mi _ _ _ _, la la la la",
    "Vivir mi vida, la la la la",
    "A veces llega la lluvia Para _ _ _ _ _ _ _ las heridas",
    "A veces llega la lluvia Para limpiar las heridas"
  ];

  const songs =  ["../../../assets/sounds/VivirMiVida.mp3","../../../assets/sounds/VivirMiVida.mp3"];

  async function playSound() {




    console.log('Loading Sound');
  
    let audio=songs[nameSong];
    
    //let audioPath= `../../../assets/sounds/${audio}` //`${audio}`;
    const { sound } = await Audio.Sound.createAsync( require("../../../assets/sounds/VivirMiVida.mp3"));
  
    
    setSound(sound);

    

    console.log('Playing Sound');
    await sound.playAsync();
    const time = 23500;
    const songTimeout = setTimeout(async ()=>{
      await sound.pauseAsync();
    },time)
  }

  /*
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);*/


const restartSong = async ()=>{
  
  
  const audio = await sound.getStatusAsync()
  console.log(audio.positionMillis)
  const time = 23500;
  const positionMillis = audio.positionMillis - time
  await sound.playFromPositionAsync(positionMillis)
  
  const songTimeout = setTimeout(async ()=>{
    await sound.pauseAsync();
  },time)
} 

  
  const onCancel = () => {
    setModalVisible(!modalVisible);
    sound.unloadAsync();
  };

  const verifyAnswer = async() =>{
    console.log(answer);
    if (answer=="vida"){
      await sound.playAsync();
      const time = 23500;
      const songTimeout = setTimeout(async ()=>{
        await sound.pauseAsync();
      },time)
  }
};

  const handleBackButton = () => {
    //setCurrentWordIndex(0);
    //setCurrentIconIndex(0);
    setPlayGame(false);
    onCancel();
  };

  const onChangeText = (value) =>{
    setAnswer(value);
  }


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
            {playGame ? (
              <>
                <Text>
                  <FontistoIcon name="volume-up" size={20} />
                </Text>

                <View style={styles.gameOptionsColumn}>
                  <Text>
                    <FontistoIcon name="music-note" size={20} /> Feliz Navidad{" "}
                    <FontistoIcon name="music-note" size={20} />
                  </Text>
                </View>

                <View style={styles.gameOptionsColumn}>
                  <Text>
                  Voy a reír voy a gozar Vivir mi _ _ _ _, la la la la
                  </Text>
                </View>

                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText}
                  value={answer}
                  placeholder="Insert the correct word"
                />
                <Pressable onPress={() => {
                  verifyAnswer(answer);
                  
                }
                 }>
                  <Text style={styles.gameOptionTextButton}>Insert</Text>
                </Pressable>
                <Pressable onPress={() => {
                restartSong();
                
              }
               }>
                <Text style={styles.gameOptionTextButton}>restart</Text>
              </Pressable>

              </>
            ) : (
              <>
                <Text>
                  In this a song will be played and you have to insert the
                  correct missing word
                </Text>

                <Pressable onPress={() => {
                  setPlayGame(true);
                  playSound();
                }
                 }>
                  <Text style={styles.gameOptionTextButton}>play</Text>
                </Pressable>
              
              
            </>
            )}
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
