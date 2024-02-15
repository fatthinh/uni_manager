import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import InputBox from "../../components/InputBox";
import CouncilItem from "../CouncilsPage/CouncilItem";

const CouncilItems = ({ councils, onClickItem }) => {
  const [searchValue, setSearchValue] = useState(null);
  const handleSearch = (value) => {
    setSearchValue(value);
  };
  const navigation = useNavigation();

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
          input: {},
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
                  onPress={() => onClickItem(council.id)}
                />
              ))}
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default CouncilItems;
