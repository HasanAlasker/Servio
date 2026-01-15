import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({});

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);
export default AppointmentModel;
