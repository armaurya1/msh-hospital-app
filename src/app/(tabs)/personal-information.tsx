import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Design colors matching profile page
const colors = {
  primary: '#6547a4',
  primaryContainer: '#7e60bf',
  surface: '#fbf8ff',
  surfaceContainerLow: '#f5f2fa',
  surfaceContainerLowest: '#ffffff',
  surfaceContainer: '#efedf5',
  onSurface: '#1b1b21',
  onSurfaceVariant: '#494551',
  outline: '#7a7582',
  outlineVariant: '#cbc4d3',
  white: '#ffffff',
};

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
  editable?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  editable = true,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={[styles.input, !editable && styles.inputDisabled]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.outline}
      keyboardType={keyboardType}
      editable={editable}
    />
  </View>
);

export default function PersonalInformationScreen() {
  const [firstName, setFirstName] = useState('Alok');
  const [lastName, setLastName] = useState('Maurya');
  const [email, setEmail] = useState('alok.maurya@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [dateOfBirth, setDateOfBirth] = useState('15 Aug 1990');
  const [gender, setGender] = useState('Male');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [address, setAddress] = useState('123 Health Street, Medical City');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('400001');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Information</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATSeyBFU1TmUqHkQ3zwX_KPhLwNYCe8R0bxpjzyfrdNN0fDmDG-dQaV-i3pBhBoK6nFDpQkFFN553bXyuBcCvDaGGLoszEip0R-yQ4ZLNYRwRhmlmrgtoh6fTFsaecGu6k1rjAwRepeF-1WnraSb1VfKp0VBXKJhHYqSDO8LMAuJSXQW7o3POUUJZAKFEkag_K1ipw058MYK9J-A_16tOl8861NB-9ERmGHYXU_txj4jnb8TPFMjQXvBhYTIxsC2jcJtsIVV6CVBqI',
              }}
              style={styles.profilePhoto}
            />
            <TouchableOpacity style={styles.editPhotoButton}>
              <Ionicons name="camera" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.photoHint}>Tap to change photo</Text>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>BASIC INFORMATION</Text>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <InputField
                  label="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Enter first name"
                />
              </View>
              <View style={styles.halfInput}>
                <InputField
                  label="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Enter last name"
                />
              </View>
            </View>
            <InputField
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              keyboardType="email-address"
            />
            <InputField
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter phone"
              keyboardType="phone-pad"
            />
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <InputField
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  placeholder="DD/MM/YYYY"
                />
              </View>
              <View style={styles.halfInput}>
                <InputField
                  label="Gender"
                  value={gender}
                  onChangeText={setGender}
                  placeholder="Select gender"
                />
              </View>
            </View>
            <InputField
              label="Blood Group"
              value={bloodGroup}
              onChangeText={setBloodGroup}
              placeholder="Select blood group"
            />
          </View>
        </View>

        {/* Address Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ADDRESS INFORMATION</Text>
          </View>
          <View style={styles.sectionContent}>
            <InputField
              label="Street Address"
              value={address}
              onChangeText={setAddress}
              placeholder="Enter street address"
            />
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <InputField
                  label="City"
                  value={city}
                  onChangeText={setCity}
                  placeholder="Enter city"
                />
              </View>
              <View style={styles.halfInput}>
                <InputField
                  label="State"
                  value={state}
                  onChangeText={setState}
                  placeholder="Enter state"
                />
              </View>
            </View>
            <InputField
              label="Pincode"
              value={pincode}
              onChangeText={setPincode}
              placeholder="Enter pincode"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>EMERGENCY CONTACT</Text>
          </View>
          <View style={styles.sectionContent}>
            <InputField
              label="Contact Name"
              value="Priya Maurya"
              onChangeText={() => {}}
              placeholder="Enter contact name"
            />
            <InputField
              label="Relationship"
              value="Spouse"
              onChangeText={() => {}}
              placeholder="Enter relationship"
            />
            <InputField
              label="Contact Number"
              value="+91 98765 43211"
              onChangeText={() => {}}
              placeholder="Enter contact number"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainerLow,
    backgroundColor: colors.surface,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  photoContainer: {
    position: 'relative',
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.surface,
  },
  photoHint: {
    marginTop: 8,
    fontSize: 12,
    color: colors.outline,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}15`,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
  },
  sectionContent: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    height: 48,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.onSurface,
    borderWidth: 1,
    borderColor: colors.surfaceContainer,
  },
  inputDisabled: {
    backgroundColor: colors.surfaceContainerLow,
    color: colors.outline,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  buttonSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  saveButton: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
