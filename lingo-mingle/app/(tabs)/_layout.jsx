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
        tabBarInactiveBackgroundColor: COLOR.secondary,
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
    </Tabs>
  );
};

export default MainLayout;
