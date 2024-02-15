import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import InputBox from "../../components/InputBox";
import ThesisItem from "./ThesisItem";

const Theses = ({ theses, token, onClickThesis }) => {
  const [searchValue, setSearchValue] = useState(null);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <>
      <InputBox
        label="Tìm kiếm"
        icon={<FontAwesomeIcon icon={faXmarkCircle} />}
        value={searchValue}
        onChange={handleSearch}
        removeIcon={true}
        style={{
          inputBox: {
            width: "100%",
            marginBottom: 20,
          },
        }}
      />
      <View style={{}}>
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
          <Text style={{ flex: 4 }}>Đề tài</Text>
          <Text style={{ flex: 3 }}>Ngày tạo</Text>
          <Text style={{ flex: 3 }}>Trạng thái</Text>
        </View>
        <View>
          {theses === null ? (
            <ActivityIndicator />
          ) : (
            <>
              {theses.map((thesis) => (
                <ThesisItem
                  thesis={thesis}
                  key={thesis.id}
                  style={{ container: { borderColor: "#0c56d0" } }}
                  onPress={() => onClickThesis(thesis.id, token)}
                />
              ))}
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default Theses;
