import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TutorialScreen = ({ navigation }) => {
  const [buttonPressed, setButtonPressed] = useState(false);

  const handlePressIn = () => {
    setButtonPressed(true);
  };

  const handlePressOut = () => {
    setButtonPressed(false);
  };

  return (
    <LinearGradient
      colors={['#001F3F', '#000000']} 
      style={styles.backgroundGradient}
    >
      <View style={styles.container}>
        <Text style={styles.tutorialText}>Sick is easy ,</Text>
        <Text style={styles.tutorialText}>but health is hard</Text>

        <TouchableOpacity
          style={[styles.getStartedButton, { backgroundColor: buttonPressed ? '#FF4444' : '#000D1A' }]}
          onPress={() => navigation.navigate('Start')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  backgroundGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tutorialText: {
    fontSize: 36, // Increased the font size
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Added shadow effect
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  getStartedButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    position: 'absolute',
    bottom: 40,
    left: -21,
    elevation: 8, // Add shadow for a more prominent look
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TutorialScreen;
