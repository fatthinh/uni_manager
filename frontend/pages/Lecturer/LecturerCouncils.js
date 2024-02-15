import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import DefaultLayout from "../../layouts/DefaultLayout";
import CouncilItems from "../CouncilsPage/CouncilItems";

function LecturerCouncils({ route, navigation }) {
  const [councils, setCouncils] = useState(null);
  // const { userInfo } = useSelector((state) => state.userLogin);
  const { token } = route.params;

  useEffect(() => {
    const loadCouncils = async () => {
      let response = await authAPIWithoutParams(token).get(
        endpoints.lecturerCouncils
      );
      setCouncils(response.data);
    };

    loadCouncils();
  }, [token]);

  const onClickItem = (councilId) => {
    navigation.navigate("LecturerTheses", {
      councilId: councilId,
      token: token,
    });
  };

  return (
    <DefaultLayout>
      {councils === null ? (
        <>
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Bạn không thuộc hội đồng đánh giá nào!!!</Text>
          </View>
        </>
      ) : (
        <CouncilItems councils={councils} onClickItem={onClickItem} />
      )}
    </DefaultLayout>
  );
}

export default LecturerCouncils;
