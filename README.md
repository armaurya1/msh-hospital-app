# MSH Hospital Mobile App 🏥

A professional React Native mobile application for MSH Hospital, built with Expo and featuring a stunning animated splash screen with smooth transitions.

![MSH Hospital Logo](./assets/msh-logo.svg)

## ✨ Features

- 🎨 **Custom Animated Splash Screen** - Professional hospital branding with smooth 5.4s animation sequence
- 📱 **Cross-Platform** - Runs seamlessly on iOS, Android, and Web
- ⚡ **Modern Stack** - Built with Expo Router, React Native Reanimated, and TypeScript
- 🎯 **60fps Performance** - Optimized animations using React Native Reanimated
- 🎭 **Beautiful Design** - Lavender color scheme (#C8B6E2) with elegant transitions

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/armaurya1/msh-hospital-app
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

## 📱 Running the App

After starting the development server, you have several options:

### Option 1: Physical Device (Easiest)
1. Install Expo Go app on your phone:
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Scan the QR code from the terminal

### Option 2: Simulators/Emulators

**iOS Simulator** (Mac only):
```bash
npm run ios
# or press 'i' in the terminal
```

**Android Emulator**:
```bash
npm run android
# or press 'a' in the terminal
```

**Web Browser**:
```bash
npm run web
# or press 'w' in the terminal
```

## 📂 Project Structure

```
my-app/
├── src/
│   ├── app/                       # App screens (Expo Router)
│   │   ├── _layout.tsx           # Root layout with splash screen
│   │   ├── index.tsx             # Home screen
│   │   └── explore.tsx           # Explore screen
│   ├── components/               # Reusable components
│   │   ├── msh-splash-screen.tsx # Custom animated splash screen
│   │   └── msh-logo.tsx          # MSH Hospital logo SVG
│   ├── constants/                # App constants
│   └── hooks/                    # Custom React hooks
├── assets/                       # Images, fonts, and other assets
│   ├── msh-logo.svg             # MSH Hospital logo file
│   └── images/                  # App images
├── app.json                      # Expo configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🎨 Splash Screen Animation

The app features a custom animated splash screen showcasing MSH Hospital branding:

### Animation Sequence (5.4 seconds):
1. **0-1.8s**: Lavender square grows, rotates, and transforms
2. **1.2-3.2s**: MSH logo fades in, scales, and moves to the left
3. **2.5-4.0s**: "MSH HOSPITAL" text reveals with clip-path effect
4. **3.8-4.8s**: Decorative line expands horizontally
5. **4.2s+**: Pulsing loading dot animation
6. **2.0s+**: Floating particles drift upward
7. **4.8-5.4s**: Smooth fade to white transition

**Technologies Used**:
- React Native Reanimated for 60fps animations
- Shared values and worklets for performance
- Custom timing and easing functions
- SVG rendering with react-native-svg

### Color Palette:
- **Background**: `#FDFCFF` (Off-white)
- **Primary**: `#C8B6E2` (Lavender)
- **Accent**: `#FFFFFF` (White)
- **Logo**: `#7B63B6` (Purple - from original SVG)

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the Expo development server |
| `npm run android` | Run on Android emulator/device |
| `npm run ios` | Run on iOS simulator/device (Mac only) |
| `npm run web` | Run in web browser |
| `npm run lint` | Run ESLint for code quality |
| `npm run reset-project` | Reset project to initial state |

## 📦 Key Dependencies

- **expo**: ~55.0.10 - Expo framework
- **react**: 19.2.0 - React library
- **react-native**: 0.83.4 - React Native framework
- **react-native-reanimated**: 4.2.1 - Animations library
- **react-native-svg**: Latest - SVG rendering
- **expo-router**: ~55.0.9 - File-based routing
- **typescript**: ~5.9.2 - Type safety

## 🎯 Customization

### Updating the Splash Screen

1. **Change Logo**:
   - Replace `assets/msh-logo.svg` with your logo
   - Update `src/components/msh-logo.tsx` with new paths

2. **Modify Colors**:
   Edit `src/components/msh-splash-screen.tsx`:
   ```typescript
   backgroundColor: '#FDFCFF',  // Line 269 - Background
   backgroundColor: '#C8B6E2',  // Line 278 - Square color
   color: '#FFFFFF',             // Text and decorative elements
   ```

3. **Adjust Animation Timing**:
   Modify duration values in the `useEffect` hook (lines 34-150)

4. **Change Hospital Name**:
   Update line 323 in `msh-splash-screen.tsx`:
   ```typescript
   <Animated.Text>YOUR HOSPITAL NAME</Animated.Text>
   ```

### Adding New Screens

Expo Router uses file-based routing. Create new files in `src/app/`:

```typescript
// src/app/about.tsx
export default function AboutScreen() {
  return (
    <View>
      <Text>About Screen</Text>
    </View>
  );
}
```

Access via: `/about`

## 🏗️ Building for Production

### Using EAS Build (Recommended)

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```

3. **Configure EAS**:
   ```bash
   eas build:configure
   ```

4. **Build for all platforms**:
   ```bash
   eas build --platform all
   ```

5. **Build for specific platform**:
   ```bash
   eas build --platform android
   eas build --platform ios
   ```

For more details, see [EAS Build Documentation](https://docs.expo.dev/build/introduction/).

## 🐛 Troubleshooting

### Module not found errors
```bash
npm install
npx expo start -c  # Clear cache
```

### SVG not rendering
Ensure `react-native-svg` is properly installed:
```bash
npx expo install react-native-svg
```

### Animation issues
Clear Metro bundler cache:
```bash
npx expo start -c
```

### iOS build issues
```bash
cd ios && pod install && cd ..
npx expo run:ios
```

### Android build issues
```bash
cd android && ./gradlew clean && cd ..
npx expo run:android
```

## 🔄 Development Workflow

1. **Start development**:
   ```bash
   npm start
   ```

2. **Make changes**: Edit files in `src/` directory

3. **Hot reload**: Changes appear automatically (Fast Refresh)

4. **Test on multiple platforms**: Use Expo Go or simulators

5. **Commit changes**:
   ```bash
   git add .
   git commit -m "Your message"
   git push
   ```

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/) - Learn about Expo features and APIs
- [React Native Documentation](https://reactnative.dev/) - Core React Native concepts
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animation library
- [TypeScript Guide](https://docs.expo.dev/guides/typescript/) - Using TypeScript with Expo

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For questions and support:
- 📧 Email: support@mshhospital.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/msh-hospital-app/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/msh-hospital-app/discussions)

## 🌟 Acknowledgments

- Expo team for the amazing framework
- React Native community for continuous improvements
- Design inspiration from modern healthcare apps

---

**Built with ❤️ for MSH Hospital**

*Making healthcare accessible through technology*
