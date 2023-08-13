import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const AppointmentScreen = () => {
  const navigation = useNavigation();
  const [doctorsData, setDoctorsData] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.100.250:3003/doctors')
      .then(response => {
        console.log(response.data);
        setDoctorsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  const handleDoctorClick = (doctor) => {
    if (doctor.availability === 1) {
      console.log(`Clicked on ${doctor.name}`);
      Alert.alert('Doctor Not Available', 'This doctor is not available at the moment.', [
        { text: 'OK', onPress: () => console.log('Alert closed') }
      ]);
    } else {
      navigation.navigate('DoctorDetails', { doctorId: doctor.id });
    }
  };


  return (
    <LinearGradient colors={['#001F3F', '#000000']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color="#FFFFFF" size={24} style={styles.arrowIcon} />
          <Text style={styles.goBackText}>Go back</Text>
        </TouchableOpacity> 
      </View>  

      <View style={styles.doctorGallery}>
        {doctorsData.map((doctor) => (
          <TouchableOpacity
            key={doctor.id}
            style={[
              styles.doctorCard,
              { opacity: doctor.availability === 1 ? 0.5 : 1 },
              !doctor.availability && styles.disabledDoctorCard,
            ]}
            onPress={() => handleDoctorClick(doctor)}
            disabled={doctor.availability === 1}
          >
            <Image
              source={{ uri: doctor.profile_img }}
              style={styles.doctorImage}
            />
            {!doctor.availability && <View style={styles.greenPoint} />}
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 33,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBackText: {
    color: '#FFFFFF',
    fontSize: 25,
    marginLeft: 10,
  },
  doctorGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  doctorCard: {
    width: 120,
    height: 150,
    margin: 16,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  disabledDoctorCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  doctorImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  greenPoint: {
    width: 15,
    height: 15,
    backgroundColor: 'green',
    borderRadius: 50,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  arrowIcon: {
    marginRight: 90,
  },
});

export default AppointmentScreen;