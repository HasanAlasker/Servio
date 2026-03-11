import { Feather, Ionicons } from "@expo/vector-icons";
import { UseService } from "../../context/ServiceContext";
import { UseAppointment } from "../../context/AppointmentContext";
import NavBtn from "./NavBtn";
import NavCont from "./NavCont";

function UserNav({ onMenu }) {
  const { countDueServices } = UseService();
  const { isConfirmedAppointments } = UseAppointment();

  return (
    <NavCont>
      <NavBtn name={"Home"} icon={<Feather name="home" size={26} />} />

      <NavBtn
        name="MyCars"
        lable={"Garage"}
        icon={<Ionicons name="car-outline" size={35} />}
        textStyle={{ bottom: 4 }}
      />

      <NavBtn
        name="Bookings"
        icon={<Feather name="calendar" size={26} />}
        notificationCondition={isConfirmedAppointments()}
      />

      <NavBtn
        name="Service"
        icon={<Feather name="clock" size={26} />}
        notificationCondition={countDueServices() > 0}
      />

      <NavBtn
        name="More"
        icon={<Feather name="more-horizontal" size={26} />}
        isSettings
        onPress={onMenu}
      />
    </NavCont>
  );
}

export default UserNav;
