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
import { cancelAppointment } from "../../api/appointment";

function AppointmentCard({
  id,
  scheuledAt,
  status,
  car,
  shop,
  serviceParts,
  type,
  onCancel,
}) {
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
          icon={"car-outline"}
          title={capFirstLetter(car?.make) + " " + capFirstLetter(car?.name)}
          text={car?.plateNumber}
        />
        <SquareInfo
          color={"darkPink"}
          icon={"map-marker-outline"}
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
        {status === "pending" && type === "upcoming" && (
          <PriBtn
            square
            full
            isRed
            title={"Cancel"}
            onPress={() => onCancel(id)}
          />
        )}
      </GapContainer>
    </CardComp>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppointmentCard;
