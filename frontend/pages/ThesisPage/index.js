import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Linking,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import DetailLayout from "../../layouts/DetailLayout";
import InputBox from "../../components/InputBox";
import ButtonComponent from "../../components/ButtonComponent";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import * as Print from "expo-print";
import ReviewModal from "./ReviewModal";
import Reviews from "./Reviews";
import { faAngleDown, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function ThesisPage({ navigation, route }) {
  const { thesis, token } = route.params;
  const { userInfo } = useSelector((state) => state.userLogin);
  const [myReview, setMyReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewVisible, setReviewVisible] = useState(false);
  const [reviewsModal, setReviewsModal] = useState(false);

  const loadReviews = async () => {
    let response = await authAPIWithoutParams(token).get(
      endpoints.thesisReivews(thesis.id)
    );
    setReviews(response.data);
  };

  const loadMyReview = async () => {
    try {
      let response = await authAPIWithoutParams(token).get(
        endpoints.myReview(thesis.id)
      );
      setMyReview(response.data);
    } catch (error) {
      setMyReview(null);
    }
  };

  useEffect(() => {
    loadReviews();
    loadMyReview();
  }, [thesis, token]);

  const handleActive = async () => {
    await authAPIWithoutParams(token).patch(endpoints.toggleThesis(thesis.id));
    navigation.navigate("ThesesPage", { token: token });
  };

  const toParentPage = () => {
    if (userInfo) {
      if (userInfo.role === "LECTURER")
        navigation.navigate("LecturerTheses", {
          token: token,
          councilId: thesis.council.id,
        });
      else navigation.navigate("ThesesPage", { token: token });
    }
  };

  const openFile = (fileUrl) => {
    let url = `https://lpthinh.pythonanywhere.com${fileUrl}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.error("Don't know how to open URI: ", url);
      }
    });
  };

  const print = async () => {
    await Print.printAsync({
      html: createDynamicTable(),
    });
  };

  const createDynamicTable = () => {
    var table = "";
    let total_score = 0;
    let avg_score;
    if (reviews.length) {
      reviews.map((review) => {
        total_score += review.final_score;
        table += `
          <tr>
            <td>${`${review.author_firstname} ${review.author_lastname}`}</td>
            <td>${review.author_email}</td>
            <td>${parseFloat(review.final_score.toFixed(2))}</td>
          </tr>
          `;
      });

      avg_score = parseFloat((total_score / reviews.length).toFixed(2));
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
        <style>
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          
          td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 12px;
            font-size: 1.5em;
          }
          
          tr:nth-child(even) {
            background-color: #dddddd;
          }

          div span {
            font-size: 1.6em;
          }

          li {
            font-size: 1.5em;
            font-style: italic;
          }

        </style>
        </head>
        <body>
        
        <h1 style="color:blue; font-size: 2em">Phiếu đánh giá: <span>${
          thesis.title
        }</span></h1>
        
        <div style="display: flex; flex-direction: row; gap: 80px;">
          <div>
            <h2>Sinh viên thực hiện:</h2>
            <ul>
              ${thesis.students.map(
                (student) => `<li>${student.get_full_name}</li>`
              )}
            </ul>
          </div>
          <div>
            <h2>Giảng viên hướng dẫn:</h2>
            <ul>
              ${thesis.supervisors.map(
                (supervisor) => `<li>${supervisor.get_full_name}</li>`
              )}
            </ul>
          </div>
        </div>
        
        <table>
          <tr>
            <th>Người đánh giá</th>
            <th>Liên hệ</th>
            <th>Điểm</th>
          </tr>
          ${table}
        </table>

        <h2>Điểm tổng kết: <span style="font-style: italic">${avg_score}</span> </h2>

        <div style="display: flex; justify-content: flex-end;"><h2>Ký tên</h2></div>
        </body>
      </html>
        `;
    return html;
  };

  const actions = () => {
    return thesis?.is_active ? (
      <ButtonComponent
        rounded
        primary
        style={{ container: { width: 200 } }}
        disabled={thesis.council?.is_active}
        onClick={print}
      >
        Xuất bảng đánh giá
      </ButtonComponent>
    ) : (
      <ButtonComponent
        rounded
        primary
        style={{ container: { width: 200 } }}
        onClick={handleActive}
      >
        Duyệt
      </ButtonComponent>
    );
  };

  return (
    <>
      <DetailLayout
        title="Chi tiết khóa luận"
        toParentPage={toParentPage}
        style={{
          actions: {
            flex: 1.2,
            justifyContent: "center",
          },
        }}
        childrenActions={actions()}
      >
        {thesis === null ? (
          <ActivityIndicator />
        ) : (
          <>
            <ThesisView thesis={thesis} onClickFile={openFile} />
            <ButtonComponent onClick={() => setReviewsModal(true)}>
              Xem đánh giá
            </ButtonComponent>
          </>
        )}
      </DetailLayout>
      <ReviewModal
        myReview={myReview}
        token={token}
        thesis={thesis}
        visible={reviewVisible}
        unVisible={() => {
          setReviewVisible(false);
          setReviewsModal(true);
          loadReviews();
          loadMyReview();
        }}
      />
      <Modal
        visible={reviewsModal}
        unVisible={() => setReviewsModal(false)}
        animationType="slide"
      >
        <View style={{ height: "100%", marginTop: 32 }}>
          <ButtonComponent
            leftIcon={faAngleDown}
            style={{
              container: { boderColor: "#ccc", borderBottomWidth: 0.4 },
              leftIcon: { flex: 0.5 },
              children: {
                flex: 9.5,
                textAlign: "center",
                paddingRight: 10,
              },
            }}
            onClick={() => setReviewsModal(false)}
          >
            Đánh giá
          </ButtonComponent>
          <Reviews reviews={reviews} />
          {userInfo?.role === "LECTURER" && (
            <View
              style={{
                alignItems: "center",
                width: "100%",
              }}
            >
              <ButtonComponent
                primary
                rounded
                onClick={() => {
                  setReviewVisible(true);
                  setReviewsModal(false);
                }}
                style={{ container: { width: 260, height: 46 } }}
                disabled={!thesis.council?.is_active}
              >
                {myReview ? "Sửa đánh giá" : "Thêm đánh giá"}
              </ButtonComponent>
            </View>
          )}
        </View>
      </Modal>
    </>
  );
}

const ThesisView = ({ thesis, onClickFile }) => {
  return (
    <View style={{ padding: 10 }}>
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
        <ButtonComponent
          rounded
          style={{ container: { width: 280 } }}
          onClick={() => onClickFile(thesis.files)}
        >
          {thesis.files.substring(thesis.files.lastIndexOf("/") + 1)}
        </ButtonComponent>
      </View>
      <View style={styles.row}>
        <Text style={{ fontSize: 18, marginRight: 20 }}>
          Hội đồng đánh giá:
        </Text>
        <SafeAreaView style={{ flex: 2 }}>
          <Text style={{ fontSize: 20, fontStyle: "italic", fontWeight: 500 }}>
            {thesis.council
              ? thesis.council.name.slice(
                  thesis.council.name.lastIndexOf("(") + 1,
                  thesis.council.name.lastIndexOf(")")
                )
              : "Chưa có"}
          </Text>
        </SafeAreaView>
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
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "600" },
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
    marginVertical: 22,
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
