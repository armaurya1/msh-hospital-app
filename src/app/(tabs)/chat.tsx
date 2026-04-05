import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated as RNAnimated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  FadeInDown,
  FadeIn,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Design colors — Lavender Clay Models
const colors = {
  primary: '#6547a4',
  primaryContainer: '#7e60bf',
  primaryLight: '#9b7fdb',
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
  white: '#ffffff',
  green: '#16a34a',
  greenLight: '#dcfce7',
};

interface Message {
  id: string;
  text: string;
  sender: 'patient' | 'doctor';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'prescription' | 'appointment';
}

const DOCTOR = {
  name: 'Dr. Sarah Jenkins',
  specialty: 'Senior Cardiologist',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC2o4WOxszqCwZ2OiAWAWg3UCoSpnzlk-WW49EZKu4a6MONfcqCp0sIBirhtZmqvz99ojWPR6GMt0NJTG2qxmURyp3qs2a32NSckZS1beEtuOeJVeus8RPidVmduJdood3oAtxF2wS6kdFP75D6ACx5sp-U6EUK9-gOkL8yD0rwdXDZdMMjLBzhU0osAtuRNAVxsWaegtxUz7T8xz9FetUiGbuG11eYWyiSgTiBtnaNz2qwC57JAGsTHS_I1i9Jr98TY0vqylZ7AUiP',
  isOnline: true,
};

const MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Good morning, Mr. Maurya! I have reviewed your latest ECG report. Everything looks stable.',
    sender: 'doctor',
    timestamp: '09:15 AM',
    status: 'read',
  },
  {
    id: '2',
    text: 'Thank you, Doctor! That is such a relief. I was a bit worried after the last checkup.',
    sender: 'patient',
    timestamp: '09:17 AM',
    status: 'read',
  },
  {
    id: '3',
    text: 'No need to worry. Your cholesterol levels have improved significantly. Keep following the prescribed diet plan.',
    sender: 'doctor',
    timestamp: '09:18 AM',
    status: 'read',
  },
  {
    id: '4',
    text: 'I do have a question — I have been experiencing occasional dizziness in the mornings. Is that related?',
    sender: 'patient',
    timestamp: '09:20 AM',
    status: 'read',
  },
  {
    id: '5',
    text: 'It could be due to the new blood pressure medication. Let me adjust the dosage slightly. I am sending an updated prescription.',
    sender: 'doctor',
    timestamp: '09:22 AM',
    status: 'read',
    type: 'text',
  },
  {
    id: '6',
    text: '💊 Updated Prescription\nLisinopril — Reduced to 5mg\nTake once daily, morning with food.\nDuration: 14 days, then reassess.',
    sender: 'doctor',
    timestamp: '09:23 AM',
    status: 'read',
    type: 'prescription',
  },
  {
    id: '7',
    text: 'Got it, thank you so much Doctor! Should I schedule a follow-up visit?',
    sender: 'patient',
    timestamp: '09:25 AM',
    status: 'read',
  },
  {
    id: '8',
    text: 'Yes, please book a follow-up in 2 weeks. We will check your BP levels and adjust if needed. Take care! 😊',
    sender: 'doctor',
    timestamp: '09:26 AM',
    status: 'read',
  },
];

// ─── Typing Indicator ───────────────────────────
function TypingIndicator() {
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    dot1.value = withRepeat(
      withSequence(
        withTiming(-4, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      false
    );
    dot2.value = withDelay(
      150,
      withRepeat(
        withSequence(
          withTiming(-4, { duration: 300 }),
          withTiming(0, { duration: 300 })
        ),
        -1,
        false
      )
    );
    dot3.value = withDelay(
      300,
      withRepeat(
        withSequence(
          withTiming(-4, { duration: 300 }),
          withTiming(0, { duration: 300 })
        ),
        -1,
        false
      )
    );
  }, []);

  const animDot1 = useAnimatedStyle(() => ({
    transform: [{ translateY: dot1.value }],
  }));
  const animDot2 = useAnimatedStyle(() => ({
    transform: [{ translateY: dot2.value }],
  }));
  const animDot3 = useAnimatedStyle(() => ({
    transform: [{ translateY: dot3.value }],
  }));

  return (
    <View style={styles.typingContainer}>
      <Image source={{ uri: DOCTOR.avatar }} style={styles.typingAvatar} />
      <View style={styles.typingBubble}>
        <Animated.View style={[styles.typingDot, animDot1]} />
        <Animated.View style={[styles.typingDot, animDot2]} />
        <Animated.View style={[styles.typingDot, animDot3]} />
      </View>
    </View>
  );
}

// ─── Message Bubble ─────────────────────────────
function MessageBubble({ message, showAvatar }: { message: Message; showAvatar: boolean }) {
  const isDoctor = message.sender === 'doctor';
  const isPrescription = message.type === 'prescription';

  const renderStatus = () => {
    if (!isDoctor) {
      switch (message.status) {
        case 'read':
          return <Ionicons name="checkmark-done" size={14} color={colors.primary} />;
        case 'delivered':
          return <Ionicons name="checkmark-done" size={14} color={colors.outline} />;
        default:
          return <Ionicons name="checkmark" size={14} color={colors.outline} />;
      }
    }
    return null;
  };

  return (
    <Animated.View
      entering={FadeInDown.duration(300).springify()}
      style={[
        styles.messageRow,
        isDoctor ? styles.messageRowDoctor : styles.messageRowPatient,
      ]}
    >
      {isDoctor && (
        <View style={styles.avatarSlot}>
          {showAvatar ? (
            <Image source={{ uri: DOCTOR.avatar }} style={styles.messageAvatar} />
          ) : (
            <View style={styles.avatarSpacer} />
          )}
        </View>
      )}

      <View
        style={[
          styles.messageBubble,
          isDoctor ? styles.doctorBubble : styles.patientBubble,
          isPrescription && styles.prescriptionBubble,
        ]}
      >
        {isPrescription && (
          <View style={styles.prescriptionHeader}>
            <View style={styles.prescriptionIcon}>
              <Ionicons name="document-text" size={16} color={colors.primary} />
            </View>
            <Text style={styles.prescriptionLabel}>DIGITAL PRESCRIPTION</Text>
          </View>
        )}
        <Text
          style={[
            styles.messageText,
            isDoctor ? styles.doctorText : styles.patientText,
            isPrescription && styles.prescriptionText,
          ]}
        >
          {message.text}
        </Text>
        <View style={styles.messageFooter}>
          <Text
            style={[
              styles.messageTime,
              isDoctor ? styles.doctorTime : styles.patientTime,
            ]}
          >
            {message.timestamp}
          </Text>
          {renderStatus()}
        </View>
        {isPrescription && (
          <TouchableOpacity style={styles.downloadPrescription}>
            <Ionicons name="download-outline" size={14} color={colors.primary} />
            <Text style={styles.downloadText}>Download PDF</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

// ─── Quick Action Pill ──────────────────────────
function QuickAction({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.quickAction} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={icon} size={16} color={colors.primary} />
      <Text style={styles.quickActionText}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── Main Screen ────────────────────────────────
export default function ChatScreen() {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>(MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Scroll to bottom on mount
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, []);

  const handleSend = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText.trim(),
      sender: 'patient',
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      status: 'sent',
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText('');

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate doctor typing
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1200);

    // Simulate doctor reply
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your message. I will review and get back to you shortly. Please don\'t hesitate to reach out if anything feels urgent.',
        sender: 'doctor',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
        status: 'read',
      };
      setMessages((prev) => [...prev, reply]);
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 4000);
  };

  // Group messages to show avatar only on first of consecutive doctor messages
  const shouldShowAvatar = (index: number) => {
    if (messages[index].sender !== 'doctor') return false;
    if (index === 0) return true;
    return messages[index - 1].sender !== 'doctor';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ─── Header ─────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerProfile} activeOpacity={0.8}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: DOCTOR.avatar }} style={styles.headerAvatar} />
            {DOCTOR.isOnline && <View style={styles.onlineDot} />}
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{DOCTOR.name}</Text>
            <Text style={styles.headerStatus}>
              {DOCTOR.isOnline ? 'Online' : 'Last seen 2h ago'}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="videocam-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="call-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="ellipsis-vertical" size={18} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ─── Consultation Banner ────────────── */}
      <Animated.View entering={FadeIn.delay(200)} style={styles.consultBanner}>
        <LinearGradient
          colors={[`${colors.primary}12`, `${colors.primaryContainer}08`] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.consultGradient}
        >
          <View style={styles.consultLeft}>
            <View style={styles.consultIconWrap}>
              <Ionicons name="shield-checkmark" size={14} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.consultTitle}>Secure Consultation</Text>
              <Text style={styles.consultSub}>End-to-end encrypted • HIPAA Compliant</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="information-circle-outline" size={18} color={colors.outline} />
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>

      {/* ─── Messages ───────────────────────── */}
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Date Separator */}
          <View style={styles.dateSeparator}>
            <View style={styles.dateLine} />
            <View style={styles.dateChip}>
              <Text style={styles.dateText}>Today</Text>
            </View>
            <View style={styles.dateLine} />
          </View>

          {messages.map((msg, index) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              showAvatar={shouldShowAvatar(index)}
            />
          ))}

          {isTyping && <TypingIndicator />}
        </ScrollView>

        {/* ─── Quick Actions ──────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickActionsScroll}
          contentContainerStyle={styles.quickActionsContent}
        >
          <QuickAction icon="calendar-outline" label="Book Follow-up" />
          <QuickAction icon="document-text-outline" label="Share Reports" />
          <QuickAction icon="medical-outline" label="Prescription" />
          <QuickAction icon="location-outline" label="Directions" />
        </ScrollView>

        {/* ─── Input Bar ─────────────────────── */}
        <View style={styles.inputBar}>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.attachBtn}>
              <Ionicons name="add-circle-outline" size={24} color={colors.outline} />
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor={colors.outline}
              value={messageText}
              onChangeText={setMessageText}
              multiline
              maxLength={1000}
            />
            <TouchableOpacity style={styles.emojiBtn}>
              <Ionicons name="happy-outline" size={22} color={colors.outline} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.sendBtn, messageText.trim() && styles.sendBtnActive]}
            onPress={handleSend}
            disabled={!messageText.trim()}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={
                messageText.trim()
                  ? ([colors.primary, colors.primaryContainer] as const)
                  : ([colors.surfaceContainerHigh, colors.surfaceContainerHigh] as const)
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.sendGradient}
            >
              <Ionicons
                name="send"
                size={18}
                color={messageText.trim() ? colors.white : colors.outline}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: colors.surfaceContainerLowest,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}20`,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    gap: 12,
  },
  avatarWrapper: {
    position: 'relative',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: `${colors.primary}20`,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.green,
    borderWidth: 2,
    borderColor: colors.surfaceContainerLowest,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    letterSpacing: -0.3,
  },
  headerStatus: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.green,
    marginTop: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 4,
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors.primary}08`,
  },

  // Consult Banner
  consultBanner: {
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  consultGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  consultLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  consultIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  consultTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  consultSub: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.outline,
    marginTop: 1,
  },

  // Messages
  keyboardView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
  },

  // Date Separator
  dateSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: `${colors.outlineVariant}30`,
  },
  dateChip: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 12,
  },
  dateText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.outline,
    letterSpacing: 0.3,
  },

  // Message Row
  messageRow: {
    flexDirection: 'row',
    marginBottom: 6,
    maxWidth: '88%',
  },
  messageRowDoctor: {
    alignSelf: 'flex-start',
  },
  messageRowPatient: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },

  // Avatar
  avatarSlot: {
    width: 32,
    marginRight: 8,
    alignSelf: 'flex-end',
    marginBottom: 2,
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: `${colors.primary}15`,
  },
  avatarSpacer: {
    width: 28,
    height: 28,
  },

  // Bubble
  messageBubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    maxWidth: '100%',
  },
  doctorBubble: {
    backgroundColor: colors.surfaceContainerLowest,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}18`,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  patientBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 6,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  prescriptionBubble: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: `${colors.primary}25`,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    borderBottomLeftRadius: 6,
  },

  // Prescription
  prescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}15`,
  },
  prescriptionIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: `${colors.primary}12`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prescriptionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
  },
  prescriptionText: {
    color: colors.onSurface,
    fontWeight: '500',
    lineHeight: 20,
  },
  downloadPrescription: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: `${colors.outlineVariant}15`,
    alignSelf: 'flex-start',
  },
  downloadText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },

  // Message Text
  messageText: {
    fontSize: 15,
    lineHeight: 21,
  },
  doctorText: {
    color: colors.onSurface,
  },
  patientText: {
    color: colors.white,
  },

  // Footer
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 4,
  },
  messageTime: {
    fontSize: 10,
    fontWeight: '600',
  },
  doctorTime: {
    color: `${colors.onSurfaceVariant}80`,
  },
  patientTime: {
    color: 'rgba(255,255,255,0.7)',
  },

  // Typing
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
    gap: 8,
  },
  typingAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: `${colors.primary}15`,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 18,
    borderBottomLeftRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}18`,
  },
  typingDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.primaryContainer,
  },

  // Quick Actions
  quickActionsScroll: {
    maxHeight: 44,
    borderTopWidth: 1,
    borderTopColor: `${colors.outlineVariant}10`,
  },
  quickActionsContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: `${colors.primary}08`,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: `${colors.primary}15`,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },

  // Input Bar
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'ios' ? 8 : 10,
    backgroundColor: colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: `${colors.outlineVariant}15`,
    gap: 8,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 24,
    paddingHorizontal: 6,
    paddingVertical: 4,
    minHeight: 44,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}20`,
  },
  attachBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: colors.onSurface,
    paddingVertical: 8,
    paddingHorizontal: 4,
    maxHeight: 100,
    lineHeight: 20,
  },
  emojiBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  sendBtnActive: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sendGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
