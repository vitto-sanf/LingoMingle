// Imports
import { Alert, Modal, Text, Pressable, View } from "react-native";

// Styles
import styles from "./AcceptDeclineInvitation.style";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../../constants";

const AcceptDeclineInvitationsModal = ({
  modalVisible,
  setModalVisible,
  handleAcceptInvitation,
  handleRejectInvitation,
  handleCancelInvitation,
  invitationUUID,
  confirmationModalStatus,
}) => {
  return (
    <View style={styles.centeredView}>
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
          {confirmationModalStatus === "accept" ? (
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to accept the invitation?
              </Text>

              <View style={styles.buttons}>
                <Pressable
                  style={styles.pressable}
                  onPress={() => handleAcceptInvitation(invitationUUID)}
                >
                  <FA5Icon
                    name="check-circle"
                    color={COLOR.green}
                    solid
                    size={44}
                  />
                </Pressable>
                <Pressable
                  style={styles.pressable}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <FA5Icon
                    name="times-circle"
                    color={COLOR.red}
                    solid
                    size={44}
                  />
                </Pressable>
              </View>
            </View>
          ) : confirmationModalStatus === "decline" ? (
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to decline the invitation?
              </Text>

              <View style={styles.buttons}>
                <Pressable
                  style={styles.pressable}
                  onPress={() => handleRejectInvitation(invitationUUID)}
                >
                  <FA5Icon
                    name="check-circle"
                    color={COLOR.green}
                    solid
                    size={44}
                  />
                </Pressable>
                <Pressable
                  style={styles.pressable}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <FA5Icon
                    name="times-circle"
                    color={COLOR.red}
                    solid
                    size={44}
                  />
                </Pressable>
              </View>
            </View>
          ) : confirmationModalStatus === "cancel" ? (
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to cancel the invitation?
              </Text>

              <View style={styles.buttons}>
                <Pressable
                  style={styles.pressable}
                  onPress={() => handleCancelInvitation(invitationUUID)}
                >
                  <FA5Icon
                    name="check-circle"
                    color={COLOR.green}
                    solid
                    size={44}
                  />
                </Pressable>
                <Pressable
                  style={styles.pressable}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <FA5Icon
                    name="times-circle"
                    color={COLOR.red}
                    solid
                    size={44}
                  />
                </Pressable>
              </View>
            </View>
          ) : (
            ""
          )}
        </View>
      </Modal>
    </View>
  );
};

export default AcceptDeclineInvitationsModal;
