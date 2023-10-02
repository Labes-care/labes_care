import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { BlurView } from 'expo-blur';
import axios from 'axios';

const LocationScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.30.250:3003/doctors');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  const mapRef = useRef(null);

  const doctorLocations = data.map((doctor, index) => ({
    latitude: (location?.latitude || 0) - 0.090 * index*4,
    longitude: (location?.longitude || 0) - 0.0010*6,
    name: doctor.fullname,
    speciality: doctor.speciality,
    picture: { uri: doctor.profile_img },
    reviews: '5.0',
    availability: doctor.availability,
    id: doctor.id,
  }));

  const handleDoctorPress = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCardPress = (doctor) => {
    setSelectedDoctor(doctor);
    if (doctor.latitude && doctor.longitude && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: doctor.latitude,
        longitude: doctor.longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.021,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ ...styles.map, backgroundColor: '#D0EAC6' }}
        initialRegion={location ? {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.021,
        } : null}
        ref={mapRef}
      >
        {location && (
          <>
            <Circle
              center={{ latitude: location.latitude, longitude: location.longitude }}
              radius={1000}
              fillColor="rgba(0, 191, 255, 0.2)"
              strokeWidth={0}
            />
            <Marker coordinate={location}>
              <ImageBackground
                source={require('./marke.png')}
                style={styles.locationMarker}
              >
                <View style={styles.profileImageContainer}>
                  <Image source={require('./01.jpeg')} style={styles.profileImage} />
                </View>
              </ImageBackground>
            </Marker>
            {doctorLocations.map((doctor, index) => (
              <Marker key={index} coordinate={doctor} onPress={() => handleDoctorPress(doctor)}>
                <View style={styles.doctorMarkerContainer}>
                  <Image source={doctor.picture} style={styles.doctorMarker} />
                  <View style={styles.arrow} />
                </View>
              </Marker>
            ))}
          </>
        )}
      </MapView>
      {/* Floating Card List */}
      <View style={styles.floatingCardContainer}>
      <FlatList
  horizontal
  data={doctorLocations}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => handleCardPress(item)} disabled={item.availability === 1}>
      <View style={[styles.floatingCardBorder, item.availability === 1 && styles.unavailableCard]}>
        <BlurView style={styles.floatingCardBlur} intensity={100}>
          <View style={styles.floatingCardContent}>
            <Image source={item.picture} style={styles.floatingCardImage} />
            <Text style={styles.floatingCardText}>{item.name}</Text>
            <Text style={styles.floatingCardText}>{item.speciality}</Text>
            <View style={styles.reviewCircle}>
              <Text style={styles.reviewCountText}>{item.reviews}</Text>
              {item.availability === 0 && <View style={styles.greenCircle} />}
              {item.availability === 1 && <View style={styles.redCircle} />}
            </View>
          </View>
          {item.availability === 0 && (
            <TouchableOpacity
            style={styles.bookNowButton}
            onPress={() => {
              const doctorId = item.id;
              console.log('Doctor ID:', doctorId);
              navigation.navigate('DoctorDetails', { doctorIdd: doctorId });
            }}
          >
            <Text style={styles.bookNowButtonText}>Book Now</Text>
          </TouchableOpacity>
          )}
        </BlurView>
      </View>
    </TouchableOpacity>
  )}
  contentContainerStyle={styles.floatingCardList}
  ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
/>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locationMarker: {
    width: 55,
    height: 83,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 42,
    height: 46,
    borderRadius: 18,
    bottom: 4,
  },
  doctorMarkerContainer: {
    alignItems: 'center',
  },
  doctorMarker: {
    width: 60,
    height: 70,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'white',
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 10,
    borderRightWidth: 5,
    borderBottomWidth: 0,
    borderLeftWidth: 5,
    borderTopColor: 'white',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  floatingCardContainer: {
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
  },
  floatingCardBorder: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 35,
  },
  floatingCardBlur: {
    width: 150,
    height: 200,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingCardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingCardImage: {
    width: 80,
    height: 80,
    borderRadius: 30,
  },
  floatingCardText: {
    marginTop: 5,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  reviewCircle: {
    position: 'absolute',
    top: 3,
    right: -5,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 191, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewCountText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bookNowButton: {
    backgroundColor: 'rgba(0, 191, 255, 0.7)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  bookNowButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  floatingCardList: {
    paddingHorizontal: 10,
  },
  cardSeparator: {
    width: 10,
  },
  unavailableCard: {
    opacity: 0.6,
  },
  greenCircle: {
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: 'green',
    position: 'absolute',
    top: 64,
    right: 2,
  },
  redCircle: {
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: 'red',
    position: 'absolute',
    top: 80,
    right: 10,
  },
});

export default LocationScreen;
