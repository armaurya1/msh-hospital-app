import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Color palette from Stitch design
const COLORS = {
  primary: '#7E60BF',
  primaryContainer: '#4335A7',
  secondary: '#3B3486',
  secondaryContainer: '#E1D7F5',
  tertiary: '#6051A5',
  tertiaryContainer: '#8E7AB5',
  background: '#F9F9FB',
  surface: '#F9F9FB',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#F4F1FB',
  surfaceContainer: '#EFEDF7',
  surfaceContainerHigh: '#E9E6F2',
  onSurface: '#1B1B1F',
  onSurfaceVariant: '#47464F',
  outline: '#787680',
  outlineVariant: '#C8C5D0',
};

const SPECIALTIES = [
  { id: 'all', label: 'All Specialists', active: true },
  { id: 'cardiology', label: 'Cardiology', active: false },
  { id: 'neurology', label: 'Neurology', active: false },
  { id: 'pediatrics', label: 'Pediatrics', active: false },
  { id: 'dermatology', label: 'Dermatology', active: false },
  { id: 'oncology', label: 'Oncology', active: false },
  { id: 'psychiatry', label: 'Psychiatry', active: false },
  { id: 'orthopedics', label: 'Orthopedics', active: false },
];

const DOCTORS = [
  {
    id: '1',
    name: 'Dr. Sarah Jenkins',
    specialty: 'Senior Cardiologist',
    rating: 4.9,
    reviews: '120+',
    experience: '14 Years',
    location: 'Central Heart Inst.',
    nextAvailable: 'Tomorrow, 09:30 AM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2o4WOxszqCwZ2OiAWAWg3UCoSpnzlk-WW49EZKu4a6MONfcqCp0sIBirhtZmqvz99ojWPR6GMt0NJTG2qxmURyp3qs2a32NSckZS1beEtuOeJVeus8RPidVmduJdood3oAtxF2wS6kdFP75D6ACx5sp-U6EUK9-gOkL8yD0rwdXDZdMMjLBzhU0osAtuRNAVxsWaegtxUz7T8xz9FetUiGbuG11eYWyiSgTiBtnaNz2qwC57JAGsTHS_I1i9Jr98TY0vqylZ7AUiP',
    isTopRated: true,
  },
  {
    id: '2',
    name: 'Dr. Arjan Singh',
    specialty: 'Neurology Specialist',
    rating: 4.8,
    reviews: '85',
    experience: '9 Years',
    location: 'NeuroLink Clinic',
    nextAvailable: 'Wed, Oct 24 • 2:00 PM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPTDB9cdiu-UN_NCDe9bIJ6W68E__C_Uz1KGUCSrw-OP958nSGmeve0CapLFA89QsDlzI8A7cTw0GWUhhKXaOWWgqM2xbfk8IYmRZg806a17MTyG-L_VTAk92O4IjoN1Sbg3m_9k2YEQI7VULaLkxWMxkl8N8HdINpHcNS67YSnYQ5TjR0KtlaYUcYGU6wC8Uue9cg6w0ifhV1yC3bPlQg3WMaev5Gq7W366iM1bwIXZIYHBjd7dXzzZutnkjnlcmMaovwI0PZR6s9',
    isTopRated: false,
  },
  {
    id: '3',
    name: 'Dr. Maria Lopez',
    specialty: 'Pediatric Consultant',
    rating: 5.0,
    reviews: '210+',
    experience: '22 Years',
    location: "Children's General",
    nextAvailable: 'Thu, Oct 25 • 11:15 AM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvIx-SeQA958k19Ftjhy42cx3BM72UWnhtAZv_MljgHZ8gH6Aj-_xRqaRSv83ZceD4BpWk_oUekpAAFG-aUOlPsUOvDaf_8J5gczBRGTTXI2XBruOxD1uFpkdPu2jogPaE8fAIyitxXnGJG1YEsSCClURyOG3zw94MjGsHnZRKYfrrGka7PNqp01Zi0oKr9kwcsdrgXy3JwEsSGtvYyyj3ypNdmzqlAPNtuxcl8G6LaK5SyqurFvBonrj_Y0wQ9prQs0y24OabnM16',
    isTopRated: false,
  },
];

interface DoctorCardProps {
  doctor: typeof DOCTORS[0];
  onBook: () => void;
  onChat: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBook, onChat }) => (
  <View style={styles.doctorCard}>
    {doctor.isTopRated && (
      <View style={styles.topRatedBadge}>
        <Text style={styles.topRatedText}>Top Rated</Text>
      </View>
    )}
    
    <View style={styles.doctorHeader}>
      <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color={COLORS.tertiary} />
          <Text style={styles.ratingText}>{doctor.rating}</Text>
          <Text style={styles.reviewsText}>({doctor.reviews} reviews)</Text>
        </View>
      </View>
    </View>

    <View style={styles.detailsGrid}>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Experience</Text>
        <Text style={styles.detailValue}>{doctor.experience}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Location</Text>
        <Text style={styles.detailValue}>{doctor.location}</Text>
      </View>
      <View style={[styles.detailItem, styles.detailItemFull]}>
        <Text style={styles.detailLabel}>Next Available</Text>
        <View style={styles.availabilityRow}>
          <Ionicons name="calendar-outline" size={14} color={COLORS.primary} />
          <Text style={styles.availabilityText}>{doctor.nextAvailable}</Text>
        </View>
      </View>
    </View>

    <View style={styles.actionRow}>
      <TouchableOpacity style={styles.bookButton} onPress={onBook}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryContainer]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.bookButtonGradient}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={styles.chatButton} onPress={onChat}>
        <Ionicons name="chatbubble-outline" size={20} color={COLORS.secondary} />
      </TouchableOpacity>
    </View>
  </View>
);

export default function DoctorSearchScreen() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleBookAppointment = (doctorId: string) => {
    console.log('Book appointment with doctor:', doctorId);
  };

  const handleChat = (doctorId: string) => {
    console.log('Chat with doctor:', doctorId);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={20} color={COLORS.outline} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors, specialties..."
            placeholderTextColor={COLORS.outline}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Expert Directory</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={18} color={COLORS.primary} />
            <Text style={styles.filterText}>Advanced Filters</Text>
          </TouchableOpacity>
        </View>

        {/* Specialty Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipContainer}
          contentContainerStyle={styles.chipContent}
        >
          {SPECIALTIES.map((specialty) => (
            <TouchableOpacity
              key={specialty.id}
              style={[
                styles.chip,
                selectedSpecialty === specialty.id && styles.chipActive,
              ]}
              onPress={() => setSelectedSpecialty(specialty.id)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedSpecialty === specialty.id && styles.chipTextActive,
                ]}
              >
                {specialty.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Doctor List */}
        <View style={styles.doctorList}>
          {DOCTORS.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBook={() => handleBookAppointment(doctor.id)}
              onChat={() => handleChat(doctor.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: COLORS.surfaceContainerLowest,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.onSurface,
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  chipContainer: {
    paddingLeft: 16,
    marginBottom: 16,
  },
  chipContent: {
    paddingRight: 16,
    gap: 10,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceContainerLowest,
    marginRight: 10,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
  },
  chipTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  doctorList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    gap: 16,
  },
  doctorCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 2,
    position: 'relative',
    marginBottom: 8,
  },
  topRatedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(126, 96, 191, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  topRatedText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  doctorHeader: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  doctorImage: {
    width: 88,
    height: 88,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceContainer,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.secondary,
    marginBottom: 2,
  },
  doctorSpecialty: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.primary,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  reviewsText: {
    fontSize: 11,
    color: COLORS.outline,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  detailItem: {
    width: '50%',
    marginBottom: 10,
  },
  detailItemFull: {
    width: '100%',
    marginBottom: 0,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.outline,
    textTransform: 'uppercase',
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  availabilityText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  bookButton: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bookButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  chatButton: {
    width: 48,
    height: 44,
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
