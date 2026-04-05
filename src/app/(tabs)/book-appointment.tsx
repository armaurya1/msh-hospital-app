import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Design colors from Stitch - Lavender Clay Models
const colors = {
  primary: '#6547a4',
  primaryContainer: '#7e60bf',
  surface: '#fbf8ff',
  surfaceContainerLow: '#f5f2fa',
  surfaceContainerLowest: '#ffffff',
  surfaceContainer: '#efedf5',
  surfaceContainerHigh: '#e9e7ef',
  onSurface: '#1b1b21',
  onSurfaceVariant: '#494551',
  outline: '#7a7582',
  outlineVariant: '#cbc4d3',
  onPrimary: '#ffffff',
  white: '#ffffff',
};

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DateOption {
  day: string;
  date: number;
}

const timeSlots: TimeSlot[] = [
  { time: '09:00 AM', available: true },
  { time: '10:30 AM', available: true },
  { time: '01:00 PM', available: true },
  { time: '02:15 PM', available: true },
  { time: '03:30 PM', available: true },
  { time: '04:45 PM', available: false },
  { time: '05:30 PM', available: true },
  { time: '06:00 PM', available: true },
];

const dates: DateOption[] = [
  { day: 'Mon', date: 12 },
  { day: 'Tue', date: 13 },
  { day: 'Wed', date: 14 },
  { day: 'Thu', date: 15 },
  { day: 'Fri', date: 16 },
  { day: 'Sat', date: 17 },
];

export default function BookAppointmentScreen() {
  const [selectedDate, setSelectedDate] = useState(12);
  const [selectedTime, setSelectedTime] = useState('10:30 AM');

  const handleConfirmBooking = () => {
    router.push('/(tabs)/booking-confirmation');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* TopAppBar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerIconBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Appointment</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="share-outline" size={20} color={colors.outline} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="notifications-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.pageTitleWrap}>
          <Text style={styles.pageOverline}>Appointment Booking</Text>
          <Text style={styles.pageTitle}>Choose your preferred slot</Text>
        </View>

        {/* Doctor Header Card */}
        <View style={styles.doctorCard}>
          <View style={styles.doctorImageContainer}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW64mFUF8wRVLAYonNOLIMslkDB-egnIyqqVJuWIBt9PS0v318YeqLt9usH0-0ncb7lOEv7D3g3KUu-0fYxBazzg4L5f4VuBF7cxRQ0YxWQfF0p-ILVuRL8agPGcPQWE9d7N2nRnLrsuGalbwoJsTHN5HCdouwnkrdh3_CfrasfbF-KAeh-VZuQ5OLSSYugipGoZos2uG-CTRoy0C4pbkKqPoWur-lpYtxALIpb-_DqlI4ZiVzT44ffJB4QmIblCazaHiLNzE96k-_' }}
              style={styles.doctorImage}
            />
          </View>
          <View style={styles.doctorInfo}>
            <View style={styles.doctorNameRow}>
              <View style={styles.doctorNameSection}>
                <Text style={styles.doctorName}>Dr. Alistair Vance</Text>
                <Text style={styles.doctorSpecialty}>Senior Neurosurgeon</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={10} color={colors.primary} />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>
            <View style={styles.tagsRow}>
              <View style={styles.tagChip}>
                <Text style={styles.tagChipText}>NEUROLOGY</Text>
              </View>
              <View style={styles.tagChip}>
                <Text style={styles.tagChipText}>SURGERY</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Clinical Summary Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>EXPERIENCE</Text>
            <Text style={styles.statValue}>22+</Text>
            <Text style={styles.statUnit}>Years</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>PATIENTS</Text>
            <Text style={styles.statValue}>8.5k+</Text>
            <Text style={styles.statUnit}>Treated</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>SUCCESS</Text>
            <Text style={styles.statValue}>98.2%</Text>
            <Text style={styles.statUnit}>Rate</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIndicator} />
            <Text style={styles.sectionTitle}>About the Physician</Text>
          </View>
          <Text style={styles.aboutText}>Dr. Alistair Vance is a world-renowned specialist in complex neurovascular interventions. With over two decades of clinical mastery at the Clinical Monolith Institute, he focuses on minimally invasive brain surgery and advanced neurological diagnostics.</Text>
        </View>

        {/* Availability & Scheduling */}
        <View style={styles.schedulingSection}>
          <View style={styles.schedulingHeader}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionIndicator} />
              <Text style={styles.sectionTitle}>Select Date</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewCalendarText}>View Calendar</Text>
            </TouchableOpacity>
          </View>

          {/* Date Selection */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScrollView}>
            {dates.map((item) => (
              <TouchableOpacity
                key={item.date}
                style={[
                  styles.dateCard,
                  selectedDate === item.date && styles.dateCardSelected,
                ]}
                onPress={() => setSelectedDate(item.date)}
              >
                <Text style={[
                  styles.dateDay,
                  selectedDate === item.date && styles.dateDaySelected,
                ]}>{item.day}</Text>
                <Text style={[
                  styles.dateNum,
                  selectedDate === item.date && styles.dateNumSelected,
                ]}>{item.date}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Available Slots */}
          <View style={styles.slotsSection}>
            <Text style={styles.slotsLabel}>Available Slots</Text>
            <View style={styles.slotsGrid}>
              {timeSlots.map((slot) => (
                <TouchableOpacity
                  key={slot.time}
                  style={[
                    styles.slotBtn,
                    !slot.available && styles.slotBtnDisabled,
                    selectedTime === slot.time && slot.available && styles.slotBtnSelected,
                  ]}
                  onPress={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                >
                  <Text style={[
                    styles.slotText,
                    !slot.available && styles.slotTextDisabled,
                    selectedTime === slot.time && slot.available && styles.slotTextSelected,
                  ]}>{slot.time}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.selectionSummary}>
          <View>
            <Text style={styles.summaryLabel}>Selected</Text>
            <Text style={styles.summaryValue}>{`Tue, ${selectedDate} • ${selectedTime}`}</Text>
          </View>
          <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
        </View>

        {/* Location & Contact */}
        <View style={styles.locationSection}>
          <View style={styles.locationHeader}>
            <View>
              <Text style={styles.locationTitle}>CLINICAL LOCATION</Text>
              <Text style={styles.locationAddress}>88th Central Neurological Wing, NY</Text>
            </View>
            <TouchableOpacity style={styles.directionsBtn}>
              <Ionicons name="navigate" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.mapContainer}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbTV3Z-O91fyHHeBtlpdE9bJU39hqizCVR9EObZ6SOOl9-jHJCPndJdIIt2aE8zg298fyRLk20AScOJH-mrAz3cKYkeynL0Y7pzDlXuXQOiZ7FWeSJS3SOgo3vVZEqy4PudSjDTtyd-q4OB8XARL6U-d5f0K9YoMqoyIpp1ATSLNJBRjTg3S0GZcbxX9zPTzbRwVeOfrQAP2swvYJoE27Rbr-XP7mH9g_gDW4iWAJYalTQoY0vqdOD-XwfxpgqpC0qkv1Dj498GyRL' }}
              style={styles.mapImage}
            />
            <View style={styles.mapOverlay} />
            <View style={styles.mapMarker}>
              <Ionicons name="location" size={28} color={colors.primary} />
            </View>
          </View>
        </View>

        {/* Bottom spacing for button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Confirm Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
          <LinearGradient
            colors={[colors.primary, colors.primaryContainer] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.confirmButtonGradient}
          >
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.onPrimary} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: colors.surface,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}30`,
  },
  headerAvatarImage: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  headerIconBtn: {
    padding: 6,
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pageTitleWrap: {
    marginTop: 16,
    marginBottom: 2,
  },
  pageOverline: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  pageTitle: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: '800',
    color: colors.onSurface,
    letterSpacing: -0.4,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    gap: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}10`,
    shadowColor: 'rgba(126,96,191,0.06)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 3,
  },
  doctorImageContainer: {
    width: 100,
    height: 108,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainer,
  },
  doctorImage: {
    width: '100%',
    height: '100%',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  doctorNameSection: {},
  doctorName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
    letterSpacing: -0.3,
  },
  doctorSpecialty: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
    marginTop: 2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurface,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  tagChip: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
  },
  tagChipText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: `${colors.primary}10`,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.outline,
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },
  statUnit: {
    fontSize: 9,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  aboutSection: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}10`,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sectionIndicator: {
    width: 4,
    height: 12,
    backgroundColor: colors.primary,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.onSurface,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  aboutText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    lineHeight: 22,
  },
  schedulingSection: {
    marginTop: 16,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}10`,
    padding: 16,
  },
  schedulingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewCalendarText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  dateScrollView: {
    marginBottom: 16,
  },
  dateCard: {
    width: 58,
    height: 72,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  dateCardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  dateDay: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.outline,
    textTransform: 'uppercase',
  },
  dateDaySelected: {
    color: `${colors.onPrimary}CC`,
  },
  dateNum: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.onSurface,
  },
  dateNumSelected: {
    color: colors.onPrimary,
  },
  slotsSection: {
    marginTop: 8,
  },
  slotsLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  slotBtn: {
    width: (width - 32 - 32 - 24) / 4,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}20`,
    alignItems: 'center',
  },
  slotBtnSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  slotBtnDisabled: {
    opacity: 0.4,
  },
  slotText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurface,
  },
  slotTextSelected: {
    color: colors.onPrimary,
  },
  slotTextDisabled: {
    textDecorationLine: 'line-through',
  },
  selectionSummary: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: `${colors.primaryContainer}15`,
    borderWidth: 1,
    borderColor: `${colors.primaryContainer}30`,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  summaryValue: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  locationSection: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    marginTop: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}10`,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  locationTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.onSurface,
    letterSpacing: 1,
  },
  locationAddress: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  directionsBtn: {
    backgroundColor: `${colors.primaryContainer}10`,
    padding: 8,
    borderRadius: 8,
  },
  mapContainer: {
    height: 112,
    position: 'relative',
    backgroundColor: colors.surfaceContainer,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${colors.primary}08`,
  },
  mapMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -14,
    marginLeft: -14,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 24,
    backgroundColor: `${colors.surface}F2`,
  },
  confirmButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  confirmButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    gap: 8,
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.onPrimary,
    letterSpacing: -0.3,
    textTransform: 'uppercase',
  },
});
