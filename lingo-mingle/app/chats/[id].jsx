// Imports
import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { useState, useLayoutEffect, useEffect, useContext } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { database } from "../../config/firebase";
import ChatInvitationModal from "../../components/modals/ChatInvitationsModal/NewInvitationsModal";
import { useRouter } from "expo-router";

// Services
import api from "../../services/api";

// Components
import { Loader } from "../../components/common";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";
import { DirectCallContext } from "../../contexts/directCallContext";

// Hooks
import useNotification from "../../hooks/useNotification";

// Styles
import styles from "../../styles/Chat.styles";
import maleAvatar from "../../assets/images/maleAvatar.png";
import femaleAvatar from "../../assets/images/femaleAvatar.png";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { COLOR, FONT } from "../../constants";

const DateSeparator = ({ date }) => (
  <View style={styles.dateSeparatorContainer}>
    <Text style={styles.dateSeparatorText}>{date}</Text>
  </View>
);

const RenderMessage = ({
  item,
  myId,
  gender,
  setTargetMessage,
  setIsEditing,
  setViewEditMessage,
  isLastItem,
  friendData,
}) => {
  const myMessage = item.sender === myId;
  const [editVisible, setEditVisible] = useState(false);
  const [systemMessage, setSystemMessage] = useState(undefined);
  const editMessage = () => {
    setTargetMessage(item);
    setIsEditing();
    setEditVisible(false);
    setViewEditMessage(item.message);
  };
  // Funzione per formattare l'orario
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  };

  // TODO: Valutare una eventuale rimozione
  // Funzione per formattare la data
  // const formatDate = (date) => {
  //   return date.toLocaleDateString("en-US", {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // };

  return (
    <View style={{ marginBottom: isLastItem ? 10 : 0 }}>
      {item.showDateSeparator && (
        <DateSeparator date={item.createdAt?.toDate().toLocaleDateString()} />
      )}
      <View
        style={[
          styles.messageRow,
          {
            justifyContent:
              item.sender === "SYSTEM"
                ? "center"
                : item.sender === myId
                ? "flex-end"
                : "flex-start",
          },
        ]}
      >
        {item.sender === "SYSTEM" ? (
          <View
            style={[
              styles.messageSystemContainer,
              styles.systemMessageContainer,
            ]}
          >
            <Text style={styles.invitationMessageText}>
              {item.senderUsername} sent a new invitation! You will be able to
              manage it in the "Invitation" section.
            </Text>
            <Text style={styles.invitationMessageSubText}>
              Place: {JSON.parse(item.message).place}
            </Text>
            <Text style={styles.invitationMessageSubText}>
              Date:{" "}
              {new Date(
                JSON.parse(item.message).timestamp
              ).toLocaleDateString()}{" "}
              {new Date(
                JSON.parse(item.message).timestamp
              ).toLocaleTimeString()}
            </Text>
          </View>
        ) : !myMessage? (
          <View style={styles.messageRow}>
            <Image
              source={friendData.gender === "M" ? maleAvatar : femaleAvatar}
              style={myMessage ? styles.imageUser : styles.imageOther}
            />

            <View
              style={[
                styles.messageContainer,
                myMessage
                  ? styles.userMessageContainer
                  : styles.otherMessageContainer,
              ]}
            >
              <Text style={styles.messageText}>{item.message}</Text>
              <Text style={styles.time}>
                {formatTime(item.createdAt?.toDate())}
              </Text>
            </View>
          </View>
        ) : (
          <>
            {editVisible ? (
              <View>
                <Pressable onPress={editMessage} style={styles.editButton}>
                  <FAIcon
                    name="edit"
                    style={{ marginRight: 5 }}
                    color={COLOR.black}
                    solid
                    size={20}
                  />
                  <Text style={{ fontFamily: FONT.regular, fontSize: 15 }}>
                    Edit
                  </Text>
                </Pressable>
              </View>
            ) : null}
            <View
              style={[
                styles.messageContainer,
                myMessage
                  ? styles.userMessageContainer
                  : styles.otherMessageContainer,
              ]}
            >
              <Pressable onLongPress={() => setEditVisible(!editVisible)}>
                <Text
                  style={[styles.messageText, myMessage && { color: "white" }]}
                >
                  {item.message}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[styles.time, myMessage && { color: "white" }]}>
                    {item.createdAt && (
                      <Text style={styles.time}>
                        {formatTime(item.createdAt.toDate())}
                      </Text>
                    )}
                  </Text>

                  <Text style={{ marginLeft: 5 }}>
                    {item.edited ? "edited" : null}
                  </Text>
                </View>
              </Pressable>
            </View>

            <Image
              source={gender === "M" ? maleAvatar : femaleAvatar}
              style={myMessage ? styles.imageUser : styles.imageOther}
            />
          </>
        )}
      </View>
    </View>
  );
};

const Chat = () => {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [headerTitle, setHeaderTitle] = useState("");
  const [targetMessage, setTargetMessage] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [viewEditMessage, setViewEditMessage] = useState("");
  const [friendData, setFriendData] = useState(undefined);
  const notify = useNotification();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const router = useRouter();

  const { user } = useContext(AuthContext);
  const { setCallInfo, setContactedUser } = useContext(DirectCallContext);
  const MY_UUID = user.uuid;

  const flatListRef = useRef(null);

  useEffect(() => {
    console.log("ID", id);
    api
      .getChatParticipant(id.replace(",", "").replace(",", ""), MY_UUID)
      .then((data) => {
        setHeaderTitle(data.username);
        setFriendData(data);
      })
      .catch((error) => {
        notify.error(error.message);
      })
      .finally(() => setLoading(false));
  }, [user]);

  useLayoutEffect(() => {
    const msgCollectionRef = collection(
      database,
      `/chats/${id.replace(",", "").replace(",", "")}/messages`
    );
    const q = query(msgCollectionRef, orderBy("createdAt", "asc"));
    let displayedDate = null;
    const unsubscribe = onSnapshot(q, (chats) => {
      const messages = chats.docs.map((doc, index) => {
        let data = { id: doc.id, ...doc.data() };

        if (index === 0) {
          data = { showDateSeparator: true, ...data };

          displayedDate = data.createdAt?.toDate().toLocaleDateString();
        } else {
          differentDate =
            displayedDate !== data.createdAt?.toDate().toLocaleDateString();
          data = { showDateSeparator: differentDate, ...data };
          displayedDate = data.createdAt?.toDate().toLocaleDateString();
        }
        return data;
      });
      setMessages(messages);
    });

    return unsubscribe;
  }, []);

  const sendMessage = () => {
    const msg = message.trim();
    if (msg.length === 0 && (!targetMessage || !targetMessage.message)) return;
    if (isEditing && targetMessage && targetMessage.message) {
      api
        .editMessage(targetMessage, id.replace(",", "").replace(",", ""))
        .then(() => {
          setIsEditing(false);
          setTargetMessage({});
          api.editFriendContacted(user, friendData.uuid);
        })
        .catch((err) => notify.error(err));
    } else {
      api
        .sendMessage(id.replace(",", "").replace(",", ""), msg, MY_UUID)
        .then(() => {
          setMessage("");
          api.editFriendContacted(user, friendData.uuid);
          flatListRef.current.scrollToEnd({ animated: true }); // Usa il ref per spostare la FlatList
        })
        .catch((err) => notify.error(err));
    }
  };

  const callFriend = () => {
    const generatedUuid = Math.floor(Math.random() * (100000 - 2000)) + 2000;
    api.directCall(user.uuid, friendData.uuid, generatedUuid).then((doc) => {
      setCallInfo(doc.id);
      setContactedUser(friendData);
      api.editFriendContacted(user, friendData.uuid).then(() => {
        router.push("/outgoingCall");
      });
    });
  };

  const handleMessage = (text) => {
    if (isEditing) {
      setTargetMessage((prevTargetMessage) => ({
        ...prevTargetMessage,
        message: text,
      }));
    } else {
      setMessage(text);
    }
  };
  const handleEdit = () => {
    setIsEditing(false);
    setTargetMessage({});
    setViewEditMessage("");
  };

  const handleSendInvitation = (systemMessage) => {
    data = {
      sender: "SYSTEM",
      message: JSON.stringify(systemMessage),
      createdAt: new Date(),
      senderUsername: user.username,
    };
    api.sendSystemMessage(id, data);
  };

  if (loading) return <Loader />;

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: loading ? "" : headerTitle,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              <Pressable
                onPress={() => {
                  toggleModal();
                  //console.log("DATA FRIEND;",friendData);
                }}
              >
                <FAIcon
                  name="calendar-plus-o"
                  color={COLOR.black}
                  solid
                  size={26}
                />
              </Pressable>
              <Pressable onPress={callFriend} style={{ marginLeft: 15 }}>
                <FAIcon
                  name="video-camera"
                  color={COLOR.black}
                  solid
                  size={26}
                />
              </Pressable>
            </View>
          ),
        }}
      />
      {modalVisible ? (
        <ChatInvitationModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          friendData={friendData}
          handleSendInvitation={(invitation) => {
            handleSendInvitation(invitation);
          }}
        />
      ) : (
        ""
      )}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <RenderMessage
            item={item}
            myId={MY_UUID}
            gender={user.gender}
            setTargetMessage={(message) => setTargetMessage(message)}
            setIsEditing={() => setIsEditing(true)}
            setViewEditMessage={(text) => setViewEditMessage(text)}
            isLastItem={index === messages.length - 1}
            friendData={friendData}
          />
        )}
        showsVerticalScrollIndicator={false}
        onLayout={() => {
          flatListRef.current.scrollToEnd({ animated: true });
        }}
        onContentSizeChange={() => {
          flatListRef.current.scrollToEnd({ animated: true });
        }}
        ref={flatListRef}
      />
      <View style={{ flexDirection: "row" }}>
        {isEditing && viewEditMessage ? (
          <>
            <Text
              style={{ fontFamily: FONT.regular, fontSize: 15, marginLeft: 18 }}
            >
              Edit Message : {viewEditMessage}
            </Text>
            <Pressable style={{ marginLeft: 20 }} onPress={handleEdit}>
              <FAIcon name="close" color={COLOR.black} solid size={20} />
            </Pressable>
          </>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          multiline
          value={targetMessage.message || message}
          onChangeText={(text) => handleMessage(text)}
          placeholder="Type a message"
          style={styles.messageInput}
        />
        <Pressable
          onPress={sendMessage}
          disabled={
            message === "" && (!targetMessage || !targetMessage.message)
          }
        >
          <FAIcon
            name="send"
            size={24}
            color={
              message.length !== 0 || targetMessage.message
                ? COLOR.primary
                : COLOR.gray
            }
            style={styles.icon}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
