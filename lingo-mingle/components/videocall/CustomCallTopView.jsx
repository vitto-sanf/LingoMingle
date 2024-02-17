import { Pressable, StyleSheet,Text,View } from "react-native";
import { useCall } from "@stream-io/video-react-native-sdk";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../constants";
import { ParticipantsInfoBadge /*as DefaultParticipantsInfoBadge*/,
    ParticipantsInfoBadgeProps,
    useCallStateHooks
  } from "@stream-io/video-react-native-sdk";
import { useEffect, useState,useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";
const CustomCallTopView = (props) => {
    const { user, token } = useContext(AuthContext);
    const call = useCall();
    const { useCallCallingState, useParticipants } = useCallStateHooks();
    const participant= useParticipants();
    const [filteredParticipant,setFilteredParticipant]=useState([]);
    const [OtherParticipantUuid,setOtherParticipantUuid]=useState("");
    const [friends, setFriends] = useState([]); // stato con gli uuid dei miei amici
    const [isFriend,setIsFriend]=useState(true);
   

    const MY_UUID = user.uuid;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, 3500); // 3000 milliseconds = 3 seconds
  
      
      return () => clearTimeout(timeout);
    }, [participant]);
  


    useEffect(()=>{
      
      const participantsUuids = participant.map(participant => participant.userId);
      setFilteredParticipant(participantsUuids)
      if(participant.length>1)
      {
        setIsVisible(false);
      }
     
    },[participant])


    useEffect(() => {
      api
        .getUser(MY_UUID)
        .then((data) => {
          api
            .getFriends(data.friends)
            .then((friendsInfo) => {
            
            const uuids = friendsInfo.map(friend => friend.uuid);
            setFriends(uuids);
            })
            .catch((err) => notify.error(err));
        })
        .catch((err) => notify.error(err))
      
    }, [user]);
  
   

    useEffect(()=>{
  
      console.log(" Call participants:", filteredParticipant);
      const otherUuid=filteredParticipant.filter(element => element !== MY_UUID);
      setOtherParticipantUuid(otherUuid);
      const isContained = friends.includes(OtherParticipantUuid[0]);
     
        setIsFriend(isContained);
       
      
    },[filteredParticipant])

   
      

    return (
      <View style={styles.topView}>
       
      
      {(!isFriend && participant.length>1 && filteredParticipant.length>1 && isVisible) &&
            <Pressable style={styles.friendReqPressable}>
        <FA5Icon name="user-plus" size={20} color={COLOR.white} />
        </Pressable>
        }
      
        
       


        <View style={[styles.rightElement/*, callTopView.rightElement*/]}>
        
        
          {ParticipantsInfoBadge && (
            <ParticipantsInfoBadge
              //onParticipantInfoPress={onParticipantInfoPress}
            />
          )}
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    topView: {
      width: '100%',
      //height: '20%',
      backgroundColor: "#272b2e",
      //position: 'absolute',
        top: 0,
        flexDirection: 'row',
        paddingTop: 24,
        paddingBottom: 12,
        alignItems: 'center',
    },
    title: {
      paddingVertical: 20,
      color: 'white',
      textAlign: 'center',
    },
    content: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        paddingTop: 24,
        paddingBottom: 12,
        alignItems: 'center',
      },
      backIconContainer: {
        // Added to compensate the participant badge surface area
        marginLeft: 8,
      },
      leftElement: {
        flex: 1,
        alignItems: 'flex-start',
      },
      centerElement: {
        flex: 1,
        alignItems: 'center',
        flexGrow: 3,
      },
      rightElement: {
        flex: 1,
        alignItems: 'flex-end',
        
      },
      friendReqPressable: {
        flex: 4,
        alignItems: 'flex-end',
        
      },
  });
  
  export default CustomCallTopView;