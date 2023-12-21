// Imports
import { View, Text, Pressable, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CountryFlag from "react-native-country-flag";

// Components
import { Loader } from "../../../components/common";

// Styles
import styles from "../../../styles/Profile.styles";
import maleAvatar from "../../../assets/images/maleAvatar.png";
import femaleAvatar from "../../../assets/images/femaleAvatar.png";

// Services
import api from "../../../services/api";

// Hooks
import useNotification from "../../../hooks/useNotification";

const Profile = () => {
  const notify = useNotification();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const MY_UUID = "YVBwXkN7cIk7WmZ8oUXG";

  useEffect(() => {
    api
      .getUser(MY_UUID)
      .then((data) => setProfile(data))
      .catch((err) => notify.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container} edges={["right", "bottom", "left"]}>
      <View style={styles.userInfoContainer}>
        <View style={styles.headerBackground} />
        <Image
          source={profile.gender === "M" ? maleAvatar : femaleAvatar}
          style={[styles.profileImage, { width: 160, height: 160 }]}
        />
        <Text style={styles.username}>{profile.username}</Text>
      </View>
      <View style={styles.languageContainer}>
        <Text style={styles.languageHeaderText}>Native language</Text>
        <View style={styles.row}>
          <CountryFlag
            isoCode={profile.native_language_country_code}
            size={24}
          />
          <Text style={styles.languageInfoText}>{profile.native_language}</Text>
        </View>
        <Text style={styles.languageHeaderText}>New language</Text>
        <View style={styles.row}>
          <CountryFlag isoCode={profile.new_language_country_code} size={24} />
          <Text style={styles.languageInfoText}>
            {profile.new_language} - {profile.level}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
