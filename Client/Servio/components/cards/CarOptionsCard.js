import { StyleSheet } from "react-native";
import CardComp from "./CardComp";
import GapContainer from "../general/GapContainer";
import SquareInfo from "./SquareInfo";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import PriBtn from "../general/PriBtn";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { deleteCar } from "../../api/car";
import { useState } from "react";
import { UseCar } from "../../context/CarContext";

function CarOptionsCard({ params }) {
  const { removeCar } = UseCar();
  const { theme } = useTheme();
  const navigate = useNavigation();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteCar(params?.id);
      if (response.ok) {
        removeCar(response.data.data);
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
          icon={"car"}
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
            disabled={isDeleting}
            onPress={() => navigate.navigate("AddCar", params)}
          />
          <PriBtn
            square
            full
            style={{ backgroundColor: theme.red, borderColor: theme.red }}
            title={!isDeleting ? "Delete" : "Deleting..."}
            disabled={isDeleting}
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
