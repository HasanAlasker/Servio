import { Platform, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import TabNav from "../../components/general/TabNav";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import {
  deleteShop,
  getUnVerifiedShops,
  getVerifiedShops,
  verifyShop,
} from "../../api/shop";
import ShopCard from "../../components/cards/ShopCard";
import GapContainer from "../../components/general/GapContainer";
import SText from "../../components/text/SText";
import LoadingSkeleton from "../../components/loading/LoadingSkeleton";
import { alert } from "react-native-alert-queue";

function Shops(props) {
  const [tab, setTab] = useState("1");
  const [Verified, setVerified] = useState([]);
  const [unverified, setUnverified] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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

  let loading = loadingUv || loadingV;

  const refresh = async () => {
    setRefreshing(true);
    try {
      fetchVshops();
      fetchUvshops();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

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

  const handleAction = async (type, id) => {
    console.log(type, id);
    if (type === "delete") {
      const confirmed = await alert.confirm();
      if (confirmed) {
        setVerified((p) => p.filter((shop) => shop._id !== id));
        const res = await deleteShop(id);
      }
    } else if (type === "verify") {
      setUnverified((p) => p.filter((shop) => shop._id !== id));
      let shop = unverified.find((shop) => shop._id === id);
      shop.isVerified = true;
      setVerified((p) => [shop, ...p]);
      await verifyShop(id);
    }
  };
  const handleVerify = async (id) => {
    setUnverified((p) => p.filter((shop) => shop._id !== id));
    let shop = unverified.find((shop) => shop._id === id);
    shop.isVerified = true;
    setVerified((p) => [shop, ...p]);
    await verifyShop(id);
  };

  const handleDelete = async (id) => {
    const confirmed = await alert.confirm();
    if (confirmed) {
      setVerified((p) => p.filter((shop) => shop._id !== id));
      const res = await deleteShop(id);
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
            isDeleted={shop.isDeleted}
            onVerify={handleVerify}
            onDelete={handleDelete}
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
            isDeleted={shop.isDeleted}
            onAction={handleAction}
            onDelete={handleDelete}
          />
        ));

  return (
    <SafeScreen>
      <ScrollScreen
        refreshing={Platform.OS !== 'web' && refreshing}
        onRefresh={Platform.OS !== 'web' && refresh}
        stickyHeader
        stickyHeaderIndices={[0]}
      >
        <TabNav
          one={"Unverified"}
          two={"Verified"}
          active={tab}
          onTabChange={handleTab}
        />
        <GapContainer>
          {RenderShops}
          {loading && <LoadingSkeleton />}
          {loading && <LoadingSkeleton />}
          {loading && <LoadingSkeleton />}

          {!loadingUv && unverified.length === 0 && tab === "1" && (
            <SText
              thin
              color={"sec_text"}
              style={{ margin: "auto", textAlign: "center" }}
            >
              There are no requests yet
            </SText>
          )}

          {!loadingV && Verified.length === 0 && tab === "2" && (
            <SText
              thin
              color={"sec_text"}
              style={{ margin: "auto", textAlign: "center" }}
            >
              There are no open shops yet
            </SText>
          )}
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
