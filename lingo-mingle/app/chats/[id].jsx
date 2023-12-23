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
import { useState, useLayoutEffect, useEffect } from "react";
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

const RenderMessage = ({ item, myId ,setTargetMessage}) => {
  const myMessage = item.sender === myId;
  const [editVisible, setEditVisible] = useState(false);
  //TODO avvicinare messaggi a icone
  //TODO change date with hours ?

  const editMessage = ()=>{
    setTargetMessage(item)
  }
  return (
    <View
      style={[
        { flexDirection: "row", alignItems: "center" },
        myMessage ? { alignSelf: "flex-end" } : { alignSelf: "flex-start" },
      ]}
    >
      {!myMessage ? (
        <>
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
              {item.createdAt?.toDate().toLocaleDateString()}
            </Text>
          </View>
        </>
      ) : (
        <>
          {editVisible ? (
            <View>
              <Pressable onPress={editMessage}>
                <Text>EDIT</Text>
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
              <Text style={styles.messageText}>{item.message}</Text>
              <Text style={styles.time}>
                {item.createdAt?.toDate().toLocaleDateString()}
              </Text>
            </Pressable>
          </View>

          <Image
            source={item.gender === "M" ? maleAvatar : femaleAvatar}
            style={myMessage ? styles.imageUser : styles.imageOther}
          />
        </>
      )}
    </View>
  );
};

const Chat = () => {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [headerTitle, setHeaderTitle] = useState("");
  const [targetMessage, setTargetMessage]= useState("")
  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";
  const notify = useNotification();

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
  }, []);

  useLayoutEffect(() => {
    const msgCollectionRef = collection(database, `/chats/${id}/messages`);
    const q = query(msgCollectionRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (chats) => {
      const messages = chats.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setMessages(messages);
    });

    return unsubscribe;
  }, []);

  const sendMessage = () => {
    const msg = message.trim();
    if (msg.length === 0) return;

    api
      .sendMessage(id, msg, MY_UUID)
      .then(setMessage(""))
      .catch((err) => notify.error(err));
  };

  if (loading) return <Loader />;

  //TODO change button color when the pressable is disabled
  //TODO add videocall button and send invitation button
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Stack.Screen options={{ headerTitle: loading ? "" : headerTitle }} />
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RenderMessage item={item} myId={MY_UUID} setTargetMessage = {(message)=>setTargetMessage(message)} />}
      />
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          value={message /* || targetMessage.message */}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type a message"
          style={styles.messageInput}
        />
        <Pressable
          onPress={sendMessage}
          style={styles.sendButton}
          disabled={message === ""}
        >
          <FAIcons name="send" color={COLOR.white} solid size={24} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
