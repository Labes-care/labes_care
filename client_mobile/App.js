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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} /> 
          ),
        }}
      />
      <Tab.Screen
        name="parameter"
        component={Parameter}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="gear" color={color} size={size} /> 
          ),
        }}
      />
      <Tab.Screen
        name="apointement"
        component={Apointement}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} /> 
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
