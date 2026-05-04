import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import SText from "../../components/text/SText";
import MenuBackBtn from "../../components/general/MenuBackBtn";
import useApi from "../../hooks/useApi";
import { getUserProfile } from "../../api/user";
import { useState } from "react";
import { useEffect } from "react";

function UsersProfiles(props) {
  const [user, setUser] = useState();
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params;

  const {
    data: fetchedUser,
    request: fetchUser,
    loading,
  } = useApi(getUserProfile);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setUser(fetchedUser);
  }, [fetchedUser]);

  return (
    <SafeScreen>
      <ScrollScreen>
        <MenuBackBtn onClose={() => navigation.goBack()} />
      </ScrollScreen>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default UsersProfiles;
