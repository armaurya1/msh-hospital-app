import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

// Design colors from Stitch HTML - Lavender Clay Models
const colors = {
  primary: '#6547a4',
  primaryContainer: '#7e60bf',
  primaryFixedDim: '#d2bcff',
  surface: '#fbf8ff',
  surfaceContainerLow: '#f5f2fa',
  surfaceContainer: '#efedf5',
  surfaceContainerHigh: '#e9e7ef',
  surfaceContainerLowest: '#ffffff',
  onSurface: '#1b1b21',
  onSurfaceVariant: '#494551',
  outline: '#7a7582',
  outlineVariant: '#cbc4d3',
};

export default function PersonalDetailsScreen() {
  const [fullName, setFullName] = useState('Dr. Elena Sterling');
  const [email, setEmail] = useState('e.sterling@clinical.med');
  const [mobile, setMobile] = useState('+1 (555) 012-3456');
  const [address, setAddress] = useState('1248 Medical Plaza, Suite 402, North District');
  const [state, setState] = useState('California');
  const [pincode, setPincode] = useState('90210');

  const handleCreateProfile = () => {
    router.push('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* TopAppBar - matching Stitch h-14 px-4 */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Personal Details</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Section - matching Stitch mb-8 */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjZitlLF9-Qk0IRgL2ujt0HO7HZTeRxVEpoG4KugPDJ_xUMBBgEO5QgTeCMYLnNTXH7dNsfcs2ZKHzJlP6RVXg4AldMVYPrqxzZzlzBXGaExA2jA0x1ng8f1fLmMIdLQm8oxIDzdKkhHzgu6Lov4Baq3yokAgyRDvm7rzi9FWhUMv1LLhUKEuayFwQdnLpn4d0fkqJ-GSm-z9oBTLbd0HYwpIgADPJ40raX6V3O9Jh5U9UuplWX6haP2v03Q0TmFEpnxotBccLLiUR' }}
                  style={styles.avatar}
                />
              </View>
              <TouchableOpacity style={styles.editAvatarBtn}>
                <Ionicons name="pencil" size={12} color={colors.surfaceContainerLowest} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Container - matching Stitch rounded-xl p-6 shadow */}
          <View style={styles.formContainer}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>FULL NAME</Text>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
                placeholderTextColor={`${colors.onSurfaceVariant}80`}
              />
            </View>

            {/* Contact Grid - Email & Mobile (grid-cols-2 on md) */}
            <View style={styles.contactGrid}>
              <View style={[styles.inputGroup, styles.gridItem]}>
                <Text style={styles.label}>EMAIL ADDRESS</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter email"
                  placeholderTextColor={`${colors.onSurfaceVariant}80`}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={[styles.inputGroup, styles.gridItem]}>
                <Text style={styles.label}>MOBILE NUMBER</Text>
                <TextInput
                  style={styles.input}
                  value={mobile}
                  onChangeText={setMobile}
                  placeholder="Enter mobile"
                  placeholderTextColor={`${colors.onSurfaceVariant}80`}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Full Address - textarea rows=2 */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>FULL ADDRESS</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter your address"
                placeholderTextColor={`${colors.onSurfaceVariant}80`}
                multiline
                numberOfLines={2}
                textAlignVertical="top"
              />
            </View>

            {/* Location Grid - State & Pincode (grid-cols-2) */}
            <View style={styles.locationGrid}>
              <View style={[styles.inputGroup, styles.gridItem]}>
                <Text style={styles.label}>STATE</Text>
                <TouchableOpacity style={styles.selectContainer}>
                  <Text style={styles.selectText}>{state}</Text>
                  <Ionicons name="chevron-down" size={16} color={colors.onSurface} />
                </TouchableOpacity>
              </View>
              <View style={[styles.inputGroup, styles.gridItem]}>
                <Text style={styles.label}>PINCODE</Text>
                <TextInput
                  style={styles.input}
                  value={pincode}
                  onChangeText={setPincode}
                  placeholder="Enter pincode"
                  placeholderTextColor={`${colors.onSurfaceVariant}80`}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Action Button - pt-6, gradient, h-12, rounded-xl */}
            <View style={styles.actionButtonContainer}>
              <TouchableOpacity style={styles.createBtn} onPress={handleCreateProfile}>
                <Ionicons name="person-add" size={18} color={colors.surfaceContainerLowest} />
                <Text style={styles.createBtnText}>Create Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 80 }} />
        </ScrollView>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56, // h-14 = 56px
    backgroundColor: colors.surface,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18, // text-lg
    fontWeight: '600', // font-semibold
    color: colors.primary,
    letterSpacing: -0.3, // tracking-tight
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 24, // mt-6
    marginBottom: 32, // mb-8
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarWrapper: {
    width: 96, // w-24
    height: 96, // h-24
    borderRadius: 48, // rounded-full
    backgroundColor: colors.surfaceContainerHigh,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: `${colors.primary}15`, // border-primary/10
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32, // w-8
    height: 32, // h-8
    borderRadius: 16, // rounded-full
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surfaceContainerLowest,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  formContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12, // rounded-xl
    padding: 24, // p-6
    marginHorizontal: 16, // px-4
    // Shadow: shadow-[0px_4px_20px_rgba(126,96,191,0.06)]
    shadowColor: 'rgb(126,96,191)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}15`,
  },
  inputGroup: {
    marginBottom: 16, // space-y-4
  },
  label: {
    fontSize: 11, // text-[0.6875rem]
    fontWeight: '600', // font-semibold
    color: colors.onSurfaceVariant,
    letterSpacing: 0.8, // tracking-wider
    textTransform: 'uppercase',
    marginBottom: 4, // space-y-1
    paddingLeft: 4, // pl-1
  },
  input: {
    height: 40, // h-10
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 8, // rounded-lg
    paddingHorizontal: 16, // px-4
    fontSize: 14, // text-sm
    fontWeight: '500', // font-medium
    color: colors.onSurface,
  },
  textArea: {
    height: 72,
    paddingTop: 8, // py-2
    paddingBottom: 8,
  },
  contactGrid: {
    flexDirection: 'row',
    gap: 16, // gap-4
  },
  locationGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  gridItem: {
    flex: 1,
  },
  selectContainer: {
    height: 40,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurface,
  },
  actionButtonContainer: {
    paddingTop: 24, // pt-6
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48, // h-12
    borderRadius: 12, // rounded-xl
    gap: 8, // gap-2
    // bg-gradient-to-r from-primary to-primary-container
    backgroundColor: colors.primary,
    // shadow-[0px_4px_12px_rgba(101,71,164,0.3)]
    shadowColor: 'rgb(101,71,164)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  createBtnText: {
    fontSize: 14,
    fontWeight: '700', // font-bold
    color: colors.surfaceContainerLowest,
  },
});
