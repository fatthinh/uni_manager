import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Modal,
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import DetailLayout from "../../layouts/DetailLayout";
import InputBox from "../../components/InputBox";
import ButtonComponent from "../../components/ButtonComponent";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { useFocusEffect } from "@react-navigation/native";

function ThesisPage({ navigation, route }) {
  const { thesis, token } = route.params;
  const { userInfo } = useSelector((state) => state.userLogin);
  const [myReview, setMyReview] = useState(null);
  const [reviews, setReviews] = useState([]);

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
      // console.error("Error loading review:", error);
      setMyReview(null);
    }
  };

  // useEffect(() => {
  //   loadReviews();
  //   loadMyReview();
  // }, [thesis.id, updated]);

  useFocusEffect(
    useCallback(() => {
      loadReviews();
      loadMyReview();
    }, [thesis.id])
  );

  const handleActive = async () => {
    let response = await authAPIWithoutParams(token).patch(
      endpoints.toggleThesis(thesis.id)
    );
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
    let url = `http://192.168.1.42:8000${fileUrl}`;
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
    if (reviews.length)
      reviews.map((review) => {
        table =
          table +
          `
        <tr>
          <td>${`${review.author_firstname} ${review.author_lastname}`}</td>
          <td>${review.author_email}</td>
          <td>${parseFloat(review.final_score.toFixed(2))}</td>
        </tr>
        `;
      });

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
        </body>
      </html>
        `;
    return html;
  };

  const activedActions = () => {
    return (
      <>
        {userInfo?.role === "LECTURER" ? (
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
            disabled={!thesis.council?.is_active}
          >
            {myReview ? "Sửa đánh giá" : "Thêm đánh giá"}
          </ButtonComponent>
        ) : (
          <ButtonComponent
            rounded
            primary
            style={{ container: { width: 200 } }}
            disabled={thesis.council?.is_active || !thesis.council}
            onClick={print}
          >
            Xuất bảng đánh giá
          </ButtonComponent>
        )}
      </>
    );
  };

  const notActivedActions = () => {
    return (
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
        childrenActions={
          thesis?.is_active ? activedActions() : notActivedActions()
        }
      >
        {thesis === null ? (
          <ActivityIndicator />
        ) : (
          <>
            <ThesisView thesis={thesis} onClickFile={openFile} />
            <ThesisReviews reviews={reviews} />
          </>
        )}
      </DetailLayout>
    </>
  );
}

const ThesisView = ({ thesis, onClickFile }) => {
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
            {thesis.council ? thesis.council.name.split("(").pop() : "Chưa có"}
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
    </>
  );
};

const ThesisReviews = ({ reviews }) => {
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
      <View>
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
            {reviews.map((review, index) => (
              <Review review={review} key={index} />
            ))}
          </>
        ) : (
          <Text style={{ color: "blue", fontSize: 16 }}>Không có đánh giá</Text>
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
      <Text>{`${review.comment} | Điểm đánh giá: ${parseFloat(
        review.final_score.toFixed(2)
      )}`}</Text>
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
