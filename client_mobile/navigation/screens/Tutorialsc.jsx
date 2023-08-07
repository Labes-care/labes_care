import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TutorialScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.tutorialText}>Welcome to Labes Care</Text>
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('Start')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  tutorialText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: '#4285f4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TutorialScreen;
