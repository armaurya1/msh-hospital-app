import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G, Circle, Rect, Ellipse, Line, Polygon } from 'react-native-svg';

// Pediatrician illustration matching Figma design
// Doctor visiting child patient in hospital room
export function DoctorIllustration() {
  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%" viewBox="0 0 400 340" preserveAspectRatio="xMidYMid meet">
        {/* Background Floor */}
        <Ellipse cx="200" cy="310" rx="180" ry="30" fill="#F5F0FA" />
        
        {/* ============ WINDOW WITH CURTAINS ============ */}
        <G transform="translate(310, 30)">
          {/* Window frame */}
          <Rect x="0" y="0" width="65" height="85" fill="#E8E4F0" rx="3" />
          <Rect x="4" y="4" width="26" height="36" fill="#B8D4E8" />
          <Rect x="35" y="4" width="26" height="36" fill="#B8D4E8" />
          <Rect x="4" y="45" width="26" height="36" fill="#B8D4E8" />
          <Rect x="35" y="45" width="26" height="36" fill="#B8D4E8" />
          {/* Window frame lines */}
          <Line x1="32.5" y1="0" x2="32.5" y2="85" stroke="#D0D0D0" strokeWidth="2" />
          <Line x1="0" y1="42.5" x2="65" y2="42.5" stroke="#D0D0D0" strokeWidth="2" />
          {/* Curtains */}
          <Path d="M-8 0 Q -3 42, -12 85 L -5 85 Q 2 42, -3 0 Z" fill="#C8B6E2" opacity="0.8" />
          <Path d="M73 0 Q 68 42, 77 85 L 70 85 Q 63 42, 68 0 Z" fill="#C8B6E2" opacity="0.8" />
        </G>

        {/* ============ WALL DRAWINGS ============ */}
        {/* Drawing 1 - House picture */}
        <G transform="translate(15, 20)">
          <Rect x="0" y="0" width="55" height="45" fill="#FFFFFF" rx="2" stroke="#E0E0E0" strokeWidth="1" />
          <Path d="M10 35 L27.5 15 L45 35 L10 35" fill="#FFD699" stroke="#E5C088" strokeWidth="1" />
          <Rect x="22" y="25" width="11" height="10" fill="#87CEEB" />
          <Circle cx="40" cy="12" r="6" fill="#FFE066" />
        </G>
        {/* Drawing 2 - Abstract art */}
        <G transform="translate(15, 75)">
          <Rect x="0" y="0" width="45" height="35" fill="#FFFFFF" rx="2" stroke="#E0E0E0" strokeWidth="1" />
          <Circle cx="15" cy="17" r="8" fill="#FFB6C1" opacity="0.7" />
          <Circle cx="30" cy="17" r="8" fill="#87CEEB" opacity="0.7" />
          <Circle cx="22" cy="25" r="6" fill="#90EE90" opacity="0.7" />
        </G>

        {/* ============ SHELF WITH ITEMS ============ */}
        <G transform="translate(75, 40)">
          {/* Shelf board */}
          <Rect x="0" y="55" width="85" height="8" fill="#455A64" rx="2" />
          {/* Books */}
          <Rect x="5" y="30" width="14" height="25" fill="#8B7CB3" rx="1" />
          <Rect x="21" y="35" width="12" height="20" fill="#6B5B95" rx="1" />
          <Rect x="35" y="25" width="16" height="30" fill="#9B8EC3" rx="1" />
          <Rect x="53" y="38" width="10" height="17" fill="#7B6BA3" rx="1" />
          {/* Trophy */}
          <Path d="M70 55 L70 45 L66 45 L68 35 L75 30 L82 35 L84 45 L80 45 L80 55 Z" fill="#FFD700" />
          <Ellipse cx="75" cy="30" rx="6" ry="4" fill="#FFD700" />
        </G>

        {/* ============ SPEECH BUBBLE ============ */}
        <G transform="translate(165, 55)">
          <Rect x="0" y="0" width="45" height="45" fill="#8B7CB3" rx="10" />
          <Polygon points="18,45 22.5,55 27,45" fill="#8B7CB3" />
          {/* Medical cross */}
          <Rect x="13" y="12" width="19" height="7" fill="white" rx="1" />
          <Rect x="19" y="6" width="7" height="19" fill="white" rx="1" />
        </G>

        {/* ============ NIGHTSTAND/CABINET ============ */}
        <G transform="translate(15, 165)">
          {/* Cabinet body */}
          <Rect x="0" y="0" width="60" height="85" fill="#455A64" rx="3" />
          <Rect x="5" y="5" width="50" height="38" fill="#37474F" rx="2" />
          <Rect x="5" y="48" width="50" height="32" fill="#37474F" rx="2" />
          {/* Handles */}
          <Circle cx="30" cy="24" r="3" fill="#607D8B" />
          <Circle cx="30" cy="64" r="3" fill="#607D8B" />
          
          {/* Lamp on top */}
          <Rect x="35" y="-35" width="4" height="35" fill="#455A64" />
          <Path d="M25 -35 Q 37 -55, 49 -35 Z" fill="#C8B6E2" />
          <Ellipse cx="37" cy="-35" rx="12" ry="4" fill="#B8A6D2" />
          
          {/* Items on cabinet */}
          <Ellipse cx="22" cy="-5" rx="8" ry="5" fill="#FFFFFF" />
          <Path d="M30 -5 Q 35 -8, 35 -3 Q 35 2, 30 -1" stroke="#E0E0E0" strokeWidth="1.5" fill="none" />
          {/* Pills */}
          <Circle cx="48" cy="-4" r="3" fill="#FF6B6B" />
          <Circle cx="54" cy="-6" r="2.5" fill="#4ECDC4" />
        </G>

        {/* ============ SHADOWS ============ */}
        <Ellipse cx="200" cy="295" rx="120" ry="15" fill="#E0D6F0" opacity="0.5" />

        {/* ============ RUG ============ */}
        <Ellipse cx="210" cy="295" rx="70" ry="18" fill="#9B8EC3" opacity="0.4" />

        {/* ============ BED ============ */}
        <G transform="translate(95, 160)">
          {/* Bed frame back */}
          <Rect x="0" y="0" width="15" height="100" fill="#455A64" rx="2" />
          <Rect x="180" y="0" width="15" height="100" fill="#455A64" rx="2" />
          <Ellipse cx="7.5" cy="5" rx="6" ry="6" fill="#546E7A" />
          <Ellipse cx="187.5" cy="5" rx="6" ry="6" fill="#546E7A" />
          
          {/* Mattress */}
          <Rect x="15" y="30" width="165" height="55" fill="#7B68EE" rx="5" />
          
          {/* Blanket */}
          <Rect x="15" y="25" width="165" height="40" fill="#8B7CB3" rx="3" />
          <Path d="M15 50 Q 97 45, 180 50" stroke="#7B6BA3" strokeWidth="2" fill="none" />
          
          {/* Pillow */}
          <Ellipse cx="50" cy="30" rx="30" ry="12" fill="#FFFFFF" />
          <Path d="M25 30 Q 50 25, 75 30" stroke="#E8E8E8" strokeWidth="1" fill="none" />
        </G>

        {/* ============ CHILD PATIENT ============ */}
        <G transform="translate(140, 115)">
          {/* Body in bed */}
          <Rect x="0" y="45" width="50" height="35" fill="#455A64" rx="5" />
          {/* Head */}
          <Circle cx="25" cy="28" r="24" fill="#DEB887" />
          {/* Hair */}
          <Path d="M5 20 Q 10 0, 25 0 Q 40 0, 45 20 Q 38 12, 25 14 Q 12 12, 5 20" fill="#4A3728" />
          {/* Face */}
          <Circle cx="17" cy="28" r="2.5" fill="#4A3728" />
          <Circle cx="33" cy="28" r="2.5" fill="#4A3728" />
          <Path d="M18 38 Q 25 42, 32 38" stroke="#4A3728" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Rosy cheeks */}
          <Circle cx="12" cy="34" r="4" fill="#FFB6C1" opacity="0.5" />
          <Circle cx="38" cy="34" r="4" fill="#FFB6C1" opacity="0.5" />
        </G>

        {/* ============ TEDDY BEAR ============ */}
        <G transform="translate(200, 155)">
          {/* Body */}
          <Ellipse cx="12" cy="20" rx="12" ry="15" fill="#F5F5F5" />
          {/* Head */}
          <Circle cx="12" cy="5" r="10" fill="#F5F5F5" />
          {/* Ears */}
          <Circle cx="4" cy="-2" r="5" fill="#F5F5F5" />
          <Circle cx="20" cy="-2" r="5" fill="#F5F5F5" />
          <Circle cx="4" cy="-2" r="3" fill="#FFB6C1" />
          <Circle cx="20" cy="-2" r="3" fill="#FFB6C1" />
          {/* Face */}
          <Circle cx="8" cy="4" r="1.5" fill="#4A3728" />
          <Circle cx="16" cy="4" r="1.5" fill="#4A3728" />
          <Ellipse cx="12" cy="9" rx="3" ry="2" fill="#FFB6C1" />
          {/* Bow */}
          <Path d="M6 15 Q 12 18, 18 15 L 12 22 Z" fill="#8B7CB3" />
        </G>

        {/* ============ CHAIR ============ */}
        <G transform="translate(260, 130)">
          {/* Chair back */}
          <Rect x="0" y="0" width="50" height="70" fill="#455A64" rx="5" />
          {/* Seat */}
          <Rect x="-5" y="60" width="60" height="15" fill="#37474F" rx="3" />
          {/* Legs */}
          <Rect x="0" y="75" width="8" height="40" fill="#37474F" rx="2" />
          <Rect x="42" y="75" width="8" height="40" fill="#37474F" rx="2" />
        </G>

        {/* ============ DOCTOR ============ */}
        <G transform="translate(255, 70)">
          {/* White coat */}
          <Path d="M15 55 L10 135 L70 135 L65 55 Q 40 50, 15 55" fill="#FFFFFF" />
          {/* Coat collar */}
          <Path d="M25 55 L40 70 L55 55" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="1" />
          {/* Inner shirt/tie */}
          <Rect x="35" y="60" width="10" height="35" fill="#455A64" />
          
          {/* Head */}
          <Circle cx="40" cy="35" r="28" fill="#DEB887" />
          {/* Hair */}
          <Path d="M15 28 Q 20 5, 40 5 Q 60 5, 65 28 Q 58 18, 40 16 Q 22 18, 15 28" fill="#4A3728" />
          
          {/* Glasses */}
          <Circle cx="30" cy="35" r="9" stroke="#4A3728" strokeWidth="2.5" fill="none" />
          <Circle cx="50" cy="35" r="9" stroke="#4A3728" strokeWidth="2.5" fill="none" />
          <Line x1="39" y1="35" x2="41" y2="35" stroke="#4A3728" strokeWidth="2.5" />
          <Line x1="21" y1="33" x2="15" y2="30" stroke="#4A3728" strokeWidth="2" />
          <Line x1="59" y1="33" x2="65" y2="30" stroke="#4A3728" strokeWidth="2" />
          
          {/* Eyes behind glasses */}
          <Circle cx="30" cy="35" r="2.5" fill="#4A3728" />
          <Circle cx="50" cy="35" r="2.5" fill="#4A3728" />
          {/* Smile */}
          <Path d="M32 48 Q 40 54, 48 48" stroke="#4A3728" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {/* Stethoscope */}
          <Path d="M35 60 Q 25 80, 45 100" stroke="#E57373" strokeWidth="4" fill="none" />
          <Circle cx="45" cy="105" r="8" fill="#E57373" />
          <Circle cx="45" cy="105" r="4" fill="#455A64" />
          
          {/* Arm reaching toward patient */}
          <Path d="M65 65 Q 85 50, 75 30" stroke="#DEB887" strokeWidth="14" fill="none" strokeLinecap="round" />
          {/* Hand */}
          <Circle cx="73" cy="28" r="9" fill="#DEB887" />
        </G>

        {/* ============ MEDICAL BRIEFCASE ============ */}
        <G transform="translate(275, 230)">
          <Rect x="0" y="0" width="45" height="35" fill="#FFFFFF" rx="4" stroke="#E0E0E0" strokeWidth="1" />
          <Rect x="15" y="-5" width="15" height="8" fill="#E8E8E8" rx="2" />
          {/* Medical cross on briefcase */}
          <Rect x="13" y="10" width="19" height="6" fill="#8B7CB3" rx="1" />
          <Rect x="19" y="4" width="7" height="18" fill="#8B7CB3" rx="1" />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
});
