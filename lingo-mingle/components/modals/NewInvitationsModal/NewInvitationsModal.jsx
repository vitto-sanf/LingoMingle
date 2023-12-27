import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  FlatList,
} from "react-native";
import styles from "./NewInvitationsModal.style";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../../constants";
import api from "../../../services/api";
import DateTimePicker from "@react-native-community/datetimepicker";
//TODO: fix the styling, handle the form submit, field validation
const NewInvitationModal = ({ modalVisible, setModalVisible }) => {
  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";

  const [text, onChangeText] = useState("");
  const [friend, SetFriend] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [place, setPlace] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onCancel= ()=>{
    setModalVisible(!modalVisible);
    setDropdownOpen(false);
    SetFriend("");
    setDate(null);
    setTime(null);
    setPlace(null);
  }
  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const toggleTimepicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const onDatechange = ({ type }, selectedDate) => {
    if (type == "set") {
      setDate(selectedDate);

      toggleDatepicker();
    } else {
      toggleDatepicker();
    }
  };

  const onTimechange = ({ type }, selectedTime) => {
    if (type == "set") {
      setTime(selectedTime);

      toggleTimepicker();
    } else {
      toggleTimepicker();
    }
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${day}/${month}/${year}`;
  };

  const onChangeFriend = (value) => {
    setDropdownOpen(true);

    SetFriend(value);
  };

  useEffect(() => {
    api
      .getUser(MY_UUID)
      .then((data) => {
        api
          .getFriends(data.friends)
          .then((friendsInfo) => {
            setUsers(friendsInfo);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.centeredView}>
      {showPicker ? (
        <View>
          <DateTimePicker
            style={{ zIndex: "auto" }}
            mode="date"
            display="spinner"
            value={date ? date : currentDate}
            onChange={onDatechange}
            minimumDate={new Date()}
          />
        </View>
      ) : (
        ""
      )}
      {showTimePicker ? (
        <View>
          <DateTimePicker
            style={{ zIndex: "auto" }}
            mode="time"
            display="spinner"
            value={time ? time : currentDate}
            onChange={onTimechange}
            minimumDate={new Date()}
          />
        </View>
      ) : (
        ""
      )}
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
            <Text style={styles.modalText}>New invitation</Text>

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.userNameInput}
                onChangeText={onChangeFriend}
                value={friend}
                placeholder="Friend Username"
              />
              <FA5Icon name="search" color={COLOR.gray} size={20} />
            </View>

            {dropdownOpen ? (
              <View
                style={dropdownOpen ? styles.dropdown : styles.dropdownEmpty}
              >
                <FlatList
                  data={users
                    .filter((item) => {
                      const searchTerm = friend.toLowerCase();
                      const nameuser = item.username.toLowerCase();
                      return (
                        searchTerm &&
                        nameuser.startsWith(searchTerm) &&
                        searchTerm !== nameuser
                      );
                    })
                    .slice(0, 10)}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        SetFriend(item.username);
                        setDropdownOpen(false);
                      }}
                      style={styles.dropdownRow}
                      key={item.uuid}
                    >
                      <Text style={styles.friendStyle}>{item.username}</Text>
                    </Pressable>
                  )}
                  keyExtractor={(item) => item.uuid}
                  showsHorizontalScrollIndicator={true}
                />
              </View>
            ) : (
              ""
            )}

            <View style={styles.formview}>
              <Pressable
                style={styles.dateTimeInput}
                onPress={toggleDatepicker}
              >
                <TextInput
                  style={date ? styles.dateTimeInputText : ""}
                  value={date ? formatDate(date) : null}
                  placeholder="Date"
                  editable={false}
                />
              </Pressable>

              <Pressable
                style={styles.dateTimeInput}
                onPress={toggleTimepicker}
              >
                <TextInput
                  style={time ? styles.dateTimeInputText : ""}
                  value={time ? time.toLocaleTimeString("it-IT") : null}
                  placeholder="Hour"
                  editable={false}
                />
              </Pressable>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={setPlace}
              value={place}
              placeholder="Place"
            />

            <View style={styles.formview}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  onCancel()
                }}
              >
                <Text style={styles.cancelTextStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonSend]}
                onPress={() => {
                  onCancel()
                }}
              >
                <Text style={styles.textStyle}>Send</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewInvitationModal;
