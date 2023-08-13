import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Chat = () => {
  return (
    <LinearGradient colors={['#001F3F', '#000000']} style={{ flex: 1 }}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#FFFFFF', fontSize: 24 }}>chat Screen</Text>
    </View>
  </LinearGradient>
  );
};

export default Chat;