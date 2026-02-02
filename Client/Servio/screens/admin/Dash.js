import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import { UseUser } from "../../context/UserContext";
import OfflineModal from "../../components/general/OfflineModal";
import Navbar from "../../components/general/Navbar";
import ScrollScreen from "../../components/general/ScrollScreen";
import CardLeftBorder from "../../components/cards/CardLeftBorder";
import GapContainer from "../../components/general/GapContainer";
import useApi from "../../hooks/useApi";
import { adminCountDocs } from "../../api/user";
import { useEffect } from "react";

function Dash(props) {
  const { user } = UseUser();
  const { data, request, loading, error } = useApi(adminCountDocs);

  useEffect(() => {
    request();
  }, [user, error]);

  console.log(data)

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer>
          <CardLeftBorder title={"Active Shops:"} data={data.activeShops} />
        </GapContainer>
      </ScrollScreen>
      <Navbar />
      <OfflineModal />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Dash;
