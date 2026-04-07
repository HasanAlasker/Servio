import { View, StyleSheet, Modal, FlatList, StatusBar } from "react-native";
import BackContainer from "../general/BackContainer";
import MenuBackBtn from "../general/MenuBackBtn";
import SeparatorComp from "../general/SeparatorComp";
import MenuOption from "../general/MenuOption";
import { reportReasons } from "../../constants/dropList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemedStyles from "../../hooks/useThemedStyles";

function ReportModal({ visible, disabled, onClose }) {
  const styles = useThemedStyles(getStyles);
  const insets = useSafeAreaInsets();

  const handleSelectItem = (item) => {
    console.log(item.value)
  };

  const renderItem = ({ item }) => {
    return (
      <MenuOption
        text={item.label}
        onPress={() => handleSelectItem(item)}
        disabled={disabled}
        showLock={disabled}
      />
    );
  };

  return (
    <Modal visible={visible && !disabled} animationType="slide" transparent>
      <View style={[styles.modalContent, { paddingBottom: insets.bottom + 5 }]}>
        <BackContainer style={styles.back}>
          <MenuBackBtn onClose={() => onClose()} />
        </BackContainer>

        <FlatList
          data={reportReasons}
          keyExtractor={(item) => item.value.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <SeparatorComp full style={styles.sep} color="faded" />
          )}
          contentContainerStyle={styles.list}
        />
      </View>
    </Modal>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    back: {
      marginVertical: 0,
    },
    modalContent: {
      paddingTop: StatusBar.currentHeight,
      backgroundColor: theme.post,
      borderRadius: 20,
      flex: 1,
    },
    list: {
      width: "90%",
      marginHorizontal: "auto",
      paddingBottom: 20,
    },
    sep: {
      width: "100%",
      marginTop: 5,
      marginBottom: 5,
    },
  });

export default ReportModal;
