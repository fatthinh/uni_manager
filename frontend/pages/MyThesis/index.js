import { Dimensions, Linking, StyleSheet, Text, View } from "react-native";
import DefaultLayout from "../../layouts/DefaultLayout";
import ButtonComponent from "../../components/ButtonComponent";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import { createContext, useContext, useEffect, useState } from "react";
import ModalComponent from "../../components/ModalComponent";
import InputBox from "../../components/InputBox";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DropdownComponent from "../../components/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import MultiSelectComponent from "../../components/MultiSelectComponent";
import * as DocumentPicker from "expo-document-picker";
import {
  faArrowLeft,
  faArrowRight,
  faPen,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { openSearchModal } from "../../redux/actions/searchModal";

const SCREEN_WIDTH = Dimensions.get("window").width;
const MAJORS = [
  { value: "IT", label: "Infomation Technology" },
  { value: "CS", label: "Computer Science" },
  { value: "ENG", label: "English Language" },
  { value: "MKT", label: "Marketing" },
];
const ThesisContext = createContext();

function MyThesis({ navigation, route }) {
  const { token } = route.params;
  const updated = route.params?.updated;
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [thesisModalVisible, setThesisModalVisible] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const [thesis, setThesis] = useState({});
  const [file, setFile] = useState(null);

  const loadThesis = async () => {
    try {
      let response = await authAPIWithoutParams(token).get(endpoints.myThesis);
      let data = response.data;
      setThesis({
        id: data.id,
        title: data.title,
        description: data.description,
        supervisors: data.supervisors.map((supervisor) => supervisor.id),
        partner: data.students.find((student) => student.id !== userInfo.id),
        major: data.major,
      });
      setFile({
        name: data.files.split("/").pop(),
        uri: `http://192.168.1.42:8000${data.files}`,
      });
    } catch (error) {
      setThesis({
        title: "",
        description: "",
        supervisors: [],
        partner: null,
        major: "",
      });
      setFile(null);
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
        if (thesis.id) {
          uploadFile(data, thesis.id);
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
    try {
      let response = await authAPIWithoutParams(token).post(
        endpoints.createThesis,
        data
      );
      uploadFile(file, response.data.id);
    } catch (error) {
      console.error(error);
    } finally {
      loadThesis();
      setCreateModalVisible(false);
    }
  };

  const updateThesis = async () => {
    let data = {
      ...thesis,
      students: thesis.partner ? [thesis.partner, userInfo.id] : [userInfo.id],
    };
    try {
      await authAPIWithoutParams(token).patch(
        endpoints.updateThesis(thesis.id),
        data
      );
      setThesisModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeDetail = (key, value) => {
    setThesis((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  useEffect(() => {
    loadThesis();
  }, [token, updated]);

  return (
    <>
      <DefaultLayout>
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {thesis.id ? (
            <Text>{thesis.title}</Text>
          ) : (
            <Text>Bạn chưa có khóa luận!!!</Text>
          )}
          <ButtonComponent
            rounded
            style={{
              container: { width: 200, marginTop: 20 },
              textColor: { fontSize: 24 },
            }}
            onClick={
              thesis.id
                ? () => setThesisModalVisible(true)
                : () => setCreateModalVisible(true)
            }
          >
            {thesis.id ? "Xem chi tiết" : "Tạo"}
          </ButtonComponent>
        </View>
      </DefaultLayout>

      <ThesisContext.Provider
        value={{
          thesis,
          loadThesis,
          onChangeDetail,
          file,
          pickDocument,
          createThesis,
          setThesis,
          setFile,
          updateThesis,
        }}
      >
        <CreateModal
          visible={createModalVisible}
          unVisible={() => setCreateModalVisible(false)}
        />
        <ThesisModal
          visible={thesisModalVisible}
          unVisible={() => setThesisModalVisible(false)}
        />
      </ThesisContext.Provider>
    </>
  );
}

const CreateModal = ({ visible, unVisible }) => {
  const {
    file,
    setFile,
    thesis,
    setThesis,
    createThesis,
    pickDocument,
    onChangeDetail,
  } = useContext(ThesisContext);

  return (
    <ModalComponent
      content={
        <Content
          thesis={thesis}
          onChangeDetail={onChangeDetail}
          file={file}
          pickDocument={pickDocument}
          createThesis={createThesis}
        />
      }
      title="Tạo khóa luận"
      unVisible={() => {
        unVisible();
        setThesis({
          title: "",
          description: "",
          supervisors: [],
          partner: null,
          major: "",
        });
        setFile(null);
      }}
      visible={visible}
    />
  );
};

const Content = ({
  thesis,
  onChangeDetail,
  pickDocument,
  file,
  createThesis,
  updateThesis,
}) => {
  const dispatch = useDispatch();

  const openFile = (fileUrl) => {
    console.log(fileUrl);
    Linking.canOpenURL(fileUrl).then((supported) => {
      if (supported) {
        Linking.openURL(fileUrl);
      } else {
        console.error("Don't know how to open URI: ", fileUrl);
      }
    });
  };

  const [current, setCurrent] = useState(0);
  const { lecturers } = useSelector((state) => state.lecturersInfo);
  const fields = [
    { field: "title", fieldName: "" },
    { field: "major", fieldName: "Ngành" },
    { field: "description", fieldName: "Mô tả" },
    { field: "files", fieldName: "Files" },
    { field: "partner", fieldName: "Sinh viên khác" },
    { field: "supervisors", fieldName: "Giảng viên hướng dẫn" },
  ];

  const [error, setError] = useState(false);

  return (
    <View
      style={{
        width: SCREEN_WIDTH * 0.8,
        marginTop: 20,
      }}
    >
      <View style={{}}>
        {current === 0 && (
          <InputBox
            value={thesis?.title}
            onChange={(value) => onChangeDetail("title", value)}
            style={{ inputBox: { width: "100%" } }}
            label="Tên"
          />
        )}
        {current === 1 && (
          <DropdownComponent
            data={MAJORS}
            onChange={(value) => onChangeDetail("major", value)}
            style={{ dropdownContainer: { width: "100%" } }}
            value={thesis?.major}
          />
        )}
        {current === 2 && (
          <InputBox
            multiline
            value={thesis?.description}
            label="Description"
            onChange={(value) => onChangeDetail("description", value)}
            style={{
              inputBox: {
                width: "100%",
                height: 100,
              },
              input: {
                width: "100%",
                marginVertical: 10,
              },
              label: {
                fontWeight: "500",
              },
            }}
          />
        )}
        {current === 3 && (
          <ButtonComponent
            style={{
              container: {
                width: "100%",
                height: 60,
              },
            }}
            primary
            onClick={pickDocument}
          >
            Chọn
          </ButtonComponent>
        )}
        {current === 4 && (
          <ButtonComponent
            rounded
            onClick={() =>
              dispatch(
                openSearchModal("student", (value) =>
                  onChangeDetail("partner", value.id)
                )
              )
            }
          >
            {thesis.partner ? "Chọn lại..." : "Chọn..."}
          </ButtonComponent>
        )}

        {current === 5 && (
          <View style={{ width: "100%", marginTop: 20 }}>
            <MultiSelectComponent
              data={lecturers}
              onChangeSelected={(value) => onChangeDetail("supervisors", value)}
              selected={thesis?.supervisors}
              placeholder="Chọn..."
              maxSelect={2}
              hide={!thesis.supervisors}
            />
          </View>
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: current === 0 ? "center" : "space-between",
          marginTop: 20,
          alignItems: "center",
        }}
      >
        {current !== 0 && (
          <ButtonComponent
            onClick={() => {
              setCurrent((prev) => prev - 1);
              setError(false);
            }}
            style={{ container: { height: 50 } }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </ButtonComponent>
        )}
        {current !== 0 &&
          (fields[current].field === "files" ? (
            <ButtonComponent
              onClick={() => openFile(file?.uri)}
              disabled={!file}
              style={{ container: { width: 180 } }}
            >
              {file ? file.name : fields[current].fieldName}
            </ButtonComponent>
          ) : (
            <Text style={{ fontSize: 16, width: 100, textAlign: "center" }}>
              {fields[current].fieldName}
            </Text>
          ))}
        {current !== 5 ? (
          <ButtonComponent
            onClick={() => {
              let thesisField =
                fields[current].field === "files"
                  ? file
                  : thesis[fields[current].field];
              if (thesisField || current == 4) {
                setError(false);
                setCurrent((prev) => prev + 1);
              } else setError(true);
            }}
            style={{ container: { height: 50 } }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </ButtonComponent>
        ) : createThesis ? (
          <ButtonComponent
            onClick={() => {
              if (thesis[fields[current].field].length) {
                createThesis();
                setError(false);
              } else setError(true);
            }}
            style={{ container: { height: 50 } }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </ButtonComponent>
        ) : (
          <ButtonComponent
            onClick={() => {
              if (thesis[fields[current].field].length) {
                updateThesis();
                setError(false);
              } else setError(true);
            }}
            style={{ container: { height: 50 } }}
          >
            <FontAwesomeIcon icon={faPen} />
          </ButtonComponent>
        )}
      </View>
      {error && <Text style={{ color: "red" }}>Nhập thông tin!!!</Text>}
    </View>
  );
};

const ThesisModal = ({ visible, unVisible }) => {
  const { file, thesis, updateThesis, pickDocument, onChangeDetail } =
    useContext(ThesisContext);

  return (
    <ModalComponent
      content={
        <Content
          thesis={thesis}
          onChangeDetail={onChangeDetail}
          file={file}
          pickDocument={pickDocument}
          updateThesis={() => {
            updateThesis();
            unVisible();
          }}
        />
      }
      title="Chi tiết"
      unVisible={unVisible}
      visible={visible}
    />
  );
};

const styles = StyleSheet.create({});

export default MyThesis;
