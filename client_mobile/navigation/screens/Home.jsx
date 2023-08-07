import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#001F3F', '#000000']}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#FFFFFF', fontSize: 24 }}>Welcome to Screen</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default HomeScreen;
