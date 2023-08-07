import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../client_mobile/navigation/screens/Home';
import Parameter from '../client_mobile/navigation/screens/Parameter';
import LoginScreen from '../client_mobile/navigation/screens/Login';
import Apointement from '../client_mobile/navigation/screens/Apoint';
import TutorialScreen from '../client_mobile/navigation/screens/Tutorialsc';
import Chat from '../client_mobile/navigation/screens/chat';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBarIcon = ({ name, color, size }) => {
  return (
    <Icon
      name={name}
      color={color}
      size={size}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 64,
        backgroundColor: 'black',
        marginRight : -16,
        paddingLeft: 39,
      }}
    />
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false ,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <CustomTabBarIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="parameter"
        component={Parameter}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <CustomTabBarIcon name="gear" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="apointementtt"
        component={Apointement}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <CustomTabBarIcon name="calendar" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <CustomTabBarIcon name="comment" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tutorialsc" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tutorial" component={TutorialScreen} />
        <Stack.Screen name="Start" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
