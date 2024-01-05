// Imports
import { Tabs } from "expo-router";

// Styles
import FAIcons from "react-native-vector-icons/FontAwesome";
import { COLOR } from "../../constants";

const MainLayout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: COLOR.black,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FAIcons name="home" size={size} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="friends"
        options={{
          tabBarLabel: "Friends",
          title: "Friends",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FAIcons name="users" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="invitations"
        options={{
          tabBarLabel: "Invitations",
          title: "Invitations",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FAIcons name="calendar" size={size} color={color} />
            ),
        }}
        />
        <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FAIcons name="user" size={size} color={color} />
          ),
        }}
      />  
    </Tabs>
  );
};

export default MainLayout;
