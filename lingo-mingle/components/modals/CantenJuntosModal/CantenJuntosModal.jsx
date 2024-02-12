// Imports
import React, { useState, useEffect } from "react";
import { Alert, Modal, Text, Pressable, View, TextInput } from "react-native";

// Styles
import styles from "./CantenJuntosModal.styles";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import { COLOR } from "../../../constants";
import { Audio } from "expo-av";
import api from "../../../services/api";
import { onSnapshot, collection } from "firebase/firestore";
import { database } from "../../../config/firebase";

//TO DO: fix UI
const CantenJuntosModal = ({ modalVisible, setModalVisible }) => {
  const [sound, setSound] = useState();
  const [playGame, setPlayGame] = useState(false);
  const [songTextIndex, setSongTextIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [gamesData, setGamesData] = useState({});
  const [dirty, setDirty] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [localCorrect, setLocalCorrect] = useState(false);
  const [AudioPos,SetPos]=useState(0);
  const text = [
    "Voy a reír voy a gozar Vivir mi _ _ _ _, la la la la",
    "Vivir mi vida, la la la la",
    "A veces llega la lluvia Para _ _ _ _ _ _ _ las heridas",
    "A veces llega la lluvia Para limpiar las heridas",
    "Sueño cuando era pequeño,Sin preocupación en el _ _ _ _ _ _ _",
    "Sueño cuando era pequeño,Sin preocupación en el corazón",
    "Sigo viendo aquel momento Se desvaneció, _ _ _ _ _ _ _ _ _ _ _",
    "Sigo viendo aquel momento Se desvaneció, desapareció",
  ];


  useEffect(() => {
    const fetchData = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/sounds/VivirMiVida.mp3")
      );
      setSound(sound);
    };

    fetchData().catch(console.error);
  }, []);


  useEffect(() => {
    const listener = onSnapshot(collection(database, "games"), (snapshot) => {
      snapshot.forEach((doc) => {
        setGamesData(doc.data());
        setPlayGame(doc.data().playGame);
        setCorrectAnswer(doc.data().player1Answer);
        if (doc.data().player1Answer === false) {
          setLocalCorrect(false);
        }
      });
    });
  }, []);

  useEffect(() => {
    
    const update = async () => {
      const newData = {
        ...gamesData,
        player1Answer: false,
      };
      setGamesData(newData);
      await api.setGamesData(newData);
      setDirty(false);
    };

    setTimeout(async () => {
      
      if (correctAnswer) {
        

        if (songTextIndex === 0) {
          let pos=sound.positionMillis;
          console.log(pos)
          setSongTextIndex(songTextIndex + 1);
          setTimeout(async () => {
            setSongTextIndex(songTextIndex + 2);
            setAnswer("");
            //await sound.playAsync();
            await sound.playFromPositionAsync(9995);
            const time = 10000;
            const songTimeout = setTimeout(async () => {
              await sound.pauseAsync();
            }, time);
          }, 1000);
        }
        if (songTextIndex === 2) {
          setSongTextIndex(songTextIndex + 1);
          ;

          setTimeout(async () => {
            setSongTextIndex(songTextIndex + 2);
            setAnswer("");
            sound.unloadAsync()
            playSound(1);
          }, 1000);
        }
        if (songTextIndex === 4) {
          console.log(songTextIndex);
          setSongTextIndex(songTextIndex + 1);
          setTimeout(async () => {
            setSongTextIndex(songTextIndex + 2);
            console.log(songTextIndex);

            setAnswer("");
            //await sound.playAsync();
            await sound.playFromPositionAsync(18000);
            const time = 8000;
            const songTimeout = setTimeout(async () => {
              await sound.pauseAsync();
            }, time);
          }, 1000);
        }
        if (songTextIndex === 6) {
          setSongTextIndex(songTextIndex + 1);
          setTimeout(async () => {
            setAnswer("");
            setModalVisible(false);
          }, 2000);
        }

        update();
      }
    }, 1000);
  }, [correctAnswer]);

  const playgame = async () => {
    setPlayGame(!gamesData.playGame);

    const newData = {
      ...gamesData,
      playGame: !gamesData.playGame,
    };

    setGamesData(newData);

    await api.setGamesData(newData);
    playSound(0);
  };

  async function playSound(num) {
    console.log("Loading Sound");

    if (num == 0) {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/sounds/VivirMiVida.mp3")
      );
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
      const time = 10000;
      const songTimeout = setTimeout(async () => {
        
        await sound.pauseAsync();
      }, time);
    }

    if (num == 1) {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/sounds/Sofia.mp3")
      );
      setSound(sound);
      console.log("Playing Sound");
      await sound.playAsync();
      const time = 18000;
      const songTimeout = setTimeout(async () => {
        await sound.pauseAsync();
      }, time);
    }
  }

  const restartSong = async (num) => {
    if (num == 0) {
      const audio = await sound.getStatusAsync();
      console.log(audio.positionMillis);
      const time = 10000;
      const positionMillis = audio.positionMillis - time;
      await sound.playFromPositionAsync(positionMillis);

      const songTimeout = setTimeout(async () => {
        await sound.pauseAsync();
      }, time);
    }
    if (num == 1) {
      const audio = await sound.getStatusAsync();
      console.log(audio.positionMillis);
      const time = 18000;
      const positionMillis = audio.positionMillis - time;
      await sound.playFromPositionAsync(positionMillis);

      const songTimeout = setTimeout(async () => {
        await sound.pauseAsync();
      }, time);
    }
  };

  const onCancel = () => {
    setSongTextIndex(0);
    setAnswer("");
    setModalVisible(!modalVisible);
    if (sound) {
      sound.unloadAsync();
    }
  };

  const verifyAnswer = async () => {
    console.log(songTextIndex);
    console.log(answer);

    if (songTextIndex == 0) {
      if (answer == "vida") {
        setDirty(true);
        const newData = {
          ...gamesData,
          player1Answer: true,
        };
        setGamesData(newData);
        await api.setGamesData(newData);
        setLocalCorrect(true);
      }
    }
    if (songTextIndex == 2) {
      if (answer == "limpiar") {
        setDirty(true);
        const newData = {
          ...gamesData,
          player1Answer: true,
        };
        setGamesData(newData);
        await api.setGamesData(newData);
        setLocalCorrect(true);
      }
    }

    if (songTextIndex == 4) {
      if (answer == "corazon") {
        setDirty(true);
        const newData = {
          ...gamesData,
          player1Answer: true,
        };
        setGamesData(newData);

        await api.setGamesData(newData);
        setLocalCorrect(true);
      }
    }

    if (songTextIndex == 6) {
      if (answer == "desaparecio") {
        setDirty(true);
        const newData = {
          ...gamesData,
          player1Answer: true,
        };
        setGamesData(newData);
        await api.setGamesData(newData);
        setLocalCorrect(true);
      }
    }
  };

  const handleBackButton = async () => {
    setPlayGame(false);

    const newData = {
      ...gamesData,
      playGame: false,
    };

    setGamesData(newData);

    await api.setGamesData(newData);
    onCancel();
  };

  const onChangeText = (value) => {
    setAnswer(value);
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
                    <FontistoIcon name="music-note" size={20} />
                    {songTextIndex >= 0 && songTextIndex <= 3
                      ? "Vivir Mi Vida"
                      : "Sofia"}
                    <FontistoIcon name="music-note" size={20} />
                  </Text>
                </View>

                <View style={styles.gameOptionsColumn}>
                  <Text>{text[songTextIndex]}</Text>
                </View>

                <View>
                  {correctAnswer !== localCorrect && dirty === false ? (
                    <Text style={styles.WinText}>
                      The other player answered correctly before you
                    </Text>
                  ) : (
                    ""
                  )}
                </View>

                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText}
                  value={answer}
                  placeholder="Insert the correct word"
                />
                <Pressable
                  onPress={() => {
                    verifyAnswer(answer);
                  }}
                  style={styles.playButton}
                >
                  <Text style={styles.playButtonText}>Insert Word</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    songTextIndex >= 0 && songTextIndex <= 3
                      ? restartSong(0)
                      : restartSong(1);
                  }}
                  style={styles.playButton}
                >
                  <Text style={styles.playButtonText}>Restart Audio</Text>
                </Pressable>
              </>
            ) : (
              <>
                <View style={styles.gameOptionsColumn}>
                  <Text style={styles.instructions}>
                    In this game a song will be played and you have to insert
                    the correct missing word.{" "}
                  </Text>
                </View>
                <View style={styles.gameOptionsColumn}>
                  <Pressable
                    onPress={() => {
                      playgame();
                    }}
                    style={styles.playButton}
                  >
                    <Text style={styles.playButtonText}>Play</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CantenJuntosModal;
