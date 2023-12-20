import { ScrollView, Text, FlatList, Pressable,View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Styles
import { InvitationsPageStyle as styles } from "../../../styles";
// Components

import { Loader } from "../../../components/common";

// Services
//import api from "../../../services/api";

const InvitationsPage = () => {
  //const [loading, setLoading] = useState(true);
  

  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";

  

 // if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Invitations</Text>
      
      <View style={styles.buttonView}>
        <Pressable style={styles.button}>
            <Text style={styles.buttonTitle}>+</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default InvitationsPage;
