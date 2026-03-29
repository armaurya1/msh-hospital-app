import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, router } from 'expo-router';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { LoginIllustration } from '@/components/auth/LoginIllustration';
import Svg, { Circle, Path } from 'react-native-svg';

function CheckboxUnchecked() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={11} stroke="#D1D5DB" strokeWidth={2} />
    </Svg>
  );
}

function CheckboxChecked() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={12} fill="#8389BE" />
      <Path
        d="M7 12l3 3 7-7"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!agreeTerms) {
      alert('Please agree to Terms of Service and Privacy Policy');
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <LoginIllustration />

        <View style={styles.formContainer}>
          <AuthInput
            placeholder="名称:"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <AuthInput
            placeholder="邮箱:"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AuthInput
            placeholder="密码:"
            value={password}
            onChangeText={setPassword}
            isPassword
          />

          <TouchableOpacity
            style={styles.termsContainer}
            onPress={() => setAgreeTerms(!agreeTerms)}
            activeOpacity={0.7}
          >
            {agreeTerms ? <CheckboxChecked /> : <CheckboxUnchecked />}
            <Text style={styles.termsText}>
              我同意
              <Text style={styles.termsLink}>服务条款</Text>
              及
              <Text style={styles.termsLink}>隐私政策</Text>
            </Text>
          </TouchableOpacity>

          <AuthButton
            title="立即注册"
            onPress={handleRegister}
            loading={loading}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>已有账号? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>立即登录</Text>
              </TouchableOpacity>
            </Link>
          </View>
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
    paddingTop: 20,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -8,
    marginBottom: 10,
  },
  termsText: {
    marginLeft: 12,
    color: '#6B7280',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  termsLink: {
    color: '#8389BE',
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  loginText: {
    color: '#A0A7BA',
    fontSize: 15,
  },
  loginLink: {
    color: '#8389BE',
    fontSize: 15,
    fontWeight: '600',
  },
});
