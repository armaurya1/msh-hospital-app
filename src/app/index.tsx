import { Redirect } from 'expo-router';

// DEV_MODE: Set to true to skip login during development
const DEV_MODE = true;

export default function HomeScreen() {
  // Always redirect to tabs home in dev mode
  return <Redirect href="/(tabs)/home" />;
}
