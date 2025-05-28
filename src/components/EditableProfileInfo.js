import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function EditableProfileInfo({
  initialName = 'LISA',
  initialEmail = 'lalisamanobal@email.com',
  initialRole = 'Chef',
  initialMemberSince = 'May 2025',
  initialCuisines = 'Thai',
  profileImage,
  setProfileImage,
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [role, setRole] = useState(initialRole);
  const [memberSince, setMemberSince] = useState(initialMemberSince);
  const [cuisines, setCuisines] = useState(initialCuisines);

  // Handler for picking a new profile image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      //[DEPRECATED] mediaTypes: ImagePicker.MediaTypeOptions.Images
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ width: '92%', alignItems: 'center' }}>
      {/* Editable Profile Image */}
      <TouchableOpacity onPress={editing ? pickImage : undefined} style={{ marginBottom: 18 }}>
        <View style={{
          width: 110, height: 110, borderRadius: 55, borderWidth: 3, borderColor: '#000', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee',
        }}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../../assets/images/lisa.jpg')}
            style={{ width: 110, height: 110, borderRadius: 55 }}
          />
        </View>
        {editing && (
          <Text style={{ color: '#555', fontSize: 13, textAlign: 'center', marginTop: 4 }}>Change Photo</Text>
        )}
      </TouchableOpacity>
      <View style={{
        backgroundColor: '#fff',
        borderRadius: 22,
        padding: 30,
        width: '100%',
        alignItems: 'center',
        marginBottom: 22,
        borderColor: '#000',
        borderWidth: 1,
      }}>
        <Text style={{ fontSize: 19, fontWeight: '700', color: '#000', marginBottom: 18, letterSpacing: 1.1 }}>Profile Info</Text>
        {editing ? (
          <>
            <TextInput
              value={name}
              onChangeText={setName}
              style={{ fontSize: 20, fontWeight: '500', color: '#1C3B2A', marginBottom: 12, width: '100%', textAlign: 'center', backgroundColor: '#F7F7F7', borderRadius: 10, padding: 5, borderWidth: 0.5,}}
              placeholder="Name"
              placeholderTextColor="#B0B0B0"
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={{ fontSize: 16, color: '#1C3B2A', marginBottom: 12, width: '100%', textAlign: 'center', backgroundColor: '#F7F7F7', borderRadius: 10, padding: 5, borderWidth: 0.5, }}
              placeholder="Email"
              placeholderTextColor="#B0B0B0"
              keyboardType="email-address"
            />
            <TextInput
              value={role}
              onChangeText={setRole}
              style={{ fontSize: 15, color: '#888', marginBottom: 4, width: '100%', textAlign: 'center', backgroundColor: '#F7F7F7', borderRadius: 10, padding: 5, borderWidth: 0.5, }}
              placeholder="Role"
              placeholderTextColor="#B0B0B0"
            />
          </>
        ) : (
          <>
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#1C3B2A', marginBottom: 8 }}>{name}</Text>
            <Text style={{ fontSize: 16, color: '#1C3B2A', marginBottom: 4 }}>{email}</Text>
            <Text style={{ fontSize: 15, color: '#888', marginBottom: 2 }}>{role}</Text>
          </>
        )}
        <View style={{ height: 1, backgroundColor: '#F3F3F3', width: '100%', marginVertical: 18, borderRadius: 1 }} />
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#000', marginBottom: 12, alignSelf: 'flex-start' }}>Account Details</Text>
        {editing ? (
          <>
            <Text style={{ fontSize: 15, color: '#1C3B2A', marginBottom: 2, alignSelf: 'flex-start' }}>Member since:</Text>
            <TextInput
              value={memberSince}
              onChangeText={setMemberSince}
              style={{ fontSize: 16, color: '#E01300', fontWeight: '500', marginBottom: 12, width: '100%', backgroundColor: '#000', borderRadius: 10, padding: 7, borderWidth: 0, shadowColor: '#E01300', shadowOpacity: 0.06, elevation: 1 }}
              placeholder="Member since"
              placeholderTextColor="#B0B0B0"
            />
            <Text style={{ fontSize: 15, color: '#1C3B2A', marginBottom: 2, alignSelf: 'flex-start' }}>Favorite cuisines:</Text>
            <TextInput
              value={cuisines}
              onChangeText={setCuisines}
              style={{ fontSize: 16, color: '#E01300', fontWeight: '500', marginBottom: 8, width: '100%', backgroundColor: '#000', borderRadius: 10, padding: 7, borderWidth: 0, }}
              placeholder="Favorite cuisines"
              placeholderTextColor="#B0B0B0"
            />
          </>
        ) : (
          <>
            <Text style={{ fontSize: 16, color: '#000', marginBottom: 2, alignSelf: 'flex-start' }}>
              Member since: <Text style={{ color: '#941B0C', fontWeight: '600' }}>{memberSince}</Text>
            </Text>
            <Text style={{ fontSize: 16, color: '#1C3B2A', marginBottom: 2, alignSelf: 'flex-start' }}>
              Favorite cuisines: <Text style={{ color: '#941B0C', fontWeight: '600' }}>{cuisines}</Text>
            </Text>
          </>
        )}
        <TouchableOpacity
          style={{ marginTop: 40, backgroundColor: editing ? '#E01300' : '#1C3B2A', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 40, alignSelf: 'center', shadowColor: '#E01300', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.13, shadowRadius: 8, elevation: 2 }}
          onPress={() => setEditing((prev) => !prev)}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5 }}>{editing ? 'Save' : 'Edit Profile'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
