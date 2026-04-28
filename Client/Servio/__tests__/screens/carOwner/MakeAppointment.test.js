import { render, fireEvent, waitFor } from "@testing-library/react-native";
import React from "react";
import MakeAppointment from "../../../screens/carOwner/MakeAppointment";
import { bookAppointment } from "../../../api/appointment";
import { checkSlot } from "../../../api/slots";

jest.mock("../../../api/appointment", () => ({
  bookAppointment: jest.fn(),
}));

jest.mock("../../../api/slots", () => ({
  checkSlot: jest.fn(),
}));

jest.mock("../../../hooks/useAppToast", () => {
  return jest.fn(() => ({
    success: jest.fn(),
    error: jest.fn(),
  }));
});

jest.mock("../../../components/form/FormikDatePicker", () => {
  const React = require("react");
  const { useFormikContext } = require("formik");
  const { Pressable, Text } = require("react-native");

  return function MockFormikDatePicker({ name }) {
    const { setFieldValue } = useFormikContext();
    return (
      <Pressable 
        testID={`mock-date-picker-${name}`}
        onPress={() => {
          if (name === "date") setFieldValue(name, "2050-01-01T00:00:00Z");
          if (name === "time") setFieldValue(name, "10:00");
        }}
      >
        <Text>Mock {name}</Text>
      </Pressable>
    );
  };
});

// Mock Context to provide loadAppointments
jest.mock("../../../context/AppointmentContext", () => ({
  UseAppointment: () => ({
    loadAppointments: jest.fn(),
    isConfirmedAppointments: jest.fn(() => false),
  }),
}));

// Since MakeAppointment uses useRoute, we must mock the route payload
jest.mock("@react-navigation/native", () => {
  const actual = jest.requireActual("@react-navigation/native");
  return {
    ...actual,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    useRoute: () => ({
      params: {
        car: { _id: "car_1" },
        shop: { id: "shop_1" },
        parts: [{ _id: "part_1" }, { _id: "part_2" }],
      },
    }),
  };
});

describe("MakeAppointment Screen", () => {
  it("should render confirm configuration button", () => {
    const { getByText } = render(<MakeAppointment />);
    expect(getByText("Confirm")).toBeTruthy();
  });



  it("should submit and verify slot availability prior to booking", async () => {
    checkSlot.mockResolvedValueOnce({ 
      ok: true, 
      data: { available: true } 
    });
    bookAppointment.mockResolvedValueOnce({
      ok: true,
      data: {}
    });

    const { getByText, getByTestId } = render(<MakeAppointment />);
    
    // Simulate setting date and time via the mock
    fireEvent.press(getByTestId("mock-date-picker-date"));
    
    // Wait for the time picker to appear because it's conditionally rendered in the component
    await waitFor(() => {
      expect(getByTestId("mock-date-picker-time")).toBeTruthy();
    });
    
    fireEvent.press(getByTestId("mock-date-picker-time"));
    
    // Submit the form
    fireEvent.press(getByText("Confirm"));
    
    // Verify that the slot was checked and appointment booked
    await waitFor(() => {
      expect(checkSlot).toHaveBeenCalledWith("shop_1", {
        date: expect.stringContaining("2050-01-01"),
        from: "10:00"
      });
      expect(bookAppointment).toHaveBeenCalledWith({
        car: "car_1",
        shop: "shop_1",
        serviceParts: ["part_1", "part_2"],
        scheduledDate: expect.stringContaining("2050-01-01"),
        time: "10:00"
      });
    });
  });
});
