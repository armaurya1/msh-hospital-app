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

// Design colors - Lavender Clay Models
const colors = {
  primary: '#6547a4',
  primaryContainer: '#7e60bf',
  surface: '#fbf8ff',
  surfaceContainerLow: '#f5f2fa',
  surfaceContainer: '#efedf5',
  onSurface: '#1b1b21',
  onSurfaceVariant: '#494551',
  outline: '#7a7582',
  outlineVariant: '#cbc4d3',
  white: '#ffffff',
  success: '#2e7d32',
};

interface MedicineItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag?: string;
}

const medicines: MedicineItem[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    description: '20 Tabs',
    price: 12.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE3fmj_3Cg3-Xka1jMbGDd9nTi8fAl4Df7YkP_5RwGH9kXQRvMQZPn0NWTp_8ZhWnQwBGNH2VlTkjT5Q',
    tag: 'TYPHOID',
  },
  {
    id: '2',
    name: 'Salbutamol Inhaler',
    description: '200 Doses',
    price: 28.90,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0CCqZJhvqfr9-RaCUqHZhOwhn3VmVJJW-jhjZhKfsM3uoQ_8xM6zKwI0WCLqnqcRfqqsC1BOn5t2AWMH7',
    tag: 'WHEEZE',
  },
  {
    id: '3',
    name: 'Amoxicillin 250mg',
    description: '15 Capsules',
    price: 18.75,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDirR2b1KpTWNWJ0R__fgeQrYXHnkjJ3_9e9yJBT8GkiL4FnjfHyoNlWDI0HI6YiTAUzut7uX2SNBm8',
    tag: 'ANTIBIOTIC',
  },
];

const MedicineCard: React.FC<{ item: MedicineItem; onAdd: () => void }> = ({ item, onAdd }) => (
  <View style={styles.medicineCard}>
    <View style={styles.medicineImageContainer}>
      <Image source={{ uri: item.image }} style={styles.medicineImage} resizeMode="contain" />
    </View>
    {item.tag && (
      <View style={styles.tagContainer}>
        <Text style={styles.tagText}>{item.tag}</Text>
      </View>
    )}
    <Text style={styles.medicineName}>{item.name}</Text>
    <Text style={styles.medicineDesc}>{item.description}</Text>
    <View style={styles.priceRow}>
      <Text style={styles.medicinePrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Ionicons name="add" size={18} color={colors.white} />
      </TouchableOpacity>
    </View>
  </View>
);

export default function OrderMedicineScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<MedicineItem[]>([]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddToCart = (item: MedicineItem) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MSH PHARMACY</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/(tabs)/cart')}>
          <View style={styles.cartIconContainer}>
            <Ionicons name="cart-outline" size={24} color={colors.onSurface} />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.outline} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medicines, wellness, brands..."
            placeholderTextColor={colors.outline}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Upload Prescription Card */}
        <View style={styles.prescriptionCard}>
          <View style={styles.prescriptionContent}>
            <Text style={styles.prescriptionTitle}>Order via Prescription</Text>
            <Text style={styles.prescriptionDesc}>
              Upload a photo of your prescription and we'll handle the rest.
            </Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Ionicons name="cloud-upload-outline" size={16} color={colors.primary} />
              <Text style={styles.uploadButtonText}>UPLOAD NOW</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.prescriptionImageContainer}>
            <Ionicons name="document-text" size={48} color={colors.primaryContainer} />
          </View>
        </View>

        {/* Rapid Dispatch Banner */}
        <View style={styles.dispatchBanner}>
          <Ionicons name="flash" size={20} color={colors.primary} />
          <Text style={styles.dispatchTitle}>Rapid Dispatch</Text>
          <View style={styles.expressBadge}>
            <Text style={styles.expressBadgeText}>EXPRESS</Text>
          </View>
          <Text style={styles.dispatchDesc}>Delivery in 60 minutes for eligible locations.</Text>
        </View>

        {/* Top Requisitions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>TOP REQUISITIONS</Text>
        </View>

        <View style={styles.medicineGrid}>
          {medicines.map((item) => (
            <MedicineCard key={item.id} item={item} onAdd={() => handleAddToCart(item)} />
          ))}
        </View>

        {/* Bottom spacing for cart bar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Cart Bottom Bar */}
      {cartItems.length > 0 && (
        <View style={styles.cartBar}>
          <View style={styles.cartInfo}>
            <View style={styles.cartItemCount}>
              <Ionicons name="cart" size={18} color={colors.white} />
              <Text style={styles.cartItemCountText}>{cartItems.length} ITEMS ADDED</Text>
            </View>
            <Text style={styles.cartTotal}>${cartTotal.toFixed(2)} + Taxes</Text>
          </View>
          <TouchableOpacity 
            style={styles.proceedButton}
            onPress={() => router.push('/(tabs)/cart')}
          >
            <Text style={styles.proceedButtonText}>PROCEED TO CART</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>
      )}
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
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: colors.onSurface,
  },
  prescriptionCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  prescriptionContent: {
    flex: 1,
  },
  prescriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 6,
  },
  prescriptionDesc: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: 14,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },
  uploadButtonText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  prescriptionImageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 12,
    marginLeft: 12,
  },
  dispatchBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    gap: 8,
  },
  dispatchTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  expressBadge: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  expressBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  dispatchDesc: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    width: '100%',
    marginTop: 2,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  medicineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  medicineCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  medicineImageContainer: {
    height: 100,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 12,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicineImage: {
    width: '80%',
    height: '80%',
  },
  tagContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  medicineName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 2,
  },
  medicineDesc: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicinePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingBottom: 24,
  },
  cartInfo: {
    flex: 1,
  },
  cartItemCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cartItemCountText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  cartTotal: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  proceedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  proceedButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
});
