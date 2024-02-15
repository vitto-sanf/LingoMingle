// Imports
import React, { useState, useEffect } from "react";
import { Alert, Modal, Text, Pressable, View } from "react-native";
import { onSnapshot, collection } from "firebase/firestore";
import { database } from "../../../config/firebase";

// Services
import api from "../../../services/api";

// Styles
import styles from "./AdivinaLaPalabraModal.styles";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import { COLOR, FONT } from "../../../constants";

const AdivinaLaPalabraModal = ({ modalVisible, setModalVisible }) => {
  const words = [
    { word: "SOL", correctAnswer: true },
    { word: "NUBE", correctAnswer: false },
    { word: "SUEL", correctAnswer: false },
    { word: "LUNA", correctAnswer: false },
    { word: "NUBE", correctAnswer: true },
    { word: "FUERTE", correctAnswer: false },
    { word: "LLUVIA", correctAnswer: false },
    { word: "NIEVE", correctAnswer: false },
  ];

  const icons = [{ icon: "day-sunny" }, { icon: "cloudy" }];

  const initialButtonStates = Array.from(
    { length: words.length + 1 },
    () => null
  );

  const [buttonStates, setButtonStates] = useState(initialButtonStates);
  const [playGame, setPlayGame] = useState(false);
  const [dirty, setDirty] = useState(true);

  const [gamesData, setGamesData] = useState({});
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [localCorrect, setLocalCorrect] = useState(false);

  useEffect(() => {
    const listener = onSnapshot(collection(database, "games"), (snapshot) => {
      snapshot.forEach((doc) => {
        setGamesData(doc.data());
        setPlayGame(doc.data().playGame);
        if (doc.data().player1Answer) {
          setCorrectAnswer(doc.data().player1Answer);
        }

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

      setTimeout(() => {
        setDirty(false);
        //setLocalCorrect(false);
        setCorrectAnswer(false);
      }, 800);
    };

    setTimeout(async () => {
      if (correctAnswer) {
        setButtonStates(initialButtonStates);
        update();
        setCurrentWordIndex((prevIndex) => (prevIndex + 4) % words.length);
        setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
        setButtonStates(initialButtonStates);
      }
    }, 1500);
  }, [correctAnswer]);

  const playgameAdivina = async () => {
    setPlayGame(!gamesData.playGame);

    const newData = {
      ...gamesData,
      playGame: !gamesData.playGame,
    };

    setGamesData(newData);

    await api.setGamesData(newData);
  };

  const onCancel = () => {
    setModalVisible(!modalVisible);
    setButtonStates(initialButtonStates);
  };

  const handleBackButtonAdivina = async () => {
    setCurrentWordIndex(0);
    setCurrentIconIndex(0);
    setPlayGame(false);

    const newData = {
      ...gamesData,
      playGame: false,
    };

    setGamesData(newData);

    await api.setGamesData(newData);
    onCancel();
  };

  const checkAnswer = async (isCorrect, index) => {
    const newButtonStates = initialButtonStates.slice();
    newButtonStates[index] = isCorrect;
    setButtonStates(newButtonStates);

    if (isCorrect) {
      const newData = {
        ...gamesData,
        player1Answer: isCorrect,
      };
      setGamesData(newData);
      await api.setGamesData(newData);
      setLocalCorrect(true);
      //console.log("local: ", localCorrect);
      //console.log("corr:", correctAnswer);
    }
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
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Pressable
              onPress={handleBackButtonAdivina}
              style={styles.backButton}
            >
              <FontistoIcon name="arrow-left" size={20} />
            </Pressable>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.modalHeaderText}>Adivina La Palabra</Text>
            </View>
          </View>
          {playGame ? (
            <>
              <FontistoIcon
                name={icons[currentIconIndex].icon}
                color="black"
                size={70}
                style={styles.gameIcon}
              />
              <View>
                {correctAnswer !== localCorrect && dirty === false ? (
                  <Text style={styles.WinText}>
                    The other player answered correctly before you
                  </Text>
                ) : (
                  ""
                )}
              </View>
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
                      onPress={() => {
                        checkAnswer(
                          words[currentWordIndex + index].correctAnswer,
                          index
                        );
                        setDirty(true);
                        console.log("dirty true: ", dirty);
                      }}
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
            </>
          ) : (
            <View>
              <Text style={styles.instructions}>
                In this game you will see a picture and you must associate the
                picture you see with one of four options.
              </Text>
              <Text style={styles.haveFunText}>Have fun!</Text>
              <Pressable
                onPress={() => {
                  playgameAdivina();
                }}
                style={styles.playButton}
              >
                <Text style={styles.playButtonText}>Start game</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AdivinaLaPalabraModal;
