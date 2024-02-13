// Imports
import React, { useState } from "react";
import { Alert, Modal, Text, Pressable, View, TextInput } from "react-native";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";

// Styles
import styles from "./EditInvitationsModal.style";

// Services
import api from "../../../services/api";

// Hooks
import useNotification from "../../../hooks/useNotification";

//TODO: fix the styling
const EditInvitationModal = ({
  modalVisible,
  setModalVisible,
  toEdit,
  setDirty,
}) => {
  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";
  const notify = useNotification();

  const [date, setDate] = useState(toEdit.nonFormattedTimestamp);
  const [time, setTime] = useState(toEdit.nonFormattedTimestamp);
  const [place, setPlace] = useState(toEdit.place);

  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  //Form Validation Schema
  const schema = yup.object().shape({
    date: yup.date().required("Date is required"),
    time: yup.date().required("Time is required"),
    place: yup.string().required("Place is required"),
  });

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

  const onCancel = (formData) => {
    setModalVisible(!modalVisible);
    setDate(null);
    setTime(null);
    setPlace(null);
    control._reset();
  };

  const onSubmit = (formData) => {
    const ModformData = {
      uuid: toEdit.uuid,
      receiver: MY_UUID,
      sender: toEdit.sender,
      timestamp: new Date(
        `${date.toISOString().split("T")[0]}` +
          `${time.toISOString().substr(10, 24)}`
      ),
      place: place,
      status: "accepted",
    };

    api
      .editInvitation(ModformData)
      .then(() => {})
      .catch((err) => notify.error(err.message))
      .finally(() => {
        setDirty(true);
        notify.success("Invitation modified correctly!");
        onCancel();
      });
  };

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const toggleTimepicker = () => {
    setShowTimePicker(!showTimePicker);
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
                display="spinner"
                value={date ? date : value || new Date()}
                onChange={({ type }, selectedDate) => {
                  onChange(selectedDate);
                  if (type == "set") {
                    setDate(selectedDate);
                    toggleDatepicker();
                  } else {
                    toggleDatepicker();
                  }
                }}
                minimumDate={date}
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
                display="spinner"
                value={time ? new Date(time) : value || new Date()}
                onChange={({ type }, selectedTime) => {
                  onChange(selectedTime);
                  if (type == "set") {
                    setTime(selectedTime);
                    toggleTimepicker();
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
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit invitation</Text>

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
                        onLayout={() => {
                          onChange(date);
                        }}
                      />
                    )}
                    name="date"
                  />
                  {errors.date && (
                    <Text style={styles.dateTimeErrors}>
                      {errors.date.message}
                    </Text>
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
                        onLayout={() => {
                          onChange(date);
                        }}
                      />
                    )}
                    name="time"
                  />
                  {errors.time && (
                    <Text style={styles.dateTimeErrors}>
                      {errors.time.message}
                    </Text>
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
                  onLayout={() => {
                    onChange(place);
                  }}
                  placeholder="Place"
                />
              )}
              name="place"
            />
            {errors.place && (
              <Text style={styles.errros}>{errors.place.message}</Text>
            )}

            <View style={styles.buttonContainer}>
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
                onPress={handleSubmit(onSubmit)}
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

export default EditInvitationModal;
