import { Stack } from "expo-router";

const ChatLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
      name = "[id]"
      options ={{
        headerTitle:'Chat'
      }}
      />
        
    </Stack>
  );
};

export default ChatLayout;
