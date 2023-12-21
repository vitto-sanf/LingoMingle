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

//Icons
import FA5Icon from "react-native-vector-icons/FontAwesome5";

// Components
import { Loader } from "../../../components/common";

//Styles
import styles from "../../../styles/Friends.styles";
import maleAvatar from "../../../assets/images/maleAvatar.png";
import femaleAvatar from "../../../assets/images/femaleAvatar.png";

// Services
import api from "../../../services/api";

// Hooks
import useNotification from "../../../hooks/useNotification";
import { COLOR } from "../../../constants";

//TODO change home icons: from user-times to user-minus and from user-check to user-plus
const FriendsListItem = ({
  item,
  openModal,
  setUsername,
  setId,
}) => {

  const handleModal = () => {
    openModal();
    setUsername(item.username);
    setId(item.uuid);
  };
  return (
    <>
      <View style={styles.itemContainer}>
        <Image
          source={item.gender === "M" ? maleAvatar : femaleAvatar}
          style={[styles.image, { width: 60, height: 60 }]}
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
    </>
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

  const handleCancellFriend = () => {
    if (targetID) {
      api
        .cancellFriend(MY_UUID, targetID)
        .then((res) => {
          notify.success(res.message);
          const newFriendList = filteredFriends.filter((e) => e.uuid != targetID);
          setFilteredFriends(newFriendList)
          setModalVisible(!modalVisible)
        })
        .catch((res) => notify.error(res.message));
    }
  };

  if (loading) return <Loader />;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Friends</Text>
      <View style={{ flex: 1 }}>
        <View style={styles.sectionContainer}>
          <TextInput
            style={styles.searchInput}
            value={text}
            placeholder="Search"
            onChangeText={handleOnChange}
          />
        </View>

        <View style={styles.friendsContainer}>
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
                  Are you sure that you want to remove {targetUsername} from
                  your friends list ?{" "}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Pressable
                    style={styles.backButton}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Back</Text>
                  </Pressable>
                  <Pressable
                    style={styles.cancellButton}
                    onPress={() => handleCancellFriend()}
                  >
                    <Text style={styles.textStyle}>Remove</Text>
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
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Friends;
