// Imports
import React, { useState, useEffect } from "react";
import { Alert, Modal, Text, Pressable, View, TextInput } from "react-native";

// Styles
import styles from "./NuevoTemaModal.style";
import Icon from "react-native-vector-icons/FontAwesome5";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import { COLOR,FONT } from "../../../constants";
import { Audio } from "expo-av";
import api from "../../../services/api";
import { onSnapshot, collection } from "firebase/firestore";
import { database } from "../../../config/firebase";


const NuevoTemaModal = ({ modalVisible, setModalVisible }) => {
  const [play, setPlay] = useState(false);
  const [suggestionVisible, setSuggestionVisible] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [gamesData, setGamesData] = useState({});
  const [next, setNext] = useState(false);
 
  const questions = [
    {
      question: "¿Cuál es su color favorito?",
      suggestion: (
        <>
          <Text>
            White <Icon name="arrows-alt-h" solid size={15} /> Blanco
            {"\n"}
          </Text>
          <Text>
            Red <Icon name="arrows-alt-h" solid size={15} /> Rojo
            {"\n"}
          </Text>
          <Text>
            Light Blue <Icon name="arrows-alt-h" solid size={15} /> Azul
            {"\n"}
          </Text>
          <Text>
            Orange <Icon name="arrows-alt-h" solid size={15} /> Naranja
            {"\n"}
          </Text>
          <Text>
            Pink <Icon name="arrows-alt-h" solid size={15} /> Rosa
            {"\n"}
          </Text>
        </>
      ),
    },
    {
      question: "¿Cuál es el plato que más te gusta cocinar?",
      suggestion: (
        <>
          <Text>
            Recipe <Icon name="arrows-alt-h" solid size={15} /> Receta
            {"\n"}
          </Text>
          <Text>
            Kitchen <Icon name="arrows-alt-h" solid size={15} /> Cocina
            {"\n"}
          </Text>
          <Text>
           Sweets <Icon name="arrows-alt-h" solid size={15} /> Dulces
            {"\n"}
          </Text>
          <Text>
            Flavor <Icon name="arrows-alt-h" solid size={15} /> Sabor
            {"\n"}
          </Text>
          <Text>
          Preparation <Icon name="arrows-alt-h" solid size={15} /> Preparación
            {"\n"}
          </Text>
        </>
      ),
    },
    {
      question: "¿Qué te gusta hacer en tu tiempo libre?",
      suggestion: (
        <>
          <Text>
            Travel <Icon name="arrows-alt-h" solid size={15} /> Viaje
            {"\n"}
          </Text>
          <Text>
          Training <Icon name="arrows-alt-h" solid size={15} /> Formación
            {"\n"}
          </Text>
          <Text>
           Read <Icon name="arrows-alt-h" solid size={15} /> Leer
            {"\n"}
          </Text>
          <Text>
            Acting <Icon name="arrows-alt-h" solid size={15} /> Actuando
            {"\n"}
          </Text>
          <Text>
          Photography <Icon name="arrows-alt-h" solid size={15} /> Fotografía
            {"\n"}
          </Text>
        </>
      ),
    },
  ];

  useEffect(() => {
    const listener = onSnapshot(collection(database, "games"), (snapshot) => {
      snapshot.forEach((doc) => {
        setGamesData(doc.data());
        setPlay((doc.data().playGame));
        setNext((doc.data().player1Answer));
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
      
    };

    //setTimeout(async () => {
      if (next) {
        //setButtonStates(initialButtonStates);
        update();
        setSuggestionVisible(false)
        if(questionNumber<2){
          setQuestionNumber(questionNumber+1);
        }else{
          setQuestionNumber(0)
        }
        //setCurrentWordIndex((prevIndex) => (prevIndex + 4) % words.length);
        //setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
       // setButtonStates(initialButtonStates);
      }
   // }, 1500);
  }, [next]);

  /*const playgame = async () =>{
    setPlay(!gamesData.playGame);

    const newData = {
      ...gamesData,
      playGame: !gamesData.playGame,
    };

    setGamesData(newData);

    //console.log("client data", newData);
    await api.setGamesData(newData);
   
  }*/


  const handleBackButton = async () => {
    setModalVisible(!modalVisible);
    setPlay(false);

    const newData = {
      ...gamesData,
      playGame: false,
      ModalNuevoTemaVisible: false,
    };

    setGamesData(newData);

    //console.log("client data", newData);
    await api.setGamesData(newData);
    //setPlay(false);
  };

  const playGame = async () => {
    //setPlay(true);
    setPlay(!gamesData.playGame);

    const newData = {
      ...gamesData,
      playGame: !gamesData.playGame,
      
    };

    setGamesData(newData);

    //console.log("client data", newData);
    await api.setGamesData(newData);

  };
  const setOption = () => {
    setSuggestionVisible(!suggestionVisible);
  };
  const changeQuestion =async()=>{

    const newData = {
      ...gamesData,
      player1Answer: true,
    };
    setGamesData(newData);
    await api.setGamesData(newData);

    /*
    setSuggestionVisible(false)
     if(questionNumber<2){
      setQuestionNumber(questionNumber+1);
     }else{
      setQuestionNumber(0)
     }*/
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
       // setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Pressable onPress={handleBackButton} style={styles.backButton}>
              <FontistoIcon name="arrow-left" size={20} />
            </Pressable>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.modalHeaderText}>Nuevo Tema </Text>
            </View>
          </View>
          <View style={styles.gameOptionsContainer}>
            {!play ? (
              <>
                <View style={styles.gameOptionsColumn}>
                  <Text style={styles.instructions}>
                    This game will give you new talking points . For each topic
                    you will find key words that will help you move the
                    conversation forward.{" "}
                  </Text>
                </View>
                <View style={styles.gameOptionsColumn}>
                  <Pressable onPress={playGame} style={styles.playButton}>
                    <Text style={styles.playButtonText}>Play</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <View style={styles.gameQuestion}>
                  <Text style={styles.instructions}>
                    {questions[questionNumber].question}
                  </Text>
                  <Pressable onPress={setOption} style={{ marginLeft: 10 }}>
                    {suggestionVisible ? (
                      <Icon name="long-arrow-alt-up" solid size={20} />
                    ) : (
                      <Icon name="long-arrow-alt-down" solid size={20} />
                    )}
                  </Pressable>
                </View>
                {suggestionVisible ? (
                  <View style={styles.gameOptionsColumn}>
                    <Text style={styles.instructions}>
                      {questions[questionNumber].suggestion}
                    </Text>
                  </View>
                ) : null}
                <View style={styles.next}>
                    <Pressable onPress={changeQuestion} style ={{flexDirection:"row"}} >
                      <Text style = {{fontFamily: FONT.bold,fontSize:15}}> Next </Text>
                      <Icon style={{marginLeft:5}} name="exchange-alt" solid size={14} />
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

export default NuevoTemaModal;
