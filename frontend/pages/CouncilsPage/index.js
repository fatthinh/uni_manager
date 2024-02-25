import { useMemo, useState } from "react";
import { Text, View, TextInput, Alert, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import ButtonComponent from "../../components/ButtonComponent";
import {
  authAPIWithoutParams,
  authAPIWithParams,
  endpoints,
} from "../../configs/API";
import DefaultLayout from "../../layouts/DefaultLayout";
import ModalComponent from "../../components/ModalComponent";
import CouncilItems from "./CouncilItems";
import CouncilDetail from "./CouncilDetail";

const SCREEN_WIDTH = Dimensions.get("window").width;

function CouncilsPage({ route }) {
  const { userInfo } = useSelector((state) => state.userLogin);
  const token = useMemo(() => route.params?.token, [userInfo]);
  // council list
  const [councils, setCouncils] = useState([]);

  // use for council detail
  const [council, setCouncil] = useState({});
  const [councilModalVisible, setCouncilModalVisible] = useState(false);

  // create council modal
  const [modalVisible, setModalVisible] = useState(false);

  const loadCouncils = async (currentPage, searchValue = "") => {
    try {
      let params = {
        page: currentPage,
        search: searchValue,
      };
      const response = await authAPIWithParams(token, params).get(
        endpoints.councils
      );
      setCouncils(response.data.results);

      return Math.ceil(response.data.count / 6);
    } catch (ex) {
      console.error(ex);
      setCouncils([]);
    }
  };

  const handleCreate = async (councilName) => {
    try {
      await authAPIWithoutParams(token).post(endpoints.councils, {
        name: councilName,
      });
      loadCouncils();
    } catch (error) {
      Alert.alert(
        "Lỗi",
        `Error during API request:, ${error}`[
          { text: "OK", onPress: () => {} }
        ],
        { cancelable: false }
      );
    } finally {
      setModalVisible(false);
    }
  };

  const handleToggleLock = async () => {
    let response = await authAPIWithoutParams(token).patch(
      endpoints.toggleCouncil(council.id)
    );
    loadCouncils();
    setCouncil((prev) => ({ ...prev, is_active: response.data }));
  };

  return (
    <>
      <DefaultLayout>
        <View style={{}}>
          <ButtonComponent
            outline
            style={{ container: { marginBottom: -6 } }}
            onClick={() => setModalVisible(true)}
          >
            Tạo hội đồng
          </ButtonComponent>
        </View>
        <CouncilItems
          councils={councils}
          loadCouncils={loadCouncils}
          onClickItem={(council) => {
            setCouncil(council);
            setCouncilModalVisible(true);
          }}
        />
      </DefaultLayout>
      <ModalComponent
        visible={modalVisible}
        unVisible={() => setModalVisible(false)}
        content={
          <CreateCouncilModal token={token} handleCreate={handleCreate} />
        }
        title="Tạo hội đồng"
      />
      {Object.keys(council).length !== 0 && (
        <ModalComponent
          title="chi tiết"
          visible={councilModalVisible}
          unVisible={() => setCouncilModalVisible(false)}
          content={
            <CouncilDetail
              council={council}
              token={token}
              handleToggleLock={handleToggleLock}
            />
          }
        />
      )}
    </>
  );
}

const CreateCouncilModal = ({ handleCreate }) => {
  const [councilName, setCouncilName] = useState();
  const [errorStyle, setErrorStyle] = useState({});

  return (
    <View
      style={{
        width: SCREEN_WIDTH * 0.8,
        alignItems: "center",
      }}
    >
      <View style={{ width: "100%" }}>
        <Text style={{ fontSize: 16, marginVertical: 10 }}>Tên hội đồng:</Text>
        <TextInput
          style={[
            {
              borderWidth: 1,
              borderColor: "#ccc",
              paddingHorizontal: 10,
              paddingVertical: 6,
              fontSize: 16,
            },
            errorStyle,
          ]}
          placeholder="Nhập..."
          value={councilName}
          onChangeText={(text) => {
            setCouncilName(text);
            setErrorStyle({});
          }}
        />
      </View>
      <ButtonComponent
        rounded
        style={{ container: { width: 200, marginTop: 20 } }}
        onClick={() => {
          if (councilName) handleCreate(councilName);
          else setErrorStyle({ borderColor: "red" });
        }}
      >
        Tạo
      </ButtonComponent>
    </View>
  );
};

export default CouncilsPage;
