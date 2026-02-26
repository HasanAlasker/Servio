import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import AddCarCard from "../../components/cards/AddCarCard";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import GapContainer from "../../components/general/GapContainer";
import useApi from "../../hooks/useApi";
import { getTrackedParts } from "../../api/part";
import PartCard from "../../components/cards/PartCard";
import CarOptionsCard from "../../components/cards/CarOptionsCard";

function CarParts(props) {
  const [parts, setParts] = useState([]);

  const route = useRoute();
  const params = route?.params;

  const {
    data: fetchedParts,
    request: fetchParts,
    loading,
  } = useApi(getTrackedParts);

  useEffect(() => {
    fetchParts(params?.id);
  }, []);

  useEffect(() => {
    setParts(fetchedParts);
  }, [fetchedParts]);

  const RenderParts = parts.map((part) => (
    <PartCard key={part._id} part={part} parentParams={params} />
  ));

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer>
          <CarOptionsCard params={params} />

          {RenderParts}

          <AddCarCard
            text={"Add Part"}
            icon={"car-cog"}
            color={"blue"}
            navigateTo={"AddPart"}
            params={params}
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
