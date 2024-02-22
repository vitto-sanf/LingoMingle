import 'dotenv/config';

export default{
  "expo": {
    "name": "lingo-mingle",
    "slug": "lingo-mingle",
    "version": "1.0.0",
    "scheme": "lingo-mingle-schema",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.luca_tamburo.lingomingle"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGE_SENDER_ID,
      appId: process.env.APP_ID
    },
    "expo": {
      "extra": {
        "eas": {
          "projectId": "aae74774-e888-40fc-b33b-f79515c6ff2a"
        }
      }
    },

    "plugins": [
      "expo-router",
      "@stream-io/video-react-native-sdk",
      [
        "@config-plugins/react-native-webrtc",
        {
          
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone"
        }
      ],
      [
        "expo-build-properties",
        {
          "android": {
            "extraMavenRepos": ["$rootDir/../../../node_modules/@notifee/react-native/android/libs"]
          }
        }
      ]
    ]
  }
}
