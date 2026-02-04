import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { getMyShops } from "../../api/shop";
import ShopCard from "../../components/cards/ShopCard";
import { useNavigation } from "@react-navigation/native";
import AddCarCard from "../../components/cards/AddCarCard";
import GapContainer from "../../components/general/GapContainer";

function MyShop(props) {
  const [shops, setShops] = useState([]);
  const navigate = useNavigation();

  const {
    data: fetchedShops,
    request: fetchShops,
    loading,
    error,
  } = useApi(getMyShops);

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    setShops(fetchedShops);
  }, [fetchedShops, error]);

  const RenderShops = shops.map((shop) => (
    <ShopCard
      key={shop._id}
      id={shop._id}
      name={shop.name}
      address={shop.address}
      description={shop.description}
      image={shop?.image}
      openHours={shop.openHours}
      rating={shop.rating}
      ratingCount={shop.ratingCount}
      services={shop.services}
      onCardPress={() => navigate.navigate("AddShop", shop)}
    />
  ));

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer>
          {RenderShops}
          <AddCarCard
            color={"blue"}
            text={"Add Shop"}
            icon={"plus"}
            navigateTo={"AddShop"}
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

export default MyShop;
