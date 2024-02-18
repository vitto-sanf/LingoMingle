// Imports
import { Tabs } from "expo-router";
import { useEffect, useContext, useState } from "react";
import { onSnapshot, collection,query,where } from "firebase/firestore";
import { database } from "../../config/firebase";
import { useRouter } from "expo-router";
// Components
import { IncomingCall } from "../../components/videocall";

// Context
import { AuthContext } from "../../contexts/AuthContext";
import { DirectCallContext } from "../../contexts/directCallContext";

// Styles
import FAIcons from "react-native-vector-icons/FontAwesome";
import { COLOR } from "../../constants";

const MainLayout = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const {setCallInfo}= useContext(DirectCallContext)
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(database, "directCall"), where("receiverId", "==", user.uuid), where("status", "==", "pending")),
      (snapshot) => {
        snapshot.forEach((doc) => {
          console.log("INCOMING", doc);
          const callInfo = { ...doc.data(), id: doc.id };
          setCallInfo(callInfo);
          router.push("/incomingCall");
        });
      },
      (error) => {
        console.error("Error while listening to directCall collection:", error);
      }
    );
  
    return () => {
      unsubscribe();
    };
  }, [user.uuid]);

/*   if (callData && comingCall)
    return (
      <IncomingCall
        callData={callData}
        setComingCall={() => setComingCall(false)}
        setCallData={() => setCallData(undefined)}
      />
    ); */

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
