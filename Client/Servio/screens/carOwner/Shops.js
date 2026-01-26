import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import Navbar from "../../components/general/Navbar";
import ScrollScreen from "../../components/general/ScrollScreen";
import ShopCard from "../../components/cards/ShopCard";
import useApi from "../../hooks/useApi";

function Shops(props) {
  const {} = useApi()
  return (
    <SafeScreen>
      <ScrollScreen>
        <ShopCard
          description={"Hello World"}
          name={"Cars2"}
          address={"Albayader"}
          openHours={"fasd"}
        />
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Shops;
