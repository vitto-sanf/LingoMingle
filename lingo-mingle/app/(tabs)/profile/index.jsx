// Imports
import { View, Text, Pressable, Image, FlatList } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CountryFlag from "react-native-country-flag";

// Styles
import styles from "../../../styles/Profile.styles";
import maleAvatar from "../../../assets/images/maleAvatar.png";
import femaleAvatar from "../../../assets/images/femaleAvatar.png";

//Contexts
import { AuthContext } from "../../../contexts/AuthContext";

const Profile = () => {
  const { user, switchUser,switchToken } = useContext(AuthContext);

  const [usersList, setUsersList] = useState([
    { id: "YVBwXkN7cIk7WmZ8oUXG", username: "Alice" , token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWVZCd1hrTjdjSWs3V21aOG9VWEcifQ.yufN7vKkauON38gmMyvUwmITiqDjr05SstG1fKqp-6A"},
    { id: "QNDv4UEwiaqCmJIjoblX", username: "Francesco", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUU5EdjRVRXdpYXFDbUpJam9ibFgifQ.Q7QH8cbqKs5zQ1nboQclLdFpH35YvmUsWp3sl3ObWtc" },
    { id: "NW01c8S4tsrjZ66bR0Ll", username: "Giulia", token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiTlcwMWM4UzR0c3JqWjY2YlIwTGwifQ.bt-chAvUN5uIsxzx-pDU3ewHzO-W98OfFhmRN0W0x80" },
    // ... add more users as needed
  ]);

  const handleUserSwitch = (newUser) => {
    switchUser(newUser.id);
    switchToken(newUser.token)
  };

  return (
    <SafeAreaView style={styles.container} edges={["right", "bottom", "left"]}>
      <View style={styles.userInfoContainer}>
        <View style={styles.headerBackground} />
        <Image
          source={user.gender === "M" ? maleAvatar : femaleAvatar}
          style={[styles.profileImage, { width: 160, height: 160 }]}
        />
        <Text style={styles.username}>{user.username}</Text>
      </View>
      <View style={styles.languageContainer}>
        <Text style={styles.languageHeaderText}>Native language</Text>
        <View style={styles.row}>
          <CountryFlag isoCode={user.native_language_country_code} size={24} />
          <Text style={styles.languageInfoText}>{user.native_language}</Text>
        </View>
        <Text style={styles.languageHeaderText}>New language</Text>
        <View style={styles.row}>
          <CountryFlag isoCode={user.new_language_country_code} size={24} />
          <Text style={styles.languageInfoText}>
            {user.new_language} - {user.level}
          </Text>
        </View>

        <View>
          <Text style={styles.languageHeaderText}>Switch User</Text>
          <FlatList
            data={usersList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleUserSwitch(item)}>
                <Text style={styles.switchUserItem}>{item.username}</Text>
              </Pressable>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
