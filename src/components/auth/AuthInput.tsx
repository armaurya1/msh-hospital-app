import { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface AuthInputProps extends TextInputProps {
  isPassword?: boolean;
}

function EyeOffIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
        stroke="#9CA3AF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1 1l22 22"
        stroke="#9CA3AF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function EyeIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        stroke="#9CA3AF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
        stroke="#9CA3AF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function AuthInput({ isPassword, style, ...props }: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#999"
        secureTextEntry={isPassword && !showPassword}
        {...props}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 20,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  eyeButton: {
    paddingRight: 20,
  },
});
