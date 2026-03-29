import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';

export default function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Password reset successfully!');
      router.replace('/(auth)/login');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.blurredBackground} />

      <View style={styles.bottomSheet}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.description}>
          Set a new password for your account so you can login and access all features
        </Text>

        <AuthInput
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          isPassword
        />

        <AuthInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          isPassword
        />

        <AuthButton
          title="Confirm"
          onPress={handleReset}
          loading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E4EF',
  },
  blurredBackground: {
    flex: 1,
    backgroundColor: '#D4CEE4',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#8B7CB3',
    lineHeight: 22,
    marginBottom: 24,
  },
});
