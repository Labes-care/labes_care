import React,{useState,useEffect} from 'react';
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
import AppointmentScreen from '../client_mobile/navigation/screens/AppointmentScreen'
import DoctorDetailsScreen from '../client_mobile/navigation/screens/Doctordetail'; // Import the new component
import Register from '../client_mobile/navigation/screens/Register' 
import SchedulePage from './navigation/screens/SchedulePage';
import Location from '../client_mobile/navigation/screens/Location';
import WebViewScreen from '../client_mobile/navigation/screens/WebViewScreen'
import { View} from 'react-native';


import { AuthProvider } from './AuthContext';
import { useAuth } from './AuthContext';


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

  
  const isAppointmentSet = true; 
  

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
         <Tab.Screen
        name="parameter"
        component={Parameter}
        initialParams={{ isAppointmentSet }} // Pass the isAppointmentSet value as a parameter
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View>
              {/* Render a red dot based on the value of isAppointmentSet */}
              {route.params.isAppointmentSet && (
                <View
                  style={{
                    position: 'absolute',
                    top: -3,
                    right: 50,
                    width: 14,
                    height: 14,
                    backgroundColor: 'red',
                    borderRadius: 16,
                    zIndex: 1000,

                  }}
                />
              )}
              <CustomTabBarIcon name="gear" color={color} size={size} />
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tutorialsc" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tutorial" component={TutorialScreen} />
        <Stack.Screen name="Start" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="Appointmen" component={AppointmentScreen} />
        <Stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} initialParams={{ doctorId: 'doctor_id', patientId: 'patient_id'}} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="SchedulePage" component={SchedulePage} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="WebViewScreen" component={WebViewScreen} />


      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>

  );
};

export default App;
