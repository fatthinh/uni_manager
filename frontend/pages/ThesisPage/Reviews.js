import { Text, View, ScrollView } from "react-native";
import Review from "./Review";

function Reviews({ reviews }) {
  return (
    <View
      style={{
        width: "100%",
        padding: 8,
        backgroundColor: "#ccc",
        opacity: 0.6,
        borderRadius: 8,
        height: reviews.length ? 114 : 40,
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
              <Text style={{ color: "blue", fontSize: 16, marginVertical: 10 }}>
                Các đánh giá
              </Text>
            </View>
            <View style={{ height: 62 }}>
              <ScrollView>
                {reviews.map((review, index) => (
                  <Review review={review} key={index} />
                ))}
              </ScrollView>
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
