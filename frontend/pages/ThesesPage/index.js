import { useEffect, useState } from "react";
import { View } from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import DefaultLayout from "../../layouts/DefaultLayout";
import Theses from "./Theses";

function ThesesPage({ route, navigation }) {
  const { token } = route.params;
  const [theses, setTheses] = useState(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const loadTheses = async () => {
      try {
        let endpoint = isActive
          ? endpoints.activeTheses
          : endpoints.notActiveTheses;
        const response = await authAPIWithoutParams(token).get(endpoint);
        setTheses(response.data);
      } catch (ex) {
        console.error(ex);
        setTheses(null);
      }
    };

    loadTheses();
  }, [isActive]);

  const onClickThesis = (thesisId, token) => {
    navigation.navigate("ThesisPage", {
      thesisId: thesisId,
      token: token,
    });
  };

  return (
    <DefaultLayout>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <ButtonComponent
          outline
          style={{ container: { marginBottom: -6 } }}
          onClick={() => setIsActive((prev) => !prev)}
        >
          {isActive ? "Đã duyệt" : "Chưa duyệt"}
        </ButtonComponent>
      </View>
      <Theses theses={theses} token={token} onClickThesis={onClickThesis} />
    </DefaultLayout>
  );
}

export default ThesesPage;
