import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/Ionicons';

const CircleItem = ({ imageUri, isLighten }) => (
  <View style={[styles.circle, isLighten && styles.lightenCircle]}>
    <Image source={{ uri: imageUri }} style={styles.circleImage} />
    {isLighten && <View style={styles.neonOverlay} />}
  </View>
);

const RectangleItem = ({ imageUri, title }) => (
  <View style={styles.rectangleItem}>
    <Image source={{ uri: imageUri }} style={styles.rectangleImage} />
    <Text style={styles.rectangleTitle}>{title}</Text>
  </View>
);

const BottomRectangleCard = ({ data }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bottomRectangleList}>
    {data.map(item => (
      <RectangleItem key={item.id} imageUri={item.imageUri} title={item.title} />
    ))}
  </ScrollView>
);

const HomeScreen = () => {
  const profileImageUri = 'https://i.pinimg.com/474x/6d/0e/05/6d0e052a59840858186a37ba74de24b3.jpg';

  const data = [
    { id: '1', imageUri: 'https://via.placeholder.com/150', isLighten: false },
    { id: '2', imageUri: 'https://via.placeholder.com/150', isLighten: false },
    { id: '3', imageUri: 'https://via.placeholder.com/150', isLighten: false },
    { id: '4', imageUri: 'https://via.placeholder.com/150', isLighten: false },
  ];

  const [lightenIndex, setLightenIndex] = useState(-1);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#001F3F', '#000000']} style={styles.gradient}>
        <View style={styles.header}>
          <Text style={styles.greetingText}>Hi, Mohamed!</Text>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
          </View>
        </View>

        <Text style={styles.messageText}>Keep taking care of your health</Text>

        <BlurView intensity={80} tint="light" style={styles.blurContainer}>
          <View style={styles.searchBarContainer}>
            <Icon name="search" size={20} color="#FFFFFF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchBar}
              placeholder="Search anything here ..."
              placeholderTextColor="#FFFFFF"
            />
          </View>
        </BlurView>

        <FlatList
          horizontal
          data={data}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => setLightenIndex(index)}>
              <CircleItem imageUri={item.imageUri} isLighten={index === lightenIndex} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.circleList}
        />

        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>

        <BottomRectangleCard data={data} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  greetingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 10,
    right: 100,
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    left: 100,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 40,
    marginTop: 50,
  },
  blurContainer: {
    position: 'absolute',
    bottom: 40,
    width: '90%',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 380,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 31, 63, 0.8)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    height: 30,
    paddingVertical: 0,
    paddingHorizontal: 11,
  },
  circleList: {
    marginTop: 200,
    marginBottom: 30,
  },
  circle: {
    position: 'relative', 
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'gray',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightenCircle: {
    backgroundColor: 'blue',
  },
  circleImage: {
    width: 75,
    height: 75,
    borderRadius: 35,
  },
  neonOverlay: {
    position: 'absolute',
    top: -1,
    left: -4,
    right: -4,
    bottom: -4,
    backgroundColor: 'rgba(0, 120, 255, 0.8)', // Bright blue color with opacity
    opacity: 0.9, // Adjust the opacity as needed
    borderRadius: 62,
    shadowColor: 'rgba(0, 120, 255, 0.8)', // Bright blue color with opacity
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  seeAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    bottom: 340,
    left: 150,
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomRectangleList: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  rectangleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3,
    position: 'absolute',
    backgroundColor: 'white',
    top: 30,
  },
  rectangleImage: {
    width: 20,
    height: 20,
    borderRadius: 8,
    marginRight: 10,
    margintop : 50,
  },
  rectangleTitle: {
    fontSize: 16,
  },
});

export default HomeScreen;
