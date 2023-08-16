import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [patientId, setPatientId] = useState(null);
  const [messageOption, setMessageOption] = useState(null);
  const [hotspot, setHotspot] = useState(null); // Add hotspot state

  const updatePatientId = (newPatientId) => {
    setPatientId(newPatientId);
  };


  const setMessageOptionValue = (option, hotspot) => {
    setMessageOption(option);
    setHotspot(hotspot); // Set hotspot value
  };

  return (
    <AuthContext.Provider value={{ patientId, updatePatientId, messageOption, setMessageOptionValue ,hotspot }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
