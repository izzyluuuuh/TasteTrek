import React, { useContext } from 'react';
import { View, SafeAreaView } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { ProfileImageContext } from '../components/ProfileImage';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EditableProfileInfo from '../components/EditableProfileInfo';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { profileImage, setProfileImage } = useContext(ProfileImageContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Back Button */}
      <View style={{ position: 'absolute', top: 50, left: 16, zIndex: 10 }}>
        <ChevronLeftIcon
          size={24}
          color={'#000'}
          strokeWidth={3.5}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* Editable Profile Image handled in EditableProfileInfo */}
        <EditableProfileInfo profileImage={profileImage} setProfileImage={setProfileImage} />
      </View>
    </SafeAreaView>
  );
}
