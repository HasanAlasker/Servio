import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import useApi from "../../hooks/useApi";
import { getDeletedShops, undeleteShop } from "../../api/shop";
import { useEffect, useState } from "react";
import ShopCard from "../../components/cards/ShopCard";
import SText from "../../components/text/SText";
import GapContainer from "../../components/general/GapContainer";
import LText from "../../components/text/LText";

function DeletedShops(props) {
  const { data, request, loading, error } = useApi(getDeletedShops);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    setShops(data);
  }, [data, error]);

  const handleUndelete = async (id) => {
    try {
      setShops((p) => p.filter((shop) => shop._id !== id));
      await undeleteShop(id);
    } catch (error) {
      console.log(error);
    }
  };

  const RenderShops = shops?.map((shop) => (
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
      onAction={handleUndelete}
    />
  ));

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer>
          <LText style={{ textAlign: "center" }}>Deleted Shops</LText>
          {RenderShops}
          {!loading && shops.length === 0 && (
            <SText
              thin
              color={"sec_text"}
              style={{ margin: "auto", textAlign: "center" }}
            >
              There are no deleted shops
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

export default DeletedShops;
