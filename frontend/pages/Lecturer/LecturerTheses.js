import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import DetailLayout from "../../layouts/DetailLayout";
import Theses from "../ThesesPage/Theses";

function LecturerTheses({ route, navigation }) {
  const [theses, setTheses] = useState(null);
  const { councilId, token } = route.params;

  useEffect(() => {
    const loadTheses = async () => {
      let response = await authAPIWithoutParams(token).get(
        endpoints.lecturerTheses(councilId)
      );
      setTheses(response.data);
    };

    loadTheses();
  }, [councilId]);

  const onClickThesis = (thesisId, token) => {
    navigation.navigate("ThesisPage", {
      thesisId: thesisId,
      token: token,
    });
  };

  return (
    <DetailLayout
      title="Khóa luận"
      toParentPage={() =>
        navigation.navigate("LecturerCouncils", { token: token })
      }
    >
      {theses === null ? (
        <ActivityIndicator />
      ) : (
        <View style={{ width: "100%" }}>
          <Theses theses={theses} token={token} onClickThesis={onClickThesis} />
        </View>
      )}
    </DetailLayout>
  );
}

export default LecturerTheses;
