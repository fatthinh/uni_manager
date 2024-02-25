import { useState } from "react";
import { authAPIWithParams, endpoints } from "../../configs/API";
import DefaultLayout from "../../layouts/DefaultLayout";
import CouncilItems from "../CouncilsPage/CouncilItems";

function LecturerCouncils({ route, navigation }) {
  const [councils, setCouncils] = useState([]);
  const { token } = route.params;

  const loadCouncils = async (currentPage, searchValue = "") => {
    try {
      let params = {
        page: currentPage,
        search: searchValue,
      };
      let response = await authAPIWithParams(token, params).get(
        endpoints.lecturerCouncils
      );
      setCouncils(response.data.results);

      return Math.ceil(response.data.count / 6);
    } catch (ex) {
      console.error(ex);
      setCouncils([]);
    }
  };

  const onClickItem = (council) => {
    navigation.navigate("LecturerTheses", {
      councilId: council.id,
      token: token,
    });
  };

  return (
    <DefaultLayout>
      <CouncilItems
        councils={councils}
        loadCouncils={loadCouncils}
        onClickItem={onClickItem}
      />
    </DefaultLayout>
  );
}

export default LecturerCouncils;
