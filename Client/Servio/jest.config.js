module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: ["**/__tests__/**/*.test.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-native-community|@react-navigation|expo|@expo|expo-modules-core|react-native-reanimated|react-native-safe-area-context|react-native-screens|react-native-svg|react-native-keyboard-aware-scroll-view)/)",
  ],
};

