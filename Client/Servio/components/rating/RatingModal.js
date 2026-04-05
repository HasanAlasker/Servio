import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import CardModal from "../general/CardModal";
import RatingStars from "./RatingStars";
import PriBtn from "../general/PriBtn";
import { rateShop } from "../../api/shop";
import useAppToast from "../../hooks/useAppToast";

function RatingModal({
  isVisible,
  onClose,
  shopId,
  appointmentId,
  setRatingData,
}) {
  const [rating, setRating] = useState(0);
  const [submiting, setSubmiting] = useState(false);
  const toast = useAppToast();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleConfirm = async () => {
    setSubmiting(true);
    try {
      const data = {
        rating,
        appointmentId,
      };
      const res = await rateShop(shopId, data);
      if (res.ok) {
        setRatingData(null);
        setRating(0);
        toast.success("Submitted!");
      }
    } catch (error) {
      toast.error("Failed!");
    } finally {
      setSubmiting(false);
      onClose();
    }
  };

  const isDisabled = () => {
    return rating === 0;
  };

  return (
    <CardModal isVisibile={isVisible}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RatingStars
          onRatingChange={handleRatingChange}
          title={"Rate Shop"}
          subtitle="How was your experience in this appointment?"
        />

        <PriBtn
          full
          square
          style={[styles.btn, { opacity: isDisabled() || submiting ? 0.5 : 1 }]}
          title={submiting ? "Submitting..." : "Submit"}
          onPress={handleConfirm}
          disabled={isDisabled()}
        />
      </ScrollView>
    </CardModal>
  );
}

const styles = StyleSheet.create({
  container: {},
  btn: {
    marginTop: 15,
  },
});

export default RatingModal;
