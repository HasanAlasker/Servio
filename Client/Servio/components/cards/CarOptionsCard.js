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
import RowCont from "../general/RowCont";
import SecBtn from "../general/SecBtn";
import GhostBtn from "../general/GhostBtn";
import VerticalLine from "../general/VerticalLine";

function CarOptionsCard({ params }) {
  const { removeCar, cars } = UseCar();
  const { theme } = useTheme();
  const navigate = useNavigation();

  const car = cars.find((c) => c._id === params?.id);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteCar(params?.id);
      if (response.ok) {
        navigate.navigate("MyCars");
        removeCar(response.data.data);
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
          title={capFirstLetter(car?.make) + " " + capFirstLetter(car?.name)}
          text={car?.model + " - " + capFirstLetter(car?.color)}
        />
        <SquareInfo
          color={"pink"}
          icon={"gauge"}
          title={`${car?.mileage.toLocaleString() + " " + capFirstLetter(car?.unit)}`}
          text={"Mileage"}
        />
        <RowCont gap={10}>
          <GhostBtn
            square
            auto
            title={"Edit"}
            disabled={isDeleting}
            onPress={() => navigate.navigate("AddCar", params)}
          />
          <VerticalLine color="faded" />
          <GhostBtn
            square
            auto
            red
            title={!isDeleting ? "Delete" : "Deleting..."}
            disabled={isDeleting}
            onPress={handleDelete}
          />
        </RowCont>
      </GapContainer>
    </CardComp>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CarOptionsCard;
