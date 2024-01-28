// Imports
import React, { useEffect, useState } from "react";
import { ScrollView, Text, FlatList, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import { Loader } from "../../../components/common";
import {
  NewInvitationCard,
  ScheduledInvitationCard,
} from "../../../components/cards";
import NewInvitationModal from "../../../components/modals/NewInvitationsModal/NewInvitationsModal";
import EditInvitationModal from "../../../components/modals/EditInvitationsModal/EditInvitationsModal";
import AcceptDeclineInvitationsModal from "../../../components/modals/AcceptDeclineInvitation/AcceptDeclineInvitation";

//Hooks
import useNotification from "../../../hooks/useNotification";

// Styles
import { InvitationsPageStyle as styles } from "../../../styles";
import AntIcon from "react-native-vector-icons/AntDesign";

// Services
import api from "../../../services/api";

// TODO: Implementare lo swipe che permette di passare fra le tab
const InvitationsPage = () => {
  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";
  const notify = useNotification();

  const [loading, setLoading] = useState(true);
  const [pageStatus, setPageStatus] = useState("new");

  const [invitations, setInvitations] = useState([]);
  const [dirty, setDirty] = useState(true);

  const [accInvitations, setAccInvitations] = useState([]);
  const [dirty2, setDirty2] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [confirmationModalStatus, setConfirmationModalStatus] = useState(null);

  const [toEdit, setToEdit] = useState(null);
  const [invitationUUID, setInvitationUUID] = useState(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleModalEdit = (value, item) => {
    setEditModalVisible(!editModalVisible);
    if (!editModalVisible) {
      setToEdit(item);
    }
  };

  const toggleModalConfirmation = () => {
    setConfirmationModalVisible(!confirmationModalVisible);
  };

  const handleAcceptInvitation = (invitationUUID) => {
    api
      .acceptInvitation(invitationUUID)
      .then((res) => {
        setDirty(true);
        setDirty2(true);
        notify.success(res.message);
      })
      .catch((err) => notify.error(err.message));
  };

  const handleCancelInvitation = (invitationUUID) => {
    api
      .cancelInvitation(invitationUUID)
      .then((res) => {
        setDirty(true);
        setDirty2(true);
        notify.success("Invitation deleted");
      })
      .catch((err) => notify.error("Error while deleting the invitation"));
  };

  const handleRejectInvitation = (invitationUUID) => {
    api
      .cancelInvitation(invitationUUID)
      .then((res) => {
        setDirty(true);
        setDirty2(true);
        notify.success("Invitation rejected");
      })
      .catch((err) => notify.error("Error while rejecting the invitation"));
  };

  useEffect(() => {
    if (dirty) {
      api
        .getInvitation(MY_UUID, "pending")
        .then((data) => {
          if (data) {
            setInvitations(data);
            setDirty(false);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [invitations, dirty]);

  useEffect(() => {
    if (dirty2) {
      api
        .getInvitation(MY_UUID, "accepted")
        .then((data) => {
          if (data) {
            setAccInvitations(data);
            setDirty2(false);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [accInvitations, dirty2]);

  const handleSetNew = () => {
    setPageStatus("new");
  };
  const handleSetScheduled = () => {
    setPageStatus("scheduled");
  };
  if (loading) return <Loader />;

  //TODO: implement modal to confirm invitation sent
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Invitations</Text>
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <Pressable
          style={
            pageStatus === "new"
              ? styles.topNavLinksSelected
              : styles.topNavLinks
          }
          onPress={handleSetNew}
        >
          <Text style={styles.topNavLinkText}>New Invitations</Text>
        </Pressable>
        <Pressable
          style={
            pageStatus === "scheduled"
              ? styles.topNavLinksSelected
              : styles.topNavLinks
          }
          onPress={handleSetScheduled}
        >
          <Text style={styles.topNavLinkText}>Scheduled</Text>
        </Pressable>
        <NewInvitationModal
          modalVisible={modalVisible}
          setModalVisible={toggleModal}
        />
        {editModalVisible ? (
          <EditInvitationModal
            modalVisible={editModalVisible}
            setModalVisible={toggleModalEdit}
            toEdit={toEdit}
            setDirty={setDirty2}
          />
        ) : (
          ""
        )}
        <AcceptDeclineInvitationsModal
          modalVisible={confirmationModalVisible}
          setModalVisible={toggleModalConfirmation}
          handleAcceptInvitation={handleAcceptInvitation}
          handleRejectInvitation={handleRejectInvitation}
          handleCancelInvitation={handleCancelInvitation}
          invitationUUID={invitationUUID}
          confirmationModalStatus={confirmationModalStatus}
        />
      </View>

      {invitations?.length === 0 && pageStatus === "new" ? (
        <Text style={styles.noInfoText}>There are no new invitations</Text>
      ) : invitations?.length !== 0 && pageStatus === "new" ? (
        <ScrollView
          horizontal={true}
          showsVerSectionListticalScrollIndicator={false}
          style={styles.sectionContainer}
          bounces={false}
        >
          <FlatList
            data={invitations}
            renderItem={({ item, index }) => {
              const lastItem = index === invitations.length - 1;
              return (
                <NewInvitationCard
                  item={item}
                  lastItem={lastItem}
                  myUUID={MY_UUID}
                  setInvitationUUID={setInvitationUUID}
                  modalVisible={confirmationModalVisible}
                  setModalVisible={toggleModalConfirmation}
                  setConfirmationModalStatus={setConfirmationModalStatus}
                />
              );
            }}
            keyExtractor={(item) => item.uuid}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      ) : accInvitations?.length !== 0 && pageStatus === "scheduled" ? (
        <ScrollView
          horizontal={true}
          showsVerSectionListticalScrollIndicator={false}
          style={styles.sectionContainer}
          bounces={false}
        >
          <>
            <FlatList
              data={accInvitations}
              renderItem={({ item, index }) => {
                const lastItem = index === accInvitations.length - 1;
                return (
                  <ScheduledInvitationCard
                    item={item}
                    lastItem={lastItem}
                    myUUID={MY_UUID}
                    modalVisible={editModalVisible}
                    setModalVisible={toggleModalEdit}
                    setToEdit={setToEdit}
                    confirmationModalVisible={confirmationModalVisible}
                    setConfirmationModalVisible={toggleModalConfirmation}
                    setConfirmationModalStatus={setConfirmationModalStatus}
                    setInvitationUUID={setInvitationUUID}
                  />
                );
              }}
              keyExtractor={(item) => item.uuid}
              showsVerticalScrollIndicator={false}
            />
          </>
        </ScrollView>
      ) : (
        <View>
          <Text style={styles.noInfoText}>There are no new Scheduled</Text>
        </View>
      )}
      {pageStatus === "new" ? (
        <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
          <AntIcon name="pluscircleo" size={44} />
        </Pressable>
      ) : (
        ""
      )}
    </SafeAreaView>
  );
};

export default InvitationsPage;
