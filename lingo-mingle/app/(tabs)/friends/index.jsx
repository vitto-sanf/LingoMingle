//imports
import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  TextInput,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import { Loader } from "../../../components/common";

//Styles
import styles from "../../../styles/Friends.styles";
import maleAvatar from "../../../assets/images/maleAvatar.png";
import femaleAvatar from "../../../assets/images/femaleAvatar.png";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../../constants";

// Services
import api from "../../../services/api";

// Hooks
import useNotification from "../../../hooks/useNotification";

//TODO change home icons: from user-times to user-minus and from user-check to user-plus
const FriendsListItem = ({ item, openModal, setUsername, setId }) => {
  const handleModal = () => {
    openModal();
    setUsername(item.username);
    setId(item.uuid);
  };

  return (
    <View style={styles.itemContainer}>
      <Image
        source={item.gender === "M" ? maleAvatar : femaleAvatar}
        style={[styles.image, { width: 80, height: 80 }]}
      />
      <Text style={styles.textItem}>{item.username}</Text>
      <View style={styles.iconsContainer}>
        <FA5Icon
          name="comment"
          style={{ marginRight: 20 }}
          color={COLOR.lightBlue}
          solid
          size={20}
        />
        <Pressable onPress={handleModal}>
          <FA5Icon name="user-times" size={20} color={COLOR.red} />
        </Pressable>
      </View>
    </View>
  );
};

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [targetUsername, setTargetUsername] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [targetID, setTargetId] = useState("");
  const notify = useNotification();

  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";

  useEffect(() => {
    api
      .getUser(MY_UUID)
      .then((data) => {
        api
          .getFriends(data.friends)
          .then((friendsInfo) => {
            setFriends(friendsInfo);
            setFilteredFriends(friendsInfo);
          })
          .catch((err) => notify.error(err));
      })
      .catch((err) => notify.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleOnChange = (text) => {
    if (typeof text === "object" && text.nativeEvent) {
      text = text.nativeEvent.text;
    }

    setText(String(text));
    //friends search filter
    const filteredData = friends.filter((item) =>
      item.username.toLowerCase().startsWith(text.toLowerCase())
    );
    // Aggiorna gli elementi filtrati
    setFilteredFriends(filteredData);
  };

  const handleCancelFriend = () => {
    if (targetID) {
      api
        .cancelFriend(MY_UUID, targetID)
        .then((res) => {
          notify.success(res.message);
          const newFriendList = filteredFriends.filter(
            (e) => e.uuid != targetID
          );
          setFilteredFriends(newFriendList);
          setModalVisible(!modalVisible);
        })
        .catch((res) => notify.error(res.message));
    }
  };

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Friends</Text>
      <View style={styles.searchContainer}>
        <FA5Icon name="search" color={COLOR.gray} size={20} />
        <TextInput
          style={styles.searchInput}
          value={text}
          placeholder="Search your friends"
          onChangeText={handleOnChange}
        />
      </View>
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
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure that you want to remove {targetUsername} from your
              friends list ?
            </Text>
            <View style={styles.row}>
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
                onPress={() => handleCancelFriend()}
              >
                <Text style={styles.buttonText}>Remove</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={filteredFriends}
        renderItem={({ item }) => (
          <FriendsListItem
            item={item}
            openModal={() => setModalVisible(true)}
            setUsername={(e) => setTargetUsername(e)}
            setId={(id) => setTargetId(id)}
          />
        )}
        keyExtractor={(item) => item.uuid}
      />
    </SafeAreaView>
  );
};
export default Friends;
