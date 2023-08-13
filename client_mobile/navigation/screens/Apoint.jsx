import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const ModelViewer = () => {
  const webViewRef = useRef(null);
  const navigation = useNavigation();

  const onWebViewMessage = event => {
    const messageData = JSON.parse(event.nativeEvent.data);
    console.log('Received message:', messageData);
    
    if (messageData.option !== '') {
      navigation.navigate('Appointmen'); 
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'http://192.168.100.250:3000/index.html' }}
      onMessage={onWebViewMessage}
    />
  );
};

export default ModelViewer;
