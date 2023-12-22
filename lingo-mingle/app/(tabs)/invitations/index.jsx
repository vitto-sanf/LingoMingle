import {
  ScrollView,
  Text,
  FlatList,
  Pressable,
  View,
  SectionList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
// Styles
import { InvitationsPageStyle as styles } from "../../../styles";
// Components

import { Loader } from "../../../components/common";
import {NewInvitationCard, ScheduledInvitationCard } from "../../../components/cards";
import { COLOR } from "../../../constants";
import  {Link} from 'expo-router';
// Services
//import api from "../../../services/api";

const InvitationsPage = () => {
  //const [loading, setLoading] = useState(true);
  const[pageStatus,setPageStatus]=useState("new");
  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";

  const handleSetNew = () => {
    setPageStatus("new");
    
  };
  const handleSetScheduled = () => {
    setPageStatus("scheduled");
    
  };

  
  const invitations = [
    {
      uuid: "1",
      sender: "User P",
      timestamp: "20/12/2023  15:00",
      place: "MixTo",
    },
    {
      uuid: "2",
      sender: "User J",
      timestamp: "20/12/2023  15:00",
      place: "MixTo",
    },
    {
      uuid: "3",
      sender: "User P",
      timestamp: "20/12/2023  15:00",
      place: "MixTo",
    },
  ];

  // if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Invitations</Text>
      <View style={styles.topNav}>
      <Pressable style={ pageStatus==="scheduled"? styles.topNavLinksSelected : styles.topNavLinks} onPress={handleSetScheduled} ><Text > Scheduled </Text></Pressable>
      <Pressable style={ pageStatus==="new"?  styles.topNavLinksSelected : styles.topNavLinks} onPress={handleSetNew}><Text>New Invitations</Text></Pressable>
      
      </View>
      
        {invitations.length === 0 && pageStatus==="new"? (
          <Text style={styles.noInfoText}>There are no new invitations</Text>
        ) :invitations.length !== 0 && pageStatus==="new"? (
          <ScrollView
            horizontal={true}
            showsVerSectionListticalScrollIndicator={false}
            style={styles.sectionContainer}
            bounces={false}
          >
            <>
              <FlatList
                data={invitations}
                renderItem={({ item }) => (
                  <NewInvitationCard item={item} myUUID={MY_UUID} />
                )}
                keyExtractor={(item) => item.uuid}
                showsHorizontalScrollIndicator={false}
              />
            </>
          </ScrollView>
        ) : pageStatus==="scheduled"?(
          <ScrollView
            horizontal={true}
            showsVerSectionListticalScrollIndicator={false}
            style={styles.sectionContainer}
            bounces={false}
          >
            <>
              <FlatList
                data={invitations}
                renderItem={({ item }) => (
                  <ScheduledInvitationCard item={item} myUUID={MY_UUID} />
                )}
                keyExtractor={(item) => item.uuid}
                showsHorizontalScrollIndicator={false}
              />
            </>
          </ScrollView>
        ):(
          <View><Text style={styles.noInfoText}>There are no new Scheduled</Text></View>
        )
        
        
    }

      <View style={styles.buttonView}>
        
        <FA5Icon name="plus-circle"  color={COLOR.primary} regular size={56} />
        
      </View>
      
    </SafeAreaView>
  );
};

export default InvitationsPage;
