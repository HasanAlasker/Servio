import { View, StyleSheet, Linking } from "react-native";
import CardComp from "./CardComp";
import GapContainer from "../general/GapContainer";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import SeparatorComp from "../general/SeparatorComp";
import SText from "../text/SText";
import StatusLabel from "../general/StatusLabel";
import { getTimeFromDate } from "../../functions/fromatTime";
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
import GhostBtn from "../general/GhostBtn";
import VerticalLine from "../general/VerticalLine";
import SimpleTitleText from "../general/SimpleTitleText";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

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
  const [showBtns, setShowBtns] = useState(false);

  const route = useRoute();

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
        <SimpleTitleText
          text1={capFirstLetter(car?.make) + " " + capFirstLetter(car?.name)}
          text2={
            isUser ? capFirstLetter(shop?.name) : capFirstLetter(customer?.name)
          }
          title={
            isUser
              ? shop?.address.area + " " + shop?.address.street
              : capFirstLetter(shop?.name)
          }
        />
        <RowCont>
          <SimpleTitleText
            text1={getTimeFromDate(scheuledAt)}
            text2={formatDate(scheuledAt)}
            title={<StatusLabel status={status} />}
          />
          {!isShopOwner && route.name !== "History" && (
            <Feather
              name={!showBtns ? "chevron-right" : "chevron-down"}
              onPress={() => setShowBtns(!showBtns)}
              color={theme.sec_text}
              size={25}
              style={{ alignSelf: "flex-end" }}
            />
          )}
        </RowCont>

        {Date.now() > new Date(scheuledAt) && status === "pending" && (
          <ErrorMessage full error={"Time has passed"} />
        )}
        {/* {isUser &&
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
          )} */}

        <View>
          <SeparatorComp children={"Service Parts"} full color="sec_text" />
          <GapContainer gap={1}>{partsList}</GapContainer>
        </View>

        <GapContainer gap={5}>
          {(showBtns || isShopOwner) && <SeparatorComp full color="faded" />}
          {showBtns &&
            isUser &&
            status === "confirmed" &&
            new Date() < new Date(scheuledAt) && (
              <RowCont>
                <GhostBtn
                  auto
                  title={"Directions"}
                  onPress={() => openURL(shop?.link)}
                />
                <VerticalLine />
                <GhostBtn auto black title={"Call Shop"} onPress={handleCall} />
              </RowCont>
            )}
          {showBtns && isUser && status === "pending" && (
            <GapContainer gap={15}>
              <PriBtn
                square
                full
                red
                title={"Cancel"}
                onPress={() => onCancel(id, type)}
              />
            </GapContainer>
          )}
          {isShopOwner && status === "confirmed" && !isDue && (
            <GhostBtn square black full title={"Call"} onPress={handleCall} />
          )}
          {showBtns && isUser && showDelete && status !== "pending" && (
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
                <GhostBtn auto title={"Accept"} onPress={() => onApprove(id)} />
              )}
              {Date.now() < new Date(scheuledAt) && <VerticalLine />}
              <GhostBtn
                square
                auto
                red
                title={"Reject"}
                onPress={() => onReject(id)}
              />
            </RowCont>
          )}
          {isShopOwner && status === "confirmed" && isDue && (
            <RowCont gap={15}>
              <GhostBtn
                auto
                title={"Completed"}
                onPress={() => onComplete(id)}
              />
              <VerticalLine />
              <GhostBtn
                auto
                red
                title={"No-Show"}
                onPress={() => onNoShow(id)}
              />
            </RowCont>
          )}
        </GapContainer>
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
      height: 100,
      borderRadius: 15,
      // borderWidth: 1,
      borderColor: theme.gold,
    },
  });

export default AppointmentCard;
