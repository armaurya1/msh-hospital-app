# MSH Hospital Mobile App

A React Native mobile application for MSH Hospital, built with Expo and featuring a stunning animated splash screen.

## 🚀 Features

- **Animated Splash Screen**: Professional hospital branding with smooth animations
- **Cross-Platform**: Runs on iOS, Android, and Web
- **Modern Stack**: Built with Expo Router, React Native Reanimated, and TypeScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- For iOS development: Xcode (Mac only)
- For Android development: Android Studio

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
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

After starting the development server, you can run the app on:

- **iOS Simulator** (Mac only):
  ```bash
  npm run ios
  ```
  Or press `i` in the terminal after running `npm start`

- **Android Emulator**:
  ```bash
  npm run android
  ```
  Or press `a` in the terminal after running `npm start`

- **Web Browser**:
  ```bash
  npm run web
  ```
  Or press `w` in the terminal after running `npm start`

- **Physical Device**: Scan the QR code with the Expo Go app
  - [iOS - Expo Go on App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Android - Expo Go on Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

## 📂 Project Structure

```
my-app/
├── src/
│   ├── app/                    # App screens (Expo Router)
│   │   ├── _layout.tsx        # Root layout with splash screen
│   │   ├── index.tsx          # Home screen
│   │   └── explore.tsx        # Explore screen
│   ├── components/            # Reusable components
│   │   ├── msh-splash-screen.tsx  # Custom splash screen
│   │   └── msh-logo.tsx           # MSH Hospital logo
│   ├── constants/             # App constants
│   └── hooks/                 # Custom React hooks
├── assets/                    # Images, fonts, and other assets
│   ├── msh-logo.svg          # MSH Hospital logo file
│   └── images/               # App images
├── app.json                   # Expo configuration
├── package.json              # Dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## 🎨 Splash Screen

The app features a custom animated splash screen with:
- Animated lavender square with rotation and scaling effects
- MSH Hospital logo with smooth entrance animation
- Text reveal with "MSH HOSPITAL" branding
- Decorative line and loading dot animations
- Floating particle effects
- Smooth fade-to-white transition

**Duration**: ~5.4 seconds

The splash screen is built with React Native Reanimated for optimal 60fps performance.

## 🔧 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device (Mac only)
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint for code quality
- `npm run reset-project` - Reset the project to initial state

## 📦 Key Dependencies

- **expo**: ~55.0.10 - Expo framework
- **react**: 19.2.0 - React library
- **react-native**: 0.83.4 - React Native framework
- **react-native-reanimated**: 4.2.1 - Animations library
- **react-native-svg**: Latest - SVG rendering
- **expo-router**: ~55.0.9 - File-based routing
- **typescript**: ~5.9.2 - Type safety

## 🔄 Development Workflow

1. **Start development server**:
   ```bash
   npm start
   ```

2. **Make changes**: Edit files in the `src/` directory

3. **See changes**: Changes will hot-reload automatically

4. **Test on multiple platforms**: Use Expo Go or simulators

## 🏗️ Building for Production

### Android (APK/AAB)
```bash
npx expo build:android
```

### iOS (IPA)
```bash
npx expo build:ios
```

### Using EAS Build (Recommended)
```bash
npm install -g eas-cli
eas build --platform all
```

For more details, see [Expo Build Documentation](https://docs.expo.dev/build/introduction/).

## 🎯 Customization

### Updating the Splash Screen

1. **Logo**: Replace `assets/msh-logo.svg` with your logo
2. **Colors**: Edit colors in `src/components/msh-splash-screen.tsx`:
   - Background: `#FDFCFF` (line 269)
   - Square color: `#C8B6E2` (line 278)
3. **Animation timing**: Adjust durations in the `useEffect` hook

### Adding New Screens

Create new files in `src/app/` directory. Expo Router will automatically create routes:
```typescript
// src/app/about.tsx
export default function AboutScreen() {
  return <View>...</View>;
}
```

Access via: `/about`

## 🐛 Troubleshooting

### Module not found errors
```bash
npm install
npx expo start -c
```

### SVG not rendering
Ensure `react-native-svg` is properly installed:
```bash
npx expo install react-native-svg
```

### Animation issues
Clear cache and restart:
```bash
npx expo start -c
```

## 📄 License

[Add your license here]

## 👥 Contributing

[Add contribution guidelines]

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Contact: [your-email@example.com]

## 🎓 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://expo.github.io/router/docs/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

---

**Built with ❤️ for MSH Hospital**
