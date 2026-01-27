import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import AddCarCard from "../../components/cards/AddCarCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import GapContainer from "../../components/general/GapContainer";
import { deleteCar } from "../../api/car";
import CardComp from "../../components/cards/CardComp";
import SquareInfo from "../../components/cards/SquareInfo";

function CarParts(props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigation();
  const route = useRoute();
  const params = route?.params;

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
              title={params.make + " " + params.name}
              text={params.model + " - " + params.color}
            />
          </CardComp>

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
