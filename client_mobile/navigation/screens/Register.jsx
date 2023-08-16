import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import { BlurView } from 'expo-blur';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const RegisterScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('male');
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [location, setLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            async (position) => {
              setLocation(position.coords);
              // Get the location name using reverse geocoding
              let nominatimResponse = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
              );

              if (nominatimResponse.data.display_name) {
                setLocationName(nominatimResponse.data.display_name);
              } else {
                console.log('No location data available');
              }
            },
            (error) => {
              console.error('Error getting location', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.error('Error getting location permission', error);
      }
    })();
  }, []);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3003/register', {
        fullname: fullName,
        gender: gender,
        birthday: selectedDate,
        email: email,
        password: password,
        location: location,
      });

      if (response.status === 200) {
        console.log('Registration successful', response.data);
      } else {
        console.error('Registration failed', response.data);
      }
    } catch (error) {
      console.error('Error during registration', error);
    }
  };

  const showCalendar = () => {
    setCalendarVisibility(true);
  };

  const hideCalendar = () => {
    setCalendarVisibility(false);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    hideCalendar();
  };

  const handleDateInputPress = () => {
    showCalendar();
  };

  const handleLocationPermission = async () => {
    try {
      let { status } = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        setLocationPermission(true);
        Geolocation.getCurrentPosition(
          (position) => {
            setLocation(position.coords);
          },
          (error) => {
            console.error('Error getting location', error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        let nominatimResponse = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`
        );

        if (nominatimResponse.data.display_name) {
          setLocationName(nominatimResponse.data.display_name);
        } else {
          console.log('No location data available');
        }
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error getting location permission', error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#001F3F', '#000000']} style={styles.gradientBackground} />
      <View style={styles.gifContainer}>
        <Image
          source={require('../screens/models/db5dea2caaa75e7219d218f76ba1f976.png')}
          style={styles.gif}
        />
        <Text style={styles.gifText}>  Today ...</Text>
        <Text style={styles.gifText}>Join Us</Text>
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Register</Text>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
        <TouchableOpacity onPress={handleDateInputPress} style={styles.birthdayInputContainer}>
          <TextInput
            style={styles.birthdayInput}
            placeholder="DD/MM/YYYY"
            value={selectedDate}
            editable={false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLocationPermission} style={styles.locationButton}>
          <Text style={styles.buttonText}>Allow Location Access</Text>
        </TouchableOpacity>
        {locationPermission && locationName && (
          <Text style={styles.locationText}>
            Location: {locationName}
          </Text>
        )}
        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isCalendarVisible} transparent animationType="slide">
        <BlurView intensity={90} style={styles.blurContainer}>
          <View style={styles.calendarModal}>
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{ [selectedDate]: { selected: true } }}
            />
            <TouchableOpacity onPress={hideCalendar} style={styles.closeButton}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gifContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: 730,
    height: 500,
    resizeMode: 'contain',
    marginTop: -150,
    bottom: 85,
  },
  gifText: {
    fontSize: 50,
    color: 'white',
    marginTop: -45,
    marginBottom: -100,
    marginRight: 115,
    bottom: 115,
    right: 35,
  },
  registerContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 25,
  },
  registerText: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
    marginBottom: 5,
    marginRight: 250,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    width: 310,
    borderRadius: 5,
    backgroundColor: '#F2F2F2',
  },
  picker: {
    width: 310,
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    marginBottom: 10,
  },
  birthdayInputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  birthdayInput: {
    borderWidth: 1,
    padding: 10,
    width: 310,
    borderRadius: 5,
    backgroundColor: '#F2F2F2',
  },
  locationButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  locationText: {
    color: 'white',
  },
  registerButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 7,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarModal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 15,
  },
});

export default RegisterScreen;
