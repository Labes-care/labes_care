import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useAuth } from "client_mobile/AuthContext.js";
import { useNavigation } from "@react-navigation/native";

const Param = () => {
  const navigation = useNavigation();

  const { patientId } = useAuth();
  console.log("patientId from param", patientId);

  const [patientData, setPatientData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.30.250:3003/patients/${patientId}`
        );
        const data = response.data;
        setPatientData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [patientId]);

  console.log(patientData);

  const profileImageUri = patientData.profile_img;

  return (
    <LinearGradient colors={["#001F3F", "#000000"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrow-left"
            color="#FFFFFF"
            size={24}
            style={styles.arrowIcon}
          />
          <Text style={styles.goBackText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingGroup}>
        {/* Profile Setting */}
        <TouchableOpacity style={styles.profileContainer}>
          {/* Profile Picture */}
          <Image
            source={{ uri: profileImageUri }}
            style={styles.profileImage}
          />

          <View style={styles.profileTextContainer}>
            {/* Profile Name */}
            <Text style={styles.profileName}>{patientData.fullname}</Text>

            {/* Small Text */}
            <Text style={styles.smallText}>Account Details</Text>
          </View>
          <Icon
            name="chevron-right"
            color="#FFFFFF"
            size={24}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        <View style={styles.whiteLine} />

        {/* Email & Payment Setting */}
        <Text style={styles.headingText}>Other Settings</Text>

        <TouchableOpacity style={styles.settingButton}>
          <Icon name="envelope" color="#FFFFFF" size={24} style={styles.icon} />
          <Text style={styles.settingText}>Email & Payment</Text>
          <Icon
            name="chevron-right"
            color="#FFFFFF"
            size={24}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        {/* Personal Data Setting */}
        <TouchableOpacity style={styles.settingButton}>
          <Icon name="id-card" color="#FFFFFF" size={24} style={styles.icon} />
          <Text style={styles.settingText}>Personal Data</Text>
          <Icon
            name="chevron-right"
            color="#FFFFFF"
            size={24}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.whiteLine} />

      <View style={styles.settingGroup}>
        {/* Other Settings Heading */}
        <Text style={styles.headingText}>Other Settings</Text>

        {/* My Location Setting */}
        <TouchableOpacity style={styles.settingButton} onPress={ ()=> navigation.navigate('Location')}>
          <Icon
            name="map-marker"
            color="#FFFFFF"
            size={24}
            style={styles.icon}
          />
          <Text style={styles.settingText}>My Location</Text>
          <Icon
            name="chevron-right"
            color="#FFFFFF"
            size={24}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        {/* Schedule Setting */}
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => navigation.navigate("SchedulePage")} // Change 'SchedulePage' to the actual name of your schedule page
        >
          <Icon name="calendar" color="#FFFFFF" size={24} style={styles.icon} />
          <Text style={styles.settingText}>Schedule</Text>
          <Icon
            name="chevron-right"
            color="#FFFFFF"
            size={24}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  goBackButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  goBackText: {
    color: "#FFFFFF",
    fontSize: 25,
    marginLeft: 115,
    marginBottom: 60,
    top: 33,
  },
  settingGroup: {
    marginBottom: 90,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 60,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 20,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  smallText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  settingButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  whiteLine: {
    height: 1,
    backgroundColor: "#FFFFFF",
    marginVertical: 13,
  },
  icon: {
    marginRight: 12,
  },
  settingText: {
    color: "#FFFFFF",
    fontSize: 20,
    flex: 1,
  },
  headingText: {
    color: "#FFFFFF",
    fontSize: 24,
    marginBottom: 10,
  },
  arrowIcon: {
    marginLeft: "auto",
  },
});

export default Param;
