import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useAuth } from 'client_mobile/AuthContext.js'
import { useRoute } from '@react-navigation/native';

const AppointmentScreen = () => {
  const navigation = useNavigation();
  const [doctorsData, setDoctorsData] = useState([]);
  const { messageOption, hotspot } = useAuth();

  const route = useRoute();
  const circleId = route.params?.circleId;
  console.log('from home',circleId)


  useEffect(() => {
    console.log('Received message option:', messageOption);
    console.log('Received hotspot:', hotspot);

    if ((circleId !== undefined) && (circleId==='1') )
    {
      axios.get('http://192.168.30.250:3003/doctors')
      .then(response => {
        const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'Neurology');
        console.log(filteredDoctors);
        setDoctorsData(filteredDoctors);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
    }
    else if ((circleId !== undefined) && (circleId==='2') )
    {
      axios.get('http://192.168.30.250:3003/doctors')
      .then(response => {
        const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'orthopedic');
        console.log(filteredDoctors);
        setDoctorsData(filteredDoctors);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
    }
    else if ((circleId !== undefined) && (circleId==='3') )
    {
      axios.get('http://192.168.30.250:3003/doctors')
      .then(response => {
        const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'Neurology');
        console.log(filteredDoctors);
        setDoctorsData(filteredDoctors);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
    }
    else if ((circleId !== undefined) && (circleId==='4') )
    {
      axios.get('http://192.168.30.250:3003/doctors')
      .then(response => {
        const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'ophthalmology');
        console.log(filteredDoctors);
        setDoctorsData(filteredDoctors);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
    }
    else if ((circleId !== undefined) && (circleId==='5') )
    {
      axios.get('http://192.168.30.250:3003/doctors')
      .then(response => {
        const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'Cardiology');
        console.log(filteredDoctors);
        setDoctorsData(filteredDoctors);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
    }
    else if ((circleId !== undefined) && (circleId==='6') )
    {
      axios.get('http://192.168.30.250:3003/doctors')
      .then(response => {
        const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'Pulmonology');
        console.log(filteredDoctors);
        setDoctorsData(filteredDoctors);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
    }
    else if ((circleId !== undefined) && (circleId==='7') )
    {
      axios.get('http://192.168.30.250:3003/doctors')
      .then(response => {
        const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'Neurology');
        console.log(filteredDoctors);
        setDoctorsData(filteredDoctors);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
    }
    else if ((circleId !== undefined) && (circleId==='8') )
    {
      axios.get('http://192.168.30.250:3003/doctors')
      .then(response => {
        const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'Neurology');
        console.log(filteredDoctors);
        setDoctorsData(filteredDoctors);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
    }
    else if ((circleId !== undefined) && (circleId==='9') )
    {
      axios.get('http://192.168.30.250:3003/doctors')
      .then(response => {
        const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'Neurology');
        console.log(filteredDoctors);
        setDoctorsData(filteredDoctors);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
    }
    else if ((circleId !== undefined) && (circleId==='10') )
    {
      axios.get('http://192.168.30.250:3003/doctors')
      .then(response => {
        const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'dentistry');
        console.log(filteredDoctors);
        setDoctorsData(filteredDoctors);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
    }
    else if ((circleId !== undefined) && (circleId==='11') )
    {
      axios.get('http://192.168.30.250:3003/doctors')
      .then(response => {
        const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'Dermatology');
        console.log(filteredDoctors);
        setDoctorsData(filteredDoctors);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
    }
    else if ((circleId !== undefined) && (circleId==='12') )
    {
      axios.get('http://192.168.30.250:3003/doctors')
      .then(response => {
        const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'Cardiology');
        console.log(filteredDoctors);
        setDoctorsData(filteredDoctors);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
    }
    else if ((messageOption.trim() === 'Option 3' && hotspot.trim() === 'Head') || (messageOption.trim() === 'Option 3' && hotspot.trim() === 'Chest') || (messageOption.trim() === 'Option 1' && hotspot.trim() === 'Abdomen') || (messageOption.trim() === 'Option 1' && hotspot.trim() === 'Leg') || (messageOption.trim() === 'Option 1' && hotspot.trim() === 'Arm') || (messageOption.trim() === 'Option 1' && hotspot.trim() === 'Back') )  {  // .trim() method to remove any leading/trailing spaces before comparison.
      console.log('if');
      const targetSpecialties = ['Neurology', 'Dermatology'];  

      axios.get('http://192.168.30.250:3003/doctors')
        .then(response => {
          const filteredDoctors = response.data.filter(doctor => targetSpecialties.includes(doctor.speciality));
          console.log(filteredDoctors);
          setDoctorsData(filteredDoctors);
        })
        .catch(error => {
          console.error('Error fetching doctors:', error);
        });
    } 
    else if (messageOption.trim() === 'Option 2' && hotspot.trim() === 'Back') {  
      console.log('if');
      axios.get('http://192.168.30.250:3003/doctors')
        .then(response => {
          const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'Neurology');
          console.log(filteredDoctors);
          setDoctorsData(filteredDoctors);
        })
        .catch(error => {
          console.error('Error fetching doctors:', error);
        });
       }
      else if ((messageOption.trim() === 'Option 1' && hotspot.trim() === 'Chest') ) {  // .trim() method to remove any leading/trailing spaces before comparison.
        console.log('if');
        axios.get('http://192.168.30.250:3003/doctors')
          .then(response => {
            const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'Cardiology');
            console.log(filteredDoctors);
            setDoctorsData(filteredDoctors);
          })
          .catch(error => {
            console.error('Error fetching doctors:', error);
          });
        }
         else if (messageOption.trim() === 'Option 2' && hotspot.trim() === 'Head') { 
      console.log('if');
      axios.get('http://192.168.30.250:3003/doctors')
        .then(response => {
          const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'dentistry');
          console.log(filteredDoctors);
          setDoctorsData(filteredDoctors);
        })
        .catch(error => {
          console.error('Error fetching doctors:', error);
        });
       }
       else if ((messageOption.trim() === 'Option 5' && hotspot.trim() === 'Head') || (messageOption.trim() === 'Option 4' && hotspot.trim() === 'Chest') || (messageOption.trim() === 'Option 2' && hotspot.trim() === 'Abdomen') || (messageOption.trim() === 'Option 2' && hotspot.trim() === 'Leg') || (messageOption.trim() === 'Option 3' && hotspot.trim() === 'Leg') || (messageOption.trim() === 'Option 4' && hotspot.trim() === 'Leg') || (messageOption.trim() === 'Option 2' && hotspot.trim() === 'Arm') || (messageOption.trim() === 'Option 3' && hotspot.trim() === 'Arm')    ) {  // .trim() method to remove any leading/trailing spaces before comparison.
        console.log('if');
        axios.get('http://192.168.30.250:3003/doctors')
          .then(response => {
            const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'orthopedic');
            console.log(filteredDoctors);
            setDoctorsData(filteredDoctors);
          })
          .catch(error => {
            console.error('Error fetching doctors:', error);
          });
         }
         else if ( (messageOption.trim() === 'Option 1' && hotspot.trim() === 'Head') ) {  // .trim() method to remove any leading/trailing spaces before comparison.
          console.log('if');
          axios.get('http://192.168.30.250:3003/doctors')
            .then(response => {
              const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'ophthalmology');
              console.log(filteredDoctors);
              setDoctorsData(filteredDoctors);
            })
            .catch(error => {
              console.error('Error fetching doctors:', error);
            });
           }
           else if ( (messageOption.trim() === 'Option 4' && hotspot.trim() === 'Head') ) {  // .trim() method to remove any leading/trailing spaces before comparison.
            console.log('if');
            axios.get('http://192.168.30.250:3003/doctors')
              .then(response => {
                const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'Pulmonology');
                console.log(filteredDoctors);
                setDoctorsData(filteredDoctors);
              })
              .catch(error => {
                console.error('Error fetching doctors:', error);
              });
             }
             else if ( (messageOption.trim() === 'Option 2' && hotspot.trim() === 'Chest') ) {  // .trim() method to remove any leading/trailing spaces before comparison.
              console.log('if');
              axios.get('http://192.168.30.250:3003/doctors')
                .then(response => {
                  const filteredDoctors = response.data.filter(doctor => doctor.speciality === 'Pulmonology');
                  console.log(filteredDoctors);
                  setDoctorsData(filteredDoctors);
                })
                .catch(error => {
                  console.error('Error fetching doctors:', error);
                });
               }
              }, [messageOption, hotspot,circleId]);

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