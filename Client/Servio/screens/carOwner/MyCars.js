import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import Navbar from "../../components/general/Navbar";
import ScrollScreen from "../../components/general/ScrollScreen";
import AddCarCard from "../../components/cards/AddCarCard";
import GapContainer from "../../components/general/GapContainer";
import SText from "../../components/text/SText";
import CarCard from "../../components/cards/CarCard";
import { UseCar } from "../../context/CarContext";

function MyCars(props) {
  const { cars, loading } = UseCar();

  const carsList = cars.map((car) => (
    <CarCard
      key={car._id}
      id={car._id}
      image={car?.image}
      make={car.make}
      name={car.name}
      model={car.model}
      plateNumber={car.plateNumber}
      color={car?.color}
      mileage={car.mileage}
    />
  ));

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer>
          {carsList.length === 0 && !loading ? (
            <SText
              thin
              color={"sec_text"}
              style={{ marginHorizontal: "auto", textAlign: "center" }}
            >
              You haven't added any cars yet
            </SText>
          ) : (
            carsList
          )}

          {loading && <SText>Loading</SText>}

          <AddCarCard
            text={"Add Car"}
            icon={"plus"}
            color={"blue"}
            navigateTo={"AddCar"}
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

export default MyCars;
