import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import DetailLayout from "../../layouts/DetailLayout";
import InputBox from "../../components/InputBox";
import ButtonComponent from "../../components/ButtonComponent";
import { useEffect, useState } from "react";
import MultiSelectComponent from "../../components/MultiSelectComponent";
import DropdownComponent from "../../components/Dropdown";
import API, { endpoints } from "../../configs/API";

function CreateThesisPage({ navigation }) {
  const [partner, setPartner] = useState(null);
  const [superviors, setSupervisors] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [files, setFiles] = useState(null);
  const [publicStudents, setPublicStudents] = useState(null);
  const [publicLecturers, setPublicLecturers] = useState(null);

  const onChangeTitle = (title) => {
    setTitle(title);
  };

  const onChangeDescription = (content) => {
    setDescription(content);
  };

  const onChangeSelected = (users) => {
    setSupervisors(users);
  };

  const onChangePartner = (parter) => {
    setPartner(parter);
  };

  useEffect(() => {
    const loadPublicUsers = async () => {
      try {
        let response = await API.get(endpoints.publicUsers);
        let users = response.data;

        let lecturers = users.filter((user) => user.role === "LECTURER");
        let students = users.filter((user) => user.role === "STUDENT");

        let transformedStudentsData = students.map((student) => ({
          label: student.get_full_name,
          value: student.id,
        }));

        let transfromLecturersData = lecturers.map((lecturer) => ({
          label: lecturer.get_full_name,
          value: lecturer.id,
        }));

        setPublicStudents(transformedStudentsData);
        setPublicLecturers(transfromLecturersData);
      } catch (ex) {
        console.error(ex);
        setPublicLecturers(null);
        setPublicStudents(null);
      }
    };

    loadPublicUsers();
  }, []);

  const actions = () => (
    <ButtonComponent rounded primary style={{ container: { width: 200 } }}>
      Tạo
    </ButtonComponent>
  );

  return (
    <DetailLayout
      title="Tạo khóa luận"
      toParentPage={() => navigation.navigate("MyThesis")}
      style={{
        actions: { flex: 2, justifyContent: "center" },
        children: {},
      }}
      childrenActions={actions()}
    >
      <InputBox value={title} label="Tên đề tài" onChange={onChangeTitle} />
      <View style={{ width: "100%" }}>
        <InputBox
          multiline
          value={description}
          label="Description"
          onChange={onChangeDescription}
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
          {files}
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
        {publicStudents === null ? (
          <ActivityIndicator />
        ) : (
          <>
            <DropdownComponent
              data={publicStudents}
              onChange={onChangePartner}
              value={partner}
              defaultValue={0}
            />
          </>
        )}
      </View>
      <View style={{ width: "100%", marginTop: 20 }}>
        {publicLecturers === null ? (
          <ActivityIndicator />
        ) : (
          <>
            <MultiSelectComponent
              data={publicLecturers}
              onChangeSelected={onChangeSelected}
              selected={superviors}
              placeholder="Giảng viên hướng dẫn"
              maxSelect={2}
              hide={!superviors}
            />
          </>
        )}
      </View>
    </DetailLayout>
  );
}

export default CreateThesisPage;
