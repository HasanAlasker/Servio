import { View, StyleSheet } from "react-native";
import CardComp from "./CardComp";
import GapContainer from "../general/GapContainer";
import SquareInfo from "./SquareInfo";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import SeparatorComp from "../general/SeparatorComp";
import SText from "../text/SText";
import StatusLabel from "../general/StatusLabel";
import { getTimeFromDate } from "../../functions/fromatTime";
import IconTextLabel from "../general/IconTextLabel";
import { formatDate } from "../../functions/formatDate";
import PriBtn from "../general/PriBtn";
import { useTheme } from "../../context/ThemeContext";
import { UseUser } from "../../context/UserContext";
import AppModal from "./AppModal";
import { startTransition, useState } from "react";

function AppointmentCard({
  id,
  scheuledAt,
  status,
  car,
  shop,
  serviceParts,
  type,
  onCancel,
  onReject,
  onAccept,
  onComplete,
  onNoShow,
}) {
  const { isShopOwner, isUser } = UseUser();
  const { theme } = useTheme();
  const [modal, setModal] = useState(false);

  const onApprove = async (id) => {
    setModal(true);
  };

  const closeModal = () => setModal(false);

  const partsList = serviceParts?.map((part) => (
    <SText key={part._id} thin>
      {capFirstLetter(part.name)}
    </SText>
  ));

  return (
    <CardComp>
      <GapContainer gap={20}>
        <SquareInfo
          color={"lightBlue"}
          icon={"car"}
          title={capFirstLetter(car?.make) + " " + capFirstLetter(car?.name)}
          text={car?.plateNumber}
        />
        <SquareInfo
          color={"green"}
          icon={"store"}
          title={capFirstLetter(shop?.name)}
          text={shop?.address.area + " " + shop?.address.street}
        />

        <View>
          <IconTextLabel
            icon={"calendar-blank-outline"}
            text={formatDate(scheuledAt)}
          />
          <IconTextLabel
            icon={"clock-outline"}
            text={getTimeFromDate(scheuledAt)}
          />
        </View>

        <StatusLabel status={status} />

        <View>
          <SeparatorComp children={"Service Parts"} full color="sec_text" />
          {partsList}
        </View>
        {isUser && status === "pending" && (
          <PriBtn
            square
            full
            style={{ backgroundColor: theme.red, borderColor: theme.red }}
            title={"Cancel"}
            onPress={() => onCancel(id, type)}
          />
        )}
        {isShopOwner && (status === "pending" || status === "confirmed") && (
          <GapContainer gap={15}>
            <PriBtn
              square
              full
              title={status === "pending" ? "Accept" : "Completed"}
              onPress={
                status === "pending"
                  ? () => onApprove(id)
                  : () => onComplete(id)
              }
            />

            <PriBtn
              square
              full
              style={{ backgroundColor: theme.red, borderColor: theme.red }}
              title={status === "pending" ? "Reject" : "No-Show"}
              onPress={
                status === "pending" ? () => onReject(id) : () => onNoShow(id)
              }
            />
          </GapContainer>
        )}
      </GapContainer>
      <AppModal
        isVisible={modal}
        onClose={closeModal}
        from={scheuledAt}
        id={id}
        onApproval={() => onAccept(id)}
      />
    </CardComp>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppointmentCard;
