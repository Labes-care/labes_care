import React, { useState,useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, TextInput, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'react-native-calendars';
import { BlurView } from 'expo-blur';
import { useAuth } from 'client_mobile/AuthContext.js'
import axios from 'axios'

const DoctorDetailsScreen = ({ route, isAppointmentSet }) => {
  const { patientId } = useAuth();
  console.log('patientId from home', patientId);

  const { doctorId } = route.params;
  console.log('patientId from detail', patientId);
  console.log('doctor ID:', doctorId);

  const { doctorIdd } = route.params;
  console.log('doctorIdd frommm', doctorIdd);

  const finalDoctorId = doctorId === 'doctor_id' ? doctorIdd : doctorId;

  console.log('final doctor:', finalDoctorId);

  const [successNotificationVisible, setSuccessNotificationVisible] = useState(false);

  useEffect(() => {
    console.log('isAppointmentSet:', isAppointmentSet); // Check if the prop is received correctly
  }, [isAppointmentSet]);


  useEffect(() => {
    if (successNotificationVisible) {
      const timer = setTimeout(() => {
        setSuccessNotificationVisible(false);
      }, 5000); // Hide after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [successNotificationVisible]);




  const handleConfirmAppointment = () => {
    if (!selectedDate || !selectedTimeSlot) {
      return;
    }

    const appointmentData = {
      doctors_iddoctors: finalDoctorId,
      patients_idpatients: patientId,
      date: selectedDate,
      time: selectedTimeSlot.slice(0,-3),
      status: 0, 
      message: message,
      checked: 0, 
    };

    console.log('appointmentData',appointmentData)

    axios
      .post('http://192.168.30.250:3003/relationships', appointmentData)
      .then(response => {
        console.log('Appointment created:', response.data);
        setModalVisible(false); 
        setSuccessNotificationVisible(true); 
        

      })
      .catch(error => {
        console.error('Error creating appointment:', error);
      });
  };



  const [doctorDataa, setDoctorData] = useState([])

  useEffect(() => {
    axios
      .get(`http://192.168.30.250:3003/doctors/${finalDoctorId}`) 
      .then(response => {
        const fetchedDoctorData = response.data;
        setDoctorData(fetchedDoctorData);
      })
      .catch(error => {
        console.error('Error fetching doctor details:', error);
      });
  }, [finalDoctorId]);

  console.log(doctorDataa)

  const doctorData = {
    name: doctorDataa.fullname,
    profilePicture: doctorDataa.profile_img,
    coverPhoto: doctorDataa.cover_img,
    specialty: doctorDataa.speciality,
  };

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const suggestedMessages = [
    'I have some questions about my condition.',
    'Can you please provide more details about the procedure?',
    'I would like to discuss my symptoms in more detail.',
    'Is there any preparation required before the appointment?',
  ];

  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
  };

  const handleTakeAppointment = () => {
    setModalVisible(true);
  };

  const handleSuggestionSelect = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setMessage(suggestion);
  };

  return (
    <LinearGradient colors={['#001F3F', '#000000']} style={styles.container}>
 {/* Success Notification */}

 {successNotificationVisible && (
        <View style={styles.successNotification}>
          <View style={styles.successNotificationContent}>
            <Image
              source={require('./ok.gif')}
              style={styles.successImage}
            />
            <Text style={styles.successText}>Appointment set successfully  !</Text>
          </View>
        </View>
      )}

      <Image source={{ uri: doctorData.coverPhoto }} style={styles.coverPhoto} />

      <View style={styles.profileContainer}>
        <Image source={{ uri: doctorData.profilePicture }} style={styles.profilePicture} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{doctorData.name}</Text>
          <Text style={styles.specialty}>{doctorData.specialty}</Text>
          <View style={styles.verifiedTag}>
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        </View>
      </View>

      <Text style={styles.selectTimeText}>Select Date:</Text>
      <BlurView intensity={90} style={styles.blurContainer}>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={selectedDate ? { [selectedDate]: { selected: true, marked: true } } : {}}
          minDate={new Date()} // Starting from today
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            textSectionTitleColor: 'white',
            selectedDayBackgroundColor: 'white',
            selectedDayTextColor: 'black',
            todayTextColor: 'white',
            dayTextColor: 'white',
            textDisabledColor: 'grey',
            dotColor: 'white',
            selectedDotColor: 'black',
            arrowColor: 'white',
            disabledArrowColor: 'grey',
            monthTextColor: 'white',
            indicatorColor: 'white',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 16,
          }}
        />
      </BlurView>

      <Text style={styles.selectTimeText}>Select Time Slot:</Text>
      <ScrollView horizontal contentContainerStyle={styles.timeSlotsContainer}>
        {timeSlots.map((slot, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeSlotItem,
              selectedTimeSlot === slot ? styles.selectedTimeSlot : null,
            ]}
            onPress={() => handleTimeSlotSelect(slot)}
          >
            <Text
              style={[
                styles.timeSlotText,
                selectedTimeSlot === slot ? styles.selectedTimeSlotText : null,
              ]}
            >
              {slot}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.takeAppointmentButton} onPress={handleTakeAppointment}>
        <Text style={styles.takeAppointmentButtonText}>Take Appointment</Text>
      </TouchableOpacity>

      {/* Appointment Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView intensity={90} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Confirm Appointment</Text>
            <Text style={styles.modalText}>Doctor: {doctorData.name}</Text>
            <Text style={styles.modalText}>Specialty: {doctorData.specialty}</Text>
            <Text style={styles.modalText}>Date: {selectedDate}</Text>
            <Text style={styles.modalText}>Time: {selectedTimeSlot}</Text>
            <TextInput
              style={styles.messageInput}
              placeholder="Enter your message..."
              value={message}
              onChangeText={setMessage}
            />

            {/* Suggested Messages */}
            <View style={styles.suggestedMessagesContainer}>
              {suggestedMessages.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.suggestedMessageButton,
                    selectedSuggestion === suggestion ? styles.selectedSuggestion : null,
                  ]}
                  onPress={() => handleSuggestionSelect(suggestion)}
                >
                  <Text
                    style={[
                      styles.suggestedMessageText,
                      selectedSuggestion === suggestion ? styles.selectedSuggestionText : null,
                    ]}
                  >
                    {suggestion}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmAppointment} >
              <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  coverPhoto: {
    width: '100%',
    height: 200,
    borderRadius: 30,
  },
  profileContainer: {
    marginTop: -100,
    alignItems: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'white',
    bottom : 20
  },
  nameContainer: {
    alignItems: 'center',
    marginVertical: 10,
    bottom : 25
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  specialty: {
    fontSize: 18,
    color: 'white',
    opacity: 0.3,
  },
  verifiedTag: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: -50,
    top : 56
  },
  verifiedText: {
    color: 'white',
    fontWeight: 'bold',
    
  },
  selectTimeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  blurContainer: {
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: -2,
    
  },
  timeSlotsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    top : 2
  },
  timeSlotItem: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 4,
  },
  selectedTimeSlot: {
    backgroundColor: 'white',
  },
  timeSlotText: {
    color: 'white',
  },
  selectedTimeSlotText: {
    color: 'black',
  },
  takeAppointmentButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 5,
  },
  takeAppointmentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  messageInput: {
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  suggestedMessagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  suggestedMessageButton: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  selectedSuggestion: {
    backgroundColor: 'blue',
  },
  suggestedMessageText: {
    color: 'blue',
  },
  selectedSuggestionText: {
    color: 'white',
  },
  successNotification: {
    position: 'absolute',
    top: 40,
    left: 35,
    right: 20,
    backgroundColor: 'green',
    borderRadius: 150,
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    zIndex: 1000,
    width :314,
    height: 42,
  },
  successNotificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  successImage: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
  successText: {
    color: 'white',
    fontWeight: 'bold',
    right : 19
  }
});

export default DoctorDetailsScreen;
