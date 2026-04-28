import React from "react";
import { render } from "@testing-library/react-native";

// Login
import Welcome from "../screens/login/Welcome";
import Login from "../screens/login/Login";
import Register from "../screens/login/Register";

// Car owner
import Home from "../screens/carOwner/Home";
import Shops from "../screens/carOwner/Shops";
import AddCar from "../screens/carOwner/AddCar";
import Bookings from "../screens/carOwner/Bookings";
import Service from "../screens/carOwner/Service";
import Parts from "../screens/carOwner/Parts";
import MyCars from "../screens/carOwner/MyCars";
import CarParts from "../screens/carOwner/CarParts";
import AddPart from "../screens/carOwner/AddPart";
import MakeAppointment from "../screens/carOwner/MakeAppointment";
import History from "../screens/carOwner/History";
import CompletedAppointments from "../screens/carOwner/CompletedAppointments";

// Shared
import Profile from "../screens/shared/Profile";
import Suggestions from "../screens/shared/Suggestions";
import Settings from "../screens/shared/Settings";

// Admin
import Dash from "../screens/admin/Dash";
import AdminShops from "../screens/admin/Shops";
import Users from "../screens/admin/Users";
import Reports from "../screens/admin/Reports";
import DeletedShops from "../screens/admin/DeletedShops";
import SeeSuggestions from "../screens/admin/SeeSuggestions";

// Shop owner
import ShopDash from "../screens/shopOwner/ShopDash";
import MyShop from "../screens/shopOwner/MyShop";
import AddShop from "../screens/shopOwner/AddShop";
import ShopBook from "../screens/shopOwner/ShopBook";
import ShopAppointments from "../screens/shopOwner/ShopAppointments";

import { useRoute } from "@react-navigation/native";

const baseProps = {
  route: { params: {} },
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
    reset: jest.fn(),
  },
};

const routeParamsByScreen = {
  // Screens that expect non-empty route params
  MakeAppointment: {
    parts: [],
    shop: { _id: "s1", name: "Shop" },
    car: { _id: "c1" },
  },
  AddShop: {
    openHours: Array.from({ length: 7 }, () => ({
      isOpen: true,
      from: "09:00",
      to: "18:00",
    })),
  },
};

const screens = [
  ["Welcome", Welcome],
  ["Login", Login],
  ["Register", Register],

  ["Home", Home],
  ["Shops", Shops],
  ["AddCar", AddCar],
  ["Bookings", Bookings],
  ["Service", Service],
  ["Parts", Parts],
  ["MyCars", MyCars],
  ["CarParts", CarParts],
  ["AddPart", AddPart],
  ["MakeAppointment", MakeAppointment],
  ["History", History],
  ["CompletedAppointments", CompletedAppointments],

  ["Profile", Profile],
  ["Suggestions", Suggestions],
  ["Settings", Settings],

  ["Dash", Dash],
  ["AdminShops", AdminShops],
  ["Users", Users],
  ["Reports", Reports],
  ["DeletedShops", DeletedShops],
  ["SeeSuggestions", SeeSuggestions],

  ["ShopDash", ShopDash],
  ["MyShop", MyShop],
  ["AddShop", AddShop],
  ["ShopBook", ShopBook],
  ["ShopAppointments", ShopAppointments],
];

describe("Screens smoke test", () => {
  test.each(screens)("%s renders", (_name, Screen) => {
    useRoute.mockReturnValue({
      key: "test-route",
      name: _name,
      params: routeParamsByScreen[_name] || {},
    });
    const tree = render(<Screen {...baseProps} />).toJSON();
    expect(tree).toBeTruthy();
  });
});

