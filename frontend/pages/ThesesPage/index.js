import { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import ButtonComponent from "../../components/ButtonComponent";
import { authAPIWithParams, endpoints } from "../../configs/API";
import DefaultLayout from "../../layouts/DefaultLayout";
import Theses from "./Theses";

function ThesesPage({ route, navigation }) {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { token } = route.params;
  const [theses, setTheses] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const loadTheses = async (currentPage, searchValue = "") => {
    try {
      let params = {
        page: currentPage,
        search: searchValue,
      };
      let endpoint = isActive
        ? endpoints.activeTheses
        : endpoints.notActiveTheses;
      const response = await authAPIWithParams(token, params).get(endpoint);

      setTheses(response.data.results);
      return Math.ceil(response.data.count / 5);
    } catch (ex) {
      console.error(ex);
      setTheses([]);
    }
  };

  // useEffect(() => {
  //   loadTheses(1);
  // }, [isActive]);

  console.log(isActive);

  const onClickItem = (thesis) => {
    navigation.navigate("ThesisPage", {
      thesis: thesis,
      token: token,
    });
  };

  return (
    <DefaultLayout>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <ButtonComponent
          outline
          style={{ container: { marginBottom: -6, opacity: 1 } }}
          onClick={() => setIsActive((prev) => !prev)}
          disabled={userInfo && userInfo.role !== "PROVOST"}
        >
          {isActive ? "Đã duyệt" : "Chưa duyệt"}
        </ButtonComponent>
      </View>
      <Theses
        theses={theses}
        loadTheses={loadTheses}
        onClickItem={onClickItem}
        active={isActive}
      />
    </DefaultLayout>
  );
}

export default ThesesPage;
