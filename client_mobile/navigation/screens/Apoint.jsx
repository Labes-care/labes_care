import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from 'client_mobile/AuthContext.js';

const ModelViewer = () => {
  const webViewRef = useRef(null);
  const navigation = useNavigation();
  const { setMessageOptionValue } = useAuth(); // Use correct function name
  const onWebViewMessage = event => {
    const messageData = JSON.parse(event.nativeEvent.data);
    console.log('Received message:', messageData);
    
    if (messageData.option !== '') {
      setMessageOptionValue(messageData.option,messageData.hotspot); // Use correct function name
      navigation.navigate('Appointmen');
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'http://192.168.30.250:3000/index.html' }}
      onMessage={onWebViewMessage}
    />
  );
};

export default ModelViewer;
