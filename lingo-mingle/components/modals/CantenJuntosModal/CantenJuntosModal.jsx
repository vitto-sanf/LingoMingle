// Imports
import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  Text,
  Pressable,
  View,
  TextInput,
  Keyboard,
} from "react-native";
import { onSnapshot, collection } from "firebase/firestore";
import { database } from "../../../config/firebase";
import { Audio } from "expo-av";

// Services
import api from "../../../services/api";

// Styles
import styles from "./CantenJuntosModal.styles";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import { COLOR } from "../../../constants";

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
  const [AudioPos, SetPos] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(false);
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
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
          let pos = sound.positionMillis;
          console.log(pos);
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
          setTimeout(async () => {
            setSongTextIndex(songTextIndex + 2);
            setAnswer("");
            sound.unloadAsync();
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
      } else {
        setWrongAnswer(true);
        setTimeout(() => {
          setWrongAnswer(false);
        }, 1500);
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
      } else {
        setWrongAnswer(true);
        setTimeout(() => {
          setWrongAnswer(false);
        }, 1500);
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
      } else {
        setWrongAnswer(true);
        setTimeout(() => {
          setWrongAnswer(false);
        }, 1500);
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
      } else {
        setWrongAnswer(true);
        setTimeout(() => {
          setWrongAnswer(false);
        }, 1500);
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
    setAnswer(value.trim().toLowerCase());
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            isKeyboardOpen ? { height: "50%" } : { height: "35%" },
          ]}
        >
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
                <View style={styles.gameOptionsColumn}>
                  <Text style={styles.songName}>
                    {/* <FontistoIcon name="music-note" size={20} /> */}
                    {songTextIndex >= 0 && songTextIndex <= 3
                      ? "Vivir Mi Vida"
                      : "Sofia"}
                    {/* <FontistoIcon name="music-note" size={20} /> */}
                  </Text>
                </View>

                <View style={styles.gameOptionsColumn}>
                  <Text style={styles.songText}>{text[songTextIndex]}</Text>
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

                <View>
                  {wrongAnswer ? (
                    <Text style={styles.WinText}>Wrong word! Try Again</Text>
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
                <View style={styles.buttonContainer}>
                  <Pressable
                    onPress={() => {
                      songTextIndex >= 0 && songTextIndex <= 3
                        ? restartSong(0)
                        : restartSong(1);
                    }}
                    style={[
                      styles.playButton,
                      {
                        backgroundColor: COLOR.gray,
                        marginRight: 5,
                        width: "48%",
                      },
                    ]}
                  >
                    <Text style={styles.playButtonText}>Restart</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      verifyAnswer(answer);
                    }}
                    style={[styles.playButton, { width: "48%" }]}
                  >
                    <Text style={styles.playButtonText}>Submit</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <View>
                <Text style={styles.instructions}>
                  In this game you will see a song lyric and have to enter the
                  correct word to complete the song lyrics.
                </Text>
                <Text style={styles.haveFunText}>Have fun!</Text>
                <Pressable
                  onPress={() => {
                    playgame();
                  }}
                  style={styles.playButton}
                >
                  <Text style={styles.playButtonText}>Start game</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CantenJuntosModal;
