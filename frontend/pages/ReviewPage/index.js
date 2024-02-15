import { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import DetailLayout from "../../layouts/DetailLayout";

function ReviewPage({ route, navigation }) {
  const { thesis, token, review } = route.params;
  const [contentScore, setContentScore] = useState(null);
  const [presentationScore, setPresentationScore] = useState(null);
  const [comment, setComment] = useState(null);

  const handleSubmit = async () => {
    try {
      if (review)
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

      Alert.alert("Thông báo", "Đã thêm thành công!", [
        {
          text: "Thoát",
          onPress: () =>
            navigation.navigate("ThesisPage", {
              thesisId: thesis.id,
              token: token,
              updated: Math.random(),
            }),
        },
      ]);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    if (review) {
      setContentScore(review.content_score.toString());
      setPresentationScore(review.presentation_score.toString());
      setComment(review.comment);
    }
  }, [thesis, token]);

  return (
    <DetailLayout
      title="Đánh giá"
      toParentPage={() =>
        navigation.navigate("ThesisPage", {
          thesisId: thesis.id,
          updated: Math.random(),
          token: token,
        })
      }
    >
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
        style={{ inputBox: { height: 120 }, input: { paddingVertical: 16 } }}
        value={comment}
        onChange={(text) => setComment(text)}
      />
      <ButtonComponent
        rounded
        primary
        style={{ container: { width: 260, height: 70, marginTop: 20 } }}
        onClick={handleSubmit}
      >
        Gửi
      </ButtonComponent>
    </DetailLayout>
  );
}

export default ReviewPage;
