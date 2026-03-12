import SafeScreen from "../../components/general/SafeScreen";
import OfflineModal from "../../components/general/OfflineModal";
import Navbar from "../../components/general/Navbar";
import ScrollScreen from "../../components/general/ScrollScreen";
import GapContainer from "../../components/general/GapContainer";
import HelloUser from "../../components/general/HelloUser";
import AdminDash from "../../components/general/AdminDash";
import QuickActions from "../../components/general/QuickActions";

function Dash(props) {

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer gap={40}>
          <HelloUser />
          <QuickActions />
          <AdminDash />
        </GapContainer>
      </ScrollScreen>
      <Navbar />
      <OfflineModal />
    </SafeScreen>
  );
}

export default Dash;
