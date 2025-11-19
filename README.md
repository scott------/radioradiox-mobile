# RadioRadioX Mobile App

A React Native mobile application for RadioRadioX internet radio station, built with Expo.

## Features

- **🎵 Live Radio Streaming**: Auto-play radio stream on app launch
- **💬 Talk Back**: Send requests, tips, or suggestions (no login required)
- **📱 Social Sharing**: Share RadioRadioX with friends (requires login)
- **🔐 Magic Link Authentication**: Passwordless email-based authentication
- **👤 User Profiles**: Personalized user experience
- **📲 Bottom Tab Navigation**: Easy access to all features

## Tech Stack

- React Native
- Expo
- React Navigation (Bottom Tabs)
- WebView for radio streaming
- AsyncStorage for local data
- Magic Link Authentication

## Color Scheme

The app follows RadioRadioX's brand guidelines:

- **Primary**: #000000 (Black)
- **Primary Text**: #dd3333 (Red)
- **Secondary**: #f5f5f5 (Light Gray)
- **Success**: #04a24c
- **Error**: #e21c3d
- **Warning**: #facd0c
- **Info**: #1c4d94

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Studio with emulator

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd rrx
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your platform:
```bash
npm run ios     # For iOS
npm run android # For Android
npm run web     # For web browser
```

## Project Structure

```
rrx/
├── App.js                      # Main app component with navigation
├── app.json                    # Expo configuration
├── package.json                # Dependencies and scripts
├── babel.config.js             # Babel configuration
├── .gitignore                  # Git ignore rules
├── assets/                     # Images and media files
│   ├── icon.png               # App icon (placeholder)
│   ├── splash.png             # Splash screen (placeholder)
│   ├── adaptive-icon.png      # Android adaptive icon (placeholder)
│   └── favicon.png            # Web favicon (placeholder)
└── src/
    ├── constants/
    │   └── colors.js          # Brand colors
    ├── context/
    │   └── AuthContext.js     # Authentication context
    └── screens/
        ├── RadioScreen.js     # Main radio player
        ├── ShareScreen.js     # Social sharing features
        ├── TalkBackScreen.js  # Feedback/contact form
        ├── ProfileScreen.js   # User profile
        └── OnboardingScreen.js # First-time user flow
```

## Usage

### First Launch

1. **Onboarding Flow**: New users see a welcome screen with:
   - App introduction
   - Name collection
   - Optional email for magic link authentication
   - Skip option to use as guest

### Main Features

#### Radio Tab
- Automatic radio stream playback
- Stream URL: https://www.ophanim.net:8444/s/9220
- Integrated web player via WebView
- Play/pause controls

#### Talk Back Tab
- Anonymous feedback form (no login required)
- Message types: Feedback, Song Request, Tips
- Optional name and email fields

#### Share Tab
- Requires authentication
- Share radio station with friends
- Share mobile app
- Social media links

#### Profile Tab
- View user information (when logged in)
- Account settings
- Preferences
- Sign out option
- Guest mode indicator

## Configuration

### Radio Stream URL

To change the radio stream URL, edit `src/screens/RadioScreen.js`:

```javascript
const RADIO_STREAM_URL = 'YOUR_STREAM_URL_HERE';
```

### Magic Link Authentication

The current implementation includes a placeholder for magic link authentication. To implement fully:

1. Set up a backend service (e.g., Supabase, Firebase)
2. Update `src/context/AuthContext.js` with your authentication logic
3. Configure deep linking in `app.json` for magic link handling

### Branding

Update colors in `src/constants/colors.js` to match your brand.

Replace placeholder assets in the `assets/` folder with your own:
- `icon.png` (1024x1024)
- `splash.png` (1242x2436 or larger)
- `adaptive-icon.png` (1024x1024, foreground only)
- `favicon.png` (48x48 or larger)

## Development Notes

### TODO Items

- [ ] Implement backend for magic link authentication
- [ ] Connect Talk Back form to backend API
- [ ] Add actual social sharing URLs
- [ ] Integrate social media SDK links
- [ ] Add error handling for stream loading failures
- [ ] Implement user preferences persistence
- [ ] Add push notifications for new shows/events
- [ ] Implement favorites/listening history

### Known Issues

- Asset files (icon.png, splash.png) are placeholders - replace with actual assets
- Magic link authentication needs backend integration
- Talk Back form submissions need API endpoint
- Social sharing URLs are placeholders

## Building for Production

### iOS

```bash
expo build:ios
```

### Android

```bash
expo build:android
```

### Configuration for App Stores

1. Update `app.json` with your bundle identifiers
2. Configure app signing certificates
3. Add app store assets (screenshots, descriptions)
4. Follow Expo's deployment guides

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For questions or issues:
- Email: support@radioradiox.com
- Website: https://radioradiox.com

---

**Note**: This app is configured for the RadioRadioX internet radio station. The radio stream begins playing automatically on app launch for a frictionless listening experience.
