import { Text, View, Alert } from "react-native";
import InputBox from "../../components/InputBox";
import ButtonComponent from "../../components/ButtonComponent";
import { useEffect, useState } from "react";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import ModalComponent from "../../components/ModalComponent";

function ReviewModal({ myReview, token, thesis, visible, unVisible }) {
  const [contentScore, setContentScore] = useState(null);
  const [presentationScore, setPresentationScore] = useState(null);
  const [comment, setComment] = useState(null);

  const handleSubmit = async () => {
    try {
      if (myReview)
        await authAPIWithoutParams(token).patch(
          endpoints.updateReview(thesis.id),
          {
            presentation_score: presentationScore,
            content_score: contentScore,
            comment: comment,
          }
        );
      else {
        await authAPIWithoutParams(token).post(endpoints.addReview(thesis.id), {
          presentation_score: presentationScore,
          content_score: contentScore,
          comment: comment,
        });
      }

      Alert.alert("Thông báo", "Gửi thành hành công!", [
        {
          text: "Thoát",
          onPress: unVisible,
        },
      ]);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    setContentScore(myReview?.content_score.toString());
    setPresentationScore(myReview?.presentation_score.toString());
    setComment(myReview?.comment);
  }, [myReview]);

  return (
    <ModalComponent
      content={
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>{thesis.title}</Text>
          <InputBox
            keyboardType="numeric"
            label="Điểm nội dung"
            value={contentScore}
            onChange={(value) => setContentScore(value)}
          />
          <InputBox
            keyboardType="numeric"
            label="Điểm trình bày"
            value={presentationScore}
            onChange={(value) => setPresentationScore(value)}
          />
          <InputBox
            label="Nhận xét"
            multiline
            style={{
              inputBox: { height: 120 },
              input: { paddingVertical: 16 },
            }}
            value={comment}
            onChange={(text) => setComment(text)}
          />
          <ButtonComponent
            rounded
            primary
            style={{ container: { width: 260, height: 50, marginTop: 20 } }}
            onClick={handleSubmit}
          >
            Gửi
          </ButtonComponent>
        </View>
      }
      title="Đánh giá"
      unVisible={unVisible}
      visible={visible}
    />
  );
}

export default ReviewModal;
