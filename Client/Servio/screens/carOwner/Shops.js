import { Platform, StyleSheet } from "react-native";
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
import SText from "../../components/text/SText";

function Shops(props) {
  const { userLocation } = UseUser();
  const [shops, setShops] = useState([]);
  const route = useRoute();
  const params = route?.params;

  const {
    data: fetchedShops,
    request: fetchShops,
    loading,
    message
  } = useApi(getNearbyShops);

  useEffect(() => {
    if (!userLocation) return;
    fetchShops(userLocation);
  }, [userLocation]);

  useEffect(() => {
    setShops(fetchedShops);
  }, [fetchedShops]);

  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    try {
      setRefreshing(true);
      if (userLocation) await fetchShops(userLocation);
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
      <ScrollScreen
        {...(Platform.OS !== "web" && { refreshing, onRefresh: refresh })}
      >
        <GapContainer>
          {!userLocation && !loading && (
            <SText
              thin
              color={"sec_text"}
              style={{ margin: "auto", textAlign: "center" }}
            >
              location required to find nearby shops
            </SText>
          )}
          {shops.length === 0 && !loading && message && (
            <SText
              thin
              color={"sec_text"}
              style={{ margin: "auto", textAlign: "center", marginTop: 20 }}
            >
              {message}
            </SText>
          )}
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
