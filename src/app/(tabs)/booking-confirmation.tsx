import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

// Design colors from Stitch HTML - Lavender Clay Models
const colors = {
  primary: '#6547a4',
  primaryContainer: '#7e60bf',
  primaryFixedDim: '#d2bcff',
  surface: '#fbf8ff',
  surfaceContainerLow: '#f5f2fa',
  surfaceContainer: '#efedf5',
  surfaceContainerHigh: '#e9e7ef',
  surfaceContainerHighest: '#e4e1e9',
  surfaceContainerLowest: '#ffffff',
  onSurface: '#1b1b21',
  onSurfaceVariant: '#494551',
  outline: '#7a7582',
  outlineVariant: '#cbc4d3',
};

export default function BookingConfirmationScreen() {
  const appointmentDetails = {
    doctor: 'Dr. Julian Vance, MD',
    specialty: 'Senior Cardiologist',
    doctorId: '#4492-AX',
    date: 'Oct 24, 2023',
    time: '09:45 AM',
    facility: 'Monolith Health Center',
    address: 'Suite 402, North Wing, Level 4. Clinical Research District.',
    refCode: 'CONF-88219',
  };

  const handleAddToCalendar = () => {
    alert('Added to calendar!');
  };

  const handleViewAppointments = () => {
    router.push('/(tabs)/bookings');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Appointment confirmed with ${appointmentDetails.doctor} on ${appointmentDetails.date} at ${appointmentDetails.time}. Location: ${appointmentDetails.facility}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Animation Container - success-glow effect */}
        <View style={styles.successContainer}>
          {/* 3D-Style Success Icon */}
          <View style={styles.iconOuter}>
            <View style={styles.iconBlur} />
            <View style={styles.iconInner}>
              <Ionicons name="checkmark-circle" size={48} color={colors.surfaceContainerLowest} />
            </View>
          </View>
          
          <Text style={styles.confirmedTitle}>BOOKING CONFIRMED</Text>
          <Text style={styles.confirmedSubtitle}>
            Your medical consultation has been successfully scheduled and added to the queue.
          </Text>
        </View>

        {/* Appointment Details Monolith Card - border-l-4 border-primary */}
        <View style={styles.appointmentCard}>
          <View style={styles.cardContent}>
            {/* Physician Identity */}
            <View style={styles.doctorRow}>
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANBgjFZCuXp0XaPqDqxX3iB9TOiGuxj-rM_-8FYkrwme2IiT64vJGNd5XxBx_P2tsHtvV-iqIJUdUJcb6Eah-fegc4FviijfEmQrz7Pr1GdiTKBb44coJlXqb8LHaZIDX3Jnljj8oalNNyx1SGL7YiN9ImDb465F1tMFzhzZhLKvw2qNZIGYdB8lOTuRarmnZQei9pMHd1OgZvY8VDcTxgj1XYEZdx0I2w3_OeYN3IVjFu36th2LEKbnJ3XHd3ZkFwUtMWvQQ2SLx5' }}
                style={styles.doctorImage}
              />
              <View style={styles.doctorInfo}>
                <Text style={styles.physicianLabel}>PRIMARY PHYSICIAN</Text>
                <Text style={styles.doctorName}>{appointmentDetails.doctor}</Text>
                <View style={styles.specialtyRow}>
                  <Ionicons name="checkmark-circle" size={12} color={colors.primary} />
                  <Text style={styles.specialtyText}>
                    {appointmentDetails.specialty} · ID: {appointmentDetails.doctorId}
                  </Text>
                </View>
              </View>
            </View>

            {/* Date/Time Grid - grid-cols-2 gap-2 */}
            <View style={styles.detailsGrid}>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>APPOINTMENT DATE</Text>
                <View style={styles.detailValueRow}>
                  <Ionicons name="calendar" size={18} color={colors.primary} />
                  <Text style={styles.detailValue}>{appointmentDetails.date}</Text>
                </View>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>STANDARD TIME</Text>
                <View style={styles.detailValueRow}>
                  <Ionicons name="time" size={18} color={colors.primary} />
                  <Text style={styles.detailValue}>{appointmentDetails.time}</Text>
                </View>
              </View>
            </View>

            {/* Location Section */}
            <View style={styles.locationBox}>
              <Text style={styles.detailLabel}>MEDICAL FACILITY</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={18} color={colors.primary} />
                <View style={styles.locationInfo}>
                  <Text style={styles.facilityName}>{appointmentDetails.facility}</Text>
                  <Text style={styles.facilityAddress}>{appointmentDetails.address}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Security Tagline - bg-surface-container-highest/30 */}
          <View style={styles.securityBar}>
            <View style={styles.securityLeft}>
              <Ionicons name="lock-closed" size={10} color={colors.onSurfaceVariant} />
              <Text style={styles.securityText}>HIPAA Compliant Transmission</Text>
            </View>
            <Text style={styles.refCode}>REF: {appointmentDetails.refCode}</Text>
          </View>
        </View>

        {/* Action Buttons - grid-cols-1 gap-2 pt-4 */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryBtn} onPress={handleAddToCalendar}>
            <Ionicons name="calendar-outline" size={18} color={colors.surfaceContainerLowest} />
            <Text style={styles.primaryBtnText}>ADD TO CALENDAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={handleViewAppointments}>
            <Ionicons name="list" size={18} color={colors.onSurface} />
            <Text style={styles.secondaryBtnText}>VIEW ALL APPOINTMENTS</Text>
          </TouchableOpacity>
        </View>

        {/* Secondary Support Options - mt-12 gap-8 */}
        <View style={styles.supportSection}>
          <View style={styles.supportActions}>
            <TouchableOpacity style={styles.supportBtn} onPress={handleShare}>
              <View style={styles.supportIconWrap}>
                <Ionicons name="share-outline" size={20} color={colors.primary} />
              </View>
              <Text style={styles.supportLabel}>SHARE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.supportBtn}>
              <View style={styles.supportIconWrap}>
                <Ionicons name="print-outline" size={20} color={colors.primary} />
              </View>
              <Text style={styles.supportLabel}>PRINT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.supportBtn}>
              <View style={styles.supportIconWrap}>
                <Ionicons name="help-circle-outline" size={20} color={colors.primary} />
              </View>
              <Text style={styles.supportLabel}>SUPPORT</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.footerNote}>
            A confirmation email has been sent to your registered address.{'\n'}
            Please arrive 15 minutes before your scheduled appointment time.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    minHeight: '100%',
  },
  successContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginBottom: 32, // mb-8
  },
  iconOuter: {
    position: 'relative',
    width: 128, // w-32
    height: 128, // h-32
    marginBottom: 24, // mb-6
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBlur: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: `${colors.primary}15`,
    borderRadius: 64,
  },
  iconInner: {
    width: 96, // w-24
    height: 96, // h-24
    borderRadius: 12, // rounded-xl
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    // shadow-[0_8px_30px_rgb(101,71,164,0.4)]
    shadowColor: 'rgb(101,71,164)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  confirmedTitle: {
    fontSize: 24, // text-3xl
    fontWeight: '900', // font-black
    color: colors.primary,
    letterSpacing: -0.5, // tracking-tight
    textTransform: 'uppercase',
    marginBottom: 8, // mb-2
    textAlign: 'center',
  },
  confirmedSubtitle: {
    fontSize: 14, // text-sm
    fontWeight: '500', // font-medium
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: 32, // px-8
  },
  appointmentCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 2, // rounded-sm
    overflow: 'hidden',
    // shadow-[0px_4px_20px_rgba(126,96,191,0.06)]
    shadowColor: 'rgb(126,96,191)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 2,
    borderLeftWidth: 4, // border-l-4
    borderLeftColor: colors.primary,
  },
  cardContent: {
    padding: 16, // p-4
    gap: 16, // space-y-4
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // gap-3
  },
  doctorImage: {
    width: 48, // w-12
    height: 48, // h-12
    borderRadius: 2, // rounded-sm
    backgroundColor: colors.surfaceContainerLow,
  },
  doctorInfo: {
    flex: 1,
  },
  physicianLabel: {
    fontSize: 10, // text-[10px]
    fontWeight: '900', // font-black
    color: colors.primaryFixedDim,
    letterSpacing: 1.5, // tracking-widest
    textTransform: 'uppercase',
  },
  doctorName: {
    fontSize: 18, // text-lg
    fontWeight: '700', // font-bold
    color: colors.onSurface,
    letterSpacing: -0.3, // tracking-tight
  },
  specialtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // gap-1
  },
  specialtyText: {
    fontSize: 11, // text-[11px]
    fontWeight: '500', // font-medium
    color: colors.onSurfaceVariant,
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 8, // gap-2
  },
  detailBox: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    padding: 10, // p-2.5
    borderRadius: 2, // rounded-sm
  },
  detailLabel: {
    fontSize: 9, // text-[9px]
    fontWeight: '900', // font-black
    color: `${colors.onSurfaceVariant}99`, // /60
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4, // mb-1
  },
  detailValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
  },
  detailValue: {
    fontSize: 14, // text-sm
    fontWeight: '700', // font-bold
    color: colors.onSurface,
  },
  locationBox: {
    backgroundColor: colors.surfaceContainerLow,
    padding: 10,
    borderRadius: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  locationInfo: {
    flex: 1,
  },
  facilityName: {
    fontSize: 14, // text-sm
    fontWeight: '700', // font-bold
    color: colors.onSurface,
    marginBottom: 4, // mb-1
  },
  facilityAddress: {
    fontSize: 11, // text-[11px]
    fontWeight: '500', // font-medium
    color: colors.onSurfaceVariant,
    lineHeight: 16, // leading-tight
  },
  securityBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: `${colors.surfaceContainerHighest}4D`, // /30
    paddingHorizontal: 16, // px-4
    paddingVertical: 8, // py-2
  },
  securityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // gap-1
  },
  securityText: {
    fontSize: 10, // text-[10px]
    fontWeight: '500', // font-medium
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  refCode: {
    fontSize: 10, // text-[10px]
    fontWeight: '900', // font-black
    color: colors.primary,
    letterSpacing: -0.5, // tracking-tighter
    textTransform: 'uppercase',
  },
  actionButtons: {
    width: '100%',
    maxWidth: 400,
    gap: 8, // gap-2
    marginTop: 16, // pt-4
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48, // h-12
    backgroundColor: colors.primary,
    borderRadius: 2, // rounded-sm
    gap: 8, // gap-2
    // shadow-lg
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryBtnText: {
    fontSize: 14, // text-sm
    fontWeight: '900', // font-black
    color: colors.surfaceContainerLowest,
    letterSpacing: 1.5, // tracking-widest
    textTransform: 'uppercase',
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 2,
    gap: 8,
  },
  secondaryBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.onSurface,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  supportSection: {
    alignItems: 'center',
    marginTop: 48, // mt-12
    gap: 16, // gap-4
  },
  supportActions: {
    flexDirection: 'row',
    gap: 32, // gap-8
  },
  supportBtn: {
    alignItems: 'center',
    gap: 4, // gap-1
  },
  supportIconWrap: {
    width: 40, // w-10
    height: 40, // h-10
    borderRadius: 20, // rounded-full
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportLabel: {
    fontSize: 9, // text-[9px]
    fontWeight: '900', // font-black
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  footerNote: {
    fontSize: 10, // text-[10px]
    fontWeight: '500', // font-medium
    color: colors.onSurfaceVariant,
    opacity: 0.6, // opacity-60
    textAlign: 'center',
  },
});
