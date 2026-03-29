import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
};

interface InfoRowProps {
  label: string;
  value: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, icon }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <View style={styles.infoValueContainer}>
      {icon && <Ionicons name={icon} size={16} color={colors.primary} style={styles.infoIcon} />}
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

interface CoverageItemProps {
  title: string;
  covered: string;
  limit: string;
  used: string;
  percentage: number;
}

const CoverageItem: React.FC<CoverageItemProps> = ({
  title,
  covered,
  limit,
  used,
  percentage,
}) => (
  <View style={styles.coverageItem}>
    <View style={styles.coverageHeader}>
      <Text style={styles.coverageTitle}>{title}</Text>
      <View style={[styles.coveredBadge, { backgroundColor: covered === 'Yes' ? `${colors.green}15` : `${colors.outline}15` }]}>
        <Text style={[styles.coveredText, { color: covered === 'Yes' ? colors.green : colors.outline }]}>
          {covered === 'Yes' ? 'COVERED' : 'NOT COVERED'}
        </Text>
      </View>
    </View>
    <View style={styles.coverageDetails}>
      <View style={styles.coverageRow}>
        <Text style={styles.coverageLabel}>Annual Limit</Text>
        <Text style={styles.coverageValue}>{limit}</Text>
      </View>
      <View style={styles.coverageRow}>
        <Text style={styles.coverageLabel}>Used This Year</Text>
        <Text style={styles.coverageValue}>{used}</Text>
      </View>
    </View>
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.progressText}>{percentage}% utilized</Text>
    </View>
  </View>
);

export default function InsuranceDetailsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Insurance Details</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Insurance Card Preview */}
        <View style={styles.cardSection}>
          <LinearGradient
            colors={[colors.primary, colors.primaryContainer] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.insuranceCard}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardLogo}>
                <Ionicons name="shield-checkmark" size={24} color={colors.white} />
              </View>
              <View style={styles.cardBadge}>
                <Text style={styles.cardBadgeText}>PREMIUM</Text>
              </View>
            </View>
            <Text style={styles.cardProvider}>HDFC ERGO Health</Text>
            <Text style={styles.cardPlan}>Optima Secure Plus</Text>
            <View style={styles.cardNumber}>
              <Text style={styles.cardNumberText}>POLICY NO: HE-2024-78456321</Text>
            </View>
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardLabel}>MEMBER</Text>
                <Text style={styles.cardName}>ALOK MAURYA</Text>
              </View>
              <View style={styles.cardValidSection}>
                <Text style={styles.cardLabel}>VALID UNTIL</Text>
                <Text style={styles.cardDate}>DEC 2025</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Status Banner */}
        <View style={styles.statusBanner}>
          <View style={styles.statusIcon}>
            <Ionicons name="checkmark-circle" size={24} color={colors.green} />
          </View>
          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>Policy Active</Text>
            <Text style={styles.statusSubtitle}>All benefits are currently accessible</Text>
          </View>
        </View>

        {/* Policy Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>POLICY INFORMATION</Text>
          </View>
          <View style={styles.sectionContent}>
            <InfoRow label="Policy Number" value="HE-2024-78456321" />
            <InfoRow label="Insurance Provider" value="HDFC ERGO Health" />
            <InfoRow label="Plan Name" value="Optima Secure Plus" />
            <InfoRow label="Policy Type" value="Family Floater" />
            <InfoRow label="Sum Insured" value="₹10,00,000" />
            <InfoRow label="Start Date" value="01 Jan 2024" />
            <InfoRow label="End Date" value="31 Dec 2025" />
            <InfoRow label="Premium" value="₹24,500 / year" />
          </View>
        </View>

        {/* Covered Members */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>COVERED MEMBERS</Text>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.memberItem}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberInitials}>AM</Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>Alok Maurya</Text>
                <Text style={styles.memberRelation}>Self • Primary Member</Text>
              </View>
              <View style={styles.memberBadge}>
                <Text style={styles.memberBadgeText}>PRIMARY</Text>
              </View>
            </View>
            <View style={styles.memberItem}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberInitials}>PM</Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>Priya Maurya</Text>
                <Text style={styles.memberRelation}>Spouse</Text>
              </View>
            </View>
            <View style={styles.memberItem}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberInitials}>RM</Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>Rahul Maurya</Text>
                <Text style={styles.memberRelation}>Son</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Coverage Details */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>COVERAGE DETAILS</Text>
          </View>
          <View style={styles.sectionContent}>
            <CoverageItem
              title="Hospitalization"
              covered="Yes"
              limit="₹10,00,000"
              used="₹45,000"
              percentage={4.5}
            />
            <CoverageItem
              title="Day Care Procedures"
              covered="Yes"
              limit="₹2,00,000"
              used="₹0"
              percentage={0}
            />
            <CoverageItem
              title="Pre-Hospitalization"
              covered="Yes"
              limit="₹50,000"
              used="₹12,500"
              percentage={25}
            />
            <CoverageItem
              title="Post-Hospitalization"
              covered="Yes"
              limit="₹50,000"
              used="₹8,000"
              percentage={16}
            />
            <CoverageItem
              title="OPD Coverage"
              covered="Yes"
              limit="₹25,000"
              used="₹6,200"
              percentage={24.8}
            />
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>CONTACT INSURANCE</Text>
          </View>
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Ionicons name="call-outline" size={20} color={colors.primary} />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>24x7 Helpline</Text>
                <Text style={styles.contactValue}>1800-266-4488</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.outline} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Ionicons name="mail-outline" size={20} color={colors.primary} />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>Email Support</Text>
                <Text style={styles.contactValue}>support@hdfcergo.com</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.outline} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Ionicons name="document-text-outline" size={20} color={colors.primary} />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>File a Claim</Text>
                <Text style={styles.contactValue}>Submit claim request online</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.outline} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Download Documents */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.downloadButton}>
            <Ionicons name="download-outline" size={20} color={colors.primary} />
            <Text style={styles.downloadButtonText}>Download Policy Document</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.downloadButton}>
            <Ionicons name="card-outline" size={20} color={colors.primary} />
            <Text style={styles.downloadButtonText}>Download E-Card</Text>
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
  editButton: {
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
  cardSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  insuranceCard: {
    borderRadius: 16,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cardBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 1,
  },
  cardProvider: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 0.5,
  },
  cardPlan: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    marginTop: 4,
  },
  cardNumber: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  cardNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 0.5,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    marginTop: 4,
  },
  cardValidSection: {
    alignItems: 'flex-end',
  },
  cardDate: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    marginTop: 4,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: `${colors.green}10`,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.green,
  },
  statusIcon: {
    marginRight: 14,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.green,
  },
  statusSubtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 2,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}10`,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  infoValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 6,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}10`,
  },
  memberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  memberInitials: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
  },
  memberRelation: {
    fontSize: 13,
    color: colors.outline,
    marginTop: 2,
  },
  memberBadge: {
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  memberBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  coverageItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}10`,
  },
  coverageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  coverageTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
  },
  coveredBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  coveredText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  coverageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  coverageRow: {},
  coverageLabel: {
    fontSize: 12,
    color: colors.outline,
  },
  coverageValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
    marginTop: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.outline,
    minWidth: 80,
    textAlign: 'right',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}10`,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: `${colors.primary}10`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  contactContent: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: colors.outline,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.onSurface,
    marginTop: 2,
  },
  buttonSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 12,
  },
  downloadButton: {
    flexDirection: 'row',
    height: 52,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surfaceContainerLowest,
  },
  downloadButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
});
