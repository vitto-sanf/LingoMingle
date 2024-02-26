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
                  style={[
                    styles.button,
                    { backgroundColor: COLOR.gray2, marginRight: 10 },
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    { backgroundColor: COLOR.green, marginLeft: 10 },
                  ]}
                  onPress={() => handleAcceptInvitation(invitationUUID)}
                >
                  <Text style={styles.buttonText}>Accept</Text>
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
                  style={[
                    styles.button,
                    { backgroundColor: COLOR.gray2, marginRight: 10 },
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.button,
                    { backgroundColor: COLOR.red, marginLeft: 10 },
                  ]}
                  onPress={() => handleRejectInvitation(invitationUUID)}
                >
                  <Text style={styles.buttonText}>Decline</Text>
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
                  style={[
                    styles.button,
                    { backgroundColor: COLOR.gray2, marginRight: 10 },
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    { backgroundColor: COLOR.red, marginLeft: 10 },
                  ]}
                  onPress={() => handleCancelInvitation(invitationUUID)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
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
