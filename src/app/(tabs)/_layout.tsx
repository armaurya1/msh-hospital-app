import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  primary: '#6547a4',
  primaryContainer: '#7e60bf',
  onSurfaceVariant: '#49454f',
  surface: '#ffffff',
  outlineVariant: '#cbc4d3',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primaryContainer,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: `${colors.outlineVariant}30`,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: -0.3,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="doctors"
        options={{
          title: 'Doctors',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'medkit' : 'medkit-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'cart' : 'cart-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          href: null, // Hide from tab bar but keep accessible
          title: 'Bookings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'calendar' : 'calendar-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          href: null, // Hide from tab bar but keep accessible
          title: 'Records',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'document-text' : 'document-text-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="order-medicine"
        options={{
          href: null, // Hidden - accessible via navigation
          title: 'Order Medicine',
        }}
      />
      <Tabs.Screen
        name="book-appointment"
        options={{
          href: null, // Hidden - accessible via navigation
          title: 'Book Appointment',
        }}
      />
      <Tabs.Screen
        name="personal-details"
        options={{
          href: null, // Hidden - accessible via navigation
          title: 'Personal Details',
        }}
      />
      <Tabs.Screen
        name="booking-confirmation"
        options={{
          href: null, // Hidden - accessible via navigation
          title: 'Booking Confirmation',
        }}
      />
      <Tabs.Screen
        name="home-care-catalog"
        options={{
          href: null, // Hidden - accessible via navigation
          title: 'Home Care',
        }}
      />
      <Tabs.Screen
        name="health-records-timeline"
        options={{
          href: null, // Hidden - accessible via navigation
          title: 'Health Records Timeline',
        }}
      />
      <Tabs.Screen
        name="personal-information"
        options={{
          href: null, // Hidden - accessible via navigation
          title: 'Personal Information',
        }}
      />
      <Tabs.Screen
        name="medical-history"
        options={{
          href: null, // Hidden - accessible via navigation
          title: 'Medical History',
        }}
      />
      <Tabs.Screen
        name="insurance-details"
        options={{
          href: null, // Hidden - accessible via navigation
          title: 'Insurance Details',
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          href: null, // Hidden - accessible via navigation
          title: 'Chat',
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          title: 'Emergency',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'warning' : 'warning-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person-circle' : 'person-circle-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
