import { Text, View, ScrollView } from "react-native";
import Review from "./Review";

function Reviews({ reviews }) {
  return (
    <View
      style={{
        padding: 14,
        opacity: 0.6,
      }}
    >
      <View style={{}}>
        {reviews.length ? (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
            </View>
            <View style={{ }}>
                {reviews.map((review, index) => (
                  <Review review={review} key={index} />
                ))}
            </View>
          </>
        ) : (
          <Text style={{ color: "blue", fontSize: 16 }}>Không có đánh giá</Text>
        )}
      </View>
    </View>
  );
}

export default Reviews;
