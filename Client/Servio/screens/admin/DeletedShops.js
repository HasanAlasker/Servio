import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import useApi from "../../hooks/useApi";
import { getDeletedShops, undeleteShop } from "../../api/shop";
import { useEffect, useState } from "react";
import ShopCard from "../../components/cards/ShopCard";

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
      const response = await undeleteShop(id);
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
      <ScrollScreen>{RenderShops}</ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DeletedShops;
