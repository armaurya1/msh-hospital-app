# GitHub Copilot Instructions for MSH Hospital App

## Project Overview
This is a React Native mobile application for MSH Hospital, built with Expo, TypeScript, and modern React Native practices.

## Tech Stack
- **Framework**: React Native with Expo (~55.0.10)
- **Language**: TypeScript (~5.9.2)
- **Routing**: Expo Router (~55.0.9)
- **UI**: React Native components, Ionicons
- **Animations**: React Native Reanimated (4.2.1)
- **SVG**: react-native-svg with react-native-svg-transformer

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
### Colors (Lavender Clay Models - Material 3)
- **Primary Purple**: `#6547a4`
- **Primary Container**: `#7e60bf`
- **Secondary Lavender**: `#8389BE` / `#C8B6E2`
- **Surface**: `#fbf8ff`
- **Surface Container**: `#efedf5`
- **Surface Container High**: `#e9e7ef`
- **On Surface**: `#1b1b21`
- **On Surface Variant**: `#494551`
- **Outline**: `#7a7582`
- **Outline Variant**: `#cbc4d3`
- **Tertiary**: `#635083`
- **Error/Emergency**: `#ba1a1a`
- **Placeholder**: `#B8C9D0`

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

## App Architecture

### File Structure
```
src/
├── app/
│   ├── (auth)/              # Authentication screens
│   │   ├── login.tsx        # Mobile number + OTP login
│   │   ├── verification.tsx # 6-digit OTP verification
│   │   ├── register.tsx     # User registration
│   │   ├── forgot-password.tsx
│   │   └── reset-password.tsx
│   ├── (profile)/           # Profile setup screens
│   │   └── patient-profile.tsx # Patient onboarding form
│   ├── (tabs)/              # Main tab screens
│   │   ├── home.tsx         # Dashboard with services
│   │   ├── doctors.tsx      # Expert directory search
│   │   ├── cart.tsx         # Pharmacy & lab cart
│   │   ├── order-medicine.tsx # Order medicines (Stitch design)
│   │   ├── book-appointment.tsx # Book doctor appointment (Stitch design)
│   │   ├── bookings.tsx     # Appointments (placeholder)
│   │   ├── records.tsx      # Health records (placeholder)
│   │   ├── emergency.tsx    # Ambulance services
│   │   └── profile.tsx      # User profile & settings
│   ├── _layout.tsx          # Root layout with splash
│   ├── index.tsx            # Entry router
│   └── explore.tsx          # Tutorial/documentation
├── components/              # Reusable components
│   ├── auth/               # Auth-specific components
│   │   ├── AuthButton.tsx
│   │   └── LoginIllustration.tsx
│   ├── common/             # Shared components
│   └── HospitalSplashScreen.tsx
├── constants/              # App constants
└── hooks/                  # Custom hooks
assets/
├── images/
│   ├── illustration/       # Medical illustrations (SVG)
│   ├── stitch-designs/     # Stitch design screenshots
│   └── tabIcons/          # Tab navigation icons
└── msh-logo.svg
```

### Navigation Structure
```
Root (_layout)
├── (auth) [Stack Navigation]
│   ├── login → index.tsx (default)
│   ├── register
│   ├── verification (modal)
│   ├── forgot-password (modal)
│   └── reset-password (modal)
├── (tabs) [Tab Navigation]
│   ├── home (grid icon)
│   ├── doctors (medkit icon)
│   ├── cart (cart icon)
│   ├── order-medicine (hidden - via navigation)
│   ├── book-appointment (hidden - via navigation)
│   ├── bookings (calendar - hidden)
│   ├── records (document - hidden)
│   ├── emergency (warning icon)
│   └── profile (person-circle icon)
├── (profile) [Stack Navigation]
│   └── patient-profile
├── index.tsx (entry router)
└── explore.tsx
```

### Authentication Flow
1. App starts → `/` → checks auth state
2. If not authenticated → `/(auth)/login` (send OTP)
3. → `/(auth)/verification` (verify OTP)
4. → `/(profile)/patient-profile` (complete profile) **[Skip in DEV_MODE]**
5. → `/` → `/(tabs)/home` (main app)

## Development Configuration

### DEV_MODE Flag
In `src/app/(auth)/verification.tsx`, there's a `DEV_MODE` constant:
- `DEV_MODE = true`: Skips patient profile form, goes directly to home
- `DEV_MODE = false`: Normal flow through patient profile

### Running the App
```bash
npm start          # Start Expo dev server
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # Web browser
```

## Screen Summaries

### Auth Screens
- **Login**: Mobile number input with +91 prefix, 10-digit validation
- **Verification**: 6-digit OTP with auto-focus, 30s resend timer
- **Register**: Name, email, password with T&C checkbox

### Main Screens
- **Home Dashboard**: Quick actions grid, health services, promotions
- **Doctors**: Specialty filters, doctor cards with ratings & booking
- **Cart**: Pharmacy items, lab tests, bill details, checkout
- **Emergency**: Red-themed ambulance call (24/7, 8-12 min response)
- **Profile**: Premium member card, stats, settings, security options

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

### SVG Import (with transformer)
```typescript
import MyIllustration from '@/assets/images/illustration/my-image.svg';
// Use as component: <MyIllustration width="100%" height="100%" />
```

## Stitch Instructions

Get the images and code for the following Stitch project's screens:

### Project
- **Title**: My Appointments
- **ID**: 11887516994924425019

### Screens
1. **Order Medicine (Simplified)** - ID: `8abadcd62b314843ada43d42647b8588`
2. **Book Appointment** - ID: `dc41d743ecb84eb2b03f10d29038c784`
3. **Personal Details Form** - ID: `9081651514d947cf801a02f53d460e4c`
4. **Booking Confirmation** - ID: `df3bdfa7920c4f9eb7a3f0fc33f1c194`
5. **Home Care Catalog** - ID: `ed5243cb6f454717b7570d6f839fa7b8`
6. **Health Records Timeline** - ID: `f7008fe6799f48bebfc25483fcdf3066`

### Stitch Design-to-Code Workflow

When generating screens from Stitch, follow these steps:

1. **Fetch Screen Data**: Use Stitch MCP tool `stitch-get_screen` with projectId and screenId
   ```
   stitch-get_screen(
     name: "projects/{projectId}/screens/{screenId}",
     projectId: "11887516994924425019",
     screenId: "{screenId}"
   )
   ```

2. **Extract Design Assets**:
   - **Screenshot URL**: Download from `screenshotUrl` using `curl -L`
   - **HTML/CSS Code**: The response includes `htmlCssCode` with complete design markup
   - **Design Tokens**: Extract colors, fonts, spacing from the HTML/CSS

3. **Use HTML/CSS Design File**:
   - The Stitch response provides a complete HTML/CSS design in markdown format
   - **IMPORTANT**: Use this HTML/CSS code as the source of truth for exact styling
   - Convert HTML elements to React Native components
   - Convert CSS properties to React Native StyleSheet equivalents
   - Match all colors, spacing, typography exactly from the CSS

4. **CSS to React Native Conversion Guide**:
   | CSS Property | React Native Equivalent |
   |--------------|------------------------|
   | `display: flex` | Default for View |
   | `flex-direction` | `flexDirection` |
   | `justify-content` | `justifyContent` |
   | `align-items` | `alignItems` |
   | `padding: 16px` | `padding: 16` |
   | `margin: 8px 16px` | `marginVertical: 8, marginHorizontal: 16` |
   | `border-radius` | `borderRadius` |
   | `background-color` | `backgroundColor` |
   | `font-size` | `fontSize` |
   | `font-weight` | `fontWeight` (use strings: '400', '700') |
   | `color` | `color` |
   | `box-shadow` | `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius` |

5. **Save Design Reference**:
   - Download screenshots to `/assets/images/stitch-designs/`
   - Name format: `{screen-name}.png`

### MCP Server Configuration
The Stitch MCP server is configured at `/home/codespace/.copilot/mcp-config.json`:
```json
{
  "mcpServers": {
    "stitch": {
      "type": "http",
      "url": "https://stitch.googleapis.com/mcp",
      "headers": {
        "X-Goog-Api-Key": "YOUR_API_KEY"
      }
    }
  }
}
```

### Available Stitch MCP Tools
- `stitch-list_projects` - List all projects
- `stitch-get_project` - Get project details
- `stitch-list_screens` - List screens in a project
- `stitch-get_screen` - Get screen details including HTML/CSS code
- `stitch-generate_screen_from_text` - Generate new screen from prompt
- `stitch-edit_screens` - Edit existing screens
- `stitch-create_design_system` - Create design system
- `stitch-apply_design_system` - Apply design system to screens
