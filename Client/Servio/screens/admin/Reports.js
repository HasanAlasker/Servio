import { Platform, StyleSheet } from "react-native";
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
import { useReportStore } from "../../store/admin/useReportStore";
import SText from "../../components/text/SText";

function Reports(props) {
  const [tab, setTab] = useState("1");
  const [refreshing, setRefreshing] = useState(false);

  const open = useReportStore((state) => state.open);
  const closed = useReportStore((state) => state.closed);
  const loading = useReportStore((state) => state.loading);
  const loadReports = useReportStore((state) => state.loadReports);
  const closeReport = useReportStore((state) => state.closeReport);
  const openReport = useReportStore((state) => state.openReport);

  const handleTab = () => {
    if (tab === "1") setTab("2");
    else setTab("1");
  };

  const refresh = async () => {
    setRefreshing(true);
    try {
      await loadReports();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const dataSource = tab === "1" ? open : closed;

  const RenderReports =
    dataSource.length > 0 ? (
      dataSource?.map((o) => (
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
          onClose={closeReport}
          onOpen={openReport}
        />
      ))
    ) : (
      <SText
        thin
        color={"sec_text"}
        style={{ margin: "auto", textAlign: "center" }}
      >
        No reports here yet
      </SText>
    );

  return (
    <SafeScreen>
      <ScrollScreen
        {...(Platform.OS !== "web" && { refreshing, onRefresh: refresh })}
        stickyHeader
        stickyHeaderIndices={[0]}
      >
        <TabNav
          one={"Open"}
          two={"Closed"}
          onTabChange={handleTab}
          active={tab}
        />
        <GapContainer>
          {RenderReports}
          {loading && <LoadingSkeleton />}
          {loading && <LoadingSkeleton />}
          {loading && <LoadingSkeleton />}
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
