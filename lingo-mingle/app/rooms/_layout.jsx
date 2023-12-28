import { Stack } from "expo-router";


const RoomLayout = () => {
  return <Stack>
    <Stack.Screen name="[id]" options={{ title: 'Room' }} />
  </Stack>;
};

export default RoomLayout;
