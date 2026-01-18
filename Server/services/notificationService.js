// services/notificationService.js
import UpcomingServiceModel from "../models/upcomingService.js";

export const sendNotification = async (service) => {

  const partNames = service.parts.map((p) => p.name).join(", ");
  const message = `Your ${service.car.make} ${service.car.name} needs service for: ${partNames}`;

  console.log(
    `Sending notification to user ${service.customer._id}: ${message}`,
  );
};

export const sendDueServiceNotifications = async () => {
  // Find services that are "soon" or "due" and haven't been notified
  const services = await UpcomingServiceModel.find({
    status: { $in: ["soon", "due", "overdue"] },
    notificationSent: false,
  })
    .populate("car")
    .populate("customer")
    .populate("parts");

  for (const service of services) {
    try {
      // todo: put my send notification util here 

      // Mark as notified
      service.notificationSent = true;
      await service.save();
    } catch (error) {
      console.error(
        `Error sending notification for service ${service._id}:`,
        error,
      );
    }
  }
};


