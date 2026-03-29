import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
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
  secondary: '#635a76',
  secondaryContainer: '#eaddff',
  onSecondaryContainer: '#69607c',
  tertiary: '#635083',
  tertiaryContainer: '#7c689d',
  error: '#ba1a1a',
};

interface HealthRecord {
  id: string;
  type: 'lab' | 'prescription' | 'radiology' | 'clinical' | 'cardiology';
  dateLabel: string;
  title: string;
  provider: string;
  description?: string;
  tags?: { label: string; color: string; bg: string }[];
  metrics?: { label: string; value: string; isError?: boolean }[];
  note?: string;
  borderColor: string;
  icon: string;
  iconColor: string;
}

const records: HealthRecord[] = [
  {
    id: '1',
    type: 'lab',
    dateLabel: 'OCT 24, 2023 • LAB REPORT',
    title: 'Complete Blood Count (CBC)',
    provider: 'Dr. Elena Rodriguez • Diagnostic Lab',
    tags: [
      { label: 'CRITICAL', color: colors.primary, bg: `${colors.primary}1A` },
      { label: 'HEMATOLOGY', color: colors.onSurfaceVariant, bg: colors.surfaceContainer },
    ],
    borderColor: colors.primary,
    icon: 'download',
    iconColor: colors.primary,
  },
  {
    id: '2',
    type: 'prescription',
    dateLabel: 'TODAY • PRESCRIPTION',
    title: 'Lisinopril 10mg',
    provider: '',
    description: 'Once daily for hypertension. Issued by Dr. Sarah Chen.',
    tags: [
      { label: 'PHARMACY READY', color: colors.onSecondaryContainer, bg: colors.secondaryContainer },
    ],
    borderColor: colors.secondary,
    icon: 'document-text',
    iconColor: colors.secondary,
  },
  {
    id: '3',
    type: 'lab',
    dateLabel: 'OCT 22, 2023 • LAB ACTIVITY',
    title: 'Metabolic Panel & Lipid Profile',
    provider: 'Processed at Quest Diagnostics Lab #442.',
    metrics: [
      { label: 'GLUCOSE', value: '94 mg/dL' },
      { label: 'LDL', value: '132 mg/dL', isError: true },
    ],
    borderColor: colors.outlineVariant,
    icon: 'flask',
    iconColor: colors.onSurfaceVariant,
  },
  {
    id: '4',
    type: 'radiology',
    dateLabel: 'OCT 18, 2023 • RADIOLOGY',
    title: 'Chest X-Ray PA View',
    provider: 'City Imaging Center',
    tags: [
      { label: 'IMAGING', color: colors.onSurfaceVariant, bg: colors.surfaceContainer },
    ],
    borderColor: colors.tertiary,
    icon: 'eye',
    iconColor: colors.tertiary,
  },
  {
    id: '5',
    type: 'clinical',
    dateLabel: 'OCT 15, 2023 • CLINICAL NOTE',
    title: 'Annual Physical Examination',
    provider: '',
    description: 'Routine checkup with Dr. James Wilson. All vitals within normal parameters except BP.',
    note: '"Patient advised to reduce sodium intake and monitor heart rate during exercise."',
    borderColor: colors.primaryContainer,
    icon: 'document',
    iconColor: colors.primaryContainer,
  },
  {
    id: '6',
    type: 'cardiology',
    dateLabel: 'OCT 12, 2023 • CARDIOLOGY',
    title: '12-Lead Electrocardiogram',
    provider: 'St. Jude Medical Center',
    tags: [
      { label: 'CARDIAC', color: colors.onSurfaceVariant, bg: colors.surfaceContainer },
    ],
    borderColor: colors.primary,
    icon: 'download',
    iconColor: colors.primary,
  },
];

export default function HealthRecordsTimelineScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* TopAppBar - h-12 sticky */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="document-text" size={20} color={colors.primary} />
          <Text style={styles.headerTitle}>MED MONOLITH</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATwb2cgKqpWPWb1O-rKtPh0gGZ69u6I-Tqvx_30wkUbyjGTRaq8yMf53ZPuX9tzNrMZLoNZAjiNU1NQHlp8iUCOQhGRMQuXzVquS7qtPv1j5bT-VFuKwBOaqf-VafcABUWK1CvFABMu1ypoKODEvSsUjPpLyJKP4QtvTYWQ467ugYouIPA9IuFQYveTcAI8BJw_EjBD-WAulalLr5X0JT4Wlxab-0UQvkbza8prwQbpti73g2cE9yNuBgs5MDfR3GPPzeJ_Tn6BKuH' }}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search and Filter - flex gap-2 */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color={colors.onSurfaceVariant} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search records, labs, doctors..."
              placeholderTextColor={colors.outlineVariant}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options" size={16} color={colors.primary} />
            <Text style={styles.filterBtnText}>FILTERS</Text>
          </TouchableOpacity>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>HEALTH RECORDS & ACTIVITY</Text>
          <Text style={styles.sortLabel}>SORT BY: RECENT</Text>
        </View>

        {/* Records List - space-y-3 */}
        <View style={styles.recordsList}>
          {records.map((record) => (
            <View key={record.id} style={[styles.recordCard, { borderLeftColor: record.borderColor }]}>
              <View style={styles.recordHeader}>
                <View style={styles.recordInfo}>
                  <Text style={[styles.recordDateLabel, { color: record.borderColor }]}>
                    {record.dateLabel}
                  </Text>
                  <Text style={styles.recordTitle}>{record.title}</Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name={record.icon as any} size={20} color={record.iconColor} />
                </TouchableOpacity>
              </View>
              
              {record.provider && (
                <Text style={styles.recordProvider}>{record.provider}</Text>
              )}
              
              {record.description && (
                <Text style={styles.recordDesc}>{record.description}</Text>
              )}
              
              {record.metrics && (
                <View style={styles.metricsGrid}>
                  {record.metrics.map((metric, idx) => (
                    <View key={idx} style={styles.metricBox}>
                      <Text style={styles.metricLabel}>{metric.label}</Text>
                      <Text style={[styles.metricValue, metric.isError && styles.metricError]}>
                        {metric.value}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
              
              {record.note && (
                <View style={styles.noteBox}>
                  <Text style={styles.noteText}>{record.note}</Text>
                </View>
              )}
              
              {record.tags && (
                <View style={styles.tagsRow}>
                  {record.tags.map((tag, idx) => (
                    <View key={idx} style={[styles.tag, { backgroundColor: tag.bg }]}>
                      <Text style={[styles.tagText, { color: tag.color }]}>{tag.label}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Load More Button */}
        <View style={styles.loadMoreContainer}>
          <TouchableOpacity>
            <Text style={styles.loadMoreText}>LOAD OLDER RECORDS</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
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
    height: 48, // h-12
    backgroundColor: colors.surface,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // gap-3
  },
  headerTitle: {
    fontSize: 18, // text-lg
    fontWeight: '900', // font-black
    color: colors.primary,
    letterSpacing: -0.5, // tracking-tighter
  },
  avatarContainer: {
    width: 32, // w-8
    height: 32, // h-8
    borderRadius: 16, // rounded-full
    backgroundColor: colors.surfaceContainerHighest,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}33`, // /20
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16, // px-4
    paddingTop: 16, // pt-4
  },
  searchSection: {
    flexDirection: 'row',
    gap: 8, // gap-2
    marginBottom: 20, // space-y-5
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 32, // h-8
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 2, // rounded-sm
    paddingHorizontal: 12, // pl-3 pr-4
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14, // text-sm
    color: colors.onSurface,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32, // h-8
    paddingHorizontal: 12, // px-3
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 2, // rounded-sm
    gap: 8, // gap-2
  },
  filterBtnText: {
    fontSize: 12, // text-xs
    fontWeight: '600', // font-semibold
    color: colors.primary,
    letterSpacing: 0.8, // tracking-wider
    textTransform: 'uppercase',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4, // px-1
    marginBottom: 16, // space-y-4
  },
  sectionTitle: {
    fontSize: 11, // text-[11px]
    fontWeight: '800', // font-extrabold
    color: `${colors.primary}B3`, // /70
    letterSpacing: 1.8, // tracking-[0.15em]
    textTransform: 'uppercase',
  },
  sortLabel: {
    fontSize: 10, // text-[10px]
    fontWeight: '700', // font-bold
    color: `${colors.onSurfaceVariant}66`, // /40
  },
  recordsList: {
    gap: 12, // space-y-3
  },
  recordCard: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: 16, // p-4
    borderRadius: 2, // rounded-sm
    borderLeftWidth: 4, // border-l-4
    // shadow-[0_4px_20px_rgba(126,96,191,0.06)]
    shadowColor: 'rgb(126,96,191)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 2,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8, // mb-2
  },
  recordInfo: {
    flex: 1,
  },
  recordDateLabel: {
    fontSize: 9, // text-[9px]
    fontWeight: '900', // font-black
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  recordTitle: {
    fontSize: 14, // text-sm
    fontWeight: '700', // font-bold
    color: colors.onSurface,
    marginTop: 4, // mt-1
  },
  recordProvider: {
    fontSize: 11, // text-[11px]
    fontWeight: '500', // font-medium
    color: colors.onSurfaceVariant,
  },
  recordDesc: {
    fontSize: 11, // text-[11px]
    color: colors.onSurfaceVariant,
    lineHeight: 16, // leading-relaxed
    marginTop: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    marginTop: 16, // mt-4
    gap: 12, // gap-3
  },
  metricBox: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    padding: 8, // p-2
    borderRadius: 2, // rounded-sm
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`, // /10
  },
  metricLabel: {
    fontSize: 8, // text-[8px]
    fontWeight: '700', // font-bold
    color: `${colors.onSurfaceVariant}99`, // /60
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 12, // text-xs
    fontWeight: '900', // font-black
    color: colors.onSurface,
    marginTop: 2, // mt-0.5
  },
  metricError: {
    color: colors.error,
  },
  noteBox: {
    marginTop: 12, // mt-3
    padding: 8, // p-2
    backgroundColor: colors.surfaceContainerLow,
    borderLeftWidth: 2, // border-l-2
    borderLeftColor: `${colors.primaryContainer}4D`, // /30
  },
  noteText: {
    fontSize: 10, // text-[10px]
    fontStyle: 'italic',
    color: `${colors.onSurfaceVariant}CC`, // /80
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8, // gap-2
    marginTop: 12, // mt-3
  },
  tag: {
    paddingHorizontal: 8, // px-2
    paddingVertical: 2, // py-0.5
    borderRadius: 2, // rounded-sm
  },
  tagText: {
    fontSize: 9, // text-[9px]
    fontWeight: '700', // font-bold
    textTransform: 'uppercase',
  },
  loadMoreContainer: {
    paddingVertical: 16, // py-4
    alignItems: 'center',
  },
  loadMoreText: {
    fontSize: 12, // text-xs
    fontWeight: '700', // font-bold
    color: colors.primary,
    letterSpacing: 1.5, // tracking-widest
    textTransform: 'uppercase',
  },
});
