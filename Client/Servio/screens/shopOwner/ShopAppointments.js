import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import TabNav from "../../components/general/TabNav";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import useApi from "../../hooks/useApi";
import {
  getConfirmedAppointments,
  getPendingAppointments,
  rejectAppointment,
} from "../../api/appointment";
import AppointmentCard from "../../components/cards/AppointmentCard";
import GapContainer from "../../components/general/GapContainer";

function ShopAppointments(props) {
  const [tab, setTab] = useState("1");
  const [pending, setPending] = useState([]);
  const [confirmed, setConfirmed] = useState([]);

  const route = useRoute();
  const { shopId } = route.params;

  const {
    data: fetdPending,
    request: fetchPending,
    loading: lPeding,
    error: errPen,
  } = useApi(getPendingAppointments);

  const {
    data: fetdConfirmed,
    request: fetchConfirmed,
    loading: lConfirmed,
    error: errConf,
  } = useApi(getConfirmedAppointments);

  useEffect(() => {
    fetchConfirmed(shopId);
    fetchPending(shopId);
  }, []);

  useEffect(() => {
    setConfirmed(fetdConfirmed);
    setPending(fetdPending);
  }, [fetdPending, fetdConfirmed]);

  const handleTab = () => {
    if (tab === "1") setTab("2");
    else setTab("1");
  };

  const handleApproval = (id) => {
    setPending((p) => p.filter((a) => a._id !== id));
    const app = pending.find((a) => a._id === id);
    setConfirmed((p) => [{ ...app, status: "confirmed" }, ...p]);
  };

  const handleRejection = async (id) => {
    try {
      const response = await rejectAppointment(id);
      console.log(response)
      if (response.ok) {
        setPending((p) => p.filter((a) => a._id !== id));
      }
    } catch (error) {}
  };

  const RenderAppointments =
    tab === "1"
      ? confirmed.map((appointment) => (
          <AppointmentCard
            key={appointment._id}
            id={appointment._id}
            car={appointment.car}
            shop={appointment.shop}
            serviceParts={appointment.serviceParts}
            status={appointment.status}
            scheuledAt={appointment.scheduledDate}
            type={"1"}
          />
        ))
      : pending.map((appointment) => (
          <AppointmentCard
            key={appointment._id}
            id={appointment._id}
            car={appointment.car}
            shop={appointment.shop}
            serviceParts={appointment.serviceParts}
            status={appointment.status}
            scheuledAt={appointment.scheduledDate}
            type={"2"}
            onReject={handleRejection}
            onAccept={handleApproval}
          />
        ));

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer>
          <TabNav
            one={"Confirmed"}
            two={"Pending"}
            active={tab}
            onTabChange={handleTab}
          />
          {RenderAppointments}
        </GapContainer>
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ShopAppointments;
