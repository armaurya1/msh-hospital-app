import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: ViewStyle;
}

export function AuthButton({ title, onPress, loading, style }: AuthButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8389BE',
    borderRadius: 24,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#8389BE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
