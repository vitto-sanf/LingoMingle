import { Pressable, StyleSheet,Text,View } from "react-native";
import { useCall } from "@stream-io/video-react-native-sdk";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../constants";
import { ParticipantsInfoBadge /*as DefaultParticipantsInfoBadge*/,
    ParticipantsInfoBadgeProps,} from "@stream-io/video-react-native-sdk";
const CustomCallTopView = (props) => {
    const call = useCall();
    return (
      <View style={styles.topView}>
        {/*<Text style={styles.title}>{call?.id}</Text>*/}
        {console.log(call?.id)}
        {call?.id==100000 &&
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