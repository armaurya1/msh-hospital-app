import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

import { HospitalSplashScreen } from '@/components/HospitalSplashScreen';

// DEV_MODE: Set to true to skip login screens during development
const DEV_MODE = true;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <HospitalSplashScreen />
      <Stack 
        screenOptions={{ headerShown: false }}
        initialRouteName={DEV_MODE ? '(tabs)' : 'index'}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(profile)" />
        <Stack.Screen name="index" />
        <Stack.Screen name="explore" />
      </Stack>
    </ThemeProvider>
  );
}
