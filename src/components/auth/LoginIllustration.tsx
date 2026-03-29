import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');
const illustrationSize = Math.min(width * 0.9, 350);

export function LoginIllustration() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/Pediatrician-amico 1.png')}
        style={styles.illustration}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  illustration: {
    width: illustrationSize,
    height: illustrationSize,
  },
});
