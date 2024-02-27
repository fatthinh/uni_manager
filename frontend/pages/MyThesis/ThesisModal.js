import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import DropdownComponent from "../../components/Dropdown";
import MultiSelectComponent from "../../components/MultiSelectComponent";
import { Dimensions, Linking, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  faArrowLeft,
  faArrowRight,
  faPen,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { openSearchModal } from "../../redux/actions/searchModal";
import API, { endpoints } from "../../configs/API";
import { searchReducer } from "../../redux/reducers/modalReducers";
import useDebounce from "../../hooks/useDebounce";

const SCREEN_WIDTH = Dimensions.get("window").width;
const MAJORS = [
  { value: "IT", label: "Infomation Technology" },
  { value: "CS", label: "Computer Science" },
  { value: "ENG", label: "English Language" },
  { value: "MKT", label: "Marketing" },
];

function ThesisModal({
  thesis,
  onChangeDetail,
  pickDocument,
  file,
  createThesis,
  updateThesis,
}) {
  const dispatch = useDispatch();
  const [lecturerSearch, setLecturerSearch] = useState("");
  const [lecturers, setLecturers] = useState([]);
  const debounceValue = useDebounce(lecturerSearch, 500);

  const onChangeLecturerSearch = (text) => {
    setLecturerSearch(text);
  };

  const loadLecturers = async () => {
    try {
      let params = {
        search: debounceValue,
        filter: "lecturer",
      };
      let response = await API.get(endpoints.publicUsers, { params: params });

      let transformData = response.data.results.map((user) => ({
        label: user.get_full_name,
        value: user.id,
      }));

      console.log(transformData);

      setLecturers(transformData);
    } catch (error) {
      setLecturers([]);
      console.error(error);
    }
  };

  useEffect(() => {
    loadLecturers();
  }, [debounceValue]);

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
              onChangeText={onChangeLecturerSearch}
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
}

export default ThesisModal;
