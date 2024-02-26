import moment from "moment";
import { Text, View } from "react-native";

function Review({ review }) {
  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <Text>{`${review.author_firstname} ${review.author_lastname}`}</Text>
      <Text>{`${review.comment} | Điểm đánh giá: ${parseFloat(
        review.final_score.toFixed(2)
      )}`}</Text>
      <Text></Text>
      <Text style={{ position: "absolute", right: 0, bottom: 0 }}>
        {`Đã đánh giá ${moment(review.updated_at).fromNow()}`}
      </Text>
    </View>
  );
}

export default Review;
