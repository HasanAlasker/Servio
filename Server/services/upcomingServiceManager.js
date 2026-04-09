import UpcomingServiceModel from "../models/upcomingService.js";
import PartModel from "../models/part.js";
import CarModel from "../models/car.js";
import {
  calculateNextService,
  getServiceStatus,
  groupServiceableParts,
} from "./serviceCalculator.js";

const BATCH_SIZE = 10;

export const updateServicesForCar = async (carId) => {
  const car = await CarModel.findById(carId);
  if (!car || car.isDeleted) return;

  const parts = await PartModel.find({ car: carId, isTracked: true });

  // Don't exit early — if there are no tracked parts, we should still clean up
  // any stale upcoming service records that may exist from before.
  if (parts.length === 0) {
    await UpcomingServiceModel.deleteMany({ car: carId });
    return;
  }

  const partServices = parts.map((part) => calculateNextService(part, car.mileage));
  const serviceGroups = groupServiceableParts(partServices);

  for (const group of serviceGroups) {
    const daysUntilDue = group.dueBy.date
      ? Math.ceil((group.dueBy.date - new Date()) / (1000 * 60 * 60 * 24))
      : null;
    const milesUntilDue =
      group.dueBy.mileage != null ? group.dueBy.mileage - car.mileage : null;

    const status = getServiceStatus(daysUntilDue, milesUntilDue);

    await UpcomingServiceModel.findOneAndUpdate(
      {
        car: carId,
        parts: { $all: group.parts, $size: group.parts.length },
      },
      {
        $set: { customer: car.owner, dueBy: group.dueBy, status },
        $setOnInsert: { reminder: true, notificationSent: false },
      },
      { upsert: true, new: true }
    );
  }

  // Clean up stale records
  const currentPartSets = serviceGroups.map((g) =>
    [...g.parts].map(String).sort().join(",")
  );
  const existing = await UpcomingServiceModel.find({ car: carId });
  const staleIds = existing
    .filter((svc) => {
      const key = [...svc.parts].map(String).sort().join(",");
      return !currentPartSets.includes(key);
    })
    .map((svc) => svc._id);

  if (staleIds.length > 0) {
    await UpcomingServiceModel.deleteMany({ _id: { $in: staleIds } });
  }
};

export const updateServicesForAllCars = async () => {
  // Fetch only IDs to avoid holding all car documents in memory at once.
  const carIds = await CarModel.find({ isDeleted: false }).distinct("_id");

  for (let i = 0; i < carIds.length; i += BATCH_SIZE) {
    const batch = carIds.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map((id) =>
        updateServicesForCar(id).catch((err) =>
          console.error(`Error updating services for car ${id}:`, err),
        ),
      ),
    );
  }
};
