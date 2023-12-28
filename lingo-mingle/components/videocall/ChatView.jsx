import React, { useEffect, useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { StreamChat } from 'stream-chat';
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
} from 'stream-chat-expo';

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;
//Contexts

import { AuthContext } from '../../contexts/AuthContext';


const ChatView = ({ channelId }) => {
  const chatClient = StreamChat.getInstance(STREAM_KEY);
  const { user,token } = useContext(AuthContext);
  
  const [channel, setChannel] = useState();

  // Connect to the channel with the same ID as the video call
  useEffect(() => {
    const connectToChannel = async () => {
      const userInfo = { id: user.uuid };

      await chatClient.connectUser(userInfo, token);
      const channel = chatClient.channel('messaging', channelId);

      setChannel(channel);
      await channel.watch();
    };

    connectToChannel();

    // Cleanup
    return () => {
      channel?.stopWatching();
      chatClient.disconnectUser();
    };
  }, []);

  return (
    <>
      {chatClient && channel ? (
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <MessageList />
            <MessageInput />
          </Channel>
        </Chat>
      ) : (
        <View>
          <Text>Loading Chat...</Text>
        </View>
      )}
    </>
  );
};

export default ChatView;
