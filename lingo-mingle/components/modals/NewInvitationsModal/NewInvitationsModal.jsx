import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Text,
  Pressable,
  View,
  TextInput,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Styles
import styles from "./NewInvitationsModal.style";
import FA5Icon from "react-native-vector-icons/FontAwesome5";

// Services
import api from "../../../services/api";

// Hooks
import useNotification from "../../../hooks/useNotification";

// Utils
import formatDate from "../../../utils/formatDate";
import { COLOR } from "../../../constants";

//TODO: fix the styling, fix bugs on DatePicker
const NewInvitationModal = ({ modalVisible, setModalVisible }) => {
  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";
  const notify = useNotification();

  const [friend, setFriend] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [place, setPlace] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [namesArray, setNamesArray] = useState([]);
  const [dirty, setDirty] = useState(true);

  //Form Validation Schema
  const schema = yup.object().shape({
    friend: yup
      .string()
      .test({
        message: () => "Select the name from your friends!",
        test(value) {
          return namesArray.includes(value);
        },
      })
      .required("Friend is required"),
    date: yup.date().required("Date is required"),
    time: yup.date().required("Time is required"),
    place: yup.string().required("Place is required"),
  });

  useEffect(() => {
    if (dirty) {
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
        .catch((err) => console.log(err))
        .finally(() => {
          let newArr = users.map((friend) => friend.username);
          setNamesArray(newArr);
          setDirty(false);
        });
    }
  }, [friend, namesArray]);

  //Form Validation control
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      friend: null,
      date: null,
      time: null,
      place: null,
    },
  });

  const onCancel = (formData) => {
    setModalVisible(!modalVisible);
    setDropdownOpen(false);
    setFriend(null);
    setDate(null);
    setTime(null);
    setPlace(null);
    control._reset();
  };

  const onSubmit = (formData) => {
    const ModformData = {
      receiver: friend.uuid,
      sender: MY_UUID,
      timestamp: new Date(
        `${date.toISOString().split("T")[0]}` +
          `${time.toISOString().substr(10, 24)}`
      ),
      place: place,
      status: "pending",
    };
    console.log(ModformData);

    api
      .addInvitation(ModformData)
      .then(() => {})
      .catch((err) => notify.error(err.message))
      .finally(() => {
        notify.success("Invitation sent correctly!");
        onCancel();
      });
  };

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const toggleTimepicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const onChangeFriend = (value) => {
    setDropdownOpen(true);
    setFriend(value);
  };

  return (
    <View style={styles.centeredView}>
      {showPicker ? (
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                style={{ zIndex: "auto" }}
                mode="date"
                value={value || new Date()}
                onChange={({ type }, selectedDate) => {
                  onChange(selectedDate);
                  if (type === "set") {
                    toggleDatepicker();
                    setDate(selectedDate);
                  } else {
                    toggleDatepicker();
                  }
                }}
                minimumDate={new Date()}
              />
            )}
            name="date"
          />
        </View>
      ) : (
        ""
      )}
      {showTimePicker ? (
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                style={{ zIndex: "auto" }}
                mode="time"
                value={value || new Date()}
                onChange={({ type }, selectedTime) => {
                  onChange(selectedTime);
                  if (type === "set") {
                    toggleTimepicker();
                    setTime(selectedTime);
                  } else {
                    toggleTimepicker();
                  }
                }}
                minimumDate={new Date()}
              />
            )}
            name="time"
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
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerContainer}>
              <Text style={styles.modalText}>New invitation</Text>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                }}
              >
                <FA5Icon name="times" size={20} color={COLOR.black} />
              </Pressable>
            </View>

            <View style={styles.searchContainer}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.userNameInput, { borderBottomWidth: 0 }]}
                    onChangeText={(text) => {
                      onChange(text);
                      onChangeFriend(text);
                      //console.log("aa");
                    }}
                    value={friend ? friend.username : friend}
                    placeholder="Friend username"
                  />
                )}
                name="friend"
              />
              <FA5Icon name="search" size={20} />
            </View>
            {errors.friend && (
              <Text style={styles.errors}>{errors.friend.message}</Text>
            )}
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
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value } }) => (
                        <Pressable
                          onPress={() => {
                            setFriend({
                              uuid: item.uuid,
                              username: item.username,
                            });
                            onChange(item.username);
                            setDirty(true);
                            console.log("namesArray", namesArray);
                            setDropdownOpen(false);
                          }}
                          style={styles.dropdownRow}
                          key={item.uuid}
                        >
                          <Text style={styles.friendStyle}>
                            {item.username}
                          </Text>
                        </Pressable>
                      )}
                      name="friend"
                    />
                  )}
                  keyExtractor={(item) => item.uuid}
                  showsHorizontalScrollIndicator={true}
                />
              </View>
            ) : (
              ""
            )}
            <View style={styles.formview}>
              <View style={styles.dateTimeInputContainer}>
                <Pressable
                  style={[styles.dateTimeInput, { marginRight: 10 }]}
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
                  {errors.date && (
                    <Text style={styles.errors}>{errors.date.message}</Text>
                  )}
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
                        value={time ? time.toLocaleTimeString("en-US") : null}
                        placeholder="Hour"
                        editable={false}
                      />
                    )}
                    name="time"
                  />
                  {errors.time && (
                    <Text style={styles.errors}>{errors.time.message}</Text>
                  )}
                </Pressable>
              </View>
            </View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {
                    onChange(text);
                    setPlace(text);
                  }}
                  value={place}
                  placeholder="Place"
                />
              )}
              name="place"
            />
            {errors.place && (
              <Text style={styles.errors}>{errors.place.message}</Text>
            )}
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  clearErrors();
                  reset();
                  setFriend("");
                  setDate(null);
                  setTime(null);
                  setPlace(null);
                }}
              >
                <Text style={styles.cancelTextStyle}>Reset</Text>
              </Pressable>
              <Pressable
                style={
                  isValid
                    ? [styles.button, styles.buttonSend]
                    : [styles.button, { backgroundColor: COLOR.gray }]
                }
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid}
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
