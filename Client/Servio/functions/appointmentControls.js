import {
  confirmAppointment,
  markAppointmentCompleted,
  markAppointmentNoShow,
  rejectAppointment,
} from "../api/appointment";

export const handleRejection = async (id) => {
  try {
    const response = await rejectAppointment(id);
    setPending((p) => p.filter((app) => app._id !== id));
  } catch (error) {}
};

export const handleApproval = async (id) => {
  try {
    const response = await confirmAppointment(id);
  } catch (error) {}
};

export const handleCompletion = async (id) => {
  try {
    const response = await markAppointmentCompleted(id);
  } catch (error) {}
};

export const handleNoShow = async (id) => {
  try {
    const response = await markAppointmentNoShow(id);
  } catch (error) {}
};
