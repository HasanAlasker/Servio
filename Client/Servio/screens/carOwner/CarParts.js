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
import PriBtn from "../../components/general/PriBtn";
import { useTheme } from "../../context/ThemeContext";
import PartCard from "../../components/cards/PartCard";

function CarParts(props) {
  const { theme } = useTheme();
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
    fetchParts(params?.id);
  }, []);

  useEffect(() => {
    setParts(fetchedParts);
  }, [fetchedParts]);

  const RenderParts = parts.map((part) => (
    <PartCard key={part._id} part={part} />
  ));

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteCar(params?.id);
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
            <GapContainer gap={25}>
              <SquareInfo
                color={"lightBlue"}
                icon={"car-outline"}
                title={
                  capFirstLetter(params?.make) +
                  " " +
                  capFirstLetter(params?.name)
                }
                text={params?.model + " - " + capFirstLetter(params?.color)}
              />
              <GapContainer gap={10}>
                <PriBtn
                  square
                  full
                  title={"Edit"}
                  onPress={() => navigate.navigate("AddCar", params)}
                />
                <PriBtn
                  square
                  full
                  style={{ backgroundColor: theme.red, borderColor: theme.red }}
                  title={"Delete"}
                  onPress={handleDelete}
                />
              </GapContainer>
            </GapContainer>
          </CardComp>

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
