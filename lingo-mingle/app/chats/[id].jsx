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
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useLayoutEffect } from "react";
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

//services
import api from "../../services/api";

const RenderMessage = ({ item, myId }) => {
  const myMessage = item.sender === myId;
  return (
    <View
      style={[
        styles.messageContainer,
        myMessage ? styles.userMessageContainer : styles.otherMessageContainer,
      ]}
    >
      <Text style={styles.messageText}>{item.message}</Text>
      <Text style={styles.time}>
        {item.createdAt?.toDate().toLocaleDateString()}
      </Text>
    </View>
  );
};

const Chat = () => {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";
  const notify = useNotification();

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

  return (
    <KeyboardAvoidingView style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RenderMessage item={item} myId={MY_UUID} />}
      />
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type a message"
          style={styles.messageInput}
        />
        <Button disabled={message === ""} title="Send" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
