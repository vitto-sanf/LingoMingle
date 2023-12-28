//imports
import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  TextInput,
  Modal,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useLayoutEffect, useEffect, useContext} from "react";
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { database } from "../../config/firebase";
import useNotification from "../../hooks/useNotification";

//styles
import styles from "../../styles/Chat.styles";
import maleAvatar from "../../assets/images/maleAvatar.png";
import femaleAvatar from "../../assets/images/femaleAvatar.png";
import FAIcons from "react-native-vector-icons/FontAwesome";
import { COLOR, FONT } from "../../constants";

//services
import api from "../../services/api";

// Components
import { Loader } from "../../components/common";


//Contexts
import { AuthContext } from "../../contexts/AuthContext";

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
}) => {
  const myMessage = item.sender === myId;
  const [editVisible, setEditVisible] = useState(false);


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

  // Funzione per formattare la data
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <View>
      {item.showDateSeparator && (
        <DateSeparator date={item.createdAt?.toDate().toLocaleDateString()} />
      )}
      <View
        style={[
          { flexDirection: "row", alignItems: "center" },
          myMessage ? { alignSelf: "flex-end" } : { alignSelf: "flex-start" },
        ]}
      >
        {!myMessage ? (
          <View style={styles.messageRow}>
            <Image
              source={item.gender === "M" ? maleAvatar : femaleAvatar}
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
                  <FAIcons
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
  const notify = useNotification();

  const { user } = useContext(AuthContext);
  const MY_UUID = user.uuid;



  useEffect(() => {
    api
      .getChatParticipant(id, MY_UUID)
      .then((data) => {
        setHeaderTitle(data.username);
      })
      .catch((error) => {
        notify.error(error.message);
      })
      .finally(() => setLoading(false));
  }, [user]);

  useLayoutEffect(() => {
    const msgCollectionRef = collection(database, `/chats/${id}/messages`);
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
        .editMessage(targetMessage, id)
        .then(() => {
          setIsEditing(false);
          setTargetMessage({});
        })
        .catch((err) => notify.error(err));
    } else {
      api
        .sendMessage(id, msg, MY_UUID)
        .then(setMessage(""))
        .catch((err) => notify.error(err));
    }
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

  if (loading) return <Loader />;

  //TODO change button color when the pressable is disabled
  //TODO add videocall button and send invitation button
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: loading ? "" : headerTitle,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              <Pressable
                onPress={() => {
                  // Azione da eseguire quando il primo bottone viene premuto
                }}
              >
                <FAIcons
                  name="calendar-plus-o"
                  color={COLOR.black}
                  solid
                  size={26}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  // Azione da eseguire quando il secondo bottone viene premuto
                }}
                style={{ marginLeft: 15 }}
              >
                <FAIcons
                  name="video-camera"
                  color={COLOR.black}
                  solid
                  size={26}
                />
              </Pressable>
              {/* Aggiungi altri bottoni se necessario */}
            </View>
          ),
        }}
      />
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RenderMessage
            item={item}
            myId={MY_UUID}
            gender = {user.gender}
            setTargetMessage={(message) => setTargetMessage(message)}
            setIsEditing={() => setIsEditing(true)}
            setViewEditMessage={(text) => setViewEditMessage(text)}
          />
        )}
        
       
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
              <FAIcons name="close" color={COLOR.black} solid size={20} />
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
          style={({ disabled }) => [
            styles.sendButton,
            {
              backgroundColor:
                disabled ||
                (message === "" && (!targetMessage || !targetMessage.message))
                  ? COLOR.gray2
                  : COLOR.primary,
            },
          ]}
        >
          <FAIcons name="send" color={COLOR.white} solid size={24} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
