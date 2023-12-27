import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  FlatList
} from "react-native";
import styles from "./NewInvitationsModal.style";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../../constants";
import api from "../../../services/api";
import DateTimePicker from "@react-native-community/datetimepicker";
//TODO: fix the correct type of each input, fix the styling
const NewInvitationModal = ({ modalVisible, setModalVisible }) => {
  //const [modalVisible, setModalVisible] = useState(false);
  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";

  const [text, onChangeText] = useState("");
  const [friend,SetFriend]=useState('');
  const [dropdownOpen,setDropdownOpen]=useState(false)
  const [users,setUsers]=useState([]);
  const [currentDate,setCurrentDate]=useState(new Date());
  const [date,setDate]=useState(null);
  const [showPicker, setShowPicker]=useState(false);

  const toggleDatepicker = () =>{
    setShowPicker(!showPicker)
  };

  const onDatechange = ({type}, selectedDate)=>{
    if (type=="set"){
      const currentDate = selectedDate;
      
      setDate(selectedDate);
      
     
      toggleDatepicker();
    }
    else{
      toggleDatepicker();
    }
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day= date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${day}/${month}/${year}`;
  }

  const onChangeFriend = (value) =>{
    setDropdownOpen(true);
    console.log(value);
    SetFriend(value);
    onSearch(value);
  }
  const onSearch = (searchItem) =>{
    console.log('search', searchItem);
  }

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
      .catch((err) => console.log(err))
      
  }, []);


/*
  const users=[
    {
      uuid:1,
      username:"Matteo"
    },
    {
      uuid:2,
      username:"Francesca"
    },
    {
      uuid:3,
      username:"Giulia"
    },
    {
      uuid:4,
      username:"Matteo"
    },
    {
      uuid:5,
      username:"Matteo"
    },
    {
      uuid:6,
      username:"Matteo"
    },
    {
      uuid:7,
      username:"Matteo"
    },
    {
      uuid:8,
      username:"Matteo"
    },
  ]*/
 
  return (
    <View style={styles.centeredView}>
    {showPicker ?
              <View>
              <DateTimePicker
              style={{zIndex:"auto"}}
                mode="date"
                display="spinner"
                value={date? date : currentDate}
                onChange={onDatechange}
                minimumDate={new Date()}
              />
              </View>
              :''}
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

            {dropdownOpen? 
            <View style={dropdownOpen? styles.dropdown : styles.dropdownEmpty}>
              <FlatList
                data={users.filter((item) => {
                  const searchTerm = friend.toLowerCase();
                  const nameuser = item.username.toLowerCase();
                  return searchTerm && nameuser.startsWith(searchTerm) 
                  && searchTerm!==nameuser;
                }).slice(0,10)}
                renderItem={({ item }) => (
                  <Pressable onPress={()=>{SetFriend(item.username)
                  setDropdownOpen(false)
                  }} style={styles.dropdownRow} key={item.uuid}>
                    <Text style={styles.friendStyle}>{item.username}</Text>
                    {console.log(item.username)}
                  </Pressable>
                )}
                keyExtractor={(item) => item.uuid}
                showsHorizontalScrollIndicator={true}
              />
            </View>
             : ''}


            <View style={styles.formview}>

             
            <Pressable style={styles.dateTimeInput} onPress={toggleDatepicker}>
              <TextInput
                style={styles.dateTimeInputText}
                onChangeText={onChangeText}
                value={date? formatDate(date) : "Select date"}
                placeholder="Date"
                editable={false}
              />
            </Pressable>
            
              

              <TextInput
                style={styles.dateTimeInput}
                onChangeText={onChangeText}
                value={text}
                placeholder="Hour"
              />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Place"
            />

            <View style={styles.formview}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {setModalVisible(!modalVisible)
                setDropdownOpen(false)
                SetFriend("")
                setDate(null);
                }
                }
              >
                <Text style={styles.cancelTextStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonSend]}
                onPress={() => {setModalVisible(!modalVisible)
                setDropdownOpen(false)
                SetFriend("")
                setDate(null);
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
