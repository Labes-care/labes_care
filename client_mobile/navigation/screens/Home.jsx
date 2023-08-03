import React from 'react';
import GLModelView from 'react-native-gl-model-view'
import { View, Text } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text onPress={() => alert('This is the "Home" screen.')} style={{ fontSize: 26, fontWeight: 'bold' }}>
        Home Screen
      </Text>
      <GLModelView
        model={{
          uri: 'path_to_your_gltf_model_file_here',
        }}
        style={{ width: '100%', height: 300 }}
      />
    </View>
  );
}
