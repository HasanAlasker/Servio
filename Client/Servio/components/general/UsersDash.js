import { StyleSheet } from "react-native";
import CardLeftBorder from "../../components/cards/CardLeftBorder";
import GapContainer from "../../components/general/GapContainer";
import { useNavigation } from "@react-navigation/native";
import { UseService } from "../../context/ServiceContext";
import HelloUser from "../../components/general/HelloUser";
import MText from "../../components/text/MText";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";

function UsersDash(props) {
  const navigaiton = useNavigation();
  const { services, loading } = UseService();

  const statusPriority = { overdue: 0, soon: 1, upcoming: 2 };

  const goThrough = () => {
    const carMap = {};

    for (const service of services) {
      const carId = service.car._id;
      if (
        !carMap[carId] ||
        statusPriority[service.status] < statusPriority[carMap[carId].status]
      ) {
        carMap[carId] = service;
      }
    }

    return Object.values(carMap).sort(
      (a, b) => statusPriority[a.status] - statusPriority[b.status],
    );
  };
  const ServiceList = goThrough().map((s) => (
    <CardLeftBorder
      key={s._id}
      status={s.status}
      customText={capFirstLetter(s.car.make + " " + s.car.name)}
      showBtn
      onPress={() => navigaiton.navigate("Service")}
    />
  ));
  return (
    <>
      <HelloUser />

      {!loading && ServiceList.length > 0 ? (
        <GapContainer>
          <MText
            thin
            color={
              ServiceList[0].props.status === "soon" ? "orange" : "darkPink"
            }
          >
            {ServiceList[0].props.status === "soon"
              ? "Coming Later"
              : "Attention Needed"}
          </MText>
          {ServiceList}
        </GapContainer>
      ) : !loading && ServiceList.length === 0 ? (
        <CardLeftBorder
          status={" "}
          icon={"checkbox-marked-circle-outline"}
          customColor={"green"}
          miniTitle={"You're all set"}
          customText={"No services required!"}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default UsersDash;
