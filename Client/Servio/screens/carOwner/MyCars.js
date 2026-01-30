import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import Navbar from "../../components/general/Navbar";
import ScrollScreen from "../../components/general/ScrollScreen";
import AddCarCard from "../../components/cards/AddCarCard";
import GapContainer from "../../components/general/GapContainer";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { getMyCars } from "../../api/car";
import LText from "../../components/text/LText";
import SText from "../../components/text/SText";
import CarCard from "../../components/cards/CarCard";

function MyCars(props) {
  const [cars, setCars] = useState([]);

  const {
    data: carsData,
    request: fetchCars,
    error,
    loading,
    message,
  } = useApi(getMyCars);

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    setCars(carsData);
  }, [carsData]);

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
          {!carsData && !loading ? (
            <SText thin color={"sec_text"} style={{ marginHorizontal: "auto" }}>
              You haven't added any cars yet
            </SText>
          ) : (
            carsList
          )}
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
