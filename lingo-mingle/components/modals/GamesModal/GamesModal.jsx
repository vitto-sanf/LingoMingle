// Imports
import React from "react";
import { Modal, Text, Pressable, View } from "react-native";

// Styles
import styles from "./GamesModal.style";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../../constants";

const GamesModal = ({
  modalVisible,
  setModalVisible,
  setModalAdivinaVisible,
  setModalCantenJuntosVisible,
  setModalNuevoTemaVisible,
}) => {
  const onCancel = () => {
    setModalVisible(!modalVisible);
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
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalText}>Choose a game</Text>
            <View style={{ flex: 1 }} />
            <Pressable onPress={onCancel}>
              <FA5Icon name="times" size={20} color={COLOR.black} />
            </Pressable>
          </View>
          {/* Game 1 - Adivina la palabra */}
          <Pressable style={styles.button} onPress={setModalAdivinaVisible}>
            <FA5Icon
              name="search"
              color={COLOR.white}
              size={20}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Adivina la palabra</Text>
          </Pressable>
          {/* Game 2 - Canten Juntos */}
          <Pressable
            style={[styles.button, { marginVertical: 15 }]}
            onPress={setModalCantenJuntosVisible}
          >
            <FA5Icon
              name="music"
              color={COLOR.white}
              size={20}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Canten Juntos</Text>
          </Pressable>
          {/* Game 3 - Nuevo Tema */}
          <Pressable style={styles.button} onPress={setModalNuevoTemaVisible}>
            <FA5Icon
              name="stack-exchange"
              color={COLOR.white}
              size={20}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Nuevo tema</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default GamesModal;
