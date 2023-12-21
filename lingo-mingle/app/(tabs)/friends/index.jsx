//imports
import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

//Icons
import FAIcons from "react-native-vector-icons/FontAwesome";

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

const FriendsListItem = ({ item, myUUID }) => {
  return (
    
      <View style={styles.itemContainer}>
      <Image
          source={item.gender === "M" ? maleAvatar : femaleAvatar}
          style={[styles.image, { width: 60, height: 60 }]}
        />
        <Text style={styles.textItem}>{item.username}</Text>
      </View>
  
  );
};

const Friends = () => {
  const notify = useNotification();
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";

  useEffect(() => {
    api
      .getUser(MY_UUID)
      .then((data) => {
        api
          .getFriends(data.friends)
          .then((friendsInfo) => {
            setFriends(friendsInfo);
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
          <FlatList
            data={filteredFriends}
            renderItem={({ item }) => (
              <FriendsListItem item={item} myUUID={MY_UUID} />
            )}
            keyExtractor={(item) => item.uuid}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Friends;
