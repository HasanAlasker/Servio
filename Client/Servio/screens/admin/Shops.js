import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import TabNav from "../../components/general/TabNav";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { getUnVerifiedShops, getVerifiedShops } from "../../api/shop";
import ShopCard from "../../components/cards/ShopCard";
import GapContainer from "../../components/general/GapContainer";

function Shops(props) {
  const [tab, setTab] = useState("1");
  const [Verified, setVerified] = useState([]);
  const [unverified, setUnverified] = useState([]);

  const {
    data: vShops,
    request: fetchVshops,
    error: errV,
    loading: loadingV,
  } = useApi(getVerifiedShops);

  const {
    data: uvShops,
    request: fetchUvshops,
    error: errUv,
    loading: loadingUv,
  } = useApi(getUnVerifiedShops);

  useEffect(() => {
    fetchVshops();
    fetchUvshops();
  }, []);

  useEffect(() => {
    setVerified(vShops);
    setUnverified(uvShops);
  }, [vShops, uvShops]);

  const handleTab = () => {
    if (tab === "1") setTab("2");
    else setTab("1");
  };

  const handleAction = (type, id) => {
    if (type === "delete") {
      setVerified((p) => p.filter((shop) => shop._id !== id));
    }
  };

  const RenderShops =
    tab === "1"
      ? unverified.map((shop) => (
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
            isVerified={shop.isVerified}
            onAction={handleAction}
          />
        ))
      : Verified.map((shop) => (
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
            isVerified={shop.isVerified}
            onAction={handleAction}
          />
        ));

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer>
          <TabNav
            one={"Unverified"}
            two={"Verified"}
            active={tab}
            onTabChange={handleTab}
          />
          {RenderShops}
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
