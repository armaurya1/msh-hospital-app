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
import { MshLogo } from '@/components/msh-logo';

// Design colors from Stitch HTML - Lavender Clay Models
const colors = {
  primary: '#6547a4',
  primaryContainer: '#7e60bf',
  primaryFixed: '#eaddff',
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
  tertiary: '#635083',
  tertiaryContainer: '#7c689d',
  green600: '#16a34a',
  green100: '#dcfce7',
  green700: '#15803d',
  yellow500: '#eab308',
};

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  shiftOrDuration?: string;
  shiftLabel?: string;
  rate: string;
  rateLabel?: string;
  tag?: string;
  tagColor?: string;
  tagBg?: string;
  buttonText: string;
  featured?: boolean;
}

const services: ServiceItem[] = [
  {
    id: '1',
    title: 'CRITICAL CARE NURSING',
    description: 'Specialized ICU-trained nurses for round-the-clock monitoring and clinical intervention.',
    icon: 'pulse',
    iconColor: colors.primary,
    iconBg: `${colors.primaryContainer}33`,
    shiftLabel: 'SHIFT',
    shiftOrDuration: '12h / 24h',
    rateLabel: 'RATE',
    rate: '$120 / day',
    tag: 'AVAILABLE',
    tagColor: colors.primary,
    tagBg: colors.primaryFixed,
    buttonText: 'BOOK SERVICE',
    featured: true,
  },
  {
    id: '2',
    title: 'POST-OP PHYSIOTHERAPY',
    description: 'Tailored recovery programs for orthopedic and cardiac surgical cases by certified therapists.',
    icon: 'fitness',
    iconColor: colors.secondary,
    iconBg: `${colors.secondaryContainer}4D`,
    shiftLabel: 'DURATION',
    shiftOrDuration: '45-60 Mins',
    rateLabel: 'RATE',
    rate: '$45 / session',
    buttonText: 'SCHEDULE VISIT',
  },
  {
    id: '3',
    title: 'LAB AT HOME',
    description: 'Convenient blood and sample collection by phlebotomists. Reports delivered digitally in 6-12 hours.',
    icon: 'flask',
    iconColor: colors.tertiary,
    iconBg: `${colors.tertiaryContainer}33`,
    shiftLabel: 'PICKUP',
    shiftOrDuration: 'Within 90m',
    rateLabel: 'FEE',
    rate: 'FREE COLLECTION',
    tag: 'NABL',
    tagColor: colors.green700,
    tagBg: colors.green100,
    buttonText: 'ORDER LAB TEST',
  },
  {
    id: '4',
    title: 'ELDERLY CARE',
    description: 'Compassionate daily assistance focusing on mobility, hygiene, and companionship for seniors.',
    icon: 'heart',
    iconColor: colors.primaryContainer,
    iconBg: `${colors.primaryContainer}1A`,
    shiftLabel: 'STAFF',
    shiftOrDuration: 'General Caregiver',
    rateLabel: 'PLAN',
    rate: 'Starts at $650',
    buttonText: 'INQUIRY',
  },
];

const filterOptions = ['All Services', 'Nursing', 'Physio', 'Medical Equipment', 'Diagnostics', 'Caregivers'];

export default function HomeCareCatalogScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Services');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top App Bar - h-12 sticky */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MshLogo width={28} height={28} fill={colors.primary} />
          <Text style={styles.headerTitle}>MSH HOSPITAL</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="search" size={20} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search & Filter Section - mb-6 space-y-4 */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={`${colors.onSurfaceVariant}B3`} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search home care services..."
              placeholderTextColor={`${colors.onSurfaceVariant}80`}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          {/* Filter Chips - flex gap-2 overflow-x-auto */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.filterScroll}
            contentContainerStyle={styles.filterContent}
          >
            {filterOptions.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterChip,
                  activeFilter === filter && styles.filterChipActive
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                {filter === 'All Services' && activeFilter === filter && (
                  <Ionicons name="grid" size={14} color={colors.surfaceContainerLowest} />
                )}
                <Text style={[
                  styles.filterChipText,
                  activeFilter === filter && styles.filterChipTextActive
                ]}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Banner - mb-8 h-48 rounded-sm */}
        <View style={styles.featuredBanner}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkwKxsUJzfAsjEcML-9F7CN0YqAFlAVmhK8yLj5LoRdtrf-AkZptGouI4pOddGbVqh9yxuxko8lxlNbgJX29o3PilGoNQ4ECyI0F3Kf2Cq3iqETIODgNBSfgbXRbjUuid1rWP2xKvVgvb3ANYC7zrQsDGcnKWe0KZesH8FFMALTYRj9BX4l6XZvvRWWhgdRYwsBYygIFzRLW--wJDyczYZ4nS3q9Qo8RtoxK2UiFnWuTjiECGM50nd9x_ZihnKILcy_hm61fodyOkp' }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerGradient} />
          <View style={styles.bannerContent}>
            <View style={styles.premiumTag}>
              <Text style={styles.premiumTagText}>PREMIUM SERVICE</Text>
            </View>
            <Text style={styles.bannerTitle}>PREMIUM HOME ICU SETUP</Text>
            <Text style={styles.bannerDesc}>
              Complete critical care infrastructure with 24/7 specialist supervision and advanced monitoring equipment.
            </Text>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>CONFIGURE SETUP</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Services Grid - gap-4 */}
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <View 
              key={service.id} 
              style={[
                styles.serviceCard,
                service.featured && styles.serviceCardFeatured
              ]}
            >
              <View style={styles.serviceHeader}>
                <View style={[styles.serviceIcon, { backgroundColor: service.iconBg }]}>
                  <Ionicons name={service.icon as any} size={20} color={service.iconColor} />
                </View>
                {service.tag && (
                  <View style={[styles.serviceTag, { backgroundColor: service.tagBg }]}>
                    <Text style={[styles.serviceTagText, { color: service.tagColor }]}>{service.tag}</Text>
                  </View>
                )}
              </View>
              
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDesc}>{service.description}</Text>
              
              <View style={styles.serviceDetails}>
                <View style={styles.serviceDetailItem}>
                  <Text style={styles.serviceDetailLabel}>{service.shiftLabel}</Text>
                  <Text style={styles.serviceDetailValue}>{service.shiftOrDuration}</Text>
                </View>
                <View style={[styles.serviceDetailItem, styles.serviceDetailBorder]}>
                  <Text style={styles.serviceDetailLabel}>{service.rateLabel}</Text>
                  <Text style={[
                    styles.serviceDetailValue, 
                    styles.serviceDetailRate,
                    service.rate.includes('FREE') && styles.serviceDetailFree
                  ]}>{service.rate}</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.serviceBtn}>
                <Text style={styles.serviceBtnText}>{service.buttonText}</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Medical Equipment Rental - md:col-span-2 */}
          <View style={styles.equipmentCard}>
            <View style={styles.equipmentMain}>
              <View style={styles.equipmentIcon}>
                <Ionicons name="medkit" size={20} color={colors.onSurfaceVariant} />
              </View>
              <Text style={styles.equipmentTitle}>MEDICAL EQUIPMENT RENTAL</Text>
              <Text style={styles.equipmentDesc}>
                High-grade hospital equipment for home use. Free delivery, installation, and technical orientation.
              </Text>
              <View style={styles.equipmentTags}>
                <View style={styles.equipmentTagItem}>
                  <Text style={styles.equipmentTagText}>OXYGEN CONCENTRATORS</Text>
                </View>
                <View style={styles.equipmentTagItem}>
                  <Text style={styles.equipmentTagText}>BIPAP/CPAP</Text>
                </View>
                <View style={styles.equipmentTagItem}>
                  <Text style={styles.equipmentTagText}>HOSPITAL BEDS</Text>
                </View>
                <View style={styles.equipmentTagItem}>
                  <Text style={styles.equipmentTagText}>WHEELCHAIRS</Text>
                </View>
              </View>
            </View>
            <View style={styles.equipmentPromo}>
              <Text style={styles.equipmentPromoLabel}>WEEKLY SPECIAL</Text>
              <Text style={styles.equipmentPromoValue}>5-Day</Text>
              <Text style={styles.equipmentPromoSub}>Trial Period</Text>
              <TouchableOpacity style={styles.equipmentBtn}>
                <Text style={styles.equipmentBtnText}>VIEW INVENTORY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats Section - mt-8 grid-cols-4 gap-3 */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>ACTIVE CASES</Text>
            <View style={styles.statRow}>
              <Text style={styles.statValue}>124</Text>
              <Text style={styles.statChange}>+4%</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>CAREGIVERS</Text>
            <View style={styles.statRow}>
              <Text style={styles.statValue}>82</Text>
              <Text style={[styles.statChange, { color: colors.primary }]}>Online</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>AVG. RESPONSE</Text>
            <View style={styles.statRow}>
              <Text style={styles.statValue}>18m</Text>
              <Text style={[styles.statChange, { color: colors.tertiary }]}>Global</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>SERVICE RATING</Text>
            <View style={styles.statRow}>
              <Text style={styles.statValue}>4.92</Text>
              <Ionicons name="star" size={10} color={colors.yellow500} />
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB - fixed bottom-20 right-6 */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="headset" size={24} color={colors.surfaceContainerLowest} />
      </TouchableOpacity>
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
    gap: 8, // gap-2
  },

  headerTitle: {
    fontSize: 18, // text-lg
    fontWeight: '900', // font-black
    color: colors.primary,
    letterSpacing: -0.5, // tracking-tighter
    textTransform: 'uppercase',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12, // gap-3
  },
  headerBtn: {
    padding: 4, // p-1
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16, // px-4
  },
  searchSection: {
    marginBottom: 24, // mb-6
    gap: 16, // space-y-4
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40, // h-10
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 2, // rounded-sm
    paddingHorizontal: 12, // pl-10 pr-4
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14, // text-sm
    fontWeight: '500', // font-medium
    color: colors.onSurface,
  },
  filterScroll: {
    marginTop: 16,
  },
  filterContent: {
    gap: 8, // gap-2
    paddingBottom: 4, // pb-1
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6, // gap-1.5
    backgroundColor: colors.surfaceContainerHighest,
    paddingHorizontal: 12, // px-3
    paddingVertical: 6, // py-1.5
    borderRadius: 2, // rounded-sm
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    fontSize: 12, // text-xs
    fontWeight: '600', // font-semibold
    color: colors.onSurfaceVariant,
  },
  filterChipTextActive: {
    fontWeight: '700', // font-bold
    color: colors.surfaceContainerLowest,
  },
  featuredBanner: {
    position: 'relative',
    height: 192, // h-48
    borderRadius: 2, // rounded-sm
    overflow: 'hidden',
    backgroundColor: colors.primaryContainer,
    marginBottom: 32, // mb-8
  },
  bannerImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.4, // mix-blend-overlay opacity-40
  },
  bannerGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    opacity: 0.7,
  },
  bannerContent: {
    position: 'absolute',
    padding: 24, // px-6
    justifyContent: 'center',
    height: '100%',
  },
  premiumTag: {
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: 8, // px-2
    paddingVertical: 2, // py-0.5
    borderRadius: 2, // rounded-sm
    alignSelf: 'flex-start',
    marginBottom: 12, // mb-3
  },
  premiumTagText: {
    fontSize: 10, // text-[10px]
    fontWeight: '900', // font-black
    color: colors.primary,
    letterSpacing: 1.5, // tracking-widest
    textTransform: 'uppercase',
  },
  bannerTitle: {
    fontSize: 24, // text-2xl
    fontWeight: '900', // font-black
    color: colors.surfaceContainerLowest,
    letterSpacing: -0.5, // tracking-tighter
    marginBottom: 8, // mb-2
  },
  bannerDesc: {
    fontSize: 12, // text-xs
    fontWeight: '500', // font-medium
    color: 'rgba(255,255,255,0.9)', // opacity-90
    maxWidth: 280, // max-w-xs
    marginBottom: 16, // mb-4
  },
  bannerBtn: {
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: 16, // px-4
    paddingVertical: 8, // py-2
    borderRadius: 2, // rounded-sm
    alignSelf: 'flex-start',
  },
  bannerBtnText: {
    fontSize: 12, // text-xs
    fontWeight: '700', // font-bold
    color: colors.primary,
  },
  servicesGrid: {
    gap: 16, // gap-4
  },
  serviceCard: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: 16, // p-4
    borderRadius: 2, // rounded-sm
    borderLeftWidth: 2, // border-l-2
    borderLeftColor: 'transparent',
    // shadow-[0px_4px_20px_rgba(126,96,191,0.06)]
    shadowColor: 'rgb(126,96,191)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 2,
  },
  serviceCardFeatured: {
    borderLeftColor: colors.primary,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12, // space-y-3
  },
  serviceIcon: {
    width: 40, // p-2 approx
    height: 40,
    borderRadius: 2, // rounded-sm
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceTag: {
    paddingHorizontal: 8, // px-2
    paddingVertical: 2, // py-0.5
    borderRadius: 2, // rounded-sm
  },
  serviceTagText: {
    fontSize: 10, // text-[10px]
    fontWeight: '700', // font-bold
  },
  serviceTitle: {
    fontSize: 14, // text-sm
    fontWeight: '700', // font-bold
    color: colors.onSurface,
    letterSpacing: -0.3, // tracking-tight
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 11, // text-[11px]
    color: colors.onSurfaceVariant,
    lineHeight: 16, // leading-relaxed
    marginBottom: 12,
  },
  serviceDetails: {
    flexDirection: 'row',
    paddingVertical: 8, // py-2
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: `${colors.outlineVariant}26`, // /15
    gap: 16, // gap-4
  },
  serviceDetailItem: {
    flex: 1,
  },
  serviceDetailBorder: {
    borderLeftWidth: 1,
    borderLeftColor: `${colors.outlineVariant}26`,
    paddingLeft: 16, // pl-4
  },
  serviceDetailLabel: {
    fontSize: 9, // text-[9px]
    fontWeight: '700', // font-bold
    color: colors.outline,
    letterSpacing: 0.8, // tracking-wider
    textTransform: 'uppercase',
  },
  serviceDetailValue: {
    fontSize: 12, // text-xs
    fontWeight: '600', // font-semibold
    color: colors.onSurface,
    marginTop: 2,
  },
  serviceDetailRate: {
    fontWeight: '900', // font-black
    color: colors.primary,
  },
  serviceDetailFree: {
    color: colors.green600,
    textTransform: 'uppercase',
  },
  serviceBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 10, // py-2
    borderRadius: 8,
    marginTop: 16, // mt-4
    alignItems: 'center',
  },
  serviceBtnText: {
    fontSize: 11, // text-[11px]
    fontWeight: '700', // font-bold
    color: colors.surfaceContainerLowest,
    letterSpacing: 1.5, // tracking-widest
    textTransform: 'uppercase',
  },
  equipmentCard: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: 16,
    borderRadius: 2,
    shadowColor: 'rgb(126,96,191)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 2,
    flexDirection: 'row',
    gap: 24, // gap-6
  },
  equipmentMain: {
    flex: 1,
  },
  equipmentIcon: {
    width: 40,
    height: 40,
    borderRadius: 2,
    backgroundColor: `${colors.onSurfaceVariant}1A`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  equipmentTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
    letterSpacing: -0.3,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  equipmentDesc: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    lineHeight: 16,
    marginBottom: 8,
  },
  equipmentTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8, // gap-2
    marginTop: 8, // pt-2
  },
  equipmentTagItem: {
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}4D`, // /30
    borderRadius: 12, // rounded-full
    paddingHorizontal: 8, // px-2
    paddingVertical: 4, // py-1
  },
  equipmentTagText: {
    fontSize: 9, // text-[9px]
    fontWeight: '700', // font-bold
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  equipmentPromo: {
    backgroundColor: colors.surfaceContainer,
    padding: 12, // p-3
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
  },
  equipmentPromoLabel: {
    fontSize: 10, // text-[10px]
    fontWeight: '900', // font-black
    color: colors.primary,
    textTransform: 'uppercase',
    marginBottom: 4, // mb-1
  },
  equipmentPromoValue: {
    fontSize: 24, // text-2xl
    fontWeight: '900', // font-black
    color: colors.onSurface,
  },
  equipmentPromoSub: {
    fontSize: 10, // text-[10px]
    fontWeight: '700', // font-bold
    color: colors.onSurfaceVariant,
  },
  equipmentBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 8, // py-2
    paddingHorizontal: 16, // px-4
    borderRadius: 2,
    marginTop: 16, // mt-4
  },
  equipmentBtnText: {
    fontSize: 10, // text-[10px]
    fontWeight: '700', // font-bold
    color: colors.surfaceContainerLowest,
    letterSpacing: -0.3, // tracking-tighter
    textTransform: 'uppercase',
  },
  statsSection: {
    marginTop: 32, // mt-8
    flexDirection: 'row',
    gap: 12, // gap-3
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    padding: 12, // p-3
    borderRadius: 2, // rounded-sm
  },
  statLabel: {
    fontSize: 9, // text-[9px]
    fontWeight: '700', // font-bold
    color: colors.outline,
    letterSpacing: 1.5, // tracking-widest
    textTransform: 'uppercase',
    marginBottom: 4, // mb-1
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4, // gap-2
  },
  statValue: {
    fontSize: 20, // text-xl
    fontWeight: '900', // font-black
    color: colors.onSurface,
  },
  statChange: {
    fontSize: 9, // text-[9px]
    fontWeight: '700', // font-bold
    color: colors.green600,
    marginBottom: 2, // mb-0.5
  },
  fab: {
    position: 'absolute',
    bottom: 80, // bottom-20
    right: 24, // right-6
    width: 56, // w-14
    height: 56, // h-14
    borderRadius: 28, // rounded-full
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    // shadow-lg
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
});
