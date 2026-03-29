import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FDFCFF' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen 
        name="forgot-password" 
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen 
        name="verification" 
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen 
        name="reset-password" 
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
}
