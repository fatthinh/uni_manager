import { Text, View } from "react-native";
import DefaultLayout from "../../layouts/DefaultLayout";
import ButtonComponent from "../../components/ButtonComponent";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import { createContext, useContext, useEffect, useState } from "react";
import ModalComponent from "../../components/ModalComponent";
import { useSelector } from "react-redux";
import * as DocumentPicker from "expo-document-picker";
import ThesisModal from "./ThesisModal";

const ThesisContext = createContext();

function MyThesis({ route }) {
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
        supervisors: data.supervisors,
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
      students: thesis.partner
        ? [thesis.partner.id, userInfo.id]
        : [userInfo.id],
      supervisors: thesis.supervisors.map((supervisor) => supervisor.id),
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
      students: thesis.partner
        ? [thesis.partner.id, userInfo.id]
        : [userInfo.id],
      supervisors: thesis.supervisors.map((supervisor) => supervisor.id),
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

  console.log(thesis.supervisors)

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
          file,
          loadThesis,
          onChangeDetail,
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
        <ViewModal
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
        <ThesisModal
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

const ViewModal = ({ visible, unVisible }) => {
  const { file, thesis, updateThesis, pickDocument, onChangeDetail } =
    useContext(ThesisContext);

  return (
    <ModalComponent
      content={
        <ThesisModal
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

export default MyThesis;
