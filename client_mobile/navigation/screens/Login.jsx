import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'M' && password === 'H') {
      navigation.navigate('Home');
    } else {
      alert('Please try again.');
    }
  };

  return (
    <LinearGradient colors={['#001F3F', '#000000']} style={styles.container}>
      <View style={styles.gifContainer}>
        <Image
          source={require('../screens/doctor-70s.gif')}
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
        <TouchableOpacity>
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
  },
  gif: {
    width: 730,
    height: 450,
    resizeMode: 'contain',
    marginTop : -130,

  },
  gifText: {
    fontSize: 50,
    color: 'white',
    marginTop : -140,
    marginBottom : -100,
    marginRight : 130,
  },
  loginContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom : -100,

  },
  loginText: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
    marginBottom : 5,    
    marginRight : 250,

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
