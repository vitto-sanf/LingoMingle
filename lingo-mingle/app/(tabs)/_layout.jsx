// Imports
import { Tabs } from "expo-router";
import { useEffect, useContext, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import IncomingCall from "../../components/videocall/IncomingCall";
import { database } from "../../config/firebase";

// Styles
import FAIcons from "react-native-vector-icons/FontAwesome";
import { COLOR } from "../../constants";

//context
import { AuthContext } from "../../contexts/AuthContext";

const MainLayout = () => {
  const { user } = useContext(AuthContext);
  const [callData, setCallData] = useState(undefined);
  const [comingCall, setComingCall] = useState(false);

  useEffect(() => {
    
    const listener = onSnapshot(
      collection(database, "directCall"),
      (snapshot) => {
        snapshot.forEach((doc) => {
          console.log("DOCDATA", user.uuid,doc.data().receiverId, doc.data().status)
          console.log("prova",doc.data().receiverId == user.uuid , doc.data().status == "pending")
          if (
            doc.data().receiverId == user.uuid &&
            doc.data().status == "pending"
          ) {
            console.log("INCOMING",doc)
            let ref = doc.data();
            ref.id = doc.id;
            setCallData(ref);
            setComingCall(true)
            return doc ;
          }
        });
      }
    );

    return listener;
  }, []);

  if (callData && comingCall) return <IncomingCall callData={callData} setComingCall={()=>setComingCall(false)} setCallData={()=>setCallData(undefined)}/>;
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
