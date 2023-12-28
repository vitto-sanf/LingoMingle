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
// Hooks
import useNotification from "../../../hooks/useNotification";
//Form Validation
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//Form Validation Schema
const schema = yup.object().shape({
  date: yup.date().required("Date is required"),
  time: yup.date().required("Date is required"),
  place: yup.string().required("Place is required"),
});
//TODO: fix the styling, field validation
const NewInvitationModal = ({ modalVisible, setModalVisible }) => {
  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";
  const notify = useNotification();
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

  //Form Validation control
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    
    resolver: yupResolver(schema),
    defaultValues: {
      date: null,
      time: null,
      place: null,
    },
  });

  //

  const onCancel = () => {
    setModalVisible(!modalVisible);
    setDropdownOpen(false);
    SetFriend("");
    setDate(null);
    setTime(null);
    setPlace(null);
    errors.date=null;
    errors.time=null;
    errors.time=null;
  };
  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onSubmit = (formData) => {
    console.log(formData);
    /*const formData = {
      receiver: friend.uuid,
      sender: MY_UUID,
      timestamp: new Date(
        `${date.toISOString().split("T")[0]}` +
          `${time.toISOString().substr(10, 24)}`
      ),
      place: place,
      status: "pending",
    };

    api
      .addInvitation(formData)
      .then(() => {})
      .catch((err) => notify.error(err.message))
      .finally(() => {
        notify.success("Invitation sent correctly!");
        onCancel();
      });*/
  };

  const toggleTimepicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const onDatechange = ({ type }, selectedDate) => {
    if (type == "set") {
      setDate(selectedDate);

      toggleDatepicker();
      toggleTimepicker();
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
    console.log(errors),
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
                value={friend ? friend.username : friend}
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
                        SetFriend({ uuid: item.uuid, username: item.username });
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
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={date ? styles.dateTimeInputText : ""}
                      value={date ? formatDate(date) : null}
                      placeholder="Date"
                      editable={false}
                    />
                  )}
                  name="date"
                  
                />
                {errors.date && <Text>{errors.date.message}</Text>}
              </Pressable>

              <Pressable
                style={styles.dateTimeInput}
                onPress={toggleTimepicker}
              >
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={time ? styles.dateTimeInputText : ""}
                      value={time ? time.toLocaleTimeString("it-IT") : null}
                      placeholder="Hour"
                      editable={false}
                      
                    />
                  )}
                  name="time"
                />
                {errors.time && <Text>{errors.time.message}</Text>}
              </Pressable>
            </View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Place"
                />
              )}
              name="place"
            />
            {errors.place && <Text>{errors.place.message}</Text>}

            <View style={styles.formview}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  onCancel();
                }}
              >
                <Text style={styles.cancelTextStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonSend]}
                onPress={
                  handleSubmit(onSubmit)
                }
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
