import { View, StyleSheet } from "react-native";
import CardComp from "./CardComp";
import GapContainer from "../general/GapContainer";
import SquareInfo from "./SquareInfo";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import PriBtn from "../general/PriBtn";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { deleteCar } from "../../api/car";
import { useState } from "react";

function CarOptionsCard({ params }) {
  const { theme } = useTheme();
  const navigate = useNavigation();

  const [isDeleting, setIsDeleting] = useState(false);

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
    <CardComp>
      <GapContainer gap={25}>
        <SquareInfo
          color={"lightBlue"}
          icon={"car-outline"}
          title={
            capFirstLetter(params?.make) + " " + capFirstLetter(params?.name)
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
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CarOptionsCard;
