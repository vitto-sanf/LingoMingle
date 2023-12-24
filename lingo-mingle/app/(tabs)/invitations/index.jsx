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
import api from "../../../services/api";

const InvitationsPage = () => {
  const [loading, setLoading] = useState(true);
  const[pageStatus,setPageStatus]=useState("new");
  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";
  const [invitations,setInvitations]=useState([]);
  const [accInvitations,setAccInvitations]=useState([]);
  const [dirty,setDirty]=useState(true);
  const [dirty2,setDirty2]=useState(true);

  
  useEffect(()=>{
    if(dirty)
    {
    api
    .getInvitation(MY_UUID,"pending")
    .then((data)=>{
      
      if(data)
      {
        
      setInvitations(data);
      setDirty(false);
      setLoading(false);
      }
      
     })
    .catch((err)=>console.log(err));
    }
  },[invitations]);

  useEffect(()=>{
    if(dirty2)
    {
    api
    .getInvitation(MY_UUID,"accepted")
    .then((data)=>{
      
      if(data)
      {
        
      setAccInvitations(data);
      setDirty2(false);
      setLoading(false);
      }
      
     })
    .catch((err)=>console.log(err));
    }
  },[accInvitations]);

  const handleSetNew = () => {
    setPageStatus("new");
    
  };
  const handleSetScheduled = () => {
    setPageStatus("scheduled");
    
  };
   if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Invitations</Text>
      <View style={styles.topNav}>
      
      <Pressable style={ pageStatus==="new"?  styles.topNavLinksSelected : styles.topNavLinks} onPress={handleSetNew}><Text>New Invitations</Text></Pressable>
      <Pressable style={ pageStatus==="scheduled"? styles.topNavLinksSelected : styles.topNavLinks} onPress={handleSetScheduled} ><Text > Scheduled </Text></Pressable>
      </View>
      
        {invitations?.length === 0 && pageStatus==="new"? (
          <Text style={styles.noInfoText}>There are no new invitations</Text>
        ) :invitations?.length !== 0 && pageStatus==="new"? (
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
        ) : accInvitations?.length !== 0 && pageStatus==="scheduled"?(
          <ScrollView
            horizontal={true}
            showsVerSectionListticalScrollIndicator={false}
            style={styles.sectionContainer}
            bounces={false}
          >
            <>
              <FlatList
                data={accInvitations}
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
