import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import API, { authAPIWithoutParams, endpoints } from "../../configs/API";
import DefaultLayout from "../../layouts/DefaultLayout";
import CouncilItem from "./CouncilItem";

function CouncilsPage({ route, navigation }) {
  const { token, updated } = route.params;
  const [searchValue, setSearchValue] = useState(null);
  const [councils, setCouncils] = useState(null);
  const [dropdownTheses, setDropdownTheses] = useState(null);
  const dropdownLecturers = useSelector((state) => state.lecturersInfo);
  const { lecturers } = dropdownLecturers;

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const loadDropdownTheses = async () => {
    try {
      const response = await authAPIWithoutParams(token).get(
        endpoints.activeTheses
      );

      let transformData = response.data
        .filter((thesis) => thesis.council === null)
        .map((thesis) => ({ label: thesis.title, value: thesis.id }));

      setDropdownTheses(transformData);
    } catch (ex) {
      console.error(ex);
      setAllTheses(null);
    }
  };

  const loadCouncils = async () => {
    try {
      const response = await authAPIWithoutParams(token).get(
        endpoints.councils
      );
      setCouncils(response.data);
    } catch (ex) {
      console.error(ex);
      setCouncils(null);
    }
  };

  useEffect(() => {
    loadCouncils();
    loadDropdownTheses();
  }, [updated]);

  useEffect(() => {
    loadDropdownTheses();
  }, []);

  useEffect(() => {
    loadCouncils();
  }, [searchValue]);

  return (
    <DefaultLayout>
      <View style={styles.header}>
        <ButtonComponent
          outline
          style={{ container: { marginBottom: -6 } }}
          onClick={() =>
            navigation.navigate("CreateCouncilPage", { token: token })
          }
        >
          Tạo hội đồng
        </ButtonComponent>
      </View>
      <InputBox
        label="Tìm kiếm"
        icon={<FontAwesomeIcon icon={faXmarkCircle} />}
        value={searchValue}
        onChange={handleSearch}
        removeIcon={true}
        style={styles.searchBox}
      />
      <View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 12,
            paddingHorizontal: 8,
            paddingVertical: 14,
            backgroundColor: "#0c56d0",
          }}
        >
          <Text style={{ flex: 1 }}>ID</Text>
          <Text style={{ flex: 4 }}>Tên hội đồng</Text>
          <Text style={{ flex: 3 }}>Ngày tạo</Text>
          <Text style={{ flex: 3 }}>Trạng thái</Text>
        </View>
        <View>
          {councils === null ? (
            <ActivityIndicator />
          ) : (
            <>
              {councils.map((council) => (
                <CouncilItem
                  council={council}
                  key={council.id}
                  style={{ container: { borderColor: "#0c56d0" } }}
                  onPress={() =>
                    navigation.navigate("CouncilPage", {
                      councilId: council.id,
                      token: token,
                      dropdownTheses: dropdownTheses,
                      dropdownLecturers: lecturers,
                    })
                  }
                />
              ))}
            </>
          )}
        </View>
      </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "flex-end" },
  searchBox: {
    inputBox: {
      width: "100%",
      marginBottom: 20,
    },
  },
});

export default CouncilsPage;
