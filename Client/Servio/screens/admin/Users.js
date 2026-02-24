import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import TabNav from "../../components/general/TabNav";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import {
  deleteUser,
  getAllUsers,
  getDeletedUsers,
  undeleteUser,
} from "../../api/user";
import UserCard from "../../components/cards/UserCard";
import GapContainer from "../../components/general/GapContainer";
import SText from "../../components/text/SText";

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

  const loading = loadingA || loadingD;

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

  const handleAction = async (isDeleted, id) => {
    try {
      if (isDeleted) {
        setDeleted((prev) => prev.filter((user) => user._id !== id));
        setActive((prev) => {
          const user = deleted.find((user) => user._id === id);
          return user ? [{ ...user, isDeleted: false }, ...prev] : prev;
        });
        await undeleteUser(id);
      } else {
        setActive((prev) => prev.filter((user) => user._id !== id));
        setDeleted((prev) => {
          const user = active.find((user) => user._id === id);
          return user ? [{ ...user, isDeleted: true }, ...prev] : prev;
        });
        await deleteUser(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RenderUsers =
    tab === "1"
      ? active.map((user) => (
          <UserCard
            key={user._id}
            passedUser={user}
            isDeleted={user.isDeleted}
            handleAction={handleAction}
            full
          />
        ))
      : deleted.map((user) => (
          <UserCard
            key={user._id}
            passedUser={user}
            isDeleted={user.isDeleted}
            handleAction={handleAction}
            full
          />
        ));

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer>
          <TabNav
            one={"Active"}
            two={"Deleted"}
            onTabChange={handleTab}
            active={tab}
          />
          {RenderUsers}
          {!loadingD && deleted.length === 0 && tab === "2" && (
            <SText
              thin
              color={"sec_text"}
              style={{ margin: "auto", textAlign: "center" }}
            >
              There are no deleted accounts
            </SText>
          )}
        </GapContainer>
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Users;
