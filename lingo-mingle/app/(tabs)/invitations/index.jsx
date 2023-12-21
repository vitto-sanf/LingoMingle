import { ScrollView, Text, FlatList, Pressable,View, SectionList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Styles
import { InvitationsPageStyle as styles } from "../../../styles";
// Components

import { Loader } from "../../../components/common";
import {
  InvitationCard
} from "../../../components/cards";
// Services
//import api from "../../../services/api";

const InvitationsPage = () => {
  //const [loading, setLoading] = useState(true);
  

  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";

  const invitations=[
    {
      uuid:"1",
      sender:"User P", 
      timestamp: "20/12/2023  15:00",
      place:"MixTo"
    },
    {
      uuid:"2",
      sender:"User J", // Q
      timestamp: "20/12/2023  15:00",
      place:"MixTo"
    },
    {
      uuid:"3",
      sender:"User P", // Q
      timestamp: "20/12/2023  15:00",
      place:"MixTo"

    }
  ]

  

 // if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Invitations</Text>

      {invitations.length === 0  ? (
        <Text style={styles.noInfoText}>
          There are no invitations
        </Text>
      ) : (
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
                  <InvitationCard item={item} myUUID={MY_UUID} />
                )}
                keyExtractor={(item) => item.uuid}
                
                showsHorizontalScrollIndicator={false}
              />
            </>
         

          
        </ScrollView>
      )}







      


      <View style={styles.buttonView}>
        <Pressable style={styles.button}>
            <Text style={styles.buttonTitle}>+</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default InvitationsPage;
