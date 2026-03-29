import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import Navbar from "../../components/general/Navbar";
import ScrollScreen from "../../components/general/ScrollScreen";
import ShopCard from "../../components/cards/ShopCard";
import useApi from "../../hooks/useApi";
import { getNearbyShops } from "../../api/shop";
import { useEffect, useState } from "react";
import GapContainer from "../../components/general/GapContainer";
import { useRoute } from "@react-navigation/native";
import LoadingSkeleton from "../../components/loading/LoadingSkeleton";
import { UseUser } from "../../context/UserContext";

function Shops(props) {
  const { userLocation } = UseUser();
  const [shops, setShops] = useState([]);
  const route = useRoute();
  const params = route?.params;

  console.log(userLocation)
  const {
    data: fetchedShops,
    request: fetchShops,
    loading,
  } = useApi(getNearbyShops);

  useEffect(() => {
    fetchShops(userLocation);
  }, []);

  useEffect(() => {
    setShops(fetchedShops);
  }, [fetchedShops]);

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchShops(userLocation);
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };

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
      serviceData={params}
    />
  ));

  return (
    <SafeScreen>
      <ScrollScreen refreshing={refreshing} onRefresh={handleRefresh}>
        <GapContainer>
          {RenderShops}
          {loading && <LoadingSkeleton />}
          {loading && <LoadingSkeleton />}
          {loading && <LoadingSkeleton />}
        </GapContainer>
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Shops;
