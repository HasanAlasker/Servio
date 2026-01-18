import { useState, useEffect } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { Feather } from "@expo/vector-icons";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useTheme } from '../../config/ThemeContext'
import AppText from "../../config/AppText";
import RequestBtn from "../RequestBtn";


function OfflineModal(props) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();
  const netinfo = useNetInfo();

  const [showOffline, setShowOffline] = useState(false);
  
  useEffect(() => {
    let timer;
    if (netinfo.type !== "unknown" && netinfo.isInternetReachable === false) {
      // wait 2s before showing the modal
      timer = setTimeout(() => setShowOffline(true), 2000);
    } else {
      // clear modal immediately when back online
      clearTimeout(timer);
      setShowOffline(false);
    }
    return () => clearTimeout(timer);
  }, [netinfo]);

  if (!showOffline) return null;

  return (
    <Modal transparent>
      <View style={styles.container}>
        <Feather name="wifi-off" size={100} color={theme.red}></Feather>
        <AppText style={styles.text}>Please connect to the internet</AppText>
        <RequestBtn isRed={true} style={styles.btn} title={"Retry"}></RequestBtn>
      </View>
      <View style={styles.overlay} />
    </Modal>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      zIndex: 100,
      backgroundColor: theme.post,
      margin: "auto",
      paddingTop: 40,
      paddingBottom: 30,
      width: "70%",
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    text: {
      color: theme.red,
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
    },
    overlay: {
      position: "absolute",
      inset: 0,
      backgroundColor: theme.background,
      zIndex: 90,
      opacity: 0.5,
    },
    btn:{
        width:"100%",
        marginTop:20
    }
  });

export default OfflineModal;
