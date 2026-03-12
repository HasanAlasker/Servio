import NavBtn from "./NavBtn";
import { Feather } from "@expo/vector-icons";

function MoreBtn({ onMenu }) {
  return (
    <NavBtn
      name="More"
      icon={<Feather name="more-horizontal" size={26} />}
      isSettings
      onPress={onMenu}
    />
  );
}

export default MoreBtn;
