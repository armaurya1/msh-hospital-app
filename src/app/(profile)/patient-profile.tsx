import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

// Indian States and Union Territories
const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

export default function PatientProfileScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber] = useState('9670049542');
  const [alternateMobile, setAlternateMobile] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const handleStateSelect = (selectedState: string) => {
    setState(selectedState);
    setShowStateModal(false);
  };

  const handleCreateProfile = async () => {
    if (!firstName || !lastName || !dateOfBirth || !addressLine1 || !state || !pincode) {
      alert('Please fill all required fields');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.replace('/');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A4D5C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patient Profile</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={80} color="#A8C5CE" />
          </View>
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="pencil" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Personal Details Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Details</Text>

          <View style={styles.formSection}>
            {/* First Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                First Name <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter First Name"
                placeholderTextColor="#B8C9D0"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            {/* Last Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Last Name <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Last Name"
                placeholderTextColor="#B8C9D0"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>

            {/* Mobile Number (Disabled) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Mobile Number <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, styles.inputDisabled]}
                value={mobileNumber}
                editable={false}
              />
            </View>

            {/* Alternate Mobile Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Alternate Mobile Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Alternate Mobile Number"
                placeholderTextColor="#B8C9D0"
                value={alternateMobile}
                onChangeText={setAlternateMobile}
                keyboardType="phone-pad"
                maxLength={10}
              />
              <Text style={styles.helperText}>
                Please enter your family member's mobile number to allow them to login on their own phone.
              </Text>
            </View>

            {/* Date of Birth */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Date Of Birth <Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={[styles.dateText, !dateOfBirth && styles.placeholderText]}>
                  {dateOfBirth ? dateOfBirth.toLocaleDateString() : 'Choose Date'}
                </Text>
                <Ionicons name="calendar-outline" size={24} color="#3EBFB0" />
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}

            {/* Emergency Contact Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Emergency Contact Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Emergency Contact Name"
                placeholderTextColor="#B8C9D0"
                value={emergencyContactName}
                onChangeText={setEmergencyContactName}
              />
            </View>

            {/* Emergency Contact Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Emergency Contact Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Emergency Contact Number"
                placeholderTextColor="#B8C9D0"
                value={emergencyContactNumber}
                onChangeText={setEmergencyContactNumber}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>

            {/* Address Line 1 */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Address Line 1 <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Address Line 1"
                placeholderTextColor="#B8C9D0"
                value={addressLine1}
                onChangeText={setAddressLine1}
              />
            </View>

            {/* Address Line 2 */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address Line 2</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Address Line 2"
                placeholderTextColor="#B8C9D0"
                value={addressLine2}
                onChangeText={setAddressLine2}
              />
            </View>

            {/* State */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                State <Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity 
                style={styles.selectInput}
                onPress={() => setShowStateModal(true)}
              >
                <Text style={[styles.selectText, !state && styles.placeholderText]}>
                  {state || 'Select State *'}
                </Text>
                <Ionicons name="chevron-down" size={24} color="#3EBFB0" />
              </TouchableOpacity>
            </View>

            {/* City */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter City"
                placeholderTextColor="#B8C9D0"
                value={city}
                onChangeText={setCity}
              />
            </View>

            {/* Pincode */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Pincode <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Pincode"
                placeholderTextColor="#B8C9D0"
                value={pincode}
                onChangeText={setPincode}
                keyboardType="number-pad"
                maxLength={6}
              />
            </View>
          </View>
        </View>

        {/* Create Profile Button */}
        <TouchableOpacity
          style={[styles.createButton, loading && styles.createButtonDisabled]}
          onPress={handleCreateProfile}
          disabled={loading}
        >
          <Text style={styles.createButtonText}>
            {loading ? 'Creating Profile...' : 'Create Profile'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* State Selection Modal */}
      <Modal
        visible={showStateModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowStateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select State</Text>
              <TouchableOpacity
                onPress={() => setShowStateModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={28} color="#1A4D5C" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.stateList}>
              {INDIAN_STATES.map((stateName) => (
                <TouchableOpacity
                  key={stateName}
                  style={[
                    styles.stateItem,
                    state === stateName && styles.stateItemSelected,
                  ]}
                  onPress={() => handleStateSelect(stateName)}
                >
                  <Text
                    style={[
                      styles.stateItemText,
                      state === stateName && styles.stateItemTextSelected,
                    ]}
                  >
                    {stateName}
                  </Text>
                  {state === stateName && (
                    <Ionicons name="checkmark-circle" size={24} color="#3EBFB0" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E9F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    backgroundColor: '#E6E9F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    color: '#8389BE',
    textAlign: 'center',
    marginRight: 40,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#D4D8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 5,
    right: '35%',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8389BE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8389BE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  card: {
    backgroundColor: '#C8B6E2',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A4A6A',
    marginBottom: 16,
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A6A',
    marginBottom: 8,
  },
  required: {
    color: '#FF0000',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#4A4A6A',
  },
  inputDisabled: {
    backgroundColor: '#F0EDF7',
    color: '#9B9BB5',
  },
  helperText: {
    fontSize: 13,
    color: '#9B9BB5',
    marginTop: 6,
    lineHeight: 18,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#8389BE',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dateText: {
    fontSize: 16,
    color: '#4A4A6A',
  },
  placeholderText: {
    color: '#8389BE',
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#8389BE',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  selectText: {
    fontSize: 16,
    color: '#8389BE',
  },
  createButton: {
    backgroundColor: '#8389BE',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#8389BE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A4D5C',
  },
  closeButton: {
    padding: 4,
  },
  stateList: {
    paddingHorizontal: 20,
  },
  stateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  stateItemSelected: {
    backgroundColor: '#E8F4F2',
    borderRadius: 8,
  },
  stateItemText: {
    fontSize: 16,
    color: '#1A4D5C',
  },
  stateItemTextSelected: {
    fontWeight: '600',
    color: '#3EBFB0',
  },
});
