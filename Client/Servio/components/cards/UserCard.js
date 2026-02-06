import { View, StyleSheet } from "react-native";
import CardComp from "./CardComp";
import GapContainer from "../general/GapContainer";
import SquareInfo from "./SquareInfo";
import PriBtn from "../general/PriBtn";
import StatusLabel from "../general/StatusLabel";
import { useTheme } from "../../context/ThemeContext";
import { UseUser } from "../../context/UserContext";
import { useRoute } from "@react-navigation/native";

function UserCard({
  passedUser,
  isEdit,
  handleEditPress,
  handleAction,
  isDeleted = null,
  short,
}) {
  const { theme } = useTheme();
  const { user, isAdmin } = UseUser();
  const route = useRoute();

  return (
    <CardComp
      style={{marginHorizontal: "auto" }}
      short={short}
    >
      <GapContainer>
        <GapContainer gap={12}>
          <SquareInfo
            icon={"account"}
            color={"lightBlue"}
            title={"Name"}
            text={passedUser?.name}
            fliped
          />
          <SquareInfo
            icon={"phone"}
            color={"green"}
            text={passedUser?.phone}
            title={"Phone"}
            fliped
          />
          <SquareInfo
            icon={"email"}
            color={"pink"}
            text={passedUser?.email}
            title={"Email"}
            fliped
          />
        </GapContainer>
        {passedUser?.role !== "user" && (
          <StatusLabel status={passedUser?.role} />
        )}
        {user._id === passedUser._id && route.name !== "Users" && (
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
        )}
        {isDeleted !== null &&
          route.name === "Users" &&
          passedUser.role !== "admin" && (
            <PriBtn
              square
              full
              title={isDeleted ? "Un-Delete" : "Delete User"}
              style={{
                backgroundColor: !isDeleted ? theme.red : theme.blue,
                borderColor: !isDeleted ? theme.red : theme.blue,
              }}
              onPress={() => handleAction(isDeleted, passedUser._id)}
            />
          )}
      </GapContainer>
    </CardComp>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default UserCard;
