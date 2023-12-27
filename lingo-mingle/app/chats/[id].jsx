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

const RenderMessage = ({ item, myId, setTargetMessage,setIsEditing }) => {
  const myMessage = item.sender === myId;
  const [editVisible, setEditVisible] = useState(false);
  const [lastDisplayedDate, setLastDisplayedDate] = useState(null);
  //TODO avvicinare messaggi a icone
  //TODO change date with hours ?

  const editMessage = () => {
    setTargetMessage(item);
    setIsEditing()
   
  };
   // Funzione per formattare l'orario
   const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });
  };

  // Funzione per formattare la data
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

  return (
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
              <Text
                style={[styles.messageText, myMessage && { color: "white" }]}
              >
               
                {item.message}
              </Text>
              <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text style={[styles.time, myMessage && { color: "white" }]}>
              {formatTime(item.createdAt?.toDate())}
              </Text>
            
              <Text style={{marginLeft: 5}}>{item.edited ? "edited": null}</Text>
              </View>
            </Pressable>
            
            {lastDisplayedDate !== item.createdAt?.toLocaleDateString() && (
                  <Text style={{ marginLeft: 5, color: "grey" }}>
                    {formatDate(item.createdAt?.toDate())}
                  </Text>
                )}
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
  const [targetMessage, setTargetMessage] = useState({});
  const [isEditing , setIsEditing]= useState(false)
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
    if (msg.length === 0 && targetMessage.message.length ===0) return;

    console.log("HERE")
    if(isEditing && targetMessage && targetMessage.message){

      api.editMessage(targetMessage, id ).then(()=>{
        setIsEditing(false);
        setTargetMessage({});
      }).catch((err) => notify.error(err))
      
    }else {
      api
      .sendMessage(id, msg, MY_UUID)
      .then(setMessage(""))
      .catch((err) => notify.error(err));
    }

  };

  const handleMessage = (text) => {
    console.log(isEditing)
    if (isEditing){
      setTargetMessage((prevTargetMessage) => ({ ...prevTargetMessage, message: text }));
    }else{
      setMessage(text);
    }
    
   
   
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
        }}
      />
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RenderMessage
            item={item}
            myId={MY_UUID}
            setTargetMessage={(message) => setTargetMessage(message)}
            setIsEditing= {()=>setIsEditing(true)}
          />
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          value= {targetMessage.message || message }
          onChangeText={(text) => handleMessage(text)}
          placeholder="Type a message"
          style={styles.messageInput}
        />
        <Pressable
          onPress={sendMessage}
          style={styles.sendButton}
          disabled={message === "" && targetMessage.message === ""}
        >
          <FAIcons name="send" color={COLOR.white} solid size={24} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
