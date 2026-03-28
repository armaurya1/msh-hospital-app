# GitHub Copilot Instructions for MSH Hospital App

## Project Overview
This is a React Native mobile application for MSH Hospital, built with Expo, TypeScript, and modern React Native practices.

## Tech Stack
- **Framework**: React Native with Expo (~55.0.10)
- **Language**: TypeScript (~5.9.2)
- **Routing**: Expo Router (~55.0.9)
- **UI**: React Native components, Ionicons
- **Animations**: React Native Reanimated (4.2.1)
- **SVG**: react-native-svg

## Code Style & Conventions
- Use TypeScript for all new files
- Use functional components with hooks
- Use StyleSheet.create() for styles
- Follow naming conventions:
  - Components: PascalCase (e.g., `PatientProfile.tsx`)
  - Files: kebab-case for screens, PascalCase for components
  - Variables: camelCase
- Add proper type definitions for props and state

## Design System
### Colors
- **Primary (Teal)**: `#3EBFB0`
- **Secondary (Lavender)**: `#8389BE` / `#C8B6E2`
- **Background**: `#FFFFFF` / `#D4E4E8` / `#C5DEE4`
- **Text Primary**: `#1A4D5C` / `#1A1A1A`
- **Text Secondary**: `#666` / `#999` / `#7A9AA5`
- **Border**: `#E5E5E5`
- **Placeholder**: `#B8C9D0`
- **Error**: `#FF0000`

### Typography
- **Headers**: 24-28px, weight: 600-700
- **Body**: 16px
- **Secondary**: 14-15px
- **Small**: 13px

### Components
- **Input height**: 56px
- **Border radius**: 8px (inputs), 12-24px (buttons/cards)
- **Button height**: 56px
- **Spacing**: Use multiples of 8 (8, 16, 20, 24, 32, 40)

## Authentication Flow
- Mobile number + OTP based authentication
- Flow: Login (mobile) → OTP Verification → Patient Profile → Home
- No email/password authentication

## File Structure
```
src/
├── app/
│   ├── (auth)/              # Authentication screens
│   ├── (profile)/           # Profile-related screens
│   ├── (tabs)/              # Main tab screens
│   └── _layout.tsx          # Root layout
├── components/              # Reusable components
│   ├── auth/               # Auth-specific components
│   └── common/             # Shared components
├── constants/              # App constants
└── hooks/                  # Custom hooks
```

## Figma Integration
When working with Figma designs:
- Use Figma tools to extract design tokens
- Maintain color consistency with design system
- Extract SVG assets when needed
- Use exact spacing and sizing from designs

## Best Practices
1. Always handle loading states
2. Show appropriate error messages
3. Use Platform-specific code when necessary
4. Optimize images and assets
5. Test on both iOS and Android
6. Use proper keyboard handling (KeyboardAvoidingView)
7. Implement proper navigation patterns
8. Use StatusBar appropriately

## Common Patterns
### Input Component
```typescript
<TextInput
  style={styles.input}
  placeholder="Enter text"
  placeholderTextColor="#B8C9D0"
  value={value}
  onChangeText={setValue}
/>
```

### Button Component
```typescript
<TouchableOpacity
  style={[styles.button, disabled && styles.buttonDisabled]}
  onPress={handlePress}
  disabled={disabled}
>
  <Text style={styles.buttonText}>Button Text</Text>
</TouchableOpacity>
```

## Figma Skills to Use
When implementing designs from Figma:
1. **figma-get_design_context**: Get complete design information including code, assets, and layout
2. **figma-get_screenshot**: Generate screenshots of specific nodes
3. **figma-get_metadata**: Get structure and hierarchy of designs
4. **figma-search_design_system**: Find design system components and variables
5. **figma-use_figma**: Create or modify designs directly in Figma

Always prefer using Figma tools to ensure design accuracy and consistency.
