import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useAuth } from "client_mobile/AuthContext.js";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';


const SchedulePage = () => {

  const navigation = useNavigation();

  const { patientId } = useAuth();
  console.log("patientId from home", patientId);


 

  const [filteredAppointmentsCount, setFilteredAppointmentsCount] = useState(0);


  const [appointmentsData, setAppointmentsData] = useState([]);

  useEffect(() => {
    fetchAppointmentsData();
  }, []);

  const fetchAppointmentsData = async () => {
    try {
      const response = await axios.get(`http://192.168.30.250:3003/relationships/${patientId}`);
      setAppointmentsData(response.data);
      const filteredCount = response.data.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        const appointmentMonth = appointmentDate.getMonth();
        const appointmentDay = appointmentDate.getDate();
  
        return (
          selectedMonth.name === monthsData[appointmentMonth].name &&
          selectedDay === appointmentDay
        );
      }).length;
      setFilteredAppointmentsCount(filteredCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




  const monthsData = [
    { name: 'Jan,2023', days: 31 },
    { name: 'Feb,2023', days: 28 },
    { name: 'Mar,2023', days: 31 },
    { name: 'Apr,2023', days: 30 },
    { name: 'May,2023', days: 31 },
    { name: 'Jun,2023', days: 30 },
    { name: 'Jul,2023', days: 31 },
    { name: 'Aug,2023', days: 31 },
    { name: 'Sep,2023', days: 30 },
    { name: 'Oct,2023', days: 31 },
    { name: 'Nov,2023', days: 30 },
    { name: 'Sep,2023', days: 31 },

  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];


  const [isMonthListVisible, setIsMonthListVisible] = useState(false);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setSelectedDay(1); // Reset to the first day of the new month
    setIsMonthListVisible(false); // Close the month list
  };

  

  const renderDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(2023, monthsData.indexOf(selectedMonth), 1).getDay();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDay} />);
    }

    for (let i = 1; i <= selectedMonth.days; i++) {
      days.push(
        <TouchableOpacity
          style={{ alignItems: 'center', padding: 10 }}
          key={i}
          onPress={() => handleDayPress(i)}
        >
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Text
                style={[
                  styles.dayNumber,
                  selectedDay === i ? styles.selectedDayNumber : null,
                ]}
              >
                {i}
              </Text>
            </View>
          </View>
          <Text style={styles.dayName}>
            {daysOfWeek[(i + firstDayOfMonth - 1) % 7]}
          </Text>
        </TouchableOpacity>
      );
    }
    return days;
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const [selectedMonth, setSelectedMonth] = useState(monthsData[currentMonth]);
  const [selectedDay, setSelectedDay] = useState(currentDay);


  const renderAppointments = () => {
    const filteredAppointments = appointmentsData.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      const appointmentMonth = appointmentDate.getMonth();
      const appointmentDay = appointmentDate.getDate();
  
      return (
        selectedMonth.name === monthsData[appointmentMonth].name &&
        selectedDay === appointmentDay
      );
    });
  
    return (
      <View>
        {filteredAppointments.map((appointment, index) => (
        <View key={index} style={styles.appointmentContainer}>
          <BlurView style={styles.appointmentBlurView} intensity={80}>
            <View style={styles.doctorInfo}>
              {/* Update the rendering of the appointment data */}
              <Image source={{ uri: appointment.Doctor.profile_img }} style={styles.doctorImage} />
              <View>
                <Text style={styles.doctorName}>{appointment.Doctor.fullname}</Text>
                <Text style={styles.doctorSpeciality}>{appointment.Doctor.speciality}</Text>
                <Text style={styles.doctorAddress}>{appointment.Doctor.address}</Text>
                <Text style={styles.appointmentTime}>{appointment.date}</Text>
                <Text style={styles.appointmentTime}>{appointment.time}</Text>
              </View>
            </View>
            {getRectangleImage(appointment.checked)}
          </BlurView>
          <Text style={styles.appointmentTimeOnly}>{appointment.time}</Text>
        </View>
      ))}
    </View>
    );
  };

  const getRectangleImage = (checked) => {
    if (checked === 1) {
      return <Image source={require('./fix1.gif')} style={styles.rectangleImage} />;
    } else if (checked === 0) {
      return <Image source={require('./hh1.gif')} style={styles.rectangleImage} />;
    } else if (checked === 2) {
      return <Image source={require('./fail.gif')} style={styles.rectangleImage} />;
    }
  };

  const handleDayPress = (day) => {
    setSelectedDay(day);
    fetchAppointmentsData();
  };

  return (
    <LinearGradient colors={['#001F3F', '#000000']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.monthButton}
          onPress={() => setIsMonthListVisible(true)}
        >
          <Text style={styles.monthText}>
            {selectedMonth.name}
          </Text>
          <AntDesign name="caretdown" size={18} color="#FFFFFF" style={styles.arrowIcon} />
        </TouchableOpacity>
        <Modal
          visible={isMonthListVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setIsMonthListVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                {monthsData.map((month, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.modalMonthButton,
                      selectedMonth === month && styles.selectedModalMonthButton,
                    ]}
                    onPress={() => handleMonthChange(month)}
                  >
                    <Text style={[styles.modalMonthText, selectedMonth === month && styles.selectedModalMonthText]}>
                      {month.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hello, Mr. Mohamed</Text>
        <Text style={styles.rectangleCountText}>                 You have {filteredAppointmentsCount} appointments on {selectedMonth.name} {selectedDay}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {renderDays()}
      </ScrollView>

      <ScrollView style={styles.appointmentList}>
        {renderAppointments()}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  monthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 60,
  },
  monthText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginRight: 5,
  },
  arrowIcon: {
    marginBottom: -2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 30,
    height: 230,
  },
  modalMonthButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#AAAAAA',
  },
  selectedModalMonthButton: {
    backgroundColor: '#F5F5F5',
  },
  modalMonthText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedModalMonthText: {
    fontWeight: 'bold',
  },
  contentContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  dayButton: {
    padding: 10,
  },
  selectedDayButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  selectedDayText: {
    fontWeight: 'bold',
  },
  emptyDay: {
    width: 30,
    height: 30,
  },
  outerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 115,
    borderRadius: 50,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    backgroundColor: 'transparent',
    right: 122,
    bottom: 68,
    marginTop: 170,
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 31, 63, 1)',
    bottom: 22,
  },
  dayNumber: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  selectedDayNumber: {
    color: '#4A90E2',
  },
  dayName: {
    fontSize: 18,
    color: '#FFFFFF',
    bottom: 112,
    right: 124,
  },
  appointmentList: {
    marginTop: 20,
    marginBottom: -15,
    paddingHorizontal: 20,
  },
  appointmentBlurView: {
    borderRadius: 26,
    overflow: 'hidden',
    width: 254,
    height: 115,
    right: 44,
    marginBottom: 210,
  },
  appointmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 270,
    height: 150,
    position: 'relative',
    marginLeft: 70,
    left: 50,
    top: 90,
    marginBottom: -10,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    bottom: 20,
  },
  doctorName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  doctorSpeciality: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  doctorAddress: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  appointmentTime: {
    color: '#FFFFFF',
    fontSize: 12,
    top: 30,
  },
  appointmentTimeOnly: {
    color: 'white',
    fontSize: 17,
    position: 'absolute',
    bottom: 200,
    left: -120,
    zIndex: 1000,
  },
  rectangleImage: {
    width: 80,
    height: 80,
    position: 'absolute',
    top: -15,
    right: -7,
  },
  greetingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  greetingText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 50,
  },
  rectangleCountText: {
    fontSize: 18,
    color: 'white',
marginBottom:-10,
    bottom : 10,
    zIndex: 1000,
    right : 32,

  },
});

export default SchedulePage;