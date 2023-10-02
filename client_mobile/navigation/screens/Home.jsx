import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from 'client_mobile/AuthContext.js';
import axios from 'axios';
import Parameter from './Parameter';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';


const HomeScreen = () => {
  const { patientId } = useAuth();
  const [patientData, setPatientData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
  const navigation = useNavigation();

  const [data2, setData2] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  const handleDoctorPress = (doctorId) => {
    navigation.navigate('DoctorDetails', { doctorId });
  };




  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.get('http://192.168.30.250:3003/doctors');
        const apiData = response.data; // Assuming the API response contains the image URLs
        setData2(apiData);
      } catch (error) {
        console.error('Error fetching images from API:', error);
      }
    };
    fetchData2();
  }, []);

  console.log(data2)




  const handleSearchChange = (text) => {
    setSearchText(text);

    const dummySuggestions = [
      "Appointment",
  "Anesthesiologist",
  "Clinic",
  "Cardiology",
  "Checkup",
  "Consultation",
  "Diagnosis",
  "Dermatology",
  "Examination",
  "Emergency",
  "Follow-up",
  "Family Medicine",
  "Gynecology",
  "Gastroenterology",
  "Hospital",
  "Hematology",
  "Immunization",
  "Intensive Care",
  "Joint Pain",
  "Joint Specialist",
  "Knee Surgery",
  "Kidney Specialist",
  "Laboratory",
  "Laparoscopy",
  "Medication",
  "Medical Imaging",
  "Neurology",
  "Nephrology",
  "Orthopedics",
  "Oncology",
  "Patient",
  "Pediatrics",
  "Quality Care",
  "Quick Recovery",
  "Radiology",
  "Rehabilitation",
  "Surgeon",
  "Surgery",
  "Treatment",
  "Therapy",
  "Ultrasound",
  "Urgent Care",
  "Vaccination",
  "Vision Specialist",
  "Waiting Room",
  "Wellness",
  "X-ray",
  "Xerostomia (dry mouth)",
  "Yoga Therapy",
  "Youth Health",
  "Zoonosis (disease spread from animals)",
  "Zinc Supplement"
    ];

    setSuggestions(dummySuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(text.toLowerCase())
      
    ));
    setIsSuggestionsVisible(true);

  };

  const handleSuggestionClick = (suggestion) => {
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(suggestion)}`;
    navigation.navigate('WebViewScreen', { url: googleSearchUrl });
  };

  

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.30.250:3003/patients/${patientId}`);
        const data = response.data;
        setPatientData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [patientId]);


  const profileImageUri = patientData.profile_img;

  const data = [
    { id: '1', imageUri: require('../screens/models/22.png'), isLighten: false },
    { id: '2', imageUri: require('../screens/models/33.png'), isLighten: true },
    { id: '3', imageUri: require('../screens/models/44.png'), isLighten: false },
    { id: '4', imageUri: require('../screens/models/55.png'), isLighten: false },
    { id: '5', imageUri: require('../screens/models/66.png'), isLighten: false },
    { id: '6', imageUri: require('../screens/models/77.png'), isLighten: false },
    { id: '7', imageUri: require('../screens/models/88.png'), isLighten: false },
    { id: '8', imageUri: require('../screens/models/99.png'), isLighten: false },
    { id: '9', imageUri: require('../screens/models/100.png'), isLighten: false },
    { id: '10', imageUri: require('../screens/models/111.png'), isLighten: false },
    { id: '11', imageUri: require('../screens/models/112.png'), isLighten: false },
    { id: '12', imageUri: require('../screens/models/blood.png'), isLighten: false },
  ];

  const data1 = [
    { id: '1', imageUri: 'https://via.placeholder.com/150', isLighten: false },
    { id: '2', imageUri: 'https://via.placeholder.com/150', isLighten: false },
    { id: '3', imageUri: 'https://via.placeholder.com/150', isLighten: false },
    { id: '4', imageUri: 'https://via.placeholder.com/150', isLighten: false },
  ];



  const CircleItem = ({ imageUri, isLighten, id }) => (
    <TouchableOpacity onPress={() => handleCirclePress(id)}>
      <View style={[styles.circle, isLighten && styles.lightenCircle]}>
        <Image source={imageUri} style={styles.circleImage} />
        {isLighten && <View style={styles.neonOverlay} />}
      </View>
    </TouchableOpacity>
  );

  const handleCirclePress = (id) => {
    console.log('Circle ID:', id);
    navigation.navigate('Appointmen', { circleId: id });
  };

  const [lightenIndex, setLightenIndex] = useState(-1);

  const handleSearchContainerPress = () => {
    setIsSuggestionsVisible(false);
  };

  const handleSearchBarFocus = () => {
    setIsSuggestionsVisible(true);
  };

  const handleSearchBarBlur = () => {
    setTimeout(() => {
      setIsSuggestionsVisible(false);
    }, 200);
  };

 
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#001F3F', '#000000']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.greetingText}>
              Hi, {patientData.fullname} ! {'  '}
              <Image source={require('../screens/waving-hand_1f44b.png')} style={styles.greetingImage} /> {' '}
            </Text>

            <View style={styles.profileImageContainer}>
              <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
            </View>
          </View>

          <Text style={styles.messageText}>Keep taking care of your health</Text>

          <BlurView intensity={80} tint="light" style={styles.blurContainer}>
              <TouchableOpacity activeOpacity={1} style={styles.searchBarContainer}>
                <Icon name="search" size={20} color="#FFFFFF" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchBar}
                  placeholder="Search for anything about health ..."
                  placeholderTextColor="#FFFFFF"
                  value={searchText}
                  onChangeText={handleSearchChange}
                  onFocus={handleSearchBarFocus}
                  onBlur={handleSearchBarBlur}
                />
              </TouchableOpacity>
              {isSuggestionsVisible && (
                <View style={styles.suggestionsContainer}>
                  {suggestions.map((suggestion, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.suggestionItem}
                      onPress={() => handleSuggestionClick(suggestion)}
                      
                    >
                      <Text style={styles.suggestionText}>{suggestion}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </BlurView>

            
          <FlatList
            horizontal
            data={data}
            renderItem={({ item, index }) => (
              <CircleItem imageUri={item.imageUri} isLighten={index === lightenIndex} id={item.id} />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.circleList}
          />



          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
          
          <FlatList
        horizontal
        data={data2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDoctorPress(item.id)}>
            <View style={styles.rectangle}>
              <Image source={{ uri: item.profile_img }} style={styles.rectangleImage} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.rectangleList}
      />

          <View style={styles.textImageContainer}>
            <Text style={styles.text1}>
              <Image source={require('../screens/face-with-medical-mask_1f637.png')} style={styles.textImage} /> {' '}
              Categories
            </Text>

            <Image source={require('../screens/1f489.png')} style={styles.anotherTextImage} />
            <Text style={styles.anotherText}>
              My Doctors
            </Text>
          </View>

          <TouchableOpacity style={styles.rect}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>

        </ScrollView>
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
  },
  scrollContent: {
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
    fontSize: 19,
    marginRight: 140,
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 40,
    marginTop: 35,
  },
  blurContainer: {
    width: '90%',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 50,
    bottom: 10,
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
    paddingHorizontal: 10,
  },
  circleList: {
    marginTop: 80,
    marginBottom: 50,
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
    backgroundColor: '#80D8FF',
  },
  circleImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  neonOverlay: {
    position: 'absolute',
    top: 0,
    left: -8,
    right: -8,
    bottom: 0,
    backgroundColor: 'rgba(0, 120, 255, 0.8)',
    opacity: 0.6,
    borderRadius: 40,
    shadowColor: 'rgba(0, 120, 255, 0.8)',
    shadowOpacity: 0.9,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  rectangleList: {
    marginTop: 5,
    marginBottom: 30,
  },
  rectangle: {
    width: 120,
    height: 150,
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangleImage: {
    width: 130,
    height: 150,
    borderRadius: 30,
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    bottom: 170,
    left: 140,
  },
  rect: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    bottom: 34,
    left: 3,
  },
  textImageContainer: {
    alignItems: 'center',
    marginTop: -60,
    bottom: 323,
    right: 110,
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textImage: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain',
  },
  textImageContainer: {
    alignItems: 'center',
    marginTop: -60,
    bottom: 323,
    right: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  anotherTextImage: {
    width: 24,
    height: 24,
    marginLeft: 10,
    resizeMode: 'contain',
    top: 150,
    right: 153,
  },
  anotherText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    top: 148,
    right: 139,
  },
  greetingImage: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain',
  },
  suggestionsContainer: {
    marginTop: 1,
    backgroundColor: 'rgba(0, 31, 63, 0.8)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    position: 'relative',
  },
  suggestionItem: {
    paddingVertical: 8,
  },
  suggestionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default HomeScreen;
