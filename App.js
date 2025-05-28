import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './src/navigation';
import "./global.css"
import { ProfileImageContext } from './src/components/ProfileImage';

export default function App() {
  const [profileImage, setProfileImage] = useState(null);
  return (
    <ProfileImageContext.Provider value={{ profileImage, setProfileImage }}>
      <AppNavigation />
    </ProfileImageContext.Provider>
  );
}

