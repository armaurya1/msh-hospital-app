import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_WIDTH = 480;

export function HospitalSplashScreen() {
  const [visible, setVisible] = useState(true);
  const animationRef = useRef<LottieView>(null);

  // Animation values
  const fadeOpacity = useSharedValue(0);

  useEffect(() => {
    // Play Lottie animation
    animationRef.current?.play();

    // Fade out overlay (after 2500ms)
    fadeOpacity.value = withDelay(
      2500,
      withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })
    );

    // Hide splash after animation
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fadeOpacity.value,
  }));

  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* Lottie Animation */}
      <LottieView
        ref={animationRef}
        source={require('../../assets/images/hospital-animation.json')}
        style={styles.animation}
        autoPlay={false}
        loop={true}
        speed={1}
      />

      {/* Fade Overlay */}
      <Animated.View style={[styles.fadeOverlay, fadeStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    maxWidth: MAX_WIDTH,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 1000,
    alignSelf: 'center',
  },
  animation: {
    width: Math.min(SCREEN_WIDTH * 0.9, 450),
    height: Math.min(SCREEN_WIDTH * 0.9, 450),
  },
  fadeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    zIndex: 200,
    pointerEvents: 'none',
  },
});
