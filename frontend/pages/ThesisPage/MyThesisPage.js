import { Text, View } from "react-native";
import DetailLayout from "../../layouts/DetailLayout";
import InputBox from "../../components/InputBox";
import ButtonComponent from "../../components/ButtonComponent";
import { useEffect, useState } from "react";
import MultiSelectComponent from "../../components/MultiSelectComponent";
import DropdownComponent from "../../components/Dropdown";
import { useSelector } from "react-redux";
import * as DocumentPicker from "expo-document-picker";
import { authAPIWithoutParams, endpoints } from "../../configs/API";

const MAJORS = [
  { label: "IT", value: "Infomation Technology" },
  { label: "CS", value: "Computer Science" },
  { label: "ENG", value: "English Language" },
  { label: "MKT", value: "Marketing" },
];

function MyThesisPage({ navigation, route }) {
  const { token, thesisId, council } = route.params;
  const { userInfo } = useSelector((state) => state.userLogin);

  const [thesis, setThesis] = useState({
    title: "",
    description: "",
    supervisors: [],
    partner: null,
    major: "",
  });
  const [file, setFile] = useState(null);

  const { students } = useSelector((state) => state.studentsInfo);
  const { lecturers } = useSelector((state) => state.lecturersInfo);

  const onChangeDetail = (key, value) => {
    setThesis((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const loadThesis = async () => {
    try {
      let response = await authAPIWithoutParams(token).get(
        endpoints.thesis(thesisId)
      );
      const data = response.data;
      setThesis({
        title: data.title,
        description: data.description,
        supervisors: data.supervisors.map((supervisor) => supervisor.id),
        partner: data.students.filter(
          (student) => student.id !== userInfo.id
        )[0].id,
        major: data.major,
      });
      setFile({
        name: data.files.split("/").pop(),
        uri: data.files,
      });
    } catch (error) {
      setThesis({
        title: "",
        description: "",
        supervisors: [],
        partner: null,
        major: "",
      });
    }
  };

  const uploadFile = async (data, thesisId) => {
    const formData = new FormData();
    formData.append("files", data);
    await authAPIWithoutParams(token).patch(
      endpoints.uploadFile(thesisId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();

      const { assets, canceled } = result;

      if (!canceled) {
        const { mimeType, name, uri } = assets[0];
        const data = { uri: uri, type: mimeType, name: name };
        if (thesisId !== null) {
          uploadFile(data, thesisId);
        }
        setFile(data);
      } else {
        console.log("Document picker cancelled.");
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const createThesis = async () => {
    let data = {
      ...thesis,
      students: thesis.partner ? [thesis.partner, userInfo.id] : [userInfo.id],
    };
    console.log(data);
    try {
      let response = await authAPIWithoutParams(token).post(
        endpoints.createThesis,
        data
      );
      uploadFile(file, response.data.id);
      navigation.navigate("MyThesis", { token: token, updated: Math.random() });
    } catch (error) {}
  };

  const updateThesis = async () => {
    let data = {
      ...thesis,
      students: thesis.partner ? [thesis.partner, userInfo.id] : [userInfo.id],
    };
    try {
      await authAPIWithoutParams(token).patch(
        endpoints.updateThesis(thesisId),
        data
      );
    } catch (error) {}
  };

  const actions = () =>
    thesisId ? (
      <ButtonComponent
        rounded
        primary
        style={{ container: { width: 200 } }}
        onClick={updateThesis}
      >
        Cập nhật
      </ButtonComponent>
    ) : (
      <ButtonComponent
        rounded
        primary
        style={{ container: { width: 200 } }}
        onClick={createThesis}
      >
        Tạo
      </ButtonComponent>
    );

  useEffect(() => {
    loadThesis();
  }, [token]);

  return (
    <DetailLayout
      title="Tạo khóa luận"
      toParentPage={() =>
        navigation.navigate("MyThesis", {
          token: token,
        })
      }
      style={{
        actions: { flex: 1.5, justifyContent: "center" },
        children: {},
      }}
      childrenActions={actions()}
    >
      <InputBox
        value={thesis.title}
        label="Tên đề tài"
        onChange={(value) => onChangeDetail("title", value)}
      />

      <View
        style={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <Text style={{ fontSize: 18 }}>Ngành</Text>
        <DropdownComponent
          data={MAJORS}
          value={thesis.major}
          onChange={(value) => onChangeDetail("major", value)}
        />
      </View>

      <View style={{ width: "100%" }}>
        <InputBox
          multiline
          value={thesis.description}
          label="Description"
          onChange={(value) => onChangeDetail("description", value)}
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 20,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>Files: </Text>
          <ButtonComponent
            style={{
              container: {
                backgroundColor: "#ccc",
              },
            }}
            onClick={pickDocument}
          >
            Chọn
          </ButtonComponent>
        </View>
        <Text
          style={{
            borderColor: "#000",
            borderWidth: 1,
            width: 280,
            padding: 14,
          }}
        >
          {file?.name}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          height: 50,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 18, marginRight: 20 }}>Sinh viên khác:</Text>

        <DropdownComponent
          data={students}
          onChange={(value) => onChangeDetail("partner", value)}
          value={thesis?.partner}
        />
      </View>
      <View style={{ width: "100%", marginTop: 20 }}>
        <MultiSelectComponent
          data={lecturers}
          onChangeSelected={(value) => onChangeDetail("supervisors", value)}
          selected={thesis.supervisors}
          placeholder="Giảng viên hướng dẫn"
          maxSelect={2}
          hide={!thesis.supervisors}
        />
      </View>
    </DetailLayout>
  );
}

export default MyThesisPage;
