import { Stack } from "expo-router";

const RoomLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RoomLayout;
