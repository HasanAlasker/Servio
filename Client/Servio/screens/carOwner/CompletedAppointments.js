import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import GapContainer from "../../components/general/GapContainer";
import { useState } from "react";
import { UseAppointment } from "../../context/AppointmentContext";
import MenuBackBtn from "../../components/general/MenuBackBtn";
import { useNavigation } from "@react-navigation/native";
import AppointmentCard from "../../components/cards/AppointmentCard";
import RatingModal from "../../components/rating/RatingModal";
import SText from "../../components/text/SText";
import LoadingSkeleton from "../../components/loading/LoadingSkeleton";
import ReportModal from "../../components/form/ReportModal";

function CompletedAppointmets(props) {
  const { fetchCompleted, completed, setCompleted, loading } = UseAppointment();
  const [refreshing, setRefreshing] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [ratingData, setRatingData] = useState(null);
  const [reportModal, setReportModal] = useState(false);
  const [reportId, setReportId] = useState(null);
  const navigate = useNavigation();

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchCompleted();
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };

  const handleRating = async (data) => {
    setShowRating(true);
    setRatingData(data);
  };

  const handleReport = async (appId) => {
    setReportModal(true);
    setReportId(appId);
  };

  const removeCardFromUi = (appointmentId) => {};

  const completedList = completed.map((appointment) => (
    <AppointmentCard
      key={appointment._id}
      id={appointment._id}
      customer={appointment?.customer}
      car={appointment.car}
      shop={appointment.shop}
      serviceParts={appointment.serviceParts}
      status={appointment.status}
      scheuledAt={appointment.scheduledDate}
      showRateAndReport
      openRatingModal={handleRating}
      openReportModal={handleReport}
      isReported={appointment.isReported}
    />
  ));
  return (
    <SafeScreen>
      <ScrollScreen refreshing={refreshing} onRefresh={handleRefresh}>
        <MenuBackBtn onClose={() => navigate.goBack()} />
        <GapContainer>
          {completedList.length === 0 && !loading ? (
            <SText
              thin
              color={"sec_text"}
              style={{ marginHorizontal: "auto", textAlign: "center" }}
            >
              You're all caught up!
            </SText>
          ) : (
            completedList
          )}
          {loading && (
            <GapContainer>
              <LoadingSkeleton />
              <LoadingSkeleton />
            </GapContainer>
          )}
        </GapContainer>
      </ScrollScreen>
      <RatingModal
        isVisible={showRating}
        onClose={() => setShowRating(false)}
        appointmentId={ratingData?.appointmentId}
        shopId={ratingData?.shopId}
        setRatingData={setRatingData}
        onRate={removeCardFromUi}
      />
      <ReportModal
        visible={reportModal}
        onClose={() => setReportModal(false)}
        appointmentId={reportId}
        setReportId={setReportId}
      />
      <Navbar />
    </SafeScreen>
  );
}

export default CompletedAppointmets;
