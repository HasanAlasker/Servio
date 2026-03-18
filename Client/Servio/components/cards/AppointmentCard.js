import { View, StyleSheet, Image, Pressable, Linking } from "react-native";
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
import { useMemo, useState } from "react";
import ErrorMessage from "../form/ErrorMessage";
import { openURL } from "../../functions/openURL";
import useThemedStyles from "../../hooks/useThemedStyles";
import RowCont from "../general/RowCont";
import MText from "../text/MText";

function AppointmentCard({
  id,
  scheuledAt,
  status,
  customer,
  car,
  shop,
  serviceParts,
  type,
  onCancel,
  onReject,
  onAccept,
  onComplete,
  onNoShow,
  showDelete,
  onDelete,
}) {
  const styles = useThemedStyles(getstyles);
  const { isShopOwner, isUser } = UseUser();
  const { theme, isDarkMode } = useTheme();
  const [modal, setModal] = useState(false);

  const handleCall = async () => {
    try {
      if (isUser) await Linking.openURL(`tel:${shop?.phone}`);
      if (isShopOwner) await Linking.openURL(`tel:${customer?.phone}`);
    } catch (error) {}
  };

  const onApprove = async (id) => {
    setModal(true);
  };

  const closeModal = () => setModal(false);

  const partsList = serviceParts?.map((part) => (
    <RowCont key={part._id}>
      <MText>{"\u2022"}</MText>
      <SText thin>{capFirstLetter(part.name)}</SText>
    </RowCont>
  ));

  const isDue = useMemo(() => {
    const passedMins = 10 * 60 * 1000; // caluculate 10 min in milliseconds
    const scheduledTime = new Date(scheuledAt).getTime();
    const currentTime = Date.now();

    return currentTime >= scheduledTime + passedMins;
  }, [scheuledAt]);

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
          color={"green"}
          icon={isUser ? "store-outline" : "account"}
          title={
            isUser ? capFirstLetter(shop?.name) : capFirstLetter(customer?.name)
          }
          text={
            isUser
              ? shop?.address.area + " " + shop?.address.street
              : capFirstLetter(shop?.name)
          }
          flex
        />
        <SquareInfo
          color={"green"}
          icon={"clock-outline"}
          title={formatDate(scheuledAt)}
          text={getTimeFromDate(scheuledAt)}
          flex
        />

        <StatusLabel status={status} />

        {isUser &&
          status === "confirmed" &&
          new Date() < new Date(scheuledAt) && (
            <Pressable onPress={() => openURL(shop?.link)}>
              <Image
                style={[
                  styles.map,
                  { borderColor: isDarkMode ? theme.sec_text : theme.gold },
                ]}
                source={
                  isDarkMode
                    ? require("../../assets/map_dark.png")
                    : require("../../assets/map.png")
                }
              />
            </Pressable>
          )}

        <View>
          <SeparatorComp children={"Service Parts"} full color="sec_text" />
          <GapContainer gap={1}>{partsList}</GapContainer>
        </View>

        {Date.now() > new Date(scheuledAt) &&
          isShopOwner &&
          status === "pending" && (
            <ErrorMessage full error={"Time has passed"} />
          )}

        {isUser && status === "pending" && (
          <GapContainer gap={15}>
            {Date.now() > new Date(scheuledAt) && (
              <ErrorMessage full error={"Time has passed"} />
            )}
            <PriBtn
              square
              full
              red
              title={"Cancel"}
              onPress={() => onCancel(id, type)}
            />
          </GapContainer>
        )}

        {isUser && status === "confirmed" ? (
          <PriBtn square black full title={"Call Shop"} onPress={handleCall} />
        ) : (
          isShopOwner &&
          status === "confirmed" &&
          !isDue && (
            <PriBtn square black full title={"Call"} onPress={handleCall} />
          )
        )}

        {isUser && showDelete && status !== "pending" && (
          <PriBtn
            square
            red
            full
            title={"Delete"}
            onPress={() => onDelete(id)}
          />
        )}

        {isShopOwner && status === "pending" && (
          <RowCont>
            {Date.now() < new Date(scheuledAt) && (
              <PriBtn
                square
                half
                title={"Accept"}
                onPress={() => onApprove(id)}
              />
            )}

            <PriBtn
              square
              half={Date.now() < new Date(scheuledAt)}
              full={Date.now() >= new Date(scheuledAt)}
              red
              title={"Reject"}
              onPress={() => onReject(id)}
            />
          </RowCont>
        )}

        {isShopOwner && status === "confirmed" && isDue && (
          <RowCont gap={15}>
            <PriBtn
              square
              half
              title={"Completed"}
              onPress={() => onComplete(id)}
            />

            <PriBtn
              square
              half
              red
              title={"No-Show"}
              onPress={() => onNoShow(id)}
            />
          </RowCont>
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

const getstyles = (theme) =>
  StyleSheet.create({
    map: {
      width: "100%",
      height: 90,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: theme.gold,
    },
  });

export default AppointmentCard;
