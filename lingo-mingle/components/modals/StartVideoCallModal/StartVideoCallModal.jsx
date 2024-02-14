// Imports
import { useRouter } from "expo-router";
import { Modal, Pressable, Text, View } from "react-native";

// Styles
import styles from "./StartVideoCallModal.style";
import { COLOR } from "../../../constants";

const StartVideoCallModal = ({ isModalVisible, setIsModalVisible }) => {
  const router = useRouter();

  const onConfirmStartMeeting = () => {
    const roomId = 100000;
    router.push(`/rooms/${roomId}`);
    setIsModalVisible(false);
  };

  const onCancelStartMeeting = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(!isModalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            You are going to be connected with random user on videocall
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable onPress={onConfirmStartMeeting} style={styles.button}>
              <Text
                style={[styles.buttonText, { backgroundColor: COLOR.green }]}
              >
                Continue
              </Text>
            </Pressable>
            <Pressable onPress={onCancelStartMeeting} style={styles.button}>
              <Text style={[styles.buttonText, { backgroundColor: COLOR.red }]}>
                Exit
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default StartVideoCallModal;
