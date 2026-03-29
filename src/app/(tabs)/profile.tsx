import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
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
  secondary: '#635a76',
  tertiary: '#635083',
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  white: '#ffffff',
  green: '#16a34a',
};

interface StatCardProps {
  label: string;
  value: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  borderColor: string;
  subtitleColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtitle,
  icon,
  borderColor,
  subtitleColor,
}) => (
  <View style={[styles.statCard, { borderLeftColor: borderColor }]}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <View style={styles.statSubtitleRow}>
      <Ionicons name={icon} size={12} color={subtitleColor} />
      <Text style={[styles.statSubtitle, { color: subtitleColor }]}>{subtitle}</Text>
    </View>
  </View>
);

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIconContainer}>
      <Ionicons name={icon} size={20} color={colors.primary} />
    </View>
    <Text style={styles.menuText}>{label}</Text>
    <Ionicons name="chevron-forward" size={18} color={colors.outline} />
  </TouchableOpacity>
);

interface SecurityItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  badge?: string;
  badgeColor?: string;
  isToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
}

const SecurityItem: React.FC<SecurityItemProps> = ({
  icon,
  label,
  badge,
  badgeColor = colors.primary,
  isToggle,
  toggleValue,
  onToggle,
}) => (
  <View style={styles.securityItem}>
    <View style={styles.securityContent}>
      <Ionicons name={icon} size={20} color={colors.secondary} />
      <Text style={styles.securityLabel}>{label}</Text>
    </View>
    {badge && (
      <View style={[styles.securityBadge, { backgroundColor: `${badgeColor}10` }]}>
        <Text style={[styles.securityBadgeText, { color: badgeColor }]}>{badge}</Text>
      </View>
    )}
    {isToggle && (
      <Switch
        value={toggleValue}
        onValueChange={onToggle}
        trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }}
        thumbColor={colors.white}
      />
    )}
  </View>
);

export default function ProfileScreen() {
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="document-text" size={22} color={colors.primary} />
          <Text style={styles.headerTitle}>MSH HOSPITAL</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ2lMiEjskG26RX1Jm0zb2MEJkCskJTTJobGNxjnyc2GdBZVzk5zoNe0xCBJMcj09mWPzJDIwrLV3tg8bCOAhE5bNETT3pgIEGPKlyWm1FT4GLARBs_WA_xzTZKjLSA9yiQO3xxIG1ifXlCZKl8PbKxDRfvUpKNs9b_MHO1ZpgsYYYWZeXHDA97wCRV4Ni4KPWvwlXuvO7VvmAOXzt9Tf2WfJsoqSFO-RnFO5_o_2DHg52h5_Uzi89Xnpf4_28AysAgOKF1bQH4Bv-',
            }}
            style={styles.headerAvatar}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header Card */}
        <View style={styles.profileCard}>
          {/* Gradient Background */}
          <View style={styles.gradientHeader}>
            <LinearGradient
              colors={[colors.primary, colors.primaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            />
          </View>

          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATSeyBFU1TmUqHkQ3zwX_KPhLwNYCe8R0bxpjzyfrdNN0fDmDG-dQaV-i3pBhBoK6nFDpQkFFN553bXyuBcCvDaGGLoszEip0R-yQ4ZLNYRwRhmlmrgtoh6fTFsaecGu6k1rjAwRepeF-1WnraSb1VfKp0VBXKJhHYqSDO8LMAuJSXQW7o3POUUJZAKFEkag_K1ipw058MYK9J-A_16tOl8861NB-9ERmGHYXU_txj4jnb8TPFMjQXvBhYTIxsC2jcJtsIVV6CVBqI',
              }}
              style={styles.profileAvatar}
            />
            <View style={styles.profileDetails}>
              <View style={styles.nameRow}>
                <Text style={styles.profileName}>Mr. Alok Maurya</Text>
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumText}>PREMIUM MEMBER</Text>
                </View>
              </View>
              <View style={styles.infoTags}>
                <View style={styles.infoTag}>
                  <Ionicons name="cube-outline" size={14} color={colors.primary} />
                  <Text style={styles.infoTagText}>3 Active Protocols</Text>
                </View>
                <View style={styles.infoTag}>
                  <Ionicons name="calendar-outline" size={14} color={colors.primary} />
                  <Text style={styles.infoTagText}>Last Checkup: 12 Oct</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <StatCard
            label="Completed Visits"
            value="24"
            subtitle="All records synchronized"
            icon="trending-up"
            borderColor={colors.primary}
            subtitleColor={colors.green}
          />
          <StatCard
            label="Active Medications"
            value="04"
            subtitle="Next dose in 2h 15m"
            icon="medical"
            borderColor={colors.primaryContainer}
            subtitleColor={colors.primaryContainer}
          />
          <StatCard
            label="Insurance Status"
            value="Full Access"
            subtitle="Valid until Dec 2025"
            icon="checkmark-circle"
            borderColor={colors.tertiary}
            subtitleColor={colors.tertiary}
          />
        </View>

        {/* Administrative & Medical Menu */}
        <View style={styles.menuSection}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuHeaderText}>ADMINISTRATIVE & MEDICAL</Text>
          </View>
          <View style={styles.menuList}>
            <MenuItem 
              icon="person-outline" 
              label="Personal Information" 
              onPress={() => router.push('/(tabs)/personal-information')}
            />
            <MenuItem 
              icon="document-text-outline" 
              label="Medical History" 
              onPress={() => router.push('/(tabs)/medical-history')}
            />
            <MenuItem 
              icon="shield-checkmark-outline" 
              label="Insurance Details" 
              onPress={() => router.push('/(tabs)/insurance-details')}
            />
            <MenuItem icon="card-outline" label="Billing & Payments" />
          </View>
        </View>

        {/* Security & Privacy */}
        <View style={styles.securitySection}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuHeaderText}>SECURITY & PRIVACY</Text>
          </View>
          <View style={styles.securityGrid}>
            <SecurityItem
              icon="lock-closed-outline"
              label="Privacy Settings"
              badge="Optimized"
              badgeColor={colors.primary}
            />
            <SecurityItem
              icon="notifications-outline"
              label="Notifications"
              badge="All Active"
              badgeColor={colors.secondary}
            />
            <SecurityItem
              icon="finger-print"
              label="Biometric Login"
              isToggle
              toggleValue={biometricEnabled}
              onToggle={setBiometricEnabled}
            />
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={18} color={colors.onSurface} />
            <Text style={styles.logoutText}>SIGN OUT SECURELY</Text>
          </TouchableOpacity>
          <Text style={styles.versionText}>Version 4.2.0-Alpha · Clinical Node 02</Text>
        </View>

        {/* Bottom spacing */}
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
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainerLow,
    backgroundColor: colors.surface,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryContainer,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
  },
  gradientHeader: {
    height: 80,
  },
  gradient: {
    flex: 1,
    opacity: 0.9,
  },
  profileInfo: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginTop: -40,
    gap: 16,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: colors.surfaceContainerLowest,
    backgroundColor: colors.surfaceContainer,
  },
  profileDetails: {
    flex: 1,
    paddingTop: 44,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
    letterSpacing: -0.3,
  },
  premiumBadge: {
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: `${colors.primary}25`,
  },
  premiumText: {
    fontSize: 8,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1,
  },
  infoTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  infoTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: -0.3,
  },
  statsGrid: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
    padding: 12,
    borderRadius: 4,
    borderLeftWidth: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
    height: 100,
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: -1,
  },
  statSubtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statSubtitle: {
    fontSize: 8,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  menuSection: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 8,
    overflow: 'hidden',
  },
  menuHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}15`,
  },
  menuHeaderText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
  },
  menuList: {
    backgroundColor: colors.surfaceContainerLowest,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}10`,
    gap: 16,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  securitySection: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 8,
    overflow: 'hidden',
  },
  securityGrid: {
    backgroundColor: colors.surfaceContainerLowest,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}10`,
  },
  securityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  securityLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  securityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
  },
  securityBadgeText: {
    fontSize: 8,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: -0.3,
  },
  logoutSection: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}20`,
    gap: 8,
  },
  logoutText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.onSurface,
    letterSpacing: 1.5,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 8,
    fontWeight: '700',
    color: colors.outline,
    marginTop: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
