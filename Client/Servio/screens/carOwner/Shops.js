import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import Navbar from "../../components/general/Navbar";
import ScrollScreen from "../../components/general/ScrollScreen";
import ShopCard from "../../components/cards/ShopCard";
import useApi from "../../hooks/useApi";
import { getVerifiedShops } from "../../api/shop";
import { useEffect, useState } from "react";
import GapContainer from "../../components/general/GapContainer";
import { useRoute } from "@react-navigation/native";

function Shops(props) {
  const [shops, setShops] = useState([]);
  const route = useRoute()
  const params = route?.params

  const {
    data: fetchedShops,
    request: fetchShops,
    loading,
  } = useApi(getVerifiedShops);

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    setShops(fetchedShops);
  }, [fetchedShops]);

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
      serviceData = {params}
    />
  ));

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer>{RenderShops}</GapContainer>
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Shops;
