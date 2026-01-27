import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import AddCarCard from "../../components/cards/AddCarCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import GapContainer from "../../components/general/GapContainer";
import { deleteCar } from "../../api/car";
import CardComp from "../../components/cards/CardComp";
import SquareInfo from "../../components/cards/SquareInfo";
import useApi from "../../hooks/useApi";
import { getTrackedParts } from "../../api/part";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import RowCont from "../../components/general/RowCont";
import { formatDate } from "../../functions/formatDate";
import SeparatorComp from "../../components/general/SeparatorComp";

function CarParts(props) {
  const [parts, setParts] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigation();
  const route = useRoute();
  const params = route?.params;

  const {
    data: fetchedParts,
    request: fetchParts,
    loading,
  } = useApi(getTrackedParts);

  useEffect(() => {
    fetchParts(params.id);
  }, []);

  useEffect(() => {
    setParts(fetchedParts);
  }, [fetchedParts]);

  const addMonthsToDate = (dateString, monthsToAdd) => {
    const date = new Date(dateString);
    date.setMonth(date.getMonth() + monthsToAdd);
    return date;
  };

  const RenderParts = parts.map((part) => (
    <CardComp key={part._id}>
      <GapContainer gap={15}>
        <SquareInfo
          color={"lightBlue"}
          icon={"car-door"}
          title={"Part Name"}
          text={capFirstLetter(part.name)}
          fliped
        />
        <SquareInfo
          color={"green"}
          icon={"calendar-outline"}
          title={"Last Change Date"}
          text={formatDate(part.lastChangeDate)}
          fliped
        />
        <SquareInfo
          color={"pink"}
          icon={"gauge"}
          title={"Last Change Mileage"}
          text={part.lastChangeMileage + " Km"}
          fliped
        />
        <SeparatorComp children={"Next Change"} full />
        <SquareInfo
          color={"gold"}
          icon={"calendar-outline"}
          title={"Next Change Date"}
          text={formatDate(
            addMonthsToDate(
              part.lastChangeDate,
              part.recommendedChangeInterval.months,
            ),
          )}
          fliped
        />
        <SquareInfo
          color={"gold"}
          icon={"gauge"}
          title={"Next Change Mileage"}
          text={part.recommendedChangeInterval.miles + " Km"}
          fliped
        />
      </GapContainer>
    </CardComp>
  ));
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteCar(params.id);
      if (response.ok) {
        navigate.navigate("MyCars");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer>
          <CardComp>
            <SquareInfo
              color={"lightBlue"}
              icon={"car-outline"}
              title={
                capFirstLetter(params.make) + " " + capFirstLetter(params.name)
              }
              text={params.model + " - " + capFirstLetter(params.color)}
            />
          </CardComp>

          {RenderParts}

          <AddCarCard
            text={"Add Part"}
            icon={"car-cog"}
            color={"blue"}
            navigateTo={"AddPart"}
            params={params}
          />

          <AddCarCard
            text={"Edit Car"}
            icon={"pencil-box-outline"}
            color={"blue"}
            navigateTo={"AddCar"}
            params={params}
          />

          <AddCarCard
            text={"Delete Car"}
            icon={"delete-outline"}
            color={"red"}
            onPress={handleDelete}
          />
        </GapContainer>
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CarParts;
