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
  const { theme } = useTheme();

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
        {status === "pending" && (
          <PriBtn
            square
            full
            style={{ backgroundColor: theme.red, borderColor: theme.red }}
            title={"Cancel"}
            onPress={() => onCancel(id, type)}
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
