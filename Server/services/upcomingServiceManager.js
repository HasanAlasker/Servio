import UpcomingServiceModel from "../models/upcomingService.js";
import PartModel from "../models/part.js";
import CarModel from "../models/car.js";
import {
  calculateNextService,
  getServiceStatus,
  groupServiceableParts,
} from "./serviceCalculator.js";
import { sendDueServiceNotifications } from "./notificationService.js";

export const updateServicesForCar = async (carId) => {
  const car = await CarModel.findById(carId);
  if (!car || car.isDeleted) return;

  const parts = await PartModel.find({
    car: carId,
    isTracked: true,
  });

  if (parts.length === 0) return;

  // Calculate next service for each part
  const partServices = parts.map((part) =>
    calculateNextService(part, car.mileage),
  );

  // Group parts that can be serviced together
  const serviceGroups = groupServiceableParts(partServices);

  // Delete old upcoming services for this car
  await UpcomingServiceModel.deleteMany({ car: carId });

  // Create new upcoming service records
  for (const group of serviceGroups) {
    const daysUntilDue = group.dueBy.date
      ? Math.ceil((group.dueBy.date - new Date()) / (1000 * 60 * 60 * 24))
      : null;
    const milesUntilDue = group.dueBy.mileage
      ? group.dueBy.mileage - car.mileage
      : null;

    const status = getServiceStatus(daysUntilDue, milesUntilDue);

    await UpcomingServiceModel.create({
      car: carId,
      customer: car.owner,
      parts: group.parts,
      dueBy: group.dueBy,
      status,
    });
  }
  await sendDueServiceNotifications(); // debug: delete this
};

export const updateServicesForAllCars = async () => {
  const cars = await CarModel.find({ isDeleted: false });

  for (const car of cars) {
    try {
      await updateServicesForCar(car._id);
    } catch (error) {
      console.error(`Error updating services for car ${car._id}:`, error);
    }
  }
};
