import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function EmergencyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="call" size={48} color="#ffffff" />
        </View>
        <Text style={styles.title}>Emergency Services</Text>
        <Text style={styles.subtitle}>Call for immediate medical assistance</Text>
        
        <TouchableOpacity style={styles.emergencyButton}>
          <Ionicons name="call" size={24} color="#ffffff" />
          <Text style={styles.buttonText}>CALL AMBULANCE</Text>
        </TouchableOpacity>
        
        <Text style={styles.note}>Available 24/7 • Response time: 8-12 mins</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf8ff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ba1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1b1b21',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#7a7582',
    marginBottom: 32,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ba1a1a',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    gap: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  note: {
    fontSize: 12,
    color: '#7a7582',
    marginTop: 16,
  },
});
