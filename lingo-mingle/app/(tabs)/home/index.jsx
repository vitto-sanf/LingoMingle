// Imports
import { ScrollView, Text, FlatList, Pressable, View, Modal } from "react-native";
import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { database } from "../../../config/firebase";

// Styles
import { HomePageStyle as styles } from "../../../styles";
import IoIcons from 'react-native-vector-icons/Ionicons'
import { COLOR } from "../../../constants";

// Components
import {
  LastFriendCard,
  LastUserCard,
  FriendsContactedCard,
} from "../../../components/cards";
import { Loader, InvitationNotification } from "../../../components/common";
import { StartVideoCallModal } from "../../../components/modals";

// Services
import api from "../../../services/api";

//Contexts
import { AuthContext } from "../../../contexts/AuthContext";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [lastUsersContacted, setLastUserContacted] = useState([]);
  const [lastFriendsContacted, setLastFriendsContacted] = useState([]);
  const [friendsRequests, setFriendsRequest] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [notifyCounter, setNotifyCounter] = useState(0)
  const [openNotificationCenter, setOpenNotficationCenter] = useState(false)

  const { user } = useContext(AuthContext);
  const [friends, setFriends]= useState(user?.friends)
  const MY_UUID = user.uuid;

  const handleNotification = () => {
    setOpenNotficationCenter(!openNotificationCenter)
  }

  const [notificationData, setNotificationData] = useState([
    {
      id: 1,
      sender: "Alice",
      timestamp: new Date().getTime(),
    },
    {
      id: 2,
      sender: "Bob",
      timestamp: new Date().getTime(),
    },
    {
      id: 3,
      sender: "Carl",
      timestamp: new Date().getTime(),
    },
  ]);

  // const [notificationData, setNotificationData] = useState([]); TODO: ENABLE THIS
  
  useEffect(() => {
    console.log("LAST SEEN", user.lastSeen)
    const unsubscribe = onSnapshot(
      doc(database, "user", user.uuid),
      async (doc) => {
        try {
          const lastUserContacted = await api.getLastUserContacted(
            doc.data().last_user_contacted
          );
          const lastFriendsContacted = await api.getLastFriendsContacted(
            doc.data().last_friends_contacted
          );
          const friendsRequest = await api.getFriendsRequest(
            doc.data().friends_request,
            MY_UUID
          );

          setLastUserContacted(lastUserContacted);
          setLastFriendsContacted(lastFriendsContacted);
          setFriendsRequest(friendsRequest);
          setLoading(false);
        } catch (error) {
          console.error("Error during API call:", error);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user.uuid]);
  
  useEffect(() => {
  
    const unsubscribe = onSnapshot(
      collection(database, "invitation"),
      (snapshot) => {
        
          api.getInvitation(MY_UUID, "pending").then((data)=>{
            data.forEach((invite)=>{
              console.log("HERE", new Date (data[0].createdAt.toDate()), user.lastSeen )

              if (new Date (invite.createdAt.toDate()) >  user.lastSeen){
                console.log("Invitation data", new Date (data[0].createdAt.toDate()))
              }
            })
            
          })
         
      },
      (error) => {
        console.error("Error fetching pending invitations: ", error);
      }
    );

    return () => {
      unsubscribe()
    };
  }, [user]);

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>LingoMingle</Text>
        </View>
        <View style={styles.notificationContainer}>
          <Pressable onPress={handleNotification}>
            <IoIcons name="notifications" size={30} color={notifyCounter > 0 ? COLOR.primary : COLOR.black}/>
          </Pressable>
          {notifyCounter > 0 && <Text style={styles.notificationCounter}>{notifyCounter}</Text>}
        </View>
      </View>
      {lastUsersContacted.length === 0 &&
      lastFriendsContacted.length === 0 &&
      friendsRequests.length === 0 ? (
        <Text style={styles.noInfoText}>
          Start a new videocall to meet new people!
        </Text>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.sectionContainer}
          bounces={false}
        >
          {lastUsersContacted.length !== 0 && (
            <>
              <Text style={styles.sectionTitle}>Last Users Contacted</Text>
              <FlatList
                data={lastUsersContacted}
                renderItem={({ item }) => (
                  <LastUserCard item={item} myUUID={MY_UUID} />
                )}
                keyExtractor={(item) => item.uuid}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}

          {lastFriendsContacted.length !== 0 && (
            <>
              <Text style={styles.sectionTitle}>Last Friends Contacted</Text>
              <FlatList
                data={lastFriendsContacted}
                renderItem={({ item }) => (
                  <LastFriendCard
                    item={item}
                    my_uuid={MY_UUID}
                    /* setIsCalling={() => setIsCalling(true)}
                    setCallRef={(ref) => setCallRef(ref)}
                    setItem={(item) => setItem(item)} */
                  />
                )}
                keyExtractor={(item) => item.uuid}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}

          {friendsRequests.length !== 0 && (
            <>
              <Text style={styles.sectionTitle}>Friends Request</Text>
              <FlatList
                data={friendsRequests}
                renderItem={({ item }) => (
                  <FriendsContactedCard item={item} myUUID={MY_UUID} />
                )}
                keyExtractor={(item) => item.uuid}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}
        </ScrollView>
      )}
      <Pressable onPress={() => setIsModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonTitle}>Start Videocall</Text>
      </Pressable>
      {isModalVisible && (
        <StartVideoCallModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}

      <Modal
      animationType="slide"
      transparent={true}
      visible={openNotificationCenter}
    >
      <View style={styles.notificationMenu}>
        {notificationData.length === 0 ? (
          <Text style={styles.modalText}>No new invitations!</Text>
        ) : (
          <FlatList
            data={notificationData}
            renderItem={({ item }) => (
              <InvitationNotification
                sender={item.sender}
                timestamp={item.timestamp}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </Modal>
    </SafeAreaView>
  );
};

export default HomePage;
