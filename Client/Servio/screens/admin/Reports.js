import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import TabNav from "../../components/general/TabNav";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { getClosedReports, getOpenReports } from "../../api/report";
import GapContainer from "../../components/general/GapContainer";
import ReportCard from "../../components/cards/ReportCard";
import LoadingSkeleton from "../../components/loading/LoadingSkeleton";

function Reports(props) {
  const [tab, setTab] = useState("1");
  const [openRep, setOpenRep] = useState([]);
  const [closedRep, setClosedRep] = useState([]);

  const {
    data: open,
    request: fetchOpen,
    loading: loadingOpen,
  } = useApi(getOpenReports);

  const {
    data: closed,
    request: fetchClosed,
    loading: loadingClosed,
  } = useApi(getClosedReports);

  const loading = loadingOpen || loadingClosed;

  useEffect(() => {
    fetchClosed();
    fetchOpen();
  }, []);

  useEffect(() => {
    setOpenRep(open);
    setClosedRep(closed);
  }, [open, closed]);

  const handleTab = () => {
    if (tab === "1") setTab("2");
    else setTab("1");
  };

  const OpenList = open?.map((o) => (
    <ReportCard
      key={o._id}
      reason={o.reason}
      status={o.status}
      createdAt={o.createdAt}
      reporter={o.reporter}
      appointment={o.appointment}
      id={o._id}
      shop={o.reportedShop}
      updatedAt={o.updatedAt}
    />
  ));

  return (
    <SafeScreen>
      <ScrollScreen stickyHeader stickyHeaderIndices={[0]}>
        <TabNav
          one={"Open"}
          two={"Closed"}
          onTabChange={handleTab}
          active={tab}
        />
        <GapContainer>
          {loading && <LoadingSkeleton />}
          {loading && <LoadingSkeleton />}
          {loading && <LoadingSkeleton />}
          {OpenList}
        </GapContainer>
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Reports;
