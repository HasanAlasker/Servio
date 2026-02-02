import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import TabNav from "../../components/general/TabNav";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { getAllUsers, getDeletedUsers } from "../../api/user";

function Users(props) {
  const [tab, setTab] = useState("1");
  const [active, setActive] = useState([]);
  const [deleted, setDeleted] = useState([]);

  const {
    data: activeUsers,
    request: fActive,
    loading: loadingA,
    error: errA,
  } = useApi(getAllUsers);

  const {
    data: deletedUsers,
    request: fDeleted,
    loading: loadingD,
    error: errD,
  } = useApi(getDeletedUsers);

  useEffect(() => {
    fActive();
    fDeleted();
  }, []);

  useEffect(() => {
    setActive(activeUsers);
    setDeleted(deletedUsers);
  }, [activeUsers, deletedUsers]);

  const handleTab = () => {
    if (tab === "1") setTab("2");
    else setTab("1");
  };

  

  return (
    <SafeScreen>
      <ScrollScreen>
        <TabNav
          one={"Active"}
          two={"Deleted"}
          onTabChange={handleTab}
          active={tab}
        />
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Users;
