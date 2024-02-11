// Imports
import React, { useState,useEffect} from "react";
import { Alert, Modal, Text, Pressable, View } from "react-native";

// Styles
import styles from "./AdivinaLaPalabraModal.styles";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import { COLOR } from "../../../constants";
import api from "../../../services/api";
import { onSnapshot, collection } from "firebase/firestore";
import { database } from "../../../config/firebase";

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
        setPlayGame((doc.data().playGame));
        setCorrectAnswer((doc.data().player1Answer));
        if(doc.data().player1Answer===false)
        {
          setLocalCorrect(false)
          setCorrectAnswer(false)
        }
      });
    });
  }, []);

  useEffect(()=>{

     const update= async ()=>{
      const newData = {
        ...gamesData,
        player1Answer: false,
      };
      setGamesData(newData);
      await api.setGamesData(newData);
      setDirty(false);
     }
     
      setTimeout(async() => {
        if (correctAnswer)
    {
      
      //let prevWordIndex=currentWordIndex;
      //let prevIconIndex=currentIconIndex;
        setButtonStates(initialButtonStates);
        //if(prevWordIndex!==currentWordIndex/*(prevWordIndex+4 % words.length)*/ && prevIconIndex!==currentIconIndex/*(prevIconIndex+1% icons.length)*/)
        //{
          //if(dirty)
          //{
          setCurrentWordIndex((prevIndex) => (prevIndex + 4) % words.length);
          setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
          setButtonStates(initialButtonStates);
          //setDirty(false);
         //}
       // }
       update();
       
      }
      }, 1500);
    
  },[correctAnswer])

  const playgame = async () =>{
    setPlayGame(!gamesData.playGame);

    const newData = {
      ...gamesData,
      playGame: !gamesData.playGame,
    };

    setGamesData(newData);

    
    await api.setGamesData(newData);
    
  }


  const onCancel = () => {
    setModalVisible(!modalVisible);
    setButtonStates(initialButtonStates);
    
  };

  const handleBackButton = async () => {
    setCurrentWordIndex(0);
    setCurrentIconIndex(0);
    setPlayGame(false);

    const newData = {
      ...gamesData,
      playGame: false,
    };

    setGamesData(newData);

    //console.log("client data", newData);
    await api.setGamesData(newData);
    onCancel();
  };

  const checkAnswer = async (isCorrect, index) => {
    const newButtonStates = initialButtonStates.slice();
    newButtonStates[index] = isCorrect;
    setButtonStates(newButtonStates);
    /*setTimeout(() => {
      setButtonStates(initialButtonStates);
    }, 1500);*/

   /* if (gamesData.player1Answer)
    {
      setTimeout(() => {
        setButtonStates(initialButtonStates);
      setCurrentWordIndex((prevIndex) => (prevIndex + 4) % words.length);
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
      }, 1500);
    }*/

    if (isCorrect) {
      const newData = {
        ...gamesData,
        player1Answer: isCorrect,
      };
      setGamesData(newData);
      await api.setGamesData(newData);
      setLocalCorrect(true);
      //setDirty(true);


      //setTimeout(async () => {
       // setButtonStates(initialButtonStates);
     // setCurrentWordIndex((prevIndex) => (prevIndex + 4) % words.length);
      //setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
     /* const newData = {
        ...gamesData,
        player1Answer: false,
      };
      setGamesData(newData);
      await api.setGamesData(newData);*/
      //}, 1500);
      
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
          <View style={styles.modalHeader}>
            <Pressable onPress={handleBackButton} style={styles.backButton}>
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
            {/*correctAnswer!==localCorrect  && !dirty?
              <Text>
              L'altro giocatore ha risposto correttamente prima di te
            </Text>:''*/}
            
          </View>
          </>
          ):(

            <>
                <View style={styles.gameOptionsColumn}>
                  <Text style={styles.instructions}>
                  In this game a picture will be displayed and you have to guess the
                  name of the object in the picture.{" "}
                  </Text>
                </View>
                <View style={styles.gameOptionsColumn}>
                  <Pressable onPress={() => {
                    //setPlayGame(true);
                    playgame();
                    //playSound(0);
                  }} style={styles.playButton}>
                    <Text style={styles.playButtonText}>Play</Text>
                  </Pressable>
                </View>
              </>
          )
          }
        </View>
      </View>
    </Modal>
  );
};

export default AdivinaLaPalabraModal;
