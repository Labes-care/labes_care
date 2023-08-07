import React from 'react';
import { WebView } from 'react-native-webview';

const Apointement = ({ uri }) => {
  return <WebView 
  source={{ uri:'http://192.168.1.13:3000/' }}
  />;
};

export default Apointement;