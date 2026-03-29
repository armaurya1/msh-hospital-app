import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import LabSampleIllustration from '@/assets/images/illustration/lab-sample.svg';

const { width } = Dimensions.get('window');

// Professional color palette
const colors = {
  primary: '#6547a4',
  primaryLight: '#7e60bf',
  primaryDark: '#4A3280',
  surface: '#FAFAFA',
  surfaceDim: '#F5F5F5',
  cardBg: '#FFFFFF',
  onSurface: '#1A1A1A',
  onSurfaceSecondary: '#5A5A5A',
  outline: '#E0E0E0',
  outlineLight: '#F0F0F0',
  error: '#D32F2F',
  white: '#FFFFFF',
};

interface QuickActionProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  isEmergency?: boolean;
  onPress?: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, label, isEmergency, onPress }) => (
  <TouchableOpacity 
    style={styles.quickAction} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[styles.quickActionIconWrapper, isEmergency && styles.quickActionIconEmergency]}>
      <Ionicons name={icon} size={24} color={isEmergency ? colors.error : colors.primary} />
    </View>
    <Text style={[styles.quickActionLabel, isEmergency && styles.quickActionLabelEmergency]}>
      {label}
    </Text>
  </TouchableOpacity>
);

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
  LocalImage?: React.FC<{ width: number | string; height: number | string }>;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, price, imageUrl, LocalImage }) => (
  <TouchableOpacity style={styles.serviceCard} activeOpacity={0.8}>
    <View style={styles.serviceImageContainer}>
      {LocalImage ? (
        <LocalImage width="100%" height="100%" />
      ) : imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.serviceImage} />
      ) : null}
    </View>
    <View style={styles.serviceContent}>
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceDescription}>{description}</Text>
      <Text style={styles.servicePrice}>{price}</Text>
    </View>
  </TouchableOpacity>
);

export default function HomeDashboard() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <Ionicons name="medical" size={22} color={colors.white} />
          </View>
          <Text style={styles.headerTitle}>MSH Hospital</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="notifications-outline" size={22} color={colors.onSurface} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB44zVo7LJ5EeVncIKnVECJMtW_zy7dGx3LwCg1oCqQx5jNqOTLZZAIHpTjbIcCJDTOkL-Nds_OPa0SECoK4iRPiWhvXissZgFM0bF0eSI9-2Qn8msWBzM_jv7jdM1nfjFhODBQOpZQyG6oxGudIYklWhrk4r_unGXYV1qPdFTJSxB5z0Thzwe78jJhNaOn-kcBRE33HbEXCNFwfgn14L9nFPnkufGB6KjKUaf2NfxGt0cjP_uzMR44lpQ7CvIKy5IIw6z3QNvGvTyQ' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={colors.onSurfaceSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search doctors, services, medicines..."
              placeholderTextColor={colors.onSurfaceSecondary}
            />
            <TouchableOpacity>
              <Ionicons name="mic-outline" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity Card */}
        <TouchableOpacity style={styles.recentActivityCard} activeOpacity={0.9}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark] as const}
            style={styles.recentActivityGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.recentActivityContent}>
              <Text style={styles.recentActivityLabel}>RECENT ACTIVITY</Text>
              <Text style={styles.recentActivityTitle}>Complete Lipid Profile</Text>
              <Text style={styles.recentActivityMeta}>Pathology Lab #402 • 2h ago</Text>
              <TouchableOpacity style={styles.viewReportBtn}>
                <Text style={styles.viewReportText}>View Report</Text>
                <Ionicons name="arrow-forward" size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <QuickAction 
              icon="calendar-outline" 
              label="Book Appointment"
              onPress={() => router.push('/(tabs)/book-appointment')}
            />
            <QuickAction 
              icon="medkit-outline" 
              label="Order Medicines"
              onPress={() => router.push('/(tabs)/order-medicine')}
            />
            <QuickAction 
              icon="flask-outline" 
              label="Lab Tests"
              onPress={() => router.push('/(tabs)/home-care-catalog')}
            />
            <QuickAction 
              icon="videocam-outline" 
              label="Tele Consult"
            />
            <QuickAction 
              icon="document-text-outline" 
              label="Health Records"
              onPress={() => router.push('/(tabs)/health-records-timeline')}
            />
            <QuickAction 
              icon="call-outline" 
              label="Emergency"
              isEmergency 
              onPress={() => router.push('/(tabs)/emergency')}
            />
          </View>
        </View>

        {/* Promotional Banner */}
        <TouchableOpacity style={styles.promoBanner} activeOpacity={0.9}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBTPmWVcC3BYYYUm-4Yb3fGGRvt9VFXjL9dMlRJZD-fX_-8Iw-nNCz71Klq4VMBJUMgBUqjplU5R3ZrjAQLFlM2KQinkAvVvfwXt3EQfCz9ZPnkZ0tTF7EjnUdNO6o1OEMEAennlL0OS1nS1LPMRQ9V01173m9NI4htjRwKG1zSbCr5D3F0T5aLM63iJ5bSKgmanfxbQ6ul-KlT4dDFwe6SWwcEeM9UEtUemGrRyKCOc8mcbrBIOs4FtqM1TbW0jvW-PYEt2MeFina' }}
            style={styles.promoBannerBg}
          />
          <LinearGradient
            colors={['rgba(101,71,164,0.92)', 'rgba(74,50,128,0.95)'] as const}
            style={styles.promoBannerOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.5 }}
          />
          <View style={styles.promoBannerContent}>
            <View style={styles.promoTag}>
              <Text style={styles.promoTagText}>HEALTH PLUS</Text>
            </View>
            <Text style={styles.promoTitle}>Comprehensive Cardiac Screening</Text>
            <Text style={styles.promoDescription}>
              ECG, Lipid Profile, Stress Test & Expert Consultation. Save 40% this weekend.
            </Text>
            <TouchableOpacity style={styles.promoBtn}>
              <Text style={styles.promoBtnText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Home Care Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Home Care Services</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/home-care-catalog')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
            <ServiceCard
              title="Critical Care Nursing"
              description="24/7 Professional monitoring"
              price="₹2,499/day"
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuA1XjsWJKmgCXLXpBmSWpsm6PLXpbaGbq1OymfS9R8eVkSPjPYG5E5joqdtZXjMaMeZwl7MNQdg3EGMSRTI7R-ER2uOJzaR4g-3Af93ibG7n_hLAXBo_EfVt5pil3jC1MLFaxmenBjCwipp0h51nItZX7rgeTyy9Iz4zOl1IDXBbOoHOnzSNHU5-4VNqM3na8wBS3aCQq6UNMbjuB2SpXDtjPK2o7laNFrWcM9m4_CxGX88zAN62BThnqVJPGn-oOoj_HgAu7laF5pa"
            />
            <ServiceCard
              title="Post-Op Physiotherapy"
              description="Customized recovery plans"
              price="₹850/session"
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDirR2b1KpTWNWJ0R__fgeQrYXHnkjJ3_9e9yJBT8GkiL4FnjfHyoNlWDI0HI6YiTAUzut7uX2SNBm8-gGqhcAP1rLIcyPNvGB4c-RclFcFCpLMfS6TfWN-yU6ffCPiNy4RFrRdGsz0w-eI4a3LH45UdVcLcC5laFsRJOiYGWsGSa-Ikx6YRav7A6Dvj7_-nLE7rXtbN4sHvxywuyDBYqwqYBgATQxzIqZDev7FMaN_gMZ71mn9ReYc5UBvkuop28NLVfZ1mt2QK9JR"
            />
            <ServiceCard
              title="Home Sample Pickup"
              description="NABL accredited results"
              price="FREE"
              LocalImage={LabSampleIllustration}
            />
          </ScrollView>
        </View>

        {/* Health Intelligence Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Health Intelligence</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Medication Reminder */}
          <View style={styles.insightCard}>
            <View style={styles.insightIconWrapper}>
              <Ionicons name="medical-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Medication Reminder</Text>
              <Text style={styles.insightDescription}>Metformin 500mg • 8:00 PM today</Text>
            </View>
            <TouchableOpacity style={styles.insightBtn}>
              <Text style={styles.insightBtnText}>Mark Taken</Text>
            </TouchableOpacity>
          </View>

          {/* Activity Alert */}
          <View style={styles.insightCard}>
            <View style={styles.insightIconWrapper}>
              <Ionicons name="fitness-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Activity Alert</Text>
              <Text style={styles.insightDescription}>Step count 30% below weekly average</Text>
            </View>
            <Text style={styles.insightValue}>2,340</Text>
          </View>

          {/* Upcoming Appointment */}
          <View style={styles.insightCard}>
            <View style={styles.insightIconWrapper}>
              <Ionicons name="calendar-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Upcoming Appointment</Text>
              <Text style={styles.insightDescription}>Dr. Sarah Wilson • Tomorrow, 10:00 AM</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.onSurfaceSecondary} />
          </View>
        </View>

        {/* Bottom Spacing */}
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.outline,
  },
  scrollView: {
    flex: 1,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: colors.onSurface,
  },
  recentActivityCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  recentActivityGradient: {
    padding: 20,
  },
  recentActivityContent: {},
  recentActivityLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
    marginBottom: 8,
  },
  recentActivityTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  recentActivityMeta: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  viewReportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 16,
    gap: 6,
  },
  viewReportText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  quickAction: {
    width: (width - 64) / 3,
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outline,
  },
  quickActionIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: `${colors.primary}10`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickActionIconEmergency: {
    backgroundColor: `${colors.error}10`,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSurface,
    textAlign: 'center',
  },
  quickActionLabelEmergency: {
    color: colors.error,
  },
  promoBanner: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    minHeight: 160,
    overflow: 'hidden',
    position: 'relative',
  },
  promoBannerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  promoBannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  promoBannerContent: {
    padding: 20,
    zIndex: 10,
  },
  promoTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  promoTagText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8,
  },
  promoDescription: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  promoBtn: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  promoBtnText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  servicesScroll: {
    paddingLeft: 20,
  },
  serviceCard: {
    width: 180,
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  serviceImageContainer: {
    height: 100,
    backgroundColor: colors.surfaceDim,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
  },
  serviceContent: {
    padding: 12,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: colors.onSurfaceSecondary,
    marginBottom: 8,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  insightCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  insightIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: `${colors.primary}10`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 2,
  },
  insightDescription: {
    fontSize: 13,
    color: colors.onSurfaceSecondary,
  },
  insightBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  insightBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
  },
  insightValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
});
