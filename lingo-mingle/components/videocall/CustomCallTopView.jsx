import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCall } from "@stream-io/video-react-native-sdk";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../constants";
import {
  ParticipantsInfoBadge,
  ParticipantsInfoBadgeProps,
  useCallStateHooks,
} from "@stream-io/video-react-native-sdk";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";
import useNotification from "../../hooks/useNotification";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { database } from "../../config/firebase";
const CustomCallTopView = ({setIsUserFriend,setPartcipantId}) => {
  const { user, token } = useContext(AuthContext);
  const call = useCall();
  const { useCallCallingState, useParticipants } = useCallStateHooks();
  const participant = useParticipants();
  const [filteredParticipant, setFilteredParticipant] = useState([]);
  const [OtherParticipantUuid, setOtherParticipantUuid] = useState("");
  const [friends, setFriends] = useState([]); // stato con gli uuid dei miei amici
  const [isFriend, setIsFriend] = useState(true);
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const [requestReceived, setRequestReceived] = useState(false);
  const [allUsersData, setAllUserData] = useState();
  const MY_UUID = user.uuid;
  const [isVisible, setIsVisible] = useState(false);
  const notify = useNotification();

  useEffect(() => {
    const listener = onSnapshot(doc(database, "user", MY_UUID), (snapshot) => {
      setAllUserData(snapshot.data());
      if (snapshot.data().friends_request.length >= 1) {
        /*console.log(
          "Firends_Request: ",
          snapshot.data().friends_request[
            snapshot.data().friends_request.length - 1
          ]?.receiver
        );*/
        if (
          snapshot.data().friends_request[
            snapshot.data().friends_request.length - 1
          ]?.receiver == MY_UUID
        ) {
          setRequestReceived(true);
        } else {
          setRequestReceived(false);
        }
      } else {
        setRequestReceived(false);
      }
    });
  }, [friendRequestSent]);

 

  const handleSendFriendRequest = () => {
    api
      .sendFriendRequest(MY_UUID, OtherParticipantUuid[0])
      .then((res) => {
        setFriendRequestSent(true);
        notify.success(res.message);
      })
      .catch((err) => notify.error(err.message));
  };

  const handleCancelFriendRequest = () => {
    api
      .cancelFriendRequest(MY_UUID, OtherParticipantUuid[0])
      .then((res) => {
        setFriendRequestSent(false);
        notify.success(res.message);
      })

      .catch((err) => notify.error(err.message));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    return () => clearTimeout(timeout);
  }, [participant]);

  useEffect(() => {
    const participantsUuids = participant.map(
      (participant) => participant.userId
    );
    setFilteredParticipant(participantsUuids);
    if (participant.length > 1) {
      setIsVisible(false);
    }
  }, [participant]);

  useEffect(() => {
    api
      .getUser(MY_UUID)
      .then((data) => {
        api
          .getFriends(data.friends)
          .then((friendsInfo) => {
            const uuids = friendsInfo.map((friend) => friend.uuid);
            setFriends(uuids);
          })
          .catch((err) => notify.error(err));
      })
      .catch((err) => notify.error(err));
  }, [user]);

  useEffect(() => {
    if (filteredParticipant.length > 1 && friends.length >= 1) {
      const otherUuid = filteredParticipant.filter(
        (element) => element !== MY_UUID
      );

      setOtherParticipantUuid(otherUuid);

     
    }
    
  }, [filteredParticipant,friends]);

  useEffect(()=>{

    if(OtherParticipantUuid.length>=1)
    {
    const isContained = friends.includes(OtherParticipantUuid[0]);
      
      console.log(MY_UUID," : friends: ",friends)
      console.log(MY_UUID," : OtherParticipantUuid: ",OtherParticipantUuid)
      console.log(MY_UUID," : isContained: ",isContained)
      //console.log(MY_UUID," : otherUUid: ",otherUuid)
      setIsFriend(isContained);
      setIsUserFriend(isContained);
      setPartcipantId(OtherParticipantUuid)
    }

  },[OtherParticipantUuid])


  useEffect(() => {
    if (OtherParticipantUuid.length >= 1) {
      const isContained = friends.includes(OtherParticipantUuid[0]);

      setIsFriend(isContained);
      setIsUserFriend(isContained);
      setPartcipantId(OtherParticipantUuid)
    }
  }, [OtherParticipantUuid]);

  return (
    <View style={styles.topView}>
      {!isFriend &&
        participant.length > 1 &&
        filteredParticipant.length > 1 &&
        isVisible &&
        !requestReceived && (
          <Pressable
            onPress={
              !friendRequestSent &&
              !allUsersData.friends_request.some((request) => {
                return request.sender === MY_UUID;
              })
                ? handleSendFriendRequest
                : handleCancelFriendRequest
            }
            style={styles.friendReqPressable}
          >
            {!friendRequestSent &&
            !allUsersData.friends_request.some((request) => {
              return request.sender === MY_UUID;
            }) ? (
              <FA5Icon name="user-plus" size={20} color={COLOR.white} />
            ) : (
              <FA5Icon name="user-times" size={20} color={COLOR.red} />
            )}
          </Pressable>
        )}

      <View style={[styles.rightElement]}>
        {ParticipantsInfoBadge && <ParticipantsInfoBadge />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topView: {
    width: "100%",

    backgroundColor: "#272b2e",

    top: 0,
    flexDirection: "row",
    paddingTop: 24,
    paddingBottom: 12,
    alignItems: "center",
  },
  title: {
    paddingVertical: 20,
    color: "white",
    textAlign: "center",
  },
  content: {
    position: "absolute",
    top: 0,
    flexDirection: "row",
    paddingTop: 24,
    paddingBottom: 12,
    alignItems: "center",
  },
  backIconContainer: {
    // Added to compensate the participant badge surface area
    marginLeft: 8,
  },
  leftElement: {
    flex: 1,
    alignItems: "flex-start",
  },
  centerElement: {
    flex: 1,
    alignItems: "center",
    flexGrow: 3,
  },
  rightElement: {
    flex: 1,
    alignItems: "flex-end",
  },
  friendReqPressable: {
    flex: 4,
    alignItems: "flex-end",
  },
});

export default CustomCallTopView;
