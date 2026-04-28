import "@testing-library/jest-native/extend-expect";

// Silence Reanimated warning in Jest environment
jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"));

// AsyncStorage mock (used heavily by contexts)
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

// Expo modules that may be invoked at import-time
jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(async () => true),
  hideAsync: jest.fn(async () => true),
}));

jest.mock("expo-navigation-bar", () => ({
  setStyle: jest.fn(async () => true),
}));

jest.mock("react-native-edge-to-edge", () => ({
  SystemBars: () => null,
}));

// Icons: avoid loading fonts / native bindings in Jest
jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const Icon = () => React.createElement("Icon");
  return {
    Feather: Icon,
    MaterialCommunityIcons: Icon,
    Ionicons: Icon,
    AntDesign: Icon,
    FontAwesome: Icon,
  };
});

// Toast provider: keep it simple during tests
jest.mock("react-native-toast-notifications", () => {
  const React = require("react");
  return {
    ToastProvider: ({ children }) => React.createElement(React.Fragment, null, children),
    useToast: () => ({ show: jest.fn() }),
  };
});

// Navigation: provide basic `useNavigation` mock
jest.mock("@react-navigation/native", () => {
  const actual = jest.requireActual("@react-navigation/native");
  const useRoute = jest.fn(() => ({
    key: "test-route",
    name: "TestRoute",
    params: {},
  }));
  return {
    ...actual,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      setOptions: jest.fn(),
      reset: jest.fn(),
    }),
    useRoute,
  };
});

jest.mock("@react-native-community/netinfo", () => ({
  useNetInfo: () => ({
    isConnected: true,
    isInternetReachable: true,
    type: "wifi",
    details: null,
  }),
}));

// --- App context mocks (keep screens renderable) ---
const defaultTheme = {
  blue: "#0059FF",
  red: "#ff0000",
  post: "#ffffff",
  white: "#ffffff",
  always_white: "#ffffff",
  main_text: "#000000",
  sec_text: "#666666",
  background: "#ffffff",
  faded: "#dddddd",
  darker_gray: "#777777",
};

jest.mock("./context/ThemeContext", () => {
  const React = require("react");
  return {
    ThemeProvider: ({ children }) => React.createElement(React.Fragment, null, children),
    useTheme: () => ({ theme: defaultTheme, isDarkMode: false }),
  };
});

// Native UI deps that often ship ESM or native bindings
jest.mock("react-native-keyboard-aware-scroll-view", () => {
  const React = require("react");
  return {
    KeyboardAwareScrollView: ({ children }) =>
      React.createElement(React.Fragment, null, children),
  };
});

jest.mock("@react-native-community/datetimepicker", () => {
  const React = require("react");
  return function MockDateTimePicker() {
    return React.createElement(React.Fragment, null);
  };
});

jest.mock("expo-image-picker", () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(async () => ({ granted: true })),
  requestCameraPermissionsAsync: jest.fn(async () => ({ granted: true })),
  launchImageLibraryAsync: jest.fn(async () => ({
    canceled: true,
    assets: [],
  })),
  launchCameraAsync: jest.fn(async () => ({
    canceled: true,
    assets: [],
  })),
}));

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(async () => ({ status: "granted" })),
  getCurrentPositionAsync: jest.fn(async () => ({
    coords: { latitude: 0, longitude: 0 },
  })),
}));

jest.mock("expo-notifications", () => ({
  setNotificationHandler: jest.fn(),
  getExpoPushTokenAsync: jest.fn(async () => ({ data: "ExponentPushToken[test]" })),
  addNotificationReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
  addNotificationResponseReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
  removeNotificationSubscription: jest.fn(),
}));

jest.mock("./context/UserContext", () => {
  const React = require("react");
  return {
    UserProvider: ({ children }) => React.createElement(React.Fragment, null, children),
    UseUser: () => ({
      appStart: false,
      isUser: true,
      isShopOwner: false,
      isAdmin: false,
      isAuthenticated: true,
      user: { _id: "u1", name: "Test User", role: "user" },
      firstName: "Test",
      lastName: "User",
      loading: false,
      error: false,
      message: null,
      status: null,
      login: jest.fn(async () => ({ success: true })),
      register: jest.fn(async () => ({ success: true })),
      logout: jest.fn(async () => true),
      loadUserData: jest.fn(async () => true),
      fetchUserLocation: jest.fn(async () => true),
      refreshUserToken: jest.fn(async () => true),
      editProfile: jest.fn(async () => ({ success: true })),
      getMyProfile: jest.fn(async () => ({ success: true })),
      userLocation: null,
    }),
  };
});

jest.mock("./context/CarContext", () => {
  const React = require("react");
  return {
    CarProvider: ({ children }) => React.createElement(React.Fragment, null, children),
    UseCar: () => ({
      cars: [],
      loadCars: jest.fn(async () => true),
    }),
  };
});

jest.mock("./context/ServiceContext", () => {
  const React = require("react");
  return {
    ServiceProvider: ({ children }) => React.createElement(React.Fragment, null, children),
    UseService: () => ({
      services: [],
      loading: false,
      loadServices: jest.fn(async () => true),
      countDueServices: jest.fn(() => 0),
    }),
  };
});

jest.mock("./context/AppointmentContext", () => {
  const React = require("react");
  return {
    AppointmentProvider: ({ children }) => React.createElement(React.Fragment, null, children),
    UseAppointment: () => ({
      appointments: [],
      completed: [],
      loadAppointments: jest.fn(async () => true),
      isConfirmedAppointments: jest.fn(() => false),
    }),
  };
});

jest.mock("./context/ShopContext", () => {
  const React = require("react");
  return {
    ShopProvider: ({ children }) => React.createElement(React.Fragment, null, children),
    UseShop: () => ({
      shops: [],
      loadShops: jest.fn(async () => true),
    }),
  };
});

jest.mock("./context/NotificationContext", () => {
  const React = require("react");
  return {
    NotificationProvider: ({ children }) => React.createElement(React.Fragment, null, children),
  };
});

// Safe area (used by useAppToast and SafeScreen)
jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const actual = jest.requireActual("react-native-safe-area-context");
  return {
    ...actual,
    SafeAreaProvider: ({ children }) => React.createElement(React.Fragment, null, children),
    SafeAreaView: ({ children, ...props }) => React.createElement("SafeAreaView", props, children),
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

// Network hooks / API wrappers used by some screens
jest.mock("./hooks/useApi", () => {
  return () => ({
    data: [],
    message: null,
    request: jest.fn(async () => ({ ok: true })),
    loading: false,
    error: false,
    success: true,
    status: 200,
  });
});

// API call used by Login screen
jest.mock("./api/upcomingService", () => ({
  isServerAwake: jest.fn(async () => ({ ok: true, status: 200, data: { message: "Awake" } })),
}));

