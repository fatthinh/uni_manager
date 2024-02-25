import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import {
  authAPIWithoutParams,
  authAPIWithParams,
  endpoints,
} from "../../configs/API";
import DetailLayout from "../../layouts/DetailLayout";
import Theses from "../ThesesPage/Theses";

function LecturerTheses({ route, navigation }) {
  const [theses, setTheses] = useState([]);
  const { token, councilId } = route.params;

  const loadTheses = async () => {
    try {
      let response = await authAPIWithoutParams(token).get(
        endpoints.lecturerTheses(councilId)
      );
      setTheses(response.data);
      return 1;
    } catch (ex) {
      console.error(ex);
      setTheses([]);
    }
  };

  useEffect(() => {
    loadTheses(1);
  }, [councilId]);

  const onClickItem = (thesis) => {
    navigation.navigate("ThesisPage", {
      thesis: thesis,
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
      <View style={{ paddingHorizontal: 10 }}>
        <Theses
          theses={theses}
          loadTheses={loadTheses}
          onClickItem={onClickItem}
        />
      </View>
    </DetailLayout>
  );
}

export default LecturerTheses;
