import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import DetailLayout from "../../layouts/DetailLayout";
import InputBox from "../../components/InputBox";
import ButtonComponent from "../../components/ButtonComponent";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

function ThesisPage({ navigation, route }) {
  const { token, thesisId, updated } = route.params;
  const { userInfo } = useSelector((state) => state.userLogin);
  const [thesis, setThesis] = useState(null);
  const [myReview, setMyReview] = useState(null);

  const loadThesis = async () => {
    let response = await authAPIWithoutParams(token).get(
      endpoints.thesis(thesisId)
    );
    setThesis(response.data);
  };

  const loadMyReview = async () => {
    try {
      let response = await authAPIWithoutParams(token).get(
        endpoints.myReview(thesisId)
      );
      setMyReview(response.data);
    } catch (ex) {
      setMyReview(null);
    }
  };

  useEffect(() => {
    loadThesis();
  }, [thesisId]);

  useEffect(() => {
    loadMyReview();
  }, [token, updated]);

  const handleActive = async () => {
    let response = await authAPIWithoutParams(token).patch(
      endpoints.toggleThesis(thesisId)
    );
    setThesis(response.data);
  };

  const toParentPage = () => {
    if (userInfo) {
      if (userInfo.role === "PROVOST")
        navigation.navigate("ThesesPage", { token: token });
      else if (userInfo.role === "LECTURER")
        navigation.navigate("LecturerTheses", {
          councilId: thesis.council.id,
          token: token,
        });
    } else navigation.navigate("HomePage");
  };

  const actions = () => {
    return (
      <>
        {thesis && !thesis.is_active && (
          <ButtonComponent
            rounded
            primary
            style={{ container: { width: 200 } }}
            onClick={handleActive}
          >
            Duyệt
          </ButtonComponent>
        )}
        {userInfo && userInfo.role === "LECTURER" && (
          <ButtonComponent
            primary
            rounded
            onClick={() =>
              navigation.navigate("ReviewPage", {
                thesis: thesis,
                token: token,
                review: myReview,
              })
            }
            style={{ container: { width: 260 } }}
          >
            {myReview ? "Sửa đánh giá" : "Thêm đánh giá"}
          </ButtonComponent>
        )}
      </>
    );
  };

  return (
    <DetailLayout
      title="Chi tiết khóa luận"
      toParentPage={toParentPage}
      style={{
        actions: {
          flex: 1.2,
          justifyContent: "center",
        },
        children: {},
      }}
      childrenActions={actions()}
    >
      {thesis === null ? (
        <ActivityIndicator />
      ) : (
        <>
          <ThesisView thesis={thesis} />
          <ThesisReviews thesis={thesis} token={token} />
        </>
      )}
    </DetailLayout>
  );
}

const ThesisView = ({ thesis }) => {
  return (
    <>
      <Text style={styles.title}>{thesis.title}</Text>
      <View style={styles.status}>
        <Text>Trạng thái: </Text>
        <Text style={{ color: "red" }}>
          {thesis.is_active ? "Đã duyệt" : "Chờ"}
        </Text>
      </View>
      <View style={{ width: "100%" }}>
        <InputBox
          multiline
          disabled
          value={thesis.description}
          label="Description"
          style={styles.description}
        />
      </View>
      <View style={styles.filesField}>
        <Text style={{ fontSize: 18 }}>Files: </Text>
        <Text style={styles.fileName}>{thesis.files}</Text>
      </View>
      <View style={styles.row}>
        <Text style={{ fontSize: 18, marginRight: 20 }}>
          Hội đồng đánh giá:
        </Text>
        <Text style={{ fontSize: 20, fontStyle: "italic", fontWeight: 500 }}>
          {thesis.council ? thesis.council.name : "Chưa có"}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={{ fontSize: 18, marginRight: 20 }}>
          Sinh viên thực hiện:
        </Text>
        <View style={styles.info}>
          {thesis.students.map((student) => (
            <Text style={{ fontSize: 16 }} key={student.id}>
              {student.get_full_name}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.row}>
        <Text style={{ fontSize: 18, marginRight: 20 }}>
          Giảng viên hướng dẫn:
        </Text>
        <View style={styles.info}>
          {thesis.supervisors.map((supervisor) => (
            <Text style={{ fontSize: 16 }} key={supervisor.id}>
              {supervisor.get_full_name}
            </Text>
          ))}
        </View>
      </View>
    </>
  );
};

const ThesisReviews = ({ thesis, token }) => {
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    let response = await authAPIWithoutParams(token).get(
      endpoints.thesisReivews(thesis.id)
    );
    setReviews(response.data);
  };

  const handleRefresh = () => {
    setReviews([]);
    setTimeout(() => loadReviews(), 1000);
  };

  useEffect(() => {
    loadReviews();
  }, [thesis]);

  return (
    <View
      style={{
        width: "100%",
        padding: 8,
        backgroundColor: "#ccc",
        opacity: 0.6,
        borderRadius: 20,
      }}
    >
      <View style={{}}>
        {reviews.length === 0 ? (
          <Text style={{ color: "blue", fontSize: 16 }}>Không có đánh giá</Text>
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "blue", fontSize: 16 }}>Các đánh giá</Text>
              <ButtonComponent style={{}} onClick={handleRefresh}>
                <FontAwesomeIcon icon={faArrowsRotate} />
              </ButtonComponent>
            </View>
            {reviews.map((review, index) => (
              <Review review={review} key={index} />
            ))}
          </>
        )}
      </View>
    </View>
  );
};

const Review = ({ review }) => {
  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <Text>{`${review.author_firstname} ${review.author_lastname}`}</Text>
      <Text>{`${review.comment} | Điểm đánh giá: ${review.final_score}`}</Text>
      <Text></Text>
      <Text style={{ position: "absolute", right: 0, bottom: 0 }}>
        {`Đã đánh giá ${moment(review.updated_at).fromNow()}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: "600" },
  status: { flexDirection: "row", alignItems: "center" },
  filesField: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    position: "relative",
    paddingHorizontal: 10,
  },
  fileText: {
    borderColor: "#000",
    borderWidth: 1,
    width: 280,
    padding: 14,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    height: 46,
    justifyContent: "space-between",
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginVertical: 28,
  },
  info: {
    padding: 8,
    borderRadius: 10,
    paddingTop: 0,
  },
  description: {
    inputBox: {
      width: "100%",
      height: 100,
      justifyContent: "flex-start",
    },
    input: {
      width: "100%",
      maxHeight: 100,
      marginVertical: 10,
    },
    label: {
      fontWeight: "500",
    },
  },
  fileName: {
    borderColor: "#000",
    borderWidth: 1,
    width: 280,
    padding: 14,
  },
});

export default ThesisPage;
