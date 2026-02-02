import { View, StyleSheet } from "react-native";
import CardComp from "./CardComp";
import GapContainer from "../general/GapContainer";
import SquareInfo from "./SquareInfo";
import PriBtn from "../general/PriBtn";
import StatusLabel from "../general/StatusLabel";
import { UseUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";

function UserCard({ isEdit, handleEditPress }) {
  const { theme } = useTheme();
  const { user } = UseUser();

  return (
    <CardComp style={{ width: "90%", marginHorizontal: "auto" }}>
      <GapContainer>
        <GapContainer gap={12}>
          <SquareInfo
            icon={"account"}
            color={"lightBlue"}
            title={"Name"}
            text={user.name}
            fliped
          />
          <SquareInfo
            icon={"phone"}
            color={"green"}
            text={user.phone}
            title={"Phone"}
            fliped
          />
          <SquareInfo
            icon={"email"}
            color={"pink"}
            text={user.email}
            title={"Email"}
            fliped
          />
        </GapContainer>
        {user.role !== "user" && <StatusLabel status={user.role} />}
        <PriBtn
          square
          full
          title={!isEdit ? "Edit Info" : "Cancel"}
          style={{
            backgroundColor: isEdit ? theme.red : theme.blue,
            borderColor: isEdit ? theme.red : theme.blue,
          }}
          onPress={handleEditPress}
        />
      </GapContainer>
    </CardComp>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default UserCard;
