import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Design colors matching profile page
const colors = {
  primary: '#6547a4',
  primaryContainer: '#7e60bf',
  surface: '#fbf8ff',
  surfaceContainerLow: '#f5f2fa',
  surfaceContainerLowest: '#ffffff',
  surfaceContainer: '#efedf5',
  onSurface: '#1b1b21',
  onSurfaceVariant: '#494551',
  outline: '#7a7582',
  outlineVariant: '#cbc4d3',
  white: '#ffffff',
  green: '#16a34a',
  orange: '#ea580c',
  red: '#dc2626',
};

interface MedicalRecordProps {
  title: string;
  date: string;
  doctor: string;
  status: 'active' | 'resolved' | 'monitoring';
  type: 'diagnosis' | 'procedure' | 'allergy' | 'medication';
}

const MedicalRecord: React.FC<MedicalRecordProps> = ({
  title,
  date,
  doctor,
  status,
  type,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return colors.orange;
      case 'resolved':
        return colors.green;
      case 'monitoring':
        return colors.primary;
      default:
        return colors.outline;
    }
  };

  const getTypeIcon = (): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case 'diagnosis':
        return 'fitness-outline';
      case 'procedure':
        return 'cut-outline';
      case 'allergy':
        return 'alert-circle-outline';
      case 'medication':
        return 'medical-outline';
      default:
        return 'document-outline';
    }
  };

  return (
    <TouchableOpacity style={styles.recordCard}>
      <View style={[styles.recordIcon, { backgroundColor: `${colors.primary}10` }]}>
        <Ionicons name={getTypeIcon()} size={20} color={colors.primary} />
      </View>
      <View style={styles.recordContent}>
        <Text style={styles.recordTitle}>{title}</Text>
        <Text style={styles.recordMeta}>{doctor} • {date}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}15` }]}>
        <Text style={[styles.statusText, { color: getStatusColor() }]}>
          {status.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface AllergyItemProps {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  reaction: string;
}

const AllergyItem: React.FC<AllergyItemProps> = ({ name, severity, reaction }) => {
  const getSeverityColor = () => {
    switch (severity) {
      case 'severe':
        return colors.red;
      case 'moderate':
        return colors.orange;
      case 'mild':
        return colors.green;
      default:
        return colors.outline;
    }
  };

  return (
    <View style={styles.allergyItem}>
      <View style={styles.allergyHeader}>
        <Ionicons name="alert-circle" size={18} color={getSeverityColor()} />
        <Text style={styles.allergyName}>{name}</Text>
        <View style={[styles.severityBadge, { backgroundColor: `${getSeverityColor()}15` }]}>
          <Text style={[styles.severityText, { color: getSeverityColor() }]}>
            {severity.toUpperCase()}
          </Text>
        </View>
      </View>
      <Text style={styles.allergyReaction}>{reaction}</Text>
    </View>
  );
};

export default function MedicalHistoryScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical History</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>12</Text>
            <Text style={styles.summaryLabel}>Total Visits</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>3</Text>
            <Text style={styles.summaryLabel}>Active Conditions</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>4</Text>
            <Text style={styles.summaryLabel}>Medications</Text>
          </View>
        </View>

        {/* Allergies Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ALLERGIES & SENSITIVITIES</Text>
          </View>
          <View style={styles.sectionContent}>
            <AllergyItem
              name="Penicillin"
              severity="severe"
              reaction="Anaphylaxis, breathing difficulty"
            />
            <AllergyItem
              name="Sulfa Drugs"
              severity="moderate"
              reaction="Skin rash, itching"
            />
            <AllergyItem
              name="Latex"
              severity="mild"
              reaction="Mild skin irritation"
            />
          </View>
        </View>

        {/* Current Medications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>CURRENT MEDICATIONS</Text>
          </View>
          <View style={styles.sectionContent}>
            <MedicalRecord
              title="Metformin 500mg"
              date="Started Jan 2024"
              doctor="Dr. Sarah Wilson"
              status="active"
              type="medication"
            />
            <MedicalRecord
              title="Lisinopril 10mg"
              date="Started Mar 2024"
              doctor="Dr. James Chen"
              status="active"
              type="medication"
            />
            <MedicalRecord
              title="Atorvastatin 20mg"
              date="Started Nov 2023"
              doctor="Dr. Sarah Wilson"
              status="active"
              type="medication"
            />
            <MedicalRecord
              title="Vitamin D3 1000 IU"
              date="Started Sep 2023"
              doctor="Dr. Priya Sharma"
              status="active"
              type="medication"
            />
          </View>
        </View>

        {/* Medical Conditions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>MEDICAL CONDITIONS</Text>
          </View>
          <View style={styles.sectionContent}>
            <MedicalRecord
              title="Type 2 Diabetes"
              date="Diagnosed Aug 2022"
              doctor="Dr. Sarah Wilson"
              status="monitoring"
              type="diagnosis"
            />
            <MedicalRecord
              title="Hypertension"
              date="Diagnosed Mar 2023"
              doctor="Dr. James Chen"
              status="monitoring"
              type="diagnosis"
            />
            <MedicalRecord
              title="Vitamin D Deficiency"
              date="Diagnosed Sep 2023"
              doctor="Dr. Priya Sharma"
              status="resolved"
              type="diagnosis"
            />
          </View>
        </View>

        {/* Past Procedures */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>PAST PROCEDURES</Text>
          </View>
          <View style={styles.sectionContent}>
            <MedicalRecord
              title="Appendectomy"
              date="Jun 2018"
              doctor="Dr. Rajesh Kumar"
              status="resolved"
              type="procedure"
            />
            <MedicalRecord
              title="Dental Implant"
              date="Feb 2020"
              doctor="Dr. Anjali Patel"
              status="resolved"
              type="procedure"
            />
          </View>
        </View>

        {/* Family History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>FAMILY HISTORY</Text>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.familyItem}>
              <Text style={styles.familyRelation}>Father</Text>
              <Text style={styles.familyCondition}>Type 2 Diabetes, Heart Disease</Text>
            </View>
            <View style={styles.familyItem}>
              <Text style={styles.familyRelation}>Mother</Text>
              <Text style={styles.familyCondition}>Hypertension</Text>
            </View>
            <View style={styles.familyItem}>
              <Text style={styles.familyRelation}>Grandfather (Paternal)</Text>
              <Text style={styles.familyCondition}>Heart Disease</Text>
            </View>
          </View>
        </View>

        {/* Add Record Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color={colors.white} />
            <Text style={styles.addButtonText}>Add Medical Record</Text>
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
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainerLow,
    backgroundColor: colors.surface,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  summaryGrid: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    gap: 8,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}20`,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.primary,
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}15`,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
  },
  sectionContent: {
    backgroundColor: colors.surfaceContainerLowest,
  },
  recordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}10`,
  },
  recordIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  recordContent: {
    flex: 1,
  },
  recordTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
  },
  recordMeta: {
    fontSize: 12,
    color: colors.outline,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  allergyItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}10`,
  },
  allergyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  allergyName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  severityText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  allergyReaction: {
    fontSize: 13,
    color: colors.outline,
    marginTop: 8,
    marginLeft: 26,
  },
  familyItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}10`,
  },
  familyRelation: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  familyCondition: {
    fontSize: 13,
    color: colors.outline,
    marginTop: 4,
  },
  buttonSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
