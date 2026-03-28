import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { LoginIllustration } from '@/components/auth/LoginIllustration';

export default function LoginScreen() {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (mobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push({ pathname: '/(auth)/verification', params: { mobile } });
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Illustration */}
        <LoginIllustration />

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Welcome Text */}
          <Text style={styles.welcomeTitle}>Welcome Back</Text>
          <Text style={styles.welcomeSubtitle}>Login to your account</Text>

          {/* Mobile Number Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number"
              placeholderTextColor="#999"
              value={mobile}
              onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ''))}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          {/* Send OTP Button */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleSendOTP}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Text>
          </TouchableOpacity>

          {/* Info Text */}
          <Text style={styles.infoText}>
            We will send you a One Time Password on this mobile number
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  formContainer: {
    flex: 1,
    paddingTop: 10,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 20,
    paddingHorizontal: 20,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  countryCode: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginRight: 12,
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  loginButton: {
    backgroundColor: '#8389BE',
    borderRadius: 24,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8389BE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 10,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  infoText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});
