import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { AuthButton } from '@/components/auth/AuthButton';
import { LoginIllustration } from '@/components/auth/LoginIllustration';

export default function VerificationScreen() {
  const { mobile } = useLocalSearchParams<{ mobile: string }>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      alert('Please enter complete 6-digit OTP');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.replace('/(profile)/patient-profile');
    }, 1500);
  };

  const handleResendOTP = () => {
    if (resendTimer === 0) {
      setResendTimer(30);
      // Simulate resend OTP
      alert('OTP sent successfully');
    }
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
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.description}>
            Enter the 6-digit code sent to{'\n'}
            <Text style={styles.mobileNumber}>+91 {mobile}</Text>
          </Text>

          <View style={styles.otpContainer}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <TextInput
                key={index}
                ref={(ref) => { inputRefs.current[index] = ref; }}
                style={[
                  styles.otpInput,
                  otp[index] ? styles.otpInputFilled : null,
                ]}
                value={otp[index]}
                onChangeText={(text) => handleOtpChange(text.replace(/[^0-9]/g, '').slice(-1), index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          <TouchableOpacity onPress={handleResendOTP} disabled={resendTimer > 0}>
            <Text style={[styles.resendText, resendTimer === 0 && styles.resendTextActive]}>
              {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
            </Text>
          </TouchableOpacity>

          <AuthButton
            title="Verify & Continue"
            onPress={handleVerifyOTP}
            loading={loading}
          />
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 32,
  },
  mobileNumber: {
    fontWeight: '600',
    color: '#8389BE',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  otpInputFilled: {
    borderColor: '#8389BE',
    backgroundColor: '#F8F7FB',
  },
  resendText: {
    fontSize: 15,
    color: '#999',
    textAlign: 'center',
    marginBottom: 10,
  },
  resendTextActive: {
    color: '#8389BE',
    fontWeight: '600',
  },
});
