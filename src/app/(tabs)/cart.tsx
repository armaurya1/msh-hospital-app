import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// Color palette from Stitch design
const COLORS = {
  primary: '#6547a4',
  primaryContainer: '#7e60bf',
  secondary: '#635a76',
  secondaryContainer: '#eaddff',
  tertiary: '#635083',
  tertiaryContainer: '#7c689d',
  surface: '#fbf8ff',
  surfaceContainer: '#efedf5',
  surfaceContainerLow: '#f5f2fa',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerHigh: '#e9e7ef',
  onSurface: '#1b1b21',
  onSurfaceVariant: '#494551',
  outline: '#7a7582',
  outlineVariant: '#cbc4d3',
  error: '#ba1a1a',
};

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  type: 'pharmacy' | 'lab';
}

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    description: 'Strip of 10 Tablets',
    price: 12.50,
    quantity: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQbZVmRb2lhJlS-3RItxl5I3L57B7nI7JVkr7B4SNcDoz8xEPV2bKZja10ww29SWVncLEnYFLBuSxwyjJUORrX-rqejFwWJ4dSzhXV83alel2l4wKQKROKD1x12v2aV-ll2BuQ6kVaBIrj4Bkd21ETtUO7AYD7_3zvNZp1gR6EvtO451HfJ04bSS5rCUgpTmwEn_dKsxbonnEE97TVpd4oW4ceYYht-IoLea-d3R2gbGhiPghbMLO-S1stqPw59NnCP-cQ2SZ9zl2U',
    type: 'pharmacy',
  },
  {
    id: '2',
    name: 'Salbutamol Inhaler',
    description: '100mcg (200 doses)',
    price: 45.00,
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnCDG3csMZiIQjvu7-N9I5S-Bt_Y11obhKRsxAmUw6Hyg4UfIxN2WGIhdd0P5XdhpwiyXsPh58K1LSsXKpUMC7WbLIyzs6OI_NDPViNytBUcjjlheIyP13--V93Y9J7QxQzuIYIHEQ1MP5c4ZT0NM9CI9o0jPltxj8S9pJSD8gthSjwzYGX5Tna19_tiXUu-51BYIia90rCYcYb-ubsQKdo2ZxQH4ecdQcuY0DsJOz3I6negg1N1x58RsvgAfhb-7-mUpSK8SWFuzP',
    type: 'pharmacy',
  },
];

interface LabTest {
  id: string;
  name: string;
  parameters: string;
  price: number;
}

const LAB_TEST: LabTest = {
  id: 'lab1',
  name: 'Ultra Full Body Checkup',
  parameters: '84 parameters included',
  price: 129.99,
};

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [labTest, setLabTest] = useState<LabTest | null>(LAB_TEST);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const removeLabTest = () => {
    setLabTest(null);
  };

  // Calculate totals
  const pharmacyTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const labTotal = labTest ? labTest.price : 0;
  const itemTotal = pharmacyTotal + labTotal;
  const deliveryFee = 0; // Free delivery
  const taxes = 4.50;
  const discount = 15.00;
  const grandTotal = itemTotal + deliveryFee + taxes - discount;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0) + (labTest ? 1 : 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={styles.itemCountBadge}>
          <Text style={styles.itemCountText}>{totalItems} ITEMS</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Pharmacy Items Section */}
        {cartItems.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Pharmacy Items</Text>
              <Text style={styles.sectionSubtitle}>SHIPS IN 24H</Text>
            </View>

            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <View style={styles.itemHeader}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemDescription}>{item.description}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => removeItem(item.id)}
                    >
                      <Ionicons name="trash-outline" size={18} color={COLORS.outline} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.itemFooter}>
                    <Text style={styles.itemPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                    <View style={styles.quantityControl}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, -1)}
                      >
                        <Ionicons name="remove" size={16} color={COLORS.primary} />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, 1)}
                      >
                        <Ionicons name="add" size={16} color={COLORS.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Lab Tests Section */}
        {labTest && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lab Tests</Text>
            <View style={styles.labTestItem}>
              <View style={styles.labTestLeft}>
                <View style={styles.labTestIcon}>
                  <Ionicons name="flask-outline" size={22} color={COLORS.tertiary} />
                </View>
                <View>
                  <Text style={styles.labTestName}>{labTest.name}</Text>
                  <Text style={styles.labTestParams}>{labTest.parameters}</Text>
                </View>
              </View>
              <View style={styles.labTestRight}>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={removeLabTest}
                >
                  <Ionicons name="close" size={18} color={COLORS.outline} />
                </TouchableOpacity>
                <Text style={styles.labTestPrice}>${labTest.price.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Bill Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill Details</Text>
          <View style={styles.billCard}>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Item Total</Text>
              <Text style={styles.billValue}>${itemTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Fee</Text>
              <Text style={styles.billValueFree}>FREE</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Taxes & Charges</Text>
              <Text style={styles.billValue}>${taxes.toFixed(2)}</Text>
            </View>
            <View style={styles.billDivider} />
            <View style={styles.billRow}>
              <Text style={styles.grandTotalLabel}>Grand Total</Text>
              <Text style={styles.grandTotalValue}>${grandTotal.toFixed(2)}</Text>
            </View>
          </View>

          {/* Promo Card */}
          <View style={styles.promoCard}>
            <View style={styles.promoLeft}>
              <Ionicons name="pricetag" size={16} color={COLORS.primary} />
              <Text style={styles.promoText}>PLATINUM_SAVER applied</Text>
            </View>
            <Text style={styles.promoDiscount}>-${discount.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.9}>
          <Text style={styles.checkoutButtonText}>Proceed to Payment</Text>
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: COLORS.surface,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: -0.3,
  },
  itemCountBadge: {
    backgroundColor: COLORS.primaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  itemCountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 140,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.outline,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(203, 196, 211, 0.1)',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.outline,
  },
  deleteButton: {
    padding: 4,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 4,
    gap: 12,
  },
  quantityButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  quantityText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  labTestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 12,
    padding: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(203, 196, 211, 0.1)',
  },
  labTestLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  labTestIcon: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: 'rgba(124, 104, 157, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labTestName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: 2,
  },
  labTestParams: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.outline,
  },
  labTestRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  removeButton: {
    padding: 2,
  },
  labTestPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },
  billCard: {
    backgroundColor: COLORS.surfaceContainer,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  billLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
  },
  billValue: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  billValueFree: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  billDivider: {
    height: 1,
    backgroundColor: 'rgba(203, 196, 211, 0.3)',
    marginVertical: 10,
  },
  grandTotalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.onSurface,
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
  },
  promoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(126, 96, 191, 0.1)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(101, 71, 164, 0.1)',
  },
  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  promoText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
  },
  promoDiscount: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.primary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(203, 196, 211, 0.1)',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 28,
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  checkoutButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
});
