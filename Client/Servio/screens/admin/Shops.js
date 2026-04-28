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
import { useShopStore } from "../../store/admin/useShopStore";

function Shops(props) {
  const [tab, setTab] = useState("1");
  const [refreshing, setRefreshing] = useState(false);

  const {
    verifiedShops: verified,
    unVerifiedShops: unverified,
    loadShops,
    loading,
    error,
  } = useShopStore();

  const refresh = async () => {
    setRefreshing(true);
    try {
      await loadShops();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleTab = () => {
    if (tab === "1") setTab("2");
    else setTab("1");
  };

  const dataSource = tab === "1" ? verified : unverified;

  const RenderShops =
    dataSource.length > 0 ? (
      dataSource?.map((shop) => (
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
          activeTab={tab}
        />
      ))
    ) : (
      <SText
        thin
        color={"sec_text"}
        style={{ margin: "auto", textAlign: "center" }}
      >
        {dataSource === unverified
          ? "There are no requests yet"
          : "There are no open shops yet"}
      </SText>
    );

  return (
    <SafeScreen>
      <ScrollScreen
        {...(Platform.OS !== "web" && { refreshing, onRefresh: refresh })}
        stickyHeader
        stickyHeaderIndices={[0]}
      >
        <TabNav
          one={"Verified"}
          two={"Unverified"}
          active={tab}
          onTabChange={handleTab}
        />
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
