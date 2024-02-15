import { StyleSheet, Text, View } from "react-native";
import DefaultLayout from "../../layouts/DefaultLayout";
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MyThesis({ navigation }) {
  const [thesis, setThesis] = useState(null);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    const loadThesis = async () => {
      let accessToken = await AsyncStorage.getItem("access-token");
      let response = await authAPIWithoutParams(accessToken).get(
        endpoints.myThesis
      );
      setThesis(response.data);
    };

    loadThesis();
  }, [userInfo]);

  console.log(thesis);

  return (
    <DefaultLayout>
      {!thesis ? (
        <>
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Bạn chưa có khóa luận!!!</Text>
            <ButtonComponent
              rounded
              style={{
                container: { width: 200, marginTop: 20 },
                textColor: { fontSize: 24 },
              }}
              onClick={() => navigation.navigate("CreateThesisPage")}
            >
              Tạo
            </ButtonComponent>
          </View>
        </>
      ) : (
        <>
          <ThesisDetail thesis={thesis} />
        </>
      )}
    </DefaultLayout>
  );
}

const ThesisDetail = ({ thesis }) => {
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
          style={{
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
          }}
        />
      </View>
      <View style={styles.filesField}>
        <Text style={{ fontSize: 18 }}>Files: </Text>
        <Text
          style={{
            borderColor: "#000",
            borderWidth: 1,
            width: 280,
            padding: 14,
          }}
        >
          {thesis.files}
        </Text>
      </View>
      <View style={styles.row}>
        {/* <Text style={{ fontSize: 18, marginRight: 20 }}>
          Hội đồng đánh giá:
        </Text>
        {councils === null || thesis === null ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text style={{ fontSize: 16 }}>
              {councils.find((council) => council.id === thesis.council).name}
            </Text>
          </>
        )} */}
      </View>
      <View style={styles.row}>
        <Text style={{ fontSize: 18, marginRight: 20 }}>
          Sinh viên thực hiện:
        </Text>
        <View style={{ marginTop: 2 }}>
          {/* {users === null || thesis === null ? (
            <ActivityIndicator />
          ) : (
            <>
              {thesis.students.map((studentId) => {
                let matchStudent = users.find((user) => user.id === studentId);
                return (
                  <Text style={{ fontSize: 16 }} key={studentId}>
                    {matchStudent.get_full_name}
                  </Text>
                );
              })}
            </>
          )} */}
        </View>
      </View>
      <View style={styles.row}>
        <Text style={{ fontSize: 18, marginRight: 20 }}>
          Giảng viên hướng dẫn:
        </Text>
        <View style={{ marginTop: 2 }}>
          {/* {users === null || thesis === null ? (
            <ActivityIndicator />
          ) : (
            <>
              {thesis.supervisors.map((supervisorId) => {
                let matchStudent = users.find(
                  (user) => user.id === supervisorId
                );
                return (
                  <Text style={{ fontSize: 16 }} key={supervisorId}>
                    {matchStudent.get_full_name}
                  </Text>
                );
              })}
            </>
          )} */}
        </View>
      </View>
    </>
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
    marginTop: 10,
  },
});

export default MyThesis;
