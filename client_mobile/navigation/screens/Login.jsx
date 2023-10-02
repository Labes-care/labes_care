import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useAuth } from 'client_mobile/AuthContext.js'

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { updatePatientId } = useAuth();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.30.250:3003/login', { 
        "email": username,
        "password": password
      });
  
      if (response.status === 200) {
        const token = response.data.token;
  
        const decodedToken = jwt_decode(token); 
  
        const patientId = decodedToken.id;
  
        console.log('Logged in successfully. Patient ID:', patientId);
        updatePatientId(patientId); 

        navigation.navigate('Home');
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login', error);
      alert('An error occurred during login. Please try again.');
    }
  };
  return (
    <LinearGradient colors={['#001F3F', '#000000']} style={styles.container}>
      <View style={styles.gifContainer}>
        <Image
          source={require('../screens/models/db5dea2caaa75e7219d218f76ba1f976.png')}
          style={styles.gif}
        />
        <Text style={styles.gifText}>Care your health</Text>
        <Text style={styles.gifText}>Care your life ,</Text>
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Log in</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gifContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 180,
  },
  gif: {
    width: 9999,
    height: 499,
    resizeMode: 'contain',
    marginTop: -130,
  },
  gifText: {
    fontSize: 50,
    color: 'white',
    marginTop: -140,
    marginBottom: -110,
    marginRight: 130,
    zIndex : 999
  },
  loginContainer: {
    position: 'fixed', // Use fixed position to make the container stay fixed
    top: 10, // Place it at the top of the screen
    left: 0, // Place it at the left of the screen
    right: 0, // Place it at the right of the screen
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    borderRadius: 10,
    marginBottom: 40,
    marginleft : 500,
    bottom: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Add a background color with some transparency
    zIndex: 1, // Ensure the container is above other elements
  },
  loginText: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
    marginBottom: 200,
    marginRight: 250,
    top : 200
  },
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    width: 310,
    borderRadius: 5,
    backgroundColor: '#F2F2F2',
  },
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  forgotPasswordText: {
    marginTop: 10,
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    marginRight: 5,
    color: 'white',
  },
  signupLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
